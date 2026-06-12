import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Pagination Icons Only example", () => {
  test("renders icon-only pagination with accessible labels", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("link", { name: "Go to previous page" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Go to page 2" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Go to next page" })).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Go to next page" })
      ).not.toHaveHandler("click")
    );
  });
});
