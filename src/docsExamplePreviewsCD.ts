import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as BaseUiCheckboxBasicExample from "../registry/base-ui/examples/base-ui-checkbox-basic/main";
import * as BaseUiCheckboxFormExample from "../registry/base-ui/examples/base-ui-checkbox-form/main";
import * as BaseUiCheckboxGroupBasicExample from "../registry/base-ui/examples/base-ui-checkbox-group-basic/main";
import * as BaseUiCheckboxGroupFormExample from "../registry/base-ui/examples/base-ui-checkbox-group-form/main";
import * as BaseUiCheckboxGroupLabelingExample from "../registry/base-ui/examples/base-ui-checkbox-group-labeling/main";
import * as BaseUiCheckboxGroupNativeButtonExample from "../registry/base-ui/examples/base-ui-checkbox-group-native-button/main";
import * as BaseUiCheckboxGroupNestedParentExample from "../registry/base-ui/examples/base-ui-checkbox-group-nested-parent/main";
import * as BaseUiCheckboxGroupParentExample from "../registry/base-ui/examples/base-ui-checkbox-group-parent/main";
import * as BaseUiCheckboxLabelingExample from "../registry/base-ui/examples/base-ui-checkbox-labeling/main";
import * as BaseUiCheckboxNativeButtonExample from "../registry/base-ui/examples/base-ui-checkbox-native-button/main";
import * as BaseUiCollapsibleBasicExample from "../registry/base-ui/examples/base-ui-collapsible-basic/main";
import * as BaseUiComboboxBasicExample from "../registry/base-ui/examples/base-ui-combobox-basic/main";
import * as BaseUiContextMenuBasicExample from "../registry/base-ui/examples/base-ui-context-menu-basic/main";
import * as BaseUiContextMenuNestedExample from "../registry/base-ui/examples/base-ui-context-menu-nested/main";
import * as BaseUiDialogBasicExample from "../registry/base-ui/examples/base-ui-dialog-basic/main";
import * as BaseUiDialogCloseConfirmationExample from "../registry/base-ui/examples/base-ui-dialog-close-confirmation/main";
import * as BaseUiDialogNestedExample from "../registry/base-ui/examples/base-ui-dialog-nested/main";
import * as BaseUiDrawerBasicExample from "../registry/base-ui/examples/base-ui-drawer-basic/main";
import * as BaseUiDrawerNonModalExample from "../registry/base-ui/examples/base-ui-drawer-non-modal/main";
import * as BaseUiDrawerPositionExample from "../registry/base-ui/examples/base-ui-drawer-position/main";
import * as BaseUiFieldBasicExample from "../registry/base-ui/examples/base-ui-field-basic/main";
import * as BaseUiFieldsetBasicExample from "../registry/base-ui/examples/base-ui-fieldset-basic/main";
import * as BaseUiFormBasicExample from "../registry/base-ui/examples/base-ui-form-basic/main";
import * as BaseUiFormSchemaValidationExample from "../registry/base-ui/examples/base-ui-form-schema-validation/main";
import * as BaseUiFormServerFunctionExample from "../registry/base-ui/examples/base-ui-form-server-function/main";
import * as BaseUiInputBasicExample from "../registry/base-ui/examples/base-ui-input-basic/main";
import * as BaseUiMenuBasicExample from "../registry/base-ui/examples/base-ui-menu-basic/main";
import * as BaseUiMenuNestedExample from "../registry/base-ui/examples/base-ui-menu-nested/main";
import * as BaseUiMenubarBasicExample from "../registry/base-ui/examples/base-ui-menubar-basic/main";
import * as BaseUiMeterBasicExample from "../registry/base-ui/examples/base-ui-meter-basic/main";
import * as CalendarBasicExample from "../registry/foldkit/examples/calendar-basic/main";
import * as CalendarBoundsExample from "../registry/foldkit/examples/calendar-bounds/main";
import * as CardImageExample from "../registry/shadcn/examples/card-image/main";
import * as CardBasicExample from "../registry/shadcn/examples/card-basic/main";
import * as CardRtlExample from "../registry/shadcn/examples/card-rtl/main";
import * as CardSizeExample from "../registry/shadcn/examples/card-size/main";
import * as CardSpacingExample from "../registry/shadcn/examples/card-spacing/main";
import * as CarouselApiExample from "../registry/shadcn/examples/carousel-api/main";
import * as CarouselAutoplayExample from "../registry/shadcn/examples/carousel-autoplay/main";
import * as CarouselBasicExample from "../registry/shadcn/examples/carousel-basic/main";
import * as CarouselOrientationExample from "../registry/shadcn/examples/carousel-orientation/main";
import * as CarouselRtlExample from "../registry/shadcn/examples/carousel-rtl/main";
import * as CarouselSizesExample from "../registry/shadcn/examples/carousel-sizes/main";
import * as CarouselSpacingExample from "../registry/shadcn/examples/carousel-spacing/main";
import * as ChartAxisExample from "../registry/shadcn/examples/chart-axis/main";
import * as ChartBasicExample from "../registry/shadcn/examples/chart-basic/main";
import * as ChartGridExample from "../registry/shadcn/examples/chart-grid/main";
import * as ChartLegendExample from "../registry/shadcn/examples/chart-legend/main";
import * as ChartRtlExample from "../registry/shadcn/examples/chart-rtl/main";
import * as ChartTooltipExample from "../registry/shadcn/examples/chart-tooltip/main";
import * as CheckboxBasicExample from "../registry/foldkit/examples/checkbox-basic/main";
import * as CheckboxGroupBasicExample from "../registry/base-ui/examples/checkbox-group-basic/main";
import * as CheckboxIndeterminateExample from "../registry/foldkit/examples/checkbox-indeterminate/main";
import * as CollapsibleBasicExample from "../registry/base-ui/examples/collapsible-basic/main";
import * as ComboboxBasicExample from "../registry/foldkit/examples/combobox-basic/main";
import * as ComboboxMultiExample from "../registry/foldkit/examples/combobox-multi/main";
import * as CommandBasicExample from "../registry/shadcn/examples/command-basic/main";
import * as CommandGroupsExample from "../registry/shadcn/examples/command-groups/main";
import * as CommandRtlExample from "../registry/shadcn/examples/command-rtl/main";
import * as CommandScrollableExample from "../registry/shadcn/examples/command-scrollable/main";
import * as CommandShortcutsExample from "../registry/shadcn/examples/command-shortcuts/main";
import * as ContextMenuBasicExample from "../registry/base-ui/examples/context-menu-basic/main";
import * as DataTableBasicExample from "../registry/shadcn/examples/data-table-basic/main";
import * as DataTableFilteringExample from "../registry/shadcn/examples/data-table-filtering/main";
import * as DataTablePaginationExample from "../registry/shadcn/examples/data-table-pagination/main";
import * as DataTableRowActionsExample from "../registry/shadcn/examples/data-table-row-actions/main";
import * as DataTableRowSelectionExample from "../registry/shadcn/examples/data-table-row-selection/main";
import * as DataTableSortingExample from "../registry/shadcn/examples/data-table-sorting/main";
import * as DataTableVisibilityExample from "../registry/shadcn/examples/data-table-visibility/main";
import * as DatePickerBasicExample from "../registry/foldkit/examples/date-picker-basic/main";
import * as DatePickerBoundsExample from "../registry/foldkit/examples/date-picker-bounds/main";
import * as DialogAnimatedExample from "../registry/foldkit/examples/dialog-animated/main";
import * as DialogBasicExample from "../registry/foldkit/examples/dialog-basic/main";
import * as DialogDestructiveExample from "../registry/foldkit/examples/dialog-destructive/main";
import * as DialogFocusExample from "../registry/foldkit/examples/dialog-focus/main";
import * as DialogScrollableExample from "../registry/foldkit/examples/dialog-scrollable/main";
import * as DirectionBasicExample from "../registry/shadcn/examples/direction-basic/main";
import * as DisclosureBasicExample from "../registry/foldkit/examples/disclosure-basic/main";
import * as DisclosureDisabledExample from "../registry/foldkit/examples/disclosure-disabled/main";
import * as DragAndDropBasicExample from "../registry/foldkit/examples/drag-and-drop-basic/main";
import * as DragAndDropDisabledExample from "../registry/foldkit/examples/drag-and-drop-disabled/main";
import * as DrawerBasicExample from "../registry/base-ui/examples/drawer-basic/main";
import * as DropdownMenuBasicExample from "../registry/shadcn/examples/dropdown-menu-basic/main";
import * as DropdownMenuCheckboxesExample from "../registry/shadcn/examples/dropdown-menu-checkboxes/main";
import * as DropdownMenuComplexExample from "../registry/shadcn/examples/dropdown-menu-complex/main";
import * as DropdownMenuDestructiveExample from "../registry/shadcn/examples/dropdown-menu-destructive/main";
import * as DropdownMenuIconsExample from "../registry/shadcn/examples/dropdown-menu-icons/main";
import * as DropdownMenuRadioGroupExample from "../registry/shadcn/examples/dropdown-menu-radio-group/main";
import * as DropdownMenuRtlExample from "../registry/shadcn/examples/dropdown-menu-rtl/main";
import * as DropdownMenuShortcutsExample from "../registry/shadcn/examples/dropdown-menu-shortcuts/main";
import * as DropdownMenuSubmenuExample from "../registry/shadcn/examples/dropdown-menu-submenu/main";
import * as ShadcnCalendarBasicExample from "../registry/shadcn/examples/shadcn-calendar-basic/main";
import * as ShadcnCalendarBookedExample from "../registry/shadcn/examples/shadcn-calendar-booked/main";
import * as ShadcnCalendarCustomCellSizeExample from "../registry/shadcn/examples/shadcn-calendar-custom-cell-size/main";
import * as ShadcnCalendarDateOfBirthExample from "../registry/shadcn/examples/shadcn-calendar-date-of-birth/main";
import * as ShadcnCalendarDateTimePickerExample from "../registry/shadcn/examples/shadcn-calendar-date-time-picker/main";
import * as ShadcnCalendarMonthYearSelectorExample from "../registry/shadcn/examples/shadcn-calendar-month-year-selector/main";
import * as ShadcnCalendarPresetsExample from "../registry/shadcn/examples/shadcn-calendar-presets/main";
import * as ShadcnCalendarRangeExample from "../registry/shadcn/examples/shadcn-calendar-range/main";
import * as ShadcnCalendarRtlExample from "../registry/shadcn/examples/shadcn-calendar-rtl/main";
import * as ShadcnCalendarWeekNumbersExample from "../registry/shadcn/examples/shadcn-calendar-week-numbers/main";
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

