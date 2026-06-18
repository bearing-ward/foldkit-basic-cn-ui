import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnAlertDialogMediaExample from "./main";

describe("shadcn Alert Dialog Media example", () => {
  test("opens the media dialog and continues", () => {
    Scene.scene(
      {
        update: ShadcnAlertDialogMediaExample.update,
        view: ShadcnAlertDialogMediaExample.view,
      },
      Scene.with(ShadcnAlertDialogMediaExample.init()[0]),
      Scene.expect(Scene.text("Shared: no")).toExist(),
      Scene.click(Scene.role("button", { name: "Share Project" })),
      Scene.expect(
        Scene.role("alertdialog", { name: "Share project" })
      ).toExist(),
      Scene.expect(
        Scene.text("Anyone with this link will be able to view this project.")
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Continue" })),
      Scene.expect(Scene.text("Shared: yes")).toExist()
    );
  });
});
