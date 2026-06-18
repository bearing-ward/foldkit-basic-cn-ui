import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as BaseUiAlertDialogCloseConfirmationExample from "./main";

describe("Base UI Alert Dialog Close Confirmation example", () => {
  test("opens a nested discard confirmation before closing a non-empty tweet", () => {
    Scene.scene(
      {
        update: BaseUiAlertDialogCloseConfirmationExample.update,
        view: BaseUiAlertDialogCloseConfirmationExample.view,
      },
      Scene.with(BaseUiAlertDialogCloseConfirmationExample.init()[0]),
      Scene.click(Scene.role("button", { name: "Tweet" })),
      Scene.expect(Scene.role("alertdialog", { name: "New tweet" })).toExist(),
      Scene.type(Scene.placeholder("What's happening?"), "Hello Base UI"),
      Scene.click(Scene.role("button", { name: "Cancel" })),
      Scene.expect(
        Scene.role("alertdialog", { name: "Discard tweet?" })
      ).toExist(),
      Scene.expect(Scene.text("Your tweet will be lost.")).toExist(),
      Scene.click(Scene.role("button", { name: "Go back" })),
      Scene.expect(Scene.role("alertdialog", { name: "New tweet" })).toExist(),
      Scene.click(Scene.role("button", { name: "Cancel" })),
      Scene.click(Scene.role("button", { name: "Discard" })),
      Scene.expect(Scene.text("Tweet discarded.")).toExist()
    );
  });
});
