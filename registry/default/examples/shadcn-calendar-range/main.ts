import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

// MODEL

export const Model = S.Struct({
  startMonth: S.Number,
  startDay: S.Number,
  endMonth: S.Number,
  endDay: S.Number,
  selecting: S.Union([S.Literal("start"), S.Literal("end")]),
});
export type Model = typeof Model.Type;

// MESSAGE

export const ClickedRangeDay = m("ClickedRangeDay", {
  month: S.Number,
  day: S.Number,
});

export const Message = S.Union([ClickedRangeDay]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [
  {
    startMonth: 1,
    startDay: 15,
    endMonth: 1,
    endDay: 20,
    selecting: "start",
  },
  [],
];

// UPDATE

const dateIndex = (month: number, day: number): number => month * 100 + day;

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedRangeDay: ({ month, day }) => {
        if (model.selecting === "start") {
          return [
            evo(model, {
              startMonth: () => month,
              startDay: () => day,
              endMonth: () =>
                dateIndex(month, day) > dateIndex(model.endMonth, model.endDay)
                  ? month
                  : model.endMonth,
              endDay: () =>
                dateIndex(month, day) > dateIndex(model.endMonth, model.endDay)
                  ? day
                  : model.endDay,
              selecting: () => "end",
            }),
            [],
          ];
        }

        return [
          evo(model, {
            startMonth: () =>
              dateIndex(month, day) < dateIndex(model.startMonth, model.startDay)
                ? month
                : model.startMonth,
            startDay: () =>
              dateIndex(month, day) < dateIndex(model.startMonth, model.startDay)
                ? day
                : model.startDay,
            endMonth: () => month,
            endDay: () => day,
            selecting: () => "start",
          }),
          [],
        ];
      },
    })
  );

// VIEW

type CalendarCell = {
  readonly month: number;
  readonly day: number;
  readonly outsideMonth: boolean;
};

const januaryWeeks: ReadonlyArray<ReadonlyArray<CalendarCell>> = [
  [
    { month: 12, day: 28, outsideMonth: true },
    { month: 12, day: 29, outsideMonth: true },
    { month: 12, day: 30, outsideMonth: true },
    { month: 12, day: 31, outsideMonth: true },
    { month: 1, day: 1, outsideMonth: false },
    { month: 1, day: 2, outsideMonth: false },
    { month: 1, day: 3, outsideMonth: false },
  ],
  [
    { month: 1, day: 4, outsideMonth: false },
    { month: 1, day: 5, outsideMonth: false },
    { month: 1, day: 6, outsideMonth: false },
    { month: 1, day: 7, outsideMonth: false },
    { month: 1, day: 8, outsideMonth: false },
    { month: 1, day: 9, outsideMonth: false },
    { month: 1, day: 10, outsideMonth: false },
  ],
  [
    { month: 1, day: 11, outsideMonth: false },
    { month: 1, day: 12, outsideMonth: false },
    { month: 1, day: 13, outsideMonth: false },
    { month: 1, day: 14, outsideMonth: false },
    { month: 1, day: 15, outsideMonth: false },
    { month: 1, day: 16, outsideMonth: false },
    { month: 1, day: 17, outsideMonth: false },
  ],
  [
    { month: 1, day: 18, outsideMonth: false },
    { month: 1, day: 19, outsideMonth: false },
    { month: 1, day: 20, outsideMonth: false },
    { month: 1, day: 21, outsideMonth: false },
    { month: 1, day: 22, outsideMonth: false },
    { month: 1, day: 23, outsideMonth: false },
    { month: 1, day: 24, outsideMonth: false },
  ],
  [
    { month: 1, day: 25, outsideMonth: false },
    { month: 1, day: 26, outsideMonth: false },
    { month: 1, day: 27, outsideMonth: false },
    { month: 1, day: 28, outsideMonth: false },
    { month: 1, day: 29, outsideMonth: false },
    { month: 1, day: 30, outsideMonth: false },
    { month: 1, day: 31, outsideMonth: false },
  ],
];

