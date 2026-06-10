import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const rootDir = path.resolve(import.meta.dirname, "..");
const registryItems = JSON.parse(
  readFileSync(path.join(rootDir, "registry/default/items.json"), "utf-8")
);
const docsViewSource = readFileSync(
  path.join(rootDir, "src/docsView.ts"),
  "utf-8"
);

const failures = [];

const isShadcnOrigin = (origin) => {
  if (typeof origin !== "string") {
    return false;
  }

  try {
    const url = new URL(origin);
    return url.protocol === "https:" && url.hostname === "ui.shadcn.com";
  } catch {
    return false;
  }
};

const shadcnExamples = registryItems.filter(
  (item) =>
    item.type === "registry:example" &&
    isShadcnOrigin(item.meta?.foldkit?.origin) &&
    item.registryDependencies.some((dependency) =>
      dependency.startsWith("shadcn-")
    )
);

const sourceHrefForExample = (exampleName) => `sources/${exampleName}.txt`;

const escapeRegExp = (value) =>
  value.replaceAll(/[.*+?^${}()|[\]\\]/gu, "\\$&");

const hasLiveExampleResolver = (exampleName) =>
  docsViewSource.includes(`M.when("${exampleName}"`) ||
  new RegExp(
    `\\[\\s*"${escapeRegExp(exampleName)}"\\s*,\\s*\\(\\)\\s*=>`,
    "u"
  ).test(docsViewSource);

for (const example of shadcnExamples) {
  const sourceHref = sourceHrefForExample(example.name);
  const sourcePath = path.join(rootDir, "apps/docs/public", sourceHref);

  if (!docsViewSource.includes(`"${example.name}"`)) {
    failures.push(`${example.name}: missing docs examples declaration`);
  }

  if (!hasLiveExampleResolver(example.name)) {
    failures.push(`${example.name}: missing live shadcn example resolver`);
  }

  if (!docsViewSource.includes(`"${sourceHref}"`)) {
    failures.push(`${example.name}: missing docs source href mapping`);
  }

  if (!existsSync(sourcePath)) {
    failures.push(`${example.name}: missing ${sourceHref}`);
  }

  for (const file of example.files) {
    if (!existsSync(path.join(rootDir, file.path))) {
      failures.push(`${example.name}: missing registry file ${file.path}`);
    }
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Checked ${shadcnExamples.length} shadcn docs examples`);
