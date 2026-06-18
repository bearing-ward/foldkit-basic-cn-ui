import { Match as M, Option, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { childAttributes, html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Listbox from "../../ui/listbox";

type Person = "Michael Bluth" | "Lindsay Funke" | "Gob Bluth";

const PersonListbox = Listbox.create<Person>();
const people: readonly Person[] = [
  "Michael Bluth",
  "Lindsay Funke",
  "Gob Bluth",
];

// MODEL

export const Model = S.Struct({
  listbox: Listbox.Model,
});

export type Model = typeof Model.Type;

// MESSAGE

export const GotListboxMessage = m("GotListboxMessage", {
  message: Listbox.Message,
});

export const Message = S.Union([GotListboxMessage]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => {
  const [listbox, listboxCommands] = Listbox.init({
    id: "listbox-basic",
  });

  return [
    { listbox },
    Command.mapMessages(listboxCommands, (message) =>
      GotListboxMessage({ message })
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
      GotListboxMessage: ({ message }) => {
        const [listbox, listboxCommands] = PersonListbox.update(
          model.listbox,
          message
        );

        return [
          evo(model, { listbox: () => listbox }),
          Command.mapMessages(listboxCommands, (message) =>
            GotListboxMessage({ message })
          ),
        ];
      },
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  const selectedLabel = Option.getOrElse(
    model.listbox.maybeSelectedItem,
    () => "Choose person"
  );

  return h.submodel({
    slotId: model.listbox.id,
    model: model.listbox,
    view: PersonListbox.view,
    viewInputs: {
      anchor: Listbox.defaultAnchor,
      items: people,
      itemToConfig: (item) => ({
        className: Listbox.itemClassName,
        content: h.span([], [item]),
      }),
      buttonContent: h.span([], [selectedLabel]),
      buttonAttributes: childAttributes([h.Class(Listbox.triggerClassName)]),
      itemsAttributes: childAttributes([
        h.Class(Listbox.defaultItemsClassName),
      ]),
      backdropAttributes: childAttributes([
        h.DataAttribute("testid", "listbox-backdrop"),
        h.Class(Listbox.backdropClassName),
      ]),
      attributes: childAttributes([h.Class(Listbox.rootClassName)]),
    },
    toParentMessage: (message) => GotListboxMessage({ message }),
  });
});
