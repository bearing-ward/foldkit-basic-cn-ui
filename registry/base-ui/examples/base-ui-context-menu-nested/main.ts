import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as ContextMenu from "../../ui/base-ui-context-menu";

// MODEL

export const Model = S.Struct({
  open: S.Boolean,
  positionX: S.Number,
  positionY: S.Number,
  submenuOpen: S.Boolean,
  selected: S.String,
});

export type Model = typeof Model.Type;

// MESSAGE

export const OpenedContextMenu = m("OpenedContextMenu");
export const ClosedContextMenu = m("ClosedContextMenu");
export const PressedContextMenuTrigger = m("PressedContextMenuTrigger", {
  clientX: S.Number,
  clientY: S.Number,
});
export const OpenedPlaylistSubmenu = m("OpenedPlaylistSubmenu");
export const SelectedContextMenuItem = m("SelectedContextMenuItem", {
  value: S.String,
});

export const Message = S.Union([
  OpenedContextMenu,
  ClosedContextMenu,
  PressedContextMenuTrigger,
  OpenedPlaylistSubmenu,
  SelectedContextMenuItem,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [
  {
    open: false,
    positionX: 24,
    positionY: 24,
    selected: "",
    submenuOpen: false,
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
      OpenedContextMenu: () => [evo(model, { open: () => true }), []],
      ClosedContextMenu: () => [
        evo(model, { open: () => false, submenuOpen: () => false }),
        [],
      ],
      PressedContextMenuTrigger: ({ clientX, clientY }) => [
        evo(model, {
          positionX: () => clientX,
          positionY: () => clientY,
        }),
        [],
      ],
      OpenedPlaylistSubmenu: () => [
        evo(model, { submenuOpen: () => true }),
        [],
      ],
      SelectedContextMenuItem: ({ value }) => [
        evo(model, {
          open: () => false,
          selected: () => value,
          submenuOpen: () => false,
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

const submenuTriggerView = (open: boolean): Html => {
  const h = html<Message>();

  return h.button(
    [
      h.Type("button"),
      h.Attribute("role", "menuitem"),
      h.Attribute("aria-haspopup", "menu"),
      h.Attribute("aria-expanded", open ? "true" : "false"),
      ...(open ? [h.DataAttribute("popup-open", "")] : []),
      h.OnClick(OpenedPlaylistSubmenu()),
      h.Class(
        `${ContextMenu.contextMenuItemClasses} flex w-full items-center justify-between gap-4 data-[popup-open]:bg-gray-100`
      ),
    ],
    [h.span([], ["Add to Playlist"]), caretRightIcon()]
  );
};

const submenuView = (open: boolean): Html => {
  const h = html<Message>();

  if (!open) {
    return h.empty;
  }

  return h.div(
    [h.Class("absolute left-full top-8 -ml-1")],
    [
      ContextMenu.popupView<Message>({
        classes: ContextMenu.contextMenuSubmenuPopupClasses,
        children: [
          itemView("Get Up!"),
          itemView("Inside Out"),
          itemView("Night Beats"),
          ContextMenu.separatorView<Message>({}),
          itemView("New playlist…"),
        ],
      }),
    ]
  );
};

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return ContextMenu.rootView<Message>({
    children: [
      ContextMenu.triggerView<Message>({
        onOpen: OpenedContextMenu(),
        onPointerDown: (clientX, clientY) =>
          PressedContextMenuTrigger({ clientX, clientY }),
        children: [h.span([], ["Right click here"])],
      }),
      ContextMenu.portalView<Message>({
        open: model.open,
        children: [
          ContextMenu.backdropView<Message>({
            onClose: ClosedContextMenu(),
          }),
          ContextMenu.positionerView<Message>({
            classes: "base-ui-context-menu-positioner relative",
            testId: "base-ui-context-menu-positioner",
            style: {
              left: `${String(model.positionX)}px`,
              top: `${String(model.positionY)}px`,
            },
            children: [
              ContextMenu.popupView<Message>({
                children: [
                  itemView("Add to Library"),
                  submenuTriggerView(model.submenuOpen),
                  ContextMenu.separatorView<Message>({}),
                  itemView("Play Next"),
                  itemView("Play Last"),
                  ContextMenu.separatorView<Message>({}),
                  itemView("Favorite"),
                  itemView("Share"),
                ],
              }),
              submenuView(model.submenuOpen),
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
