import { Scene } from "foldkit";
import { describe, test } from "vitest";

import themeContract from "../../registry/upstream/derived/shadcn-theme.json";
import {
  baseColorOptionsForStyle,
  CompletedSyncOpenStoryGlobals,
  init,
  SelectedThemeStudioPreviewBlock,
  SyncOpenStoryGlobals,
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
      Scene.expect(Scene.testId("theme-studio-origin-theme-card")).toExist(),
      Scene.expect(Scene.testId("theme-studio-origin-block-list")).toExist(),
      Scene.expect(Scene.testId("theme-studio-component-inventory")).toExist(),
      Scene.expect(Scene.role("combobox", { name: "Style" })).toHaveValue(
        model.selectedStyle
      ),
      Scene.expect(Scene.role("combobox", { name: "Base Color" })).toHaveValue(
        model.selectedBaseColor
      ),
      Scene.expect(Scene.role("combobox", { name: "Mode" })).toHaveValue(
        themeContract.defaultMode
      ),
      Scene.expect(Scene.role("combobox", { name: "Preview block" })).toHaveValue(
        model.selectedPreviewBlockId
      ),
      Scene.expect(Scene.testId("theme-studio-theme-download")).toHaveAttr(
        "href",
        `/foldkit-theme-${themeContract.defaultStyle}-${themeContract.defaultBaseColor}.json`
      ),
      Scene.expect(Scene.testId("theme-studio-block-download")).toHaveAttr(
        "href",
        themeStudioCatalog.previewBlocks[0]?.downloadHref ?? ""
      ),
      Scene.expect(Scene.testId("theme-studio-state")).toContainText(
        `${themeContract.defaultStyle}/${themeContract.defaultBaseColor}/${themeContract.defaultMode}`
      )
    );
  });

  test("renders CSS variable option statuses without selectable downloads", () => {
    const [model] = init();

    Scene.scene(
      { update, view },
      Scene.with(model),
      Scene.expect(Scene.testId("theme-studio-css-variable-options")).toExist(),
      Scene.expect(Scene.text("CSS variable mode")).toExist(),
      Scene.expect(Scene.text("CSS variables")).toExist(),
      Scene.expect(Scene.text("Active")).toExist(),
      Scene.expect(Scene.text("Utility classes")).toExist(),
      Scene.expect(Scene.text("Deferred")).toExist(),
      Scene.expect(
        Scene.text("source-owned style recipes", { exact: false })
      ).toExist()
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
      Scene.change(Scene.role("combobox", { name: "Base Color" }), nextBaseColor),
      Scene.Command.expectExact(
        SyncOpenStoryGlobals({
          shadcnTheme: `rhea-${nextBaseColor}`,
          shadcnMode: "light",
        })
      ),
      Scene.Command.resolve(
        SyncOpenStoryGlobals({
          shadcnTheme: `rhea-${nextBaseColor}`,
          shadcnMode: "light",
        }),
        CompletedSyncOpenStoryGlobals()
      ),
      Scene.change(Scene.role("combobox", { name: "Mode" }), "dark"),
      Scene.Command.expectExact(
        SyncOpenStoryGlobals({
          shadcnTheme: `rhea-${nextBaseColor}`,
          shadcnMode: "dark",
        })
      ),
      Scene.Command.resolve(
        SyncOpenStoryGlobals({
          shadcnTheme: `rhea-${nextBaseColor}`,
          shadcnMode: "dark",
        }),
        CompletedSyncOpenStoryGlobals()
      ),
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

  test.each(themeStudioCatalog.previewBlocks)(
    "wraps %s in the shared example frame",
    (block) => {
      const [model] = init();
      const [updated] = update(
        model,
        SelectedThemeStudioPreviewBlock({ value: block.id })
      );

      Scene.scene(
        { update, view },
        Scene.with(updated),
        Scene.expect(Scene.testId("theme-studio-example-frame")).toExist(),
        Scene.expect(Scene.testId("theme-studio-example-frame")).toHaveAttr(
          "data-max-height",
          "720px"
        ),
        Scene.expect(Scene.testId("theme-studio-primary-surface")).toExist(),
        Scene.expect(Scene.testId("theme-studio-accent-surface")).toExist(),
        Scene.expect(Scene.testId("theme-studio-border-surface")).toExist()
      );
    }
  );

  test("keeps the shared frame after switching between preview blocks", () => {
    const [model] = init();
    const blocks = themeStudioCatalog.previewBlocks.slice(0, 3);

    Scene.scene(
      { update, view },
      Scene.with(model),
      ...blocks.flatMap((block) => [
        Scene.change(Scene.role("combobox", { name: "Preview block" }), block.id),
        Scene.expect(Scene.testId("theme-studio-preview")).toHaveAttr(
          "data-selected-preview-block",
          block.id
        ),
        Scene.expect(Scene.testId("theme-studio-example-frame")).toHaveAttr(
          "data-max-height",
          "720px"
        ),
      ])
    );
  });

  test("switches representative preview content from the catalog", () => {
    const [model] = init();
    const representativeIds = [
      "sidebar-navigation",
      "selects-comboboxes",
      "calendar-date-controls",
      "upload-controls",
      "modal-drawer-surfaces",
    ];

    Scene.scene(
      { update, view },
      Scene.with(model),
      ...representativeIds.flatMap((id) => {
        const block = themeStudioCatalog.previewBlocks.find(
          (candidate) => candidate.id === id
        );

        return [
          Scene.change(Scene.role("combobox", { name: "Preview block" }), id),
          Scene.expect(Scene.testId("theme-studio-preview")).toHaveAttr(
            "data-selected-preview-block",
            id
          ),
          Scene.expect(Scene.testId("theme-studio-preview-title")).toContainText(
            block?.title ?? id
          ),
        ];
      })
    );
  });

  test("renders the source-driven block option list and syncs selection", () => {
    const [model] = init();
    const target =
      themeStudioCatalog.previewBlocks.find(
        (block) => block.id === "sidebar-navigation"
      ) ?? themeStudioCatalog.previewBlocks[1];
    const coverageRow = themeStudioCatalog.previewCoverage.find(
      (row) => row.id === target?.id
    );

    Scene.scene(
      { update, view },
      Scene.with(model),
      Scene.expect(Scene.testId("theme-studio-block-options")).toExist(),
      Scene.expect(
        Scene.selector(`[data-theme-studio-block-option="${coverageRow?.id ?? ""}"]`)
      ).toHaveAttr("data-dependency", coverageRow?.dependencies.join(", ") ?? ""),
      Scene.click(
        Scene.selector(`[data-theme-studio-block-option="${target?.id ?? ""}"]`)
      ),
      Scene.expect(Scene.role("combobox", { name: "Preview block" })).toHaveValue(
        target?.id ?? ""
      ),
      Scene.expect(Scene.testId("theme-studio-preview")).toHaveAttr(
        "data-selected-preview-block",
        target?.id ?? ""
      ),
      Scene.expect(Scene.testId("theme-studio-preview-title")).toContainText(
        target?.title ?? ""
      )
    );
  });

  test("renders origin theme-card rows and component inventory from catalog data", () => {
    const [model] = init();

    Scene.scene(
      { update, view },
      Scene.with(model),
      ...themeStudioCatalog.themeCardOptions.map((row) =>
        Scene.expect(
          Scene.selector(`[data-theme-studio-theme-card-row="${row.id}"]`)
        ).toHaveAttr("data-status", row.status)
      ),
      ...themeStudioCatalog.themeCardOptions
        .filter((row) => row.status === "active")
        .map((row) =>
          Scene.expect(
            Scene.selector(`[data-theme-studio-theme-card-row="${row.id}"] select`)
          ).toExist()
        ),
      ...themeStudioCatalog.themeCardOptions
        .filter((row) => row.status === "deferred")
        .map((row) =>
          Scene.expect(
            Scene.selector(`[data-theme-studio-theme-card-row="${row.id}"]`)
          ).toContainText(row.reason ?? "")
        ),
      Scene.expect(
        Scene.selector('[data-theme-studio-component-inventory-row="card"]')
      ).toHaveAttr("data-status", "in-progress"),
      Scene.expect(
        Scene.selector(
          '[data-theme-studio-component-inventory-row="qr-code/image-placeholder"]'
        )
      ).toHaveAttr("data-status", "deferred")
    );
  });
});
