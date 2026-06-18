import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Shadcn Checkbox Table example", () => {
  test("renders the origin table rows and row-selection checkboxes", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("Sarah Chen")).toExist(),
      Scene.expect(Scene.text("sarah.chen@example.com")).toExist(),
      Scene.expect(Scene.text("Marcus Rodriguez")).toExist(),
      Scene.expect(Scene.role("checkbox", { name: "Select row Sarah Chen" })).toHaveAttr(
        "aria-checked",
        "false"
      ),
      Scene.click(Scene.role("checkbox", { name: "Select row Sarah Chen" })),
      Scene.expect(Scene.role("checkbox", { name: "Select row Sarah Chen" })).toHaveAttr(
        "aria-checked",
        "true"
      ),
      Scene.click(Scene.role("checkbox", { name: "Select all rows" })),
      Scene.expect(Scene.role("checkbox", { name: "Select row David Kim" })).toHaveAttr(
        "aria-checked",
        "true"
      )
    );
  });
});