export const carouselAutoplayExamplePreview = (
  model: CarouselAutoplayExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: CarouselAutoplayExample.view,
    toParentMessage: (message): Message =>
      Main.GotCarouselAutoplayExampleMessage({ message }),
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

export const dropdownMenuCheckboxesExamplePreview = (
  model: DropdownMenuCheckboxesExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DropdownMenuCheckboxesExample.view,
    toParentMessage: (message) =>
      Main.GotDropdownMenuCheckboxesExampleMessage({ message }),
  });
};

export const dropdownMenuComplexExamplePreview = (
  model: DropdownMenuComplexExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DropdownMenuComplexExample.view,
    toParentMessage: (message) =>
      Main.GotDropdownMenuComplexExampleMessage({ message }),
  });
};

export const dropdownMenuDestructiveExamplePreview = (
  model: DropdownMenuDestructiveExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DropdownMenuDestructiveExample.view,
    toParentMessage: (message) =>
      Main.GotDropdownMenuDestructiveExampleMessage({ message }),
  });
};

export const dropdownMenuIconsExamplePreview = (
  model: DropdownMenuIconsExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DropdownMenuIconsExample.view,
    toParentMessage: (message) =>
      Main.GotDropdownMenuIconsExampleMessage({ message }),
  });
};

