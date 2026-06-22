import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourceRoots = [
  "registry/base-ui/ui",
  "registry/shadcn/ui",
  "registry/foldkit/ui",
  "registry/ai-elements/ui",
];
const originBackedSourceRoots = ["registry/base-ui/ui", "registry/shadcn/ui"];
const publicRoot = "apps/docs/public";
const sourceExtensions = new Set([".ts", ".tsx"]);
const publicExtensions = new Set([".json"]);

const excludedSegments = new Set(["node_modules", "upstream"]);

const oldApiSuffix = `Class${"Name"}`;
const oldHelperWord = `class${"Names"}`;
const exportedClassNamePattern = new RegExp(
  `\\bexport\\s+(?:declare\\s+)?(?:const|let|var|function|class|type|interface)\\s+[A-Za-z0-9_]+${oldApiSuffix}\\b`,
  "g",
);
const classNamesHelperPattern = new RegExp(`\\b${oldHelperWord}\\b`, "g");
const classesConfigPattern = /\bclasses\?\s*:/g;
const publicExportedClassNamePattern = new RegExp(
  `\\bexport\\s+(?:declare\\s+)?(?:const|let|var|function|class|type|interface)\\s+[A-Za-z0-9_]+${oldApiSuffix}\\b`,
  "g",
);
const foldkitClassApiReexportPattern =
  /export\s+(?:type\s+)?\{[\s\S]*?\}\s+from\s+["']([^"']*foldkit\/ui\/[^"']+)["']/g;

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

const resolveSourceSpecifier = (relativePath, specifier) => {
  if (!specifier.includes("foldkit/ui/")) {
    return undefined;
  }

  const candidateBase = specifier.startsWith(".")
    ? path.normalize(path.join(path.dirname(relativePath), specifier))
    : path.join("registry", specifier);

  const candidates = [
    `${candidateBase}.ts`,
    `${candidateBase}.tsx`,
    path.join(candidateBase, "index.ts"),
    path.join(candidateBase, "index.tsx"),
  ];

  return candidates.find((candidate) => existsSync(path.join(root, candidate)));
};

const findMatches = async (relativePath, checks) => {
  const content = await readFile(path.join(root, relativePath), "utf8");
  const lines = content.split(/\r?\n/);

  return lines.flatMap((line, index) => {
    const labels = checks.flatMap(({ label, pattern }) => {
      pattern.lastIndex = 0;

      return pattern.test(line) ? [label] : [];
    });

    if (labels.length === 0) {
      return [];
    }

    return [`${relativePath}:${index + 1}:${labels.join(", ")}: ${line.trim()}`];
  });
};

const findFoldkitClassApiReexports = async (relativePath) => {
  const content = await readFile(path.join(root, relativePath), "utf8");
  const lines = content.split(/\r?\n/);
  const matches = [];

  for (const match of content.matchAll(foldkitClassApiReexportPattern)) {
    const targetPath = resolveSourceSpecifier(relativePath, match[1]);

    if (targetPath === undefined) {
      continue;
    }

    const targetSource = await readFile(path.join(root, targetPath), "utf8");

    if (!classesConfigPattern.test(targetSource)) {
      classesConfigPattern.lastIndex = 0;
      continue;
    }

    classesConfigPattern.lastIndex = 0;

    const lineNumber =
      content.slice(0, match.index).split(/\r?\n/).length;
    const line = lines[lineNumber - 1]?.trim() ?? "";

    matches.push(
      `${relativePath}:${lineNumber}:Foldkit classes?: public API reexport: ${line}`,
    );
  }

  return matches;
};

const sourceFiles = (await Promise.all(
  sourceRoots.map((sourceRoot) => collectFiles(sourceRoot, sourceExtensions)),
)).flat();
const originBackedSourceFiles = (await Promise.all(
  originBackedSourceRoots.map((sourceRoot) =>
    collectFiles(sourceRoot, sourceExtensions),
  ),
)).flat();
const publicFiles = await collectFiles(publicRoot, publicExtensions);

const matches = (
  await Promise.all([
    ...sourceFiles.map((file) =>
      findMatches(file, [
        {
          label: "exported *ClassName identifier",
          pattern: exportedClassNamePattern,
        },
        { label: "classNames helper", pattern: classNamesHelperPattern },
      ]),
    ),
    ...originBackedSourceFiles.map((file) =>
      findMatches(file, [
        {
          label: "classes?: origin-backed public config",
          pattern: classesConfigPattern,
        },
      ]),
    ),
    ...originBackedSourceFiles.map((file) => findFoldkitClassApiReexports(file)),
    ...publicFiles.map((file) =>
      findMatches(file, [
        {
          label: "generated exported *ClassName identifier",
          pattern: publicExportedClassNamePattern,
        },
      ]),
    ),
  ])
).flat();

for (const match of matches) {
  console.error(match);
}

if (matches.length > 0) {
  console.error(`Found ${matches.length} old component style API matches.`);
  process.exit(1);
}

console.log(
  "Found 0 invented *ClassName exports, classNames helpers, or origin-backed classes?: configs.",
);
