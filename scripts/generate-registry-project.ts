import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

import { NodeServices } from "@effect/platform-node";
import { Effect } from "effect";
import { Argument, Command, Flag } from "effect/unstable/cli";

const cliVersion = "0.1.0";
const templateRoot = path.join(
  import.meta.dirname,
  "templates/registry-project"
);

type GenerateConfig = Readonly<{
  targetPath: string;
  name: string;
  homepage: string;
  registryBaseUrl: string;
  force: boolean;
}>;

type TemplateFile = Readonly<{
  sourcePath: string;
  targetPath: string;
}>;

type RegistryConfig = Readonly<{
  name: string;
  homepage: string;
  registryBaseUrl: string;
}>;

type RegistryFile = Readonly<{
  path: string;
  target: string;
  type?: string;
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
  meta?: unknown;
}>;

type PublicRegistryFile = RegistryFile &
  Readonly<{
    type: string;
    content: string;
  }>;

type PublicRegistryItem = Omit<RegistryItem, "files"> &
  Readonly<{
    $schema: string;
    files: ReadonlyArray<PublicRegistryFile>;
  }>;

const stableJson = (value: unknown): string =>
  `${JSON.stringify(value, null, 2)}\n`;

const readJson = async <A>(filePath: string): Promise<A> =>
  JSON.parse(await readFile(filePath, "utf-8")) as A;

const readSourceRegistryItems = async (
  targetPath: string,
  registryPath = "registry/registry.json"
): Promise<ReadonlyArray<RegistryItem>> => {
  const registry = await readJson<{
    include?: ReadonlyArray<string>;
    items?: ReadonlyArray<RegistryItem>;
  }>(path.join(targetPath, registryPath));
  const includeItems = await Promise.all(
    (registry.include ?? []).map((includePath) =>
      readSourceRegistryItems(targetPath, includePath)
    )
  );

  return [...(registry.items ?? []), ...includeItems.flat()];
};

const validateRequired = (label: string, value: string): string => {
  const trimmed = value.trim();

  if (trimmed === "") {
    throw new Error(`${label} is required.`);
  }

  return trimmed;
};

const validateUrl = (label: string, value: string): string => {
  const trimmed = validateRequired(label, value);

  try {
    new URL(trimmed);
  } catch {
    throw new Error(`${label} must be a valid URL.`);
  }

  return trimmed;
};

const validateConfig = (config: GenerateConfig): GenerateConfig => ({
  targetPath: path.resolve(config.targetPath),
  name: validateRequired("Project name", config.name),
  homepage: validateUrl("Homepage", config.homepage),
  registryBaseUrl: validateUrl("Registry base URL", config.registryBaseUrl),
  force: config.force,
});

const isDirectory = async (directoryPath: string): Promise<boolean> => {
  try {
    return (await stat(directoryPath)).isDirectory();
  } catch {
    return false;
  }
};

const ensureWritableTarget = async (
  targetPath: string,
  force: boolean
): Promise<void> => {
  if (!(await isDirectory(targetPath))) {
    await mkdir(targetPath, { recursive: true });

    return;
  }

  const entries = await readdir(targetPath);

  if (entries.length > 0 && !force) {
    throw new Error(
      `Target directory is not empty: ${targetPath}. Re-run with --force to overwrite template-owned files.`
    );
  }
};

const renderedTargetPath = (relativePath: string): string =>
  relativePath.endsWith(".template")
    ? relativePath.slice(0, -".template".length)
    : relativePath;

const collectTemplateFiles = async (
  directoryPath: string,
  relativeBase = ""
): Promise<ReadonlyArray<TemplateFile>> => {
  const entries = await readdir(directoryPath, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const relativePath = path.join(relativeBase, entry.name);
      const absolutePath = path.join(directoryPath, entry.name);

      if (entry.isDirectory()) {
        return collectTemplateFiles(absolutePath, relativePath);
      }

      return [
        {
          sourcePath: absolutePath,
          targetPath: renderedTargetPath(relativePath),
        },
      ];
    })
  );

  return nested.flat().toSorted((left, right) =>
    left.targetPath.localeCompare(right.targetPath)
  );
};

const renderTemplate = (content: string, config: GenerateConfig): string =>
  content
    .replaceAll("{{projectName}}", config.name)
    .replaceAll("{{homepage}}", config.homepage)
    .replaceAll("{{registryBaseUrl}}", config.registryBaseUrl)
    .replaceAll("{{registryBaseUrlToken}}", "{{registryBaseUrl}}");

const writeTemplateFile = async (
  config: GenerateConfig,
  templateFile: TemplateFile
): Promise<void> => {
  const targetPath = path.join(config.targetPath, templateFile.targetPath);
  const content = renderTemplate(
    await readFile(templateFile.sourcePath, "utf-8"),
    config
  );

  await mkdir(path.dirname(targetPath), { recursive: true });
  await writeFile(targetPath, content);
};

