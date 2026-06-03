import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as SelectDisabledExample from "./main";

describe("Select Disabled example", () => {
  test("renders disabled state with description", () => {
    Scene.scene(
      {
        update: SelectDisabledExample.update,
        view: SelectDisabledExample.view,
      },
      Scene.with(SelectDisabledExample.init()[0]),
      Scene.expect(Scene.role("combobox", { name: "Plan" })).toBeDisabled(),
      Scene.expect(Scene.text("Plan changes are locked.")).toExist(),
      Scene.expect(Scene.text("Current plan: Team")).toExist()
    );
  });
});
