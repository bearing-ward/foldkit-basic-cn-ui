import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as DrawerPositionExample from "./main";

const viewport = Scene.testId("base-ui-drawer-bottom-viewport");
const popup = Scene.testId("base-ui-drawer-bottom-popup");
const FocusClose = DrawerPositionExample.FocusDrawerClose();
const FocusTrigger = DrawerPositionExample.FocusDrawerTrigger();

describe("Base UI Drawer Position example", () => {
  test("matches the Base UI bottom drawer content", () => {
    Scene.scene(
      {
        update: DrawerPositionExample.update,
        view: DrawerPositionExample.view,
      },
      Scene.with(DrawerPositionExample.init()[0]),
      Scene.click(Scene.role("button", { name: "Open bottom drawer" })),
      Scene.Command.resolve(
        FocusClose,
        DrawerPositionExample.CompletedFocusDrawerClose()
      ),
      Scene.expect(viewport).toHaveClass("items-end"),
      Scene.expect(viewport).toHaveClass("justify-stretch"),
      Scene.expect(popup).toHaveClass("h-auto"),
      Scene.expect(popup).toHaveClass("max-h-[50vh]"),
      Scene.expect(popup).toHaveClass("max-w-none"),
      Scene.expect(popup).toHaveStyle("maxWidth", "none"),
      Scene.expect(popup).toHaveStyle("width", "100%"),
      Scene.expect(popup).toExist(),
      Scene.expect(Scene.role("dialog", { name: "Notifications" })).toExist(),
      Scene.expect(Scene.text("You are all caught up. Good job!")).toExist(),
      Scene.click(Scene.role("button", { name: "Close" })),
      Scene.Command.resolve(
        FocusTrigger,
        DrawerPositionExample.CompletedFocusDrawerTrigger()
      ),
      Scene.expect(popup).not.toExist()
    );
  });

  test("traps focus and dismisses the bottom drawer with a downward swipe", () => {
    Scene.scene(
      {
        update: DrawerPositionExample.update,
        view: DrawerPositionExample.view,
      },
      Scene.with(DrawerPositionExample.init()[0]),
      Scene.click(Scene.role("button", { name: "Open bottom drawer" })),
      Scene.Command.resolve(
        FocusClose,
        DrawerPositionExample.CompletedFocusDrawerClose()
      ),
      Scene.expect(popup).toHaveHandler("keydown"),
      Scene.expect(popup).toHaveHandler("pointerdown"),
      Scene.expect(popup).toHaveHandler("pointermove"),
      Scene.expect(popup).toHaveHandler("pointerup"),
      Scene.focus(Scene.testId("base-ui-drawer-bottom-before-focus-guard")),
      Scene.Command.resolve(
        FocusClose,
        DrawerPositionExample.CompletedFocusDrawerClose()
      ),
      Scene.pointerDown(popup, { screenY: 20 }),
      Scene.pointerUp(popup, { screenY: 140 }),
      Scene.Command.resolve(
        FocusTrigger,
        DrawerPositionExample.CompletedFocusDrawerTrigger()
      ),
      Scene.expect(popup).not.toExist()
    );
  });
});
