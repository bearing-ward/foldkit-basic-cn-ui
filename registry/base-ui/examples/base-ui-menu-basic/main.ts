import { Match as M, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { childAttributes, html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Menu from "../../ui/base-ui-menu";

type Action =
  | "Add to Library"
  | "Add to Playlist"
  | "Show Lyrics"
  | "Repeat One"
  | "Sort by Recently Added"
  | "Sort by Title"
  | "Play Next"
  | "Play Last"
  | "Favorite"
  | "Share";

const ActionMenu = Menu.create<Action>();
const actions: readonly Action[] = [
  "Add to Library",
  "Add to Playlist",
  "Show Lyrics",
  "Repeat One",
  "Sort by Recently Added",
  "Sort by Title",
  "Play Next",
  "Play Last",
  "Favorite",
  "Share",
];

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

const checkIcon = (): Html => {
  const h = html<Message>();

  return h.svg(
    [
      h.Attribute("width", "16"),
      h.Attribute("height", "16"),
      h.Attribute("viewBox", "0 0 16 16"),
      h.Attribute("fill", "none"),
      h.Attribute("stroke", "currentColor"),
      h.Attribute("stroke-width", "2"),
      h.Attribute("stroke-linecap", "round"),
      h.Attribute("stroke-linejoin", "round"),
      h.AriaHidden(true),
      h.Class("block text-gray-900"),
    ],
    [h.path([h.Attribute("d", "M3.5 8.5 6.5 11.5 12.5 4.5")], [])]
  );
};

const emptyIndicator = (): Html => {
  const h = html<Message>();

  return h.span([h.AriaHidden(true), h.Class("block size-4")], []);
};

const radioIndicator = (selected: boolean): Html => {
  const h = html<Message>();

  return h.span(
    [
      h.AriaHidden(true),
      h.Class(
        "inline-flex size-4 items-center justify-center rounded-full border border-gray-400"
      ),
    ],
    selected
      ? [h.span([h.Class("block size-1.5 rounded-full bg-gray-900")], [])]
      : []
  );
};

const actionContent = (item: Action): Html => {
  const h = html<Message>();
  const label = h.span([], [item]);

  if (item === "Show Lyrics") {
    return h.span(
      [h.Class("flex items-center gap-2")],
      [checkIcon(), label]
    );
  }

  if (item === "Repeat One") {
    return h.span(
      [h.Class("flex items-center gap-2")],
      [emptyIndicator(), label]
    );
  }

  if (item === "Sort by Recently Added") {
    return h.span(
      [h.Class("flex items-center gap-2")],
      [radioIndicator(true), label]
    );
  }

  if (item === "Sort by Title") {
    return h.span(
      [h.Class("flex items-center gap-2")],
      [radioIndicator(false), label]
    );
  }

  return label;
};

const groupKey = (item: Action): string => {
  if (
    item === "Add to Library" ||
    item === "Add to Playlist" ||
    item === "Favorite" ||
    item === "Share"
  ) {
    return "Library";
  }

  if (item === "Show Lyrics" || item === "Repeat One") {
    return "Preferences";
  }

  if (item === "Sort by Recently Added" || item === "Sort by Title") {
    return "Sort";
  }

  return "Playback";
};

const groupHeading = (label: string): Menu.GroupHeading => {
  const h = html<Message>();

  return {
    className:
      "px-3 py-1.5 text-xs font-medium uppercase text-gray-500",
    content: h.span([], [label]),
  };
};

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
        content: actionContent(item),
      }),
      itemGroupKey: groupKey,
      groupToHeading: groupHeading,
      separatorClassName: "my-1 h-px bg-gray-200",
      buttonContent: h.span(
        [h.Class("inline-flex items-center gap-2")],
        [h.span([], ["Song"]), caretDownIcon()]
      ),
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
