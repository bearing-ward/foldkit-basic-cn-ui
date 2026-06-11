import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnDrawerRtlExample from "./main";

describe("shadcn Drawer RTL example", () => {
  test("opens and closes localized rtl drawer content", () => {
    Scene.scene(
      {
        update: ShadcnDrawerRtlExample.update,
        view: ShadcnDrawerRtlExample.view,
      },
      Scene.with(ShadcnDrawerRtlExample.init()[0]),
      Scene.click(Scene.role("button", { name: "فتح الدرج" })),
      Scene.expect(Scene.role("dialog", { name: "نقل الهدف" })).toExist(),
      Scene.expect(Scene.text("حدد هدف نشاطك اليومي.")).toExist(),
      Scene.click(Scene.role("button", { name: "إلغاء" })),
      Scene.expect(Scene.role("dialog", { name: "نقل الهدف" })).not.toExist()
    );
  });
});
