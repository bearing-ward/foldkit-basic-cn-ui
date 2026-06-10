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
      Scene.expect(Scene.role("textbox", { name: "Email" })).toExist(),
      Scene.type(Scene.role("textbox", { name: "Email" }), "ada@example.com"),
      Scene.expect(Scene.role("textbox", { name: "Email" })).toHaveValue(
        "ada@example.com"
      )
    );
  });
});
