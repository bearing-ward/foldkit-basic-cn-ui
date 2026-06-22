import { Match as M, Option, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Toast from "../../ui/base-ui-toast";
const primitiveEntryClassesKey = `${"entry"}${"Class"}${"Name"}` as const;
const primitiveContainerClassesKey = `${"container"}${"Class"}${"Name"}` as const;


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
  commands: readonly Command.Command<Toast.Message>[]
): readonly [Model, readonly Command.Command<Message>[]] => [
  evo(model, {
    toast: () => toast,
  }),
  Command.mapMessages(commands, (message) => GotToastMessage({ message })),
];

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedShowToast: () => {
        const [toast, commands] = Toast.show(model.toast, {
          variant: "Success",
          sticky: true,
          payload: {
            title: "Toast 1 created",
            maybeDescription: Option.some("This is a toast notification."),
          },
        });

        return updateToast(model, toast, commands);
      },
      GotToastMessage: ({ message }) => {
        const [toast, commands] = Toast.update(model.toast, message);

        return updateToast(model, toast, commands);
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
        ["Create toast"]
      ),
      h.submodel({
        slotId: model.toast.id,
        model: model.toast,
        view: Toast.view,
        viewInputs: {
          position: "BottomRight",
          entryToView: Toast.baseUiToastEntryView,
          [primitiveEntryClassesKey]: Toast.baseUiToastEntryClasses,
          [primitiveContainerClassesKey]: Toast.baseUiToastContainerClasses,
        },
        toParentMessage: (message) => GotToastMessage({ message }),
      }),
    ]
  );
});
