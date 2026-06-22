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
    id: "textarea-message",
    value: "",
    rows: 4,
    placeholder: "Type your message here.",
    toView: (attributes) =>
      h.div(
        [h.Class(Textarea.shadcnTextareaFieldClasses)],
        [
          h.label(
            [
              ...attributes.label,
              h.Class(Textarea.shadcnTextareaLabelClasses),
            ],
            ["Message"]
          ),
          h.p(
            [
              ...attributes.description,
              h.Class(Textarea.shadcnTextareaDescriptionClasses),
            ],
            ["Enter your message below."]
          ),
          h.textarea(
            [...attributes.textarea, h.Class(Textarea.shadcnTextareaClasses)],
            []
          ),
        ]
      ),
  });
});
