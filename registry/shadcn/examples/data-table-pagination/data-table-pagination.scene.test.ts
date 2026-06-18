import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("data-table-pagination example", () => {
  test("renders the shadcn Data Table Pagination example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("Page 1 of 3")).toExist(),
      Scene.click(Scene.role("button", { name: "Next" })),
      Scene.expect(Scene.text("Page 2 of 3")).toExist()
    );
  });
});
