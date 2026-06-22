import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as DataTable from "../../ui/data-table";

// MODEL
export const Model = S.Struct({ filter: S.String });
export type Model = typeof Model.Type;
// MESSAGE
export const UpdatedFilter = m("UpdatedFilter", { value: S.String });
export const Message = S.Union([UpdatedFilter]);
export type Message = typeof Message.Type;
// INIT
export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ filter: "" }, []];
// UPDATE
export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      UpdatedFilter: ({ value }) => [evo(model, { filter: () => value }), []],
    })
  );
// VIEW
export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const rows = DataTable.filterPayments(DataTable.payments, model.filter);
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
          h.p(
            [h.Class("text-sm text-gray-600")],
            [`${String(rows.length)} results`]
          ),
        ],
      }),
      DataTable.paymentsTableView<Message>({ payments: rows }),
    ]
  );
});
