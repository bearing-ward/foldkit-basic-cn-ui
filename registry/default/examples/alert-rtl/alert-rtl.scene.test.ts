import { Scene } from "foldkit";
import { describe, test } from "vitest";

import { init, update, view } from "./main";

describe("alert-rtl example", () => {
  test("renders the shadcn RTL alert copy", () => {
    const [model] = init();

    Scene.scene(
      { update, view },
      Scene.with(model),
      Scene.expect(Scene.text("تم الدفع بنجاح")).toExist(),
      Scene.expect(
        Scene.text(
          "تمت معالجة دفعتك البالغة 29.99 دولارًا. تم إرسال إيصال إلى عنوان بريدك الإلكتروني."
        )
      ).toExist(),
      Scene.expect(Scene.text("ميزة جديدة متاحة")).toExist(),
      Scene.expect(
        Scene.text("لقد أضفنا دعم الوضع الداكن. يمكنك تفعيله في إعدادات حسابك.")
      ).toExist(),
      Scene.expect(Scene.text("تم الدفع بنجاح")).not.toHaveHandler("click")
    );
  });
});
