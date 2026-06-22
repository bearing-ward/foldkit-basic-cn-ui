import { readFileSync } from "node:fs";
import path from "node:path";

import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

type CompareConfig = Readonly<{
  dom: boolean;
  classTokens: boolean;
  computedStyle: readonly string[];
  geometry: boolean;
  screenshot: boolean;
}>;

type ExampleFixture = Readonly<{
  exampleName: string;
  localTestId: string;
  originSelector: string;
  localSelector?: string;
  compare: CompareConfig;
  tolerances?: {
    computedPx?: number;
    heightPx?: number;
    maxDiffPixelRatio?: number;
    pixelChannelDelta?: number;
    widthPx?: number;
  };
  strictFontFamily?: boolean;
}>;

type ItemFixture = Readonly<{
  itemName: string;
  lane: "base-ui" | "shadcn";
  originUrl: string;
  localPath: string;
  examples: readonly ExampleFixture[];
}>;

type Reference = Readonly<{
  dom: {
    tagName: string;
    text: string;
    attributes: Record<string, string>;
  };
  classTokens: readonly string[];
  computedStyle: Record<string, string>;
  geometry: {
    width: number;
    height: number;
  };
}>;

const fixtures = JSON.parse(
  readFileSync("tests/e2e/origin-parity/fixtures.json", "utf-8")
) as { items: readonly ItemFixture[] };

const isEnabledExample = (example: ExampleFixture): boolean =>
  example.compare.dom ||
  example.compare.classTokens ||
  example.compare.computedStyle.length > 0 ||
  example.compare.geometry ||
  example.compare.screenshot;

const enabledFixtures = fixtures.items.flatMap((fixture) =>
  fixture.examples
    .filter(isEnabledExample)
    .map((example) => ({ fixture, example }))
);

const normalizeElement = (
  element: Element,
  computedStyleProperties: readonly string[]
) => {
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
      .map((attributeName) => [
        attributeName,
        element.getAttribute(attributeName),
      ])
      .filter((entry): entry is [string, string] => entry[1] !== null)
  );
  const style = getComputedStyle(element);
  const rect = element.getBoundingClientRect();
  const computedStyle = Object.fromEntries(
    computedStyleProperties.map((propertyName) => [
      propertyName,
      style.getPropertyValue(propertyName),
    ])
  );

  return {
    dom: {
      tagName: element.tagName.toLowerCase(),
      text: (element.textContent ?? "").trim().replace(/\s+/gu, " "),
      attributes,
    },
    classTokens: [...element.classList].toSorted(),
    computedStyle,
    geometry: {
      width: rect.width,
      height: rect.height,
    },
  };
};

const referencePath = (fixture: ItemFixture, example: ExampleFixture): string =>
  path.join(
    "tests/e2e/origin-parity/references",
    fixture.itemName,
    `${example.exampleName}.json`
  );

const referenceScreenshotPath = (
  fixture: ItemFixture,
  example: ExampleFixture
): string =>
  path.join(
    "tests/e2e/origin-parity/references",
    fixture.itemName,
    `${example.exampleName}.png`
  );

const pxNumber = (value: string): number | undefined => {
  const match = value.trim().match(/^(-?\d+(?:\.\d+)?)px$/u);

  return match === null ? undefined : Number(match[1]);
};

const expectComputedStyle = (
  actual: Record<string, string>,
  expected: Record<string, string>,
  example: ExampleFixture
) => {
  const pixelTolerance = example.tolerances?.computedPx ?? 0.75;

  for (const propertyName of example.compare.computedStyle) {
    if (propertyName === "font-family" && example.strictFontFamily !== true) {
      continue;
    }

    const actualValue = actual[propertyName] ?? "";
    const expectedValue = expected[propertyName] ?? "";
    const actualPx = pxNumber(actualValue);
    const expectedPx = pxNumber(expectedValue);

    if (actualPx !== undefined && expectedPx !== undefined) {
      expect(
        Math.abs(actualPx - expectedPx),
        `${example.exampleName} ${propertyName}`
      ).toBeLessThanOrEqual(pixelTolerance);
      continue;
    }

    expect(actualValue, `${example.exampleName} ${propertyName}`).toBe(
      expectedValue
    );
  }
};

