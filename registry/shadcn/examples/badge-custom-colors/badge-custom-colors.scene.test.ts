import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Badge Custom Colors example", () => {
  test("matches the upstream badge custom colors example content", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("Blue")).toExist(),
      Scene.expect(Scene.text("Green")).toExist(),
      Scene.expect(Scene.text("Sky")).toExist(),
      Scene.expect(Scene.text("Purple")).toExist(),
      Scene.expect(Scene.text("Red")).toExist(),
      Scene.expect(Scene.text("Blue")).not.toHaveHandler("click")
    );
  });
});
