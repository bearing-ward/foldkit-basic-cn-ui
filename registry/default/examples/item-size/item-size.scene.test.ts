import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("item-size example", () => {
  test("renders the shadcn Item Size example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("Extra Small Size")).not.toHaveHandler("click")
    );
  });
});
