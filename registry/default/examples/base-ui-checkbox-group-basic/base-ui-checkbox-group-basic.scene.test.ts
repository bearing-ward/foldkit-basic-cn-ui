import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as BaseUiCheckboxGroupBasicExample from "./main";

describe("Base UI Checkbox Group Basic example", () => {
  test("matches the Base UI checkbox group hero behavior", () => {
    Scene.scene(
      {
        update: BaseUiCheckboxGroupBasicExample.update,
        view: BaseUiCheckboxGroupBasicExample.view,
      },
      Scene.with(BaseUiCheckboxGroupBasicExample.init()[0]),
      Scene.expect(Scene.role("group", { name: "Apples" })).toExist(),
      Scene.expect(Scene.role("checkbox", { name: "Fuji" })).toHaveAttr(
        "aria-checked",
        "true"
      ),
      Scene.click(Scene.text("Gala")),
      Scene.expect(Scene.role("checkbox", { name: "Gala" })).toHaveAttr(
        "aria-checked",
        "true"
      ),
      Scene.expect(
        Scene.role("checkbox", { name: "All apples" })
      ).not.toExist(),
      Scene.expect(Scene.role("checkbox", { name: "Granny Smith" })).toHaveAttr(
        "aria-checked",
        "false"
      )
    );
  });
});
