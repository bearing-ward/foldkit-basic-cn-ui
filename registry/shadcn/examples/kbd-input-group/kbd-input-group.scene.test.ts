import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as KbdInputGroupExample from "./main";

describe("Kbd Input Group example", () => {
  test("matches the upstream kbd input-group example content", () => {
    Scene.scene(
      { update: KbdInputGroupExample.update, view: KbdInputGroupExample.view },
      Scene.with(KbdInputGroupExample.init()[0]),
      Scene.expect(Scene.role("textbox", { name: "Search" })).toExist(),
      Scene.expect(Scene.text("⌘")).toExist(),
      Scene.expect(Scene.text("K")).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Search" })).not.toHaveHandler(
        "click"
      )
    );
  });
});
