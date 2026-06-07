import { Array, Match as M, Schema as S } from "effect";
import type { Command as FoldkitCommand } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Command from "../../ui/command";

// MODEL

export const Model = S.Struct({
  query: S.String,
  selected: S.String,
});
export type Model = typeof Model.Type;

// MESSAGE

export const UpdatedCommandQuery = m("UpdatedCommandQuery", {
  value: S.String,
});
export const SelectedCommandItem = m("SelectedCommandItem", {
  value: S.String,
});
export const Message = S.Union([UpdatedCommandQuery, SelectedCommandItem]);
export type Message = typeof Message.Type;

// INIT

type UpdateReturn = readonly [
  Model,
  readonly FoldkitCommand.Command<Message>[],
];

export const init = (): UpdateReturn => [{ query: "", selected: "" }, []];

// UPDATE

export const update = (model: Model, message: Message): UpdateReturn =>
  M.value(message).pipe(
    M.withReturnType<UpdateReturn>(),
    M.tagsExhaustive({
      UpdatedCommandQuery: ({ value }) => [
        evo(model, { query: () => value }),
        [],
      ],
      SelectedCommandItem: ({ value }) => [
        evo(model, { selected: () => value, query: () => value }),
        [],
      ],
    })
  );

// VIEW

const groupedItems = (
  items: readonly Command.CommandItem[]
): readonly [string, readonly Command.CommandItem[]][] =>
  Array.dedupe(items.map((item) => item.group)).map((group) => [
    group,
    items.filter((item) => item.group === group),
  ]);

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const listId = "command-basic-list";
  const items = Command.filterItems(Command.defaultItems, model.query);

  return h.div(
    [h.Class("w-full max-w-md space-y-3")],
    [
      Command.rootView<Message>({
        children: [
          Command.inputView<Message>({
            value: model.query,
            onInput: (value) => UpdatedCommandQuery({ value }),
            listId,
          }),
          Command.listView<Message>({
            attributes: [h.Id(listId)],
            children:
              items.length === 0
                ? [
                    Command.emptyView<Message>({
                      children: ["No results found."],
                    }),
                  ]
                : groupedItems(items).flatMap(([group, groupItems], index) => [
                    ...(index === 0 ? [] : [Command.separatorView<Message>()]),
                    Command.groupView<Message>({
                      heading: group,
                      children: groupItems.map((item) =>
                        Command.itemView<Message>({
                          item,
                          selected: item.label === model.selected,
                          onSelect: SelectedCommandItem({ value: item.label }),
                        })
                      ),
                    }),
                  ]),
          }),
        ],
      }),
      model.selected === ""
        ? h.empty
        : h.p(
            [h.Class("text-sm text-gray-600")],
            [`Selected ${model.selected}`]
          ),
    ]
  );
});
