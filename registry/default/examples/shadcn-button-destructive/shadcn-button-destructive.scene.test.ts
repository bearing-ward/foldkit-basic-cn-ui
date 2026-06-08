import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Button Destructive example", () => {
  test("renders and handles the Destructive button", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("button", { name: "Destructive" })).toExist(),
      Scene.expect(Scene.text("Clicked 0 times")).toExist(),
      Scene.click(Scene.role("button", { name: "Destructive" })),
      Scene.expect(Scene.text("Clicked 1 time")).toExist()
    );
  });
});
