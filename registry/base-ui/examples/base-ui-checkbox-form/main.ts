import { Match as M, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Checkbox from "../../ui/base-ui-checkbox";

// MODEL

export const Model = S.Struct({
  checkbox: Checkbox.Model,
});

export type Model = typeof Model.Type;

// MESSAGE

export const GotCheckboxMessage = m("GotCheckboxMessage", {
  message: Checkbox.Message,
});

export const Message = S.Union([GotCheckboxMessage]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => {
  const [checkbox, checkboxCommands] = Checkbox.init({
    id: "stay-logged-in",
    isChecked: false,
  });

  return [
    { checkbox },
    Command.mapMessages(checkboxCommands, (message) =>
      GotCheckboxMessage({ message })
    ),
  ];
};

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      GotCheckboxMessage: ({ message }) => {
        const [checkbox, checkboxCommands] = Checkbox.update(
          model.checkbox,
          message
        );

        return [
          evo(model, { checkbox: () => checkbox }),
          Command.mapMessages(checkboxCommands, (message) =>
            GotCheckboxMessage({ message })
          ),
        ];
      },
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.form(
    [h.Class("w-full max-w-sm")],
    [
      h.submodel({
        slotId: model.checkbox.id,
        model: model.checkbox,
        view: Checkbox.view,
        viewInputs: {
          name: "stayLoggedIn",
          value: "yes",
          toView: (attributes) =>
            h.label(
              [h.Class(Checkbox.baseUiCheckboxRowClasses)],
              [
                h.button(
                  [
                    ...attributes.checkbox,
                    h.Class(Checkbox.baseUiCheckboxControlClasses),
                    h.AriaLabel("Stay logged in for 7 days"),
                  ],
                  model.checkbox.isChecked ? ["✓"] : []
                ),
                h.input(attributes.hiddenInput),
                h.span(
                  [
                    ...attributes.label,
                    h.Class(Checkbox.baseUiCheckboxLabelClasses),
                  ],
                  ["Stay logged in for 7 days"]
                ),
              ]
            ),
        },
        toParentMessage: (message) => GotCheckboxMessage({ message }),
      }),
    ]
  );
});
