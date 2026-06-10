import { Array, Match as M, Option, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { childAttributes, html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Combobox from "../../ui/base-ui-combobox";

type Fruit =
  | "Apple"
  | "Banana"
  | "Orange"
  | "Pineapple"
  | "Grape"
  | "Mango"
  | "Strawberry"
  | "Blueberry"
  | "Raspberry"
  | "Blackberry"
  | "Cherry"
  | "Peach"
  | "Pear"
  | "Plum"
  | "Kiwi"
  | "Watermelon"
  | "Cantaloupe"
  | "Honeydew"
  | "Papaya"
  | "Guava"
  | "Lychee"
  | "Pomegranate"
  | "Apricot"
  | "Grapefruit"
  | "Passionfruit";

const FruitCombobox = Combobox.create<Fruit>();
const fruits: readonly Fruit[] = [
  "Apple",
  "Banana",
  "Orange",
  "Pineapple",
  "Grape",
  "Mango",
  "Strawberry",
  "Blueberry",
  "Raspberry",
  "Blackberry",
  "Cherry",
  "Peach",
  "Pear",
  "Plum",
  "Kiwi",
  "Watermelon",
  "Cantaloupe",
  "Honeydew",
  "Papaya",
  "Guava",
  "Lychee",
  "Pomegranate",
  "Apricot",
  "Grapefruit",
  "Passionfruit",
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
export const ClickedClearSelection = m("ClickedClearSelection");

export const Message = S.Union([GotComboboxMessage, ClickedClearSelection]);
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
        const [combobox, comboboxCommands] = FruitCombobox.update(
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
      ClickedClearSelection: () => {
        const combobox = FruitCombobox.reflectSelectedItem(
          model.combobox,
          Option.none()
        );

        return [evo(model, { combobox: () => combobox }), []];
      },
    })
  );

// VIEW

const filterFruits = (inputValue: string): readonly Fruit[] =>
  inputValue === ""
    ? fruits
    : Array.filter(fruits, (fruit) =>
        fruit.toLowerCase().includes(inputValue.toLowerCase())
      );

const viewInputs = (inputValue: string): Combobox.ViewInputs<Fruit> => {
  const h = html<Message>();

  return {
    items: filterFruits(inputValue),
    itemToConfig: (fruit, context) => ({
      className: Combobox.baseUiComboboxItemClassName,
      content: h.div(
        [h.Class("flex items-center gap-2")],
        [
          Combobox.baseUiComboboxSelectedIcon(context.isSelected),
          h.span([], [fruit]),
        ]
      ),
    }),
    itemToValue: (fruit) => fruit,
    itemToDisplayText: (fruit) => fruit,
    inputAttributes: childAttributes([
      h.Class(Combobox.baseUiComboboxInputClassName),
      h.Placeholder("e.g. Apple"),
      h.AriaLabel("Choose a fruit"),
    ]),
    inputWrapperAttributes: childAttributes([
      h.Class(Combobox.baseUiComboboxWrapperClassName),
    ]),
    itemsAttributes: childAttributes([
      h.Class(Combobox.baseUiComboboxItemsClassName),
    ]),
    backdropAttributes: childAttributes([
      h.Class(Combobox.baseUiComboboxBackdropClassName),
    ]),
    attributes: childAttributes([
      h.Class(Combobox.baseUiComboboxWrapperClassName),
    ]),
    buttonContent: h.span([], ["v"]),
    buttonAttributes: childAttributes([
      h.Class(Combobox.baseUiComboboxButtonClassName),
    ]),
    anchor: Combobox.baseUiComboboxDefaultAnchor,
  };
};

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const filteredFruits = filterFruits(model.combobox.inputValue);

  return h.div(
    [h.Class("space-y-3")],
    [
      h.div(
        [h.Class("flex items-center justify-between gap-3")],
        [
          h.label(
            [
              h.Class("block text-sm font-medium text-gray-900"),
              h.For(`${model.combobox.id}-input`),
            ],
            ["Choose a fruit"]
          ),
          h.button(
            [
              h.Type("button"),
              h.AriaLabel("Clear selection"),
              h.OnClick(ClickedClearSelection()),
              h.Class(
                "text-sm font-medium text-gray-500 transition hover:text-gray-950"
              ),
            ],
            ["Clear"]
          ),
        ]
      ),
      h.submodel({
        slotId: model.combobox.id,
        model: model.combobox,
        view: FruitCombobox.view,
        viewInputs: viewInputs(model.combobox.inputValue),
        toParentMessage: (message) => GotComboboxMessage({ message }),
      }),
      model.combobox.inputValue !== "" && filteredFruits.length === 0
        ? h.div(
            [
              h.Class(
                "rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 shadow-sm"
              ),
            ],
            ["No fruits found."]
          )
        : h.empty,
    ]
  );
});
