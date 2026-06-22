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

const caretDownIcon = (): Html => {
  const h = html<Message>();

  return h.svg(
    [
      h.Attribute("width", "16"),
      h.Attribute("height", "16"),
      h.Attribute("viewBox", "0 0 16 16"),
      h.Attribute("fill", "currentColor"),
      h.AriaHidden(true),
      h.Class("block"),
    ],
    [h.path([h.Attribute("d", "M12 6H4l4 4.5z")], [])]
  );
};

const caretRightIcon = (): Html => {
  const h = html<Message>();

  return h.svg(
    [
      h.Attribute("width", "16"),
      h.Attribute("height", "16"),
      h.Attribute("viewBox", "0 0 16 16"),
      h.Attribute("fill", "currentColor"),
      h.AriaHidden(true),
      h.Class("block"),
    ],
    [h.path([h.Attribute("d", "M6 12V4l4.5 4z")], [])]
  );
};

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
      h.Class(`block w-full text-left ${Menu.baseUiMenuItemClasses}`),
    ],
    [h.span([], [value])]
  );
};

const separatorView = (): Html => {
  const h = html<Message>();

  return h.div(
    [
      h.Attribute("role", "separator"),
      h.AriaHidden(true),
      h.Class("my-1 h-px bg-gray-200"),
    ],
    []
  );
};

const submenuTriggerView = (open: boolean): Html => {
  const h = html<Message>();

  return h.button(
    [
      h.Type("button"),
      h.Attribute("role", "menuitem"),
      h.Attribute("aria-haspopup", "menu"),
      h.Attribute("aria-expanded", open ? "true" : "false"),
      ...(open ? [h.DataAttribute("popup-open", "")] : []),
      h.OnClick(ClickedAddToPlaylist()),
      h.Class(
        `flex w-full items-center justify-between gap-4 ${Menu.baseUiMenuItemClasses} data-[popup-open]:bg-gray-100`
      ),
    ],
    [h.span([], ["Add to Playlist"]), caretRightIcon()]
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
      h.DataAttribute("testid", "playlist-submenu"),
      h.Class(`${Menu.baseUiMenuPopupClasses} left-48 top-8 -ml-1 mt-0`),
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
        [h.Attribute("role", "menu"), h.Class(Menu.baseUiMenuPopupClasses)],
        [
          menuItemView("Add to Library"),
          submenuTriggerView(model.submenuOpen),
          separatorView(),
          menuItemView("Play Next"),
          menuItemView("Play Last"),
          separatorView(),
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
    [h.Class(Menu.baseUiMenuRootClasses)],
    [
      h.button(
        [
          h.Type("button"),
          h.OnClick(ClickedFormat()),
          h.Class(Menu.baseUiMenuTriggerClasses),
        ],
        [
          h.span(
            [h.Class("inline-flex items-center gap-2")],
            [h.span([], ["Song"]), caretDownIcon()]
          ),
        ]
      ),
      model.open
        ? h.button(
            [
              h.Type("button"),
              h.AriaLabel("Close menu"),
              h.OnClick(ClickedBackdrop()),
              h.Class(Menu.baseUiMenuBackdropClasses),
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
