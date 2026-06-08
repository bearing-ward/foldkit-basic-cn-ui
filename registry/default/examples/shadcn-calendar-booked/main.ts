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

const initialDate = Calendar.make(2026, 4, 16);

const formatDate = (date: Calendar.CalendarDate): string =>
  `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [
  {
    calendar: UiCalendar.init({
      id: "shadcn-calendar-booked",
      today: Calendar.make(2026, 4, 16),
      initialSelectedDate: initialDate,
      disabledDates: [Calendar.make(2026, 4, 18), Calendar.make(2026, 4, 19)],
      disabledDaysOfWeek: ["Sunday", "Saturday"],
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

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  const calendar = h.submodel({
    slotId: model.calendar.id,
    model: model.calendar,
    view: UiCalendar.view,
    viewInputs: {
      toView: UiCalendar.shadcnCalendarView,
    },
    toParentMessage: (message) => GotCalendarMessage({ message }),
  });

  return h.div(
    [h.Class("space-y-3")],
    [
      calendar,
      h.p(
        [h.Class("text-sm text-gray-700")],
        [`Selected stay: ${formatDate(model.selectedDate)}`]
      ),
      h.p(
        [h.Class("text-sm text-gray-700")],
        ["April 18, April 19, and weekends are unavailable."]
      ),
    ]
  );
});
