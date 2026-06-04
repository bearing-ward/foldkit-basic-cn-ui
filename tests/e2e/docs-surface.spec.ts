import { readFileSync } from "node:fs";

import { expect, test } from "@playwright/test";

const registryItems = JSON.parse(
  readFileSync("registry/default/items.json", "utf-8")
) as readonly { name: string; type: string }[];

const componentNames = registryItems
  .filter((item) => item.type === "registry:ui")
  .map((item) => item.name);

const requiredSections = [
  "Overview",
  "Examples",
  "Installation",
  "Usage",
  "Foldkit integration",
  "API",
  "Accessibility",
  "Coverage",
];

const viewports = [
  { name: "desktop", width: 1280, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

for (const viewport of viewports) {
  test.describe(`component docs surface (${viewport.name})`, () => {
    test.use({ viewport });

    for (const componentName of componentNames) {
      test(`${componentName} docs keep required layout contract`, async ({
        page,
      }) => {
        await page.goto(`/docs/components/${componentName}`);

        for (const section of requiredSections) {
          await expect(
            page.getByRole("heading", { name: section })
          ).toBeVisible();
        }

        const pageOverflow = await page.evaluate(
          () =>
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth
        );

        expect(pageOverflow).toBeLessThanOrEqual(1);

        const issues = await page.evaluate(() => {
          const blockSelector = '[data-testid^="docs-example-block-"]';
          const blocks = [...document.querySelectorAll(blockSelector)].filter(
            (element) => {
              const testId = element.dataset.testid ?? "";

              return (
                !testId.endsWith("-preview") && !testId.endsWith("-actions")
              );
            }
          );

          return blocks.flatMap((block) => {
            const testId = block.dataset.testid ?? "";
            const preview = document.querySelector(
              `[data-testid="${testId}-preview"]`
            );
            const actions = document.querySelector(
              `[data-testid="${testId}-actions"]`
            );
            const blockRect = block.getBoundingClientRect();
            const previewRect = preview?.getBoundingClientRect();
            const actionsRect = actions?.getBoundingClientRect();
            const actionLinks = actions
              ? [...actions.querySelectorAll("a")]
              : [];
            const linkIssues = actionLinks.flatMap((link) => {
              const rect = link.getBoundingClientRect();

              if (rect.height < 40) {
                return [`${testId}: action link below 40px hit target`];
              }

              return [];
            });

            return [
              preview === null
                ? `${testId}: missing preview region`
                : undefined,
              actions === null ? `${testId}: missing action region` : undefined,
              blockRect.width > document.documentElement.clientWidth + 1
                ? `${testId}: block overflows viewport`
                : undefined,
              previewRect !== undefined &&
              actionsRect !== undefined &&
              actionsRect.top < previewRect.bottom - 1
                ? `${testId}: actions overlap preview`
                : undefined,
              ...linkIssues,
            ].filter((issue): issue is string => issue !== undefined);
          });
        });

        expect(issues).toEqual([]);
      });
    }
  });
}
