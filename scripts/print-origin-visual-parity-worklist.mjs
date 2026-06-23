import fs from "node:fs";

const fixturesPath = "tests/e2e/origin-parity/fixtures.json";

const isEnabledExample = (example) =>
  example.compare.dom === true ||
  example.compare.classTokens === true ||
  (Array.isArray(example.compare.computedStyle) &&
    example.compare.computedStyle.length > 0) ||
  example.compare.geometry === true ||
  example.compare.screenshot === true;

const exampleNames = (examples) =>
  examples.map((example) => example.exampleName).join(",");

const fixtures = JSON.parse(fs.readFileSync(fixturesPath, "utf-8"));

if (!Array.isArray(fixtures.items)) {
  throw new TypeError(`${fixturesPath} must contain an items array`);
}

const workItems = fixtures.items
  .map((fixture) => {
    const activeExamples = fixture.examples.filter(isEnabledExample);
    const inventoryOnlyExamples = fixture.examples.filter(
      (example) => !isEnabledExample(example)
    );

    return {
      lane: fixture.lane,
      itemName: fixture.itemName,
      activeExamples,
      inventoryOnlyExamples,
    };
  })
  .filter((item) => item.inventoryOnlyExamples.length > 0)
  .toSorted(
    (left, right) =>
      String(left.lane).localeCompare(String(right.lane)) ||
      String(left.itemName).localeCompare(String(right.itemName))
  );

console.log(`components_needing_visual_parity_work=${workItems.length}`);

for (const item of workItems) {
  console.log(
    `${item.lane}\t${item.itemName}\tinventory_only=${exampleNames(
      item.inventoryOnlyExamples
    )}\tactive=${
      item.activeExamples.length > 0 ? exampleNames(item.activeExamples) : "-"
    }`
  );
}
