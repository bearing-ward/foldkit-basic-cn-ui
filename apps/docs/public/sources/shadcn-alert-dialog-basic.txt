import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as AlertDialog from "../../ui/shadcn-alert-dialog";

// MODEL

export const Model = S.Struct({
  open: S.Boolean,
  archived: S.Boolean,
});

export type Model = typeof Model.Type;

// MESSAGE

export const ClickedArchiveProject = m("ClickedArchiveProject");
export const ClickedCancelArchive = m("ClickedCancelArchive");
export const ClickedConfirmArchive = m("ClickedConfirmArchive");

export const Message = S.Union([
  ClickedArchiveProject,
  ClickedCancelArchive,
  ClickedConfirmArchive,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ open: false, archived: false }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedArchiveProject: () => [evo(model, { open: () => true }), []],
      ClickedCancelArchive: () => [evo(model, { open: () => false }), []],
      ClickedConfirmArchive: () => [
        evo(model, { open: () => false, archived: () => true }),
        [],
      ],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const titleId = "archive-project-title";
  const descriptionId = "archive-project-description";

  return h.div(
    [h.Class("space-y-3")],
    [
      AlertDialog.rootView<Message>({
        children: [
          AlertDialog.triggerView<Message>({
            onClick: ClickedArchiveProject(),
            children: [h.span([], ["Archive project"])],
          }),
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
                        children: [h.span([], ["Archive project?"])],
                      }),
                      AlertDialog.descriptionView<Message>({
                        id: descriptionId,
                        children: [
                          h.span(
                            [],
                            ["This removes the project from active dashboards."]
                          ),
                        ],
                      }),
                      AlertDialog.actionsView<Message>({
                        children: [
                          AlertDialog.closeView<Message>({
                            onClick: ClickedCancelArchive(),
                            children: [h.span([], ["Cancel"])],
                          }),
                          AlertDialog.closeView<Message>({
                            onClick: ClickedConfirmArchive(),
                            variant: "Confirm",
                            children: [h.span([], ["Archive"])],
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
      }),
      h.p(
        [h.Class("text-sm text-gray-700")],
        [`Project archived: ${model.archived ? "yes" : "no"}`]
      ),
    ]
  );
});
