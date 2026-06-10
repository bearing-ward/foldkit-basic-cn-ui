import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as DrawerNonModalExample from "./main";

describe("Base UI Drawer Non-modal example", () => {
  test("matches the Base UI non-modal drawer content", () => {
    Scene.scene(
      {
        update: DrawerNonModalExample.update,
        view: DrawerNonModalExample.view,
      },
      Scene.with(DrawerNonModalExample.init()[0]),
      Scene.click(Scene.role("button", { name: "Open non-modal drawer" })),
      Scene.expect(
        Scene.role("dialog", { name: "Non-modal drawer" })
      ).toExist(),
      Scene.expect(
        Scene.text(
          "This drawer does not trap focus and ignores outside clicks. Use the close button or swipe to dismiss it."
        )
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Close" })),
      Scene.expect(
        Scene.role("dialog", { name: "Non-modal drawer" })
      ).not.toExist()
    );
  });
});
