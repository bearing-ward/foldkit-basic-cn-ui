import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as DatePicker from "../../ui/date-picker";
import * as Popover from "../../ui/popover";
import * as ShadcnDatePickerBasicExample from "./main";

const AnchorDatePickerPopover = Popover.AnchorPopover({
  buttonId: "date-picker-basic-popover-button",
  anchor: DatePicker.anchorConfig,
  focusSelector: "#date-picker-basic-calendar-grid",
});

const toParentPopoverMessage = (message: Popover.Message) =>
  ShadcnDatePickerBasicExample.GotDatePickerMessage({
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
    Popover.FocusButton({ id: "date-picker-basic-popover" }),
    Popover.CompletedFocusButton(),
    toParentPopoverMessage
  );

const expectDatePickerMountsEnded = () =>
  Scene.Mount.expectEnded(
    Popover.PortalPopoverBackdrop,
    AnchorDatePickerPopover
  );

describe("DatePicker Basic example", () => {
  test("opens the calendar and selects a date", () => {
    Scene.scene(
      {
        update: ShadcnDatePickerBasicExample.update,
        view: ShadcnDatePickerBasicExample.view,
      },
      Scene.with(ShadcnDatePickerBasicExample.init()[0]),
      Scene.expect(Scene.text("Date")).toExist(),
      Scene.expect(Scene.text("Selected date: None")).not.toExist(),
      Scene.click(Scene.selector("#date-picker-basic-popover-button")),
      resolveDatePickerMounts(),
      Scene.expect(
        Scene.role("button", { name: "Monday, April 20, 2026" })
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Monday, April 20, 2026" })),
      resolveFocusButton(),
      expectDatePickerMountsEnded(),
      Scene.expect(Scene.text("2026-04-20")).toExist(),
      Scene.expect(Scene.text("Range Picker")).toExist(),
      Scene.expect(Scene.text("Selected range: 2022-01-20 to 2022-02-09"))
        .toExist(),
      Scene.expect(Scene.text("Date of Birth")).toExist(),
      Scene.expect(Scene.text("Choose a birth date between 1900 and today."))
        .toExist(),
      Scene.expect(Scene.role("textbox", { name: "Date input" })).toHaveValue(
        "06/15/1990"
      ),
      Scene.expect(Scene.text("Time Picker")).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Start time" })).toHaveValue(
        "10:30"
      ),
      Scene.expect(Scene.text("Natural Language Picker")).toExist(),
      Scene.expect(
        Scene.role("textbox", { name: "Natural language date" })
      ).toHaveValue("tomorrow at 5pm"),
      Scene.expect(Scene.text("RTL")).toExist(),
      Scene.expect(Scene.text("اختر تاريخا")).toExist()
    );
  });
});
