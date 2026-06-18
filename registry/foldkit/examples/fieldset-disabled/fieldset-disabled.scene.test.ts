import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as FieldsetDisabledExample from "./main";

describe("Fieldset Disabled example", () => {
  test("renders disabled grouped fields", () => {
    Scene.scene(
      {
        update: FieldsetDisabledExample.update,
        view: FieldsetDisabledExample.view,
      },
      Scene.with(FieldsetDisabledExample.init()[0]),
      Scene.expect(Scene.role("group", { name: "Locked profile" })).toExist(),
      Scene.expect(
        Scene.role("textbox", { name: "Locked name" })
      ).toBeDisabled(),
      Scene.expect(Scene.role("textbox", { name: "Locked bio" })).toBeDisabled()
    );
  });
});
