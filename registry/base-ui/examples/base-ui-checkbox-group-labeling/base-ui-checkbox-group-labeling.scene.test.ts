import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as BaseUiCheckboxGroupLabelingExample from "./main";

describe("Base UI Checkbox Group Labeling example", () => {
  test("matches the Base UI labeling example content", () => {
    Scene.scene(
      {
        update: BaseUiCheckboxGroupLabelingExample.update,
        view: BaseUiCheckboxGroupLabelingExample.view,
      },
      Scene.with(BaseUiCheckboxGroupLabelingExample.init()[0]),
      Scene.expect(
        Scene.role("group", { name: "Allowed network protocols" })
      ).toExist(),
      Scene.expect(Scene.role("checkbox", { name: "HTTP" })).toHaveAttr(
        "aria-checked",
        "true"
      ),
      Scene.click(Scene.text("HTTPS")),
      Scene.expect(Scene.role("checkbox", { name: "HTTPS" })).toHaveAttr(
        "aria-checked",
        "true"
      )
    );
  });
});
