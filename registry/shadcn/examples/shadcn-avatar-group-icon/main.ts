import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import { html } from "foldkit/html";

import * as Avatar from "../../ui/shadcn-avatar";

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
  model: Model
): readonly [Model, readonly Command.Command<Message>[]] => [model, []];

// VIEW

export const view = Submodel.defineView<Model, Message>(() => {
  const h = html<Message>();

  return Avatar.groupView<Message>([
    Avatar.view<Message>({ fallback: "CN" }),
    Avatar.view<Message>({ fallback: "LR" }),
    Avatar.view<Message>({ fallback: "ER" }),
    h.span(
      [
        h.Attribute("role", "img"),
        h.AriaLabel("Add three more people"),
        h.Class(`${Avatar.shadcnAvatarGroupCountClassName} text-base`),
      ],
      ["+"]
    ),
  ]);
});
