import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Button Outline example", () => {
  test("renders and handles the Outline button", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("button", { name: "Outline" })).toExist(),
      Scene.expect(Scene.text("Clicked 0 times")).toExist(),
      Scene.click(Scene.role("button", { name: "Outline" })),
      Scene.expect(Scene.text("Clicked 1 time")).toExist()
    );
  });
});
