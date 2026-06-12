import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as KbdBasicExample from "./main";

describe("Kbd Basic example", () => {
  test("matches the current shadcn Kbd examples", () => {
    Scene.scene(
      { update: KbdBasicExample.update, view: KbdBasicExample.view },
      Scene.with(KbdBasicExample.init()[0]),
      Scene.expect(Scene.text("⌘")).toExist(),
      Scene.expect(Scene.text("⇧")).toExist(),
      Scene.expect(Scene.text("⌥")).toExist(),
      Scene.expect(Scene.text("⌃")).toExist(),
      Scene.expect(Scene.text("`")).toExist(),
      Scene.expect(Scene.text("Ctrl")).toExist(),
      Scene.expect(Scene.text("B")).toExist(),
      Scene.expect(Scene.text("K")).toExist(),
      Scene.expect(Scene.text("to open the command palette")).toExist(),
      Scene.expect(Scene.role("button", { name: "Accept⏎" })).toExist(),
      Scene.click(Scene.role("button", { name: "Accept⏎" })),
      Scene.expect(Scene.role("button", { name: "Save" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Print⌘" })).toExist()
    );
  });
});