export const dropdownMenuRadioGroupExamplePreview = (
  model: DropdownMenuRadioGroupExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DropdownMenuRadioGroupExample.view,
    toParentMessage: (message) =>
      Main.GotDropdownMenuRadioGroupExampleMessage({ message }),
  });
};

export const dropdownMenuRtlExamplePreview = (
  model: DropdownMenuRtlExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DropdownMenuRtlExample.view,
    toParentMessage: (message) =>
      Main.GotDropdownMenuRtlExampleMessage({ message }),
  });
};

export const dropdownMenuShortcutsExamplePreview = (
  model: DropdownMenuShortcutsExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DropdownMenuShortcutsExample.view,
    toParentMessage: (message) =>
      Main.GotDropdownMenuShortcutsExampleMessage({ message }),
  });
};

export const dropdownMenuSubmenuExamplePreview = (
  model: DropdownMenuSubmenuExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DropdownMenuSubmenuExample.view,
    toParentMessage: (message) =>
      Main.GotDropdownMenuSubmenuExampleMessage({ message }),
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

export const commandGroupsExamplePreview = (
  model: CommandGroupsExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: CommandGroupsExample.view,
    toParentMessage: (message) =>
      Main.GotCommandGroupsExampleMessage({ message }),
  });
};

