import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Command RTL example", () => {
  test("renders Arabic RTL command content", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("combobox", { name: "بحث الأوامر" })).toHaveAttr(
        "placeholder",
        "اكتب أمرا أو ابحث..."
      ),
      Scene.expect(Scene.text("اقتراحات")).toExist(),
      Scene.expect(Scene.text("الإعدادات")).toExist(),
      Scene.expect(Scene.role("option", { name: "التقويم" })).toExist(),
      Scene.expect(Scene.text("الفوترة")).toExist(),
      Scene.expect(Scene.text("⌘B")).toExist(),
      Scene.expect(Scene.role("option", { name: "التقويم" })).not.toHaveHandler(
        "click"
      )
    );
  });

  test("filters Arabic command items", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.type(Scene.role("combobox", { name: "بحث الأوامر" }), "الفوترة"),
      Scene.expect(Scene.text("الفوترة")).toExist(),
      Scene.expect(Scene.role("option", { name: "التقويم" })).not.toExist()
    );
  });

  test("renders empty state when no Arabic commands match", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.type(Scene.role("combobox", { name: "بحث الأوامر" }), "zzz"),
      Scene.expect(Scene.text("لا توجد نتائج.")).toExist()
    );
  });
});
