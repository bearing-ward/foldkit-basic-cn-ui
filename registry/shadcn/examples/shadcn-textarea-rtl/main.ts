import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as Textarea from "../../ui/shadcn-textarea";

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

  return Textarea.view<Message>({
    id: "feedback",
    value: "",
    rows: 4,
    placeholder: "تعليقاتك تساعدنا على التحسين...",
    toView: (attributes) =>
      h.div(
        [h.Dir("rtl"), h.Class("w-full max-w-xs space-y-2")],
        [
          h.label(
            [
              ...attributes.label,
              h.Dir("rtl"),
              h.Class(Textarea.shadcnTextareaLabelClasses),
            ],
            ["التعليقات"]
          ),
          h.textarea(
            [
              ...attributes.textarea,
              h.Dir("rtl"),
              h.Class(Textarea.shadcnTextareaClasses),
            ],
            []
          ),
          h.p(
            [
              ...attributes.description,
              h.Dir("rtl"),
              h.Class(Textarea.shadcnTextareaDescriptionClasses),
            ],
            ["شاركنا أفكارك حول خدمتنا."]
          ),
        ]
      ),
  });
});
