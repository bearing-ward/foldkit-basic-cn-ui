import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("chart-legend example", () => {
  test("renders the shadcn Chart Legend example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("img", { name: "Bar chart" })).not.toHaveHandler(
        "click"
      ),
      Scene.expect(Scene.text("Desktop")).toExist()
    );
  });
});
