import { Match as M, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { childAttributes, html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Menu from "../../ui/base-ui-menu";
import * as Item from "../../ui/item";

type Action = "Edit" | "Duplicate" | "Archive";

const ActionMenu = Menu.create<Action>();
const actions: readonly Action[] = ["Edit", "Duplicate", "Archive"];

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
  const [menu, menuCommands] = Menu.init({ id: "item-dropdown-menu" });

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

const itemDropdownMenuView = (menu: Menu.Model): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId: menu.id,
    model: menu,
    view: ActionMenu.view,
    viewInputs: {
      anchor: Menu.baseUiMenuDefaultAnchor,
      items: actions,
      itemToConfig: (item) => ({
        className: Menu.baseUiMenuItemClassName,
        content: h.span([], [item]),
      }),
      buttonContent: h.span([h.Attribute("aria-hidden", "true")], ["..."]),
      buttonAttributes: childAttributes([
        h.Attribute("aria-label", "Open menu"),
        h.Class(
          "inline-flex size-8 items-center justify-center rounded-md border border-gray-200 bg-white text-lg leading-none text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-600"
        ),
      ]),
      itemsAttributes: childAttributes([
        h.Class(Menu.baseUiMenuPopupClassName),
      ]),
      backdropAttributes: childAttributes([
        h.DataAttribute("testid", "item-dropdown-backdrop"),
        h.Class(Menu.baseUiMenuBackdropClassName),
      ]),
      attributes: childAttributes([h.Class(Menu.baseUiMenuRootClassName)]),
    },
    toParentMessage: (message) => GotMenuMessage({ message }),
  });
};

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("w-full")],
    [
      Item.view<Message>({
        variant: "outline",
        children: [
          Item.mediaView<Message>({ variant: "avatar", children: ["ER"] }),
          Item.contentView<Message>({
            children: [
              Item.titleView<Message>({ children: ["Evil Rabbit"] }),
              Item.descriptionView<Message>({
                children: ["Last seen 5 months ago"],
              }),
            ],
          }),
          Item.actionsView<Message>({
            children: [itemDropdownMenuView(model.menu)],
          }),
        ],
      }),
    ]
  );
});
