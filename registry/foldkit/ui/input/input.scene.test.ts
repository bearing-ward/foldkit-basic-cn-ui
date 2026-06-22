import { Schema as S } from "effect";
import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { describe, test } from "vitest";

import * as Input from "./index";

const UpdatedName = m("UpdatedName", { value: S.String });

interface Model {
  readonly value: string;
}

type Message = typeof UpdatedName.Type;

const initialModel: Model = { value: "" };

const update = (model: Model, message: Message): readonly [Model, []] => [
  { value: message.value },
  [],
];

const view = (model: Model): Html => {
  const h = html<Message>();

  return Input.view<Message>({
    id: "name-input",
    value: model.value,
    placeholder: "Enter your full name",
    onInput: (value) => UpdatedName({ value }),
    toView: (attributes) =>
      h.div(
        [h.Class(Input.fieldClasses)],
        [
          h.label(
            [...attributes.label, h.Class(Input.labelClasses)],
            ["Name"]
          ),
          h.input([...attributes.input, h.Class(Input.inputClasses)]),
          h.p(
            [...attributes.description, h.Class(Input.descriptionClasses)],
            ["As it appears on your government-issued ID."]
          ),
        ]
      ),
  });
};

const disabledView = (): Html => {
  const h = html<Message>();

  return Input.view<Message>({
    id: "disabled-name-input",
    value: "Ada Lovelace",
    isDisabled: true,
    toView: (attributes) =>
      h.div(
        [h.Class(Input.fieldClasses)],
        [
          h.label(
            [...attributes.label, h.Class(Input.labelClasses)],
            ["Disabled name"]
          ),
          h.input([...attributes.input, h.Class(Input.inputClasses)]),
          h.p(
            [...attributes.description, h.Class(Input.descriptionClasses)],
            ["This input is disabled."]
          ),
        ]
      ),
  });
};

describe("Input registry view", () => {
  test("renders label, description, placeholder, and input messages", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.expect(Scene.role("textbox", { name: "Name" })).toExist(),
      Scene.expect(
        Scene.text("As it appears on your government-issued ID.")
      ).toExist(),
      Scene.type(Scene.role("textbox", { name: "Name" }), "Ada Lovelace"),
      Scene.expect(Scene.role("textbox", { name: "Name" })).toHaveValue(
        "Ada Lovelace"
      )
    );
  });

  test("supports disabled native input state", () => {
    Scene.scene(
      { update, view: disabledView },
      Scene.with(initialModel),
      Scene.expect(
        Scene.role("textbox", { name: "Disabled name" })
      ).toBeDisabled()
    );
  });
});
