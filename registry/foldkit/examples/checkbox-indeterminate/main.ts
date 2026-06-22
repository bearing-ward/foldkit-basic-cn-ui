import { Match as M, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Checkbox from "../../ui/checkbox";

// MODEL

export const Model = S.Struct({
  emailCheckbox: Checkbox.Model,
  pushCheckbox: Checkbox.Model,
});

export type Model = typeof Model.Type;

// MESSAGE

export const GotAllCheckboxMessage = m("GotAllCheckboxMessage", {
  message: Checkbox.Message,
});
export const GotEmailCheckboxMessage = m("GotEmailCheckboxMessage", {
  message: Checkbox.Message,
});
export const GotPushCheckboxMessage = m("GotPushCheckboxMessage", {
  message: Checkbox.Message,
});

export const Message = S.Union([
  GotAllCheckboxMessage,
  GotEmailCheckboxMessage,
  GotPushCheckboxMessage,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => {
  const [emailCheckbox, emailCommands] = Checkbox.init({
    id: "checkbox-email",
    isChecked: true,
  });
  const [pushCheckbox, pushCommands] = Checkbox.init({
    id: "checkbox-push",
  });

  return [
    { emailCheckbox, pushCheckbox },
    [
      ...Command.mapMessages(emailCommands, (message) =>
        GotEmailCheckboxMessage({ message })
      ),
      ...Command.mapMessages(pushCommands, (message) =>
        GotPushCheckboxMessage({ message })
      ),
    ],
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
      GotAllCheckboxMessage: () => {
        const isAllChecked =
          model.emailCheckbox.isChecked && model.pushCheckbox.isChecked;
        const nextChecked = !isAllChecked;
        const [emailCheckbox] = Checkbox.setChecked(
          model.emailCheckbox,
          nextChecked
        );
        const [pushCheckbox] = Checkbox.setChecked(
          model.pushCheckbox,
          nextChecked
        );

        return [
          evo(model, {
            emailCheckbox: () => emailCheckbox,
            pushCheckbox: () => pushCheckbox,
          }),
          [],
        ];
      },
      GotEmailCheckboxMessage: ({ message }) => {
        const [emailCheckbox, emailCommands] = Checkbox.update(
          model.emailCheckbox,
          message
        );

        return [
          evo(model, { emailCheckbox: () => emailCheckbox }),
          Command.mapMessages(emailCommands, (message) =>
            GotEmailCheckboxMessage({ message })
          ),
        ];
      },
      GotPushCheckboxMessage: ({ message }) => {
        const [pushCheckbox, pushCommands] = Checkbox.update(
          model.pushCheckbox,
          message
        );

        return [
          evo(model, { pushCheckbox: () => pushCheckbox }),
          Command.mapMessages(pushCommands, (message) =>
            GotPushCheckboxMessage({ message })
          ),
        ];
      },
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const isAllChecked =
    model.emailCheckbox.isChecked && model.pushCheckbox.isChecked;
  const isIndeterminate =
    model.emailCheckbox.isChecked !== model.pushCheckbox.isChecked;
  const allMark = isIndeterminate ? "—" : isAllChecked ? "✓" : "";

  const optionView = (
    checkbox: Checkbox.Model,
    label: string,
    toParentMessage: (message: Checkbox.Message) => Message
  ) =>
    h.submodel({
      slotId: checkbox.id,
      model: checkbox,
      view: Checkbox.view,
      viewInputs: {
        toView: (attributes) =>
          h.div(
            [h.Class(Checkbox.checkboxRowClasses)],
            [
              h.button(
                [
                  ...attributes.checkbox,
                  h.Class(Checkbox.checkboxControlClasses),
                ],
                checkbox.isChecked ? ["✓"] : []
              ),
              h.label(
                [...attributes.label, h.Class(Checkbox.checkboxLabelClasses)],
                [label]
              ),
            ]
          ),
      },
      toParentMessage,
    });

  return h.div(
    [h.Class("space-y-3")],
    [
      h.submodel({
        slotId: "checkbox-all",
        model: { id: "checkbox-all", isChecked: isAllChecked },
        view: Checkbox.view,
        viewInputs: {
          isIndeterminate,
          toView: (attributes) =>
            h.div(
              [h.Class(Checkbox.checkboxRowClasses)],
              [
                h.button(
                  [
                    ...attributes.checkbox,
                    h.Class(Checkbox.checkboxControlClasses),
                  ],
                  allMark === "" ? [] : [allMark]
                ),
                h.label(
                  [
                    ...attributes.label,
                    h.Class(Checkbox.checkboxLabelClasses),
                  ],
                  ["All notification channels"]
                ),
              ]
            ),
        },
        toParentMessage: (message) => GotAllCheckboxMessage({ message }),
      }),
      h.div(
        [h.Class("ml-8 space-y-3")],
        [
          optionView(model.emailCheckbox, "Email notifications", (message) =>
            GotEmailCheckboxMessage({ message })
          ),
          optionView(model.pushCheckbox, "Push notifications", (message) =>
            GotPushCheckboxMessage({ message })
          ),
        ]
      ),
      h.p(
        [h.Class("text-sm text-gray-700")],
        [
          `Selected channels: ${[
            model.emailCheckbox.isChecked,
            model.pushCheckbox.isChecked,
          ]
            .filter(Boolean)
            .length.toString()}`,
        ]
      ),
    ]
  );
});
