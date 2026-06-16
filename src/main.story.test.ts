import { Option } from "effect";
import { Calendar, Story, Ui } from "foldkit";
import { fromString } from "foldkit/url";
import { describe, expect, test } from "vitest";

import * as AccordionBasicExample from "../registry/default/examples/accordion-basic/main";
import * as AccordionMultipleExample from "../registry/default/examples/accordion-multiple/main";
import * as AlertActionExample from "../registry/default/examples/alert-action/main";
import * as AlertBasicExample from "../registry/default/examples/alert-basic/main";
import * as AlertCustomColorsExample from "../registry/default/examples/alert-custom-colors/main";
import * as AlertDestructiveExample from "../registry/default/examples/alert-destructive/main";
import * as AlertDialogBasicExample from "../registry/default/examples/alert-dialog-basic/main";
import * as AlertRtlExample from "../registry/default/examples/alert-rtl/main";
import * as AnimationBasicExample from "../registry/default/examples/animation-basic/main";
import * as AspectRatioBasicExample from "../registry/default/examples/aspect-ratio-basic/main";
import * as AspectRatioPortraitExample from "../registry/default/examples/aspect-ratio-portrait/main";
import * as AspectRatioRtlExample from "../registry/default/examples/aspect-ratio-rtl/main";
import * as AspectRatioSquareExample from "../registry/default/examples/aspect-ratio-square/main";
import * as AutocompleteBasicExample from "../registry/default/examples/autocomplete-basic/main";
import * as AvatarBasicExample from "../registry/default/examples/avatar-basic/main";
import * as BadgeBasicExample from "../registry/default/examples/badge-basic/main";
import * as BadgeSpinnerExample from "../registry/default/examples/badge-spinner/main";
import * as BaseUiAccordionBasicExample from "../registry/default/examples/base-ui-accordion-basic/main";
import * as BaseUiAccordionMultipleExample from "../registry/default/examples/base-ui-accordion-multiple/main";
import * as BaseUiAlertDialogBasicExample from "../registry/default/examples/base-ui-alert-dialog-basic/main";
import * as BaseUiAlertDialogCloseConfirmationExample from "../registry/default/examples/base-ui-alert-dialog-close-confirmation/main";
import * as BaseUiAlertDialogControlledMultipleTriggersExample from "../registry/default/examples/base-ui-alert-dialog-controlled-multiple-triggers/main";
import * as BaseUiAlertDialogDetachedTriggersExample from "../registry/default/examples/base-ui-alert-dialog-detached-triggers/main";
import * as BaseUiAlertDialogMultipleTriggersExample from "../registry/default/examples/base-ui-alert-dialog-multiple-triggers/main";
import * as BaseUiAlertDialogOpenFromMenuExample from "../registry/default/examples/base-ui-alert-dialog-open-from-menu/main";
import * as BaseUiAutocompleteBasicExample from "../registry/default/examples/base-ui-autocomplete-basic/main";
import * as BaseUiAvatarBasicExample from "../registry/default/examples/base-ui-avatar-basic/main";
import * as BaseUiButtonBasicExample from "../registry/default/examples/base-ui-button-basic/main";
import * as BaseUiCheckboxBasicExample from "../registry/default/examples/base-ui-checkbox-basic/main";
import * as BaseUiCheckboxFormExample from "../registry/default/examples/base-ui-checkbox-form/main";
import * as BaseUiCheckboxGroupBasicExample from "../registry/default/examples/base-ui-checkbox-group-basic/main";
import * as BaseUiCheckboxGroupFormExample from "../registry/default/examples/base-ui-checkbox-group-form/main";
import * as BaseUiCheckboxGroupLabelingExample from "../registry/default/examples/base-ui-checkbox-group-labeling/main";
import * as BaseUiCheckboxGroupNativeButtonExample from "../registry/default/examples/base-ui-checkbox-group-native-button/main";
import * as BaseUiCheckboxGroupNestedParentExample from "../registry/default/examples/base-ui-checkbox-group-nested-parent/main";
import * as BaseUiCheckboxGroupParentExample from "../registry/default/examples/base-ui-checkbox-group-parent/main";
import * as BaseUiCheckboxLabelingExample from "../registry/default/examples/base-ui-checkbox-labeling/main";
import * as BaseUiCheckboxNativeButtonExample from "../registry/default/examples/base-ui-checkbox-native-button/main";
import * as BaseUiCollapsibleBasicExample from "../registry/default/examples/base-ui-collapsible-basic/main";
import * as BaseUiComboboxBasicExample from "../registry/default/examples/base-ui-combobox-basic/main";
import * as BaseUiContextMenuBasicExample from "../registry/default/examples/base-ui-context-menu-basic/main";
import * as BaseUiContextMenuNestedExample from "../registry/default/examples/base-ui-context-menu-nested/main";
import * as BaseUiDialogBasicExample from "../registry/default/examples/base-ui-dialog-basic/main";
import * as BaseUiDialogCloseConfirmationExample from "../registry/default/examples/base-ui-dialog-close-confirmation/main";
import * as BaseUiDialogNestedExample from "../registry/default/examples/base-ui-dialog-nested/main";
import * as BaseUiDrawerBasicExample from "../registry/default/examples/base-ui-drawer-basic/main";
import * as BaseUiDrawerNonModalExample from "../registry/default/examples/base-ui-drawer-non-modal/main";
import * as BaseUiDrawerPositionExample from "../registry/default/examples/base-ui-drawer-position/main";
import * as BaseUiFieldBasicExample from "../registry/default/examples/base-ui-field-basic/main";
import * as BaseUiFieldsetBasicExample from "../registry/default/examples/base-ui-fieldset-basic/main";
import * as BaseUiFormBasicExample from "../registry/default/examples/base-ui-form-basic/main";
import * as BaseUiFormSchemaValidationExample from "../registry/default/examples/base-ui-form-schema-validation/main";
import * as BaseUiFormServerFunctionExample from "../registry/default/examples/base-ui-form-server-function/main";
import * as BaseUiInputBasicExample from "../registry/default/examples/base-ui-input-basic/main";
import * as BaseUiMenuBasicExample from "../registry/default/examples/base-ui-menu-basic/main";
import * as BaseUiMenuNestedExample from "../registry/default/examples/base-ui-menu-nested/main";
import * as BaseUiMenubarBasicExample from "../registry/default/examples/base-ui-menubar-basic/main";
import * as BaseUiMeterBasicExample from "../registry/default/examples/base-ui-meter-basic/main";
import * as BaseUiNavigationMenuBasicExample from "../registry/default/examples/base-ui-navigation-menu-basic/main";
import * as BaseUiNumberFieldBasicExample from "../registry/default/examples/base-ui-number-field-basic/main";
import * as BaseUiOtpFieldBasicExample from "../registry/default/examples/base-ui-otp-field-basic/main";
import * as BaseUiPopoverAnimatedExample from "../registry/default/examples/base-ui-popover-animated/main";
import * as BaseUiPopoverBasicExample from "../registry/default/examples/base-ui-popover-basic/main";
import * as BaseUiPopoverDetachedTriggerExample from "../registry/default/examples/base-ui-popover-detached-trigger/main";
import * as BaseUiPopoverMultipleTriggersExample from "../registry/default/examples/base-ui-popover-multiple-triggers/main";
import * as BaseUiPopoverOpenOnHoverExample from "../registry/default/examples/base-ui-popover-open-on-hover/main";
import * as BaseUiPreviewCardBasicExample from "../registry/default/examples/base-ui-preview-card-basic/main";
import * as BaseUiProgressBasicExample from "../registry/default/examples/base-ui-progress-basic/main";
import * as BaseUiRadioBasicExample from "../registry/default/examples/base-ui-radio-basic/main";
import * as BaseUiRadioFormExample from "../registry/default/examples/base-ui-radio-form/main";
import * as BaseUiRadioLabelingExample from "../registry/default/examples/base-ui-radio-labeling/main";
import * as BaseUiRadioNativeButtonExample from "../registry/default/examples/base-ui-radio-native-button/main";
import * as ScrollAreaBasicExample from "../registry/default/examples/base-ui-scroll-area-basic/main";
import * as ScrollAreaBothScrollbarsExample from "../registry/default/examples/base-ui-scroll-area-both-scrollbars/main";
import * as ScrollAreaGradientExample from "../registry/default/examples/base-ui-scroll-area-gradient/main";
import * as ScrollAreaTabsExample from "../registry/default/examples/base-ui-scroll-area-tabs/main";
import * as BaseUiSelectBasicExample from "../registry/default/examples/base-ui-select-basic/main";
import * as BaseUiSeparatorBasicExample from "../registry/default/examples/base-ui-separator-basic/main";
import * as BaseUiSliderBasicExample from "../registry/default/examples/base-ui-slider-basic/main";
import * as BaseUiSwitchBasicExample from "../registry/default/examples/base-ui-switch-basic/main";
import * as BaseUiTabsBasicExample from "../registry/default/examples/base-ui-tabs-basic/main";
import * as BaseUiToastBasicExample from "../registry/default/examples/base-ui-toast-basic/main";
import * as BaseUiToggleBasicExample from "../registry/default/examples/base-ui-toggle-basic/main";
import * as BaseUiToggleGroupBasicExample from "../registry/default/examples/base-ui-toggle-group-basic/main";
import * as BaseUiToolbarBasicExample from "../registry/default/examples/base-ui-toolbar-basic/main";
import * as BaseUiTooltipBasicExample from "../registry/default/examples/base-ui-tooltip-basic/main";
import * as BreadcrumbBasicExample from "../registry/default/examples/breadcrumb-basic/main";
import * as BreadcrumbCollapsedExample from "../registry/default/examples/breadcrumb-collapsed/main";
import * as BreadcrumbDropdownExample from "../registry/default/examples/breadcrumb-dropdown/main";
import * as BreadcrumbLinkExample from "../registry/default/examples/breadcrumb-link/main";
import * as BreadcrumbRtlExample from "../registry/default/examples/breadcrumb-rtl/main";
import * as BreadcrumbSeparatorExample from "../registry/default/examples/breadcrumb-separator/main";
import * as ButtonBasicExample from "../registry/default/examples/button-basic/main";
import * as ButtonDisabledExample from "../registry/default/examples/button-disabled/main";
import * as ButtonGroupBasicExample from "../registry/default/examples/button-group-basic/main";
import * as ButtonGroupInputGroupExample from "../registry/default/examples/button-group-input-group/main";
import * as ButtonGroupInputExample from "../registry/default/examples/button-group-input/main";
import * as ButtonGroupNestedExample from "../registry/default/examples/button-group-nested/main";
import * as ButtonGroupOrientationExample from "../registry/default/examples/button-group-orientation/main";
import * as ButtonGroupPopoverExample from "../registry/default/examples/button-group-popover/main";
import * as ButtonGroupRtlExample from "../registry/default/examples/button-group-rtl/main";
import * as ButtonGroupSelectExample from "../registry/default/examples/button-group-select/main";
import * as ButtonGroupSeparatorExample from "../registry/default/examples/button-group-separator/main";
import * as ButtonGroupSizeExample from "../registry/default/examples/button-group-size/main";
import * as ButtonGroupSplitExample from "../registry/default/examples/button-group-split/main";
import * as CalendarBasicExample from "../registry/default/examples/calendar-basic/main";
import * as CalendarBoundsExample from "../registry/default/examples/calendar-bounds/main";
import * as CardBasicExample from "../registry/default/examples/card-basic/main";
import * as CardImageExample from "../registry/default/examples/card-image/main";
import * as CardRtlExample from "../registry/default/examples/card-rtl/main";
import * as CardSizeExample from "../registry/default/examples/card-size/main";
import * as CardSpacingExample from "../registry/default/examples/card-spacing/main";
import * as CarouselApiExample from "../registry/default/examples/carousel-api/main";
import * as CarouselAutoplayExample from "../registry/default/examples/carousel-autoplay/main";
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
import * as CommandGroupsExample from "../registry/default/examples/command-groups/main";
import * as CommandRtlExample from "../registry/default/examples/command-rtl/main";
import * as CommandScrollableExample from "../registry/default/examples/command-scrollable/main";
import * as CommandShortcutsExample from "../registry/default/examples/command-shortcuts/main";
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
import * as DropdownMenuCheckboxesExample from "../registry/default/examples/dropdown-menu-checkboxes/main";
import * as DropdownMenuComplexExample from "../registry/default/examples/dropdown-menu-complex/main";
import * as DropdownMenuDestructiveExample from "../registry/default/examples/dropdown-menu-destructive/main";
import * as DropdownMenuIconsExample from "../registry/default/examples/dropdown-menu-icons/main";
import * as DropdownMenuRadioGroupExample from "../registry/default/examples/dropdown-menu-radio-group/main";
import * as DropdownMenuRtlExample from "../registry/default/examples/dropdown-menu-rtl/main";
import * as DropdownMenuShortcutsExample from "../registry/default/examples/dropdown-menu-shortcuts/main";
import * as DropdownMenuSubmenuExample from "../registry/default/examples/dropdown-menu-submenu/main";
import * as EmptyAvatarGroupExample from "../registry/default/examples/empty-avatar-group/main";
import * as EmptyAvatarExample from "../registry/default/examples/empty-avatar/main";
import * as EmptyBackgroundExample from "../registry/default/examples/empty-background/main";
import * as EmptyBasicExample from "../registry/default/examples/empty-basic/main";
import * as EmptyInputGroupExample from "../registry/default/examples/empty-input-group/main";
import * as EmptyOutlineExample from "../registry/default/examples/empty-outline/main";
import * as EmptyRtlExample from "../registry/default/examples/empty-rtl/main";
import * as FieldBasicExample from "../registry/default/examples/field-basic/main";
import * as FieldsetBasicExample from "../registry/default/examples/fieldset-basic/main";
import * as FieldsetDisabledExample from "../registry/default/examples/fieldset-disabled/main";
import * as FileDropBasicExample from "../registry/default/examples/file-drop-basic/main";
import * as FileDropDisabledExample from "../registry/default/examples/file-drop-disabled/main";
import * as FormBasicExample from "../registry/default/examples/form-basic/main";
import * as HoverCardBasicExample from "../registry/default/examples/hover-card-basic/main";
import * as HoverCardRtlExample from "../registry/default/examples/hover-card-rtl/main";
import * as HoverCardSidesExample from "../registry/default/examples/hover-card-sides/main";
import * as InputBasicExample from "../registry/default/examples/input-basic/main";
import * as InputDisabledExample from "../registry/default/examples/input-disabled/main";
import * as InputOtpAlphanumericExample from "../registry/default/examples/input-otp-alphanumeric/main";
import * as InputOtpBasicExample from "../registry/default/examples/input-otp-basic/main";
import * as InputOtpControlledExample from "../registry/default/examples/input-otp-controlled/main";
import * as InputOtpDisabledExample from "../registry/default/examples/input-otp-disabled/main";
import * as InputOtpFormExample from "../registry/default/examples/input-otp-form/main";
import * as InputOtpFourDigitsExample from "../registry/default/examples/input-otp-four-digits/main";
import * as InputOtpInvalidExample from "../registry/default/examples/input-otp-invalid/main";
import * as InputOtpPatternExample from "../registry/default/examples/input-otp-pattern/main";
import * as InputOtpRtlExample from "../registry/default/examples/input-otp-rtl/main";
import * as InputOtpSeparatorExample from "../registry/default/examples/input-otp-separator/main";
import * as ItemAvatarExample from "../registry/default/examples/item-avatar/main";
import * as ItemBasicExample from "../registry/default/examples/item-basic/main";
import * as ItemDropdownExample from "../registry/default/examples/item-dropdown/main";
import * as ItemGroupExample from "../registry/default/examples/item-group/main";
import * as ItemHeaderExample from "../registry/default/examples/item-header/main";
import * as ItemIconExample from "../registry/default/examples/item-icon/main";
import * as ItemImageExample from "../registry/default/examples/item-image/main";
import * as ItemLinkExample from "../registry/default/examples/item-link/main";
import * as ItemRtlExample from "../registry/default/examples/item-rtl/main";
import * as ItemSizeExample from "../registry/default/examples/item-size/main";
import * as ItemVariantExample from "../registry/default/examples/item-variant/main";
import * as KbdBasicExample from "../registry/default/examples/kbd-basic/main";
import * as KbdInputGroupExample from "../registry/default/examples/kbd-input-group/main";
import * as KbdRtlExample from "../registry/default/examples/kbd-rtl/main";
import * as LabelBasicExample from "../registry/default/examples/label-basic/main";
import * as LabelFieldExample from "../registry/default/examples/label-field/main";
import * as LabelRtlExample from "../registry/default/examples/label-rtl/main";
import * as ListboxAnimatedExample from "../registry/default/examples/listbox-animated/main";
import * as ListboxBasicExample from "../registry/default/examples/listbox-basic/main";
import * as MenuAnimatedExample from "../registry/default/examples/menu-animated/main";
import * as MenuBasicExample from "../registry/default/examples/menu-basic/main";
import * as MenubarBasicExample from "../registry/default/examples/menubar-basic/main";
import * as MeterBasicExample from "../registry/default/examples/meter-basic/main";
import * as NativeSelectBasicExample from "../registry/default/examples/native-select-basic/main";
import * as NativeSelectDisabledExample from "../registry/default/examples/native-select-disabled/main";
import * as NativeSelectGroupsExample from "../registry/default/examples/native-select-groups/main";
import * as NativeSelectInvalidExample from "../registry/default/examples/native-select-invalid/main";
import * as NativeSelectRtlExample from "../registry/default/examples/native-select-rtl/main";
import * as NavigationMenuBasicExample from "../registry/default/examples/navigation-menu-basic/main";
import * as NumberFieldBasicExample from "../registry/default/examples/number-field-basic/main";
import * as OtpFieldBasicExample from "../registry/default/examples/otp-field-basic/main";
import * as PaginationBasicExample from "../registry/default/examples/pagination-basic/main";
import * as PaginationIconsOnlyExample from "../registry/default/examples/pagination-icons-only/main";
import * as PaginationRtlExample from "../registry/default/examples/pagination-rtl/main";
import * as PaginationSimpleExample from "../registry/default/examples/pagination-simple/main";
import * as PopoverAnimatedExample from "../registry/default/examples/popover-animated/main";
import * as PopoverBasicExample from "../registry/default/examples/popover-basic/main";
import * as PreviewCardBasicExample from "../registry/default/examples/preview-card-basic/main";
import * as ProgressBasicExample from "../registry/default/examples/progress-basic/main";
import * as RadioBasicExample from "../registry/default/examples/radio-basic/main";
import * as RadioGroupBasicExample from "../registry/default/examples/radio-group-basic/main";
import * as RadioGroupHorizontalExample from "../registry/default/examples/radio-group-horizontal/main";
import * as ResizableBasicExample from "../registry/default/examples/resizable-basic/main";
import * as ResizableHandleExample from "../registry/default/examples/resizable-handle/main";
import * as ResizableRtlExample from "../registry/default/examples/resizable-rtl/main";
import * as ResizableVerticalExample from "../registry/default/examples/resizable-vertical/main";
import * as SelectBasicExample from "../registry/default/examples/select-basic/main";
import * as SelectDisabledExample from "../registry/default/examples/select-disabled/main";
import * as SeparatorBasicExample from "../registry/default/examples/separator-basic/main";
import * as ShadcnAccordionBasicExample from "../registry/default/examples/shadcn-accordion-basic/main";
import * as ShadcnAccordionBordersExample from "../registry/default/examples/shadcn-accordion-borders/main";
import * as ShadcnAccordionCardExample from "../registry/default/examples/shadcn-accordion-card/main";
import * as ShadcnAccordionDisabledExample from "../registry/default/examples/shadcn-accordion-disabled/main";
import * as ShadcnAccordionMultipleExample from "../registry/default/examples/shadcn-accordion-multiple/main";
import * as ShadcnAccordionRtlExample from "../registry/default/examples/shadcn-accordion-rtl/main";
import * as ShadcnAlertDialogBasicExample from "../registry/default/examples/shadcn-alert-dialog-basic/main";
import * as ShadcnAlertDialogDestructiveExample from "../registry/default/examples/shadcn-alert-dialog-destructive/main";
import * as ShadcnAlertDialogMediaExample from "../registry/default/examples/shadcn-alert-dialog-media/main";
import * as ShadcnAlertDialogRtlExample from "../registry/default/examples/shadcn-alert-dialog-rtl/main";
import * as ShadcnAlertDialogSmallMediaExample from "../registry/default/examples/shadcn-alert-dialog-small-media/main";
import * as ShadcnAlertDialogSmallExample from "../registry/default/examples/shadcn-alert-dialog-small/main";
import * as ShadcnAvatarBasicExample from "../registry/default/examples/shadcn-avatar-basic/main";
import * as ShadcnAvatarDropdownExample from "../registry/default/examples/shadcn-avatar-dropdown/main";
import * as ShadcnBaseAccordionBasicExample from "../registry/default/examples/shadcn-base-accordion-basic/main";
import * as ShadcnButtonBasicExample from "../registry/default/examples/shadcn-button-basic/main";
import * as ShadcnCalendarBasicExample from "../registry/default/examples/shadcn-calendar-basic/main";
import * as ShadcnCalendarBookedExample from "../registry/default/examples/shadcn-calendar-booked/main";
import * as ShadcnCalendarCustomCellSizeExample from "../registry/default/examples/shadcn-calendar-custom-cell-size/main";
import * as ShadcnCalendarDateOfBirthExample from "../registry/default/examples/shadcn-calendar-date-of-birth/main";
import * as ShadcnCalendarDateTimePickerExample from "../registry/default/examples/shadcn-calendar-date-time-picker/main";
import * as ShadcnCalendarRangeExample from "../registry/default/examples/shadcn-calendar-range/main";
import * as ShadcnCalendarWeekNumbersExample from "../registry/default/examples/shadcn-calendar-week-numbers/main";
import * as ShadcnCalendarMonthYearSelectorExample from "../registry/default/examples/shadcn-calendar-month-year-selector/main";
import * as ShadcnCalendarPresetsExample from "../registry/default/examples/shadcn-calendar-presets/main";
import * as ShadcnCalendarRtlExample from "../registry/default/examples/shadcn-calendar-rtl/main";
import * as ShadcnCheckboxBasicExample from "../registry/default/examples/shadcn-checkbox-basic/main";
import * as ShadcnCheckboxCheckedStateExample from "../registry/default/examples/shadcn-checkbox-checked-state/main";
import * as ShadcnCollapsibleBasicExample from "../registry/default/examples/shadcn-collapsible-basic/main";
import * as ShadcnComboboxBasicExample from "../registry/default/examples/shadcn-combobox-basic/main";
import * as ShadcnContextMenuBasicExample from "../registry/default/examples/shadcn-context-menu-basic/main";
import * as ShadcnDatePickerBasicExample from "../registry/default/examples/shadcn-date-picker-basic/main";
import * as ShadcnDialogBasicExample from "../registry/default/examples/shadcn-dialog-basic/main";
import * as ShadcnDialogCustomCloseButtonExample from "../registry/default/examples/shadcn-dialog-custom-close-button/main";
import * as ShadcnDialogNoCloseButtonExample from "../registry/default/examples/shadcn-dialog-no-close-button/main";
import * as ShadcnDialogRtlExample from "../registry/default/examples/shadcn-dialog-rtl/main";
import * as ShadcnDialogScrollableContentExample from "../registry/default/examples/shadcn-dialog-scrollable-content/main";
import * as ShadcnDialogStickyFooterExample from "../registry/default/examples/shadcn-dialog-sticky-footer/main";
import * as ShadcnDrawerBasicExample from "../registry/default/examples/shadcn-drawer-basic/main";
import * as ShadcnDrawerResponsiveDialogExample from "../registry/default/examples/shadcn-drawer-responsive-dialog/main";
import * as ShadcnDrawerRtlExample from "../registry/default/examples/shadcn-drawer-rtl/main";
import * as ShadcnDrawerScrollableContentExample from "../registry/default/examples/shadcn-drawer-scrollable-content/main";
import * as ShadcnDrawerSidesExample from "../registry/default/examples/shadcn-drawer-sides/main";
import * as ShadcnFieldBasicExample from "../registry/default/examples/shadcn-field-basic/main";
import * as ShadcnInputBadgeExample from "../registry/default/examples/shadcn-input-badge/main";
import * as ShadcnInputBasicExample from "../registry/default/examples/shadcn-input-basic/main";
import * as ShadcnInputButtonGroupExample from "../registry/default/examples/shadcn-input-button-group/main";
import * as ShadcnInputDemoExample from "../registry/default/examples/shadcn-input-demo/main";
import * as ShadcnInputDisabledExample from "../registry/default/examples/shadcn-input-disabled/main";
import * as ShadcnInputFieldGroupExample from "../registry/default/examples/shadcn-input-field-group/main";
import * as ShadcnInputFieldExample from "../registry/default/examples/shadcn-input-field/main";
import * as ShadcnInputFileExample from "../registry/default/examples/shadcn-input-file/main";
import * as ShadcnInputFormExample from "../registry/default/examples/shadcn-input-form/main";
import * as ShadcnInputGridExample from "../registry/default/examples/shadcn-input-grid/main";
import * as ShadcnInputInlineExample from "../registry/default/examples/shadcn-input-inline/main";
import * as ShadcnInputInputGroupExample from "../registry/default/examples/shadcn-input-input-group/main";
import * as ShadcnInputInvalidExample from "../registry/default/examples/shadcn-input-invalid/main";
import * as ShadcnInputRequiredExample from "../registry/default/examples/shadcn-input-required/main";
import * as ShadcnInputRtlExample from "../registry/default/examples/shadcn-input-rtl/main";
import * as ShadcnMenubarBasicExample from "../registry/default/examples/shadcn-menubar-basic/main";
import * as ShadcnPopoverBasicExample from "../registry/default/examples/shadcn-popover-basic/main";
import * as ShadcnRadioGroupBasicExample from "../registry/default/examples/shadcn-radio-group-basic/main";
import * as ShadcnSelectBasicExample from "../registry/default/examples/shadcn-select-basic/main";
import * as ShadcnSliderBasicExample from "../registry/default/examples/shadcn-slider-basic/main";
import * as ShadcnSwitchBasicExample from "../registry/default/examples/shadcn-switch-basic/main";
import * as ShadcnTabsBasicExample from "../registry/default/examples/shadcn-tabs-basic/main";
import * as ShadcnTextareaBasicExample from "../registry/default/examples/shadcn-textarea-basic/main";
import * as ShadcnToastBasicExample from "../registry/default/examples/shadcn-toast-basic/main";
import * as ShadcnToggleBasicExample from "../registry/default/examples/shadcn-toggle-basic/main";
import * as ShadcnToggleGroupBasicExample from "../registry/default/examples/shadcn-toggle-group-basic/main";
import * as ShadcnTooltipBasicExample from "../registry/default/examples/shadcn-tooltip-basic/main";
import * as SheetBasicExample from "../registry/default/examples/sheet-basic/main";
import * as SidebarBasicExample from "../registry/default/examples/sidebar-basic/main";
import * as SidebarCompositionExample from "../registry/default/examples/sidebar-composition/main";
import * as SidebarControlledExample from "../registry/default/examples/sidebar-controlled/main";
import * as SidebarRtlExample from "../registry/default/examples/sidebar-rtl/main";
import * as SidebarVariantsExample from "../registry/default/examples/sidebar-variants/main";
import * as SkeletonBasicExample from "../registry/default/examples/skeleton-basic/main";
import * as SliderBasicExample from "../registry/default/examples/slider-basic/main";
import * as SliderDisabledExample from "../registry/default/examples/slider-disabled/main";
import * as SonnerBasicExample from "../registry/default/examples/sonner-basic/main";
import * as SpinnerBasicExample from "../registry/default/examples/spinner-basic/main";
import * as SwitchBasicExample from "../registry/default/examples/switch-basic/main";
import * as SwitchDisabledExample from "../registry/default/examples/switch-disabled/main";
import * as TableBasicExample from "../registry/default/examples/table-basic/main";
import * as TabsBasicExample from "../registry/default/examples/tabs-basic/main";
import * as TabsManualExample from "../registry/default/examples/tabs-manual/main";
import * as TextareaBasicExample from "../registry/default/examples/textarea-basic/main";
import * as TextareaDisabledExample from "../registry/default/examples/textarea-disabled/main";
import * as ToastBasicExample from "../registry/default/examples/toast-basic/main";
import * as ToastVariantsExample from "../registry/default/examples/toast-variants/main";
import * as ToggleBasicExample from "../registry/default/examples/toggle-basic/main";
import * as ToggleGroupBasicExample from "../registry/default/examples/toggle-group-basic/main";
import * as ToolbarBasicExample from "../registry/default/examples/toolbar-basic/main";
import * as TooltipBasicExample from "../registry/default/examples/tooltip-basic/main";
import * as TooltipNoDelayExample from "../registry/default/examples/tooltip-no-delay/main";
import * as TypographyBasicExample from "../registry/default/examples/typography-basic/main";
import * as VirtualListBasicExample from "../registry/default/examples/virtual-list-basic/main";
import * as VirtualListVariableExample from "../registry/default/examples/virtual-list-variable/main";
import { ChangedUrl, GotUiMessage, HomeRoute, update } from "./main";
import type { Model } from "./main";
import * as NewComponentAuthoring from "./newComponentAuthoring";
import * as ThemePlayground from "./themePlayground";
import { uiInit } from "./ui/init";
import { GotMobileMenuDialogMessage } from "./ui/message";

