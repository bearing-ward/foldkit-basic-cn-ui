import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Shadcn Input Field example", () => {
  test("renders the current origin Field content", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("textbox", { name: "Username" })).toHaveAttr(
        "aria-describedby",
        "username-description"
      ),
      Scene.expect(
        Scene.text("Choose a unique username for your account.")
      ).toExist(),
      Scene.type(Scene.role("textbox", { name: "Username" }), "ada"),
      Scene.expect(Scene.role("textbox", { name: "Username" })).toHaveAttr(
        "value",
        "ada"
      )
    );
  });
});
