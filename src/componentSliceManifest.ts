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
      `Create registry/default/ui/${name}/index.ts`,
      `Create registry/default/ui/${name}/view.ts`,
      `Create focused scene tests for ${name}`,
      `Create at least one example under registry/default/examples/${name}-basic`,
      "Add registry/default/items.json metadata",
      "Run registry generation for apps/docs/public/components.json and apps/docs/public/r/*.json",
      "Add docs metadata and a docs page route",
      "Run install smoke compatibility before review",
    ],
  };
};

export const createScaffoldPlan = (
  input: SliceManifestInput
): ScaffoldPlan => {
  const manifest = createSliceManifest(input);
  const basicExample = manifest.examples[0] ?? `${manifest.name}-basic`;

  return {
    manifest,
    files: [
      {
        path: `registry/default/ui/${manifest.name}/index.ts`,
        purpose: "public component exports",
        mode: "create",
      },
      {
        path: `registry/default/ui/${manifest.name}/view.ts`,
        purpose: "minimal TODO-marked view helpers",
        mode: "create",
      },
      {
        path: `registry/default/ui/${manifest.name}/${manifest.name}.scene.test.ts`,
        purpose: "focused component scene coverage",
        mode: "create",
      },
      {
        path: `registry/default/examples/${basicExample}/main.ts`,
        purpose: "basic example program",
        mode: "create",
      },
      {
        path: `registry/default/examples/${basicExample}/entry.ts`,
        purpose: "standalone example runtime entry",
        mode: "create",
      },
      {
        path: `registry/default/examples/${basicExample}/index.html`,
        purpose: "standalone example HTML shell",
        mode: "create",
      },
      {
        path: `registry/default/examples/${basicExample}/${basicExample}.scene.test.ts`,
        purpose: "basic example scene coverage",
        mode: "create",
      },
      {
        path: "registry/default/items.json",
        purpose: "registry metadata entry",
        mode: "update",
      },
      {
        path: `apps/docs/public/r/${manifest.name}.json`,
        purpose: "generated registry item after bun run build:registry",
        mode: "generated",
      },
    ],
    validationCommands,
    sceneTestGuidance: `Add scene coverage for registry/default/ui/${manifest.name} and registry/default/examples/${basicExample} before review.`,
  };
};
