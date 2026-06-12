import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as Kbd from "../../ui/kbd";

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
    [h.Dir("rtl"), h.Class("flex flex-wrap items-center gap-2")],
    [
      h.span([h.Class("text-sm text-gray-700")], ["استخدم"]),
      Kbd.groupView<Message>([
        Kbd.view<Message>({ label: "Ctrl" }),
        h.span([h.Class("text-sm text-gray-500")], ["+"]),
        Kbd.view<Message>({ label: "K" }),
      ]),
      h.span([h.Class("text-sm text-gray-700")], ["لفتح لوحة الأوامر"]),
    ]
  );
});
