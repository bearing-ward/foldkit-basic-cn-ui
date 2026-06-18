import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as DropdownMenuDestructiveExample from "./main";

describe("Dropdown Menu Destructive example", () => {
  test("marks destructive items", () => {
    Scene.scene(
      {
        update: DropdownMenuDestructiveExample.update,
        view: DropdownMenuDestructiveExample.view,
      },
      Scene.with(DropdownMenuDestructiveExample.init()[0]),
      Scene.expect(Scene.role("menuitem", { name: "Delete" })).toHaveAttr(
        "data-variant",
        "destructive"
      ),
      Scene.click(Scene.role("menuitem", { name: "Delete" })),
      Scene.expect(Scene.text("Selected: Delete")).toExist()
    );
  });
});
