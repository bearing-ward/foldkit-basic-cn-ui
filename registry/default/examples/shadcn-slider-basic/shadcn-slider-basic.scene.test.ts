import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnSliderBasicExample from "./main";

describe("shadcn Slider Basic example", () => {
  test("updates volume feedback from keyboard navigation", () => {
    const [initialModel] = ShadcnSliderBasicExample.init();

    Scene.scene(
      {
        update: ShadcnSliderBasicExample.update,
        view: ShadcnSliderBasicExample.view,
      },
      Scene.with(initialModel),
      Scene.expect(Scene.role("slider", { name: "Volume" })).toHaveAttr(
        "aria-valuenow",
        "40"
      ),
      Scene.expect(Scene.text("Volume: 40%")).toExist(),
      Scene.keydown(Scene.role("slider", { name: "Volume" }), "ArrowRight"),
      Scene.expect(Scene.role("slider", { name: "Volume" })).toHaveAttr(
        "aria-valuenow",
        "45"
      ),
      Scene.expect(Scene.text("Volume: 45%")).toExist()
    );
  });
});
