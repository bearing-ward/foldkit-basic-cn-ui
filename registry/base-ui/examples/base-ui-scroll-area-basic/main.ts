import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";

import * as ScrollArea from "../../ui/base-ui-scroll-area";

// MODEL

export const Model = S.Struct({});

export type Model = typeof Model.Type;

// MESSAGE

export const Message = m("Message");

export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{}, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      Message: () => [model, []],
    })
  );

// VIEW

const paragraphs = (): readonly Html[] => {
  const h = html<Message>();

  return [
    h.p(
      [],
      [
        "Vernacular architecture is building done outside any academic tradition, and without professional guidance. It is not a particular architectural movement or style, but rather a broad category, encompassing a wide range and variety of building types, with differing methods of construction, from around the world, both historical and extant and classical and modern. Vernacular architecture constitutes 95% of the world's built environment, as estimated in 1995 by Amos Rapoport, as measured against the small percentage of new buildings every year designed by architects and built by engineers.",
      ]
    ),
    h.p(
      [],
      [
        "This type of architecture usually serves immediate, local needs, is constrained by the materials available in its particular region and reflects local traditions and cultural practices. The study of vernacular architecture does not examine formally schooled architects, but instead that of the design skills and tradition of local builders, who were rarely given any attribution for the work. More recently, vernacular architecture has been examined by designers and the building industry in an effort to be more energy conscious with contemporary design and construction—part of a broader interest in sustainable design.",
      ]
    ),
  ];
};

export const view = Submodel.defineView<Model, Message>(
  (): Html =>
    ScrollArea.view<Message>({
      ariaLabel: "Vernacular architecture excerpt",
      children: paragraphs(),
    })
);