export const commandRtlExamplePreview = (
  model: CommandRtlExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: CommandRtlExample.view,
    toParentMessage: (message) => Main.GotCommandRtlExampleMessage({ message }),
  });
};

export const commandScrollableExamplePreview = (
  model: CommandScrollableExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: CommandScrollableExample.view,
    toParentMessage: (message) =>
      Main.GotCommandScrollableExampleMessage({ message }),
  });
};

export const commandShortcutsExamplePreview = (
  model: CommandShortcutsExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: CommandShortcutsExample.view,
    toParentMessage: (message) =>
      Main.GotCommandShortcutsExampleMessage({ message }),
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

export const cardSizeExamplePreview = (
  model: CardSizeExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: CardSizeExample.view,
    toParentMessage: (message) => Main.GotCardSizeExampleMessage({ message }),
  });
};

export const cardSpacingExamplePreview = (
  model: CardSpacingExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: CardSpacingExample.view,
    toParentMessage: (message) =>
      Main.GotCardSpacingExampleMessage({ message }),
  });
};

export const cardImageExamplePreview = (
  model: CardImageExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: CardImageExample.view,
    toParentMessage: (message) => Main.GotCardImageExampleMessage({ message }),
  });
};

export const cardRtlExamplePreview = (
  model: CardRtlExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: CardRtlExample.view,
    toParentMessage: (message) => Main.GotCardRtlExampleMessage({ message }),
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

export const baseUiContextMenuBasicExamplePreview = (
  model: BaseUiContextMenuBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiContextMenuBasicExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiContextMenuBasicExampleMessage({ message }),
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

export const baseUiCollapsibleBasicExamplePreview = (
  model: BaseUiCollapsibleBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiCollapsibleBasicExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiCollapsibleBasicExampleMessage({ message }),
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

export const shadcnCalendarRangeExamplePreview = (
  model: ShadcnCalendarRangeExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnCalendarRangeExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnCalendarRangeExampleMessage({ message }),
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

export const shadcnCalendarDateTimePickerExamplePreview = (
  model: ShadcnCalendarDateTimePickerExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnCalendarDateTimePickerExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnCalendarDateTimePickerExampleMessage({ message }),
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

export const shadcnCalendarCustomCellSizeExamplePreview = (
  model: ShadcnCalendarCustomCellSizeExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnCalendarCustomCellSizeExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnCalendarCustomCellSizeExampleMessage({ message }),
  });
};

export const shadcnCalendarWeekNumbersExamplePreview = (
  model: ShadcnCalendarWeekNumbersExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnCalendarWeekNumbersExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnCalendarWeekNumbersExampleMessage({ message }),
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

export const baseUiCheckboxBasicExamplePreview = (
  model: BaseUiCheckboxBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiCheckboxBasicExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiCheckboxBasicExampleMessage({ message }),
  });
};

export const baseUiCheckboxLabelingExamplePreview = (
  model: BaseUiCheckboxLabelingExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiCheckboxLabelingExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiCheckboxLabelingExampleMessage({ message }),
  });
};

export const baseUiCheckboxNativeButtonExamplePreview = (
  model: BaseUiCheckboxNativeButtonExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiCheckboxNativeButtonExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiCheckboxNativeButtonExampleMessage({ message }),
  });
};

export const baseUiCheckboxFormExamplePreview = (
  model: BaseUiCheckboxFormExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiCheckboxFormExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiCheckboxFormExampleMessage({ message }),
  });
};

export const baseUiCheckboxGroupBasicExamplePreview = (
  model: BaseUiCheckboxGroupBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiCheckboxGroupBasicExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiCheckboxGroupBasicExampleMessage({ message }),
  });
};

export const baseUiCheckboxGroupLabelingExamplePreview = (
  model: BaseUiCheckboxGroupLabelingExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiCheckboxGroupLabelingExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiCheckboxGroupLabelingExampleMessage({ message }),
  });
};

