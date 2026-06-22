import { Scene } from "foldkit";
import { describe, test } from "vitest";

import {
  baseColorOptionsForStyle,
  init,
  themeStudioCatalog,
  update,
  view,
} from "./themeStudio";

describe("Theme Studio scene", () => {
  test("renders controls, preview, state, and downloads", () => {
    const [model] = init();

    Scene.scene(
      { update, view },
      Scene.with(model),
      Scene.expect(Scene.testId("theme-studio-root")).toExist(),
      Scene.expect(Scene.role("combobox", { name: "Style" })).toHaveValue(
        model.selectedStyle
      ),
      Scene.expect(Scene.role("combobox", { name: "Base color" })).toHaveValue(
        model.selectedBaseColor
      ),
      Scene.expect(Scene.role("combobox", { name: "Mode" })).toHaveValue("light"),
      Scene.expect(Scene.role("combobox", { name: "Preview block" })).toHaveValue(
        model.selectedPreviewBlockId
      ),
      Scene.expect(Scene.testId("theme-studio-theme-download")).toHaveAttr(
        "href",
        "/foldkit-theme-rhea-neutral.json"
      ),
      Scene.expect(Scene.testId("theme-studio-block-download")).toHaveAttr(
        "href",
        themeStudioCatalog.previewBlocks[0]?.downloadHref ?? ""
      ),
      Scene.expect(Scene.testId("theme-studio-state")).toContainText(
        "rhea/neutral/light"
      )
    );
  });

  test("updates base color, mode, preview block, and download hrefs", () => {
    const [model] = init();
    const nextBaseColor =
      baseColorOptionsForStyle("rhea").find(
        (option) => option.value !== model.selectedBaseColor
      )?.value ?? "amber";
    const nextBlock =
      themeStudioCatalog.previewBlocks.find(
        (block) => block.id !== model.selectedPreviewBlockId
      ) ?? themeStudioCatalog.previewBlocks[0];

    Scene.scene(
      { update, view },
      Scene.with(model),
      Scene.change(Scene.role("combobox", { name: "Base color" }), nextBaseColor),
      Scene.change(Scene.role("combobox", { name: "Mode" }), "dark"),
      Scene.change(Scene.role("combobox", { name: "Preview block" }), nextBlock?.id ?? ""),
      Scene.expect(Scene.testId("theme-studio-preview")).toHaveAttr(
        "data-selected-base-color",
        nextBaseColor
      ),
      Scene.expect(Scene.testId("theme-studio-preview")).toHaveAttr(
        "data-selected-mode",
        "dark"
      ),
      Scene.expect(Scene.testId("theme-studio-state")).toContainText(
        `rhea/${nextBaseColor}/dark`
      ),
      Scene.expect(Scene.testId("theme-studio-theme-download")).toHaveAttr(
        "href",
        `/foldkit-theme-rhea-${nextBaseColor}.json`
      ),
      Scene.expect(Scene.testId("theme-studio-block-download")).toHaveAttr(
        "href",
        nextBlock?.downloadHref ?? ""
      )
    );
  });

  test("renders every catalog option in the controls", () => {
    const [model] = init();

    Scene.scene(
      { update, view },
      Scene.with(model),
      ...themeStudioCatalog.styleOptions.map((option) =>
        Scene.expect(Scene.text(option.title)).toExist()
      ),
      ...baseColorOptionsForStyle("rhea").map((option) =>
        Scene.expect(Scene.text(option.title)).toExist()
      ),
      ...themeStudioCatalog.previewBlocks.map((block) =>
        Scene.expect(Scene.text(block.title)).toExist()
      )
    );
  });
});
