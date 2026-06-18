import { Scene } from "foldkit";
import { describe, test } from "vitest";

import { init, update, view } from "./main";

describe("foldkit livetrace trace card example", () => {
  test("switches trace card status modes", () => {
    const [model] = init();

    Scene.scene(
      { update, view },
      Scene.with(model),
      Scene.expect(Scene.text("completed")).toExist(),
      Scene.click(Scene.role("button", { name: "Running" })),
      Scene.expect(Scene.text("running")).toExist(),
      Scene.click(Scene.role("button", { name: "Failed" })),
      Scene.expect(Scene.text("failed")).toExist()
    );
  });
});
