import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Collapsible from "../../ui/shadcn-collapsible";

// MODEL

export const Model = S.Struct({
  open: S.Boolean,
});

export type Model = typeof Model.Type;

// MESSAGE

export const ClickedTrigger = m("ClickedTrigger");

export const Message = S.Union([ClickedTrigger]);
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
      ClickedTrigger: () => [evo(model, { open: (open) => !open }), []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const panelId = "order-4189-details";

  return Collapsible.rootView<Message>({
    open: model.open,
    classes:
      "flex w-[350px] max-w-full flex-col gap-2 border-0 p-0 shadow-none",
    children: [
      h.div(
        [h.Class("flex items-center justify-between gap-4 px-4")],
        [
          h.h4([h.Class("text-sm font-semibold")], ["Order #4189"]),
          h.button(
            [
              h.Type("button"),
              h.AriaLabel("Toggle details"),
              h.AriaControls(panelId),
              h.AriaExpanded(model.open),
              h.OnClick(ClickedTrigger()),
              h.Class(
                "inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-transparent text-sm font-medium transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600"
              ),
            ],
            [
              h.span(
                [h.AriaHidden(true), h.Class("text-base leading-none")],
                ["↕"]
              ),
              h.span([h.Class("sr-only")], ["Toggle details"]),
            ]
          ),
        ]
      ),
      h.div(
        [
          h.Class(
            "flex items-center justify-between rounded-md border border-gray-200 px-4 py-2 text-sm"
          ),
        ],
        [
          h.span([h.Class("text-gray-500")], ["Status"]),
          h.span([h.Class("font-medium")], ["Shipped"]),
        ]
      ),
      Collapsible.panelView<Message>({
        open: model.open,
        id: panelId,
        classes: "mt-0 border-0 bg-transparent",
        children: [
          Collapsible.contentView<Message>(
            [
              h.div(
                [
                  h.Class(
                    "rounded-md border border-gray-200 px-4 py-2 text-sm"
                  ),
                ],
                [
                  h.p([h.Class("font-medium")], ["Shipping address"]),
                  h.p(
                    [h.Class("text-gray-500")],
                    ["100 Market St, San Francisco"]
                  ),
                ]
              ),
              h.div(
                [
                  h.Class(
                    "rounded-md border border-gray-200 px-4 py-2 text-sm"
                  ),
                ],
                [
                  h.p([h.Class("font-medium")], ["Items"]),
                  h.p([h.Class("text-gray-500")], ["2x Studio Headphones"]),
                ]
              ),
            ],
            "flex flex-col gap-2 p-0"
          ),
        ],
      }),
    ],
  });
});
