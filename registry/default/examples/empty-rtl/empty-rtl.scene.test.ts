import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as EmptyRtlExample from "./main";

describe("Empty RTL example", () => {
  test("matches the upstream empty rtl example content", () => {
    Scene.scene(
      { update: EmptyRtlExample.update, view: EmptyRtlExample.view },
      Scene.with(EmptyRtlExample.init()[0]),
      Scene.expect(
        Scene.role("heading", { name: "لا توجد مشاريع بعد" })
      ).toExist(),
      Scene.expect(
        Scene.text("لم تقم بإنشاء أي مشاريع بعد. ابدأ بإنشاء مشروعك الأول.")
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "إنشاء مشروع" })).toExist(),
      Scene.expect(Scene.role("button", { name: "استيراد مشروع" })).toExist(),
      Scene.expect(
        Scene.role("button", { name: "تعرف على المزيد" })
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "إنشاء مشروع" })
      ).not.toHaveHandler("click"),
      Scene.expect(
        Scene.role("button", { name: "استيراد مشروع" })
      ).not.toHaveHandler("click"),
      Scene.expect(
        Scene.role("button", { name: "تعرف على المزيد" })
      ).not.toHaveHandler("click")
    );
  });
});
