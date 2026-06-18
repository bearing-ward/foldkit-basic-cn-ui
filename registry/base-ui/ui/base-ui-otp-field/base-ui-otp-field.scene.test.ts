import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as OtpFieldBasicExample from "../../examples/otp-field-basic/main";

describe("otp-field", () => {
  test("renders grouped one-time-code inputs with separator anatomy", () => {
    const [model] = OtpFieldBasicExample.init();

    Scene.scene(
      {
        update: OtpFieldBasicExample.update,
        view: OtpFieldBasicExample.view,
      },
      Scene.with(model),
      Scene.expect(
        Scene.role("group", { name: "Verification code" })
      ).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Digit 1" })).toHaveAttr(
        "autocomplete",
        "one-time-code"
      ),
      Scene.expect(Scene.text("-")).toExist()
    );
  });

  test("updates one slot and normalizes pasted code input", () => {
    const [model] = OtpFieldBasicExample.init();
    const FocusSecondDigit = OtpFieldBasicExample.FocusDigit({
      id: "verification-code-1",
    });
    const FocusFifthDigit = OtpFieldBasicExample.FocusDigit({
      id: "verification-code-4",
    });

    Scene.scene(
      {
        update: OtpFieldBasicExample.update,
        view: OtpFieldBasicExample.view,
      },
      Scene.with(model),
      Scene.type(Scene.role("textbox", { name: "Digit 1" }), "4"),
      Scene.Command.expectExact(FocusSecondDigit),
      Scene.Command.resolve(
        FocusSecondDigit,
        OtpFieldBasicExample.CompletedFocusDigit({
          id: "verification-code-1",
        })
      ),
      Scene.expect(Scene.text("Code: 4")).toExist(),
      Scene.type(Scene.role("textbox", { name: "Digit 2" }), "56x7"),
      Scene.Command.expectExact(FocusFifthDigit),
      Scene.Command.resolve(
        FocusFifthDigit,
        OtpFieldBasicExample.CompletedFocusDigit({
          id: "verification-code-4",
        })
      ),
      Scene.expect(Scene.text("Code: 4567")).toExist()
    );
  });
});
