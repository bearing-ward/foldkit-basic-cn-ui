import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Button Size example", () => {
  test("renders the origin size buttons as inert", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("button", { name: "Extra Small" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Small" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Default" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Large" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Default" })).not.toHaveHandler(
        "click"
      )
    );
  });
});
