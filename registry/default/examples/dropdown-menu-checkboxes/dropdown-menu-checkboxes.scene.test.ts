import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as DropdownMenuCheckboxesExample from "./main";

describe("Dropdown Menu Checkboxes example", () => {
  test("toggles checkbox menu items", () => {
    Scene.scene(
      {
        update: DropdownMenuCheckboxesExample.update,
        view: DropdownMenuCheckboxesExample.view,
      },
      Scene.with(DropdownMenuCheckboxesExample.init()[0]),
      Scene.expect(Scene.text("Status Bar: on")).toExist(),
      Scene.expect(Scene.text("Activity Bar: off")).toExist(),
      Scene.click(Scene.text("Activity Bar")),
      Scene.expect(Scene.text("Activity Bar: on")).toExist()
    );
  });
});
