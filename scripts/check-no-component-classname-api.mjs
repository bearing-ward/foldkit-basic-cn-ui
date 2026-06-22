import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sourceRoots = ["registry/base-ui/ui", "registry/shadcn/ui", "registry/foldkit/ui", "registry/ai-elements/ui"];
const publicRoot = "apps/docs/public";
const sourceExtensions = new Set([".ts", ".tsx"]);
const publicExtensions = new Set([".json"]);

const excludedSegments = new Set(["node_modules", "upstream"]);

const oldApiWord = `class${"Name"}`;
const oldApiSuffix = `Class${"Name"}`;
const oldHelperWord = `class${"Names"}`;
const sourcePattern = new RegExp(
  `\\b(${oldApiWord}|[A-Za-z0-9_]+${oldApiSuffix}|${oldHelperWord})\\b`,
  "g",
);
const publicPattern = new RegExp(`\\b(${oldApiWord}|${oldApiSuffix})\\b`, "g");

const isExcluded = (relativePath) => {
  const segments = relativePath.split(path.sep);
  if (segments.some((segment) => excludedSegments.has(segment))) {
    return true;
  }

  return relativePath.startsWith(path.join("apps", "docs", "public", "r") + path.sep);
};

const collectFiles = async (relativeDirectory, extensions) => {
  const absoluteDirectory = path.join(root, relativeDirectory);
  const entries = await readdir(absoluteDirectory, { withFileTypes: true }).catch(
    (error) => {
      if (error?.code === "ENOENT") {
        return [];
      }

      throw error;
    },
  );

  const nested = await Promise.all(
    entries.map(async (entry) => {
      const relativePath = path.join(relativeDirectory, entry.name);

      if (isExcluded(relativePath)) {
        return [];
      }

      if (entry.isDirectory()) {
        return collectFiles(relativePath, extensions);
      }

      if (entry.isFile() && extensions.has(path.extname(entry.name))) {
        return [relativePath];
      }

      return [];
    }),
  );

  return nested.flat();
};

const findMatches = async (relativePath, pattern) => {
  const content = await readFile(path.join(root, relativePath), "utf8");
  const lines = content.split(/\r?\n/);

  return lines.flatMap((line, index) => {
    pattern.lastIndex = 0;

    if (!pattern.test(line)) {
      return [];
    }

    return [`${relativePath}:${index + 1}:${line.trim()}`];
  });
};

const sourceFiles = (await Promise.all(
  sourceRoots.map((sourceRoot) => collectFiles(sourceRoot, sourceExtensions)),
)).flat();
const publicFiles = await collectFiles(publicRoot, publicExtensions);

const matches = (
  await Promise.all([
    ...sourceFiles.map((file) => findMatches(file, sourcePattern)),
    ...publicFiles.map((file) => findMatches(file, publicPattern)),
  ])
).flat();

for (const match of matches) {
  console.error(match);
}

if (matches.length > 0) {
  console.error(`Found ${matches.length} old component style API matches.`);
  process.exit(1);
}

console.log("Found 0 old component style API matches.");
