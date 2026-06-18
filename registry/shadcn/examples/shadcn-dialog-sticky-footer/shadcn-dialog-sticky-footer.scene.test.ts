import { Option } from "effect";
import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Dialog from "../../../foldkit/ui/dialog";
import { GotDialogMessage, init, update, view } from "./main";

const [initialModel] = init();

const ShowDialog = Dialog.ShowDialog({
  id: "dialog-sticky-footer",
  maybeFocusSelector: Option.none(),
});

const CloseDialog = Dialog.CloseDialog({ id: "dialog-sticky-footer" });

describe("shadcn-dialog-sticky-footer example", () => {
  test("opens scrollable content with visible footer actions", () => {
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
      Scene.expect(Scene.role("dialog", { name: "Sticky Footer" })).toExist(),
      Scene.expect(
        Scene.role("dialog", { name: "Sticky Footer" })
      ).toHaveAccessibleDescription(/scrollable body/u),
      Scene.expect(Scene.role("button", { name: "Cancel" })).toExist(),
      Scene.click(Scene.role("button", { name: "Continue" })),
      Scene.Command.expectExact(CloseDialog),
      Scene.Command.resolve(
        CloseDialog,
        Dialog.CompletedCloseDialog(),
        (message) => GotDialogMessage({ message })
      ),
      Scene.expect(Scene.text("Sticky Footer")).not.toExist()
    );
  });
});
