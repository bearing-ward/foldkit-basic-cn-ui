import fs from "node:fs";
import path from "node:path";

import { readSourceRegistryItemsSync } from "./registry-manifest.mjs";

const rootDir = path.resolve(import.meta.dirname, "..");

const readJson = (relativePath) =>
  JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf-8"));

const readText = (relativePath) =>
  fs.readFileSync(path.join(rootDir, relativePath), "utf-8");

const exists = (relativePath) =>
  fs.existsSync(path.join(rootDir, relativePath));

const failures = [];
const packageJson = readJson("package.json");

if (packageJson.devDependencies?.["@base-ui/react"] === undefined) {
  failures.push("package.json must include @base-ui/react in devDependencies");
}

if (
  packageJson.devDependencies?.shadcn === undefined &&
  !exists("docs/product/upstream-source-references.md")
) {
  failures.push(
    "package.json must include shadcn in devDependencies or document shadcn source URLs"
  );
}

const utilsSource = exists("src/lib/utils.ts")
  ? readText("src/lib/utils.ts")
  : "";

if (!utilsSource.includes("export const cn")) {
  failures.push("src/lib/utils.ts must export cn");
}

if (!utilsSource.includes("clsx") || !utilsSource.includes("tailwind-merge")) {
  failures.push("src/lib/utils.ts must import clsx and tailwind-merge");
}

if (!exists("registry/upstream/source-manifest.json")) {
  failures.push("registry/upstream/source-manifest.json is missing");
}

const manifest = exists("registry/upstream/source-manifest.json")
  ? readJson("registry/upstream/source-manifest.json")
  : { sources: [] };

if (!Array.isArray(manifest.sources)) {
  failures.push("registry/upstream/source-manifest.json must contain sources");
}

const sources = new Map(
  (manifest.sources ?? []).map((source) => [source.id, source])
);

for (const id of [
  "shadcn-utils",
  "shadcn-button",
  "shadcn-themes",
  "shadcn-preset-package",
  "base-ui-react-package",
  "base-ui-button-types",
]) {
  if (!sources.has(id)) {
    failures.push(`source-manifest.json is missing ${id}`);
  }
}

const shadcnButtonSource = sources.get("shadcn-button");

if (
  typeof shadcnButtonSource?.url !== "string" ||
  !shadcnButtonSource.url.includes("apps/v4/registry/new-york-v4/ui/button.tsx")
) {
  failures.push("shadcn Button source must include the upstream Button URL");
}

const baseUiPackageSource = sources.get("base-ui-react-package");
const baseUiButtonTypesSource = sources.get("base-ui-button-types");

if (
  baseUiPackageSource?.packageName !== "@base-ui/react" ||
  baseUiButtonTypesSource?.packageName !== "@base-ui/react"
) {
  failures.push(
    "Base UI source references must include @base-ui/react metadata"
  );
}

for (const source of manifest.sources ?? []) {
  if (typeof source.snapshotPath !== "string") {
    failures.push(`${source.id ?? "<unknown>"} is missing snapshotPath`);
  }

  if (typeof source.derivedContractPath !== "string") {
    failures.push(`${source.id ?? "<unknown>"} is missing derivedContractPath`);
    continue;
  }

  if (!exists(path.join("registry/upstream", source.derivedContractPath))) {
    failures.push(`${source.derivedContractPath} is missing`);
    continue;
  }

  const contract = readJson(
    path.join("registry/upstream", source.derivedContractPath)
  );

  if (
    typeof contract.upstreamSnapshotDigest !== "string" ||
    contract.upstreamSnapshotDigest.length === 0
  ) {
    failures.push(
      `${source.derivedContractPath} must declare upstreamSnapshotDigest`
    );
  }
}

const shadcnThemeSource = exists("src/openstory/shadcnTheme.ts")
  ? readText("src/openstory/shadcnTheme.ts")
  : "";

