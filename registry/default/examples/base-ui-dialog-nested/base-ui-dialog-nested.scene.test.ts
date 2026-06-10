import { Option } from "effect";
import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Dialog from "../../ui/dialog";
import * as BaseUiDialogNestedExample from "./main";

const NotificationsShowDialog = Dialog.ShowDialog({
  id: "dialog-nested-notifications",
  maybeFocusSelector: Option.none(),
});

const DetailsShowDialog = Dialog.ShowDialog({
  id: "dialog-nested-details",
  maybeFocusSelector: Option.none(),
});

describe("Base UI Dialog Nested example", () => {
  test("opens a child dialog from the parent dialog", () => {
    Scene.scene(
      {
        update: BaseUiDialogNestedExample.update,
        view: BaseUiDialogNestedExample.view,
      },
      Scene.with(BaseUiDialogNestedExample.init()[0]),
      Scene.click(Scene.role("button", { name: "View notifications" })),
      Scene.Command.resolve(
        NotificationsShowDialog,
        Dialog.CompletedShowDialog(),
        (message) =>
          BaseUiDialogNestedExample.GotNotificationsDialogMessage({ message })
      ),
      Scene.expect(Scene.role("dialog", { name: "Notifications" })).toExist(),
      Scene.click(Scene.role("button", { name: "View details" })),
      Scene.Command.resolve(
        DetailsShowDialog,
        Dialog.CompletedShowDialog(),
        (message) =>
          BaseUiDialogNestedExample.GotDetailsDialogMessage({ message })
      ),
      Scene.expect(
        Scene.role("dialog", { name: "Notification details" })
      ).toExist(),
      Scene.expect(
        Scene.text(
          "Your workspace has no unread security or billing notifications."
        )
      ).toExist()
    );
  });
});
