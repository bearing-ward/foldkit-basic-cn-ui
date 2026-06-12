import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Native Select Groups example", () => {
  test("renders grouped department options and updates value", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(
        Scene.role("combobox", { name: "Select department" })
      ).toExist(),
      Scene.expect(Scene.text("Frontend")).toExist(),
      Scene.expect(Scene.text("Backend")).toExist(),
      Scene.expect(Scene.text("Sales Director")).toExist(),
      Scene.expect(Scene.text("Operations Manager")).toExist(),
      Scene.change(
        Scene.role("combobox", { name: "Select department" }),
        "operations-manager"
      ),
      Scene.expect(
        Scene.role("combobox", { name: "Select department" })
      ).toHaveValue("operations-manager")
    );
  });
});
