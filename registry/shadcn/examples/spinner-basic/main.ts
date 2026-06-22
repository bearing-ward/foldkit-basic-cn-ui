import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as Spinner from "../../ui/spinner";

// MODEL

export const Model = S.Struct({});
export type Model = typeof Model.Type;

// MESSAGE

export const Message = S.Never;
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{}, []];

// UPDATE

export const update = (
  model: Model
): readonly [Model, readonly Command.Command<Message>[]] => [model, []];

// VIEW

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("w-full max-w-2xl space-y-6")],
    [
      h.div(
        [
          h.Class(
            "flex items-center justify-between rounded-lg border border-gray-200 p-4"
          ),
        ],
        [
          h.div(
            [h.Class("space-y-1")],
            [
              h.p([h.Class("text-sm font-medium leading-none")], [
                "Processing payment...",
              ]),
              h.p([h.Class("text-sm text-gray-500")], ["$100.00"]),
            ]
          ),
          Spinner.view<Message>(),
        ]
      ),
      h.div(
        [h.Class("flex items-center gap-4")],
        [
          Spinner.view<Message>({ classes: "size-4" }),
          Spinner.view<Message>({ classes: "size-6" }),
          Spinner.view<Message>({ classes: "size-8" }),
        ]
      ),
      h.div(
        [h.Class("flex flex-wrap items-center gap-3")],
        [
          h.button(
            [
              h.Class(
                "inline-flex h-9 items-center gap-2 rounded-md bg-gray-950 px-3 text-sm font-medium text-white"
              ),
              h.Disabled(true),
            ],
            [Spinner.view<Message>({ classes: "size-4" }), "Loading..."]
          ),
          h.span(
            [
              h.Class(
                "inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-900"
              ),
            ],
            [Spinner.view<Message>({ classes: "size-3" }), "Syncing"]
          ),
        ]
      ),
      h.div(
        [
          h.Class(
            "flex items-center gap-2 rounded-lg border border-gray-200 p-2"
          ),
        ],
        [
          h.input([
            h.Class("min-w-0 flex-1 px-2 text-sm outline-none"),
            h.Placeholder("Validating..."),
            h.AriaLabel("Message"),
          ]),
          Spinner.view<Message>({ classes: "size-4 text-gray-500" }),
          h.button(
            [
              h.Class(
                "inline-flex h-8 items-center rounded-md bg-gray-950 px-3 text-sm font-medium text-white"
              ),
            ],
            ["Send"]
          ),
        ]
      ),
      h.div(
        [
          h.Class(
            "rounded-lg border border-dashed border-gray-300 p-6 text-center"
          ),
        ],
        [
          h.div([h.Class("flex justify-center")], [Spinner.view<Message>()]),
          h.h3([h.Class("mt-3 text-sm font-medium text-gray-950")], [
            "Processing your request",
          ]),
          h.p([h.Class("mt-1 text-sm text-gray-500")], [
            "Please wait while we process your request. Do not refresh the page.",
          ]),
          h.button(
            [
              h.Class(
                "mt-4 inline-flex h-9 items-center rounded-md border border-gray-300 px-3 text-sm font-medium text-gray-900"
              ),
            ],
            ["Cancel"]
          ),
        ]
      ),
      h.div(
        [
          h.Dir("rtl"),
          h.Class(
            "flex items-center justify-between rounded-lg border border-gray-200 p-4"
          ),
        ],
        [
          h.div(
            [h.Class("space-y-1 text-right")],
            [
              h.p([h.Class("text-sm font-medium leading-none")], [
                "جاري معالجة الدفع...",
              ]),
              h.p([h.Class("text-sm text-gray-500")], ["١٠٠.٠٠ دولار"]),
            ]
          ),
          Spinner.view<Message>(),
        ]
      ),
    ]
  );
});
