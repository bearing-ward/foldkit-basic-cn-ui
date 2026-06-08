import { Match as M, Option, Schema as S } from "effect";
import { Calendar, Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import { datePickerViewInputs as viewInputs } from "../../ui/date-picker/view";
import * as DatePicker from "../../ui/shadcn-date-picker";

// MODEL

export const Model = S.Struct({
  datePicker: DatePicker.Model,
  selectedDate: S.Option(Calendar.CalendarDate),
  viewedMonth: S.String,
});

export type Model = typeof Model.Type;

// MESSAGE

export const GotDatePickerMessage = m("GotDatePickerMessage", {
  message: DatePicker.Message,
});

export const Message = S.Union([GotDatePickerMessage]);
export type Message = typeof Message.Type;

// INIT

const today = Calendar.make(2026, 4, 16);

const formatMonth = (date: Calendar.CalendarDate): string =>
  `${date.year}-${String(date.month).padStart(2, "0")}`;

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [
  {
    datePicker: DatePicker.init({
      id: "date-picker-basic",
      today,
    }),
    selectedDate: Option.none(),
    viewedMonth: formatMonth(today),
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
      GotDatePickerMessage: ({ message }) => {
        const [datePicker, commands, maybeOutMessage] = DatePicker.update(
          model.datePicker,
          message
        );

        const nextModel = Option.match(maybeOutMessage, {
          onNone: () => evo(model, { datePicker: () => datePicker }),
          onSome: M.type<DatePicker.OutMessage>().pipe(
            M.tagsExhaustive({
              ChangedViewMonth: ({ year, month }) =>
                evo(model, {
                  datePicker: () => datePicker,
                  viewedMonth: () =>
                    `${year}-${String(month).padStart(2, "0")}`,
                }),
              SelectedDate: ({ date }) =>
                evo(model, {
                  datePicker: () => datePicker,
                  selectedDate: () => Option.some(date),
                }),
            })
          ),
        });

        return [
          nextModel,
          Command.mapMessages(commands, (message) =>
            GotDatePickerMessage({ message })
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
        slotId: model.datePicker.id,
        model: model.datePicker,
        view: DatePicker.view,
        viewInputs: viewInputs({
          name: "appointment-date",
        }),
        toParentMessage: (message) => GotDatePickerMessage({ message }),
      }),
      h.p(
        [h.Class("text-sm text-gray-700")],
        [
          Option.match(model.selectedDate, {
            onNone: () => "Selected date: None",
            onSome: (date) => `Selected date: ${DatePicker.formatDate(date)}`,
          }),
        ]
      ),
      h.p(
        [h.Class("text-sm text-gray-700")],
        [`Viewed month: ${model.viewedMonth}`]
      ),
    ]
  );
});
