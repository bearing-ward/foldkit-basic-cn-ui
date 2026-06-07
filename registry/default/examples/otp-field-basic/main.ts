import { Array, Effect, Match as M, Schema as S, String } from "effect";
import { Command, Dom, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as OtpField from "../../ui/otp-field";

// MODEL

export const Model = S.Struct({
  digits: S.Array(S.String),
});

export type Model = typeof Model.Type;

// MESSAGE

export const UpdatedDigit = m("UpdatedDigit", {
  value: S.String,
  index: S.Number,
});
export const CompletedFocusDigit = m("CompletedFocusDigit", {
  id: S.String,
});

export const Message = S.Union([UpdatedDigit, CompletedFocusDigit]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ digits: ["", "", "", "", "", ""] }, []];

// UPDATE

const digitCharacters = (value: string): readonly string[] =>
  String.split(value.replaceAll(/\D/gu, ""), "");

const setDigit = (
  digits: readonly string[],
  index: number,
  value: string
): readonly string[] => {
  const values = digitCharacters(value);

  const replaceAt = (
    currentDigits: readonly string[],
    currentIndex: number,
    digit: string
  ): readonly string[] =>
    currentDigits.map((currentDigit, digitIndex) =>
      digitIndex === currentIndex ? digit : currentDigit
    );

  if (values.length === 0) {
    return replaceAt(digits, index, "");
  }

  return Array.reduce(values, digits, (nextDigits, digit, offset) => {
    const nextIndex = index + offset;

    if (nextIndex >= nextDigits.length) {
      return nextDigits;
    }

    return replaceAt(nextDigits, nextIndex, digit);
  });
};

export const FocusDigit = Command.define(
  "FocusDigit",
  { id: S.String },
  CompletedFocusDigit
)(({ id }) =>
  Dom.focus(`#${id}`).pipe(
    Effect.as(CompletedFocusDigit({ id })),
    Effect.catchEager(() => Effect.succeed(CompletedFocusDigit({ id })))
  )
);

const focusNextCommand = (
  digits: readonly string[],
  index: number,
  value: string
): readonly Command.Command<Message>[] => {
  const values = digitCharacters(value);

  if (values.length === 0) {
    return [];
  }

  const nextIndex = index + values.length;

  if (nextIndex >= digits.length) {
    return [];
  }

  return [FocusDigit({ id: `verification-code-${nextIndex}` })];
};

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      UpdatedDigit: ({ index, value }) => [
        evo(model, {
          digits: (digits) => setDigit(digits, index, value),
        }),
        focusNextCommand(model.digits, index, value),
      ],
      CompletedFocusDigit: () => [model, []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const value = model.digits.join("");

  const inputAt = (index: number): Html =>
    OtpField.inputView<Message>({
      id: `verification-code-${index}`,
      value: model.digits[index] ?? "",
      index,
      ariaLabel: `Digit ${index + 1}`,
      name: "verification-code",
      onInput: (value, index) => UpdatedDigit({ value, index }),
    });

  return OtpField.rootView<Message>({
    children: [
      h.label(
        [h.Class("text-sm font-medium text-gray-950")],
        ["Verification code"]
      ),
      OtpField.inputGroupView<Message>({
        ariaLabel: "Verification code",
        children: [
          inputAt(0),
          inputAt(1),
          inputAt(2),
          OtpField.separatorView<Message>({}),
          inputAt(3),
          inputAt(4),
          inputAt(5),
        ],
      }),
      h.p(
        [h.Class("text-sm text-gray-600")],
        [value === "" ? "Enter the 6-digit code" : `Code: ${value}`]
      ),
    ],
  });
});
