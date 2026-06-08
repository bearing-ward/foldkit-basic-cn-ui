import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Button Size example", () => {
  test("renders and handles the Size button", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("button", { name: "Default" })).toExist(),
      Scene.expect(Scene.text("Clicked 0 times")).toExist(),
      Scene.click(Scene.role("button", { name: "Default" })),
      Scene.expect(Scene.text("Clicked 1 time")).toExist()
    );
  });
});
