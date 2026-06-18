import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as PopoverMultipleTriggersExample from "./main";

describe("Base UI Popover Multiple Triggers example", () => {
  test("opens trigger-specific popover content", () => {
    Scene.scene(
      {
        update: PopoverMultipleTriggersExample.update,
        view: PopoverMultipleTriggersExample.view,
      },
      Scene.with(PopoverMultipleTriggersExample.init()[0]),
      Scene.click(Scene.role("button", { name: "Trigger 1" })),
      Scene.expect(Scene.text("Content for Trigger 1")).toExist(),
      Scene.click(Scene.role("button", { name: "Trigger 2" })),
      Scene.expect(Scene.text("Content for Trigger 2")).toExist(),
      Scene.click(Scene.role("button", { name: "Close" })),
      Scene.expect(Scene.text("Content for Trigger 2")).not.toExist()
    );
  });
});
