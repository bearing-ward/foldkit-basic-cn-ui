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

const items: readonly Command.CommandItem[] = [
  { group: "اقتراحات", label: "التقويم" },
  { group: "اقتراحات", label: "البحث عن الرموز التعبيرية" },
  { group: "اقتراحات", label: "الآلة الحاسبة" },
  { group: "الإعدادات", label: "الملف الشخصي", shortcut: "⌘P" },
  { group: "الإعدادات", label: "الفوترة", shortcut: "⌘B" },
  { group: "الإعدادات", label: "الإعدادات", shortcut: "⌘S" },
];

const groupedItems = (
  commandItems: readonly Command.CommandItem[]
): readonly [string, readonly Command.CommandItem[]][] =>
  Array.dedupe(commandItems.map((item) => item.group)).map((group) => [
    group,
    commandItems.filter((item) => item.group === group),
  ]);

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const filteredItems = Command.filterItems(items, model.query);

  return h.div(
    [h.Attribute("dir", "rtl"), h.Class("max-w-md")],
    [
      Command.rootView<Message>({
        children: [
          Command.inputView<Message>({
            value: model.query,
            placeholder: "اكتب أمرا أو ابحث...",
            ariaLabel: "بحث الأوامر",
            onInput: (value) => UpdatedCommandQuery({ value }),
          }),
          Command.listView<Message>({
            children:
              filteredItems.length === 0
                ? [Command.emptyView<Message>({ children: ["لا توجد نتائج."] })]
                : groupedItems(filteredItems).flatMap(
                    ([group, groupItems], index) => [
                      ...(index === 0
                        ? []
                        : [Command.separatorView<Message>()]),
                      Command.groupView<Message>({
                        heading: group,
                        children: groupItems.map((item) =>
                          Command.itemView<Message>({ item })
                        ),
                      }),
                    ]
                  ),
          }),
        ],
      }),
    ]
  );
});
