import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("data-table-row-selection example", () => {
  test("renders the shadcn Data Table Row Selection example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("0 of 7 row(s) selected.")).toExist(),
      Scene.click(Scene.role("checkbox", { name: "Select row m@example.com" })),
      Scene.expect(Scene.text("1 of 7 row(s) selected.")).toExist()
    );
  });
});
