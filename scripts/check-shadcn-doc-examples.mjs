import { existsSync } from "node:fs";
import path from "node:path";

import { generateOpenstoryStories } from "./generate-openstory-stories.mjs";
import { readSourceRegistryItems } from "./registry-manifest.mjs";

const rootDir = path.resolve(import.meta.dirname, "..");
const registryItems = await readSourceRegistryItems({ rootDir });
const generated = generateOpenstoryStories(rootDir);
const generatedExampleSlugs = new Set(
  generated.catalog.flatMap((group) =>
    group.stories
      .filter((story) => story.kind === "example")
      .map((story) => story.slug)
  )
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

for (const example of shadcnExamples) {
  const sourceHref = sourceHrefForExample(example.name);
  const sourcePath = path.join(rootDir, "apps/docs/public", sourceHref);

  if (!existsSync(sourcePath)) {
    failures.push(`${example.name}: missing ${sourceHref}`);
  }

  if (!generatedExampleSlugs.has(example.name)) {
    failures.push(`${example.name}: missing generated OpenStory story`);
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
