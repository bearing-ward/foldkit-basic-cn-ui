import { Match as M, Option, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Menu from "../../ui/base-ui-menu";

// MODEL

export const Model = S.Struct({
  open: S.Boolean,
  submenuOpen: S.Boolean,
  selected: S.String,
});

export type Model = typeof Model.Type;

// MESSAGE

export const ClickedFormat = m("ClickedFormat");
export const ClickedBackdrop = m("ClickedBackdrop");
export const ClickedAddToPlaylist = m("ClickedAddToPlaylist");
export const SelectedMenuItem = m("SelectedMenuItem", { value: S.String });

export const Message = S.Union([
  ClickedFormat,
  ClickedBackdrop,
  ClickedAddToPlaylist,
  SelectedMenuItem,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ open: false, selected: "", submenuOpen: false }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedFormat: () => [evo(model, { open: () => true }), []],
      ClickedBackdrop: () => [
        evo(model, { open: () => false, submenuOpen: () => false }),
        [],
      ],
      ClickedAddToPlaylist: () => [evo(model, { submenuOpen: () => true }), []],
      SelectedMenuItem: ({ value }) => [
        evo(model, {
          open: () => false,
          selected: () => value,
          submenuOpen: () => false,
        }),
        [],
      ],
    })
  );

// VIEW

const menuItemView = (value: string): Html => {
  const h = html<Message>();
  const selected = SelectedMenuItem({ value });

  return h.button(
    [
      h.Type("button"),
      h.Attribute("role", "menuitem"),
      h.OnPointerDown(() => Option.some(selected)),
      h.OnClick(selected),
      h.Class(`block w-full text-left ${Menu.baseUiMenuItemClassName}`),
    ],
    [h.span([], [value])]
  );
};

const submenuTriggerView = (): Html => {
  const h = html<Message>();

  return h.button(
    [
      h.Type("button"),
      h.Attribute("role", "menuitem"),
      h.Attribute("aria-haspopup", "menu"),
      h.OnClick(ClickedAddToPlaylist()),
      h.Class(
        `flex w-full items-center justify-between gap-4 ${Menu.baseUiMenuItemClassName}`
      ),
    ],
    [h.span([], ["Add to Playlist"]), h.span([h.AriaHidden(true)], [">"])]
  );
};

const submenuView = (open: boolean): Html => {
  const h = html<Message>();

  if (!open) {
    return h.empty;
  }

  return h.div(
    [
      h.Attribute("role", "menu"),
      h.Class(`${Menu.baseUiMenuPopupClassName} left-full top-10 ml-2 mt-0`),
    ],
    [
      menuItemView("Get Up!"),
      menuItemView("Inside Out"),
      menuItemView("Nightcall"),
    ]
  );
};

const popupView = (model: Model): Html => {
  const h = html<Message>();

  if (!model.open) {
    return h.empty;
  }

  return h.keyed("div")(
    model.submenuOpen ? "menu-open-submenu-open" : "menu-open-submenu-closed",
    [h.Class("relative")],
    [
      h.div(
        [h.Attribute("role", "menu"), h.Class(Menu.baseUiMenuPopupClassName)],
        [
          menuItemView("Add to Library"),
          submenuTriggerView(),
          menuItemView("Play Next"),
          menuItemView("Play Last"),
          menuItemView("Favorite"),
          menuItemView("Share"),
        ]
      ),
      submenuView(model.submenuOpen),
    ]
  );
};

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class(Menu.baseUiMenuRootClassName)],
    [
      h.button(
        [
          h.Type("button"),
          h.OnClick(ClickedFormat()),
          h.Class(Menu.baseUiMenuTriggerClassName),
        ],
        [h.span([], ["Format"])]
      ),
      model.open
        ? h.button(
            [
              h.Type("button"),
              h.AriaLabel("Close menu"),
              h.OnClick(ClickedBackdrop()),
              h.Class(Menu.baseUiMenuBackdropClassName),
            ],
            []
          )
        : h.empty,
      popupView(model),
      model.selected === ""
        ? h.empty
        : h.p(
            [h.Class("mt-3 text-sm text-gray-600")],
            [`Selected: ${model.selected}`]
          ),
    ]
  );
});
