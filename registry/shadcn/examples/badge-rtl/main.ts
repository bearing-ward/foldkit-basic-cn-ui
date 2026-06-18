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
    [h.Attribute("dir", "rtl"), h.Class("flex flex-wrap justify-center gap-2")],
    [
      Badge.view<Message>({ label: "شارة" }),
      Badge.view<Message>({ label: "ثانوي", variant: "Secondary" }),
      Badge.view<Message>({ label: "مدمر", variant: "Destructive" }),
      Badge.view<Message>({ label: "مخطط", variant: "Outline" }),
      Badge.contentView<Message>({
        children: [
          h.span([h.AriaHidden(true), h.Class("ml-1")], ["[+]"]),
          h.span([], ["متحقق"]),
        ],
      }),
      Badge.contentView<Message>({
        variant: "Secondary",
        children: [
          h.span([], ["إشارة مرجعية"]),
          h.span([h.AriaHidden(true), h.Class("mr-1")], ["[*]"]),
        ],
      }),
    ]
  );
});
