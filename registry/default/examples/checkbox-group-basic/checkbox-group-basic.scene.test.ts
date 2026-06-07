import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as CheckboxGroupBasicExample from "./main";

describe("Checkbox Group Basic example", () => {
  test("matches the Base UI checkbox group hero behavior", () => {
    Scene.scene(
      {
        update: CheckboxGroupBasicExample.update,
        view: CheckboxGroupBasicExample.view,
      },
      Scene.with(CheckboxGroupBasicExample.init()[0]),
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
      Scene.expect(Scene.role("checkbox", { name: "All apples" })).toHaveAttr(
        "aria-checked",
        "mixed"
      ),
      Scene.click(Scene.text("All apples")),
      Scene.expect(Scene.role("checkbox", { name: "Granny Smith" })).toHaveAttr(
        "aria-checked",
        "true"
      )
    );
  });
});
