import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as SwitchBasicExample from "./main";

describe("Switch Basic example", () => {
  test("toggles notification feedback", () => {
    Scene.scene(
      {
        update: SwitchBasicExample.update,
        view: SwitchBasicExample.view,
      },
      Scene.with(SwitchBasicExample.init()[0]),
      Scene.expect(
        Scene.role("switch", { name: "Enable notifications" })
      ).toExist(),
      Scene.expect(Scene.text("Notifications: off")).toExist(),
      Scene.click(Scene.role("switch", { name: "Enable notifications" })),
      Scene.expect(Scene.text("Notifications: on")).toExist()
    );
  });
});