const today = Calendar.make(2026, 4, 16);
const [initialUiModel] = uiInit(today);
const [newComponentAuthoring] = NewComponentAuthoring.init();
const [themePlayground] = ThemePlayground.init();
const [accordionBasicExample] = AccordionBasicExample.init();
const [shadcnAccordionBasicExample] = ShadcnAccordionBasicExample.init();
const [shadcnBaseAccordionBasicExample] =
  ShadcnBaseAccordionBasicExample.init();
const [shadcnAccordionBordersExample] = ShadcnAccordionBordersExample.init();
const [shadcnAccordionCardExample] = ShadcnAccordionCardExample.init();
const [shadcnAccordionDisabledExample] = ShadcnAccordionDisabledExample.init();
const [shadcnAccordionMultipleExample] = ShadcnAccordionMultipleExample.init();
const [shadcnAccordionRtlExample] = ShadcnAccordionRtlExample.init();
const [accordionMultipleExample] = AccordionMultipleExample.init();
const [baseUiAccordionBasicExample] = BaseUiAccordionBasicExample.init();
const [baseUiAccordionMultipleExample] = BaseUiAccordionMultipleExample.init();
const [alertBasicExample] = AlertBasicExample.init();
const [alertActionExample] = AlertActionExample.init();
const [alertDestructiveExample] = AlertDestructiveExample.init();
const [alertCustomColorsExample] = AlertCustomColorsExample.init();
const [alertRtlExample] = AlertRtlExample.init();
const [aspectRatioBasicExample] = AspectRatioBasicExample.init();
const [aspectRatioSquareExample] = AspectRatioSquareExample.init();
const [aspectRatioPortraitExample] = AspectRatioPortraitExample.init();
const [aspectRatioRtlExample] = AspectRatioRtlExample.init();
const [alertDialogBasicExample] = AlertDialogBasicExample.init();
const [baseUiAlertDialogBasicExample] = BaseUiAlertDialogBasicExample.init();
const [baseUiAlertDialogCloseConfirmationExample] =
  BaseUiAlertDialogCloseConfirmationExample.init();
const [baseUiAlertDialogControlledMultipleTriggersExample] =
  BaseUiAlertDialogControlledMultipleTriggersExample.init();
const [baseUiAlertDialogDetachedTriggersExample] =
  BaseUiAlertDialogDetachedTriggersExample.init();
const [baseUiAlertDialogMultipleTriggersExample] =
  BaseUiAlertDialogMultipleTriggersExample.init();
const [baseUiAlertDialogOpenFromMenuExample] =
  BaseUiAlertDialogOpenFromMenuExample.init();
const [shadcnAlertDialogBasicExample] = ShadcnAlertDialogBasicExample.init();
const [shadcnAlertDialogSmallExample] = ShadcnAlertDialogSmallExample.init();
const [shadcnAlertDialogMediaExample] = ShadcnAlertDialogMediaExample.init();
const [shadcnAlertDialogSmallMediaExample] =
  ShadcnAlertDialogSmallMediaExample.init();
const [shadcnAlertDialogDestructiveExample] =
  ShadcnAlertDialogDestructiveExample.init();
const [shadcnAlertDialogRtlExample] = ShadcnAlertDialogRtlExample.init();
const [drawerBasicExample] = DrawerBasicExample.init();
const [baseUiContextMenuBasicExample] = BaseUiContextMenuBasicExample.init();
const [baseUiContextMenuNestedExample] = BaseUiContextMenuNestedExample.init();
const [contextMenuBasicExample] = ContextMenuBasicExample.init();
const [menubarBasicExample] = MenubarBasicExample.init();
const [baseUiNavigationMenuBasicExample] =
  BaseUiNavigationMenuBasicExample.init();
