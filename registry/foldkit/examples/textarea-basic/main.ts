import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Textarea from "../../ui/textarea";

// MODEL

export const Model = S.Struct({
  value: S.String,
});

export type Model = typeof Model.Type;

// MESSAGE

export const UpdatedBio = m("UpdatedBio", { value: S.String });

export const Message = S.Union([UpdatedBio]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ value: "" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      UpdatedBio: ({ value }) => [evo(model, { value: () => value }), []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-sm space-y-3")],
    [
      Textarea.view<Message>({
        id: "bio-textarea",
        value: model.value,
        rows: 4,
        placeholder: "Tell us about yourself...",
        onInput: (value) => UpdatedBio({ value }),
        toView: (attributes) =>
          h.div(
            [h.Class(Textarea.fieldClasses)],
            [
              h.label(
                [...attributes.label, h.Class(Textarea.labelClasses)],
                ["Bio"]
              ),
              h.textarea(
                [...attributes.textarea, h.Class(Textarea.textareaClasses)],
                []
              ),
              h.p(
                [
                  ...attributes.description,
                  h.Class(Textarea.descriptionClasses),
                ],
                ["A brief introduction about yourself."]
              ),
            ]
          ),
      }),
      h.p(
        [h.Class("text-sm text-gray-700")],
        [`Characters: ${model.value.length.toString()}`]
      ),
    ]
  );
});
