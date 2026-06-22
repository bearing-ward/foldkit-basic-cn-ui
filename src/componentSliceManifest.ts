export type SliceOrigin = "foldkit" | "base-ui" | "shadcn";

export type SliceManifestInput = Readonly<{
  origin: SliceOrigin;
  name: string;
  primitiveName?: string;
}>;

export type SliceManifest = Readonly<{
  origin: SliceOrigin;
  name: string;
  publicName: string;
  artifactType: "registry:ui";
  primitiveName: string;
  examples: readonly string[];
  checklistItems: readonly string[];
}>;

export type ScaffoldFile = Readonly<{
  path: string;
  purpose: string;
  mode: "create" | "update" | "generated";
}>;

export type ScaffoldPlan = Readonly<{
  manifest: SliceManifest;
  files: readonly ScaffoldFile[];
  validationCommands: readonly string[];
  sceneTestGuidance: string;
}>;

export const sliceOrigins: readonly SliceOrigin[] = [
  "foldkit",
  "base-ui",
  "shadcn",
];

export const validationCommands: readonly string[] = [
  "bun run build:registry",
  "bun run check:registry",
  "bun run typecheck",
  "bun run test",
  "bun run build",
];

export const parseSliceOrigin = (value: string): SliceOrigin => {
  if (value === "foldkit") {
    return value;
  }

  if (value === "base-ui") {
    return value;
  }

  if (value === "shadcn") {
    return value;
  }

  throw new Error(
    `Unsupported origin "${value}". Use foldkit, base-ui, or shadcn.`
  );
};

export const slugifySliceName = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/gu, "-")
    .replace(/^-+|-+$/gu, "");

const titleize = (value: string): string =>
  value
    .split("-")
    .filter((part) => part !== "")
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join(" ");

const uiPath = (origin: SliceOrigin, name: string): string =>
  `registry/${origin}/${name}/ui`;

const examplePath = (
  origin: SliceOrigin,
  componentName: string,
  exampleName: string
): string => {
  const prefix = `${componentName}-`;
  const exampleKey = exampleName.startsWith(prefix)
    ? exampleName.slice(prefix.length)
    : exampleName;

  return `registry/${origin}/${componentName}/examples/${exampleKey}`;
};

export const createSliceManifest = (
  input: SliceManifestInput
): SliceManifest => {
  const name = slugifySliceName(input.name);

  if (name === "") {
    throw new Error("Component name is required.");
  }

  const primitiveName = input.primitiveName?.trim() ?? "";

  return {
    origin: input.origin,
    name,
    publicName: titleize(name),
    artifactType: "registry:ui",
    primitiveName,
    examples: [`${name}-basic`],
    checklistItems: [
      `Create ${uiPath(input.origin, name)}/index.ts`,
      `Create ${uiPath(input.origin, name)}/view.ts`,
      `Create focused scene tests for ${name}`,
      `Create at least one example under ${examplePath(input.origin, name, `${name}-basic`)}`,
      `Add registry/${input.origin}/registry.json metadata`,
      "Run registry generation for apps/docs/public/components.json and apps/docs/public/{name}.json",
      "Run OpenStory generation and add documentation reference coverage",
      "Run install smoke compatibility before review",
    ],
  };
};

export const createScaffoldPlan = (
  input: SliceManifestInput
): ScaffoldPlan => {
  const manifest = createSliceManifest(input);
  const basicExample = manifest.examples[0] ?? `${manifest.name}-basic`;
  const componentDir = uiPath(manifest.origin, manifest.name);
  const basicExampleDir = examplePath(
    manifest.origin,
    manifest.name,
    basicExample
  );

  return {
    manifest,
    files: [
      {
        path: `${componentDir}/index.ts`,
        purpose: "public component exports",
        mode: "create",
      },
      {
        path: `${componentDir}/view.ts`,
        purpose: "minimal TODO-marked view helpers",
        mode: "create",
      },
      {
        path: `${componentDir}/${manifest.name}.scene.test.ts`,
        purpose: "focused component scene coverage",
        mode: "create",
      },
      {
        path: `${basicExampleDir}/main.ts`,
        purpose: "basic example program",
        mode: "create",
      },
      {
        path: `${basicExampleDir}/entry.ts`,
        purpose: "standalone example runtime entry",
        mode: "create",
      },
      {
        path: `${basicExampleDir}/index.html`,
        purpose: "standalone example HTML shell",
        mode: "create",
      },
      {
        path: `${basicExampleDir}/${basicExample}.scene.test.ts`,
        purpose: "basic example scene coverage",
        mode: "create",
      },
      {
        path: `registry/${manifest.origin}/registry.json`,
        purpose: "registry metadata entry",
        mode: "update",
      },
      {
        path: `apps/docs/public/${manifest.name}.json`,
        purpose: "generated registry item after bun run build:registry",
        mode: "generated",
      },
    ],
    validationCommands,
    sceneTestGuidance: `Add scene coverage for ${componentDir} and ${basicExampleDir} before review.`,
  };
};
