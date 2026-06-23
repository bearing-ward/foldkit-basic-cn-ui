import { Scene } from "foldkit";
import * as Ui from "@foldkit/ui";
import { describe, test } from "vitest";

import * as Toast from "../../ui/toast";
import * as ToastVariantsExample from "./main";

const toAnimationMessage =
  (entryId: string) => (message: Ui.Animation.Message) =>
    ToastVariantsExample.GotToastMessage({
      message: Toast.GotAnimationMessage({ entryId, message }),
    });

const resolveEnterAnimation = (entryId: string) =>
  Scene.Command.resolveAll(
    [
      Ui.Animation.RequestFrame,
      Ui.Animation.AdvancedAnimationFrame(),
      toAnimationMessage(entryId),
    ],
    [
      Ui.Animation.WaitForAnimationSettled({ id: entryId }),
      Ui.Animation.EndedAnimation(),
      toAnimationMessage(entryId),
    ]
  );

describe("Toast Variants example", () => {
  test("shows status and alert variants", () => {
    Scene.scene(
      {
        update: ToastVariantsExample.update,
        view: ToastVariantsExample.view,
      },
      Scene.with(ToastVariantsExample.init()[0]),
      Scene.click(Scene.role("button", { name: "Show variants" })),
      resolveEnterAnimation("toast-variants-entry-0"),
      resolveEnterAnimation("toast-variants-entry-1"),
      resolveEnterAnimation("toast-variants-entry-2"),
      resolveEnterAnimation("toast-variants-entry-3"),
      Scene.expect(Scene.text("Shown notifications: 4")).toExist(),
      Scene.expect(Scene.text("Queued")).toExist(),
      Scene.expect(Scene.text("Published")).toExist(),
      Scene.expect(Scene.text("Review needed")).toExist(),
      Scene.expect(Scene.text("Failed")).toExist(),
      Scene.expect(Scene.role("status")).toExist(),
      Scene.expect(Scene.role("alert")).toExist()
    );
  });
});
