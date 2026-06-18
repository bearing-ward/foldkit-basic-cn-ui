import { Match as M, Option, Schema as S } from "effect";
import { Calendar, Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as UiCalendar from "../../ui/shadcn-calendar";

// MODEL

export const Preset = S.Union([
  S.Literal("today"),
  S.Literal("tomorrow"),
  S.Literal("in-3-days"),
  S.Literal("in-a-week"),
  S.Literal("in-2-weeks"),
]);
export type Preset = typeof Preset.Type;

export const Model = S.Struct({
  calendar: UiCalendar.Model,
  selectedDate: Calendar.CalendarDate,
});

export type Model = typeof Model.Type;

// MESSAGE

export const GotCalendarMessage = m("GotCalendarMessage", {
  message: UiCalendar.Message,
});
export const ClickedPreset = m("ClickedPreset", { value: Preset });

export const Message = S.Union([GotCalendarMessage, ClickedPreset]);
export type Message = typeof Message.Type;

// INIT

const today = Calendar.make(2026, 4, 16);

const formatDate = (date: Calendar.CalendarDate): string =>
  `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;

const presetDate = (preset: Preset): Calendar.CalendarDate =>
  M.value(preset).pipe(
    M.withReturnType<Calendar.CalendarDate>(),
    M.when("today", () => today),
    M.when("tomorrow", () => Calendar.addDays(today, 1)),
    M.when("in-3-days", () => Calendar.addDays(today, 3)),
    M.when("in-a-week", () => Calendar.addDays(today, 7)),
    M.when("in-2-weeks", () => Calendar.addDays(today, 14)),
    M.exhaustive
  );

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [
  {
    calendar: UiCalendar.init({
      id: "shadcn-calendar-presets",
      today,
      initialSelectedDate: today,
    }),
    selectedDate: today,
  },
  [],
];

// UPDATE

const applyCalendarUpdate = (
  model: Model,
  calendar: UiCalendar.Model,
  commands: readonly Command.Command<UiCalendar.Message>[],
  maybeOutMessage: Option.Option<UiCalendar.OutMessage>
): readonly [Model, readonly Command.Command<Message>[]] => {
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
    Command.mapMessages(commands, (message) => GotCalendarMessage({ message })),
  ];
};

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

        return applyCalendarUpdate(model, calendar, commands, maybeOutMessage);
      },
      ClickedPreset: ({ value }) => {
        const [calendar, commands, maybeOutMessage] = UiCalendar.selectDate(
          model.calendar,
          presetDate(value)
        );

        return applyCalendarUpdate(model, calendar, commands, maybeOutMessage);
      },
    })
  );

// VIEW

const presetButton = (label: string, value: Preset): Html => {
  const h = html<Message>();

  return h.button(
    [
      h.Type("button"),
      h.OnClick(ClickedPreset({ value })),
      h.Class(
        "rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
      ),
    ],
    [label]
  );
};

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-4")],
    [
      h.div(
        [h.Class("flex flex-wrap gap-2")],
        [
          presetButton("Today", "today"),
          presetButton("Tomorrow", "tomorrow"),
          presetButton("In 3 days", "in-3-days"),
          presetButton("In a week", "in-a-week"),
          presetButton("In 2 weeks", "in-2-weeks"),
        ]
      ),
      h.submodel({
        slotId: model.calendar.id,
        model: model.calendar,
        view: UiCalendar.view,
        viewInputs: {
          toView: UiCalendar.shadcnCalendarView,
        },
        toParentMessage: (message) => GotCalendarMessage({ message }),
      }),
      h.p(
        [h.Class("text-sm text-gray-700")],
        [`Selected preset: ${formatDate(model.selectedDate)}`]
      ),
    ]
  );
});
