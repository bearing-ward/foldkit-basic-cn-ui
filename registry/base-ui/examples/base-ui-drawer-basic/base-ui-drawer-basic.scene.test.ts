import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as DrawerBasicExample from "./main";

const popup = Scene.testId("base-ui-drawer-basic-popup");
const FocusClose = DrawerBasicExample.FocusDrawerClose();
const FocusTrigger = DrawerBasicExample.FocusDrawerTrigger();

describe("Base UI Drawer Basic example", () => {
  test("matches the Base UI default side drawer example", () => {
    Scene.scene(
      {
        update: DrawerBasicExample.update,
        view: DrawerBasicExample.view,
      },
      Scene.with(DrawerBasicExample.init()[0]),
      Scene.click(Scene.role("button", { name: "Open drawer" })),
      Scene.Command.resolve(
        FocusClose,
        DrawerBasicExample.CompletedFocusDrawerClose()
      ),
      Scene.expect(Scene.role("dialog", { name: "Drawer" })).toExist(),
      Scene.expect(
        Scene.text(
          "This is a drawer that slides in from the side. You can swipe to dismiss it."
        )
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Close" })),
      Scene.Command.resolve(
        FocusTrigger,
        DrawerBasicExample.CompletedFocusDrawerTrigger()
      ),
      Scene.expect(Scene.role("dialog", { name: "Drawer" })).not.toExist()
    );
  });

  test("exposes modal focus trap and swipe dismissal behavior", () => {
    Scene.scene(
      {
        update: DrawerBasicExample.update,
        view: DrawerBasicExample.view,
      },
      Scene.with(DrawerBasicExample.init()[0]),
      Scene.click(Scene.role("button", { name: "Open drawer" })),
      Scene.Command.resolve(
        FocusClose,
        DrawerBasicExample.CompletedFocusDrawerClose()
      ),
      Scene.expect(popup).toHaveAttr("tabindex", "-1"),
      Scene.expect(popup).toHaveHandler("keydown"),
      Scene.expect(popup).toHaveHandler("pointerdown"),
      Scene.expect(popup).toHaveHandler("pointermove"),
      Scene.expect(popup).toHaveHandler("pointerup"),
      Scene.focus(Scene.testId("base-ui-drawer-after-focus-guard")),
      Scene.Command.resolve(
        FocusClose,
        DrawerBasicExample.CompletedFocusDrawerClose()
      ),
      Scene.keydown(popup, "Tab"),
      Scene.Command.resolve(
        FocusClose,
        DrawerBasicExample.CompletedFocusDrawerClose()
      ),
      Scene.pointerDown(popup, { screenX: 10 }),
      Scene.pointerUp(popup, { screenX: 120 }),
      Scene.Command.resolve(
        FocusTrigger,
        DrawerBasicExample.CompletedFocusDrawerTrigger()
      ),
      Scene.expect(Scene.role("dialog", { name: "Drawer" })).not.toExist()
    );
  });
});
