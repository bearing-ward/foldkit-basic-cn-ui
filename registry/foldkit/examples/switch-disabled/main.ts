import { Match as M, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";

import * as Switch from "../../ui/switch";

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
    id: "switch-disabled",
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
      GotSwitchMessage: () => [model, []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId: model.switchModel.id,
    model: model.switchModel,
    view: Switch.view,
    viewInputs: {
      isDisabled: true,
      toView: (attributes) =>
        h.div(
          [h.Class(Switch.switchRowClassName)],
          [
            h.button(
              [...attributes.button, h.Class(Switch.switchButtonClassName)],
              [Switch.switchKnob(model.switchModel.isChecked)]
            ),
            h.div(
              [h.Class(Switch.switchTextClassName)],
              [
                h.label(
                  [...attributes.label, h.Class(Switch.switchLabelClassName)],
                  ["Locked notifications"]
                ),
                h.p(
                  [
                    ...attributes.description,
                    h.Class(Switch.switchDescriptionClassName),
                  ],
                  ["Notification changes are locked."]
                ),
              ]
            ),
          ]
        ),
    },
    toParentMessage: (message) => GotSwitchMessage({ message }),
  });
});
