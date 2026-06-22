import { Option } from "effect";
import { Calendar, Scene } from "foldkit";
import { describe, test } from "vitest";

import * as AccordionBasicExample from "../registry/base-ui/examples/accordion-basic/main";
import * as AccordionMultipleExample from "../registry/base-ui/examples/accordion-multiple/main";
import * as AiElementsAttachmentsGridExample from "../registry/ai-elements/examples/ai-elements-attachments-grid/main";
import * as AiElementsAttachmentsInlineExample from "../registry/ai-elements/examples/ai-elements-attachments-inline/main";
import * as AiElementsAttachmentsListExample from "../registry/ai-elements/examples/ai-elements-attachments-list/main";
import * as AlertActionExample from "../registry/shadcn/examples/alert-action/main";
import * as AlertBasicExample from "../registry/shadcn/examples/alert-basic/main";
import * as AlertCustomColorsExample from "../registry/shadcn/examples/alert-custom-colors/main";
import * as AlertDestructiveExample from "../registry/shadcn/examples/alert-destructive/main";
import * as AlertDialogBasicExample from "../registry/base-ui/examples/alert-dialog-basic/main";
import * as AlertRtlExample from "../registry/shadcn/examples/alert-rtl/main";
import * as AnimationBasicExample from "../registry/foldkit/examples/animation-basic/main";
import * as AspectRatioBasicExample from "../registry/shadcn/examples/aspect-ratio-basic/main";
import * as AspectRatioPortraitExample from "../registry/shadcn/examples/aspect-ratio-portrait/main";
import * as AspectRatioRtlExample from "../registry/shadcn/examples/aspect-ratio-rtl/main";
import * as AspectRatioSquareExample from "../registry/shadcn/examples/aspect-ratio-square/main";
import * as AutocompleteBasicExample from "../registry/base-ui/examples/autocomplete-basic/main";
import * as AvatarBasicExample from "../registry/base-ui/examples/avatar-basic/main";
import * as BadgeBasicExample from "../registry/shadcn/examples/badge-basic/main";
import * as BadgeSpinnerExample from "../registry/shadcn/examples/badge-spinner/main";
import * as BaseUiAccordionBasicExample from "../registry/base-ui/examples/base-ui-accordion-basic/main";
import * as BaseUiAccordionMultipleExample from "../registry/base-ui/examples/base-ui-accordion-multiple/main";
import * as BaseUiAlertDialogBasicExample from "../registry/base-ui/examples/base-ui-alert-dialog-basic/main";
import * as BaseUiAlertDialogCloseConfirmationExample from "../registry/base-ui/examples/base-ui-alert-dialog-close-confirmation/main";
import * as BaseUiAlertDialogControlledMultipleTriggersExample from "../registry/base-ui/examples/base-ui-alert-dialog-controlled-multiple-triggers/main";
import * as BaseUiAlertDialogDetachedTriggersExample from "../registry/base-ui/examples/base-ui-alert-dialog-detached-triggers/main";
import * as BaseUiAlertDialogMultipleTriggersExample from "../registry/base-ui/examples/base-ui-alert-dialog-multiple-triggers/main";
import * as BaseUiAlertDialogOpenFromMenuExample from "../registry/base-ui/examples/base-ui-alert-dialog-open-from-menu/main";
import * as BaseUiAutocompleteBasicExample from "../registry/base-ui/examples/base-ui-autocomplete-basic/main";
import * as BaseUiAvatarBasicExample from "../registry/base-ui/examples/base-ui-avatar-basic/main";
import * as BaseUiButtonBasicExample from "../registry/base-ui/examples/base-ui-button-basic/main";
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
import * as BaseUiNavigationMenuBasicExample from "../registry/base-ui/examples/base-ui-navigation-menu-basic/main";
import * as BaseUiNumberFieldBasicExample from "../registry/base-ui/examples/base-ui-number-field-basic/main";
import * as BaseUiOtpFieldBasicExample from "../registry/base-ui/examples/base-ui-otp-field-basic/main";
import * as BaseUiPopoverAnimatedExample from "../registry/base-ui/examples/base-ui-popover-animated/main";
import * as BaseUiPopoverBasicExample from "../registry/base-ui/examples/base-ui-popover-basic/main";
import * as BaseUiPopoverDetachedTriggerExample from "../registry/base-ui/examples/base-ui-popover-detached-trigger/main";
import * as BaseUiPopoverMultipleTriggersExample from "../registry/base-ui/examples/base-ui-popover-multiple-triggers/main";
import * as BaseUiPopoverOpenOnHoverExample from "../registry/base-ui/examples/base-ui-popover-open-on-hover/main";
import * as BaseUiPreviewCardBasicExample from "../registry/base-ui/examples/base-ui-preview-card-basic/main";
import * as BaseUiProgressBasicExample from "../registry/base-ui/examples/base-ui-progress-basic/main";
import * as BaseUiRadioBasicExample from "../registry/base-ui/examples/base-ui-radio-basic/main";
import * as BaseUiRadioFormExample from "../registry/base-ui/examples/base-ui-radio-form/main";
import * as BaseUiRadioLabelingExample from "../registry/base-ui/examples/base-ui-radio-labeling/main";
import * as BaseUiRadioNativeButtonExample from "../registry/base-ui/examples/base-ui-radio-native-button/main";
import * as ScrollAreaBasicExample from "../registry/base-ui/examples/base-ui-scroll-area-basic/main";
import * as ScrollAreaBothScrollbarsExample from "../registry/base-ui/examples/base-ui-scroll-area-both-scrollbars/main";
import * as ScrollAreaGradientExample from "../registry/base-ui/examples/base-ui-scroll-area-gradient/main";
import * as ScrollAreaTabsExample from "../registry/base-ui/examples/base-ui-scroll-area-tabs/main";
import * as BaseUiSelectBasicExample from "../registry/base-ui/examples/base-ui-select-basic/main";
import * as BaseUiSeparatorBasicExample from "../registry/base-ui/examples/base-ui-separator-basic/main";
import * as BaseUiSliderBasicExample from "../registry/base-ui/examples/base-ui-slider-basic/main";
import * as BaseUiSwitchBasicExample from "../registry/base-ui/examples/base-ui-switch-basic/main";
import * as BaseUiTabsBasicExample from "../registry/base-ui/examples/base-ui-tabs-basic/main";
import * as BaseUiToastBasicExample from "../registry/base-ui/examples/base-ui-toast-basic/main";
import * as BaseUiToggleBasicExample from "../registry/base-ui/examples/base-ui-toggle-basic/main";
import * as BaseUiToggleGroupBasicExample from "../registry/base-ui/examples/base-ui-toggle-group-basic/main";
import * as BaseUiToolbarBasicExample from "../registry/base-ui/examples/base-ui-toolbar-basic/main";
import * as BaseUiTooltipBasicExample from "../registry/base-ui/examples/base-ui-tooltip-basic/main";
import * as BreadcrumbBasicExample from "../registry/shadcn/examples/breadcrumb-basic/main";
import * as BreadcrumbCollapsedExample from "../registry/shadcn/examples/breadcrumb-collapsed/main";
import * as BreadcrumbDropdownExample from "../registry/shadcn/examples/breadcrumb-dropdown/main";
import * as BreadcrumbLinkExample from "../registry/shadcn/examples/breadcrumb-link/main";
import * as BreadcrumbRtlExample from "../registry/shadcn/examples/breadcrumb-rtl/main";
import * as BreadcrumbSeparatorExample from "../registry/shadcn/examples/breadcrumb-separator/main";
import * as ButtonBasicExample from "../registry/foldkit/examples/button-basic/main";
import * as ButtonDisabledExample from "../registry/foldkit/examples/button-disabled/main";
import * as ButtonGroupBasicExample from "../registry/shadcn/examples/button-group-basic/main";
import * as ButtonGroupInputGroupExample from "../registry/shadcn/examples/button-group-input-group/main";
import * as ButtonGroupInputExample from "../registry/shadcn/examples/button-group-input/main";
import * as ButtonGroupNestedExample from "../registry/shadcn/examples/button-group-nested/main";
import * as ButtonGroupOrientationExample from "../registry/shadcn/examples/button-group-orientation/main";
import * as ButtonGroupPopoverExample from "../registry/shadcn/examples/button-group-popover/main";
import * as ButtonGroupRtlExample from "../registry/shadcn/examples/button-group-rtl/main";
import * as ButtonGroupSelectExample from "../registry/shadcn/examples/button-group-select/main";
import * as ButtonGroupSeparatorExample from "../registry/shadcn/examples/button-group-separator/main";
import * as ButtonGroupSizeExample from "../registry/shadcn/examples/button-group-size/main";
import * as ButtonGroupSplitExample from "../registry/shadcn/examples/button-group-split/main";
import * as CalendarBasicExample from "../registry/foldkit/examples/calendar-basic/main";
import * as CalendarBoundsExample from "../registry/foldkit/examples/calendar-bounds/main";
import * as CardBasicExample from "../registry/shadcn/examples/card-basic/main";
import * as CardImageExample from "../registry/shadcn/examples/card-image/main";
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
import * as EmptyAvatarGroupExample from "../registry/shadcn/examples/empty-avatar-group/main";
import * as EmptyAvatarExample from "../registry/shadcn/examples/empty-avatar/main";
import * as EmptyBackgroundExample from "../registry/shadcn/examples/empty-background/main";
import * as EmptyBasicExample from "../registry/shadcn/examples/empty-basic/main";
import * as EmptyInputGroupExample from "../registry/shadcn/examples/empty-input-group/main";
import * as EmptyOutlineExample from "../registry/shadcn/examples/empty-outline/main";
import * as EmptyRtlExample from "../registry/shadcn/examples/empty-rtl/main";
import * as FieldBasicExample from "../registry/base-ui/examples/field-basic/main";
import * as FieldsetBasicExample from "../registry/foldkit/examples/fieldset-basic/main";
import * as FieldsetDisabledExample from "../registry/foldkit/examples/fieldset-disabled/main";
import * as FileDropBasicExample from "../registry/foldkit/examples/file-drop-basic/main";
import * as FileDropDisabledExample from "../registry/foldkit/examples/file-drop-disabled/main";
import * as FormBasicExample from "../registry/base-ui/examples/form-basic/main";
import * as HoverCardBasicExample from "../registry/shadcn/examples/hover-card-basic/main";
import * as HoverCardRtlExample from "../registry/shadcn/examples/hover-card-rtl/main";
import * as HoverCardSidesExample from "../registry/shadcn/examples/hover-card-sides/main";
import * as InputBasicExample from "../registry/foldkit/examples/input-basic/main";
import * as InputDisabledExample from "../registry/foldkit/examples/input-disabled/main";
import * as InputOtpAlphanumericExample from "../registry/shadcn/examples/input-otp-alphanumeric/main";
import * as InputOtpBasicExample from "../registry/shadcn/examples/input-otp-basic/main";
import * as InputOtpControlledExample from "../registry/shadcn/examples/input-otp-controlled/main";
import * as InputOtpDisabledExample from "../registry/shadcn/examples/input-otp-disabled/main";
import * as InputOtpFormExample from "../registry/shadcn/examples/input-otp-form/main";
import * as InputOtpFourDigitsExample from "../registry/shadcn/examples/input-otp-four-digits/main";
import * as InputOtpInvalidExample from "../registry/shadcn/examples/input-otp-invalid/main";
import * as InputOtpPatternExample from "../registry/shadcn/examples/input-otp-pattern/main";
import * as InputOtpRtlExample from "../registry/shadcn/examples/input-otp-rtl/main";
import * as InputOtpSeparatorExample from "../registry/shadcn/examples/input-otp-separator/main";
import * as ItemAvatarExample from "../registry/shadcn/examples/item-avatar/main";
import * as ItemBasicExample from "../registry/shadcn/examples/item-basic/main";
import * as ItemDropdownExample from "../registry/shadcn/examples/item-dropdown/main";
import * as ItemGroupExample from "../registry/shadcn/examples/item-group/main";
import * as ItemHeaderExample from "../registry/shadcn/examples/item-header/main";
import * as ItemIconExample from "../registry/shadcn/examples/item-icon/main";
import * as ItemImageExample from "../registry/shadcn/examples/item-image/main";
import * as ItemLinkExample from "../registry/shadcn/examples/item-link/main";
import * as ItemRtlExample from "../registry/shadcn/examples/item-rtl/main";
import * as ItemSizeExample from "../registry/shadcn/examples/item-size/main";
import * as ItemVariantExample from "../registry/shadcn/examples/item-variant/main";
import * as KbdBasicExample from "../registry/shadcn/examples/kbd-basic/main";
import * as KbdInputGroupExample from "../registry/shadcn/examples/kbd-input-group/main";
import * as KbdRtlExample from "../registry/shadcn/examples/kbd-rtl/main";
import * as LabelBasicExample from "../registry/shadcn/examples/label-basic/main";
import * as LabelFieldExample from "../registry/shadcn/examples/label-field/main";
import * as LabelRtlExample from "../registry/shadcn/examples/label-rtl/main";
import * as ListboxAnimatedExample from "../registry/foldkit/examples/listbox-animated/main";
import * as ListboxBasicExample from "../registry/foldkit/examples/listbox-basic/main";
import * as MenuAnimatedExample from "../registry/foldkit/examples/menu-animated/main";
import * as MenuBasicExample from "../registry/foldkit/examples/menu-basic/main";
import * as MenubarBasicExample from "../registry/base-ui/examples/menubar-basic/main";
import * as MeterBasicExample from "../registry/base-ui/examples/meter-basic/main";
import * as NativeSelectBasicExample from "../registry/shadcn/examples/native-select-basic/main";
import * as NativeSelectDisabledExample from "../registry/shadcn/examples/native-select-disabled/main";
import * as NativeSelectGroupsExample from "../registry/shadcn/examples/native-select-groups/main";
import * as NativeSelectInvalidExample from "../registry/shadcn/examples/native-select-invalid/main";
import * as NativeSelectRtlExample from "../registry/shadcn/examples/native-select-rtl/main";
import * as NavigationMenuBasicExample from "../registry/base-ui/examples/navigation-menu-basic/main";
import * as NumberFieldBasicExample from "../registry/base-ui/examples/number-field-basic/main";
import * as OtpFieldBasicExample from "../registry/base-ui/examples/otp-field-basic/main";
import * as PaginationBasicExample from "../registry/shadcn/examples/pagination-basic/main";
import * as PaginationIconsOnlyExample from "../registry/shadcn/examples/pagination-icons-only/main";
import * as PaginationRtlExample from "../registry/shadcn/examples/pagination-rtl/main";
import * as PaginationSimpleExample from "../registry/shadcn/examples/pagination-simple/main";
import * as PopoverAnimatedExample from "../registry/foldkit/examples/popover-animated/main";
import * as PopoverBasicExample from "../registry/foldkit/examples/popover-basic/main";
import * as PreviewCardBasicExample from "../registry/base-ui/examples/preview-card-basic/main";
import * as ProgressBasicExample from "../registry/base-ui/examples/progress-basic/main";
import * as RadioBasicExample from "../registry/base-ui/examples/radio-basic/main";
import * as RadioGroupBasicExample from "../registry/foldkit/examples/radio-group-basic/main";
import * as RadioGroupHorizontalExample from "../registry/foldkit/examples/radio-group-horizontal/main";
import * as ResizableBasicExample from "../registry/shadcn/examples/resizable-basic/main";
import * as ResizableHandleExample from "../registry/shadcn/examples/resizable-handle/main";
import * as ResizableRtlExample from "../registry/shadcn/examples/resizable-rtl/main";
import * as ResizableVerticalExample from "../registry/shadcn/examples/resizable-vertical/main";
import * as SelectBasicExample from "../registry/foldkit/examples/select-basic/main";
import * as SelectDisabledExample from "../registry/foldkit/examples/select-disabled/main";
import * as SeparatorBasicExample from "../registry/base-ui/examples/separator-basic/main";
import * as ShadcnAccordionBasicExample from "../registry/shadcn/examples/shadcn-accordion-basic/main";
import * as ShadcnAccordionBordersExample from "../registry/shadcn/examples/shadcn-accordion-borders/main";
import * as ShadcnAccordionCardExample from "../registry/shadcn/examples/shadcn-accordion-card/main";
import * as ShadcnAccordionDisabledExample from "../registry/shadcn/examples/shadcn-accordion-disabled/main";
import * as ShadcnAccordionMultipleExample from "../registry/shadcn/examples/shadcn-accordion-multiple/main";
import * as ShadcnAccordionRtlExample from "../registry/shadcn/examples/shadcn-accordion-rtl/main";
import * as ShadcnAlertDialogBasicExample from "../registry/shadcn/examples/shadcn-alert-dialog-basic/main";
import * as ShadcnAlertDialogDestructiveExample from "../registry/shadcn/examples/shadcn-alert-dialog-destructive/main";
import * as ShadcnAlertDialogMediaExample from "../registry/shadcn/examples/shadcn-alert-dialog-media/main";
import * as ShadcnAlertDialogRtlExample from "../registry/shadcn/examples/shadcn-alert-dialog-rtl/main";
import * as ShadcnAlertDialogSmallMediaExample from "../registry/shadcn/examples/shadcn-alert-dialog-small-media/main";
import * as ShadcnAlertDialogSmallExample from "../registry/shadcn/examples/shadcn-alert-dialog-small/main";
import * as ShadcnAvatarBasicExample from "../registry/shadcn/examples/shadcn-avatar-basic/main";
import * as ShadcnAvatarDropdownExample from "../registry/shadcn/examples/shadcn-avatar-dropdown/main";
import * as ShadcnBaseAccordionBasicExample from "../registry/shadcn/examples/shadcn-base-accordion-basic/main";
import * as ShadcnButtonBasicExample from "../registry/shadcn/examples/shadcn-button-basic/main";
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
import * as ShadcnCheckboxBasicExample from "../registry/shadcn/examples/shadcn-checkbox-basic/main";
import * as ShadcnCheckboxCheckedStateExample from "../registry/shadcn/examples/shadcn-checkbox-checked-state/main";
import * as ShadcnCollapsibleBasicExample from "../registry/shadcn/examples/shadcn-collapsible-basic/main";
import * as ShadcnComboboxBasicExample from "../registry/shadcn/examples/shadcn-combobox-basic/main";
import * as ShadcnContextMenuBasicExample from "../registry/shadcn/examples/shadcn-context-menu-basic/main";
import * as ShadcnDatePickerBasicExample from "../registry/shadcn/examples/shadcn-date-picker-basic/main";
import * as ShadcnDialogBasicExample from "../registry/shadcn/examples/shadcn-dialog-basic/main";
import * as ShadcnDialogCustomCloseButtonExample from "../registry/shadcn/examples/shadcn-dialog-custom-close-button/main";
import * as ShadcnDialogNoCloseButtonExample from "../registry/shadcn/examples/shadcn-dialog-no-close-button/main";
import * as ShadcnDialogRtlExample from "../registry/shadcn/examples/shadcn-dialog-rtl/main";
import * as ShadcnDialogScrollableContentExample from "../registry/shadcn/examples/shadcn-dialog-scrollable-content/main";
import * as ShadcnDialogStickyFooterExample from "../registry/shadcn/examples/shadcn-dialog-sticky-footer/main";
import * as ShadcnDrawerBasicExample from "../registry/shadcn/examples/shadcn-drawer-basic/main";
import * as ShadcnDrawerResponsiveDialogExample from "../registry/shadcn/examples/shadcn-drawer-responsive-dialog/main";
import * as ShadcnDrawerRtlExample from "../registry/shadcn/examples/shadcn-drawer-rtl/main";
import * as ShadcnDrawerScrollableContentExample from "../registry/shadcn/examples/shadcn-drawer-scrollable-content/main";
import * as ShadcnDrawerSidesExample from "../registry/shadcn/examples/shadcn-drawer-sides/main";
import * as ShadcnFieldBasicExample from "../registry/shadcn/examples/shadcn-field-basic/main";
import * as ShadcnInputBadgeExample from "../registry/shadcn/examples/shadcn-input-badge/main";
import * as ShadcnInputBasicExample from "../registry/shadcn/examples/shadcn-input-basic/main";
import * as ShadcnInputButtonGroupExample from "../registry/shadcn/examples/shadcn-input-button-group/main";
import * as ShadcnInputDemoExample from "../registry/shadcn/examples/shadcn-input-demo/main";
import * as ShadcnInputDisabledExample from "../registry/shadcn/examples/shadcn-input-disabled/main";
import * as ShadcnInputFieldGroupExample from "../registry/shadcn/examples/shadcn-input-field-group/main";
import * as ShadcnInputFieldExample from "../registry/shadcn/examples/shadcn-input-field/main";
import * as ShadcnInputFileExample from "../registry/shadcn/examples/shadcn-input-file/main";
import * as ShadcnInputFormExample from "../registry/shadcn/examples/shadcn-input-form/main";
import * as ShadcnInputGridExample from "../registry/shadcn/examples/shadcn-input-grid/main";
import * as ShadcnInputInlineExample from "../registry/shadcn/examples/shadcn-input-inline/main";
import * as ShadcnInputInputGroupExample from "../registry/shadcn/examples/shadcn-input-input-group/main";
import * as ShadcnInputInvalidExample from "../registry/shadcn/examples/shadcn-input-invalid/main";
import * as ShadcnInputRequiredExample from "../registry/shadcn/examples/shadcn-input-required/main";
import * as ShadcnInputRtlExample from "../registry/shadcn/examples/shadcn-input-rtl/main";
import * as ShadcnMenubarBasicExample from "../registry/shadcn/examples/shadcn-menubar-basic/main";
import * as ShadcnPopoverBasicExample from "../registry/shadcn/examples/shadcn-popover-basic/main";
import * as ShadcnRadioGroupBasicExample from "../registry/shadcn/examples/shadcn-radio-group-basic/main";
import * as ShadcnSelectBasicExample from "../registry/shadcn/examples/shadcn-select-basic/main";
import * as ShadcnSliderBasicExample from "../registry/shadcn/examples/shadcn-slider-basic/main";
import * as ShadcnSwitchBasicExample from "../registry/shadcn/examples/shadcn-switch-basic/main";
import * as ShadcnTabsBasicExample from "../registry/shadcn/examples/shadcn-tabs-basic/main";
import * as ShadcnTextareaBasicExample from "../registry/shadcn/examples/shadcn-textarea-basic/main";
import * as ShadcnToastBasicExample from "../registry/shadcn/examples/shadcn-toast-basic/main";
import * as ShadcnToggleBasicExample from "../registry/shadcn/examples/shadcn-toggle-basic/main";
import * as ShadcnToggleGroupBasicExample from "../registry/shadcn/examples/shadcn-toggle-group-basic/main";
import * as ShadcnTooltipBasicExample from "../registry/shadcn/examples/shadcn-tooltip-basic/main";
import * as SheetBasicExample from "../registry/shadcn/examples/sheet-basic/main";
import * as SidebarBasicExample from "../registry/shadcn/examples/sidebar-basic/main";
import * as SidebarCompositionExample from "../registry/shadcn/examples/sidebar-composition/main";
import * as SidebarControlledExample from "../registry/shadcn/examples/sidebar-controlled/main";
import * as SidebarRtlExample from "../registry/shadcn/examples/sidebar-rtl/main";
import * as SidebarVariantsExample from "../registry/shadcn/examples/sidebar-variants/main";
import * as SkeletonBasicExample from "../registry/shadcn/examples/skeleton-basic/main";
import * as SliderBasicExample from "../registry/foldkit/examples/slider-basic/main";
import * as SliderDisabledExample from "../registry/foldkit/examples/slider-disabled/main";
import * as SonnerBasicExample from "../registry/shadcn/examples/sonner-basic/main";
import * as SpinnerBasicExample from "../registry/shadcn/examples/spinner-basic/main";
import * as SwitchBasicExample from "../registry/foldkit/examples/switch-basic/main";
import * as SwitchDisabledExample from "../registry/foldkit/examples/switch-disabled/main";
import * as TableBasicExample from "../registry/shadcn/examples/table-basic/main";
import * as TabsBasicExample from "../registry/foldkit/examples/tabs-basic/main";
import * as TabsManualExample from "../registry/foldkit/examples/tabs-manual/main";
import * as TextareaBasicExample from "../registry/foldkit/examples/textarea-basic/main";
import * as TextareaDisabledExample from "../registry/foldkit/examples/textarea-disabled/main";
import * as ToastBasicExample from "../registry/foldkit/examples/toast-basic/main";
import * as ToastVariantsExample from "../registry/foldkit/examples/toast-variants/main";
import * as ToggleBasicExample from "../registry/base-ui/examples/toggle-basic/main";
import * as ToggleGroupBasicExample from "../registry/base-ui/examples/toggle-group-basic/main";
import * as ToolbarBasicExample from "../registry/base-ui/examples/toolbar-basic/main";
import * as TooltipBasicExample from "../registry/foldkit/examples/tooltip-basic/main";
import * as TooltipNoDelayExample from "../registry/foldkit/examples/tooltip-no-delay/main";
import * as TypographyBasicExample from "../registry/shadcn/examples/typography-basic/main";
import * as VirtualListBasicExample from "../registry/foldkit/examples/virtual-list-basic/main";
import * as VirtualListVariableExample from "../registry/foldkit/examples/virtual-list-variable/main";
import * as BaseUiTabs from "../registry/base-ui/ui/base-ui-tabs";
import * as Combobox from "../registry/foldkit/ui/combobox";
import * as Dialog from "../registry/foldkit/ui/dialog";
import { view } from "./docsView";
import {
  AnimationRoute,
  AccordionBasicExampleRoute,
  AccordionDocsRoute,
  AccordionMultipleExampleRoute,
  ShadcnAccordionDocsRoute,
  AlertBasicExampleRoute,
  AlertActionExampleRoute,
  AlertDestructiveExampleRoute,
  AlertDocsRoute,
  AspectRatioBasicExampleRoute,
  AspectRatioDocsRoute,
  AspectRatioPortraitExampleRoute,
  AspectRatioRtlExampleRoute,
  AspectRatioSquareExampleRoute,
  AlertDialogBasicExampleRoute,
  AlertDialogDocsRoute,
  ShadcnAlertDialogDocsRoute,
  DrawerBasicExampleRoute,
  DrawerDocsRoute,
  ShadcnDrawerBasicExampleRoute,
  ShadcnDrawerDocsRoute,
  BaseUiDrawerPositionExampleRoute,
  BaseUiDrawerNonModalExampleRoute,
  BaseUiDrawerDocsRoute,
  BaseUiContextMenuBasicExampleRoute,
  BaseUiContextMenuNestedExampleRoute,
  ContextMenuBasicExampleRoute,
  ContextMenuDocsRoute,
  ShadcnContextMenuDocsRoute,
  BaseUiContextMenuDocsRoute,
  MenubarBasicExampleRoute,
  MenubarDocsRoute,
  ShadcnMenubarDocsRoute,
  BaseUiMenubarDocsRoute,
  NavigationMenuBasicExampleRoute,
  NavigationMenuDocsRoute,
  ShadcnNavigationMenuDocsRoute,
  BaseUiNavigationMenuDocsRoute,
  OtpFieldBasicExampleRoute,
  BaseUiOtpFieldDocsRoute,
  OtpFieldDocsRoute,
  GotOtpFieldBasicExampleMessage,
  PreviewCardBasicExampleRoute,
  BaseUiPreviewCardDocsRoute,
  PreviewCardDocsRoute,
  AnimationBasicExampleRoute,
  AnimationDocsRoute,
  BreadcrumbBasicExampleRoute,
  BreadcrumbDocsRoute,
  BreadcrumbDropdownExampleRoute,
  ButtonGroupBasicExampleRoute,
  ButtonGroupDocsRoute,
  CardImageExampleRoute,
  CardRtlExampleRoute,
  CardSizeExampleRoute,
  CardSpacingExampleRoute,
  CarouselAutoplayExampleRoute,
  CarouselBasicExampleRoute,
  CarouselDocsRoute,
  ChartBasicExampleRoute,
  ChartDocsRoute,
  CommandBasicExampleRoute,
  CommandDocsRoute,
  DropdownMenuCheckboxesExampleRoute,
  DropdownMenuComplexExampleRoute,
  DropdownMenuDestructiveExampleRoute,
  DropdownMenuIconsExampleRoute,
  DropdownMenuRadioGroupExampleRoute,
  DropdownMenuRtlExampleRoute,
  DropdownMenuShortcutsExampleRoute,
  DropdownMenuSubmenuExampleRoute,
  DropdownMenuBasicExampleRoute,
  HoverCardBasicExampleRoute,
  HoverCardDocsRoute,
  InputOtpBasicExampleRoute,
  InputOtpDocsRoute,
  NativeSelectBasicExampleRoute,
  NativeSelectDocsRoute,
  NativeSelectGroupsExampleRoute,
  NativeSelectRtlExampleRoute,
  SheetBasicExampleRoute,
  SheetDocsRoute,
  SonnerBasicExampleRoute,
  SonnerDocsRoute,
  DropdownMenuDocsRoute,
  DataTableBasicExampleRoute,
  DataTableDocsRoute,
  DirectionBasicExampleRoute,
  DirectionDocsRoute,
  ItemBasicExampleRoute,
  ItemDocsRoute,
  LabelBasicExampleRoute,
  LabelDocsRoute,
  PaginationBasicExampleRoute,
  PaginationDocsRoute,
  ResizableBasicExampleRoute,
  ResizableDocsRoute,
  ResizableHandleExampleRoute,
  ResizableRtlExampleRoute,
  ResizableVerticalExampleRoute,
  SidebarBasicExampleRoute,
  SidebarCompositionExampleRoute,
  SidebarControlledExampleRoute,
  SidebarDocsRoute,
  SidebarRtlExampleRoute,
  SidebarVariantsExampleRoute,
  SpinnerBasicExampleRoute,
  SpinnerDocsRoute,
  TableBasicExampleRoute,
  TableDocsRoute,
  BaseUiButtonDocsRoute,
  ShadcnButtonDocsRoute,
  ShadcnAvatarDocsRoute,
  ButtonBasicExampleRoute,
  ButtonDisabledExampleRoute,
  ButtonDocsRoute,
  ButtonRoute,
  CalendarBasicExampleRoute,
  CalendarBoundsExampleRoute,
  CalendarDocsRoute,
  ShadcnCalendarDocsRoute,
  BaseUiAccordionBasicExampleRoute,
  BaseUiAccordionDocsRoute,
  BaseUiAccordionMultipleExampleRoute,
  BaseUiAlertDialogBasicExampleRoute,
  BaseUiAlertDialogDocsRoute,
  BaseUiAlertDialogCloseConfirmationExampleRoute,
  BaseUiAlertDialogControlledMultipleTriggersExampleRoute,
  BaseUiAlertDialogDetachedTriggersExampleRoute,
  BaseUiAlertDialogMultipleTriggersExampleRoute,
  BaseUiAutocompleteDocsRoute,
  BaseUiAutocompleteBasicExampleRoute,
  BaseUiAvatarDocsRoute,
  BaseUiAvatarBasicExampleRoute,
  BaseUiCheckboxDocsRoute,
  BaseUiCheckboxGroupBasicExampleRoute,
  BaseUiCheckboxGroupLabelingExampleRoute,
  BaseUiCheckboxGroupNativeButtonExampleRoute,
  BaseUiCheckboxGroupFormExampleRoute,
  BaseUiCheckboxGroupParentExampleRoute,
  BaseUiCheckboxGroupNestedParentExampleRoute,
  BaseUiCheckboxGroupDocsRoute,
  BaseUiCollapsibleBasicExampleRoute,
  BaseUiCollapsibleDocsRoute,
  ShadcnCheckboxDocsRoute,
  CheckboxBasicExampleRoute,
  CheckboxDocsRoute,
  CheckboxGroupBasicExampleRoute,
  CheckboxGroupDocsRoute,
  CheckboxIndeterminateExampleRoute,
  CheckboxRoute,
  BaseUiComboboxBasicExampleRoute,
  BaseUiComboboxDocsRoute,
  ShadcnComboboxDocsRoute,
  CollapsibleBasicExampleRoute,
  CollapsibleDocsRoute,
  ShadcnCollapsibleDocsRoute,
  AutocompleteBasicExampleRoute,
  AutocompleteDocsRoute,
  BaseUiDialogDocsRoute,
  BaseUiFieldDocsRoute,
  ShadcnDialogDocsRoute,
  BaseUiFieldsetDocsRoute,
  FieldBasicExampleRoute,
  FieldDocsRoute,
  ShadcnFieldDocsRoute,
  BaseUiInputDocsRoute,
  BaseUiNumberFieldDocsRoute,
  ShadcnInputDocsRoute,
  FormBasicExampleRoute,
  BaseUiFormDocsRoute,
  BaseUiFormServerFunctionExampleRoute,
  FormDocsRoute,
  BaseUiMenuDocsRoute,
  BaseUiMenuNestedExampleRoute,
  BaseUiPopoverDocsRoute,
  BaseUiRadioDocsRoute,
  ShadcnRadioGroupDocsRoute,
  BaseUiSelectDocsRoute,
  ShadcnSelectDocsRoute,
  BaseUiSliderDocsRoute,
  BaseUiSwitchDocsRoute,
  ShadcnSwitchDocsRoute,
  BaseUiTabsDocsRoute,
  ShadcnTabsDocsRoute,
  BaseUiToastDocsRoute,
  ShadcnToastDocsRoute,
  BaseUiTooltipDocsRoute,
  BaseUiCheckboxFormExampleRoute,
  BaseUiCheckboxLabelingExampleRoute,
  BaseUiCheckboxNativeButtonExampleRoute,
  NumberFieldBasicExampleRoute,
  NumberFieldDocsRoute,
  ComboboxBasicExampleRoute,
  ComboboxDocsRoute,
  ComboboxMultiExampleRoute,
  DatePickerBasicExampleRoute,
  DatePickerBoundsExampleRoute,
  DatePickerDocsRoute,
  ShadcnDatePickerDocsRoute,
  BaseUiDialogBasicExampleRoute,
  BaseUiDialogCloseConfirmationExampleRoute,
  BaseUiDialogNestedExampleRoute,
  DialogAnimatedExampleRoute,
  DialogBasicExampleRoute,
  ShadcnDialogBasicExampleRoute,
  DialogDestructiveExampleRoute,
  DialogDocsRoute,
  DialogFocusExampleRoute,
  DialogScrollableExampleRoute,
  DisclosureBasicExampleRoute,
  DisclosureDisabledExampleRoute,
  DisclosureDocsRoute,
  DisclosureRoute,
  DragAndDropBasicExampleRoute,
  DragAndDropDisabledExampleRoute,
  DragAndDropDocsRoute,
  EmptyAvatarExampleRoute,
  EmptyAvatarGroupExampleRoute,
  EmptyBackgroundExampleRoute,
  EmptyDocsRoute,
  EmptyInputGroupExampleRoute,
  EmptyOutlineExampleRoute,
  EmptyRtlExampleRoute,
  FieldsetRoute,
  FieldsetBasicExampleRoute,
  FieldsetDisabledExampleRoute,
  FieldsetDocsRoute,
  FileDropBasicExampleRoute,
  FileDropDisabledExampleRoute,
  FileDropDocsRoute,
  AiElementsAttachmentsDocsRoute,
  AiElementsAttachmentsGridExampleRoute,
  AiElementsAttachmentsInlineExampleRoute,
  AiElementsAttachmentsListExampleRoute,
  GotBaseUiComboboxBasicExampleMessage,
  GotComboboxBasicExampleMessage,
  GotComboboxMultiExampleMessage,
  GotShadcnComboboxBasicExampleMessage,
  HomeRoute,
  InputBasicExampleRoute,
  InputDisabledExampleRoute,
  InputDocsRoute,
  InputGroupCustomInputExampleRoute,
  InputGroupDocsRoute,
  InputGroupDropdownExampleRoute,
  InputGroupTextareaExampleRoute,
  InputRoute,
  MeterBasicExampleRoute,
  BaseUiMeterDocsRoute,
  MeterDocsRoute,
  ScrollAreaBasicExampleRoute,
  ScrollAreaBothScrollbarsExampleRoute,
  ScrollAreaGradientExampleRoute,
  ScrollAreaTabsExampleRoute,
  BaseUiScrollAreaDocsRoute,
  ScrollAreaDocsRoute,
  ShadcnScrollAreaDocsRoute,
  GotScrollAreaTabsExampleMessage,
  GotBaseUiDrawerPositionExampleMessage,
  GotBaseUiFormServerFunctionExampleMessage,
  ToggleBasicExampleRoute,
  BaseUiToggleDocsRoute,
  ToggleDocsRoute,
  ToggleGroupBasicExampleRoute,
  BaseUiToggleGroupDocsRoute,
  ToggleGroupDocsRoute,
  RadioBasicExampleRoute,
  RadioDocsRoute,
  ToolbarBasicExampleRoute,
  BaseUiToolbarDocsRoute,
  ToolbarDocsRoute,
  ProgressBasicExampleRoute,
  BaseUiProgressDocsRoute,
  ProgressDocsRoute,
  ShadcnProgressDocsRoute,
  KbdDocsRoute,
  KbdInputGroupExampleRoute,
  ListboxAnimatedExampleRoute,
  ListboxBasicExampleRoute,
  ListboxDocsRoute,
  MenuAnimatedExampleRoute,
  MenuBasicExampleRoute,
  MenuDocsRoute,
  NewComponentAuthoringRoute,
  NotFoundRoute,
  BaseUiPopoverAnimatedExampleRoute,
  BaseUiPopoverBasicExampleRoute,
  BaseUiPopoverDetachedTriggerExampleRoute,
  BaseUiPopoverMultipleTriggersExampleRoute,
  BaseUiPopoverOpenOnHoverExampleRoute,
  BaseUiRadioBasicExampleRoute,
  BaseUiRadioFormExampleRoute,
  BaseUiRadioLabelingExampleRoute,
  BaseUiRadioNativeButtonExampleRoute,
  PopoverAnimatedExampleRoute,
  PopoverBasicExampleRoute,
  PopoverDocsRoute,
  ShadcnPopoverDocsRoute,
  RadioGroupBasicExampleRoute,
  RadioGroupDocsRoute,
  RadioGroupHorizontalExampleRoute,
  RadioGroupRoute,
  SelectBasicExampleRoute,
  SelectDisabledExampleRoute,
  SelectDocsRoute,
  SelectRoute,
  SliderBasicExampleRoute,
  SliderDisabledExampleRoute,
  SliderDocsRoute,
  BaseUiSeparatorDocsRoute,
  ShadcnSeparatorDocsRoute,
  ShadcnSliderDocsRoute,
  SwitchBasicExampleRoute,
  SwitchDisabledExampleRoute,
  SwitchDocsRoute,
  SwitchRoute,
  TabsBasicExampleRoute,
  TabsDocsRoute,
  TabsManualExampleRoute,
  TextareaBasicExampleRoute,
  TextareaDisabledExampleRoute,
  TextareaDocsRoute,
  ShadcnTextareaDocsRoute,
  TextareaRoute,
  TooltipBasicExampleRoute,
  TooltipDocsRoute,
  TooltipNoDelayExampleRoute,
  VirtualListBasicExampleRoute,
  VirtualListDocsRoute,
  VirtualListVariableExampleRoute,
  GotBaseUiDialogCloseConfirmationExampleMessage,
  GotBaseUiDialogNestedExampleMessage,
  update,
} from "./main";
import type { Model } from "./main";
import * as NewComponentAuthoring from "./newComponentAuthoring";
import * as ThemePlayground from "./themePlayground";
import { uiInit } from "./ui/init";

