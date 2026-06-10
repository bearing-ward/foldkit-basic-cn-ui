import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as NavigationMenu from "../../ui/base-ui-navigation-menu";

// MODEL

export const Model = S.Struct({
  openItem: S.String,
});

export type Model = typeof Model.Type;

// MESSAGE

export const ToggledNavigationMenuItem = m("ToggledNavigationMenuItem", {
  value: S.String,
});

export const Message = S.Union([ToggledNavigationMenuItem]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ openItem: "" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ToggledNavigationMenuItem: ({ value }) => [
        evo(model, {
          openItem: (openItem) => (openItem === value ? "" : value),
        }),
        [],
      ],
    })
  );

// VIEW

const cardView = (title: string, body: string): Html => {
  const h = html<Message>();

  return NavigationMenu.contentView<Message>({
    children: [
      h.h3([h.Class("text-base font-semibold text-gray-950")], [title]),
      h.p([h.Class("mt-1 text-sm leading-6 text-gray-600")], [body]),
    ],
  });
};

const popupView = (children: readonly Html[]): Html =>
  NavigationMenu.portalView<Message>({
    open: true,
    children: [
      NavigationMenu.positionerView<Message>({
        children: [
          NavigationMenu.popupView<Message>({
            children: [
              NavigationMenu.arrowView<Message>({}),
              NavigationMenu.viewportView<Message>({ children }),
            ],
          }),
        ],
      }),
    ],
  });

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const isOpen = (value: string): boolean => model.openItem === value;

  return NavigationMenu.rootView<Message>({
    children: [
      NavigationMenu.listView<Message>({
        children: [
          NavigationMenu.itemView<Message>({
            children: [
              NavigationMenu.triggerView<Message>({
                open: isOpen("Overview"),
                onToggle: ToggledNavigationMenuItem({ value: "Overview" }),
                children: [h.span([], ["Overview"])],
              }),
            ],
          }),
          NavigationMenu.itemView<Message>({
            children: [
              NavigationMenu.triggerView<Message>({
                open: isOpen("Handbook"),
                onToggle: ToggledNavigationMenuItem({ value: "Handbook" }),
                children: [h.span([], ["Handbook"])],
              }),
            ],
          }),
          NavigationMenu.itemView<Message>({
            children: [
              NavigationMenu.linkView<Message>({
                href: "https://github.com/",
                children: [h.span([], ["GitHub"])],
              }),
            ],
          }),
        ],
      }),
      isOpen("Overview")
        ? popupView([
            cardView(
              "Quick Start",
              "Install and assemble your first component."
            ),
            cardView(
              "Accessibility",
              "Learn how we build accessible components."
            ),
            cardView(
              "Releases",
              "See what’s new in the latest Base UI versions."
            ),
            cardView("About", "Learn more about Base UI and our mission."),
          ])
        : h.empty,
      isOpen("Handbook")
        ? popupView([
            cardView(
              "Styling",
              "Base UI components can be styled with plain CSS, Tailwind CSS, CSS-in-JS, or CSS Modules."
            ),
            cardView(
              "Animation",
              "Base UI components can be animated with CSS transitions, CSS animations, or JavaScript libraries."
            ),
            cardView(
              "Composition",
              "Base UI components can be replaced and composed with your own existing components."
            ),
          ])
        : h.empty,
    ],
  });
});
