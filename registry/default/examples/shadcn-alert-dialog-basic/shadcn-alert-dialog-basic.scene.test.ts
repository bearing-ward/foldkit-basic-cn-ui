import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnAlertDialogBasicExample from "./main";

describe("shadcn Alert Dialog Basic example", () => {
  test("opens, confirms, and updates parent-visible feedback", () => {
    Scene.scene(
      {
        update: ShadcnAlertDialogBasicExample.update,
        view: ShadcnAlertDialogBasicExample.view,
      },
      Scene.with(ShadcnAlertDialogBasicExample.init()[0]),
      Scene.expect(Scene.text("Project archived: no")).toExist(),
      Scene.click(Scene.role("button", { name: "Archive project" })),
      Scene.expect(
        Scene.role("alertdialog", { name: "Archive project?" })
      ).toExist(),
      Scene.expect(
        Scene.text("This removes the project from active dashboards.")
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Archive" })),
      Scene.expect(Scene.text("Project archived: yes")).toExist()
    );
  });
});
