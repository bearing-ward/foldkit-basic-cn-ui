import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as HoverCard from "../../ui/hover-card";

// MODEL

export const Model = S.Struct({
  open: S.Boolean,
});
export type Model = typeof Model.Type;

// MESSAGE

export const OpenedHoverCard = m("OpenedHoverCard");
export const ClosedHoverCard = m("ClosedHoverCard");
export const Message = S.Union([OpenedHoverCard, ClosedHoverCard]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ open: false }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      OpenedHoverCard: () => [evo(model, { open: () => true }), []],
      ClosedHoverCard: () => [evo(model, { open: () => false }), []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Dir("rtl")],
    [
      HoverCard.rootView<Message>({
        children: [
          HoverCard.triggerView<Message>({
            open: model.open,
            onOpen: OpenedHoverCard(),
            children: [h.span([], ["مرر هنا"])],
          }),
          HoverCard.portalView<Message>({
            open: model.open,
            children: [
              HoverCard.backdropView<Message>({ onClose: ClosedHoverCard() }),
              HoverCard.positionerView<Message>({
                children: [
                  HoverCard.popupView<Message>({
                    children: [
                      h.div([h.Class(HoverCard.hoverCardAvatarClasses)], [
                        "ف",
                      ]),
                      h.h3([h.Class(HoverCard.hoverCardTitleClasses)], [
                        "@vercel",
                      ]),
                      h.p([h.Class(HoverCard.hoverCardDescriptionClasses)], [
                        "إطار عمل React - تم إنشاؤه وصيانته بواسطة @vercel.",
                      ]),
                      h.div([h.Class(HoverCard.hoverCardMetaClasses)], [
                        "انضم في ديسمبر 2021",
                      ]),
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
