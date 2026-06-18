import { Match as M, Option, Schema as S } from "effect";
import { Calendar, Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import { datePickerViewInputs as viewInputs } from "../../../foldkit/ui/date-picker/view";
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
    [h.Class("space-y-8")],
    [
      h.section(
        [h.Class("grid gap-3")],
        [
          h.h3([h.Class("text-base font-semibold text-gray-950")], ["Basic"]),
          h.label(
            [h.For("date-picker-basic-popover-button"), h.Class("px-1")],
            ["Date"]
          ),
          h.submodel({
            slotId: model.datePicker.id,
            model: model.datePicker,
            view: DatePicker.view,
            viewInputs: viewInputs({
              name: "appointment-date",
            }),
            toParentMessage: (message) => GotDatePickerMessage({ message }),
          }),
        ]
      ),
      h.section(
        [h.Class("space-y-3")],
        [
          h.h3([h.Class("text-base font-semibold text-gray-950")], [
            "Range Picker",
          ]),
          h.div(
            [
              h.Class(
                "inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              ),
            ],
            [
              h.span([], ["Jan 20, 2022"]),
              h.span([h.AriaHidden(true)], ["-"]),
              h.span([], ["Feb 09, 2022"]),
            ]
          ),
          h.p([h.Class("text-sm text-gray-600")], [
            "Selected range: 2022-01-20 to 2022-02-09",
          ]),
        ]
      ),
      h.section(
        [h.Class("space-y-3")],
        [
          h.h3([h.Class("text-base font-semibold text-gray-950")], [
            "Date of Birth",
          ]),
          h.div(
            [
              h.Class(
                "inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              ),
            ],
            [
              h.span([], ["June 15, 1990"]),
              h.span([h.Class("text-gray-500")], ["1900 - 2026"]),
            ]
          ),
          h.p([h.Class("text-sm text-gray-600")], [
            "Choose a birth date between 1900 and today.",
          ]),
        ]
      ),
      h.section(
        [h.Class("space-y-3")],
        [
          h.h3([h.Class("text-base font-semibold text-gray-950")], ["Input"]),
          h.input([
            h.AriaLabel("Date input"),
            h.Value("06/15/1990"),
            h.Class(
              "h-9 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-950"
            ),
          ]),
          h.p([h.Class("text-sm text-gray-600")], [
            "Parsed date: 1990-06-15",
          ]),
        ]
      ),
      h.section(
        [h.Class("space-y-3")],
        [
          h.h3([h.Class("text-base font-semibold text-gray-950")], [
            "Time Picker",
          ]),
          h.div([h.Class("flex flex-wrap items-center gap-2")], [
            h.input([
              h.AriaLabel("Date with time"),
              h.Value("2026-04-20"),
              h.Class(
                "h-9 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-950"
              ),
            ]),
            h.input([
              h.AriaLabel("Start time"),
              h.Value("10:30"),
              h.Class(
                "h-9 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-950"
              ),
            ]),
          ]),
          h.p([h.Class("text-sm text-gray-600")], [
            "Scheduled for 2026-04-20 at 10:30",
          ]),
        ]
      ),
      h.section(
        [h.Class("space-y-3")],
        [
          h.h3([h.Class("text-base font-semibold text-gray-950")], [
            "Natural Language Picker",
          ]),
          h.input([
            h.AriaLabel("Natural language date"),
            h.Value("tomorrow at 5pm"),
            h.Class(
              "h-9 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-950"
            ),
          ]),
          h.p([h.Class("text-sm text-gray-600")], [
            "Interpreted as Tomorrow at 5:00 PM",
          ]),
        ]
      ),
      h.section(
        [h.Attribute("dir", "rtl"), h.Class("space-y-3")],
        [
          h.h3([h.Class("text-base font-semibold text-gray-950")], ["RTL"]),
          h.div(
            [
              h.Class(
                "inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              ),
            ],
            ["اختر تاريخا"]
          ),
        ]
      ),
    ]
  );
});
