import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as SelectBasicExample from "./main";

describe("Select Basic example", () => {
  test("updates the selected region", () => {
    Scene.scene(
      { update: SelectBasicExample.update, view: SelectBasicExample.view },
      Scene.with(SelectBasicExample.init()[0]),
      Scene.expect(Scene.role("combobox", { name: "Region" })).toExist(),
      Scene.expect(Scene.text("Selected region: na")).toExist(),
      Scene.change(Scene.role("combobox", { name: "Region" }), "emea"),
      Scene.expect(Scene.text("Selected region: emea")).toExist()
    );
  });
});
