import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("direction-basic example", () => {
  test("switches between RTL and LTR direction", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("combobox", { name: "Language" })).toExist(),
      Scene.expect(Scene.text("تسجيل الدخول إلى حسابك")).toExist(),
      Scene.expect(Scene.text("إنشاء حساب")).toExist(),
      Scene.expect(Scene.text("كلمة المرور")).toExist(),
      Scene.expect(Scene.text("نسيت كلمة المرور؟")).toExist(),
      Scene.expect(Scene.text("تسجيل الدخول باستخدام Google")).toExist(),
      Scene.click(Scene.role("button", { name: "Toggle" })),
      Scene.expect(Scene.text("Sign in to your account")).toExist(),
      Scene.expect(Scene.text("Create account")).toExist(),
      Scene.expect(Scene.text("Password")).toExist(),
      Scene.expect(Scene.text("Forgot your password?")).toExist(),
      Scene.expect(Scene.text("Sign in with Google")).toExist(),
      Scene.click(Scene.role("button", { name: "Toggle" })),
      Scene.expect(Scene.text("تسجيل الدخول إلى حسابك")).toExist()
    );
  });
});
