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
  selected: S.String,
});
export type Model = typeof Model.Type;

// MESSAGE

export const ToggledDropdownMenu = m("ToggledDropdownMenu");
export const ClosedDropdownMenu = m("ClosedDropdownMenu");
export const OpenedSubmenu = m("OpenedSubmenu");
export const SelectedDropdownMenuItem = m("SelectedDropdownMenuItem", {
  value: S.String,
});
export const Message = S.Union([
  ToggledDropdownMenu,
  ClosedDropdownMenu,
  OpenedSubmenu,
  SelectedDropdownMenuItem,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ open: true, subOpen: true, selected: "" }, []];

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

const itemView = (label: string): Html =>
  DropdownMenu.itemView<Message>({
    onSelect: SelectedDropdownMenuItem({ value: label }),
    children: [html<Message>().span([], [label])],
  });

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return DropdownMenu.rootView<Message>({
    children: [
      DropdownMenu.triggerView<Message>({
        open: model.open,
        onToggle: ToggledDropdownMenu(),
        children: [h.span([], ["Open submenu"])],
      }),
      DropdownMenu.portalView<Message>({
        open: model.open,
        children: [
          DropdownMenu.backdropView<Message>({ onClose: ClosedDropdownMenu() }),
          DropdownMenu.positionerView<Message>({
            children: [
              DropdownMenu.popupView<Message>({
                children: [
                  itemView("New Tab"),
                  DropdownMenu.subTriggerView<Message>({
                    open: model.subOpen,
                    onOpen: OpenedSubmenu(),
                    children: [
                      h.span([], ["More Tools"]),
                      DropdownMenu.shortcutView<Message>("›"),
                    ],
                  }),
                  model.subOpen
                    ? DropdownMenu.subContentView<Message>({
                        children: [
                          itemView("Save Page As..."),
                          itemView("Create Shortcut..."),
                          itemView("Developer Tools"),
                        ],
                      })
                    : h.empty,
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
    ],
  });
});
