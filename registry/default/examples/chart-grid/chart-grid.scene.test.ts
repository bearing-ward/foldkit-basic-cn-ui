import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("chart-grid example", () => {
  test("renders the shadcn Chart Grid example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("img", { name: "Bar chart" })).not.toHaveHandler(
        "click"
      )
    );
  });
});
