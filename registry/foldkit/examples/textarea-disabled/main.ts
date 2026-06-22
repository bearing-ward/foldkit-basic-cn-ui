import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";

import * as Textarea from "../../ui/textarea";

// MODEL

export const Model = S.Struct({});

export type Model = typeof Model.Type;

// MESSAGE

export const UpdatedDisabledBio = m("UpdatedDisabledBio", {
  value: S.String,
});

export const Message = S.Union([UpdatedDisabledBio]);
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
      UpdatedDisabledBio: () => [model, []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return Textarea.view<Message>({
    id: "disabled-bio-textarea",
    value:
      "Mathematician and writer, known for work on Charles Babbage's Analytical Engine.",
    isDisabled: true,
    rows: 3,
    onInput: (value) => UpdatedDisabledBio({ value }),
    toView: (attributes) =>
      h.div(
        [h.Class(Textarea.fieldClasses)],
        [
          h.label(
            [...attributes.label, h.Class(Textarea.labelClasses)],
            ["Disabled bio"]
          ),
          h.textarea(
            [...attributes.textarea, h.Class(Textarea.textareaClasses)],
            []
          ),
          h.p(
            [...attributes.description, h.Class(Textarea.descriptionClasses)],
            ["This textarea is disabled."]
          ),
        ]
      ),
  });
});
