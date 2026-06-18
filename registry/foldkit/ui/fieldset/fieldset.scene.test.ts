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
        [...attributes.fieldset, h.Class(Fieldset.fieldsetClassName)],
        [
          h.legend(
            [...attributes.legend, h.Class(Fieldset.legendClassName)],
            ["Account"]
          ),
          h.p(
            [...attributes.description, h.Class(Fieldset.descriptionClassName)],
            ["Configure the public account details."]
          ),
          h.div(
            [h.Class(Fieldset.fieldsClassName)],
            [
              h.label(
                [h.Class(Fieldset.fieldClassName)],
                [
                  h.span([h.Class(Fieldset.labelClassName)], ["Display name"]),
                  h.input([
                    h.AriaLabel("Display name"),
                    h.Placeholder("Ada Lovelace"),
                    h.Class(Fieldset.inputClassName),
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
        [...attributes.fieldset, h.Class(Fieldset.fieldsetClassName)],
        [
          h.legend(
            [...attributes.legend, h.Class(Fieldset.legendClassName)],
            ["Locked account"]
          ),
          h.p(
            [...attributes.description, h.Class(Fieldset.descriptionClassName)],
            ["This group cannot be edited."]
          ),
          h.input([
            h.AriaLabel("Locked display name"),
            h.Disabled(true),
            h.Value("Ada Lovelace"),
            h.Class(Fieldset.inputClassName),
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
