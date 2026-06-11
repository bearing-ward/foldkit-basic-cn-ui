import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";

import * as Separator from "../../ui/shadcn-separator";

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
    [],
    [
      h.div(
        [h.Class("space-y-1")],
        [
          h.h4(
            [h.Class("text-sm font-medium leading-none")],
            ["Radix Primitives"]
          ),
          h.p(
            [h.Class("text-sm text-gray-500")],
            ["An open-source UI component library."]
          ),
        ]
      ),
      Separator.view<Message>({ className: "my-4" }),
      h.div(
        [h.Class("flex h-5 items-center space-x-4 text-sm")],
        [
          h.div([], ["Blog"]),
          Separator.view<Message>({ orientation: "vertical" }),
          h.div([], ["Docs"]),
          Separator.view<Message>({ orientation: "vertical" }),
          h.div([], ["Source"]),
        ]
      ),
    ]
  );
});
