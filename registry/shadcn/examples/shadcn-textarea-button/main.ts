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

  return h.div(
    [h.Class("grid w-full gap-2")],
    [
      Textarea.view<Message>({
        id: "textarea-button",
        value: "",
        rows: 4,
        placeholder: "Type your message here.",
        toView: (attributes) =>
          h.textarea(
            [...attributes.textarea, h.Class(Textarea.shadcnTextareaClasses)],
            []
          ),
      }),
      h.button(
        [
          h.Type("button"),
          h.Class(
            "inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs"
          ),
        ],
        ["Send message"]
      ),
    ]
  );
});
