import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Calendar Date of Birth example", () => {
  test("selects a bounded birth date", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("Date of birth: 1990-07-15")).toExist(),
      Scene.click(Scene.role("button", { name: "Monday, July 16, 1990" })),
      Scene.expect(Scene.text("Date of birth: 1990-07-16")).toExist()
    );
  });
});
