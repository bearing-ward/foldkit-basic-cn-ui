import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnAlertDialogDestructiveExample from "./main";

describe("shadcn Alert Dialog Destructive example", () => {
  test("opens, deletes, and updates parent-visible feedback", () => {
    Scene.scene(
      {
        update: ShadcnAlertDialogDestructiveExample.update,
        view: ShadcnAlertDialogDestructiveExample.view,
      },
      Scene.with(ShadcnAlertDialogDestructiveExample.init()[0]),
      Scene.expect(Scene.text("Deleted: no")).toExist(),
      Scene.click(Scene.role("button", { name: "Show Dialog" })),
      Scene.expect(
        Scene.role("alertdialog", { name: "Are you absolutely sure?" })
      ).toExist(),
      Scene.expect(
        Scene.text(
          "This action cannot be undone. This will permanently delete your account from our servers."
        )
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Delete" })),
      Scene.expect(Scene.text("Deleted: yes")).toExist()
    );
  });
});
