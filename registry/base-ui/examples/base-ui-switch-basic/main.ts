import { Match as M, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Switch from "../../ui/base-ui-switch";

// MODEL

export const Model = S.Struct({
  switchModel: Switch.Model,
});

export type Model = typeof Model.Type;

// MESSAGE

export const GotSwitchMessage = m("GotSwitchMessage", {
  message: Switch.Message,
});

export const Message = S.Union([GotSwitchMessage]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => {
  const [switchModel, switchCommands] = Switch.init({
    id: "switch-basic",
    isChecked: true,
  });

  return [
    { switchModel },
    Command.mapMessages(switchCommands, (message) =>
      GotSwitchMessage({ message })
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
      GotSwitchMessage: ({ message }) => {
        const [switchModel, switchCommands] = Switch.update(
          model.switchModel,
          message
        );

        return [
          evo(model, { switchModel: () => switchModel }),
          Command.mapMessages(switchCommands, (message) =>
            GotSwitchMessage({ message })
          ),
        ];
      },
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-3")],
    [
      h.submodel({
        slotId: model.switchModel.id,
        model: model.switchModel,
        view: Switch.view,
        viewInputs: {
          toView: (attributes) =>
            h.label(
              [h.Class(Switch.baseUiSwitchRowClassName)],
              [
                h.button(
                  [
                    ...attributes.button,
                    h.Class(Switch.baseUiSwitchButtonClassName),
                  ],
                  [Switch.baseUiSwitchKnob(model.switchModel.isChecked)]
                ),
                h.span(
                  [
                    ...attributes.label,
                    h.Class(Switch.baseUiSwitchLabelClassName),
                  ],
                  ["Notifications"]
                ),
              ]
            ),
        },
        toParentMessage: (message) => GotSwitchMessage({ message }),
      }),
    ]
  );
});
