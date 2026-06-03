import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as SliderBasicExample from "./main";

describe("Slider Basic example", () => {
  test("updates rating feedback from keyboard navigation", () => {
    const [initialModel] = SliderBasicExample.init();

    Scene.scene(
      {
        update: SliderBasicExample.update,
        view: SliderBasicExample.view,
      },
      Scene.with(initialModel),
      Scene.expect(Scene.role("slider", { name: "Rating" })).toHaveAttr(
        "aria-valuenow",
        "4"
      ),
      Scene.expect(Scene.text("Rating: 4 of 10")).toExist(),
      Scene.keydown(Scene.role("slider", { name: "Rating" }), "ArrowRight"),
      Scene.expect(Scene.role("slider", { name: "Rating" })).toHaveAttr(
        "aria-valuenow",
        "5"
      ),
      Scene.expect(Scene.text("Rating: 5 of 10")).toExist()
    );
  });
});
