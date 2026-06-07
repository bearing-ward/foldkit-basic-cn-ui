import { Scene } from "foldkit";
import { describe, test } from "vitest";

import { init, update, view } from "./main";

describe("aspect-ratio-square example", () => {
  test("renders the shadcn square image example", () => {
    const [model] = init();

    Scene.scene(
      { update, view },
      Scene.with(model),
      Scene.expect(Scene.role("img", { name: "Photo" })).toExist(),
      Scene.expect(Scene.role("img", { name: "Photo" })).not.toHaveHandler(
        "click"
      )
    );
  });
});
