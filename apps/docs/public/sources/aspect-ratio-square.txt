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

const imageSrc =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 900'%3E%3Crect width='900' height='900' fill='%23111827'/%3E%3Ccircle cx='450' cy='430' r='250' fill='%23f8fafc' fill-opacity='.88'/%3E%3Cpath d='M120 720 L310 540 L450 650 L590 500 L780 720 Z' fill='%234f46e5'/%3E%3C/svg%3E";

export const view = Submodel.defineView<Model, Message>(
  (): Html =>
    AspectRatio.view<Message>({
      ratio: 1,
      src: imageSrc,
      alt: "Photo",
    })
);
