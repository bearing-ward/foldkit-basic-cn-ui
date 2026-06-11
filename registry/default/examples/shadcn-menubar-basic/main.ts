import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Menubar from "../../ui/shadcn-menubar";

// MODEL

export const Model = S.Struct({
  openMenu: S.String,
  selected: S.String,
});

export type Model = typeof Model.Type;

// MESSAGE

export const ToggledMenubarMenu = m("ToggledMenubarMenu", {
  value: S.String,
});
export const SelectedMenubarItem = m("SelectedMenubarItem", {
  value: S.String,
});

export const Message = S.Union([ToggledMenubarMenu, SelectedMenubarItem]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ openMenu: "", selected: "" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ToggledMenubarMenu: ({ value }) => [
        evo(model, {
          openMenu: (openMenu) => (openMenu === value ? "" : value),
        }),
        [],
      ],
      SelectedMenubarItem: ({ value }) => [
        evo(model, {
          openMenu: () => "",
          selected: () => value,
        }),
        [],
      ],
    })
  );

// VIEW

const itemChildren = (
  label: string,
  shortcut?: string | undefined,
  inset = false
): readonly Html[] => {
  const h = html<Message>();

  return [
    h.span(inset ? [h.Class("pl-5")] : [], [label]),
    shortcut === undefined
      ? h.empty
      : h.span([h.Class("ml-auto pl-6 text-xs tracking-widest text-gray-500")], [
          shortcut,
        ]),
  ];
};

const itemView = (
  label: string,
  shortcut?: string | undefined,
  options: Readonly<{ disabled?: boolean | undefined; inset?: boolean }> = {}
): Html => {
  const { disabled = false, inset = false } = options;

  return Menubar.itemView<Message>({
    disabled,
    onSelect: disabled ? undefined : SelectedMenubarItem({ value: label }),
    children: itemChildren(label, shortcut, inset),
  });
};

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const isOpen = (value: string): boolean => model.openMenu === value;

  return Menubar.rootView<Message>({
    children: [
      Menubar.menuView<Message>({
        children: [
          Menubar.triggerView<Message>({
            open: isOpen("File"),
            onToggle: ToggledMenubarMenu({ value: "File" }),
            children: [h.span([], ["File"])],
          }),
          Menubar.popupView<Message>({
            open: isOpen("File"),
            children: [
              itemView("New Tab", "⌘T"),
              itemView("New Window", "⌘N"),
              itemView("New Incognito Window", undefined, { disabled: true }),
              Menubar.separatorView<Message>({}),
              itemView("Share"),
              Menubar.separatorView<Message>({}),
              itemView("Print...", "⌘P"),
            ],
          }),
        ],
      }),
      Menubar.menuView<Message>({
        children: [
          Menubar.triggerView<Message>({
            open: isOpen("Edit"),
            onToggle: ToggledMenubarMenu({ value: "Edit" }),
            children: [h.span([], ["Edit"])],
          }),
          Menubar.popupView<Message>({
            open: isOpen("Edit"),
            children: [
              itemView("Undo", "⌘Z"),
              itemView("Redo", "⇧⌘Z"),
              Menubar.separatorView<Message>({}),
              itemView("Find"),
              Menubar.separatorView<Message>({}),
              itemView("Cut"),
              itemView("Copy"),
              itemView("Paste"),
            ],
          }),
        ],
      }),
      Menubar.menuView<Message>({
        children: [
          Menubar.triggerView<Message>({
            open: isOpen("View"),
            onToggle: ToggledMenubarMenu({ value: "View" }),
            children: [h.span([], ["View"])],
          }),
          Menubar.popupView<Message>({
            open: isOpen("View"),
            children: [
              itemView("Always Show Bookmarks Bar"),
              itemView("Always Show Full URLs"),
              Menubar.separatorView<Message>({}),
              itemView("Reload", "⌘R", { inset: true }),
              itemView("Force Reload", "⇧⌘R", {
                disabled: true,
                inset: true,
              }),
              Menubar.separatorView<Message>({}),
              itemView("Toggle Fullscreen", undefined, { inset: true }),
              Menubar.separatorView<Message>({}),
              itemView("Hide Sidebar", undefined, { inset: true }),
            ],
          }),
        ],
      }),
      Menubar.menuView<Message>({
        children: [
          Menubar.triggerView<Message>({
            open: isOpen("Profiles"),
            onToggle: ToggledMenubarMenu({ value: "Profiles" }),
            children: [h.span([], ["Profiles"])],
          }),
          Menubar.popupView<Message>({
            open: isOpen("Profiles"),
            children: [
              itemView("Andy"),
              itemView("Benoit"),
              itemView("Luis"),
              Menubar.separatorView<Message>({}),
              itemView("Edit...", undefined, { inset: true }),
              Menubar.separatorView<Message>({}),
              itemView("Add Profile...", undefined, { inset: true }),
            ],
          }),
        ],
      }),
      model.selected === ""
        ? h.empty
        : h.p(
            [h.Class("ml-3 text-sm text-gray-600")],
            [`Selected: ${model.selected}`]
          ),
    ],
  });
});
