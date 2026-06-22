import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as Resizable from "../../ui/resizable";

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
  return Resizable.panelGroupView<Message>({
    direction: "vertical",
    classes: "min-h-48",
    children: [
      Resizable.panelView<Message>({ size: 25, children: ["One"] }),
      Resizable.handleView<Message>({ direction: "vertical" }),
      Resizable.panelView<Message>({ size: 50, children: ["Two"] }),
      Resizable.handleView<Message>({ direction: "vertical" }),
      Resizable.panelView<Message>({ size: 25, children: ["Three"] }),
    ],
  });
});
