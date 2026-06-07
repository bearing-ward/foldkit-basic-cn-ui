import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("button-group-rtl example", () => {
  test("renders the shadcn Button Group RTL example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("group", { name: "إجراءات التقرير" })).toExist(),
      Scene.expect(Scene.role("button", { name: "أرشفة تقرير" })).toExist(),
      Scene.expect(Scene.role("button", { name: "تأجيل" })).toExist(),
      Scene.expect(
        Scene.role("group", { name: "إجراءات التقرير" })
      ).not.toHaveHandler("click")
    );
  });
});
