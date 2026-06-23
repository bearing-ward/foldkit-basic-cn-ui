import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import themeContract from "../registry/upstream/derived/shadcn-theme.json" with {
  type: "json",
};
import previewInventory from "../registry/upstream/derived/shadcn-preview-02.json" with {
  type: "json",
};
import {
  readSourceRegistryItems,
  sourceRegistryPath,
} from "./registry-manifest.mjs";
import {
  createThemeStudioCatalog,
  themeStudioManifestName,
} from "./theme-studio-catalog.mjs";

const rootDir = path.resolve(import.meta.dirname, "..");
const publicDir = path.join(rootDir, "apps/docs/public");

const jsonIndent = (depth) => " ".repeat(depth);

const isPrimitiveJsonValue = (value) =>
  value === null || !["object", "undefined"].includes(typeof value);

const formatJson = (value, depth = 0) => {
  if (isPrimitiveJsonValue(value)) {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "[]";
    }

    if (value.every(isPrimitiveJsonValue)) {
      const inlineArray = `[${value.map((item) => formatJson(item)).join(", ")}]`;

      if (
        `${jsonIndent(depth)}"registryDependencies": ${inlineArray}`.length <=
        79
      ) {
        return inlineArray;
      }

      return `[\n${value
        .map((item) => `${jsonIndent(depth + 2)}${formatJson(item, depth + 2)}`)
        .join(",\n")}\n${jsonIndent(depth)}]`;
    }

    return `[\n${value
      .map((item) => `${jsonIndent(depth + 2)}${formatJson(item, depth + 2)}`)
      .join(",\n")}\n${jsonIndent(depth)}]`;
  }

  const entries = Object.entries(value);

  if (entries.length === 0) {
    return "{}";
  }

  return `{\n${entries
    .map(
      ([key, child]) =>
        `${jsonIndent(depth + 2)}${JSON.stringify(key)}: ${formatJson(
          child,
          depth + 2
        )}`
    )
    .join(",\n")}\n${jsonIndent(depth)}}`;
};

const stableJson = (value) => `${formatJson(value)}\n`;

const readPublicJson = async (name) =>
  JSON.parse(await readFile(path.join(publicDir, name), "utf-8"));

const assertSameJson = async (name, expected) => {
  const current = await readFile(path.join(publicDir, name), "utf-8").catch(
    () => undefined
  );
  const expectedContent = stableJson(expected);

  if (current !== expectedContent) {
    throw new Error(`${path.join("apps/docs/public", name)} is not up to date`);
  }
};

const sourceItems = await readSourceRegistryItems({
  rootDir,
  registryPath: sourceRegistryPath,
});
const catalog = createThemeStudioCatalog({
  themeContract,
  previewInventory,
  registryItems: sourceItems,
});

await assertSameJson(themeStudioManifestName, catalog);

const expectedThemeFiles = new Set(
  catalog.generatedRegistryItems.map((item) => `${item.name}.json`)
);

for (const item of catalog.generatedRegistryItems) {
  await assertSameJson(`${item.name}.json`, item);
}

const publicFiles = await readdir(publicDir);
const themeFiles = publicFiles.filter((file) =>
  /^foldkit-theme-.+\.json$/u.test(file)
);

for (const file of themeFiles) {
  if (!expectedThemeFiles.has(file)) {
    throw new Error(`apps/docs/public/${file} is an extra Theme Studio artifact`);
  }
}

for (const file of expectedThemeFiles) {
  if (!themeFiles.includes(file)) {
    throw new Error(`apps/docs/public/${file} is missing`);
  }
}

const publicItemNames = new Set([
  ...sourceItems
    .filter((item) => item.meta?.foldkit?.public !== false)
    .map((item) => item.name),
  ...catalog.generatedRegistryItems.map((item) => item.name),
]);

const assertDownloadHref = async (href) => {
  if (!href.startsWith("/") || !href.endsWith(".json")) {
    throw new Error(`Theme Studio download href must be root JSON: ${href}`);
  }

  const fileName = href.slice(1);
  const itemName = fileName.replace(/\.json$/u, "");

  if (!publicItemNames.has(itemName)) {
    throw new Error(`Theme Studio download href is not a public registry item: ${href}`);
  }

  await readPublicJson(fileName);
};

for (const download of catalog.downloads.themes) {
  await assertDownloadHref(download.href);
}

for (const block of catalog.previewBlocks) {
  await assertDownloadHref(block.downloadHref);
}

console.log(
  `Theme Studio artifacts: ${catalog.generatedRegistryItems.length} theme downloads and ${catalog.previewBlocks.length} preview blocks are current`
);
