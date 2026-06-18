import { Scene, Ui } from "foldkit";
import { describe, test } from "vitest";

import * as Toast from "../../ui/toast";
import * as ToastBasicExample from "./main";

const toAnimationMessage = (message: Ui.Animation.Message) =>
  ToastBasicExample.GotToastMessage({
    message: Toast.GotAnimationMessage({
      entryId: "toast-basic-entry-0",
      message,
    }),
  });

const resolveEntryAnimation = () =>
  Scene.Command.resolveAll(
    [
      Ui.Animation.RequestFrame,
      Ui.Animation.AdvancedAnimationFrame(),
      toAnimationMessage,
    ],
    [
      Ui.Animation.WaitForAnimationSettled({ id: "toast-basic-entry-0" }),
      Ui.Animation.EndedAnimation(),
      toAnimationMessage,
    ]
  );

describe("Toast Basic example", () => {
  test("shows a sticky toast and marks it for dismissal", () => {
    Scene.scene(
      {
        update: ToastBasicExample.update,
        view: ToastBasicExample.view,
      },
      Scene.with(ToastBasicExample.init()[0]),
      Scene.expect(Scene.text("No toast shown yet.")).toExist(),
      Scene.click(Scene.role("button", { name: "Show toast" })),
      resolveEntryAnimation(),
      Scene.expect(Scene.text("Toast is visible.")).toExist(),
      Scene.expect(Scene.role("status")).toExist(),
      Scene.expect(Scene.text("Saved")).toExist(),
      Scene.expect(Scene.text("Your profile changes are live.")).toExist(),
      Scene.click(Scene.role("button", { name: "Dismiss Saved" })),
      Scene.expect(Scene.role("status")).toHaveAttr("data-leave", ""),
      resolveEntryAnimation(),
      Scene.expect(Scene.text("Dismissed Saved.")).toExist()
    );
  });
});
