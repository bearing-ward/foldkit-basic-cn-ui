import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as BaseUiCheckboxGroupNativeButtonExample from "./main";

describe("Base UI Checkbox Group Native Button example", () => {
  test("uses sibling labels with native checkbox buttons", () => {
    Scene.scene(
      {
        update: BaseUiCheckboxGroupNativeButtonExample.update,
        view: BaseUiCheckboxGroupNativeButtonExample.view,
      },
      Scene.with(BaseUiCheckboxGroupNativeButtonExample.init()[0]),
      Scene.expect(
        Scene.role("group", { name: "Allowed network protocols" })
      ).toExist(),
      Scene.expect(Scene.role("checkbox", { name: "HTTP" })).toHaveAttr(
        "aria-checked",
        "true"
      ),
      Scene.click(Scene.role("checkbox", { name: "HTTPS" })),
      Scene.expect(Scene.role("checkbox", { name: "HTTPS" })).toHaveAttr(
        "aria-checked",
        "true"
      )
    );
  });
});
