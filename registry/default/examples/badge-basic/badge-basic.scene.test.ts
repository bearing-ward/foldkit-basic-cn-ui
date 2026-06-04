import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as BadgeBasicExample from "./main";

describe("Badge Basic example", () => {
  test("renders variants and toggles status", () => {
    Scene.scene(
      { update: BadgeBasicExample.update, view: BadgeBasicExample.view },
      Scene.with(BadgeBasicExample.init()[0]),
      Scene.expect(Scene.text("Draft")).toExist(),
      Scene.expect(Scene.text("New")).toExist(),
      Scene.expect(Scene.text("Blocked")).toExist(),
      Scene.click(Scene.role("button", { name: "Toggle status" })),
      Scene.expect(Scene.text("Published")).toExist()
    );
  });
});
