import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as ContextMenu from "../../ui/shadcn-context-menu";

// MODEL

export const Model = S.Struct({
  open: S.Boolean,
  selected: S.String,
});

export type Model = typeof Model.Type;

// MESSAGE

export const OpenedContextMenu = m("OpenedContextMenu");
export const ClosedContextMenu = m("ClosedContextMenu");
export const SelectedContextMenuItem = m("SelectedContextMenuItem", {
  value: S.String,
});

export const Message = S.Union([
  OpenedContextMenu,
  ClosedContextMenu,
  SelectedContextMenuItem,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ open: false, selected: "" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      OpenedContextMenu: () => [evo(model, { open: () => true }), []],
      ClosedContextMenu: () => [evo(model, { open: () => false }), []],
      SelectedContextMenuItem: ({ value }) => [
        evo(model, {
          open: () => false,
          selected: () => value,
        }),
        [],
      ],
    })
  );

// VIEW

const itemView = (value: string): Html => {
  const h = html<Message>();

  return ContextMenu.itemView<Message>({
    onSelect: SelectedContextMenuItem({ value }),
    children: [h.span([], [value])],
  });
};

const labelView = (value: string): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("px-2 py-1.5 text-xs font-semibold text-gray-500")],
    [value]
  );
};

const shortcutItemView = (value: string, shortcut: string): Html => {
  const h = html<Message>();

  return ContextMenu.itemView<Message>({
    onSelect: SelectedContextMenuItem({ value }),
    children: [
      h.span([], [value]),
      h.span(
        [h.Class("ml-auto pl-8 text-xs tracking-widest text-gray-500")],
        [shortcut]
      ),
    ],
  });
};

const checkedItemView = (value: string, checked: boolean): Html => {
  const h = html<Message>();

  return ContextMenu.itemView<Message>({
    onSelect: SelectedContextMenuItem({ value }),
    children: [
      h.span([h.Class("w-4 text-center")], [checked ? "✓" : ""]),
      h.span([], [value]),
    ],
  });
};

const iconItemView = (value: string, icon: string): Html => {
  const h = html<Message>();

  return ContextMenu.itemView<Message>({
    onSelect: SelectedContextMenuItem({ value }),
    children: [
      h.span([h.AriaHidden(true), h.Class("w-4 text-gray-500")], [icon]),
      h.span([], [value]),
    ],
  });
};

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return ContextMenu.rootView<Message>({
    children: [
      ContextMenu.triggerView<Message>({
        onOpen: OpenedContextMenu(),
        children: [h.span([], ["Right click here"])],
      }),
      ContextMenu.portalView<Message>({
        open: model.open,
        children: [
          ContextMenu.backdropView<Message>({
            onClose: ClosedContextMenu(),
          }),
          ContextMenu.positionerView<Message>({
            children: [
              ContextMenu.popupView<Message>({
                children: [
                  labelView("Basic"),
                  itemView("Profile"),
                  itemView("Billing"),
                  itemView("Team"),
                  itemView("Subscription"),
                  ContextMenu.separatorView<Message>({}),
                  labelView("Submenu"),
                  itemView("More Tools >"),
                  itemView("Create Project"),
                  itemView("Create Task"),
                  ContextMenu.separatorView<Message>({}),
                  labelView("Shortcuts"),
                  shortcutItemView("Back", "⌘["),
                  shortcutItemView("Forward", "⌘]"),
                  shortcutItemView("Reload", "⌘R"),
                  ContextMenu.separatorView<Message>({}),
                  labelView("Groups"),
                  itemView("People"),
                  itemView("Teams"),
                  itemView("Billing"),
                  ContextMenu.separatorView<Message>({}),
                  labelView("Icons"),
                  iconItemView("Copy", "□"),
                  iconItemView("Paste", "▣"),
                  itemView("Share"),
                  ContextMenu.separatorView<Message>({}),
                  labelView("Checkboxes"),
                  checkedItemView("Show Bookmarks Bar", true),
                  checkedItemView("Show Full URLs", false),
                  ContextMenu.separatorView<Message>({}),
                  labelView("Radio"),
                  checkedItemView("Panel position: Top", false),
                  checkedItemView("Panel position: Bottom", true),
                  ContextMenu.separatorView<Message>({}),
                  iconItemView("Delete", "!"),
                  h.div(
                    [h.Dir("rtl"), h.Class("px-2 py-1.5 text-sm")],
                    ["انقر بزر الماوس الأيمن هنا"]
                  ),
                ],
              }),
            ],
          }),
        ],
      }),
      model.selected === ""
        ? h.empty
        : h.p(
            [h.Class("mt-3 text-sm text-gray-600")],
            [`Selected: ${model.selected}`]
          ),
    ],
  });
});
