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
  openSide: S.String,
});
export type Model = typeof Model.Type;

// MESSAGE

export const OpenedSide = m("OpenedSide", { side: S.String });
export const ClosedHoverCard = m("ClosedHoverCard");
export const Message = S.Union([OpenedSide, ClosedHoverCard]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ openSide: "" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      OpenedSide: ({ side }) => [evo(model, { openSide: () => side }), []],
      ClosedHoverCard: () => [evo(model, { openSide: () => "" }), []],
    })
  );

// VIEW

const sideConfig = [
  { side: "top", label: "Top", className: "bottom-full left-1/2 mb-2 -translate-x-1/2" },
  { side: "right", label: "Right", className: "left-full top-1/2 ml-2 -translate-y-1/2" },
  { side: "bottom", label: "Bottom", className: "left-1/2 top-full mt-2 -translate-x-1/2" },
  { side: "left", label: "Left", className: "right-full top-1/2 mr-2 -translate-y-1/2" },
] as const;

const sideCard = (
  h: ReturnType<typeof html<Message>>,
  model: Model,
  side: (typeof sideConfig)[number]
): Html =>
  HoverCard.rootView<Message>({
    className: "relative",
    children: [
      HoverCard.triggerView<Message>({
        open: model.openSide === side.side,
        onOpen: OpenedSide({ side: side.side }),
        children: [h.span([], [side.label])],
      }),
      HoverCard.portalView<Message>({
        open: model.openSide === side.side,
        className: "absolute inset-0 z-20",
        children: [
          HoverCard.backdropView<Message>({ onClose: ClosedHoverCard() }),
          HoverCard.positionerView<Message>({
            className: `absolute ${side.className}`,
            children: [
              HoverCard.popupView<Message>({
                children: [
                  h.h3([h.Class(HoverCard.hoverCardTitleClasses)], [
                    `${side.label} side`,
                  ]),
                  h.p([h.Class(HoverCard.hoverCardDescriptionClasses)], [
                    "Place the hover card on this side of the trigger.",
                  ]),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("grid grid-cols-2 gap-4 p-16")],
    sideConfig.map((side) => sideCard(h, model, side))
  );
});
