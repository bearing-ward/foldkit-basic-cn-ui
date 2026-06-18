import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

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
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Crect width='1600' height='900' fill='%230f172a'/%3E%3Ccircle cx='360' cy='260' r='140' fill='%23f8fafc' fill-opacity='.9'/%3E%3Cpath d='M0 760 L420 460 L680 650 L990 410 L1600 740 V900 H0 Z' fill='%23a7f3d0'/%3E%3C/svg%3E";

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return h.div(
    [h.Dir("rtl"), h.Class("space-y-3")],
    [
      AspectRatio.view<Message>({
        ratio: 16 / 9,
        src: imageSrc,
        alt: "Photo",
        caption: "منظر طبيعي جميل",
      }),
    ]
  );
});
