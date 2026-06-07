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
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 1600'%3E%3Crect width='900' height='1600' fill='%230f172a'/%3E%3Ccircle cx='650' cy='270' r='120' fill='%23fde68a'/%3E%3Cpath d='M0 1250 L240 870 L430 1080 L650 760 L900 1180 V1600 H0 Z' fill='%23c7d2fe'/%3E%3Cpath d='M0 1340 L300 1000 L510 1180 L720 950 L900 1220 V1600 H0 Z' fill='%234f46e5'/%3E%3C/svg%3E";

export const view = Submodel.defineView<Model, Message>(
  (): Html =>
    AspectRatio.view<Message>({
      ratio: 9 / 16,
      src: imageSrc,
      alt: "Photo",
    })
);
