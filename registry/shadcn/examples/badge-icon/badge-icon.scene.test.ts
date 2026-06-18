import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Badge Icon example", () => {
  test("matches the upstream badge icon example content", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("Verified")).toExist(),
      Scene.expect(Scene.text("Bookmark")).toExist(),
      Scene.expect(Scene.text("Verified")).not.toHaveHandler("click")
    );
  });
});
