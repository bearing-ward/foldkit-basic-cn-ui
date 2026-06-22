import { Match as M, Option, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { childAttributes, html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as AlertDialog from "../../ui/base-ui-alert-dialog";
import * as Menu from "../../ui/base-ui-menu";

type Action = "Edit" | "Duplicate" | "Delete";

const ActionMenu = Menu.create<Action>();
const actions: readonly Action[] = ["Edit", "Duplicate", "Delete"];

// MODEL

export const Model = S.Struct({
  menu: Menu.Model,
  open: S.Boolean,
  deleted: S.Boolean,
});

export type Model = typeof Model.Type;

// MESSAGE

export const GotMenuMessage = m("GotMenuMessage", {
  message: Menu.Message,
});
export const ClickedCancelDelete = m("ClickedCancelDelete");
export const ClickedConfirmDelete = m("ClickedConfirmDelete");

export const Message = S.Union([
  GotMenuMessage,
  ClickedCancelDelete,
  ClickedConfirmDelete,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => {
  const [menu, menuCommands] = Menu.init({ id: "alert-dialog-menu" });

  return [
    { menu, open: false, deleted: false },
    Command.mapMessages(menuCommands, (message) => GotMenuMessage({ message })),
  ];
};

// UPDATE

const delegateMenu = (
  model: Model,
  message: Menu.Message
): readonly [Model, readonly Command.Command<Message>[]] => {
  const [menu, menuCommands, maybeOutMessage] = ActionMenu.update(
    model.menu,
    message
  );
  const shouldOpen = Option.match(maybeOutMessage, {
    onNone: () => false,
    onSome: M.type<Menu.OutMessage<Action>>().pipe(
      M.tagsExhaustive({
        Selected: ({ value }) => value === "Delete",
      })
    ),
  });

  return [
    evo(model, {
      menu: () => menu,
      open: (open) => (shouldOpen ? true : open),
    }),
    Command.mapMessages(menuCommands, (message) => GotMenuMessage({ message })),
  ];
};

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      GotMenuMessage: ({ message }) => delegateMenu(model, message),
      ClickedCancelDelete: () => [evo(model, { open: () => false }), []],
      ClickedConfirmDelete: () => [
        evo(model, { open: () => false, deleted: () => true }),
        [],
      ],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const titleId = "delete-item-title";
  const descriptionId = "delete-item-description";

  return AlertDialog.rootView<Message>({
    children: [
      h.submodel({
        slotId: model.menu.id,
        model: model.menu,
        view: ActionMenu.view,
        viewInputs: {
          anchor: Menu.baseUiMenuDefaultAnchor,
          items: actions,
          itemToConfig: (item) => ({
            classes: Menu.baseUiMenuItemClasses,
            content: h.span([], [item]),
          }),
          buttonContent: h.span([], ["Actions"]),
          buttonAttributes: childAttributes([
            h.Class(Menu.baseUiMenuTriggerClasses),
          ]),
          itemsAttributes: childAttributes([
            h.Class(Menu.baseUiMenuPopupClasses),
          ]),
          backdropAttributes: childAttributes([
            h.DataAttribute("testid", "alert-dialog-menu-backdrop"),
            h.Class(Menu.baseUiMenuBackdropClasses),
          ]),
          attributes: childAttributes([h.Class(Menu.baseUiMenuRootClasses)]),
        },
        toParentMessage: (message) => GotMenuMessage({ message }),
      }),
      ...(model.deleted
        ? [h.p([h.Class("text-sm text-gray-600")], ["Item deleted."])]
        : []),
      AlertDialog.portalView<Message>({
        open: model.open,
        children: [
          AlertDialog.backdropView<Message>({ children: [] }),
          AlertDialog.viewportView<Message>({
            children: [
              AlertDialog.popupView<Message>({
                titleId,
                descriptionId,
                children: [
                  AlertDialog.titleView<Message>({
                    id: titleId,
                    children: [h.span([], ["Delete item?"])],
                  }),
                  AlertDialog.descriptionView<Message>({
                    id: descriptionId,
                    children: [h.span([], ["This action cannot be undone."])],
                  }),
                  AlertDialog.actionsView<Message>({
                    children: [
                      AlertDialog.closeView<Message>({
                        onClick: ClickedCancelDelete(),
                        children: [h.span([], ["Cancel"])],
                      }),
                      AlertDialog.closeView<Message>({
                        variant: "Confirm",
                        onClick: ClickedConfirmDelete(),
                        children: [h.span([], ["Delete"])],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
});
