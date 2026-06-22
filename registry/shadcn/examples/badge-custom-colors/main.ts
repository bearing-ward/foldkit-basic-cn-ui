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
    [h.Class("flex flex-wrap justify-center gap-2")],
    [
      Badge.view<Message>({
        label: "Blue",
        className: "bg-blue-50 text-blue-700 border border-blue-200",
      }),
      Badge.view<Message>({
        label: "Green",
        className: "bg-green-50 text-green-700 border border-green-200",
      }),
      Badge.view<Message>({
        label: "Sky",
        className: "bg-sky-50 text-sky-700 border border-sky-200",
      }),
      Badge.view<Message>({
        label: "Purple",
        className: "bg-purple-50 text-purple-700 border border-purple-200",
      }),
      Badge.view<Message>({
        label: "Red",
        className: "bg-red-50 text-red-700 border border-red-200",
      }),
    ]
  );
});
