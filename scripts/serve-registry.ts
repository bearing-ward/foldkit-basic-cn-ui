import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

import { NodeServices } from "@effect/platform-node";
import { Effect } from "effect";
import { Command, Flag } from "effect/unstable/cli";

const cliVersion = "0.1.0";
const defaultRootDir = path.resolve(import.meta.dirname, "..");
const defaultPublicDir = path.join(defaultRootDir, "apps/docs/public");
const defaultHost = process.env.REGISTRY_HOST ?? "127.0.0.1";
const defaultPort = Number.parseInt(process.env.REGISTRY_PORT ?? "4174", 10);

type ResolvedRegistryPath =
  | Readonly<{
      _tag: "File";
      absolutePath: string;
      relativePath: string;
      contentType: string;
    }>
  | Readonly<{
      _tag: "NotFound";
    }>;

export type StartedRegistryServer = Readonly<{
  host: string;
  port: number;
  localBaseUrl: string;
  registryItemUrl: string;
  componentsJsonUrl: string;
  close: () => Promise<void>;
}>;

const jsonContentType = "application/json; charset=utf-8";
const textContentType = "text/plain; charset=utf-8";

const isSafeRelativePath = (relativePath: string): boolean =>
  relativePath !== "" &&
  !path.isAbsolute(relativePath) &&
  !path.normalize(relativePath).startsWith("..");

const requestPathname = (requestUrl: string | undefined): string => {
  const rawPathname = (requestUrl ?? "/").split(/[?#]/u)[0] ?? "/";

  try {
    return decodeURIComponent(rawPathname);
  } catch {
    return "/";
  }
};

const contentTypeForPath = (filePath: string): string =>
  filePath.endsWith(".json") ? jsonContentType : "application/octet-stream";

export const resolveRegistryRequestPath = (
  publicDir: string,
  requestUrl: string | undefined
): ResolvedRegistryPath => {
  const pathname = requestPathname(requestUrl);
  const relativePath = pathname.startsWith("/")
    ? pathname.slice(1)
    : pathname;

  if (!isSafeRelativePath(relativePath)) {
    return { _tag: "NotFound" };
  }

  const absolutePath = path.join(publicDir, path.normalize(relativePath));

  return {
    _tag: "File",
    absolutePath,
    relativePath,
    contentType: contentTypeForPath(absolutePath),
  };
};

const writeResponse = (
  response: ServerResponse,
  statusCode: number,
  contentType: string,
  body: string | Buffer
): void => {
  response.writeHead(statusCode, {
    "content-type": contentType,
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, HEAD, OPTIONS",
  });
  response.end(body);
};

const serveRequest = async (
  publicDir: string,
  request: IncomingMessage,
  response: ServerResponse
): Promise<void> => {
  if (request.method === "OPTIONS") {
    writeResponse(response, 204, textContentType, "");

    return;
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    writeResponse(response, 405, textContentType, "Method not allowed\n");

    return;
  }

  const resolved = resolveRegistryRequestPath(publicDir, request.url);

  if (resolved._tag === "NotFound") {
    writeResponse(response, 404, textContentType, "Not found\n");

    return;
  }

  try {
    const fileStat = await stat(resolved.absolutePath);

    if (!fileStat.isFile()) {
      writeResponse(response, 404, textContentType, "Not found\n");

      return;
    }

    const body = request.method === "HEAD" ? "" : await readFile(resolved.absolutePath);

    writeResponse(response, 200, resolved.contentType, body);
  } catch {
    writeResponse(response, 404, textContentType, "Not found\n");
  }
};

const ensurePublicRegistryArtifacts = async (publicDir: string): Promise<void> => {
  const componentsPath = path.join(publicDir, "components.json");
  const registryIndexPath = path.join(publicDir, "registry.json");

  await Promise.all([
    readFile(componentsPath, "utf-8").then(JSON.parse),
    readFile(registryIndexPath, "utf-8").then(JSON.parse),
  ]);
};

const displayHost = (host: string): string =>
  host === "0.0.0.0" || host === "::" ? "127.0.0.1" : host;

const assertPort = (port: number): number => {
  if (!Number.isInteger(port) || port < 0 || port > 65_535) {
    throw new Error("Port must be an integer from 0 to 65535.");
  }

  return port;
};

export const startRegistryServer = async (config: {
  readonly publicDir: string;
  readonly host: string;
  readonly port: number;
}): Promise<StartedRegistryServer> => {
  const server = createServer((request, response) => {
    void serveRequest(config.publicDir, request, response);
  });

  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(assertPort(config.port), config.host, () => {
      server.off("error", reject);

      const address = server.address();
      const port =
        typeof address === "object" && address !== null
          ? address.port
          : config.port;
      const localBaseUrl = `http://${displayHost(config.host)}:${port}`;

      resolve({
        host: config.host,
        port,
        localBaseUrl,
        registryItemUrl: `${localBaseUrl}/{name}.json`,
        componentsJsonUrl: `${localBaseUrl}/components.json`,
        close: () =>
          new Promise<void>((closeResolve, closeReject) => {
            server.close((error) => {
              if (error !== undefined) {
                closeReject(error);

                return;
              }

              closeResolve();
            });
          }),
      });
    });
  });
};

