import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as CalendarBasicExample from "../registry/default/examples/calendar-basic/main";
import * as CalendarBoundsExample from "../registry/default/examples/calendar-bounds/main";
import * as CardBasicExample from "../registry/default/examples/card-basic/main";
import * as CarouselApiExample from "../registry/default/examples/carousel-api/main";
import * as CarouselBasicExample from "../registry/default/examples/carousel-basic/main";
import * as CarouselOrientationExample from "../registry/default/examples/carousel-orientation/main";
import * as CarouselRtlExample from "../registry/default/examples/carousel-rtl/main";
import * as CarouselSizesExample from "../registry/default/examples/carousel-sizes/main";
import * as CarouselSpacingExample from "../registry/default/examples/carousel-spacing/main";
import * as ChartAxisExample from "../registry/default/examples/chart-axis/main";
import * as ChartBasicExample from "../registry/default/examples/chart-basic/main";
import * as ChartGridExample from "../registry/default/examples/chart-grid/main";
import * as ChartLegendExample from "../registry/default/examples/chart-legend/main";
import * as ChartRtlExample from "../registry/default/examples/chart-rtl/main";
import * as ChartTooltipExample from "../registry/default/examples/chart-tooltip/main";
import * as CheckboxBasicExample from "../registry/default/examples/checkbox-basic/main";
import * as CheckboxGroupBasicExample from "../registry/default/examples/checkbox-group-basic/main";
import * as CheckboxIndeterminateExample from "../registry/default/examples/checkbox-indeterminate/main";
import * as CollapsibleBasicExample from "../registry/default/examples/collapsible-basic/main";
import * as ComboboxBasicExample from "../registry/default/examples/combobox-basic/main";
import * as ComboboxMultiExample from "../registry/default/examples/combobox-multi/main";
import * as CommandBasicExample from "../registry/default/examples/command-basic/main";
import * as ContextMenuBasicExample from "../registry/default/examples/context-menu-basic/main";
import * as DataTableBasicExample from "../registry/default/examples/data-table-basic/main";
import * as DataTableFilteringExample from "../registry/default/examples/data-table-filtering/main";
import * as DataTablePaginationExample from "../registry/default/examples/data-table-pagination/main";
import * as DataTableRowActionsExample from "../registry/default/examples/data-table-row-actions/main";
import * as DataTableRowSelectionExample from "../registry/default/examples/data-table-row-selection/main";
import * as DataTableSortingExample from "../registry/default/examples/data-table-sorting/main";
import * as DataTableVisibilityExample from "../registry/default/examples/data-table-visibility/main";
import * as DatePickerBasicExample from "../registry/default/examples/date-picker-basic/main";
import * as DatePickerBoundsExample from "../registry/default/examples/date-picker-bounds/main";
import * as DialogAnimatedExample from "../registry/default/examples/dialog-animated/main";
import * as DialogBasicExample from "../registry/default/examples/dialog-basic/main";
import * as DialogDestructiveExample from "../registry/default/examples/dialog-destructive/main";
import * as DialogFocusExample from "../registry/default/examples/dialog-focus/main";
import * as DialogScrollableExample from "../registry/default/examples/dialog-scrollable/main";
import * as DirectionBasicExample from "../registry/default/examples/direction-basic/main";
import * as DisclosureBasicExample from "../registry/default/examples/disclosure-basic/main";
import * as DisclosureDisabledExample from "../registry/default/examples/disclosure-disabled/main";
import * as DragAndDropBasicExample from "../registry/default/examples/drag-and-drop-basic/main";
import * as DragAndDropDisabledExample from "../registry/default/examples/drag-and-drop-disabled/main";
import * as DrawerBasicExample from "../registry/default/examples/drawer-basic/main";
import * as DropdownMenuBasicExample from "../registry/default/examples/dropdown-menu-basic/main";
import * as ShadcnCalendarBasicExample from "../registry/default/examples/shadcn-calendar-basic/main";
import * as ShadcnCalendarBookedExample from "../registry/default/examples/shadcn-calendar-booked/main";
import * as ShadcnCalendarDateOfBirthExample from "../registry/default/examples/shadcn-calendar-date-of-birth/main";
import * as ShadcnCalendarMonthYearSelectorExample from "../registry/default/examples/shadcn-calendar-month-year-selector/main";
import * as ShadcnCalendarPresetsExample from "../registry/default/examples/shadcn-calendar-presets/main";
import * as ShadcnCalendarRtlExample from "../registry/default/examples/shadcn-calendar-rtl/main";
import * as Main from "./main";

