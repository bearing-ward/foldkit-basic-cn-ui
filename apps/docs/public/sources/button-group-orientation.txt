import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as ButtonGroup from "../../ui/button-group";

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

const iconButtonClassName =
  "inline-flex h-9 w-9 items-center justify-center bg-white text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-accent-600";

// VIEW

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("flex items-start gap-6")],
    [
      ButtonGroup.view<Message>({
        ariaLabel: "Horizontal quantity controls",
        children: [
          ButtonGroup.itemView<Message>({
            children: [
              h.button(
                [h.Class(iconButtonClassName), h.AriaLabel("Decrease")],
                ["-"]
              ),
            ],
          }),
          ButtonGroup.itemView<Message>({
            children: [
              h.button(
                [h.Class(iconButtonClassName), h.AriaLabel("Increase")],
                ["+"]
              ),
            ],
          }),
        ],
      }),
      ButtonGroup.view<Message>({
        orientation: "vertical",
        ariaLabel: "Vertical quantity controls",
        children: [
          ButtonGroup.itemView<Message>({
            children: [
              h.button(
                [
                  h.Class(iconButtonClassName),
                  h.AriaLabel("Increase vertical"),
                ],
                ["+"]
              ),
            ],
          }),
          ButtonGroup.itemView<Message>({
            children: [
              h.button(
                [
                  h.Class(iconButtonClassName),
                  h.AriaLabel("Decrease vertical"),
                ],
                ["-"]
              ),
            ],
          }),
        ],
      }),
    ]
  );
});
