import { Match as M, Schema as S } from "effect";
import { Command, Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";
import { describe, test } from "vitest";

import * as Switch from "./index";

const GotSwitchMessage = m("GotSwitchMessage", {
  message: Switch.Message,
});

const Model = S.Struct({
  switchModel: Switch.Model,
});

type Model = typeof Model.Type;

const Message = S.Union([GotSwitchMessage]);
type Message = typeof Message.Type;

const initialModel: Model = {
  switchModel: Switch.init({ id: "notifications-switch" })[0],
};

const update = (
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

const view = (model: Model): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId: model.switchModel.id,
    model: model.switchModel,
    view: Switch.view,
    viewInputs: {
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
                  ["Enable notifications"]
                ),
                h.p(
                  [
                    ...attributes.description,
                    h.Class(Switch.switchDescriptionClassName),
                  ],
                  ["Get notified when something important happens."]
                ),
              ]
            ),
          ]
        ),
    },
    toParentMessage: (message) => GotSwitchMessage({ message }),
  });
};

const disabledView = (model: Model): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId: "disabled-switch",
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
              [Switch.switchKnob(false)]
            ),
            h.label(attributes.label, ["Locked notifications"]),
          ]
        ),
    },
    toParentMessage: (message) => GotSwitchMessage({ message }),
  });
};

describe("Switch registry view", () => {
  test("renders label, description, and toggles checked state", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.expect(
        Scene.role("switch", { name: "Enable notifications" })
      ).toExist(),
      Scene.expect(
        Scene.text("Get notified when something important happens.")
      ).toExist(),
      Scene.expect(
        Scene.role("switch", { name: "Enable notifications" })
      ).not.toBeChecked(),
      Scene.click(Scene.role("switch", { name: "Enable notifications" })),
      Scene.expect(
        Scene.role("switch", { name: "Enable notifications" })
      ).toBeChecked()
    );
  });

  test("supports disabled switch state", () => {
    Scene.scene(
      { update, view: disabledView },
      Scene.with(initialModel),
      Scene.expect(
        Scene.role("switch", { name: "Locked notifications" })
      ).toBeDisabled()
    );
  });
});
