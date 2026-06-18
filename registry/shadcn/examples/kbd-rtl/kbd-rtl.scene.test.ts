import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Kbd RTL example", () => {
  test("renders right-to-left shortcut content", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("استخدم")).toExist(),
      Scene.expect(Scene.text("Ctrl")).toExist(),
      Scene.expect(Scene.text("K")).toExist(),
      Scene.expect(Scene.text("لفتح لوحة الأوامر")).toExist(),
      Scene.expect(Scene.text("Ctrl")).not.toHaveHandler("click")
    );
  });
});
