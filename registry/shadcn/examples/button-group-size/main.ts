import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as ButtonGroup from "../../ui/button-group";

// MODEL

export const Model = S.Struct({});
export type Model = typeof Model.Type;

// MESSAGE

export const Message = S.Never;
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{}, []];

// UPDATE

export const update = (
  model: Model,
  _message: Message
): readonly [Model, readonly Command.Command<Message>[]] => [model, []];

const buttonClasses =
  "inline-flex h-9 min-w-9 items-center justify-center bg-white px-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-accent-600";

// VIEW

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  const group = (label: string, buttonClass: string): Html =>
    h.div(
      [h.Class("space-y-2")],
      [
        h.p([h.Class("text-sm font-medium text-gray-700")], [label]),
        ButtonGroup.view<Message>({
          ariaLabel: label,
          children: [
            ButtonGroup.itemView<Message>({
              children: [h.button([h.Class(buttonClass)], ["B"])],
            }),
            ButtonGroup.itemView<Message>({
              children: [h.button([h.Class(buttonClass)], ["I"])],
            }),
            ButtonGroup.itemView<Message>({
              children: [h.button([h.Class(buttonClass)], ["U"])],
            }),
          ],
        }),
      ]
    );

  return h.div(
    [h.Class("flex flex-col gap-4")],
    [
      group(
        "Small Button Group",
        "inline-flex h-8 min-w-8 items-center justify-center bg-white px-2.5 text-xs font-medium text-gray-900 transition hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-accent-600"
      ),
      group("Default Button Group", buttonClasses),
      group(
        "Large Button Group",
        "inline-flex h-10 min-w-10 items-center justify-center bg-white px-4 text-base font-medium text-gray-900 transition hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-accent-600"
      ),
    ]
  );
});
