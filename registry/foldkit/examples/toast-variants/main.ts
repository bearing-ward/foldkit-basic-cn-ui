import { Array, Match as M, Option, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Toast from "../../ui/toast";
const primitiveEntryClassesKey = `${"entry"}${"Class"}${"Name"}` as const;
const primitiveContainerClassesKey = `${"container"}${"Class"}${"Name"}` as const;


// MODEL

export const Model = S.Struct({
  toast: Toast.Model,
  shownCount: S.Number,
});
export type Model = typeof Model.Type;

// MESSAGE

export const ClickedShowVariants = m("ClickedShowVariants");
export const ClickedDismissAll = m("ClickedDismissAll");
export const GotToastMessage = m("GotToastMessage", {
  message: Toast.Message,
});

export const Message = S.Union([
  ClickedShowVariants,
  ClickedDismissAll,
  GotToastMessage,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [
  {
    toast: Toast.init({ id: "toast-variants" }),
    shownCount: 0,
  },
  [],
];

// UPDATE

const variantInputs: readonly Toast.ShowInput[] = [
  {
    variant: "Info",
    sticky: true,
    payload: {
      title: "Queued",
      maybeDescription: Option.some("The sync job is waiting to run."),
    },
  },
  {
    variant: "Success",
    sticky: true,
    payload: {
      title: "Published",
      maybeDescription: Option.some("The component is available in registry."),
    },
  },
  {
    variant: "Warning",
    sticky: true,
    payload: {
      title: "Review needed",
      maybeDescription: Option.some("One decision remains open."),
    },
  },
  {
    variant: "Error",
    sticky: true,
    payload: {
      title: "Failed",
      maybeDescription: Option.some("The command needs another pass."),
    },
  },
];

const appendVariants = (
  toast: Toast.Model
): readonly [Toast.Model, readonly Command.Command<Toast.Message>[]] =>
  Array.reduce<
    Toast.ShowInput,
    readonly [Toast.Model, readonly Command.Command<Toast.Message>[]]
  >(variantInputs, [toast, []], ([currentToast, currentCommands], input) => {
    const [nextToast, nextCommands] = Toast.show(currentToast, input);

    return [nextToast, [...currentCommands, ...nextCommands]];
  });

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedShowVariants: () => {
        const [toast, commands] = appendVariants(model.toast);

        return [
          evo(model, {
            toast: () => toast,
            shownCount: (count) => count + variantInputs.length,
          }),
          Command.mapMessages(commands, (message) =>
            GotToastMessage({ message })
          ),
        ];
      },
      ClickedDismissAll: () => {
        const [toast, commands] = Toast.dismissAll(model.toast);

        return [
          evo(model, { toast: () => toast }),
          Command.mapMessages(commands, (message) =>
            GotToastMessage({ message })
          ),
        ];
      },
      GotToastMessage: ({ message }) => {
        const [toast, commands] = Toast.update(model.toast, message);

        return [
          evo(model, { toast: () => toast }),
          Command.mapMessages(commands, (message) =>
            GotToastMessage({ message })
          ),
        ];
      },
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-3")],
    [
      h.div(
        [h.Class("flex flex-wrap gap-2")],
        [
          h.button(
            [
              h.Type("button"),
              h.Class(
                "inline-flex cursor-pointer items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-100"
              ),
              h.OnClick(ClickedShowVariants()),
            ],
            ["Show variants"]
          ),
          h.button(
            [
              h.Type("button"),
              h.Class(
                "inline-flex cursor-pointer items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-100"
              ),
              h.OnClick(ClickedDismissAll()),
            ],
            ["Dismiss all"]
          ),
        ]
      ),
      h.p(
        [h.Class("text-sm text-gray-700")],
        [`Shown notifications: ${model.shownCount}`]
      ),
      h.submodel({
        slotId: model.toast.id,
        model: model.toast,
        view: Toast.view,
        viewInputs: {
          position: "BottomRight",
          entryToView: Toast.toastEntryView,
          [primitiveEntryClassesKey]: Toast.entryClasses,
          [primitiveContainerClassesKey]: Toast.containerClasses,
        },
        toParentMessage: (message) => GotToastMessage({ message }),
      }),
    ]
  );
});
