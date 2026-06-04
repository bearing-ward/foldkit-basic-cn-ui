import { Array, Match as M, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Dialog from "../../ui/dialog";

const permissionItems = [
  "Export workspace reports",
  "Invite billing admins",
  "Manage SSO enforcement",
  "Rotate API credentials",
  "Delete archived projects",
  "Edit retention policy",
  "Approve domain transfers",
  "View audit logs",
  "Manage incident contacts",
  "Configure webhook delivery",
];

// MODEL

export const Model = S.Struct({
  dialog: Dialog.Model,
});

export type Model = typeof Model.Type;

// MESSAGE

export const GotDialogMessage = m("GotDialogMessage", {
  message: Dialog.Message,
});

export const Message = S.Union([GotDialogMessage]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => {
  const [dialog, dialogCommands] = Dialog.init({ id: "dialog-scrollable" });

  return [
    { dialog },
    Command.mapMessages(dialogCommands, (message) =>
      GotDialogMessage({ message })
    ),
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
      GotDialogMessage: ({ message }) => {
        const [dialog, dialogCommands] = Dialog.update(model.dialog, message);

        return [
          evo(model, { dialog: () => dialog }),
          Command.mapMessages(dialogCommands, (message) =>
            GotDialogMessage({ message })
          ),
        ];
      },
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  const toDialogMessage = (message: Dialog.Message): Message =>
    GotDialogMessage({ message });

  return h.div(
    [h.Class("space-y-4")],
    [
      Dialog.trigger<Message>({
        label: "Review permissions",
        onClick: toDialogMessage(Dialog.RequestedOpen()),
      }),
      h.submodel({
        slotId: model.dialog.id,
        model: model.dialog,
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
                    h.div(
                      [
                        h.Class(
                          "flex max-h-[min(32rem,calc(100vh-4rem))] flex-col"
                        ),
                      ],
                      [
                        h.div(
                          [h.Class("shrink-0")],
                          [
                            Dialog.title<Message>({
                              model: model.dialog,
                              children: ["Review team permissions"],
                            }),
                            Dialog.description<Message>({
                              model: model.dialog,
                              children: [
                                "Scrollable dialog content keeps long forms readable while the footer actions remain available.",
                              ],
                            }),
                          ]
                        ),
                        h.div(
                          [h.Class("mt-4 min-h-0 flex-1 overflow-y-auto pr-2")],
                          [
                            h.ul(
                              [h.Class("space-y-2")],
                              Array.map(permissionItems, (permission) =>
                                h.li(
                                  [
                                    h.Class(
                                      "rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700"
                                    ),
                                  ],
                                  [permission]
                                )
                              )
                            ),
                          ]
                        ),
                        Dialog.footer<Message>({
                          children: [
                            Dialog.cancelButton<Message>({
                              label: "Cancel",
                              onClick: toDialogMessage(Dialog.RequestedClose()),
                            }),
                            Dialog.confirmButton<Message>({
                              label: "Apply permissions",
                              onClick: toDialogMessage(Dialog.RequestedClose()),
                            }),
                          ],
                        }),
                      ]
                    ),
                  ],
                }),
              ],
            }),
        },
        toParentMessage: toDialogMessage,
      }),
    ]
  );
});
