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
  selected: S.String,
});

export type Model = typeof Model.Type;

// MESSAGE

export const OpenedContextMenu = m("OpenedContextMenu");
export const PressedContextMenuTrigger = m("PressedContextMenuTrigger", {
  clientX: S.Number,
  clientY: S.Number,
});
export const ClosedContextMenu = m("ClosedContextMenu");
export const SelectedContextMenuItem = m("SelectedContextMenuItem", {
  value: S.String,
});

export const Message = S.Union([
  OpenedContextMenu,
  PressedContextMenuTrigger,
  ClosedContextMenu,
  SelectedContextMenuItem,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ open: false, positionX: 24, positionY: 24, selected: "" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      OpenedContextMenu: () => [evo(model, { open: () => true }), []],
      PressedContextMenuTrigger: ({ clientX, clientY }) => [
        evo(model, {
          positionX: () => clientX,
          positionY: () => clientY,
        }),
        [],
      ],
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
            className: "base-ui-context-menu-positioner",
            testId: "base-ui-context-menu-positioner",
            style: {
              left: `${String(model.positionX)}px`,
              top: `${String(model.positionY)}px`,
            },
            children: [
              ContextMenu.popupView<Message>({
                children: [
                  itemView("Add to Library"),
                  itemView("Add to Playlist"),
                  ContextMenu.separatorView<Message>({}),
                  itemView("Play Next"),
                  itemView("Play Last"),
                  ContextMenu.separatorView<Message>({}),
                  itemView("Favorite"),
                  itemView("Share"),
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
