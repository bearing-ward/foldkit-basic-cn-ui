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
  department: S.String,
});
export type Model = typeof Model.Type;

// MESSAGE

export const ChangedDepartment = m("ChangedDepartment", { value: S.String });
export const Message = S.Union([ChangedDepartment]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ department: "frontend" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ChangedDepartment: ({ value }) => [
        evo(model, { department: () => value }),
        [],
      ],
    })
  );

// VIEW

const departmentOptions: readonly NativeSelect.OptionItemConfig[] = [
  {
    label: "Engineering",
    options: [
      { value: "frontend", label: "Frontend" },
      { value: "backend", label: "Backend" },
      { value: "devops", label: "DevOps" },
    ],
  },
  {
    label: "Sales",
    options: [
      { value: "sales-rep", label: "Sales Rep" },
      { value: "account-manager", label: "Account Manager" },
      { value: "sales-director", label: "Sales Director" },
    ],
  },
  {
    label: "Operations",
    options: [
      { value: "customer-support", label: "Customer Support" },
      { value: "product-manager", label: "Product Manager" },
      { value: "operations-manager", label: "Operations Manager" },
    ],
  },
];

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return NativeSelect.rootView<Message>({
    children: [
      NativeSelect.labelView<Message>({
        forId: "department",
        children: [h.span([], ["Select department"])],
      }),
      NativeSelect.triggerView<Message>({
        id: "department",
        value: model.department,
        onChange: (value) => ChangedDepartment({ value }),
        options: departmentOptions,
      }),
    ],
  });
});
