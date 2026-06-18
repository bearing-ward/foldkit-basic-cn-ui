import { Match as M, Option, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Toast from "../../ui/shadcn-toast";

// MODEL

export const Model = S.Struct({
  toast: Toast.Model,
});
export type Model = typeof Model.Type;

// MESSAGE

export const ClickedShowToast = m("ClickedShowToast");
export const GotToastMessage = m("GotToastMessage", {
  message: Toast.Message,
});

export const Message = S.Union([ClickedShowToast, GotToastMessage]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [
  {
    toast: Toast.init({ id: "toast-basic" }),
  },
  [],
];

// UPDATE

const updateToast = (
  model: Model,
  toast: Toast.Model,
  commands: readonly Command.Command<Toast.Message>[],
  maybeOutMessage: Option.Option<Toast.OutMessage>
): readonly [Model, readonly Command.Command<Message>[]] => {
  Option.match(maybeOutMessage, {
    onNone: () => undefined,
    onSome: M.type<Toast.OutMessage>().pipe(
      M.tagsExhaustive({
        DismissedToast: () => undefined,
      })
    ),
  });

  return [
    evo(model, {
      toast: () => toast,
    }),
    Command.mapMessages(commands, (message) => GotToastMessage({ message })),
  ];
};

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedShowToast: () => {
        const [toast, commands, maybeOutMessage] = Toast.show(model.toast, {
          variant: "Info",
          sticky: true,
          payload: {
            title: "Scheduled: Catch up",
            maybeDescription: Option.some("Friday, February 10, 2023 at 5:57 PM"),
          },
        });

        return updateToast(model, toast, commands, maybeOutMessage);
      },
      GotToastMessage: ({ message }) => {
        const [toast, commands, maybeOutMessage] = Toast.update(
          model.toast,
          message
        );

        return updateToast(model, toast, commands, maybeOutMessage);
      },
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-3")],
    [
      h.button(
        [
          h.Type("button"),
          h.Class(
            "inline-flex cursor-pointer items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-100"
          ),
          h.OnClick(ClickedShowToast()),
        ],
        ["Show toast"]
      ),
      h.submodel({
        slotId: model.toast.id,
        model: model.toast,
        view: Toast.view,
        viewInputs: {
          position: "BottomRight",
          entryToView: Toast.shadcnToastEntryView,
          entryClassName: Toast.shadcnToastEntryClassName,
          containerClassName: Toast.shadcnToastContainerClassName,
        },
        toParentMessage: (message) => GotToastMessage({ message }),
      }),
    ]
  );
});
