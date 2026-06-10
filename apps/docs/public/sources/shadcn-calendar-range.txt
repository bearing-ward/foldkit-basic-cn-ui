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

const days = [
  ["28", "29", "30", "31", "1", "2", "3"],
  ["4", "5", "6", "7", "8", "9", "10"],
  ["11", "12", "13", "14", "15", "16", "17"],
  ["18", "19", "20", "21", "22", "23", "24"],
  ["25", "26", "27", "28", "29", "30", "31"],
];

const calendarView = (month: string): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("rounded-lg border border-gray-200 bg-white p-3")],
    [
      h.div([h.Class("mb-3 text-center text-sm font-medium")], [month]),
      h.div(
        [h.Class("grid grid-cols-7 gap-1 text-center text-sm")],
        [
          ...["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) =>
            h.div([h.Class("h-8 text-gray-500")], [day])
          ),
          ...days.flatMap((week) =>
            week.map((day) =>
              h.button(
                [
                  h.Type("button"),
                  h.Disabled(true),
                  h.Class(
                    "size-8 rounded-md text-sm data-[disabled]:cursor-default"
                  ),
                ],
                [day]
              )
            )
          ),
        ]
      ),
    ]
  );
};

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("grid gap-4 md:grid-cols-2")],
    [calendarView("January 2026"), calendarView("February 2026")]
  );
});
