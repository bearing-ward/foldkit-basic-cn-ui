import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Fieldset from "../../ui/base-ui-fieldset";

// MODEL

export const Model = S.Struct({
  company: S.String,
  taxId: S.String,
});

export type Model = typeof Model.Type;

// MESSAGE

export const UpdatedCompany = m("UpdatedCompany", { value: S.String });
export const UpdatedTaxId = m("UpdatedTaxId", { value: S.String });

export const Message = S.Union([UpdatedCompany, UpdatedTaxId]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ company: "", taxId: "" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      UpdatedCompany: ({ value }) => [evo(model, { company: () => value }), []],
      UpdatedTaxId: ({ value }) => [evo(model, { taxId: () => value }), []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return Fieldset.view<Message>({
    id: "billing-fieldset",
    toView: (attributes) =>
      h.fieldset(
        [...attributes.fieldset, h.Class(Fieldset.baseUiFieldsetRootClassName)],
        [
          h.legend(
            [
              ...attributes.legend,
              h.Class(Fieldset.baseUiFieldsetLegendClassName),
            ],
            ["Billing details"]
          ),
          h.p(
            [
              ...attributes.description,
              h.Class(Fieldset.baseUiFieldsetDescriptionClassName),
            ],
            ["Add your company details for invoices and receipts."]
          ),
          h.div(
            [h.Class(Fieldset.baseUiFieldsetFieldsClassName)],
            [
              h.label(
                [h.Class(Fieldset.baseUiFieldsetFieldClassName)],
                [
                  h.span(
                    [h.Class(Fieldset.baseUiFieldsetLabelClassName)],
                    ["Company"]
                  ),
                  h.input([
                    h.AriaLabel("Company"),
                    h.Value(model.company),
                    h.Placeholder("Acme Inc."),
                    h.OnInput((value) => UpdatedCompany({ value })),
                    h.Class(Fieldset.baseUiFieldsetInputClassName),
                  ]),
                ]
              ),
              h.label(
                [h.Class(Fieldset.baseUiFieldsetFieldClassName)],
                [
                  h.span(
                    [h.Class(Fieldset.baseUiFieldsetLabelClassName)],
                    ["Tax ID"]
                  ),
                  h.input([
                    h.AriaLabel("Tax ID"),
                    h.Value(model.taxId),
                    h.Placeholder("US123456789"),
                    h.OnInput((value) => UpdatedTaxId({ value })),
                    h.Class(Fieldset.baseUiFieldsetInputClassName),
                  ]),
                ]
              ),
            ]
          ),
        ]
      ),
  });
});
