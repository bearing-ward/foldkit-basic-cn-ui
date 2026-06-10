import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as BaseUiAlertDialogMultipleTriggersExample from "./main";

describe("Base UI Alert Dialog Multiple triggers example", () => {
  test("uses the trigger that opened the shared alert dialog", () => {
    Scene.scene(
      {
        update: BaseUiAlertDialogMultipleTriggersExample.update,
        view: BaseUiAlertDialogMultipleTriggersExample.view,
      },
      Scene.with(BaseUiAlertDialogMultipleTriggersExample.init()[0]),
      Scene.click(Scene.role("button", { name: "Remove Bob" })),
      Scene.expect(
        Scene.role("alertdialog", { name: "Remove Bob?" })
      ).toExist(),
      Scene.expect(
        Scene.text("This will remove Bob from the project.")
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Remove" })),
      Scene.expect(Scene.text("Removed Bob.")).toExist()
    );
  });
});
