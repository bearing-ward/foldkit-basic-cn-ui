import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("carousel-sizes example", () => {
  test("renders and advances the shadcn Carousel Sizes example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("1")).toExist(),
      Scene.click(Scene.role("button", { name: "Next slide" })),
      Scene.expect(Scene.text("2")).toExist()
    );
  });
});
