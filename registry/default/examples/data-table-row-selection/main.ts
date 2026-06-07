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
  selectedRows: S.Record(S.String, S.Boolean),
});
export type Model = typeof Model.Type;
// MESSAGE
export const ClickedToggleRow = m("ClickedToggleRow", { id: S.String });
export const ClickedToggleAllVisible = m("ClickedToggleAllVisible");
export const Message = S.Union([ClickedToggleRow, ClickedToggleAllVisible]);
export type Message = typeof Message.Type;
// INIT
export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ selectedRows: {} }, []];
// UPDATE
export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedToggleRow: ({ id }) => [
        evo(model, {
          selectedRows: (selectedRows) =>
            DataTable.toggleRowSelection(selectedRows, id),
        }),
        [],
      ],
      ClickedToggleAllVisible: () => [
        evo(model, {
          selectedRows: (selectedRows) =>
            DataTable.toggleVisibleSelection(selectedRows, DataTable.payments),
        }),
        [],
      ],
    })
  );
// VIEW
export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  return h.div(
    [h.Class("space-y-4")],
    [
      DataTable.paymentsTableView<Message>({
        payments: DataTable.payments,
        selectedRows: model.selectedRows,
        onToggleRow: (id) => ClickedToggleRow({ id }),
        onToggleAllVisible: ClickedToggleAllVisible(),
      }),
      DataTable.selectionSummaryView<Message>({
        selected: DataTable.selectedCount(model.selectedRows),
        total: DataTable.payments.length,
      }),
    ]
  );
});
