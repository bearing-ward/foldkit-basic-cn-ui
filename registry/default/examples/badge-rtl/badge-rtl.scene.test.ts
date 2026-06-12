import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Badge RTL example", () => {
  test("matches the upstream badge RTL example content", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("شارة")).toExist(),
      Scene.expect(Scene.text("ثانوي")).toExist(),
      Scene.expect(Scene.text("مدمر")).toExist(),
      Scene.expect(Scene.text("مخطط")).toExist(),
      Scene.expect(Scene.text("متحقق")).toExist(),
      Scene.expect(Scene.text("إشارة مرجعية")).toExist(),
      Scene.expect(Scene.text("شارة")).not.toHaveHandler("click")
    );
  });
});
