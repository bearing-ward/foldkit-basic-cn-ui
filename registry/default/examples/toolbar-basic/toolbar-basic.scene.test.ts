import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ToolbarBasicExample from "./main";

describe("Toolbar Basic example", () => {
  test("matches the Base UI toolbar hero controls", () => {
    Scene.scene(
      {
        update: ToolbarBasicExample.update,
        view: ToolbarBasicExample.view,
      },
      Scene.with(ToolbarBasicExample.init()[0]),
      Scene.expect(Scene.role("toolbar", { name: "Editor toolbar" })).toExist(),
      Scene.click(Scene.role("button", { name: "Align right" })),
      Scene.click(Scene.role("button", { name: "Format as percent" })),
      Scene.change(Scene.role("textbox", { name: "Font family" }), "Arial"),
      Scene.expect(Scene.role("textbox", { name: "Font family" })).toHaveValue(
        "Arial"
      ),
      Scene.expect(Scene.role("link", { name: "Edited 51m ago" })).toExist()
    );
  });
});
