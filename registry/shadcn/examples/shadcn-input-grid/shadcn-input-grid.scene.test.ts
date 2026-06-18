import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Shadcn Input Grid example", () => {
  test("renders the current origin Grid content", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("textbox", { name: "First Name" })).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Last Name" })).toExist(),
      Scene.type(Scene.role("textbox", { name: "First Name" }), "Ada"),
      Scene.expect(Scene.role("textbox", { name: "First Name" })).toHaveAttr(
        "value",
        "Ada"
      )
    );
  });
});
