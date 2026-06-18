import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Native Select Invalid example", () => {
  test("renders invalid select feedback and updates value", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("combobox", { name: "Select status" })).toExist(),
      Scene.expect(Scene.text("Please select a valid status.")).toExist(),
      Scene.change(
        Scene.role("combobox", { name: "Select status" }),
        "done"
      ),
      Scene.expect(Scene.role("combobox", { name: "Select status" })).toHaveValue(
        "done"
      )
    );
  });
});
