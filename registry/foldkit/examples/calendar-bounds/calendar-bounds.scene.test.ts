import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as CalendarBoundsExample from "./main";

describe("Calendar Bounds example", () => {
  test("keeps disabled dates inactive and selects an allowed bounded date", () => {
    Scene.scene(
      {
        update: CalendarBoundsExample.update,
        view: CalendarBoundsExample.view,
      },
      Scene.with(CalendarBoundsExample.init()[0]),
      Scene.expect(Scene.text("Selected bounded date: None")).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Thursday, April 16, 2026" })
      ).toHaveAttr("aria-disabled", "true"),
      Scene.click(Scene.role("button", { name: "Friday, April 17, 2026" })),
      Scene.expect(Scene.text("Selected bounded date: 2026-04-17")).toExist()
    );
  });
});
