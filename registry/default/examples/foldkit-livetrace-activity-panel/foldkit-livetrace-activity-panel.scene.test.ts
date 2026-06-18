import { Scene } from "foldkit";
import { describe, test } from "vitest";

import { init, update, view } from "./main";

describe("foldkit livetrace activity panel example", () => {
  test("renders activity rows and an inert inspect control", () => {
    const [model] = init();

    Scene.scene(
      { update, view },
      Scene.with(model),
      Scene.expect(Scene.text("research-notes.md")).toExist(),
      Scene.expect(Scene.text("contract-v2.pdf")).toExist(),
      Scene.expect(Scene.text("16.8")).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Inspect activity" })
      ).not.toHaveHandler("click")
    );
  });
});
