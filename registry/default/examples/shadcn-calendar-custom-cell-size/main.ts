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

const prices = ["$100", "$100", "$100", "$100", "$120"];

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("rounded-lg border border-gray-200 bg-white p-3")],
    [
      h.div(
        [h.Class("mb-3 text-center text-sm font-medium")],
        ["December 2026"]
      ),
      h.div(
        [h.Class("grid grid-cols-7 gap-1 text-center text-sm")],
        [
          ...["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) =>
            h.div([h.Class("h-10 text-gray-500")], [day])
          ),
          ...Array.from({ length: 35 }, (_, index) => {
            const day = index < 2 ? index + 29 : index - 1;
            const price = prices[index % prices.length] ?? "$100";
            return h.button(
              [
                h.Type("button"),
                h.Disabled(true),
                h.AriaLabel(`December ${day} ${price}`),
                h.Class(
                  "flex size-12 flex-col items-center justify-center rounded-md text-sm data-[disabled]:cursor-default"
                ),
              ],
              [
                h.span([], [String(day)]),
                h.span([h.Class("text-[10px] text-gray-500")], [price]),
              ]
            );
          }),
        ]
      ),
    ]
  );
});
