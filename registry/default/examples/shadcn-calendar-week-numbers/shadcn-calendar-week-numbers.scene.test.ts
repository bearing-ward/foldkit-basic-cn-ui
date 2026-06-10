import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Calendar Week Numbers example", () => {
  test("renders the origin week number layout as inert cells", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("February 2026")).toExist(),
      Scene.expect(Scene.role("button", { name: "06" })).toBeDisabled(),
      Scene.expect(Scene.role("button", { name: "09" })).toBeDisabled()
    );
  });
});
