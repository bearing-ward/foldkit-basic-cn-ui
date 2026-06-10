import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as BaseUiCheckboxGroupNestedParentExample from "./main";

describe("Base UI Checkbox Group Nested Parent example", () => {
  test("matches the Base UI nested parent checkbox content", () => {
    Scene.scene(
      {
        update: BaseUiCheckboxGroupNestedParentExample.update,
        view: BaseUiCheckboxGroupNestedParentExample.view,
      },
      Scene.with(BaseUiCheckboxGroupNestedParentExample.init()[0]),
      Scene.expect(Scene.role("group", { name: "User Permissions" })).toExist(),
      Scene.expect(
        Scene.role("checkbox", { name: "View Dashboard" })
      ).toHaveAttr("aria-checked", "true"),
      Scene.expect(
        Scene.role("checkbox", { name: "Access Reports" })
      ).toHaveAttr("aria-checked", "false"),
      Scene.expect(Scene.role("checkbox", { name: "Manage Users" })).toHaveAttr(
        "aria-checked",
        "false"
      ),
      Scene.click(Scene.role("checkbox", { name: "Manage Users" })),
      Scene.expect(Scene.role("checkbox", { name: "Create User" })).toHaveAttr(
        "aria-checked",
        "true"
      ),
      Scene.expect(
        Scene.role("checkbox", { name: "User Permissions" })
      ).toHaveAttr("aria-checked", "mixed")
    );
  });
});
