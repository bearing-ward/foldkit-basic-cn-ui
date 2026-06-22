import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as NavigationMenu from "../../ui/shadcn-navigation-menu";

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

const components = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content-known as tab panels-that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
] as const;

const listItemView = (
  title: string,
  body: string,
  href: string,
  classes?: string | undefined
): Html => {
  const h = html<Message>();

  return h.li(classes === undefined ? [] : [h.Class(classes)], [
    NavigationMenu.linkView<Message>({
      href,
      classes: "flex-col items-start",
      children: [
        h.div([h.Class("text-sm font-medium leading-none")], [title]),
        h.p(
          [h.Class("line-clamp-2 text-sm leading-snug text-gray-500")],
          [body]
        ),
      ],
    }),
  ]);
};

const iconListItemView = (label: string, icon: string): Html => {
  const h = html<Message>();

  return NavigationMenu.linkView<Message>({
    href: "#",
    classes: "flex-row items-center justify-start gap-2",
    children: [
      h.span([h.AriaHidden(true), h.Class("text-gray-500")], [icon]),
      h.span([], [label]),
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
        classes: "flex-wrap",
        children: [
          NavigationMenu.itemView<Message>({
            children: [
              NavigationMenu.triggerView<Message>({
                open: isOpen("Home"),
                onToggle: ToggledNavigationMenuItem({ value: "Home" }),
                children: [h.span([], ["Home"])],
              }),
            ],
          }),
          NavigationMenu.itemView<Message>({
            children: [
              NavigationMenu.triggerView<Message>({
                open: isOpen("Components"),
                onToggle: ToggledNavigationMenuItem({ value: "Components" }),
                children: [h.span([], ["Components"])],
              }),
            ],
          }),
          NavigationMenu.itemView<Message>({
            children: [
              NavigationMenu.linkView<Message>({
                href: "/docs",
                children: [h.span([], ["Docs"])],
              }),
            ],
          }),
          NavigationMenu.itemView<Message>({
            children: [
              NavigationMenu.linkView<Message>({
                href: "/docs",
                children: [h.span([], ["Documentation"])],
              }),
            ],
          }),
          NavigationMenu.itemView<Message>({
            classes: "hidden md:block",
            children: [
              NavigationMenu.triggerView<Message>({
                open: isOpen("List"),
                onToggle: ToggledNavigationMenuItem({ value: "List" }),
                children: [h.span([], ["List"])],
              }),
            ],
          }),
          NavigationMenu.itemView<Message>({
            classes: "hidden md:block",
            children: [
              NavigationMenu.triggerView<Message>({
                open: isOpen("Simple"),
                onToggle: ToggledNavigationMenuItem({ value: "Simple" }),
                children: [h.span([], ["Simple"])],
              }),
            ],
          }),
          NavigationMenu.itemView<Message>({
            classes: "hidden md:block",
            children: [
              NavigationMenu.triggerView<Message>({
                open: isOpen("With Icon"),
                onToggle: ToggledNavigationMenuItem({ value: "With Icon" }),
                children: [h.span([], ["With Icon"])],
              }),
            ],
          }),
          NavigationMenu.itemView<Message>({
            classes: "hidden md:block",
            children: [
              NavigationMenu.linkView<Message>({
                href: "#",
                children: [h.span([h.Dir("rtl")], ["الوثائق"])],
              }),
            ],
          }),
        ],
      }),
      isOpen("Home")
        ? popupView([
            h.ul(
              [
                h.Class(
                  "grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]"
                ),
              ],
              [
                h.li(
                  [h.Class("row-span-3")],
                  [
                    NavigationMenu.linkView<Message>({
                      href: "/",
                      classes:
                        "flex h-full w-full flex-col items-start justify-end rounded-md bg-linear-to-b from-gray-50 to-gray-100 p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6",
                      children: [
                        h.div(
                          [h.Class("mb-2 text-lg font-medium sm:mt-4")],
                          ["shadcn/ui"]
                        ),
                        h.p(
                          [h.Class("text-sm leading-tight text-gray-500")],
                          [
                            "Beautifully designed components built with Tailwind CSS.",
                          ]
                        ),
                      ],
                    }),
                  ]
                ),
                listItemView(
                  "Introduction",
                  "Re-usable components built using Radix UI and Tailwind CSS.",
                  "/docs"
                ),
                listItemView(
                  "Installation",
                  "How to install dependencies and structure your app.",
                  "/docs/installation"
                ),
                listItemView(
                  "Typography",
                  "Styles for headings, paragraphs, lists...etc",
                  "/docs/primitives/typography"
                ),
              ]
            ),
          ])
        : h.empty,
      isOpen("Components")
        ? popupView([
            h.ul(
              [
                h.Class(
                  "grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]"
                ),
              ],
              components.map((component) =>
                listItemView(
                  component.title,
                  component.description,
                  component.href
                )
              )
            ),
          ])
        : h.empty,
      isOpen("List")
        ? popupView([
            h.ul(
              [h.Class("grid w-[300px] gap-4")],
              [
                h.li(
                  [],
                  [
                    listItemView(
                      "Components",
                      "Browse all components in the library.",
                      "#"
                    ),
                    listItemView(
                      "Documentation",
                      "Learn how to use the library.",
                      "#"
                    ),
                    listItemView("Blog", "Read our latest blog posts.", "#"),
                  ]
                ),
              ]
            ),
          ])
        : h.empty,
      isOpen("Simple")
        ? popupView([
            h.ul(
              [h.Class("grid w-[200px] gap-4")],
              [
                h.li(
                  [],
                  [
                    NavigationMenu.linkView<Message>({
                      href: "#",
                      children: [h.span([], ["Components"])],
                    }),
                    NavigationMenu.linkView<Message>({
                      href: "#",
                      children: [h.span([], ["Documentation"])],
                    }),
                    NavigationMenu.linkView<Message>({
                      href: "#",
                      children: [h.span([], ["Blocks"])],
                    }),
                  ]
                ),
              ]
            ),
          ])
        : h.empty,
      isOpen("With Icon")
        ? popupView([
            h.ul(
              [h.Class("grid w-[200px] gap-4")],
              [
                h.li(
                  [],
                  [
                    iconListItemView("Backlog", "?"),
                    iconListItemView("To Do", "○"),
                    iconListItemView("Done", "✓"),
                  ]
                ),
              ]
            ),
          ])
        : h.empty,
    ],
  });
});
