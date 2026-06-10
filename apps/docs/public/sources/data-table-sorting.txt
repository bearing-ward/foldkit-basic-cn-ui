import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";

import * as DataTable from "../../ui/data-table";

export const SortDirection = S.Union([
  S.Literal("ascending"),
  S.Literal("descending"),
]);
// MODEL
export const Model = S.Struct({
  column: S.Literal("email"),
  direction: SortDirection,
});
export type Model = typeof Model.Type;
// MESSAGE
export const ClickedSortEmail = m("ClickedSortEmail");
export const Message = S.Union([ClickedSortEmail]);
export type Message = typeof Message.Type;
// INIT
export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ column: "email", direction: "ascending" }, []];
// UPDATE
export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedSortEmail: () => [DataTable.toggleSort(model, "email"), []],
    })
  );
// VIEW
export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const rows = DataTable.sortPayments(DataTable.payments, model);
  return h.div(
    [h.Class("space-y-4")],
    [
      DataTable.containerView<Message>({
        children: [
          h.table(
            [h.Class(DataTable.dataTableTableClassName)],
            [
              h.thead(
                [h.Class(DataTable.dataTableHeaderClassName)],
                [
                  h.tr(
                    [],
                    [
                      h.th(
                        [h.Class(DataTable.dataTableHeadClassName)],
                        ["Status"]
                      ),
                      h.th(
                        [h.Class(DataTable.dataTableHeadClassName)],
                        [
                          DataTable.sortHeaderView<Message>({
                            label: "Email",
                            active: model.column === "email",
                            direction: model.direction,
                            onClick: ClickedSortEmail(),
                          }),
                        ]
                      ),
                      h.th(
                        [h.Class(DataTable.dataTableHeadClassName)],
                        ["Amount"]
                      ),
                    ]
                  ),
                ]
              ),
              h.tbody(
                [],
                rows
                  .slice(0, 5)
                  .map((payment) =>
                    h.tr(
                      [h.Class(DataTable.dataTableRowClassName)],
                      [
                        h.td(
                          [h.Class(DataTable.dataTableCellClassName)],
                          [payment.status]
                        ),
                        h.td(
                          [h.Class(DataTable.dataTableCellClassName)],
                          [payment.email]
                        ),
                        h.td(
                          [
                            h.Class(
                              `${
                                DataTable.dataTableCellClassName
                              } text-right font-medium`
                            ),
                          ],
                          [DataTable.formatAmount(payment.amount)]
                        ),
                      ]
                    )
                  )
              ),
            ]
          ),
        ],
      }),
    ]
  );
});
