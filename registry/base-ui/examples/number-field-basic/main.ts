import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as NumberField from "../../../foldkit/ui/number-field";

// MODEL

export const Model = S.Struct({
  amount: S.Number,
});

export type Model = typeof Model.Type;

// MESSAGE

export const UpdatedAmount = m("UpdatedAmount", { value: S.String });
export const ClickedDecrementAmount = m("ClickedDecrementAmount");
export const ClickedIncrementAmount = m("ClickedIncrementAmount");

export const Message = S.Union([
  UpdatedAmount,
  ClickedDecrementAmount,
  ClickedIncrementAmount,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ amount: 100 }, []];

// UPDATE

const parseAmount = (value: string, fallback: number): number => {
  const parsed = Number(value);

  if (Number.isFinite(parsed)) {
    return parsed;
  }

  return fallback;
};

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      UpdatedAmount: ({ value }) => [
        evo(model, { amount: () => parseAmount(value, model.amount) }),
        [],
      ],
      ClickedDecrementAmount: () => [
        evo(model, { amount: (amount) => amount - 1 }),
        [],
      ],
      ClickedIncrementAmount: () => [
        evo(model, { amount: (amount) => amount + 1 }),
        [],
      ],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const labelId = "amount-label";

  return NumberField.rootView<Message>({
    children: [
      NumberField.scrubAreaView<Message>({
        id: labelId,
        children: [h.span([], ["Amount"])],
      }),
      NumberField.groupView<Message>({
        children: [
          NumberField.decrementView<Message>({
            ariaLabel: "Decrease",
            onClick: ClickedDecrementAmount(),
            children: [h.span([], ["-"])],
          }),
          NumberField.inputView<Message>({
            id: "amount",
            value: String(model.amount),
            onInput: (value) => UpdatedAmount({ value }),
            ariaLabel: "Amount",
            labelledById: labelId,
            step: 1,
          }),
          NumberField.incrementView<Message>({
            ariaLabel: "Increase",
            onClick: ClickedIncrementAmount(),
            children: [h.span([], ["+"])],
          }),
        ],
      }),
    ],
  });
});
