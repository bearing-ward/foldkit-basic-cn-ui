import { Array, Match as M, Schema as S } from "effect";
import type { Command as FoldkitCommand } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Command from "../../ui/command";

// MODEL

export const Model = S.Struct({
  query: S.String,
});
export type Model = typeof Model.Type;

// MESSAGE

export const UpdatedCommandQuery = m("UpdatedCommandQuery", {
  value: S.String,
});

export const Message = S.Union([UpdatedCommandQuery]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly FoldkitCommand.Command<Message>[],
] => [{ query: "" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly FoldkitCommand.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly FoldkitCommand.Command<Message>[]]>(),
    M.tagsExhaustive({
      UpdatedCommandQuery: ({ value }) => [
        evo(model, { query: () => value }),
        [],
      ],
    })
  );

// VIEW

const suggestionItems: readonly Command.CommandItem[] = [
  { group: "Suggestions", label: "Calendar" },
  { group: "Suggestions", label: "Search Emoji" },
  { group: "Suggestions", label: "Calculator" },
];

const settingItems: readonly Command.CommandItem[] = [
  { group: "Settings", label: "Profile" },
  { group: "Settings", label: "Billing" },
  { group: "Settings", label: "Settings" },
];

const groupedItems = (
  items: readonly Command.CommandItem[]
): readonly [string, readonly Command.CommandItem[]][] =>
  Array.dedupe(items.map((item) => item.group)).map((group) => [
    group,
    items.filter((item) => item.group === group),
  ]);

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const items = Command.filterItems(
    [...suggestionItems, ...settingItems],
    model.query
  );

  return Command.rootView<Message>({
    className: "max-w-md",
    children: [
      Command.inputView<Message>({
        value: model.query,
        onInput: (value) => UpdatedCommandQuery({ value }),
      }),
      Command.listView<Message>({
        children:
          items.length === 0
            ? [Command.emptyView<Message>({ children: ["No results found."] })]
            : groupedItems(items).flatMap(([group, groupItems], index) => [
                ...(index === 0 ? [] : [Command.separatorView<Message>()]),
                Command.groupView<Message>({
                  heading: group,
                  children: groupItems.map((item) =>
                    Command.itemView<Message>({ item })
                  ),
                }),
              ]),
      }),
    ],
  });
});
