import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { NodeServices } from "@effect/platform-node";
import { Array, Effect, Option } from "effect";
import { Argument, Command, Flag } from "effect/unstable/cli";

import {
  createScaffoldPlan,
  parseSliceOrigin,
  type ScaffoldPlan,
  type SliceOrigin,
  sliceOrigins,
} from "../src/componentSliceManifest";
import { writeScaffoldSkeleton } from "./scaffold-component-slice";

const cliVersion = "0.1.0";
const defaultRootDir = path.resolve(import.meta.dirname, "..");

export type TrustedRegistryId = "foldkit-cn" | "shadcn" | "local-file";

type TrustedRegistry = Readonly<{
  id: TrustedRegistryId;
  description: string;
  urlPrefixes: ReadonlyArray<string>;
  aliasUrl?: (name: string, rootDir: string) => string;
}>;

export type ImportedRegistryFile = Readonly<{
  path: string;
  target?: string;
  type?: string;
  content?: string;
}>;

export type ImportedRegistryItem = Readonly<{
  name: string;
  type: string;
  title?: string;
  description?: string;
  dependencies: ReadonlyArray<string>;
  devDependencies: ReadonlyArray<string>;
  registryDependencies: ReadonlyArray<string>;
  files: ReadonlyArray<ImportedRegistryFile>;
  meta?: unknown;
}>;

type RawRegistryItem = Readonly<{
  name?: unknown;
  type?: unknown;
  title?: unknown;
  description?: unknown;
  dependencies?: unknown;
  devDependencies?: unknown;
  registryDependencies?: unknown;
  files?: unknown;
  meta?: unknown;
}>;

type SourceContext = Readonly<{
  registry: TrustedRegistry;
  source: string;
  sourceUrl: URL;
}>;

export type CustomClonePlan = Readonly<{
  source: string;
  registry: TrustedRegistryId;
  item: ImportedRegistryItem;
  scaffoldPlan: ScaffoldPlan;
  candidateRoot: string;
  scaffoldRoot: string;
  referenceRoot: string;
  referenceFiles: ReadonlyArray<
    Readonly<{ sourcePath: string; targetPath: string }>
  >;
}>;

export type LikenessSnapshot = Readonly<{
  exampleNames: ReadonlyArray<string>;
  accessibleText: ReadonlyArray<string>;
  roles: ReadonlyArray<string>;
  states: ReadonlyArray<string>;
  targetFileNames: ReadonlyArray<string>;
}>;

export type LikenessScore = Readonly<{
  score: number;
  advisory: true;
  checks: ReadonlyArray<
    Readonly<{
      name: string;
      score: number;
      matched: ReadonlyArray<string>;
      missing: ReadonlyArray<string>;
      extra: ReadonlyArray<string>;
    }>
  >;
}>;

const trustedRegistries: ReadonlyArray<TrustedRegistry> = [
  {
    id: "foldkit-cn",
    description: "Generated Foldkit CN public registry items from this repo.",
    urlPrefixes: ["https://bearing-ward.github.io/foldkit-basic-cn-ui/"],
    aliasUrl: (name, rootDir) =>
      pathToFileUrl(path.join(rootDir, "apps/docs/public", `${name}.json`)),
  },
  {
    id: "shadcn",
    description: "Official shadcn registry item JSON.",
    urlPrefixes: [`https://ui.shadcn.com${"/"}r${"/"}`],
    aliasUrl: (name) => `https://ui.shadcn.com${"/"}r${"/"}${name}.json`,
  },
  {
    id: "local-file",
    description: "Operator-provided local review fixture exported to file://.",
    urlPrefixes: ["file:"],
  },
];

const pathToFileUrl = (filePath: string): string =>
  new URL(`file://${path.resolve(filePath)}`).href;

const optionalValue = <A>(maybeValue: Option.Option<A>): A | undefined =>
  Option.match(maybeValue, {
    onNone: () => undefined,
    onSome: (value) => value,
  });

const getTrustedRegistry = (id: TrustedRegistryId): TrustedRegistry => {
  const registry = trustedRegistries.find((candidate) => candidate.id === id);

  if (registry === undefined) {
    throw new Error(`Unsupported trusted registry: ${id}`);
  }

  return registry;
};

const isUrl = (value: string): boolean => {
  try {
    new URL(value);

    return true;
  } catch {
    return false;
  }
};

