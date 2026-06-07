import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";

import * as Item from "../../ui/item";

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
    M.tagsExhaustive({ Message: () => [model, []] })
  );

// VIEW
export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();
  return h.div(
    [h.Class("w-full")],
    [
      Item.groupView<Message>({
        children: [
          Item.view<Message>({
            children: [
              Item.mediaView<Message>({ variant: "image", children: ["1"] }),
              Item.contentView<Message>({
                children: [
                  Item.titleView<Message>({
                    children: [
                      "Midnight City Lights - Electric Nights Neon Dreams 3:45",
                    ],
                  }),
                ],
              }),
            ],
          }),
          Item.separatorView<Message>(),
          Item.view<Message>({
            children: [
              Item.mediaView<Message>({ variant: "image", children: ["2"] }),
              Item.contentView<Message>({
                children: [
                  Item.titleView<Message>({
                    children: [
                      "Coffee Shop Conversations - Urban Stories The Morning Brew 4:05",
                    ],
                  }),
                ],
              }),
            ],
          }),
          Item.separatorView<Message>(),
          Item.view<Message>({
            children: [
              Item.mediaView<Message>({ variant: "image", children: ["3"] }),
              Item.contentView<Message>({
                children: [
                  Item.titleView<Message>({
                    children: [
                      "Digital Rain - Binary Beats Cyber Symphony 3:30",
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ]
  );
});
