import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

import { NodeServices } from "@effect/platform-node";
import { Array, Effect } from "effect";
import { Argument, Command, Flag } from "effect/unstable/cli";

const cliVersion = "0.1.0";
const defaultRootDir = path.resolve(import.meta.dirname, "..");
const registryBaseUrl = "https://bearing-ward.github.io/foldkit-basic-cn-ui/r";
const metadataPath = ".foldkit-cn/registry.json";

type RegistryFile = Readonly<{
  path: string;
  target: string;
  type?: string;
  content?: string;
}>;

type FoldkitMeta = Readonly<{
  component?: string;
  primitive?: string;
  origin?: string;
  artifact?: string;
  public?: boolean;
}>;

type RegistryItem = Readonly<{
  name: string;
  type: string;
  title?: string;
  description?: string;
  dependencies: ReadonlyArray<string>;
  devDependencies: ReadonlyArray<string>;
  registryDependencies: ReadonlyArray<string>;
  files: ReadonlyArray<RegistryFile>;
  meta?: Readonly<{
    foldkit?: FoldkitMeta;
  }>;
}>;

type InstalledFile = Readonly<{
  target: string;
  sourcePath: string;
  sourceDigest: string;
}>;

type InstalledItem = Readonly<{
  name: string;
  registryAlias: string;
  registryUrl: string;
  contentDigest: string;
  files: ReadonlyArray<InstalledFile>;
  dependencyItems: ReadonlyArray<string>;
  installedAt: string;
  cliVersion: string;
}>;

type InstallMetadata = Readonly<{
  items: ReadonlyArray<InstalledItem>;
}>;

type ResolvedItem = Readonly<{
  source: RegistryItem;
  payload: RegistryItem;
  public: boolean;
}>;

type InstallPlan = Readonly<{
  item: ResolvedItem;
  items: ReadonlyArray<ResolvedItem>;
}>;

const readJson = async <A>(filePath: string): Promise<A> =>
  JSON.parse(await readFile(filePath, "utf-8")) as A;

const sourceItemsPath = (rootDir: string): string =>
  path.join(rootDir, "registry/default/items.json");

const publicItemPath = (rootDir: string, name: string): string =>
  path.join(rootDir, "apps/docs/public/r", `${name}.json`);

const publicRegistryUrl = (name: string): string =>
  `${registryBaseUrl}/${name}.json`;

const registryAlias = (name: string): string => `@foldkit-cn/${name}`;

const digest = (value: string): string =>
  createHash("sha256").update(value).digest("hex");

const stableJson = (value: unknown): string =>
  `${JSON.stringify(value, null, 2)}\n`;

const relativePath = (rootDir: string, filePath: string): string =>
  path.relative(rootDir, filePath);

const isPublicItem = (item: RegistryItem): boolean =>
  item.meta?.foldkit?.public !== false;

const itemSummary = (item: RegistryItem): string => {
  const meta = item.meta?.foldkit;
  const origin = meta?.origin ?? "unknown";
  const artifact = meta?.artifact ?? "unknown";
  const primitive = meta?.primitive ?? "-";
  const publicLabel = isPublicItem(item) ? "yes" : "no";

  return [
    item.name,
    `type=${item.type}`,
    `origin=${origin}`,
    `artifact=${artifact}`,
    `primitive=${primitive}`,
    `public=${publicLabel}`,
  ].join(" | ");
};

export const loadSourceItems = (
  rootDir = defaultRootDir
): Promise<ReadonlyArray<RegistryItem>> => readJson(sourceItemsPath(rootDir));

const resolveItem = async (
  rootDir: string,
  name: string
): Promise<ResolvedItem> => {
  const sourceItems = await loadSourceItems(rootDir);
  const source = sourceItems.find((item) => item.name === name);

  if (source === undefined) {
    throw new Error(`Unknown registry item: ${name}`);
  }

  const payload = await readJson<RegistryItem>(publicItemPath(rootDir, name));

  return {
    source,
    payload,
    public: isPublicItem(source),
  };
};

