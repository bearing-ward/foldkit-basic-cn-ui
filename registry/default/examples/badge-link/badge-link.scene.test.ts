import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Badge Link example", () => {
  test("matches the upstream badge link example content", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("Open Link")).toExist(),
      Scene.expect(Scene.text("Open Link")).not.toHaveHandler("click")
    );
  });
});
