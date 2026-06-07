import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as HoverCardBasicExample from "./main";

describe("Hover Card Basic example", () => {
  test("opens and closes the controlled preview", () => {
    Scene.scene(
      {
        update: HoverCardBasicExample.update,
        view: HoverCardBasicExample.view,
      },
      Scene.with(HoverCardBasicExample.init()[0]),
      Scene.expect(Scene.role("dialog")).toBeAbsent(),
      Scene.click(Scene.role("button", { name: "@foldkit" })),
      Scene.expect(Scene.role("dialog")).toExist(),
      Scene.expect(Scene.text("12.8k stars")).toExist(),
      Scene.click(Scene.role("button", { name: "Close hover card" })),
      Scene.expect(Scene.role("dialog")).toBeAbsent()
    );
  });
});
