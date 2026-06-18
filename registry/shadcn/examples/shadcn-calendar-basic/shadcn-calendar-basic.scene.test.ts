import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnCalendarBasicExample from "./main";

describe("shadcn Calendar Basic example", () => {
  test("renders a real single-date calendar without local feedback text", () => {
    Scene.scene(
      {
        update: ShadcnCalendarBasicExample.update,
        view: ShadcnCalendarBasicExample.view,
      },
      Scene.with(ShadcnCalendarBasicExample.init()[0]),
      Scene.expect(
        Scene.role("button", { name: "Thursday, April 16, 2026" })
      ).toExist(),
      Scene.expect(Scene.text("Selected date: 2026-04-16")).not.toExist(),
      Scene.expect(Scene.text("Viewed month: 2026-04")).not.toExist(),
      Scene.click(Scene.role("button", { name: "Monday, April 20, 2026" })),
      Scene.click(Scene.role("button", { name: "Next month" })),
      Scene.expect(
        Scene.role("button", { name: "Friday, May 1, 2026" })
      ).toExist()
    );
  });
});
