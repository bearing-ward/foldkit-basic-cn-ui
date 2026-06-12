import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Card Size example", () => {
  test("renders the origin small card content", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("Small Card")).toExist(),
      Scene.expect(
        Scene.text("This card uses the small size variant.")
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "Action" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Action" })).not.toHaveHandler(
        "click"
      )
    );
  });
});
