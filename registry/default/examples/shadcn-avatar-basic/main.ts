import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";

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

const avatarImageSrc = "https://github.com/shadcn.png";

export const view = Submodel.defineView<Model, Message>(
  (): Html =>
    Avatar.view<Message>({
      alt: "@shadcn",
      fallback: "CN",
      src: avatarImageSrc,
    })
);
