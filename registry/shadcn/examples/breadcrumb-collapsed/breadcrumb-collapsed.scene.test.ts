import { Scene } from "foldkit";
import { describe, test } from "vitest";

import { init, update, view } from "./main";

describe("breadcrumb-collapsed example", () => {
  test("renders the shadcn Breadcrumb Collapsed example", () => {
    const [model] = init();

    Scene.scene(
      { update, view },
      Scene.with(model),
      Scene.expect(Scene.role("navigation", { name: "breadcrumb" })).toExist(),
      Scene.expect(Scene.role("img", { name: "More" })).toExist(),
      Scene.expect(Scene.role("img", { name: "More" })).not.toHaveHandler(
        "click"
      )
    );
  });
});
