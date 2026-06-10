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

const weeks = [
  ["06", "1", "2", "3", "4", "5", "6", "7"],
  ["07", "8", "9", "10", "11", "12", "13", "14"],
  ["08", "15", "16", "17", "18", "19", "20", "21"],
  ["09", "22", "23", "24", "25", "26", "27", "28"],
];

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("rounded-lg border border-gray-200 bg-white p-3")],
    [
      h.div(
        [h.Class("mb-3 text-center text-sm font-medium")],
        ["February 2026"]
      ),
      h.div(
        [h.Class("grid grid-cols-8 gap-1 text-center text-sm")],
        [
          h.div([h.Class("h-8 text-gray-400")], [""]),
          ...["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) =>
            h.div([h.Class("h-8 text-gray-500")], [day])
          ),
          ...weeks.flatMap((week) =>
            week.map((cell, index) =>
              h.button(
                [
                  h.Type("button"),
                  h.Disabled(true),
                  h.Class(
                    index === 0
                      ? "size-8 rounded-md text-gray-500 data-[disabled]:cursor-default"
                      : "size-8 rounded-md data-[disabled]:cursor-default"
                  ),
                ],
                [cell]
              )
            )
          ),
        ]
      ),
    ]
  );
});
