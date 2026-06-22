import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";

import * as Fieldset from "../../ui/fieldset";

// MODEL

export const Model = S.Struct({});

export type Model = typeof Model.Type;

// MESSAGE

export const LoadedDisabledFieldset = m("LoadedDisabledFieldset");

export const Message = S.Union([LoadedDisabledFieldset]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{}, []];

// UPDATE

export const update = (
  model: Model,
  _message: Message
): readonly [Model, readonly Command.Command<Message>[]] => [model, []];

// VIEW

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return Fieldset.view<Message>({
    id: "locked-profile-fieldset",
    isDisabled: true,
    toView: (attributes) =>
      h.fieldset(
        [...attributes.fieldset, h.Class(Fieldset.fieldsetClasses)],
        [
          h.legend(
            [...attributes.legend, h.Class(Fieldset.legendClasses)],
            ["Locked profile"]
          ),
          h.p(
            [...attributes.description, h.Class(Fieldset.descriptionClasses)],
            ["Profile fields are disabled while the account is archived."]
          ),
          h.div(
            [h.Class(Fieldset.fieldsClasses)],
            [
              h.label(
                [h.Class(Fieldset.fieldClasses)],
                [
                  h.span([h.Class(Fieldset.labelClasses)], ["Name"]),
                  h.input([
                    h.AriaLabel("Locked name"),
                    h.Disabled(true),
                    h.Value("Ada Lovelace"),
                    h.Class(Fieldset.inputClasses),
                  ]),
                ]
              ),
              h.label(
                [h.Class(Fieldset.fieldClasses)],
                [
                  h.span([h.Class(Fieldset.labelClasses)], ["Bio"]),
                  h.textarea(
                    [
                      h.AriaLabel("Locked bio"),
                      h.Disabled(true),
                      h.Value("Mathematician and writer."),
                      h.Class(Fieldset.textareaClasses),
                    ],
                    []
                  ),
                ]
              ),
            ]
          ),
        ]
      ),
  });
});
