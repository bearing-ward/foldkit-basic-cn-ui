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
  density: S.String,
});
export type Model = typeof Model.Type;

// MESSAGE

export const ToggledDropdownMenu = m("ToggledDropdownMenu");
export const ClosedDropdownMenu = m("ClosedDropdownMenu");
export const SelectedDensity = m("SelectedDensity", { value: S.String });
export const Message = S.Union([
  ToggledDropdownMenu,
  ClosedDropdownMenu,
  SelectedDensity,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ open: true, density: "Comfortable" }, []];

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
      SelectedDensity: ({ value }) => [
        evo(model, { density: () => value }),
        [],
      ],
    })
  );

// VIEW

const radioItemView = (label: string, selected: string): Html => {
  const h = html<Message>();
  const checked = label === selected;

  return DropdownMenu.radioItemView<Message>({
    checked,
    onSelect: SelectedDensity({ value: label }),
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
        children: [h.span([], ["Open density"])],
      }),
      DropdownMenu.portalView<Message>({
        open: model.open,
        children: [
          DropdownMenu.backdropView<Message>({ onClose: ClosedDropdownMenu() }),
          DropdownMenu.positionerView<Message>({
            children: [
              DropdownMenu.popupView<Message>({
                children: [
                  DropdownMenu.radioGroupView<Message>({
                    label: "Panel density",
                    children: [
                      radioItemView("Compact", model.density),
                      radioItemView("Comfortable", model.density),
                      radioItemView("Spacious", model.density),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      h.p([h.Class("mt-3 text-sm text-gray-600")], [
        `Density: ${model.density}`,
      ]),
    ],
  });
});
