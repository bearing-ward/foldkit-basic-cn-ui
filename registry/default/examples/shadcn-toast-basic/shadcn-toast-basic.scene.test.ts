import { Scene, Ui } from "foldkit";
import { describe, test } from "vitest";

import * as Toast from "../../ui/toast";
import * as ShadcnToastBasicExample from "./main";

const toAnimationMessage = (message: Ui.Animation.Message) =>
  ShadcnToastBasicExample.GotToastMessage({
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
      Ui.Animation.WaitForAnimationSettled({
        id: "toast-basic-entry-0",
      }),
      Ui.Animation.EndedAnimation(),
      toAnimationMessage,
    ]
  );

describe("Shadcn Toast Basic example", () => {
  test("shows the upstream scheduled toast copy", () => {
    Scene.scene(
      {
        update: ShadcnToastBasicExample.update,
        view: ShadcnToastBasicExample.view,
      },
      Scene.with(ShadcnToastBasicExample.init()[0]),
      Scene.click(Scene.role("button", { name: "Show toast" })),
      resolveEntryAnimation(),
      Scene.expect(Scene.role("status")).toExist(),
      Scene.expect(Scene.text("Scheduled: Catch up")).toExist(),
      Scene.expect(Scene.text("Friday, February 10, 2023 at 5:57 PM")).toExist(),
      Scene.click(Scene.role("button", { name: "Dismiss Scheduled: Catch up" })),
      Scene.expect(Scene.role("status")).toHaveAttr("data-leave", ""),
      resolveEntryAnimation()
    );
  });
});
