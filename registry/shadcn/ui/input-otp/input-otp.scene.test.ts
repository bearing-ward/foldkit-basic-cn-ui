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

const constrainedView = (digit: string): Html =>
  InputOtp.rootView<string>({
    disabled: true,
    invalid: true,
    dir: "rtl",
    children: [
      InputOtp.groupView<string>({
        children: [
          InputOtp.slotView<string>({
            value: digit,
            ariaLabel: "Digit 1",
            onInput: (value) => value,
            pattern: InputOtp.REGEXP_ONLY_DIGITS,
            inputMode: "numeric",
            disabled: true,
            invalid: true,
          }),
        ],
      }),
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

  test("forwards disabled, invalid, dir, and filters pattern input", () => {
    Scene.scene(
      {
        update: (_model: string, message: string): readonly [string, []] => [
          message,
          [],
        ],
        view: constrainedView,
      },
      Scene.with(""),
      Scene.expect(Scene.role("textbox", { name: "Digit 1" })).toBeDisabled(),
      Scene.expect(Scene.role("textbox", { name: "Digit 1" })).toHaveAttr(
        "aria-invalid",
        "true"
      ),
      Scene.expect(Scene.role("textbox", { name: "Digit 1" })).toHaveAttr(
        "pattern",
        InputOtp.REGEXP_ONLY_DIGITS
      )
    );
  });

  test("filters input through the configured pattern", () => {
    Scene.scene(
      {
        update: (_model: string, message: string): readonly [string, []] => [
          message,
          [],
        ],
        view: (digit) =>
          InputOtp.slotView<string>({
            value: digit,
            ariaLabel: "Digit 1",
            onInput: (value) => value,
            pattern: InputOtp.REGEXP_ONLY_DIGITS,
          }),
      },
      Scene.with(""),
      Scene.type(Scene.role("textbox", { name: "Digit 1" }), "A1B2"),
      Scene.expect(Scene.role("textbox", { name: "Digit 1" })).toHaveValue("12")
    );
  });
});
