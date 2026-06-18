import { Scene } from "foldkit";
import { describe, test } from "vitest";

import { init, update, view } from "./main";

describe("foldkit livetrace log line example", () => {
  test("renders each log level and keeps the control inert", () => {
    const [model] = init();

    Scene.scene(
      { update, view },
      Scene.with(model),
      Scene.expect(Scene.text("INFO")).toExist(),
      Scene.expect(Scene.text("WARNING")).toExist(),
      Scene.expect(Scene.text("ERROR")).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Inspect logs" })
      ).not.toHaveHandler("click")
    );
  });
});
