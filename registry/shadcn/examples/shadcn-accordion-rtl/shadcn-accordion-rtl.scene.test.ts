import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Accordion RTL example", () => {
  test("opens RTL accordion content", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("نعم. يلتزم بنمط تصميم WAI-ARIA.")).toExist(),
      Scene.click(Scene.role("button", { name: "هل يأتي بتنسيق جاهز؟" })),
      Scene.expect(
        Scene.text("نعم. يأتي بأنماط افتراضية تتوافق مع جمالية المكونات الأخرى.")
      ).toExist()
    );
  });
});
