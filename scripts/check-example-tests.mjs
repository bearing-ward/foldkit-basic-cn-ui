import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { readSourceRegistryItems } from "./registry-manifest.mjs";

const registryItems = await readSourceRegistryItems();

const interactionPatterns = [
  /Scene\.click\(/u,
  /Scene\.doubleClick\(/u,
  /Scene\.pointerDown\(/u,
  /Scene\.pointerUp\(/u,
  /Scene\.hover\(/u,
  /Scene\.focus\(/u,
  /Scene\.blur\(/u,
  /Scene\.change\(/u,
  /Scene\.changeFiles\(/u,
  /Scene\.dropFiles\(/u,
  /Scene\.submit\(/u,
  /Scene\.type\(/u,
  /Scene\.keydown\(/u,
  /Scene\.Command\.resolve/u,
  /Scene\.Command\.expectHas/u,
  /Scene\.Mount\.resolve/u,
  /Scene\.Mount\.expectHas/u,
];

const inertPatterns = [
  /\.toBeDisabled\(/u,
  /toHaveAttr\(\s*["']disabled["']/u,
  /toHaveAttr\(\s*["']aria-disabled["']/u,
  /not\.toHaveAttr\(\s*["']data-draggable-id["']/u,
  /not\.toHaveHandler\(/u,
];

const exampleItems = registryItems.filter(
  (item) => item.type === "registry:example"
);

const failures = [];

for (const item of exampleItems) {
  const sceneFiles = item.files
    .map((file) => file.path)
    .filter((filePath) => filePath.endsWith(".scene.test.ts"));

  if (sceneFiles.length === 0) {
    failures.push(`${item.name}: missing scene test file`);
    continue;
  }

  for (const sceneFile of sceneFiles) {
    const absoluteSceneFile = path.resolve(sceneFile);

    if (!existsSync(absoluteSceneFile)) {
      failures.push(`${item.name}: missing ${sceneFile}`);
      continue;
    }

    const source = readFileSync(absoluteSceneFile, "utf-8");
    const hasInteraction = interactionPatterns.some((pattern) =>
      pattern.test(source)
    );
    const hasInertAssertion = inertPatterns.some((pattern) =>
      pattern.test(source)
    );

    if (!hasInteraction && !hasInertAssertion) {
      failures.push(
        `${item.name}: ${sceneFile} must exercise behavior or assert disabled/inert state`
      );
    }
  }
}

if (failures.length > 0) {
  console.error("Example test guardrail failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Checked ${exampleItems.length} registry example scene tests`);
