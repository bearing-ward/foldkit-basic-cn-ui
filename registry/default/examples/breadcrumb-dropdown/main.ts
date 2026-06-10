import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Breadcrumb from "../../ui/breadcrumb";

// MODEL

export const Model = S.Struct({ open: S.Boolean });
export type Model = typeof Model.Type;

// MESSAGE

export const ClickedToggleMenu = m("ClickedToggleMenu");
export const ClickedDropdownItem = m("ClickedDropdownItem");
export const Message = S.Union([ClickedToggleMenu, ClickedDropdownItem]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ open: false }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedToggleMenu: () => [evo(model, { open: (open) => !open }), []],
      ClickedDropdownItem: () => [evo(model, { open: () => false }), []],
    })
  );

// VIEW

const menuClassName =
  "absolute z-10 mt-2 min-w-36 rounded-md border border-gray-200 bg-white p-1 text-sm shadow-lg";
const itemClassName =
  "block w-full rounded px-2 py-1.5 text-left text-gray-700 hover:bg-gray-100";

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("relative inline-block")],
    [
      Breadcrumb.rootView<Message>({
        children: [
          Breadcrumb.listView<Message>({
            children: [
              Breadcrumb.itemView<Message>({
                children: [
                  Breadcrumb.linkView<Message>({
                    href: "/",
                    children: ["Home"],
                  }),
                ],
              }),
              Breadcrumb.separatorView<Message>(),
              Breadcrumb.itemView<Message>({
                children: [
                  h.button(
                    [
                      h.Type("button"),
                      h.Attribute("aria-label", "Toggle menu"),
                      h.Attribute(
                        "aria-expanded",
                        model.open ? "true" : "false"
                      ),
                      h.Attribute("aria-haspopup", "menu"),
                      h.OnClick(ClickedToggleMenu()),
                      h.Class(
                        "inline-flex items-center gap-1 rounded-sm text-gray-600 hover:text-gray-950"
                      ),
                    ],
                    [
                      "Components",
                      h.span([h.Attribute("aria-hidden", "true")], ["⌄"]),
                    ]
                  ),
                  ...(model.open
                    ? [
                        h.div(
                          [h.Attribute("role", "menu"), h.Class(menuClassName)],
                          [
                            h.button(
                              [
                                h.Type("button"),
                                h.Attribute("role", "menuitem"),
                                h.OnClick(ClickedDropdownItem()),
                                h.Class(itemClassName),
                              ],
                              ["Documentation"]
                            ),
                            h.button(
                              [
                                h.Type("button"),
                                h.Attribute("role", "menuitem"),
                                h.OnClick(ClickedDropdownItem()),
                                h.Class(itemClassName),
                              ],
                              ["Themes"]
                            ),
                            h.button(
                              [
                                h.Type("button"),
                                h.Attribute("role", "menuitem"),
                                h.OnClick(ClickedDropdownItem()),
                                h.Class(itemClassName),
                              ],
                              ["GitHub"]
                            ),
                          ]
                        ),
                      ]
                    : []),
                ],
              }),
              Breadcrumb.separatorView<Message>(),
              Breadcrumb.itemView<Message>({
                children: [
                  Breadcrumb.pageView<Message>({ children: ["Breadcrumb"] }),
                ],
              }),
            ],
          }),
        ],
      }),
    ]
  );
});
