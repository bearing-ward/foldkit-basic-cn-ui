import { Effect, Match as M, Option, Schema as S } from "effect";
import { Command, Dom } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as ToggleGroup from "../../ui/base-ui-toggle-group";

// MODEL

export const Model = S.Struct({
  alignment: S.Array(S.String),
  focusedAlignment: S.String,
});

export type Model = typeof Model.Type;

// MESSAGE

export const ClickedAlignment = m("ClickedAlignment", { value: S.String });
export const PressedAlignmentKey = m("PressedAlignmentKey", { key: S.String });
export const FocusedAlignment = m("FocusedAlignment", { value: S.String });
export const Message = S.Union([
  ClickedAlignment,
  PressedAlignmentKey,
  FocusedAlignment,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ alignment: ["left"], focusedAlignment: "left" }, []];

// UPDATE

const toggleSingleValue = (
  pressedValues: readonly string[],
  value: string
): readonly string[] => (pressedValues.includes(value) ? [] : [value]);

const values: readonly string[] = ["left", "center", "right"];

const buttonId = (value: string): string => `base-ui-toggle-group-${value}`;

const nextValue = (currentValue: string, key: string): string => {
  const currentIndex = values.indexOf(currentValue);

  if (key === "ArrowRight") {
    return values[(currentIndex + 1) % values.length] ?? "left";
  }

  if (key === "ArrowLeft") {
    return values[(currentIndex + values.length - 1) % values.length] ?? "left";
  }

  return currentValue;
};

export const FocusAlignmentButton = Command.define(
  "FocusAlignmentButton",
  { value: S.String },
  FocusedAlignment
)(({ value }) =>
  Dom.focus(`#${buttonId(value)}`).pipe(
    Effect.ignore,
    Effect.as(FocusedAlignment({ value }))
  )
);

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedAlignment: ({ value }) => [
        evo(model, {
          alignment: (alignment) => toggleSingleValue(alignment, value),
          focusedAlignment: () => value,
        }),
        [],
      ],
      PressedAlignmentKey: ({ key }) => {
        const value = nextValue(model.focusedAlignment, key);

        return [
          evo(model, { focusedAlignment: () => value }),
          [FocusAlignmentButton({ value })],
        ];
      },
      FocusedAlignment: ({ value }) => [
        evo(model, { focusedAlignment: () => value }),
        [],
      ],
    })
  );

// VIEW

const alignIcon = (path: string): Html => {
  const h = html<Message>();

  return h.svg(
    [
      h.Attribute("width", "16"),
      h.Attribute("height", "16"),
      h.Attribute("viewBox", "0 0 16 16"),
      h.Attribute("fill", "none"),
      h.Attribute("stroke", "currentColor"),
      h.AriaHidden(true),
      h.Class(ToggleGroup.toggleGroupIconClasses),
    ],
    [
      h.path(
        [
          h.Attribute("stroke-linecap", "square"),
          h.Attribute("stroke-linejoin", "round"),
          h.Attribute("d", path),
        ],
        []
      ),
    ]
  );
};

export const view = Submodel.defineView<Model, Message>(
  (model): Html =>
    ToggleGroup.rootView<Message>({
      ariaLabel: "Text alignment",
      children: [
        ToggleGroup.itemView<Message>({
          value: "left",
          pressedValues: model.alignment,
          ariaLabel: "Align left",
          id: buttonId("left"),
          tabIndex: model.focusedAlignment === "left" ? 0 : -1,
          onKeyDown: (key) =>
            key === "ArrowLeft" || key === "ArrowRight"
              ? Option.some(PressedAlignmentKey({ key }))
              : Option.none(),
          onPressedChange: ClickedAlignment({ value: "left" }),
          children: [alignIcon("M2.5 4.5h11m-11 7h9M2.5 8h5")],
        }),
        ToggleGroup.itemView<Message>({
          value: "center",
          pressedValues: model.alignment,
          ariaLabel: "Align center",
          id: buttonId("center"),
          tabIndex: model.focusedAlignment === "center" ? 0 : -1,
          onKeyDown: (key) =>
            key === "ArrowLeft" || key === "ArrowRight"
              ? Option.some(PressedAlignmentKey({ key }))
              : Option.none(),
          onPressedChange: ClickedAlignment({ value: "center" }),
          children: [alignIcon("M2.5 4.5h11m-10 7h9M5.5 8h5")],
        }),
        ToggleGroup.itemView<Message>({
          value: "right",
          pressedValues: model.alignment,
          ariaLabel: "Align right",
          id: buttonId("right"),
          tabIndex: model.focusedAlignment === "right" ? 0 : -1,
          onKeyDown: (key) =>
            key === "ArrowLeft" || key === "ArrowRight"
              ? Option.some(PressedAlignmentKey({ key }))
              : Option.none(),
          onPressedChange: ClickedAlignment({ value: "right" }),
          children: [alignIcon("M2.5 4.5h11m-9 7h9M8.5 8h5")],
        }),
      ],
    })
);
