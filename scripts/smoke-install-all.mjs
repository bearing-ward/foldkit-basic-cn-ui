import { spawn } from "node:child_process";
import { once } from "node:events";
import { createReadStream } from "node:fs";
import {
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  writeFile,
} from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import path from "node:path";

const rootDir = path.resolve(import.meta.dirname, "..");
const publicDir = path.join(rootDir, "apps/docs/public");
const registryItems = JSON.parse(
  await readFile(path.join(rootDir, "registry/default/items.json"), "utf-8")
);
const rootPackageJson = JSON.parse(
  await readFile(path.join(rootDir, "package.json"), "utf-8")
);
const tempDir = await mkdtemp(path.join(tmpdir(), "foldkit-cn-install-all-"));
const keepTempDir = process.env.SMOKE_INSTALL_KEEP === "1";

const requestedComponents = (process.env.SMOKE_INSTALL_COMPONENTS ?? "")
  .split(",")
  .map((name) => name.trim())
  .filter((name) => name !== "");
const requestedComponentSet =
  requestedComponents.length === 0 ? undefined : new Set(requestedComponents);
const uiItems = registryItems.filter(
  (item) =>
    item.type === "registry:ui" &&
    (requestedComponentSet === undefined ||
      requestedComponentSet.has(item.name))
);
const registryItemsByName = new Map(
  registryItems.map((item) => [item.name, item])
);
const missingRequestedComponents = requestedComponents.filter(
  (name) => !uiItems.some((item) => item.name === name)
);

if (missingRequestedComponents.length > 0) {
  throw new Error(
    `Unknown registry UI item(s): ${missingRequestedComponents.join(", ")}`
  );
}

const run = async (command, args, cwd = rootDir) => {
  const child = spawn(command, args, {
    cwd,
    stdio: ["ignore", "pipe", "pipe"],
  });
  const stdoutChunks = [];
  const stderrChunks = [];
  const timeout = setTimeout(() => child.kill("SIGTERM"), 120_000);

  child.stdout.on("data", (chunk) => stdoutChunks.push(chunk));
  child.stderr.on("data", (chunk) => stderrChunks.push(chunk));

  const [code, signal] = await once(child, "close");
  clearTimeout(timeout);

  if (code === 0) {
    return;
  }

  const stdout = Buffer.concat(stdoutChunks).toString("utf-8");
  const stderr = Buffer.concat(stderrChunks).toString("utf-8");
  const status =
    signal === null ? `failed with ${String(code)}` : `failed with ${signal}`;

  throw new Error(
    `${command} ${args.join(" ")} ${status}\n${stdout}\n${stderr}`
  );
};

const listFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true }).catch(
    () => []
  );
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(await listFiles(entryPath));
    } else {
      files.push([entryPath]);
    }
  }

  return files.flat();
};

const installItem = async (item) => {
  console.log(`Installing ${item.name}`);
  await run("bunx", [
    "shadcn@latest",
    "add",
    `@foldkit-cn/${item.name}`,
    "--cwd",
    tempDir,
    "--yes",
    "--overwrite",
    "--silent",
  ]);
};

await run("bun", ["scripts/build-registry.mjs", "--check"]);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

const server = createServer((request, response) => {
  const requestUrl = new URL(request.url ?? "/", "http://localhost");
  const pathname = decodeURIComponent(requestUrl.pathname);
  const resolvedPath = path.resolve(
    publicDir,
    pathname === "/" ? "index.html" : pathname.slice(1)
  );

  if (!resolvedPath.startsWith(publicDir)) {
    response.writeHead(403).end("Forbidden");
    return;
  }

  const stream = createReadStream(resolvedPath);
  const extension = path.extname(resolvedPath);

  stream.on("open", () => {
    response.writeHead(200, {
      "content-type": contentTypes[extension] ?? "application/octet-stream",
    });
    stream.pipe(response);
  });
  stream.on("error", () => {
    response.writeHead(404).end("Not found");
  });
});

server.listen(0, "127.0.0.1");
await once(server, "listening");

const serverAddress = server.address();

if (serverAddress === null || typeof serverAddress === "string") {
  throw new Error("Unable to start local registry server");
}

