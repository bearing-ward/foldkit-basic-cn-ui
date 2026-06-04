import { Match as M, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Dialog from "../../ui/dialog";

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
    id: "dialog-animated",
    isAnimated: true,
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
        label: "Open animated dialog",
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
                    Dialog.title<Message>({
                      model: model.dialog,
                      children: ["Animated dialog"],
                    }),
                    Dialog.description<Message>({
                      model: model.dialog,
                      children: [
                        "This dialog uses Foldkit animation state to keep the surface mounted during enter and leave transitions.",
                      ],
                    }),
                    Dialog.footer<Message>({
                      children: [
                        Dialog.cancelButton<Message>({
                          label: "Cancel",
                          onClick: toDialogMessage(Dialog.RequestedClose()),
                        }),
                        Dialog.confirmButton<Message>({
                          label: "Done",
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