const aliasParts = (
  value: string
): Readonly<{ registryId: TrustedRegistryId; name: string }> | undefined => {
  if (isUrl(value)) {
    return undefined;
  }

  const separatorIndex = value.indexOf(":");

  if (separatorIndex < 1) {
    return undefined;
  }

  const registryId = value.slice(0, separatorIndex);
  const name = value.slice(separatorIndex + 1);

  if (
    registryId !== "foldkit-cn" &&
    registryId !== "shadcn" &&
    registryId !== "local-file"
  ) {
    throw new Error(`Unknown trusted registry alias: ${registryId}`);
  }

  if (name.trim() === "") {
    throw new Error("Trusted registry alias must include an item name.");
  }

  return { registryId, name };
};

export const validateSourceForTrustedRegistry = (
  registry: TrustedRegistry,
  sourceUrl: URL
): void => {
  const source = sourceUrl.href;
  const allowed = registry.urlPrefixes.some((prefix) =>
    prefix === "file:"
      ? sourceUrl.protocol === "file:"
      : source.startsWith(prefix)
  );

  if (!allowed) {
    throw new Error(
      `Source URL is not allowlisted for trusted registry ${registry.id}: ${source}`
    );
  }
};

const resolveSourceContext = (
  source: string,
  registryId: TrustedRegistryId,
  rootDir: string
): SourceContext => {
  const maybeAlias = aliasParts(source);
  const registry =
    maybeAlias === undefined
      ? getTrustedRegistry(registryId)
      : getTrustedRegistry(maybeAlias.registryId);

  const resolvedSource =
    maybeAlias === undefined
      ? source
      : (registry.aliasUrl?.(maybeAlias.name, rootDir) ??
        (() => {
          throw new Error(
            `Trusted registry ${registry.id} does not support aliases.`
          );
        })());
  const sourceUrl = new URL(resolvedSource);

  validateSourceForTrustedRegistry(registry, sourceUrl);

  return {
    registry,
    source,
    sourceUrl,
  };
};

