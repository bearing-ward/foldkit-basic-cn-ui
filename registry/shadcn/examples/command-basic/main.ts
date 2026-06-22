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
  isOpen: S.Boolean,
});
export type Model = typeof Model.Type;

// MESSAGE

export const UpdatedCommandQuery = m("UpdatedCommandQuery", {
  value: S.String,
});
export const ClickedOpenMenu = m("ClickedOpenMenu");
export const ClickedCloseMenu = m("ClickedCloseMenu");
export const SelectedCommandItem = m("SelectedCommandItem", {
  value: S.String,
});
export const Message = S.Union([
  UpdatedCommandQuery,
  ClickedOpenMenu,
  ClickedCloseMenu,
  SelectedCommandItem,
]);
export type Message = typeof Message.Type;

// INIT

type UpdateReturn = readonly [
  Model,
  readonly FoldkitCommand.Command<Message>[],
];

export const init = (): UpdateReturn => [{ query: "", isOpen: false }, []];

// UPDATE

export const update = (model: Model, message: Message): UpdateReturn =>
  M.value(message).pipe(
    M.withReturnType<UpdateReturn>(),
    M.tagsExhaustive({
      UpdatedCommandQuery: ({ value }) => [
        evo(model, { query: () => value }),
        [],
      ],
      ClickedOpenMenu: () => [
        evo(model, { isOpen: () => true, query: () => "" }),
        [],
      ],
      ClickedCloseMenu: () => [
        evo(model, { isOpen: () => false, query: () => "" }),
        [],
      ],
      SelectedCommandItem: () => [
        evo(model, { isOpen: () => false, query: () => "" }),
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

const basicItems: readonly Command.CommandItem[] = [
  { group: "Suggestions", label: "Calendar" },
  { group: "Suggestions", label: "Search Emoji" },
  { group: "Suggestions", label: "Calculator" },
];

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const listId = "command-basic-list";
  const items = Command.filterItems(basicItems, model.query);

  return h.div(
    [h.Class("flex w-full max-w-md flex-col items-start gap-4")],
    [
      h.button(
        [
          h.Type("button"),
          h.OnClick(ClickedOpenMenu()),
          h.Class(
            "inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-950 shadow-sm transition-colors hover:bg-gray-100"
          ),
        ],
        ["Open Menu"]
      ),
      model.isOpen
        ? h.div(
            [
              h.Attribute("role", "dialog"),
              h.Attribute("aria-modal", "true"),
              h.Attribute("aria-labelledby", "command-basic-title"),
              h.Attribute("aria-describedby", "command-basic-description"),
              h.Class(
                "w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
              ),
            ],
            [
              h.div(
                [h.Class("flex items-start justify-between gap-4 p-4 pb-2")],
                [
                  h.div(
                    [h.Class("space-y-1")],
                    [
                      h.h2(
                        [
                          h.Id("command-basic-title"),
                          h.Class("text-base font-semibold text-gray-950"),
                        ],
                        ["Command Palette"]
                      ),
                      h.p(
                        [
                          h.Id("command-basic-description"),
                          h.Class("text-sm text-gray-500"),
                        ],
                        ["Search for a command to run..."]
                      ),
                    ]
                  ),
                  h.button(
                    [
                      h.Type("button"),
                      h.OnClick(ClickedCloseMenu()),
                      h.AriaLabel("Close"),
                      h.Class(
                        "rounded-md px-2 py-1 text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-950"
                      ),
                    ],
                    ["Close"]
                  ),
                ]
              ),
              Command.rootView<Message>({
                className: "border-0 shadow-none",
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
                        : groupedItems(items).flatMap(
                            ([group, groupItems], index) => [
                              ...(index === 0
                                ? []
                                : [Command.separatorView<Message>()]),
                              Command.groupView<Message>({
                                heading: group,
                                children: groupItems.map((item) =>
                                  Command.itemView<Message>({
                                    item,
                                    selected: false,
                                    onSelect: SelectedCommandItem({
                                      value: item.label,
                                    }),
                                  })
                                ),
                              }),
                            ]
                          ),
                  }),
                ],
              }),
            ]
          )
        : h.empty,
    ]
  );
});
