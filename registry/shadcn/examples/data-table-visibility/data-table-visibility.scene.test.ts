import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("data-table-visibility example", () => {
  test("renders the shadcn Data Table Visibility example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("textbox", { name: "Filter emails" })).toHaveAttr(
        "placeholder",
        "Filter emails..."
      ),
      Scene.expect(Scene.role("button", { name: "Columns" })).toExist(),
      Scene.click(Scene.role("button", { name: "Columns" })),
      Scene.expect(Scene.text("Amount")).toExist(),
      Scene.click(
        Scene.role("menuitemcheckbox", { name: "Toggle amount column" })
      ),
      Scene.expect(Scene.text("$100.00")).not.toExist()
    );
  });
});
