import { Scene } from "foldkit";
import { describe, test } from "vitest";

import { init, update, view } from "./main";

describe("preview-card-basic example", () => {
  test("opens and closes the preview card", () => {
    const [model] = init();

    Scene.scene(
      { update, view },
      Scene.with(model),
      Scene.expect(
        Scene.text(
          "The principles of good typography remain in the digital age."
        )
      ).toExist(),
      Scene.click(Scene.role("button", { name: "typography" })),
      Scene.expect(Scene.role("dialog")).toExist(),
      Scene.expect(Scene.text("Typography")).toExist(),
      Scene.expect(
        Scene.text(
          "The art and science of arranging type to make written language clear, visually appealing, and effective in communication."
        )
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Close preview card" })),
      Scene.expect(Scene.role("dialog")).not.toExist()
    );
  });
});
