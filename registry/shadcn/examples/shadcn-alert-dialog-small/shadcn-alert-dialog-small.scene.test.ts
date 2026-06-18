import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnAlertDialogSmallExample from "./main";

describe("shadcn Alert Dialog Small example", () => {
  test("opens the small dialog and continues", () => {
    Scene.scene(
      {
        update: ShadcnAlertDialogSmallExample.update,
        view: ShadcnAlertDialogSmallExample.view,
      },
      Scene.with(ShadcnAlertDialogSmallExample.init()[0]),
      Scene.expect(Scene.text("Continued: no")).toExist(),
      Scene.click(Scene.role("button", { name: "Show Dialog" })),
      Scene.expect(
        Scene.role("alertdialog", { name: "Are you absolutely sure?" })
      ).toExist(),
      Scene.expect(
        Scene.text(
          "This action cannot be undone. This will permanently delete your account from our servers."
        )
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Continue" })),
      Scene.expect(Scene.text("Continued: yes")).toExist()
    );
  });
});
