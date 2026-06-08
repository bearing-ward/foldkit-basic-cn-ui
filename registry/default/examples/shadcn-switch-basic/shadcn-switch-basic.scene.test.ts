import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnSwitchBasicExample from "./main";

describe("shadcn Switch Basic example", () => {
  test("toggles shadcn switch feedback", () => {
    Scene.scene(
      {
        update: ShadcnSwitchBasicExample.update,
        view: ShadcnSwitchBasicExample.view,
      },
      Scene.with(ShadcnSwitchBasicExample.init()[0]),
      Scene.expect(Scene.role("switch", { name: "Email alerts" })).toExist(),
      Scene.expect(
        Scene.text("Receive operational notifications by email.")
      ).toExist(),
      Scene.expect(Scene.text("Email alerts: off")).toExist(),
      Scene.click(Scene.role("switch", { name: "Email alerts" })),
      Scene.expect(Scene.role("switch", { name: "Email alerts" })).toBeChecked()
    );
  });
});
