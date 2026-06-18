import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import {
  checkGeneratedFiles,
  generateOpenstoryStories,
  storyId,
} from "./generate-openstory-stories.mjs";

const importPattern =
  /from "\.\.\/\.\.\/\.\.\/registry\/(foldkit|base-ui|shadcn|ai-elements)\/examples\/([^/]+)\/main"/gu;

const generated = generateOpenstoryStories();
const failures = checkGeneratedFiles(generated);
const expectedSlugs = new Set(
  generated.catalog.flatMap((group) => group.stories.map((story) => story.slug))
);
const importsBySlug = new Map();
const storyIds = new Map();

for (const group of generated.catalog) {
  for (const story of group.stories) {
    const id = storyId({ title: group.title, name: story.name });
    const previousSlug = storyIds.get(id);

    if (previousSlug !== undefined) {
      failures.push(
        `${story.slug}: duplicate generated Openstory story id ${id} also used by ${previousSlug}`
      );
    }

    storyIds.set(id, story.slug);
  }
}

for (const [relativeFilePath] of generated.files) {
  const absoluteFilePath = path.resolve(relativeFilePath);

  if (!existsSync(absoluteFilePath)) {
    continue;
  }

  const source = readFileSync(absoluteFilePath, "utf-8");

  for (const match of source.matchAll(importPattern)) {
    const sourceLane = match[1];
    const slug = match[2];
    importsBySlug.set(slug, (importsBySlug.get(slug) ?? 0) + 1);

    if (!existsSync(path.join("registry", sourceLane, "examples", slug, "main.ts"))) {
      failures.push(`${relativeFilePath}: imports missing example ${slug}`);
    }
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
    failures.push(`${slug}: imported but not discovered from filesystem`);
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
