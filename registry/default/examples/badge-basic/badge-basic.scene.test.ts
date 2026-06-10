import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as BadgeBasicExample from "./main";

describe("Badge Basic example", () => {
  test("renders the shadcn badge variants", () => {
    Scene.scene(
      { update: BadgeBasicExample.update, view: BadgeBasicExample.view },
      Scene.with(BadgeBasicExample.init()[0]),
      Scene.expect(Scene.text("Badge")).toExist(),
      Scene.expect(Scene.text("Secondary")).toExist(),
      Scene.expect(Scene.text("Destructive")).toExist(),
      Scene.expect(Scene.text("Outline")).toExist(),
      Scene.expect(Scene.text("Badge")).not.toHaveHandler("click")
    );
  });
});