export const baseUiCheckboxGroupNativeButtonExamplePreview = (
  model: BaseUiCheckboxGroupNativeButtonExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiCheckboxGroupNativeButtonExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiCheckboxGroupNativeButtonExampleMessage({ message }),
  });
};

export const baseUiCheckboxGroupFormExamplePreview = (
  model: BaseUiCheckboxGroupFormExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiCheckboxGroupFormExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiCheckboxGroupFormExampleMessage({ message }),
  });
};

export const baseUiCheckboxGroupParentExamplePreview = (
  model: BaseUiCheckboxGroupParentExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiCheckboxGroupParentExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiCheckboxGroupParentExampleMessage({ message }),
  });
};

export const baseUiCheckboxGroupNestedParentExamplePreview = (
  model: BaseUiCheckboxGroupNestedParentExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiCheckboxGroupNestedParentExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiCheckboxGroupNestedParentExampleMessage({ message }),
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

export const baseUiContextMenuNestedExamplePreview = (
  model: BaseUiContextMenuNestedExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiContextMenuNestedExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiContextMenuNestedExampleMessage({ message }),
  });
};

export const baseUiDialogBasicExamplePreview = (
  model: BaseUiDialogBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiDialogBasicExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiDialogBasicExampleMessage({ message }),
  });
};

export const baseUiDialogCloseConfirmationExamplePreview = (
  model: BaseUiDialogCloseConfirmationExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiDialogCloseConfirmationExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiDialogCloseConfirmationExampleMessage({ message }),
  });
};

export const baseUiDialogNestedExamplePreview = (
  model: BaseUiDialogNestedExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiDialogNestedExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiDialogNestedExampleMessage({ message }),
  });
};

export const baseUiDrawerBasicExamplePreview = (
  model: BaseUiDrawerBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiDrawerBasicExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiDrawerBasicExampleMessage({ message }),
  });
};

export const baseUiDrawerPositionExamplePreview = (
  model: BaseUiDrawerPositionExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();
  return h.submodel({
    slotId,
    model,
    view: BaseUiDrawerPositionExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiDrawerPositionExampleMessage({ message }),
  });
};
export const baseUiDrawerNonModalExamplePreview = (
  model: BaseUiDrawerNonModalExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();
  return h.submodel({
    slotId,
    model,
    view: BaseUiDrawerNonModalExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiDrawerNonModalExampleMessage({ message }),
  });
};

export const baseUiFieldBasicExamplePreview = (
  model: BaseUiFieldBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiFieldBasicExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiFieldBasicExampleMessage({ message }),
  });
};

export const baseUiFieldsetBasicExamplePreview = (
  model: BaseUiFieldsetBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiFieldsetBasicExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiFieldsetBasicExampleMessage({ message }),
  });
};

export const baseUiFormBasicExamplePreview = (
  model: BaseUiFormBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiFormBasicExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiFormBasicExampleMessage({ message }),
  });
};

export const baseUiFormSchemaValidationExamplePreview = (
  model: BaseUiFormSchemaValidationExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiFormSchemaValidationExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiFormSchemaValidationExampleMessage({ message }),
  });
};

export const baseUiFormServerFunctionExamplePreview = (
  model: BaseUiFormServerFunctionExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiFormServerFunctionExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiFormServerFunctionExampleMessage({ message }),
  });
};

export const baseUiInputBasicExamplePreview = (
  model: BaseUiInputBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiInputBasicExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiInputBasicExampleMessage({ message }),
  });
};

export const baseUiMenuBasicExamplePreview = (
  model: BaseUiMenuBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiMenuBasicExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiMenuBasicExampleMessage({ message }),
  });
};

export const baseUiMenuNestedExamplePreview = (
  model: BaseUiMenuNestedExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiMenuNestedExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiMenuNestedExampleMessage({ message }),
  });
};

export const baseUiMenubarBasicExamplePreview = (
  model: BaseUiMenubarBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiMenubarBasicExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiMenubarBasicExampleMessage({ message }),
  });
};

export const baseUiMeterBasicExamplePreview = (
  model: BaseUiMeterBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiMeterBasicExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiMeterBasicExampleMessage({ message }),
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

export const baseUiComboboxBasicExamplePreview = (
  model: BaseUiComboboxBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiComboboxBasicExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiComboboxBasicExampleMessage({ message }),
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
