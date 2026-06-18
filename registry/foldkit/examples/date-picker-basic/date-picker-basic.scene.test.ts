import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as DatePicker from "../../ui/date-picker";
import * as Popover from "../../ui/popover";
import * as DatePickerBasicExample from "./main";

const AnchorDatePickerPopover = Popover.AnchorPopover({
  buttonId: "date-picker-basic-popover-button",
  anchor: DatePicker.anchorConfig,
  focusSelector: "#date-picker-basic-calendar-grid",
});

const toParentPopoverMessage = (message: Popover.Message) =>
  DatePickerBasicExample.GotDatePickerMessage({
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
        update: DatePickerBasicExample.update,
        view: DatePickerBasicExample.view,
      },
      Scene.with(DatePickerBasicExample.init()[0]),
      Scene.expect(Scene.text("Selected date: None")).toExist(),
      Scene.click(Scene.selector("#date-picker-basic-popover-button")),
      resolveDatePickerMounts(),
      Scene.expect(
        Scene.role("button", { name: "Monday, April 20, 2026" })
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Monday, April 20, 2026" })),
      resolveFocusButton(),
      expectDatePickerMountsEnded(),
      Scene.expect(Scene.text("Selected date: 2026-04-20")).toExist(),
      Scene.expect(Scene.text("2026-04-20")).toExist()
    );
  });
});
