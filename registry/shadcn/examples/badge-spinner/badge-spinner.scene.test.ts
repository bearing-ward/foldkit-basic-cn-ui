import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as BadgeSpinnerExample from "./main";

describe("Badge Spinner example", () => {
  test("matches the upstream badge spinner example content", () => {
    Scene.scene(
      { update: BadgeSpinnerExample.update, view: BadgeSpinnerExample.view },
      Scene.with(BadgeSpinnerExample.init()[0]),
      Scene.expect(Scene.text("Deleting")).toExist(),
      Scene.expect(Scene.text("Generating")).toExist(),
      Scene.expect(Scene.role("status", { name: "Loading" })).toExist(),
      Scene.expect(Scene.role("status", { name: "Loading" })).not.toHaveHandler(
        "click"
      )
    );
  });
});
