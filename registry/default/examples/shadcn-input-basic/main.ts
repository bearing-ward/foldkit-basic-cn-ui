import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Input from "../../ui/shadcn-input";

// MODEL

export const Model = S.Struct({
  value: S.String,
});

export type Model = typeof Model.Type;

// MESSAGE

export const UpdatedName = m("UpdatedName", { value: S.String });

export const Message = S.Union([UpdatedName]);
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
      UpdatedName: ({ value }) => [evo(model, { value: () => value }), []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-3")],
    [
      Input.view<Message>({
        id: "name-input",
        value: model.value,
        placeholder: "Enter your full name",
        onInput: (value) => UpdatedName({ value }),
        toView: (attributes) =>
          h.div(
            [h.Class(Input.shadcnInputFieldClassName)],
            [
              h.label(
                [...attributes.label, h.Class(Input.shadcnInputLabelClassName)],
                ["Name"]
              ),
              h.input([
                ...attributes.input,
                h.Class(Input.shadcnInputClassName),
              ]),
              h.p(
                [
                  ...attributes.description,
                  h.Class(Input.shadcnInputDescriptionClassName),
                ],
                ["As it appears on your government-issued ID."]
              ),
            ]
          ),
      }),
      h.p(
        [h.Class("text-sm text-gray-700")],
        [`Current value: ${model.value === "" ? "empty" : model.value}`]
      ),
    ]
  );
});
