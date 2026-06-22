import { Array, Match as M, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { childAttributes, html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import { defaultAnchor, selectedIcon } from "../../../foldkit/ui/combobox/view";
import * as Combobox from "../../ui/shadcn-combobox";

type Framework = "Next.js" | "SvelteKit" | "Nuxt.js" | "Remix" | "Astro";

const FrameworkCombobox = Combobox.create<Framework>();
const frameworks: readonly Framework[] = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
];

// MODEL

export const Model = S.Struct({
  combobox: Combobox.Model,
});

export type Model = typeof Model.Type;

// MESSAGE

export const GotComboboxMessage = m("GotComboboxMessage", {
  message: Combobox.Message,
});

export const Message = S.Union([GotComboboxMessage]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => {
  const [combobox, comboboxCommands] = Combobox.init({
    id: "combobox-basic",
  });

  return [
    { combobox },
    Command.mapMessages(comboboxCommands, (message) =>
      GotComboboxMessage({ message })
    ),
  ];
};

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      GotComboboxMessage: ({ message }) => {
        const [combobox, comboboxCommands] = FrameworkCombobox.update(
          model.combobox,
          message
        );

        return [
          evo(model, { combobox: () => combobox }),
          Command.mapMessages(comboboxCommands, (message) =>
            GotComboboxMessage({ message })
          ),
        ];
      },
    })
  );

// VIEW

const filterFrameworks = (inputValue: string): readonly Framework[] =>
  inputValue === ""
    ? frameworks
    : Array.filter(frameworks, (framework) =>
        framework.toLowerCase().includes(inputValue.toLowerCase())
      );

