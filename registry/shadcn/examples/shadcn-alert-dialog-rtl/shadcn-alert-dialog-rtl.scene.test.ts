import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnAlertDialogRtlExample from "./main";

describe("shadcn Alert Dialog RTL example", () => {
  test("opens, continues, and updates parent-visible feedback in rtl", () => {
    Scene.scene(
      {
        update: ShadcnAlertDialogRtlExample.update,
        view: ShadcnAlertDialogRtlExample.view,
      },
      Scene.with(ShadcnAlertDialogRtlExample.init()[0]),
      Scene.expect(Scene.text("تمت المتابعة: لا")).toExist(),
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
      Scene.expect(Scene.text("تمت المتابعة: نعم")).toExist()
    );
  });
});