const today = Calendar.make(2026, 4, 16);
const BaseUiDialogNestedNotificationsShowDialog = Dialog.ShowDialog({
  id: "dialog-nested-notifications",
  maybeFocusSelector: Option.none(),
});
const BaseUiDialogNestedDetailsShowDialog = Dialog.ShowDialog({
  id: "dialog-nested-details",
  maybeFocusSelector: Option.none(),
});
const BaseUiDialogCloseConfirmationTweetShowDialog = Dialog.ShowDialog({
  id: "dialog-close-confirmation-tweet",
  maybeFocusSelector: Option.none(),
});
const [initialUiModel] = uiInit(today);
const [newComponentAuthoring] = NewComponentAuthoring.init();
const [themePlayground] = ThemePlayground.init();
const [aiElementsAttachmentsGridExample] =
  AiElementsAttachmentsGridExample.init();
const [aiElementsAttachmentsInlineExample] =
  AiElementsAttachmentsInlineExample.init();
const [aiElementsAttachmentsListExample] =
  AiElementsAttachmentsListExample.init();
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

const modelForRoute = (route: Model["route"]): Model => ({
  route,
  uiModel: initialUiModel,
  newComponentAuthoring,
  themePlayground,
  aiElementsAttachmentsGridExample,
  aiElementsAttachmentsInlineExample,
  aiElementsAttachmentsListExample,
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
  directionBasicExample,
  baseUiDrawerBasicExample,
  baseUiDrawerpositionExample,
  baseUiDrawernonModalExample,
  baseUiFieldBasicExample,
  baseUiFieldsetBasicExample,
  baseUiFormBasicExample,
  baseUiFormSchemaValidationExample,
  baseUiFormServerFunctionExample,
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
});

