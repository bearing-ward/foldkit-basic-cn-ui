import { Match as M, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { childAttributes, html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Menu from "../../ui/base-ui-menu";

type Action = "Bold" | "Italic" | "Underline" | "Strikethrough";

const ActionMenu = Menu.create<Action>();
const actions: readonly Action[] = [
  "Bold",
  "Italic",
  "Underline",
  "Strikethrough",
];

// MODEL

export const Model = S.Struct({
  menu: Menu.Model,
});

export type Model = typeof Model.Type;

// MESSAGE

export const GotMenuMessage = m("GotMenuMessage", {
  message: Menu.Message,
});

export const Message = S.Union([GotMenuMessage]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => {
  const [menu, menuCommands] = Menu.init({ id: "menu-basic" });

  return [
    { menu },
    Command.mapMessages(menuCommands, (message) => GotMenuMessage({ message })),
  ];
};

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      GotMenuMessage: ({ message }) => {
        const [menu, menuCommands] = ActionMenu.update(model.menu, message);

        return [
          evo(model, { menu: () => menu }),
          Command.mapMessages(menuCommands, (message) =>
            GotMenuMessage({ message })
          ),
        ];
      },
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId: model.menu.id,
    model: model.menu,
    view: ActionMenu.view,
    viewInputs: {
      anchor: Menu.baseUiMenuDefaultAnchor,
      items: actions,
      itemToConfig: (item) => ({
        className: Menu.baseUiMenuItemClassName,
        content: h.span([], [item]),
      }),
      buttonContent: h.span([], ["Format"]),
      buttonAttributes: childAttributes([
        h.Class(Menu.baseUiMenuTriggerClassName),
      ]),
      itemsAttributes: childAttributes([
        h.Class(Menu.baseUiMenuPopupClassName),
      ]),
      backdropAttributes: childAttributes([
        h.DataAttribute("testid", "menu-backdrop"),
        h.Class(Menu.baseUiMenuBackdropClassName),
      ]),
      attributes: childAttributes([h.Class(Menu.baseUiMenuRootClassName)]),
    },
    toParentMessage: (message) => GotMenuMessage({ message }),
  });
});
