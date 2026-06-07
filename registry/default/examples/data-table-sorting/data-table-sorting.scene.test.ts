import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("data-table-sorting example", () => {
  test("renders the shadcn Data Table Sorting example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("Sort: email ascending")).toExist(),
      Scene.click(Scene.role("button", { name: "Amount" })),
      Scene.expect(Scene.text("Sort: amount ascending")).toExist()
    );
  });
});