const homeModel = modelForRoute(HomeRoute());

const resolveComboboxBasicPreventBlurMount = () =>
  Scene.Mount.resolve(
    Combobox.AttachComboboxPreventBlur,
    Combobox.CompletedAttachComboboxPreventBlur(),
    (message) =>
      GotComboboxBasicExampleMessage({
        message: ComboboxBasicExample.GotComboboxMessage({ message }),
      })
  );

const resolveBaseUiComboboxBasicPreventBlurMount = () =>
  Scene.Mount.resolve(
    Combobox.AttachComboboxPreventBlur,
    Combobox.CompletedAttachComboboxPreventBlur(),
    (message) =>
      GotBaseUiComboboxBasicExampleMessage({
        message: BaseUiComboboxBasicExample.GotComboboxMessage({ message }),
      })
  );

const resolveShadcnComboboxBasicPreventBlurMount = () =>
  Scene.Mount.resolve(
    Combobox.AttachComboboxPreventBlur,
    Combobox.CompletedAttachComboboxPreventBlur(),
    (message) =>
      GotShadcnComboboxBasicExampleMessage({
        message: ShadcnComboboxBasicExample.GotComboboxMessage({ message }),
      })
  );

const resolveComboboxMultiPreventBlurMount = () =>
  Scene.Mount.resolve(
    Combobox.AttachComboboxPreventBlur,
    Combobox.CompletedAttachComboboxPreventBlur(),
    (message) =>
      GotComboboxMultiExampleMessage({
        message: ComboboxMultiExample.GotComboboxMessage({ message }),
      })
  );

