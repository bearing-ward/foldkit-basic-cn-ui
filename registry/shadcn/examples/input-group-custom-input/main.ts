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
  message: S.String,
  submitted: S.Boolean,
});
export type Model = typeof Model.Type;

// MESSAGE

export const UpdatedMessage = m("UpdatedMessage", { value: S.String });
export const ClickedSubmit = m("ClickedSubmit");
export const Message = S.Union([UpdatedMessage, ClickedSubmit]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ message: "A custom resizable textarea", submitted: false }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      UpdatedMessage: ({ value }) => [
        evo(model, { message: () => value, submitted: () => false }),
        [],
      ],
      ClickedSubmit: () => [evo(model, { submitted: () => true }), []],
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
          h.textarea(
            [
              h.AriaLabel("Custom message"),
              h.DataAttribute("slot", "input-group-control"),
              h.Class(InputGroup.inputGroupTextareaClasses),
              h.Value(model.message),
              h.OnChange((value) => UpdatedMessage({ value })),
              h.Attribute("rows", "4"),
            ],
            []
          ),
          InputGroup.addonView<Message>({
            align: "BlockEnd",
            children: [
              InputGroup.buttonView<Message>({
                onClick: ClickedSubmit(),
                children: ["Submit"],
              }),
            ],
          }),
        ],
      }),
      model.submitted
        ? h.p([h.Class("text-sm text-gray-600")], ["Submitted custom input"])
        : h.empty,
    ]
  );
});