const normalizeDependencyName = (dependency: string): string =>
  dependency.startsWith("@foldkit-cn/")
    ? dependency.slice("@foldkit-cn/".length)
    : dependency;

const localRegistryDependencies = (
  allNames: ReadonlySet<string>,
  item: RegistryItem
): ReadonlyArray<string> =>
  item.registryDependencies
    .map(normalizeDependencyName)
    .filter((dependency) => allNames.has(dependency));

const collectInstallItems = async (
  rootDir: string,
  name: string
): Promise<InstallPlan> => {
  const sourceItems = await loadSourceItems(rootDir);
  const allNames = new Set(sourceItems.map((item) => item.name));

  const collect = async (
    currentName: string,
    visited: ReadonlySet<string>
  ): Promise<ReadonlyArray<ResolvedItem>> => {
    if (visited.has(currentName)) {
      return [];
    }

    const item = await resolveItem(rootDir, currentName);
    const nextVisited = new Set([...visited, currentName]);
    const dependencies = await Promise.all(
      localRegistryDependencies(allNames, item.payload).map((dependency) =>
        collect(dependency, nextVisited)
      )
    );

    return [...dependencies.flat(), item];
  };

  const items = await collect(name, new Set());
  const item = items.find((resolved) => resolved.source.name === name);

  if (item === undefined) {
    throw new Error(`Unknown registry item: ${name}`);
  }

  return {
    item,
    items,
  };
};

const targetPath = (appRoot: string, file: RegistryFile): string => {
  const normalized = path.normalize(file.target);

  if (
    path.isAbsolute(file.target) ||
    normalized.startsWith("..") ||
    normalized === "."
  ) {
    throw new Error(`Unsafe registry target path: ${file.target}`);
  }

  return path.join(appRoot, normalized);
};

const fileExists = async (filePath: string): Promise<boolean> => {
  try {
    await stat(filePath);

    return true;
  } catch {
    return false;
  }
};

const fileDigest = async (filePath: string): Promise<string> =>
  digest(await readFile(filePath, "utf-8"));

const itemDigest = (item: RegistryItem): string => digest(stableJson(item));

const resolvePayloadContent = (
  rootDir: string,
  file: RegistryFile
): Promise<string> =>
  file.content === undefined
    ? readFile(path.join(rootDir, file.path), "utf-8")
    : Promise.resolve(file.content);

const readMetadata = async (appRoot: string): Promise<InstallMetadata> => {
  const absolutePath = path.join(appRoot, metadataPath);

  try {
    const current = await readFile(absolutePath, "utf-8");

    return JSON.parse(current) as InstallMetadata;
  } catch {
    return { items: [] };
  }
};

const writeMetadata = async (
  appRoot: string,
  metadata: InstallMetadata
): Promise<void> => {
  const absolutePath = path.join(appRoot, metadataPath);

  await mkdir(path.dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, stableJson(metadata));
};

const printList = async (rootDir: string): Promise<void> => {
  const items = await loadSourceItems(rootDir);

  console.log("Foldkit CN registry items");
  console.log(`Source: ${relativePath(rootDir, sourceItemsPath(rootDir))}`);
  console.log("");
  console.log(items.map(itemSummary).join("\n"));
};

const printInstallPlan = (
  rootDir: string,
  appRoot: string,
  plan: InstallPlan,
  execute: boolean
): void => {
  console.log(
    execute ? "Foldkit CN install execution" : "Foldkit CN install dry run"
  );
  console.log(`Name: ${plan.item.source.name}`);
  console.log(`Registry URL: ${publicRegistryUrl(plan.item.source.name)}`);
  console.log(
    `Local JSON: ${relativePath(
      rootDir,
      publicItemPath(rootDir, plan.item.source.name)
    )}`
  );
  console.log(`Target root: ${appRoot}`);
  console.log("");
  console.log("Registry dependencies:");
  console.log(
    Array.match(plan.item.payload.registryDependencies, {
      onEmpty: () => "- none",
      onNonEmpty: (dependencies) =>
        dependencies.map((dependency) => `- ${dependency}`).join("\n"),
    })
  );
  console.log("");
  console.log("Files:");
  console.log(
    plan.items
      .flatMap((item) =>
        item.payload.files.map(
          (file) => `- ${item.source.name}: ${file.target}`
        )
      )
      .join("\n")
  );

  if (!execute) {
    console.log("");
    console.log("Dry run only. Re-run with --execute to copy files.");
  }
};

