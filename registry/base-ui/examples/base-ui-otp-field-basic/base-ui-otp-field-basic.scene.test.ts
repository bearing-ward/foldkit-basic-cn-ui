import { Scene } from "foldkit";
import { describe, test } from "vitest";

import { CompletedFocusDigit, FocusDigit, init, update, view } from "./main";

describe("otp-field-basic example", () => {
  test("renders the verification code field and updates digits", () => {
    const [model] = init();
    const FocusSecondDigit = FocusDigit({ id: "verification-code-1" });
    const FocusThirdDigit = FocusDigit({ id: "verification-code-2" });

    Scene.scene(
      { update, view },
      Scene.with(model),
      Scene.expect(
        Scene.role("group", { name: "Verification code" })
      ).toExist(),
      Scene.expect(
        Scene.text("Enter the 6-character code we sent to your device.")
      ).toExist(),
      Scene.type(Scene.role("textbox", { name: "Character 1 of 6" }), "A"),
      Scene.Command.expectExact(FocusSecondDigit),
      Scene.Command.resolve(
        FocusSecondDigit,
        CompletedFocusDigit({ id: "verification-code-1" })
      ),
      Scene.type(Scene.role("textbox", { name: "Character 2 of 6" }), "7"),
      Scene.Command.expectExact(FocusThirdDigit),
      Scene.Command.resolve(
        FocusThirdDigit,
        CompletedFocusDigit({ id: "verification-code-2" })
      ),
      Scene.expect(Scene.text("Code: A7")).toExist()
    );
  });
});
