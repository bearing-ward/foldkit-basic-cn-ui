import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Label from "../../ui/label";

// MODEL

export const Model = S.Struct({
  email: S.String,
});

export type Model = typeof Model.Type;

// MESSAGE

export const UpdatedEmail = m("UpdatedEmail", { value: S.String });

export const Message = S.Union([UpdatedEmail]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ email: "" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      UpdatedEmail: ({ value }) => [evo(model, { email: () => value }), []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const inputId = "email";

  return h.div(
    [h.Class("grid w-full max-w-sm gap-3")],
    [
      Label.view<Message>({
        forId: inputId,
        children: "Email",
      }),
      h.input([
        h.Id(inputId),
        h.Type("email"),
        h.Value(model.email),
        h.Placeholder("m@example.com"),
        h.OnInput((value) => UpdatedEmail({ value })),
        h.Class(
          "flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-base text-gray-950 shadow-sm transition-colors placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 md:text-sm"
        ),
      ]),
      h.p(
        [h.Class("text-sm text-gray-600")],
        [`Current value: ${model.email === "" ? "empty" : model.email}`]
      ),
    ]
  );
});