type Message = Main.Message;

export const carouselBasicExamplePreview = (
  model: CarouselBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: CarouselBasicExample.view,
    toParentMessage: (message): Message =>
      Main.GotCarouselBasicExampleMessage({ message }),
  });
};

export const carouselSizesExamplePreview = (
  model: CarouselSizesExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: CarouselSizesExample.view,
    toParentMessage: (message): Message =>
      Main.GotCarouselSizesExampleMessage({ message }),
  });
};

export const carouselSpacingExamplePreview = (
  model: CarouselSpacingExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: CarouselSpacingExample.view,
    toParentMessage: (message): Message =>
      Main.GotCarouselSpacingExampleMessage({ message }),
  });
};

export const carouselOrientationExamplePreview = (
  model: CarouselOrientationExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: CarouselOrientationExample.view,
    toParentMessage: (message): Message =>
      Main.GotCarouselOrientationExampleMessage({ message }),
  });
};

export const carouselApiExamplePreview = (
  model: CarouselApiExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: CarouselApiExample.view,
    toParentMessage: (message): Message =>
      Main.GotCarouselApiExampleMessage({ message }),
  });
};

export const carouselRtlExamplePreview = (
  model: CarouselRtlExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: CarouselRtlExample.view,
    toParentMessage: (message): Message =>
      Main.GotCarouselRtlExampleMessage({ message }),
  });
};

export const chartBasicExamplePreview = (
  model: ChartBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ChartBasicExample.view,
    toParentMessage: (message) => Main.GotChartBasicExampleMessage({ message }),
  });
};

export const chartGridExamplePreview = (
  model: ChartGridExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ChartGridExample.view,
    toParentMessage: (message) => Main.GotChartGridExampleMessage({ message }),
  });
};

export const chartAxisExamplePreview = (
  model: ChartAxisExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ChartAxisExample.view,
    toParentMessage: (message) => Main.GotChartAxisExampleMessage({ message }),
  });
};

export const chartTooltipExamplePreview = (
  model: ChartTooltipExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ChartTooltipExample.view,
    toParentMessage: (message) =>
      Main.GotChartTooltipExampleMessage({ message }),
  });
};

export const chartLegendExamplePreview = (
  model: ChartLegendExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ChartLegendExample.view,
    toParentMessage: (message) =>
      Main.GotChartLegendExampleMessage({ message }),
  });
};

export const chartRtlExamplePreview = (
  model: ChartRtlExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ChartRtlExample.view,
    toParentMessage: (message) => Main.GotChartRtlExampleMessage({ message }),
  });
};

export const dropdownMenuBasicExamplePreview = (
  model: DropdownMenuBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DropdownMenuBasicExample.view,
    toParentMessage: (message) =>
      Main.GotDropdownMenuBasicExampleMessage({ message }),
  });
};

export const dataTableBasicExamplePreview = (
  model: DataTableBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DataTableBasicExample.view,
    toParentMessage: (message) =>
      Main.GotDataTableBasicExampleMessage({ message }),
  });
};

export const dataTableRowActionsExamplePreview = (
  model: DataTableRowActionsExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DataTableRowActionsExample.view,
    toParentMessage: (message) =>
      Main.GotDataTableRowActionsExampleMessage({ message }),
  });
};