const readUrlText = async (url: URL): Promise<string> => {
  if (url.protocol === "file:") {
    return readFile(fileURLToPath(url), "utf-8");
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url.href}: ${response.status}`);
  }

  return response.text();
};

const stringArray = (label: string, value: unknown): ReadonlyArray<string> => {
  if (value === undefined) {
    return [];
  }

  if (
    !Array.isArray(value) ||
    !value.every((item) => typeof item === "string")
  ) {
    throw new Error(`${label} must be an array of strings.`);
  }

  return value;
};

const normalizeRegistryFile = (value: unknown): ImportedRegistryFile => {
  if (typeof value !== "object" || value === null) {
    throw new Error("Registry files must be objects.");
  }

  const file = value as ImportedRegistryFile;

  if (typeof file.path !== "string" || file.path.trim() === "") {
    throw new Error("Registry file path is required.");
  }

  if (file.target !== undefined && typeof file.target !== "string") {
    throw new Error(`Registry file target must be a string: ${file.path}`);
  }

  if (file.type !== undefined && typeof file.type !== "string") {
    throw new Error(`Registry file type must be a string: ${file.path}`);
  }

  if (file.content !== undefined && typeof file.content !== "string") {
    throw new Error(`Registry file content must be a string: ${file.path}`);
  }

  return {
    path: file.path,
    target: file.target,
    type: file.type,
    content: file.content,
  };
};

const normalizeRegistryItem = (value: unknown): ImportedRegistryItem => {
  if (typeof value !== "object" || value === null) {
    throw new Error("Registry item JSON must be an object.");
  }

  const item = value as RawRegistryItem;

  if (typeof item.name !== "string" || item.name.trim() === "") {
    throw new Error("Registry item name is required.");
  }

  if (item.type !== undefined && typeof item.type !== "string") {
    throw new Error("Registry item type must be a string.");
  }

  if (item.files !== undefined && !Array.isArray(item.files)) {
    throw new Error("Registry item files must be an array.");
  }

  return {
    name: item.name,
    type: typeof item.type === "string" ? item.type : "registry:ui",
    title: typeof item.title === "string" ? item.title : undefined,
    description:
      typeof item.description === "string" ? item.description : undefined,
    dependencies: stringArray("dependencies", item.dependencies),
    devDependencies: stringArray("devDependencies", item.devDependencies),
    registryDependencies: stringArray(
      "registryDependencies",
      item.registryDependencies
    ),
    files: (item.files ?? []).map(normalizeRegistryFile),
    meta: item.meta,
  };
};

const readRegistryItem = async (
  context: SourceContext
): Promise<ImportedRegistryItem> =>
  normalizeRegistryItem(JSON.parse(await readUrlText(context.sourceUrl)));

const safeRelativePath = (label: string, value: string): string => {
  const normalized = path.normalize(value);

  if (
    path.isAbsolute(value) ||
    normalized.startsWith("..") ||
    normalized === "."
  ) {
    throw new Error(`Unsafe ${label} path: ${value}`);
  }

  return normalized;
};

const candidateRootPath = (rootDir: string, name: string): string =>
  path.join(rootDir, "registry/candidates/custom-clone", name);

const referenceFilePath = (
  referenceRoot: string,
  file: ImportedRegistryFile
): string => {
  const sourcePath = safeRelativePath("registry file", file.path);

  return path.join(referenceRoot, "files", sourcePath);
};

export const createCustomClonePlan = (
  input: Readonly<{
    rootDir: string;
    source: string;
    registry: TrustedRegistryId;
    item: ImportedRegistryItem;
    origin: SliceOrigin;
    name: string;
    primitiveName: string;
  }>
): CustomClonePlan => {
  const scaffoldPlan = createScaffoldPlan({
    origin: input.origin,
    name: input.name,
    primitiveName: input.primitiveName,
  });
  const candidateRoot = candidateRootPath(
    input.rootDir,
    scaffoldPlan.manifest.name
  );
  const referenceRoot = path.join(candidateRoot, "reference");
  const scaffoldRoot = path.join(candidateRoot, "candidate-slice");

  return {
    source: input.source,
    registry: input.registry,
    item: input.item,
    scaffoldPlan,
    candidateRoot,
    scaffoldRoot,
    referenceRoot,
    referenceFiles: input.item.files.map((file) => ({
      sourcePath: file.path,
      targetPath: referenceFilePath(referenceRoot, file),
    })),
  };
};

const resolveFileContent = async (
  context: SourceContext,
  file: ImportedRegistryFile
): Promise<string> => {
  if (file.content !== undefined) {
    return file.content;
  }

  const safePath = safeRelativePath("registry file", file.path);
  const fileUrl =
    context.sourceUrl.protocol === "file:"
      ? new URL(
          pathToFileUrl(
            path.join(path.dirname(fileURLToPath(context.sourceUrl)), safePath)
          )
        )
      : new URL(safePath, context.sourceUrl);

  validateSourceForTrustedRegistry(context.registry, fileUrl);

  return readUrlText(fileUrl);
};

const stableJson = (value: unknown): string =>
  `${JSON.stringify(value, null, 2)}\n`;

const writeImportedReference = async (
  context: SourceContext,
  plan: CustomClonePlan
): Promise<void> => {
  await mkdir(plan.referenceRoot, { recursive: true });
  await writeFile(
    path.join(plan.referenceRoot, "origin-item.json"),
    stableJson(plan.item)
  );
  await Promise.all(
    plan.item.files.map(async (file) => {
      const targetPath = referenceFilePath(plan.referenceRoot, file);

      await mkdir(path.dirname(targetPath), { recursive: true });
      await writeFile(targetPath, await resolveFileContent(context, file));
    })
  );
};

const writeCandidateReadme = async (plan: CustomClonePlan): Promise<void> => {
  await writeFile(
    path.join(plan.candidateRoot, "README.md"),
    [
      `# ${plan.scaffoldPlan.manifest.publicName} Custom-Clone Candidate`,
      "",
      "This directory is reference material and TODO scaffold output for review.",
      `It is not reviewed Foldkit CN source and must not be added to registry/${plan.scaffoldPlan.manifest.origin}/registry.json until the normal registry slice contract is complete.`,
      "",
      `Trusted registry: ${plan.registry}`,
      `Source: ${plan.source}`,
      `Imported item: ${plan.item.name}`,
      "",
      "Reference files live under reference/files.",
      `Candidate scaffold files live under candidate-slice/registry/${plan.scaffoldPlan.manifest.origin}.`,
      "Never execute imported code during review.",
      "",
    ].join("\n")
  );
};

const writeCandidate = async (
  context: SourceContext,
  plan: CustomClonePlan
): Promise<void> => {
  await mkdir(plan.candidateRoot, { recursive: true });
  await writeImportedReference(context, plan);
  await writeScaffoldSkeleton(plan.scaffoldRoot, plan.scaffoldPlan);
  await writeCandidateReadme(plan);
};

