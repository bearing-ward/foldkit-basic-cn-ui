import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("item-header example", () => {
  test("renders the shadcn Item Header example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("Basic Item")).not.toHaveHandler("click")
    );
  });
});
