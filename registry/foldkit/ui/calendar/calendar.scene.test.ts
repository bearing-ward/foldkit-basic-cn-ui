import { Match as M, Option, Schema as S } from "effect";
import { Calendar, Command, Scene, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";
import { describe, test } from "vitest";

import * as UiCalendar from "./index";

const GotCalendarMessage = m("GotCalendarMessage", {
  message: UiCalendar.Message,
});

const Model = S.Struct({
  calendar: UiCalendar.Model,
  selectedDate: S.String,
});

type Model = typeof Model.Type;

const Message = S.Union([GotCalendarMessage]);
type Message = typeof Message.Type;

const today = Calendar.make(2026, 4, 16);

const initialModel: Model = {
  calendar: UiCalendar.init({
    id: "registry-calendar",
    today,
    initialSelectedDate: today,
    disabledDates: [Calendar.make(2026, 4, 21)],
  }),
  selectedDate: "2026-04-16",
};

const formatDate = (date: Calendar.CalendarDate): string =>
  `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;

const update = (
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

        const selectedDate = Option.match(maybeOutMessage, {
          onNone: () => model.selectedDate,
          onSome: M.type<UiCalendar.OutMessage>().pipe(
            M.tagsExhaustive({
              ChangedViewMonth: () => model.selectedDate,
              SelectedDate: ({ date }) => formatDate(date),
            })
          ),
        });

        return [
          evo(model, {
            calendar: () => calendar,
            selectedDate: () => selectedDate,
          }),
          Command.mapMessages(commands, (message) =>
            GotCalendarMessage({ message })
          ),
        ];
      },
    })
  );

const view = Submodel.defineView<Model, Message>((model): Html => {
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
      h.p([], [`Selected: ${model.selectedDate}`]),
    ]
  );
});

describe("Calendar registry view", () => {
  test("renders selectable dates and disabled date attributes", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.expect(Scene.text("Selected: 2026-04-16")).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Tuesday, April 21, 2026" })
      ).toHaveAttr("aria-disabled", "true"),
      Scene.click(Scene.role("button", { name: "Monday, April 20, 2026" })),
      Scene.expect(Scene.text("Selected: 2026-04-20")).toExist()
    );
  });

  test("switches from days to month picker", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.click(Scene.role("button", { name: "Switch to month picker" })),
      Scene.Command.resolve(
        UiCalendar.FocusGrid,
        UiCalendar.CompletedFocusGrid(),
        (message) => GotCalendarMessage({ message })
      ),
      Scene.expect(
        Scene.role("button", { name: "Switch to year picker" })
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "April 2026" })).toExist()
    );
  });
});
