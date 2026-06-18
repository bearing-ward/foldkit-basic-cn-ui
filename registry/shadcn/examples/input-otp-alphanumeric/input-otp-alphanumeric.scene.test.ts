import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Input OTP Alphanumeric example", () => {
  test("renders and exercises the alphanumeric variant", () => {
    Scene.scene(
      {
        update: Example.update,
        view: Example.view,
      },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("textbox", { name: "Digit 1" })).toExist(),
      Scene.type(Scene.role("textbox", { name: "Digit 1" }), "A1"),
      Scene.expect(Scene.role("textbox", { name: "Digit 1" })).toHaveValue("A"),
      
      Scene.expect(Scene.role("textbox", { name: "Digit 6" })).toExist(),
      
      
      Scene.expect(Scene.text("•")).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Digit 1" })).toHaveAttr(
        "pattern",
        "[a-zA-Z0-9]*"
      )
    );
  });
});
