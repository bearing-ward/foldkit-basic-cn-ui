import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("carousel-orientation example", () => {
  test("renders and advances the shadcn Carousel Orientation example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("region", { name: "Carousel" })).toExist(),
      Scene.click(Scene.role("button", { name: "Next slide" })),
      Scene.expect(Scene.text("2")).toExist()
    );
  });
});
