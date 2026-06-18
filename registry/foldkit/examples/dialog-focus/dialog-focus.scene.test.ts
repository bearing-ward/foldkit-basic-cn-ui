import { Option } from "effect";
import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Dialog from "../../ui/dialog";
import { GotDialogMessage, init, update, view } from "./main";

const [initialModel] = init();
const focusSelector = "#dialog-focus-name";

const ShowDialog = Dialog.ShowDialog({
  id: "dialog-focus",
  maybeFocusSelector: Option.some(focusSelector),
});

const CloseDialog = Dialog.CloseDialog({ id: "dialog-focus" });

describe("dialog-focus example", () => {
  test("opens with a configured focus target and closes through documented controls", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.expect(
        Scene.role("button", { name: "Open focus dialog" })
      ).toExist(),
      Scene.expect(Scene.text("Focus first field")).not.toExist(),
      Scene.click(Scene.role("button", { name: "Open focus dialog" })),
      Scene.Command.expectExact(ShowDialog),
      Scene.Command.resolve(
        ShowDialog,
        Dialog.CompletedShowDialog(),
        (message) => GotDialogMessage({ message })
      ),
      Scene.expect(
        Scene.role("dialog", { name: "Focus first field" })
      ).toExist(),
      Scene.expect(
        Scene.role("dialog", { name: "Focus first field" })
      ).toHaveAccessibleDescription(/focusSelector/u),
      Scene.expect(Scene.role("textbox", { name: "Account name" })).toExist(),
      Scene.click(Scene.role("button", { name: "Save details" })),
      Scene.Command.expectExact(CloseDialog),
      Scene.Command.resolve(
        CloseDialog,
        Dialog.CompletedCloseDialog(),
        (message) => GotDialogMessage({ message })
      ),
      Scene.expect(Scene.text("Focus first field")).not.toExist()
    );
  });
});
