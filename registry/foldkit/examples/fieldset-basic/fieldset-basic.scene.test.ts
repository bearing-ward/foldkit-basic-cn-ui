import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as FieldsetBasicExample from "./main";

describe("Fieldset Basic example", () => {
  test("updates grouped field feedback", () => {
    Scene.scene(
      {
        update: FieldsetBasicExample.update,
        view: FieldsetBasicExample.view,
      },
      Scene.with(FieldsetBasicExample.init()[0]),
      Scene.expect(Scene.role("group", { name: "Profile" })).toExist(),
      Scene.type(Scene.role("textbox", { name: "Name" }), "Ada"),
      Scene.type(Scene.role("textbox", { name: "Bio" }), "Engineer"),
      Scene.expect(Scene.text("Profile: Ada / Engineer")).toExist()
    );
  });
});
