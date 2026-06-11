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

  return h.input([
    h.Type("email"),
    h.Placeholder("Email"),
    h.AriaLabel("Email"),
    h.Disabled(true),
    h.DataAttribute("disabled", ""),
    h.Class(Input.shadcnInputClassName),
  ]);
});
