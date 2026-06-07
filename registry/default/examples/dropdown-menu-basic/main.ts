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
  selected: S.String,
});
export type Model = typeof Model.Type;

// MESSAGE

export const ToggledDropdownMenu = m("ToggledDropdownMenu");
export const ClosedDropdownMenu = m("ClosedDropdownMenu");
export const SelectedDropdownMenuItem = m("SelectedDropdownMenuItem", {
  value: S.String,
});
export const Message = S.Union([
  ToggledDropdownMenu,
  ClosedDropdownMenu,
  SelectedDropdownMenuItem,
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
      ToggledDropdownMenu: () => [evo(model, { open: (open) => !open }), []],
      ClosedDropdownMenu: () => [evo(model, { open: () => false }), []],
      SelectedDropdownMenuItem: ({ value }) => [
        evo(model, {
          open: () => false,
          selected: () => value,
        }),
        [],
      ],
    })
  );

// VIEW

const itemView = (label: string, shortcut?: string): Html => {
  const h = html<Message>();

  return DropdownMenu.itemView<Message>({
    onSelect: SelectedDropdownMenuItem({ value: label }),
    children: [
      h.span([], [label]),
      ...(shortcut === undefined
        ? []
        : [DropdownMenu.shortcutView<Message>(shortcut)]),
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
        children: [h.span([], ["Open"])],
      }),
      DropdownMenu.portalView<Message>({
        open: model.open,
        children: [
          DropdownMenu.backdropView<Message>({
            onClose: ClosedDropdownMenu(),
          }),
          DropdownMenu.positionerView<Message>({
            children: [
              DropdownMenu.popupView<Message>({
                children: [
                  itemView("Profile", "⇧⌘P"),
                  itemView("Billing", "⌘B"),
                  itemView("Settings", "⌘S"),
                  DropdownMenu.separatorView<Message>({}),
                  DropdownMenu.itemView<Message>({
                    disabled: true,
                    onSelect: SelectedDropdownMenuItem({ value: "API" }),
                    children: [h.span([], ["API"])],
                  }),
                  DropdownMenu.separatorView<Message>({}),
                  itemView("Log out", "⇧⌘Q"),
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
