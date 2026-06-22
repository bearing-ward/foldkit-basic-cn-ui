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
  filter: S.String,
  status: S.Boolean,
  email: S.Boolean,
  amount: S.Boolean,
  isColumnsOpen: S.Boolean,
});
export type Model = typeof Model.Type;
// MESSAGE
export const UpdatedFilter = m("UpdatedFilter", { value: S.String });
export const ClickedToggleColumnsMenu = m("ClickedToggleColumnsMenu");
export const ClickedToggleColumn = m("ClickedToggleColumn", {
  column: S.Union([
    S.Literal("status"),
    S.Literal("email"),
    S.Literal("amount"),
  ]),
});
export const Message = S.Union([
  UpdatedFilter,
  ClickedToggleColumnsMenu,
  ClickedToggleColumn,
]);
export type Message = typeof Message.Type;
// INIT
export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [
  { filter: "", status: true, email: true, amount: true, isColumnsOpen: false },
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
      UpdatedFilter: ({ value }) => [evo(model, { filter: () => value }), []],
      ClickedToggleColumnsMenu: () => [
        evo(model, { isColumnsOpen: (isColumnsOpen) => !isColumnsOpen }),
        [],
      ],
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
  const rows = DataTable.filterPayments(DataTable.payments, model.filter);
  const columnMenuItem = (
    column: "status" | "email" | "amount",
    label: string,
    checked: boolean
  ): Html =>
    h.button(
      [
        h.Type("button"),
        h.Attribute("role", "menuitemcheckbox"),
        h.Attribute("aria-checked", checked ? "true" : "false"),
        h.AriaLabel(`Toggle ${column} column`),
        h.Class(DataTable.dataTableMenuItemClasses),
        h.OnClick(ClickedToggleColumn({ column })),
      ],
      [`${checked ? "✓ " : ""}${label}`]
    );

  return h.div(
    [h.Class("space-y-4")],
    [
      DataTable.toolbarView<Message>({
        children: [
          h.input([
            h.Type("text"),
            h.AriaLabel("Filter emails"),
            h.Placeholder("Filter emails..."),
            h.Value(model.filter),
            h.OnInput((value) => UpdatedFilter({ value })),
            h.Class(DataTable.dataTableInputClasses),
          ]),
          h.div(
            [h.Class("relative inline-flex flex-col items-end gap-2")],
            [
              h.button(
                [
                  h.Type("button"),
                  h.Attribute("aria-haspopup", "menu"),
                  h.Attribute(
                    "aria-expanded",
                    model.isColumnsOpen ? "true" : "false"
                  ),
                  h.Class(DataTable.dataTableButtonClasses),
                  h.OnClick(ClickedToggleColumnsMenu()),
                ],
                ["Columns"]
              ),
              model.isColumnsOpen
                ? h.div(
                    [
                      h.Attribute("role", "menu"),
                      h.Class(`${DataTable.dataTableMenuClasses} min-w-32`),
                    ],
                    [
                      columnMenuItem("status", "Status", model.status),
                      columnMenuItem("email", "Email", model.email),
                      columnMenuItem("amount", "Amount", model.amount),
                    ]
                  )
                : h.empty,
            ]
          ),
        ],
      }),
      DataTable.paymentsTableView<Message>({
        payments: rows.slice(0, 5),
        visibleColumns: model,
      }),
    ]
  );
});
