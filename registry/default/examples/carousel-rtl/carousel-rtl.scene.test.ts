import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("carousel-rtl example", () => {
  test("renders and advances the shadcn Carousel RTL example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("region", { name: "دوار الصور" })).toExist(),
      Scene.expect(Scene.text("١")).toExist(),
      Scene.click(Scene.role("button", { name: "Next slide" })),
      Scene.expect(Scene.text("٢")).toExist()
    );
  });
});
