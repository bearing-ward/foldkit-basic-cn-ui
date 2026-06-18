import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Calendar Range example", () => {
  test("updates the selected range from day buttons", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("January 2026")).toExist(),
      Scene.expect(Scene.text("February 2026")).toExist(),
      Scene.expect(
        Scene.text("Selected range: 2026-01-15 to 2026-01-20")
      ).toExist(),
      Scene.click(Scene.role("button", { name: "January 10, 2026" })),
      Scene.expect(
        Scene.text("Selected range: 2026-01-10 to 2026-01-20")
      ).toExist(),
      Scene.click(Scene.role("button", { name: "February 24, 2026" })),
      Scene.expect(
        Scene.text("Selected range: 2026-01-10 to 2026-02-24")
      ).toExist()
    );
  });
});
