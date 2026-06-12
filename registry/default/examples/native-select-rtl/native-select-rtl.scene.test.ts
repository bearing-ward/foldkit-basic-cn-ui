import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Native Select RTL example", () => {
  test("renders right-to-left status options and updates value", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("combobox", { name: "اختر الحالة" })).toExist(),
      Scene.expect(Scene.text("مهام")).toExist(),
      Scene.expect(Scene.text("قيد التنفيذ")).toExist(),
      Scene.expect(Scene.text("منجز")).toExist(),
      Scene.change(Scene.role("combobox", { name: "اختر الحالة" }), "done"),
      Scene.expect(Scene.role("combobox", { name: "اختر الحالة" })).toHaveValue(
        "done"
      )
    );
  });
});
