import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as NativeSelectBasicExample from "./main";

describe("Native Select Basic example", () => {
  test("changes the selected option", () => {
    Scene.scene(
      {
        update: NativeSelectBasicExample.update,
        view: NativeSelectBasicExample.view,
      },
      Scene.with(NativeSelectBasicExample.init()[0]),
      Scene.expect(Scene.role("combobox", { name: "Fruit" })).toHaveValue(
        "apple"
      ),
      Scene.change(Scene.role("combobox", { name: "Fruit" }), "banana"),
      Scene.expect(Scene.text("Selected: banana")).toExist()
    );
  });
});