if (
  shadcnThemeSource.length > 0 &&
  !shadcnThemeSource.includes(
    "../../registry/upstream/derived/shadcn-theme.json"
  )
) {
  failures.push(
    "OpenStory shadcn theme catalog must load registry/upstream/derived/shadcn-theme.json"
  );
}

if (exists("src/preview.ts")) {
  const previewSource = readText("src/preview.ts");
  const shadcnThemeContract = exists(
    "registry/upstream/derived/shadcn-theme.json"
  )
    ? readJson("registry/upstream/derived/shadcn-theme.json")
    : {
        themes: [],
        defaultStyle: "rhea",
        defaultBaseColor: "neutral",
        defaultMode: "light",
      };
  const expectedThemeValues = [
    ...new Set(
      (shadcnThemeContract.themes ?? []).map(
        (theme) => `${theme.style}-${theme.baseColor}`
      )
    ),
  ].toSorted();
  const previewThemeValues = [
    ...previewSource.matchAll(
      /\{\s*value:\s*["']([^"']+-[^"']+)["'],\s*title:/gu
    ),
  ]
    .map((match) => match[1])
    .toSorted();
  const previewModeValues = [
    ...previewSource.matchAll(
      /\{\s*value:\s*["'](light|dark|system)["'],\s*title:/gu
    ),
  ]
    .map((match) => match[1])
    .toSorted();
  const expectedInitialGlobals = `initialGlobals: { shadcnTheme: "${shadcnThemeContract.defaultStyle}-${shadcnThemeContract.defaultBaseColor}", shadcnMode: "${shadcnThemeContract.defaultMode}" }`;

  if (
    JSON.stringify(previewThemeValues) !== JSON.stringify(expectedThemeValues)
  ) {
    failures.push(
      "src/preview.ts shadcn theme toolbar values must match derived style/base-color pairs"
    );
  }

  if (JSON.stringify(previewModeValues) !== JSON.stringify(["dark", "light"])) {
    failures.push(
      "src/preview.ts shadcn mode toolbar values must be light and dark"
    );
  }

  if (
    !previewSource.includes('title: "Toggle theme"') ||
    !previewSource.includes('action: "toggle"') ||
    !previewSource.includes('toggleValues: ["light", "dark"]')
  ) {
    failures.push(
      "src/preview.ts shadcn mode toolbar must expose a Toggle theme action"
    );
  }

  if (!previewSource.includes(expectedInitialGlobals)) {
    failures.push(
      "src/preview.ts initial shadcn globals must match the derived default style, base color, and mode"
    );
  }

  if (previewSource.includes("--primary")) {
    failures.push("src/preview.ts must not hard-code shadcn token names");
  }
}

const forbiddenImportPattern =
  /from\s+["'](?:.*repos\/|.*apps\/docs\/|@base-ui\/react|react|react-dom|radix-ui|https?:\/\/github\.com\/shadcn-ui\/ui)/u;
const installableFiles = readSourceRegistryItemsSync({ rootDir })
  .filter((item) => {
    const origin = item.meta?.foldkit?.origin;

    return (
      item.type === "registry:ui" &&
      typeof origin === "string" &&
      (origin.startsWith("https://base-ui.com/") ||
        origin.startsWith("https://ui.shadcn.com/"))
    );
  })
  .flatMap((item) => item.files ?? [])
  .map((file) => path.join(rootDir, file.path))
  .filter((filePath) => /\.(ts|tsx)$/u.test(filePath));

for (const filePath of installableFiles) {
  const relativePath = path.relative(rootDir, filePath);
  const source = fs.readFileSync(filePath, "utf-8");

  if (forbiddenImportPattern.test(source)) {
    failures.push(`${relativePath} imports a forbidden upstream runtime path`);
  }
}

if (failures.length > 0) {
  console.error("Upstream reference contract failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  "Checked upstream refs: @base-ui/react package metadata, shadcn utility source, shadcn Button source, and shadcn theme contract"
);
