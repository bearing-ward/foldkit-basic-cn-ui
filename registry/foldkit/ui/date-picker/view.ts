import { Option } from "effect";
import type { Calendar, Ui } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import type { AnchorConfig } from "foldkit/ui/popover";

import * as UiCalendar from "../calendar";
const primitiveClassesKey = `${"class"}${"Name"}` as const;
const primitiveTriggerClassesKey = `${"trigger"}${"Class"}${"Name"}` as const;
const primitivePanelClassesKey = `${"panel"}${"Class"}${"Name"}` as const;
const primitiveBackdropClassesKey = `${"backdrop"}${"Class"}${"Name"}` as const;


export const anchorConfig: AnchorConfig = {
  placement: "bottom-start",
  gap: 4,
  padding: 8,
};

export const wrapperClasses = "relative inline-block";

export const triggerClasses =
  "inline-flex min-w-48 cursor-pointer select-none items-center justify-between gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-base font-normal text-gray-900 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50";

export const triggerContentClasses =
  "flex w-full items-center justify-between gap-4";

export const placeholderClasses = "text-gray-500";

export const panelClasses =
  "z-10 rounded-lg border border-gray-200 bg-white p-4 shadow-lg outline-none";

export const backdropClasses = "fixed inset-0 z-0";

export const formatDate = (date: Calendar.CalendarDate): string =>
  `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;

export const triggerContent = (
  maybeDate: Option.Option<Calendar.CalendarDate>
): Html => {
  const h = html();

  return h.div(
    [h.Class(triggerContentClasses)],
    [
      Option.match(maybeDate, {
        onNone: () => h.span([h.Class(placeholderClasses)], ["Pick a date"]),
        onSome: (date) => h.span([], [formatDate(date)]),
      }),
      h.span([h.AriaHidden(true)], ["v"]),
    ]
  );
};

export const datePickerViewInputs = (
  overrides: Partial<Ui.DatePicker.ViewInputs> = {}
): Ui.DatePicker.ViewInputs => ({
  anchor: anchorConfig,
  triggerContent,
  toCalendarView: UiCalendar.calendarView,
  [primitiveClassesKey]: wrapperClasses,
  [primitiveTriggerClassesKey]: triggerClasses,
  [primitivePanelClassesKey]: panelClasses,
  [primitiveBackdropClassesKey]: backdropClasses,
  ...overrides,
});
