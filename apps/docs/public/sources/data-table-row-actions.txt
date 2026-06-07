import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as DataTable from "../../ui/data-table";

// MODEL
export const Model = S.Struct({ status: S.String });
export type Model = typeof Model.Type;
// MESSAGE
export const ClickedOpenActions = m("ClickedOpenActions", { email: S.String });
export const Message = S.Union([ClickedOpenActions]);
export type Message = typeof Message.Type;
// INIT
export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ status: "No row action selected." }, []];
// UPDATE
export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedOpenActions: ({ email }) => [
        evo(model, { status: () => `Opened actions for ${email}.` }),
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
      h.p([h.Class("text-sm text-gray-600")], [model.status]),
      DataTable.paymentsTableView<Message>({
        payments: DataTable.payments.slice(0, 5),
        actionView: (payment) =>
          h.button(
            [
              h.Type("button"),
              h.AriaLabel(`Open menu for ${payment.email}`),
              h.Class(DataTable.dataTableButtonClassName),
              h.OnClick(ClickedOpenActions({ email: payment.email })),
            ],
            ["Open menu"]
          ),
      }),
    ]
  );
});
