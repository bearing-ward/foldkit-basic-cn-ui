import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";

import * as Avatar from "../../ui/base-ui-avatar";

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

const avatarImageSrc =
  "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80";

export const view = Submodel.defineView<Model, Message>(
  (): Html =>
    Avatar.groupView<Message>(
      [
        Avatar.view<Message>({
          alt: "Lena Taylor",
          fallback: "LT",
          src: avatarImageSrc,
        }),
        Avatar.view<Message>({ fallback: "LT" }),
      ],
      "gap-4"
    )
);
