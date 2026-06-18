import { Option } from "effect";
import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Dialog from "../../../foldkit/ui/dialog";
import { GotDialogMessage, init, update, view } from "./main";

const [initialModel] = init();

const ShowDialog = Dialog.ShowDialog({
  id: "dialog-basic",
  maybeFocusSelector: Option.none(),
});

const CloseDialog = Dialog.CloseDialog({ id: "dialog-basic" });

describe("dialog-basic example", () => {
  test("opens and closes through documented controls", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.expect(
        Scene.role("button", { name: "View notifications" })
      ).toExist(),
      Scene.expect(Scene.text("Notifications")).not.toExist(),
      Scene.click(Scene.role("button", { name: "View notifications" })),
      Scene.Command.expectExact(ShowDialog),
      Scene.Command.resolve(
        ShowDialog,
        Dialog.CompletedShowDialog(),
        (message) => GotDialogMessage({ message })
      ),
      Scene.expect(Scene.role("dialog", { name: "Notifications" })).toExist(),
      Scene.expect(
        Scene.role("dialog", { name: "Notifications" })
      ).toHaveAccessibleDescription("You are all caught up. Good job!"),
      Scene.expect(Scene.role("button", { name: "Cancel" })).not.toExist(),
      Scene.click(Scene.role("button", { name: "Close" })),
      Scene.Command.expectExact(CloseDialog),
      Scene.Command.resolve(
        CloseDialog,
        Dialog.CompletedCloseDialog(),
        (message) => GotDialogMessage({ message })
      ),
      Scene.expect(Scene.text("Notifications")).not.toExist()
    );
  });
});
