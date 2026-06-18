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
      h.img([
        h.Src("https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80"),
        h.Alt("Event cover"),
        h.Class("h-48 w-full object-cover"),
      ]),
      Card.headerView<Message>(
        [
          h.span(
            [
              h.Class(
                "inline-flex w-fit rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700"
              ),
            ],
            ["Featured"]
          ),
          Card.titleView<Message>("Design systems meetup"),
          Card.descriptionView<Message>(
            "A practical talk on component APIs, accessibility, and shipping faster."
          ),
        ],
        "gap-3"
      ),
      Card.footerView<Message>(
        [
          h.button(
            [
              h.Type("button"),
              h.Class(
                "inline-flex h-9 items-center justify-center rounded-md bg-black px-4 text-sm font-medium text-white"
              ),
            ],
            ["View Event"]
          ),
        ]
      ),
    ],
    "w-full max-w-sm"
  );
});
