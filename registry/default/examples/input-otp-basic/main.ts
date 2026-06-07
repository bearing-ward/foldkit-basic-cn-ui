import { Array, Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
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
export const Message = S.Union([UpdatedInputOtpDigit]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ digits: ["", "", "", "", "", ""] }, []];

// UPDATE

const normalizeDigit = (value: string): string =>
  value.replaceAll(/\D/gu, "").slice(-1);

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      UpdatedInputOtpDigit: ({ index, value }) => [
        evo(model, {
          digits: (digits) =>
            Array.map(digits, (digit, digitIndex) =>
              digitIndex === index ? normalizeDigit(value) : digit
            ),
        }),
        [],
      ],
    })
  );

// VIEW

const slotView = (digit: string, index: number): Html =>
  InputOtp.slotView<Message>({
    value: digit,
    ariaLabel: `Digit ${index + 1}`,
    onInput: (value) => UpdatedInputOtpDigit({ index, value }),
    active: digit === "",
  });

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-3")],
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
      h.p(
        [h.Class("text-sm text-gray-600")],
        [`Code: ${model.digits.join("") || "empty"}`]
      ),
    ]
  );
});
