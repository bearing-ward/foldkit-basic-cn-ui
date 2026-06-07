import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";

import * as DataTable from "../../ui/data-table";

// MODEL
export const Model = S.Struct({ pageIndex: S.Number, pageSize: S.Number });
export type Model = typeof Model.Type;
// MESSAGE
export const ClickedPreviousPage = m("ClickedPreviousPage");
export const ClickedNextPage = m("ClickedNextPage");
export const Message = S.Union([ClickedPreviousPage, ClickedNextPage]);
export type Message = typeof Message.Type;
// INIT
export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ pageIndex: 0, pageSize: 3 }, []];
// UPDATE
export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedPreviousPage: () => [DataTable.previousPage(model), []],
      ClickedNextPage: () => [
        DataTable.nextPage(model, DataTable.payments.length),
        [],
      ],
    })
  );
// VIEW
export const view = Submodel.defineView<Model, Message>((model): Html => {
  const rows = DataTable.paginatePayments(DataTable.payments, model);
  const h = html<Message>();
  return h.div(
    [h.Class("space-y-4")],
    [
      DataTable.paymentsTableView<Message>({ payments: rows }),
      DataTable.paginationView<Message>({
        pagination: model,
        totalRows: DataTable.payments.length,
        onPrevious: ClickedPreviousPage(),
        onNext: ClickedNextPage(),
      }),
    ]
  );
});
