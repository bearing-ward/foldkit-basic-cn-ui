import { Match as M, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Dialog from "../../ui/shadcn-dialog";

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
  const [dialog, dialogCommands] = Dialog.init({ id: "dialog-sticky-footer" });

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

const content = [
  "This is a sticky footer dialog. The content area scrolls independently while the footer stays visible.",
  "Use this pattern when a dialog contains lengthy content and the primary actions should remain available.",
  "The footer remains pinned to the bottom of the dialog panel while the body handles overflow.",
  "This keeps destructive or confirming actions discoverable without forcing the user to scroll to the end.",
];

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  const toDialogMessage = (message: Dialog.Message): Message =>
    GotDialogMessage({ message });

  return h.div(
    [h.Class("space-y-4")],
    [
      Dialog.trigger<Message>({
        label: "Open Dialog",
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
                          "flex max-h-[min(640px,80vh)] flex-col overflow-hidden"
                        ),
                      ],
                      [
                        Dialog.headerView<Message>({
                          classes: "px-0 pb-4",
                          children: [
                            Dialog.title<Message>({
                              model: model.dialog,
                              children: ["Sticky Footer"],
                            }),
                            Dialog.description<Message>({
                              model: model.dialog,
                              children: [
                                "A dialog with a scrollable body and footer actions that remain visible.",
                              ],
                            }),
                          ],
                        }),
                        h.div(
                          [
                            h.Class(
                              "-mx-6 flex-1 space-y-4 overflow-y-auto border-y border-gray-200 px-6 py-4 text-sm leading-6 text-gray-600"
                            ),
                          ],
                          content.map((paragraph) => h.p([], [paragraph]))
                        ),
                        Dialog.footerView<Message>({
                          classes: "px-0 pt-4",
                          children: [
                            Dialog.cancelButton<Message>({
                              label: "Cancel",
                              onClick: toDialogMessage(Dialog.RequestedClose()),
                            }),
                            Dialog.confirmButton<Message>({
                              label: "Continue",
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
