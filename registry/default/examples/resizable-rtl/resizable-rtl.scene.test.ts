import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Resizable RTL example", () => {
  test("renders right-to-left panels and inert handle", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("واحد")).toHaveAttr("data-size", "50"),
      Scene.expect(Scene.text("اثنان")).toHaveAttr("data-size", "50"),
      Scene.expect(
        Scene.role("separator", { name: "Resize panels" })
      ).not.toHaveHandler("pointerdown")
    );
  });
});
