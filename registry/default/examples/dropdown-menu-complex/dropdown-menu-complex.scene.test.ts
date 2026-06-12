import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as DropdownMenuComplexExample from "./main";

describe("Dropdown Menu Complex example", () => {
  test("combines shortcuts, checkbox, radio group, submenu, icons, and destructive items", () => {
    Scene.scene(
      {
        update: DropdownMenuComplexExample.update,
        view: DropdownMenuComplexExample.view,
      },
      Scene.with(DropdownMenuComplexExample.init()[0]),
      Scene.expect(Scene.text("Workspace")).toExist(),
      Scene.expect(Scene.text("⌘N")).toHaveAttr(
        "data-slot",
        "dropdown-menu-shortcut"
      ),
      Scene.expect(Scene.text("Bookmarks: on")).toExist(),
      Scene.click(Scene.text("Show Bookmarks")),
      Scene.expect(Scene.text("Bookmarks: off")).toExist(),
      Scene.expect(Scene.text("Theme: System")).toExist(),
      Scene.click(Scene.text("Dark")),
      Scene.expect(Scene.text("Theme: Dark")).toExist(),
      Scene.expect(Scene.text("Copy Link")).toExist(),
      Scene.expect(Scene.text("L")).toExist(),
      Scene.expect(
        Scene.role("menuitem", { name: "Delete Workspace" })
      ).toHaveAttr("data-variant", "destructive"),
      Scene.click(Scene.text("Copy Link")),
      Scene.expect(Scene.text("Selected: Copy Link")).toExist()
    );
  });
});
