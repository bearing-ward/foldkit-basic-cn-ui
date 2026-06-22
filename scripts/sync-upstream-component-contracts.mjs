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

const findBalancedEnd = (source, start, openChar, closeChar) => {
  let depth = 0;
  let quote = undefined;
  let escaped = false;

  for (let index = start; index < source.length; index += 1) {
    const char = source[index];

    if (quote !== undefined) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === "\\") {
        escaped = true;
        continue;
      }
      if (char === quote) {
        quote = undefined;
      }
      continue;
    }

    if (char === "\"" || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === openChar) {
      depth += 1;
    }

    if (char === closeChar) {
      depth -= 1;
      if (depth === 0) {
        return index;
      }
    }
  }

  throw new Error(`Could not parse balanced ${openChar}${closeChar} block`);
};

const extractBalancedBlock = (source, start, openChar, closeChar) => {
  const blockStart = source.indexOf(openChar, start);

  if (blockStart === -1) {
    throw new Error(`Could not find ${openChar} while parsing shadcn themes`);
  }

  const blockEnd = findBalancedEnd(source, blockStart, openChar, closeChar);

  return source.slice(blockStart + 1, blockEnd);
};

const stringProperty = (source, propertyName) => {
  const match = new RegExp(`${propertyName}:\\s*"((?:\\\\.|[^"\\\\])*)"`, "u").exec(
    source
  );

  return match?.[1];
};

const objectProperty = (source, propertyName) => {
  const propertyStart = source.indexOf(`${propertyName}:`);

  if (propertyStart === -1) {
    return undefined;
  }

  return extractBalancedBlock(source, propertyStart, "{", "}");
};

const topLevelObjects = (source) => {
  const objects = [];
  let index = 0;

  while (index < source.length) {
    const objectStart = source.indexOf("{", index);

    if (objectStart === -1) {
      return objects;
    }

    const objectEnd = findBalancedEnd(source, objectStart, "{", "}");
    objects.push(source.slice(objectStart, objectEnd + 1));
    index = objectEnd + 1;
  }

  return objects;
};

const parseStringMap = (source) =>
  Object.fromEntries(
    [...source.matchAll(/(?:"([^"]+)"|([A-Za-z_$][\w$-]*)):\s*"((?:\\.|[^"\\])*)"/gu)].map(
      (match) => [match[1] ?? match[2], match[3]]
    )
  );

const titleCase = (value) =>
  value
    .split("-")
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join(" ");

const themeEntryFromSnapshotObject = (objectSource) => {
  const cssVarsSource = objectProperty(objectSource, "cssVars");

  if (cssVarsSource === undefined) {
    throw new Error("Could not derive cssVars from shadcn theme entry");
  }

  const cssVars = Object.fromEntries(
    ["light", "dark"].flatMap((mode) => {
      const modeSource = objectProperty(cssVarsSource, mode);

      return modeSource === undefined ? [] : [[mode, parseStringMap(modeSource)]];
    })
  );

  return {
    name: stringProperty(objectSource, "name"),
    title: stringProperty(objectSource, "title"),
    type: stringProperty(objectSource, "type"),
    cssVars,
  };
};

const deriveSnapshotThemeEntries = (themesSnapshot) => {
  const themesDeclaration = themesSnapshot.indexOf("export const THEMES");

  if (themesDeclaration === -1) {
    throw new Error("Could not find THEMES registry array in shadcn theme snapshot");
  }

  const themesInitializer = themesSnapshot.indexOf("=", themesDeclaration);

  if (themesInitializer === -1) {
    throw new Error("Could not find THEMES registry array initializer");
  }

  const themesArray = extractBalancedBlock(
    themesSnapshot,
    themesInitializer,
    "[",
    "]"
  );
  const themes = topLevelObjects(themesArray)
    .map(themeEntryFromSnapshotObject)
    .filter((theme) => theme.type === "registry:theme");

  const neutralTheme = themes.find((theme) => theme.name === "neutral");

  if (neutralTheme === undefined) {
    throw new Error("shadcn theme snapshot must include neutral");
  }

  return themes.flatMap((theme) => {
    if (theme.name === undefined || theme.title === undefined) {
      throw new Error("shadcn theme entry is missing name or title");
    }

    const fallbackRadius =
      Object.values(theme.cssVars).find((tokens) => tokens.radius !== undefined)
        ?.radius ??
      Object.values(neutralTheme.cssVars).find((tokens) => tokens.radius !== undefined)
        ?.radius;

    return Object.entries(theme.cssVars).map(([mode, tokens]) => {
      const neutralTokens = neutralTheme.cssVars[mode] ?? {};
      const tokensWithDefaults = { ...neutralTokens, ...tokens };
      const tokensWithRadius =
        tokensWithDefaults.radius === undefined && fallbackRadius !== undefined
          ? { ...tokensWithDefaults, radius: fallbackRadius }
          : tokensWithDefaults;

      for (const token of [...requiredThemeTokens, "radius"]) {
        if (tokensWithRadius[token] === undefined) {
          throw new Error(`${theme.name} ${mode} is missing ${token}`);
        }
      }

      return {
        name: `rhea-${theme.name}-${mode}`,
        label: `Rhea ${titleCase(theme.name)} ${titleCase(mode)}`,
        style: "rhea",
        baseColor: theme.name,
        mode,
        tokens: tokensWithRadius,
      };
    });
  });
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
  themesSnapshot,
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
    themes: deriveSnapshotThemeEntries(themesSnapshot),
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
  const snapshots = new Map();
  const manifest = await readJson(manifestPath);
  const sources = manifest.sources.map((source) => {
    if (typeof source.snapshotPath !== "string") {
      throw new Error(`${source.id ?? "<unknown>"} is missing snapshotPath`);
    }

    const matchingSource =
      githubSources.find((candidate) => candidate.id === source.id) ??
      localSources.find((candidate) => candidate.id === source.id);

    if (matchingSource === undefined) {
      throw new Error(`Unknown upstream source ${source.id ?? "<unknown>"}`);
    }

    return {
      ...source,
      derivedContractPath: matchingSource.derivedPath,
    };
  });

  for (const source of sources) {
    const text = await readText(path.join(upstreamDir, source.snapshotPath));
    const digest = sha256(text);
    snapshots.set(source.id, { text, digest, ...source });
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
      themesSnapshot: snapshots.get("shadcn-themes").text,
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
      ...manifest,
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
          themesSnapshot: snapshots.shadcnThemes,
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
