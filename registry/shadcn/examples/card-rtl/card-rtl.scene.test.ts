import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Card RTL example", () => {
  test("renders the origin Arabic login card content", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("تسجيل الدخول إلى حسابك")).toExist(),
      Scene.expect(Scene.label("البريد الإلكتروني")).toExist(),
      Scene.expect(Scene.label("كلمة المرور")).toExist(),
      Scene.expect(Scene.role("link", { name: "إنشاء حساب" })).toExist(),
      Scene.expect(
        Scene.role("button", { name: "تسجيل الدخول" })
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "تسجيل الدخول" })
      ).not.toHaveHandler("click")
    );
  });
});
