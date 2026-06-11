import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { Schema as S } from "effect";

import * as Input from "../../ui/shadcn-input";

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
    [h.Class("grid w-full max-w-sm gap-2")],
    [
      h.label(
        [h.Attribute("for", "email"), h.Class(Input.shadcnInputLabelClassName)],
        ["Email"]
      ),
      h.input([
        h.Id("email"),
        h.Type("email"),
        h.Value("invalid-email"),
        h.AriaLabel("Email"),
        h.Attribute("aria-invalid", "true"),
        h.Class(Input.shadcnInputClassName),
      ]),
      h.p(
        [h.Class("text-sm font-medium text-red-700")],
        ["Enter a valid email address."]
      ),
    ]
  );
});
