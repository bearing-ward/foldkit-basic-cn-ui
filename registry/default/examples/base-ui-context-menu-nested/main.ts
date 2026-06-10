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
  submenuOpen: S.Boolean,
  selected: S.String,
});

export type Model = typeof Model.Type;

// MESSAGE

export const OpenedContextMenu = m("OpenedContextMenu");
export const ClosedContextMenu = m("ClosedContextMenu");
export const OpenedPlaylistSubmenu = m("OpenedPlaylistSubmenu");
export const SelectedContextMenuItem = m("SelectedContextMenuItem", {
  value: S.String,
});

export const Message = S.Union([
  OpenedContextMenu,
  ClosedContextMenu,
  OpenedPlaylistSubmenu,
  SelectedContextMenuItem,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ open: false, selected: "", submenuOpen: false }, []];

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

const submenuTriggerView = (): Html => {
  const h = html<Message>();

  return h.button(
    [
      h.Type("button"),
      h.Attribute("role", "menuitem"),
      h.Attribute("aria-haspopup", "menu"),
      h.OnClick(OpenedPlaylistSubmenu()),
      h.Class(
        `${ContextMenu.contextMenuItemClassName} flex w-full items-center justify-between gap-4`
      ),
    ],
    [h.span([], ["Add to Playlist"]), h.span([h.AriaHidden(true)], [">"])]
  );
};

const submenuView = (open: boolean): Html => {
  const h = html<Message>();

  if (!open) {
    return h.empty;
  }

  return h.div(
    [h.Class("absolute left-full top-10 ml-2")],
    [
      ContextMenu.popupView<Message>({
        children: [
          itemView("Get Up!"),
          itemView("Inside Out"),
          itemView("Nightcall"),
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
        children: [h.span([], ["Right click here"])],
      }),
      ContextMenu.portalView<Message>({
        open: model.open,
        children: [
          ContextMenu.backdropView<Message>({
            onClose: ClosedContextMenu(),
          }),
          ContextMenu.positionerView<Message>({
            className: "relative",
            children: [
              ContextMenu.popupView<Message>({
                children: [
                  itemView("Add to Library"),
                  submenuTriggerView(),
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
