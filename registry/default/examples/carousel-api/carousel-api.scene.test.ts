import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("carousel-api example", () => {
  test("renders and advances the shadcn Carousel API example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("Slide 1 of 5")).toExist(),
      Scene.click(Scene.role("button", { name: "Next slide" })),
      Scene.expect(Scene.text("Slide 2 of 5")).toExist()
    );
  });
});
