import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as SkeletonBasicExample from "./main";

describe("Skeleton Basic example", () => {
  test("renders and updates the parent-owned example state", () => {
    Scene.scene(
      { update: SkeletonBasicExample.update, view: SkeletonBasicExample.view },
      Scene.with(SkeletonBasicExample.init()[0]),
      Scene.expect(Scene.label("Avatar skeleton")).toExist(),
      Scene.expect(Scene.label("Card skeleton")).toExist(),
      Scene.expect(Scene.label("Text skeleton")).toExist(),
      Scene.expect(Scene.label("Form skeleton")).toExist(),
      Scene.expect(Scene.label("Table skeleton")).toExist(),
      Scene.expect(Scene.text("Show content")).toExist(),
      Scene.click(Scene.role("button", { name: "Show content" })),
      Scene.expect(Scene.text("Content loaded")).toExist()
    );
  });
});
