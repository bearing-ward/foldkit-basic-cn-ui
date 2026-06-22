import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import {
  checkGeneratedFiles,
  generateOpenstoryStories,
  storyId,
} from "./generate-openstory-stories.mjs";
import { readRegistryExampleEntriesSync } from "./registry-source-layout.mjs";

const importPattern =
  /from "([^"]*registry\/(?:foldkit|base-ui|shadcn|ai-elements)\/[^"]*\/main)"/gu;

const generated = generateOpenstoryStories();
const failures = checkGeneratedFiles(generated);
const expectedImportsBySlug = new Map(
  readRegistryExampleEntriesSync().map((example) => [
    example.slug,
    example.modulePath,
  ])
);
const expectedSlugs = new Set(
  generated.catalog.flatMap((group) =>
    group.stories
      .filter((story) => story.kind === "example")
      .map((story) => story.slug)
  )
);
const importsBySlug = new Map();
const storyIds = new Map();

for (const group of generated.catalog) {
  for (const story of group.stories) {
    const id = storyId({ title: group.title, name: story.name });
    const storyLabel =
      story.kind === "documentation" ? story.registryItemName : story.slug;
    const previousStoryLabel = storyIds.get(id);

    if (previousStoryLabel !== undefined) {
      failures.push(
        `${storyLabel}: duplicate generated Openstory story id ${id} also used by ${previousStoryLabel}`
      );
    }

    storyIds.set(id, storyLabel);
  }
}

for (const [relativeFilePath] of generated.files) {
  const absoluteFilePath = path.resolve(relativeFilePath);

  if (!existsSync(absoluteFilePath)) {
    continue;
  }

  const source = readFileSync(absoluteFilePath, "utf-8");

  for (const match of source.matchAll(importPattern)) {
    const modulePath = match[1];
    const matchingSlug = [...expectedImportsBySlug].find(
      ([, expectedModulePath]) => expectedModulePath === modulePath
    )?.[0];

    if (matchingSlug === undefined) {
      failures.push(`${relativeFilePath}: imports unexpected example ${modulePath}`);
      continue;
    }

    importsBySlug.set(matchingSlug, (importsBySlug.get(matchingSlug) ?? 0) + 1);
  }
}

for (const slug of expectedSlugs) {
  const importCount = importsBySlug.get(slug) ?? 0;

  if (importCount !== 1) {
    failures.push(`${slug}: expected one generated import, found ${importCount}`);
  }
}

for (const slug of importsBySlug.keys()) {
  if (!expectedSlugs.has(slug)) {
    failures.push(`${slug}: imported but not discovered from registry metadata`);
  }
}

if (failures.length > 0) {
  console.error("Generated Openstory registry story guardrail failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `Checked ${expectedSlugs.size} generated Openstory registry stories`
);
