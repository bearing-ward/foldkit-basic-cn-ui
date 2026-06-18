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
  showStatusBar: S.Boolean,
  showActivityBar: S.Boolean,
});
export type Model = typeof Model.Type;

// MESSAGE

export const ToggledDropdownMenu = m("ToggledDropdownMenu");
export const ClosedDropdownMenu = m("ClosedDropdownMenu");
export const ToggledStatusBar = m("ToggledStatusBar");
export const ToggledActivityBar = m("ToggledActivityBar");
export const Message = S.Union([
  ToggledDropdownMenu,
  ClosedDropdownMenu,
  ToggledStatusBar,
  ToggledActivityBar,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ open: true, showStatusBar: true, showActivityBar: false }, []];

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
      ToggledStatusBar: () => [
        evo(model, { showStatusBar: (showStatusBar) => !showStatusBar }),
        [],
      ],
      ToggledActivityBar: () => [
        evo(model, { showActivityBar: (showActivityBar) => !showActivityBar }),
        [],
      ],
    })
  );

// VIEW

const checkedItemView = (
  label: string,
  checked: boolean,
  onSelect: Message
): Html => {
  const h = html<Message>();

  return DropdownMenu.checkboxItemView<Message>({
    checked,
    onSelect,
    children: [
      DropdownMenu.itemIndicatorView<Message>({
        children: [h.span([], [checked ? "✓" : ""])],
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
        children: [h.span([], ["Open checkboxes"])],
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
                    children: [h.span([], ["Panels"])],
                  }),
                  checkedItemView(
                    "Status Bar",
                    model.showStatusBar,
                    ToggledStatusBar()
                  ),
                  checkedItemView(
                    "Activity Bar",
                    model.showActivityBar,
                    ToggledActivityBar()
                  ),
                ],
              }),
            ],
          }),
        ],
      }),
      h.p([h.Class("mt-3 text-sm text-gray-600")], [
        model.showStatusBar ? "Status Bar: on" : "Status Bar: off",
      ]),
      h.p([h.Class("text-sm text-gray-600")], [
        model.showActivityBar ? "Activity Bar: on" : "Activity Bar: off",
      ]),
    ],
  });
});
