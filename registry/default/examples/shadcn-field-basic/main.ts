import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Field from "../../ui/shadcn-field";

// MODEL

export const Model = S.Struct({
  nameOnCard: S.String,
  cardNumber: S.String,
  month: S.String,
  year: S.String,
  cvv: S.String,
  billingAddress: S.String,
  sameAsShipping: S.Boolean,
  comments: S.String,
});

export type Model = typeof Model.Type;

// MESSAGE

export const UpdatedNameOnCard = m("UpdatedNameOnCard", { value: S.String });
export const UpdatedCardNumber = m("UpdatedCardNumber", { value: S.String });
export const UpdatedMonth = m("UpdatedMonth", { value: S.String });
export const UpdatedYear = m("UpdatedYear", { value: S.String });
export const UpdatedCvv = m("UpdatedCvv", { value: S.String });
export const UpdatedBillingAddress = m("UpdatedBillingAddress", {
  value: S.String,
});
export const ToggledSameAsShipping = m("ToggledSameAsShipping");
export const UpdatedComments = m("UpdatedComments", { value: S.String });

export const Message = S.Union([
  UpdatedNameOnCard,
  UpdatedCardNumber,
  UpdatedMonth,
  UpdatedYear,
  UpdatedCvv,
  UpdatedBillingAddress,
  ToggledSameAsShipping,
  UpdatedComments,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [
  {
    nameOnCard: "",
    cardNumber: "",
    month: "",
    year: "",
    cvv: "",
    billingAddress: "",
    sameAsShipping: false,
    comments: "",
  },
  [],
];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      UpdatedNameOnCard: ({ value }) => [
        evo(model, { nameOnCard: () => value }),
        [],
      ],
      UpdatedCardNumber: ({ value }) => [
        evo(model, { cardNumber: () => value }),
        [],
      ],
      UpdatedMonth: ({ value }) => [evo(model, { month: () => value }), []],
      UpdatedYear: ({ value }) => [evo(model, { year: () => value }), []],
      UpdatedCvv: ({ value }) => [evo(model, { cvv: () => value }), []],
      UpdatedBillingAddress: ({ value }) => [
        evo(model, { billingAddress: () => value }),
        [],
      ],
      ToggledSameAsShipping: () => [
        evo(model, { sameAsShipping: (value) => !value }),
        [],
      ],
      UpdatedComments: ({ value }) => [
        evo(model, { comments: () => value }),
        [],
      ],
    })
  );

// VIEW

const formClassName =
  "w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm";

const fieldSetClassName = "space-y-6";

const fieldLegendClassName = "text-lg font-semibold text-gray-950";

const fieldGroupClassName = "grid gap-4";

const rowClassName = "grid grid-cols-3 gap-3";

const buttonClassName =
  "inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2";

const primaryButtonClassName = `${buttonClassName} bg-gray-950 text-white hover:bg-gray-800 focus-visible:outline-gray-950`;

const secondaryButtonClassName = `${buttonClassName} border border-gray-200 bg-white text-gray-950 hover:bg-gray-50 focus-visible:outline-gray-400`;

const textAreaClassName =
  "min-h-20 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-950 shadow-sm outline-none transition-colors placeholder:text-gray-400 focus:border-accent-600 focus:ring-2 focus:ring-accent-100";

const checkboxClassName =
  "mt-0.5 size-4 rounded border border-gray-300 accent-gray-950";

