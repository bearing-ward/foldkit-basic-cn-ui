import { Scene, Ui } from "foldkit";
import { describe, test } from "vitest";

import * as Toast from "../../ui/base-ui-toast";
import * as BaseUiToastBasicExample from "./main";

const toAnimationMessage = (message: Ui.Animation.Message) =>
  BaseUiToastBasicExample.GotToastMessage({
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

describe("Base UI toast Basic example", () => {
  test("shows a sticky toast and marks it for dismissal", () => {
    Scene.scene(
      {
        update: BaseUiToastBasicExample.update,
        view: BaseUiToastBasicExample.view,
      },
      Scene.with(BaseUiToastBasicExample.init()[0]),
      Scene.click(Scene.role("button", { name: "Create toast" })),
      resolveEntryAnimation(),
      Scene.expect(Scene.role("status")).toExist(),
      Scene.expect(Scene.text("Toast created")).toExist(),
      Scene.expect(Scene.text("The toast was created successfully.")).toExist(),
      Scene.click(Scene.role("button", { name: "Dismiss Toast created" })),
      Scene.expect(Scene.role("status")).toHaveAttr("data-leave", ""),
      resolveEntryAnimation()
    );
  });
});
