import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Sidebar RTL example", () => {
  test("renders a right-side sidebar inside an rtl region", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("شركة أكمي")).toHaveText("شركة أكمي"),
      Scene.expect(
        Scene.role("complementary", { name: "Application sidebar" })
      ).toHaveAttr("data-side", "right"),
      Scene.expect(Scene.role("button", { name: "لوحة التحكم" })).toHaveAttr(
        "aria-current",
        "page"
      ),
      Scene.expect(Scene.role("button", { name: "لوحة التحكم" })).not.toHaveHandler(
        "click"
      )
    );
  });
});
