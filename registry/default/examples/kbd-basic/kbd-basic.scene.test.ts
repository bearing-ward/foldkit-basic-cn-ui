import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as KbdBasicExample from "./main";

describe("Kbd Basic example", () => {
  test("renders and updates the parent-owned example state", () => {
    Scene.scene(
      { update: KbdBasicExample.update, view: KbdBasicExample.view },
      Scene.with(KbdBasicExample.init()[0]),
      Scene.expect(Scene.text("Cmd")).toExist(),
      Scene.click(Scene.role("button", { name: "Switch platform" })),
      Scene.expect(Scene.text("Ctrl")).toExist()
    );
  });
});