const inputField = (
  h: ReturnType<typeof html<Message>>,
  config: Readonly<{
    id: string;
    label: string;
    value: string;
    onInput: (value: string) => Message;
    placeholder?: string | undefined;
    description?: string | undefined;
    type?: string | undefined;
    className?: string | undefined;
  }>
): Html =>
  Field.rootView<Message>({
    name: config.id,
    className: config.className,
    filled: config.value !== "",
    children: [
      Field.labelView<Message>({
        forId: config.id,
        children: [h.span([], [config.label])],
      }),
      Field.controlView<Message>({
        id: config.id,
        ariaLabel: config.label,
        name: config.id,
        value: config.value,
        onInput: config.onInput,
        placeholder: config.placeholder,
        type: config.type,
        filled: config.value !== "",
        describedByIds:
          config.description === undefined ? [] : [`${config.id}-description`],
      }),
      ...(config.description === undefined
        ? []
        : [
            Field.descriptionView<Message>({
              id: `${config.id}-description`,
              children: [h.span([], [config.description])],
            }),
          ]),
    ],
  });

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-8")],
    [
      h.form(
        [h.Class(formClassName)],
        [
          h.fieldset(
            [h.Class(fieldSetClassName)],
            [
              h.div(
                [h.Class("space-y-1")],
                [
                  h.legend([h.Class(fieldLegendClassName)], ["Payment Method"]),
                  Field.descriptionView<Message>({
                    children: [
                      h.span([], ["All transactions are secure and encrypted"]),
                    ],
                  }),
                ]
              ),
              h.div(
                [h.Class(fieldGroupClassName)],
                [
                  inputField(h, {
                    id: "name-on-card",
                    label: "Name on Card",
                    value: model.nameOnCard,
                    onInput: (value) => UpdatedNameOnCard({ value }),
                  }),
                  inputField(h, {
                    id: "card-number",
                    label: "Card Number",
                    value: model.cardNumber,
                    onInput: (value) => UpdatedCardNumber({ value }),
                    description: "Enter your 16-digit card number",
                    type: "text",
                  }),
                  h.div(
                    [h.Class(rowClassName)],
                    [
                      inputField(h, {
                        id: "month",
                        label: "Month",
                        value: model.month,
                        onInput: (value) => UpdatedMonth({ value }),
                        placeholder: "MM",
                      }),
                      inputField(h, {
                        id: "year",
                        label: "Year",
                        value: model.year,
                        onInput: (value) => UpdatedYear({ value }),
                        placeholder: "YYYY",
                      }),
                      inputField(h, {
                        id: "cvv",
                        label: "CVV",
                        value: model.cvv,
                        onInput: (value) => UpdatedCvv({ value }),
                      }),
                    ]
                  ),
                  inputField(h, {
                    id: "billing-address",
                    label: "Billing Address",
                    value: model.billingAddress,
                    onInput: (value) => UpdatedBillingAddress({ value }),
                    description:
                      "The billing address associated with your payment method",
                  }),
                  Field.rootView<Message>({
                    name: "same-as-shipping",
                    className: "flex max-w-none flex-row items-start gap-3",
                    filled: model.sameAsShipping,
                    children: [
                      h.input([
                        h.Id("same-as-shipping"),
                        h.Type("checkbox"),
                        h.Checked(model.sameAsShipping),
                        h.OnClick(ToggledSameAsShipping()),
                        h.Class(checkboxClassName),
                      ]),
                      h.label(
                        [
                          h.Attribute("for", "same-as-shipping"),
                          h.OnClick(ToggledSameAsShipping()),
                          h.Class(
                            "cursor-pointer text-sm font-medium text-gray-950"
                          ),
                        ],
                        ["Same as shipping address"]
                      ),
                    ],
                  }),
                  Field.rootView<Message>({
                    name: "comments",
                    className: "max-w-none",
                    filled: model.comments !== "",
                    children: [
                      Field.labelView<Message>({
                        forId: "comments",
                        children: [h.span([], ["Comments"])],
                      }),
                      h.textarea(
                        [
                          h.Id("comments"),
                          h.Attribute("name", "comments"),
                          h.AriaLabel("Comments"),
                          h.Value(model.comments),
                          h.OnInput((value) => UpdatedComments({ value })),
                          h.Class(textAreaClassName),
                        ],
                        []
                      ),
                    ],
                  }),
                ],
              ),
              h.div(
                [h.Class("flex justify-end gap-2")],
                [
                  h.button(
                    [h.Type("submit"), h.Class(primaryButtonClassName)],
                    ["Submit"]
                  ),
                  h.button(
                    [h.Type("button"), h.Class(secondaryButtonClassName)],
                    ["Cancel"]
                  ),
                ]
              ),
            ]
          ),
        ]
      ),
      h.section(
        [h.Class("grid gap-4 rounded-xl border border-gray-200 bg-white p-6")],
        [
          h.h2([h.Class("text-lg font-semibold text-gray-950")], [
            "Additional Field Examples",
          ]),
          h.div(
            [h.Class("grid gap-4 md:grid-cols-2")],
            [
              inputField(h, {
                id: "email-field",
                label: "Input",
                value: "m@example.com",
                onInput: () => UpdatedNameOnCard({ value: model.nameOnCard }),
                description: "Enter your email address.",
              }),
              Field.rootView<Message>({
                name: "textarea-field",
                filled: true,
                children: [
                  Field.labelView<Message>({
                    forId: "textarea-field",
                    children: [h.span([], ["Textarea"])],
                  }),
                  h.textarea(
                    [
                      h.Id("textarea-field"),
                      h.AriaLabel("Textarea"),
                      h.Value("Tell us about your project."),
                      h.Class(textAreaClassName),
                    ],
                    []
                  ),
                ],
              }),
              Field.rootView<Message>({
                name: "select-field",
                filled: true,
                children: [
                  Field.labelView<Message>({
                    forId: "select-field",
                    children: [h.span([], ["Select"])],
                  }),
                  h.div(
                    [
                      h.Id("select-field"),
                      h.Attribute("role", "combobox"),
                      h.AriaLabel("Select"),
                      h.Class(Field.shadcnFieldControlClassName),
                    ],
                    ["Select a verified email"]
                  ),
                ],
              }),
              Field.rootView<Message>({
                name: "slider-field",
                filled: true,
                children: [
                  Field.labelView<Message>({
                    forId: "slider-field",
                    children: [h.span([], ["Slider"])],
                  }),
                  h.div(
                    [
                      h.Id("slider-field"),
                      h.Attribute("role", "slider"),
                      h.AriaLabel("Slider"),
                      h.Attribute("aria-valuemin", "0"),
                      h.Attribute("aria-valuemax", "100"),
                      h.Attribute("aria-valuenow", "50"),
                      h.Class("h-2 rounded-full bg-gray-950"),
                    ],
                    []
                  ),
                ],
              }),
              h.fieldset(
                [h.Class("space-y-2 rounded-md border border-gray-200 p-3")],
                [
                  h.legend([h.Class("text-sm font-medium text-gray-950")], [
                    "Fieldset",
                  ]),
                  h.label([h.Class("flex items-center gap-2 text-sm")], [
                    h.input([h.Type("checkbox"), h.Checked(true)]),
                    "Checkbox",
                  ]),
                  h.label([h.Class("flex items-center gap-2 text-sm")], [
                    h.input([
                      h.Type("radio"),
                      h.Name("field-radio"),
                      h.Checked(true),
                    ]),
                    "Radio",
                  ]),
                  h.label([h.Class("flex items-center gap-2 text-sm")], [
                    h.input([
                      h.Type("checkbox"),
                      h.Attribute("role", "switch"),
                    ]),
                    "Switch",
                  ]),
                ]
              ),
              h.div(
                [
                  h.Class(
                    "rounded-md border border-gray-200 p-3 text-sm text-gray-700"
                  ),
                ],
                [
                  h.div([h.Class("font-medium text-gray-950")], [
                    "Choice Card",
                  ]),
                  h.p([], ["Notify me about security alerts"]),
                ]
              ),
              h.div([h.Class("grid gap-2")], [
                h.div([h.Class("text-sm font-medium text-gray-950")], [
                  "Field Group",
                ]),
                h.div([h.Class("grid gap-2 md:grid-cols-2")], [
                  h.input([
                    h.AriaLabel("First name"),
                    h.Value("Ada"),
                    h.Class(Field.shadcnFieldControlClassName),
                  ]),
                  h.input([
                    h.AriaLabel("Last name"),
                    h.Value("Lovelace"),
                    h.Class(Field.shadcnFieldControlClassName),
                  ]),
                ]),
              ]),
              h.div([h.Class("grid gap-2")], [
                h.div([h.Class("text-sm font-medium text-gray-950")], [
                  "Responsive",
                ]),
                h.div([h.Class("grid gap-2 sm:grid-cols-2")], [
                  h.input([
                    h.AriaLabel("Responsive city"),
                    h.Value("London"),
                    h.Class(Field.shadcnFieldControlClassName),
                  ]),
                  h.input([
                    h.AriaLabel("Responsive postal code"),
                    h.Value("SW1A"),
                    h.Class(Field.shadcnFieldControlClassName),
                  ]),
                ]),
              ]),
              Field.rootView<Message>({
                name: "error-field",
                invalid: true,
                filled: true,
                children: [
                  Field.labelView<Message>({
                    forId: "error-field",
                    children: [h.span([], ["Error"])],
                  }),
                  Field.controlView<Message>({
                    id: "error-field",
                    ariaLabel: "Error",
                    value: "not-an-email",
                    invalid: true,
                    onInput: () =>
                      UpdatedNameOnCard({ value: model.nameOnCard }),
                  }),
                  Field.errorView<Message>({
                    show: true,
                    children: [h.span([], ["Enter a valid email address."])],
                  }),
                ],
              }),
              h.div([h.Attribute("dir", "rtl"), h.Class("grid gap-2")], [
                h.div([h.Class("text-sm font-medium text-gray-950")], ["RTL"]),
                h.input([
                  h.AriaLabel("البريد الإلكتروني"),
                  h.Value("user@example.com"),
                  h.Class(Field.shadcnFieldControlClassName),
                ]),
              ]),
            ]
          ),
        ]
      ),
    ]
  );
});
