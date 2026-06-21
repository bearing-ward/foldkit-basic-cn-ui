import { execSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

import { chromium } from "playwright";

import { readSourceRegistryItems } from "./registry-manifest.mjs";

const fixturesPath = "tests/e2e/origin-parity/fixtures.json";
const referencesDir = "tests/e2e/origin-parity/references";
const viewport = { width: 1280, height: 900 };

const allowedOrigins = [
  "https://base-ui.com/",
  "https://ui.shadcn.com/",
];

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

const readFixtures = async () =>
  JSON.parse(await fs.readFile(fixturesPath, "utf-8")).items;

const readOriginBackedUiItems = async () =>
  (await readSourceRegistryItems())
    .filter((item) => item.type === "registry:ui")
    .filter((item) => item.meta?.foldkit?.public !== false)
    .filter(
      (item) => originLane(item.meta?.foldkit?.origin ?? "") !== undefined
    )
    .toSorted((left, right) => left.name.localeCompare(right.name));

const parseArgs = () => {
  const args = process.argv.slice(2);

  if (args.length === 1 && args[0] === "--all") {
    return { all: true };
  }

  if (args.length === 2 && args[0] === "--item") {
    return { itemName: args[1] };
  }

  throw new Error("Usage: bun run origin:parity:capture -- --item <name> | --all");
};

const validateFixturesAgainstRegistry = ({ fixtures, registryItems }) => {
  const failures = [];
  const fixtureByName = new Map();
  const registryItemByName = new Map(
    registryItems.map((item) => [item.name, item])
  );

  for (const fixture of fixtures) {
    if (typeof fixture.itemName !== "string" || fixture.itemName.length === 0) {
      failures.push("Fixture entry is missing itemName");
      continue;
    }

    if (fixtureByName.has(fixture.itemName)) {
      failures.push(`Duplicate fixture entry for ${fixture.itemName}`);
      continue;
    }

    fixtureByName.set(fixture.itemName, fixture);

    const registryItem = registryItemByName.get(fixture.itemName);

    if (registryItem === undefined) {
      failures.push(
        `Fixture entry ${fixture.itemName} has no public origin-backed registry UI item`
      );
      continue;
    }

    const expectedOriginUrl = registryItem.meta.foldkit.origin;
    const expectedLane = originLane(expectedOriginUrl);
    const expectedLocalPath = `/docs/components/${registryItem.name}`;

    if (fixture.originUrl !== expectedOriginUrl) {
      failures.push(
        `${fixture.itemName} originUrl mismatch: expected ${expectedOriginUrl}, got ${fixture.originUrl}`
      );
    }

    if (fixture.lane !== expectedLane) {
      failures.push(
        `${fixture.itemName} lane mismatch: expected ${expectedLane}, got ${fixture.lane}`
      );
    }

    if (fixture.localPath !== expectedLocalPath) {
      failures.push(
        `${fixture.itemName} localPath mismatch: expected ${expectedLocalPath}, got ${fixture.localPath}`
      );
    }
  }

  for (const registryItem of registryItems) {
    if (!fixtureByName.has(registryItem.name)) {
      failures.push(`Missing fixture entry for ${registryItem.name}`);
    }
  }

  if (failures.length > 0) {
    console.error("Origin visual parity capture fixture validation failed:");
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exit(1);
  }
};

const ensureAllowedOrigin = (originUrl) => {
  if (!allowedOrigins.some((allowedOrigin) => originUrl.startsWith(allowedOrigin))) {
    throw new Error(`Refusing to capture non-allowlisted origin URL: ${originUrl}`);
  }
};

const gitSha = () =>
  execSync("git rev-parse HEAD", { encoding: "utf-8" }).trim();

const normalizeElement = (element, computedStyleProperties) => {
  const volatileAttributes = new Set([
    "aria-controls",
    "aria-describedby",
    "aria-labelledby",
    "for",
    "id",
    "style",
  ]);
  const stableAttributes = [
    "aria-disabled",
    "aria-expanded",
    "aria-haspopup",
    "aria-label",
    "aria-orientation",
    "aria-pressed",
    "aria-selected",
    "data-disabled",
    "data-orientation",
    "data-state",
    "disabled",
    "href",
    "role",
    "type",
  ];
  const attributes = Object.fromEntries(
    stableAttributes
      .filter((attributeName) => !volatileAttributes.has(attributeName))
      .map((attributeName) => [
        attributeName,
        element.getAttribute(attributeName),
      ])
      .filter(([, value]) => value !== null)
  );
  const style = getComputedStyle(element);
  const rect = element.getBoundingClientRect();
  const computedStyle = Object.fromEntries(
    computedStyleProperties.map((propertyName) => [
      propertyName,
      style.getPropertyValue(propertyName),
    ])
  );
  const classTokens = [...element.classList].toSorted();

  return {
    dom: {
      tagName: element.tagName.toLowerCase(),
      text: (element.textContent ?? "").trim().replace(/\s+/gu, " "),
      attributes,
    },
    classTokens,
    computedStyle,
    geometry: {
      width: rect.width,
      height: rect.height,
    },
  };
};

const fixtures = await readFixtures();
const registryItems = await readOriginBackedUiItems();
validateFixturesAgainstRegistry({ fixtures, registryItems });

const args = parseArgs();
const requestedFixtures = args.all
  ? fixtures
  : fixtures.filter((fixture) => fixture.itemName === args.itemName);

if (requestedFixtures.length === 0) {
  throw new Error(`Unknown origin parity fixture item: ${args.itemName}`);
}

for (const fixture of requestedFixtures) {
  ensureAllowedOrigin(fixture.originUrl);
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  colorScheme: "light",
  deviceScaleFactor: 1,
  locale: "en-US",
  reducedMotion: "reduce",
  timezoneId: "UTC",
  viewport,
});
const userAgent = await context.newPage().then(async (page) => {
  const value = await page.evaluate(() => navigator.userAgent);
  await page.close();
  return value;
});
const sha = gitSha();
let capturedCount = 0;
let skippedCount = 0;

try {
  for (const fixture of requestedFixtures) {
    const enabledExamples = fixture.examples.filter(isEnabledExample);

    if (enabledExamples.length === 0) {
      skippedCount += fixture.examples.length;
      continue;
    }

    const page = await context.newPage();
    await page.goto(fixture.originUrl, {
      waitUntil: "networkidle",
      timeout: 60_000,
    });

    for (const example of enabledExamples) {
      const locator = page.locator(example.originSelector).first();
      await locator.waitFor({ state: "visible", timeout: 15_000 });

      const referencePath = path.join(
        referencesDir,
        fixture.itemName,
        example.exampleName
      );
      await fs.mkdir(path.dirname(referencePath), { recursive: true });

      const normalized = await locator.evaluate(
        normalizeElement,
        example.compare.computedStyle
      );
      const reference = {
        metadata: {
          capturedAt: new Date().toISOString(),
          gitSha: sha,
          originUrl: fixture.originUrl,
          selector: example.originSelector,
          userAgent,
          viewport,
        },
        ...normalized,
      };

      await fs.writeFile(
        `${referencePath}.json`,
        `${JSON.stringify(reference, null, 2)}\n`
      );

      if (example.compare.screenshot === true) {
        await locator.screenshot({
          animations: "disabled",
          caret: "hide",
          path: `${referencePath}.png`,
        });
      }

      capturedCount += 1;
    }

    await page.close();
  }
} finally {
  await browser.close();
}

console.log(
  `Captured ${capturedCount} origin visual parity examples; skipped ${skippedCount} inventory-only examples`
);
