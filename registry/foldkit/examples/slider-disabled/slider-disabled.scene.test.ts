import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as SliderDisabledExample from "./main";

describe("Slider Disabled example", () => {
  test("renders disabled volume slider", () => {
    const [initialModel] = SliderDisabledExample.init();

    Scene.scene(
      {
        update: SliderDisabledExample.update,
        view: SliderDisabledExample.view,
      },
      Scene.with(initialModel),
      Scene.expect(Scene.role("slider", { name: "Volume" })).toHaveAttr(
        "aria-disabled",
        "true"
      ),
      Scene.expect(Scene.role("slider", { name: "Volume" })).toHaveAttr(
        "aria-valuenow",
        "40"
      ),
      Scene.expect(Scene.text("Volume is locked.")).toExist()
    );
  });
});
