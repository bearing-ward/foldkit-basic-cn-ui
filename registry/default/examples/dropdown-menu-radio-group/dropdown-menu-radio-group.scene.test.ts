import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as DropdownMenuRadioGroupExample from "./main";

describe("Dropdown Menu Radio Group example", () => {
  test("selects one radio menu item", () => {
    Scene.scene(
      {
        update: DropdownMenuRadioGroupExample.update,
        view: DropdownMenuRadioGroupExample.view,
      },
      Scene.with(DropdownMenuRadioGroupExample.init()[0]),
      Scene.expect(Scene.role("group", { name: "Panel density" })).toExist(),
      Scene.expect(Scene.text("Density: Comfortable")).toExist(),
      Scene.click(Scene.text("Compact")),
      Scene.expect(Scene.text("Density: Compact")).toExist()
    );
  });
});
