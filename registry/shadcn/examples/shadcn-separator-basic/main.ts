import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";

import * as Separator from "../../ui/shadcn-separator";

// MODEL

export const Model = S.Struct({});

export type Model = typeof Model.Type;

// MESSAGE

export const Message = m("Message");

export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{}, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      Message: () => [model, []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return h.div(
    [
      h.Style({
        "--border": "lab(90.952 0 -0.0000119209)",
      }),
      h.Class("space-y-8"),
    ],
    [
      h.div(
        [h.Class("space-y-1")],
        [
          h.h4(
            [h.Class("text-sm font-medium leading-none")],
            ["shadcn/ui"]
          ),
          h.p(
            [h.Class("text-sm font-medium text-gray-950")],
            ["The Foundation for your Design System"]
          ),
          h.p(
            [h.Class("text-sm text-gray-500")],
            [
              "A set of beautifully designed components that you can customize, extend, and build on.",
            ]
          ),
        ]
      ),
      Separator.view<Message>({ className: "my-4" }),
      h.div(
        [h.Class("flex h-5 items-center space-x-4 text-sm")],
        [
          h.div([], ["Blog"]),
          Separator.view<Message>({
            orientation: "vertical",
            style: { height: "100%", width: "1px" },
          }),
          h.div([], ["Docs"]),
          Separator.view<Message>({
            orientation: "vertical",
            style: { height: "100%", width: "1px" },
          }),
          h.div([], ["Source"]),
        ]
      ),
      h.div(
        [h.Class("grid gap-4 rounded-lg border border-gray-200 p-4")],
        [
          h.div(
            [h.Class("grid gap-1")],
            [
              h.div([h.Class("font-medium text-gray-950")], ["Settings"]),
              h.div([h.Class("text-sm text-gray-500")], [
                "Manage preferences",
              ]),
            ]
          ),
          Separator.view<Message>(),
          h.div(
            [h.Class("grid gap-1")],
            [
              h.div([h.Class("font-medium text-gray-950")], ["Account"]),
              h.div([h.Class("text-sm text-gray-500")], [
                "Profile & security",
              ]),
            ]
          ),
          Separator.view<Message>(),
          h.div(
            [h.Class("grid gap-1")],
            [
              h.div([h.Class("font-medium text-gray-950")], ["Help"]),
              h.div([h.Class("text-sm text-gray-500")], [
                "Support & docs",
              ]),
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("grid gap-3 rounded-lg border border-gray-200 p-4")],
        [
          h.div(
            [h.Class("flex items-center justify-between")],
            [
              h.span([h.Class("text-sm font-medium text-gray-950")], [
                "Item 1",
              ]),
              h.span([h.Class("text-sm text-gray-500")], ["Value 1"]),
            ]
          ),
          Separator.view<Message>(),
          h.div(
            [h.Class("flex items-center justify-between")],
            [
              h.span([h.Class("text-sm font-medium text-gray-950")], [
                "Item 2",
              ]),
              h.span([h.Class("text-sm text-gray-500")], ["Value 2"]),
            ]
          ),
          Separator.view<Message>(),
          h.div(
            [h.Class("flex items-center justify-between")],
            [
              h.span([h.Class("text-sm font-medium text-gray-950")], [
                "Item 3",
              ]),
              h.span([h.Class("text-sm text-gray-500")], ["Value 3"]),
            ]
          ),
        ]
      ),
    ]
  );
});
