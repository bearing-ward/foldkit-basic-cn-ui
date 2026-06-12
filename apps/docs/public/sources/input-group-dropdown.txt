import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as DropdownMenu from "../../ui/dropdown-menu";
import * as InputGroup from "../../ui/input-group";

// MODEL

export const Model = S.Struct({
  open: S.Boolean,
  query: S.String,
  scope: S.String,
});
export type Model = typeof Model.Type;

// MESSAGE

export const ToggledDropdown = m("ToggledDropdown");
export const ClosedDropdown = m("ClosedDropdown");
export const UpdatedQuery = m("UpdatedQuery", { value: S.String });
export const SelectedScope = m("SelectedScope", { value: S.String });
export const Message = S.Union([
  ToggledDropdown,
  ClosedDropdown,
  UpdatedQuery,
  SelectedScope,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ open: true, query: "", scope: "Search In..." }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ToggledDropdown: () => [evo(model, { open: (open) => !open }), []],
      ClosedDropdown: () => [evo(model, { open: () => false }), []],
      UpdatedQuery: ({ value }) => [evo(model, { query: () => value }), []],
      SelectedScope: ({ value }) => [
        evo(model, { open: () => false, scope: () => value }),
        [],
      ],
    })
  );

// VIEW

const scopeItemView = (label: string): Html =>
  DropdownMenu.itemView<Message>({
    onSelect: SelectedScope({ value: label }),
    children: [html<Message>().span([], [label])],
  });

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return InputGroup.view<Message>({
    className: "w-full max-w-md",
    children: [
      InputGroup.inputView<Message>({
        ariaLabel: "Search",
        placeholder: "Search...",
        value: model.query,
        onInput: (value) => UpdatedQuery({ value }),
      }),
      InputGroup.addonView<Message>({
        align: "InlineEnd",
        children: [
          DropdownMenu.rootView<Message>({
            children: [
              DropdownMenu.triggerView<Message>({
                open: model.open,
                onToggle: ToggledDropdown(),
                children: [
                  h.span([], [model.scope]),
                  h.span([h.AriaHidden(true)], ["v"]),
                ],
              }),
              DropdownMenu.portalView<Message>({
                open: model.open,
                children: [
                  DropdownMenu.backdropView<Message>({
                    onClose: ClosedDropdown(),
                  }),
                  DropdownMenu.positionerView<Message>({
                    children: [
                      DropdownMenu.popupView<Message>({
                        children: [
                          scopeItemView("Documentation"),
                          scopeItemView("Components"),
                          scopeItemView("Blocks"),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          InputGroup.buttonView<Message>({
            ariaLabel: "More options",
            icon: true,
            children: ["..."],
          }),
        ],
      }),
    ],
  });
});
