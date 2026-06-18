import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Shadcn Textarea RTL example", () => {
  test("renders the origin Arabic RTL textarea demo", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("التعليقات")).toExist(),
      Scene.expect(Scene.placeholder("تعليقاتك تساعدنا على التحسين...")).toHaveAttr(
        "dir",
        "rtl"
      ),
      Scene.expect(Scene.text("شاركنا أفكارك حول خدمتنا.")).toExist(),
      Scene.expect(Scene.placeholder("تعليقاتك تساعدنا على التحسين...")).not.toHaveHandler(
        "input"
      )
    );
  });
});
