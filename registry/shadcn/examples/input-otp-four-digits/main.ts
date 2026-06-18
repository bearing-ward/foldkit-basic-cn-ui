import { Array, Match as M, Schema as S, String } from "effect";
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
] => [{ digits: ["", "", "", ""] }, []];

// UPDATE

const slotCount = 4;
const inputPattern = InputOtp.REGEXP_ONLY_DIGITS;

const slotCharacters = (value: string): readonly string[] =>
  String.split(value, "").slice(0, slotCount);

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
        [],
      ],
    })
  );

// VIEW

const slotView = (digit: string, index: number): Html =>
  InputOtp.slotView<Message>({
    value: digit,
    ariaLabel: `Digit ${index + 1}`,
    name: "otp",
    onInput: (value) => UpdatedInputOtpDigit({ index, value }),
    inputMode: "numeric",
    pattern: inputPattern,
    disabled: false,
    invalid: false,
    active: digit === "",
  });

const otpView = (model: Model): Html =>
  InputOtp.rootView<Message>({
    dir: "ltr",
    disabled: false,
    invalid: false,
    children: [
      InputOtp.groupView<Message>({
        children: model.digits.map(slotView),
      }),
    ],
  });

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [
      h.Attribute("dir", "ltr"),
      h.Class("mx-auto grid max-w-sm gap-4 text-center"),
    ],
    [
      h.div(
        [h.Class("space-y-1")],
        [
          h.h2([h.Class("text-lg font-semibold text-gray-950")], ["Four Digits"]),
          h.p([h.Class("text-sm text-gray-600")], ["A four digit PIN code."]),
        ]
      ),
      h.div([h.Class("flex justify-center")], [otpView(model)]),
    ]
  );
});
