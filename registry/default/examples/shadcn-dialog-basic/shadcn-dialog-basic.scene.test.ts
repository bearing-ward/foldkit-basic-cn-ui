import { Option } from "effect";
import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Dialog from "../../ui/dialog";
import { GotDialogMessage, init, update, view } from "./main";

const [initialModel] = init();

const ShowDialog = Dialog.ShowDialog({
  id: "dialog-basic",
  maybeFocusSelector: Option.none(),
});

const CloseDialog = Dialog.CloseDialog({ id: "dialog-basic" });

describe("shadcn-dialog-basic example", () => {
  test("opens and closes through documented controls", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.expect(Scene.role("button", { name: "Open dialog" })).toExist(),
      Scene.expect(Scene.text("Edit profile")).not.toExist(),
      Scene.click(Scene.role("button", { name: "Open dialog" })),
      Scene.Command.expectExact(ShowDialog),
      Scene.Command.resolve(
        ShowDialog,
        Dialog.CompletedShowDialog(),
        (message) => GotDialogMessage({ message })
      ),
      Scene.expect(Scene.role("dialog", { name: "Edit profile" })).toExist(),
      Scene.expect(
        Scene.role("dialog", { name: "Edit profile" })
      ).toHaveAccessibleDescription(/Make changes to your profile/u),
      Scene.click(Scene.role("button", { name: "Save changes" })),
      Scene.Command.expectExact(CloseDialog),
      Scene.Command.resolve(
        CloseDialog,
        Dialog.CompletedCloseDialog(),
        (message) => GotDialogMessage({ message })
      ),
      Scene.expect(Scene.text("Edit profile")).not.toExist()
    );
  });
});