const [navigationMenuBasicExample] = NavigationMenuBasicExample.init();
const [baseUiOtpFieldBasicExample] = BaseUiOtpFieldBasicExample.init();
const [otpFieldBasicExample] = OtpFieldBasicExample.init();
const [baseUiPreviewCardBasicExample] = BaseUiPreviewCardBasicExample.init();
const [previewCardBasicExample] = PreviewCardBasicExample.init();
const [autocompleteBasicExample] = AutocompleteBasicExample.init();
const [baseUiAutocompleteBasicExample] = BaseUiAutocompleteBasicExample.init();
const [collapsibleBasicExample] = CollapsibleBasicExample.init();
const [baseUiCollapsibleBasicExample] = BaseUiCollapsibleBasicExample.init();
const [shadcnCollapsibleBasicExample] = ShadcnCollapsibleBasicExample.init();
const [fieldBasicExample] = FieldBasicExample.init();
const [formBasicExample] = FormBasicExample.init();
const [baseUiNumberFieldBasicExample] = BaseUiNumberFieldBasicExample.init();
const [numberFieldBasicExample] = NumberFieldBasicExample.init();
const [animationBasicExample] = AnimationBasicExample.init();
const [avatarBasicExample] = AvatarBasicExample.init();
const [baseUiAvatarBasicExample] = BaseUiAvatarBasicExample.init();
const [shadcnAvatarBasicExample] = ShadcnAvatarBasicExample.init();
const [shadcnAvatarDropdownExample] = ShadcnAvatarDropdownExample.init();
const [badgeBasicExample] = BadgeBasicExample.init();
const [badgeSpinnerExample] = BadgeSpinnerExample.init();
const [carouselBasicExample] = CarouselBasicExample.init();
const [carouselSizesExample] = CarouselSizesExample.init();
const [carouselSpacingExample] = CarouselSpacingExample.init();
const [carouselOrientationExample] = CarouselOrientationExample.init();
const [carouselApiExample] = CarouselApiExample.init();
const [carouselAutoplayExample] = CarouselAutoplayExample.init();
const [carouselRtlExample] = CarouselRtlExample.init();
const [chartBasicExample] = ChartBasicExample.init();
const [chartGridExample] = ChartGridExample.init();
const [chartAxisExample] = ChartAxisExample.init();
const [chartTooltipExample] = ChartTooltipExample.init();
const [chartLegendExample] = ChartLegendExample.init();
const [chartRtlExample] = ChartRtlExample.init();
const [commandBasicExample] = CommandBasicExample.init();
const [commandGroupsExample] = CommandGroupsExample.init();
const [commandRtlExample] = CommandRtlExample.init();
const [commandScrollableExample] = CommandScrollableExample.init();
const [commandShortcutsExample] = CommandShortcutsExample.init();
const [dropdownMenuBasicExample] = DropdownMenuBasicExample.init();
const [dropdownMenuCheckboxesExample] = DropdownMenuCheckboxesExample.init();
const [dropdownMenuComplexExample] = DropdownMenuComplexExample.init();
const [dropdownMenuDestructiveExample] = DropdownMenuDestructiveExample.init();
const [dropdownMenuIconsExample] = DropdownMenuIconsExample.init();
const [dropdownMenuRadioGroupExample] = DropdownMenuRadioGroupExample.init();
const [dropdownMenuRtlExample] = DropdownMenuRtlExample.init();
const [dropdownMenuShortcutsExample] = DropdownMenuShortcutsExample.init();
const [dropdownMenuSubmenuExample] = DropdownMenuSubmenuExample.init();
const [hoverCardBasicExample] = HoverCardBasicExample.init();
const [hoverCardSidesExample] = HoverCardSidesExample.init();
const [hoverCardRtlExample] = HoverCardRtlExample.init();
const [inputOtpBasicExample] = InputOtpBasicExample.init();
const [inputOtpPatternExample] = InputOtpPatternExample.init();
const [inputOtpSeparatorExample] = InputOtpSeparatorExample.init();
const [inputOtpDisabledExample] = InputOtpDisabledExample.init();
const [inputOtpControlledExample] = InputOtpControlledExample.init();
const [inputOtpInvalidExample] = InputOtpInvalidExample.init();
const [inputOtpFourDigitsExample] = InputOtpFourDigitsExample.init();
const [inputOtpAlphanumericExample] = InputOtpAlphanumericExample.init();
const [inputOtpFormExample] = InputOtpFormExample.init();
const [inputOtpRtlExample] = InputOtpRtlExample.init();
const [nativeSelectBasicExample] = NativeSelectBasicExample.init();
const [nativeSelectDisabledExample] = NativeSelectDisabledExample.init();
const [nativeSelectGroupsExample] = NativeSelectGroupsExample.init();
const [nativeSelectInvalidExample] = NativeSelectInvalidExample.init();
const [nativeSelectRtlExample] = NativeSelectRtlExample.init();
const [sheetBasicExample] = SheetBasicExample.init();
const [sonnerBasicExample] = SonnerBasicExample.init();
const [dataTableBasicExample] = DataTableBasicExample.init();
const [dataTableRowActionsExample] = DataTableRowActionsExample.init();
const [dataTablePaginationExample] = DataTablePaginationExample.init();
const [dataTableSortingExample] = DataTableSortingExample.init();
const [dataTableFilteringExample] = DataTableFilteringExample.init();
const [dataTableVisibilityExample] = DataTableVisibilityExample.init();
const [dataTableRowSelectionExample] = DataTableRowSelectionExample.init();
const [itemAvatarExample] = ItemAvatarExample.init();
const [itemBasicExample] = ItemBasicExample.init();
const [itemGroupExample] = ItemGroupExample.init();
const [itemHeaderExample] = ItemHeaderExample.init();
const [itemIconExample] = ItemIconExample.init();
const [itemImageExample] = ItemImageExample.init();
const [itemLinkExample] = ItemLinkExample.init();
const [itemDropdownExample] = ItemDropdownExample.init();
const [itemRtlExample] = ItemRtlExample.init();
const [itemSizeExample] = ItemSizeExample.init();
const [itemVariantExample] = ItemVariantExample.init();
const [labelBasicExample] = LabelBasicExample.init();
const [labelFieldExample] = LabelFieldExample.init();
const [labelRtlExample] = LabelRtlExample.init();
const [paginationBasicExample] = PaginationBasicExample.init();
const [paginationSimpleExample] = PaginationSimpleExample.init();
const [paginationIconsOnlyExample] = PaginationIconsOnlyExample.init();
const [paginationRtlExample] = PaginationRtlExample.init();
const [resizableBasicExample] = ResizableBasicExample.init();
const [resizableHandleExample] = ResizableHandleExample.init();
const [resizableRtlExample] = ResizableRtlExample.init();
const [resizableVerticalExample] = ResizableVerticalExample.init();
const [sidebarBasicExample] = SidebarBasicExample.init();
const [sidebarCompositionExample] = SidebarCompositionExample.init();
const [sidebarControlledExample] = SidebarControlledExample.init();
const [sidebarRtlExample] = SidebarRtlExample.init();
const [sidebarVariantsExample] = SidebarVariantsExample.init();
const [tableBasicExample] = TableBasicExample.init();
const [cardBasicExample] = CardBasicExample.init();
const [cardSizeExample] = CardSizeExample.init();
const [cardSpacingExample] = CardSpacingExample.init();
const [cardImageExample] = CardImageExample.init();
const [cardRtlExample] = CardRtlExample.init();
const [baseUiSeparatorBasicExample] = BaseUiSeparatorBasicExample.init();
const [separatorBasicExample] = SeparatorBasicExample.init();
const [skeletonBasicExample] = SkeletonBasicExample.init();
const [spinnerBasicExample] = SpinnerBasicExample.init();
const [kbdBasicExample] = KbdBasicExample.init();
const [kbdInputGroupExample] = KbdInputGroupExample.init();
const [kbdRtlExample] = KbdRtlExample.init();
const [typographyBasicExample] = TypographyBasicExample.init();
const [emptyAvatarExample] = EmptyAvatarExample.init();
const [emptyAvatarGroupExample] = EmptyAvatarGroupExample.init();
const [emptyBackgroundExample] = EmptyBackgroundExample.init();
const [emptyBasicExample] = EmptyBasicExample.init();
const [emptyInputGroupExample] = EmptyInputGroupExample.init();
const [emptyOutlineExample] = EmptyOutlineExample.init();
const [emptyRtlExample] = EmptyRtlExample.init();
const [breadcrumbBasicExample] = BreadcrumbBasicExample.init();
const [breadcrumbSeparatorExample] = BreadcrumbSeparatorExample.init();
const [breadcrumbDropdownExample] = BreadcrumbDropdownExample.init();
const [breadcrumbCollapsedExample] = BreadcrumbCollapsedExample.init();
const [breadcrumbLinkExample] = BreadcrumbLinkExample.init();
const [breadcrumbRtlExample] = BreadcrumbRtlExample.init();
const [buttonBasicExample] = ButtonBasicExample.init();
const [baseUiButtonBasicExample] = BaseUiButtonBasicExample.init();
const [shadcnButtonBasicExample] = ShadcnButtonBasicExample.init();
const [buttonDisabledExample] = ButtonDisabledExample.init();
const [buttonGroupBasicExample] = ButtonGroupBasicExample.init();
const [buttonGroupOrientationExample] = ButtonGroupOrientationExample.init();
const [buttonGroupSizeExample] = ButtonGroupSizeExample.init();
const [buttonGroupNestedExample] = ButtonGroupNestedExample.init();
const [buttonGroupSeparatorExample] = ButtonGroupSeparatorExample.init();
const [buttonGroupSplitExample] = ButtonGroupSplitExample.init();
const [buttonGroupInputExample] = ButtonGroupInputExample.init();
const [buttonGroupInputGroupExample] = ButtonGroupInputGroupExample.init();
const [buttonGroupSelectExample] = ButtonGroupSelectExample.init();
const [buttonGroupPopoverExample] = ButtonGroupPopoverExample.init();
const [buttonGroupRtlExample] = ButtonGroupRtlExample.init();
const [calendarBasicExample] = CalendarBasicExample.init();
const [shadcnCalendarBasicExample] = ShadcnCalendarBasicExample.init();
const [shadcnCalendarBookedExample] = ShadcnCalendarBookedExample.init();
const [shadcnCalendarCustomCellSizeExample] =
  ShadcnCalendarCustomCellSizeExample.init();
const [shadcnCalendarDateOfBirthExample] =
  ShadcnCalendarDateOfBirthExample.init();
const [shadcnCalendarDateTimePickerExample] =
  ShadcnCalendarDateTimePickerExample.init();
const [shadcnCalendarRangeExample] = ShadcnCalendarRangeExample.init();
const [shadcnCalendarWeekNumbersExample] =
  ShadcnCalendarWeekNumbersExample.init();
const [shadcnCalendarMonthYearSelectorExample] =
  ShadcnCalendarMonthYearSelectorExample.init();
const [shadcnCalendarPresetsExample] = ShadcnCalendarPresetsExample.init();
const [shadcnCalendarRtlExample] = ShadcnCalendarRtlExample.init();
const [calendarBoundsExample] = CalendarBoundsExample.init();
const [checkboxBasicExample] = CheckboxBasicExample.init();
const [shadcnCheckboxBasicExample] = ShadcnCheckboxBasicExample.init();
const [shadcnCheckboxCheckedStateExample] =
  ShadcnCheckboxCheckedStateExample.init();
const [baseUiCheckboxBasicExample] = BaseUiCheckboxBasicExample.init();
const [baseUiCheckboxLabelingExample] = BaseUiCheckboxLabelingExample.init();
const [baseUiCheckboxNativeButtonExample] =
  BaseUiCheckboxNativeButtonExample.init();
const [baseUiCheckboxFormExample] = BaseUiCheckboxFormExample.init();
const [baseUiCheckboxGroupBasicExample] =
  BaseUiCheckboxGroupBasicExample.init();
const [baseUiCheckboxGrouplabelingExample] =
  BaseUiCheckboxGroupLabelingExample.init();
const [baseUiCheckboxGroupnativeButtonExample] =
  BaseUiCheckboxGroupNativeButtonExample.init();
const [baseUiCheckboxGroupformExample] = BaseUiCheckboxGroupFormExample.init();
const [baseUiCheckboxGroupparentExample] =
  BaseUiCheckboxGroupParentExample.init();
const [baseUiCheckboxGroupnestedParentExample] =
  BaseUiCheckboxGroupNestedParentExample.init();
const [checkboxGroupBasicExample] = CheckboxGroupBasicExample.init();
const [checkboxIndeterminateExample] = CheckboxIndeterminateExample.init();
const [comboboxBasicExample] = ComboboxBasicExample.init();
const [baseUiComboboxBasicExample] = BaseUiComboboxBasicExample.init();
const [shadcnComboboxBasicExample] = ShadcnComboboxBasicExample.init();
const [comboboxMultiExample] = ComboboxMultiExample.init();
const [datePickerBasicExample] = DatePickerBasicExample.init();
const [datePickerBoundsExample] = DatePickerBoundsExample.init();
const [baseUiDialogBasicExample] = BaseUiDialogBasicExample.init();
const [baseUiDialogCloseConfirmationExample] =
  BaseUiDialogCloseConfirmationExample.init();
const [baseUiDialogNestedExample] = BaseUiDialogNestedExample.init();
const [dialogBasicExample] = DialogBasicExample.init();
const [dialogAnimatedExample] = DialogAnimatedExample.init();
const [dialogDestructiveExample] = DialogDestructiveExample.init();
const [dialogFocusExample] = DialogFocusExample.init();
const [dialogScrollableExample] = DialogScrollableExample.init();
const [directionBasicExample] = DirectionBasicExample.init();
const [disclosureBasicExample] = DisclosureBasicExample.init();
const [disclosureDisabledExample] = DisclosureDisabledExample.init();
const [dragAndDropBasicExample] = DragAndDropBasicExample.init();
const [dragAndDropDisabledExample] = DragAndDropDisabledExample.init();
const [baseUiDrawerBasicExample] = BaseUiDrawerBasicExample.init();
const [baseUiDrawerpositionExample] = BaseUiDrawerPositionExample.init();
const [baseUiDrawernonModalExample] = BaseUiDrawerNonModalExample.init();
const [baseUiFieldBasicExample] = BaseUiFieldBasicExample.init();
const [baseUiFieldsetBasicExample] = BaseUiFieldsetBasicExample.init();
const [baseUiFormBasicExample] = BaseUiFormBasicExample.init();
const [baseUiFormSchemaValidationExample] =
  BaseUiFormSchemaValidationExample.init();
const [baseUiFormServerFunctionExample] =
  BaseUiFormServerFunctionExample.init();
const [fieldsetBasicExample] = FieldsetBasicExample.init();
const [fieldsetDisabledExample] = FieldsetDisabledExample.init();
const [fileDropBasicExample] = FileDropBasicExample.init();
const [fileDropDisabledExample] = FileDropDisabledExample.init();
const [baseUiInputBasicExample] = BaseUiInputBasicExample.init();
const [inputBasicExample] = InputBasicExample.init();
const [inputDisabledExample] = InputDisabledExample.init();
const [baseUiMenuBasicExample] = BaseUiMenuBasicExample.init();
const [baseUiMenuNestedExample] = BaseUiMenuNestedExample.init();
const [baseUiMenubarBasicExample] = BaseUiMenubarBasicExample.init();
const [baseUiMeterBasicExample] = BaseUiMeterBasicExample.init();
const [meterBasicExample] = MeterBasicExample.init();
const [scrollAreaBasicExample] = ScrollAreaBasicExample.init();
const [scrollAreaBothScrollbarsExample] =
  ScrollAreaBothScrollbarsExample.init();
const [scrollAreaGradientExample] = ScrollAreaGradientExample.init();
const [scrollAreaTabsExample] = ScrollAreaTabsExample.init();
const [baseUiToggleBasicExample] = BaseUiToggleBasicExample.init();
const [toggleBasicExample] = ToggleBasicExample.init();
const [baseUiToggleGroupBasicExample] = BaseUiToggleGroupBasicExample.init();
const [toggleGroupBasicExample] = ToggleGroupBasicExample.init();
const [radioBasicExample] = RadioBasicExample.init();
const [baseUiToolbarBasicExample] = BaseUiToolbarBasicExample.init();
const [toolbarBasicExample] = ToolbarBasicExample.init();
const [baseUiProgressBasicExample] = BaseUiProgressBasicExample.init();
const [progressBasicExample] = ProgressBasicExample.init();
const [listboxBasicExample] = ListboxBasicExample.init();
const [listboxAnimatedExample] = ListboxAnimatedExample.init();
const [menuBasicExample] = MenuBasicExample.init();
const [menuAnimatedExample] = MenuAnimatedExample.init();
const [baseUiPopoverBasicExample] = BaseUiPopoverBasicExample.init();
const [baseUiPopoverAnimatedExample] = BaseUiPopoverAnimatedExample.init();
const [baseUiPopoverDetachedTriggerExample] =
  BaseUiPopoverDetachedTriggerExample.init();
const [baseUiPopoverMultipleTriggersExample] =
  BaseUiPopoverMultipleTriggersExample.init();
const [baseUiPopoverOpenOnHoverExample] =
  BaseUiPopoverOpenOnHoverExample.init();
