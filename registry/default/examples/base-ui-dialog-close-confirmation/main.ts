import { Match as M, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Dialog from "../../ui/base-ui-dialog";

// MODEL

export const Model = S.Struct({
  tweetDialog: Dialog.Model,
  confirmationDialog: Dialog.Model,
  tweet: S.String,
  discarded: S.Boolean,
});

export type Model = typeof Model.Type;

// MESSAGE

export const GotTweetDialogMessage = m("GotTweetDialogMessage", {
  message: Dialog.Message,
});
export const GotConfirmationDialogMessage = m("GotConfirmationDialogMessage", {
  message: Dialog.Message,
});
export const UpdatedTweet = m("UpdatedTweet", { value: S.String });
export const RequestedCloseTweet = m("RequestedCloseTweet");
export const ClickedGoBack = m("ClickedGoBack");
export const ClickedDiscardTweet = m("ClickedDiscardTweet");

export const Message = S.Union([
  GotTweetDialogMessage,
  GotConfirmationDialogMessage,
  UpdatedTweet,
  RequestedCloseTweet,
  ClickedGoBack,
  ClickedDiscardTweet,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => {
  const [tweetDialog, tweetDialogCommands] = Dialog.init({
    id: "dialog-close-confirmation-tweet",
  });
  const [confirmationDialog, confirmationDialogCommands] = Dialog.init({
    id: "dialog-close-confirmation-discard",
  });

  return [
    { tweetDialog, confirmationDialog, tweet: "", discarded: false },
    [
      ...Command.mapMessages(tweetDialogCommands, (message) =>
        GotTweetDialogMessage({ message })
      ),
      ...Command.mapMessages(confirmationDialogCommands, (message) =>
        GotConfirmationDialogMessage({ message })
      ),
    ],
  ];
};

const updateTweetDialog = (
  model: Model,
  message: Dialog.Message
): readonly [Model, readonly Command.Command<Message>[]] => {
  const [tweetDialog, tweetDialogCommands] = Dialog.update(
    model.tweetDialog,
    message
  );

  return [
    evo(model, { tweetDialog: () => tweetDialog }),
    Command.mapMessages(tweetDialogCommands, (message) =>
      GotTweetDialogMessage({ message })
    ),
  ];
};

const updateConfirmationDialog = (
  model: Model,
  message: Dialog.Message
): readonly [Model, readonly Command.Command<Message>[]] => {
  const [confirmationDialog, confirmationDialogCommands] = Dialog.update(
    model.confirmationDialog,
    message
  );

  return [
    evo(model, { confirmationDialog: () => confirmationDialog }),
    Command.mapMessages(confirmationDialogCommands, (message) =>
      GotConfirmationDialogMessage({ message })
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
      GotTweetDialogMessage: ({ message }) => updateTweetDialog(model, message),
      GotConfirmationDialogMessage: ({ message }) =>
        updateConfirmationDialog(model, message),
      UpdatedTweet: ({ value }) => [evo(model, { tweet: () => value }), []],
      RequestedCloseTweet: () =>
        model.tweet.trim() === ""
          ? updateTweetDialog(model, Dialog.RequestedClose())
          : updateConfirmationDialog(model, Dialog.RequestedOpen()),
      ClickedGoBack: () =>
        updateConfirmationDialog(model, Dialog.RequestedClose()),
      ClickedDiscardTweet: () => {
        const [closedTweetModel, tweetCommands] = updateTweetDialog(
          model,
          Dialog.RequestedClose()
        );
        const [closedConfirmationModel, confirmationCommands] =
          updateConfirmationDialog(
            evo(closedTweetModel, {
              tweet: () => "",
              discarded: () => true,
            }),
            Dialog.RequestedClose()
          );

        return [
          closedConfirmationModel,
          [...tweetCommands, ...confirmationCommands],
        ];
      },
    })
  );

// VIEW

const buttonClassName =
  "inline-flex h-8 items-center justify-center gap-2 border border-neutral-950 bg-white px-3 text-sm leading-none font-normal text-neutral-950 hover:bg-neutral-100";

const dangerButtonClassName = `${buttonClassName} text-red-700`;

const panelClassName =
  "grid w-full max-w-sm gap-4 rounded-none border border-neutral-950 bg-white p-4 text-neutral-950 shadow-[0.25rem_0.25rem_0_rgba(0,0,0,0.12)]";

const confirmationDialogView = (model: Model): Html => {
  const toConfirmationMessage = (message: Dialog.Message): Message =>
    GotConfirmationDialogMessage({ message });

  return html<Message>().submodel({
    slotId: model.confirmationDialog.id,
    model: model.confirmationDialog,
    view: Dialog.view,
    viewInputs: {
      toView: (render) =>
        Dialog.root<Message>({
          render,
          children: [
            Dialog.panel<Message>({
              render,
              className: panelClassName,
              children: [
                Dialog.title<Message>({
                  model: model.confirmationDialog,
                  children: ["Discard tweet?"],
                }),
                Dialog.description<Message>({
                  model: model.confirmationDialog,
                  children: ["Your tweet will be lost."],
                }),
                Dialog.footer<Message>({
                  children: [
                    Dialog.confirmButton<Message>({
                      label: "Go back",
                      onClick: ClickedGoBack(),
                      className: buttonClassName,
                    }),
                    Dialog.confirmButton<Message>({
                      label: "Discard",
                      onClick: ClickedDiscardTweet(),
                      className: dangerButtonClassName,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
    },
    toParentMessage: toConfirmationMessage,
  });
};

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const toTweetMessage = (message: Dialog.Message): Message =>
    GotTweetDialogMessage({ message });

  return h.div(
    [h.Class("space-y-3")],
    [
      Dialog.trigger<Message>({
        label: "Tweet",
        onClick: toTweetMessage(Dialog.RequestedOpen()),
        className: buttonClassName,
      }),
      ...(model.discarded
        ? [h.p([h.Class("text-sm text-neutral-600")], ["Tweet discarded."])]
        : []),
      h.submodel({
        slotId: model.tweetDialog.id,
        model: model.tweetDialog,
        view: Dialog.view,
        viewInputs: {
          toView: (render) =>
            Dialog.root<Message>({
              render,
              children: [
                Dialog.backdrop<Message>(render),
                Dialog.panel<Message>({
                  render,
                  className: panelClassName,
                  children: [
                    Dialog.title<Message>({
                      model: model.tweetDialog,
                      children: ["New tweet"],
                    }),
                    Dialog.description<Message>({
                      model: model.tweetDialog,
                      className: "sr-only",
                      children: ["Write and post a tweet."],
                    }),
                    h.textarea(
                      [
                        h.Value(model.tweet),
                        h.OnInput((value) => UpdatedTweet({ value })),
                        h.Placeholder("What's happening?"),
                        h.Class(
                          "min-h-28 resize-none border border-neutral-300 p-2 text-sm outline-none focus:border-neutral-950"
                        ),
                      ],
                      []
                    ),
                    h.div(
                      [h.Class("flex justify-end gap-3")],
                      [
                        Dialog.confirmButton<Message>({
                          label: "Cancel",
                          onClick: RequestedCloseTweet(),
                          className: buttonClassName,
                        }),
                        h.button(
                          [h.Type("button"), h.Class(buttonClassName)],
                          ["Tweet"]
                        ),
                      ]
                    ),
                    confirmationDialogView(model),
                  ],
                }),
              ],
            }),
        },
        toParentMessage: toTweetMessage,
      }),
    ]
  );
});
