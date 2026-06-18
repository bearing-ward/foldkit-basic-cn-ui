import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("item-group example", () => {
  test("renders the shadcn Item Group example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("shadcn")).not.toHaveHandler("click")
    );
  });
});
