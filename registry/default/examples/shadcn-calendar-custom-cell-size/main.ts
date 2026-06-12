import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

// MODEL

export const Model = S.Struct({
  selectedDay: S.Number,
});
export type Model = typeof Model.Type;

// MESSAGE

export const ClickedDay = m("ClickedDay", { day: S.Number });

export const Message = S.Union([ClickedDay]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ selectedDay: 16 }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedDay: ({ day }) => [evo(model, { selectedDay: () => day }), []],
    })
  );

// VIEW

const weeks = [
  ["29", "30", "1", "2", "3", "4", "5"],
  ["6", "7", "8", "9", "10", "11", "12"],
  ["13", "14", "15", "16", "17", "18", "19"],
  ["20", "21", "22", "23", "24", "25", "26"],
  ["27", "28", "29", "30", "31", "1", "2"],
];

const priceForDay = (day: number): string =>
  day === 5 || day % 7 === 6 ? "$120" : "$100";

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-3")],
    [
      h.div(
        [
          h.Class(
            "inline-flex min-w-[360px] select-none flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
          ),
        ],
        [
          h.div(
            [h.Class("flex items-center justify-between")],
            [
              h.button([h.Type("button"), h.Class("h-8 w-8 rounded-md")], ["<"]),
              h.div([h.Class("text-sm font-semibold tabular-nums")], [
                "December 2026",
              ]),
              h.button([h.Type("button"), h.Class("h-8 w-8 rounded-md")], [">"]),
            ]
          ),
          h.div(
            [h.Class("grid grid-cols-7 gap-1 text-center")],
            [
              ...["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) =>
                h.div([h.Class("h-8 text-sm text-gray-500")], [day])
              ),
              ...weeks.flatMap((week) =>
                week.map((label) => {
                  const day = Number(label);
                  const outsideMonth =
                    (day === 29 || day === 30) && week === weeks[0];
                  const selected = !outsideMonth && day === model.selectedDay;

                  return h.button(
                    [
                      h.Type("button"),
                      h.AriaLabel(
                        outsideMonth ? label : `${label} ${priceForDay(day)}`
                      ),
                      h.Attribute("aria-pressed", selected ? "true" : "false"),
                      ...(outsideMonth ? [] : [h.OnClick(ClickedDay({ day }))]),
                      h.Class(
                        [
                          "flex h-12 w-12 flex-col items-center justify-center rounded-md text-sm tabular-nums",
                          outsideMonth
                            ? "text-gray-400"
                            : "text-gray-900 hover:bg-gray-100",
                          selected
                            ? "bg-accent-600 text-white hover:bg-accent-600"
                            : "",
                        ].join(" ")
                      ),
                    ],
                    [
                      h.span([], [label]),
                      outsideMonth
                        ? h.span([h.Class("sr-only")], [""])
                        : h.span(
                            [
                              h.Class(
                                selected
                                  ? "text-[10px] leading-3 text-white"
                                  : "text-[10px] leading-3 text-gray-500"
                              ),
                            ],
                            [priceForDay(day)]
                          ),
                    ]
                  );
                })
              ),
            ]
          ),
        ]
      ),
      h.p(
        [h.Class("text-sm text-gray-700")],
        [`Selected date: 2026-12-${String(model.selectedDay).padStart(2, "0")}`]
      ),
    ]
  );
});
