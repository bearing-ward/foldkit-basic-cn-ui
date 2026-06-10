import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ScrollAreaGradientExample from "./main";

describe("Base UI Scroll Area Gradient example", () => {
  test("renders faded scroll content", () => {
    Scene.scene(
      {
        update: ScrollAreaGradientExample.update,
        view: ScrollAreaGradientExample.view,
      },
      Scene.with(ScrollAreaGradientExample.init()[0]),
      Scene.expect(
        Scene.role("region", { name: "Gradient scroll fade" })
      ).toExist(),
      Scene.expect(Scene.text("Belgian farmhouse")).toExist(),
      Scene.expect(Scene.text("Stone croft")).toExist(),
      Scene.expect(Scene.text("Stone croft")).not.toHaveHandler("click")
    );
  });
});
