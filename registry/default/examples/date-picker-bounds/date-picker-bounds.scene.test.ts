import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as DatePicker from "../../ui/date-picker";
import * as Popover from "../../ui/popover";
import * as DatePickerBoundsExample from "./main";

const AnchorDatePickerPopover = Popover.AnchorPopover({
  buttonId: "date-picker-bounds-popover-button",
  anchor: DatePicker.anchorConfig,
  focusSelector: "#date-picker-bounds-calendar-grid",
});

const toParentPopoverMessage = (message: Popover.Message) =>
  DatePickerBoundsExample.GotDatePickerMessage({
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
    Popover.FocusButton({ id: "date-picker-bounds-popover" }),
    Popover.CompletedFocusButton(),
    toParentPopoverMessage
  );

const expectDatePickerMountsEnded = () =>
  Scene.Mount.expectEnded(
    Popover.PortalPopoverBackdrop,
    AnchorDatePickerPopover
  );

describe("DatePicker Bounds example", () => {
  test("keeps disabled dates inactive and selects an allowed bounded date", () => {
    Scene.scene(
      {
        update: DatePickerBoundsExample.update,
        view: DatePickerBoundsExample.view,
      },
      Scene.with(DatePickerBoundsExample.init()[0]),
      Scene.expect(Scene.text("Selected bounded date: None")).toExist(),
      Scene.click(Scene.selector("#date-picker-bounds-popover-button")),
      resolveDatePickerMounts(),
      Scene.expect(
        Scene.role("button", { name: "Thursday, April 16, 2026" })
      ).toHaveAttr("aria-disabled", "true"),
      Scene.click(Scene.role("button", { name: "Friday, April 17, 2026" })),
      resolveFocusButton(),
      expectDatePickerMountsEnded(),
      Scene.expect(Scene.text("Selected bounded date: 2026-04-17")).toExist()
    );
  });
});
