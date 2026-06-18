import { Scene } from "foldkit/test";
import { describe, test } from "vitest";

import * as BaseUiCheckboxLabelingExample from "./main";

describe("base-ui-checkbox-labeling example", () => {
  test("renders a wrapping label for the checkbox", () => {
    Scene.scene(
      {
        update: BaseUiCheckboxLabelingExample.update,
        view: BaseUiCheckboxLabelingExample.view,
      },
      Scene.with(BaseUiCheckboxLabelingExample.init()[0]),
      Scene.expect(
        Scene.role("checkbox", { name: "Accept terms and conditions" })
      ).toExist(),
      Scene.click(
        Scene.role("checkbox", { name: "Accept terms and conditions" })
      ),
      Scene.expect(
        Scene.role("checkbox", { name: "Accept terms and conditions" })
      ).toHaveAttr("aria-checked", "true")
    );
  });
});
