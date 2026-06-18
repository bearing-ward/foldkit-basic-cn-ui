import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Shadcn Input Field Group example", () => {
  test("renders the current origin Field Group content", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("textbox", { name: "Name" })).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Email" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Reset" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Submit" })).toExist(),
      Scene.expect(Scene.text("We'll send updates to this address.")).toExist(),
      Scene.type(Scene.role("textbox", { name: "Name" }), "Ada"),
      Scene.expect(Scene.role("textbox", { name: "Name" })).toHaveAttr(
        "value",
        "Ada"
      )
    );
  });
});
