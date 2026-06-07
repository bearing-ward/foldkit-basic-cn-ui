import { Scene } from "foldkit";
import { describe, test } from "vitest";

import { init, update, view } from "./main";

describe("breadcrumb-basic example", () => {
  test("renders the shadcn Breadcrumb Basic example", () => {
    const [model] = init();

    Scene.scene(
      { update, view },
      Scene.with(model),
      Scene.expect(Scene.role("navigation", { name: "breadcrumb" })).toExist(),
      Scene.expect(Scene.text("Breadcrumb")).toExist(),
      Scene.expect(Scene.text("Breadcrumb")).not.toHaveHandler("click")
    );
  });
});
