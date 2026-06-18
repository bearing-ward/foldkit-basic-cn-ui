import { Option } from "effect";
import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Dialog from "../../ui/dialog";
import { GotDialogMessage, init, update, view } from "./main";

const [initialModel] = init();

const ShowDialog = Dialog.ShowDialog({
  id: "dialog-destructive",
  maybeFocusSelector: Option.none(),
});

const CloseDialog = Dialog.CloseDialog({ id: "dialog-destructive" });

describe("dialog-destructive example", () => {
  test("opens and closes through destructive dialog controls", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.expect(
        Scene.role("button", { name: "Open delete dialog" })
      ).toExist(),
      Scene.expect(Scene.text("Delete account?")).not.toExist(),
      Scene.click(Scene.role("button", { name: "Open delete dialog" })),
      Scene.Command.expectExact(ShowDialog),
      Scene.Command.resolve(
        ShowDialog,
        Dialog.CompletedShowDialog(),
        (message) => GotDialogMessage({ message })
      ),
      Scene.expect(Scene.role("dialog", { name: "Delete account?" })).toExist(),
      Scene.expect(
        Scene.role("dialog", { name: "Delete account?" })
      ).toHaveAccessibleDescription(/cannot be undone/u),
      Scene.click(Scene.role("button", { name: "Delete account" })),
      Scene.Command.expectExact(CloseDialog),
      Scene.Command.resolve(
        CloseDialog,
        Dialog.CompletedCloseDialog(),
        (message) => GotDialogMessage({ message })
      ),
      Scene.expect(Scene.text("Delete account?")).not.toExist()
    );
  });
});
