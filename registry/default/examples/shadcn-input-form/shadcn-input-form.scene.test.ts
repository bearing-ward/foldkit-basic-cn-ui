import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Shadcn Input Form example", () => {
  test("renders the current origin Form content", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("textbox", { name: "Name" })).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Email" })).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Phone" })).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Country" })).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Address" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Cancel" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Submit" })).toExist(),
      Scene.expect(
        Scene.text("We'll never share your email with anyone.")
      ).toExist(),
      Scene.type(Scene.role("textbox", { name: "Name" }), "Ada"),
      Scene.expect(Scene.role("textbox", { name: "Name" })).toHaveAttr(
        "value",
        "Ada"
      )
    );
  });
});
