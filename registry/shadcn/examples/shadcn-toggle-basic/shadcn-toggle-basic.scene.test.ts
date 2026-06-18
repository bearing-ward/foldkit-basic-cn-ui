import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ToggleBasicExample from "./main";

describe("shadcn Toggle Basic example", () => {
  test("matches the upstream italic toggle behavior", () => {
    Scene.scene(
      {
        update: ToggleBasicExample.update,
        view: ToggleBasicExample.view,
      },
      Scene.with(ToggleBasicExample.init()[0]),
      Scene.expect(Scene.role("button", { name: "Toggle italic" })).toHaveAttr(
        "aria-pressed",
        "false"
      ),
      Scene.click(Scene.role("button", { name: "Toggle italic" })),
      Scene.expect(Scene.role("button", { name: "Toggle italic" })).toHaveAttr(
        "aria-pressed",
        "true"
      ),
      Scene.expect(Scene.role("button", { name: "Toggle italic" })).toHaveAttr(
        "data-pressed",
        ""
      ),
      Scene.expect(
        Scene.role("button", { name: "Toggle outline italic" })
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Toggle italic with text" })
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "Small" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Large" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Disabled" })).toHaveAttr(
        "disabled",
        "true"
      ),
      Scene.expect(Scene.role("button", { name: "إشارة مرجعية" })).toExist()
    );
  });
});