export const dataTablePaginationExamplePreview = (
  model: DataTablePaginationExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DataTablePaginationExample.view,
    toParentMessage: (message) =>
      Main.GotDataTablePaginationExampleMessage({ message }),
  });
};

export const dataTableSortingExamplePreview = (
  model: DataTableSortingExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DataTableSortingExample.view,
    toParentMessage: (message) =>
      Main.GotDataTableSortingExampleMessage({ message }),
  });
};

export const dataTableFilteringExamplePreview = (
  model: DataTableFilteringExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DataTableFilteringExample.view,
    toParentMessage: (message) =>
      Main.GotDataTableFilteringExampleMessage({ message }),
  });
};

export const dataTableVisibilityExamplePreview = (
  model: DataTableVisibilityExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DataTableVisibilityExample.view,
    toParentMessage: (message) =>
      Main.GotDataTableVisibilityExampleMessage({ message }),
  });
};

export const dataTableRowSelectionExamplePreview = (
  model: DataTableRowSelectionExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DataTableRowSelectionExample.view,
    toParentMessage: (message) =>
      Main.GotDataTableRowSelectionExampleMessage({ message }),
  });
};

export const directionBasicExamplePreview = (
  model: DirectionBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DirectionBasicExample.view,
    toParentMessage: (message) =>
      Main.GotDirectionBasicExampleMessage({ message }),
  });
};

export const commandBasicExamplePreview = (
  model: CommandBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: CommandBasicExample.view,
    toParentMessage: (message) =>
      Main.GotCommandBasicExampleMessage({ message }),
  });
};

export const cardBasicExamplePreview = (
  model: CardBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: CardBasicExample.view,
    toParentMessage: (message) => Main.GotCardBasicExampleMessage({ message }),
  });
};

export const drawerBasicExamplePreview = (
  model: DrawerBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DrawerBasicExample.view,
    toParentMessage: (message) =>
      Main.GotDrawerBasicExampleMessage({ message }),
  });
};

export const contextMenuBasicExamplePreview = (
  model: ContextMenuBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ContextMenuBasicExample.view,
    toParentMessage: (message) =>
      Main.GotContextMenuBasicExampleMessage({ message }),
  });
};

export const collapsibleBasicExamplePreview = (
  model: CollapsibleBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: CollapsibleBasicExample.view,
    toParentMessage: (message) =>
      Main.GotCollapsibleBasicExampleMessage({ message }),
  });
};

export const calendarBasicExamplePreview = (
  model: CalendarBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: CalendarBasicExample.view,
    toParentMessage: (message) =>
      Main.GotCalendarBasicExampleMessage({ message }),
  });
};

export const calendarBoundsExamplePreview = (
  model: CalendarBoundsExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: CalendarBoundsExample.view,
    toParentMessage: (message) =>
      Main.GotCalendarBoundsExampleMessage({ message }),
  });
};

export const shadcnCalendarBasicExamplePreview = (
  model: ShadcnCalendarBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnCalendarBasicExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnCalendarBasicExampleMessage({ message }),
  });
};

export const shadcnCalendarMonthYearSelectorExamplePreview = (
  model: ShadcnCalendarMonthYearSelectorExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnCalendarMonthYearSelectorExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnCalendarMonthYearSelectorExampleMessage({ message }),
  });
};

export const shadcnCalendarDateOfBirthExamplePreview = (
  model: ShadcnCalendarDateOfBirthExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnCalendarDateOfBirthExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnCalendarDateOfBirthExampleMessage({ message }),
  });
};

export const shadcnCalendarPresetsExamplePreview = (
  model: ShadcnCalendarPresetsExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnCalendarPresetsExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnCalendarPresetsExampleMessage({ message }),
  });
};

export const shadcnCalendarBookedExamplePreview = (
  model: ShadcnCalendarBookedExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnCalendarBookedExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnCalendarBookedExampleMessage({ message }),
  });
};

