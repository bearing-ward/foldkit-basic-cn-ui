import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as TypographyBasicExample from "./main";

describe("Typography Basic example", () => {
  test("renders and updates the parent-owned example state", () => {
    Scene.scene(
      {
        update: TypographyBasicExample.update,
        view: TypographyBasicExample.view,
      },
      Scene.with(TypographyBasicExample.init()[0]),
      Scene.expect(Scene.text("Component registry")).toExist(),
      Scene.click(Scene.role("button", { name: "Toggle density" })),
      Scene.expect(Scene.text("Density: Dense")).toExist()
    );
  });
});
