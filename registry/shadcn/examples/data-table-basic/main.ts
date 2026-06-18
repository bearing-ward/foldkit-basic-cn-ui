import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { m } from "foldkit/message";

import * as DataTable from "../../ui/data-table";

// MODEL
export const Model = S.Struct({});
export type Model = typeof Model.Type;
// MESSAGE
export const Message = m("Message");
export type Message = typeof Message.Type;
// INIT
export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{}, []];
// UPDATE
export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      Message: () => [model, []],
    })
  );

// VIEW
export const view = Submodel.defineView<Model, Message>(
  (): Html =>
    DataTable.paymentsTableView<Message>({
      payments: DataTable.payments.slice(0, 5),
    })
);
