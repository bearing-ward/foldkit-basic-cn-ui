import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as BaseUiAlertDialogDetachedTriggersExample from "./main";

describe("Base UI Alert Dialog Detached triggers example", () => {
  test("opens the alert dialog from a trigger outside the root", () => {
    Scene.scene(
      {
        update: BaseUiAlertDialogDetachedTriggersExample.update,
        view: BaseUiAlertDialogDetachedTriggersExample.view,
      },
      Scene.with(BaseUiAlertDialogDetachedTriggersExample.init()[0]),
      Scene.click(Scene.role("button", { name: "Discard draft" })),
      Scene.expect(
        Scene.role("alertdialog", { name: "Discard draft?" })
      ).toExist(),
      Scene.expect(Scene.text("You can't undo this action.")).toExist(),
      Scene.click(Scene.role("button", { name: "Discard" })),
      Scene.expect(Scene.text("Draft discarded.")).toExist()
    );
  });
});
