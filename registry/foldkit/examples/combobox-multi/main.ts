import { Array, Match as M, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { childAttributes, html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Combobox from "../../ui/combobox";

type City = "Kyiv" | "Oxford" | "Quito";

const CityCombobox = Combobox.Multi.create<City>();
const cities: readonly City[] = ["Kyiv", "Oxford", "Quito"];

// MODEL

export const Model = S.Struct({
  combobox: Combobox.Multi.Model,
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
  const combobox = Combobox.Multi.init({
    id: "combobox-multi",
  });

  return [{ combobox }, []];
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
        const [combobox, comboboxCommands] = CityCombobox.update(
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

const filterCities = (inputValue: string): readonly City[] =>
  inputValue === ""
    ? cities
    : Array.filter(cities, (city) =>
        city.toLowerCase().includes(inputValue.toLowerCase())
      );

const viewInputs = (inputValue: string): Combobox.ViewInputs<City> => {
  const h = html<Message>();

  return {
    items: filterCities(inputValue),
    itemToConfig: (city, context) => ({
      classes: Combobox.itemClasses,
      content: h.div(
        [h.Class("flex items-center gap-2")],
        [Combobox.selectedIcon(context.isSelected), h.span([], [city])]
      ),
    }),
    itemToValue: (city) => city,
    itemToDisplayText: (city) => city,
    inputAttributes: childAttributes([
      h.Class(Combobox.inputClasses),
      h.Placeholder("Search cities..."),
      h.AriaLabel("Cities"),
    ]),
    inputWrapperAttributes: childAttributes([
      h.Class(Combobox.inputWrapperClasses),
    ]),
    itemsAttributes: childAttributes([h.Class(Combobox.itemsClasses)]),
    backdropAttributes: childAttributes([h.Class(Combobox.backdropClasses)]),
    attributes: childAttributes([h.Class(Combobox.wrapperClasses)]),
    buttonContent: h.span([], ["v"]),
    buttonAttributes: childAttributes([h.Class(Combobox.buttonClasses)]),
    anchor: Combobox.defaultAnchor,
  };
};

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-3")],
    [
      h.div(
        [h.Class("flex flex-wrap gap-1.5")],
        Array.match(model.combobox.selectedItems, {
          onEmpty: () => [
            h.span(
              [h.Class(Combobox.emptyTagClasses)],
              ["No cities selected"]
            ),
          ],
          onNonEmpty: (selectedItems) =>
            selectedItems.map((item) =>
              h.span([h.Class(Combobox.tagClasses)], [item])
            ),
        })
      ),
      h.submodel({
        slotId: model.combobox.id,
        model: model.combobox,
        view: CityCombobox.view,
        viewInputs: viewInputs(model.combobox.inputValue),
        toParentMessage: (message) => GotComboboxMessage({ message }),
      }),
    ]
  );
});
