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
    [h.Class("flex h-8 items-center gap-4 text-sm text-gray-950")],
    [
      h.a([h.Href("#"), h.Class("hover:text-gray-600")], ["Home"]),
      h.a([h.Href("#"), h.Class("hover:text-gray-600")], ["Pricing"]),
      h.a([h.Href("#"), h.Class("hover:text-gray-600")], ["Blog"]),
      h.a([h.Href("#"), h.Class("hover:text-gray-600")], ["Support"]),
      Separator.view<Message>({ orientation: "vertical" }),
      h.a([h.Href("#"), h.Class("hover:text-gray-600")], ["Log in"]),
      h.a([h.Href("#"), h.Class("hover:text-gray-600")], ["Sign up"]),
    ]
  );
});
