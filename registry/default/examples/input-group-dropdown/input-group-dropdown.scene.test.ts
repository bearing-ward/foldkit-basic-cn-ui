import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as InputGroupDropdownExample from "./main";

describe("Input Group Dropdown example", () => {
  test("updates search input and selects dropdown scope", () => {
    Scene.scene(
      {
        update: InputGroupDropdownExample.update,
        view: InputGroupDropdownExample.view,
      },
      Scene.with(InputGroupDropdownExample.init()[0]),
      Scene.expect(Scene.role("textbox", { name: "Search" })).toHaveValue(""),
      Scene.change(Scene.role("textbox", { name: "Search" }), "calendar"),
      Scene.expect(Scene.role("textbox", { name: "Search" })).toHaveValue(
        "calendar"
      ),
      Scene.expect(Scene.text("Search In...")).toExist(),
      Scene.click(Scene.text("Components")),
      Scene.expect(Scene.text("Components")).toExist()
    );
  });
});
