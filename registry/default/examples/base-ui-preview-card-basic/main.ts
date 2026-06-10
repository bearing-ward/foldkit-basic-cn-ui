import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as PreviewCard from "../../ui/base-ui-preview-card";

// MODEL

export const Model = S.Struct({
  open: S.Boolean,
});

export type Model = typeof Model.Type;

// MESSAGE

export const OpenedPreviewCard = m("OpenedPreviewCard");
export const ClosedPreviewCard = m("ClosedPreviewCard");

export const Message = S.Union([OpenedPreviewCard, ClosedPreviewCard]);
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
      OpenedPreviewCard: () => [evo(model, { open: () => true }), []],
      ClosedPreviewCard: () => [evo(model, { open: () => false }), []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-lg text-sm leading-6 text-gray-700")],
    [
      h.p(
        [],
        [
          "The principles of good ",
          PreviewCard.rootView<Message>({
            children: [
              PreviewCard.triggerView<Message>({
                open: model.open,
                onOpen: OpenedPreviewCard(),
                children: ["typography"],
              }),
              PreviewCard.portalView<Message>({
                open: model.open,
                children: [
                  PreviewCard.backdropView<Message>({
                    onClose: ClosedPreviewCard(),
                  }),
                  PreviewCard.positionerView<Message>({
                    children: [
                      PreviewCard.arrowView<Message>({}),
                      PreviewCard.popupView<Message>({
                        children: [
                          PreviewCard.viewportView<Message>({
                            children: [
                              h.p(
                                [
                                  h.Class(
                                    "text-sm font-semibold text-gray-950"
                                  ),
                                ],
                                ["Typography"]
                              ),
                              h.p(
                                [h.Class("text-sm text-gray-600")],
                                [
                                  "The art and science of arranging type to make written language clear, visually appealing, and effective in communication.",
                                ]
                              ),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          " remain in the digital age.",
        ]
      ),
    ]
  );
});
