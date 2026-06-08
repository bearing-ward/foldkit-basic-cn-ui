import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnCalendarBasicExample from "./main";

describe("shadcn Calendar Basic example", () => {
  test("selects a date and reports the viewed month", () => {
    Scene.scene(
      {
        update: ShadcnCalendarBasicExample.update,
        view: ShadcnCalendarBasicExample.view,
      },
      Scene.with(ShadcnCalendarBasicExample.init()[0]),
      Scene.expect(Scene.text("Selected date: 2026-04-16")).toExist(),
      Scene.expect(Scene.text("Viewed month: 2026-04")).toExist(),
      Scene.click(Scene.role("button", { name: "Monday, April 20, 2026" })),
      Scene.expect(Scene.text("Selected date: 2026-04-20")).toExist(),
      Scene.click(Scene.role("button", { name: "Next month" })),
      Scene.expect(Scene.text("Viewed month: 2026-05")).toExist()
    );
  });
});
