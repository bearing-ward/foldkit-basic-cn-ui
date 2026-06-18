import { Scene } from "foldkit/test";
import { describe, test } from "vitest";

import * as BaseUiCheckboxNativeButtonExample from "./main";

describe("base-ui-checkbox-native-button example", () => {
  test("renders a sibling label with a native button checkbox", () => {
    Scene.scene(
      {
        update: BaseUiCheckboxNativeButtonExample.update,
        view: BaseUiCheckboxNativeButtonExample.view,
      },
      Scene.with(BaseUiCheckboxNativeButtonExample.init()[0]),
      Scene.expect(
        Scene.role("checkbox", { name: "Enable notifications" })
      ).toExist(),
      Scene.click(Scene.role("checkbox", { name: "Enable notifications" })),
      Scene.expect(
        Scene.role("checkbox", { name: "Enable notifications" })
      ).toHaveAttr("aria-checked", "true")
    );
  });
});
