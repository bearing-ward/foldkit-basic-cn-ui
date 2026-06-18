import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("data-table-row-actions example", () => {
  test("renders the shadcn Data Table Row Actions example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.click(
        Scene.role("button", { name: "Open menu for m@example.com" })
      ),
      Scene.expect(
        Scene.role("menuitem", { name: "Copy payment ID" })
      ).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "View customer" })).toExist(),
      Scene.expect(
        Scene.role("menuitem", { name: "View payment details" })
      ).toExist()
    );
  });
});
