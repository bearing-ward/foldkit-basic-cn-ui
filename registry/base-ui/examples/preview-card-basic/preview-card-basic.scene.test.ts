import { Scene } from "foldkit";
import { describe, test } from "vitest";

import { init, update, view } from "./main";

describe("preview-card-basic example", () => {
  test("opens and closes the preview card", () => {
    const [model] = init();

    Scene.scene(
      { update, view },
      Scene.with(model),
      Scene.click(Scene.role("button", { name: "Base UI" })),
      Scene.expect(Scene.role("dialog")).toExist(),
      Scene.expect(Scene.text("@base-ui")).toExist(),
      Scene.click(Scene.role("button", { name: "Close preview card" })),
      Scene.expect(Scene.role("dialog")).not.toExist()
    );
  });
});
