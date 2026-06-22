import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as InputGroup from "../../ui/input-group";

// MODEL

export const Model = S.Struct({
  body: S.String,
  submitted: S.Boolean,
});
export type Model = typeof Model.Type;

// MESSAGE

export const UpdatedBody = m("UpdatedBody", { value: S.String });
export const ClickedRun = m("ClickedRun");
export const Message = S.Union([UpdatedBody, ClickedRun]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ body: "console.log('Hello, world!')", submitted: false }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      UpdatedBody: ({ value }) => [
        evo(model, { body: () => value, submitted: () => false }),
        [],
      ],
      ClickedRun: () => [evo(model, { submitted: () => true }), []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-3")],
    [
      InputGroup.view<Message>({
        className: "w-full max-w-md flex-wrap items-stretch h-auto",
        children: [
          InputGroup.textareaView<Message>({
            ariaLabel: "Script",
            value: model.body,
            onInput: (value) => UpdatedBody({ value }),
            rows: 5,
          }),
          InputGroup.addonView<Message>({
            align: "BlockStart",
            children: [
              InputGroup.textView<Message>(["Line 1, Column 1"]),
              InputGroup.buttonView<Message>({
                onClick: ClickedRun(),
                children: ["Run"],
              }),
            ],
          }),
          InputGroup.addonView<Message>({
            align: "BlockEnd",
            children: [
              InputGroup.textView<Message>(["script.js"]),
              InputGroup.buttonView<Message>({
                ariaLabel: "Copy script",
                icon: true,
                children: ["C"],
              }),
            ],
          }),
        ],
      }),
      model.submitted
        ? h.p([h.Class("text-sm text-gray-600")], ["Ran script.js"])
        : h.empty,
    ]
  );
});
