import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Shadcn Input Inline example", () => {
  test("renders the current origin Inline content", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("textbox", { name: "Search" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Search" })).toExist(),
      Scene.type(Scene.role("textbox", { name: "Search" }), "docs"),
      Scene.expect(Scene.role("textbox", { name: "Search" })).toHaveAttr(
        "value",
        "docs"
      )
    );
  });
});
