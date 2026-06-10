import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Menu from "../../ui/base-ui-menu";
import * as BaseUiAlertDialogOpenFromMenuExample from "./main";

const FocusItems = Menu.FocusItems({ id: "alert-dialog-menu" });
const FocusButton = Menu.FocusButton({ id: "alert-dialog-menu" });
const AnchorMenu = Menu.AnchorMenu({
  buttonId: "alert-dialog-menu-button",
  anchor: Menu.baseUiMenuDefaultAnchor,
});

const toMenuMessage = (message: Menu.Message) =>
  BaseUiAlertDialogOpenFromMenuExample.GotMenuMessage({ message });

const resolveMenuMounts = () =>
  Scene.Mount.resolveAll(
    [
      Menu.PortalMenuBackdrop,
      Menu.CompletedPortalMenuBackdrop(),
      toMenuMessage,
    ],
    [AnchorMenu, Menu.CompletedAnchorMenu(), toMenuMessage]
  );

describe("Base UI Alert Dialog Open from menu example", () => {
  test("opens the destructive alert dialog from a menu item", () => {
    Scene.scene(
      {
        update: BaseUiAlertDialogOpenFromMenuExample.update,
        view: BaseUiAlertDialogOpenFromMenuExample.view,
      },
      Scene.with(BaseUiAlertDialogOpenFromMenuExample.init()[0]),
      Scene.click(Scene.role("button", { name: "Actions" })),
      Scene.Command.expectHas(FocusItems),
      Scene.Command.resolve(
        FocusItems,
        Menu.CompletedFocusItems(),
        toMenuMessage
      ),
      resolveMenuMounts(),
      Scene.click(Scene.role("menuitem", { name: "Delete" })),
      Scene.Command.expectHas(FocusButton),
      Scene.Command.resolve(
        FocusButton,
        Menu.CompletedFocusButton(),
        toMenuMessage
      ),
      Scene.Mount.expectEnded(Menu.PortalMenuBackdrop, AnchorMenu),
      Scene.expect(
        Scene.role("alertdialog", { name: "Delete item?" })
      ).toExist(),
      Scene.expect(Scene.text("This action cannot be undone.")).toExist(),
      Scene.click(Scene.role("button", { name: "Delete" })),
      Scene.expect(Scene.text("Item deleted.")).toExist()
    );
  });
});
