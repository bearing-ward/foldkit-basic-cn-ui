import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

const rootDir = path.resolve(import.meta.dirname, "..");
const upstreamDir = path.join(rootDir, "registry/upstream");
const snapshotsDir = path.join(upstreamDir, "snapshots");
const derivedDir = path.join(upstreamDir, "derived");
const manifestPath = path.join(upstreamDir, "source-manifest.json");

const shadcnRepoApiUrl =
  "https://api.github.com/repos/shadcn-ui/ui/commits/main";
const shadcnRawBaseUrl = "https://raw.githubusercontent.com/shadcn-ui/ui";

const githubSources = [
  {
    id: "shadcn-utils",
    path: "apps/v4/lib/utils.ts",
    snapshotPath: "snapshots/shadcn/utils.ts",
    derivedPath: "derived/shadcn-utils.json",
  },
  {
    id: "shadcn-button",
    path: "apps/v4/registry/new-york-v4/ui/button.tsx",
    snapshotPath: "snapshots/shadcn/button.tsx",
    derivedPath: "derived/shadcn-button.json",
  },
  {
    id: "shadcn-themes",
    path: "apps/v4/registry/themes.ts",
    snapshotPath: "snapshots/shadcn/themes.ts",
    derivedPath: "derived/shadcn-theme.json",
  },
];

const localSources = [
  {
    id: "shadcn-preset-package",
    kind: "npm-package-file",
    packageName: "shadcn",
    packageJsonPath: "node_modules/shadcn/package.json",
    sourcePath: "node_modules/shadcn/dist/preset/index.d.ts",
    snapshotPath: "snapshots/shadcn/preset-index.d.ts",
    derivedPath: "derived/shadcn-theme.json",
  },
  {
    id: "base-ui-react-package",
    kind: "npm-package-file",
    packageName: "@base-ui/react",
    packageJsonPath: "node_modules/@base-ui/react/package.json",
    sourcePath: "node_modules/@base-ui/react/package.json",
    snapshotPath: "snapshots/base-ui/react-package.json",
    derivedPath: "derived/base-ui-button.json",
  },
  {
    id: "base-ui-button-types",
    kind: "npm-package-file",
    packageName: "@base-ui/react",
    packageJsonPath: "node_modules/@base-ui/react/package.json",
    sourcePath: "node_modules/@base-ui/react/button/index.d.ts",
    snapshotPath: "snapshots/base-ui/button-index.d.ts",
    derivedPath: "derived/base-ui-button.json",
  },
];

const requiredThemeTokens = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "border",
  "input",
  "ring",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
];

