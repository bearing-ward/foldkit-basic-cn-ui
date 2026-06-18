import { Match as M, Option, Schema as S } from "effect";
import { Calendar, Command, Scene, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";
import { describe, test } from "vitest";

import * as Popover from "../popover";
import * as DatePicker from "./index";

const GotDatePickerMessage = m("GotDatePickerMessage", {
  message: DatePicker.Message,
});

const Model = S.Struct({
  datePicker: DatePicker.Model,
  selectedDate: S.String,
});

type Model = typeof Model.Type;

const Message = S.Union([GotDatePickerMessage]);
type Message = typeof Message.Type;

const today = Calendar.make(2026, 4, 16);

const initialModel: Model = {
  datePicker: DatePicker.init({
    id: "registry-date-picker",
    today,
    disabledDates: [Calendar.make(2026, 4, 21)],
  }),
  selectedDate: "None",
};

const AnchorDatePickerPopover = Popover.AnchorPopover({
  buttonId: "registry-date-picker-popover-button",
  anchor: DatePicker.anchorConfig,
  focusSelector: "#registry-date-picker-calendar-grid",
});

const toParentPopoverMessage = (message: Popover.Message) =>
  GotDatePickerMessage({
    message: DatePicker.GotPopoverMessage({ message }),
  });

const resolveDatePickerMounts = () =>
  Scene.Mount.resolveAll(
    [
      Popover.PortalPopoverBackdrop,
      Popover.CompletedPortalPopoverBackdrop(),
      toParentPopoverMessage,
    ],
    [
      AnchorDatePickerPopover,
      Popover.CompletedAnchorPopover(),
      toParentPopoverMessage,
    ]
  );

const resolveFocusButton = () =>
  Scene.Command.resolve(
    Popover.FocusButton({ id: "registry-date-picker-popover" }),
    Popover.CompletedFocusButton(),
    toParentPopoverMessage
  );

const expectDatePickerMountsEnded = () =>
  Scene.Mount.expectEnded(
    Popover.PortalPopoverBackdrop,
    AnchorDatePickerPopover
  );

const update = (
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

        const selectedDate = Option.match(maybeOutMessage, {
          onNone: () => model.selectedDate,
          onSome: M.type<DatePicker.OutMessage>().pipe(
            M.tagsExhaustive({
              ChangedViewMonth: () => model.selectedDate,
              SelectedDate: ({ date }) => DatePicker.formatDate(date),
            })
          ),
        });

        return [
          evo(model, {
            datePicker: () => datePicker,
            selectedDate: () => selectedDate,
          }),
          Command.mapMessages(commands, (message) =>
            GotDatePickerMessage({ message })
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
        slotId: model.datePicker.id,
        model: model.datePicker,
        view: DatePicker.view,
        viewInputs: DatePicker.datePickerViewInputs(),
        toParentMessage: (message) => GotDatePickerMessage({ message }),
      }),
      h.p([], [`Selected: ${model.selectedDate}`]),
    ]
  );
});

describe("DatePicker registry view", () => {
  test("opens calendar, exposes disabled date attributes, and selects a date", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.expect(
        Scene.selector("#registry-date-picker-popover-button")
      ).toExist(),
      Scene.click(Scene.selector("#registry-date-picker-popover-button")),
      resolveDatePickerMounts(),
      Scene.expect(
        Scene.role("button", { name: "Tuesday, April 21, 2026" })
      ).toHaveAttr("aria-disabled", "true"),
      Scene.click(Scene.role("button", { name: "Monday, April 20, 2026" })),
      resolveFocusButton(),
      expectDatePickerMountsEnded(),
      Scene.expect(Scene.text("Selected: 2026-04-20")).toExist()
    );
  });
});
