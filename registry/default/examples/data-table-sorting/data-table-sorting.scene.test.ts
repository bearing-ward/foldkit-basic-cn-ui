import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("data-table-sorting example", () => {
  test("renders the shadcn Data Table Sorting example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("button", { name: "Email" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Status" })).toBeAbsent(),
      Scene.expect(Scene.role("button", { name: "Amount" })).toBeAbsent(),
      Scene.expect(Scene.text("Monserrat44@example.com")).toBeAbsent(),
      Scene.click(Scene.role("button", { name: "Email" })),
      Scene.expect(Scene.text("Monserrat44@example.com")).toExist()
    );
  });
});
