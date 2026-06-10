import { Scene } from "foldkit/test";
import { describe, test } from "vitest";

import * as BaseUiCheckboxFormExample from "./main";

describe("base-ui-checkbox-form example", () => {
  test("renders the form integration checkbox", () => {
    Scene.scene(
      {
        update: BaseUiCheckboxFormExample.update,
        view: BaseUiCheckboxFormExample.view,
      },
      Scene.with(BaseUiCheckboxFormExample.init()[0]),
      Scene.expect(
        Scene.role("checkbox", { name: "Stay logged in for 7 days" })
      ).toExist(),
      Scene.click(
        Scene.role("checkbox", { name: "Stay logged in for 7 days" })
      ),
      Scene.expect(
        Scene.role("checkbox", { name: "Stay logged in for 7 days" })
      ).toHaveAttr("aria-checked", "true")
    );
  });
});
