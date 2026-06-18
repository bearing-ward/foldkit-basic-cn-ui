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
] => [{ open: true, selected: "" }, []];

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
        evo(model, { open: () => false, selected: () => value }),
        [],
      ],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return DropdownMenu.rootView<Message>({
    children: [
      DropdownMenu.triggerView<Message>({
        open: model.open,
        onToggle: ToggledDropdownMenu(),
        children: [h.span([], ["Open destructive"])],
      }),
      DropdownMenu.portalView<Message>({
        open: model.open,
        children: [
          DropdownMenu.backdropView<Message>({ onClose: ClosedDropdownMenu() }),
          DropdownMenu.positionerView<Message>({
            children: [
              DropdownMenu.popupView<Message>({
                children: [
                  DropdownMenu.itemView<Message>({
                    onSelect: SelectedDropdownMenuItem({ value: "Edit" }),
                    children: [h.span([], ["Edit"])],
                  }),
                  DropdownMenu.separatorView<Message>({}),
                  DropdownMenu.itemView<Message>({
                    destructive: true,
                    onSelect: SelectedDropdownMenuItem({ value: "Delete" }),
                    children: [h.span([], ["Delete"])],
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
    ],
  });
});
