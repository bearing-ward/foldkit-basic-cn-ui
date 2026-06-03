import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as InputDisabledExample from "./main";

describe("Input Disabled example", () => {
  test("renders disabled input state", () => {
    Scene.scene(
      {
        update: InputDisabledExample.update,
        view: InputDisabledExample.view,
      },
      Scene.with(InputDisabledExample.init()[0]),
      Scene.expect(
        Scene.role("textbox", { name: "Disabled name" })
      ).toBeDisabled(),
      Scene.expect(Scene.text("This input is disabled.")).toExist()
    );
  });
});
