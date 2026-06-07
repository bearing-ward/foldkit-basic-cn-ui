import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as InputOtpBasicExample from "./main";

describe("Input OTP Basic example", () => {
  test("updates controlled OTP slots", () => {
    Scene.scene(
      {
        update: InputOtpBasicExample.update,
        view: InputOtpBasicExample.view,
      },
      Scene.with(InputOtpBasicExample.init()[0]),
      Scene.expect(Scene.role("textbox", { name: "Digit 1" })).toExist(),
      Scene.type(Scene.role("textbox", { name: "Digit 1" }), "1"),
      Scene.type(Scene.role("textbox", { name: "Digit 2" }), "2"),
      Scene.expect(Scene.text("Code: 12")).toExist()
    );
  });
});
