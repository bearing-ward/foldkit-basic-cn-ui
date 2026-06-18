import path from "node:path";

import { defaultRootDir, readJson } from "./registry-manifest.mjs";

const rootRegistry = await readJson(path.join(defaultRootDir, "registry/registry.json"));
const failures = [];
const expectedIncludes = [
  "registry/foldkit/registry.json",
  "registry/base-ui/registry.json",
  "registry/shadcn/registry.json",
  "registry/ai-elements/registry.json",
];
const typeOrder = ["registry:ui", "registry:example"];
const typeRank = new Map(typeOrder.map((type, index) => [type, index]));

const compareItems = (left, right) => {
  const leftRank = typeRank.get(left.type) ?? typeOrder.length;
  const rightRank = typeRank.get(right.type) ?? typeOrder.length;

  if (leftRank !== rightRank) {
    return leftRank - rightRank;
  }

  if (left.type !== right.type) {
    return left.type.localeCompare(right.type);
  }

  return left.name.localeCompare(right.name);
};

if (JSON.stringify(rootRegistry.include) !== JSON.stringify(expectedIncludes)) {
  failures.push(
    `root include order must be ${expectedIncludes.join(", ")}`
  );
}

let itemCount = 0;

for (const includePath of rootRegistry.include ?? []) {
  const registry = await readJson(path.join(defaultRootDir, includePath));
  const registryItems = registry.items ?? [];
  const sortedItems = [...registryItems].toSorted(compareItems);
  itemCount += registryItems.length;

  for (const [index, item] of registryItems.entries()) {
    const expected = sortedItems[index];

    if (item.name !== expected.name || item.type !== expected.type) {
      failures.push(
        `${includePath} item ${index + 1}: expected ${expected.type}/${expected.name}, got ${item.type}/${item.name}`
      );
    }
  }
}

if (failures.length > 0) {
  console.error("Registry order guardrail failed:");
  for (const failure of failures.slice(0, 20)) {
    console.error(`- ${failure}`);
  }

  if (failures.length > 20) {
    console.error(`- ${failures.length - 20} more ordering failures`);
  }

  process.exit(1);
}

console.log(`Checked registry order for ${itemCount} items`);
