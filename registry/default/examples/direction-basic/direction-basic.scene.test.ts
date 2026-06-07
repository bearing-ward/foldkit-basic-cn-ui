import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("direction-basic example", () => {
  test("switches between RTL and LTR direction", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("تسجيل الدخول إلى حسابك")).toExist(),
      Scene.click(
        Scene.role("button", { name: "Use left to right direction" })
      ),
      Scene.expect(Scene.text("Sign in to your account")).toExist(),
      Scene.click(
        Scene.role("button", { name: "Use right to left direction" })
      ),
      Scene.expect(Scene.text("تسجيل الدخول إلى حسابك")).toExist()
    );
  });
});
