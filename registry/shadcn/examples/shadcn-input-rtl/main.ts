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
  email: S.String,
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
] => [{ email: "" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      UpdatedEmail: ({ value }) => [evo(model, { email: () => value }), []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Dir("rtl"), h.Class("w-full max-w-sm")],
    [
      Input.view<Message>({
        id: "email-rtl",
        value: model.email,
        placeholder: "البريد الإلكتروني",
        onInput: (value) => UpdatedEmail({ value }),
        toView: (attributes) =>
          h.input([
            ...attributes.input,
            h.Type("email"),
            h.AriaLabel("البريد الإلكتروني"),
            h.Class(Input.shadcnInputClasses),
          ]),
      }),
    ]
  );
});
