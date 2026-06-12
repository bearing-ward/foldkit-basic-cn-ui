import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Card Spacing example", () => {
  test("renders spacing and edge-to-edge origin content", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("16px")).toExist(),
      Scene.expect(Scene.text("Terms of Service")).toExist(),
      Scene.expect(Scene.role("button", { name: "Decline" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Accept" })).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Decline" })
      ).not.toHaveHandler("click"),
      Scene.expect(Scene.role("button", { name: "Accept" })).not.toHaveHandler(
        "click"
      )
    );
  });
});
