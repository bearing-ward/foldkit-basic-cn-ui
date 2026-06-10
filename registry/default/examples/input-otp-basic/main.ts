import { Array, Effect, Match as M, Schema as S } from "effect";
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
export const FocusedInputOtpDigit = m("FocusedInputOtpDigit");
export const Message = S.Union([UpdatedInputOtpDigit, FocusedInputOtpDigit]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ digits: ["", "", "", "", "", ""] }, []];

// UPDATE

const normalizeSlotValue = (value: string): string => value.slice(-1);

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

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      UpdatedInputOtpDigit: ({ index, value }) => {
        const slotValue = normalizeSlotValue(value);

        return [
          evo(model, {
            digits: (digits) =>
              Array.map(digits, (digit, digitIndex) =>
                digitIndex === index ? slotValue : digit
              ),
          }),
          slotValue !== "" && index < model.digits.length - 1
            ? [FocusInputOtpDigit({ index: index + 1 })]
            : [],
        ];
      },
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
