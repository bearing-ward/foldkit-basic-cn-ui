import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as BaseUiSelectBasicExample from "./main";

describe("Base UI select Basic example", () => {
  test("updates the selected apple", () => {
    Scene.scene(
      {
        update: BaseUiSelectBasicExample.update,
        view: BaseUiSelectBasicExample.view,
      },
      Scene.with(BaseUiSelectBasicExample.init()[0]),
      Scene.expect(Scene.role("combobox", { name: "Apple" })).toExist(),
      Scene.expect(Scene.text("Select apple")).toExist(),
      Scene.change(Scene.role("combobox", { name: "Apple" }), "fuji"),
      Scene.expect(Scene.role("combobox", { name: "Apple" })).toHaveValue(
        "fuji"
      )
    );
  });
});
