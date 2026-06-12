import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Pagination Simple example", () => {
  test("renders simple previous and next navigation", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("navigation", { name: "pagination" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Previous" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Next" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Go to page 1" })).toBeAbsent(),
      Scene.expect(Scene.role("link", { name: "Previous" })).not.toHaveHandler(
        "click"
      )
    );
  });
});
