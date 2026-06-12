import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Native Select Disabled example", () => {
  test("renders disabled native select semantics", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("combobox", { name: "Select status" })).toBeDisabled(),
      Scene.expect(Scene.text("In Progress")).toExist(),
      Scene.expect(Scene.text("Cancelled")).toExist()
    );
  });
});
