import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as DataTable from "../../ui/data-table";

// MODEL
export const Model = S.Struct({
  status: S.Boolean,
  email: S.Boolean,
  amount: S.Boolean,
});
export type Model = typeof Model.Type;
// MESSAGE
export const ClickedToggleColumn = m("ClickedToggleColumn", {
  column: S.Union([
    S.Literal("status"),
    S.Literal("email"),
    S.Literal("amount"),
  ]),
});
export const Message = S.Union([ClickedToggleColumn]);
export type Message = typeof Message.Type;
// INIT
export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ status: true, email: true, amount: true }, []];
// UPDATE
export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedToggleColumn: ({ column }) => {
        if (column === "status") {
          return [evo(model, { status: (status) => !status }), []];
        }
        if (column === "email") {
          return [evo(model, { email: (email) => !email }), []];
        }
        return [evo(model, { amount: (amount) => !amount }), []];
      },
    })
  );
// VIEW
export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const button = (column: "status" | "email" | "amount", label: string): Html =>
    h.button(
      [
        h.Type("button"),
        h.AriaLabel(`Toggle ${column} column`),
        h.Class(DataTable.dataTableButtonClassName),
        h.OnClick(ClickedToggleColumn({ column })),
      ],
      [label]
    );
  return h.div(
    [h.Class("space-y-4")],
    [
      DataTable.toolbarView<Message>({
        children: [
          button("status", "Status"),
          button("email", "Email"),
          button("amount", "Amount"),
        ],
      }),
      DataTable.paymentsTableView<Message>({
        payments: DataTable.payments.slice(0, 5),
        visibleColumns: model,
      }),
    ]
  );
});
