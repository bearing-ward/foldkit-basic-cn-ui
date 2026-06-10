import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("item-header example", () => {
  test("renders image headers above item content", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("img", { name: "Image: v0-1.5-sm" })).toExist(),
      Scene.expect(Scene.role("img", { name: "Image: v0-1.5-lg" })).toExist(),
      Scene.expect(Scene.role("img", { name: "Image: v0-2.0-mini" })).toExist(),
      Scene.expect(Scene.text("v0-1.5-sm")).toExist(),
      Scene.expect(Scene.text("Everyday tasks and UI generation.")).toExist(),
      Scene.expect(Scene.text("v0-1.5-sm")).not.toHaveHandler("click")
    );
  });
});
