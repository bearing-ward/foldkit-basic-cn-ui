import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as AlertDialog from "../../ui/base-ui-alert-dialog";

// MODEL

export const Model = S.Struct({
  tweetOpen: S.Boolean,
  confirmationOpen: S.Boolean,
  tweet: S.String,
  discarded: S.Boolean,
});

export type Model = typeof Model.Type;

// MESSAGE

export const ClickedTweet = m("ClickedTweet");
export const UpdatedTweet = m("UpdatedTweet", { value: S.String });
export const RequestedCloseTweet = m("RequestedCloseTweet");
export const ClickedGoBack = m("ClickedGoBack");
export const ClickedDiscardTweet = m("ClickedDiscardTweet");

export const Message = S.Union([
  ClickedTweet,
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
] => [
  { tweetOpen: false, confirmationOpen: false, tweet: "", discarded: false },
  [],
];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedTweet: () => [
        evo(model, { tweetOpen: () => true, discarded: () => false }),
        [],
      ],
      UpdatedTweet: ({ value }) => [evo(model, { tweet: () => value }), []],
      RequestedCloseTweet: () =>
        model.tweet.trim() === ""
          ? [evo(model, { tweetOpen: () => false }), []]
          : [evo(model, { confirmationOpen: () => true }), []],
      ClickedGoBack: () => [evo(model, { confirmationOpen: () => false }), []],
      ClickedDiscardTweet: () => [
        evo(model, {
          tweetOpen: () => false,
          confirmationOpen: () => false,
          tweet: () => "",
          discarded: () => true,
        }),
        [],
      ],
    })
  );

// VIEW

const buttonClassName =
  "inline-flex h-8 items-center justify-center gap-2 border border-neutral-950 bg-white px-3 text-sm leading-none font-normal text-neutral-950 hover:bg-neutral-100";

const dangerButtonClassName = `${buttonClassName} text-red-700`;

const popupClassName =
  "grid w-full max-w-sm gap-4 rounded-none border border-neutral-950 bg-white p-4 text-neutral-950 shadow-[0.25rem_0.25rem_0_rgba(0,0,0,0.12)]";

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const tweetTitleId = "tweet-title";
  const tweetDescriptionId = "tweet-description";
  const confirmationTitleId = "discard-tweet-title";
  const confirmationDescriptionId = "discard-tweet-description";

  return h.div(
    [h.Class("space-y-3")],
    [
      AlertDialog.triggerView<Message>({
        onClick: ClickedTweet(),
        children: [h.span([], ["Tweet"])],
        className: buttonClassName,
      }),
      ...(model.discarded
        ? [h.p([h.Class("text-sm text-neutral-600")], ["Tweet discarded."])]
        : []),
      AlertDialog.portalView<Message>({
        open: model.tweetOpen,
        children: [
          AlertDialog.backdropView<Message>({ children: [] }),
          AlertDialog.viewportView<Message>({
            children: [
              AlertDialog.popupView<Message>({
                titleId: tweetTitleId,
                descriptionId: tweetDescriptionId,
                className: popupClassName,
                children: [
                  AlertDialog.titleView<Message>({
                    id: tweetTitleId,
                    className: "text-base font-bold",
                    children: [h.span([], ["New tweet"])],
                  }),
                  AlertDialog.descriptionView<Message>({
                    id: tweetDescriptionId,
                    className: "sr-only",
                    children: [h.span([], ["Write and post a tweet."])],
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
                      AlertDialog.closeView<Message>({
                        onClick: RequestedCloseTweet(),
                        children: [h.span([], ["Cancel"])],
                        className: buttonClassName,
                      }),
                      h.button(
                        [h.Type("button"), h.Class(buttonClassName)],
                        ["Tweet"]
                      ),
                    ]
                  ),
                ],
              }),
            ],
          }),
        ],
      }),
      AlertDialog.portalView<Message>({
        open: model.confirmationOpen,
        children: [
          AlertDialog.viewportView<Message>({
            children: [
              AlertDialog.popupView<Message>({
                titleId: confirmationTitleId,
                descriptionId: confirmationDescriptionId,
                className: popupClassName,
                children: [
                  AlertDialog.titleView<Message>({
                    id: confirmationTitleId,
                    className: "text-base font-bold",
                    children: [h.span([], ["Discard tweet?"])],
                  }),
                  AlertDialog.descriptionView<Message>({
                    id: confirmationDescriptionId,
                    className: "text-sm text-neutral-600",
                    children: [h.span([], ["Your tweet will be lost."])],
                  }),
                  AlertDialog.actionsView<Message>({
                    children: [
                      AlertDialog.closeView<Message>({
                        onClick: ClickedGoBack(),
                        children: [h.span([], ["Go back"])],
                        className: buttonClassName,
                      }),
                      AlertDialog.closeView<Message>({
                        onClick: ClickedDiscardTweet(),
                        variant: "Confirm",
                        children: [h.span([], ["Discard"])],
                        className: dangerButtonClassName,
                      }),
                    ],
                    className: "flex justify-end gap-3",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ]
  );
});
