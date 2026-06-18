import { Match as M, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Dialog from "../../ui/dialog";

const focusSelector = "#dialog-focus-name";

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
    id: "dialog-focus",
    focusSelector,
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
        label: "Open focus dialog",
        focusSelector,
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
                      children: ["Focus first field"],
                    }),
                    Dialog.description<Message>({
                      model: model.dialog,
                      children: [
                        "Use focusSelector with OnClickFocus when opening a dialog that should warm up and focus an input.",
                      ],
                    }),
                    h.label(
                      [h.Class("mt-4 block space-y-1.5 text-sm text-gray-700")],
                      [
                        h.span([h.Class("font-medium")], ["Account name"]),
                        h.input([
                          h.Id("dialog-focus-name"),
                          h.Type("text"),
                          h.AriaLabel("Account name"),
                          h.Placeholder("Ada Lovelace"),
                          h.Class(
                            "block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 transition-colors placeholder:text-gray-400 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
                          ),
                        ]),
                      ]
                    ),
                    Dialog.footer<Message>({
                      children: [
                        Dialog.cancelButton<Message>({
                          label: "Cancel",
                          onClick: toDialogMessage(Dialog.RequestedClose()),
                        }),
                        Dialog.confirmButton<Message>({
                          label: "Save details",
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
