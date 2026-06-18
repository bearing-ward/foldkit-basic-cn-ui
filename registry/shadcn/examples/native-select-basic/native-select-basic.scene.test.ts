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
      Scene.expect(Scene.role("combobox", { name: "Select status" })).toHaveValue(
        "todo"
      ),
      Scene.change(
        Scene.role("combobox", { name: "Select status" }),
        "in-progress"
      ),
      Scene.expect(Scene.role("combobox", { name: "Select status" })).toHaveValue(
        "in-progress"
      ),
      Scene.change(Scene.role("combobox", { name: "Select status" }), "done"),
      Scene.expect(Scene.role("combobox", { name: "Select status" })).toHaveValue(
        "done"
      )
    );
  });
});
