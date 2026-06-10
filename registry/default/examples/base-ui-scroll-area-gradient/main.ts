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

const items = (): readonly Html[] => {
  const h = html<Message>();

  return [
    "Belgian farmhouse",
    "Norwegian stave church",
    "Japanese minka",
    "Yemeni tower house",
    "Swiss chalet",
    "Adobe courtyard",
    "Bamboo longhouse",
    "Stone croft",
  ].map((label) =>
    h.div(
      [h.Class("rounded-md border border-gray-100 bg-white px-3 py-2")],
      [label]
    )
  );
};

export const view = Submodel.defineView<Model, Message>(
  (): Html =>
    ScrollArea.view<Message>({
      ariaLabel: "Gradient scroll fade",
      hasFade: true,
      children: items(),
    })
);
