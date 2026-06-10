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
      Scene.type(Scene.role("textbox", { name: "Digit 1" }), "A"),
      Scene.Command.expectExact(
        InputOtpBasicExample.FocusInputOtpDigit({ index: 1 })
      ),
      Scene.Command.resolve(
        InputOtpBasicExample.FocusInputOtpDigit({ index: 1 }),
        InputOtpBasicExample.FocusedInputOtpDigit()
      ),
      Scene.expect(Scene.role("textbox", { name: "Digit 1" })).toHaveValue("A"),
      Scene.type(Scene.role("textbox", { name: "Digit 2" }), "2"),
      Scene.Command.expectExact(
        InputOtpBasicExample.FocusInputOtpDigit({ index: 2 })
      ),
      Scene.Command.resolve(
        InputOtpBasicExample.FocusInputOtpDigit({ index: 2 }),
        InputOtpBasicExample.FocusedInputOtpDigit()
      ),
      Scene.expect(Scene.role("textbox", { name: "Digit 2" })).toHaveValue("2"),
      Scene.type(Scene.role("textbox", { name: "Digit 3" }), "CDE"),
      Scene.Command.expectExact(
        InputOtpBasicExample.FocusInputOtpDigit({ index: 5 })
      ),
      Scene.Command.resolve(
        InputOtpBasicExample.FocusInputOtpDigit({ index: 5 }),
        InputOtpBasicExample.FocusedInputOtpDigit()
      ),
      Scene.expect(Scene.role("textbox", { name: "Digit 3" })).toHaveValue("C"),
      Scene.expect(Scene.role("textbox", { name: "Digit 4" })).toHaveValue("D"),
      Scene.expect(Scene.role("textbox", { name: "Digit 5" })).toHaveValue("E"),
      Scene.keydown(Scene.role("textbox", { name: "Digit 6" }), "ArrowLeft"),
      Scene.Command.expectExact(
        InputOtpBasicExample.FocusInputOtpDigit({ index: 4 })
      ),
      Scene.Command.resolve(
        InputOtpBasicExample.FocusInputOtpDigit({ index: 4 }),
        InputOtpBasicExample.FocusedInputOtpDigit()
      ),
      Scene.keydown(Scene.role("textbox", { name: "Digit 6" }), "Backspace"),
      Scene.Command.expectExact(
        InputOtpBasicExample.FocusInputOtpDigit({ index: 4 })
      ),
      Scene.Command.resolve(
        InputOtpBasicExample.FocusInputOtpDigit({ index: 4 }),
        InputOtpBasicExample.FocusedInputOtpDigit()
      ),
      Scene.expect(Scene.text("Code:")).not.toExist()
    );
  });
});
