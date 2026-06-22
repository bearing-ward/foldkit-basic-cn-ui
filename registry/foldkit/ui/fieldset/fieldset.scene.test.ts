import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { describe, test } from "vitest";

import * as Fieldset from "./index";

type Model = Readonly<Record<string, never>>;
type Message = never;

const initialModel: Model = {};

const update = (model: Model): readonly [Model, readonly never[]] => [
  model,
  [],
];

const view = (): Html => {
  const h = html<Message>();

  return Fieldset.view<Message>({
    id: "account-fieldset",
    toView: (attributes) =>
      h.fieldset(
        [...attributes.fieldset, h.Class(Fieldset.fieldsetClasses)],
        [
          h.legend(
            [...attributes.legend, h.Class(Fieldset.legendClasses)],
            ["Account"]
          ),
          h.p(
            [...attributes.description, h.Class(Fieldset.descriptionClasses)],
            ["Configure the public account details."]
          ),
          h.div(
            [h.Class(Fieldset.fieldsClasses)],
            [
              h.label(
                [h.Class(Fieldset.fieldClasses)],
                [
                  h.span([h.Class(Fieldset.labelClasses)], ["Display name"]),
                  h.input([
                    h.AriaLabel("Display name"),
                    h.Placeholder("Ada Lovelace"),
                    h.Class(Fieldset.inputClasses),
                  ]),
                ]
              ),
            ]
          ),
        ]
      ),
  });
};

const disabledView = (): Html => {
  const h = html<Message>();

  return Fieldset.view<Message>({
    id: "locked-account-fieldset",
    isDisabled: true,
    toView: (attributes) =>
      h.fieldset(
        [...attributes.fieldset, h.Class(Fieldset.fieldsetClasses)],
        [
          h.legend(
            [...attributes.legend, h.Class(Fieldset.legendClasses)],
            ["Locked account"]
          ),
          h.p(
            [...attributes.description, h.Class(Fieldset.descriptionClasses)],
            ["This group cannot be edited."]
          ),
          h.input([
            h.AriaLabel("Locked display name"),
            h.Disabled(true),
            h.Value("Ada Lovelace"),
            h.Class(Fieldset.inputClasses),
          ]),
        ]
      ),
  });
};

describe("Fieldset registry view", () => {
  test("renders legend, description, and grouped fields", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.expect(Scene.role("group", { name: "Account" })).toExist(),
      Scene.expect(
        Scene.text("Configure the public account details.")
      ).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Display name" })).toExist()
    );
  });

  test("supports disabled fieldset state", () => {
    Scene.scene(
      { update, view: disabledView },
      Scene.with(initialModel),
      Scene.expect(
        Scene.role("group", { name: "Locked account" })
      ).toBeDisabled(),
      Scene.expect(
        Scene.role("textbox", { name: "Locked display name" })
      ).toBeDisabled()
    );
  });
});
