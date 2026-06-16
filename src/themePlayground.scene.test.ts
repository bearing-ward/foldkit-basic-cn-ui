import { Scene } from "foldkit";
import { describe, test } from "vitest";

import { init, update, view } from "./themePlayground";

describe("theme playground", () => {
  test("renders initial controls, preview, and output", () => {
    Scene.scene(
      { update, view },
      Scene.with(init()[0]),
      Scene.expect(Scene.role("heading", { name: "Theme playground" }))
        .toExist(),
      Scene.expect(Scene.role("button", { name: "Light" })).toHaveAttr(
        "aria-pressed",
        "true"
      ),
      Scene.expect(Scene.role("button", { name: "Comfortable" })).toHaveAttr(
        "aria-pressed",
        "true"
      ),
      Scene.expect(Scene.role("combobox", { name: "Radius" })).toHaveValue(
        "md"
      ),
      Scene.expect(
        Scene.role("combobox", { name: "Typography" })
      ).toHaveValue("system"),
      Scene.expect(
        Scene.role("combobox", { name: "Preview component" })
      ).toHaveValue("settings"),
      Scene.expect(Scene.testId("theme-preview-state")).toContainText(
        "light/comfortable/md/system"
      ),
      Scene.expect(Scene.testId("theme-output")).toContainText('mode: "light"'),
      Scene.expect(Scene.testId("theme-output")).toContainText(
        'density: "comfortable"'
      ),
      Scene.expect(Scene.testId("theme-output")).toContainText('radius: "8px"')
    );
  });

  test("updates preview state and output from model-owned controls", () => {
    Scene.scene(
      { update, view },
      Scene.with(init()[0]),
      Scene.click(Scene.role("button", { name: "Dark" })),
      Scene.click(Scene.role("button", { name: "Compact" })),
      Scene.change(Scene.role("combobox", { name: "Radius" }), "lg"),
      Scene.change(Scene.role("combobox", { name: "Typography" }), "mono"),
      Scene.change(
        Scene.role("combobox", { name: "Preview component" }),
        "status"
      ),
      Scene.expect(Scene.role("button", { name: "Dark" })).toHaveAttr(
        "aria-pressed",
        "true"
      ),
      Scene.expect(Scene.role("button", { name: "Compact" })).toHaveAttr(
        "aria-pressed",
        "true"
      ),
      Scene.expect(Scene.role("heading", { name: "Status card" })).toExist(),
      Scene.expect(Scene.testId("theme-preview-state")).toContainText(
        "dark/compact/lg/mono"
      ),
      Scene.expect(Scene.testId("theme-output")).toContainText('mode: "dark"'),
      Scene.expect(Scene.testId("theme-output")).toContainText(
        'density: "compact"'
      ),
      Scene.expect(Scene.testId("theme-output")).toContainText('radius: "12px"'),
      Scene.expect(Scene.testId("theme-output")).toContainText(
        'typography: "ui-monospace, monospace"'
      ),
      Scene.expect(Scene.testId("theme-output")).toContainText(
        'preview: "status"'
      )
    );
  });
});
