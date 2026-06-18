import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Resizable Vertical example", () => {
  test("renders vertical panels and inert handles", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("One")).toHaveAttr("data-size", "25"),
      Scene.expect(Scene.text("Two")).toHaveAttr("data-size", "50"),
      Scene.expect(Scene.text("Three")).toHaveAttr("data-size", "25"),
      Scene.expect(
        Scene.role("separator", { name: "Resize panels" })
      ).toHaveAttr("aria-orientation", "vertical"),
      Scene.expect(
        Scene.role("separator", { name: "Resize panels" })
      ).not.toHaveHandler("pointerdown")
    );
  });
});
