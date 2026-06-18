import { Scene } from "foldkit";
import { describe, test } from "vitest";

import { init, update, view } from "./main";

describe("foldkit livetrace execution panel example", () => {
  test("switches between completed and quickstart execution modes", () => {
    const [model] = init();

    Scene.scene(
      { update, view },
      Scene.with(model),
      Scene.expect(Scene.text("complete")).toExist(),
      Scene.click(Scene.role("button", { name: "Quickstart" })),
      Scene.expect(Scene.text("parse...")).toExist(),
      Scene.expect(Scene.text("awaiting embed step...")).toExist()
    );
  });
});
