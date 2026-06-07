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
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%230f172a'/%3E%3Cstop offset='1' stop-color='%234f46e5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1600' height='900' fill='url(%23g)'/%3E%3Ccircle cx='1180' cy='260' r='140' fill='%23f8fafc' fill-opacity='.9'/%3E%3Cpath d='M0 700 L340 470 L560 620 L820 390 L1600 780 V900 H0 Z' fill='%23f8fafc' fill-opacity='.78'/%3E%3C/svg%3E";

export const view = Submodel.defineView<Model, Message>(
  (): Html =>
    AspectRatio.view<Message>({
      ratio: 16 / 9,
      src: imageSrc,
      alt: "Photo",
    })
);
