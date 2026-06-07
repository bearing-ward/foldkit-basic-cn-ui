import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("button-group-split example", () => {
  test("renders the shadcn Button Group Split example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("button", { name: "Button" })).toExist(),
      Scene.expect(
        Scene.role("button", { name: "More create actions" })
      ).toExist(),
      Scene.expect(
        Scene.role("group", { name: "Create actions" })
      ).not.toHaveHandler("click")
    );
  });
});
