import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Radio Group Disabled example", () => {
  test("renders the origin disabled radio group demo", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("radio", { name: "Disabled" })).toBeDisabled(),
      Scene.expect(Scene.role("radio", { name: "Disabled" })).toBeChecked(),
      Scene.expect(Scene.role("radio", { name: "Option 2" })).not.toBeDisabled(),
      Scene.expect(Scene.role("radio", { name: "Option 3" })).toExist()
    );
  });
});
