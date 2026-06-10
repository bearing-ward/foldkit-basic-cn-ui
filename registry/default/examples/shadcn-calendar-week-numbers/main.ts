import { Match as M, Schema as S } from "effect";
import { Calendar, Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as UiCalendar from "../../ui/shadcn-calendar";

// MODEL

export const Model = S.Struct({
  calendar: UiCalendar.Model,
});
export type Model = typeof Model.Type;

// MESSAGE

export const GotCalendarMessage = m("GotCalendarMessage", {
  message: UiCalendar.Message,
});

export const Message = S.Union([GotCalendarMessage]);
export type Message = typeof Message.Type;

// INIT

const today = Calendar.make(2026, 2, 16);

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [
  {
    calendar: UiCalendar.init({
      id: "shadcn-calendar-week-numbers",
      today,
      initialSelectedDate: today,
    }),
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
        const [calendar, commands] = UiCalendar.update(model.calendar, message);

        return [
          evo(model, { calendar: () => calendar }),
          Command.mapMessages(commands, (message) =>
            GotCalendarMessage({ message })
          ),
        ];
      },
    })
  );

// VIEW

const weekNumbers = ["06", "07", "08", "09"];

const weekNumberCalendarView = (
  attributes: UiCalendar.CalendarAttributes
): Html => {
  const h = html<UiCalendar.Message>();

  return M.value(attributes).pipe(
    M.tagsExhaustive({
      Days: (days) =>
        h.div(
          [...days.root, h.Class(UiCalendar.shadcnCalendarContainerClassName)],
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
                  [...days.headerRow, h.Class("grid grid-cols-8 gap-1")],
                  [
                    h.div(
                      [h.Class(UiCalendar.shadcnCalendarColumnHeaderClassName)],
                      [""]
                    ),
                    ...days.columnHeaders.map((header) =>
                      h.div(
                        [
                          ...header.attributes,
                          h.Class(
                            UiCalendar.shadcnCalendarColumnHeaderClassName
                          ),
                        ],
                        [header.name]
                      )
                    ),
                  ]
                ),
                ...days.weeks.map((week, index) =>
                  h.div(
                    [...week.attributes, h.Class("grid grid-cols-8 gap-1")],
                    [
                      h.div(
                        [
                          h.Class(
                            "flex h-9 w-9 items-center justify-center text-sm tabular-nums text-gray-500"
                          ),
                        ],
                        [weekNumbers[index] ?? ""]
                      ),
                      ...week.cells.map((cell) =>
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
                                  UiCalendar.shadcnCalendarDayButtonClassName
                                ),
                              ],
                              [cell.label]
                            ),
                          ]
                        )
                      ),
                    ]
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

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId: model.calendar.id,
    model: model.calendar,
    view: UiCalendar.view,
    viewInputs: {
      toView: weekNumberCalendarView,
    },
    toParentMessage: (message) => GotCalendarMessage({ message }),
  });
});
