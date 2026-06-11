import { Option } from "effect";
import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Dialog from "../../ui/dialog";
import { GotDialogMessage, init, update, view } from "./main";

const [initialModel] = init();

const ShowDialog = Dialog.ShowDialog({
  id: "dialog-custom-close-button",
  maybeFocusSelector: Option.none(),
});

const CloseDialog = Dialog.CloseDialog({ id: "dialog-custom-close-button" });

describe("shadcn-dialog-custom-close-button example", () => {
  test("opens from Share and closes through custom footer close button", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.expect(Scene.role("button", { name: "Share" })).toExist(),
      Scene.expect(Scene.text("Share link")).not.toExist(),
      Scene.click(Scene.role("button", { name: "Share" })),
      Scene.Command.expectExact(ShowDialog),
      Scene.Command.resolve(
        ShowDialog,
        Dialog.CompletedShowDialog(),
        (message) => GotDialogMessage({ message })
      ),
      Scene.expect(Scene.role("dialog", { name: "Share link" })).toExist(),
      Scene.expect(
        Scene.role("dialog", { name: "Share link" })
      ).toHaveAccessibleDescription(/Anyone who has this link/u),
      Scene.expect(
        Scene.text("https://ui.shadcn.com/docs/components/dialog")
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Close" })),
      Scene.Command.expectExact(CloseDialog),
      Scene.Command.resolve(
        CloseDialog,
        Dialog.CompletedCloseDialog(),
        (message) => GotDialogMessage({ message })
      ),
      Scene.expect(Scene.text("Share link")).not.toExist()
    );
  });
});
