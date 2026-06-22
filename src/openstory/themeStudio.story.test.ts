import { describe, expect, test } from "vitest";

import {
  baseColorOptionsForStyle,
  init,
  SelectedThemeStudioBaseColor,
  SelectedThemeStudioMode,
  SelectedThemeStudioPreviewBlock,
  SelectedThemeStudioStyle,
  selectedPreviewBlock,
  selectedPreviewBlockDownloadHref,
  selectedThemeDownloadHref,
  themeStudioCatalog,
  themeStudioStyleProperties,
  update,
} from "./themeStudio";

describe("Theme Studio program", () => {
  test("defaults to the generated shadcn theme catalog", () => {
    const [model, commands] = init();

    expect(commands).toEqual([]);
    expect(model).toMatchObject({
      selectedStyle: "rhea",
      selectedBaseColor: "neutral",
      selectedMode: "light",
      selectedPreviewBlockId: themeStudioCatalog.previewBlocks[0]?.id,
    });
    expect(selectedThemeDownloadHref(model)).toBe("/foldkit-theme-rhea-neutral.json");
    expect(selectedPreviewBlockDownloadHref(model)).toMatch(/^\/.+\.json$/u);
  });

  test("keeps unknown selections from mutating valid state", () => {
    const [model] = init();
    const [afterStyle] = update(
      model,
      SelectedThemeStudioStyle({ value: "unknown" })
    );
    const [afterBaseColor] = update(
      model,
      SelectedThemeStudioBaseColor({ value: "unknown" })
    );
    const [afterMode] = update(model, SelectedThemeStudioMode({ value: "sepia" }));
    const [afterBlock] = update(
      model,
      SelectedThemeStudioPreviewBlock({ value: "unknown" })
    );

    expect(afterStyle).toBe(model);
    expect(afterBaseColor).toBe(model);
    expect(afterMode).toBe(model);
    expect(afterBlock).toBe(model);
  });

  test("falls back to the first available base color when style changes", () => {
    const [model] = init();
    const nextStyle = themeStudioCatalog.styleOptions[0]?.value ?? "rhea";
    const [updated] = update(
      { ...model, selectedBaseColor: "not-for-this-style" },
      SelectedThemeStudioStyle({ value: nextStyle })
    );

    expect(updated.selectedBaseColor).toBe(
      baseColorOptionsForStyle(nextStyle)[0]?.value
    );
  });

  test("renders all generated catalog options as active choices", () => {
    expect(themeStudioCatalog.styleOptions.map((option) => option.value)).toContain(
      "rhea"
    );
    expect(themeStudioCatalog.modeOptions.map((option) => option.value)).toEqual([
      "light",
      "dark",
      "system",
    ]);
    expect(themeStudioCatalog.cssVariablesOptions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ value: true, status: "active" }),
        expect.objectContaining({ value: false, status: "deferred" }),
      ])
    );
    expect(themeStudioCatalog.previewCoverage.length).toBeGreaterThanOrEqual(21);
  });

  test("resolves preview block switching and theme CSS variables", () => {
    const [model] = init();
    const nextBlock = themeStudioCatalog.previewBlocks.find(
      (block) => block.id !== model.selectedPreviewBlockId
    );

    expect(nextBlock).toBeDefined();
    const [updated] = update(
      model,
      SelectedThemeStudioPreviewBlock({ value: nextBlock?.id ?? "" })
    );

    expect(selectedPreviewBlock(updated).id).toBe(nextBlock?.id);
    expect(themeStudioStyleProperties(model)["--primary"]).toMatch(/^oklch\(/u);
    expect(themeStudioStyleProperties(model)["--radius-md"]).toBe(
      "calc(0.625rem - 2px)"
    );
  });
});
