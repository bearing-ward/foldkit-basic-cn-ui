import path from "node:path";

import { readSourceRegistryItemsSync } from "./registry-manifest.mjs";

export const generatedOpenstoryDir = "src/openstory/generated";

const toPosixPath = (filePath) => filePath.split(path.sep).join(path.posix.sep);

export const sourceLaneForRegistryPath = (filePath) => {
  const [root, lane] = toPosixPath(filePath).split("/");

  if (root !== "registry" || lane === undefined || lane.length === 0) {
    throw new Error(`${filePath}: registry source path must start with registry/{lane}`);
  }

  return lane;
};

export const modulePathFromGeneratedStory = (sourcePath) => {
  const fromGeneratedDir = path.posix.relative(
    generatedOpenstoryDir,
    toPosixPath(sourcePath).replace(/\.ts$/u, "")
  );

  return fromGeneratedDir.startsWith(".")
    ? fromGeneratedDir
    : `./${fromGeneratedDir}`;
};

export const exampleMainPathForItem = (item) => {
  const mainFiles = (item.files ?? [])
    .map((file) => file.path)
    .filter((filePath) => filePath.endsWith("/main.ts"));

  if (mainFiles.length !== 1) {
    throw new Error(
      `${item.name}: expected exactly one example main.ts file, found ${mainFiles.length}`
    );
  }

  return mainFiles[0];
};

export const registryExampleEntries = (registryItems) =>
  registryItems
    .filter((item) => item.type === "registry:example")
    .map((item) => {
      const mainPath = exampleMainPathForItem(item);

      return {
        modulePath: modulePathFromGeneratedStory(mainPath),
        slug: item.name,
        sourceLane: sourceLaneForRegistryPath(mainPath),
        sourcePath: mainPath,
      };
    })
    .sort((left, right) => left.slug.localeCompare(right.slug));

export const registryUiSourceFiles = (registryItems) =>
  registryItems
    .filter((item) => item.type === "registry:ui")
    .flatMap((item) => item.files ?? [])
    .map((file) => file.path)
    .filter((filePath) => /\.(?:ts|tsx)$/u.test(filePath))
    .sort();

export const readRegistryExampleEntriesSync = (rootDir = process.cwd()) =>
  registryExampleEntries(readSourceRegistryItemsSync({ rootDir }));

export const readRegistryUiSourceFilesSync = (rootDir = process.cwd()) =>
  registryUiSourceFiles(readSourceRegistryItemsSync({ rootDir }));
