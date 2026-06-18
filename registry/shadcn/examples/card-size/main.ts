import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as Card from "../../ui/card";

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
  const h = html<Message>();

  return Card.view<Message>(
    [
      Card.headerView<Message>(
        [
          h.div(
            [h.Class("space-y-1")],
            [
              Card.titleView<Message>("Small Card"),
              Card.descriptionView<Message>(
                "This card uses the small size variant."
              ),
            ]
          ),
        ],
        "border-b border-gray-200"
      ),
      Card.contentView<Message>(
        [
          h.p(
            [h.Class("text-sm text-gray-600")],
            [
              'The card component supports a size prop that can be set to "sm" for a more compact appearance.',
            ]
          ),
        ]
      ),
      Card.footerView<Message>(
        [
          h.button(
            [
              h.Type("button"),
              h.Class(
                "inline-flex h-8 items-center justify-center rounded-md bg-black px-3 text-sm font-medium text-white"
              ),
            ],
            ["Action"]
          ),
        ]
      ),
    ],
    "w-full max-w-sm",
    "Small"
  );
});