const ensureNoTargetExists = async (
  appRoot: string,
  files: ReadonlyArray<RegistryFile>
): Promise<void> => {
  const fileResults = await Promise.all(
    files.map(async (file) => ({
      file,
      exists: await fileExists(targetPath(appRoot, file)),
    }))
  );
  const existing = fileResults.filter(({ exists }) => exists);

  Array.match(existing, {
    onEmpty: () => undefined,
    onNonEmpty: (existingFiles) => {
      throw new Error(
        [
          "Install would overwrite existing app-owned files:",
          ...existingFiles.map(({ file }) => `- ${file.target}`),
        ].join("\n")
      );
    },
  });
};

const installItem = async (
  rootDir: string,
  appRoot: string,
  item: ResolvedItem
): Promise<InstalledItem> => {
  await Promise.all(
    item.payload.files.map(async (file) => {
      const destination = targetPath(appRoot, file);
      const content = await resolvePayloadContent(rootDir, file);

      await mkdir(path.dirname(destination), { recursive: true });

      await (file.content === undefined
        ? copyFile(path.join(rootDir, file.path), destination)
        : writeFile(destination, content));
    })
  );

  return {
    name: item.source.name,
    registryAlias: registryAlias(item.source.name),
    registryUrl: publicRegistryUrl(item.source.name),
    contentDigest: itemDigest(item.payload),
    files: await Promise.all(
      item.payload.files.map(async (file) => ({
        target: file.target,
        sourcePath: file.path,
        sourceDigest: digest(await resolvePayloadContent(rootDir, file)),
      }))
    ),
    dependencyItems: item.payload.registryDependencies,
    installedAt: new Date().toISOString(),
    cliVersion,
  };
};

const executeInstall = async (
  rootDir: string,
  appRoot: string,
  plan: InstallPlan
): Promise<void> => {
  const files = plan.items.flatMap((item) => item.payload.files);

  await ensureNoTargetExists(appRoot, files);

  const installedItems = await Promise.all(
    plan.items.map((item) => installItem(rootDir, appRoot, item))
  );
  const currentMetadata = await readMetadata(appRoot);
  const nextMetadata: InstallMetadata = {
    items: [
      ...currentMetadata.items.filter(
        (item) =>
          !installedItems.some(
            (installedItem) => installedItem.name === item.name
          )
      ),
      ...installedItems,
    ].toSorted((left, right) => left.name.localeCompare(right.name)),
  };

  await writeMetadata(appRoot, nextMetadata);
};

const printUpdateInspect = async (
  rootDir: string,
  appRoot: string,
  name: string
): Promise<void> => {
  const metadata = await readMetadata(appRoot);
  const installed = metadata.items.find((item) => item.name === name);

  if (installed === undefined) {
    throw new Error(`No installed metadata found for ${name}`);
  }

  const resolved = await resolveItem(rootDir, name);
  const currentDigest = itemDigest(resolved.payload);
  const upstreamStatus =
    currentDigest === installed.contentDigest
      ? "matches recorded digest"
      : "differs from recorded digest";
  const localFiles = await Promise.all(
    installed.files.map(async (file) => {
      const absolutePath = path.join(appRoot, file.target);
      const exists = await fileExists(absolutePath);
      const localDigest = exists ? await fileDigest(absolutePath) : "missing";
      const status =
        exists && localDigest === file.sourceDigest
          ? "clean"
          : exists
            ? "local edits"
            : "missing";

      return `- ${file.target}: ${status}`;
    })
  );

  console.log("Foldkit CN update inspect");
  console.log(`Name: ${installed.name}`);
  console.log(`Registry URL: ${installed.registryUrl}`);
  console.log(`Installed digest: ${installed.contentDigest}`);
  console.log(`Upstream digest: ${currentDigest}`);
  console.log(`Upstream: ${upstreamStatus}`);
  console.log("");
  console.log("Installed files:");
  console.log(localFiles.join("\n"));
  console.log("");
  console.log(
    "Required action: inspect only. No files were written; choose an explicit future update mode before changing app-owned source."
  );
};

