import { describe, expect, test } from "vitest";

import themeContract from "../../registry/upstream/derived/shadcn-theme.json";
import {
  baseColorOptionsForStyle,
  ClickedThemeStudioOpenPreset,
  ClickedThemeStudioShuffle,
  init,
  initFromGlobals,
  SelectedThemeStudioBaseColor,
  SelectedThemeStudioChartColor,
  SelectedThemeStudioMode,
  SelectedThemeStudioPreviewBlock,
  SelectedThemeStudioRadius,
  SelectedThemeStudioStyle,
  selectedPreviewBlock,
  selectedPreviewBlockDownloadHref,
  selectedResolvedTheme,
  selectedThemeDownloadHref,
  themeStudioCatalog,
  themeStudioStyleProperties,
  update,
} from "./themeStudio";

describe("Theme Studio program", () => {
  test("defaults to the source shadcn theme contract", () => {
    const [model, commands] = init();
    const sourceDefaultStyle = themeContract.styleNames.includes(
      themeContract.defaultStyle
    )
      ? themeContract.defaultStyle
      : themeStudioCatalog.styleOptions[0]?.value;
    const sourceDefaultBaseColor = baseColorOptionsForStyle(
      sourceDefaultStyle ?? ""
    ).some((option) => option.value === themeContract.defaultBaseColor)
      ? themeContract.defaultBaseColor
      : baseColorOptionsForStyle(sourceDefaultStyle ?? "")[0]?.value;
    const sourceDefaultMode = ["light", "dark", "system"].includes(
      themeContract.defaultMode
    )
      ? themeContract.defaultMode
      : "light";

    expect(commands).toEqual([]);
    expect(model).toMatchObject({
      selectedStyle: sourceDefaultStyle,
      selectedBaseColor: sourceDefaultBaseColor,
      selectedMode: sourceDefaultMode,
      selectedPreviewBlockId: themeStudioCatalog.previewBlocks[0]?.id,
    });
    expect(selectedThemeDownloadHref(model)).toBe(
      `/foldkit-theme-${sourceDefaultStyle}-${sourceDefaultBaseColor}.json`
    );
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
    expect(themeStudioCatalog.previewBlocks.length).toBeGreaterThanOrEqual(12);
  });

  test("keeps CSS variable option statuses source-driven", () => {
    expect(themeStudioCatalog.cssVariablesOptions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: true,
          title: "CSS variables",
          status: "active",
          download: true,
        }),
        expect.objectContaining({
          value: false,
          title: "Utility classes",
          status: "deferred",
          download: false,
        }),
      ])
    );
  });

  test("initializes from OpenStory globals and emits sync commands on card changes", () => {
    const [model] = initFromGlobals({
      shadcnTheme: "rhea-amber",
      shadcnMode: "dark",
    });

    expect(model).toMatchObject({
      selectedStyle: "rhea",
      selectedBaseColor: "amber",
      selectedMode: "dark",
    });

    const [updated, commands] = update(
      model,
      SelectedThemeStudioBaseColor({ value: "cyan" })
    );

    expect(updated.selectedBaseColor).toBe("cyan");
    expect(commands).toEqual([
      expect.objectContaining({
        name: "SyncOpenStoryGlobals",
        args: {
          shadcnTheme: "rhea-cyan",
          shadcnMode: "dark",
        },
      }),
    ]);
  });

  test("exposes origin card rows and component inventory from catalog data", () => {
    expect(themeStudioCatalog.themeCardOptions.map((row) => row.title)).toEqual([
      "Style",
      "Base Color",
      "Theme",
      "Chart Color",
      "Heading",
      "Font",
      "Icon Library",
      "Radius",
      "Menu",
      "Menu Accent",
    ]);
    expect(
      themeStudioCatalog.themeCardOptions
        .filter((row) => row.status === "active")
        .map((row) => row.id)
    ).toEqual([
      "style",
      "base-color",
      "theme",
      "chart-color",
      "heading",
      "font",
      "icon-library",
      "radius",
      "menu",
      "menu-accent",
    ]);
    expect(
      themeStudioCatalog.themeCardOptions.find((row) => row.id === "chart-color")
    ).toEqual(
      expect.objectContaining({
        status: "active",
        options: expect.arrayContaining([
          expect.objectContaining({ value: "neutral" }),
        ]),
      })
    );
    expect(themeStudioCatalog.themeCardOptions.find((row) => row.id === "radius")).toEqual(
      expect.objectContaining({
        status: "active",
        selectedValue: "md",
        options: expect.arrayContaining([
          expect.objectContaining({ value: "xl", title: "Xl" }),
        ]),
      })
    );
    expect(themeStudioCatalog.componentInventory.length).toBeGreaterThanOrEqual(24);
    expect(
      themeStudioCatalog.previewCoverage.find(
        (row) => row.id === "recent-transactions"
      )?.dependencies
    ).toContain("data-list");
  });

  test("updates customizer-only controls and footer actions", () => {
    const [model] = init();

    const [chartModel] = update(
      model,
      SelectedThemeStudioChartColor({ value: "amber" })
    );
    const [radiusModel] = update(
      chartModel,
      SelectedThemeStudioRadius({ value: "xl" })
    );
    const [presetModel, presetCommands] = update(
      radiusModel,
      ClickedThemeStudioOpenPreset()
    );
    const [shuffleModel, shuffleCommands] = update(
      presetModel,
      ClickedThemeStudioShuffle()
    );

    expect(chartModel.selectedChartColor).toBe("amber");
    expect(radiusModel.selectedRadius).toBe("xl");
    expect(themeStudioStyleProperties(radiusModel)["--radius"]).toBe("0.875rem");
    expect(presetModel).toMatchObject({
      selectedBaseColor: "neutral",
      selectedChartColor: "neutral",
      selectedRadius: "md",
    });
    expect(presetCommands).toEqual([
      expect.objectContaining({
        name: "SyncOpenStoryGlobals",
        args: {
          shadcnTheme: `${presetModel.selectedStyle}-neutral`,
          shadcnMode: "light",
        },
      }),
    ]);
    expect(`${shuffleModel.selectedStyle}-${shuffleModel.selectedBaseColor}`).not.toBe(
      `${presetModel.selectedStyle}-${presetModel.selectedBaseColor}`
    );
    expect(shuffleCommands).toEqual([
      expect.objectContaining({
        name: "SyncOpenStoryGlobals",
      }),
    ]);
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

  test("uses one resolved theme for selected classes and tokens", () => {
    const [model] = init();
    const [darkModel] = update(model, SelectedThemeStudioMode({ value: "dark" }));

    expect(selectedResolvedTheme(darkModel)).toMatchObject({
      style: darkModel.selectedStyle,
      baseColor: darkModel.selectedBaseColor,
      requestedMode: "dark",
      resolvedMode: "dark",
    });
    expect(themeStudioStyleProperties(darkModel)["--background"]).toMatch(
      /^oklch\(/u
    );
  });
});