describe("scene", () => {
  test("the sidebar nav lists component docs links only", () => {
    Scene.scene(
      { update, view },
      Scene.with(homeModel),
      Scene.expect(Scene.role("link", { name: "Animation" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Avatar" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Badge" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Card" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Separator" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Skeleton" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Spinner" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Kbd" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Typography" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Empty" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Item" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Label" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Pagination" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Resizable" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Sidebar" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Table" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Button" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Calendar" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Checkbox" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Combobox" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Date Picker" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Dialog" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Disclosure" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Drag and Drop" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Fieldset" })).toExist(),
      Scene.expect(Scene.role("link", { name: "File Drop" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Input" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Listbox" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Menu" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Popover" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Radio Group" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Select" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Slider" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Switch" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Tabs" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Textarea" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Toast" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Tooltip" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Virtual List" })).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Animation Docs" })
      ).not.toExist(),
      Scene.expect(
        Scene.role("link", { name: "Animation Basic Example" })
      ).not.toExist(),
      Scene.expect(
        Scene.role("link", { name: "Button Basic Example" })
      ).not.toExist()
    );
  });

  test("the Home route shows the registry heading and description", () => {
    Scene.scene(
      { update, view },
      Scene.with(homeModel),
      Scene.expect(Scene.role("heading", { name: "Foldkit CN" })).toExist(),
      Scene.expect(
        Scene.text("A shadcn-style registry of styled, installable Foldkit", {
          exact: false,
        })
      ).toExist(),
      Scene.expect(Scene.testId("docs-nav-section-base-ui")).toContainText(
        "Avatar"
      ),
      Scene.expect(Scene.testId("docs-nav-section-shadcn")).toContainText(
        "Avatar"
      ),
      Scene.expect(Scene.testId("docs-nav-section-shadcn")).toContainText(
        "Switch"
      ),
      Scene.expect(Scene.testId("docs-nav-section-shadcn")).toContainText(
        "Tabs"
      ),
      Scene.expect(Scene.testId("docs-nav-section-shadcn")).toContainText(
        "Textarea"
      ),
      Scene.expect(Scene.testId("docs-nav-section-shadcn")).toContainText(
        "Toast"
      ),
      Scene.expect(Scene.testId("docs-nav-section-base-ui")).toContainText(
        "Button"
      ),
      Scene.expect(Scene.testId("docs-nav-section-base-ui")).toContainText(
        "Tooltip"
      ),
      Scene.expect(Scene.testId("docs-nav-section-ai-elements")).toContainText(
        "Attachments"
      )
    );
  });

  test("the AI Elements Attachments docs route renders docs, metadata, and examples", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(AiElementsAttachmentsDocsRoute())),
      Scene.expect(Scene.testId("docs-nav-section-ai-elements")).toContainText(
        "Attachments"
      ),
      Scene.expect(Scene.role("heading", { name: "Attachments" })).toExist(),
      Scene.expect(Scene.text("AI Elements component")).toExist(),
      Scene.expect(
        Scene.text("registry/ai-elements/ui/ai-elements-attachments")
      ).toExist(),
      Scene.expect(
        Scene.text("https://elements.ai-sdk.dev/components/attachments")
      ).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-ai-elements-attachments-grid")
      ).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-ai-elements-attachments-inline")
      ).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-ai-elements-attachments-list")
      ).toExist(),
      Scene.expect(
        Scene.role("img", { name: "mountain-landscape.jpg" })
      ).toExist(),
      Scene.expect(Scene.text("quarterly-report-2024.pdf")).toExist(),
      Scene.expect(Scene.text("product-demo.mp4")).toExist()
    );
  });

  test("the AI Elements Attachments example routes render standalone examples", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(AiElementsAttachmentsGridExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "AI Elements Attachments Grid" })
      ).toExist(),
      Scene.expect(
        Scene.role("img", { name: "mountain-landscape.jpg" })
      ).toExist()
    );

    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(AiElementsAttachmentsInlineExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "AI Elements Attachments Inline" })
      ).toExist(),
      Scene.expect(Scene.text("React Documentation")).toExist()
    );

    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(AiElementsAttachmentsListExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "AI Elements Attachments List" })
      ).toExist(),
      Scene.expect(Scene.text("product-demo.mp4")).toExist(),
      Scene.expect(Scene.text("video/mp4")).toExist()
    );
  });

  test("the Accordion docs route renders Base UI docs and hero preview", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(AccordionDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Accordion" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.text("Base UI")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "Anatomy" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Keyboard interaction" })
      ).not.toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-accordion-basic")
      ).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-accordion-multiple")
      ).toExist(),
      Scene.expect(Scene.text("View code")).toExist()
    );
  });

  test("the Accordion Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(AccordionBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Accordion Basic" })
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "What is Base UI?" })
      ).toHaveAttr("aria-expanded", "true")
    );
  });

  test("the Accordion Multiple example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(AccordionMultipleExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Accordion Multiple" })
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "What is Base UI?" })
      ).toHaveAttr("aria-expanded", "true")
    );
  });

  test("the Base UI Accordion Multiple example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiAccordionMultipleExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Accordion Multiple" })
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "What is Base UI?" })
      ).toHaveAttr("aria-expanded", "true")
    );
  });

  test("the Base UI Accordion Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiAccordionBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Accordion Basic" })
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "What is Base UI?" })
      ).toHaveAttr("aria-expanded", "true")
    );
  });

  test("the Collapsible docs route renders Base UI docs and default preview", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(CollapsibleDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Collapsible" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.text("Base UI")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "Anatomy" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Keyboard interaction" })
      ).not.toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-collapsible-basic")
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "Recovery keys" })).toHaveAttr(
        "aria-expanded",
        "false"
      ),
      Scene.click(Scene.role("button", { name: "Recovery keys" })),
      Scene.expect(Scene.role("button", { name: "Recovery keys" })).toHaveAttr(
        "aria-expanded",
        "true"
      ),
      Scene.expect(Scene.text("alien-bean-pasta")).toExist()
    );
  });

  test("the Collapsible Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(CollapsibleBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Collapsible Basic" })
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "Recovery keys" })).toHaveAttr(
        "aria-expanded",
        "false"
      )
    );
  });

  test("the Base UI Collapsible Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiCollapsibleBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Collapsible Basic" })
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "Recovery keys" })).toHaveAttr(
        "aria-expanded",
        "false"
      ),
      Scene.click(Scene.role("button", { name: "Recovery keys" })),
      Scene.expect(Scene.text("alien-bean-pasta")).toExist()
    );
  });

  test("the Alert Dialog docs route renders Base UI docs and default preview", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(AlertDialogDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Alert Dialog" })).toExist(),
      Scene.expect(Scene.text("Base UI")).toExist(),
      Scene.click(Scene.role("button", { name: "Discard draft" })),
      Scene.expect(
        Scene.role("alertdialog", { name: "Discard draft?" })
      ).toExist()
    );
  });

  test("the Alert docs route renders shadcn docs and both previews", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(AlertDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Alert" })).toExist(),
      Scene.expect(Scene.text("shadcn")).toExist(),
      Scene.expect(Scene.testId("docs-example-block-alert-basic")).toExist(),
      Scene.expect(Scene.testId("docs-example-block-alert-action")).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-alert-destructive")
      ).toExist(),
      Scene.expect(Scene.text("Heads up!")).toExist(),
      Scene.expect(Scene.role("button", { name: "Enable" })).toExist(),
      Scene.expect(Scene.text("Error")).toExist()
    );
  });

  test("the Alert Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(AlertBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Alert Basic" })).toExist(),
      Scene.expect(Scene.role("alert")).toExist(),
      Scene.expect(Scene.text("Heads up!")).toExist()
    );
  });

  test("the Alert Action example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(AlertActionExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Alert Action" })).toExist(),
      Scene.expect(Scene.role("alert")).toExist(),
      Scene.expect(Scene.text("Heads up!")).toExist(),
      Scene.expect(Scene.role("button", { name: "Enable" })).toExist()
    );
  });

  test("the Alert Destructive example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(AlertDestructiveExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Alert Destructive" })
      ).toExist(),
      Scene.expect(Scene.role("alert")).toHaveAttr(
        "data-variant",
        "Destructive"
      ),
      Scene.expect(Scene.text("Error")).toExist()
    );
  });

  test("the Aspect Ratio docs route renders shadcn docs and all previews", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(AspectRatioDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Aspect Ratio" })).toExist(),
      Scene.expect(Scene.text("shadcn")).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-aspect-ratio-basic")
      ).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-aspect-ratio-square")
      ).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-aspect-ratio-portrait")
      ).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-aspect-ratio-rtl")
      ).toExist(),
      Scene.expect(Scene.role("img", { name: "Photo" })).toExist(),
      Scene.expect(Scene.text("منظر طبيعي جميل")).toExist()
    );
  });

  test("the Aspect Ratio Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(AspectRatioBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Aspect Ratio Basic" })
      ).toExist(),
      Scene.expect(Scene.role("img", { name: "Photo" })).toExist()
    );
  });

  test("the Aspect Ratio Square example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(AspectRatioSquareExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Aspect Ratio Square" })
      ).toExist(),
      Scene.expect(Scene.role("img", { name: "Photo" })).toExist()
    );
  });

  test("the Aspect Ratio Portrait example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(AspectRatioPortraitExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Aspect Ratio Portrait" })
      ).toExist(),
      Scene.expect(Scene.role("img", { name: "Photo" })).toExist()
    );
  });

  test("the Aspect Ratio RTL example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(AspectRatioRtlExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Aspect Ratio RTL" })
      ).toExist(),
      Scene.expect(Scene.text("منظر طبيعي جميل")).toExist()
    );
  });

  test("the Breadcrumb docs route renders shadcn docs and examples", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BreadcrumbDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Breadcrumb" })).toExist(),
      Scene.expect(Scene.text("shadcn")).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-breadcrumb-basic")
      ).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-breadcrumb-dropdown")
      ).toExist(),
      Scene.expect(Scene.text("مسار التنقل")).toExist()
    );
  });

  test("the Breadcrumb Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BreadcrumbBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Breadcrumb Basic" })
      ).toExist(),
      Scene.expect(Scene.role("navigation", { name: "breadcrumb" })).toExist()
    );
  });

  test("the Breadcrumb Dropdown example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BreadcrumbDropdownExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Breadcrumb Dropdown" })
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "Toggle menu" })).toExist()
    );
  });

  test("the Button Group docs route renders shadcn docs and examples", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ButtonGroupDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Button Group" })).toExist(),
      Scene.expect(Scene.text("shadcn")).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-button-group-basic")
      ).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-button-group-popover")
      ).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-button-group-rtl")
      ).toExist()
    );
  });

  test("the Button Group Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ButtonGroupBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Button Group Basic" })
      ).toExist(),
      Scene.expect(Scene.role("group", { name: "Text formatting" })).toExist()
    );
  });

  test("the Carousel docs route renders shadcn docs and examples", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(CarouselDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Carousel" })).toExist(),
      Scene.expect(Scene.text("shadcn")).toExist(),
      Scene.expect(Scene.testId("docs-example-block-carousel-basic")).toExist(),
      Scene.expect(Scene.testId("docs-example-block-carousel-api")).toExist(),
      Scene.expect(Scene.role("region", { name: "Carousel" })).toExist()
    );
  });

  test("the Direction docs route renders shadcn docs and example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DirectionDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Direction" })).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-direction-basic")
      ).toExist(),
      Scene.expect(Scene.text("تسجيل الدخول إلى حسابك")).toExist()
    );
  });

  test("the Direction Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DirectionBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Direction Basic" })
      ).toExist(),
      Scene.expect(Scene.text("تسجيل الدخول إلى حسابك")).toExist()
    );
  });

  test("the Item docs route renders shadcn docs and examples", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ItemDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Item" })).toExist(),
      Scene.expect(Scene.text("shadcn")).toExist(),
      Scene.expect(Scene.testId("docs-example-block-item-basic")).toExist(),
      Scene.expect(Scene.testId("docs-example-block-item-rtl")).toExist(),
      Scene.expect(Scene.text("Basic Item")).toExist()
    );
  });

  test("the Item Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ItemBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Item Basic" })).toExist(),
      Scene.expect(Scene.text("Basic Item")).toExist()
    );
  });

  test("the Label docs route renders shadcn docs and example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(LabelDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Label" })).toExist(),
      Scene.expect(Scene.text("shadcn")).toExist(),
      Scene.expect(Scene.testId("docs-example-block-label-basic")).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Email" })).toHaveAttr(
        "placeholder",
        "m@example.com"
      )
    );
  });

  test("the Label Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(LabelBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Label Basic" })).toExist(),
      Scene.expect(
        Scene.role("checkbox", { name: "Accept terms and conditions" })
      ).toExist()
    );
  });

  test("the Pagination docs route renders shadcn docs and example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(PaginationDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Pagination" })).toExist(),
      Scene.expect(Scene.text("shadcn")).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-pagination-basic")
      ).toExist(),
      Scene.expect(Scene.role("navigation", { name: "pagination" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Go to page 2" })).toHaveAttr(
        "aria-current",
        "page"
      )
    );
  });

  test("the Pagination Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(PaginationBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Pagination Basic" })
      ).toExist(),
      Scene.expect(Scene.role("link", { name: "Next" })).toExist()
    );
  });

  test("the Resizable docs route renders shadcn docs and example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ResizableDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Resizable" })).toExist(),
      Scene.expect(Scene.text("shadcn")).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-resizable-basic")
      ).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-resizable-vertical")
      ).toExist(),
      Scene.expect(Scene.text("One")).toHaveAttr("data-size", "50"),
      Scene.expect(Scene.role("separator", { name: "Resize panels" })).toExist()
    );
  });

  test("the Resizable Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ResizableBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Resizable Basic" })
      ).toExist(),
      Scene.expect(Scene.text("Two")).toHaveAttr("data-size", "50")
    );
  });

  test("the Resizable Handle example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ResizableHandleExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Resizable Handle" })
      ).toExist(),
      Scene.expect(Scene.text("||")).toExist()
    );
  });

  test("the Resizable RTL example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ResizableRtlExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Resizable RTL" })).toExist(),
      Scene.expect(Scene.text("واحد")).toHaveAttr("data-size", "50")
    );
  });

  test("the Resizable Vertical example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ResizableVerticalExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Resizable Vertical" })
      ).toExist(),
      Scene.expect(Scene.text("Three")).toHaveAttr("data-size", "25")
    );
  });

  test("the Sidebar docs route renders shadcn docs and example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(SidebarDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Sidebar" })).toExist(),
      Scene.expect(Scene.text("shadcn")).toExist(),
      Scene.expect(Scene.testId("docs-example-block-sidebar-basic")).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-sidebar-composition")
      ).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-sidebar-controlled")
      ).toExist(),
      Scene.expect(Scene.testId("docs-example-block-sidebar-rtl")).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-sidebar-variants")
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "Dashboard" })).toHaveAttr(
        "aria-current",
        "page"
      ),
      Scene.click(Scene.role("button", { name: "Toggle Sidebar" })),
      Scene.expect(Scene.role("button", { name: "Toggle Sidebar" })).toExist()
    );
  });

  test("the Sidebar Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(SidebarBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Sidebar Basic" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Toggle Sidebar" })).toExist(),
      Scene.expect(Scene.text("Projects")).toExist()
    );
  });

  test("the Sidebar Composition example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(SidebarCompositionExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Sidebar Composition" })
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "Add Project" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Milestones" })).toHaveAttr(
        "aria-current",
        "page"
      )
    );
  });

  test("the Sidebar Controlled example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(SidebarControlledExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Sidebar Controlled" })
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Toggle Sidebar" })),
      Scene.expect(Scene.text("Collapsed")).toExist()
    );
  });

  test("the Sidebar RTL example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(SidebarRtlExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Sidebar RTL" })).toExist(),
      Scene.expect(Scene.text("واجهة من اليمين إلى اليسار")).toExist()
    );
  });

  test("the Sidebar Variants example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(SidebarVariantsExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Sidebar Variants" })
      ).toExist(),
      Scene.expect(Scene.text("right inset none")).toExist()
    );
  });

  test("the Spinner docs route renders shadcn docs and basic example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(SpinnerDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Spinner" })).toExist(),
      Scene.expect(Scene.testId("docs-example-block-spinner-basic")).toExist(),
      Scene.expect(Scene.text("Processing payment...")).toExist(),
      Scene.expect(Scene.text("Processing your request")).toExist()
    );
  });

  test("the Spinner Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(SpinnerBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Spinner Basic" })).toExist(),
      Scene.expect(Scene.text("Processing payment...")).toExist(),
      Scene.expect(Scene.text("جاري معالجة الدفع...")).toExist()
    );
  });

  test("the Table docs route renders shadcn docs and example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(TableDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Table" })).toExist(),
      Scene.expect(Scene.text("shadcn")).toExist(),
      Scene.expect(Scene.testId("docs-example-block-table-basic")).toExist(),
      Scene.expect(Scene.text("INV001")).toExist(),
      Scene.expect(Scene.text("$2,500.00")).toExist()
    );
  });

  test("the Table Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(TableBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Table Basic" })).toExist(),
      Scene.expect(Scene.text("A list of your recent invoices.")).toExist(),
      Scene.expect(Scene.text("INV007")).toExist()
    );
  });

  test("the Command docs route renders shadcn docs and example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(CommandDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Command" })).toExist(),
      Scene.expect(Scene.text("shadcn")).toExist(),
      Scene.expect(Scene.testId("docs-example-block-command-basic")).toExist(),
      Scene.expect(Scene.role("button", { name: "Open Menu" })).toExist(),
      Scene.click(Scene.role("button", { name: "Open Menu" })),
      Scene.expect(Scene.role("dialog", { name: "Command Palette" })).toExist(),
      Scene.expect(
        Scene.role("combobox", { name: "Command search" })
      ).toExist(),
      Scene.type(Scene.role("combobox", { name: "Command search" }), "emoji"),
      Scene.expect(Scene.role("option", { name: "Search Emoji" })).toExist()
    );
  });

  test("the Command Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(CommandBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Command Basic" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Open Menu" })).toExist(),
      Scene.click(Scene.role("button", { name: "Open Menu" })),
      Scene.expect(Scene.role("dialog", { name: "Command Palette" })).toExist(),
      Scene.expect(
        Scene.role("combobox", { name: "Command search" })
      ).toExist(),
      Scene.expect(Scene.text("Suggestions")).toExist(),
      Scene.expect(Scene.role("option", { name: "Calendar" })).toExist(),
      Scene.expect(Scene.role("option", { name: "Search Emoji" })).toExist(),
      Scene.expect(Scene.role("option", { name: "Calculator" })).toExist()
    );
  });

  test("the Dropdown Menu docs route renders shadcn docs and example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DropdownMenuDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Dropdown Menu" })).toExist(),
      Scene.expect(Scene.text("shadcn")).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-dropdown-menu-basic")
      ).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-dropdown-menu-checkboxes")
      ).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-dropdown-menu-submenu")
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Open" })),
      Scene.expect(Scene.role("menu")).toExist(),
      Scene.click(Scene.text("Billing")),
      Scene.expect(Scene.text("Selected: Billing")).toExist()
    );
  });

  test("the Dropdown Menu Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DropdownMenuBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Dropdown Menu Basic" })
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Open" })),
      Scene.expect(Scene.text("Profile")).toExist(),
      Scene.click(Scene.text("Billing")),
      Scene.expect(Scene.text("Selected: Billing")).toExist()
    );
  });

  test("the Dropdown Menu Checkboxes example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DropdownMenuCheckboxesExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Dropdown Menu Checkboxes" })
      ).toExist(),
      Scene.expect(Scene.text("Status Bar")).toExist()
    );
  });

  test("the Dropdown Menu Complex example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DropdownMenuComplexExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Dropdown Menu Complex" })
      ).toExist(),
      Scene.expect(Scene.text("Workspace")).toExist()
    );
  });

  test("the Dropdown Menu Destructive example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DropdownMenuDestructiveExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Dropdown Menu Destructive" })
      ).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "Delete" })).toHaveAttr(
        "data-variant",
        "destructive"
      )
    );
  });

  test("the Dropdown Menu Icons example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DropdownMenuIconsExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Dropdown Menu Icons" })
      ).toExist(),
      Scene.expect(Scene.text("Profile")).toExist()
    );
  });

  test("the Dropdown Menu Radio Group example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DropdownMenuRadioGroupExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Dropdown Menu Radio Group" })
      ).toExist(),
      Scene.expect(Scene.text("Comfortable")).toExist(),
      Scene.expect(Scene.role("menuitemradio")).toHaveAttr(
        "aria-checked",
        "false"
      )
    );
  });

  test("the Dropdown Menu RTL example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DropdownMenuRtlExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Dropdown Menu RTL" })
      ).toExist(),
      Scene.expect(Scene.text("الحساب")).toExist()
    );
  });

  test("the Dropdown Menu Shortcuts example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DropdownMenuShortcutsExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Dropdown Menu Shortcuts" })
      ).toExist(),
      Scene.expect(Scene.text("New Tab")).toExist()
    );
  });

  test("the Dropdown Menu Submenu example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DropdownMenuSubmenuExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Dropdown Menu Submenu" })
      ).toExist(),
      Scene.expect(Scene.text("More Tools")).toExist()
    );
  });

  test("the Hover Card docs route renders shadcn docs and example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(HoverCardDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Hover Card" })).toExist(),
      Scene.expect(Scene.text("shadcn")).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-hover-card-basic")
      ).toExist(),
      Scene.click(Scene.text("Hover Here")),
      Scene.expect(Scene.text("@vercel")).toExist()
    );
  });

  test("the Hover Card Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(HoverCardBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Hover Card Basic" })
      ).toExist(),
      Scene.click(Scene.text("Hover Here")),
      Scene.expect(Scene.text("@vercel")).toExist()
    );
  });

  test("the Input OTP docs route renders shadcn docs and example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(InputOtpDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Input OTP" })).toExist(),
      Scene.expect(Scene.text("shadcn")).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-input-otp-basic")
      ).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Digit 1" })).toExist()
    );
  });

  test("the Input OTP Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(InputOtpBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Input OTP Basic" })
      ).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Digit 1" })).toExist()
    );
  });

  test("the Native Select docs route renders shadcn docs and example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(NativeSelectDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Native Select" })).toExist(),
      Scene.expect(Scene.text("shadcn")).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-native-select-basic")
      ).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-native-select-groups")
      ).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-native-select-rtl")
      ).toExist(),
      Scene.expect(Scene.text("Select status")).toExist()
    );
  });

  test("the Native Select Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(NativeSelectBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Native Select Basic" })
      ).toExist(),
      Scene.expect(Scene.text("Select status")).toExist()
    );
  });

  test("the Native Select Groups example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(NativeSelectGroupsExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Native Select Groups" })
      ).toExist(),
      Scene.expect(Scene.text("Frontend")).toExist(),
      Scene.expect(Scene.text("Operations Manager")).toExist()
    );
  });

  test("the Native Select RTL example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(NativeSelectRtlExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Native Select RTL" })
      ).toExist(),
      Scene.expect(Scene.text("اختر الحالة")).toExist()
    );
  });

  test("the Sheet docs route renders shadcn docs and example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(SheetDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Sheet" })).toExist(),
      Scene.expect(Scene.text("shadcn")).toExist(),
      Scene.expect(Scene.testId("docs-example-block-sheet-basic")).toExist(),
      Scene.expect(Scene.text("Open")).toExist()
    );
  });

  test("the Sheet Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(SheetBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Sheet Basic" })).toExist(),
      Scene.expect(Scene.text("Open")).toExist()
    );
  });

  test("the Sonner docs route renders shadcn docs and example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(SonnerDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Sonner" })).toExist(),
      Scene.expect(Scene.text("shadcn")).toExist(),
      Scene.expect(Scene.testId("docs-example-block-sonner-basic")).toExist(),
      Scene.expect(Scene.text("Show toast")).toExist()
    );
  });

  test("the Sonner Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(SonnerBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Sonner Basic" })).toExist(),
      Scene.expect(Scene.text("Show toast")).toExist()
    );
  });

  test("the Data Table docs route renders shadcn docs and examples", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DataTableDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Data Table" })).toExist(),
      Scene.expect(Scene.text("shadcn")).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-data-table-basic")
      ).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-data-table-row-selection")
      ).toExist()
    );
  });

  test("the Data Table Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DataTableBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Data Table Basic" })
      ).toExist(),
      Scene.expect(Scene.text("m@example.com")).toExist()
    );
  });

  test("the Chart docs route renders shadcn docs and examples", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ChartDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Chart" })).toExist(),
      Scene.expect(Scene.text("shadcn")).toExist(),
      Scene.expect(Scene.testId("docs-example-block-chart-basic")).toExist(),
      Scene.expect(Scene.testId("docs-example-block-chart-legend")).toExist(),
      Scene.expect(Scene.role("region", { name: "Monthly visitors" })).toExist()
    );
  });

  test("the Chart Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ChartBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Chart Basic" })).toExist(),
      Scene.expect(Scene.role("img", { name: "Bar chart" })).toExist()
    );
  });

  test("the Carousel Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(CarouselBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Carousel Basic" })).toExist(),
      Scene.expect(Scene.role("region", { name: "Carousel" })).toExist(),
      Scene.click(Scene.role("button", { name: "Next slide" })),
      Scene.expect(Scene.text("2")).toExist()
    );
  });

  test("the Carousel Autoplay example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(CarouselAutoplayExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Carousel Autoplay" })
      ).toExist(),
      Scene.expect(Scene.role("region", { name: "Carousel" })).toExist(),
      Scene.expect(Scene.text("Autoplay delay: 2000ms")).toExist()
    );
  });

  test("the Card origin parity example routes render standalone examples", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(CardSizeExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Card Size" })).toExist(),
      Scene.expect(Scene.text("Small Card")).toExist()
    );

    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(CardSpacingExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Card Spacing" })).toExist(),
      Scene.expect(Scene.text("Terms of Service")).toExist()
    );

    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(CardImageExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Card Image" })).toExist(),
      Scene.expect(Scene.text("Design systems meetup")).toExist()
    );

    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(CardRtlExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Card RTL" })).toExist(),
      Scene.expect(Scene.text("تسجيل الدخول إلى حسابك")).toExist()
    );
  });

  test("the Alert Dialog Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(AlertDialogBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Alert Dialog Basic" })
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Discard draft" })),
      Scene.expect(
        Scene.role("alertdialog", { name: "Discard draft?" })
      ).toExist()
    );
  });

  test("the Base UI Alert Dialog Close Confirmation example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(
        modelForRoute(BaseUiAlertDialogCloseConfirmationExampleRoute())
      ),
      Scene.expect(
        Scene.role("heading", {
          name: "Base UI Alert Dialog Close Confirmation",
        })
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Tweet" })),
      Scene.expect(Scene.role("alertdialog", { name: "New tweet" })).toExist()
    );
  });

  test("the Base UI Alert Dialog Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiAlertDialogBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Alert Dialog Basic" })
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "Discard draft" })).toExist()
    );
  });

  test("the Base UI Alert Dialog Detached Triggers example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(
        modelForRoute(BaseUiAlertDialogDetachedTriggersExampleRoute())
      ),
      Scene.expect(
        Scene.role("heading", {
          name: "Base UI Alert Dialog Detached Triggers",
        })
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Discard draft" })),
      Scene.expect(
        Scene.role("alertdialog", { name: "Discard draft?" })
      ).toExist()
    );
  });

  test("the Base UI Alert Dialog Controlled Multiple Triggers example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(
        modelForRoute(BaseUiAlertDialogControlledMultipleTriggersExampleRoute())
      ),
      Scene.expect(
        Scene.role("heading", {
          name: "Base UI Alert Dialog Controlled Multiple Triggers",
        })
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Open programmatically" })),
      Scene.expect(
        Scene.role("alertdialog", { name: "Delete project?" })
      ).toExist()
    );
  });

  test("the Base UI Alert Dialog Multiple Triggers example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(
        modelForRoute(BaseUiAlertDialogMultipleTriggersExampleRoute())
      ),
      Scene.expect(
        Scene.role("heading", {
          name: "Base UI Alert Dialog Multiple Triggers",
        })
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Remove Bob" })),
      Scene.expect(Scene.role("alertdialog", { name: "Remove Bob?" })).toExist()
    );
  });

  test("the Drawer docs route renders Base UI docs and default preview", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DrawerDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Drawer" })).toExist(),
      Scene.expect(Scene.text("Base UI")).toExist(),
      Scene.expect(Scene.testId("docs-example-block-drawer-basic")).toExist(),
      Scene.click(Scene.role("button", { name: "Open drawer" })),
      Scene.expect(Scene.role("dialog", { name: "Drawer" })).toExist()
    );
  });

  test("the Drawer Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DrawerBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Drawer Basic" })).toExist(),
      Scene.click(Scene.role("button", { name: "Open drawer" })),
      Scene.expect(Scene.role("dialog", { name: "Drawer" })).toExist()
    );
  });

  test("the shadcn Drawer Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ShadcnDrawerBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "shadcn Drawer Basic" })
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "Open drawer" })).toExist()
    );
  });

  test("the Context Menu docs route renders Base UI docs and default preview", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ContextMenuDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Context Menu" })).toExist(),
      Scene.expect(Scene.text("Base UI")).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-context-menu-basic")
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Right click here" })),
      Scene.expect(Scene.role("menu")).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "Share" })).toExist(),
      Scene.click(Scene.role("button", { name: "Close context menu" })),
      Scene.expect(Scene.role("menu")).not.toExist()
    );
  });

  test("the Context Menu Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ContextMenuBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Context Menu Basic" })
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Right click here" })),
      Scene.expect(
        Scene.role("menuitem", { name: "Add to Library" })
      ).toExist(),
      Scene.click(Scene.role("menuitem", { name: "Share" })),
      Scene.expect(Scene.text("Selected: Share")).toExist()
    );
  });

  test("the Base UI Context Menu Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiContextMenuBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Context Menu Basic" })
      ).toExist(),
      Scene.expect(Scene.text("Right click here")).toExist()
    );
  });

  test("the Menubar docs route renders Base UI docs and controlled preview", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(MenubarDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Menubar" })).toExist(),
      Scene.expect(Scene.text("Base UI")).toExist(),
      Scene.expect(Scene.testId("docs-example-block-menubar-basic")).toExist(),
      Scene.expect(Scene.role("menubar")).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "File" })).toExist(),
      Scene.expect(Scene.role("menu")).not.toExist(),
      Scene.click(Scene.role("menuitem", { name: "File" })),
      Scene.expect(Scene.role("menuitem", { name: "New" })).toExist(),
      Scene.click(Scene.role("menuitem", { name: "View" })),
      Scene.expect(Scene.role("menuitem", { name: "Zoom In" })).toExist(),
      Scene.click(Scene.role("menuitem", { name: "Help" })),
      Scene.expect(Scene.role("menuitem", { name: "Documentation" })).toExist()
    );
  });

  test("the Base UI Context Menu Nested example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiContextMenuNestedExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Context Menu Nested" })
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Right click here" })),
      Scene.expect(Scene.text("Add to Playlist")).toExist()
    );
  });

  test("the Menubar Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(MenubarBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Menubar Basic" })).toExist(),
      Scene.expect(Scene.role("menubar")).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "File" })).toExist(),
      Scene.click(Scene.role("menuitem", { name: "File" })),
      Scene.expect(Scene.role("menuitem", { name: "Print" })).toExist(),
      Scene.click(Scene.role("menuitem", { name: "Help" })),
      Scene.expect(Scene.role("menuitem", { name: "About" })).toExist()
    );
  });

  test("the Navigation Menu docs route renders Base UI docs and controlled preview", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(NavigationMenuDocsRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Navigation Menu" })
      ).toExist(),
      Scene.expect(Scene.text("Base UI")).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-navigation-menu-basic")
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Handbook" })).toExist(),
      Scene.expect(Scene.role("link", { name: "GitHub" })).toExist(),
      Scene.expect(Scene.role("menu")).not.toExist(),
      Scene.click(Scene.role("button", { name: "Overview" })),
      Scene.expect(Scene.role("menu")).toExist(),
      Scene.expect(Scene.text("Introduction")).toExist(),
      Scene.expect(Scene.text("Installation")).toExist(),
      Scene.click(Scene.role("button", { name: "Handbook" })),
      Scene.expect(Scene.text("Components")).toExist(),
      Scene.expect(Scene.text("Patterns")).toExist()
    );
  });

  test("the Navigation Menu Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(NavigationMenuBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Navigation Menu Basic" })
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("link", { name: "GitHub" })).toHaveAttr(
        "href",
        "https://github.com/"
      ),
      Scene.click(Scene.role("button", { name: "Overview" })),
      Scene.expect(Scene.text("Introduction")).toExist(),
      Scene.click(Scene.role("button", { name: "Overview" })),
      Scene.expect(Scene.text("Introduction")).not.toExist()
    );
  });

  test("the OTP Field docs route renders Base UI docs and default preview", () => {
    const FocusSecondDigit = OtpFieldBasicExample.FocusDigit({
      id: "verification-code-1",
    });

    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(OtpFieldDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "OTP Field" })).toExist(),
      Scene.expect(Scene.text("Base UI")).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-otp-field-basic")
      ).toExist(),
      Scene.expect(
        Scene.role("group", { name: "Verification code" })
      ).toExist(),
      Scene.type(Scene.role("textbox", { name: "Digit 1" }), "8"),
      Scene.Command.expectExact(FocusSecondDigit),
      Scene.Command.resolve(
        FocusSecondDigit,
        OtpFieldBasicExample.CompletedFocusDigit({
          id: "verification-code-1",
        }),
        (message) => GotOtpFieldBasicExampleMessage({ message })
      ),
      Scene.expect(Scene.text("Code: 8")).toExist()
    );
  });

  test("the OTP Field Basic example route renders the standalone example", () => {
    const FocusFourthDigit = OtpFieldBasicExample.FocusDigit({
      id: "verification-code-3",
    });

    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(OtpFieldBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "OTP Field Basic" })
      ).toExist(),
      Scene.expect(
        Scene.role("group", { name: "Verification code" })
      ).toExist(),
      Scene.type(Scene.role("textbox", { name: "Digit 2" }), "34"),
      Scene.Command.expectExact(FocusFourthDigit),
      Scene.Command.resolve(
        FocusFourthDigit,
        OtpFieldBasicExample.CompletedFocusDigit({
          id: "verification-code-3",
        }),
        (message) => GotOtpFieldBasicExampleMessage({ message })
      ),
      Scene.expect(Scene.text("Code: 34")).toExist()
    );
  });

  test("the Preview Card docs route renders Base UI docs and controlled preview", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(PreviewCardDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Preview Card" })).toExist(),
      Scene.expect(Scene.text("Base UI")).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-preview-card-basic")
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "Base UI" })).toExist(),
      Scene.expect(Scene.text("@base-ui")).not.toExist(),
      Scene.click(Scene.role("button", { name: "Base UI" })),
      Scene.expect(Scene.text("@base-ui")).toExist()
    );
  });

  test("the Preview Card Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(PreviewCardBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Preview Card Basic" })
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Base UI" })),
      Scene.expect(Scene.text("@base-ui")).toExist(),
      Scene.click(Scene.role("button", { name: "Close preview card" })),
      Scene.expect(Scene.text("@base-ui")).not.toExist()
    );
  });

  test("the Field docs route renders Base UI docs and default preview", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(FieldDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Field" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.text("Base UI")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "Anatomy" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Keyboard interaction" })
      ).not.toExist(),
      Scene.expect(Scene.testId("docs-example-block-field-basic")).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Name" })).toHaveAttr(
        "placeholder",
        "Required"
      ),
      Scene.expect(Scene.text("Visible on your profile")).toExist(),
      Scene.click(Scene.role("button", { name: "Validate" })),
      Scene.expect(Scene.text("Please enter your name")).toExist()
    );
  });

  test("the Base UI Drawer Position example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiDrawerPositionExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Drawer Position" })
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Open bottom drawer" })),
      Scene.Command.resolve(
        BaseUiDrawerPositionExample.FocusDrawerClose,
        BaseUiDrawerPositionExample.CompletedFocusDrawerClose(),
        (message) => GotBaseUiDrawerPositionExampleMessage({ message })
      ),
      Scene.expect(Scene.role("dialog", { name: "Notifications" })).toExist()
    );
  });

  test("the Base UI Drawer Non-modal example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiDrawerNonModalExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Drawer Non-modal" })
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Open non-modal drawer" })),
      Scene.expect(Scene.role("dialog", { name: "Non-modal drawer" })).toExist()
    );
  });

  test("the Field Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(FieldBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Field Basic" })).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Name" })).toHaveAttr(
        "placeholder",
        "Required"
      ),
      Scene.expect(Scene.text("Visible on your profile")).toExist()
    );
  });

  test("the Number Field docs route renders Base UI docs and default preview", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(NumberFieldDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Number Field" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.text("Base UI")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "Anatomy" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Keyboard interaction" })
      ).not.toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-number-field-basic")
      ).toExist(),
      Scene.expect(Scene.role("spinbutton", { name: "Amount" })).toHaveValue(
        "100"
      ),
      Scene.click(Scene.role("button", { name: "Increase" })),
      Scene.expect(Scene.role("spinbutton", { name: "Amount" })).toHaveValue(
        "101"
      )
    );
  });

  test("the Number Field Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(NumberFieldBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Number Field Basic" })
      ).toExist(),
      Scene.expect(Scene.role("spinbutton", { name: "Amount" })).toHaveValue(
        "100"
      )
    );
  });

  test("the Form docs route renders Base UI docs and default preview", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(FormDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Form" })).toExist(),
      Scene.expect(Scene.text("Base UI")).toExist(),
      Scene.expect(Scene.testId("docs-example-block-form-basic")).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Homepage" })).toHaveValue(
        "https://example.com"
      ),
      Scene.click(Scene.role("button", { name: "Submit" })),
      Scene.expect(Scene.text("Use a domain other than example.com")).toExist()
    );
  });

  test("the Form Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(FormBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Form Basic" })).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Homepage" })).toHaveValue(
        "https://example.com"
      )
    );
  });

  test("the Base UI Form Server Function example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiFormServerFunctionExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Form Server Function" })
      ).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Username" })).toHaveValue(
        "admin"
      ),
      Scene.click(Scene.role("button", { name: "Submit" })),
      Scene.Command.resolve(
        BaseUiFormServerFunctionExample.SubmitUsername,
        BaseUiFormServerFunctionExample.SucceededSubmitUsername({
          error: "'admin' is reserved for system use",
        }),
        (message) => GotBaseUiFormServerFunctionExampleMessage({ message })
      ),
      Scene.expect(Scene.text("'admin' is reserved for system use")).toExist()
    );
  });

  test("the Autocomplete docs route renders Base UI docs and default preview", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(AutocompleteDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Autocomplete" })).toExist(),
      Scene.expect(Scene.text("Base UI")).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-autocomplete-basic")
      ).toExist(),
      Scene.expect(Scene.role("combobox", { name: "Search tags" })).toHaveAttr(
        "placeholder",
        "e.g. feature"
      ),
      Scene.expect(
        Scene.role("option", { name: "component: accordion" })
      ).toExist()
    );
  });

  test("the Autocomplete Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(AutocompleteBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Autocomplete Basic" })
      ).toExist(),
      Scene.expect(Scene.role("combobox", { name: "Search tags" })).toHaveAttr(
        "placeholder",
        "e.g. feature"
      )
    );
  });

  test("the Base UI Autocomplete Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiAutocompleteBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Autocomplete Basic" })
      ).toExist(),
      Scene.expect(Scene.role("combobox", { name: "Search tags" })).toHaveAttr(
        "placeholder",
        "e.g. feature"
      ),
      Scene.type(Scene.role("combobox", { name: "Search tags" }), "zzzz"),
      Scene.expect(Scene.text("No tags found.")).toExist()
    );
  });

  test("the Base UI Avatar Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiAvatarBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Avatar Basic" })
      ).toExist(),
      Scene.expect(Scene.role("img", { name: "Lena Taylor" })).toExist(),
      Scene.expect(Scene.text("LT")).toExist()
    );
  });

  test("the Animation docs route renders docs and inline preview", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(AnimationDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Animation" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Accessibility" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Coverage" })).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-animation-basic")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-animation-basic-preview")
      ).toHaveClass("min-h-20"),
      Scene.expect(
        Scene.testId("docs-example-block-animation-basic-actions")
      ).toHaveClass("mt-auto"),
      Scene.expect(Scene.text("View code")).toExist()
    );
  });

  test("the Animation Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(AnimationBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Animation Basic" })
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "Show content" })).toExist()
    );
  });

  test("the VirtualList docs route renders docs and inline previews", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(VirtualListDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Virtual List" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Accessibility" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Coverage" })).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-virtual-list-basic")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-virtual-list-basic-preview")
      ).toHaveClass("min-h-20"),
      Scene.expect(
        Scene.testId("docs-example-block-virtual-list-basic-actions")
      ).toHaveClass("mt-auto"),
      Scene.expect(
        Scene.testId("docs-example-block-virtual-list-variable")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-virtual-list-variable-preview")
      ).toHaveClass("min-h-20"),
      Scene.expect(
        Scene.testId("docs-example-block-virtual-list-variable-actions")
      ).toHaveClass("mt-auto"),
      Scene.expect(Scene.text("View code")).toExist(),
      Scene.expect(Scene.text("View code")).toExist()
    );
  });

  test("the VirtualList Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(VirtualListBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "VirtualList Basic" })
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "Jump to middle" })).toExist()
    );
  });

  test("the VirtualList Variable example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(VirtualListVariableExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "VirtualList Variable" })
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "Jump to middle" })).toExist()
    );
  });

  test("the Button docs route renders docs and inline previews", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ButtonDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Button" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Accessibility" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Coverage" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Click me" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Disabled" })).toBeDisabled(),
      Scene.expect(Scene.testId("docs-example-block-button-basic")).toHaveClass(
        "flex-col"
      ),
      Scene.expect(
        Scene.testId("docs-example-block-button-basic-preview")
      ).toHaveClass("min-h-20"),
      Scene.expect(
        Scene.testId("docs-example-block-button-basic-actions")
      ).toHaveClass("mt-auto"),
      Scene.expect(
        Scene.testId("docs-example-block-button-disabled")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-button-disabled-actions")
      ).toHaveClass("border-t"),
      Scene.expect(Scene.text("View code")).toExist(),
      Scene.expect(Scene.text("View code")).toExist()
    );
  });

  test("the Base UI Button docs route renders docs and replaces the coming soon entry", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiButtonDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Button" })).toExist(),
      Scene.expect(Scene.text("Base UI")).toExist(),
      Scene.expect(Scene.text("registry/base-ui/ui/base-ui-button")).toExist(),
      Scene.expect(Scene.role("button", { name: "Submit" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Disabled" })).toBeDisabled(),
      Scene.expect(Scene.testId("docs-nav-section-base-ui")).toContainText(
        "Button"
      ),
      Scene.expect(Scene.testId("docs-nav-section-base-ui")).toContainText(
        "Avatar"
      )
    );
  });

  test("the Button Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ButtonBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Button Basic" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Click me" })).toExist()
    );
  });

  test("the Button Disabled example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ButtonDisabledExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Button Disabled" })
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "Disabled" })).toBeDisabled()
    );
  });

  test("the Calendar docs route renders docs and inline previews", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(CalendarDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Calendar" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Accessibility" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Coverage" })).toExist(),
      Scene.expect(Scene.text("Selected date: 2026-04-16")).toExist(),
      Scene.expect(Scene.text("Selected bounded date: None")).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-calendar-basic")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-calendar-basic-preview")
      ).toHaveClass("min-h-20"),
      Scene.expect(
        Scene.testId("docs-example-block-calendar-basic-actions")
      ).toHaveClass("mt-auto"),
      Scene.expect(
        Scene.testId("docs-example-block-calendar-bounds")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-calendar-bounds-actions")
      ).toHaveClass("border-t"),
      Scene.expect(Scene.text("View code")).toExist(),
      Scene.expect(Scene.text("View code")).toExist()
    );
  });

  test("the Calendar Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(CalendarBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Calendar Basic" })).toExist(),
      Scene.expect(Scene.text("Selected date: 2026-04-16")).toExist()
    );
  });

  test("the Calendar Bounds example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(CalendarBoundsExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Calendar Bounds" })
      ).toExist(),
      Scene.expect(Scene.text("Selected bounded date: None")).toExist()
    );
  });

  test("the Date Picker docs route renders docs and inline previews", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DatePickerDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Date Picker" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Accessibility" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Coverage" })).toExist(),
      Scene.expect(Scene.text("Selected date: None")).toExist(),
      Scene.expect(Scene.text("Selected bounded date: None")).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-date-picker-basic")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-date-picker-basic-preview")
      ).toHaveClass("min-h-20"),
      Scene.expect(
        Scene.testId("docs-example-block-date-picker-basic-actions")
      ).toHaveClass("mt-auto"),
      Scene.expect(
        Scene.testId("docs-example-block-date-picker-bounds")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-date-picker-bounds-actions")
      ).toHaveClass("border-t"),
      Scene.expect(Scene.text("View code")).toExist(),
      Scene.expect(Scene.text("View code")).toExist()
    );
  });

  test("the Date Picker Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DatePickerBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Date Picker Basic" })
      ).toExist(),
      Scene.expect(Scene.text("Selected date: None")).toExist()
    );
  });

  test("the Date Picker Bounds example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DatePickerBoundsExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Date Picker Bounds" })
      ).toExist(),
      Scene.expect(Scene.text("Selected bounded date: None")).toExist()
    );
  });

  test("the Checkbox docs route renders docs and inline previews", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(CheckboxDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Checkbox" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Accessibility" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Coverage" })).toExist(),
      Scene.expect(
        Scene.role("checkbox", { name: "Accept terms and conditions" })
      ).toExist(),
      Scene.expect(
        Scene.role("checkbox", { name: "All notification channels" })
      ).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-checkbox-basic")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-checkbox-basic-preview")
      ).toHaveClass("min-h-20"),
      Scene.expect(
        Scene.testId("docs-example-block-checkbox-basic-actions")
      ).toHaveClass("mt-auto"),
      Scene.expect(
        Scene.testId("docs-example-block-checkbox-indeterminate")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-checkbox-indeterminate-actions")
      ).toHaveClass("border-t"),
      Scene.expect(Scene.text("View code")).toExist(),
      Scene.expect(Scene.text("View code")).toExist()
    );
  });

  test("the Base UI Checkbox docs route renders docs and replaces the coming soon entry", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiCheckboxDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Checkbox" })).toExist(),
      Scene.expect(Scene.text("Base UI")).toExist(),
      Scene.expect(
        Scene.text("registry/base-ui/ui/base-ui-checkbox")
      ).toExist(),
      Scene.expect(
        Scene.role("checkbox", { name: "Enable notifications" })
      ).toExist(),
      Scene.expect(
        Scene.role("checkbox", { name: "Accept terms and conditions" })
      ).toExist(),
      Scene.expect(
        Scene.role("checkbox", { name: "Stay logged in for 7 days" })
      ).toExist(),
      Scene.expect(Scene.testId("docs-nav-section-base-ui")).toContainText(
        "Checkbox"
      )
    );
  });

  test("the next Base UI lane docs routes render active docs pages", () => {
    const baseUiDocsRoutes = [
      {
        route: BaseUiAccordionDocsRoute(),
        heading: "Accordion",
        source: "registry/base-ui/ui/base-ui-accordion",
      },
      {
        route: BaseUiAlertDialogDocsRoute(),
        heading: "Alert Dialog",
        source: "registry/base-ui/ui/base-ui-alert-dialog",
      },
      {
        route: BaseUiAutocompleteDocsRoute(),
        heading: "Autocomplete",
        source: "registry/base-ui/ui/base-ui-autocomplete",
      },
      {
        route: BaseUiAvatarDocsRoute(),
        heading: "Avatar",
        source: "registry/base-ui/ui/base-ui-avatar",
      },
      {
        route: BaseUiComboboxDocsRoute(),
        heading: "Combobox",
        source: "registry/base-ui/ui/base-ui-combobox",
        resolveMounts: [resolveBaseUiComboboxBasicPreventBlurMount()],
      },
      {
        route: BaseUiCheckboxGroupDocsRoute(),
        heading: "Checkbox Group",
        source: "registry/base-ui/ui/base-ui-checkbox-group",
      },
      {
        route: BaseUiCollapsibleDocsRoute(),
        heading: "Collapsible",
        source: "registry/base-ui/ui/base-ui-collapsible",
      },
      {
        route: BaseUiContextMenuDocsRoute(),
        heading: "Context Menu",
        source: "registry/base-ui/ui/base-ui-context-menu",
      },
      {
        route: BaseUiDialogDocsRoute(),
        heading: "Dialog",
        source: "registry/base-ui/ui/base-ui-dialog",
      },
      {
        route: BaseUiDrawerDocsRoute(),
        heading: "Drawer",
        source: "registry/base-ui/ui/base-ui-drawer",
      },
      {
        route: BaseUiFieldDocsRoute(),
        heading: "Field",
        source: "registry/base-ui/ui/base-ui-field",
      },
      {
        route: BaseUiFieldsetDocsRoute(),
        heading: "Fieldset",
        source: "registry/base-ui/ui/base-ui-fieldset",
      },
      {
        route: BaseUiFormDocsRoute(),
        heading: "Form",
        source: "registry/base-ui/ui/base-ui-form",
      },
      {
        route: BaseUiInputDocsRoute(),
        heading: "Input",
        source: "registry/base-ui/ui/base-ui-input",
      },
      {
        route: BaseUiMenubarDocsRoute(),
        heading: "Menubar",
        source: "registry/base-ui/ui/base-ui-menubar",
      },
      {
        route: BaseUiMeterDocsRoute(),
        heading: "Meter",
        source: "registry/base-ui/ui/base-ui-meter",
      },
      {
        route: BaseUiMenuDocsRoute(),
        heading: "Menu",
        source: "registry/base-ui/ui/base-ui-menu",
      },
      {
        route: BaseUiNavigationMenuDocsRoute(),
        heading: "Navigation Menu",
        source: "registry/base-ui/ui/base-ui-navigation-menu",
      },
      {
        route: BaseUiNumberFieldDocsRoute(),
        heading: "Number Field",
        source: "registry/base-ui/ui/base-ui-number-field",
      },
      {
        route: BaseUiOtpFieldDocsRoute(),
        heading: "OTP Field",
        source: "registry/base-ui/ui/base-ui-otp-field",
      },
      {
        route: BaseUiPopoverDocsRoute(),
        heading: "Popover",
        source: "registry/base-ui/ui/base-ui-popover",
      },
      {
        route: BaseUiPreviewCardDocsRoute(),
        heading: "Preview Card",
        source: "registry/base-ui/ui/base-ui-preview-card",
      },
      {
        route: BaseUiProgressDocsRoute(),
        heading: "Progress",
        source: "registry/base-ui/ui/base-ui-progress",
      },
      {
        route: BaseUiRadioDocsRoute(),
        heading: "Radio",
        source: "registry/base-ui/ui/base-ui-radio",
      },
      {
        route: BaseUiScrollAreaDocsRoute(),
        heading: "Scroll Area",
        source: "registry/base-ui/ui/base-ui-scroll-area",
      },
      {
        route: BaseUiSeparatorDocsRoute(),
        heading: "Separator",
        source: "registry/base-ui/ui/base-ui-separator",
      },
      {
        route: BaseUiSelectDocsRoute(),
        heading: "Select",
        source: "registry/base-ui/ui/base-ui-select",
      },
      {
        route: BaseUiSliderDocsRoute(),
        heading: "Slider",
        source: "registry/base-ui/ui/base-ui-slider",
      },
      {
        route: BaseUiSwitchDocsRoute(),
        heading: "Switch",
        source: "registry/base-ui/ui/base-ui-switch",
      },
      {
        route: BaseUiTabsDocsRoute(),
        heading: "Tabs",
        source: "registry/base-ui/ui/base-ui-tabs",
      },
      {
        route: BaseUiToggleDocsRoute(),
        heading: "Toggle",
        source: "registry/base-ui/ui/base-ui-toggle",
      },
      {
        route: BaseUiToggleGroupDocsRoute(),
        heading: "Toggle Group",
        source: "registry/base-ui/ui/base-ui-toggle-group",
      },
      {
        route: BaseUiToolbarDocsRoute(),
        heading: "Toolbar",
        source: "registry/base-ui/ui/base-ui-toolbar",
      },
      {
        route: BaseUiToastDocsRoute(),
        heading: "Toast",
        source: "registry/base-ui/ui/base-ui-toast",
      },
      {
        route: BaseUiTooltipDocsRoute(),
        heading: "Tooltip",
        source: "registry/base-ui/ui/base-ui-tooltip",
      },
    ];

    baseUiDocsRoutes.forEach(
      ({ route, heading, source, resolveMounts = [] }) => {
        Scene.scene(
          { update, view },
          Scene.with(modelForRoute(route)),
          Scene.expect(Scene.role("heading", { name: heading })).toExist(),
          Scene.expect(Scene.text("Base UI")).toExist(),
          Scene.expect(Scene.text(source)).toExist(),
          Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
          Scene.expect(
            Scene.role("heading", { name: "Installation" })
          ).toExist(),
          Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
          Scene.expect(
            Scene.role("heading", { name: "Foldkit integration" })
          ).toExist(),
          Scene.expect(Scene.role("heading", { name: "Anatomy" })).toExist(),
          Scene.expect(
            Scene.role("heading", { name: "API reference" })
          ).toExist(),
          ...resolveMounts
        );
      }
    );
  });

  test("the first shadcn lane docs routes render active docs pages", () => {
    const shadcnDocsRoutes = [
      {
        route: ShadcnButtonDocsRoute(),
        heading: "Button",
        source: "registry/shadcn/ui/shadcn-button",
        example: "Basic",
      },
      {
        route: ShadcnCheckboxDocsRoute(),
        heading: "Checkbox",
        source: "registry/shadcn/ui/shadcn-checkbox",
      },
      {
        route: ShadcnInputDocsRoute(),
        heading: "Input",
        source: "registry/shadcn/ui/shadcn-input",
      },
      {
        route: ShadcnAccordionDocsRoute(),
        heading: "Accordion",
        source: "registry/shadcn/ui/shadcn-accordion",
        example: "Basic",
      },
      {
        route: ShadcnAlertDialogDocsRoute(),
        heading: "Alert Dialog",
        source: "registry/shadcn/ui/shadcn-alert-dialog",
        example: "Basic",
      },
      {
        route: ShadcnAvatarDocsRoute(),
        heading: "Avatar",
        source: "registry/shadcn/ui/shadcn-avatar",
        example: "Basic",
      },
      {
        route: ShadcnCalendarDocsRoute(),
        heading: "Calendar",
        source: "registry/shadcn/ui/shadcn-calendar",
        example: "Basic",
      },
      {
        route: ShadcnCollapsibleDocsRoute(),
        heading: "Collapsible",
        source: "registry/shadcn/ui/shadcn-collapsible",
      },
      {
        route: ShadcnComboboxDocsRoute(),
        heading: "Combobox",
        source: "registry/shadcn/ui/shadcn-combobox",
        resolveMounts: [resolveShadcnComboboxBasicPreventBlurMount()],
      },
      {
        route: ShadcnContextMenuDocsRoute(),
        heading: "Context Menu",
        source: "registry/shadcn/ui/shadcn-context-menu",
      },
      {
        route: ShadcnDatePickerDocsRoute(),
        heading: "Date Picker",
        source: "registry/shadcn/ui/shadcn-date-picker",
      },
      {
        route: ShadcnDialogDocsRoute(),
        heading: "Dialog",
        source: "registry/shadcn/ui/shadcn-dialog",
      },
      {
        route: ShadcnDrawerDocsRoute(),
        heading: "Drawer",
        source: "registry/shadcn/ui/shadcn-drawer",
      },
      {
        route: ShadcnFieldDocsRoute(),
        heading: "Field",
        source: "registry/shadcn/ui/shadcn-field",
      },
      {
        route: ShadcnMenubarDocsRoute(),
        heading: "Menubar",
        source: "registry/shadcn/ui/shadcn-menubar",
      },
      {
        route: ShadcnNavigationMenuDocsRoute(),
        heading: "Navigation Menu",
        source: "registry/shadcn/ui/shadcn-navigation-menu",
      },
      {
        route: ShadcnPopoverDocsRoute(),
        heading: "Popover",
        source: "registry/shadcn/ui/shadcn-popover",
      },
      {
        route: ShadcnProgressDocsRoute(),
        heading: "Progress",
        source: "registry/shadcn/ui/shadcn-progress",
      },
      {
        route: ShadcnSwitchDocsRoute(),
        heading: "Switch",
        source: "registry/shadcn/ui/shadcn-switch",
        example: "Basic",
      },
      {
        route: ShadcnTabsDocsRoute(),
        heading: "Tabs",
        source: "registry/shadcn/ui/shadcn-tabs",
        example: "Basic",
      },
      {
        route: ShadcnTextareaDocsRoute(),
        heading: "Textarea",
        source: "registry/shadcn/ui/shadcn-textarea",
      },
      {
        route: ShadcnToastDocsRoute(),
        heading: "Toast",
        source: "registry/shadcn/ui/shadcn-toast",
        example: "Basic",
      },
      {
        route: ShadcnRadioGroupDocsRoute(),
        heading: "Radio Group",
        source: "registry/shadcn/ui/shadcn-radio-group",
        example: "Basic",
      },
      {
        route: ShadcnScrollAreaDocsRoute(),
        heading: "Scroll Area",
        source: "registry/shadcn/ui/shadcn-scroll-area",
      },
      {
        route: ShadcnSelectDocsRoute(),
        heading: "Select",
        source: "registry/shadcn/ui/shadcn-select",
        example: "Basic",
      },
      {
        route: ShadcnSeparatorDocsRoute(),
        heading: "Separator",
        source: "registry/shadcn/ui/shadcn-separator",
      },
      {
        route: ShadcnSliderDocsRoute(),
        heading: "Slider",
        source: "registry/shadcn/ui/shadcn-slider",
        example: "Basic",
      },
    ];

    shadcnDocsRoutes.forEach(
      ({ route, heading, source, example, resolveMounts = [] }) => {
        Scene.scene(
          { update, view },
          Scene.with(modelForRoute(route)),
          Scene.expect(Scene.role("heading", { name: heading })).toExist(),
          Scene.expect(Scene.text("shadcn")).toExist(),
          Scene.expect(Scene.text(source)).toExist(),
          Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
          Scene.expect(
            Scene.role("heading", { name: "Installation" })
          ).toExist(),
          Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
          Scene.expect(
            Scene.role("heading", { name: "Foldkit integration" })
          ).toExist(),
          Scene.expect(Scene.role("heading", { name: "Anatomy" })).toExist(),
          Scene.expect(
            Scene.role("heading", { name: "API reference" })
          ).toExist(),
          ...(example === undefined
            ? []
            : [
                Scene.expect(
                  Scene.role("heading", { name: "Examples" })
                ).toExist(),
                Scene.expect(Scene.text(example)).toExist(),
              ]),
          ...resolveMounts
        );
      }
    );
  });

  test("the shadcn Accordion docs Multiple preview updates through its submodel", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ShadcnAccordionDocsRoute())),
      Scene.expect(Scene.text("Multiple")).toExist(),
      Scene.expect(
        Scene.text("Yes. It adheres to the WAI-ARIA design pattern.")
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Is it styled?" })),
      Scene.expect(
        Scene.text(
          "Yes. It comes with default styles that matches the other components' aesthetic."
        )
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Is it accessible?" })
      ).toHaveAttr("aria-expanded", "false"),
      Scene.expect(Scene.role("button", { name: "Is it styled?" })).toHaveAttr(
        "aria-expanded",
        "true"
      )
    );
  });

  test("the shadcn Calendar docs Presets preview updates through its submodel", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ShadcnCalendarDocsRoute())),
      Scene.expect(Scene.text("Presets")).toExist(),
      Scene.click(Scene.role("button", { name: "Tomorrow" })),
      Scene.expect(Scene.text("Selected preset: 2026-04-17")).toExist(),
      Scene.click(Scene.role("button", { name: "In a week" })),
      Scene.expect(Scene.text("Selected preset: 2026-04-23")).toExist()
    );
  });

  test("the shadcn Input docs Basic preview updates through its submodel", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ShadcnInputDocsRoute())),
      Scene.expect(Scene.role("textbox", { name: "Email" })).toHaveAttr(
        "placeholder",
        "Email"
      ),
      Scene.type(Scene.role("textbox", { name: "Email" }), "ada@example.com"),
      Scene.expect(Scene.role("textbox", { name: "Email" })).toHaveValue(
        "ada@example.com"
      )
    );
  });

  test("the shadcn Textarea docs Basic preview updates through its submodel", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ShadcnTextareaDocsRoute())),
      Scene.expect(Scene.placeholder("Type your message here.")).toHaveValue("")
    );
  });

  test("the shadcn Field docs Basic preview covers origin field examples", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ShadcnFieldDocsRoute())),
      Scene.expect(Scene.text("Payment Method")).toExist(),
      Scene.expect(Scene.text("Additional Field Examples")).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Input" })).toHaveAttr(
        "value",
        "m@example.com"
      ),
      Scene.expect(Scene.role("textbox", { name: "Textarea" })).toHaveValue(
        "Tell us about your project."
      ),
      Scene.expect(Scene.role("combobox", { name: "Select" })).toExist(),
      Scene.expect(Scene.role("slider", { name: "Slider" })).toHaveAttr(
        "aria-valuenow",
        "50"
      ),
      Scene.expect(Scene.text("Fieldset")).toExist(),
      Scene.expect(Scene.text("Choice Card")).toExist(),
      Scene.expect(Scene.text("Field Group")).toExist(),
      Scene.expect(Scene.text("Responsive")).toExist(),
      Scene.expect(Scene.text("Enter a valid email address.")).toExist(),
      Scene.expect(
        Scene.role("textbox", { name: "البريد الإلكتروني" })
      ).toHaveAttr("value", "user@example.com")
    );
  });

  test("the Checkbox Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(CheckboxBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Checkbox Basic" })).toExist(),
      Scene.expect(
        Scene.role("checkbox", { name: "Accept terms and conditions" })
      ).toExist()
    );
  });

  test("the Checkbox Group docs route renders Base UI docs and hero preview", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(CheckboxGroupDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Checkbox Group" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.text("Base UI")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "Anatomy" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Keyboard interaction" })
      ).not.toExist(),
      Scene.expect(Scene.role("group", { name: "Apples" })).toExist(),
      Scene.expect(Scene.role("checkbox", { name: "Fuji" })).toHaveAttr(
        "aria-checked",
        "true"
      ),
      Scene.click(Scene.text("Gala")),
      Scene.expect(Scene.role("checkbox", { name: "Gala" })).toHaveAttr(
        "aria-checked",
        "true"
      ),
      Scene.expect(Scene.role("checkbox", { name: "All apples" })).toHaveAttr(
        "aria-checked",
        "mixed"
      ),
      Scene.expect(Scene.text("View code")).toExist()
    );
  });

  test("the Checkbox Group Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(CheckboxGroupBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Checkbox Group Basic" })
      ).toExist(),
      Scene.expect(Scene.role("group", { name: "Apples" })).toExist()
    );
  });

  test("the Base UI Checkbox Group Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiCheckboxGroupBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Checkbox Group Basic" })
      ).toExist(),
      Scene.expect(Scene.role("group", { name: "Apples" })).toExist()
    );
  });

  test("the Base UI Checkbox Labeling example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiCheckboxLabelingExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Checkbox Labeling" })
      ).toExist(),
      Scene.expect(
        Scene.role("checkbox", { name: "Accept terms and conditions" })
      ).toExist()
    );
  });

  test("the Base UI Checkbox Native Button example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiCheckboxNativeButtonExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Checkbox Native Button" })
      ).toExist(),
      Scene.expect(
        Scene.role("checkbox", { name: "Enable notifications" })
      ).toExist()
    );
  });

  test("the Base UI Checkbox Form example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiCheckboxFormExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Checkbox Form" })
      ).toExist(),
      Scene.expect(
        Scene.role("checkbox", { name: "Stay logged in for 7 days" })
      ).toExist()
    );
  });

  test("the Base UI Checkbox Group Labeling example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiCheckboxGroupLabelingExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Checkbox Group Labeling" })
      ).toExist(),
      Scene.expect(
        Scene.role("group", { name: "Allowed network protocols" })
      ).toExist()
    );
  });

  test("the Base UI Checkbox Group Native Button example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiCheckboxGroupNativeButtonExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Checkbox Group Native Button" })
      ).toExist(),
      Scene.expect(
        Scene.role("group", { name: "Allowed network protocols" })
      ).toExist()
    );
  });

  test("the Base UI Checkbox Group Form example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiCheckboxGroupFormExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Checkbox Group Form" })
      ).toExist(),
      Scene.expect(
        Scene.role("group", { name: "Allowed network protocols" })
      ).toExist()
    );
  });

  test("the Base UI Checkbox Group Parent example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiCheckboxGroupParentExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Checkbox Group Parent" })
      ).toExist(),
      Scene.expect(Scene.role("group", { name: "Apples" })).toExist()
    );
  });

  test("the Base UI Checkbox Group Nested Parent example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiCheckboxGroupNestedParentExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Checkbox Group Nested Parent" })
      ).toExist(),
      Scene.expect(Scene.role("group", { name: "User Permissions" })).toExist()
    );
  });

  test("the Checkbox Indeterminate example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(CheckboxIndeterminateExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Checkbox Indeterminate" })
      ).toExist(),
      Scene.expect(
        Scene.role("checkbox", { name: "All notification channels" })
      ).toExist()
    );
  });

  test("the Slider docs route renders docs and inline previews", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(SliderDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Slider" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Accessibility" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Coverage" })).toExist(),
      Scene.expect(Scene.role("slider", { name: "Rating" })).toHaveAttr(
        "aria-valuenow",
        "4"
      ),
      Scene.expect(Scene.role("slider", { name: "Volume" })).toHaveAttr(
        "aria-disabled",
        "true"
      ),
      Scene.expect(Scene.testId("docs-example-block-slider-basic")).toHaveClass(
        "flex-col"
      ),
      Scene.expect(
        Scene.testId("docs-example-block-slider-basic-preview")
      ).toHaveClass("min-h-20"),
      Scene.expect(
        Scene.testId("docs-example-block-slider-basic-actions")
      ).toHaveClass("mt-auto"),
      Scene.expect(
        Scene.testId("docs-example-block-slider-disabled")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-slider-disabled-actions")
      ).toHaveClass("border-t"),
      Scene.expect(Scene.text("View code")).toExist(),
      Scene.expect(Scene.text("View code")).toExist()
    );
  });

  test("the Slider Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(SliderBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Slider Basic" })).toExist(),
      Scene.expect(Scene.text("Rating: 4 of 10")).toExist()
    );
  });

  test("the Slider Disabled example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(SliderDisabledExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Slider Disabled" })
      ).toExist(),
      Scene.expect(Scene.text("Volume is locked.")).toExist()
    );
  });

  test("the Switch docs route renders docs and inline previews", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(SwitchDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Switch" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Accessibility" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Coverage" })).toExist(),
      Scene.expect(
        Scene.role("switch", { name: "Enable notifications" })
      ).toExist(),
      Scene.expect(
        Scene.role("switch", { name: "Locked notifications" })
      ).toBeDisabled(),
      Scene.expect(Scene.testId("docs-example-block-switch-basic")).toHaveClass(
        "flex-col"
      ),
      Scene.expect(
        Scene.testId("docs-example-block-switch-basic-preview")
      ).toHaveClass("min-h-20"),
      Scene.expect(
        Scene.testId("docs-example-block-switch-basic-actions")
      ).toHaveClass("mt-auto"),
      Scene.expect(
        Scene.testId("docs-example-block-switch-disabled")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-switch-disabled-actions")
      ).toHaveClass("border-t"),
      Scene.expect(Scene.text("View code")).toExist(),
      Scene.expect(Scene.text("View code")).toExist()
    );
  });

  test("the Switch Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(SwitchBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Switch Basic" })).toExist(),
      Scene.expect(
        Scene.role("switch", { name: "Enable notifications" })
      ).toExist()
    );
  });

  test("the Switch Disabled example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(SwitchDisabledExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Switch Disabled" })
      ).toExist(),
      Scene.expect(
        Scene.role("switch", { name: "Locked notifications" })
      ).toBeDisabled()
    );
  });

  test("the Tabs docs route renders docs and inline previews", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(TabsDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Tabs" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Accessibility" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Coverage" })).toExist(),
      Scene.expect(Scene.role("tab", { name: "Overview" })).toHaveAttr(
        "aria-selected",
        "true"
      ),
      Scene.expect(Scene.role("tab", { name: "Billing" })).toBeDisabled(),
      Scene.expect(Scene.testId("docs-example-block-tabs-basic")).toHaveClass(
        "flex-col"
      ),
      Scene.expect(
        Scene.testId("docs-example-block-tabs-basic-preview")
      ).toHaveClass("min-h-20"),
      Scene.expect(
        Scene.testId("docs-example-block-tabs-basic-actions")
      ).toHaveClass("mt-auto"),
      Scene.expect(Scene.testId("docs-example-block-tabs-manual")).toHaveClass(
        "flex-col"
      ),
      Scene.expect(
        Scene.testId("docs-example-block-tabs-manual-actions")
      ).toHaveClass("border-t"),
      Scene.expect(Scene.text("View code")).toExist(),
      Scene.expect(Scene.text("View code")).toExist()
    );
  });

  test("the Tabs Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(TabsBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Tabs Basic" })).toExist(),
      Scene.expect(Scene.text("Selected tab: Overview")).toExist()
    );
  });

  test("the Tabs Manual example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(TabsManualExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Tabs Manual" })).toExist(),
      Scene.expect(Scene.role("tab", { name: "Billing" })).toBeDisabled()
    );
  });

  test("the Tooltip docs route renders docs and inline previews", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(TooltipDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Tooltip" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Accessibility" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Coverage" })).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Hover or focus me" })
      ).toHaveAttr("aria-describedby", "tooltip-basic-panel"),
      Scene.expect(Scene.role("button", { name: "No delay" })).toHaveAttr(
        "aria-describedby",
        "tooltip-no-delay-panel"
      ),
      Scene.expect(
        Scene.testId("docs-example-block-tooltip-basic")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-tooltip-basic-preview")
      ).toHaveClass("min-h-20"),
      Scene.expect(
        Scene.testId("docs-example-block-tooltip-basic-actions")
      ).toHaveClass("mt-auto"),
      Scene.expect(
        Scene.testId("docs-example-block-tooltip-no-delay")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-tooltip-no-delay-actions")
      ).toHaveClass("border-t"),
      Scene.expect(Scene.text("View code")).toExist(),
      Scene.expect(Scene.text("View code")).toExist()
    );
  });

  test("the Tooltip Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(TooltipBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Tooltip Basic" })).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Hover or focus me" })
      ).toExist()
    );
  });

  test("the Tooltip No Delay example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(TooltipNoDelayExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Tooltip No Delay" })
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "No delay" })).toExist()
    );
  });

  test("simple component routes render the sidebar nav", () => {
    const routes: readonly Model["route"][] = [
      ButtonRoute(),
      CheckboxRoute(),
      DisclosureRoute(),
      FieldsetRoute(),
      InputRoute(),
      RadioGroupRoute(),
      SelectRoute(),
      SwitchRoute(),
      TextareaRoute(),
      AnimationRoute(),
    ];

    routes.forEach((route) => {
      Scene.scene(
        { update, view },
        Scene.with(modelForRoute(route)),
        Scene.expect(Scene.role("link", { name: "Button" })).toExist()
      );
    });
  });

  test("the Dialog docs route renders docs and the inline preview", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DialogDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Dialog" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Accessibility" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Coverage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Composition policy" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "RTL policy" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "AlertDialog policy" })
      ).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Command Dialog policy" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "Drawer policy" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Browser focus proof" })
      ).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Traceability checklist" })
      ).toExist(),
      Scene.expect(Scene.testId("docs-example-block-dialog-basic")).toHaveClass(
        "flex-col"
      ),
      Scene.expect(
        Scene.testId("docs-example-block-dialog-basic-preview")
      ).toHaveClass("min-h-20"),
      Scene.expect(
        Scene.testId("docs-example-block-dialog-basic-actions")
      ).toHaveClass("mt-auto"),
      Scene.expect(
        Scene.testId("docs-example-block-dialog-animated")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-dialog-animated-actions")
      ).toHaveClass("border-t"),
      Scene.expect(
        Scene.testId("docs-example-block-dialog-destructive")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-dialog-focus-actions")
      ).toHaveClass("mt-auto"),
      Scene.expect(
        Scene.testId("docs-example-block-dialog-scrollable-preview")
      ).toHaveClass("pt-6"),
      Scene.expect(Scene.role("button", { name: "Open dialog" })).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Open animated dialog" })
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Open delete dialog" })
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Open focus dialog" })
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Review permissions" })
      ).toExist(),
      Scene.expect(Scene.text("View code")).toExist(),
      Scene.expect(Scene.text("View code")).toExist(),
      Scene.expect(Scene.text("View code")).toExist(),
      Scene.expect(Scene.text("View code")).toExist(),
      Scene.expect(Scene.text("View code")).toExist()
    );
  });

  test("the Fieldset docs route renders docs and inline previews", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(FieldsetDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Fieldset" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Accessibility" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Coverage" })).toExist(),
      Scene.expect(Scene.role("group", { name: "Profile" })).toExist(),
      Scene.expect(
        Scene.role("textbox", { name: "Locked name" })
      ).toBeDisabled(),
      Scene.expect(
        Scene.testId("docs-example-block-fieldset-basic")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-fieldset-basic-preview")
      ).toHaveClass("min-h-20"),
      Scene.expect(
        Scene.testId("docs-example-block-fieldset-basic-actions")
      ).toHaveClass("mt-auto"),
      Scene.expect(
        Scene.testId("docs-example-block-fieldset-disabled")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-fieldset-disabled-actions")
      ).toHaveClass("border-t"),
      Scene.expect(Scene.text("View code")).toExist(),
      Scene.expect(Scene.text("View code")).toExist()
    );
  });

  test("the Fieldset Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(FieldsetBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Fieldset Basic" })).toExist(),
      Scene.expect(Scene.role("group", { name: "Profile" })).toExist()
    );
  });

  test("the Fieldset Disabled example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(FieldsetDisabledExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Fieldset Disabled" })
      ).toExist(),
      Scene.expect(
        Scene.role("textbox", { name: "Locked name" })
      ).toBeDisabled()
    );
  });

  test("the File Drop docs route renders docs and inline previews", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(FileDropDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "File Drop" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Accessibility" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Coverage" })).toExist(),
      Scene.expect(Scene.text("Drop files or click to browse")).toExist(),
      Scene.expect(Scene.text("File uploads disabled")).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-file-drop-basic")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-file-drop-basic-preview")
      ).toHaveClass("min-h-20"),
      Scene.expect(
        Scene.testId("docs-example-block-file-drop-basic-actions")
      ).toHaveClass("mt-auto"),
      Scene.expect(
        Scene.testId("docs-example-block-file-drop-disabled")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-file-drop-disabled-actions")
      ).toHaveClass("border-t"),
      Scene.expect(Scene.text("View code")).toExist(),
      Scene.expect(Scene.text("View code")).toExist()
    );
  });

  test("the File Drop Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(FileDropBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "File Drop Basic" })
      ).toExist(),
      Scene.expect(Scene.text("Drop files or click to browse")).toExist()
    );
  });

  test("the File Drop Disabled example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(FileDropDisabledExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "File Drop Disabled" })
      ).toExist(),
      Scene.expect(Scene.label("Upload files")).toBeDisabled()
    );
  });

  test("the Input docs route renders docs and inline previews", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(InputDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Input" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Accessibility" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Coverage" })).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Name" })).toExist(),
      Scene.expect(
        Scene.role("textbox", { name: "Disabled name" })
      ).toBeDisabled(),
      Scene.expect(Scene.testId("docs-example-block-input-basic")).toHaveClass(
        "flex-col"
      ),
      Scene.expect(
        Scene.testId("docs-example-block-input-basic-preview")
      ).toHaveClass("min-h-20"),
      Scene.expect(
        Scene.testId("docs-example-block-input-basic-actions")
      ).toHaveClass("mt-auto"),
      Scene.expect(
        Scene.testId("docs-example-block-input-disabled")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-input-disabled-actions")
      ).toHaveClass("border-t"),
      Scene.expect(Scene.text("View code")).toExist(),
      Scene.expect(Scene.text("View code")).toExist()
    );
  });

  test("the Input Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(InputBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Input Basic" })).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Name" })).toExist()
    );
  });

  test("the Input Disabled example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(InputDisabledExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Input Disabled" })).toExist(),
      Scene.expect(
        Scene.role("textbox", { name: "Disabled name" })
      ).toBeDisabled()
    );
  });

  test("the Input Group docs route renders docs and upstream example previews", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(InputGroupDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Input Group" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Search" })).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Search pages" })).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-input-group-custom-input")
      ).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-input-group-dropdown")
      ).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-input-group-textarea")
      ).toExist(),
      Scene.expect(Scene.text("View code")).toExist()
    );
  });

  test("the Input Group Custom Input example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(InputGroupCustomInputExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Input Group Custom Input" })
      ).toExist(),
      Scene.expect(
        Scene.role("textbox", { name: "Custom message" })
      ).toHaveAttr("data-slot", "input-group-control")
    );
  });

  test("the Input Group Dropdown example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(InputGroupDropdownExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Input Group Dropdown" })
      ).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Search" })).toExist(),
      Scene.expect(Scene.text("Search In...")).toExist()
    );
  });

  test("the Input Group Textarea example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(InputGroupTextareaExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Input Group Textarea" })
      ).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Script" })).toHaveValue(
        "console.log('Hello, world!')"
      )
    );
  });

  test("the Meter docs route renders Base UI docs and hero preview", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(MeterDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Meter" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.text("Base UI")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "Anatomy" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Keyboard interaction" })
      ).not.toExist(),
      Scene.expect(Scene.text("locale")).toExist(),
      Scene.expect(Scene.text("format")).toExist(),
      Scene.expect(Scene.text("data-metering")).toExist(),
      Scene.expect(Scene.text("data-complete")).toExist(),
      Scene.expect(Scene.role("meter", { name: "Storage Used" })).toHaveAttr(
        "aria-valuenow",
        "24"
      ),
      Scene.expect(Scene.role("meter", { name: "Storage Used" })).toHaveAttr(
        "aria-valuetext",
        "24%"
      ),
      Scene.expect(Scene.text("View code")).toExist()
    );
  });

  test("the Meter Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(MeterBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Meter Basic" })).toExist(),
      Scene.expect(Scene.text("Storage Used")).toExist(),
      Scene.expect(Scene.role("meter", { name: "Storage Used" })).toHaveAttr(
        "aria-valuenow",
        "24"
      ),
      Scene.expect(Scene.role("meter", { name: "Storage Used" })).toHaveAttr(
        "aria-valuetext",
        "24%"
      )
    );
  });

  test("the Scroll Area docs route renders Base UI docs and hero preview", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ScrollAreaDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Scroll Area" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.text("Base UI")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "Anatomy" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Keyboard interaction" })
      ).not.toExist(),
      Scene.expect(Scene.text("dynamic overflow measurement")).toExist(),
      Scene.expect(
        Scene.role("region", { name: "Vernacular architecture excerpt" })
      ).toHaveAttr("tabindex", "0"),
      Scene.expect(Scene.text("View code")).toExist()
    );
  });

  test("the Scroll Area Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ScrollAreaBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Scroll Area Basic" })
      ).toExist(),
      Scene.expect(
        Scene.role("region", { name: "Vernacular architecture excerpt" })
      ).toExist()
    );
  });

  test("the Scroll Area Both Scrollbars example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ScrollAreaBothScrollbarsExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Scroll Area Both Scrollbars" })
      ).toExist(),
      Scene.expect(
        Scene.role("region", { name: "Two axis content" })
      ).toExist(),
      Scene.expect(Scene.text("Column E")).toExist()
    );
  });

  test("the Scroll Area Gradient example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ScrollAreaGradientExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Scroll Area Gradient" })
      ).toExist(),
      Scene.expect(
        Scene.role("region", { name: "Gradient scroll fade" })
      ).toExist(),
      Scene.expect(Scene.text("Stone croft")).toExist()
    );
  });

  test("the Scroll Area Tabs example route renders and changes tabs", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ScrollAreaTabsExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Scroll Area Tabs" })
      ).toExist(),
      Scene.expect(Scene.role("tab", { name: "Account" })).toHaveAttr(
        "aria-selected",
        "true"
      ),
      Scene.expect(
        Scene.role("region", { name: "Account settings" })
      ).toExist(),
      Scene.click(Scene.role("tab", { name: "Notifications" })),
      Scene.Command.resolve(
        BaseUiTabs.FocusTab({ id: "scroll-area-tabs", index: 2 }),
        BaseUiTabs.CompletedFocusTab(),
        (message) =>
          GotScrollAreaTabsExampleMessage({
            message: ScrollAreaTabsExample.GotTabsMessage({ message }),
          })
      ),
      Scene.expect(Scene.role("tab", { name: "Notifications" })).toHaveAttr(
        "aria-selected",
        "true"
      ),
      Scene.expect(
        Scene.role("region", { name: "Notifications settings" })
      ).toExist(),
      Scene.expect(Scene.text("Security alerts")).toExist()
    );
  });

  test("the Toggle docs route renders Base UI docs and hero preview", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ToggleDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Toggle" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.text("Base UI")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "Anatomy" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Keyboard interaction" })
      ).not.toExist(),
      Scene.expect(Scene.role("button", { name: "Favorite" })).toHaveAttr(
        "aria-pressed",
        "false"
      ),
      Scene.click(Scene.role("button", { name: "Favorite" })),
      Scene.expect(Scene.role("button", { name: "Favorite" })).toHaveAttr(
        "aria-pressed",
        "true"
      ),
      Scene.expect(Scene.text("View code")).toExist()
    );
  });

  test("the Toggle Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ToggleBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Toggle Basic" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Favorite" })).toHaveAttr(
        "aria-pressed",
        "false"
      )
    );
  });

  test("the Toggle Group docs route renders Base UI docs and hero preview", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ToggleGroupDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Toggle Group" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.text("Base UI")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "Anatomy" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Keyboard interaction" })
      ).not.toExist(),
      Scene.expect(Scene.role("group", { name: "Text alignment" })).toExist(),
      Scene.click(Scene.role("button", { name: "Align right" })),
      Scene.expect(Scene.role("button", { name: "Align right" })).toHaveAttr(
        "aria-pressed",
        "true"
      ),
      Scene.expect(Scene.text("View code")).toExist()
    );
  });

  test("the Toggle Group Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ToggleGroupBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Toggle Group Basic" })
      ).toExist(),
      Scene.expect(Scene.role("group", { name: "Text alignment" })).toExist()
    );
  });

  test("the Radio docs route renders Base UI docs and hero preview", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(RadioDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Radio" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.text("Base UI")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "Anatomy" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Keyboard interaction" })
      ).not.toExist(),
      Scene.expect(Scene.role("radiogroup", { name: "Best apple" })).toExist(),
      Scene.click(Scene.text("Granny Smith")),
      Scene.expect(Scene.role("radio", { name: "Granny Smith" })).toHaveAttr(
        "aria-checked",
        "true"
      ),
      Scene.expect(Scene.text("View code")).toExist()
    );
  });

  test("the Radio Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(RadioBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Radio Basic" })).toExist(),
      Scene.expect(Scene.role("radiogroup", { name: "Best apple" })).toExist()
    );
  });

  test("the Toolbar docs route renders Base UI docs and hero preview", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ToolbarDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Toolbar" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.text("Base UI")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "Anatomy" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Keyboard interaction" })
      ).not.toExist(),
      Scene.expect(Scene.role("toolbar", { name: "Editor toolbar" })).toExist(),
      Scene.click(Scene.role("button", { name: "Align right" })),
      Scene.change(Scene.role("textbox", { name: "Font family" }), "Arial"),
      Scene.expect(Scene.role("textbox", { name: "Font family" })).toHaveValue(
        "Arial"
      ),
      Scene.expect(Scene.text("View code")).toExist()
    );
  });

  test("the Toolbar Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ToolbarBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Toolbar Basic" })).toExist(),
      Scene.expect(Scene.role("toolbar", { name: "Editor toolbar" })).toExist()
    );
  });

  test("the Progress docs route renders Base UI docs and hero preview", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ProgressDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Progress" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.text("Base UI")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Anatomy" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Keyboard interaction" })
      ).not.toExist(),
      Scene.expect(Scene.text("labelClasses")).toExist(),
      Scene.expect(Scene.text("labelStyle")).toExist(),
      Scene.expect(Scene.text("indicatorStyle")).toExist(),
      Scene.expect(Scene.text("data-progressing")).toExist(),
      Scene.expect(Scene.text("data-complete")).toExist(),
      Scene.expect(
        Scene.role("progressbar", { name: "Export data" })
      ).toHaveAttr("aria-valuenow", "20"),
      Scene.expect(
        Scene.role("progressbar", { name: "Export data" })
      ).toHaveAttr("aria-valuetext", "20%"),
      Scene.expect(Scene.text("View code")).toExist()
    );
  });

  test("the Progress Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ProgressBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Progress Basic" })).toExist(),
      Scene.expect(Scene.text("Export data")).toExist(),
      Scene.expect(
        Scene.role("progressbar", { name: "Export data" })
      ).toHaveAttr("aria-valuenow", "20"),
      Scene.expect(
        Scene.role("progressbar", { name: "Export data" })
      ).toHaveAttr("aria-valuetext", "20%")
    );
  });

  test("the Kbd Input Group example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(KbdInputGroupExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Kbd Input Group" })
      ).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Search" })).toExist(),
      Scene.expect(Scene.text("⌘")).toExist(),
      Scene.expect(Scene.text("K")).toExist()
    );
  });

  test("the Empty Input Group example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(EmptyInputGroupExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Empty Input Group" })
      ).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "404 - Not Found" })
      ).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Search pages" })).toExist()
    );
  });

  test("the Empty example routes render standalone examples", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(EmptyAvatarExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Empty Avatar" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "User Offline" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Leave Message" })).toExist()
    );

    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(EmptyAvatarGroupExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Empty Avatar Group" })
      ).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "No Team Members" })
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "Invite Members" })).toExist()
    );

    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(EmptyOutlineExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Empty Outline" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Cloud Storage Empty" })
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "Upload Files" })).toExist()
    );

    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(EmptyBackgroundExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Empty Background" })
      ).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "No Notifications" })
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "Refresh" })).toExist()
    );

    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(EmptyRtlExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Empty RTL" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "لا توجد مشاريع بعد" })
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "إنشاء مشروع" })).toExist()
    );
  });

  test("the Kbd and Empty docs routes include the input-group examples", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(KbdDocsRoute())),
      Scene.expect(Scene.testId("docs-example-block-kbd-input-group")).toExist()
    );

    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(EmptyDocsRoute())),
      Scene.expect(Scene.testId("docs-example-block-empty-avatar")).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-empty-avatar-group")
      ).toExist(),
      Scene.expect(Scene.testId("docs-example-block-empty-outline")).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-empty-background")
      ).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-empty-input-group")
      ).toExist(),
      Scene.expect(Scene.testId("docs-example-block-empty-rtl")).toExist()
    );
  });

  test("the Textarea docs route renders docs and inline previews", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(TextareaDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Textarea" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Accessibility" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Coverage" })).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Bio" })).toExist(),
      Scene.expect(
        Scene.role("textbox", { name: "Disabled bio" })
      ).toBeDisabled(),
      Scene.expect(
        Scene.testId("docs-example-block-textarea-basic")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-textarea-basic-preview")
      ).toHaveClass("min-h-20"),
      Scene.expect(
        Scene.testId("docs-example-block-textarea-basic-actions")
      ).toHaveClass("mt-auto"),
      Scene.expect(
        Scene.testId("docs-example-block-textarea-disabled")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-textarea-disabled-actions")
      ).toHaveClass("border-t"),
      Scene.expect(Scene.text("View code")).toExist(),
      Scene.expect(Scene.text("View code")).toExist()
    );
  });

  test("the Textarea Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(TextareaBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Textarea Basic" })).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Bio" })).toExist()
    );
  });

  test("the Textarea Disabled example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(TextareaDisabledExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Textarea Disabled" })
      ).toExist(),
      Scene.expect(
        Scene.role("textbox", { name: "Disabled bio" })
      ).toBeDisabled()
    );
  });

  test("the Combobox docs route renders docs and inline previews", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ComboboxDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Combobox" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Accessibility" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Coverage" })).toExist(),
      Scene.expect(Scene.placeholder("Search cities...")).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-combobox-basic")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-combobox-basic-preview")
      ).toHaveClass("min-h-20"),
      Scene.expect(
        Scene.testId("docs-example-block-combobox-basic-actions")
      ).toHaveClass("mt-auto"),
      Scene.expect(
        Scene.testId("docs-example-block-combobox-multi")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-combobox-multi-actions")
      ).toHaveClass("border-t"),
      Scene.expect(Scene.text("View code")).toExist(),
      Scene.expect(Scene.text("View code")).toExist(),
      resolveComboboxBasicPreventBlurMount(),
      resolveComboboxMultiPreventBlurMount()
    );
  });

  test("the Combobox Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ComboboxBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Combobox Basic" })).toExist(),
      Scene.expect(Scene.placeholder("Search cities...")).toExist(),
      resolveComboboxBasicPreventBlurMount()
    );
  });

  test("the Base UI Combobox Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiComboboxBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Combobox Basic" })
      ).toExist(),
      Scene.expect(Scene.text("Choose a fruit")).toExist(),
      Scene.expect(Scene.placeholder("e.g. Apple")).toExist(),
      Scene.expect(
        Scene.text("Selected fruit: No fruit selected")
      ).not.toExist(),
      resolveBaseUiComboboxBasicPreventBlurMount()
    );
  });

  test("the Combobox Multi example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ComboboxMultiExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Combobox Multi" })).toExist(),
      Scene.expect(Scene.placeholder("Search cities...")).toExist(),
      resolveComboboxMultiPreventBlurMount()
    );
  });

  test("the Dialog Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DialogBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Dialog Basic" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Open dialog" })).toExist()
    );
  });

  test("the Base UI Dialog Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiDialogBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Dialog Basic" })
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "View notifications" })
      ).toExist(),
      Scene.expect(Scene.text("Good job!")).not.toExist()
    );
  });

  test("the shadcn Dialog Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ShadcnDialogBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "shadcn Dialog Basic" })
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "Open Dialog" })).toExist()
    );
  });

  test("the Base UI Dialog Close Confirmation example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiDialogCloseConfirmationExampleRoute())),
      Scene.expect(
        Scene.role("heading", {
          name: "Base UI Dialog Close Confirmation",
        })
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Tweet" })),
      Scene.Command.resolve(
        BaseUiDialogCloseConfirmationTweetShowDialog,
        Dialog.CompletedShowDialog(),
        (message) =>
          GotBaseUiDialogCloseConfirmationExampleMessage({
            message: BaseUiDialogCloseConfirmationExample.GotTweetDialogMessage(
              {
                message,
              }
            ),
          })
      ),
      Scene.expect(Scene.role("dialog", { name: "New tweet" })).toExist()
    );
  });

  test("the Base UI Dialog Nested example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiDialogNestedExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Dialog Nested" })
      ).toExist(),
      Scene.click(Scene.role("button", { name: "View notifications" })),
      Scene.Command.resolve(
        BaseUiDialogNestedNotificationsShowDialog,
        Dialog.CompletedShowDialog(),
        (message) =>
          GotBaseUiDialogNestedExampleMessage({
            message: BaseUiDialogNestedExample.GotNotificationsDialogMessage({
              message,
            }),
          })
      ),
      Scene.expect(Scene.role("dialog", { name: "Notifications" })).toExist(),
      Scene.click(Scene.role("button", { name: "View details" })),
      Scene.Command.resolve(
        BaseUiDialogNestedDetailsShowDialog,
        Dialog.CompletedShowDialog(),
        (message) =>
          GotBaseUiDialogNestedExampleMessage({
            message: BaseUiDialogNestedExample.GotDetailsDialogMessage({
              message,
            }),
          })
      ),
      Scene.expect(
        Scene.role("dialog", { name: "Notification details" })
      ).toExist()
    );
  });

  test("the Dialog Animated example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DialogAnimatedExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Dialog Animated" })
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Open animated dialog" })
      ).toExist()
    );
  });

  test("the Dialog Destructive example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DialogDestructiveExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Dialog Destructive" })
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Open delete dialog" })
      ).toExist()
    );
  });

  test("the Dialog Focus example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DialogFocusExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Dialog Focus" })).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Open focus dialog" })
      ).toExist()
    );
  });

  test("the Dialog Scrollable example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DialogScrollableExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Dialog Scrollable" })
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Review permissions" })
      ).toExist()
    );
  });

  test("the Disclosure docs route renders docs and inline previews", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DisclosureDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Disclosure" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Accessibility" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Coverage" })).toExist(),
      Scene.expect(Scene.text("Disclosure is closed.")).toExist(),
      Scene.expect(Scene.text("Disclosure is locked.")).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-disclosure-basic")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-disclosure-basic-preview")
      ).toHaveClass("min-h-20"),
      Scene.expect(
        Scene.testId("docs-example-block-disclosure-basic-actions")
      ).toHaveClass("mt-auto"),
      Scene.expect(
        Scene.testId("docs-example-block-disclosure-disabled")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-disclosure-disabled-actions")
      ).toHaveClass("border-t"),
      Scene.expect(Scene.text("View code")).toExist(),
      Scene.expect(Scene.text("View code")).toExist()
    );
  });

  test("the Disclosure Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DisclosureBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Disclosure Basic" })
      ).toExist(),
      Scene.expect(Scene.text("Disclosure is closed.")).toExist()
    );
  });

  test("the Disclosure Disabled example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DisclosureDisabledExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Disclosure Disabled" })
      ).toExist(),
      Scene.expect(Scene.text("Disclosure is locked.")).toExist()
    );
  });

  test("the Drag and Drop docs route renders docs and inline previews", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DragAndDropDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Drag and Drop" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Accessibility" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Coverage" })).toExist(),
      Scene.expect(Scene.text("Task order: Plan, Build, Verify")).toExist(),
      Scene.expect(Scene.text("Task order is locked.")).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-drag-and-drop-basic")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-drag-and-drop-basic-preview")
      ).toHaveClass("min-h-20"),
      Scene.expect(
        Scene.testId("docs-example-block-drag-and-drop-basic-actions")
      ).toHaveClass("mt-auto"),
      Scene.expect(
        Scene.testId("docs-example-block-drag-and-drop-disabled")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-drag-and-drop-disabled-actions")
      ).toHaveClass("border-t"),
      Scene.expect(Scene.text("View code")).toExist(),
      Scene.expect(Scene.text("View code")).toExist()
    );
  });

  test("the Drag and Drop Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DragAndDropBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Drag and Drop Basic" })
      ).toExist(),
      Scene.expect(Scene.text("Task order: Plan, Build, Verify")).toExist()
    );
  });

  test("the Drag and Drop Disabled example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(DragAndDropDisabledExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Drag and Drop Disabled" })
      ).toExist(),
      Scene.expect(Scene.text("Task order is locked.")).toExist()
    );
  });

  test("the Menu docs route renders docs and inline previews", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(MenuDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Menu" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Accessibility" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Coverage" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Open menu" })).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Open animated menu" })
      ).toExist(),
      Scene.expect(Scene.testId("docs-example-block-menu-basic")).toHaveClass(
        "flex"
      ),
      Scene.expect(Scene.testId("docs-example-block-menu-basic")).toHaveClass(
        "flex-col"
      ),
      Scene.expect(
        Scene.testId("docs-example-block-menu-basic-preview")
      ).toHaveClass("min-h-20"),
      Scene.expect(
        Scene.testId("docs-example-block-menu-basic-preview")
      ).toHaveClass("pt-6"),
      Scene.expect(
        Scene.testId("docs-example-block-menu-basic-actions")
      ).toHaveClass("mt-auto"),
      Scene.expect(
        Scene.testId("docs-example-block-menu-basic-actions")
      ).toHaveClass("border-t"),
      Scene.expect(
        Scene.testId("docs-example-block-menu-animated")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-menu-animated-preview")
      ).toHaveClass("min-h-20"),
      Scene.expect(
        Scene.testId("docs-example-block-menu-animated-actions")
      ).toHaveClass("mt-auto"),
      Scene.expect(Scene.text("View code")).toExist(),
      Scene.expect(Scene.text("View code")).toExist()
    );
  });

  test("the Listbox docs route renders docs and inline previews", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ListboxDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Listbox" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Accessibility" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Coverage" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Choose person" })).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Choose animated person" })
      ).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-listbox-basic")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-listbox-basic-preview")
      ).toHaveClass("min-h-20"),
      Scene.expect(
        Scene.testId("docs-example-block-listbox-basic-actions")
      ).toHaveClass("mt-auto"),
      Scene.expect(
        Scene.testId("docs-example-block-listbox-animated")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-listbox-animated-actions")
      ).toHaveClass("border-t"),
      Scene.expect(Scene.text("View code")).toExist(),
      Scene.expect(Scene.text("View code")).toExist()
    );
  });

  test("the Listbox Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ListboxBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Listbox Basic" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Choose person" })).toExist()
    );
  });

  test("the Listbox Animated example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(ListboxAnimatedExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Listbox Animated" })
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Choose animated person" })
      ).toExist()
    );
  });

  test("the Radio Group docs route renders docs and inline previews", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(RadioGroupDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Radio Group" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Accessibility" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Coverage" })).toExist(),
      Scene.expect(Scene.role("radio", { name: "Startup" })).toExist(),
      Scene.expect(Scene.role("radio", { name: "Spacious" })).toBeDisabled(),
      Scene.expect(
        Scene.testId("docs-example-block-radio-group-basic")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-radio-group-basic-preview")
      ).toHaveClass("min-h-20"),
      Scene.expect(
        Scene.testId("docs-example-block-radio-group-basic-actions")
      ).toHaveClass("mt-auto"),
      Scene.expect(
        Scene.testId("docs-example-block-radio-group-horizontal")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-radio-group-horizontal-actions")
      ).toHaveClass("border-t"),
      Scene.expect(Scene.text("View code")).toExist(),
      Scene.expect(Scene.text("View code")).toExist()
    );
  });

  test("the Radio Group Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(RadioGroupBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Radio Group Basic" })
      ).toExist(),
      Scene.expect(Scene.role("radio", { name: "Startup" })).toExist()
    );
  });

  test("the Radio Group Horizontal example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(RadioGroupHorizontalExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Radio Group Horizontal" })
      ).toExist(),
      Scene.expect(Scene.role("radio", { name: "Spacious" })).toBeDisabled()
    );
  });

  test("the Select docs route renders docs and inline previews", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(SelectDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Select" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Accessibility" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Coverage" })).toExist(),
      Scene.expect(Scene.role("combobox", { name: "Region" })).toExist(),
      Scene.expect(Scene.role("combobox", { name: "Plan" })).toBeDisabled(),
      Scene.expect(Scene.testId("docs-example-block-select-basic")).toHaveClass(
        "flex-col"
      ),
      Scene.expect(
        Scene.testId("docs-example-block-select-basic-preview")
      ).toHaveClass("min-h-20"),
      Scene.expect(
        Scene.testId("docs-example-block-select-basic-actions")
      ).toHaveClass("mt-auto"),
      Scene.expect(
        Scene.testId("docs-example-block-select-disabled")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-select-disabled-actions")
      ).toHaveClass("border-t"),
      Scene.expect(Scene.text("View code")).toExist(),
      Scene.expect(Scene.text("View code")).toExist()
    );
  });

  test("the Select Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(SelectBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Select Basic" })).toExist(),
      Scene.expect(Scene.role("combobox", { name: "Region" })).toExist()
    );
  });

  test("the Select Disabled example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(SelectDisabledExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Select Disabled" })
      ).toExist(),
      Scene.expect(Scene.role("combobox", { name: "Plan" })).toBeDisabled()
    );
  });

  test("the Menu Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(MenuBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Menu Basic" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Open menu" })).toExist()
    );
  });

  test("the Base UI Menu Nested example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiMenuNestedExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Menu Nested" })
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Song" })),
      Scene.click(Scene.text("Add to Playlist")),
      Scene.expect(Scene.text("Nightcall")).toExist(),
      Scene.click(Scene.text("Nightcall")),
      Scene.expect(Scene.text("Selected: Nightcall")).toExist()
    );
  });

  test("the Menu Animated example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(MenuAnimatedExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Menu Animated" })).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Open animated menu" })
      ).toExist()
    );
  });

  test("the Popover docs route renders docs and inline previews", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(PopoverDocsRoute())),
      Scene.expect(Scene.role("heading", { name: "Popover" })).toExist(),
      Scene.expect(Scene.text("Registry component")).toExist(),
      Scene.expect(Scene.role("heading", { name: "Overview" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Examples" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Installation" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Usage" })).toExist(),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit integration" })
      ).toExist(),
      Scene.expect(Scene.role("heading", { name: "API reference" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Accessibility" })).toExist(),
      Scene.expect(Scene.role("heading", { name: "Coverage" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Open popover" })).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Open animated popover" })
      ).toExist(),
      Scene.expect(
        Scene.testId("docs-example-block-popover-basic")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-popover-basic-preview")
      ).toHaveClass("min-h-20"),
      Scene.expect(
        Scene.testId("docs-example-block-popover-basic-actions")
      ).toHaveClass("mt-auto"),
      Scene.expect(
        Scene.testId("docs-example-block-popover-animated")
      ).toHaveClass("flex-col"),
      Scene.expect(
        Scene.testId("docs-example-block-popover-animated-actions")
      ).toHaveClass("border-t"),
      Scene.expect(Scene.text("View code")).toExist(),
      Scene.expect(Scene.text("View code")).toExist()
    );
  });

  test("the Popover Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(PopoverBasicExampleRoute())),
      Scene.expect(Scene.role("heading", { name: "Popover Basic" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Open popover" })).toExist()
    );
  });

  test("the Base UI Popover Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiPopoverBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Popover Basic" })
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "Notifications" })).toExist(),
      Scene.expect(Scene.text("Good job!")).not.toExist()
    );
  });

  test("the Base UI Popover Animated example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiPopoverAnimatedExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Popover Animated" })
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "Notifications" })).toExist()
    );
  });

  test("the Base UI Popover Detached Trigger example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiPopoverDetachedTriggerExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Popover Detached Trigger" })
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Trigger outside root" })),
      Scene.expect(Scene.text("Detached trigger")).toExist()
    );
  });

  test("the Base UI Popover Multiple Triggers example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiPopoverMultipleTriggersExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Popover Multiple Triggers" })
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Trigger 1" })),
      Scene.expect(Scene.text("Content for Trigger 1")).toExist(),
      Scene.click(Scene.role("button", { name: "Trigger 2" })),
      Scene.expect(Scene.text("Content for Trigger 2")).toExist(),
      Scene.click(Scene.role("button", { name: "Close" })),
      Scene.expect(Scene.text("Content for Trigger 2")).not.toExist()
    );
  });

  test("the Base UI Popover Open on Hover example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiPopoverOpenOnHoverExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Popover Open on Hover" })
      ).toExist(),
      Scene.hover(Scene.role("button", { name: "Hover me" })),
      Scene.expect(Scene.text("Popover opened on hover")).toExist()
    );
  });

  test("the Base UI Radio Basic example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiRadioBasicExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Radio Basic" })
      ).toExist(),
      Scene.expect(Scene.text("Best apple")).toExist(),
      Scene.expect(Scene.role("radio", { name: "Fuji" })).toBeChecked(),
      Scene.expect(Scene.text("Sweet and crisp.")).not.toExist()
    );
  });

  test("the Base UI Radio Labeling example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiRadioLabelingExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Radio Labeling" })
      ).toExist(),
      Scene.expect(Scene.text("Storage type")).toExist(),
      Scene.expect(Scene.role("radio", { name: "SSD" })).toBeChecked(),
      Scene.expect(Scene.role("radio", { name: "HDD" })).not.toBeChecked()
    );
  });

  test("the Base UI Radio Native Button example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiRadioNativeButtonExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Radio Native Button" })
      ).toExist(),
      Scene.expect(Scene.text("Storage type")).toExist(),
      Scene.expect(Scene.role("radio", { name: "SSD" })).toBeChecked(),
      Scene.expect(Scene.role("radio", { name: "HDD" })).not.toBeChecked()
    );
  });

  test("the Base UI Radio Form example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(BaseUiRadioFormExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Base UI Radio Form" })
      ).toExist(),
      Scene.expect(Scene.text("Storage type")).toExist(),
      Scene.expect(Scene.role("radio", { name: "SSD" })).toBeChecked(),
      Scene.expect(Scene.role("radio", { name: "HDD" })).not.toBeChecked()
    );
  });

  test("the Popover Animated example route renders the standalone example", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(PopoverAnimatedExampleRoute())),
      Scene.expect(
        Scene.role("heading", { name: "Popover Animated" })
      ).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Open animated popover" })
      ).toExist()
    );
  });

  test("the new component authoring route updates the scaffold checklist", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(NewComponentAuthoringRoute())),
      Scene.expect(
        Scene.role("heading", { name: "New component interface" })
      ).toExist(),
      Scene.expect(
        Scene.text("registry/foldkit/ui/example-panel/index.ts")
      ).toExist(),
      Scene.change(
        Scene.role("textbox", { name: "Component name" }),
        "Command Menu"
      ),
      Scene.expect(
        Scene.text("registry/foldkit/ui/command-menu/index.ts")
      ).toExist(),
      Scene.change(Scene.role("combobox", { name: "Origin" }), "shadcn"),
      Scene.expect(Scene.role("combobox", { name: "Origin" })).toHaveValue(
        "shadcn"
      ),
      Scene.expect(Scene.text("bun run build:registry")).toExist(),
      Scene.expect(Scene.text("bun run check:registry")).toExist(),
      Scene.expect(Scene.text("bun run typecheck")).toExist(),
      Scene.expect(Scene.text("bun run test")).toExist(),
      Scene.expect(Scene.text("bun run build")).toExist()
    );
  });

  test("the NotFound route renders the 404 panel and a Go Home link", () => {
    Scene.scene(
      { update, view },
      Scene.with(modelForRoute(NotFoundRoute({ path: "/oops" }))),
      Scene.expect(
        Scene.role("heading", { name: "404 — Page Not Found" })
      ).toExist(),
      Scene.expect(Scene.text('The path "/oops" was not found.')).toExist(),
      Scene.expect(Scene.role("link", { name: "Go Home" })).toExist()
    );
  });
});