const writeGeneratedMetadata = async (config: GenerateConfig): Promise<void> => {
  await writeFile(
    path.join(config.targetPath, ".foldkit-cn-project.json"),
    stableJson({
      name: config.name,
      homepage: config.homepage,
      registryBaseUrl: config.registryBaseUrl,
      template: "custom-registry-project",
      version: cliVersion,
    })
  );
};

const expandRegistryItem = async (
  targetPath: string,
  sourceItemNames: ReadonlySet<string>,
  item: RegistryItem
): Promise<PublicRegistryItem> => {
  const files = await Promise.all(
    item.files.map(async (file) => ({
      ...file,
      type: file.type ?? item.type,
      content: await readFile(path.join(targetPath, file.path), "utf-8"),
    }))
  );

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    ...item,
    registryDependencies: item.registryDependencies.map((dependency) =>
      sourceItemNames.has(dependency) ? `@custom/${dependency}` : dependency
    ),
    files,
  };
};

const buildGeneratedRegistry = async (targetPath: string): Promise<void> => {
  const config = await readJson<RegistryConfig>(
    path.join(targetPath, "registry/config.json")
  );
  const sourceItems = await readSourceRegistryItems(targetPath);
  const sourceItemNames = new Set(sourceItems.map((item) => item.name));
  const items = await Promise.all(
    sourceItems.map((item) =>
      expandRegistryItem(targetPath, sourceItemNames, item)
    )
  );
  const componentsTemplate = await readFile(
    path.join(targetPath, "registry/templates/components.json"),
    "utf-8"
  );
  const publicDir = path.join(targetPath, "apps/docs/public");

  await mkdir(publicDir, { recursive: true });
  await writeFile(
    path.join(targetPath, "apps/docs/public/components.json"),
    componentsTemplate.replaceAll("{{registryBaseUrl}}", config.registryBaseUrl)
  );
  await writeFile(
    path.join(publicDir, "registry.json"),
    stableJson({
      $schema: "https://ui.shadcn.com/schema/registry.json",
      name: config.name,
      homepage: config.homepage,
      items: items.map((item) => ({
        name: item.name,
        type: item.type,
        title: item.title,
        description: item.description,
        dependencies: item.dependencies,
        devDependencies: item.devDependencies,
        registryDependencies: item.registryDependencies,
        files: item.files.map(({ content: _content, ...file }) => file),
        meta: item.meta,
      })),
    })
  );

  await Promise.all(
    items.map((item) =>
      writeFile(path.join(publicDir, `${item.name}.json`), stableJson(item))
    )
  );
};

const generateProject = async (input: GenerateConfig): Promise<void> => {
  const config = validateConfig(input);
  const templateFiles = await collectTemplateFiles(templateRoot);

  await ensureWritableTarget(config.targetPath, config.force);
  await Promise.all(
    templateFiles.map((templateFile) => writeTemplateFile(config, templateFile))
  );
  await writeGeneratedMetadata(config);
  await buildGeneratedRegistry(config.targetPath);

  console.log("Generated Foldkit CN custom registry project");
  console.log(`Target: ${config.targetPath}`);
  console.log(`Name: ${config.name}`);
  console.log(`Homepage: ${config.homepage}`);
  console.log(`Registry base URL: ${config.registryBaseUrl}`);
  console.log("");
  console.log("Next validation commands:");
  console.log("bun install");
  console.log("bun run build:registry");
  console.log("bun run check:registry");
  console.log("bun run typecheck");
  console.log("bun run build");
};

export const generateRegistryProjectCommand = Command.make(
  "generate-registry-project",
  {
    targetPath: Argument.string("path").pipe(
      Argument.withDescription("Target directory for the generated project.")
    ),
    name: Flag.string("name").pipe(
      Flag.withDescription("Project package and registry name.")
    ),
    homepage: Flag.string("homepage").pipe(
      Flag.withDescription("Public docs homepage URL.")
    ),
    registryBaseUrl: Flag.string("registry-base-url").pipe(
      Flag.withDescription("Base URL that serves generated registry items.")
    ),
    force: Flag.boolean("force").pipe(
      Flag.withDescription(
        "Overwrite template-owned files when the target directory is not empty."
      )
    ),
  },
  (config) => Effect.promise(() => generateProject(config))
).pipe(
  Command.withDescription("Generate a minimal Foldkit CN registry project."),
  Command.withExamples([
    {
      command:
        "generate-registry-project /tmp/acme-registry --name acme-foldkit-cn --homepage https://example.com/acme --registry-base-url https://example.com/acme",
      description: "Generate a custom registry project in a temp directory.",
    },
  ])
);

export const runGenerateRegistryProjectCli = (args: ReadonlyArray<string>) =>
  Command.runWith(generateRegistryProjectCommand, { version: cliVersion })(args);

export const runGenerateRegistryProjectCliMain = (
  args: ReadonlyArray<string>
) => runGenerateRegistryProjectCli(args).pipe(Effect.provide(NodeServices.layer));

const runMain = async (args: ReadonlyArray<string>): Promise<void> => {
  try {
    await Effect.runPromise(runGenerateRegistryProjectCliMain(args));
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
