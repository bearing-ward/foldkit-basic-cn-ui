import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Sidebar variants example", () => {
  test("renders side, variant, and collapsible design states", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("left sidebar icon")).toHaveText(
        "left sidebar icon"
      ),
      Scene.expect(Scene.role("button", { name: "Floating" })).toHaveAttr(
        "data-slot",
        "sidebar-menu-button"
      ),
      Scene.expect(Scene.role("button", { name: "Floating" })).not.toHaveHandler(
        "click"
      ),
      Scene.expect(Scene.text("right inset none")).toHaveText(
        "right inset none"
      )
    );
  });
});
