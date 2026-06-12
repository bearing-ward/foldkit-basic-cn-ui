import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Input OTP Disabled example", () => {
  test("renders and exercises the disabled variant", () => {
    Scene.scene(
      {
        update: Example.update,
        view: Example.view,
      },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("textbox", { name: "Digit 1" })).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Digit 1" })).toBeDisabled(),
      
      Scene.expect(Scene.role("textbox", { name: "Digit 6" })).toExist(),
      
      
      Scene.expect(Scene.text("•")).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Digit 1" })).toHaveAttr(
        "pattern",
        "[0-9]*"
      )
    );
  });
});