const rootFlag = Flag.directory("root", { mustExist: true }).pipe(
  Flag.withDefault(defaultRootDir),
  Flag.withDescription("Foldkit CN repository root.")
);

const appRootFlag = Flag.directory("app-root", { mustExist: true }).pipe(
  Flag.withDefault(process.cwd()),
  Flag.withDescription("Consuming app root for install or update commands.")
);

const listCommand = Command.make(
  "list",
  {
    rootDir: rootFlag,
  },
  (config) => Effect.promise(() => printList(config.rootDir))
).pipe(
  Command.withDescription("List local Foldkit CN registry items and metadata."),
  Command.withShortDescription("List registry items.")
);

const installCommand = Command.make(
  "install",
  {
    name: Argument.string("name").pipe(
      Argument.withDescription("Registry item name to install.")
    ),
    rootDir: rootFlag,
    appRoot: appRootFlag,
    dryRun: Flag.boolean("dry-run").pipe(
      Flag.withDescription("Print intended install actions without writing.")
    ),
    execute: Flag.boolean("execute").pipe(
      Flag.withDescription("Copy registry files into the consuming app.")
    ),
  },
  (config) =>
    Effect.promise(async () => {
      if (config.dryRun && config.execute) {
        throw new Error("Use either --dry-run or --execute, not both.");
      }

      const plan = await collectInstallItems(config.rootDir, config.name);

      printInstallPlan(config.rootDir, config.appRoot, plan, config.execute);

      if (config.execute) {
        await executeInstall(config.rootDir, config.appRoot, plan);
        console.log("");
        console.log("Install complete.");
      }
    })
).pipe(
  Command.withDescription(
    "Dry-run or explicitly execute a safe local registry install."
  ),
  Command.withShortDescription("Install a registry item.")
);

const updateCommand = Command.make(
  "update",
  {
    name: Argument.string("name").pipe(
      Argument.withDescription("Installed registry item name to inspect.")
    ),
    rootDir: rootFlag,
    appRoot: appRootFlag,
    inspect: Flag.boolean("inspect").pipe(
      Flag.withDescription("Inspect installed metadata and upstream drift.")
    ),
  },
  (config) =>
    Effect.promise(async () => {
      if (!config.inspect) {
        throw new Error("Update requires explicit --inspect mode.");
      }

      await printUpdateInspect(config.rootDir, config.appRoot, config.name);
    })
).pipe(
  Command.withDescription(
    "Inspect installed component metadata and upstream drift without writing files."
  ),
  Command.withShortDescription("Inspect update state.")
);

export const registryCommand = Command.make("foldkit-cn").pipe(
  Command.withDescription("Foldkit CN component registry CLI."),
  Command.withSubcommands([listCommand, installCommand, updateCommand])
);

export const runRegistryCli = (args: ReadonlyArray<string>) =>
  Command.runWith(registryCommand, { version: cliVersion })(args);

export const runRegistryCliMain = (args: ReadonlyArray<string>) =>
  runRegistryCli(args).pipe(Effect.provide(NodeServices.layer));

const runMain = async (args: ReadonlyArray<string>): Promise<void> => {
  try {
    await Effect.runPromise(runRegistryCliMain(args));
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
