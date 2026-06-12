import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as DropdownMenuIconsExample from "./main";

describe("Dropdown Menu Icons example", () => {
  test("renders icon slots and selects an item", () => {
    Scene.scene(
      {
        update: DropdownMenuIconsExample.update,
        view: DropdownMenuIconsExample.view,
      },
      Scene.with(DropdownMenuIconsExample.init()[0]),
      Scene.expect(Scene.role("menu")).toExist(),
      Scene.expect(Scene.text("P")).toExist(),
      Scene.expect(Scene.text("$")).toExist(),
      Scene.click(Scene.text("Team")),
      Scene.expect(Scene.text("Selected: Team")).toExist()
    );
  });
});
