import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ToggleGroupBasicExample from "./main";

describe("Base UI Toggle Group Basic example", () => {
  test("matches the Base UI toggle group hero alignment behavior", () => {
    Scene.scene(
      {
        update: ToggleGroupBasicExample.update,
        view: ToggleGroupBasicExample.view,
      },
      Scene.with(ToggleGroupBasicExample.init()[0]),
      Scene.expect(Scene.role("group", { name: "Text alignment" })).toExist(),
      Scene.expect(Scene.text("L")).not.toExist(),
      Scene.expect(Scene.text("C")).not.toExist(),
      Scene.expect(Scene.text("R")).not.toExist(),
      Scene.expect(Scene.role("button", { name: "Align left" })).toHaveAttr(
        "aria-pressed",
        "true"
      ),
      Scene.click(Scene.role("button", { name: "Align right" })),
      Scene.expect(Scene.role("button", { name: "Align left" })).toHaveAttr(
        "aria-pressed",
        "false"
      ),
      Scene.expect(Scene.role("button", { name: "Align right" })).toHaveAttr(
        "aria-pressed",
        "true"
      )
    );
  });

  test("moves roving focus with arrow keys", () => {
    Scene.scene(
      {
        update: ToggleGroupBasicExample.update,
        view: ToggleGroupBasicExample.view,
      },
      Scene.with(ToggleGroupBasicExample.init()[0]),
      Scene.expect(Scene.role("button", { name: "Align left" })).toHaveAttr(
        "tabindex",
        "0"
      ),
      Scene.keydown(Scene.role("button", { name: "Align left" }), "ArrowRight"),
      Scene.Command.resolve(
        ToggleGroupBasicExample.FocusAlignmentButton({ value: "center" }),
        ToggleGroupBasicExample.FocusedAlignment({ value: "center" })
      ),
      Scene.expect(Scene.role("button", { name: "Align center" })).toHaveAttr(
        "tabindex",
        "0"
      ),
      Scene.expect(Scene.role("button", { name: "Align left" })).toHaveAttr(
        "tabindex",
        "-1"
      )
    );
  });
});
