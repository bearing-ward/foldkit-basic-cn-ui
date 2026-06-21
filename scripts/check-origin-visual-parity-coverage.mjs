import fs from "node:fs";
import path from "node:path";

import { readSourceRegistryItems } from "./registry-manifest.mjs";

const fixturesPath = "tests/e2e/origin-parity/fixtures.json";

const originLane = (origin) => {
  if (origin.startsWith("https://base-ui.com/")) {
    return "base-ui";
  }

  if (origin.startsWith("https://ui.shadcn.com/")) {
    return "shadcn";
  }

  return undefined;
};

const isEnabledExample = (example) =>
  example.compare.dom === true ||
  example.compare.classTokens === true ||
  (Array.isArray(example.compare.computedStyle) &&
    example.compare.computedStyle.length > 0) ||
  example.compare.geometry === true ||
  example.compare.screenshot === true;

const registryItems = await readSourceRegistryItems();
const originBackedUiItems = registryItems
  .filter((item) => item.type === "registry:ui")
  .filter((item) => item.meta?.foldkit?.public !== false)
  .filter((item) => originLane(item.meta?.foldkit?.origin ?? "") !== undefined)
  .toSorted((left, right) => left.name.localeCompare(right.name));

const fixtures = JSON.parse(fs.readFileSync(fixturesPath, "utf-8"));

if (!Array.isArray(fixtures.items)) {
  throw new TypeError(`${fixturesPath} must contain an items array`);
}

const fixtureByName = new Map();
const failures = [];

for (const fixture of fixtures.items) {
  if (typeof fixture.itemName !== "string" || fixture.itemName.length === 0) {
    failures.push("Fixture entry is missing itemName");
    continue;
  }

  if (fixtureByName.has(fixture.itemName)) {
    failures.push(`Duplicate fixture entry for ${fixture.itemName}`);
    continue;
  }

  fixtureByName.set(fixture.itemName, fixture);
}

const expectedByName = new Map(
  originBackedUiItems.map((item) => [item.name, item])
);

for (const item of originBackedUiItems) {
  const fixture = fixtureByName.get(item.name);
  const expectedLane = originLane(item.meta.foldkit.origin);

  if (fixture === undefined) {
    failures.push(`Missing fixture entry for ${item.name}`);
    continue;
  }

  if (fixture.originUrl !== item.meta.foldkit.origin) {
    failures.push(
      `${item.name} originUrl mismatch: expected ${item.meta.foldkit.origin}, got ${fixture.originUrl}`
    );
  }

  if (fixture.localPath !== `/docs/components/${item.name}`) {
    failures.push(
      `${item.name} localPath mismatch: expected /docs/components/${item.name}, got ${fixture.localPath}`
    );
  }

  if (fixture.lane !== expectedLane) {
    failures.push(
      `${item.name} lane mismatch: expected ${expectedLane}, got ${fixture.lane}`
    );
  }

  if (!Array.isArray(fixture.examples) || fixture.examples.length === 0) {
    failures.push(`${item.name} must define at least one example`);
    continue;
  }

  for (const example of fixture.examples) {
    const prefix = `${item.name}/${example.exampleName ?? "<missing>"}`;

    if (
      typeof example.exampleName !== "string" ||
      example.exampleName.length === 0
    ) {
      failures.push(`${item.name} has an example without exampleName`);
    }

    if (
      typeof example.localTestId !== "string" ||
      example.localTestId.length === 0
    ) {
      failures.push(`${prefix} is missing localTestId`);
    }

    if (
      typeof example.originSelector !== "string" ||
      example.originSelector.length === 0
    ) {
      failures.push(`${prefix} is missing originSelector`);
    }

    if (
      example.compare === undefined ||
      typeof example.compare !== "object" ||
      !Array.isArray(example.compare.computedStyle)
    ) {
      failures.push(`${prefix} compare must include computedStyle array`);
      continue;
    }

    if (!isEnabledExample(example)) {
      continue;
    }

    const referenceBasePath = path.join(
      "tests/e2e/origin-parity/references",
      item.name,
      example.exampleName
    );

    if (
      (example.compare.dom === true ||
        example.compare.classTokens === true ||
        example.compare.computedStyle.length > 0 ||
        example.compare.geometry === true) &&
      !fs.existsSync(`${referenceBasePath}.json`)
    ) {
      failures.push(`${prefix} is missing ${referenceBasePath}.json`);
    }

    if (
      example.compare.screenshot === true &&
      !fs.existsSync(`${referenceBasePath}.png`)
    ) {
      failures.push(`${prefix} is missing ${referenceBasePath}.png`);
    }
  }
}

for (const fixtureName of fixtureByName.keys()) {
  if (!expectedByName.has(fixtureName)) {
    failures.push(`Fixture entry ${fixtureName} has no public origin-backed registry UI item`);
  }
}

if (failures.length > 0) {
  console.error("Origin visual parity coverage failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

const laneCounts = originBackedUiItems.reduce(
  (counts, item) => {
    const lane = originLane(item.meta.foldkit.origin);
    counts[lane] += 1;
    return counts;
  },
  { "base-ui": 0, shadcn: 0 }
);
const activeExamples = fixtures.items.flatMap((fixture) =>
  fixture.examples.filter(isEnabledExample)
);
const inventoryOnlyExamples = fixtures.items.flatMap((fixture) =>
  fixture.examples.filter((example) => !isEnabledExample(example))
);

console.log(
  `Origin visual parity coverage: ${originBackedUiItems.length} public origin-backed registry UI items (${laneCounts["base-ui"]} base-ui, ${laneCounts.shadcn} shadcn); ${activeExamples.length} active examples, ${inventoryOnlyExamples.length} inventory-only examples`
);
