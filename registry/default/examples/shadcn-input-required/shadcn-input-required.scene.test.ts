import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Shadcn Input Required example", () => {
  test("renders the current origin Required content", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(
        Scene.role("textbox", { name: "Required Field *" })
      ).toHaveAttr("required", "true"),
      Scene.expect(Scene.text("This field must be filled out.")).toExist(),
      Scene.type(Scene.role("textbox", { name: "Required Field *" }), "yes"),
      Scene.expect(
        Scene.role("textbox", { name: "Required Field *" })
      ).toHaveAttr("value", "yes")
    );
  });
});
