import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Shadcn Input Input Group example", () => {
  test("renders the current origin Input Group content", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("textbox", { name: "Website URL" })).toHaveAttr(
        "placeholder",
        "example.com"
      ),
      Scene.expect(Scene.text("https://")).toExist(),
      Scene.type(Scene.role("textbox", { name: "Website URL" }), "example.com"),
      Scene.expect(Scene.role("textbox", { name: "Website URL" })).toHaveAttr(
        "value",
        "example.com"
      )
    );
  });
});
