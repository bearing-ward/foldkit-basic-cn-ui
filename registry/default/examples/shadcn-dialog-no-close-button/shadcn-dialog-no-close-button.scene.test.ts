import { Option } from "effect";
import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Dialog from "../../ui/dialog";
import { GotDialogMessage, init, update, view } from "./main";

const [initialModel] = init();

const ShowDialog = Dialog.ShowDialog({
  id: "dialog-no-close-button",
  maybeFocusSelector: Option.none(),
});

const CloseDialog = Dialog.CloseDialog({ id: "dialog-no-close-button" });

describe("shadcn-dialog-no-close-button example", () => {
  test("opens without a close button and closes through the action", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.click(Scene.role("button", { name: "Open Dialog" })),
      Scene.Command.expectExact(ShowDialog),
      Scene.Command.resolve(
        ShowDialog,
        Dialog.CompletedShowDialog(),
        (message) => GotDialogMessage({ message })
      ),
      Scene.expect(
        Scene.role("dialog", { name: "Are you absolutely sure?" })
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "Close" })).not.toExist(),
      Scene.click(Scene.role("button", { name: "Continue" })),
      Scene.Command.expectExact(CloseDialog),
      Scene.Command.resolve(
        CloseDialog,
        Dialog.CompletedCloseDialog(),
        (message) => GotDialogMessage({ message })
      ),
      Scene.expect(Scene.text("Are you absolutely sure?")).not.toExist()
    );
  });
});
