import { Option } from "effect";
import { Scene, Ui } from "foldkit";
import { describe, test } from "vitest";

import * as Dialog from "../../ui/dialog";
import { GotDialogMessage, init, update, view } from "./main";

const [initialModel] = init();

const ShowDialog = Dialog.ShowDialog({
  id: "dialog-animated",
  maybeFocusSelector: Option.none(),
});

const CloseDialog = Dialog.CloseDialog({ id: "dialog-animated" });
const SettlePanelAnimation = Ui.Animation.WaitForAnimationSettled({
  id: "dialog-animated-panel",
});

const toAnimationMessage = (message: Ui.Animation.Message) =>
  GotDialogMessage({ message: Dialog.GotAnimationMessage({ message }) });

describe("dialog-animated example", () => {
  test("opens and closes through animated dialog controls", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.expect(
        Scene.role("button", { name: "Open animated dialog" })
      ).toExist(),
      Scene.expect(Scene.text("Animated dialog")).not.toExist(),
      Scene.click(Scene.role("button", { name: "Open animated dialog" })),
      Scene.Command.expectHas(ShowDialog, Ui.Animation.RequestFrame),
      Scene.Command.resolve(
        ShowDialog,
        Dialog.CompletedShowDialog(),
        (message) => GotDialogMessage({ message })
      ),
      Scene.Command.resolve(
        Ui.Animation.RequestFrame,
        Ui.Animation.AdvancedAnimationFrame(),
        toAnimationMessage
      ),
      Scene.Command.resolve(
        SettlePanelAnimation,
        Ui.Animation.EndedAnimation(),
        toAnimationMessage
      ),
      Scene.expect(Scene.role("dialog", { name: "Animated dialog" })).toExist(),
      Scene.expect(
        Scene.role("dialog", { name: "Animated dialog" })
      ).toHaveAccessibleDescription(/Foldkit animation state/u),
      Scene.click(Scene.role("button", { name: "Done" })),
      Scene.Command.expectHas(Ui.Animation.RequestFrame),
      Scene.Command.resolve(
        Ui.Animation.RequestFrame,
        Ui.Animation.AdvancedAnimationFrame(),
        toAnimationMessage
      ),
      Scene.Command.resolve(
        SettlePanelAnimation,
        Ui.Animation.EndedAnimation(),
        toAnimationMessage
      ),
      Scene.Command.expectHas(CloseDialog),
      Scene.Command.resolve(
        CloseDialog,
        Dialog.CompletedCloseDialog(),
        (message) => GotDialogMessage({ message })
      ),
      Scene.expect(Scene.text("Animated dialog")).not.toExist()
    );
  });
});
