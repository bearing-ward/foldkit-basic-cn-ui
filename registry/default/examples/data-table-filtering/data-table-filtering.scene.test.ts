import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("data-table-filtering example", () => {
  test("renders the shadcn Data Table Filtering example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("7 results")).toExist(),
      Scene.type(Scene.role("textbox", { name: "Filter emails" }), "ken"),
      Scene.expect(Scene.text("1 results")).toExist()
    );
  });
});
