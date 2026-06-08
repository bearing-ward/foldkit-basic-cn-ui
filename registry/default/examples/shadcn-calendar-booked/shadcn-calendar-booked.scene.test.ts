import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Calendar Booked Dates example", () => {
  test("marks booked dates disabled", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(
        Scene.role("button", { name: "Saturday, April 18, 2026" })
      ).toBeDisabled(),
      Scene.click(Scene.role("button", { name: "Monday, April 20, 2026" })),
      Scene.expect(Scene.text("Selected stay: 2026-04-20")).toExist()
    );
  });
});