const registryBaseUrl = `http://127.0.0.1:${serverAddress.port}/r`;
const componentsJson = JSON.parse(
  await readFile(
    path.join(rootDir, "registry/templates/components.json"),
    "utf-8"
  )
);

componentsJson.registries["@foldkit-cn"] = `${registryBaseUrl}/{name}.json`;

const packageJson = {
  private: true,
  type: "module",
  dependencies: Object.fromEntries(
    ["effect", "embla-carousel", "foldkit"]
      .filter((name) => rootPackageJson.dependencies?.[name] !== undefined)
      .map((name) => [name, rootPackageJson.dependencies[name]])
  ),
  devDependencies: Object.fromEntries(
    ["typescript", "vitest"]
      .filter((name) => rootPackageJson.devDependencies?.[name] !== undefined)
      .map((name) => [name, rootPackageJson.devDependencies[name]])
  ),
};

try {
  await writeFile(
    path.join(tempDir, "components.json"),
    `${JSON.stringify(componentsJson, null, 2)}\n`
  );
  await writeFile(
    path.join(tempDir, "package.json"),
    `${JSON.stringify(packageJson, null, 2)}\n`
  );
  await writeFile(
    path.join(tempDir, "tsconfig.json"),
    `${JSON.stringify(
      {
        compilerOptions: {
          target: "ES2022",
          module: "ESNext",
          moduleResolution: "bundler",
          lib: ["ES2022", "DOM"],
          strict: true,
          noUncheckedIndexedAccess: true,
          exactOptionalPropertyTypes: true,
          isolatedModules: true,
          skipLibCheck: true,
          esModuleInterop: true,
          ignoreDeprecations: "6.0",
          jsx: "preserve",
          noEmit: true,
          baseUrl: ".",
          paths: {
            "@/*": ["*"],
            "src/*": ["src/*"],
          },
        },
        include: ["src/**/*.ts"],
      },
      null,
      2
    )}\n`
  );
  await mkdir(path.join(tempDir, "src"), { recursive: true });
  const installedItems = [...uiItems];
  const installedItemNames = new Set(uiItems.map((item) => item.name));

  for (const item of uiItems) {
    await installItem(item);
  }

  const installedSourceFiles = await listFiles(path.join(tempDir, "src"));
  const referencedExampleNames = new Set();

  for (const filePath of installedSourceFiles) {
    if (!/\.[cm]?[tj]sx?$/u.test(filePath)) {
      continue;
    }

    const fileContent = await readFile(filePath, "utf-8");

    for (const match of fileContent.matchAll(
      /from\s+["']\.\.\/\.\.\/examples\/([^/"']+)\/main["']/gu
    )) {
      referencedExampleNames.add(match[1]);
    }
  }

  for (const exampleName of [...referencedExampleNames].toSorted()) {
    if (installedItemNames.has(exampleName)) {
      continue;
    }

    const exampleItem = registryItemsByName.get(exampleName);

    if (exampleItem === undefined) {
      throw new Error(
        `Installed UI source references missing registry example ${exampleName}`
      );
    }

    await installItem(exampleItem);
    installedItems.push(exampleItem);
    installedItemNames.add(exampleName);
  }

  const expectedFiles = installedItems.flatMap((item) =>
    (item.files ?? []).map((file) =>
      (file.target ?? file.path).replace(/^registry\/default\//u, "src/")
    )
  );
  const missingFiles = [];

  for (const filePath of expectedFiles) {
    try {
      await readFile(path.join(tempDir, filePath), "utf-8");
    } catch {
      missingFiles.push(filePath);
    }
  }

  if (missingFiles.length > 0) {
    throw new Error(
      `Installed project is missing expected file(s):\n${missingFiles.join("\n")}`
    );
  }

  await run("bunx", ["tsc", "--noEmit", "--project", "tsconfig.json"], tempDir);

  console.log(
    `Install-all smoke passed for ${uiItems.length} registry UI components and ${installedItems.length - uiItems.length} referenced examples`
  );
} finally {
  server.close();
  await once(server, "close");

  if (keepTempDir) {
    console.log(`Kept install smoke temp project at ${tempDir}`);
  } else {
    await rm(tempDir, { force: true, recursive: true });
  }
}
