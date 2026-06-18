import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { ts } from "foldkit/schema";
import { evo } from "foldkit/struct";

import * as NumberField from "../../ui/base-ui-number-field";

// MODEL

const Idle = ts("Idle");
const Scrubbing = ts("Scrubbing", {
  startAmount: S.Number,
  startScreenX: S.Number,
});
const ScrubState = S.Union([Idle, Scrubbing]);
type ScrubState = typeof ScrubState.Type;

export const Model = S.Struct({
  amount: S.Number,
  scrubState: ScrubState,
});

export type Model = typeof Model.Type;

// MESSAGE

export const UpdatedAmount = m("UpdatedAmount", { value: S.String });
export const ClickedDecrementAmount = m("ClickedDecrementAmount");
export const ClickedIncrementAmount = m("ClickedIncrementAmount");
export const PressedScrubArea = m("PressedScrubArea", { screenX: S.Number });
export const MovedScrubArea = m("MovedScrubArea", { screenX: S.Number });
export const ReleasedScrubArea = m("ReleasedScrubArea");

export const Message = S.Union([
  UpdatedAmount,
  ClickedDecrementAmount,
  ClickedIncrementAmount,
  PressedScrubArea,
  MovedScrubArea,
  ReleasedScrubArea,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ amount: 100, scrubState: Idle() }, []];

// UPDATE

const parseAmount = (value: string, fallback: number): number => {
  const parsed = Number(value);

  if (Number.isFinite(parsed)) {
    return parsed;
  }

  return fallback;
};

const scrubDeltaToAmount = (
  startAmount: number,
  startScreenX: number,
  screenX: number
): number => startAmount + Math.round((screenX - startScreenX) / 8);

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
      PressedScrubArea: ({ screenX }) => [
        evo(model, {
          scrubState: () =>
            Scrubbing({ startAmount: model.amount, startScreenX: screenX }),
        }),
        [],
      ],
      MovedScrubArea: ({ screenX }) =>
        M.value(model.scrubState).pipe(
          M.withReturnType<
            readonly [Model, readonly Command.Command<Message>[]]
          >(),
          M.tagsExhaustive({
            Idle: () => [model, []],
            Scrubbing: ({ startAmount, startScreenX }) => [
              evo(model, {
                amount: () =>
                  scrubDeltaToAmount(startAmount, startScreenX, screenX),
              }),
              [],
            ],
          })
        ),
      ReleasedScrubArea: () => [
        evo(model, { scrubState: () => Idle() }),
        [],
      ],
    })
  );

// VIEW

const cursorGrowIcon = (): Html => {
  const h = html<Message>();

  return h.svg(
    [
      h.Attribute("width", "26"),
      h.Attribute("height", "14"),
      h.Attribute("viewBox", "0 0 24 14"),
      h.Attribute("fill", "currentColor"),
      h.Attribute("stroke", "white"),
      h.AriaHidden(true),
      h.DataAttribute("testid", "number-field-cursor-grow-icon"),
      h.Class("block"),
    ],
    [
      h.path(
        [
          h.Attribute(
            "d",
            "M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z"
          ),
        ],
        []
      ),
    ]
  );
};

const minusIcon = (): Html => {
  const h = html<Message>();

  return h.svg(
    [
      h.Attribute("width", "16"),
      h.Attribute("height", "16"),
      h.Attribute("viewBox", "0 0 16 16"),
      h.Attribute("fill", "none"),
      h.Attribute("stroke", "currentColor"),
      h.Attribute("stroke-linecap", "square"),
      h.Attribute("stroke-linejoin", "round"),
      h.AriaHidden(true),
      h.DataAttribute("testid", "number-field-minus-icon"),
      h.Class("block"),
    ],
    [h.path([h.Attribute("d", "M1.5 8h13")], [])]
  );
};

const plusIcon = (): Html => {
  const h = html<Message>();

  return h.svg(
    [
      h.Attribute("width", "16"),
      h.Attribute("height", "16"),
      h.Attribute("viewBox", "0 0 16 16"),
      h.Attribute("fill", "none"),
      h.Attribute("stroke", "currentColor"),
      h.Attribute("stroke-linecap", "square"),
      h.Attribute("stroke-linejoin", "round"),
      h.AriaHidden(true),
      h.DataAttribute("testid", "number-field-plus-icon"),
      h.Class("block"),
    ],
    [h.path([h.Attribute("d", "M1.5 8h13M8 14.5v-13")], [])]
  );
};

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const labelId = "amount-label";

  return NumberField.rootView<Message>({
    children: [
      NumberField.scrubAreaView<Message>({
        id: labelId,
        testId: "number-field-scrub-area",
        onPointerDown: (screenX) => PressedScrubArea({ screenX }),
        onPointerMove: (screenX) => MovedScrubArea({ screenX }),
        onPointerUp: ReleasedScrubArea(),
        children: [
          h.span([], ["Amount"]),
          NumberField.scrubAreaCursorView<Message>({
            children: [cursorGrowIcon()],
          }),
        ],
      }),
      NumberField.groupView<Message>({
        children: [
          NumberField.decrementView<Message>({
            ariaLabel: "Decrease",
            onClick: ClickedDecrementAmount(),
            children: [minusIcon()],
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
            children: [plusIcon()],
          }),
        ],
      }),
    ],
  });
});
