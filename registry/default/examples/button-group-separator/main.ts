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

const primaryButtonClassName =
  "inline-flex h-9 items-center justify-center bg-gray-950 px-3 text-sm font-medium text-white transition hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-accent-600";

// VIEW

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return ButtonGroup.view<Message>({
    ariaLabel: "Clipboard actions",
    children: [
      ButtonGroup.itemView<Message>({
        children: [h.button([h.Class(primaryButtonClassName)], ["Copy"])],
      }),
      ButtonGroup.separatorView<Message>(),
      ButtonGroup.itemView<Message>({
        children: [h.button([h.Class(primaryButtonClassName)], ["Paste"])],
      }),
      ButtonGroup.separatorView<Message>(),
      ButtonGroup.itemView<Message>({
        children: [h.button([h.Class(primaryButtonClassName)], ["Cut"])],
      }),
    ],
  });
});