const formatList = (values: ReadonlyArray<string>): string =>
  Array.match(values, {
    onEmpty: () => "- none",
    onNonEmpty: (items) => items.map((item) => `- ${item}`).join("\n"),
  });

const printCustomClonePlan = (
  plan: CustomClonePlan,
  writeMode: boolean
): void => {
  console.log(
    writeMode
      ? "Custom-clone spin-out write plan"
      : "Custom-clone spin-out dry run"
  );
  console.log(`Trusted registry: ${plan.registry}`);
  console.log(`Source: ${plan.source}`);
  console.log(`Imported item: ${plan.item.name}`);
  console.log(`Candidate name: ${plan.scaffoldPlan.manifest.name}`);
  console.log(
    `Candidate root: ${path.relative(defaultRootDir, plan.candidateRoot)}`
  );
  console.log(
    `Scaffold root: ${path.relative(defaultRootDir, plan.scaffoldRoot)}`
  );
  console.log("");
  console.log("Item metadata:");
  console.log(`- type: ${plan.item.type}`);
  console.log(`- title: ${plan.item.title ?? "-"}`);
  console.log(`- description: ${plan.item.description ?? "-"}`);
  console.log("");
  console.log("Dependencies:");
  console.log(formatList(plan.item.dependencies));
  console.log("");
  console.log("Registry dependencies:");
  console.log(formatList(plan.item.registryDependencies));
  console.log("");
  console.log("Imported files:");
  console.log(
    Array.match(plan.item.files, {
      onEmpty: () => "- none",
      onNonEmpty: (files) =>
        files
          .map(
            (file) => `- ${file.path} -> ${file.target ?? "(reference only)"}`
          )
          .join("\n"),
    })
  );
  console.log("");
  console.log("Candidate scaffold files:");
  console.log(
    plan.scaffoldPlan.files
      .map((file) => `- ${file.mode}: ${file.path} (${file.purpose})`)
      .join("\n")
  );
  console.log("");
  console.log("Likeness inputs:");
  console.log(
    [
      `- example names: ${plan.scaffoldPlan.manifest.examples.join(", ")}`,
      "- accessible text: provide deterministic snapshot JSON",
      "- roles: provide deterministic snapshot JSON",
      "- states: provide deterministic snapshot JSON",
      `- target file names: ${plan.item.files
        .map((file) => path.basename(file.target ?? file.path))
        .join(", ")}`,
    ].join("\n")
  );
  console.log("");
  console.log(
    `Review gate: imported source is reference material only; complete the normal registry slice contract before adding it to registry/${plan.scaffoldPlan.manifest.origin}/registry.json.`
  );

  if (!writeMode) {
    console.log("");
    console.log(
      "Dry run only. Re-run with --write to create isolated candidate files."
    );
  }
};

const uniqueSorted = (values: ReadonlyArray<string>): ReadonlyArray<string> =>
  [
    ...new Set(
      values.map((value) => value.trim()).filter((value) => value !== "")
    ),
  ].toSorted((left, right) => left.localeCompare(right));

const scoreSet = (
  name: string,
  referenceValues: ReadonlyArray<string>,
  candidateValues: ReadonlyArray<string>
): LikenessScore["checks"][number] => {
  const reference = uniqueSorted(referenceValues);
  const candidate = uniqueSorted(candidateValues);
  const matched = reference.filter((value) => candidate.includes(value));
  const missing = reference.filter((value) => !candidate.includes(value));
  const extra = candidate.filter((value) => !reference.includes(value));
  const denominator = Math.max(reference.length, candidate.length, 1);

  return {
    name,
    score: Math.round((matched.length / denominator) * 100),
    matched,
    missing,
    extra,
  };
};

export const scoreLikeness = (
  reference: LikenessSnapshot,
  candidate: LikenessSnapshot
): LikenessScore => {
  const checks: LikenessScore["checks"] = [
    scoreSet("example names", reference.exampleNames, candidate.exampleNames),
    scoreSet(
      "accessible text",
      reference.accessibleText,
      candidate.accessibleText
    ),
    scoreSet("roles", reference.roles, candidate.roles),
    scoreSet("states", reference.states, candidate.states),
    scoreSet(
      "target file names",
      reference.targetFileNames,
      candidate.targetFileNames
    ),
  ];
  const score = Math.round(
    checks.reduce((sum, check) => sum + check.score, 0) / checks.length
  );

  return {
    score,
    advisory: true,
    checks,
  };
};

