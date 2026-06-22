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
      h.div(
        [h.Class("grid gap-3")],
        [
          Item.view<Message>({
            variant: "outline",
            children: [
              Item.mediaView<Message>({ variant: "avatar", children: ["ER"] }),
              Item.contentView<Message>({
                children: [
                  Item.titleView<Message>({ children: ["Evil Rabbit"] }),
                  Item.descriptionView<Message>({
                    children: ["Last seen 5 months ago"],
                  }),
                ],
              }),
            ],
          }),
          Item.view<Message>({
            variant: "outline",
            children: [
              Item.mediaView<Message>({ variant: "avatar", children: ["ER"] }),
              Item.contentView<Message>({
                children: [
                  Item.titleView<Message>({ children: ["No Team Members"] }),
                  Item.descriptionView<Message>({
                    children: [
                      "Invite your team to collaborate on this project.",
                    ],
                  }),
                ],
              }),
              Item.actionsView<Message>({
                children: [
                  h.button(
                    [h.Type("button"), h.Class(Item.itemButtonClasses)],
                    ["Invite"]
                  ),
                ],
              }),
            ],
          }),
        ]
      ),
    ]
  );
});
