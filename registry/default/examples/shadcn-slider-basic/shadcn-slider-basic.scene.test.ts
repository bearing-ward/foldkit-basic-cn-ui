import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnSliderBasicExample from "./main";

describe("shadcn Slider Basic example", () => {
  test("matches the upstream bare slider demo", () => {
    const [initialModel] = ShadcnSliderBasicExample.init();

    Scene.scene(
      {
        update: ShadcnSliderBasicExample.update,
        view: ShadcnSliderBasicExample.view,
      },
      Scene.with(initialModel),
      Scene.expect(Scene.role("slider", { name: "slider-demo" })).toHaveAttr(
        "aria-valuenow",
        "33"
      ),
      Scene.keydown(Scene.role("slider", { name: "slider-demo" }), "ArrowRight"),
      Scene.expect(Scene.role("slider", { name: "slider-demo" })).toHaveAttr(
        "aria-valuenow",
        "34"
      ),
      Scene.expect(Scene.role("slider", { name: "Range minimum" })).toHaveAttr(
        "aria-valuenow",
        "25"
      ),
      Scene.expect(Scene.role("slider", { name: "Range maximum" })).toHaveAttr(
        "aria-valuenow",
        "75"
      ),
      Scene.expect(Scene.role("slider", { name: "First thumb" })).toExist(),
      Scene.expect(Scene.role("slider", { name: "Vertical slider" })).toExist(),
      Scene.expect(Scene.text("Temperature 0.3")).toExist(),
      Scene.expect(Scene.role("slider", { name: "Disabled slider" })).toHaveAttr(
        "aria-disabled",
        "true"
      ),
      Scene.expect(Scene.role("slider", { name: "شريط تمرير" })).toExist()
    );
  });
});
