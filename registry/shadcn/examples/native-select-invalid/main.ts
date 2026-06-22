import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as NativeSelect from "../../ui/native-select";

// MODEL

export const Model = S.Struct({
  status: S.String,
});
export type Model = typeof Model.Type;

// MESSAGE

export const ChangedStatus = m("ChangedStatus", { value: S.String });
export const Message = S.Union([ChangedStatus]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ status: "" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ChangedStatus: ({ value }) => [evo(model, { status: () => value }), []],
    })
  );

// VIEW

const statusOptions: readonly NativeSelect.OptionConfig[] = [
  { value: "", label: "Select a status", disabled: true },
  { value: "todo", label: "Todo" },
  { value: "in-progress", label: "In Progress" },
  { value: "done", label: "Done" },
  { value: "cancelled", label: "Cancelled" },
];

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return NativeSelect.rootView<Message>({
    children: [
      NativeSelect.labelView<Message>({
        forId: "status-invalid",
        children: [h.span([], ["Select status"])],
      }),
      NativeSelect.triggerView<Message>({
        id: "status-invalid",
        value: model.status,
        onChange: (value) => ChangedStatus({ value }),
        options: statusOptions,
        describedById: "status-error",
        classes: "border-red-500 focus-visible:ring-red-500",
      }),
      h.p(
        [
          h.Id("status-error"),
          h.Class("text-sm font-medium text-red-600"),
        ],
        ["Please select a valid status."]
      ),
    ],
  });
});
