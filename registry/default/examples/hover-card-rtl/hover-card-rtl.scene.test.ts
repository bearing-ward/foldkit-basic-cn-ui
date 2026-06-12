import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Hover Card RTL example", () => {
  test("opens the right-to-left preview", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.click(Scene.role("button", { name: "مرر هنا" })),
      Scene.expect(Scene.role("dialog")).toExist(),
      Scene.expect(Scene.text("@vercel")).toExist(),
      Scene.expect(Scene.text("انضم في ديسمبر 2021")).toExist()
    );
  });
});
