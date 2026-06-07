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
              Item.headerView<Message>({ children: ["Image: v0-1.5-sm"] }),
              Item.contentView<Message>({
                children: [
                  Item.titleView<Message>({ children: ["v0-1.5-sm"] }),
                  Item.descriptionView<Message>({
                    children: ["Everyday tasks and UI generation."],
                  }),
                ],
              }),
            ],
          }),
          Item.view<Message>({
            variant: "outline",
            children: [
              Item.headerView<Message>({ children: ["Image: v0-1.5-lg"] }),
              Item.contentView<Message>({
                children: [
                  Item.titleView<Message>({ children: ["v0-1.5-lg"] }),
                  Item.descriptionView<Message>({
                    children: ["Advanced thinking or reasoning."],
                  }),
                ],
              }),
            ],
          }),
          Item.view<Message>({
            variant: "outline",
            children: [
              Item.headerView<Message>({ children: ["Image: v0-2.0-mini"] }),
              Item.contentView<Message>({
                children: [
                  Item.titleView<Message>({ children: ["v0-2.0-mini"] }),
                  Item.descriptionView<Message>({
                    children: ["Open Source model for everyone."],
                  }),
                ],
              }),
            ],
          }),
        ]
      ),
    ]
  );
});
