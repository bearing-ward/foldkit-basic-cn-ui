import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as CardBasicExample from "./main";

describe("Card Basic example", () => {
  test("renders and updates the parent-owned example state", () => {
    Scene.scene(
      { update: CardBasicExample.update, view: CardBasicExample.view },
      Scene.with(CardBasicExample.init()[0]),
      Scene.expect(Scene.text("Project health")).toExist(),
      Scene.click(Scene.role("button", { name: "Switch card" })),
      Scene.expect(Scene.text("Release notes")).toExist()
    );
  });
});
