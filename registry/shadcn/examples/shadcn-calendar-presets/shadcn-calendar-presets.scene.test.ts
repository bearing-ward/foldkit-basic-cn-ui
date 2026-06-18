import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Calendar Presets example", () => {
  test("selects preset dates", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.click(Scene.role("button", { name: "Tomorrow" })),
      Scene.expect(Scene.text("Selected preset: 2026-04-17")).toExist(),
      Scene.click(Scene.role("button", { name: "In 3 days" })),
      Scene.expect(Scene.text("Selected preset: 2026-04-19")).toExist(),
      Scene.click(Scene.role("button", { name: "In a week" })),
      Scene.expect(Scene.text("Selected preset: 2026-04-23")).toExist(),
      Scene.click(Scene.role("button", { name: "In 2 weeks" })),
      Scene.expect(Scene.text("Selected preset: 2026-04-30")).toExist()
    );
  });
});
