import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { describe, test } from "vitest";

import * as InputOtp from "./index";

const view = (digit: string): Html =>
  InputOtp.rootView<string>({
    children: [
      InputOtp.groupView<string>({
        children: [
          InputOtp.slotView<string>({
            value: digit,
            ariaLabel: "Digit 1",
            onInput: (value) => value,
            active: true,
          }),
        ],
      }),
      InputOtp.separatorView<string>(),
    ],
  });

describe("Input OTP registry view", () => {
  test("renders one-time-code slot state", () => {
    Scene.scene(
      {
        update: (_model: string, message: string): readonly [string, []] => [
          message,
          [],
        ],
        view,
      },
      Scene.with(""),
      Scene.expect(Scene.role("textbox", { name: "Digit 1" })).toHaveAttr(
        "autocomplete",
        "one-time-code"
      ),
      Scene.type(Scene.role("textbox", { name: "Digit 1" }), "4"),
      Scene.expect(Scene.role("textbox", { name: "Digit 1" })).toHaveValue("4")
    );
  });
});
