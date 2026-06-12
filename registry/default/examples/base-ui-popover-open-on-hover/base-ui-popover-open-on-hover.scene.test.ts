import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Base UI Popover Open on Hover example", () => {
  test("opens on hover and closes when leaving the popover root", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("button", { name: "Hover me" })).toHaveAttr(
        "aria-expanded",
        "false"
      ),
      Scene.hover(Scene.role("button", { name: "Hover me" })),
      Scene.expect(Scene.role("button", { name: "Hover me" })).toHaveAttr(
        "aria-expanded",
        "true"
      ),
      Scene.expect(Scene.role("dialog")).toExist(),
      Scene.expect(Scene.text("Popover opened on hover")).toExist()
    );
  });
});