const readSnapshot = async (filePath: string): Promise<LikenessSnapshot> =>
  JSON.parse(await readFile(filePath, "utf-8")) as LikenessSnapshot;

const printLikenessScore = (score: LikenessScore): void => {
  console.log("Custom-clone likeness advisory score");
  console.log(`Score: ${score.score}`);
  console.log(
    "Gate: advisory only; human review and the normal slice contract remain required."
  );
  console.log("");
  console.log("Checks:");
  console.log(
    score.checks
      .map(
        (check) =>
          `- ${check.name}: ${check.score} (matched ${check.matched.length}, missing ${check.missing.length}, extra ${check.extra.length})`
      )
      .join("\n")
  );
};

const trustedRegistryFlag = Flag.choice("trusted-registry", [
  "foldkit-cn",
  "shadcn",
  "local-file",
] as const).pipe(
  Flag.withDefault("foldkit-cn" as const),
  Flag.withDescription("Allowlisted registry used to validate the source URL.")
);

const rootFlag = Flag.directory("root", { mustExist: true }).pipe(
  Flag.withDefault(defaultRootDir),
  Flag.withDescription("Foldkit CN repository root.")
);

const importCommand = Command.make(
  "import",
  {
    source: Argument.string("source").pipe(
      Argument.withDescription("Trusted registry item URL or alias.")
    ),
    trustedRegistry: trustedRegistryFlag,
    rootDir: rootFlag,
    name: Flag.string("name").pipe(
      Flag.optional,
      Flag.withDescription("Local candidate component name.")
    ),
    origin: Flag.choice("origin", sliceOrigins).pipe(
      Flag.withDefault("shadcn" as const),
      Flag.withDescription("Source design-system lane for the candidate.")
    ),
    primitiveName: Flag.string("primitive").pipe(
      Flag.withDefault(""),
      Flag.withDescription("Upstream primitive or component name.")
    ),
    writeMode: Flag.boolean("write").pipe(
      Flag.withDescription("Create isolated candidate files.")
    ),
  },
  (config) =>
    Effect.promise(async () => {
      const context = resolveSourceContext(
        config.source,
        config.trustedRegistry,
        config.rootDir
      );
      const item = await readRegistryItem(context);
      const plan = createCustomClonePlan({
        rootDir: config.rootDir,
        source: config.source,
        registry: context.registry.id,
        item,
        origin: parseSliceOrigin(config.origin),
        name: optionalValue(config.name) ?? item.name,
        primitiveName: config.primitiveName,
      });

      printCustomClonePlan(plan, config.writeMode);

      if (config.writeMode) {
        await writeCandidate(context, plan);
        console.log("");
        console.log("Candidate files written.");
      }
    })
).pipe(
  Command.withDescription(
    "Dry-run or explicitly write an isolated custom-clone candidate from an allowlisted registry item."
  ),
  Command.withShortDescription("Import trusted registry source.")
);

const scoreCommand = Command.make(
  "score",
  {
    reference: Argument.file("reference", { mustExist: true }).pipe(
      Argument.withDescription("Reference likeness snapshot JSON.")
    ),
    candidate: Argument.file("candidate", { mustExist: true }).pipe(
      Argument.withDescription("Candidate likeness snapshot JSON.")
    ),
  },
  (config) =>
    Effect.promise(async () => {
      printLikenessScore(
        scoreLikeness(
          await readSnapshot(config.reference),
          await readSnapshot(config.candidate)
        )
      );
    })
).pipe(
  Command.withDescription(
    "Compare deterministic reference and candidate snapshots. Scores are advisory."
  ),
  Command.withShortDescription("Score deterministic likeness snapshots.")
);

export const customCloneSpinoutCommand = Command.make(
  "custom-clone-spinout"
).pipe(
  Command.withDescription(
    "Conservative trusted-registry import and likeness workflow for custom-clone candidates."
  ),
  Command.withSubcommands([importCommand, scoreCommand])
);

export const runCustomCloneSpinoutCli = (args: ReadonlyArray<string>) =>
  Command.runWith(customCloneSpinoutCommand, { version: cliVersion })(args);

export const runCustomCloneSpinoutCliMain = (args: ReadonlyArray<string>) =>
  runCustomCloneSpinoutCli(args).pipe(Effect.provide(NodeServices.layer));

const runMain = async (args: ReadonlyArray<string>): Promise<void> => {
  try {
    await Effect.runPromise(runCustomCloneSpinoutCliMain(args));
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
