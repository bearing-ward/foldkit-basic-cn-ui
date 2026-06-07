import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("button-group-orientation example", () => {
  test("renders the shadcn Button Group Orientation example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(
        Scene.role("group", { name: "Horizontal quantity controls" })
      ).toHaveAttr("data-orientation", "horizontal"),
      Scene.expect(
        Scene.role("group", { name: "Vertical quantity controls" })
      ).toHaveAttr("data-orientation", "vertical"),
      Scene.expect(
        Scene.role("group", { name: "Horizontal quantity controls" })
      ).not.toHaveHandler("click")
    );
  });
});
