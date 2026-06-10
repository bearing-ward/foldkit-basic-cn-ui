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
      Scene.Command.expectExact(
        InputOtpBasicExample.FocusInputOtpDigit({ index: 1 })
      ),
      Scene.Command.resolve(
        InputOtpBasicExample.FocusInputOtpDigit({ index: 1 }),
        InputOtpBasicExample.FocusedInputOtpDigit()
      ),
      Scene.expect(Scene.role("textbox", { name: "Digit 1" })).toHaveValue("1"),
      Scene.type(Scene.role("textbox", { name: "Digit 2" }), "2"),
      Scene.Command.expectExact(
        InputOtpBasicExample.FocusInputOtpDigit({ index: 2 })
      ),
      Scene.Command.resolve(
        InputOtpBasicExample.FocusInputOtpDigit({ index: 2 }),
        InputOtpBasicExample.FocusedInputOtpDigit()
      ),
      Scene.expect(Scene.role("textbox", { name: "Digit 2" })).toHaveValue("2"),
      Scene.expect(Scene.text("Code:")).not.toExist()
    );
  });
});
