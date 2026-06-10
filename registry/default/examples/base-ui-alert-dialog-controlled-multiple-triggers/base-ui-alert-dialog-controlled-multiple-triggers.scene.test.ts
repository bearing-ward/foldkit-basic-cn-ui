import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as BaseUiAlertDialogControlledMultipleTriggersExample from "./main";

describe("Base UI Alert Dialog Controlled multiple triggers example", () => {
  test("controls open state and active trigger from trigger clicks", () => {
    Scene.scene(
      {
        update: BaseUiAlertDialogControlledMultipleTriggersExample.update,
        view: BaseUiAlertDialogControlledMultipleTriggersExample.view,
      },
      Scene.with(BaseUiAlertDialogControlledMultipleTriggersExample.init()[0]),
      Scene.click(Scene.role("button", { name: "Sign out" })),
      Scene.expect(Scene.role("alertdialog", { name: "Sign out?" })).toExist(),
      Scene.expect(
        Scene.text("You will need to sign in again to continue.")
      ).toExist()
    );
  });

  test("opens programmatically with the delete trigger association", () => {
    Scene.scene(
      {
        update: BaseUiAlertDialogControlledMultipleTriggersExample.update,
        view: BaseUiAlertDialogControlledMultipleTriggersExample.view,
      },
      Scene.with(BaseUiAlertDialogControlledMultipleTriggersExample.init()[0]),
      Scene.click(Scene.role("button", { name: "Open programmatically" })),
      Scene.expect(
        Scene.role("alertdialog", { name: "Delete project?" })
      ).toExist(),
      Scene.expect(
        Scene.text("This will permanently delete the project.")
      ).toExist()
    );
  });
});