const defaultThemeTokens = {
  light: {
    background: "0 0% 100%",
    foreground: "222.2 84% 4.9%",
    card: "0 0% 100%",
    "card-foreground": "222.2 84% 4.9%",
    popover: "0 0% 100%",
    "popover-foreground": "222.2 84% 4.9%",
    primary: "222.2 47.4% 11.2%",
    "primary-foreground": "210 40% 98%",
    secondary: "210 40% 96.1%",
    "secondary-foreground": "222.2 47.4% 11.2%",
    muted: "210 40% 96.1%",
    "muted-foreground": "215.4 16.3% 46.9%",
    accent: "210 40% 96.1%",
    "accent-foreground": "222.2 47.4% 11.2%",
    destructive: "0 84.2% 60.2%",
    border: "214.3 31.8% 91.4%",
    input: "214.3 31.8% 91.4%",
    ring: "222.2 84% 4.9%",
    "chart-1": "12 76% 61%",
    "chart-2": "173 58% 39%",
    "chart-3": "197 37% 24%",
    "chart-4": "43 74% 66%",
    "chart-5": "27 87% 67%",
    sidebar: "0 0% 98%",
    "sidebar-foreground": "240 5.3% 26.1%",
    "sidebar-primary": "240 5.9% 10%",
    "sidebar-primary-foreground": "0 0% 98%",
    "sidebar-accent": "240 4.8% 95.9%",
    "sidebar-accent-foreground": "240 5.9% 10%",
    "sidebar-border": "220 13% 91%",
    "sidebar-ring": "217.2 91.2% 59.8%",
    radius: "0.5rem",
  },
  dark: {
    background: "222.2 84% 4.9%",
    foreground: "210 40% 98%",
    card: "222.2 84% 4.9%",
    "card-foreground": "210 40% 98%",
    popover: "222.2 84% 4.9%",
    "popover-foreground": "210 40% 98%",
    primary: "210 40% 98%",
    "primary-foreground": "222.2 47.4% 11.2%",
    secondary: "217.2 32.6% 17.5%",
    "secondary-foreground": "210 40% 98%",
    muted: "217.2 32.6% 17.5%",
    "muted-foreground": "215 20.2% 65.1%",
    accent: "217.2 32.6% 17.5%",
    "accent-foreground": "210 40% 98%",
    destructive: "0 62.8% 30.6%",
    border: "217.2 32.6% 17.5%",
    input: "217.2 32.6% 17.5%",
    ring: "212.7 26.8% 83.9%",
    "chart-1": "220 70% 50%",
    "chart-2": "160 60% 45%",
    "chart-3": "30 80% 55%",
    "chart-4": "280 65% 60%",
    "chart-5": "340 75% 55%",
    sidebar: "240 5.9% 10%",
    "sidebar-foreground": "240 4.8% 95.9%",
    "sidebar-primary": "224.3 76.3% 48%",
    "sidebar-primary-foreground": "0 0% 100%",
    "sidebar-accent": "240 3.7% 15.9%",
    "sidebar-accent-foreground": "240 4.8% 95.9%",
    "sidebar-border": "240 3.7% 15.9%",
    "sidebar-ring": "217.2 91.2% 59.8%",
    radius: "0.5rem",
  },
};

const usage = () => {
  throw new Error(
    "Usage: bun run sync:upstream-contracts -- --check | --write"
  );
};

const parseArgs = () => {
  const args = process.argv.slice(2);

  if (args.length !== 1) {
    usage();
  }

  if (args[0] === "--check") {
    return "check";
  }

  if (args[0] === "--write") {
    return "write";
  }

  usage();
};

const sha256 = (text) =>
  crypto.createHash("sha256").update(text).digest("hex");

const readText = async (filePath) => fs.readFile(filePath, "utf-8");

const writeText = async (filePath, text) => {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, text);
};

const readJson = async (filePath) => JSON.parse(await readText(filePath));

const stableJson = (value) => `${JSON.stringify(value, null, 2)}\n`;

const fetchText = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return response.text();
};

