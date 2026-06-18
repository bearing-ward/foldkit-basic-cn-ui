import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as Item from "../../ui/item";

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

type ModelCard = Readonly<{
  name: string;
  description: string;
  image: string;
  credit: string;
}>;

const models: readonly ModelCard[] = [
  {
    name: "v0-1.5-sm",
    description: "Everyday tasks and UI generation.",
    image:
      "https://images.unsplash.com/photo-1650804068570-7fb2e3dbf888?q=80&w=640&auto=format&fit=crop",
    credit: "Valeria Reverdo on Unsplash",
  },
  {
    name: "v0-1.5-lg",
    description: "Advanced thinking or reasoning.",
    image:
      "https://images.unsplash.com/photo-1610280777472-54133d004c8c?q=80&w=640&auto=format&fit=crop",
    credit: "Michael Oeser on Unsplash",
  },
  {
    name: "v0-2.0-mini",
    description: "Open Source model for everyone.",
    image:
      "https://images.unsplash.com/photo-1602146057681-08560aee8cde?q=80&w=640&auto=format&fit=crop",
    credit: "Cherry Laithang on Unsplash",
  },
];

const headerImage = ({ name, image, credit }: ModelCard): Html => {
  const h = html<Message>();

  return Item.headerView<Message>({
    className: "mb-0",
    children: [
      h.img([
        h.Src(image),
        h.Alt(`Image: ${name}`),
        h.Title(credit),
        h.Width("128"),
        h.Height("128"),
        h.Class("aspect-square w-full rounded-sm object-cover"),
      ]),
    ],
  });
};

const itemCard = (model: ModelCard): Html =>
  Item.view<Message>({
    variant: "outline",
    className: "flex-col gap-0 p-0",
    children: [
      headerImage(model),
      Item.contentView<Message>({
        className: "space-y-1.5 p-4",
        children: [
          Item.titleView<Message>({ children: [model.name] }),
          Item.descriptionView<Message>({ children: [model.description] }),
        ],
      }),
    ],
  });

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("flex w-full max-w-xl flex-col gap-6")],
    [
      Item.groupView<Message>({
        className: "grid grid-cols-3 gap-4",
        children: models.map(itemCard),
      }),
    ]
  );
});
