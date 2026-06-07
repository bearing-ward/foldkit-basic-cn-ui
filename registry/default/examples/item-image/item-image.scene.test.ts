import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("item-image example", () => {
  test("renders the shadcn Item Image example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("Midnight City Lights")).not.toHaveHandler(
        "click"
      )
    );
  });
});
