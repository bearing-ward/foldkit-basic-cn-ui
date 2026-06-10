import { Array, Match as M, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { childAttributes, html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import { defaultAnchor, selectedIcon } from "../../ui/combobox/view";
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
      className: Combobox.shadcnComboboxItemClassName,
      content: h.div(
        [h.Class("flex items-center gap-2")],
        [selectedIcon(context.isSelected), h.span([], [framework])]
      ),
    }),
    itemToValue: (framework) => framework,
    itemToDisplayText: (framework) => framework,
    inputAttributes: childAttributes([
      h.Class(Combobox.shadcnComboboxInputClassName),
      h.Placeholder("Select framework..."),
      h.AriaLabel("Framework"),
    ]),
    inputWrapperAttributes: childAttributes([
      h.Class(Combobox.shadcnComboboxInputWrapperClassName),
    ]),
    itemsAttributes: childAttributes([
      h.Class(Combobox.shadcnComboboxItemsClassName),
    ]),
    backdropAttributes: childAttributes([
      h.Class(Combobox.shadcnComboboxBackdropClassName),
    ]),
    attributes: childAttributes([
      h.Class(Combobox.shadcnComboboxWrapperClassName),
    ]),
    buttonContent: h.span([], ["v"]),
    buttonAttributes: childAttributes([
      h.Class(Combobox.shadcnComboboxButtonClassName),
    ]),
    anchor: defaultAnchor,
  };
};

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId: model.combobox.id,
    model: model.combobox,
    view: FrameworkCombobox.view,
    viewInputs: viewInputs(model.combobox.inputValue),
    toParentMessage: (message) => GotComboboxMessage({ message }),
  });
});
