import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Radio Group RTL example", () => {
  test("renders the origin Arabic RTL radio group demo", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("button", { name: "Arabic (العربية)" })).toExist(),
      Scene.expect(Scene.role("radiogroup", { name: "كثافة التخطيط" })).toExist(),
      Scene.expect(Scene.role("radio", { name: "افتراضي" })).toBeChecked(),
      Scene.expect(Scene.role("radio", { name: "افتراضي" })).not.toHaveHandler(
        "click"
      ),
      Scene.expect(Scene.text("تباعد أدنى للتخطيطات الكثيفة.")).toExist()
    );
  });
});
