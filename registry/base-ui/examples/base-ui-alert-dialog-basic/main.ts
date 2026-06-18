import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as AlertDialog from "../../ui/base-ui-alert-dialog";

// MODEL

export const Model = S.Struct({
  open: S.Boolean,
  discarded: S.Boolean,
});

export type Model = typeof Model.Type;

// MESSAGE

export const ClickedDiscardDraft = m("ClickedDiscardDraft");
export const ClickedCancelDiscard = m("ClickedCancelDiscard");
export const ClickedConfirmDiscard = m("ClickedConfirmDiscard");

export const Message = S.Union([
  ClickedDiscardDraft,
  ClickedCancelDiscard,
  ClickedConfirmDiscard,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ open: false, discarded: false }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedDiscardDraft: () => [evo(model, { open: () => true }), []],
      ClickedCancelDiscard: () => [evo(model, { open: () => false }), []],
      ClickedConfirmDiscard: () => [
        evo(model, { open: () => false, discarded: () => true }),
        [],
      ],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const titleId = "discard-draft-title";
  const descriptionId = "discard-draft-description";

  return AlertDialog.rootView<Message>({
    children: [
      AlertDialog.triggerView<Message>({
        onClick: ClickedDiscardDraft(),
        children: [h.span([], ["Discard draft"])],
      }),
      ...(model.discarded
        ? [h.p([h.Class("text-sm text-gray-600")], ["Draft discarded."])]
        : []),
      AlertDialog.portalView<Message>({
        open: model.open,
        children: [
          AlertDialog.backdropView<Message>({ children: [] }),
          AlertDialog.viewportView<Message>({
            children: [
              AlertDialog.popupView<Message>({
                titleId,
                descriptionId,
                children: [
                  AlertDialog.titleView<Message>({
                    id: titleId,
                    children: [h.span([], ["Discard draft?"])],
                  }),
                  AlertDialog.descriptionView<Message>({
                    id: descriptionId,
                    children: [h.span([], ["You can't undo this action."])],
                  }),
                  AlertDialog.actionsView<Message>({
                    children: [
                      AlertDialog.closeView<Message>({
                        onClick: ClickedCancelDiscard(),
                        children: [h.span([], ["Cancel"])],
                      }),
                      AlertDialog.closeView<Message>({
                        variant: "Confirm",
                        onClick: ClickedConfirmDiscard(),
                        children: [h.span([], ["Discard"])],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
});
