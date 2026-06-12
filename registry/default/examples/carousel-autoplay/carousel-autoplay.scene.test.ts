import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("carousel-autoplay example", () => {
  test("renders and advances through the autoplay completion message", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("1")).toExist(),
      Scene.expect(Scene.text("Autoplay delay: 2000ms")).toExist(),
      Scene.click(Scene.role("button", { name: "Next slide" })),
      Scene.expect(Scene.text("2")).toExist()
    );
  });
});
