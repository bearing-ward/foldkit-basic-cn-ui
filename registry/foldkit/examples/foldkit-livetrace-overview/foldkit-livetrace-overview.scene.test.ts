import { Scene } from "foldkit";
import { describe, test } from "vitest";

import { init, update, view } from "./main";

describe("foldkit livetrace overview example", () => {
  test("renders the overview layout and an inert inspect control", () => {
    const [model] = init();

    Scene.scene(
      { update, view },
      Scene.with(model),
      Scene.expect(Scene.text("traces/user/demo")).toExist(),
      Scene.expect(Scene.text("Processing research-notes.md")).toExist(),
      Scene.expect(Scene.text("active · traces")).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Inspect overview" })
      ).not.toHaveHandler("click")
    );
  });
});
