import { Match as M, Option, Schema as S } from "effect";
import { Calendar, Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as UiCalendar from "../../ui/calendar";

// MODEL

export const Model = S.Struct({
  calendar: UiCalendar.Model,
  selectedDate: S.Option(Calendar.CalendarDate),
});

export type Model = typeof Model.Type;

// MESSAGE

export const GotCalendarMessage = m("GotCalendarMessage", {
  message: UiCalendar.Message,
});

export const Message = S.Union([GotCalendarMessage]);
export type Message = typeof Message.Type;

// INIT

const today = Calendar.make(2026, 4, 16);

const formatDate = (date: Calendar.CalendarDate): string =>
  `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [
  {
    calendar: UiCalendar.init({
      id: "calendar-bounds",
      today,
      minDate: Calendar.make(2026, 4, 10),
      maxDate: Calendar.make(2026, 4, 24),
      disabledDaysOfWeek: ["Sunday", "Saturday"],
      disabledDates: [Calendar.make(2026, 4, 16)],
    }),
    selectedDate: Option.none(),
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
                  selectedDate: () => Option.some(date),
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
          toView: UiCalendar.calendarView,
        },
        toParentMessage: (message) => GotCalendarMessage({ message }),
      }),
      h.p(
        [h.Class("text-sm text-gray-700")],
        [
          Option.match(model.selectedDate, {
            onNone: () => "Selected bounded date: None",
            onSome: (date) => `Selected bounded date: ${formatDate(date)}`,
          }),
        ]
      ),
      h.p(
        [h.Class("text-sm text-gray-700")],
        ["April 16 is disabled and the visible range is April 10 to April 24."]
      ),
    ]
  );
});
