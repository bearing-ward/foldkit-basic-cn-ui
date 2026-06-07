import { Scene } from "foldkit";
import { describe, test } from "vitest";

import { init, update, view } from "./main";

describe("breadcrumb-dropdown example", () => {
  test("toggles the shadcn dropdown breadcrumb menu", () => {
    const [model] = init();

    Scene.scene(
      { update, view },
      Scene.with(model),
      Scene.expect(Scene.role("button", { name: "Toggle menu" })).toExist(),
      Scene.click(Scene.role("button", { name: "Toggle menu" })),
      Scene.expect(Scene.role("menuitem", { name: "Alert" })).toExist()
    );
  });
});
