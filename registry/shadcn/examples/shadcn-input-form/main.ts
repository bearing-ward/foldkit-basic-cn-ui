import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Input from "../../ui/shadcn-input";

// MODEL

export const Model = S.Struct({
  name: S.String,
  email: S.String,
  phone: S.String,
  country: S.String,
  address: S.String,
});
export type Model = typeof Model.Type;

// MESSAGE

export const UpdatedName = m("UpdatedName", { value: S.String });
export const UpdatedEmail = m("UpdatedEmail", { value: S.String });
export const UpdatedPhone = m("UpdatedPhone", { value: S.String });
export const UpdatedCountry = m("UpdatedCountry", { value: S.String });
export const UpdatedAddress = m("UpdatedAddress", { value: S.String });

export const Message = S.Union([
  UpdatedName,
  UpdatedEmail,
  UpdatedPhone,
  UpdatedCountry,
  UpdatedAddress,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [
  {
    name: "",
    email: "",
    phone: "",
    country: "",
    address: "",
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
      UpdatedName: ({ value }) => [evo(model, { name: () => value }), []],
      UpdatedEmail: ({ value }) => [evo(model, { email: () => value }), []],
      UpdatedPhone: ({ value }) => [evo(model, { phone: () => value }), []],
      UpdatedCountry: ({ value }) => [evo(model, { country: () => value }), []],
      UpdatedAddress: ({ value }) => [evo(model, { address: () => value }), []],
    })
  );

// VIEW

const primaryButtonClassName =
  "inline-flex h-9 items-center justify-center rounded-md bg-gray-950 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-950";

const secondaryButtonClassName =
  "inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 text-sm font-medium text-gray-950 shadow-sm hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400";

const field = (
  h: ReturnType<typeof html<Message>>,
  config: Readonly<{
    id: string;
    label: string;
    value: string;
    onInput: (value: string) => Message;
    description?: string | undefined;
    type?: string | undefined;
    required?: boolean | undefined;
    labelAddon?: Html | undefined;
  }>
): Html =>
  h.div(
    [h.Class(Input.shadcnInputFieldClassName)],
    [
      h.label(
        [
          h.Attribute("for", config.id),
          h.Class(`${Input.shadcnInputLabelClassName} flex items-center gap-2`),
        ],
        [
          config.label,
          ...(config.labelAddon === undefined ? [] : [config.labelAddon]),
        ]
      ),
      h.input([
        h.Id(config.id),
        h.Type(config.type ?? "text"),
        h.Value(config.value),
        h.OnInput(config.onInput),
        h.AriaLabel(config.label),
        ...(config.required === true ? [h.Required(true)] : []),
        ...(config.description === undefined
          ? []
          : [h.Attribute("aria-describedby", `${config.id}-description`)]),
        h.Class(Input.shadcnInputClassName),
      ]),
      ...(config.description === undefined
        ? []
        : [
            h.p(
              [
                h.Id(`${config.id}-description`),
                h.Class(Input.shadcnInputDescriptionClassName),
              ],
              [config.description]
            ),
          ]),
    ]
  );

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.form(
    [h.Class("grid w-full max-w-md gap-4")],
    [
      field(h, {
        id: "form-name",
        label: "Name",
        value: model.name,
        onInput: (value) => UpdatedName({ value }),
      }),
      field(h, {
        id: "form-email",
        label: "Email",
        value: model.email,
        onInput: (value) => UpdatedEmail({ value }),
        description: "We'll never share your email with anyone.",
        type: "email",
      }),
      field(h, {
        id: "phone",
        label: "Phone",
        value: model.phone,
        onInput: (value) => UpdatedPhone({ value }),
        type: "tel",
      }),
      field(h, {
        id: "country",
        label: "Country",
        value: model.country,
        onInput: (value) => UpdatedCountry({ value }),
      }),
      field(h, {
        id: "address",
        label: "Address",
        value: model.address,
        onInput: (value) => UpdatedAddress({ value }),
      }),
      h.div(
        [h.Class("flex gap-2")],
        [
          h.button(
            [h.Type("button"), h.Class(secondaryButtonClassName)],
            ["Cancel"]
          ),
          h.button(
            [h.Type("submit"), h.Class(primaryButtonClassName)],
            ["Submit"]
          ),
        ]
      ),
    ]
  );
});
