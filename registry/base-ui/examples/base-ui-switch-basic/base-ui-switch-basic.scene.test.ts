import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as BaseUiSwitchBasicExample from "./main";

describe("Base UI switch Basic example", () => {
  test("toggles notification feedback", () => {
    Scene.scene(
      {
        update: BaseUiSwitchBasicExample.update,
        view: BaseUiSwitchBasicExample.view,
      },
      Scene.with(BaseUiSwitchBasicExample.init()[0]),
      Scene.expect(Scene.role("switch", { name: "Notifications" })).toHaveAttr(
        "aria-checked",
        "true"
      ),
      Scene.click(Scene.role("switch", { name: "Notifications" })),
      Scene.expect(Scene.role("switch", { name: "Notifications" })).toHaveAttr(
        "aria-checked",
        "false"
      )
    );
  });
});
