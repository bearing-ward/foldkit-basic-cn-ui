import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn button default example", () => {
  test("renders the origin visual button as inert", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("button", { name: "Button" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Button" })).not.toHaveHandler(
        "click"
      )
    );
  });
});
