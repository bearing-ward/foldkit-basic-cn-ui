import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as NativeSelect from "../../ui/native-select";

// MODEL

export const Model = S.Struct({});
export type Model = typeof Model.Type;

// MESSAGE

export const Message = S.Never;
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{}, []];

// UPDATE

export const update = (
  model: Model,
  _message: Message
): readonly [Model, readonly Command.Command<Message>[]] => [model, []];

// VIEW

const statusOptions: readonly NativeSelect.OptionConfig[] = [
  { value: "todo", label: "Todo" },
  { value: "in-progress", label: "In Progress" },
  { value: "done", label: "Done" },
  { value: "cancelled", label: "Cancelled" },
];

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return NativeSelect.rootView<Message>({
    children: [
      NativeSelect.labelView<Message>({
        forId: "status-disabled",
        children: [h.span([], ["Select status"])],
      }),
      NativeSelect.triggerView<Message>({
        id: "status-disabled",
        value: "todo",
        disabled: true,
        onChange: () => {
          throw new Error("Disabled select cannot change");
        },
        options: statusOptions,
      }),
    ],
  });
});
