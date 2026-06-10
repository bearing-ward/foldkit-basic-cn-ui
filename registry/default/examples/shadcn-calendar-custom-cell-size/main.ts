import { Match as M, Option, Schema as S } from "effect";
import { Calendar, Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as UiCalendar from "../../ui/shadcn-calendar";

// MODEL

export const Model = S.Struct({
  calendar: UiCalendar.Model,
  selectedDate: Calendar.CalendarDate,
});
export type Model = typeof Model.Type;

// MESSAGE

export const GotCalendarMessage = m("GotCalendarMessage", {
  message: UiCalendar.Message,
});

export const Message = S.Union([GotCalendarMessage]);
export type Message = typeof Message.Type;

// INIT

const initialDate = Calendar.make(2026, 12, 16);

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [
  {
    calendar: UiCalendar.init({
      id: "shadcn-calendar-custom-cell-size",
      today: initialDate,
      initialSelectedDate: initialDate,
    }),
    selectedDate: initialDate,
  },
  [],
];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      GotCalendarMessage: ({ message }) => {
        const [calendar, commands, maybeOutMessage] = UiCalendar.update(
          model.calendar,
          message
        );

        const nextModel = Option.match(maybeOutMessage, {
          onNone: () => evo(model, { calendar: () => calendar }),
          onSome: M.type<UiCalendar.OutMessage>().pipe(
            M.tagsExhaustive({
              ChangedViewMonth: () => evo(model, { calendar: () => calendar }),
              SelectedDate: ({ date }) =>
                evo(model, {
                  calendar: () => calendar,
                  selectedDate: () => date,
                }),
            })
          ),
        });

        return [
          nextModel,
          Command.mapMessages(commands, (message) =>
            GotCalendarMessage({ message })
          ),
        ];
      },
    })
  );

// VIEW

const priceForDate = (cell: UiCalendar.DayCell): string =>
  cell.isInViewMonth && (cell.date.day === 5 || cell.date.day % 7 === 6)
    ? "$120"
    : "$100";

const customCellSizeView = (
  attributes: UiCalendar.CalendarAttributes
): Html => {
  const h = html<UiCalendar.Message>();

  return M.value(attributes).pipe(
    M.withReturnType<Html>(),
    M.tagsExhaustive({
      Days: (days) =>
        h.div(
          [
            ...days.root,
            h.Class(
              "inline-flex min-h-[352px] min-w-[360px] select-none flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm [--cell-size:2.75rem] md:[--cell-size:3rem]"
            ),
          ],
          [
            h.div(
              [h.Class(UiCalendar.shadcnCalendarHeaderClassName)],
              [
                h.button(
                  [
                    ...days.previousMonthButton,
                    h.Class(UiCalendar.shadcnCalendarNavButtonClassName),
                  ],
                  ["<"]
                ),
                h.button(
                  [
                    h.Id(days.heading.id),
                    ...days.headingButton,
                    h.Class(UiCalendar.shadcnCalendarHeadingButtonClassName),
                  ],
                  [days.heading.text]
                ),
                h.button(
                  [
                    ...days.nextMonthButton,
                    h.Class(UiCalendar.shadcnCalendarNavButtonClassName),
                  ],
                  [">"]
                ),
              ]
            ),
            h.div(
              [...days.grid, h.Class(UiCalendar.shadcnCalendarGridClassName)],
              [
                h.div(
                  [
                    ...days.headerRow,
                    h.Class(UiCalendar.shadcnCalendarHeaderRowClassName),
                  ],
                  days.columnHeaders.map((header) =>
                    h.div(
                      [
                        ...header.attributes,
                        h.Class(UiCalendar.shadcnCalendarColumnHeaderClassName),
                      ],
                      [header.name]
                    )
                  )
                ),
                ...days.weeks.map((week) =>
                  h.div(
                    [
                      ...week.attributes,
                      h.Class(UiCalendar.shadcnCalendarWeekRowClassName),
                    ],
                    week.cells.map((cell) =>
                      h.div(
                        [
                          ...cell.cellAttributes,
                          h.Class(UiCalendar.shadcnCalendarCellClassName),
                        ],
                        [
                          h.button(
                            [
                              ...cell.buttonAttributes,
                              h.Class(
                                "flex h-[var(--cell-size)] w-[var(--cell-size)] cursor-pointer flex-col items-center justify-center rounded-md text-sm tabular-nums text-gray-900 hover:bg-gray-100 group-data-[disabled]:cursor-not-allowed group-data-[disabled]:opacity-40 group-data-[focused]:outline-2 group-data-[focused]:outline-offset-2 group-data-[focused]:outline-accent-500 group-data-[outside-month]:text-gray-400 group-data-[selected]:bg-accent-600 group-data-[selected]:text-white! group-data-[selected]:hover:bg-accent-600 group-data-[today]:ring-1 group-data-[today]:ring-gray-400"
                              ),
                            ],
                            [
                              h.span([], [cell.label]),
                              cell.isInViewMonth
                                ? h.span(
                                    [
                                      h.Class(
                                        "text-[10px] leading-3 text-gray-500 group-data-[selected]:text-white!"
                                      ),
                                    ],
                                    [priceForDate(cell)]
                                  )
                                : h.span([h.Class("sr-only")], [""]),
                            ]
                          ),
                        ]
                      )
                    )
                  )
                ),
              ]
            ),
          ]
        ),
      Months: (months) => UiCalendar.shadcnCalendarView(months),
      Years: (years) => UiCalendar.shadcnCalendarView(years),
    })
  );
};

const formatDate = (date: Calendar.CalendarDate): string =>
  `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-3")],
    [
      h.submodel({
        slotId: model.calendar.id,
        model: model.calendar,
        view: UiCalendar.view,
        viewInputs: {
          toView: customCellSizeView,
        },
        toParentMessage: (message) => GotCalendarMessage({ message }),
      }),
      h.p(
        [h.Class("text-sm text-gray-700")],
        [`Selected date: ${formatDate(model.selectedDate)}`]
      ),
    ]
  );
});
