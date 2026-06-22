import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as ToggleGroup from "../../../foldkit/ui/toggle-group";

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

const alignIcon = (label: string): Html => {
  const h = html<Message>();

  return h.span([h.Class(ToggleGroup.toggleGroupIconClasses)], [label]);
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
          children: [alignIcon("L")],
        }),
        ToggleGroup.itemView<Message>({
          value: "center",
          pressedValues: model.alignment,
          ariaLabel: "Align center",
          onPressedChange: ClickedAlignment({ value: "center" }),
          children: [alignIcon("C")],
        }),
        ToggleGroup.itemView<Message>({
          value: "right",
          pressedValues: model.alignment,
          ariaLabel: "Align right",
          onPressedChange: ClickedAlignment({ value: "right" }),
          children: [alignIcon("R")],
        }),
      ],
    })
);
