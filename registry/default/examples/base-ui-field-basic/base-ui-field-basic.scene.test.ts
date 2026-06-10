import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as FieldBasicExample from "./main";

describe("Base UI Field Basic example", () => {
  test("matches the Base UI default Name field example", () => {
    Scene.scene(
      {
        update: FieldBasicExample.update,
        view: FieldBasicExample.view,
      },
      Scene.with(FieldBasicExample.init()[0]),
      Scene.expect(Scene.role("textbox", { name: "Name" })).toHaveAttr(
        "placeholder",
        "Required"
      ),
      Scene.expect(Scene.text("Visible on your profile")).toExist(),
      Scene.expect(Scene.text("Please enter your name")).not.toExist(),
      Scene.click(Scene.role("button", { name: "Validate" })),
      Scene.expect(Scene.text("Please enter your name")).toExist(),
      Scene.type(Scene.role("textbox", { name: "Name" }), "Ada Lovelace"),
      Scene.expect(Scene.text("Please enter your name")).not.toExist()
    );
  });
});
