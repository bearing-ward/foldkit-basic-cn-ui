import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as SwitchDisabledExample from "./main";

describe("Switch Disabled example", () => {
  test("renders disabled switch state", () => {
    Scene.scene(
      {
        update: SwitchDisabledExample.update,
        view: SwitchDisabledExample.view,
      },
      Scene.with(SwitchDisabledExample.init()[0]),
      Scene.expect(
        Scene.role("switch", { name: "Locked notifications" })
      ).toBeDisabled(),
      Scene.expect(Scene.text("Notification changes are locked.")).toExist()
    );
  });
});
