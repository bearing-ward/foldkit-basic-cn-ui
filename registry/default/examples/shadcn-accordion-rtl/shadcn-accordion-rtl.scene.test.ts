import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Accordion RTL example", () => {
  test("opens RTL accordion content", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(
        Scene.text("راجع الفواتير وخطط الدفع وبيانات الضريبة.")
      ).toExist(),
      Scene.click(Scene.role("button", { name: "الفريق" })),
      Scene.expect(Scene.text("ادع اعضاء الفريق وحدث صلاحيات الوصول.")).toExist()
    );
  });
});
