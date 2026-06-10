import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as AlertDialog from "../../ui/base-ui-alert-dialog";

const TriggerName = S.Union([S.Literal("Alice"), S.Literal("Bob")]);
type TriggerName = typeof TriggerName.Type;

// MODEL

export const Model = S.Struct({
  open: S.Boolean,
  activeTrigger: TriggerName,
  removedName: S.String,
});

export type Model = typeof Model.Type;

// MESSAGE

export const ClickedRemoveUser = m("ClickedRemoveUser", {
  value: TriggerName,
});
export const ClickedCancelRemoveUser = m("ClickedCancelRemoveUser");
export const ClickedConfirmRemoveUser = m("ClickedConfirmRemoveUser");

export const Message = S.Union([
  ClickedRemoveUser,
  ClickedCancelRemoveUser,
  ClickedConfirmRemoveUser,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ open: false, activeTrigger: "Alice", removedName: "" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedRemoveUser: ({ value }) => [
        evo(model, {
          open: () => true,
          activeTrigger: () => value,
          removedName: () => "",
        }),
        [],
      ],
      ClickedCancelRemoveUser: () => [evo(model, { open: () => false }), []],
      ClickedConfirmRemoveUser: () => [
        evo(model, {
          open: () => false,
          removedName: () => model.activeTrigger,
        }),
        [],
      ],
    })
  );

// VIEW

const triggerButtonView = (name: TriggerName): Html => {
  const h = html<Message>();

  return AlertDialog.triggerView<Message>({
    onClick: ClickedRemoveUser({ value: name }),
    children: [h.span([], [`Remove ${name}`])],
  });
};

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const titleId = "remove-user-title";
  const descriptionId = "remove-user-description";

  return AlertDialog.rootView<Message>({
    children: [
      h.div(
        [h.Class("flex flex-wrap gap-3")],
        [triggerButtonView("Alice"), triggerButtonView("Bob")]
      ),
      ...(model.removedName === ""
        ? []
        : [
            h.p(
              [h.Class("text-sm text-gray-600")],
              [`Removed ${model.removedName}.`]
            ),
          ]),
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
                    children: [h.span([], [`Remove ${model.activeTrigger}?`])],
                  }),
                  AlertDialog.descriptionView<Message>({
                    id: descriptionId,
                    children: [
                      h.span(
                        [],
                        [
                          `This will remove ${model.activeTrigger} from the project.`,
                        ]
                      ),
                    ],
                  }),
                  AlertDialog.actionsView<Message>({
                    children: [
                      AlertDialog.closeView<Message>({
                        onClick: ClickedCancelRemoveUser(),
                        children: [h.span([], ["Cancel"])],
                      }),
                      AlertDialog.closeView<Message>({
                        variant: "Confirm",
                        onClick: ClickedConfirmRemoveUser(),
                        children: [h.span([], ["Remove"])],
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
