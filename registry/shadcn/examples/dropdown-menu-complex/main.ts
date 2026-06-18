import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as DropdownMenu from "../../ui/dropdown-menu";

// MODEL

export const Model = S.Struct({
  open: S.Boolean,
  subOpen: S.Boolean,
  showBookmarks: S.Boolean,
  theme: S.String,
  selected: S.String,
});
export type Model = typeof Model.Type;

// MESSAGE

export const ToggledDropdownMenu = m("ToggledDropdownMenu");
export const ClosedDropdownMenu = m("ClosedDropdownMenu");
export const OpenedSubmenu = m("OpenedSubmenu");
export const ToggledBookmarks = m("ToggledBookmarks");
export const SelectedTheme = m("SelectedTheme", { value: S.String });
export const SelectedDropdownMenuItem = m("SelectedDropdownMenuItem", {
  value: S.String,
});
export const Message = S.Union([
  ToggledDropdownMenu,
  ClosedDropdownMenu,
  OpenedSubmenu,
  ToggledBookmarks,
  SelectedTheme,
  SelectedDropdownMenuItem,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [
  {
    open: true,
    subOpen: true,
    showBookmarks: true,
    theme: "System",
    selected: "",
  },
  [],
];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ToggledDropdownMenu: () => [evo(model, { open: (open) => !open }), []],
      ClosedDropdownMenu: () => [
        evo(model, { open: () => false, subOpen: () => false }),
        [],
      ],
      OpenedSubmenu: () => [evo(model, { subOpen: () => true }), []],
      ToggledBookmarks: () => [
        evo(model, { showBookmarks: (showBookmarks) => !showBookmarks }),
        [],
      ],
      SelectedTheme: ({ value }) => [evo(model, { theme: () => value }), []],
      SelectedDropdownMenuItem: ({ value }) => [
        evo(model, {
          open: () => false,
          subOpen: () => false,
          selected: () => value,
        }),
        [],
      ],
    })
  );

// VIEW

const actionItemView = (
  label: string,
  icon: string,
  shortcut?: string
): Html => {
  const h = html<Message>();

  return DropdownMenu.itemView<Message>({
    onSelect: SelectedDropdownMenuItem({ value: label }),
    children: [
      DropdownMenu.iconView<Message>({ children: [h.span([], [icon])] }),
      h.span([], [label]),
      ...(shortcut === undefined
        ? []
        : [DropdownMenu.shortcutView<Message>(shortcut)]),
    ],
  });
};

const themeItemView = (label: string, selected: string): Html => {
  const h = html<Message>();
  const checked = label === selected;

  return DropdownMenu.radioItemView<Message>({
    checked,
    onSelect: SelectedTheme({ value: label }),
    children: [
      DropdownMenu.itemIndicatorView<Message>({
        children: [h.span([], [checked ? "•" : ""])],
      }),
      h.span([], [label]),
    ],
  });
};

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return DropdownMenu.rootView<Message>({
    children: [
      DropdownMenu.triggerView<Message>({
        open: model.open,
        onToggle: ToggledDropdownMenu(),
        children: [h.span([], ["Open complex"])],
      }),
      DropdownMenu.portalView<Message>({
        open: model.open,
        children: [
          DropdownMenu.backdropView<Message>({ onClose: ClosedDropdownMenu() }),
          DropdownMenu.positionerView<Message>({
            children: [
              DropdownMenu.popupView<Message>({
                children: [
                  DropdownMenu.labelView<Message>({
                    children: [h.span([], ["Workspace"])],
                  }),
                  actionItemView("New File", "+", "⌘N"),
                  DropdownMenu.subTriggerView<Message>({
                    open: model.subOpen,
                    onOpen: OpenedSubmenu(),
                    children: [
                      DropdownMenu.iconView<Message>({
                        children: [h.span([], ["S"])],
                      }),
                      h.span([], ["Share"]),
                      DropdownMenu.shortcutView<Message>("›"),
                    ],
                  }),
                  model.subOpen
                    ? DropdownMenu.subContentView<Message>({
                        children: [actionItemView("Copy Link", "L", "⌘L")],
                      })
                    : h.empty,
                  DropdownMenu.separatorView<Message>({}),
                  DropdownMenu.checkboxItemView<Message>({
                    checked: model.showBookmarks,
                    onSelect: ToggledBookmarks(),
                    children: [
                      DropdownMenu.itemIndicatorView<Message>({
                        children: [
                          h.span([], [model.showBookmarks ? "✓" : ""]),
                        ],
                      }),
                      h.span([], ["Show Bookmarks"]),
                    ],
                  }),
                  DropdownMenu.separatorView<Message>({}),
                  DropdownMenu.radioGroupView<Message>({
                    label: "Theme",
                    children: [
                      themeItemView("Light", model.theme),
                      themeItemView("Dark", model.theme),
                      themeItemView("System", model.theme),
                    ],
                  }),
                  DropdownMenu.separatorView<Message>({}),
                  DropdownMenu.itemView<Message>({
                    destructive: true,
                    onSelect: SelectedDropdownMenuItem({ value: "Delete" }),
                    children: [h.span([], ["Delete Workspace"])],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      model.selected === ""
        ? h.empty
        : h.p([h.Class("mt-3 text-sm text-gray-600")], [
            `Selected: ${model.selected}`,
          ]),
      h.p([h.Class("text-sm text-gray-600")], [
        model.showBookmarks ? "Bookmarks: on" : "Bookmarks: off",
      ]),
      h.p([h.Class("text-sm text-gray-600")], [`Theme: ${model.theme}`]),
    ],
  });
});
