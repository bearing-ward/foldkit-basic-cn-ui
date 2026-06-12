import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Label Field example", () => {
  test("associates the label with the email field", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("Email")).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Email" })).toExist(),
      Scene.expect(Scene.text("Email")).not.toHaveHandler("click")
    );
  });
});
