import { readFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import path from "node:path";

export const defaultRootDir = path.resolve(import.meta.dirname, "..");
export const sourceRegistryPath = "registry/registry.json";

export const readJson = async (filePath) =>
  JSON.parse(await readFile(filePath, "utf-8"));

export const readJsonSync = (filePath) =>
  JSON.parse(readFileSync(filePath, "utf-8"));

const isRelativeRegistryJsonPath = (includePath) =>
  typeof includePath === "string" &&
  includePath.endsWith("/registry.json") &&
  !path.isAbsolute(includePath) &&
  !path.normalize(includePath).startsWith("..");

const readRegistryFile = async ({ rootDir, registryPath }) => {
  const absolutePath = path.join(rootDir, registryPath);
  const registry = await readJson(absolutePath);

  if (registry.include !== undefined) {
    if (!Array.isArray(registry.include)) {
      throw new TypeError(`${registryPath} include must be an array`);
    }

    for (const includePath of registry.include) {
      if (!isRelativeRegistryJsonPath(includePath)) {
        throw new Error(
          `${registryPath} include must use relative explicit registry.json paths: ${includePath}`
        );
      }
    }
  }

  if (registry.items !== undefined && !Array.isArray(registry.items)) {
    throw new TypeError(`${registryPath} items must be an array`);
  }

  const includeItems = await Promise.all(
    (registry.include ?? []).map((includePath) =>
      readRegistryFile({ rootDir, registryPath: includePath })
    )
  );

  return [...(registry.items ?? []), ...includeItems.flat()];
};

const readRegistryFileSync = ({ rootDir, registryPath }) => {
  const absolutePath = path.join(rootDir, registryPath);
  const registry = readJsonSync(absolutePath);

  if (registry.include !== undefined) {
    if (!Array.isArray(registry.include)) {
      throw new TypeError(`${registryPath} include must be an array`);
    }

    for (const includePath of registry.include) {
      if (!isRelativeRegistryJsonPath(includePath)) {
        throw new Error(
          `${registryPath} include must use relative explicit registry.json paths: ${includePath}`
        );
      }
    }
  }

  if (registry.items !== undefined && !Array.isArray(registry.items)) {
    throw new TypeError(`${registryPath} items must be an array`);
  }

  return [
    ...(registry.items ?? []),
    ...(registry.include ?? []).flatMap((includePath) =>
      readRegistryFileSync({ rootDir, registryPath: includePath })
    ),
  ];
};

export const readSourceRegistryItems = async ({
  rootDir = defaultRootDir,
  registryPath = sourceRegistryPath,
} = {}) => {
  const items = await readRegistryFile({ rootDir, registryPath });
  const itemNames = new Set();

  for (const item of items) {
    if (typeof item.name !== "string" || item.name.length === 0) {
      throw new Error(`${registryPath} contains an item without a name`);
    }

    if (itemNames.has(item.name)) {
      throw new Error(`Duplicate registry item name: ${item.name}`);
    }

    itemNames.add(item.name);
  }

  return items;
};

export const readSourceRegistryItemsSync = ({
  rootDir = defaultRootDir,
  registryPath = sourceRegistryPath,
} = {}) => {
  const items = readRegistryFileSync({ rootDir, registryPath });
  const itemNames = new Set();

  for (const item of items) {
    if (typeof item.name !== "string" || item.name.length === 0) {
      throw new Error(`${registryPath} contains an item without a name`);
    }

    if (itemNames.has(item.name)) {
      throw new Error(`Duplicate registry item name: ${item.name}`);
    }

    itemNames.add(item.name);
  }

  return items;
};

export const createRegistryDependencyQualifier = (sourceItems) => {
  const sourceItemNames = new Set(sourceItems.map((item) => item.name));

  return (dependency) => {
    if (
      dependency.startsWith("@") ||
      dependency.startsWith("http://") ||
      dependency.startsWith("https://") ||
      !sourceItemNames.has(dependency)
    ) {
      return dependency;
    }

    return `@foldkit-cn/${dependency}`;
  };
};
