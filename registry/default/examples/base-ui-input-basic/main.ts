import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Input from "../../ui/base-ui-input";

// MODEL

export const Model = S.Struct({
  value: S.String,
});

export type Model = typeof Model.Type;

// MESSAGE

export const UpdatedEmail = m("UpdatedEmail", { value: S.String });

export const Message = S.Union([UpdatedEmail]);
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
      UpdatedEmail: ({ value }) => [evo(model, { value: () => value }), []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return Input.view<Message>({
    id: "email-input",
    value: model.value,
    placeholder: "name@example.com",
    onInput: (value) => UpdatedEmail({ value }),
    toView: (attributes) =>
      h.div(
        [h.Class(Input.baseUiInputRootClassName)],
        [
          h.label(
            [...attributes.label, h.Class(Input.baseUiInputLabelClassName)],
            ["Email"]
          ),
          h.input([
            ...attributes.input,
            h.Class(Input.baseUiInputControlClassName),
          ]),
          h.p(
            [
              ...attributes.description,
              h.Class(Input.baseUiInputDescriptionClassName),
            ],
            ["Enter your email address."]
          ),
        ]
      ),
  });
});
