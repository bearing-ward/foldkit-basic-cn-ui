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

const weekRows: ReadonlyArray<readonly [string, ReadonlyArray<string>]> = [
  ["06", ["1", "2", "3", "4", "5", "6", "7"]],
  ["07", ["8", "9", "10", "11", "12", "13", "14"]],
  ["08", ["15", "16", "17", "18", "19", "20", "21"]],
  ["09", ["22", "23", "24", "25", "26", "27", "28"]],
];

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [
      h.Class(
        "inline-flex select-none flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
      ),
    ],
    [
      h.div(
        [h.Class("flex items-center justify-between")],
        [
          h.button([h.Type("button"), h.Class("h-8 w-8 rounded-md")], ["<"]),
          h.div([h.Class("text-sm font-semibold tabular-nums")], [
            "February 2026",
          ]),
          h.button([h.Type("button"), h.Class("h-8 w-8 rounded-md")], [">"]),
        ]
      ),
      h.div(
        [h.Class("grid gap-1 text-center")],
        [
          h.div(
            [h.Class("grid grid-cols-8 gap-1")],
            [
              h.div([h.Class("h-8")], [""]),
              ...["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) =>
                h.div([h.Class("h-8 text-sm text-gray-500")], [day])
              ),
            ]
          ),
          ...weekRows.map(([weekNumber, days]) =>
            h.div(
              [h.Class("grid grid-cols-8 gap-1")],
              [
                h.div(
                  [
                    h.Class(
                      "flex h-9 w-9 items-center justify-center text-sm tabular-nums text-gray-500"
                    ),
                  ],
                  [weekNumber]
                ),
                ...days.map((label) => {
                  const day = Number(label);
                  const selected = day === model.selectedDay;

                  return h.button(
                    [
                      h.Type("button"),
                      h.Attribute("aria-pressed", selected ? "true" : "false"),
                      h.OnClick(ClickedDay({ day })),
                      h.Class(
                        [
                          "flex h-9 w-9 items-center justify-center rounded-full text-sm tabular-nums",
                          selected
                            ? "bg-accent-600 text-white"
                            : "text-gray-900 hover:bg-gray-100",
                        ].join(" ")
                      ),
                    ],
                    [label]
                  );
                }),
              ]
            )
          ),
        ]
      ),
      h.p(
        [h.Class("text-sm text-gray-700")],
        [`Selected date: 2026-02-${String(model.selectedDay).padStart(2, "0")}`]
      ),
    ]
  );
});
