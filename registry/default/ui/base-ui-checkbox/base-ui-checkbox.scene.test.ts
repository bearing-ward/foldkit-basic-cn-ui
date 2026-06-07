import { Match as M, Schema as S } from "effect";
import { Command, Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";
import { describe, test } from "vitest";

import * as Checkbox from "./index";

const GotCheckboxMessage = m("GotCheckboxMessage", {
  message: Checkbox.Message,
});

const Model = S.Struct({
  checkbox: Checkbox.Model,
});

type Model = typeof Model.Type;

const Message = S.Union([GotCheckboxMessage]);
type Message = typeof Message.Type;

const initialModel: Model = {
  checkbox: Checkbox.init({ id: "terms-checkbox" })[0],
};

const update = (
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

const view = (model: Model): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId: model.checkbox.id,
    model: model.checkbox,
    view: Checkbox.view,
    viewInputs: {
      name: "terms",
      value: "accepted",
      toView: (attributes) =>
        h.div(
          [h.Class(Checkbox.baseUiCheckboxRowClassName)],
          [
            h.button(
              [
                ...attributes.checkbox,
                h.Class(Checkbox.baseUiCheckboxControlClassName),
              ],
              model.checkbox.isChecked ? ["✓"] : []
            ),
            h.input(attributes.hiddenInput),
            h.div(
              [h.Class(Checkbox.baseUiCheckboxTextClassName)],
              [
                h.label(
                  [
                    ...attributes.label,
                    h.Class(Checkbox.baseUiCheckboxLabelClassName),
                  ],
                  ["Accept terms"]
                ),
                h.p(
                  [
                    ...attributes.description,
                    h.Class(Checkbox.baseUiCheckboxDescriptionClassName),
                  ],
                  ["You agree to receive product updates."]
                ),
              ]
            ),
          ]
        ),
    },
    toParentMessage: (message) => GotCheckboxMessage({ message }),
  });
};

const disabledView = (model: Model): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId: "disabled-checkbox",
    model: model.checkbox,
    view: Checkbox.view,
    viewInputs: {
      isDisabled: true,
      toView: (attributes) =>
        h.button(
          [
            ...attributes.checkbox,
            h.Class(Checkbox.baseUiCheckboxControlClassName),
          ],
          ["Disabled"]
        ),
    },
    toParentMessage: (message) => GotCheckboxMessage({ message }),
  });
};

describe("Base UI Checkbox registry view", () => {
  test("toggles checked state through the Foldkit primitive", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.expect(Scene.role("checkbox", { name: "Accept terms" })).toExist(),
      Scene.expect(Scene.role("checkbox", { name: "Accept terms" })).toHaveAttr(
        "aria-checked",
        "false"
      ),
      Scene.click(Scene.role("checkbox", { name: "Accept terms" })),
      Scene.expect(Scene.role("checkbox", { name: "Accept terms" })).toHaveAttr(
        "aria-checked",
        "true"
      )
    );
  });

  test("supports disabled state", () => {
    Scene.scene(
      { update, view: disabledView },
      Scene.with(initialModel),
      Scene.expect(Scene.role("checkbox", { name: "Disabled" })).toBeDisabled()
    );
  });
});
