import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";

import * as AspectRatio from "../../ui/aspect-ratio";

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

const imageSrc = "https://avatar.vercel.sh/shadcn1";

export const view = Submodel.defineView<Model, Message>(
  (): Html =>
    AspectRatio.view<Message>({
      ratio: 1,
      src: imageSrc,
      alt: "Photo",
    })
);
