import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as DropdownMenuBasicExample from "./main";

describe("Dropdown Menu Basic example", () => {
  test("opens, selects an item, and closes", () => {
    Scene.scene(
      {
        update: DropdownMenuBasicExample.update,
        view: DropdownMenuBasicExample.view,
      },
      Scene.with(DropdownMenuBasicExample.init()[0]),
      Scene.expect(Scene.role("menu")).toBeAbsent(),
      Scene.click(Scene.role("button", { name: "Open" })),
      Scene.expect(Scene.role("menu")).toExist(),
      Scene.expect(Scene.text("Billing")).toExist(),
      Scene.click(Scene.text("Billing")),
      Scene.expect(Scene.role("menu")).toBeAbsent(),
      Scene.expect(Scene.text("Selected: Billing")).toExist()
    );
  });
});
