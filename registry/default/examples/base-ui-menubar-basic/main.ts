import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Menubar from "../../ui/base-ui-menubar";

// MODEL

export const Model = S.Struct({
  openMenu: S.String,
  openSubmenu: S.String,
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
export const ToggledMenubarSubmenu = m("ToggledMenubarSubmenu", {
  value: S.String,
});

export const Message = S.Union([
  ToggledMenubarMenu,
  SelectedMenubarItem,
  ToggledMenubarSubmenu,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ openMenu: "", openSubmenu: "", selected: "" }, []];

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
          openSubmenu: () => "",
        }),
        [],
      ],
      SelectedMenubarItem: ({ value }) => [
        evo(model, {
          openMenu: () => "",
          openSubmenu: () => "",
          selected: () => value,
        }),
        [],
      ],
      ToggledMenubarSubmenu: ({ value }) => [
        evo(model, {
          openSubmenu: (openSubmenu) => (openSubmenu === value ? "" : value),
        }),
        [],
      ],
    })
  );

// VIEW

const caretRightIcon = (): Html => {
  const h = html<Message>();

  return h.svg(
    [
      h.Attribute("width", "16"),
      h.Attribute("height", "16"),
      h.Attribute("viewBox", "0 0 16 16"),
      h.Attribute("fill", "currentColor"),
      h.AriaHidden(true),
      h.Class("block"),
    ],
    [h.path([h.Attribute("d", "M6 12V4l4.5 4z")], [])]
  );
};

const itemView = (label: string): Html => {
  const h = html<Message>();

  return Menubar.itemView<Message>({
    onSelect: SelectedMenubarItem({ value: label }),
    children: [h.span([], [label])],
  });
};

const submenuTriggerView = (label: string, open: boolean): Html => {
  const h = html<Message>();

  return h.button(
    [
      h.Type("button"),
      h.Attribute("role", "menuitem"),
      h.Attribute("aria-haspopup", "menu"),
      h.Attribute("aria-expanded", open ? "true" : "false"),
      ...(open ? [h.DataAttribute("popup-open", "")] : []),
      h.OnClick(ToggledMenubarSubmenu({ value: label })),
      h.Class(
        `flex w-full items-center justify-between gap-4 ${Menubar.menubarItemClassName} data-[popup-open]:bg-gray-100`
      ),
    ],
    [h.span([], [label]), caretRightIcon()]
  );
};

const submenuPopupView = (
  open: boolean,
  testId: string,
  labels: readonly string[]
): Html => {
  const h = html<Message>();

  if (!open) {
    return h.empty;
  }

  return h.div(
    [
      h.Attribute("role", "menu"),
      h.DataAttribute("testid", testId),
      h.Class(`${Menubar.menubarPopupClassName} left-44 top-8 -ml-1 mt-0`),
    ],
    labels.map(itemView)
  );
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
              h.div(
                [h.Class("relative")],
                [
                  submenuTriggerView("Export", model.openSubmenu === "Export"),
                  submenuPopupView(
                    model.openSubmenu === "Export",
                    "export-submenu",
                    ["PDF", "PNG", "SVG"]
                  ),
                ]
              ),
              Menubar.separatorView<Message>({}),
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
            children: [
              itemView("Zoom In"),
              itemView("Zoom Out"),
              h.div(
                [h.Class("relative")],
                [
                  submenuTriggerView("Layout", model.openSubmenu === "Layout"),
                  submenuPopupView(
                    model.openSubmenu === "Layout",
                    "layout-submenu",
                    ["Single Page", "Two Pages", "Continuous"]
                  ),
                ]
              ),
              Menubar.separatorView<Message>({}),
              itemView("Full Screen"),
            ],
          }),
        ],
      }),
      Menubar.menuView<Message>({
        children: [
          Menubar.triggerView<Message>({
            open: isOpen("Help"),
            disabled: true,
            children: [h.span([], ["Help"])],
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