const compareScreenshots = async ({
  actual,
  expected,
  page,
  pixelChannelDelta,
}: {
  actual: Buffer;
  expected: Buffer;
  page: Page;
  pixelChannelDelta: number;
}) =>
  page.evaluate(
    async ({ actualBase64, expectedBase64, pixelChannelDelta }) => {
      const decode = async (base64: string) => {
        const image = new Image();
        image.src = `data:image/png;base64,${base64}`;
        await image.decode();

        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const context = canvas.getContext("2d");

        if (context === null) {
          throw new Error("Could not create screenshot comparison canvas");
        }

        context.drawImage(image, 0, 0);

        return {
          data: context.getImageData(0, 0, canvas.width, canvas.height).data,
          height: canvas.height,
          width: canvas.width,
        };
      };
      const actualImage = await decode(actualBase64);
      const expectedImage = await decode(expectedBase64);
      const overlapWidth = Math.min(actualImage.width, expectedImage.width);
      const overlapHeight = Math.min(actualImage.height, expectedImage.height);
      let changedPixels = 0;

      for (let y = 0; y < overlapHeight; y += 1) {
        for (let x = 0; x < overlapWidth; x += 1) {
          const actualIndex = (y * actualImage.width + x) * 4;
          const expectedIndex = (y * expectedImage.width + x) * 4;
          const channelDelta = Math.max(
            Math.abs(actualImage.data[actualIndex] - expectedImage.data[expectedIndex]),
            Math.abs(
              actualImage.data[actualIndex + 1] -
                expectedImage.data[expectedIndex + 1]
            ),
            Math.abs(
              actualImage.data[actualIndex + 2] -
                expectedImage.data[expectedIndex + 2]
            ),
            Math.abs(
              actualImage.data[actualIndex + 3] -
                expectedImage.data[expectedIndex + 3]
            )
          );

          if (channelDelta > pixelChannelDelta) {
            changedPixels += 1;
          }
        }
      }

      const actualArea = actualImage.width * actualImage.height;
      const expectedArea = expectedImage.width * expectedImage.height;
      const overlapArea = overlapWidth * overlapHeight;
      const largerArea = Math.max(actualArea, expectedArea);
      const edgeArea = largerArea - overlapArea;

      return {
        changedPixels,
        edgeArea,
        height: actualImage.height,
        ratio: (changedPixels + edgeArea) / largerArea,
        referenceHeight: expectedImage.height,
        referenceWidth: expectedImage.width,
        width: actualImage.width,
      };
    },
    {
      actualBase64: actual.toString("base64"),
      expectedBase64: expected.toString("base64"),
      pixelChannelDelta,
    }
  );

test.beforeEach(async ({ page }) => {
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());

    if (
      url.protocol === "data:" ||
      url.protocol === "blob:" ||
      url.protocol === "about:" ||
      url.hostname === "localhost" ||
      url.hostname === "127.0.0.1" ||
      url.hostname === "::1"
    ) {
      await route.continue();
      return;
    }

    await route.abort();
  });
});

for (const { fixture, example } of enabledFixtures) {
  test(`${fixture.itemName} ${example.exampleName} matches stored origin reference`, async ({
    page,
  }) => {
    const reference = JSON.parse(
      readFileSync(referencePath(fixture, example), "utf-8")
    ) as Reference;

    await page.goto(`/__story/${fixture.itemName}--${example.exampleName}`);
    const localRoot =
      example.localSelector === undefined
        ? page.locator("body")
        : page.locator(example.localSelector).first();
    await expect(localRoot).toBeVisible();

    const actual = await localRoot.evaluate(
      normalizeElement,
      example.compare.computedStyle
    );

    if (example.compare.dom) {
      expect(actual.dom).toEqual(reference.dom);
    }

    if (example.compare.classTokens) {
      expect(actual.classTokens).toEqual(reference.classTokens);
    }

    if (example.compare.computedStyle.length > 0) {
      expectComputedStyle(
        actual.computedStyle,
        reference.computedStyle,
        example
      );
    }

    if (example.compare.geometry) {
      expect(Math.abs(actual.geometry.width - reference.geometry.width)).toBeLessThanOrEqual(
        example.tolerances?.widthPx ?? 0.75
      );
      expect(Math.abs(actual.geometry.height - reference.geometry.height)).toBeLessThanOrEqual(
        example.tolerances?.heightPx ?? 0.75
      );
    }

    if (example.compare.screenshot) {
      const screenshot = await localRoot.screenshot({
        animations: "disabled",
        caret: "hide",
      });
      const screenshotDiff = await compareScreenshots({
        actual: screenshot,
        expected: readFileSync(referenceScreenshotPath(fixture, example)),
        page,
        pixelChannelDelta: example.tolerances?.pixelChannelDelta ?? 16,
      });

      expect(
        Math.abs(screenshotDiff.width - screenshotDiff.referenceWidth)
      ).toBeLessThanOrEqual(example.tolerances?.widthPx ?? 0.75);
      expect(
        Math.abs(screenshotDiff.height - screenshotDiff.referenceHeight)
      ).toBeLessThanOrEqual(example.tolerances?.heightPx ?? 0.75);
      expect(screenshotDiff.ratio).toBeLessThanOrEqual(
        example.tolerances?.maxDiffPixelRatio ?? 0.01
      );
    }
  });
}
