import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Base UI Popover Detached Trigger example", () => {
  test("opens and closes a popover from a detached trigger", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(
        Scene.role("button", { name: "Trigger outside root" })
      ).toHaveAttr("aria-expanded", "false"),
      Scene.click(Scene.role("button", { name: "Trigger outside root" })),
      Scene.expect(
        Scene.role("button", { name: "Trigger outside root" })
      ).toHaveAttr("aria-expanded", "true"),
      Scene.expect(Scene.role("dialog")).toExist(),
      Scene.expect(Scene.text("Detached trigger")).toExist(),
      Scene.click(Scene.role("button", { name: "Close" })),
      Scene.expect(Scene.role("dialog")).not.toExist()
    );
  });
});
