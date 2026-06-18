import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as DrawerNonModalExample from "./main";

const popup = Scene.testId("base-ui-drawer-non-modal-popup");

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

  test("keeps non-modal semantics and supports swipe dismissal", () => {
    Scene.scene(
      {
        update: DrawerNonModalExample.update,
        view: DrawerNonModalExample.view,
      },
      Scene.with(DrawerNonModalExample.init()[0]),
      Scene.click(Scene.role("button", { name: "Open non-modal drawer" })),
      Scene.expect(popup).toHaveAttr("aria-modal", "false"),
      Scene.expect(popup).toHaveHandler("pointerdown"),
      Scene.expect(popup).toHaveHandler("pointermove"),
      Scene.expect(popup).toHaveHandler("pointerup"),
      Scene.pointerDown(popup, { screenX: 20 }),
      Scene.pointerUp(popup, { screenX: 130 }),
      Scene.expect(
        Scene.role("dialog", { name: "Non-modal drawer" })
      ).not.toExist()
    );
  });
});
