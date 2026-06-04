import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const rootDir = path.resolve(import.meta.dirname, "..");
const itemsPath = path.join(rootDir, "registry/default/items.json");
const configPath = path.join(rootDir, "registry/config.json");
const componentsTemplatePath = path.join(
  rootDir,
  "registry/templates/components.json"
);
const componentsOutputPath = path.join(
  rootDir,
  "apps/docs/public/components.json"
);
const outputDir = path.join(rootDir, "apps/docs/public/r");
const itemSchemaUrl = "https://ui.shadcn.com/schema/registry-item.json";
const registrySchemaUrl = "https://ui.shadcn.com/schema/registry.json";

const isCheck = process.argv.includes("--check");

const readJson = async (filePath) =>
  JSON.parse(await readFile(filePath, "utf-8"));

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
      return `[${value.map((item) => formatJson(item)).join(", ")}]`;
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

const assertArray = (item, field) => {
  if (!Array.isArray(item[field])) {
    throw new TypeError(
      `${item.name ?? "unknown"} must declare ${field} as an array`
    );
  }
};

const assertTarget = (itemName, target) => {
  const approved =
    target.startsWith("src/ui/") ||
    target.startsWith("src/lib/") ||
    target.startsWith("src/examples/");

  if (!approved) {
    throw new Error(`${itemName} has unsupported target path: ${target}`);
  }
};

const assertNoForbiddenImports = (itemName, filePath, content) => {
  const forbidden = ["repos/", "apps/docs/"];
  const found = forbidden.find((part) => content.includes(part));

  if (found !== undefined) {
    throw new Error(
      `${itemName} file ${filePath} imports or references ${found}`
    );
  }
};

const expandItem = async (item) => {
  if (typeof item.name !== "string" || item.name.length === 0) {
    throw new Error("registry item is missing name");
  }

  if (typeof item.type !== "string" || !item.type.startsWith("registry:")) {
    throw new Error(`${item.name} is missing a registry type`);
  }

  for (const field of [
    "dependencies",
    "devDependencies",
    "registryDependencies",
    "files",
  ]) {
    assertArray(item, field);
  }

  const files = await Promise.all(
    item.files.map(async (file) => {
      if (typeof file.path !== "string" || typeof file.target !== "string") {
        throw new TypeError(`${item.name} has a file without path or target`);
      }

      assertTarget(item.name, file.target);

      const absolutePath = path.join(rootDir, file.path);
      const content = await readFile(absolutePath, "utf-8");
      assertNoForbiddenImports(item.name, file.path, content);

      return {
        path: file.path,
        target: file.target,
        type: file.type ?? item.type,
        content,
      };
    })
  );

  return {
    $schema: itemSchemaUrl,
    ...item,
    files,
  };
};

const writeOrCheck = async (filePath, content) => {
  if (isCheck) {
    const current = await readFile(filePath, "utf-8").catch(() => undefined);

    if (current !== content) {
      throw new Error(`${path.relative(rootDir, filePath)} is not up to date`);
    }

    return;
  }

  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, content);
};

const sourceItems = await readJson(itemsPath);
const registryConfig = await readJson(configPath);
const items = await Promise.all(sourceItems.map(expandItem));
const index = {
  $schema: registrySchemaUrl,
  name: registryConfig.name,
  homepage: registryConfig.homepage,
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
};

await writeOrCheck(path.join(outputDir, "index.json"), stableJson(index));

const componentsTemplate = await readFile(componentsTemplatePath, "utf-8");
await writeOrCheck(
  componentsOutputPath,
  componentsTemplate.replaceAll(
    "{{registryBaseUrl}}",
    registryConfig.registryBaseUrl
  )
);

for (const item of items) {
  await writeOrCheck(
    path.join(outputDir, `${item.name}.json`),
    stableJson(item)
  );
}

console.log(
  `${isCheck ? "Checked" : "Built"} ${items.length} registry items in ${path.relative(
    rootDir,
    outputDir
  )}`
);
