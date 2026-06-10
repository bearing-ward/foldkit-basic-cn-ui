import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Accordion RTL example", () => {
  test("opens RTL accordion content", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(
        Scene.text(
          "انقر على 'نسيت كلمة المرور' في صفحة تسجيل الدخول، أدخل عنوان بريدك الإلكتروني، وسنرسل لك رابطًا لإعادة تعيين كلمة المرور. سينتهي صلاحية الرابط خلال 24 ساعة."
        )
      ).toExist(),
      Scene.click(
        Scene.role("button", { name: "هل يمكنني تغيير خطة الاشتراك الخاصة بي؟" })
      ),
      Scene.expect(
        Scene.text(
          "نعم، يمكنك ترقية خطتك أو تخفيضها في أي وقت من صفحة إعدادات الفوترة."
        )
      ).toExist()
    );
  });
});
