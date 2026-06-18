import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Menubar from "../../../foldkit/ui/menubar";

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

const itemView = (label: string): Html => {
  const h = html<Message>();

  return Menubar.itemView<Message>({
    onSelect: SelectedMenubarItem({ value: label }),
    children: [h.span([], [label])],
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
              itemView("New"),
              itemView("Open"),
              itemView("Save"),
              Menubar.separatorView<Message>({}),
              itemView("Export"),
              itemView("Print"),
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
            children: [itemView("Cut"), itemView("Copy"), itemView("Paste")],
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
            children: [itemView("Zoom In"), itemView("Zoom Out")],
          }),
        ],
      }),
      Menubar.menuView<Message>({
        children: [
          Menubar.triggerView<Message>({
            open: isOpen("Help"),
            onToggle: ToggledMenubarMenu({ value: "Help" }),
            children: [h.span([], ["Help"])],
          }),
          Menubar.popupView<Message>({
            open: isOpen("Help"),
            children: [itemView("Documentation"), itemView("About")],
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
