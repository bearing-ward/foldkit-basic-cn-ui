import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ButtonDisabledExample from "./main";

describe("Button Disabled example", () => {
  test("renders disabled button state", () => {
    Scene.scene(
      {
        update: ButtonDisabledExample.update,
        view: ButtonDisabledExample.view,
      },
      Scene.with(ButtonDisabledExample.init()[0]),
      Scene.expect(Scene.role("button", { name: "Disabled" })).toBeDisabled(),
      Scene.expect(
        Scene.text("Disabled buttons keep native disabled semantics.")
      ).toExist()
    );
  });
});
