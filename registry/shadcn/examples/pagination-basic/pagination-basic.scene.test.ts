import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as PaginationBasicExample from "./main";

describe("Pagination Basic example", () => {
  test("matches the shadcn Pagination basic example", () => {
    Scene.scene(
      {
        update: PaginationBasicExample.update,
        view: PaginationBasicExample.view,
      },
      Scene.with(PaginationBasicExample.init()[0]),
      Scene.expect(Scene.role("navigation", { name: "pagination" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Go to page 2" })).toHaveAttr(
        "aria-current",
        "page"
      ),
      Scene.expect(Scene.role("link", { name: "Previous" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Next" })).toExist(),
      Scene.expect(Scene.text("...")).not.toHaveHandler("click")
    );
  });
});