const februaryWeeks: ReadonlyArray<ReadonlyArray<CalendarCell>> = [
  [
    { month: 2, day: 1, outsideMonth: false },
    { month: 2, day: 2, outsideMonth: false },
    { month: 2, day: 3, outsideMonth: false },
    { month: 2, day: 4, outsideMonth: false },
    { month: 2, day: 5, outsideMonth: false },
    { month: 2, day: 6, outsideMonth: false },
    { month: 2, day: 7, outsideMonth: false },
  ],
  [
    { month: 2, day: 8, outsideMonth: false },
    { month: 2, day: 9, outsideMonth: false },
    { month: 2, day: 10, outsideMonth: false },
    { month: 2, day: 11, outsideMonth: false },
    { month: 2, day: 12, outsideMonth: false },
    { month: 2, day: 13, outsideMonth: false },
    { month: 2, day: 14, outsideMonth: false },
  ],
  [
    { month: 2, day: 15, outsideMonth: false },
    { month: 2, day: 16, outsideMonth: false },
    { month: 2, day: 17, outsideMonth: false },
    { month: 2, day: 18, outsideMonth: false },
    { month: 2, day: 19, outsideMonth: false },
    { month: 2, day: 20, outsideMonth: false },
    { month: 2, day: 21, outsideMonth: false },
  ],
  [
    { month: 2, day: 22, outsideMonth: false },
    { month: 2, day: 23, outsideMonth: false },
    { month: 2, day: 24, outsideMonth: false },
    { month: 2, day: 25, outsideMonth: false },
    { month: 2, day: 26, outsideMonth: false },
    { month: 2, day: 27, outsideMonth: false },
    { month: 2, day: 28, outsideMonth: false },
  ],
  [
    { month: 3, day: 1, outsideMonth: true },
    { month: 3, day: 2, outsideMonth: true },
    { month: 3, day: 3, outsideMonth: true },
    { month: 3, day: 4, outsideMonth: true },
    { month: 3, day: 5, outsideMonth: true },
    { month: 3, day: 6, outsideMonth: true },
    { month: 3, day: 7, outsideMonth: true },
  ],
];

const monthName = (month: number): string =>
  M.value(month).pipe(
    M.when(1, () => "January"),
    M.when(2, () => "February"),
    M.when(3, () => "March"),
    M.orElse(() => "December")
  );

const monthWeeks = (
  month: number
): ReadonlyArray<ReadonlyArray<CalendarCell>> =>
  M.value(month).pipe(
    M.when(1, () => januaryWeeks),
    M.orElse(() => februaryWeeks)
  );

const isSelected = (
  model: Model,
  month: number,
  day: number
): boolean =>
  dateIndex(month, day) === dateIndex(model.startMonth, model.startDay) ||
  dateIndex(month, day) === dateIndex(model.endMonth, model.endDay);

const isInRange = (model: Model, month: number, day: number): boolean =>
  dateIndex(month, day) >= dateIndex(model.startMonth, model.startDay) &&
  dateIndex(month, day) <= dateIndex(model.endMonth, model.endDay);

const calendarView = (model: Model, month: number, label: string): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("rounded-lg border border-gray-200 bg-white p-3")],
    [
      h.div([h.Class("mb-3 text-center text-sm font-medium")], [label]),
      h.div(
        [h.Class("grid grid-cols-7 gap-1 text-center text-sm")],
        [
          ...["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) =>
            h.div([h.Class("h-8 text-gray-500")], [day])
          ),
          ...monthWeeks(month).flatMap((week) =>
            week.map((cell) => {
              const selected =
                !cell.outsideMonth && isSelected(model, cell.month, cell.day);
              const inRange =
                !cell.outsideMonth && isInRange(model, cell.month, cell.day);

              return h.button(
                [
                  h.Type("button"),
                  h.Attribute("aria-pressed", selected ? "true" : "false"),
                  h.AriaLabel(`${monthName(cell.month)} ${cell.day}, 2026`),
                  ...(cell.outsideMonth
                    ? [h.Disabled(true)]
                    : [
                        h.OnClick(
                          ClickedRangeDay({ month: cell.month, day: cell.day })
                        ),
                      ]),
                  h.Class(
                    [
                      "size-8 rounded-md text-sm tabular-nums",
                      cell.outsideMonth ? "text-gray-400" : "text-gray-900",
                      inRange ? "bg-accent-100 text-accent-900" : "hover:bg-gray-100",
                      selected ? "bg-accent-600 text-white hover:bg-accent-600" : "",
                    ].join(" ")
                  ),
                ],
                [String(cell.day)]
              );
            })
          ),
        ]
      ),
    ]
  );
};

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-3")],
    [
      h.div(
        [h.Class("grid gap-4 md:grid-cols-2")],
        [
          calendarView(model, 1, "January 2026"),
          calendarView(model, 2, "February 2026"),
        ]
      ),
      h.p(
        [h.Class("text-sm text-gray-700")],
        [
          `Selected range: 2026-${String(model.startMonth).padStart(2, "0")}-${String(model.startDay).padStart(2, "0")} to 2026-${String(model.endMonth).padStart(2, "0")}-${String(model.endDay).padStart(2, "0")}`,
        ]
      ),
    ]
  );
});
