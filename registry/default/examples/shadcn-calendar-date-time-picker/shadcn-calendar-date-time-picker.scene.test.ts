import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Calendar Date and Time Picker example", () => {
  test("renders the origin date and time picker labels as an inert preview", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("June 2026")).toExist(),
      Scene.expect(Scene.text("Start Time")).toExist(),
      Scene.expect(Scene.text("End Time")).toExist(),
      Scene.expect(Scene.label("Start Time")).toBeDisabled(),
      Scene.expect(Scene.label("End Time")).toBeDisabled()
    );
  });
});
