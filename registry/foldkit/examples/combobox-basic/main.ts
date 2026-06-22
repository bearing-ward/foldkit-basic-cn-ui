import { Array, Match as M, Option, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { childAttributes, html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Combobox from "../../ui/combobox";

type City = "Kyiv" | "Oxford" | "Quito";

const CityCombobox = Combobox.create<City>();
const cities: readonly City[] = ["Kyiv", "Oxford", "Quito"];

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
      h.AriaLabel("City"),
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

  const selectedLabel = Option.getOrElse(
    model.combobox.maybeSelectedDisplayText,
    () => "No city selected"
  );

  return h.div(
    [h.Class("space-y-3")],
    [
      h.submodel({
        slotId: model.combobox.id,
        model: model.combobox,
        view: CityCombobox.view,
        viewInputs: viewInputs(model.combobox.inputValue),
        toParentMessage: (message) => GotComboboxMessage({ message }),
      }),
      h.p(
        [h.Class("text-sm text-gray-700")],
        [`Selected city: ${selectedLabel}`]
      ),
    ]
  );
});
