import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Shadcn Input Button Group example", () => {
  test("renders the current origin Button Group content", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("textbox", { name: "Search" })).toHaveAttr(
        "placeholder",
        "Search"
      ),
      Scene.expect(Scene.role("button", { name: "Search" })).toExist(),
      Scene.type(Scene.role("textbox", { name: "Search" }), "query"),
      Scene.expect(Scene.role("textbox", { name: "Search" })).toHaveAttr(
        "value",
        "query"
      )
    );
  });
});
