import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as AlertDialog from "../../ui/base-ui-alert-dialog";

const TriggerId = S.Union([
  S.Literal("discard"),
  S.Literal("delete"),
  S.Literal("sign-out"),
]);
type TriggerId = typeof TriggerId.Type;

// MODEL

export const Model = S.Struct({
  open: S.Boolean,
  activeTriggerId: TriggerId,
  completedAction: S.String,
});

export type Model = typeof Model.Type;

// MESSAGE

export const ClickedControlledTrigger = m("ClickedControlledTrigger", {
  triggerId: TriggerId,
});
export const ClickedOpenProgrammatically = m("ClickedOpenProgrammatically");
export const ClickedCancelControlledDialog = m("ClickedCancelControlledDialog");
export const ClickedConfirmControlledDialog = m(
  "ClickedConfirmControlledDialog"
);

export const Message = S.Union([
  ClickedControlledTrigger,
  ClickedOpenProgrammatically,
  ClickedCancelControlledDialog,
  ClickedConfirmControlledDialog,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ open: false, activeTriggerId: "discard", completedAction: "" }, []];

// VIEW DATA

const actionLabel = (triggerId: TriggerId): string =>
  M.value(triggerId).pipe(
    M.withReturnType<string>(),
    M.when("discard", () => "Discard"),
    M.when("delete", () => "Delete"),
    M.when("sign-out", () => "Sign out"),
    M.exhaustive
  );

const dialogTitle = (triggerId: TriggerId): string =>
  M.value(triggerId).pipe(
    M.withReturnType<string>(),
    M.when("discard", () => "Discard draft?"),
    M.when("delete", () => "Delete project?"),
    M.when("sign-out", () => "Sign out?"),
    M.exhaustive
  );

const dialogDescription = (triggerId: TriggerId): string =>
  M.value(triggerId).pipe(
    M.withReturnType<string>(),
    M.when("discard", () => "You can't undo this action."),
    M.when("delete", () => "This will permanently delete the project."),
    M.when("sign-out", () => "You will need to sign in again to continue."),
    M.exhaustive
  );

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedControlledTrigger: ({ triggerId }) => [
        evo(model, {
          open: () => true,
          activeTriggerId: () => triggerId,
          completedAction: () => "",
        }),
        [],
      ],
      ClickedOpenProgrammatically: () => [
        evo(model, {
          open: () => true,
          activeTriggerId: () => "delete",
          completedAction: () => "",
        }),
        [],
      ],
      ClickedCancelControlledDialog: () => [
        evo(model, { open: () => false }),
        [],
      ],
      ClickedConfirmControlledDialog: () => [
        evo(model, {
          open: () => false,
          completedAction: () => actionLabel(model.activeTriggerId),
        }),
        [],
      ],
    })
  );

// VIEW

const controlledTriggerView = (triggerId: TriggerId): Html => {
  const h = html<Message>();
  const label = actionLabel(triggerId);

  return AlertDialog.triggerView<Message>({
    onClick: ClickedControlledTrigger({ triggerId }),
    children: [h.span([], [label])],
  });
};

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const titleId = "controlled-alert-dialog-title";
  const descriptionId = "controlled-alert-dialog-description";
  const action = actionLabel(model.activeTriggerId);

  return AlertDialog.rootView<Message>({
    children: [
      h.div(
        [h.Class("flex flex-wrap gap-3")],
        [
          controlledTriggerView("discard"),
          controlledTriggerView("delete"),
          controlledTriggerView("sign-out"),
          h.button(
            [
              h.Type("button"),
              h.OnClick(ClickedOpenProgrammatically()),
              h.Class(AlertDialog.alertDialogTriggerClasses),
            ],
            ["Open programmatically"]
          ),
        ]
      ),
      ...(model.completedAction === ""
        ? []
        : [
            h.p(
              [h.Class("text-sm text-gray-600")],
              [`${model.completedAction} confirmed.`]
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
                    children: [
                      h.span([], [dialogTitle(model.activeTriggerId)]),
                    ],
                  }),
                  AlertDialog.descriptionView<Message>({
                    id: descriptionId,
                    children: [
                      h.span([], [dialogDescription(model.activeTriggerId)]),
                    ],
                  }),
                  AlertDialog.actionsView<Message>({
                    children: [
                      AlertDialog.closeView<Message>({
                        onClick: ClickedCancelControlledDialog(),
                        children: [h.span([], ["Cancel"])],
                      }),
                      AlertDialog.closeView<Message>({
                        variant: "Confirm",
                        onClick: ClickedConfirmControlledDialog(),
                        children: [h.span([], [action])],
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