export const shadcnCalendarRtlExamplePreview = (
  model: ShadcnCalendarRtlExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnCalendarRtlExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnCalendarRtlExampleMessage({ message }),
  });
};

export const checkboxBasicExamplePreview = (
  model: CheckboxBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: CheckboxBasicExample.view,
    toParentMessage: (message) =>
      Main.GotCheckboxBasicExampleMessage({ message }),
  });
};

export const checkboxGroupBasicExamplePreview = (
  model: CheckboxGroupBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: CheckboxGroupBasicExample.view,
    toParentMessage: (message) =>
      Main.GotCheckboxGroupBasicExampleMessage({ message }),
  });
};

export const checkboxIndeterminateExamplePreview = (
  model: CheckboxIndeterminateExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: CheckboxIndeterminateExample.view,
    toParentMessage: (message) =>
      Main.GotCheckboxIndeterminateExampleMessage({ message }),
  });
};

export const dialogBasicExamplePreview = (
  model: DialogBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DialogBasicExample.view,
    toParentMessage: (message) =>
      Main.GotDialogBasicExampleMessage({ message }),
  });
};

export const dialogAnimatedExamplePreview = (
  model: DialogAnimatedExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DialogAnimatedExample.view,
    toParentMessage: (message) =>
      Main.GotDialogAnimatedExampleMessage({ message }),
  });
};

export const dialogDestructiveExamplePreview = (
  model: DialogDestructiveExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DialogDestructiveExample.view,
    toParentMessage: (message) =>
      Main.GotDialogDestructiveExampleMessage({ message }),
  });
};

export const dialogFocusExamplePreview = (
  model: DialogFocusExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DialogFocusExample.view,
    toParentMessage: (message) =>
      Main.GotDialogFocusExampleMessage({ message }),
  });
};

export const dialogScrollableExamplePreview = (
  model: DialogScrollableExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DialogScrollableExample.view,
    toParentMessage: (message) =>
      Main.GotDialogScrollableExampleMessage({ message }),
  });
};

export const disclosureBasicExamplePreview = (
  model: DisclosureBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DisclosureBasicExample.view,
    toParentMessage: (message) =>
      Main.GotDisclosureBasicExampleMessage({ message }),
  });
};

export const disclosureDisabledExamplePreview = (
  model: DisclosureDisabledExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DisclosureDisabledExample.view,
    toParentMessage: (message) =>
      Main.GotDisclosureDisabledExampleMessage({ message }),
  });
};

export const dragAndDropBasicExamplePreview = (
  model: DragAndDropBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DragAndDropBasicExample.view,
    toParentMessage: (message) =>
      Main.GotDragAndDropBasicExampleMessage({ message }),
  });
};

export const dragAndDropDisabledExamplePreview = (
  model: DragAndDropDisabledExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DragAndDropDisabledExample.view,
    toParentMessage: (message) =>
      Main.GotDragAndDropDisabledExampleMessage({ message }),
  });
};

export const comboboxBasicExamplePreview = (
  model: ComboboxBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ComboboxBasicExample.view,
    toParentMessage: (message) =>
      Main.GotComboboxBasicExampleMessage({ message }),
  });
};

export const comboboxMultiExamplePreview = (
  model: ComboboxMultiExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ComboboxMultiExample.view,
    toParentMessage: (message) =>
      Main.GotComboboxMultiExampleMessage({ message }),
  });
};

export const datePickerBasicExamplePreview = (
  model: DatePickerBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DatePickerBasicExample.view,
    toParentMessage: (message) =>
      Main.GotDatePickerBasicExampleMessage({ message }),
  });
};

export const datePickerBoundsExamplePreview = (
  model: DatePickerBoundsExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DatePickerBoundsExample.view,
    toParentMessage: (message) =>
      Main.GotDatePickerBoundsExampleMessage({ message }),
  });
};
