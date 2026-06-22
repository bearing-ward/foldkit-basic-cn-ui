import { Schema as S } from "effect";
import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { describe, test } from "vitest";

import * as Textarea from "./index";

const UpdatedBio = m("UpdatedBio", { value: S.String });

interface Model {
  readonly value: string;
}

type Message = typeof UpdatedBio.Type;

const initialModel: Model = { value: "" };

const update = (model: Model, message: Message): readonly [Model, []] => [
  { value: message.value },
  [],
];

const view = (model: Model): Html => {
  const h = html<Message>();

  return Textarea.view<Message>({
    id: "bio-textarea",
    value: model.value,
    rows: 4,
    placeholder: "Tell us about yourself...",
    onInput: (value) => UpdatedBio({ value }),
    toView: (attributes) =>
      h.div(
        [h.Class(Textarea.fieldClasses)],
        [
          h.label(attributes.label, ["Bio"]),
          h.textarea(
            [
              ...attributes.textarea,
              h.Class(Textarea.textareaClasses),
              h.AriaLabel("Bio"),
            ],
            []
          ),
          h.p(attributes.description, ["A brief introduction about yourself."]),
        ]
      ),
  });
};

const disabledView = (): Html => {
  const h = html<Message>();

  return Textarea.view<Message>({
    id: "disabled-bio-textarea",
    value: "Mathematician and writer.",
    isDisabled: true,
    rows: 3,
    toView: (attributes) =>
      h.div(
        [],
        [
          h.label(attributes.label, ["Disabled bio"]),
          h.textarea(
            [
              ...attributes.textarea,
              h.Class(Textarea.textareaClasses),
              h.AriaLabel("Disabled bio"),
            ],
            []
          ),
          h.p(attributes.description, ["This textarea is disabled."]),
        ]
      ),
  });
};

describe("Textarea registry view", () => {
  test("renders label, description, placeholder, rows, and input messages", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.expect(Scene.role("textbox", { name: "Bio" })).toExist(),
      Scene.expect(
        Scene.text("A brief introduction about yourself.")
      ).toExist(),
      Scene.type(Scene.role("textbox", { name: "Bio" }), "Ada"),
      Scene.expect(Scene.role("textbox", { name: "Bio" })).toHaveValue("Ada")
    );
  });

  test("supports disabled native textarea state", () => {
    Scene.scene(
      { update, view: disabledView },
      Scene.with(initialModel),
      Scene.expect(
        Scene.role("textbox", { name: "Disabled bio" })
      ).toBeDisabled()
    );
  });
});