const [baseUiRadioBasicExample] = BaseUiRadioBasicExample.init();
const [baseUiRadioLabelingExample] = BaseUiRadioLabelingExample.init();
const [baseUiRadioNativeButtonExample] = BaseUiRadioNativeButtonExample.init();
const [baseUiRadioFormExample] = BaseUiRadioFormExample.init();
const [popoverBasicExample] = PopoverBasicExample.init();
const [popoverAnimatedExample] = PopoverAnimatedExample.init();
const [radioGroupBasicExample] = RadioGroupBasicExample.init();
const [shadcnRadioGroupBasicExample] = ShadcnRadioGroupBasicExample.init();
const [radioGroupHorizontalExample] = RadioGroupHorizontalExample.init();
const [baseUiSelectBasicExample] = BaseUiSelectBasicExample.init();
const [selectBasicExample] = SelectBasicExample.init();
const [shadcnSelectBasicExample] = ShadcnSelectBasicExample.init();
const [selectDisabledExample] = SelectDisabledExample.init();
const [baseUiSliderBasicExample] = BaseUiSliderBasicExample.init();
const [sliderBasicExample] = SliderBasicExample.init();
const [shadcnSliderBasicExample] = ShadcnSliderBasicExample.init();
const [sliderDisabledExample] = SliderDisabledExample.init();
const [baseUiSwitchBasicExample] = BaseUiSwitchBasicExample.init();
const [switchBasicExample] = SwitchBasicExample.init();
const [shadcnSwitchBasicExample] = ShadcnSwitchBasicExample.init();
const [switchDisabledExample] = SwitchDisabledExample.init();
const [baseUiTabsBasicExample] = BaseUiTabsBasicExample.init();
const [tabsBasicExample] = TabsBasicExample.init();
const [shadcnTabsBasicExample] = ShadcnTabsBasicExample.init();
const [tabsManualExample] = TabsManualExample.init();
const [shadcnInputBasicExample] = ShadcnInputBasicExample.init();
const [shadcnInputDemoExample] = ShadcnInputDemoExample.init();
const [shadcnInputFieldExample] = ShadcnInputFieldExample.init();
const [shadcnInputFieldGroupExample] = ShadcnInputFieldGroupExample.init();
const [shadcnInputInlineExample] = ShadcnInputInlineExample.init();
const [shadcnInputGridExample] = ShadcnInputGridExample.init();
const [shadcnInputRequiredExample] = ShadcnInputRequiredExample.init();
const [shadcnInputBadgeExample] = ShadcnInputBadgeExample.init();
const [shadcnInputInputGroupExample] = ShadcnInputInputGroupExample.init();
const [shadcnInputButtonGroupExample] = ShadcnInputButtonGroupExample.init();
const [shadcnInputFormExample] = ShadcnInputFormExample.init();
const [shadcnInputDisabledExample] = ShadcnInputDisabledExample.init();
const [shadcnInputInvalidExample] = ShadcnInputInvalidExample.init();
const [shadcnInputFileExample] = ShadcnInputFileExample.init();
const [shadcnInputRtlExample] = ShadcnInputRtlExample.init();
const [shadcnContextMenuBasicExample] = ShadcnContextMenuBasicExample.init();
const [shadcnDatePickerBasicExample] = ShadcnDatePickerBasicExample.init();
const [shadcnDialogBasicExample] = ShadcnDialogBasicExample.init();
const [shadcnDialogCustomCloseButtonExample] =
  ShadcnDialogCustomCloseButtonExample.init();
const [shadcnDialogNoCloseButtonExample] =
  ShadcnDialogNoCloseButtonExample.init();
const [shadcnDialogStickyFooterExample] =
  ShadcnDialogStickyFooterExample.init();
const [shadcnDialogScrollableContentExample] =
  ShadcnDialogScrollableContentExample.init();
const [shadcnDialogRtlExample] = ShadcnDialogRtlExample.init();
const [shadcnDrawerBasicExample] = ShadcnDrawerBasicExample.init();
const [shadcnDrawerScrollableContentExample] =
  ShadcnDrawerScrollableContentExample.init();
const [shadcnDrawerResponsiveDialogExample] =
  ShadcnDrawerResponsiveDialogExample.init();
const [shadcnDrawerRtlExample] = ShadcnDrawerRtlExample.init();
const [shadcnDrawerSidesExample] = ShadcnDrawerSidesExample.init();
const [shadcnFieldBasicExample] = ShadcnFieldBasicExample.init();
const [shadcnMenubarBasicExample] = ShadcnMenubarBasicExample.init();
const [shadcnPopoverBasicExample] = ShadcnPopoverBasicExample.init();
const [textareaBasicExample] = TextareaBasicExample.init();
const [shadcnTextareaBasicExample] = ShadcnTextareaBasicExample.init();
const [textareaDisabledExample] = TextareaDisabledExample.init();
const [shadcnToggleBasicExample] = ShadcnToggleBasicExample.init();
const [shadcnToggleGroupBasicExample] = ShadcnToggleGroupBasicExample.init();
const [shadcnToastBasicExample] = ShadcnToastBasicExample.init();
const [shadcnTooltipBasicExample] = ShadcnTooltipBasicExample.init();
const [baseUiToastBasicExample] = BaseUiToastBasicExample.init();
const [toastBasicExample] = ToastBasicExample.init();
const [toastVariantsExample] = ToastVariantsExample.init();
const [baseUiTooltipBasicExample] = BaseUiTooltipBasicExample.init();
const [tooltipBasicExample] = TooltipBasicExample.init();
const [tooltipNoDelayExample] = TooltipNoDelayExample.init();
const [virtualListBasicExample] = VirtualListBasicExample.init();
const [virtualListVariableExample] = VirtualListVariableExample.init();

const initialModel: Model = {
  route: HomeRoute(),
  uiModel: initialUiModel,
  newComponentAuthoring,
  themePlayground,
  accordionBasicExample,
  shadcnAccordionBasicExample,
  shadcnBaseAccordionBasicExample,
  shadcnAccordionBordersExample,
  shadcnAccordionCardExample,
  shadcnAccordionDisabledExample,
  shadcnAccordionMultipleExample,
  shadcnAccordionRtlExample,
  accordionMultipleExample,
  baseUiAccordionBasicExample,
  baseUiAccordionMultipleExample,
  alertBasicExample,
  alertActionExample,
  alertDestructiveExample,
  alertCustomColorsExample,
  alertRtlExample,
  aspectRatioBasicExample,
  aspectRatioSquareExample,
  aspectRatioPortraitExample,
  aspectRatioRtlExample,
  alertDialogBasicExample,
  baseUiAlertDialogBasicExample,
  baseUiAlertDialogCloseConfirmationExample,
  baseUiAlertDialogControlledMultipleTriggersExample,
  baseUiAlertDialogDetachedTriggersExample,
  baseUiAlertDialogMultipleTriggersExample,
  baseUiAlertDialogOpenFromMenuExample,
  shadcnAlertDialogBasicExample,
  shadcnAlertDialogSmallExample,
  shadcnAlertDialogMediaExample,
  shadcnAlertDialogSmallMediaExample,
  shadcnAlertDialogDestructiveExample,
  shadcnAlertDialogRtlExample,
  drawerBasicExample,
  baseUiContextMenuBasicExample,
  baseUiContextMenuNestedExample,
  contextMenuBasicExample,
  menubarBasicExample,
  baseUiNavigationMenuBasicExample,
  navigationMenuBasicExample,
  baseUiOtpFieldBasicExample,
  otpFieldBasicExample,
  baseUiPreviewCardBasicExample,
  previewCardBasicExample,
  autocompleteBasicExample,
  baseUiAutocompleteBasicExample,
  collapsibleBasicExample,
  baseUiCollapsibleBasicExample,
  shadcnCollapsibleBasicExample,
  fieldBasicExample,
  formBasicExample,
  baseUiNumberFieldBasicExample,
  numberFieldBasicExample,
  animationBasicExample,
  avatarBasicExample,
  baseUiAvatarBasicExample,
  shadcnAvatarBasicExample,
  shadcnAvatarDropdownExample,
  badgeBasicExample,
  badgeSpinnerExample,
  carouselBasicExample,
  carouselSizesExample,
  carouselSpacingExample,
  carouselOrientationExample,
  carouselApiExample,
  carouselAutoplayExample,
  carouselRtlExample,
  chartBasicExample,
  chartGridExample,
  chartAxisExample,
  chartTooltipExample,
  chartLegendExample,
  chartRtlExample,
  commandBasicExample,
  commandGroupsExample,
  commandRtlExample,
  commandScrollableExample,
  commandShortcutsExample,
  dropdownMenuBasicExample,
  dropdownMenuCheckboxesExample,
  dropdownMenuComplexExample,
  dropdownMenuDestructiveExample,
  dropdownMenuIconsExample,
  dropdownMenuRadioGroupExample,
  dropdownMenuRtlExample,
  dropdownMenuShortcutsExample,
  dropdownMenuSubmenuExample,
  hoverCardBasicExample,
  hoverCardSidesExample,
  hoverCardRtlExample,
  inputOtpBasicExample,
  inputOtpPatternExample,
  inputOtpSeparatorExample,
  inputOtpDisabledExample,
  inputOtpControlledExample,
  inputOtpInvalidExample,
  inputOtpFourDigitsExample,
  inputOtpAlphanumericExample,
  inputOtpFormExample,
  inputOtpRtlExample,
  nativeSelectBasicExample,
  nativeSelectDisabledExample,
  nativeSelectGroupsExample,
  nativeSelectInvalidExample,
  nativeSelectRtlExample,
  sheetBasicExample,
  sonnerBasicExample,
  dataTableBasicExample,
  dataTableRowActionsExample,
  dataTablePaginationExample,
  dataTableSortingExample,
  dataTableFilteringExample,
  dataTableVisibilityExample,
  dataTableRowSelectionExample,
  cardBasicExample,
  cardSizeExample,
  cardSpacingExample,
  cardImageExample,
  cardRtlExample,
  baseUiSeparatorBasicExample,
  separatorBasicExample,
  skeletonBasicExample,
  spinnerBasicExample,
  kbdBasicExample,
  kbdInputGroupExample,
  kbdRtlExample,
  typographyBasicExample,
  emptyAvatarExample,
  emptyAvatarGroupExample,
  emptyBackgroundExample,
  emptyBasicExample,
  emptyInputGroupExample,
  emptyOutlineExample,
  emptyRtlExample,
  breadcrumbBasicExample,
  breadcrumbSeparatorExample,
  breadcrumbDropdownExample,
  breadcrumbCollapsedExample,
  breadcrumbLinkExample,
  breadcrumbRtlExample,
  buttonBasicExample,
  baseUiButtonBasicExample,
  shadcnButtonBasicExample,
  buttonDisabledExample,
  buttonGroupBasicExample,
  buttonGroupOrientationExample,
  buttonGroupSizeExample,
  buttonGroupNestedExample,
  buttonGroupSeparatorExample,
  buttonGroupSplitExample,
  buttonGroupInputExample,
  buttonGroupInputGroupExample,
  buttonGroupSelectExample,
  buttonGroupPopoverExample,
  buttonGroupRtlExample,
  calendarBasicExample,
  shadcnCalendarBasicExample,
  shadcnCalendarBookedExample,
  shadcnCalendarCustomCellSizeExample,
  shadcnCalendarDateOfBirthExample,
  shadcnCalendarDateTimePickerExample,
  shadcnCalendarRangeExample,
  shadcnCalendarWeekNumbersExample,
  shadcnCalendarMonthYearSelectorExample,
  shadcnCalendarPresetsExample,
  shadcnCalendarRtlExample,
  calendarBoundsExample,
  checkboxBasicExample,
  shadcnCheckboxBasicExample,
  shadcnCheckboxCheckedStateExample,
  baseUiCheckboxBasicExample,
  baseUiCheckboxLabelingExample,
  baseUiCheckboxNativeButtonExample,
  baseUiCheckboxFormExample,
  baseUiCheckboxGroupBasicExample,
  baseUiCheckboxGrouplabelingExample,
  baseUiCheckboxGroupnativeButtonExample,
  baseUiCheckboxGroupformExample,
  baseUiCheckboxGroupparentExample,
  baseUiCheckboxGroupnestedParentExample,
  checkboxGroupBasicExample,
  checkboxIndeterminateExample,
  comboboxBasicExample,
  baseUiComboboxBasicExample,
  shadcnComboboxBasicExample,
  comboboxMultiExample,
  datePickerBasicExample,
  datePickerBoundsExample,
  baseUiDialogBasicExample,
  baseUiDialogCloseConfirmationExample,
  baseUiDialogNestedExample,
  dialogBasicExample,
  dialogAnimatedExample,
  dialogDestructiveExample,
  dialogFocusExample,
  dialogScrollableExample,
  baseUiDrawerBasicExample,
  baseUiDrawerpositionExample,
  baseUiDrawernonModalExample,
  baseUiFieldBasicExample,
  baseUiFieldsetBasicExample,
  baseUiFormBasicExample,
  baseUiFormSchemaValidationExample,
  baseUiFormServerFunctionExample,
  directionBasicExample,
  itemAvatarExample,
  itemBasicExample,
  itemGroupExample,
  itemHeaderExample,
  itemIconExample,
  itemImageExample,
  itemLinkExample,
  itemDropdownExample,
  itemRtlExample,
  itemSizeExample,
  itemVariantExample,
  labelBasicExample,
  labelFieldExample,
  labelRtlExample,
  paginationBasicExample,
  paginationSimpleExample,
  paginationIconsOnlyExample,
  paginationRtlExample,
  resizableBasicExample,
  resizableHandleExample,
  resizableRtlExample,
  resizableVerticalExample,
  sidebarBasicExample,
  sidebarCompositionExample,
  sidebarControlledExample,
  sidebarRtlExample,
  sidebarVariantsExample,
  tableBasicExample,
  disclosureBasicExample,
  disclosureDisabledExample,
  dragAndDropBasicExample,
  dragAndDropDisabledExample,
  fieldsetBasicExample,
  fieldsetDisabledExample,
  fileDropBasicExample,
  fileDropDisabledExample,
  baseUiInputBasicExample,
  inputBasicExample,
  inputDisabledExample,
  baseUiMenuBasicExample,
  baseUiMenuNestedExample,
  baseUiMenubarBasicExample,
  baseUiMeterBasicExample,
  meterBasicExample,
  scrollAreaBasicExample,
  scrollAreaBothScrollbarsExample,
  scrollAreaGradientExample,
  scrollAreaTabsExample,
  baseUiToggleBasicExample,
  toggleBasicExample,
  baseUiToggleGroupBasicExample,
  toggleGroupBasicExample,
  radioBasicExample,
  baseUiToolbarBasicExample,
  toolbarBasicExample,
  baseUiProgressBasicExample,
  progressBasicExample,
  listboxBasicExample,
  listboxAnimatedExample,
  menuBasicExample,
  menuAnimatedExample,
  baseUiPopoverBasicExample,
  baseUiPopoverAnimatedExample,
  baseUiPopoverDetachedTriggerExample,
  baseUiPopoverMultipleTriggersExample,
  baseUiPopoverOpenOnHoverExample,
  baseUiRadioBasicExample,
  baseUiRadioLabelingExample,
  baseUiRadioNativeButtonExample,
  baseUiRadioFormExample,
  popoverBasicExample,
  popoverAnimatedExample,
  radioGroupBasicExample,
  shadcnRadioGroupBasicExample,
  radioGroupHorizontalExample,
  baseUiSelectBasicExample,
  selectBasicExample,
  shadcnSelectBasicExample,
  selectDisabledExample,
  baseUiSliderBasicExample,
  sliderBasicExample,
  shadcnSliderBasicExample,
  sliderDisabledExample,
  baseUiSwitchBasicExample,
  switchBasicExample,
  shadcnSwitchBasicExample,
  switchDisabledExample,
  baseUiTabsBasicExample,
  tabsBasicExample,
  shadcnTabsBasicExample,
  tabsManualExample,
  shadcnInputBasicExample,
  shadcnInputDemoExample,
  shadcnInputFieldExample,
  shadcnInputFieldGroupExample,
  shadcnInputInlineExample,
  shadcnInputGridExample,
  shadcnInputRequiredExample,
  shadcnInputBadgeExample,
  shadcnInputInputGroupExample,
  shadcnInputButtonGroupExample,
  shadcnInputFormExample,
  shadcnInputDisabledExample,
  shadcnInputInvalidExample,
  shadcnInputFileExample,
  shadcnInputRtlExample,
  shadcnContextMenuBasicExample,
  shadcnDatePickerBasicExample,
  shadcnDialogBasicExample,
  shadcnDialogCustomCloseButtonExample,
  shadcnDialogNoCloseButtonExample,
  shadcnDialogStickyFooterExample,
  shadcnDialogScrollableContentExample,
  shadcnDialogRtlExample,
  shadcnDrawerBasicExample,
  shadcnDrawerScrollableContentExample,
  shadcnDrawerResponsiveDialogExample,
  shadcnDrawerRtlExample,
  shadcnDrawerSidesExample,
  shadcnFieldBasicExample,
  shadcnMenubarBasicExample,
  shadcnPopoverBasicExample,
  textareaBasicExample,
  shadcnTextareaBasicExample,
  textareaDisabledExample,
  shadcnToggleBasicExample,
  shadcnToggleGroupBasicExample,
  shadcnToastBasicExample,
  shadcnTooltipBasicExample,
  baseUiToastBasicExample,
  toastBasicExample,
  toastVariantsExample,
  baseUiTooltipBasicExample,
  tooltipBasicExample,
  tooltipNoDelayExample,
  virtualListBasicExample,
  virtualListVariableExample,
};

