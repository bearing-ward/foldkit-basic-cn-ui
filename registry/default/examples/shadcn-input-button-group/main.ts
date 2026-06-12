import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as ButtonGroup from "../../ui/button-group";
import * as Input from "../../ui/shadcn-input";

// MODEL

export const Model = S.Struct({
  search: S.String,
});
export type Model = typeof Model.Type;

// MESSAGE

export const UpdatedSearch = m("UpdatedSearch", { value: S.String });

export const Message = S.Union([UpdatedSearch]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [
  {
    search: "",
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
      UpdatedSearch: ({ value }) => [evo(model, { search: () => value }), []],
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

  return h.div(
    [h.Class("grid w-full max-w-sm gap-2")],
    [
      h.label(
        [
          h.Attribute("for", "button-group-search"),
          h.Class(Input.shadcnInputLabelClassName),
        ],
        ["Search"]
      ),
      ButtonGroup.view<Message>({
        ariaLabel: "Search",
        children: [
          ButtonGroup.itemView<Message>({
            className: "min-w-0 flex-1",
            children: [
              h.input([
                h.Id("button-group-search"),
                h.AriaLabel("Search"),
                h.Placeholder("Search"),
                h.Value(model.search),
                h.OnInput((value) => UpdatedSearch({ value })),
                h.Class(
                  "h-9 min-w-0 border-0 bg-white px-3 text-sm outline-none"
                ),
              ]),
            ],
          }),
          ButtonGroup.itemView<Message>({
            children: [
              h.button(
                [h.Type("button"), h.Class(primaryButtonClassName)],
                ["Search"]
              ),
            ],
          }),
        ],
      }),
    ]
  );
});
