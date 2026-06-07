import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("item-avatar example", () => {
  test("renders the shadcn Item Avatar example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("Evil Rabbit")).not.toHaveHandler("click")
    );
  });
});
