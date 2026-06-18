import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("item-icon example", () => {
  test("renders the shadcn Item Icon example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("Security Alert")).not.toHaveHandler("click"),
      Scene.expect(Scene.role("button", { name: "Review" })).toExist()
    );
  });
});
