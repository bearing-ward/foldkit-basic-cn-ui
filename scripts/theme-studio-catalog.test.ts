import { describe, expect, test } from "vitest";

import themeContract from "../registry/upstream/derived/shadcn-theme.json";
import previewInventory from "../registry/upstream/derived/shadcn-preview-02.json";
import { readSourceRegistryItems } from "./registry-manifest.mjs";
import { createThemeStudioCatalog } from "./theme-studio-catalog.mjs";

const catalogForTest = async () =>
  createThemeStudioCatalog({
    themeContract,
    previewInventory,
    registryItems: await readSourceRegistryItems(),
  });

describe("Theme Studio catalog", () => {
  test("includes every source style with entries", async () => {
    const catalog = await catalogForTest();
    const stylesWithEntries = new Set(
      themeContract.themes.map((theme) => theme.style)
    );

    expect(catalog.styleOptions.map((option) => option.value)).toEqual(
      themeContract.styleNames.filter((style) => stylesWithEntries.has(style))
    );
  });

  test("does not invent base colors for a style", async () => {
    const catalog = await catalogForTest();

    for (const [style, options] of Object.entries(
      catalog.baseColorOptionsByStyle
    )) {
      const sourceBaseColors = new Set(
        themeContract.themes
          .filter((theme) => theme.style === style)
          .map((theme) => theme.baseColor)
      );

      for (const option of options) {
        expect(sourceBaseColors.has(option.value)).toBe(true);
      }
    }
  });

  test("generates shadcn theme payloads with light and dark cssVars", async () => {
    const catalog = await catalogForTest();

    for (const item of catalog.generatedRegistryItems) {
      expect(item.type).toBe("registry:theme");
      expect(item.cssVars.light).toBeDefined();
      expect(item.cssVars.dark).toBeDefined();
      expect(item.cssVars).not.toHaveProperty("system");
      expect(item.cssVars.light.radius).toBeDefined();
      expect(item.cssVars.dark.radius).toBeDefined();
    }
  });

  test("inventories theming-page options as active or deferred", async () => {
    const catalog = await catalogForTest();
    const optionIds = catalog.themingOptions.map((option) => option.id);

    expect(optionIds).toEqual(
      expect.arrayContaining([
        "style",
        "tailwind.baseColor",
        "tailwind.cssVariables.true",
        "tailwind.cssVariables.false",
        "mode",
        "semanticTokens",
        "radiusScale",
        "defaultThemeCss",
      ])
    );
    for (const option of catalog.themingOptions) {
      expect(["active", "deferred"]).toContain(option.status);
    }
  });

  test("keeps every preview-02 row categorized", async () => {
    const catalog = await catalogForTest();

    expect(catalog.previewCoverage.length).toBeGreaterThanOrEqual(21);
    for (const row of catalog.previewCoverage) {
      expect(["rendered", "covered-by-existing-example", "deferred"]).toContain(
        row.status
      );
    }
  });

  test("gives every rendered preview block a download href", async () => {
    const catalog = await catalogForTest();

    expect(catalog.previewBlocks.length).toBeGreaterThanOrEqual(12);
    for (const block of catalog.previewBlocks) {
      expect(block.downloadHref).toMatch(/^\/.+\.json$/u);
    }
  });
});
