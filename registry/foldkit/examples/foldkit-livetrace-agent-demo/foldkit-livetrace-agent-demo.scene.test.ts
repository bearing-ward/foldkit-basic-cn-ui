import { Scene } from "foldkit";
import { describe, test } from "vitest";

import { init, update, view } from "./main";

describe("foldkit livetrace agent demo example", () => {
  test("renders the agent workflow and inert inspect control", () => {
    const [model] = init();

    Scene.scene(
      { update, view },
      Scene.with(model),
      Scene.expect(Scene.text("RAG agent")).toExist(),
      Scene.expect(Scene.text("tokens · in")).toExist(),
      Scene.expect(Scene.text("Retrieve")).toExist(),
      Scene.expect(Scene.text("assistant")).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Inspect agent" })
      ).not.toHaveHandler("click")
    );
  });
});
