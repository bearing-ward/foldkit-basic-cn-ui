import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Hover Card Sides example", () => {
  test("opens each side preview", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.click(Scene.role("button", { name: "Top" })),
      Scene.expect(Scene.text("Top side")).toExist(),
      Scene.click(Scene.role("button", { name: "Close hover card" })),
      Scene.expect(Scene.role("dialog")).toBeAbsent(),
      Scene.click(Scene.role("button", { name: "Right" })),
      Scene.expect(Scene.text("Right side")).toExist(),
      Scene.click(Scene.role("button", { name: "Left" })),
      Scene.expect(Scene.text("Left side")).toExist(),
      Scene.click(Scene.role("button", { name: "Bottom" })),
      Scene.expect(Scene.text("Bottom side")).toExist()
    );
  });
});
