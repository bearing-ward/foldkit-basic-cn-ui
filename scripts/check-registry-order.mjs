import { readFileSync } from "node:fs";

const registryItems = JSON.parse(
  readFileSync("registry/default/items.json", "utf-8")
);
const failures = [];
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

const sortedItems = [...registryItems].toSorted(compareItems);

for (const [index, item] of registryItems.entries()) {
  const expected = sortedItems[index];

  if (item.name !== expected.name || item.type !== expected.type) {
    failures.push(
      `item ${index + 1}: expected ${expected.type}/${expected.name}, got ${item.type}/${item.name}`
    );
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

console.log(`Checked registry order for ${registryItems.length} items`);
