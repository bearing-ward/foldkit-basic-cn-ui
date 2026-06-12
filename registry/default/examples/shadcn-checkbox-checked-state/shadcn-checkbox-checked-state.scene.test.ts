import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Shadcn Checkbox Checked State example", () => {
  test("toggles the controlled checked state", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("checkbox", { name: "Unchecked" })).toHaveAttr(
        "aria-checked",
        "false"
      ),
      Scene.click(Scene.role("checkbox", { name: "Unchecked" })),
      Scene.expect(Scene.role("checkbox", { name: "Checked" })).toHaveAttr(
        "aria-checked",
        "true"
      )
    );
  });
});
