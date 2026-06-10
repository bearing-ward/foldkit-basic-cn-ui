import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ToggleGroupBasicExample from "./main";

describe("shadcn Toggle Group Basic example", () => {
  test("matches the shadcn toggle group default alignment behavior", () => {
    Scene.scene(
      {
        update: ToggleGroupBasicExample.update,
        view: ToggleGroupBasicExample.view,
      },
      Scene.with(ToggleGroupBasicExample.init()[0]),
      Scene.expect(Scene.role("group", { name: "Text alignment" })).toExist(),
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
});
