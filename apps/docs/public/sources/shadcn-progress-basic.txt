import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";

import * as Progress from "../../ui/shadcn-progress";

// MODEL

export const Model = S.Struct({
  value: S.Number,
});

export type Model = typeof Model.Type;

// MESSAGE

export const Message = m("Message");

export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ value: 66 }, []];

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

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("w-[60%]")],
    [
      Progress.rootView<Message>({
        value: model.value,
        children: [
          Progress.trackView<Message>({
            children: [
              Progress.indicatorView<Message>({
                value: model.value,
              }),
            ],
          }),
        ],
      }),
    ]
  );
});
