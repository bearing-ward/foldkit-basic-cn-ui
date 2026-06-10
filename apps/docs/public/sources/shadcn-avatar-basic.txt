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

const avatarImageSrc =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%230f172a'/%3E%3Ctext x='40' y='48' text-anchor='middle' font-size='24' font-family='Arial' fill='white'%3ECN%3C/text%3E%3C/svg%3E";

export const view = Submodel.defineView<Model, Message>(
  (): Html =>
    Avatar.view<Message>({
      alt: "Colm Tuite",
      fallback: "CN",
      src: avatarImageSrc,
    })
);
