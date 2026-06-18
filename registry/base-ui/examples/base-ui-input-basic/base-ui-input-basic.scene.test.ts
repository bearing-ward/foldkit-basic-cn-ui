import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as BaseUiInputBasicExample from "./main";

describe("Base UI input Basic example", () => {
  test("updates typed input value", () => {
    Scene.scene(
      {
        update: BaseUiInputBasicExample.update,
        view: BaseUiInputBasicExample.view,
      },
      Scene.with(BaseUiInputBasicExample.init()[0]),
      Scene.expect(Scene.role("textbox", { name: "Name" })).toHaveAttr(
        "placeholder",
        "e.g. Colm Tuite"
      ),
      Scene.expect(Scene.text("Enter your email address.")).not.toExist(),
      Scene.type(Scene.role("textbox", { name: "Name" }), "Ada Lovelace"),
      Scene.expect(Scene.role("textbox", { name: "Name" })).toHaveValue(
        "Ada Lovelace"
      )
    );
  });
});
