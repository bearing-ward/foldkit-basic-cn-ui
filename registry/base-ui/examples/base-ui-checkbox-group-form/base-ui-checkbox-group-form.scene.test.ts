import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as BaseUiCheckboxGroupFormExample from "./main";

describe("Base UI Checkbox Group Form example", () => {
  test("matches the Base UI form integration content", () => {
    Scene.scene(
      {
        update: BaseUiCheckboxGroupFormExample.update,
        view: BaseUiCheckboxGroupFormExample.view,
      },
      Scene.with(BaseUiCheckboxGroupFormExample.init()[0]),
      Scene.expect(
        Scene.role("group", { name: "Allowed network protocols" })
      ).toExist(),
      Scene.expect(Scene.role("checkbox", { name: "HTTP" })).toHaveAttr(
        "aria-checked",
        "true"
      ),
      Scene.expect(Scene.role("checkbox", { name: "SSH" })).toHaveAttr(
        "aria-checked",
        "false"
      ),
      Scene.click(Scene.text("SSH")),
      Scene.expect(Scene.role("checkbox", { name: "SSH" })).toHaveAttr(
        "aria-checked",
        "true"
      )
    );
  });
});
