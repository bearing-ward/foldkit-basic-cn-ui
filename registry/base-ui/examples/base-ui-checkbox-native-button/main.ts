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
    id: "notifications-checkbox",
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

  return h.submodel({
    slotId: model.checkbox.id,
    model: model.checkbox,
    view: Checkbox.view,
    viewInputs: {
      name: "notifications",
      value: "enabled",
      toView: (attributes) =>
        h.div(
          [h.Class("flex items-center gap-3")],
          [
            h.label(
              [
                h.For("notifications-checkbox"),
                h.Class(Checkbox.baseUiCheckboxLabelClasses),
              ],
              ["Enable notifications"]
            ),
            h.button(
              [
                ...attributes.checkbox,
                h.Id("notifications-checkbox"),
                h.Class(Checkbox.baseUiCheckboxControlClasses),
                h.AriaLabel("Enable notifications"),
              ],
              model.checkbox.isChecked ? ["✓"] : []
            ),
            h.input(attributes.hiddenInput),
          ]
        ),
    },
    toParentMessage: (message) => GotCheckboxMessage({ message }),
  });
});
