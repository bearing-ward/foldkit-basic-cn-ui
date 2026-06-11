import { Option } from "effect";
import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Dialog from "../../ui/dialog";
import { GotDialogMessage, init, update, view } from "./main";

const [initialModel] = init();

const ShowDialog = Dialog.ShowDialog({
  id: "dialog-scrollable-content",
  maybeFocusSelector: Option.none(),
});

const CloseDialog = Dialog.CloseDialog({ id: "dialog-scrollable-content" });

describe("shadcn-dialog-scrollable-content example", () => {
  test("opens terms content in a constrained scroll area", () => {
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
      Scene.expect(Scene.role("dialog", { name: "Terms of Service" })).toExist(),
      Scene.expect(
        Scene.text(
          "You are responsible for maintaining the confidentiality of your account and password."
        )
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Close" })),
      Scene.Command.expectExact(CloseDialog),
      Scene.Command.resolve(
        CloseDialog,
        Dialog.CompletedCloseDialog(),
        (message) => GotDialogMessage({ message })
      ),
      Scene.expect(Scene.text("Terms of Service")).not.toExist()
    );
  });
});
