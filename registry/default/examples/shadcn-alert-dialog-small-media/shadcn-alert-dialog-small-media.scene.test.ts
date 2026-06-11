import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnAlertDialogSmallMediaExample from "./main";

describe("shadcn Alert Dialog Small with Media example", () => {
  test("opens the small media dialog and continues", () => {
    Scene.scene(
      {
        update: ShadcnAlertDialogSmallMediaExample.update,
        view: ShadcnAlertDialogSmallMediaExample.view,
      },
      Scene.with(ShadcnAlertDialogSmallMediaExample.init()[0]),
      Scene.expect(Scene.text("Connected: no")).toExist(),
      Scene.click(Scene.role("button", { name: "Show Dialog" })),
      Scene.expect(
        Scene.role("alertdialog", { name: "Enable bluetooth?" })
      ).toExist(),
      Scene.expect(
        Scene.text(
          "This will allow this device to connect with nearby accessories."
        )
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Continue" })),
      Scene.expect(Scene.text("Connected: yes")).toExist()
    );
  });
});
