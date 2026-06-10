import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

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
  model: Model,
  _message: Message
): readonly [Model, readonly Command.Command<Message>[]] => [model, []];

// VIEW

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-4 rounded-lg border border-gray-200 bg-white p-3")],
    [
      h.div([h.Class("text-center text-sm font-medium")], ["June 2026"]),
      h.div(
        [h.Class("grid grid-cols-7 gap-1 text-center text-sm")],
        [
          ...["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) =>
            h.div([h.Class("h-8 text-gray-500")], [day])
          ),
          ...Array.from({ length: 35 }, (_, index) =>
            h.button(
              [
                h.Type("button"),
                h.Disabled(true),
                h.Class("size-8 rounded-md data-[disabled]:cursor-default"),
              ],
              [String(index < 1 ? 31 : index)]
            )
          ),
        ]
      ),
      h.div(
        [h.Class("grid gap-3 sm:grid-cols-2")],
        [
          h.label(
            [h.Class("grid gap-1 text-sm font-medium text-gray-900")],
            [
              "Start Time",
              h.input([
                h.Type("time"),
                h.Value("09:00"),
                h.Disabled(true),
                h.Class("h-9 rounded-md border border-gray-300 px-3 text-sm"),
              ]),
            ]
          ),
          h.label(
            [h.Class("grid gap-1 text-sm font-medium text-gray-900")],
            [
              "End Time",
              h.input([
                h.Type("time"),
                h.Value("17:00"),
                h.Disabled(true),
                h.Class("h-9 rounded-md border border-gray-300 px-3 text-sm"),
              ]),
            ]
          ),
        ]
      ),
    ]
  );
});
