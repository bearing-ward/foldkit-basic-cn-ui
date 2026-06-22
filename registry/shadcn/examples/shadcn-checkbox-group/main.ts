import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Checkbox from "../../ui/shadcn-checkbox";

// MODEL

export const DesktopItem = S.Union([
  S.Literal("hard-disks"),
  S.Literal("external-disks"),
  S.Literal("cds-dvds-ipods"),
  S.Literal("connected-servers"),
]);
export type DesktopItem = typeof DesktopItem.Type;

export const Model = S.Struct({
  selectedItems: S.Array(DesktopItem),
});

export type Model = typeof Model.Type;

// MESSAGE

export const ToggledDesktopItem = m("ToggledDesktopItem", {
  value: DesktopItem,
});

export const Message = S.Union([ToggledDesktopItem]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ selectedItems: ["external-disks"] }, []];

// UPDATE

const toggleItem = (
  selectedItems: ReadonlyArray<DesktopItem>,
  value: DesktopItem
): ReadonlyArray<DesktopItem> =>
  selectedItems.includes(value)
    ? selectedItems.filter((item) => item !== value)
    : [...selectedItems, value];

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ToggledDesktopItem: ({ value }) => [
        evo(model, {
          selectedItems: (selectedItems) => toggleItem(selectedItems, value),
        }),
        [],
      ],
    })
  );

// VIEW

const desktopItemView = (
  value: DesktopItem,
  label: string,
  selectedItems: ReadonlyArray<DesktopItem>
): Html => {
  const h = html<Message>();
  const id = `desktop-item-${value}`;
  const isChecked = selectedItems.includes(value);

  return h.div(
    [h.Class(Checkbox.shadcnCheckboxRowClasses)],
    [
      h.button(
        [
          h.Type("button"),
          h.Id(id),
          h.Name("desktop-items"),
          h.Value(value),
          h.Role("checkbox"),
          h.AriaChecked(isChecked),
          h.OnClick(ToggledDesktopItem({ value })),
          h.Class(Checkbox.shadcnCheckboxControlClasses),
        ],
        isChecked ? ["✓"] : []
      ),
      h.label(
        [h.For(id), h.Class(Checkbox.shadcnCheckboxLabelClasses)],
        [label]
      ),
    ]
  );
};

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("w-full max-w-sm space-y-4")],
    [
      h.div(
        [h.Class("space-y-1")],
        [
          h.p([h.Class("text-sm font-medium")], [
            "Show these items on the desktop:",
          ]),
          h.p([h.Class(Checkbox.shadcnCheckboxDescriptionClasses)], [
            "Select the items you want to show on the desktop.",
          ]),
        ]
      ),
      h.div(
        [h.Role("group"), h.AriaLabel("Show these items on the desktop")],
        [
          desktopItemView("hard-disks", "Hard disks", model.selectedItems),
          desktopItemView(
            "external-disks",
            "External disks",
            model.selectedItems
          ),
          desktopItemView(
            "cds-dvds-ipods",
            "CDs, DVDs, and iPods",
            model.selectedItems
          ),
          desktopItemView(
            "connected-servers",
            "Connected servers",
            model.selectedItems
          ),
        ]
      ),
    ]
  );
});
