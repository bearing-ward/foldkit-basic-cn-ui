import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";

import * as Badge from "../../ui/badge";
import * as Spinner from "../../ui/spinner";

// MODEL

export const Model = S.Struct({});

export type Model = typeof Model.Type;

// MESSAGE

export const Message = m("Message");
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

// VIEW

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("flex flex-wrap gap-2")],
    [
      Badge.contentView<Message>({
        variant: "Destructive",
        children: [
          Spinner.view<Message>({ classes: "mr-1" }),
          h.span([], ["Deleting"]),
        ],
      }),
      Badge.contentView<Message>({
        variant: "Secondary",
        children: [
          h.span([], ["Generating"]),
          Spinner.view<Message>({ classes: "ml-1" }),
        ],
      }),
    ]
  );
});
