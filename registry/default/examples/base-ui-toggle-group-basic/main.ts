import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as ToggleGroup from "../../ui/base-ui-toggle-group";

// MODEL

export const Model = S.Struct({
  alignment: S.Array(S.String),
});

export type Model = typeof Model.Type;

// MESSAGE

export const ClickedAlignment = m("ClickedAlignment", { value: S.String });
export const Message = S.Union([ClickedAlignment]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ alignment: ["left"] }, []];

// UPDATE

const toggleSingleValue = (
  pressedValues: readonly string[],
  value: string
): readonly string[] => (pressedValues.includes(value) ? [] : [value]);

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
        }),
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
      h.Class(ToggleGroup.toggleGroupIconClassName),
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
          onPressedChange: ClickedAlignment({ value: "left" }),
          children: [alignIcon("M2.5 4.5h11m-11 7h9M2.5 8h5")],
        }),
        ToggleGroup.itemView<Message>({
          value: "center",
          pressedValues: model.alignment,
          ariaLabel: "Align center",
          onPressedChange: ClickedAlignment({ value: "center" }),
          children: [alignIcon("M2.5 4.5h11m-10 7h9M5.5 8h5")],
        }),
        ToggleGroup.itemView<Message>({
          value: "right",
          pressedValues: model.alignment,
          ariaLabel: "Align right",
          onPressedChange: ClickedAlignment({ value: "right" }),
          children: [alignIcon("M2.5 4.5h11m-9 7h9M8.5 8h5")],
        }),
      ],
    })
);