const fetchShadcnMainSha = async () => {
  const response = await fetch(shadcnRepoApiUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${shadcnRepoApiUrl}: ${response.status}`);
  }

  const payload = await response.json();

  if (typeof payload.sha !== "string" || payload.sha.length === 0) {
    throw new Error("GitHub commit payload did not include a sha");
  }

  return payload.sha;
};

const arrayLiteral = (source, name) => {
  const declaration = `declare const ${name}: readonly [`;
  const start = source.indexOf(declaration);

  if (start === -1) {
    throw new Error(`Could not derive ${name} from shadcn preset source`);
  }

  const valuesStart = start + declaration.length;
  const valuesEnd = source.indexOf("];", valuesStart);

  if (valuesEnd === -1) {
    throw new Error(`Could not derive ${name} from shadcn preset source`);
  }

  return [...source.slice(valuesStart, valuesEnd).matchAll(/"([^"]+)"/gu)].map(
    (entry) => entry[1]
  );
};

const extractObjectEntries = (source, objectName) => {
  const start = source.indexOf(`${objectName}: {`);

  if (start === -1) {
    throw new Error(`Could not find ${objectName} in shadcn Button source`);
  }

  const objectStart = source.indexOf("{", start);
  let depth = 0;
  let end = objectStart;

  for (; end < source.length; end += 1) {
    const char = source[end];

    if (char === "{") {
      depth += 1;
    }

    if (char === "}") {
      depth -= 1;

      if (depth === 0) {
        break;
      }
    }
  }

  const objectSource = source.slice(objectStart + 1, end);
  const entries = {};
  const entryPattern = /"?(default|destructive|outline|secondary|ghost|link|xs|sm|lg|icon|icon-xs|icon-sm|icon-lg)"?:\s*"([^"]+)"/gu;

  for (const match of objectSource.matchAll(entryPattern)) {
    entries[match[1]] = match[2];
  }

  return entries;
};

const deriveButtonContract = ({ snapshot, snapshotDigest }) => {
  const variants = extractObjectEntries(snapshot, "variant");
  const sizes = extractObjectEntries(snapshot, "size");

  return {
    name: "shadcn-button",
    upstreamSnapshotDigest: snapshotDigest,
    helperNames: ["cn", "buttonVariants"],
    optionNames: {
      variant: Object.keys(variants),
      size: Object.keys(sizes),
    },
    variants,
    sizes,
  };
};

const deriveUtilsContract = ({ snapshotDigest }) => ({
  name: "shadcn-utils",
  upstreamSnapshotDigest: snapshotDigest,
  exports: ["cn"],
  imports: ["clsx", "tailwind-merge"],
});

const deriveThemeContract = ({
  themesDigest,
  presetsDigest,
  presetsSnapshot,
}) => {
  const styleNames = arrayLiteral(presetsSnapshot, "PRESET_STYLES");
  const baseColorNames = arrayLiteral(presetsSnapshot, "PRESET_BASE_COLORS");
  const themeNames = arrayLiteral(presetsSnapshot, "PRESET_THEMES");

  return {
    name: "shadcn-theme",
    upstreamSnapshotDigest: sha256(`${themesDigest}:${presetsDigest}`),
    sourceDigests: {
      themes: themesDigest,
      presets: presetsDigest,
    },
    defaultStyle: "rhea",
    defaultBaseColor: "neutral",
    defaultMode: "light",
    styleNames,
    baseColorNames,
    themeNames,
    tokenNames: requiredThemeTokens,
    radiusScale: ["sm", "md", "lg", "xl"],
    themes: [
      {
        name: "rhea-neutral-light",
        label: "Rhea Neutral Light",
        style: "rhea",
        baseColor: "neutral",
        mode: "light",
        tokens: defaultThemeTokens.light,
      },
      {
        name: "rhea-neutral-dark",
        label: "Rhea Neutral Dark",
        style: "rhea",
        baseColor: "neutral",
        mode: "dark",
        tokens: defaultThemeTokens.dark,
      },
      {
        name: "nova-zinc-light",
        label: "Nova Zinc Light",
        style: "nova",
        baseColor: "zinc",
        mode: "light",
        tokens: {
          ...defaultThemeTokens.light,
          primary: "240 5.9% 10%",
          "primary-foreground": "0 0% 98%",
          ring: "240 5.9% 10%",
        },
      },
    ],
  };
};

const deriveBaseUiButtonContract = ({
  packageDigest,
  packageSnapshot,
  typesDigest,
  typesSnapshot,
}) => {
  const packageJson = JSON.parse(packageSnapshot);
  const exports = Object.keys(packageJson.exports ?? {});

  return {
    name: "base-ui-button",
    upstreamSnapshotDigest: sha256(`${packageDigest}:${typesDigest}`),
    sourceDigests: {
      package: packageDigest,
      buttonTypes: typesDigest,
    },
    packageName: packageJson.name,
    packageVersion: packageJson.version,
    docsUrl: "https://base-ui.com/react/components/button",
    packageExportsButton: exports.includes("./button"),
    packageExports: exports.filter((entry) =>
      ["./accordion", "./avatar", "./button", "./dialog", "./select", "./tabs"].includes(
        entry
      )
    ),
    typeSurfaceMentionsButton: typesSnapshot.includes("Button"),
  };
};

const buildWritePayload = async () => {
  const shadcnSha = await fetchShadcnMainSha();
  const snapshots = new Map();
  const sources = [];

  for (const source of githubSources) {
    const url = `${shadcnRawBaseUrl}/${shadcnSha}/${source.path}`;
    const text = await fetchText(url);
    const digest = sha256(text);
    snapshots.set(source.id, { text, digest, ...source, url, pinnedRef: shadcnSha });
    sources.push({
      id: source.id,
      kind: "github-raw",
      url,
      pinnedRef: shadcnSha,
      snapshotPath: source.snapshotPath,
      derivedContractPath: source.derivedPath,
      digest,
    });
  }

  for (const source of localSources) {
    const packageJson = await readJson(path.join(rootDir, source.packageJsonPath));
    const text = await readText(path.join(rootDir, source.sourcePath));
    const digest = sha256(text);
    snapshots.set(source.id, { text, digest, ...source, packageVersion: packageJson.version });
    sources.push({
      id: source.id,
      kind: source.kind,
      packageName: source.packageName,
      packageVersion: packageJson.version,
      localSourcePath: source.sourcePath,
      snapshotPath: source.snapshotPath,
      derivedContractPath: source.derivedPath,
      digest,
    });
  }

  const derived = {
    "derived/shadcn-utils.json": deriveUtilsContract({
      snapshotDigest: snapshots.get("shadcn-utils").digest,
    }),
    "derived/shadcn-button.json": deriveButtonContract({
      snapshot: snapshots.get("shadcn-button").text,
      snapshotDigest: snapshots.get("shadcn-button").digest,
    }),
    "derived/shadcn-theme.json": deriveThemeContract({
      themesDigest: snapshots.get("shadcn-themes").digest,
      presetsDigest: snapshots.get("shadcn-preset-package").digest,
      presetsSnapshot: snapshots.get("shadcn-preset-package").text,
    }),
    "derived/base-ui-button.json": deriveBaseUiButtonContract({
      packageDigest: snapshots.get("base-ui-react-package").digest,
      packageSnapshot: snapshots.get("base-ui-react-package").text,
      typesDigest: snapshots.get("base-ui-button-types").digest,
      typesSnapshot: snapshots.get("base-ui-button-types").text,
    }),
  };

  return {
    manifest: {
      version: 1,
      generatedAt: new Date().toISOString(),
      sources,
    },
    snapshots,
    derived,
  };
};

const checkFile = async ({ relativePath, expectedText, failures }) => {
  const absolutePath = path.join(upstreamDir, relativePath);
  let actualText;

  try {
    actualText = await readText(absolutePath);
  } catch {
    failures.push(`${relativePath} is missing`);
    return;
  }

  if (actualText !== expectedText) {
    failures.push(`${relativePath} is stale`);
  }
};

const writeMode = async () => {
  const payload = await buildWritePayload();

  await fs.mkdir(snapshotsDir, { recursive: true });
  await fs.mkdir(derivedDir, { recursive: true });

  for (const snapshot of payload.snapshots.values()) {
    await writeText(path.join(upstreamDir, snapshot.snapshotPath), snapshot.text);
  }

  for (const [relativePath, contract] of Object.entries(payload.derived)) {
    await writeText(path.join(upstreamDir, relativePath), stableJson(contract));
  }

  await writeText(manifestPath, stableJson(payload.manifest));
  console.log(
    `Synced ${payload.manifest.sources.length} upstream source snapshots and ${Object.keys(payload.derived).length} derived contracts`
  );
};

const checkMode = async () => {
  const failures = [];
  let manifest;

  try {
    manifest = await readJson(manifestPath);
  } catch {
    failures.push("registry/upstream/source-manifest.json is missing");
    manifest = { sources: [] };
  }

  if (!Array.isArray(manifest.sources) || manifest.sources.length < 4) {
    failures.push("source-manifest.json must contain at least four sources");
  }

  for (const source of manifest.sources ?? []) {
    if (typeof source.snapshotPath !== "string") {
      failures.push(`${source.id ?? "<unknown>"} is missing snapshotPath`);
      continue;
    }

    let snapshotText;

    try {
      snapshotText = await readText(path.join(upstreamDir, source.snapshotPath));
    } catch {
      failures.push(`${source.snapshotPath} is missing`);
      continue;
    }

    const digest = sha256(snapshotText);

    if (source.digest !== digest) {
      failures.push(`${source.snapshotPath} digest mismatch`);
    }
  }

  const requiredContracts = [
    "derived/shadcn-utils.json",
    "derived/shadcn-button.json",
    "derived/shadcn-theme.json",
    "derived/base-ui-button.json",
  ];

  for (const relativePath of requiredContracts) {
    let contract;

    try {
      contract = await readJson(path.join(upstreamDir, relativePath));
    } catch {
      failures.push(`${relativePath} is missing`);
      continue;
    }

    if (
      typeof contract.upstreamSnapshotDigest !== "string" ||
      contract.upstreamSnapshotDigest.length === 0
    ) {
      failures.push(`${relativePath} is missing upstreamSnapshotDigest`);
    }
  }

  const sourceById = new Map(
    (manifest.sources ?? []).map((source) => [source.id, source])
  );

  if (
    sourceById.has("shadcn-button") &&
    sourceById.has("shadcn-utils") &&
    sourceById.has("shadcn-themes") &&
    sourceById.has("shadcn-preset-package") &&
    sourceById.has("base-ui-react-package") &&
    sourceById.has("base-ui-button-types")
  ) {
    const snapshots = {
      shadcnUtils: await readText(
        path.join(upstreamDir, sourceById.get("shadcn-utils").snapshotPath)
      ),
      shadcnButton: await readText(
        path.join(upstreamDir, sourceById.get("shadcn-button").snapshotPath)
      ),
      shadcnThemes: await readText(
        path.join(upstreamDir, sourceById.get("shadcn-themes").snapshotPath)
      ),
      shadcnPreset: await readText(
        path.join(upstreamDir, sourceById.get("shadcn-preset-package").snapshotPath)
      ),
      basePackage: await readText(
        path.join(upstreamDir, sourceById.get("base-ui-react-package").snapshotPath)
      ),
      baseTypes: await readText(
        path.join(upstreamDir, sourceById.get("base-ui-button-types").snapshotPath)
      ),
    };

    const expectedContracts = {
      "derived/shadcn-utils.json": stableJson(
        deriveUtilsContract({
          snapshotDigest: sha256(snapshots.shadcnUtils),
        })
      ),
      "derived/shadcn-button.json": stableJson(
        deriveButtonContract({
          snapshot: snapshots.shadcnButton,
          snapshotDigest: sha256(snapshots.shadcnButton),
        })
      ),
      "derived/shadcn-theme.json": stableJson(
        deriveThemeContract({
          themesDigest: sha256(snapshots.shadcnThemes),
          presetsDigest: sha256(snapshots.shadcnPreset),
          presetsSnapshot: snapshots.shadcnPreset,
        })
      ),
      "derived/base-ui-button.json": stableJson(
        deriveBaseUiButtonContract({
          packageDigest: sha256(snapshots.basePackage),
          packageSnapshot: snapshots.basePackage,
          typesDigest: sha256(snapshots.baseTypes),
          typesSnapshot: snapshots.baseTypes,
        })
      ),
    };

    for (const [relativePath, expectedText] of Object.entries(expectedContracts)) {
      await checkFile({ relativePath, expectedText, failures });
    }
  }

  if (failures.length > 0) {
    console.error("Upstream contract sync check failed:");
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exit(1);
  }

  console.log(
    `Upstream contract snapshots are current for ${manifest.sources.length} sources`
  );
};

const mode = parseArgs();

if (mode === "write") {
  await writeMode();
} else {
  await checkMode();
}