const urlOrThrow = (raw: string) =>
  Option.getOrThrowWith(
    fromString(raw),
    () => new Error(`Failed to parse url: ${raw}`)
  );

describe(update, () => {
  describe("routing", () => {
    test("the root URL resolves to Home", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(ChangedUrl({ url: urlOrThrow("http://localhost/") })),
        Story.model((model) => {
          expect(model.route._tag).toBe("Home");
        })
      );
    });

    test("/button resolves to Button", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({ url: urlOrThrow("http://localhost/button") })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("Button");
        })
      );
    });

    test("/docs/components/accordion resolves to BaseUiAccordionDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/accordion"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiAccordionDocs");
        })
      );
    });

    test("/docs/components/accordion/examples/basic resolves to AccordionBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/accordion/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("AccordionBasicExample");
        })
      );
    });

    test("/docs/components/accordion/examples/multiple resolves to AccordionMultipleExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/accordion/examples/multiple"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("AccordionMultipleExample");
        })
      );
    });

    test("/docs/components/base-ui-accordion/examples/multiple resolves to BaseUiAccordionMultipleExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-accordion/examples/multiple"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiAccordionMultipleExample");
        })
      );
    });

    test("/docs/components/base-ui-accordion/examples/basic resolves to BaseUiAccordionBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-accordion/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiAccordionBasicExample");
        })
      );
    });

    test("/examples/accordion-multiple resolves to AccordionMultipleExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/accordion-multiple"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("AccordionMultipleExample");
        })
      );
    });

    test("/examples/base-ui-accordion-multiple resolves to BaseUiAccordionMultipleExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/examples/base-ui-accordion-multiple"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiAccordionMultipleExample");
        })
      );
    });

    test("/examples/base-ui-accordion-basic resolves to BaseUiAccordionBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/examples/base-ui-accordion-basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiAccordionBasicExample");
        })
      );
    });

    test("/docs/components/collapsible resolves to CollapsibleDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/collapsible"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("CollapsibleDocs");
        })
      );
    });

    test("/docs/components/collapsible/examples/basic resolves to CollapsibleBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/collapsible/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("CollapsibleBasicExample");
        })
      );
    });

    test("/examples/collapsible-basic resolves to CollapsibleBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/collapsible-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("CollapsibleBasicExample");
        })
      );
    });

    test("/docs/components/base-ui-collapsible/examples/basic resolves to BaseUiCollapsibleBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-collapsible/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiCollapsibleBasicExample");
        })
      );
    });

    test("/examples/base-ui-collapsible-basic resolves to BaseUiCollapsibleBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/examples/base-ui-collapsible-basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiCollapsibleBasicExample");
        })
      );
    });

    test("/docs/components/alert-dialog resolves to BaseUiAlertDialogDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/alert-dialog"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiAlertDialogDocs");
        })
      );
    });

    test("/docs/components/alert resolves to AlertDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/alert"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("AlertDocs");
        })
      );
    });

    test("/docs/components/alert/examples/basic resolves to AlertBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/alert/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("AlertBasicExample");
        })
      );
    });

    test("/docs/components/alert/examples/action resolves to AlertActionExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/alert/examples/action"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("AlertActionExample");
        })
      );
    });

    test("/docs/components/alert/examples/destructive resolves to AlertDestructiveExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/alert/examples/destructive"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("AlertDestructiveExample");
        })
      );
    });

    test("/examples/alert-basic resolves to AlertBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/alert-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("AlertBasicExample");
        })
      );
    });

    test("/examples/alert-action resolves to AlertActionExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/alert-action"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("AlertActionExample");
        })
      );
    });

    test("/examples/alert-destructive resolves to AlertDestructiveExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/alert-destructive"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("AlertDestructiveExample");
        })
      );
    });

    test("/docs/components/aspect-ratio resolves to AspectRatioDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/aspect-ratio"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("AspectRatioDocs");
        })
      );
    });

    test("/docs/components/aspect-ratio/examples/basic resolves to AspectRatioBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/aspect-ratio/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("AspectRatioBasicExample");
        })
      );
    });

    test("/docs/components/aspect-ratio/examples/square resolves to AspectRatioSquareExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/aspect-ratio/examples/square"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("AspectRatioSquareExample");
        })
      );
    });

    test("/docs/components/aspect-ratio/examples/portrait resolves to AspectRatioPortraitExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/aspect-ratio/examples/portrait"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("AspectRatioPortraitExample");
        })
      );
    });

    test("/docs/components/aspect-ratio/examples/rtl resolves to AspectRatioRtlExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/aspect-ratio/examples/rtl"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("AspectRatioRtlExample");
        })
      );
    });

    test("/examples/aspect-ratio-basic resolves to AspectRatioBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/aspect-ratio-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("AspectRatioBasicExample");
        })
      );
    });

    test("/examples/aspect-ratio-square resolves to AspectRatioSquareExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/aspect-ratio-square"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("AspectRatioSquareExample");
        })
      );
    });

    test("/examples/aspect-ratio-portrait resolves to AspectRatioPortraitExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/aspect-ratio-portrait"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("AspectRatioPortraitExample");
        })
      );
    });

    test("/examples/aspect-ratio-rtl resolves to AspectRatioRtlExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/aspect-ratio-rtl"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("AspectRatioRtlExample");
        })
      );
    });

    test("/docs/components/breadcrumb resolves to BreadcrumbDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/breadcrumb"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BreadcrumbDocs");
        })
      );
    });

    test("/docs/components/breadcrumb/examples/basic resolves to BreadcrumbBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/breadcrumb/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BreadcrumbBasicExample");
        })
      );
    });

    test("/docs/components/breadcrumb/examples/dropdown resolves to BreadcrumbDropdownExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/breadcrumb/examples/dropdown"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BreadcrumbDropdownExample");
        })
      );
    });

    test("/examples/breadcrumb-basic resolves to BreadcrumbBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/breadcrumb-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BreadcrumbBasicExample");
        })
      );
    });

    test("/docs/components/button-group resolves to ButtonGroupDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/button-group"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ButtonGroupDocs");
        })
      );
    });

    test("/docs/components/button-group/examples/basic resolves to ButtonGroupBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/button-group/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ButtonGroupBasicExample");
        })
      );
    });

    test("/docs/components/button-group/examples/popover resolves to ButtonGroupPopoverExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/button-group/examples/popover"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ButtonGroupPopoverExample");
        })
      );
    });

    test("/examples/button-group-basic resolves to ButtonGroupBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/button-group-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ButtonGroupBasicExample");
        })
      );
    });

    test("/docs/components/carousel resolves to CarouselDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/carousel"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("CarouselDocs");
        })
      );
    });

    test("/docs/components/carousel/examples/basic resolves to CarouselBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/carousel/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("CarouselBasicExample");
        })
      );
    });

    test("/docs/components/carousel/examples/api resolves to CarouselApiExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/carousel/examples/api"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("CarouselApiExample");
        })
      );
    });

    test("/docs/components/carousel/examples/autoplay resolves to CarouselAutoplayExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/carousel/examples/autoplay"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("CarouselAutoplayExample");
        })
      );
    });

    test("/examples/carousel-basic resolves to CarouselBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/carousel-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("CarouselBasicExample");
        })
      );
    });

    test("/docs/components/direction resolves to DirectionDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/direction"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DirectionDocs");
        })
      );
    });

    test("/docs/components/direction/examples/basic resolves to DirectionBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/direction/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DirectionBasicExample");
        })
      );
    });

    test("/examples/direction-basic resolves to DirectionBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/direction-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DirectionBasicExample");
        })
      );
    });

    test("/docs/components/item resolves to ItemDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/item"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ItemDocs");
        })
      );
    });

    test("/docs/components/item/examples/basic resolves to ItemBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/item/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ItemBasicExample");
        })
      );
    });

    test("/examples/item-basic resolves to ItemBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/item-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ItemBasicExample");
        })
      );
    });

    test("/docs/components/item/examples/dropdown resolves to ItemDropdownExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/item/examples/dropdown"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ItemDropdownExample");
        })
      );
    });

    test("/examples/item-dropdown resolves to ItemDropdownExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/item-dropdown"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ItemDropdownExample");
        })
      );
    });

    test("/docs/components/label resolves to LabelDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/label"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("LabelDocs");
        })
      );
    });

    test("/docs/components/label/examples/basic resolves to LabelBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/label/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("LabelBasicExample");
        })
      );
    });

    test("/examples/label-basic resolves to LabelBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/label-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("LabelBasicExample");
        })
      );
    });

    test("/docs/components/pagination resolves to PaginationDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/pagination"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("PaginationDocs");
        })
      );
    });

    test("/docs/components/pagination/examples/basic resolves to PaginationBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/pagination/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("PaginationBasicExample");
        })
      );
    });

    test("/examples/pagination-basic resolves to PaginationBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/pagination-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("PaginationBasicExample");
        })
      );
    });

    test("/docs/components/resizable resolves to ResizableDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/resizable"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ResizableDocs");
        })
      );
    });

    test("/docs/components/resizable/examples/basic resolves to ResizableBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/resizable/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ResizableBasicExample");
        })
      );
    });

    test("/examples/resizable-basic resolves to ResizableBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/resizable-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ResizableBasicExample");
        })
      );
    });

    test("/docs/components/resizable/examples/handle resolves to ResizableHandleExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/resizable/examples/handle"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ResizableHandleExample");
        })
      );
    });

    test("/examples/resizable-handle resolves to ResizableHandleExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/resizable-handle"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ResizableHandleExample");
        })
      );
    });

    test("/docs/components/resizable/examples/rtl resolves to ResizableRtlExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/resizable/examples/rtl"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ResizableRtlExample");
        })
      );
    });

    test("/examples/resizable-rtl resolves to ResizableRtlExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/resizable-rtl"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ResizableRtlExample");
        })
      );
    });

    test("/docs/components/resizable/examples/vertical resolves to ResizableVerticalExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/resizable/examples/vertical"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ResizableVerticalExample");
        })
      );
    });

    test("/examples/resizable-vertical resolves to ResizableVerticalExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/resizable-vertical"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ResizableVerticalExample");
        })
      );
    });

    test("/docs/components/sidebar resolves to SidebarDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/sidebar"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("SidebarDocs");
        })
      );
    });

    test("/docs/components/sidebar/examples/basic resolves to SidebarBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/sidebar/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("SidebarBasicExample");
        })
      );
    });

    test("/examples/sidebar-basic resolves to SidebarBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/sidebar-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("SidebarBasicExample");
        })
      );
    });

    test("/docs/components/sidebar/examples/composition resolves to SidebarCompositionExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/sidebar/examples/composition"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("SidebarCompositionExample");
        })
      );
    });

    test("/examples/sidebar-composition resolves to SidebarCompositionExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/sidebar-composition"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("SidebarCompositionExample");
        })
      );
    });

    test("/docs/components/sidebar/examples/controlled resolves to SidebarControlledExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/sidebar/examples/controlled"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("SidebarControlledExample");
        })
      );
    });

    test("/examples/sidebar-controlled resolves to SidebarControlledExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/sidebar-controlled"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("SidebarControlledExample");
        })
      );
    });

    test("/docs/components/sidebar/examples/rtl resolves to SidebarRtlExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/sidebar/examples/rtl"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("SidebarRtlExample");
        })
      );
    });

    test("/examples/sidebar-rtl resolves to SidebarRtlExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/sidebar-rtl"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("SidebarRtlExample");
        })
      );
    });

    test("/docs/components/sidebar/examples/variants resolves to SidebarVariantsExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/sidebar/examples/variants"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("SidebarVariantsExample");
        })
      );
    });

    test("/examples/sidebar-variants resolves to SidebarVariantsExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/sidebar-variants"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("SidebarVariantsExample");
        })
      );
    });

    test("/docs/components/spinner/examples/basic resolves to SpinnerBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/spinner/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("SpinnerBasicExample");
        })
      );
    });

    test("/examples/spinner-basic resolves to SpinnerBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/spinner-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("SpinnerBasicExample");
        })
      );
    });

    test("/docs/components/table resolves to TableDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/table"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("TableDocs");
        })
      );
    });

    test("/docs/components/table/examples/basic resolves to TableBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/table/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("TableBasicExample");
        })
      );
    });

    test("/examples/table-basic resolves to TableBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/table-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("TableBasicExample");
        })
      );
    });

    test("/docs/components/command resolves to CommandDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/command"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("CommandDocs");
        })
      );
    });

    test("/docs/components/command/examples/basic resolves to CommandBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/command/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("CommandBasicExample");
        })
      );
    });

    test("/examples/command-basic resolves to CommandBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/command-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("CommandBasicExample");
        })
      );
    });

    test("/docs/components/dropdown-menu resolves to DropdownMenuDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/dropdown-menu"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DropdownMenuDocs");
        })
      );
    });

    test("/docs/components/dropdown-menu/examples/basic resolves to DropdownMenuBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/dropdown-menu/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DropdownMenuBasicExample");
        })
      );
    });

    test("/examples/dropdown-menu-basic resolves to DropdownMenuBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/dropdown-menu-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DropdownMenuBasicExample");
        })
      );
    });

    const dropdownMenuExampleRoutes = [
      {
        docsUrl:
          "http://localhost/docs/components/dropdown-menu/examples/checkboxes",
        standaloneUrl: "http://localhost/examples/dropdown-menu-checkboxes",
        routeTag: "DropdownMenuCheckboxesExample",
      },
      {
        docsUrl: "http://localhost/docs/components/dropdown-menu/examples/complex",
        standaloneUrl: "http://localhost/examples/dropdown-menu-complex",
        routeTag: "DropdownMenuComplexExample",
      },
      {
        docsUrl:
          "http://localhost/docs/components/dropdown-menu/examples/destructive",
        standaloneUrl: "http://localhost/examples/dropdown-menu-destructive",
        routeTag: "DropdownMenuDestructiveExample",
      },
      {
        docsUrl: "http://localhost/docs/components/dropdown-menu/examples/icons",
        standaloneUrl: "http://localhost/examples/dropdown-menu-icons",
        routeTag: "DropdownMenuIconsExample",
      },
      {
        docsUrl:
          "http://localhost/docs/components/dropdown-menu/examples/radio-group",
        standaloneUrl: "http://localhost/examples/dropdown-menu-radio-group",
        routeTag: "DropdownMenuRadioGroupExample",
      },
      {
        docsUrl: "http://localhost/docs/components/dropdown-menu/examples/rtl",
        standaloneUrl: "http://localhost/examples/dropdown-menu-rtl",
        routeTag: "DropdownMenuRtlExample",
      },
      {
        docsUrl:
          "http://localhost/docs/components/dropdown-menu/examples/shortcuts",
        standaloneUrl: "http://localhost/examples/dropdown-menu-shortcuts",
        routeTag: "DropdownMenuShortcutsExample",
      },
      {
        docsUrl: "http://localhost/docs/components/dropdown-menu/examples/submenu",
        standaloneUrl: "http://localhost/examples/dropdown-menu-submenu",
        routeTag: "DropdownMenuSubmenuExample",
      },
    ];

    dropdownMenuExampleRoutes.forEach(({ docsUrl, standaloneUrl, routeTag }) => {
      test(`${docsUrl} resolves to ${routeTag}`, () => {
        Story.story(
          update,
          Story.with(initialModel),
          Story.message(ChangedUrl({ url: urlOrThrow(docsUrl) })),
          Story.model((model) => {
            expect(model.route._tag).toBe(routeTag);
          })
        );
      });

      test(`${standaloneUrl} resolves to ${routeTag}`, () => {
        Story.story(
          update,
          Story.with(initialModel),
          Story.message(ChangedUrl({ url: urlOrThrow(standaloneUrl) })),
          Story.model((model) => {
            expect(model.route._tag).toBe(routeTag);
          })
        );
      });
    });

    test("/docs/components/hover-card resolves to HoverCardDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/hover-card"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("HoverCardDocs");
        })
      );
    });

    test("/docs/components/hover-card/examples/basic resolves to HoverCardBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/hover-card/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("HoverCardBasicExample");
        })
      );
    });

    test("/examples/hover-card-basic resolves to HoverCardBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/hover-card-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("HoverCardBasicExample");
        })
      );
    });

    test("/docs/components/input-otp resolves to InputOtpDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/input-otp"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("InputOtpDocs");
        })
      );
    });

    test("/docs/components/input-otp/examples/basic resolves to InputOtpBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/input-otp/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("InputOtpBasicExample");
        })
      );
    });

    test("/examples/input-otp-basic resolves to InputOtpBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/input-otp-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("InputOtpBasicExample");
        })
      );
    });

    test("/docs/components/native-select resolves to NativeSelectDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/native-select"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("NativeSelectDocs");
        })
      );
    });

    test("/docs/components/native-select/examples/basic resolves to NativeSelectBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/native-select/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("NativeSelectBasicExample");
        })
      );
    });

    test("/examples/native-select-basic resolves to NativeSelectBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/native-select-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("NativeSelectBasicExample");
        })
      );
    });

    test("/docs/components/native-select/examples/groups resolves to NativeSelectGroupsExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/native-select/examples/groups"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("NativeSelectGroupsExample");
        })
      );
    });

    test("/examples/native-select-groups resolves to NativeSelectGroupsExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/native-select-groups"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("NativeSelectGroupsExample");
        })
      );
    });

    test("/docs/components/native-select/examples/rtl resolves to NativeSelectRtlExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/native-select/examples/rtl"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("NativeSelectRtlExample");
        })
      );
    });

    test("/examples/native-select-rtl resolves to NativeSelectRtlExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/native-select-rtl"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("NativeSelectRtlExample");
        })
      );
    });

    test("/docs/components/sheet resolves to SheetDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/sheet"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("SheetDocs");
        })
      );
    });

    test("/docs/components/sheet/examples/basic resolves to SheetBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/sheet/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("SheetBasicExample");
        })
      );
    });

    test("/examples/sheet-basic resolves to SheetBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/sheet-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("SheetBasicExample");
        })
      );
    });

    test("/docs/components/sonner resolves to SonnerDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/sonner"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("SonnerDocs");
        })
      );
    });

    test("/docs/components/sonner/examples/basic resolves to SonnerBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/sonner/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("SonnerBasicExample");
        })
      );
    });

    test("/examples/sonner-basic resolves to SonnerBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/sonner-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("SonnerBasicExample");
        })
      );
    });

    test("/docs/components/data-table resolves to DataTableDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/data-table"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DataTableDocs");
        })
      );
    });

    test("/docs/components/data-table/examples/basic resolves to DataTableBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/data-table/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DataTableBasicExample");
        })
      );
    });

    test("/examples/data-table-basic resolves to DataTableBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/data-table-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DataTableBasicExample");
        })
      );
    });

    test("/docs/components/chart resolves to ChartDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/chart"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ChartDocs");
        })
      );
    });

    test("/docs/components/chart/examples/basic resolves to ChartBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/chart/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ChartBasicExample");
        })
      );
    });

    test("/examples/chart-basic resolves to ChartBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/chart-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ChartBasicExample");
        })
      );
    });

    test("/docs/components/alert-dialog/examples/basic resolves to AlertDialogBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/alert-dialog/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("AlertDialogBasicExample");
        })
      );
    });

    test("/examples/alert-dialog-basic resolves to AlertDialogBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/alert-dialog-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("AlertDialogBasicExample");
        })
      );
    });

    test("/docs/components/base-ui-alert-dialog/examples/close-confirmation resolves to BaseUiAlertDialogCloseConfirmationExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-alert-dialog/examples/close-confirmation"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe(
            "BaseUiAlertDialogCloseConfirmationExample"
          );
        })
      );
    });

    test("/docs/components/base-ui-alert-dialog/examples/basic resolves to BaseUiAlertDialogBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-alert-dialog/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiAlertDialogBasicExample");
        })
      );
    });

    test("/docs/components/base-ui-alert-dialog/examples/open-from-menu resolves to BaseUiAlertDialogOpenFromMenuExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-alert-dialog/examples/open-from-menu"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiAlertDialogOpenFromMenuExample");
        })
      );
    });

    test("/docs/components/base-ui-alert-dialog/examples/detached-triggers resolves to BaseUiAlertDialogDetachedTriggersExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-alert-dialog/examples/detached-triggers"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe(
            "BaseUiAlertDialogDetachedTriggersExample"
          );
        })
      );
    });

    test("/docs/components/base-ui-alert-dialog/examples/controlled-multiple-triggers resolves to BaseUiAlertDialogControlledMultipleTriggersExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-alert-dialog/examples/controlled-multiple-triggers"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe(
            "BaseUiAlertDialogControlledMultipleTriggersExample"
          );
        })
      );
    });

    test("/docs/components/base-ui-alert-dialog/examples/multiple-triggers resolves to BaseUiAlertDialogMultipleTriggersExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-alert-dialog/examples/multiple-triggers"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe(
            "BaseUiAlertDialogMultipleTriggersExample"
          );
        })
      );
    });

    test("/examples/base-ui-alert-dialog-close-confirmation resolves to BaseUiAlertDialogCloseConfirmationExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/examples/base-ui-alert-dialog-close-confirmation"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe(
            "BaseUiAlertDialogCloseConfirmationExample"
          );
        })
      );
    });

    test("/examples/base-ui-alert-dialog-open-from-menu resolves to BaseUiAlertDialogOpenFromMenuExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/examples/base-ui-alert-dialog-open-from-menu"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiAlertDialogOpenFromMenuExample");
        })
      );
    });

    test("/examples/base-ui-alert-dialog-detached-triggers resolves to BaseUiAlertDialogDetachedTriggersExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/examples/base-ui-alert-dialog-detached-triggers"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe(
            "BaseUiAlertDialogDetachedTriggersExample"
          );
        })
      );
    });

    test("/examples/base-ui-alert-dialog-controlled-multiple-triggers resolves to BaseUiAlertDialogControlledMultipleTriggersExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/examples/base-ui-alert-dialog-controlled-multiple-triggers"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe(
            "BaseUiAlertDialogControlledMultipleTriggersExample"
          );
        })
      );
    });

    test("/examples/base-ui-alert-dialog-multiple-triggers resolves to BaseUiAlertDialogMultipleTriggersExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/examples/base-ui-alert-dialog-multiple-triggers"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe(
            "BaseUiAlertDialogMultipleTriggersExample"
          );
        })
      );
    });

    test("/examples/base-ui-alert-dialog-basic resolves to BaseUiAlertDialogBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/examples/base-ui-alert-dialog-basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiAlertDialogBasicExample");
        })
      );
    });

    test("/docs/components/drawer resolves to BaseUiDrawerDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/drawer"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiDrawerDocs");
        })
      );
    });

    test("/docs/components/drawer/examples/basic resolves to DrawerBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/drawer/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DrawerBasicExample");
        })
      );
    });

    test("/docs/components/shadcn-drawer/examples/basic resolves to ShadcnDrawerBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/shadcn-drawer/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ShadcnDrawerBasicExample");
        })
      );
    });

    test("/examples/drawer-basic resolves to DrawerBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/drawer-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DrawerBasicExample");
        })
      );
    });

    test("/docs/components/context-menu resolves to BaseUiContextMenuDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/context-menu"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiContextMenuDocs");
        })
      );
    });

    test("/docs/components/context-menu/examples/basic resolves to ContextMenuBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/context-menu/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ContextMenuBasicExample");
        })
      );
    });

    test("/docs/components/base-ui-context-menu/examples/basic resolves to BaseUiContextMenuBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-context-menu/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiContextMenuBasicExample");
        })
      );
    });

    test("/examples/context-menu-basic resolves to ContextMenuBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/context-menu-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ContextMenuBasicExample");
        })
      );
    });

    test("/docs/components/base-ui-context-menu/examples/nested resolves to BaseUiContextMenuNestedExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-context-menu/examples/nested"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiContextMenuNestedExample");
        })
      );
    });

    test("/examples/base-ui-context-menu-nested resolves to BaseUiContextMenuNestedExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/examples/base-ui-context-menu-nested"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiContextMenuNestedExample");
        })
      );
    });

    test("/examples/base-ui-context-menu-basic resolves to BaseUiContextMenuBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/examples/base-ui-context-menu-basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiContextMenuBasicExample");
        })
      );
    });

    test("/docs/components/menubar resolves to BaseUiMenubarDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/menubar"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiMenubarDocs");
        })
      );
    });

    test("/docs/components/menubar/examples/basic resolves to MenubarBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/menubar/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("MenubarBasicExample");
        })
      );
    });

    test("/examples/menubar-basic resolves to MenubarBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/menubar-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("MenubarBasicExample");
        })
      );
    });

    test("/docs/components/navigation-menu resolves to BaseUiNavigationMenuDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/navigation-menu"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiNavigationMenuDocs");
        })
      );
    });

    test("/docs/components/navigation-menu/examples/basic resolves to NavigationMenuBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/navigation-menu/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("NavigationMenuBasicExample");
        })
      );
    });

    test("/examples/navigation-menu-basic resolves to NavigationMenuBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/navigation-menu-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("NavigationMenuBasicExample");
        })
      );
    });

    test("/docs/components/otp-field resolves to BaseUiOtpFieldDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/otp-field"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiOtpFieldDocs");
        })
      );
    });

    test("/docs/components/otp-field/examples/basic resolves to OtpFieldBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/otp-field/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("OtpFieldBasicExample");
        })
      );
    });

    test("/examples/otp-field-basic resolves to OtpFieldBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/otp-field-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("OtpFieldBasicExample");
        })
      );
    });

    test("/docs/components/preview-card resolves to BaseUiPreviewCardDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/preview-card"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiPreviewCardDocs");
        })
      );
    });

    test("/docs/components/preview-card/examples/basic resolves to PreviewCardBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/preview-card/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("PreviewCardBasicExample");
        })
      );
    });

    test("/examples/preview-card-basic resolves to PreviewCardBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/preview-card-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("PreviewCardBasicExample");
        })
      );
    });

    test("/docs/components/base-ui-drawer/examples/position resolves to BaseUiDrawerPositionExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-drawer/examples/position"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiDrawerPositionExample");
        })
      );
    });

    test("/examples/base-ui-drawer-position resolves to BaseUiDrawerPositionExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/examples/base-ui-drawer-position"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiDrawerPositionExample");
        })
      );
    });

    test("/docs/components/base-ui-drawer/examples/non-modal resolves to BaseUiDrawerNonModalExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-drawer/examples/non-modal"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiDrawerNonModalExample");
        })
      );
    });

    test("/examples/base-ui-drawer-non-modal resolves to BaseUiDrawerNonModalExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/examples/base-ui-drawer-non-modal"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiDrawerNonModalExample");
        })
      );
    });

    test("/docs/components/field resolves to BaseUiFieldDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/field"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiFieldDocs");
        })
      );
    });

    test("/docs/components/field/examples/basic resolves to FieldBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/field/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("FieldBasicExample");
        })
      );
    });

    test("/examples/field-basic resolves to FieldBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/field-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("FieldBasicExample");
        })
      );
    });

    test("/docs/components/number-field resolves to BaseUiNumberFieldDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/number-field"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiNumberFieldDocs");
        })
      );
    });

    test("/docs/components/number-field/examples/basic resolves to NumberFieldBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/number-field/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("NumberFieldBasicExample");
        })
      );
    });

    test("/examples/number-field-basic resolves to NumberFieldBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/number-field-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("NumberFieldBasicExample");
        })
      );
    });

    test("/docs/components/form resolves to BaseUiFormDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/form"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiFormDocs");
        })
      );
    });

    test("/docs/components/base-ui-form/examples/server-function resolves to BaseUiFormServerFunctionExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-form/examples/server-function"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiFormServerFunctionExample");
        })
      );
    });

    test("/docs/components/base-ui-form/examples/schema-validation resolves to BaseUiFormSchemaValidationExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-form/examples/schema-validation"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiFormSchemaValidationExample");
        })
      );
    });

    test("/examples/base-ui-form-schema-validation resolves to BaseUiFormSchemaValidationExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/examples/base-ui-form-schema-validation"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiFormSchemaValidationExample");
        })
      );
    });

    test("/examples/base-ui-form-server-function resolves to BaseUiFormServerFunctionExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/examples/base-ui-form-server-function"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiFormServerFunctionExample");
        })
      );
    });

    test("/docs/components/form/examples/basic resolves to FormBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/form/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("FormBasicExample");
        })
      );
    });

    test("/examples/form-basic resolves to FormBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/form-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("FormBasicExample");
        })
      );
    });

    test("/docs/components/autocomplete resolves to BaseUiAutocompleteDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/autocomplete"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiAutocompleteDocs");
        })
      );
    });

    test("/docs/components/autocomplete/examples/basic resolves to AutocompleteBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/autocomplete/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("AutocompleteBasicExample");
        })
      );
    });

    test("/examples/autocomplete-basic resolves to AutocompleteBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/autocomplete-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("AutocompleteBasicExample");
        })
      );
    });

    test("/docs/components/base-ui-autocomplete/examples/basic resolves to BaseUiAutocompleteBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-autocomplete/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiAutocompleteBasicExample");
        })
      );
    });

    test("/examples/base-ui-autocomplete-basic resolves to BaseUiAutocompleteBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/examples/base-ui-autocomplete-basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiAutocompleteBasicExample");
        })
      );
    });

    test("/docs/components/base-ui-avatar/examples/basic resolves to BaseUiAvatarBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-avatar/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiAvatarBasicExample");
        })
      );
    });

    test("/examples/base-ui-avatar-basic resolves to BaseUiAvatarBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/base-ui-avatar-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiAvatarBasicExample");
        })
      );
    });

    test("/docs/components/animation resolves to AnimationDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/animation"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("AnimationDocs");
        })
      );
    });

    test("/docs/components/animation/examples/basic resolves to AnimationBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/animation/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("AnimationBasicExample");
        })
      );
    });

    test("/examples/animation-basic resolves to AnimationBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/animation-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("AnimationBasicExample");
        })
      );
    });

    test("/docs/components/virtual-list resolves to VirtualListDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/virtual-list"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("VirtualListDocs");
        })
      );
    });

    test("/docs/components/virtual-list/examples/basic resolves to VirtualListBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/virtual-list/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("VirtualListBasicExample");
        })
      );
    });

    test("/docs/components/virtual-list/examples/variable resolves to VirtualListVariableExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/virtual-list/examples/variable"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("VirtualListVariableExample");
        })
      );
    });

    test("/examples/virtual-list-basic resolves to VirtualListBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/virtual-list-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("VirtualListBasicExample");
        })
      );
    });

    test("/examples/virtual-list-variable resolves to VirtualListVariableExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/virtual-list-variable"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("VirtualListVariableExample");
        })
      );
    });

    test("/docs/components/button resolves to BaseUiButtonDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/button"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiButtonDocs");
        })
      );
    });

    test("/docs/components/button/examples/basic resolves to ButtonBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/button/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ButtonBasicExample");
        })
      );
    });

    test("/docs/components/base-ui-button/examples/basic resolves to BaseUiButtonBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-button/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiButtonBasicExample");
        })
      );
    });

    test("/docs/components/button/examples/disabled resolves to ButtonDisabledExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/button/examples/disabled"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ButtonDisabledExample");
        })
      );
    });

    test("/calendar resolves to Calendar", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({ url: urlOrThrow("http://localhost/calendar") })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("Calendar");
        })
      );
    });

    test("/docs/components/calendar resolves to CalendarDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/calendar"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("CalendarDocs");
        })
      );
    });

    test("/docs/components/calendar/examples/basic resolves to CalendarBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/calendar/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("CalendarBasicExample");
        })
      );
    });

    test("/docs/components/calendar/examples/bounds resolves to CalendarBoundsExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/calendar/examples/bounds"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("CalendarBoundsExample");
        })
      );
    });

    test("/date-picker resolves to DatePicker", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({ url: urlOrThrow("http://localhost/date-picker") })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DatePicker");
        })
      );
    });

    test("/docs/components/date-picker resolves to DatePickerDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/date-picker"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DatePickerDocs");
        })
      );
    });

    test("/docs/components/date-picker/examples/basic resolves to DatePickerBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/date-picker/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DatePickerBasicExample");
        })
      );
    });

    test("/docs/components/date-picker/examples/bounds resolves to DatePickerBoundsExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/date-picker/examples/bounds"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DatePickerBoundsExample");
        })
      );
    });

    test("/docs/components/combobox resolves to BaseUiComboboxDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/combobox"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiComboboxDocs");
        })
      );
    });

    test("/docs/components/combobox/examples/basic resolves to ComboboxBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/combobox/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ComboboxBasicExample");
        })
      );
    });

    test("/docs/components/base-ui-combobox/examples/basic resolves to BaseUiComboboxBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-combobox/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiComboboxBasicExample");
        })
      );
    });

    test("/examples/base-ui-combobox-basic resolves to BaseUiComboboxBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/base-ui-combobox-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiComboboxBasicExample");
        })
      );
    });

    test("/docs/components/combobox/examples/multi resolves to ComboboxMultiExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/combobox/examples/multi"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ComboboxMultiExample");
        })
      );
    });

    test("/docs/components/dialog resolves to BaseUiDialogDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/dialog"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiDialogDocs");
        })
      );
    });

    test("/docs/components/dialog/examples/basic resolves to DialogBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/dialog/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DialogBasicExample");
        })
      );
    });

    test("/docs/components/base-ui-dialog/examples/basic resolves to BaseUiDialogBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-dialog/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiDialogBasicExample");
        })
      );
    });

    test("/docs/components/shadcn-dialog/examples/basic resolves to ShadcnDialogBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/shadcn-dialog/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ShadcnDialogBasicExample");
        })
      );
    });

    test("/docs/components/shadcn-dialog/examples/custom-close-button resolves to ShadcnDialogCustomCloseButtonExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/shadcn-dialog/examples/custom-close-button"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ShadcnDialogCustomCloseButtonExample");
        })
      );
    });

    test("/docs/components/shadcn-dialog/examples/no-close-button resolves to ShadcnDialogNoCloseButtonExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/shadcn-dialog/examples/no-close-button"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ShadcnDialogNoCloseButtonExample");
        })
      );
    });

    test("/docs/components/shadcn-dialog/examples/sticky-footer resolves to ShadcnDialogStickyFooterExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/shadcn-dialog/examples/sticky-footer"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ShadcnDialogStickyFooterExample");
        })
      );
    });

    test("/docs/components/shadcn-dialog/examples/scrollable-content resolves to ShadcnDialogScrollableContentExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/shadcn-dialog/examples/scrollable-content"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ShadcnDialogScrollableContentExample");
        })
      );
    });

    test("/docs/components/shadcn-dialog/examples/rtl resolves to ShadcnDialogRtlExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/shadcn-dialog/examples/rtl"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ShadcnDialogRtlExample");
        })
      );
    });

    test("/docs/components/base-ui-dialog/examples/nested resolves to BaseUiDialogNestedExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-dialog/examples/nested"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiDialogNestedExample");
        })
      );
    });

    test("/docs/components/base-ui-dialog/examples/close-confirmation resolves to BaseUiDialogCloseConfirmationExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-dialog/examples/close-confirmation"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiDialogCloseConfirmationExample");
        })
      );
    });

    test("/docs/components/dialog/examples/animated resolves to DialogAnimatedExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/dialog/examples/animated"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DialogAnimatedExample");
        })
      );
    });

    test("/docs/components/dialog/examples/destructive resolves to DialogDestructiveExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/dialog/examples/destructive"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DialogDestructiveExample");
        })
      );
    });

    test("/docs/components/dialog/examples/focus resolves to DialogFocusExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/dialog/examples/focus"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DialogFocusExample");
        })
      );
    });

    test("/docs/components/dialog/examples/scrollable resolves to DialogScrollableExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/dialog/examples/scrollable"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DialogScrollableExample");
        })
      );
    });

    test("/docs/components/disclosure resolves to DisclosureDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/disclosure"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DisclosureDocs");
        })
      );
    });

    test("/docs/components/disclosure/examples/basic resolves to DisclosureBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/disclosure/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DisclosureBasicExample");
        })
      );
    });

    test("/docs/components/disclosure/examples/disabled resolves to DisclosureDisabledExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/disclosure/examples/disabled"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DisclosureDisabledExample");
        })
      );
    });

    test("/docs/components/drag-and-drop resolves to DragAndDropDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/drag-and-drop"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DragAndDropDocs");
        })
      );
    });

    test("/docs/components/drag-and-drop/examples/basic resolves to DragAndDropBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/drag-and-drop/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DragAndDropBasicExample");
        })
      );
    });

    test("/docs/components/drag-and-drop/examples/disabled resolves to DragAndDropDisabledExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/drag-and-drop/examples/disabled"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DragAndDropDisabledExample");
        })
      );
    });

    test("/examples/drag-and-drop-basic resolves to DragAndDropBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/drag-and-drop-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DragAndDropBasicExample");
        })
      );
    });

    test("/examples/drag-and-drop-disabled resolves to DragAndDropDisabledExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/drag-and-drop-disabled"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DragAndDropDisabledExample");
        })
      );
    });

    test("/docs/components/popover resolves to BaseUiPopoverDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/popover"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiPopoverDocs");
        })
      );
    });

    test("/docs/components/menu resolves to BaseUiMenuDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/menu"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiMenuDocs");
        })
      );
    });

    test("/docs/components/base-ui-menu/examples/nested resolves to BaseUiMenuNestedExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-menu/examples/nested"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiMenuNestedExample");
        })
      );
    });

    test("/examples/base-ui-menu-nested resolves to BaseUiMenuNestedExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/base-ui-menu-nested"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiMenuNestedExample");
        })
      );
    });

    test("/docs/components/listbox resolves to ListboxDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/listbox"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ListboxDocs");
        })
      );
    });

    test("/docs/components/input resolves to BaseUiInputDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/input"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiInputDocs");
        })
      );
    });

    test("/docs/components/shadcn-input resolves to ShadcnInputDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/shadcn-input"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ShadcnInputDocs");
        })
      );
    });

    test("/docs/components/fieldset resolves to BaseUiFieldsetDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/fieldset"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiFieldsetDocs");
        })
      );
    });

    test("/docs/components/fieldset/examples/basic resolves to FieldsetBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/fieldset/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("FieldsetBasicExample");
        })
      );
    });

    test("/docs/components/fieldset/examples/disabled resolves to FieldsetDisabledExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/fieldset/examples/disabled"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("FieldsetDisabledExample");
        })
      );
    });

    test("/docs/components/file-drop resolves to FileDropDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/file-drop"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("FileDropDocs");
        })
      );
    });

    test("/docs/components/file-drop/examples/basic resolves to FileDropBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/file-drop/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("FileDropBasicExample");
        })
      );
    });

    test("/docs/components/file-drop/examples/disabled resolves to FileDropDisabledExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/file-drop/examples/disabled"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("FileDropDisabledExample");
        })
      );
    });

    test("/docs/components/checkbox resolves to BaseUiCheckboxDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/checkbox"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiCheckboxDocs");
        })
      );
    });

    test("/docs/components/checkbox/examples/basic resolves to CheckboxBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/checkbox/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("CheckboxBasicExample");
        })
      );
    });

    test("/docs/components/base-ui-checkbox/examples/basic resolves to BaseUiCheckboxBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-checkbox/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiCheckboxBasicExample");
        })
      );
    });

    test("/docs/components/base-ui-checkbox/examples/labeling resolves to BaseUiCheckboxLabelingExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-checkbox/examples/labeling"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiCheckboxLabelingExample");
        })
      );
    });

    test("/docs/components/base-ui-checkbox/examples/native-button resolves to BaseUiCheckboxNativeButtonExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-checkbox/examples/native-button"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiCheckboxNativeButtonExample");
        })
      );
    });

    test("/docs/components/base-ui-checkbox/examples/form resolves to BaseUiCheckboxFormExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-checkbox/examples/form"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiCheckboxFormExample");
        })
      );
    });

    test("/docs/components/base-ui-checkbox-group/examples/labeling resolves to BaseUiCheckboxGroupLabelingExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-checkbox-group/examples/labeling"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiCheckboxGroupLabelingExample");
        })
      );
    });

    test("/docs/components/base-ui-checkbox-group/examples/native-button resolves to BaseUiCheckboxGroupNativeButtonExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-checkbox-group/examples/native-button"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe(
            "BaseUiCheckboxGroupNativeButtonExample"
          );
        })
      );
    });

    test("/docs/components/base-ui-checkbox-group/examples/form resolves to BaseUiCheckboxGroupFormExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-checkbox-group/examples/form"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiCheckboxGroupFormExample");
        })
      );
    });

    test("/docs/components/base-ui-checkbox-group/examples/parent resolves to BaseUiCheckboxGroupParentExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-checkbox-group/examples/parent"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiCheckboxGroupParentExample");
        })
      );
    });

    test("/docs/components/base-ui-checkbox-group/examples/nested-parent resolves to BaseUiCheckboxGroupNestedParentExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-checkbox-group/examples/nested-parent"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe(
            "BaseUiCheckboxGroupNestedParentExample"
          );
        })
      );
    });

    test("/docs/components/checkbox-group resolves to CheckboxGroupDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/checkbox-group"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("CheckboxGroupDocs");
        })
      );
    });

    test("/docs/components/checkbox-group/examples/basic resolves to CheckboxGroupBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/checkbox-group/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("CheckboxGroupBasicExample");
        })
      );
    });

    test("/docs/components/base-ui-checkbox-group/examples/basic resolves to BaseUiCheckboxGroupBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-checkbox-group/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiCheckboxGroupBasicExample");
        })
      );
    });

    test("/docs/components/checkbox/examples/indeterminate resolves to CheckboxIndeterminateExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/checkbox/examples/indeterminate"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("CheckboxIndeterminateExample");
        })
      );
    });

    test("/docs/components/input/examples/basic resolves to InputBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/input/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("InputBasicExample");
        })
      );
    });

    test("/docs/components/input/examples/disabled resolves to InputDisabledExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/input/examples/disabled"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("InputDisabledExample");
        })
      );
    });

    const shadcnInputExampleCases = [
      ["basic", "ShadcnInputBasicExample"],
      ["disabled", "ShadcnInputDisabledExample"],
      ["invalid", "ShadcnInputInvalidExample"],
      ["file", "ShadcnInputFileExample"],
      ["rtl", "ShadcnInputRtlExample"],
    ] as const;

    for (const [example, routeTag] of shadcnInputExampleCases) {
      test(`/docs/components/shadcn-input/examples/${example} resolves to ${routeTag}`, () => {
        Story.story(
          update,
          Story.with(initialModel),
          Story.message(
            ChangedUrl({
              url: urlOrThrow(
                `http://localhost/docs/components/shadcn-input/examples/${example}`
              ),
            })
          ),
          Story.model((model) => {
            expect(model.route._tag).toBe(routeTag);
          })
        );
      });
    }

    test("/docs/components/input-group resolves to InputGroupDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/input-group"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("InputGroupDocs");
        })
      );
    });

    const inputGroupExampleRoutes = [
      {
        docsUrl:
          "http://localhost/docs/components/input-group/examples/custom-input",
        standaloneUrl: "http://localhost/examples/input-group-custom-input",
        routeTag: "InputGroupCustomInputExample",
      },
      {
        docsUrl: "http://localhost/docs/components/input-group/examples/dropdown",
        standaloneUrl: "http://localhost/examples/input-group-dropdown",
        routeTag: "InputGroupDropdownExample",
      },
      {
        docsUrl: "http://localhost/docs/components/input-group/examples/textarea",
        standaloneUrl: "http://localhost/examples/input-group-textarea",
        routeTag: "InputGroupTextareaExample",
      },
    ];

    inputGroupExampleRoutes.forEach(({ docsUrl, standaloneUrl, routeTag }) => {
      test(`${docsUrl} resolves to ${routeTag}`, () => {
        Story.story(
          update,
          Story.with(initialModel),
          Story.message(ChangedUrl({ url: urlOrThrow(docsUrl) })),
          Story.model((model) => {
            expect(model.route._tag).toBe(routeTag);
          })
        );
      });

      test(`${standaloneUrl} resolves to ${routeTag}`, () => {
        Story.story(
          update,
          Story.with(initialModel),
          Story.message(ChangedUrl({ url: urlOrThrow(standaloneUrl) })),
          Story.model((model) => {
            expect(model.route._tag).toBe(routeTag);
          })
        );
      });
    });

    test("/docs/components/kbd/examples/input-group resolves to KbdInputGroupExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/kbd/examples/input-group"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("KbdInputGroupExample");
        })
      );
    });

    test("/docs/components/empty/examples/input-group resolves to EmptyInputGroupExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/empty/examples/input-group"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("EmptyInputGroupExample");
        })
      );
    });

    test("/docs/components/empty/examples/avatar resolves to EmptyAvatarExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/empty/examples/avatar"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("EmptyAvatarExample");
        })
      );
    });

    test("/docs/components/empty/examples/avatar-group resolves to EmptyAvatarGroupExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/empty/examples/avatar-group"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("EmptyAvatarGroupExample");
        })
      );
    });

    test("/docs/components/empty/examples/outline resolves to EmptyOutlineExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/empty/examples/outline"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("EmptyOutlineExample");
        })
      );
    });

    test("/docs/components/empty/examples/background resolves to EmptyBackgroundExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/empty/examples/background"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("EmptyBackgroundExample");
        })
      );
    });

    test("/docs/components/empty/examples/rtl resolves to EmptyRtlExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/empty/examples/rtl"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("EmptyRtlExample");
        })
      );
    });

    test("/docs/components/meter resolves to BaseUiMeterDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/meter"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiMeterDocs");
        })
      );
    });

    test("/docs/components/meter/examples/basic resolves to MeterBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/meter/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("MeterBasicExample");
        })
      );
    });

    test("/docs/components/scroll-area resolves to BaseUiScrollAreaDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/scroll-area"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiScrollAreaDocs");
        })
      );
    });

    test("/docs/components/scroll-area/examples/basic resolves to ScrollAreaBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/scroll-area/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ScrollAreaBasicExample");
        })
      );
    });

    test("/docs/components/base-ui-scroll-area/examples/basic resolves to ScrollAreaBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-scroll-area/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ScrollAreaBasicExample");
        })
      );
    });

    test("/docs/components/base-ui-scroll-area/examples/both-scrollbars resolves to ScrollAreaBothScrollbarsExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-scroll-area/examples/both-scrollbars"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ScrollAreaBothScrollbarsExample");
        })
      );
    });

    test("/docs/components/base-ui-scroll-area/examples/gradient resolves to ScrollAreaGradientExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-scroll-area/examples/gradient"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ScrollAreaGradientExample");
        })
      );
    });

    test("/docs/components/base-ui-scroll-area/examples/tabs resolves to ScrollAreaTabsExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-scroll-area/examples/tabs"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ScrollAreaTabsExample");
        })
      );
    });

    test("/docs/components/toggle resolves to BaseUiToggleDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/toggle"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiToggleDocs");
        })
      );
    });

    test("/docs/components/toggle/examples/basic resolves to ToggleBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/toggle/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ToggleBasicExample");
        })
      );
    });

    test("/docs/components/toggle-group resolves to BaseUiToggleGroupDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/toggle-group"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiToggleGroupDocs");
        })
      );
    });

    test("/docs/components/toggle-group/examples/basic resolves to ToggleGroupBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/toggle-group/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ToggleGroupBasicExample");
        })
      );
    });

    test("/docs/components/radio resolves to RadioDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/radio"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("RadioDocs");
        })
      );
    });

    test("/docs/components/radio/examples/basic resolves to RadioBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/radio/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("RadioBasicExample");
        })
      );
    });

    test("/docs/components/toolbar resolves to BaseUiToolbarDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/toolbar"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiToolbarDocs");
        })
      );
    });

    test("/docs/components/toolbar/examples/basic resolves to ToolbarBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/toolbar/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ToolbarBasicExample");
        })
      );
    });

    test("/docs/components/progress resolves to BaseUiProgressDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/progress"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiProgressDocs");
        })
      );
    });

    test("/docs/components/progress/examples/basic resolves to ProgressBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/progress/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ProgressBasicExample");
        })
      );
    });

    test("/docs/components/textarea resolves to TextareaDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/textarea"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("TextareaDocs");
        })
      );
    });

    test("/docs/components/textarea/examples/basic resolves to TextareaBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/textarea/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("TextareaBasicExample");
        })
      );
    });

    test("/docs/components/textarea/examples/disabled resolves to TextareaDisabledExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/textarea/examples/disabled"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("TextareaDisabledExample");
        })
      );
    });

    test("/docs/components/switch resolves to SwitchDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/switch"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("SwitchDocs");
        })
      );
    });

    test("/docs/components/slider resolves to SliderDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/slider"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("SliderDocs");
        })
      );
    });

    test("/docs/components/slider/examples/basic resolves to SliderBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/slider/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("SliderBasicExample");
        })
      );
    });

    test("/docs/components/slider/examples/disabled resolves to SliderDisabledExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/slider/examples/disabled"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("SliderDisabledExample");
        })
      );
    });

    test("/docs/components/switch/examples/basic resolves to SwitchBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/switch/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("SwitchBasicExample");
        })
      );
    });

    test("/docs/components/switch/examples/disabled resolves to SwitchDisabledExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/switch/examples/disabled"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("SwitchDisabledExample");
        })
      );
    });

    test("/docs/components/listbox/examples/basic resolves to ListboxBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/listbox/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ListboxBasicExample");
        })
      );
    });

    test("/docs/components/listbox/examples/animated resolves to ListboxAnimatedExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/listbox/examples/animated"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ListboxAnimatedExample");
        })
      );
    });

    test("/docs/components/tabs resolves to TabsDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/tabs"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("TabsDocs");
        })
      );
    });

    test("/docs/components/tabs/examples/basic resolves to TabsBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/tabs/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("TabsBasicExample");
        })
      );
    });

    test("/docs/components/tabs/examples/manual resolves to TabsManualExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/tabs/examples/manual"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("TabsManualExample");
        })
      );
    });

    test("/docs/components/select resolves to SelectDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/select"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("SelectDocs");
        })
      );
    });

    test("/docs/components/select/examples/basic resolves to SelectBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/select/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("SelectBasicExample");
        })
      );
    });

    test("/docs/components/select/examples/disabled resolves to SelectDisabledExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/select/examples/disabled"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("SelectDisabledExample");
        })
      );
    });

    test("/docs/components/radio-group resolves to BaseUiRadioDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/radio-group"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiRadioDocs");
        })
      );
    });

    test("/docs/components/base-ui-radio/examples/basic resolves to BaseUiRadioBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-radio/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiRadioBasicExample");
        })
      );
    });

    test("/docs/components/base-ui-radio/examples/labeling resolves to BaseUiRadioLabelingExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-radio/examples/labeling"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiRadioLabelingExample");
        })
      );
    });

    test("/docs/components/base-ui-radio/examples/native-button resolves to BaseUiRadioNativeButtonExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-radio/examples/native-button"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiRadioNativeButtonExample");
        })
      );
    });

    test("/docs/components/base-ui-radio/examples/form resolves to BaseUiRadioFormExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-radio/examples/form"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiRadioFormExample");
        })
      );
    });

    test("/docs/components/radio-group/examples/basic resolves to RadioGroupBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/radio-group/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("RadioGroupBasicExample");
        })
      );
    });

    test("/docs/components/radio-group/examples/horizontal resolves to RadioGroupHorizontalExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/radio-group/examples/horizontal"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("RadioGroupHorizontalExample");
        })
      );
    });

    test("/docs/components/menu/examples/basic resolves to MenuBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/menu/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("MenuBasicExample");
        })
      );
    });

    test("/docs/components/menu/examples/animated resolves to MenuAnimatedExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/menu/examples/animated"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("MenuAnimatedExample");
        })
      );
    });

    test("/docs/components/popover/examples/basic resolves to PopoverBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/popover/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("PopoverBasicExample");
        })
      );
    });

    test("/docs/components/base-ui-popover/examples/basic resolves to BaseUiPopoverBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-popover/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiPopoverBasicExample");
        })
      );
    });

    test("/docs/components/base-ui-popover/examples/animated resolves to BaseUiPopoverAnimatedExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-popover/examples/animated"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiPopoverAnimatedExample");
        })
      );
    });

    test("/docs/components/base-ui-popover/examples/detached-trigger resolves to BaseUiPopoverDetachedTriggerExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-popover/examples/detached-trigger"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe(
            "BaseUiPopoverDetachedTriggerExample"
          );
        })
      );
    });

    test("/docs/components/base-ui-popover/examples/multiple-triggers resolves to BaseUiPopoverMultipleTriggersExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-popover/examples/multiple-triggers"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiPopoverMultipleTriggersExample");
        })
      );
    });

    test("/docs/components/base-ui-popover/examples/open-on-hover resolves to BaseUiPopoverOpenOnHoverExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/base-ui-popover/examples/open-on-hover"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiPopoverOpenOnHoverExample");
        })
      );
    });

    test("/docs/components/popover/examples/animated resolves to PopoverAnimatedExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/popover/examples/animated"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("PopoverAnimatedExample");
        })
      );
    });

    test("legacy Base UI docs paths resolve to base-ui docs route aliases", () => {
      const cases = [
        {
          url: "http://localhost/docs/components/accordion",
          routeTag: "BaseUiAccordionDocs",
        },
        {
          url: "http://localhost/docs/components/form",
          routeTag: "BaseUiFormDocs",
        },
        {
          url: "http://localhost/docs/components/popover",
          routeTag: "BaseUiPopoverDocs",
        },
        {
          url: "http://localhost/docs/components/radio-group",
          routeTag: "BaseUiRadioDocs",
        },
      ];

      for (const testCase of cases) {
        Story.story(
          update,
          Story.with(initialModel),
          Story.message(ChangedUrl({ url: urlOrThrow(testCase.url) })),
          Story.model((model) => {
            expect(model.route._tag).toBe(testCase.routeTag);
          })
        );
      }
    });

    test("an unknown path resolves to NotFound", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({ url: urlOrThrow("http://localhost/unknown") })
        ),
        Story.model((model) => {
          if (model.route._tag === "NotFound") {
            expect(model.route.path).toBe("/unknown");
          } else {
            throw new Error("Expected NotFound");
          }
        })
      );
    });

    test("/examples/dialog-basic resolves to DialogBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/dialog-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DialogBasicExample");
        })
      );
    });

    test("/examples/base-ui-dialog-basic resolves to BaseUiDialogBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/base-ui-dialog-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiDialogBasicExample");
        })
      );
    });

    test("/examples/base-ui-dialog-nested resolves to BaseUiDialogNestedExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/base-ui-dialog-nested"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiDialogNestedExample");
        })
      );
    });

    test("/examples/base-ui-dialog-close-confirmation resolves to BaseUiDialogCloseConfirmationExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/examples/base-ui-dialog-close-confirmation"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiDialogCloseConfirmationExample");
        })
      );
    });

    test("/examples/dialog-animated resolves to DialogAnimatedExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/dialog-animated"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DialogAnimatedExample");
        })
      );
    });

    test("/examples/dialog-destructive resolves to DialogDestructiveExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/dialog-destructive"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DialogDestructiveExample");
        })
      );
    });

    test("/examples/dialog-focus resolves to DialogFocusExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/dialog-focus"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DialogFocusExample");
        })
      );
    });

    test("/examples/dialog-scrollable resolves to DialogScrollableExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/dialog-scrollable"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DialogScrollableExample");
        })
      );
    });

    test("/examples/disclosure-basic resolves to DisclosureBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/disclosure-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DisclosureBasicExample");
        })
      );
    });

    test("/examples/disclosure-disabled resolves to DisclosureDisabledExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/disclosure-disabled"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DisclosureDisabledExample");
        })
      );
    });

    test("/examples/popover-basic resolves to PopoverBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/popover-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("PopoverBasicExample");
        })
      );
    });

    test("/examples/base-ui-popover-basic resolves to BaseUiPopoverBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/base-ui-popover-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiPopoverBasicExample");
        })
      );
    });

    test("/examples/base-ui-popover-animated resolves to BaseUiPopoverAnimatedExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/examples/base-ui-popover-animated"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiPopoverAnimatedExample");
        })
      );
    });

    test("/examples/base-ui-popover-detached-trigger resolves to BaseUiPopoverDetachedTriggerExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/examples/base-ui-popover-detached-trigger"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe(
            "BaseUiPopoverDetachedTriggerExample"
          );
        })
      );
    });

    test("/examples/base-ui-popover-multiple-triggers resolves to BaseUiPopoverMultipleTriggersExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/examples/base-ui-popover-multiple-triggers"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiPopoverMultipleTriggersExample");
        })
      );
    });

    test("/examples/base-ui-popover-open-on-hover resolves to BaseUiPopoverOpenOnHoverExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/examples/base-ui-popover-open-on-hover"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiPopoverOpenOnHoverExample");
        })
      );
    });

    test("/examples/menu-basic resolves to MenuBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/menu-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("MenuBasicExample");
        })
      );
    });

    test("/examples/listbox-basic resolves to ListboxBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/listbox-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ListboxBasicExample");
        })
      );
    });

    test("/examples/input-basic resolves to InputBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/input-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("InputBasicExample");
        })
      );
    });

    test("/examples/input-disabled resolves to InputDisabledExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/input-disabled"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("InputDisabledExample");
        })
      );
    });

    for (const [example, routeTag] of shadcnInputExampleCases) {
      test(`/examples/shadcn-input-${example} resolves to ${routeTag}`, () => {
        Story.story(
          update,
          Story.with(initialModel),
          Story.message(
            ChangedUrl({
              url: urlOrThrow(
                `http://localhost/examples/shadcn-input-${example}`
              ),
            })
          ),
          Story.model((model) => {
            expect(model.route._tag).toBe(routeTag);
          })
        );
      });
    }

    test("/examples/calendar-basic resolves to CalendarBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/calendar-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("CalendarBasicExample");
        })
      );
    });

    test("/examples/calendar-bounds resolves to CalendarBoundsExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/calendar-bounds"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("CalendarBoundsExample");
        })
      );
    });

    test("/examples/date-picker-basic resolves to DatePickerBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/date-picker-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DatePickerBasicExample");
        })
      );
    });

    test("/examples/date-picker-bounds resolves to DatePickerBoundsExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/date-picker-bounds"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DatePickerBoundsExample");
        })
      );
    });

    test("/examples/fieldset-basic resolves to FieldsetBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/fieldset-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("FieldsetBasicExample");
        })
      );
    });

    test("/examples/fieldset-disabled resolves to FieldsetDisabledExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/fieldset-disabled"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("FieldsetDisabledExample");
        })
      );
    });

    test("/examples/file-drop-basic resolves to FileDropBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/file-drop-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("FileDropBasicExample");
        })
      );
    });

    test("/examples/file-drop-disabled resolves to FileDropDisabledExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/file-drop-disabled"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("FileDropDisabledExample");
        })
      );
    });

    test("/examples/textarea-basic resolves to TextareaBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/textarea-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("TextareaBasicExample");
        })
      );
    });

    test("/examples/textarea-disabled resolves to TextareaDisabledExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/textarea-disabled"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("TextareaDisabledExample");
        })
      );
    });

    test("/examples/switch-basic resolves to SwitchBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/switch-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("SwitchBasicExample");
        })
      );
    });

    test("/examples/slider-basic resolves to SliderBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/slider-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("SliderBasicExample");
        })
      );
    });

    test("/examples/slider-disabled resolves to SliderDisabledExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/slider-disabled"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("SliderDisabledExample");
        })
      );
    });

    test("/examples/switch-disabled resolves to SwitchDisabledExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/switch-disabled"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("SwitchDisabledExample");
        })
      );
    });

    test("/examples/tabs-basic resolves to TabsBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/tabs-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("TabsBasicExample");
        })
      );
    });

    test("/examples/tabs-manual resolves to TabsManualExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/tabs-manual"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("TabsManualExample");
        })
      );
    });

    test("/examples/checkbox-basic resolves to CheckboxBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/checkbox-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("CheckboxBasicExample");
        })
      );
    });

    test("/examples/checkbox-indeterminate resolves to CheckboxIndeterminateExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/checkbox-indeterminate"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("CheckboxIndeterminateExample");
        })
      );
    });

    test("/examples/listbox-animated resolves to ListboxAnimatedExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/listbox-animated"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ListboxAnimatedExample");
        })
      );
    });

    test("/examples/menu-animated resolves to MenuAnimatedExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/menu-animated"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("MenuAnimatedExample");
        })
      );
    });

    test("/docs/components/tooltip resolves to TooltipDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/tooltip"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("TooltipDocs");
        })
      );
    });

    test("/docs/components/tooltip/examples/basic resolves to TooltipBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/tooltip/examples/basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("TooltipBasicExample");
        })
      );
    });

    test("/docs/components/tooltip/examples/no-delay resolves to TooltipNoDelayExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/docs/components/tooltip/examples/no-delay"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("TooltipNoDelayExample");
        })
      );
    });

    test("/examples/tooltip-basic resolves to TooltipBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/tooltip-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("TooltipBasicExample");
        })
      );
    });

    test("/examples/tooltip-no-delay resolves to TooltipNoDelayExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/tooltip-no-delay"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("TooltipNoDelayExample");
        })
      );
    });

    test("/examples/popover-animated resolves to PopoverAnimatedExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/popover-animated"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("PopoverAnimatedExample");
        })
      );
    });

    test("/examples/base-ui-radio-basic resolves to BaseUiRadioBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/base-ui-radio-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiRadioBasicExample");
        })
      );
    });

    test("/examples/base-ui-button-basic resolves to BaseUiButtonBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/base-ui-button-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiButtonBasicExample");
        })
      );
    });

    test("/examples/base-ui-checkbox-basic resolves to BaseUiCheckboxBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/base-ui-checkbox-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiCheckboxBasicExample");
        })
      );
    });

    test("/examples/base-ui-checkbox-labeling resolves to BaseUiCheckboxLabelingExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/examples/base-ui-checkbox-labeling"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiCheckboxLabelingExample");
        })
      );
    });

    test("/examples/base-ui-checkbox-native-button resolves to BaseUiCheckboxNativeButtonExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/examples/base-ui-checkbox-native-button"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiCheckboxNativeButtonExample");
        })
      );
    });

    test("/examples/base-ui-checkbox-form resolves to BaseUiCheckboxFormExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/base-ui-checkbox-form"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiCheckboxFormExample");
        })
      );
    });

    test("/examples/base-ui-checkbox-group-labeling resolves to BaseUiCheckboxGroupLabelingExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/examples/base-ui-checkbox-group-labeling"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiCheckboxGroupLabelingExample");
        })
      );
    });

    test("/examples/base-ui-checkbox-group-native-button resolves to BaseUiCheckboxGroupNativeButtonExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/examples/base-ui-checkbox-group-native-button"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe(
            "BaseUiCheckboxGroupNativeButtonExample"
          );
        })
      );
    });

    test("/examples/base-ui-checkbox-group-form resolves to BaseUiCheckboxGroupFormExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/examples/base-ui-checkbox-group-form"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiCheckboxGroupFormExample");
        })
      );
    });

    test("/examples/base-ui-checkbox-group-parent resolves to BaseUiCheckboxGroupParentExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/examples/base-ui-checkbox-group-parent"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiCheckboxGroupParentExample");
        })
      );
    });

    test("/examples/base-ui-checkbox-group-nested-parent resolves to BaseUiCheckboxGroupNestedParentExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/examples/base-ui-checkbox-group-nested-parent"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe(
            "BaseUiCheckboxGroupNestedParentExample"
          );
        })
      );
    });

    test("/examples/base-ui-checkbox-group-basic resolves to BaseUiCheckboxGroupBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/examples/base-ui-checkbox-group-basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiCheckboxGroupBasicExample");
        })
      );
    });

    test("/examples/base-ui-radio-labeling resolves to BaseUiRadioLabelingExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/base-ui-radio-labeling"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiRadioLabelingExample");
        })
      );
    });

    test("/examples/base-ui-radio-native-button resolves to BaseUiRadioNativeButtonExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/examples/base-ui-radio-native-button"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiRadioNativeButtonExample");
        })
      );
    });

    test("/examples/base-ui-radio-form resolves to BaseUiRadioFormExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/base-ui-radio-form"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("BaseUiRadioFormExample");
        })
      );
    });

    test("/examples/scroll-area-basic resolves to ScrollAreaBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/scroll-area-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ScrollAreaBasicExample");
        })
      );
    });

    test("/examples/base-ui-scroll-area-basic resolves to ScrollAreaBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/examples/base-ui-scroll-area-basic"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ScrollAreaBasicExample");
        })
      );
    });

    test("/examples/base-ui-scroll-area-both-scrollbars resolves to ScrollAreaBothScrollbarsExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/examples/base-ui-scroll-area-both-scrollbars"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ScrollAreaBothScrollbarsExample");
        })
      );
    });

    test("/examples/base-ui-scroll-area-gradient resolves to ScrollAreaGradientExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/examples/base-ui-scroll-area-gradient"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ScrollAreaGradientExample");
        })
      );
    });

    test("/examples/base-ui-scroll-area-tabs resolves to ScrollAreaTabsExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow(
              "http://localhost/examples/base-ui-scroll-area-tabs"
            ),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ScrollAreaTabsExample");
        })
      );
    });

    test("/examples/radio-group-basic resolves to RadioGroupBasicExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/radio-group-basic"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("RadioGroupBasicExample");
        })
      );
    });

    test("/examples/radio-group-horizontal resolves to RadioGroupHorizontalExample", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/examples/radio-group-horizontal"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("RadioGroupHorizontalExample");
        })
      );
    });
  });

  describe("mobile menu", () => {
    test("navigating to a new URL closes the mobile menu dialog", () => {
      const modelWithOpenMenu: Model = {
        ...initialModel,
        uiModel: {
          ...initialModel.uiModel,
          mobileMenuDialog: Ui.Dialog.init({
            id: "mobile-menu",
            isOpen: true,
          }),
        },
      };

      Story.story(
        update,
        Story.with(modelWithOpenMenu),
        Story.message(
          ChangedUrl({ url: urlOrThrow("http://localhost/button") })
        ),
        Story.Command.resolve(
          Ui.Dialog.CloseDialog,
          Ui.Dialog.CompletedCloseDialog(),
          (dialogMessage) =>
            GotUiMessage({
              message: GotMobileMenuDialogMessage({ message: dialogMessage }),
            })
        ),
        Story.model((model) => {
          expect(model.uiModel.mobileMenuDialog.isOpen).toBeFalsy();
        })
      );
    });
  });
});
