import { Option } from "effect";
import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Dialog from "../../ui/dialog";
import * as BaseUiDialogCloseConfirmationExample from "./main";

const TweetShowDialog = Dialog.ShowDialog({
  id: "dialog-close-confirmation-tweet",
  maybeFocusSelector: Option.none(),
});

const ConfirmationShowDialog = Dialog.ShowDialog({
  id: "dialog-close-confirmation-discard",
  maybeFocusSelector: Option.none(),
});

describe("Base UI Dialog Close confirmation example", () => {
  test("opens a discard confirmation when closing a dirty tweet dialog", () => {
    Scene.scene(
      {
        update: BaseUiDialogCloseConfirmationExample.update,
        view: BaseUiDialogCloseConfirmationExample.view,
      },
      Scene.with({
        ...BaseUiDialogCloseConfirmationExample.init()[0],
        tweet: "Draft text",
      }),
      Scene.click(Scene.role("button", { name: "Tweet" })),
      Scene.Command.resolve(
        TweetShowDialog,
        Dialog.CompletedShowDialog(),
        (message) =>
          BaseUiDialogCloseConfirmationExample.GotTweetDialogMessage({
            message,
          })
      ),
      Scene.expect(Scene.role("dialog", { name: "New tweet" })).toExist(),
      Scene.click(Scene.role("button", { name: "Cancel" })),
      Scene.Command.resolve(
        ConfirmationShowDialog,
        Dialog.CompletedShowDialog(),
        (message) =>
          BaseUiDialogCloseConfirmationExample.GotConfirmationDialogMessage({
            message,
          })
      ),
      Scene.expect(Scene.role("dialog", { name: "Discard tweet?" })).toExist(),
      Scene.expect(Scene.text("Your tweet will be lost.")).toExist()
    );
  });
});