type ServeRegistryConfig = Readonly<{
  rootDir: string;
  publicDir: string;
  host: string;
  port: number;
  skipValidate: boolean;
}>;

const resolvePublicDir = (rootDir: string, publicDir: string): string =>
  path.isAbsolute(publicDir) ? publicDir : path.join(rootDir, publicDir);

const serveRegistry = (config: ServeRegistryConfig): Effect.Effect<void> =>
  Effect.acquireRelease(
    Effect.promise(async () => {
      const publicDir = resolvePublicDir(config.rootDir, config.publicDir);

      if (!config.skipValidate) {
        await ensurePublicRegistryArtifacts(publicDir);
      }

      return startRegistryServer({
        publicDir,
        host: config.host,
        port: config.port,
      });
    }),
    (server) => Effect.promise(() => server.close())
  ).pipe(
    Effect.tap((server) =>
      Effect.sync(() => {
        console.log("Serving Foldkit CN registry");
        console.log(`Local registry base URL: ${server.registryItemUrl}`);
        console.log(`components.json: ${server.componentsJsonUrl}`);
        console.log("Press Ctrl+C to stop.");
      })
    ),
    Effect.flatMap(() => Effect.never)
  );

export const serveRegistryCommand = Command.make(
  "serve-registry",
  {
    rootDir: Flag.directory("root", { mustExist: true }).pipe(
      Flag.withDefault(defaultRootDir),
      Flag.withDescription("Registry project root.")
    ),
    publicDir: Flag.directory("public-dir", { mustExist: true }).pipe(
      Flag.withDefault(defaultPublicDir),
      Flag.withDescription(
        "Generated public registry directory, absolute or relative to --root."
      )
    ),
    host: Flag.string("host").pipe(
      Flag.withDefault(defaultHost),
      Flag.withDescription("Host interface for the local registry server.")
    ),
    port: Flag.integer("port").pipe(
      Flag.withDefault(defaultPort),
      Flag.withDescription("Port for the local registry server. Use 0 for ephemeral.")
    ),
    skipValidate: Flag.boolean("skip-validate").pipe(
      Flag.withDescription("Serve without checking generated registry JSON first.")
    ),
  },
  (config) => serveRegistry(config).pipe(Effect.scoped)
).pipe(
  Command.withDescription(
    "Serve generated Foldkit CN registry artifacts from apps/docs/public."
  ),
  Command.withExamples([
    {
      command: "serve-registry --host 127.0.0.1 --port 4174",
      description: "Serve the generated registry on a fixed local port.",
    },
    {
      command: "serve-registry --host 0.0.0.0 --port 4174",
      description: "Serve the generated registry from a container.",
    },
  ])
);

export const runServeRegistryCli = (args: ReadonlyArray<string>) =>
  Command.runWith(serveRegistryCommand, { version: cliVersion })(args);

export const runServeRegistryCliMain = (args: ReadonlyArray<string>) =>
  runServeRegistryCli(args).pipe(Effect.provide(NodeServices.layer));

const runMain = async (args: ReadonlyArray<string>): Promise<void> => {
  try {
    await Effect.runPromise(runServeRegistryCliMain(args));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }

    process.exitCode = 1;
  }
};

if (import.meta.main) {
  await runMain(process.argv.slice(2));
}
