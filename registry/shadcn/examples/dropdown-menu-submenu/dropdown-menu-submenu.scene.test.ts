import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as DropdownMenuSubmenuExample from "./main";

describe("Dropdown Menu Submenu example", () => {
  test("selects an item from visible submenu content", () => {
    Scene.scene(
      {
        update: DropdownMenuSubmenuExample.update,
        view: DropdownMenuSubmenuExample.view,
      },
      Scene.with(DropdownMenuSubmenuExample.init()[0]),
      Scene.expect(Scene.text("More Tools")).toExist(),
      Scene.expect(Scene.text("Save Page As...")).toExist(),
      Scene.click(Scene.text("Developer Tools")),
      Scene.expect(Scene.role("menu")).toBeAbsent(),
      Scene.expect(Scene.text("Selected: Developer Tools")).toExist()
    );
  });
});