const viewInputs = (inputValue: string): Combobox.ViewInputs<Framework> => {
  const h = html<Message>();

  return {
    items: filterFrameworks(inputValue),
    itemToConfig: (framework, context) => ({
      classes: Combobox.shadcnComboboxItemClasses,
      content: h.div(
        [h.Class("flex items-center gap-2")],
        [selectedIcon(context.isSelected), h.span([], [framework])]
      ),
    }),
    itemToValue: (framework) => framework,
    itemToDisplayText: (framework) => framework,
    inputAttributes: childAttributes([
      h.Class(Combobox.shadcnComboboxInputClasses),
      h.Placeholder("Select framework..."),
      h.AriaLabel("Framework"),
    ]),
    inputWrapperAttributes: childAttributes([
      h.Class(Combobox.shadcnComboboxInputWrapperClasses),
    ]),
    itemsAttributes: childAttributes([
      h.Class(Combobox.shadcnComboboxItemsClasses),
    ]),
    backdropAttributes: childAttributes([
      h.Class(Combobox.shadcnComboboxBackdropClasses),
    ]),
    attributes: childAttributes([
      h.Class(Combobox.shadcnComboboxWrapperClasses),
    ]),
    buttonContent: h.span([], ["v"]),
    buttonAttributes: childAttributes([
      h.Class(Combobox.shadcnComboboxButtonClasses),
    ]),
    anchor: defaultAnchor,
  };
};

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-8")],
    [
      h.section(
        [h.Class("space-y-3")],
        [
          h.h3([h.Class("text-base font-semibold text-gray-950")], ["Basic"]),
          h.submodel({
            slotId: model.combobox.id,
            model: model.combobox,
            view: FrameworkCombobox.view,
            viewInputs: viewInputs(model.combobox.inputValue),
            toParentMessage: (message) => GotComboboxMessage({ message }),
          }),
        ]
      ),
      h.section(
        [h.Class("space-y-3")],
        [
          h.h3([h.Class("text-base font-semibold text-gray-950")], [
            "Multiple",
          ]),
          h.div(
            [h.Class("flex flex-wrap gap-2")],
            [
              h.span([h.Class(Combobox.shadcnComboboxTagClasses)], [
                "Next.js",
              ]),
              h.span([h.Class(Combobox.shadcnComboboxTagClasses)], ["Remix"]),
            ]
          ),
          h.div(
            [
              h.Class(
                "rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-500"
              ),
            ],
            ["Select frameworks..."]
          ),
        ]
      ),
      h.section(
        [h.Class("space-y-3")],
        [
          h.h3([h.Class("text-base font-semibold text-gray-950")], [
            "Clear Button",
          ]),
          h.div(
            [
              h.Class(
                "flex max-w-sm items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              ),
            ],
            [
              h.span([], ["Next.js"]),
              h.button([h.Type("button"), h.AriaLabel("Clear selection")], [
                "x",
              ]),
            ]
          ),
        ]
      ),
      h.section(
        [h.Class("space-y-3")],
        [
          h.h3([h.Class("text-base font-semibold text-gray-950")], ["Groups"]),
          h.div(
            [h.Class(Combobox.shadcnComboboxItemsClasses)],
            [
              h.div([h.Class("px-3 py-1 text-xs font-medium text-gray-500")], [
                "Frontend",
              ]),
              h.div([h.Class(Combobox.shadcnComboboxItemClasses)], [
                "Next.js",
              ]),
              h.div([h.Class(Combobox.shadcnComboboxItemClasses)], [
                "SvelteKit",
              ]),
              h.div([h.Class("px-3 py-1 text-xs font-medium text-gray-500")], [
                "Full-stack",
              ]),
              h.div([h.Class(Combobox.shadcnComboboxItemClasses)], ["Remix"]),
            ]
          ),
        ]
      ),
      h.section(
        [h.Class("space-y-3")],
        [
          h.h3([h.Class("text-base font-semibold text-gray-950")], [
            "Custom Items",
          ]),
          h.div(
            [h.Class(Combobox.shadcnComboboxItemsClasses)],
            [
              h.div([h.Class(Combobox.shadcnComboboxItemClasses)], [
                h.div([h.Class("font-medium")], ["Next.js"]),
                h.div([h.Class("text-xs text-gray-500")], [
                  "The React framework for production",
                ]),
              ]),
              h.div([h.Class(Combobox.shadcnComboboxItemClasses)], [
                h.div([h.Class("font-medium")], ["Astro"]),
                h.div([h.Class("text-xs text-gray-500")], [
                  "Content-driven websites",
                ]),
              ]),
            ]
          ),
        ]
      ),
      h.section(
        [h.Class("grid gap-4 md:grid-cols-2")],
        [
          h.div(
            [h.Class("space-y-3")],
            [
              h.h3([h.Class("text-base font-semibold text-gray-950")], [
                "Invalid",
              ]),
              h.input([
                h.AriaLabel("Invalid framework"),
                h.Value("Unknown framework"),
                h.Attribute("aria-invalid", "true"),
                h.Class(
                  `${Combobox.shadcnComboboxInputClasses} rounded-md border border-red-500`
                ),
              ]),
            ]
          ),
          h.div(
            [h.Class("space-y-3")],
            [
              h.h3([h.Class("text-base font-semibold text-gray-950")], [
                "Disabled",
              ]),
              h.input([
                h.AriaLabel("Disabled framework"),
                h.Placeholder("Select framework..."),
                h.Disabled(true),
                h.Class(Combobox.shadcnComboboxInputClasses),
              ]),
            ]
          ),
        ]
      ),
      h.section(
        [h.Class("space-y-3")],
        [
          h.h3([h.Class("text-base font-semibold text-gray-950")], [
            "Auto Highlight",
          ]),
          h.div([h.Class(Combobox.shadcnComboboxItemsClasses)], [
            h.div(
              [
                h.Class(Combobox.shadcnComboboxItemClasses),
                h.DataAttribute("active", "true"),
              ],
              ["Next.js"]
            ),
            h.div([h.Class(Combobox.shadcnComboboxItemClasses)], [
              "SvelteKit",
            ]),
          ]),
        ]
      ),
      h.section(
        [h.Class("space-y-3")],
        [
          h.h3([h.Class("text-base font-semibold text-gray-950")], ["Popup"]),
          h.button(
            [
              h.Type("button"),
              h.Class(Combobox.shadcnComboboxButtonClasses),
            ],
            ["Open popup"]
          ),
        ]
      ),
      h.section(
        [h.Class("space-y-3")],
        [
          h.h3([h.Class("text-base font-semibold text-gray-950")], [
            "Input Group",
          ]),
          h.div(
            [
              h.Class(
                "flex max-w-sm items-center rounded-md border border-gray-300 bg-white"
              ),
            ],
            [
              h.span([h.Class("px-3 text-sm text-gray-500")], ["Framework"]),
              h.input([
                h.AriaLabel("Framework input group"),
                h.Placeholder("Select framework..."),
                h.Class(Combobox.shadcnComboboxInputClasses),
              ]),
            ]
          ),
        ]
      ),
      h.section(
        [h.Attribute("dir", "rtl"), h.Class("space-y-3")],
        [
          h.h3([h.Class("text-base font-semibold text-gray-950")], ["RTL"]),
          h.input([
            h.AriaLabel("إطار العمل"),
            h.Placeholder("اختر إطار العمل..."),
            h.Class(Combobox.shadcnComboboxInputClasses),
          ]),
        ]
      ),
    ]
  );
});
