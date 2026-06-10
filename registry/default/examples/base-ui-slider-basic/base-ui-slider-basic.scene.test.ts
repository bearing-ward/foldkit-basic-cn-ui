import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as BaseUiSliderBasicExample from "./main";

describe("Base UI slider Basic example", () => {
  test("updates volume from keyboard navigation", () => {
    const [initialModel] = BaseUiSliderBasicExample.init();

    Scene.scene(
      {
        update: BaseUiSliderBasicExample.update,
        view: BaseUiSliderBasicExample.view,
      },
      Scene.with(initialModel),
      Scene.expect(Scene.role("slider", { name: "Volume" })).toHaveAttr(
        "aria-valuenow",
        "50"
      ),
      Scene.keydown(Scene.role("slider", { name: "Volume" }), "ArrowRight"),
      Scene.expect(Scene.role("slider", { name: "Volume" })).toHaveAttr(
        "aria-valuenow",
        "51"
      )
    );
  });
});
