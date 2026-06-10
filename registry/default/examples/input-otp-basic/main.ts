import { Array, Effect, Match as M, Option, Schema as S, String } from "effect";
import { Command, Submodel } from "foldkit";
import * as Dom from "foldkit/dom";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as InputOtp from "../../ui/input-otp";

// MODEL

export const Model = S.Struct({
  digits: S.Array(S.String),
});
export type Model = typeof Model.Type;

// MESSAGE

export const UpdatedInputOtpDigit = m("UpdatedInputOtpDigit", {
  index: S.Number,
  value: S.String,
});
export const PressedInputOtpKey = m("PressedInputOtpKey", {
  index: S.Number,
  key: S.String,
});
export const FocusedInputOtpDigit = m("FocusedInputOtpDigit");
export const Message = S.Union([
  UpdatedInputOtpDigit,
  PressedInputOtpKey,
  FocusedInputOtpDigit,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ digits: ["", "", "", "", "", ""] }, []];

// UPDATE

const slotCharacters = (value: string): readonly string[] =>
  String.split(value, "").slice(0, 6);

const slotId = (index: number): string => `input-otp-digit-${index + 1}`;

export const FocusInputOtpDigit = Command.define(
  "FocusInputOtpDigit",
  { index: S.Number },
  FocusedInputOtpDigit
)(({ index }) =>
  Dom.focus(`#${slotId(index)}`).pipe(
    Effect.ignore,
    Effect.as(FocusedInputOtpDigit())
  )
);

const setSlotValues = (
  digits: readonly string[],
  index: number,
  value: string
): readonly string[] => {
  const values = slotCharacters(value);

  if (Array.isReadonlyArrayEmpty(values)) {
    return Array.map(digits, (digit, digitIndex) =>
      digitIndex === index ? "" : digit
    );
  }

  return Array.reduce(values, digits, (nextDigits, slotValue, offset) => {
    const nextIndex = index + offset;

    if (nextIndex >= nextDigits.length) {
      return nextDigits;
    }

    return Array.map(nextDigits, (digit, digitIndex) =>
      digitIndex === nextIndex ? slotValue : digit
    );
  });
};

const focusNextCommand = (
  digits: readonly string[],
  index: number,
  value: string
): readonly Command.Command<Message>[] => {
  const values = slotCharacters(value);

  if (Array.isReadonlyArrayEmpty(values)) {
    return [];
  }

  const nextIndex = index + values.length;

  if (nextIndex >= digits.length) {
    return [];
  }

  return [FocusInputOtpDigit({ index: nextIndex })];
};

const updateReturn = (
  model: Model,
  commands: readonly Command.Command<Message>[]
): readonly [Model, readonly Command.Command<Message>[]] => [model, commands];

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      UpdatedInputOtpDigit: ({ index, value }) => [
        evo(model, {
          digits: (digits) => setSlotValues(digits, index, value),
        }),
        focusNextCommand(model.digits, index, value),
      ],
      PressedInputOtpKey: ({ index, key }) =>
        M.value(key).pipe(
          M.when("ArrowLeft", () =>
            updateReturn(
              model,
              index > 0 ? [FocusInputOtpDigit({ index: index - 1 })] : []
            )
          ),
          M.when("ArrowRight", () =>
            updateReturn(
              model,
              index < model.digits.length - 1
                ? [FocusInputOtpDigit({ index: index + 1 })]
                : []
            )
          ),
          M.when("Backspace", () =>
            updateReturn(
              model,
              model.digits[index] === "" && index > 0
                ? [FocusInputOtpDigit({ index: index - 1 })]
                : []
            )
          ),
          M.orElse(() => updateReturn(model, []))
        ),
      FocusedInputOtpDigit: () => [model, []],
    })
  );

// VIEW

const slotView = (digit: string, index: number): Html =>
  InputOtp.slotView<Message>({
    id: slotId(index),
    value: digit,
    ariaLabel: `Digit ${index + 1}`,
    onInput: (value) => UpdatedInputOtpDigit({ index, value }),
    onKeyDown: (key) =>
      key === "ArrowLeft" ||
      key === "ArrowRight" ||
      (key === "Backspace" && digit === "")
        ? Option.some(PressedInputOtpKey({ index, key }))
        : Option.none(),
    active: digit === "",
  });

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("flex justify-center")],
    [
      InputOtp.rootView<Message>({
        children: [
          InputOtp.groupView<Message>({
            children: model.digits.slice(0, 3).map(slotView),
          }),
          InputOtp.separatorView<Message>(),
          InputOtp.groupView<Message>({
            children: model.digits
              .slice(3)
              .map((digit, index) => slotView(digit, index + 3)),
          }),
        ],
      }),
    ]
  );
});
