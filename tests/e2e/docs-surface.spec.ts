import { readFileSync } from "node:fs";

import { expect, test } from "@playwright/test";

const registryItems = JSON.parse(
  readFileSync("registry/default/items.json", "utf-8")
) as readonly {
  name: string;
  type: string;
  meta?: { foldkit?: { origin?: string } };
}[];
const registryConfig = JSON.parse(
  readFileSync("registry/config.json", "utf-8")
) as { registryBaseUrl: string };

const componentNames = registryItems
  .filter((item) => item.type === "registry:ui")
  .map((item) => item.name);

const baseUiComponentNames = new Set(
  registryItems
    .filter(
      (item) =>
        item.type === "registry:ui" && item.meta?.foldkit?.origin === "base-ui"
    )
    .map((item) => item.name)
);

const requiredSections = [
  "Overview",
  "Examples",
  "Installation",
  "Usage",
  "Foldkit integration",
  "Styling",
  "Keyboard interaction",
  "API reference",
  "Accessibility",
  "Coverage",
];

const sectionsForComponent = (componentName: string): readonly string[] =>
  baseUiComponentNames.has(componentName)
    ? requiredSections
        .filter(
          (section) =>
            section !== "Styling" && section !== "Keyboard interaction"
        )
        .toSpliced(5, 0, "Anatomy")
    : requiredSections;

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

        for (const section of sectionsForComponent(componentName)) {
          await expect(
            page.getByRole("heading", { name: section })
          ).toBeVisible();
        }

        if (componentName === "progress") {
          await expect(
            page.getByText("labelStyle", { exact: true })
          ).toBeVisible();
          await expect(
            page.getByText("indicatorStyle", { exact: true })
          ).toBeVisible();
          await expect(
            page.getByText("data-progressing", { exact: true }).first()
          ).toBeVisible();
          await expect(
            page.getByRole("heading", { name: "Styling" })
          ).toHaveCount(0);
          await expect(
            page.getByRole("heading", { name: "Keyboard interaction" })
          ).toHaveCount(0);
        }

        await expect(page.getByText("<registry-url>")).toHaveCount(0);
        await expect(
          page.getByText(
            `${registryConfig.registryBaseUrl}/${componentName}.json`
          )
        ).toBeVisible();
        await expect(page.getByText(/Open standalone/u)).toHaveCount(0);
        const firstCodeToggle = page.getByText("View code").first();

        await expect(firstCodeToggle).toBeVisible();
        await firstCodeToggle.click();
        await expect(
          page
            .locator(
              '[data-testid^="docs-example-block-"][data-testid$="-actions"] iframe'
            )
            .first()
        ).toHaveAttribute("src", /\/sources\/.+\.txt/u);
        const sourceFrame = page
          .locator(
            '[data-testid^="docs-example-block-"][data-testid$="-actions"] iframe'
          )
          .first();
        await expect
          .poll(() =>
            sourceFrame.evaluate((iframe) => {
              const frame = iframe as HTMLIFrameElement;
              const body = frame.contentDocument?.body;

              return body?.textContent?.trim().length ?? 0;
            })
          )
          .toBeGreaterThan(100);
        const sourceViewer = await sourceFrame.evaluate((iframe) => {
          const frame = iframe as HTMLIFrameElement;
          const frameStyles = getComputedStyle(frame);
          const body = frame.contentDocument?.body;
          const bodyStyles =
            body === undefined || body === null
              ? undefined
              : getComputedStyle(body);

          return {
            frameBackground: frameStyles.backgroundColor,
            textColor: bodyStyles?.color,
          };
        });

        expect(sourceViewer.frameBackground).toBe("rgb(255, 255, 255)");
        expect(sourceViewer.textColor).toBe("rgb(0, 0, 0)");

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
            const codeToggle = actions?.querySelector("summary");
            const actionLinks = actions?.querySelectorAll("a") ?? [];
            const codeToggleIssues =
              codeToggle === undefined || codeToggle === null
                ? [`${testId}: missing code toggle`]
                : (() => {
                    const rect = codeToggle.getBoundingClientRect();

                    if (rect.height < 40) {
                      return [`${testId}: code toggle below 40px hit target`];
                    }

                    return [];
                  })();

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
              actionLinks.length > 0
                ? `${testId}: standalone example link rendered`
                : undefined,
              ...codeToggleIssues,
            ].filter((issue): issue is string => issue !== undefined);
          });
        });

        expect(issues).toEqual([]);
      });
    }
  });
}
