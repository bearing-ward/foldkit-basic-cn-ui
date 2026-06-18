import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as BaseUiCheckboxBasicExample from "./main";

describe("Base UI Checkbox Basic example", () => {
  test("matches the checked Base UI default checkbox example", () => {
    Scene.scene(
      {
        update: BaseUiCheckboxBasicExample.update,
        view: BaseUiCheckboxBasicExample.view,
      },
      Scene.with(BaseUiCheckboxBasicExample.init()[0]),
      Scene.expect(
        Scene.role("checkbox", { name: "Enable notifications" })
      ).toHaveAttr("aria-checked", "true"),
      Scene.click(Scene.role("checkbox", { name: "Enable notifications" })),
      Scene.expect(
        Scene.role("checkbox", { name: "Enable notifications" })
      ).toHaveAttr("aria-checked", "false")
    );
  });
});
