import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as AlertDialogBasicExample from "./main";

describe("Alert Dialog Basic example", () => {
  test("matches the Base UI default Discard draft example", () => {
    Scene.scene(
      {
        update: AlertDialogBasicExample.update,
        view: AlertDialogBasicExample.view,
      },
      Scene.with(AlertDialogBasicExample.init()[0]),
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
