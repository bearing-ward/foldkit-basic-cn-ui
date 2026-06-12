import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Input OTP Controlled example", () => {
  test("renders and exercises the controlled variant", () => {
    Scene.scene(
      {
        update: Example.update,
        view: Example.view,
      },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("textbox", { name: "Digit 1" })).toExist(),
      Scene.type(Scene.role("textbox", { name: "Digit 1" }), "A12"),
      Scene.expect(Scene.role("textbox", { name: "Digit 1" })).toHaveValue("1"),
      
      Scene.expect(Scene.role("textbox", { name: "Digit 6" })).toExist(),
      Scene.expect(Scene.text("Value: 12")).toExist(),
      
      Scene.expect(Scene.text("•")).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Digit 1" })).toHaveAttr(
        "pattern",
        "[0-9]*"
      )
    );
  });
});
