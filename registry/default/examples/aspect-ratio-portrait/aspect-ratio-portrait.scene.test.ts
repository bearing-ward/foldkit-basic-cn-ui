import { Scene } from "foldkit";
import { describe, test } from "vitest";

import { init, update, view } from "./main";

describe("aspect-ratio-portrait example", () => {
  test("renders the shadcn portrait image example", () => {
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
