import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Calendar Date and Time Picker example", () => {
  test("updates selected date and time fields", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("June 2026")).toExist(),
      Scene.expect(Scene.text("Start Time")).toExist(),
      Scene.expect(Scene.text("End Time")).toExist(),
      Scene.expect(
        Scene.text("Selected appointment: 2026-06-12 09:00-17:00")
      ).toExist(),
      Scene.click(Scene.role("button", { name: "18" })),
      Scene.change(Scene.label("Start Time"), "10:30"),
      Scene.change(Scene.label("End Time"), "18:15"),
      Scene.expect(
        Scene.text("Selected appointment: 2026-06-18 10:30-18:15")
      ).toExist()
    );
  });
});
