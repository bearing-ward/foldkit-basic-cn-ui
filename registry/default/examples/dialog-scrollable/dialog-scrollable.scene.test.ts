import { Option } from "effect";
import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Dialog from "../../ui/dialog";
import { GotDialogMessage, init, update, view } from "./main";

const [initialModel] = init();

const ShowDialog = Dialog.ShowDialog({
  id: "dialog-scrollable",
  maybeFocusSelector: Option.none(),
});

const CloseDialog = Dialog.CloseDialog({ id: "dialog-scrollable" });

describe("dialog-scrollable example", () => {
  test("opens long content with persistent footer actions", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.expect(
        Scene.role("button", { name: "Review permissions" })
      ).toExist(),
      Scene.expect(Scene.text("Review team permissions")).not.toExist(),
      Scene.click(Scene.role("button", { name: "Review permissions" })),
      Scene.Command.expectExact(ShowDialog),
      Scene.Command.resolve(
        ShowDialog,
        Dialog.CompletedShowDialog(),
        (message) => GotDialogMessage({ message })
      ),
      Scene.expect(
        Scene.role("dialog", { name: "Review team permissions" })
      ).toExist(),
      Scene.expect(
        Scene.role("dialog", { name: "Review team permissions" })
      ).toHaveAccessibleDescription(/Scrollable dialog content/u),
      Scene.expect(Scene.text("Export workspace reports")).toExist(),
      Scene.expect(Scene.text("Configure webhook delivery")).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Apply permissions" })
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Apply permissions" })),
      Scene.Command.expectExact(CloseDialog),
      Scene.Command.resolve(
        CloseDialog,
        Dialog.CompletedCloseDialog(),
        (message) => GotDialogMessage({ message })
      ),
      Scene.expect(Scene.text("Review team permissions")).not.toExist()
    );
  });
});
