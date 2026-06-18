import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as BaseUiCheckboxGroupParentExample from "./main";

describe("Base UI Checkbox Group Parent example", () => {
  test("sets the parent checkbox indeterminate state from children", () => {
    Scene.scene(
      {
        update: BaseUiCheckboxGroupParentExample.update,
        view: BaseUiCheckboxGroupParentExample.view,
      },
      Scene.with(BaseUiCheckboxGroupParentExample.init()[0]),
      Scene.expect(Scene.role("checkbox", { name: "Apples" })).toHaveAttr(
        "aria-checked",
        "false"
      ),
      Scene.click(Scene.text("Fuji")),
      Scene.expect(Scene.role("checkbox", { name: "Apples" })).toHaveAttr(
        "aria-checked",
        "mixed"
      ),
      Scene.click(Scene.role("checkbox", { name: "Apples" })),
      Scene.expect(Scene.role("checkbox", { name: "Gala" })).toHaveAttr(
        "aria-checked",
        "true"
      )
    );
  });
});
