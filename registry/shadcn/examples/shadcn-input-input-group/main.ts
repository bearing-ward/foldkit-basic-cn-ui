import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as InputGroup from "../../ui/input-group";
import * as Input from "../../ui/shadcn-input";

// MODEL

export const Model = S.Struct({
  websiteUrl: S.String,
});
export type Model = typeof Model.Type;

// MESSAGE

export const UpdatedWebsiteUrl = m("UpdatedWebsiteUrl", { value: S.String });

export const Message = S.Union([UpdatedWebsiteUrl]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [
  {
    websiteUrl: "",
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
      UpdatedWebsiteUrl: ({ value }) => [
        evo(model, { websiteUrl: () => value }),
        [],
      ],
    })
  );

// VIEW

const primaryButtonClasses =
  "inline-flex h-9 items-center justify-center rounded-md bg-gray-950 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-950";

const secondaryButtonClasses =
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
    [h.Class(Input.shadcnInputFieldClasses)],
    [
      h.label(
        [
          h.Attribute("for", config.id),
          h.Class(`${Input.shadcnInputLabelClasses} flex items-center gap-2`),
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
        h.Class(Input.shadcnInputClasses),
      ]),
      ...(config.description === undefined
        ? []
        : [
            h.p(
              [
                h.Id(`${config.id}-description`),
                h.Class(Input.shadcnInputDescriptionClasses),
              ],
              [config.description]
            ),
          ]),
    ]
  );

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("grid w-full max-w-sm gap-2")],
    [
      h.label(
        [
          h.Attribute("for", "website-url"),
          h.Class(Input.shadcnInputLabelClasses),
        ],
        ["Website URL"]
      ),
      InputGroup.view<Message>({
        children: [
          InputGroup.addonView<Message>({
            children: [InputGroup.textView<Message>(["https://"])],
          }),
          h.input([
            h.Id("website-url"),
            h.AriaLabel("Website URL"),
            h.Placeholder("example.com"),
            h.Value(model.websiteUrl),
            h.OnInput((value) => UpdatedWebsiteUrl({ value })),
            h.Class(`${InputGroup.inputGroupControlClasses} pl-1`),
          ]),
        ],
      }),
    ]
  );
});
