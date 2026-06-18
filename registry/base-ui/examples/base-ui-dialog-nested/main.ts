import { Match as M, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Dialog from "../../ui/base-ui-dialog";

// MODEL

export const Model = S.Struct({
  notificationsDialog: Dialog.Model,
  detailsDialog: Dialog.Model,
});

export type Model = typeof Model.Type;

// MESSAGE

export const GotNotificationsDialogMessage = m(
  "GotNotificationsDialogMessage",
  {
    message: Dialog.Message,
  }
);
export const GotDetailsDialogMessage = m("GotDetailsDialogMessage", {
  message: Dialog.Message,
});

export const Message = S.Union([
  GotNotificationsDialogMessage,
  GotDetailsDialogMessage,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => {
  const [notificationsDialog, notificationsDialogCommands] = Dialog.init({
    id: "dialog-nested-notifications",
  });
  const [detailsDialog, detailsDialogCommands] = Dialog.init({
    id: "dialog-nested-details",
  });

  return [
    { notificationsDialog, detailsDialog },
    [
      ...Command.mapMessages(notificationsDialogCommands, (message) =>
        GotNotificationsDialogMessage({ message })
      ),
      ...Command.mapMessages(detailsDialogCommands, (message) =>
        GotDetailsDialogMessage({ message })
      ),
    ],
  ];
};

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      GotNotificationsDialogMessage: ({ message }) => {
        const [notificationsDialog, notificationsDialogCommands] =
          Dialog.update(model.notificationsDialog, message);

        return [
          evo(model, { notificationsDialog: () => notificationsDialog }),
          Command.mapMessages(notificationsDialogCommands, (message) =>
            GotNotificationsDialogMessage({ message })
          ),
        ];
      },
      GotDetailsDialogMessage: ({ message }) => {
        const [detailsDialog, detailsDialogCommands] = Dialog.update(
          model.detailsDialog,
          message
        );

        return [
          evo(model, { detailsDialog: () => detailsDialog }),
          Command.mapMessages(detailsDialogCommands, (message) =>
            GotDetailsDialogMessage({ message })
          ),
        ];
      },
    })
  );

// VIEW

const detailsDialogView = (model: Model): Html => {
  const toDetailsMessage = (message: Dialog.Message): Message =>
    GotDetailsDialogMessage({ message });

  return html<Message>().submodel({
    slotId: model.detailsDialog.id,
    model: model.detailsDialog,
    view: Dialog.view,
    viewInputs: {
      toView: (render) =>
        Dialog.root<Message>({
          render,
          children: [
            Dialog.panel<Message>({
              render,
              children: [
                Dialog.title<Message>({
                  model: model.detailsDialog,
                  children: ["Notification details"],
                }),
                Dialog.description<Message>({
                  model: model.detailsDialog,
                  children: [
                    "Your workspace has no unread security or billing notifications.",
                  ],
                }),
                Dialog.footer<Message>({
                  children: [
                    Dialog.confirmButton<Message>({
                      label: "Close",
                      onClick: toDetailsMessage(Dialog.RequestedClose()),
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
    },
    toParentMessage: toDetailsMessage,
  });
};

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const toNotificationsMessage = (message: Dialog.Message): Message =>
    GotNotificationsDialogMessage({ message });
  const toDetailsMessage = (message: Dialog.Message): Message =>
    GotDetailsDialogMessage({ message });

  return h.div(
    [h.Class("space-y-4")],
    [
      Dialog.trigger<Message>({
        label: "View notifications",
        onClick: toNotificationsMessage(Dialog.RequestedOpen()),
      }),
      h.submodel({
        slotId: model.notificationsDialog.id,
        model: model.notificationsDialog,
        view: Dialog.view,
        viewInputs: {
          toView: (render) =>
            Dialog.root<Message>({
              render,
              children: [
                Dialog.backdrop<Message>(render),
                Dialog.panel<Message>({
                  render,
                  children: [
                    Dialog.title<Message>({
                      model: model.notificationsDialog,
                      children: ["Notifications"],
                    }),
                    Dialog.description<Message>({
                      model: model.notificationsDialog,
                      children: ["You are all caught up. Good job!"],
                    }),
                    h.div(
                      [h.Class("flex flex-wrap gap-3")],
                      [
                        Dialog.confirmButton<Message>({
                          label: "View details",
                          onClick: toDetailsMessage(Dialog.RequestedOpen()),
                        }),
                        Dialog.confirmButton<Message>({
                          label: "Close",
                          onClick: toNotificationsMessage(
                            Dialog.RequestedClose()
                          ),
                        }),
                      ]
                    ),
                    detailsDialogView(model),
                  ],
                }),
              ],
            }),
        },
        toParentMessage: toNotificationsMessage,
      }),
    ]
  );
});
