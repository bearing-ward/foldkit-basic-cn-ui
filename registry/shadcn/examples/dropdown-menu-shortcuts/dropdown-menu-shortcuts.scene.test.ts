import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as DropdownMenuShortcutsExample from "./main";

describe("Dropdown Menu Shortcuts example", () => {
  test("renders shortcuts and selects an item", () => {
    Scene.scene(
      {
        update: DropdownMenuShortcutsExample.update,
        view: DropdownMenuShortcutsExample.view,
      },
      Scene.with(DropdownMenuShortcutsExample.init()[0]),
      Scene.expect(Scene.role("menu")).toExist(),
      Scene.expect(Scene.text("⌘T")).toHaveAttr(
        "data-slot",
        "dropdown-menu-shortcut"
      ),
      Scene.expect(Scene.text("⌘N")).toHaveAttr(
        "data-slot",
        "dropdown-menu-shortcut"
      ),
      Scene.click(Scene.text("Print")),
      Scene.expect(Scene.role("menu")).toBeAbsent(),
      Scene.expect(Scene.text("Selected: Print")).toExist()
    );
  });
});
