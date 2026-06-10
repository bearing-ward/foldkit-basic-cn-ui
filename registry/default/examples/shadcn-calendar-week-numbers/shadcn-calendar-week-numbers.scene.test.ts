import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Calendar Week Numbers example", () => {
  test("renders week numbers around a real calendar grid", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("February 2026")).toExist(),
      Scene.expect(Scene.text("06")).toExist(),
      Scene.expect(Scene.text("09")).toExist(),
      Scene.click(Scene.role("button", { name: "Friday, February 20, 2026" }))
    );
  });
});
