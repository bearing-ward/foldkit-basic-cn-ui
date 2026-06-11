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
  const [dialog, dialogCommands] = Dialog.init({
    id: "dialog-custom-close-button",
  });

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
        label: "Share",
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
                    Dialog.headerView<Message>({
                      children: [
                        Dialog.title<Message>({
                          model: model.dialog,
                          children: ["Share link"],
                        }),
                        Dialog.description<Message>({
                          model: model.dialog,
                          children: [
                            "Anyone who has this link will be able to view this.",
                          ],
                        }),
                      ],
                    }),
                    h.div(
                      [
                        h.Class(
                          "flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700"
                        ),
                      ],
                      ["https://ui.shadcn.com/docs/components/dialog"]
                    ),
                    Dialog.footerView<Message>({
                      children: [
                        Dialog.cancelButton<Message>({
                          label: "Close",
                          onClick: toDialogMessage(Dialog.RequestedClose()),
                        }),
                      ],
                    }),
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
