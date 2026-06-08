import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Calendar RTL example", () => {
  test("renders Arabic locale calendar labels", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("أبريل 2026")).toExist(),
      Scene.click(Scene.text("20")),
      Scene.expect(Scene.text("التاريخ المحدد: 2026-04-20")).toExist()
    );
  });
});
