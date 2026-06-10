import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as BaseUiFieldsetBasicExample from "./main";

describe("Base UI fieldset Basic example", () => {
  test("updates grouped billing fields", () => {
    Scene.scene(
      {
        update: BaseUiFieldsetBasicExample.update,
        view: BaseUiFieldsetBasicExample.view,
      },
      Scene.with(BaseUiFieldsetBasicExample.init()[0]),
      Scene.expect(Scene.role("group", { name: "Billing details" })).toExist(),
      Scene.type(Scene.role("textbox", { name: "Company" }), "Acme Inc."),
      Scene.type(Scene.role("textbox", { name: "Tax ID" }), "US123456789"),
      Scene.expect(Scene.role("textbox", { name: "Company" })).toHaveValue(
        "Acme Inc."
      ),
      Scene.expect(Scene.role("textbox", { name: "Tax ID" })).toHaveValue(
        "US123456789"
      )
    );
  });
});
