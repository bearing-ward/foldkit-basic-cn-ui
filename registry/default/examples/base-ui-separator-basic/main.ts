import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";

import * as Separator from "../../ui/base-ui-separator";

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
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      Message: () => [model, []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("flex flex-col items-start gap-4")],
    [
      h.div(
        [h.Class("space-y-4")],
        [
          h.div(
            [h.Class("space-y-2")],
            [
              h.p([h.Class("text-sm font-medium text-gray-950")], ["Account"]),
              Separator.view<Message>(),
              h.p(
                [h.Class("text-sm text-gray-600")],
                ["Profile, billing, and team settings."]
              ),
            ]
          ),
          h.div(
            [h.Class("flex h-8 items-center gap-4 text-sm text-gray-700")],
            [
              h.span([], ["Preview"]),
              Separator.view<Message>({ orientation: "vertical" }),
              h.span([], ["Code"]),
              Separator.view<Message>({ orientation: "vertical" }),
              h.span([], ["Deploy"]),
            ]
          ),
        ]
      ),
    ]
  );
});
