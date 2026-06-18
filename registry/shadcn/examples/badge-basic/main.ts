import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as Badge from "../../ui/badge";

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

// VIEW

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("flex w-full flex-wrap justify-center gap-2")],
    [
      Badge.view<Message>({ label: "Badge" }),
      Badge.view<Message>({ label: "Secondary", variant: "Secondary" }),
      Badge.view<Message>({ label: "Destructive", variant: "Destructive" }),
      Badge.view<Message>({ label: "Outline", variant: "Outline" }),
    ]
  );
});
