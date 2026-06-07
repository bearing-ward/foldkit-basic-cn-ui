import { Effect, Match as M, Schema as S, pipe } from "effect";
import type { Runtime } from "foldkit";
import { Calendar, Command, Route, Subscription, Ui } from "foldkit";
import { m } from "foldkit/message";
import { UrlRequest, load, pushUrl } from "foldkit/navigation";
import { literal, r, slash } from "foldkit/route";
import { evo } from "foldkit/struct";
import { Url, toString as urlToString } from "foldkit/url";

import * as AccordionBasicExample from "../registry/default/examples/accordion-basic/main";
import * as AccordionMultipleExample from "../registry/default/examples/accordion-multiple/main";
import * as AlertBasicExample from "../registry/default/examples/alert-basic/main";
import * as AlertDestructiveExample from "../registry/default/examples/alert-destructive/main";
import * as AlertDialogBasicExample from "../registry/default/examples/alert-dialog-basic/main";
import * as AnimationBasicExample from "../registry/default/examples/animation-basic/main";
import * as AspectRatioBasicExample from "../registry/default/examples/aspect-ratio-basic/main";
import * as AspectRatioPortraitExample from "../registry/default/examples/aspect-ratio-portrait/main";
import * as AspectRatioRtlExample from "../registry/default/examples/aspect-ratio-rtl/main";
import * as AspectRatioSquareExample from "../registry/default/examples/aspect-ratio-square/main";
import * as AutocompleteBasicExample from "../registry/default/examples/autocomplete-basic/main";
import * as AvatarBasicExample from "../registry/default/examples/avatar-basic/main";
import * as BadgeBasicExample from "../registry/default/examples/badge-basic/main";
import * as BadgeSpinnerExample from "../registry/default/examples/badge-spinner/main";
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
import * as EmptyBasicExample from "../registry/default/examples/empty-basic/main";
import * as EmptyInputGroupExample from "../registry/default/examples/empty-input-group/main";
import * as FieldBasicExample from "../registry/default/examples/field-basic/main";
import * as FieldsetBasicExample from "../registry/default/examples/fieldset-basic/main";
import * as FieldsetDisabledExample from "../registry/default/examples/fieldset-disabled/main";
import * as FileDropBasicExample from "../registry/default/examples/file-drop-basic/main";
import * as FileDropDisabledExample from "../registry/default/examples/file-drop-disabled/main";
import * as FormBasicExample from "../registry/default/examples/form-basic/main";
import * as HoverCardBasicExample from "../registry/default/examples/hover-card-basic/main";
import * as InputBasicExample from "../registry/default/examples/input-basic/main";
import * as InputDisabledExample from "../registry/default/examples/input-disabled/main";
import * as InputOtpBasicExample from "../registry/default/examples/input-otp-basic/main";
import * as ItemAvatarExample from "../registry/default/examples/item-avatar/main";
import * as ItemBasicExample from "../registry/default/examples/item-basic/main";
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
import * as LabelBasicExample from "../registry/default/examples/label-basic/main";
import * as ListboxAnimatedExample from "../registry/default/examples/listbox-animated/main";
import * as ListboxBasicExample from "../registry/default/examples/listbox-basic/main";
import * as MenuAnimatedExample from "../registry/default/examples/menu-animated/main";
import * as MenuBasicExample from "../registry/default/examples/menu-basic/main";
import * as MenubarBasicExample from "../registry/default/examples/menubar-basic/main";
import * as MeterBasicExample from "../registry/default/examples/meter-basic/main";
import * as NativeSelectBasicExample from "../registry/default/examples/native-select-basic/main";
import * as NavigationMenuBasicExample from "../registry/default/examples/navigation-menu-basic/main";
import * as NumberFieldBasicExample from "../registry/default/examples/number-field-basic/main";
import * as OtpFieldBasicExample from "../registry/default/examples/otp-field-basic/main";
import * as PaginationBasicExample from "../registry/default/examples/pagination-basic/main";
import * as PopoverAnimatedExample from "../registry/default/examples/popover-animated/main";
import * as PopoverBasicExample from "../registry/default/examples/popover-basic/main";
import * as PreviewCardBasicExample from "../registry/default/examples/preview-card-basic/main";
import * as ProgressBasicExample from "../registry/default/examples/progress-basic/main";
import * as RadioBasicExample from "../registry/default/examples/radio-basic/main";
import * as RadioGroupBasicExample from "../registry/default/examples/radio-group-basic/main";
import * as RadioGroupHorizontalExample from "../registry/default/examples/radio-group-horizontal/main";
import * as ResizableBasicExample from "../registry/default/examples/resizable-basic/main";
import * as ScrollAreaBasicExample from "../registry/default/examples/scroll-area-basic/main";
import * as SelectBasicExample from "../registry/default/examples/select-basic/main";
import * as SelectDisabledExample from "../registry/default/examples/select-disabled/main";
import * as SeparatorBasicExample from "../registry/default/examples/separator-basic/main";
import * as SheetBasicExample from "../registry/default/examples/sheet-basic/main";
import * as SidebarBasicExample from "../registry/default/examples/sidebar-basic/main";
import * as SkeletonBasicExample from "../registry/default/examples/skeleton-basic/main";
import * as SliderBasicExample from "../registry/default/examples/slider-basic/main";
import * as SliderDisabledExample from "../registry/default/examples/slider-disabled/main";
import * as SonnerBasicExample from "../registry/default/examples/sonner-basic/main";
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
import { uiInit } from "./ui/init";
import { GotMobileMenuDialogMessage, UiMessage } from "./ui/message";
import { UiModel } from "./ui/model";
import * as UiSubscriptions from "./ui/subscriptions";
import { uiUpdate } from "./ui/update";

// ROUTE

export const HomeRoute = r("Home");
export const AccordionDocsRoute = r("AccordionDocs");
export const ShadcnAccordionDocsRoute = r("ShadcnAccordionDocs");
export const AccordionBasicExampleRoute = r("AccordionBasicExample");
export const AccordionMultipleExampleRoute = r("AccordionMultipleExample");
export const AlertDocsRoute = r("AlertDocs");
export const AlertBasicExampleRoute = r("AlertBasicExample");
export const AlertDestructiveExampleRoute = r("AlertDestructiveExample");
export const AspectRatioDocsRoute = r("AspectRatioDocs");
export const AspectRatioBasicExampleRoute = r("AspectRatioBasicExample");
export const AspectRatioSquareExampleRoute = r("AspectRatioSquareExample");
export const AspectRatioPortraitExampleRoute = r("AspectRatioPortraitExample");
export const AspectRatioRtlExampleRoute = r("AspectRatioRtlExample");
export const BreadcrumbDocsRoute = r("BreadcrumbDocs");
export const BreadcrumbBasicExampleRoute = r("BreadcrumbBasicExample");
export const BreadcrumbSeparatorExampleRoute = r("BreadcrumbSeparatorExample");
export const BreadcrumbDropdownExampleRoute = r("BreadcrumbDropdownExample");
export const BreadcrumbCollapsedExampleRoute = r("BreadcrumbCollapsedExample");
export const BreadcrumbLinkExampleRoute = r("BreadcrumbLinkExample");
export const BreadcrumbRtlExampleRoute = r("BreadcrumbRtlExample");
export const ButtonGroupDocsRoute = r("ButtonGroupDocs");
export const ButtonGroupBasicExampleRoute = r("ButtonGroupBasicExample");
export const ButtonGroupOrientationExampleRoute = r(
  "ButtonGroupOrientationExample"
);
export const ButtonGroupSizeExampleRoute = r("ButtonGroupSizeExample");
export const ButtonGroupNestedExampleRoute = r("ButtonGroupNestedExample");
export const ButtonGroupSeparatorExampleRoute = r(
  "ButtonGroupSeparatorExample"
);
export const ButtonGroupSplitExampleRoute = r("ButtonGroupSplitExample");
export const ButtonGroupInputExampleRoute = r("ButtonGroupInputExample");
export const ButtonGroupInputGroupExampleRoute = r(
  "ButtonGroupInputGroupExample"
);
export const ButtonGroupSelectExampleRoute = r("ButtonGroupSelectExample");
export const ButtonGroupPopoverExampleRoute = r("ButtonGroupPopoverExample");
export const ButtonGroupRtlExampleRoute = r("ButtonGroupRtlExample");
export const AlertDialogDocsRoute = r("AlertDialogDocs");
export const ShadcnAlertDialogDocsRoute = r("ShadcnAlertDialogDocs");
export const AlertDialogBasicExampleRoute = r("AlertDialogBasicExample");
export const DrawerDocsRoute = r("DrawerDocs");
export const ShadcnDrawerDocsRoute = r("ShadcnDrawerDocs");
export const DrawerBasicExampleRoute = r("DrawerBasicExample");
export const ContextMenuDocsRoute = r("ContextMenuDocs");
export const ShadcnContextMenuDocsRoute = r("ShadcnContextMenuDocs");
export const ContextMenuBasicExampleRoute = r("ContextMenuBasicExample");
export const MenubarDocsRoute = r("MenubarDocs");
export const MenubarBasicExampleRoute = r("MenubarBasicExample");
export const NavigationMenuDocsRoute = r("NavigationMenuDocs");
export const NavigationMenuBasicExampleRoute = r("NavigationMenuBasicExample");
export const OtpFieldDocsRoute = r("OtpFieldDocs");
export const OtpFieldBasicExampleRoute = r("OtpFieldBasicExample");
export const PreviewCardDocsRoute = r("PreviewCardDocs");
export const PreviewCardBasicExampleRoute = r("PreviewCardBasicExample");
export const CollapsibleDocsRoute = r("CollapsibleDocs");
export const ShadcnCollapsibleDocsRoute = r("ShadcnCollapsibleDocs");
export const CollapsibleBasicExampleRoute = r("CollapsibleBasicExample");
export const FieldDocsRoute = r("FieldDocs");
export const FieldBasicExampleRoute = r("FieldBasicExample");
export const NumberFieldDocsRoute = r("NumberFieldDocs");
export const NumberFieldBasicExampleRoute = r("NumberFieldBasicExample");
export const FormDocsRoute = r("FormDocs");
export const FormBasicExampleRoute = r("FormBasicExample");
export const AutocompleteDocsRoute = r("AutocompleteDocs");
export const AutocompleteBasicExampleRoute = r("AutocompleteBasicExample");
export const AvatarRoute = r("Avatar");
export const AvatarDocsRoute = r("AvatarDocs");
export const ShadcnAvatarDocsRoute = r("ShadcnAvatarDocs");
export const AvatarBasicExampleRoute = r("AvatarBasicExample");
export const BadgeRoute = r("Badge");
export const BadgeDocsRoute = r("BadgeDocs");
export const BadgeBasicExampleRoute = r("BadgeBasicExample");
export const BadgeSpinnerExampleRoute = r("BadgeSpinnerExample");
export const CarouselDocsRoute = r("CarouselDocs");
export const CarouselBasicExampleRoute = r("CarouselBasicExample");
export const CarouselSizesExampleRoute = r("CarouselSizesExample");
export const CarouselSpacingExampleRoute = r("CarouselSpacingExample");
export const CarouselOrientationExampleRoute = r("CarouselOrientationExample");
export const CarouselApiExampleRoute = r("CarouselApiExample");
export const CarouselRtlExampleRoute = r("CarouselRtlExample");
export const ChartDocsRoute = r("ChartDocs");
export const ChartBasicExampleRoute = r("ChartBasicExample");
export const ChartGridExampleRoute = r("ChartGridExample");
export const ChartAxisExampleRoute = r("ChartAxisExample");
export const ChartTooltipExampleRoute = r("ChartTooltipExample");
export const ChartLegendExampleRoute = r("ChartLegendExample");
export const ChartRtlExampleRoute = r("ChartRtlExample");
export const CommandDocsRoute = r("CommandDocs");
export const CommandBasicExampleRoute = r("CommandBasicExample");
export const DropdownMenuDocsRoute = r("DropdownMenuDocs");
export const DropdownMenuBasicExampleRoute = r("DropdownMenuBasicExample");
export const HoverCardDocsRoute = r("HoverCardDocs");
export const HoverCardBasicExampleRoute = r("HoverCardBasicExample");
export const InputOtpDocsRoute = r("InputOtpDocs");
export const InputOtpBasicExampleRoute = r("InputOtpBasicExample");
export const NativeSelectDocsRoute = r("NativeSelectDocs");
export const NativeSelectBasicExampleRoute = r("NativeSelectBasicExample");
export const SheetDocsRoute = r("SheetDocs");
export const SheetBasicExampleRoute = r("SheetBasicExample");
export const SonnerDocsRoute = r("SonnerDocs");
export const SonnerBasicExampleRoute = r("SonnerBasicExample");
export const DataTableDocsRoute = r("DataTableDocs");
export const DataTableBasicExampleRoute = r("DataTableBasicExample");
export const DataTableRowActionsExampleRoute = r("DataTableRowActionsExample");
export const DataTablePaginationExampleRoute = r("DataTablePaginationExample");
export const DataTableSortingExampleRoute = r("DataTableSortingExample");
export const DataTableFilteringExampleRoute = r("DataTableFilteringExample");
export const DataTableVisibilityExampleRoute = r("DataTableVisibilityExample");
export const DataTableRowSelectionExampleRoute = r(
  "DataTableRowSelectionExample"
);
export const DirectionDocsRoute = r("DirectionDocs");
export const DirectionBasicExampleRoute = r("DirectionBasicExample");
export const ItemDocsRoute = r("ItemDocs");
export const ItemAvatarExampleRoute = r("ItemAvatarExample");
export const ItemBasicExampleRoute = r("ItemBasicExample");
export const ItemGroupExampleRoute = r("ItemGroupExample");
export const ItemHeaderExampleRoute = r("ItemHeaderExample");
export const ItemIconExampleRoute = r("ItemIconExample");
export const ItemImageExampleRoute = r("ItemImageExample");
export const ItemLinkExampleRoute = r("ItemLinkExample");
export const ItemRtlExampleRoute = r("ItemRtlExample");
export const ItemSizeExampleRoute = r("ItemSizeExample");
export const ItemVariantExampleRoute = r("ItemVariantExample");
export const LabelDocsRoute = r("LabelDocs");
export const LabelBasicExampleRoute = r("LabelBasicExample");
export const PaginationDocsRoute = r("PaginationDocs");
export const PaginationBasicExampleRoute = r("PaginationBasicExample");
export const ResizableDocsRoute = r("ResizableDocs");
export const ResizableBasicExampleRoute = r("ResizableBasicExample");
export const SidebarDocsRoute = r("SidebarDocs");
export const SidebarBasicExampleRoute = r("SidebarBasicExample");
export const TableDocsRoute = r("TableDocs");
export const TableBasicExampleRoute = r("TableBasicExample");
export const CardRoute = r("Card");
export const CardDocsRoute = r("CardDocs");
export const CardBasicExampleRoute = r("CardBasicExample");
export const SeparatorRoute = r("Separator");
export const SeparatorDocsRoute = r("SeparatorDocs");
export const SeparatorBasicExampleRoute = r("SeparatorBasicExample");
export const SkeletonRoute = r("Skeleton");
export const SkeletonDocsRoute = r("SkeletonDocs");
export const SkeletonBasicExampleRoute = r("SkeletonBasicExample");
export const SpinnerRoute = r("Spinner");
export const SpinnerDocsRoute = r("SpinnerDocs");
export const KbdRoute = r("Kbd");
export const KbdDocsRoute = r("KbdDocs");
export const KbdBasicExampleRoute = r("KbdBasicExample");
export const KbdInputGroupExampleRoute = r("KbdInputGroupExample");
export const TypographyRoute = r("Typography");
export const TypographyDocsRoute = r("TypographyDocs");
export const TypographyBasicExampleRoute = r("TypographyBasicExample");
export const EmptyRoute = r("Empty");
export const EmptyDocsRoute = r("EmptyDocs");
export const EmptyBasicExampleRoute = r("EmptyBasicExample");
export const EmptyInputGroupExampleRoute = r("EmptyInputGroupExample");
export const ButtonRoute = r("Button");
export const ButtonDocsRoute = r("ButtonDocs");
export const ButtonBasicExampleRoute = r("ButtonBasicExample");
export const ButtonDisabledExampleRoute = r("ButtonDisabledExample");
export const BaseUiButtonDocsRoute = r("BaseUiButtonDocs");
export const ShadcnButtonDocsRoute = r("ShadcnButtonDocs");
export const InputGroupRoute = r("InputGroup");
export const InputGroupDocsRoute = r("InputGroupDocs");
export const MeterRoute = r("Meter");
export const MeterDocsRoute = r("MeterDocs");
export const MeterBasicExampleRoute = r("MeterBasicExample");
export const ScrollAreaRoute = r("ScrollArea");
export const ScrollAreaDocsRoute = r("ScrollAreaDocs");
export const ScrollAreaBasicExampleRoute = r("ScrollAreaBasicExample");
export const ToggleRoute = r("Toggle");
export const ToggleDocsRoute = r("ToggleDocs");
export const ToggleBasicExampleRoute = r("ToggleBasicExample");
export const ToggleGroupDocsRoute = r("ToggleGroupDocs");
export const ToggleGroupBasicExampleRoute = r("ToggleGroupBasicExample");
export const RadioDocsRoute = r("RadioDocs");
export const RadioBasicExampleRoute = r("RadioBasicExample");
export const ToolbarDocsRoute = r("ToolbarDocs");
export const ToolbarBasicExampleRoute = r("ToolbarBasicExample");
export const ProgressRoute = r("Progress");
export const ProgressDocsRoute = r("ProgressDocs");
export const ProgressBasicExampleRoute = r("ProgressBasicExample");
export const CalendarRoute = r("Calendar");
export const CalendarDocsRoute = r("CalendarDocs");
export const ShadcnCalendarDocsRoute = r("ShadcnCalendarDocs");
export const CalendarBasicExampleRoute = r("CalendarBasicExample");
export const CalendarBoundsExampleRoute = r("CalendarBoundsExample");
export const CheckboxRoute = r("Checkbox");
export const CheckboxDocsRoute = r("CheckboxDocs");
export const CheckboxBasicExampleRoute = r("CheckboxBasicExample");
export const BaseUiCheckboxDocsRoute = r("BaseUiCheckboxDocs");
export const ShadcnCheckboxDocsRoute = r("ShadcnCheckboxDocs");
export const CheckboxGroupDocsRoute = r("CheckboxGroupDocs");
export const CheckboxGroupBasicExampleRoute = r("CheckboxGroupBasicExample");
export const CheckboxIndeterminateExampleRoute = r(
  "CheckboxIndeterminateExample"
);
export const ComboboxRoute = r("Combobox");
export const ComboboxDocsRoute = r("ComboboxDocs");
export const ShadcnComboboxDocsRoute = r("ShadcnComboboxDocs");
export const BaseUiComboboxDocsRoute = r("BaseUiComboboxDocs");
export const ComboboxBasicExampleRoute = r("ComboboxBasicExample");
export const ComboboxMultiExampleRoute = r("ComboboxMultiExample");
export const DatePickerRoute = r("DatePicker");
export const DatePickerDocsRoute = r("DatePickerDocs");
export const ShadcnDatePickerDocsRoute = r("ShadcnDatePickerDocs");
export const DatePickerBasicExampleRoute = r("DatePickerBasicExample");
export const DatePickerBoundsExampleRoute = r("DatePickerBoundsExample");
export const DialogRoute = r("Dialog");
export const DialogDocsRoute = r("DialogDocs");
export const ShadcnDialogDocsRoute = r("ShadcnDialogDocs");
export const BaseUiDialogDocsRoute = r("BaseUiDialogDocs");
export const DialogBasicExampleRoute = r("DialogBasicExample");
export const DialogAnimatedExampleRoute = r("DialogAnimatedExample");
export const DialogDestructiveExampleRoute = r("DialogDestructiveExample");
export const DialogFocusExampleRoute = r("DialogFocusExample");
export const DialogScrollableExampleRoute = r("DialogScrollableExample");
export const DisclosureRoute = r("Disclosure");
export const DisclosureDocsRoute = r("DisclosureDocs");
export const DisclosureBasicExampleRoute = r("DisclosureBasicExample");
export const DisclosureDisabledExampleRoute = r("DisclosureDisabledExample");
export const DragAndDropRoute = r("DragAndDrop");
export const DragAndDropDocsRoute = r("DragAndDropDocs");
export const DragAndDropBasicExampleRoute = r("DragAndDropBasicExample");
export const DragAndDropDisabledExampleRoute = r("DragAndDropDisabledExample");
export const FieldsetRoute = r("Fieldset");
export const FieldsetDocsRoute = r("FieldsetDocs");
export const BaseUiFieldsetDocsRoute = r("BaseUiFieldsetDocs");
export const FieldsetBasicExampleRoute = r("FieldsetBasicExample");
export const FieldsetDisabledExampleRoute = r("FieldsetDisabledExample");
export const FileDropRoute = r("FileDrop");
export const FileDropDocsRoute = r("FileDropDocs");
export const FileDropBasicExampleRoute = r("FileDropBasicExample");
export const FileDropDisabledExampleRoute = r("FileDropDisabledExample");
export const InputRoute = r("Input");
export const InputDocsRoute = r("InputDocs");
export const BaseUiInputDocsRoute = r("BaseUiInputDocs");
export const ShadcnInputDocsRoute = r("ShadcnInputDocs");
export const InputBasicExampleRoute = r("InputBasicExample");
export const InputDisabledExampleRoute = r("InputDisabledExample");
export const ListboxRoute = r("Listbox");
export const ListboxDocsRoute = r("ListboxDocs");
export const ListboxBasicExampleRoute = r("ListboxBasicExample");
export const ListboxAnimatedExampleRoute = r("ListboxAnimatedExample");
export const MenuRoute = r("Menu");
export const MenuDocsRoute = r("MenuDocs");
export const BaseUiMenuDocsRoute = r("BaseUiMenuDocs");
export const MenuBasicExampleRoute = r("MenuBasicExample");
export const MenuAnimatedExampleRoute = r("MenuAnimatedExample");
export const PopoverRoute = r("Popover");
export const PopoverDocsRoute = r("PopoverDocs");
export const BaseUiPopoverDocsRoute = r("BaseUiPopoverDocs");
export const PopoverBasicExampleRoute = r("PopoverBasicExample");
export const PopoverAnimatedExampleRoute = r("PopoverAnimatedExample");
export const RadioGroupRoute = r("RadioGroup");
export const RadioGroupDocsRoute = r("RadioGroupDocs");
export const BaseUiRadioGroupDocsRoute = r("BaseUiRadioGroupDocs");
export const RadioGroupBasicExampleRoute = r("RadioGroupBasicExample");
export const RadioGroupHorizontalExampleRoute = r(
  "RadioGroupHorizontalExample"
);
export const SelectRoute = r("Select");
export const SelectDocsRoute = r("SelectDocs");
export const BaseUiSelectDocsRoute = r("BaseUiSelectDocs");
export const SelectBasicExampleRoute = r("SelectBasicExample");
export const SelectDisabledExampleRoute = r("SelectDisabledExample");
export const SliderRoute = r("Slider");
export const SliderDocsRoute = r("SliderDocs");
export const BaseUiSliderDocsRoute = r("BaseUiSliderDocs");
export const SliderBasicExampleRoute = r("SliderBasicExample");
export const SliderDisabledExampleRoute = r("SliderDisabledExample");
export const SwitchRoute = r("Switch");
export const SwitchDocsRoute = r("SwitchDocs");
export const BaseUiSwitchDocsRoute = r("BaseUiSwitchDocs");
export const SwitchBasicExampleRoute = r("SwitchBasicExample");
export const SwitchDisabledExampleRoute = r("SwitchDisabledExample");
export const TabsRoute = r("Tabs");
export const TabsDocsRoute = r("TabsDocs");
export const BaseUiTabsDocsRoute = r("BaseUiTabsDocs");
export const TabsBasicExampleRoute = r("TabsBasicExample");
export const TabsManualExampleRoute = r("TabsManualExample");
export const TextareaRoute = r("Textarea");
export const TextareaDocsRoute = r("TextareaDocs");
export const TextareaBasicExampleRoute = r("TextareaBasicExample");
export const TextareaDisabledExampleRoute = r("TextareaDisabledExample");
export const ToastRoute = r("Toast");
export const ToastDocsRoute = r("ToastDocs");
export const BaseUiToastDocsRoute = r("BaseUiToastDocs");
export const ToastBasicExampleRoute = r("ToastBasicExample");
export const ToastVariantsExampleRoute = r("ToastVariantsExample");
export const TooltipRoute = r("Tooltip");
export const TooltipDocsRoute = r("TooltipDocs");
export const BaseUiTooltipDocsRoute = r("BaseUiTooltipDocs");
export const TooltipBasicExampleRoute = r("TooltipBasicExample");
export const TooltipNoDelayExampleRoute = r("TooltipNoDelayExample");
export const AnimationRoute = r("Animation");
export const AnimationDocsRoute = r("AnimationDocs");
export const AnimationBasicExampleRoute = r("AnimationBasicExample");
export const VirtualListRoute = r("VirtualList");
export const VirtualListDocsRoute = r("VirtualListDocs");
export const VirtualListBasicExampleRoute = r("VirtualListBasicExample");
export const VirtualListVariableExampleRoute = r("VirtualListVariableExample");
export const NotFoundRoute = r("NotFound", { path: S.String });

const AppRoute = S.Union([
  HomeRoute,
  AccordionDocsRoute,
  ShadcnAccordionDocsRoute,
  AccordionBasicExampleRoute,
  AccordionMultipleExampleRoute,
  AlertDocsRoute,
  AlertBasicExampleRoute,
  AlertDestructiveExampleRoute,
  AspectRatioDocsRoute,
  AspectRatioBasicExampleRoute,
  AspectRatioSquareExampleRoute,
  AspectRatioPortraitExampleRoute,
  AspectRatioRtlExampleRoute,
  BreadcrumbDocsRoute,
  BreadcrumbBasicExampleRoute,
  BreadcrumbSeparatorExampleRoute,
  BreadcrumbDropdownExampleRoute,
  BreadcrumbCollapsedExampleRoute,
  BreadcrumbLinkExampleRoute,
  BreadcrumbRtlExampleRoute,
  ButtonGroupDocsRoute,
  ButtonGroupBasicExampleRoute,
  ButtonGroupOrientationExampleRoute,
  ButtonGroupSizeExampleRoute,
  ButtonGroupNestedExampleRoute,
  ButtonGroupSeparatorExampleRoute,
  ButtonGroupSplitExampleRoute,
  ButtonGroupInputExampleRoute,
  ButtonGroupInputGroupExampleRoute,
  ButtonGroupSelectExampleRoute,
  ButtonGroupPopoverExampleRoute,
  ButtonGroupRtlExampleRoute,
  AlertDialogDocsRoute,
  ShadcnAlertDialogDocsRoute,
  AlertDialogBasicExampleRoute,
  DrawerDocsRoute,
  ShadcnDrawerDocsRoute,
  DrawerBasicExampleRoute,
  ContextMenuDocsRoute,
  ShadcnContextMenuDocsRoute,
  ContextMenuBasicExampleRoute,
  MenubarDocsRoute,
  MenubarBasicExampleRoute,
  NavigationMenuDocsRoute,
  NavigationMenuBasicExampleRoute,
  OtpFieldDocsRoute,
  OtpFieldBasicExampleRoute,
  PreviewCardDocsRoute,
  PreviewCardBasicExampleRoute,
  CollapsibleDocsRoute,
  ShadcnCollapsibleDocsRoute,
  CollapsibleBasicExampleRoute,
  FieldDocsRoute,
  FieldBasicExampleRoute,
  NumberFieldDocsRoute,
  NumberFieldBasicExampleRoute,
  FormDocsRoute,
  FormBasicExampleRoute,
  AutocompleteDocsRoute,
  AutocompleteBasicExampleRoute,
  AvatarRoute,
  AvatarDocsRoute,
  ShadcnAvatarDocsRoute,
  AvatarBasicExampleRoute,
  BadgeRoute,
  BadgeDocsRoute,
  BadgeBasicExampleRoute,
  BadgeSpinnerExampleRoute,
  CarouselDocsRoute,
  CarouselBasicExampleRoute,
  CarouselSizesExampleRoute,
  CarouselSpacingExampleRoute,
  CarouselOrientationExampleRoute,
  CarouselApiExampleRoute,
  CarouselRtlExampleRoute,
  ChartDocsRoute,
  ChartBasicExampleRoute,
  ChartGridExampleRoute,
  ChartAxisExampleRoute,
  ChartTooltipExampleRoute,
  ChartLegendExampleRoute,
  ChartRtlExampleRoute,
  CommandDocsRoute,
  CommandBasicExampleRoute,
  DropdownMenuDocsRoute,
  DropdownMenuBasicExampleRoute,
  HoverCardDocsRoute,
  HoverCardBasicExampleRoute,
  InputOtpDocsRoute,
  InputOtpBasicExampleRoute,
  NativeSelectDocsRoute,
  NativeSelectBasicExampleRoute,
  SheetDocsRoute,
  SheetBasicExampleRoute,
  SonnerDocsRoute,
  SonnerBasicExampleRoute,
  DataTableDocsRoute,
  DataTableBasicExampleRoute,
  DataTableRowActionsExampleRoute,
  DataTablePaginationExampleRoute,
  DataTableSortingExampleRoute,
  DataTableFilteringExampleRoute,
  DataTableVisibilityExampleRoute,
  DataTableRowSelectionExampleRoute,
  DirectionDocsRoute,
  DirectionBasicExampleRoute,
  ItemDocsRoute,
  ItemAvatarExampleRoute,
  ItemBasicExampleRoute,
  ItemGroupExampleRoute,
  ItemHeaderExampleRoute,
  ItemIconExampleRoute,
  ItemImageExampleRoute,
  ItemLinkExampleRoute,
  ItemRtlExampleRoute,
  ItemSizeExampleRoute,
  ItemVariantExampleRoute,
  LabelDocsRoute,
  LabelBasicExampleRoute,
  PaginationDocsRoute,
  PaginationBasicExampleRoute,
  ResizableDocsRoute,
  ResizableBasicExampleRoute,
  SidebarDocsRoute,
  SidebarBasicExampleRoute,
  TableDocsRoute,
  TableBasicExampleRoute,
  CardRoute,
  CardDocsRoute,
  CardBasicExampleRoute,
  SeparatorRoute,
  SeparatorDocsRoute,
  SeparatorBasicExampleRoute,
  SkeletonRoute,
  SkeletonDocsRoute,
  SkeletonBasicExampleRoute,
  SpinnerRoute,
  SpinnerDocsRoute,
  KbdRoute,
  KbdDocsRoute,
  KbdBasicExampleRoute,
  KbdInputGroupExampleRoute,
  TypographyRoute,
  TypographyDocsRoute,
  TypographyBasicExampleRoute,
  EmptyRoute,
  EmptyDocsRoute,
  EmptyBasicExampleRoute,
  EmptyInputGroupExampleRoute,
  ButtonRoute,
  ButtonDocsRoute,
  ButtonBasicExampleRoute,
  ButtonDisabledExampleRoute,
  BaseUiButtonDocsRoute,
  ShadcnButtonDocsRoute,
  InputGroupRoute,
  InputGroupDocsRoute,
  MeterRoute,
  MeterDocsRoute,
  MeterBasicExampleRoute,
  ScrollAreaRoute,
  ScrollAreaDocsRoute,
  ScrollAreaBasicExampleRoute,
  ToggleRoute,
  ToggleDocsRoute,
  ToggleBasicExampleRoute,
  ToggleGroupDocsRoute,
  ToggleGroupBasicExampleRoute,
  RadioDocsRoute,
  RadioBasicExampleRoute,
  ToolbarDocsRoute,
  ToolbarBasicExampleRoute,
  ProgressRoute,
  ProgressDocsRoute,
  ProgressBasicExampleRoute,
  CalendarRoute,
  CalendarDocsRoute,
  ShadcnCalendarDocsRoute,
  CalendarBasicExampleRoute,
  CalendarBoundsExampleRoute,
  CheckboxRoute,
  CheckboxDocsRoute,
  CheckboxBasicExampleRoute,
  BaseUiCheckboxDocsRoute,
  ShadcnCheckboxDocsRoute,
  CheckboxGroupDocsRoute,
  CheckboxGroupBasicExampleRoute,
  CheckboxIndeterminateExampleRoute,
  ComboboxRoute,
  ComboboxDocsRoute,
  ShadcnComboboxDocsRoute,
  BaseUiComboboxDocsRoute,
  ComboboxBasicExampleRoute,
  ComboboxMultiExampleRoute,
  DatePickerRoute,
  DatePickerDocsRoute,
  ShadcnDatePickerDocsRoute,
  DatePickerBasicExampleRoute,
  DatePickerBoundsExampleRoute,
  DialogRoute,
  DialogDocsRoute,
  ShadcnDialogDocsRoute,
  BaseUiDialogDocsRoute,
  DialogBasicExampleRoute,
  DialogAnimatedExampleRoute,
  DialogDestructiveExampleRoute,
  DialogFocusExampleRoute,
  DialogScrollableExampleRoute,
  DisclosureRoute,
  DisclosureDocsRoute,
  DisclosureBasicExampleRoute,
  DisclosureDisabledExampleRoute,
  DragAndDropRoute,
  DragAndDropDocsRoute,
  DragAndDropBasicExampleRoute,
  DragAndDropDisabledExampleRoute,
  FieldsetRoute,
  FieldsetDocsRoute,
  BaseUiFieldsetDocsRoute,
  FieldsetBasicExampleRoute,
  FieldsetDisabledExampleRoute,
  FileDropRoute,
  FileDropDocsRoute,
  FileDropBasicExampleRoute,
  FileDropDisabledExampleRoute,
  InputRoute,
  InputDocsRoute,
  BaseUiInputDocsRoute,
  ShadcnInputDocsRoute,
  InputBasicExampleRoute,
  InputDisabledExampleRoute,
  ListboxRoute,
  ListboxDocsRoute,
  ListboxBasicExampleRoute,
  ListboxAnimatedExampleRoute,
  MenuRoute,
  MenuDocsRoute,
  BaseUiMenuDocsRoute,
  MenuBasicExampleRoute,
  MenuAnimatedExampleRoute,
  PopoverRoute,
  PopoverDocsRoute,
  BaseUiPopoverDocsRoute,
  PopoverBasicExampleRoute,
  PopoverAnimatedExampleRoute,
  RadioGroupRoute,
  RadioGroupDocsRoute,
  BaseUiRadioGroupDocsRoute,
  RadioGroupBasicExampleRoute,
  RadioGroupHorizontalExampleRoute,
  SelectRoute,
  SelectDocsRoute,
  BaseUiSelectDocsRoute,
  SelectBasicExampleRoute,
  SelectDisabledExampleRoute,
  SliderRoute,
  SliderDocsRoute,
  BaseUiSliderDocsRoute,
  SliderBasicExampleRoute,
  SliderDisabledExampleRoute,
  SwitchRoute,
  SwitchDocsRoute,
  BaseUiSwitchDocsRoute,
  SwitchBasicExampleRoute,
  SwitchDisabledExampleRoute,
  TabsRoute,
  TabsDocsRoute,
  BaseUiTabsDocsRoute,
  TabsBasicExampleRoute,
  TabsManualExampleRoute,
  TextareaRoute,
  TextareaDocsRoute,
  TextareaBasicExampleRoute,
  TextareaDisabledExampleRoute,
  ToastRoute,
  ToastDocsRoute,
  BaseUiToastDocsRoute,
  ToastBasicExampleRoute,
  ToastVariantsExampleRoute,
  TooltipRoute,
  TooltipDocsRoute,
  BaseUiTooltipDocsRoute,
  TooltipBasicExampleRoute,
  TooltipNoDelayExampleRoute,
  AnimationRoute,
  AnimationDocsRoute,
  AnimationBasicExampleRoute,
  VirtualListRoute,
  VirtualListDocsRoute,
  VirtualListBasicExampleRoute,
  VirtualListVariableExampleRoute,
  NotFoundRoute,
]);

export type AppRoute = typeof AppRoute.Type;

export const homeRouter = pipe(Route.root, Route.mapTo(HomeRoute));
export const alertDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("alert")),
  Route.mapTo(AlertDocsRoute)
);
export const alertBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("alert")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(AlertBasicExampleRoute)
);
export const alertBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("alert-basic")),
  Route.mapTo(AlertBasicExampleRoute)
);
export const alertDestructiveExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("alert")),
  slash(literal("examples")),
  slash(literal("destructive")),
  Route.mapTo(AlertDestructiveExampleRoute)
);
export const alertDestructiveStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("alert-destructive")),
  Route.mapTo(AlertDestructiveExampleRoute)
);
export const aspectRatioDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("aspect-ratio")),
  Route.mapTo(AspectRatioDocsRoute)
);
export const aspectRatioBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("aspect-ratio")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(AspectRatioBasicExampleRoute)
);
export const aspectRatioBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("aspect-ratio-basic")),
  Route.mapTo(AspectRatioBasicExampleRoute)
);
export const aspectRatioSquareExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("aspect-ratio")),
  slash(literal("examples")),
  slash(literal("square")),
  Route.mapTo(AspectRatioSquareExampleRoute)
);
export const aspectRatioSquareStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("aspect-ratio-square")),
  Route.mapTo(AspectRatioSquareExampleRoute)
);
export const aspectRatioPortraitExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("aspect-ratio")),
  slash(literal("examples")),
  slash(literal("portrait")),
  Route.mapTo(AspectRatioPortraitExampleRoute)
);
export const aspectRatioPortraitStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("aspect-ratio-portrait")),
  Route.mapTo(AspectRatioPortraitExampleRoute)
);
export const aspectRatioRtlExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("aspect-ratio")),
  slash(literal("examples")),
  slash(literal("rtl")),
  Route.mapTo(AspectRatioRtlExampleRoute)
);
export const aspectRatioRtlStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("aspect-ratio-rtl")),
  Route.mapTo(AspectRatioRtlExampleRoute)
);
export const breadcrumbDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("breadcrumb")),
  Route.mapTo(BreadcrumbDocsRoute)
);
export const breadcrumbBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("breadcrumb")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(BreadcrumbBasicExampleRoute)
);
export const breadcrumbBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("breadcrumb-basic")),
  Route.mapTo(BreadcrumbBasicExampleRoute)
);
export const breadcrumbSeparatorExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("breadcrumb")),
  slash(literal("examples")),
  slash(literal("separator")),
  Route.mapTo(BreadcrumbSeparatorExampleRoute)
);
export const breadcrumbSeparatorStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("breadcrumb-separator")),
  Route.mapTo(BreadcrumbSeparatorExampleRoute)
);
export const breadcrumbDropdownExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("breadcrumb")),
  slash(literal("examples")),
  slash(literal("dropdown")),
  Route.mapTo(BreadcrumbDropdownExampleRoute)
);
export const breadcrumbDropdownStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("breadcrumb-dropdown")),
  Route.mapTo(BreadcrumbDropdownExampleRoute)
);
export const breadcrumbCollapsedExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("breadcrumb")),
  slash(literal("examples")),
  slash(literal("collapsed")),
  Route.mapTo(BreadcrumbCollapsedExampleRoute)
);
export const breadcrumbCollapsedStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("breadcrumb-collapsed")),
  Route.mapTo(BreadcrumbCollapsedExampleRoute)
);
export const breadcrumbLinkExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("breadcrumb")),
  slash(literal("examples")),
  slash(literal("link")),
  Route.mapTo(BreadcrumbLinkExampleRoute)
);
export const breadcrumbLinkStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("breadcrumb-link")),
  Route.mapTo(BreadcrumbLinkExampleRoute)
);
export const breadcrumbRtlExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("breadcrumb")),
  slash(literal("examples")),
  slash(literal("rtl")),
  Route.mapTo(BreadcrumbRtlExampleRoute)
);
export const breadcrumbRtlStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("breadcrumb-rtl")),
  Route.mapTo(BreadcrumbRtlExampleRoute)
);
export const buttonGroupDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("button-group")),
  Route.mapTo(ButtonGroupDocsRoute)
);
export const buttonGroupBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("button-group")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(ButtonGroupBasicExampleRoute)
);
export const buttonGroupBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("button-group-basic")),
  Route.mapTo(ButtonGroupBasicExampleRoute)
);
export const buttonGroupOrientationExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("button-group")),
  slash(literal("examples")),
  slash(literal("orientation")),
  Route.mapTo(ButtonGroupOrientationExampleRoute)
);
export const buttonGroupOrientationStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("button-group-orientation")),
  Route.mapTo(ButtonGroupOrientationExampleRoute)
);
export const buttonGroupSizeExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("button-group")),
  slash(literal("examples")),
  slash(literal("size")),
  Route.mapTo(ButtonGroupSizeExampleRoute)
);
export const buttonGroupSizeStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("button-group-size")),
  Route.mapTo(ButtonGroupSizeExampleRoute)
);
export const buttonGroupNestedExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("button-group")),
  slash(literal("examples")),
  slash(literal("nested")),
  Route.mapTo(ButtonGroupNestedExampleRoute)
);
export const buttonGroupNestedStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("button-group-nested")),
  Route.mapTo(ButtonGroupNestedExampleRoute)
);
export const buttonGroupSeparatorExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("button-group")),
  slash(literal("examples")),
  slash(literal("separator")),
  Route.mapTo(ButtonGroupSeparatorExampleRoute)
);
export const buttonGroupSeparatorStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("button-group-separator")),
  Route.mapTo(ButtonGroupSeparatorExampleRoute)
);
export const buttonGroupSplitExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("button-group")),
  slash(literal("examples")),
  slash(literal("split")),
  Route.mapTo(ButtonGroupSplitExampleRoute)
);
export const buttonGroupSplitStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("button-group-split")),
  Route.mapTo(ButtonGroupSplitExampleRoute)
);
export const buttonGroupInputExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("button-group")),
  slash(literal("examples")),
  slash(literal("input")),
  Route.mapTo(ButtonGroupInputExampleRoute)
);
export const buttonGroupInputStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("button-group-input")),
  Route.mapTo(ButtonGroupInputExampleRoute)
);
export const buttonGroupInputGroupExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("button-group")),
  slash(literal("examples")),
  slash(literal("input-group")),
  Route.mapTo(ButtonGroupInputGroupExampleRoute)
);
export const buttonGroupInputGroupStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("button-group-input-group")),
  Route.mapTo(ButtonGroupInputGroupExampleRoute)
);
export const buttonGroupSelectExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("button-group")),
  slash(literal("examples")),
  slash(literal("select")),
  Route.mapTo(ButtonGroupSelectExampleRoute)
);
export const buttonGroupSelectStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("button-group-select")),
  Route.mapTo(ButtonGroupSelectExampleRoute)
);
export const buttonGroupPopoverExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("button-group")),
  slash(literal("examples")),
  slash(literal("popover")),
  Route.mapTo(ButtonGroupPopoverExampleRoute)
);
export const buttonGroupPopoverStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("button-group-popover")),
  Route.mapTo(ButtonGroupPopoverExampleRoute)
);
export const buttonGroupRtlExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("button-group")),
  slash(literal("examples")),
  slash(literal("rtl")),
  Route.mapTo(ButtonGroupRtlExampleRoute)
);
export const buttonGroupRtlStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("button-group-rtl")),
  Route.mapTo(ButtonGroupRtlExampleRoute)
);
export const alertDialogDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("alert-dialog")),
  Route.mapTo(AlertDialogDocsRoute)
);
export const shadcnAlertDialogDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("shadcn-alert-dialog")),
  Route.mapTo(ShadcnAlertDialogDocsRoute)
);
export const alertDialogBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("alert-dialog")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(AlertDialogBasicExampleRoute)
);
export const alertDialogBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("alert-dialog-basic")),
  Route.mapTo(AlertDialogBasicExampleRoute)
);
export const drawerDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("drawer")),
  Route.mapTo(DrawerDocsRoute)
);
export const shadcnDrawerDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("shadcn-drawer")),
  Route.mapTo(ShadcnDrawerDocsRoute)
);
export const drawerBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("drawer")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(DrawerBasicExampleRoute)
);
export const drawerBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("drawer-basic")),
  Route.mapTo(DrawerBasicExampleRoute)
);
export const contextMenuDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("context-menu")),
  Route.mapTo(ContextMenuDocsRoute)
);
export const shadcnContextMenuDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("shadcn-context-menu")),
  Route.mapTo(ShadcnContextMenuDocsRoute)
);
export const contextMenuBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("context-menu")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(ContextMenuBasicExampleRoute)
);
export const contextMenuBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("context-menu-basic")),
  Route.mapTo(ContextMenuBasicExampleRoute)
);
export const menubarDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("menubar")),
  Route.mapTo(MenubarDocsRoute)
);
export const menubarBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("menubar")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(MenubarBasicExampleRoute)
);
export const menubarBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("menubar-basic")),
  Route.mapTo(MenubarBasicExampleRoute)
);
export const navigationMenuDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("navigation-menu")),
  Route.mapTo(NavigationMenuDocsRoute)
);
export const navigationMenuBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("navigation-menu")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(NavigationMenuBasicExampleRoute)
);
export const navigationMenuBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("navigation-menu-basic")),
  Route.mapTo(NavigationMenuBasicExampleRoute)
);
export const otpFieldDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("otp-field")),
  Route.mapTo(OtpFieldDocsRoute)
);
export const otpFieldBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("otp-field")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(OtpFieldBasicExampleRoute)
);
export const otpFieldBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("otp-field-basic")),
  Route.mapTo(OtpFieldBasicExampleRoute)
);
export const previewCardDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("preview-card")),
  Route.mapTo(PreviewCardDocsRoute)
);
export const previewCardBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("preview-card")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(PreviewCardBasicExampleRoute)
);
export const previewCardBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("preview-card-basic")),
  Route.mapTo(PreviewCardBasicExampleRoute)
);
export const accordionDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("accordion")),
  Route.mapTo(AccordionDocsRoute)
);
export const shadcnAccordionDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("shadcn-accordion")),
  Route.mapTo(ShadcnAccordionDocsRoute)
);
export const accordionBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("accordion")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(AccordionBasicExampleRoute)
);
export const accordionBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("accordion-basic")),
  Route.mapTo(AccordionBasicExampleRoute)
);
export const accordionMultipleExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("accordion")),
  slash(literal("examples")),
  slash(literal("multiple")),
  Route.mapTo(AccordionMultipleExampleRoute)
);
export const accordionMultipleStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("accordion-multiple")),
  Route.mapTo(AccordionMultipleExampleRoute)
);
export const collapsibleDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("collapsible")),
  Route.mapTo(CollapsibleDocsRoute)
);
export const shadcnCollapsibleDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("shadcn-collapsible")),
  Route.mapTo(ShadcnCollapsibleDocsRoute)
);
export const collapsibleBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("collapsible")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(CollapsibleBasicExampleRoute)
);
export const collapsibleBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("collapsible-basic")),
  Route.mapTo(CollapsibleBasicExampleRoute)
);
export const fieldDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("field")),
  Route.mapTo(FieldDocsRoute)
);
export const fieldBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("field")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(FieldBasicExampleRoute)
);
export const fieldBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("field-basic")),
  Route.mapTo(FieldBasicExampleRoute)
);
export const numberFieldDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("number-field")),
  Route.mapTo(NumberFieldDocsRoute)
);
export const numberFieldBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("number-field")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(NumberFieldBasicExampleRoute)
);
export const numberFieldBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("number-field-basic")),
  Route.mapTo(NumberFieldBasicExampleRoute)
);
export const formDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("form")),
  Route.mapTo(FormDocsRoute)
);
export const formBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("form")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(FormBasicExampleRoute)
);
export const formBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("form-basic")),
  Route.mapTo(FormBasicExampleRoute)
);
export const autocompleteDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("autocomplete")),
  Route.mapTo(AutocompleteDocsRoute)
);
export const autocompleteBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("autocomplete")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(AutocompleteBasicExampleRoute)
);
export const autocompleteBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("autocomplete-basic")),
  Route.mapTo(AutocompleteBasicExampleRoute)
);
export const avatarRouter = pipe(literal("avatar"), Route.mapTo(AvatarRoute));
export const avatarDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("avatar")),
  Route.mapTo(AvatarDocsRoute)
);
export const shadcnAvatarDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("shadcn-avatar")),
  Route.mapTo(ShadcnAvatarDocsRoute)
);
export const avatarBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("avatar")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(AvatarBasicExampleRoute)
);
export const avatarBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("avatar-basic")),
  Route.mapTo(AvatarBasicExampleRoute)
);
export const badgeRouter = pipe(literal("badge"), Route.mapTo(BadgeRoute));
export const badgeDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("badge")),
  Route.mapTo(BadgeDocsRoute)
);
export const badgeBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("badge")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(BadgeBasicExampleRoute)
);
export const badgeBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("badge-basic")),
  Route.mapTo(BadgeBasicExampleRoute)
);
export const badgeSpinnerExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("badge")),
  slash(literal("examples")),
  slash(literal("spinner")),
  Route.mapTo(BadgeSpinnerExampleRoute)
);
export const badgeSpinnerStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("badge-spinner")),
  Route.mapTo(BadgeSpinnerExampleRoute)
);
export const carouselDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("carousel")),
  Route.mapTo(CarouselDocsRoute)
);
export const carouselBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("carousel")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(CarouselBasicExampleRoute)
);
export const carouselBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("carousel-basic")),
  Route.mapTo(CarouselBasicExampleRoute)
);
export const carouselSizesExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("carousel")),
  slash(literal("examples")),
  slash(literal("sizes")),
  Route.mapTo(CarouselSizesExampleRoute)
);
export const carouselSizesStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("carousel-sizes")),
  Route.mapTo(CarouselSizesExampleRoute)
);
export const carouselSpacingExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("carousel")),
  slash(literal("examples")),
  slash(literal("spacing")),
  Route.mapTo(CarouselSpacingExampleRoute)
);
export const carouselSpacingStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("carousel-spacing")),
  Route.mapTo(CarouselSpacingExampleRoute)
);
export const carouselOrientationExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("carousel")),
  slash(literal("examples")),
  slash(literal("orientation")),
  Route.mapTo(CarouselOrientationExampleRoute)
);
export const carouselOrientationStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("carousel-orientation")),
  Route.mapTo(CarouselOrientationExampleRoute)
);
export const carouselApiExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("carousel")),
  slash(literal("examples")),
  slash(literal("api")),
  Route.mapTo(CarouselApiExampleRoute)
);
export const carouselApiStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("carousel-api")),
  Route.mapTo(CarouselApiExampleRoute)
);
export const carouselRtlExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("carousel")),
  slash(literal("examples")),
  slash(literal("rtl")),
  Route.mapTo(CarouselRtlExampleRoute)
);
export const carouselRtlStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("carousel-rtl")),
  Route.mapTo(CarouselRtlExampleRoute)
);
export const chartDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("chart")),
  Route.mapTo(ChartDocsRoute)
);
export const chartBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("chart")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(ChartBasicExampleRoute)
);
export const chartBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("chart-basic")),
  Route.mapTo(ChartBasicExampleRoute)
);
export const chartGridExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("chart")),
  slash(literal("examples")),
  slash(literal("grid")),
  Route.mapTo(ChartGridExampleRoute)
);
export const chartGridStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("chart-grid")),
  Route.mapTo(ChartGridExampleRoute)
);
export const chartAxisExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("chart")),
  slash(literal("examples")),
  slash(literal("axis")),
  Route.mapTo(ChartAxisExampleRoute)
);
export const chartAxisStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("chart-axis")),
  Route.mapTo(ChartAxisExampleRoute)
);
export const chartTooltipExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("chart")),
  slash(literal("examples")),
  slash(literal("tooltip")),
  Route.mapTo(ChartTooltipExampleRoute)
);
export const chartTooltipStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("chart-tooltip")),
  Route.mapTo(ChartTooltipExampleRoute)
);
export const chartLegendExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("chart")),
  slash(literal("examples")),
  slash(literal("legend")),
  Route.mapTo(ChartLegendExampleRoute)
);
export const chartLegendStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("chart-legend")),
  Route.mapTo(ChartLegendExampleRoute)
);
export const chartRtlExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("chart")),
  slash(literal("examples")),
  slash(literal("rtl")),
  Route.mapTo(ChartRtlExampleRoute)
);
export const chartRtlStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("chart-rtl")),
  Route.mapTo(ChartRtlExampleRoute)
);
export const commandDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("command")),
  Route.mapTo(CommandDocsRoute)
);
export const commandBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("command")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(CommandBasicExampleRoute)
);
export const commandBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("command-basic")),
  Route.mapTo(CommandBasicExampleRoute)
);
export const dropdownMenuDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("dropdown-menu")),
  Route.mapTo(DropdownMenuDocsRoute)
);
export const dropdownMenuBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("dropdown-menu")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(DropdownMenuBasicExampleRoute)
);
export const dropdownMenuBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("dropdown-menu-basic")),
  Route.mapTo(DropdownMenuBasicExampleRoute)
);
export const hoverCardDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("hover-card")),
  Route.mapTo(HoverCardDocsRoute)
);
export const hoverCardBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("hover-card")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(HoverCardBasicExampleRoute)
);
export const hoverCardBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("hover-card-basic")),
  Route.mapTo(HoverCardBasicExampleRoute)
);
export const inputOtpDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("input-otp")),
  Route.mapTo(InputOtpDocsRoute)
);
export const inputOtpBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("input-otp")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(InputOtpBasicExampleRoute)
);
export const inputOtpBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("input-otp-basic")),
  Route.mapTo(InputOtpBasicExampleRoute)
);
export const nativeSelectDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("native-select")),
  Route.mapTo(NativeSelectDocsRoute)
);
export const nativeSelectBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("native-select")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(NativeSelectBasicExampleRoute)
);
export const nativeSelectBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("native-select-basic")),
  Route.mapTo(NativeSelectBasicExampleRoute)
);
export const sheetDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("sheet")),
  Route.mapTo(SheetDocsRoute)
);
export const sheetBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("sheet")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(SheetBasicExampleRoute)
);
export const sheetBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("sheet-basic")),
  Route.mapTo(SheetBasicExampleRoute)
);
export const sonnerDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("sonner")),
  Route.mapTo(SonnerDocsRoute)
);
export const sonnerBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("sonner")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(SonnerBasicExampleRoute)
);
export const sonnerBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("sonner-basic")),
  Route.mapTo(SonnerBasicExampleRoute)
);
export const dataTableDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("data-table")),
  Route.mapTo(DataTableDocsRoute)
);
export const dataTableBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("data-table")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(DataTableBasicExampleRoute)
);
export const dataTableBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("data-table-basic")),
  Route.mapTo(DataTableBasicExampleRoute)
);
export const dataTableRowActionsExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("data-table")),
  slash(literal("examples")),
  slash(literal("row-actions")),
  Route.mapTo(DataTableRowActionsExampleRoute)
);
export const dataTableRowActionsStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("data-table-row-actions")),
  Route.mapTo(DataTableRowActionsExampleRoute)
);
export const dataTablePaginationExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("data-table")),
  slash(literal("examples")),
  slash(literal("pagination")),
  Route.mapTo(DataTablePaginationExampleRoute)
);
export const dataTablePaginationStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("data-table-pagination")),
  Route.mapTo(DataTablePaginationExampleRoute)
);
export const dataTableSortingExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("data-table")),
  slash(literal("examples")),
  slash(literal("sorting")),
  Route.mapTo(DataTableSortingExampleRoute)
);
export const dataTableSortingStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("data-table-sorting")),
  Route.mapTo(DataTableSortingExampleRoute)
);
export const dataTableFilteringExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("data-table")),
  slash(literal("examples")),
  slash(literal("filtering")),
  Route.mapTo(DataTableFilteringExampleRoute)
);
export const dataTableFilteringStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("data-table-filtering")),
  Route.mapTo(DataTableFilteringExampleRoute)
);
export const dataTableVisibilityExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("data-table")),
  slash(literal("examples")),
  slash(literal("visibility")),
  Route.mapTo(DataTableVisibilityExampleRoute)
);
export const dataTableVisibilityStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("data-table-visibility")),
  Route.mapTo(DataTableVisibilityExampleRoute)
);
export const dataTableRowSelectionExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("data-table")),
  slash(literal("examples")),
  slash(literal("row-selection")),
  Route.mapTo(DataTableRowSelectionExampleRoute)
);
export const dataTableRowSelectionStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("data-table-row-selection")),
  Route.mapTo(DataTableRowSelectionExampleRoute)
);
export const itemDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("item")),
  Route.mapTo(ItemDocsRoute)
);
export const itemAvatarExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("item")),
  slash(literal("examples")),
  slash(literal("avatar")),
  Route.mapTo(ItemAvatarExampleRoute)
);
export const itemAvatarStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("item-avatar")),
  Route.mapTo(ItemAvatarExampleRoute)
);
export const itemBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("item")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(ItemBasicExampleRoute)
);
export const itemBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("item-basic")),
  Route.mapTo(ItemBasicExampleRoute)
);
export const itemGroupExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("item")),
  slash(literal("examples")),
  slash(literal("group")),
  Route.mapTo(ItemGroupExampleRoute)
);
export const itemGroupStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("item-group")),
  Route.mapTo(ItemGroupExampleRoute)
);
export const itemHeaderExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("item")),
  slash(literal("examples")),
  slash(literal("header")),
  Route.mapTo(ItemHeaderExampleRoute)
);
export const itemHeaderStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("item-header")),
  Route.mapTo(ItemHeaderExampleRoute)
);
export const itemIconExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("item")),
  slash(literal("examples")),
  slash(literal("icon")),
  Route.mapTo(ItemIconExampleRoute)
);
export const itemIconStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("item-icon")),
  Route.mapTo(ItemIconExampleRoute)
);
export const itemImageExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("item")),
  slash(literal("examples")),
  slash(literal("image")),
  Route.mapTo(ItemImageExampleRoute)
);
export const itemImageStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("item-image")),
  Route.mapTo(ItemImageExampleRoute)
);
export const itemLinkExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("item")),
  slash(literal("examples")),
  slash(literal("link")),
  Route.mapTo(ItemLinkExampleRoute)
);
export const itemLinkStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("item-link")),
  Route.mapTo(ItemLinkExampleRoute)
);
export const itemRtlExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("item")),
  slash(literal("examples")),
  slash(literal("rtl")),
  Route.mapTo(ItemRtlExampleRoute)
);
export const itemRtlStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("item-rtl")),
  Route.mapTo(ItemRtlExampleRoute)
);
export const itemSizeExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("item")),
  slash(literal("examples")),
  slash(literal("size")),
  Route.mapTo(ItemSizeExampleRoute)
);
export const itemSizeStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("item-size")),
  Route.mapTo(ItemSizeExampleRoute)
);
export const itemVariantExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("item")),
  slash(literal("examples")),
  slash(literal("variant")),
  Route.mapTo(ItemVariantExampleRoute)
);
export const itemVariantStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("item-variant")),
  Route.mapTo(ItemVariantExampleRoute)
);
export const labelDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("label")),
  Route.mapTo(LabelDocsRoute)
);
export const labelBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("label")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(LabelBasicExampleRoute)
);
export const labelBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("label-basic")),
  Route.mapTo(LabelBasicExampleRoute)
);
export const paginationDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("pagination")),
  Route.mapTo(PaginationDocsRoute)
);
export const paginationBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("pagination")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(PaginationBasicExampleRoute)
);
export const paginationBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("pagination-basic")),
  Route.mapTo(PaginationBasicExampleRoute)
);
export const resizableDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("resizable")),
  Route.mapTo(ResizableDocsRoute)
);
export const resizableBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("resizable")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(ResizableBasicExampleRoute)
);
export const resizableBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("resizable-basic")),
  Route.mapTo(ResizableBasicExampleRoute)
);
export const sidebarDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("sidebar")),
  Route.mapTo(SidebarDocsRoute)
);
export const sidebarBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("sidebar")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(SidebarBasicExampleRoute)
);
export const sidebarBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("sidebar-basic")),
  Route.mapTo(SidebarBasicExampleRoute)
);
export const tableDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("table")),
  Route.mapTo(TableDocsRoute)
);
export const tableBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("table")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(TableBasicExampleRoute)
);
export const tableBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("table-basic")),
  Route.mapTo(TableBasicExampleRoute)
);
export const cardRouter = pipe(literal("card"), Route.mapTo(CardRoute));
export const cardDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("card")),
  Route.mapTo(CardDocsRoute)
);
export const cardBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("card")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(CardBasicExampleRoute)
);
export const cardBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("card-basic")),
  Route.mapTo(CardBasicExampleRoute)
);
export const separatorRouter = pipe(
  literal("separator"),
  Route.mapTo(SeparatorRoute)
);
export const separatorDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("separator")),
  Route.mapTo(SeparatorDocsRoute)
);
export const separatorBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("separator")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(SeparatorBasicExampleRoute)
);
export const separatorBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("separator-basic")),
  Route.mapTo(SeparatorBasicExampleRoute)
);
export const skeletonRouter = pipe(
  literal("skeleton"),
  Route.mapTo(SkeletonRoute)
);
export const skeletonDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("skeleton")),
  Route.mapTo(SkeletonDocsRoute)
);
export const skeletonBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("skeleton")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(SkeletonBasicExampleRoute)
);
export const skeletonBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("skeleton-basic")),
  Route.mapTo(SkeletonBasicExampleRoute)
);
export const spinnerRouter = pipe(
  literal("spinner"),
  Route.mapTo(SpinnerRoute)
);
export const spinnerDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("spinner")),
  Route.mapTo(SpinnerDocsRoute)
);
export const kbdRouter = pipe(literal("kbd"), Route.mapTo(KbdRoute));
export const kbdDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("kbd")),
  Route.mapTo(KbdDocsRoute)
);
export const kbdBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("kbd")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(KbdBasicExampleRoute)
);
export const kbdBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("kbd-basic")),
  Route.mapTo(KbdBasicExampleRoute)
);
export const kbdInputGroupExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("kbd")),
  slash(literal("examples")),
  slash(literal("input-group")),
  Route.mapTo(KbdInputGroupExampleRoute)
);
export const kbdInputGroupStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("kbd-input-group")),
  Route.mapTo(KbdInputGroupExampleRoute)
);
export const typographyRouter = pipe(
  literal("typography"),
  Route.mapTo(TypographyRoute)
);
export const typographyDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("typography")),
  Route.mapTo(TypographyDocsRoute)
);
export const typographyBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("typography")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(TypographyBasicExampleRoute)
);
export const typographyBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("typography-basic")),
  Route.mapTo(TypographyBasicExampleRoute)
);
export const emptyRouter = pipe(literal("empty"), Route.mapTo(EmptyRoute));
export const emptyDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("empty")),
  Route.mapTo(EmptyDocsRoute)
);
export const emptyBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("empty")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(EmptyBasicExampleRoute)
);
export const emptyBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("empty-basic")),
  Route.mapTo(EmptyBasicExampleRoute)
);
export const emptyInputGroupExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("empty")),
  slash(literal("examples")),
  slash(literal("input-group")),
  Route.mapTo(EmptyInputGroupExampleRoute)
);
export const emptyInputGroupStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("empty-input-group")),
  Route.mapTo(EmptyInputGroupExampleRoute)
);
export const buttonRouter = pipe(literal("button"), Route.mapTo(ButtonRoute));
export const buttonDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("button")),
  Route.mapTo(ButtonDocsRoute)
);
export const buttonBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("button")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(ButtonBasicExampleRoute)
);
export const buttonDisabledExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("button")),
  slash(literal("examples")),
  slash(literal("disabled")),
  Route.mapTo(ButtonDisabledExampleRoute)
);
export const baseUiButtonDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("base-ui-button")),
  Route.mapTo(BaseUiButtonDocsRoute)
);
export const shadcnButtonDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("shadcn-button")),
  Route.mapTo(ShadcnButtonDocsRoute)
);
export const buttonBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("button-basic")),
  Route.mapTo(ButtonBasicExampleRoute)
);
export const buttonDisabledStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("button-disabled")),
  Route.mapTo(ButtonDisabledExampleRoute)
);
export const inputGroupRouter = pipe(
  literal("input-group"),
  Route.mapTo(InputGroupRoute)
);
export const inputGroupDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("input-group")),
  Route.mapTo(InputGroupDocsRoute)
);
export const meterRouter = pipe(literal("meter"), Route.mapTo(MeterRoute));
export const meterDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("meter")),
  Route.mapTo(MeterDocsRoute)
);
export const meterBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("meter")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(MeterBasicExampleRoute)
);
export const meterBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("meter-basic")),
  Route.mapTo(MeterBasicExampleRoute)
);
export const scrollAreaRouter = pipe(
  literal("scroll-area"),
  Route.mapTo(ScrollAreaRoute)
);
export const scrollAreaDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("scroll-area")),
  Route.mapTo(ScrollAreaDocsRoute)
);
export const scrollAreaBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("scroll-area")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(ScrollAreaBasicExampleRoute)
);
export const scrollAreaBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("scroll-area-basic")),
  Route.mapTo(ScrollAreaBasicExampleRoute)
);
export const toggleRouter = pipe(literal("toggle"), Route.mapTo(ToggleRoute));
export const toggleDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("toggle")),
  Route.mapTo(ToggleDocsRoute)
);
export const toggleBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("toggle")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(ToggleBasicExampleRoute)
);
export const toggleBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("toggle-basic")),
  Route.mapTo(ToggleBasicExampleRoute)
);
export const toggleGroupDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("toggle-group")),
  Route.mapTo(ToggleGroupDocsRoute)
);
export const toggleGroupBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("toggle-group")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(ToggleGroupBasicExampleRoute)
);
export const toggleGroupBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("toggle-group-basic")),
  Route.mapTo(ToggleGroupBasicExampleRoute)
);
export const radioDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("radio")),
  Route.mapTo(RadioDocsRoute)
);
export const radioBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("radio")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(RadioBasicExampleRoute)
);
export const radioBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("radio-basic")),
  Route.mapTo(RadioBasicExampleRoute)
);
export const toolbarDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("toolbar")),
  Route.mapTo(ToolbarDocsRoute)
);
export const toolbarBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("toolbar")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(ToolbarBasicExampleRoute)
);
export const toolbarBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("toolbar-basic")),
  Route.mapTo(ToolbarBasicExampleRoute)
);
export const progressRouter = pipe(
  literal("progress"),
  Route.mapTo(ProgressRoute)
);
export const progressDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("progress")),
  Route.mapTo(ProgressDocsRoute)
);
export const progressBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("progress")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(ProgressBasicExampleRoute)
);
export const progressBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("progress-basic")),
  Route.mapTo(ProgressBasicExampleRoute)
);
export const calendarRouter = pipe(
  literal("calendar"),
  Route.mapTo(CalendarRoute)
);
export const calendarDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("calendar")),
  Route.mapTo(CalendarDocsRoute)
);
export const shadcnCalendarDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("shadcn-calendar")),
  Route.mapTo(ShadcnCalendarDocsRoute)
);
export const calendarBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("calendar")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(CalendarBasicExampleRoute)
);
export const calendarBoundsExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("calendar")),
  slash(literal("examples")),
  slash(literal("bounds")),
  Route.mapTo(CalendarBoundsExampleRoute)
);
export const calendarBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("calendar-basic")),
  Route.mapTo(CalendarBasicExampleRoute)
);
export const calendarBoundsStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("calendar-bounds")),
  Route.mapTo(CalendarBoundsExampleRoute)
);
export const checkboxRouter = pipe(
  literal("checkbox"),
  Route.mapTo(CheckboxRoute)
);
export const checkboxDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("checkbox")),
  Route.mapTo(CheckboxDocsRoute)
);
export const baseUiCheckboxDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("base-ui-checkbox")),
  Route.mapTo(BaseUiCheckboxDocsRoute)
);
export const shadcnCheckboxDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("shadcn-checkbox")),
  Route.mapTo(ShadcnCheckboxDocsRoute)
);
export const checkboxBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("checkbox")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(CheckboxBasicExampleRoute)
);
export const checkboxIndeterminateExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("checkbox")),
  slash(literal("examples")),
  slash(literal("indeterminate")),
  Route.mapTo(CheckboxIndeterminateExampleRoute)
);
export const checkboxGroupDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("checkbox-group")),
  Route.mapTo(CheckboxGroupDocsRoute)
);
export const checkboxGroupBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("checkbox-group")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(CheckboxGroupBasicExampleRoute)
);
export const checkboxBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("checkbox-basic")),
  Route.mapTo(CheckboxBasicExampleRoute)
);
export const checkboxIndeterminateStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("checkbox-indeterminate")),
  Route.mapTo(CheckboxIndeterminateExampleRoute)
);
export const checkboxGroupBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("checkbox-group-basic")),
  Route.mapTo(CheckboxGroupBasicExampleRoute)
);
export const comboboxRouter = pipe(
  literal("combobox"),
  Route.mapTo(ComboboxRoute)
);
export const comboboxDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("combobox")),
  Route.mapTo(ComboboxDocsRoute)
);
export const shadcnComboboxDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("shadcn-combobox")),
  Route.mapTo(ShadcnComboboxDocsRoute)
);
export const baseUiComboboxDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("base-ui-combobox")),
  Route.mapTo(BaseUiComboboxDocsRoute)
);
export const comboboxBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("combobox")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(ComboboxBasicExampleRoute)
);
export const comboboxMultiExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("combobox")),
  slash(literal("examples")),
  slash(literal("multi")),
  Route.mapTo(ComboboxMultiExampleRoute)
);
export const comboboxBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("combobox-basic")),
  Route.mapTo(ComboboxBasicExampleRoute)
);
export const comboboxMultiStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("combobox-multi")),
  Route.mapTo(ComboboxMultiExampleRoute)
);
export const datePickerRouter = pipe(
  literal("date-picker"),
  Route.mapTo(DatePickerRoute)
);
export const datePickerDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("date-picker")),
  Route.mapTo(DatePickerDocsRoute)
);
export const shadcnDatePickerDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("shadcn-date-picker")),
  Route.mapTo(ShadcnDatePickerDocsRoute)
);
export const datePickerBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("date-picker")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(DatePickerBasicExampleRoute)
);
export const datePickerBoundsExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("date-picker")),
  slash(literal("examples")),
  slash(literal("bounds")),
  Route.mapTo(DatePickerBoundsExampleRoute)
);
export const datePickerBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("date-picker-basic")),
  Route.mapTo(DatePickerBasicExampleRoute)
);
export const datePickerBoundsStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("date-picker-bounds")),
  Route.mapTo(DatePickerBoundsExampleRoute)
);
export const dialogRouter = pipe(literal("dialog"), Route.mapTo(DialogRoute));
export const dialogDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("dialog")),
  Route.mapTo(DialogDocsRoute)
);
export const shadcnDialogDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("shadcn-dialog")),
  Route.mapTo(ShadcnDialogDocsRoute)
);
export const baseUiDialogDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("base-ui-dialog")),
  Route.mapTo(BaseUiDialogDocsRoute)
);
export const dialogBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("dialog")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(DialogBasicExampleRoute)
);
export const dialogAnimatedExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("dialog")),
  slash(literal("examples")),
  slash(literal("animated")),
  Route.mapTo(DialogAnimatedExampleRoute)
);
export const dialogDestructiveExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("dialog")),
  slash(literal("examples")),
  slash(literal("destructive")),
  Route.mapTo(DialogDestructiveExampleRoute)
);
export const dialogFocusExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("dialog")),
  slash(literal("examples")),
  slash(literal("focus")),
  Route.mapTo(DialogFocusExampleRoute)
);
export const dialogScrollableExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("dialog")),
  slash(literal("examples")),
  slash(literal("scrollable")),
  Route.mapTo(DialogScrollableExampleRoute)
);
export const dialogBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("dialog-basic")),
  Route.mapTo(DialogBasicExampleRoute)
);
export const dialogAnimatedStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("dialog-animated")),
  Route.mapTo(DialogAnimatedExampleRoute)
);
export const dialogDestructiveStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("dialog-destructive")),
  Route.mapTo(DialogDestructiveExampleRoute)
);
export const dialogFocusStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("dialog-focus")),
  Route.mapTo(DialogFocusExampleRoute)
);
export const dialogScrollableStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("dialog-scrollable")),
  Route.mapTo(DialogScrollableExampleRoute)
);
export const directionDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("direction")),
  Route.mapTo(DirectionDocsRoute)
);
export const directionBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("direction")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(DirectionBasicExampleRoute)
);
export const directionBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("direction-basic")),
  Route.mapTo(DirectionBasicExampleRoute)
);
export const disclosureRouter = pipe(
  literal("disclosure"),
  Route.mapTo(DisclosureRoute)
);
export const disclosureDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("disclosure")),
  Route.mapTo(DisclosureDocsRoute)
);
export const disclosureBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("disclosure")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(DisclosureBasicExampleRoute)
);
export const disclosureDisabledExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("disclosure")),
  slash(literal("examples")),
  slash(literal("disabled")),
  Route.mapTo(DisclosureDisabledExampleRoute)
);
export const disclosureBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("disclosure-basic")),
  Route.mapTo(DisclosureBasicExampleRoute)
);
export const disclosureDisabledStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("disclosure-disabled")),
  Route.mapTo(DisclosureDisabledExampleRoute)
);
export const dragAndDropRouter = pipe(
  literal("drag-and-drop"),
  Route.mapTo(DragAndDropRoute)
);
export const dragAndDropDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("drag-and-drop")),
  Route.mapTo(DragAndDropDocsRoute)
);
export const dragAndDropBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("drag-and-drop")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(DragAndDropBasicExampleRoute)
);
export const dragAndDropDisabledExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("drag-and-drop")),
  slash(literal("examples")),
  slash(literal("disabled")),
  Route.mapTo(DragAndDropDisabledExampleRoute)
);
export const dragAndDropBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("drag-and-drop-basic")),
  Route.mapTo(DragAndDropBasicExampleRoute)
);
export const dragAndDropDisabledStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("drag-and-drop-disabled")),
  Route.mapTo(DragAndDropDisabledExampleRoute)
);
export const fieldsetRouter = pipe(
  literal("fieldset"),
  Route.mapTo(FieldsetRoute)
);
export const fieldsetDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("fieldset")),
  Route.mapTo(FieldsetDocsRoute)
);
export const baseUiFieldsetDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("base-ui-fieldset")),
  Route.mapTo(BaseUiFieldsetDocsRoute)
);
export const fieldsetBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("fieldset")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(FieldsetBasicExampleRoute)
);
export const fieldsetDisabledExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("fieldset")),
  slash(literal("examples")),
  slash(literal("disabled")),
  Route.mapTo(FieldsetDisabledExampleRoute)
);
export const fieldsetBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("fieldset-basic")),
  Route.mapTo(FieldsetBasicExampleRoute)
);
export const fieldsetDisabledStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("fieldset-disabled")),
  Route.mapTo(FieldsetDisabledExampleRoute)
);
export const fileDropRouter = pipe(
  literal("file-drop"),
  Route.mapTo(FileDropRoute)
);
export const fileDropDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("file-drop")),
  Route.mapTo(FileDropDocsRoute)
);
export const fileDropBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("file-drop")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(FileDropBasicExampleRoute)
);
export const fileDropDisabledExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("file-drop")),
  slash(literal("examples")),
  slash(literal("disabled")),
  Route.mapTo(FileDropDisabledExampleRoute)
);
export const fileDropBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("file-drop-basic")),
  Route.mapTo(FileDropBasicExampleRoute)
);
export const fileDropDisabledStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("file-drop-disabled")),
  Route.mapTo(FileDropDisabledExampleRoute)
);
export const inputRouter = pipe(literal("input"), Route.mapTo(InputRoute));
export const inputDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("input")),
  Route.mapTo(InputDocsRoute)
);
export const baseUiInputDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("base-ui-input")),
  Route.mapTo(BaseUiInputDocsRoute)
);
export const shadcnInputDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("shadcn-input")),
  Route.mapTo(ShadcnInputDocsRoute)
);
export const inputBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("input")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(InputBasicExampleRoute)
);
export const inputDisabledExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("input")),
  slash(literal("examples")),
  slash(literal("disabled")),
  Route.mapTo(InputDisabledExampleRoute)
);
export const inputBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("input-basic")),
  Route.mapTo(InputBasicExampleRoute)
);
export const inputDisabledStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("input-disabled")),
  Route.mapTo(InputDisabledExampleRoute)
);
export const listboxRouter = pipe(
  literal("listbox"),
  Route.mapTo(ListboxRoute)
);
export const listboxDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("listbox")),
  Route.mapTo(ListboxDocsRoute)
);
export const listboxBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("listbox")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(ListboxBasicExampleRoute)
);
export const listboxAnimatedExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("listbox")),
  slash(literal("examples")),
  slash(literal("animated")),
  Route.mapTo(ListboxAnimatedExampleRoute)
);
export const listboxBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("listbox-basic")),
  Route.mapTo(ListboxBasicExampleRoute)
);
export const listboxAnimatedStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("listbox-animated")),
  Route.mapTo(ListboxAnimatedExampleRoute)
);
export const menuRouter = pipe(literal("menu"), Route.mapTo(MenuRoute));
export const menuDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("menu")),
  Route.mapTo(MenuDocsRoute)
);
export const baseUiMenuDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("base-ui-menu")),
  Route.mapTo(BaseUiMenuDocsRoute)
);
export const menuBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("menu")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(MenuBasicExampleRoute)
);
export const menuAnimatedExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("menu")),
  slash(literal("examples")),
  slash(literal("animated")),
  Route.mapTo(MenuAnimatedExampleRoute)
);
export const menuBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("menu-basic")),
  Route.mapTo(MenuBasicExampleRoute)
);
export const menuAnimatedStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("menu-animated")),
  Route.mapTo(MenuAnimatedExampleRoute)
);
export const popoverRouter = pipe(
  literal("popover"),
  Route.mapTo(PopoverRoute)
);
export const popoverDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("popover")),
  Route.mapTo(PopoverDocsRoute)
);
export const baseUiPopoverDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("base-ui-popover")),
  Route.mapTo(BaseUiPopoverDocsRoute)
);
export const popoverBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("popover")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(PopoverBasicExampleRoute)
);
export const popoverAnimatedExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("popover")),
  slash(literal("examples")),
  slash(literal("animated")),
  Route.mapTo(PopoverAnimatedExampleRoute)
);
export const popoverBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("popover-basic")),
  Route.mapTo(PopoverBasicExampleRoute)
);
export const popoverAnimatedStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("popover-animated")),
  Route.mapTo(PopoverAnimatedExampleRoute)
);
export const radioGroupRouter = pipe(
  literal("radio-group"),
  Route.mapTo(RadioGroupRoute)
);
export const radioGroupDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("radio-group")),
  Route.mapTo(RadioGroupDocsRoute)
);
export const baseUiRadioGroupDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("base-ui-radio-group")),
  Route.mapTo(BaseUiRadioGroupDocsRoute)
);
export const radioGroupBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("radio-group")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(RadioGroupBasicExampleRoute)
);
export const radioGroupHorizontalExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("radio-group")),
  slash(literal("examples")),
  slash(literal("horizontal")),
  Route.mapTo(RadioGroupHorizontalExampleRoute)
);
export const radioGroupBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("radio-group-basic")),
  Route.mapTo(RadioGroupBasicExampleRoute)
);
export const radioGroupHorizontalStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("radio-group-horizontal")),
  Route.mapTo(RadioGroupHorizontalExampleRoute)
);
export const selectRouter = pipe(literal("select"), Route.mapTo(SelectRoute));
export const selectDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("select")),
  Route.mapTo(SelectDocsRoute)
);
export const baseUiSelectDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("base-ui-select")),
  Route.mapTo(BaseUiSelectDocsRoute)
);
export const selectBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("select")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(SelectBasicExampleRoute)
);
export const selectDisabledExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("select")),
  slash(literal("examples")),
  slash(literal("disabled")),
  Route.mapTo(SelectDisabledExampleRoute)
);
export const selectBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("select-basic")),
  Route.mapTo(SelectBasicExampleRoute)
);
export const selectDisabledStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("select-disabled")),
  Route.mapTo(SelectDisabledExampleRoute)
);
export const sliderRouter = pipe(literal("slider"), Route.mapTo(SliderRoute));
export const sliderDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("slider")),
  Route.mapTo(SliderDocsRoute)
);
export const baseUiSliderDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("base-ui-slider")),
  Route.mapTo(BaseUiSliderDocsRoute)
);
export const sliderBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("slider")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(SliderBasicExampleRoute)
);
export const sliderDisabledExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("slider")),
  slash(literal("examples")),
  slash(literal("disabled")),
  Route.mapTo(SliderDisabledExampleRoute)
);
export const sliderBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("slider-basic")),
  Route.mapTo(SliderBasicExampleRoute)
);
export const sliderDisabledStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("slider-disabled")),
  Route.mapTo(SliderDisabledExampleRoute)
);
export const switchRouter = pipe(literal("switch"), Route.mapTo(SwitchRoute));
export const switchDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("switch")),
  Route.mapTo(SwitchDocsRoute)
);
export const baseUiSwitchDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("base-ui-switch")),
  Route.mapTo(BaseUiSwitchDocsRoute)
);
export const switchBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("switch")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(SwitchBasicExampleRoute)
);
export const switchDisabledExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("switch")),
  slash(literal("examples")),
  slash(literal("disabled")),
  Route.mapTo(SwitchDisabledExampleRoute)
);
export const switchBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("switch-basic")),
  Route.mapTo(SwitchBasicExampleRoute)
);
export const switchDisabledStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("switch-disabled")),
  Route.mapTo(SwitchDisabledExampleRoute)
);
export const tabsRouter = pipe(literal("tabs"), Route.mapTo(TabsRoute));
export const tabsDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("tabs")),
  Route.mapTo(TabsDocsRoute)
);
export const baseUiTabsDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("base-ui-tabs")),
  Route.mapTo(BaseUiTabsDocsRoute)
);
export const tabsBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("tabs")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(TabsBasicExampleRoute)
);
export const tabsManualExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("tabs")),
  slash(literal("examples")),
  slash(literal("manual")),
  Route.mapTo(TabsManualExampleRoute)
);
export const tabsBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("tabs-basic")),
  Route.mapTo(TabsBasicExampleRoute)
);
export const tabsManualStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("tabs-manual")),
  Route.mapTo(TabsManualExampleRoute)
);
export const textareaRouter = pipe(
  literal("textarea"),
  Route.mapTo(TextareaRoute)
);
export const textareaDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("textarea")),
  Route.mapTo(TextareaDocsRoute)
);
export const textareaBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("textarea")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(TextareaBasicExampleRoute)
);
export const textareaDisabledExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("textarea")),
  slash(literal("examples")),
  slash(literal("disabled")),
  Route.mapTo(TextareaDisabledExampleRoute)
);
export const textareaBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("textarea-basic")),
  Route.mapTo(TextareaBasicExampleRoute)
);
export const textareaDisabledStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("textarea-disabled")),
  Route.mapTo(TextareaDisabledExampleRoute)
);
export const toastRouter = pipe(literal("toast"), Route.mapTo(ToastRoute));
export const toastDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("toast")),
  Route.mapTo(ToastDocsRoute)
);
export const baseUiToastDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("base-ui-toast")),
  Route.mapTo(BaseUiToastDocsRoute)
);
export const toastBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("toast")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(ToastBasicExampleRoute)
);
export const toastVariantsExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("toast")),
  slash(literal("examples")),
  slash(literal("variants")),
  Route.mapTo(ToastVariantsExampleRoute)
);
export const toastBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("toast-basic")),
  Route.mapTo(ToastBasicExampleRoute)
);
export const toastVariantsStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("toast-variants")),
  Route.mapTo(ToastVariantsExampleRoute)
);
export const tooltipRouter = pipe(
  literal("tooltip"),
  Route.mapTo(TooltipRoute)
);
export const tooltipDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("tooltip")),
  Route.mapTo(TooltipDocsRoute)
);
export const baseUiTooltipDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("base-ui-tooltip")),
  Route.mapTo(BaseUiTooltipDocsRoute)
);
export const tooltipBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("tooltip")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(TooltipBasicExampleRoute)
);
export const tooltipNoDelayExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("tooltip")),
  slash(literal("examples")),
  slash(literal("no-delay")),
  Route.mapTo(TooltipNoDelayExampleRoute)
);
export const tooltipBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("tooltip-basic")),
  Route.mapTo(TooltipBasicExampleRoute)
);
export const tooltipNoDelayStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("tooltip-no-delay")),
  Route.mapTo(TooltipNoDelayExampleRoute)
);
export const animationRouter = pipe(
  literal("animation"),
  Route.mapTo(AnimationRoute)
);
export const animationDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("animation")),
  Route.mapTo(AnimationDocsRoute)
);
export const animationBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("animation")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(AnimationBasicExampleRoute)
);
export const animationBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("animation-basic")),
  Route.mapTo(AnimationBasicExampleRoute)
);
export const virtualListRouter = pipe(
  literal("virtual-list"),
  Route.mapTo(VirtualListRoute)
);
export const virtualListDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("virtual-list")),
  Route.mapTo(VirtualListDocsRoute)
);
export const virtualListBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("virtual-list")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(VirtualListBasicExampleRoute)
);
export const virtualListVariableExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("virtual-list")),
  slash(literal("examples")),
  slash(literal("variable")),
  Route.mapTo(VirtualListVariableExampleRoute)
);
export const virtualListBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("virtual-list-basic")),
  Route.mapTo(VirtualListBasicExampleRoute)
);
export const virtualListVariableStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("virtual-list-variable")),
  Route.mapTo(VirtualListVariableExampleRoute)
);

const routeParser = Route.oneOf(
  avatarRouter,
  avatarBasicExampleRouter,
  avatarBasicStandaloneExampleRouter,
  avatarDocsRouter,
  shadcnAvatarDocsRouter,
  badgeRouter,
  badgeBasicExampleRouter,
  badgeBasicStandaloneExampleRouter,
  badgeSpinnerExampleRouter,
  badgeSpinnerStandaloneExampleRouter,
  badgeDocsRouter,
  carouselBasicExampleRouter,
  carouselBasicStandaloneExampleRouter,
  carouselSizesExampleRouter,
  carouselSizesStandaloneExampleRouter,
  carouselSpacingExampleRouter,
  carouselSpacingStandaloneExampleRouter,
  carouselOrientationExampleRouter,
  carouselOrientationStandaloneExampleRouter,
  carouselApiExampleRouter,
  carouselApiStandaloneExampleRouter,
  carouselRtlExampleRouter,
  carouselRtlStandaloneExampleRouter,
  carouselDocsRouter,

  chartBasicExampleRouter,
  chartBasicStandaloneExampleRouter,
  chartGridExampleRouter,
  chartGridStandaloneExampleRouter,
  chartAxisExampleRouter,
  chartAxisStandaloneExampleRouter,
  chartTooltipExampleRouter,
  chartTooltipStandaloneExampleRouter,
  chartLegendExampleRouter,
  chartLegendStandaloneExampleRouter,
  chartRtlExampleRouter,
  chartRtlStandaloneExampleRouter,
  chartDocsRouter,
  commandBasicExampleRouter,
  commandBasicStandaloneExampleRouter,
  commandDocsRouter,
  dropdownMenuBasicExampleRouter,
  dropdownMenuBasicStandaloneExampleRouter,
  dropdownMenuDocsRouter,
  hoverCardBasicExampleRouter,
  hoverCardBasicStandaloneExampleRouter,
  hoverCardDocsRouter,
  inputOtpBasicExampleRouter,
  inputOtpBasicStandaloneExampleRouter,
  inputOtpDocsRouter,
  nativeSelectBasicExampleRouter,
  nativeSelectBasicStandaloneExampleRouter,
  nativeSelectDocsRouter,
  sheetBasicExampleRouter,
  sheetBasicStandaloneExampleRouter,
  sheetDocsRouter,
  sonnerBasicExampleRouter,
  sonnerBasicStandaloneExampleRouter,
  sonnerDocsRouter,
  dataTableBasicExampleRouter,
  dataTableBasicStandaloneExampleRouter,
  dataTableRowActionsExampleRouter,
  dataTableRowActionsStandaloneExampleRouter,
  dataTablePaginationExampleRouter,
  dataTablePaginationStandaloneExampleRouter,
  dataTableSortingExampleRouter,
  dataTableSortingStandaloneExampleRouter,
  dataTableFilteringExampleRouter,
  dataTableFilteringStandaloneExampleRouter,
  dataTableVisibilityExampleRouter,
  dataTableVisibilityStandaloneExampleRouter,
  dataTableRowSelectionExampleRouter,
  dataTableRowSelectionStandaloneExampleRouter,
  dataTableDocsRouter,
  directionBasicExampleRouter,
  directionBasicStandaloneExampleRouter,
  directionDocsRouter,
  itemAvatarExampleRouter,
  itemAvatarStandaloneExampleRouter,
  itemBasicExampleRouter,
  itemBasicStandaloneExampleRouter,
  itemGroupExampleRouter,
  itemGroupStandaloneExampleRouter,
  itemHeaderExampleRouter,
  itemHeaderStandaloneExampleRouter,
  itemIconExampleRouter,
  itemIconStandaloneExampleRouter,
  itemImageExampleRouter,
  itemImageStandaloneExampleRouter,
  itemLinkExampleRouter,
  itemLinkStandaloneExampleRouter,
  itemRtlExampleRouter,
  itemRtlStandaloneExampleRouter,
  itemSizeExampleRouter,
  itemSizeStandaloneExampleRouter,
  itemVariantExampleRouter,
  itemVariantStandaloneExampleRouter,
  itemDocsRouter,
  labelBasicExampleRouter,
  labelBasicStandaloneExampleRouter,
  labelDocsRouter,
  paginationBasicExampleRouter,
  paginationBasicStandaloneExampleRouter,
  paginationDocsRouter,
  resizableBasicExampleRouter,
  resizableBasicStandaloneExampleRouter,
  resizableDocsRouter,
  sidebarBasicExampleRouter,
  sidebarBasicStandaloneExampleRouter,
  sidebarDocsRouter,
  tableBasicExampleRouter,
  tableBasicStandaloneExampleRouter,
  tableDocsRouter,
  cardRouter,
  cardBasicExampleRouter,
  cardBasicStandaloneExampleRouter,
  cardDocsRouter,
  separatorRouter,
  separatorBasicExampleRouter,
  separatorBasicStandaloneExampleRouter,
  separatorDocsRouter,
  skeletonRouter,
  skeletonBasicExampleRouter,
  skeletonBasicStandaloneExampleRouter,
  skeletonDocsRouter,
  spinnerRouter,
  spinnerDocsRouter,
  kbdRouter,
  kbdBasicExampleRouter,
  kbdBasicStandaloneExampleRouter,
  kbdInputGroupExampleRouter,
  kbdInputGroupStandaloneExampleRouter,
  kbdDocsRouter,
  typographyRouter,
  typographyBasicExampleRouter,
  typographyBasicStandaloneExampleRouter,
  typographyDocsRouter,
  emptyRouter,
  emptyBasicExampleRouter,
  emptyBasicStandaloneExampleRouter,
  emptyInputGroupExampleRouter,
  emptyInputGroupStandaloneExampleRouter,
  emptyDocsRouter,
  buttonRouter,
  buttonBasicExampleRouter,
  buttonDisabledExampleRouter,
  buttonBasicStandaloneExampleRouter,
  buttonDisabledStandaloneExampleRouter,
  buttonDocsRouter,
  baseUiButtonDocsRouter,
  shadcnButtonDocsRouter,
  inputGroupRouter,
  inputGroupDocsRouter,
  meterRouter,
  meterBasicExampleRouter,
  meterBasicStandaloneExampleRouter,
  meterDocsRouter,
  scrollAreaRouter,
  scrollAreaBasicExampleRouter,
  scrollAreaBasicStandaloneExampleRouter,
  scrollAreaDocsRouter,
  toggleRouter,
  toggleBasicExampleRouter,
  toggleBasicStandaloneExampleRouter,
  toggleDocsRouter,
  toggleGroupBasicExampleRouter,
  toggleGroupBasicStandaloneExampleRouter,
  toggleGroupDocsRouter,
  radioBasicExampleRouter,
  radioBasicStandaloneExampleRouter,
  radioDocsRouter,
  toolbarBasicExampleRouter,
  toolbarBasicStandaloneExampleRouter,
  toolbarDocsRouter,
  progressRouter,
  progressBasicExampleRouter,
  progressBasicStandaloneExampleRouter,
  progressDocsRouter,
  calendarRouter,
  calendarBasicExampleRouter,
  calendarBoundsExampleRouter,
  calendarBasicStandaloneExampleRouter,
  calendarBoundsStandaloneExampleRouter,
  calendarDocsRouter,
  shadcnCalendarDocsRouter,
  checkboxRouter,
  checkboxBasicExampleRouter,
  checkboxIndeterminateExampleRouter,
  checkboxBasicStandaloneExampleRouter,
  checkboxIndeterminateStandaloneExampleRouter,
  checkboxDocsRouter,
  baseUiCheckboxDocsRouter,
  shadcnCheckboxDocsRouter,
  checkboxGroupBasicExampleRouter,
  checkboxGroupBasicStandaloneExampleRouter,
  checkboxGroupDocsRouter,
  comboboxRouter,
  comboboxBasicExampleRouter,
  comboboxMultiExampleRouter,
  comboboxBasicStandaloneExampleRouter,
  comboboxMultiStandaloneExampleRouter,
  comboboxDocsRouter,
  shadcnComboboxDocsRouter,
  baseUiComboboxDocsRouter,
  datePickerRouter,
  datePickerBasicExampleRouter,
  datePickerBoundsExampleRouter,
  datePickerBasicStandaloneExampleRouter,
  datePickerBoundsStandaloneExampleRouter,
  datePickerDocsRouter,
  shadcnDatePickerDocsRouter,
  dialogRouter,
  dialogBasicExampleRouter,
  dialogAnimatedExampleRouter,
  dialogDestructiveExampleRouter,
  dialogFocusExampleRouter,
  dialogScrollableExampleRouter,
  dialogBasicStandaloneExampleRouter,
  dialogAnimatedStandaloneExampleRouter,
  dialogDestructiveStandaloneExampleRouter,
  dialogFocusStandaloneExampleRouter,
  dialogScrollableStandaloneExampleRouter,
  dialogDocsRouter,
  shadcnDialogDocsRouter,
  baseUiDialogDocsRouter,
  disclosureRouter,
  disclosureBasicExampleRouter,
  disclosureDisabledExampleRouter,
  disclosureBasicStandaloneExampleRouter,
  disclosureDisabledStandaloneExampleRouter,
  disclosureDocsRouter,
  dragAndDropRouter,
  dragAndDropBasicExampleRouter,
  dragAndDropDisabledExampleRouter,
  dragAndDropBasicStandaloneExampleRouter,
  dragAndDropDisabledStandaloneExampleRouter,
  dragAndDropDocsRouter,
  fieldsetRouter,
  fieldsetBasicExampleRouter,
  fieldsetDisabledExampleRouter,
  fieldsetBasicStandaloneExampleRouter,
  fieldsetDisabledStandaloneExampleRouter,
  fieldsetDocsRouter,
  baseUiFieldsetDocsRouter,
  fileDropRouter,
  fileDropBasicExampleRouter,
  fileDropDisabledExampleRouter,
  fileDropBasicStandaloneExampleRouter,
  fileDropDisabledStandaloneExampleRouter,
  fileDropDocsRouter,
  inputRouter,
  inputBasicExampleRouter,
  inputDisabledExampleRouter,
  inputBasicStandaloneExampleRouter,
  inputDisabledStandaloneExampleRouter,
  inputDocsRouter,
  baseUiInputDocsRouter,
  shadcnInputDocsRouter,
  listboxRouter,
  listboxBasicExampleRouter,
  listboxAnimatedExampleRouter,
  listboxBasicStandaloneExampleRouter,
  listboxAnimatedStandaloneExampleRouter,
  listboxDocsRouter,
  menuRouter,
  menuBasicExampleRouter,
  menuAnimatedExampleRouter,
  menuBasicStandaloneExampleRouter,
  menuAnimatedStandaloneExampleRouter,
  menuDocsRouter,
  baseUiMenuDocsRouter,
  popoverRouter,
  popoverBasicExampleRouter,
  popoverAnimatedExampleRouter,
  popoverBasicStandaloneExampleRouter,
  popoverAnimatedStandaloneExampleRouter,
  popoverDocsRouter,
  baseUiPopoverDocsRouter,
  radioGroupRouter,
  radioGroupBasicExampleRouter,
  radioGroupHorizontalExampleRouter,
  radioGroupBasicStandaloneExampleRouter,
  radioGroupHorizontalStandaloneExampleRouter,
  radioGroupDocsRouter,
  baseUiRadioGroupDocsRouter,
  selectRouter,
  selectBasicExampleRouter,
  selectDisabledExampleRouter,
  selectBasicStandaloneExampleRouter,
  selectDisabledStandaloneExampleRouter,
  selectDocsRouter,
  baseUiSelectDocsRouter,
  sliderRouter,
  sliderBasicExampleRouter,
  sliderDisabledExampleRouter,
  sliderBasicStandaloneExampleRouter,
  sliderDisabledStandaloneExampleRouter,
  sliderDocsRouter,
  baseUiSliderDocsRouter,
  switchRouter,
  switchBasicExampleRouter,
  switchDisabledExampleRouter,
  switchBasicStandaloneExampleRouter,
  switchDisabledStandaloneExampleRouter,
  switchDocsRouter,
  baseUiSwitchDocsRouter,
  tabsRouter,
  tabsBasicExampleRouter,
  tabsManualExampleRouter,
  tabsBasicStandaloneExampleRouter,
  tabsManualStandaloneExampleRouter,
  tabsDocsRouter,
  baseUiTabsDocsRouter,
  textareaRouter,
  textareaBasicExampleRouter,
  textareaDisabledExampleRouter,
  textareaBasicStandaloneExampleRouter,
  textareaDisabledStandaloneExampleRouter,
  textareaDocsRouter,
  toastRouter,
  toastBasicExampleRouter,
  toastVariantsExampleRouter,
  toastBasicStandaloneExampleRouter,
  toastVariantsStandaloneExampleRouter,
  toastDocsRouter,
  baseUiToastDocsRouter,
  tooltipRouter,
  tooltipBasicExampleRouter,
  tooltipNoDelayExampleRouter,
  tooltipBasicStandaloneExampleRouter,
  tooltipNoDelayStandaloneExampleRouter,
  tooltipDocsRouter,
  baseUiTooltipDocsRouter,
  animationRouter,
  animationBasicExampleRouter,
  animationBasicStandaloneExampleRouter,
  animationDocsRouter,
  virtualListRouter,
  virtualListBasicExampleRouter,
  virtualListVariableExampleRouter,
  virtualListBasicStandaloneExampleRouter,
  virtualListVariableStandaloneExampleRouter,
  virtualListDocsRouter,
  accordionBasicExampleRouter,
  accordionBasicStandaloneExampleRouter,
  accordionMultipleExampleRouter,
  accordionMultipleStandaloneExampleRouter,
  alertBasicExampleRouter,
  alertBasicStandaloneExampleRouter,
  alertDestructiveExampleRouter,
  alertDestructiveStandaloneExampleRouter,
  alertDocsRouter,
  aspectRatioBasicExampleRouter,
  aspectRatioBasicStandaloneExampleRouter,
  aspectRatioSquareExampleRouter,
  aspectRatioSquareStandaloneExampleRouter,
  aspectRatioPortraitExampleRouter,
  aspectRatioPortraitStandaloneExampleRouter,
  aspectRatioRtlExampleRouter,
  aspectRatioRtlStandaloneExampleRouter,
  aspectRatioDocsRouter,
  breadcrumbBasicExampleRouter,
  breadcrumbBasicStandaloneExampleRouter,
  breadcrumbSeparatorExampleRouter,
  breadcrumbSeparatorStandaloneExampleRouter,
  breadcrumbDropdownExampleRouter,
  breadcrumbDropdownStandaloneExampleRouter,
  breadcrumbCollapsedExampleRouter,
  breadcrumbCollapsedStandaloneExampleRouter,
  breadcrumbLinkExampleRouter,
  breadcrumbLinkStandaloneExampleRouter,
  breadcrumbRtlExampleRouter,
  breadcrumbRtlStandaloneExampleRouter,
  breadcrumbDocsRouter,
  buttonGroupBasicExampleRouter,
  buttonGroupBasicStandaloneExampleRouter,
  buttonGroupOrientationExampleRouter,
  buttonGroupOrientationStandaloneExampleRouter,
  buttonGroupSizeExampleRouter,
  buttonGroupSizeStandaloneExampleRouter,
  buttonGroupNestedExampleRouter,
  buttonGroupNestedStandaloneExampleRouter,
  buttonGroupSeparatorExampleRouter,
  buttonGroupSeparatorStandaloneExampleRouter,
  buttonGroupSplitExampleRouter,
  buttonGroupSplitStandaloneExampleRouter,
  buttonGroupInputExampleRouter,
  buttonGroupInputStandaloneExampleRouter,
  buttonGroupInputGroupExampleRouter,
  buttonGroupInputGroupStandaloneExampleRouter,
  buttonGroupSelectExampleRouter,
  buttonGroupSelectStandaloneExampleRouter,
  buttonGroupPopoverExampleRouter,
  buttonGroupPopoverStandaloneExampleRouter,
  buttonGroupRtlExampleRouter,
  buttonGroupRtlStandaloneExampleRouter,
  buttonGroupDocsRouter,
  alertDialogBasicExampleRouter,
  alertDialogBasicStandaloneExampleRouter,
  alertDialogDocsRouter,
  shadcnAlertDialogDocsRouter,
  drawerBasicExampleRouter,
  drawerBasicStandaloneExampleRouter,
  drawerDocsRouter,
  shadcnDrawerDocsRouter,
  contextMenuBasicExampleRouter,
  contextMenuBasicStandaloneExampleRouter,
  contextMenuDocsRouter,
  shadcnContextMenuDocsRouter,
  menubarBasicExampleRouter,
  menubarBasicStandaloneExampleRouter,
  menubarDocsRouter,
  navigationMenuBasicExampleRouter,
  navigationMenuBasicStandaloneExampleRouter,
  navigationMenuDocsRouter,
  otpFieldBasicExampleRouter,
  otpFieldBasicStandaloneExampleRouter,
  otpFieldDocsRouter,
  previewCardBasicExampleRouter,
  previewCardBasicStandaloneExampleRouter,
  previewCardDocsRouter,
  accordionDocsRouter,
  shadcnAccordionDocsRouter,
  collapsibleBasicExampleRouter,
  collapsibleBasicStandaloneExampleRouter,
  collapsibleDocsRouter,
  shadcnCollapsibleDocsRouter,
  fieldBasicExampleRouter,
  fieldBasicStandaloneExampleRouter,
  fieldDocsRouter,
  numberFieldBasicExampleRouter,
  numberFieldBasicStandaloneExampleRouter,
  numberFieldDocsRouter,
  formBasicExampleRouter,
  formBasicStandaloneExampleRouter,
  formDocsRouter,
  autocompleteBasicExampleRouter,
  autocompleteBasicStandaloneExampleRouter,
  autocompleteDocsRouter,
  homeRouter
);

const urlToAppRoute = Route.parseUrlWithFallback(routeParser, NotFoundRoute);
const appBasePath = import.meta.env.BASE_URL;

export const appPath = (path: string): string => {
  if (path === "/") {
    return appBasePath;
  }

  return `${appBasePath}${path.replace(/^\//u, "")}`;
};

const stripAppBasePath = (pathname: string): string => {
  if (appBasePath === "/") {
    return pathname;
  }

  const basePath = appBasePath.endsWith("/")
    ? appBasePath.slice(0, -1)
    : appBasePath;

  if (pathname === basePath) {
    return "/";
  }

  if (pathname.startsWith(appBasePath)) {
    return `/${pathname.slice(appBasePath.length)}`;
  }

  return pathname;
};

const urlToBaseAwareAppRoute = (url: Url): AppRoute =>
  urlToAppRoute({
    ...url,
    pathname: stripAppBasePath(url.pathname),
  });

// MODEL

export const Model = S.Struct({
  route: AppRoute,
  accordionBasicExample: AccordionBasicExample.Model,
  accordionMultipleExample: AccordionMultipleExample.Model,
  alertBasicExample: AlertBasicExample.Model,
  alertDestructiveExample: AlertDestructiveExample.Model,
  aspectRatioBasicExample: AspectRatioBasicExample.Model,
  aspectRatioSquareExample: AspectRatioSquareExample.Model,
  aspectRatioPortraitExample: AspectRatioPortraitExample.Model,
  aspectRatioRtlExample: AspectRatioRtlExample.Model,
  breadcrumbBasicExample: BreadcrumbBasicExample.Model,
  breadcrumbSeparatorExample: BreadcrumbSeparatorExample.Model,
  breadcrumbDropdownExample: BreadcrumbDropdownExample.Model,
  breadcrumbCollapsedExample: BreadcrumbCollapsedExample.Model,
  breadcrumbLinkExample: BreadcrumbLinkExample.Model,
  breadcrumbRtlExample: BreadcrumbRtlExample.Model,
  buttonGroupBasicExample: ButtonGroupBasicExample.Model,
  buttonGroupOrientationExample: ButtonGroupOrientationExample.Model,
  buttonGroupSizeExample: ButtonGroupSizeExample.Model,
  buttonGroupNestedExample: ButtonGroupNestedExample.Model,
  buttonGroupSeparatorExample: ButtonGroupSeparatorExample.Model,
  buttonGroupSplitExample: ButtonGroupSplitExample.Model,
  buttonGroupInputExample: ButtonGroupInputExample.Model,
  buttonGroupInputGroupExample: ButtonGroupInputGroupExample.Model,
  buttonGroupSelectExample: ButtonGroupSelectExample.Model,
  buttonGroupPopoverExample: ButtonGroupPopoverExample.Model,
  buttonGroupRtlExample: ButtonGroupRtlExample.Model,
  alertDialogBasicExample: AlertDialogBasicExample.Model,
  drawerBasicExample: DrawerBasicExample.Model,
  contextMenuBasicExample: ContextMenuBasicExample.Model,
  menubarBasicExample: MenubarBasicExample.Model,
  navigationMenuBasicExample: NavigationMenuBasicExample.Model,
  otpFieldBasicExample: OtpFieldBasicExample.Model,
  previewCardBasicExample: PreviewCardBasicExample.Model,
  collapsibleBasicExample: CollapsibleBasicExample.Model,
  fieldBasicExample: FieldBasicExample.Model,
  numberFieldBasicExample: NumberFieldBasicExample.Model,
  formBasicExample: FormBasicExample.Model,
  autocompleteBasicExample: AutocompleteBasicExample.Model,
  uiModel: UiModel,
  animationBasicExample: AnimationBasicExample.Model,
  avatarBasicExample: AvatarBasicExample.Model,
  badgeBasicExample: BadgeBasicExample.Model,
  badgeSpinnerExample: BadgeSpinnerExample.Model,
  carouselBasicExample: CarouselBasicExample.Model,
  carouselSizesExample: CarouselSizesExample.Model,
  carouselSpacingExample: CarouselSpacingExample.Model,
  carouselOrientationExample: CarouselOrientationExample.Model,
  carouselApiExample: CarouselApiExample.Model,
  carouselRtlExample: CarouselRtlExample.Model,
  chartBasicExample: ChartBasicExample.Model,
  chartGridExample: ChartGridExample.Model,
  chartAxisExample: ChartAxisExample.Model,
  chartTooltipExample: ChartTooltipExample.Model,
  chartLegendExample: ChartLegendExample.Model,
  chartRtlExample: ChartRtlExample.Model,
  commandBasicExample: CommandBasicExample.Model,
  dropdownMenuBasicExample: DropdownMenuBasicExample.Model,
  hoverCardBasicExample: HoverCardBasicExample.Model,
  inputOtpBasicExample: InputOtpBasicExample.Model,
  nativeSelectBasicExample: NativeSelectBasicExample.Model,
  sheetBasicExample: SheetBasicExample.Model,
  sonnerBasicExample: SonnerBasicExample.Model,
  dataTableBasicExample: DataTableBasicExample.Model,
  dataTableRowActionsExample: DataTableRowActionsExample.Model,
  dataTablePaginationExample: DataTablePaginationExample.Model,
  dataTableSortingExample: DataTableSortingExample.Model,
  dataTableFilteringExample: DataTableFilteringExample.Model,
  dataTableVisibilityExample: DataTableVisibilityExample.Model,
  dataTableRowSelectionExample: DataTableRowSelectionExample.Model,
  directionBasicExample: DirectionBasicExample.Model,
  itemAvatarExample: ItemAvatarExample.Model,
  itemBasicExample: ItemBasicExample.Model,
  itemGroupExample: ItemGroupExample.Model,
  itemHeaderExample: ItemHeaderExample.Model,
  itemIconExample: ItemIconExample.Model,
  itemImageExample: ItemImageExample.Model,
  itemLinkExample: ItemLinkExample.Model,
  itemRtlExample: ItemRtlExample.Model,
  itemSizeExample: ItemSizeExample.Model,
  itemVariantExample: ItemVariantExample.Model,
  labelBasicExample: LabelBasicExample.Model,
  paginationBasicExample: PaginationBasicExample.Model,
  resizableBasicExample: ResizableBasicExample.Model,
  sidebarBasicExample: SidebarBasicExample.Model,
  tableBasicExample: TableBasicExample.Model,
  cardBasicExample: CardBasicExample.Model,
  separatorBasicExample: SeparatorBasicExample.Model,
  skeletonBasicExample: SkeletonBasicExample.Model,
  kbdBasicExample: KbdBasicExample.Model,
  kbdInputGroupExample: KbdInputGroupExample.Model,
  typographyBasicExample: TypographyBasicExample.Model,
  emptyBasicExample: EmptyBasicExample.Model,
  emptyInputGroupExample: EmptyInputGroupExample.Model,
  buttonBasicExample: ButtonBasicExample.Model,
  buttonDisabledExample: ButtonDisabledExample.Model,
  calendarBasicExample: CalendarBasicExample.Model,
  calendarBoundsExample: CalendarBoundsExample.Model,
  checkboxBasicExample: CheckboxBasicExample.Model,
  checkboxGroupBasicExample: CheckboxGroupBasicExample.Model,
  checkboxIndeterminateExample: CheckboxIndeterminateExample.Model,
  comboboxBasicExample: ComboboxBasicExample.Model,
  comboboxMultiExample: ComboboxMultiExample.Model,
  datePickerBasicExample: DatePickerBasicExample.Model,
  datePickerBoundsExample: DatePickerBoundsExample.Model,
  dialogBasicExample: DialogBasicExample.Model,
  dialogAnimatedExample: DialogAnimatedExample.Model,
  dialogDestructiveExample: DialogDestructiveExample.Model,
  dialogFocusExample: DialogFocusExample.Model,
  dialogScrollableExample: DialogScrollableExample.Model,
  disclosureBasicExample: DisclosureBasicExample.Model,
  disclosureDisabledExample: DisclosureDisabledExample.Model,
  dragAndDropBasicExample: DragAndDropBasicExample.Model,
  dragAndDropDisabledExample: DragAndDropDisabledExample.Model,
  fieldsetBasicExample: FieldsetBasicExample.Model,
  fieldsetDisabledExample: FieldsetDisabledExample.Model,
  fileDropBasicExample: FileDropBasicExample.Model,
  fileDropDisabledExample: FileDropDisabledExample.Model,
  inputBasicExample: InputBasicExample.Model,
  inputDisabledExample: InputDisabledExample.Model,
  meterBasicExample: MeterBasicExample.Model,
  scrollAreaBasicExample: ScrollAreaBasicExample.Model,
  toggleBasicExample: ToggleBasicExample.Model,
  toggleGroupBasicExample: ToggleGroupBasicExample.Model,
  radioBasicExample: RadioBasicExample.Model,
  toolbarBasicExample: ToolbarBasicExample.Model,
  progressBasicExample: ProgressBasicExample.Model,
  listboxBasicExample: ListboxBasicExample.Model,
  listboxAnimatedExample: ListboxAnimatedExample.Model,
  menuBasicExample: MenuBasicExample.Model,
  menuAnimatedExample: MenuAnimatedExample.Model,
  popoverBasicExample: PopoverBasicExample.Model,
  popoverAnimatedExample: PopoverAnimatedExample.Model,
  radioGroupBasicExample: RadioGroupBasicExample.Model,
  radioGroupHorizontalExample: RadioGroupHorizontalExample.Model,
  selectBasicExample: SelectBasicExample.Model,
  selectDisabledExample: SelectDisabledExample.Model,
  sliderBasicExample: SliderBasicExample.Model,
  sliderDisabledExample: SliderDisabledExample.Model,
  switchBasicExample: SwitchBasicExample.Model,
  switchDisabledExample: SwitchDisabledExample.Model,
  tabsBasicExample: TabsBasicExample.Model,
  tabsManualExample: TabsManualExample.Model,
  textareaBasicExample: TextareaBasicExample.Model,
  textareaDisabledExample: TextareaDisabledExample.Model,
  toastBasicExample: ToastBasicExample.Model,
  toastVariantsExample: ToastVariantsExample.Model,
  tooltipBasicExample: TooltipBasicExample.Model,
  tooltipNoDelayExample: TooltipNoDelayExample.Model,
  virtualListBasicExample: VirtualListBasicExample.Model,
  virtualListVariableExample: VirtualListVariableExample.Model,
});

export type Model = typeof Model.Type;

// MESSAGE

export const CompletedNavigateInternal = m("CompletedNavigateInternal");
export const CompletedLoadExternal = m("CompletedLoadExternal");
export const ClickedLink = m("ClickedLink", {
  request: UrlRequest,
});
export const ChangedUrl = m("ChangedUrl", { url: Url });
export const GotUiMessage = m("GotUiMessage", {
  message: UiMessage,
});
export const GotAccordionBasicExampleMessage = m(
  "GotAccordionBasicExampleMessage",
  {
    message: AccordionBasicExample.Message,
  }
);
export const GotAccordionMultipleExampleMessage = m(
  "GotAccordionMultipleExampleMessage",
  {
    message: AccordionMultipleExample.Message,
  }
);
export const GotAlertBasicExampleMessage = m("GotAlertBasicExampleMessage", {
  message: AlertBasicExample.Message,
});
export const GotAlertDestructiveExampleMessage = m(
  "GotAlertDestructiveExampleMessage",
  {
    message: AlertDestructiveExample.Message,
  }
);
export const GotAspectRatioBasicExampleMessage = m(
  "GotAspectRatioBasicExampleMessage",
  {
    message: AspectRatioBasicExample.Message,
  }
);
export const GotAspectRatioSquareExampleMessage = m(
  "GotAspectRatioSquareExampleMessage",
  {
    message: AspectRatioSquareExample.Message,
  }
);
export const GotAspectRatioPortraitExampleMessage = m(
  "GotAspectRatioPortraitExampleMessage",
  {
    message: AspectRatioPortraitExample.Message,
  }
);
export const GotAspectRatioRtlExampleMessage = m(
  "GotAspectRatioRtlExampleMessage",
  {
    message: AspectRatioRtlExample.Message,
  }
);
export const GotBreadcrumbBasicExampleMessage = m(
  "GotBreadcrumbBasicExampleMessage",
  { message: BreadcrumbBasicExample.Message }
);
export const GotBreadcrumbSeparatorExampleMessage = m(
  "GotBreadcrumbSeparatorExampleMessage",
  { message: BreadcrumbSeparatorExample.Message }
);
export const GotBreadcrumbDropdownExampleMessage = m(
  "GotBreadcrumbDropdownExampleMessage",
  { message: BreadcrumbDropdownExample.Message }
);
export const GotBreadcrumbCollapsedExampleMessage = m(
  "GotBreadcrumbCollapsedExampleMessage",
  { message: BreadcrumbCollapsedExample.Message }
);
export const GotBreadcrumbLinkExampleMessage = m(
  "GotBreadcrumbLinkExampleMessage",
  { message: BreadcrumbLinkExample.Message }
);
export const GotBreadcrumbRtlExampleMessage = m(
  "GotBreadcrumbRtlExampleMessage",
  { message: BreadcrumbRtlExample.Message }
);
export const GotButtonGroupBasicExampleMessage = m(
  "GotButtonGroupBasicExampleMessage",
  { message: ButtonGroupBasicExample.Message }
);
export const GotButtonGroupOrientationExampleMessage = m(
  "GotButtonGroupOrientationExampleMessage",
  { message: ButtonGroupOrientationExample.Message }
);
export const GotButtonGroupSizeExampleMessage = m(
  "GotButtonGroupSizeExampleMessage",
  { message: ButtonGroupSizeExample.Message }
);
export const GotButtonGroupNestedExampleMessage = m(
  "GotButtonGroupNestedExampleMessage",
  { message: ButtonGroupNestedExample.Message }
);
export const GotButtonGroupSeparatorExampleMessage = m(
  "GotButtonGroupSeparatorExampleMessage",
  { message: ButtonGroupSeparatorExample.Message }
);
export const GotButtonGroupSplitExampleMessage = m(
  "GotButtonGroupSplitExampleMessage",
  { message: ButtonGroupSplitExample.Message }
);
export const GotButtonGroupInputExampleMessage = m(
  "GotButtonGroupInputExampleMessage",
  { message: ButtonGroupInputExample.Message }
);
export const GotButtonGroupInputGroupExampleMessage = m(
  "GotButtonGroupInputGroupExampleMessage",
  { message: ButtonGroupInputGroupExample.Message }
);
export const GotButtonGroupSelectExampleMessage = m(
  "GotButtonGroupSelectExampleMessage",
  { message: ButtonGroupSelectExample.Message }
);
export const GotButtonGroupPopoverExampleMessage = m(
  "GotButtonGroupPopoverExampleMessage",
  { message: ButtonGroupPopoverExample.Message }
);
export const GotButtonGroupRtlExampleMessage = m(
  "GotButtonGroupRtlExampleMessage",
  { message: ButtonGroupRtlExample.Message }
);
export const GotAlertDialogBasicExampleMessage = m(
  "GotAlertDialogBasicExampleMessage",
  {
    message: AlertDialogBasicExample.Message,
  }
);
export const GotDrawerBasicExampleMessage = m("GotDrawerBasicExampleMessage", {
  message: DrawerBasicExample.Message,
});
export const GotContextMenuBasicExampleMessage = m(
  "GotContextMenuBasicExampleMessage",
  {
    message: ContextMenuBasicExample.Message,
  }
);
export const GotMenubarBasicExampleMessage = m(
  "GotMenubarBasicExampleMessage",
  {
    message: MenubarBasicExample.Message,
  }
);
export const GotNavigationMenuBasicExampleMessage = m(
  "GotNavigationMenuBasicExampleMessage",
  {
    message: NavigationMenuBasicExample.Message,
  }
);
export const GotOtpFieldBasicExampleMessage = m(
  "GotOtpFieldBasicExampleMessage",
  {
    message: OtpFieldBasicExample.Message,
  }
);
export const GotPreviewCardBasicExampleMessage = m(
  "GotPreviewCardBasicExampleMessage",
  {
    message: PreviewCardBasicExample.Message,
  }
);
export const GotCollapsibleBasicExampleMessage = m(
  "GotCollapsibleBasicExampleMessage",
  {
    message: CollapsibleBasicExample.Message,
  }
);
export const GotFieldBasicExampleMessage = m("GotFieldBasicExampleMessage", {
  message: FieldBasicExample.Message,
});
export const GotNumberFieldBasicExampleMessage = m(
  "GotNumberFieldBasicExampleMessage",
  {
    message: NumberFieldBasicExample.Message,
  }
);
export const GotFormBasicExampleMessage = m("GotFormBasicExampleMessage", {
  message: FormBasicExample.Message,
});
export const GotAutocompleteBasicExampleMessage = m(
  "GotAutocompleteBasicExampleMessage",
  {
    message: AutocompleteBasicExample.Message,
  }
);
export const GotAnimationBasicExampleMessage = m(
  "GotAnimationBasicExampleMessage",
  {
    message: AnimationBasicExample.Message,
  }
);
export const GotAvatarBasicExampleMessage = m("GotAvatarBasicExampleMessage", {
  message: AvatarBasicExample.Message,
});
export const GotBadgeBasicExampleMessage = m("GotBadgeBasicExampleMessage", {
  message: BadgeBasicExample.Message,
});
export const GotBadgeSpinnerExampleMessage = m(
  "GotBadgeSpinnerExampleMessage",
  {
    message: BadgeSpinnerExample.Message,
  }
);
export const GotCarouselBasicExampleMessage = m(
  "GotCarouselBasicExampleMessage",
  {
    message: CarouselBasicExample.Message,
  }
);
export const GotCarouselSizesExampleMessage = m(
  "GotCarouselSizesExampleMessage",
  {
    message: CarouselSizesExample.Message,
  }
);
export const GotCarouselSpacingExampleMessage = m(
  "GotCarouselSpacingExampleMessage",
  {
    message: CarouselSpacingExample.Message,
  }
);
export const GotCarouselOrientationExampleMessage = m(
  "GotCarouselOrientationExampleMessage",
  {
    message: CarouselOrientationExample.Message,
  }
);
export const GotCarouselApiExampleMessage = m("GotCarouselApiExampleMessage", {
  message: CarouselApiExample.Message,
});
export const GotCarouselRtlExampleMessage = m("GotCarouselRtlExampleMessage", {
  message: CarouselRtlExample.Message,
});
export const GotChartBasicExampleMessage = m("GotChartBasicExampleMessage", {
  message: ChartBasicExample.Message,
});
export const GotChartGridExampleMessage = m("GotChartGridExampleMessage", {
  message: ChartGridExample.Message,
});
export const GotChartAxisExampleMessage = m("GotChartAxisExampleMessage", {
  message: ChartAxisExample.Message,
});
export const GotChartTooltipExampleMessage = m(
  "GotChartTooltipExampleMessage",
  {
    message: ChartTooltipExample.Message,
  }
);
export const GotChartLegendExampleMessage = m("GotChartLegendExampleMessage", {
  message: ChartLegendExample.Message,
});
export const GotChartRtlExampleMessage = m("GotChartRtlExampleMessage", {
  message: ChartRtlExample.Message,
});
export const GotDataTableBasicExampleMessage = m(
  "GotDataTableBasicExampleMessage",
  {
    message: DataTableBasicExample.Message,
  }
);
export const GotDataTableRowActionsExampleMessage = m(
  "GotDataTableRowActionsExampleMessage",
  {
    message: DataTableRowActionsExample.Message,
  }
);
export const GotDataTablePaginationExampleMessage = m(
  "GotDataTablePaginationExampleMessage",
  {
    message: DataTablePaginationExample.Message,
  }
);
export const GotDataTableSortingExampleMessage = m(
  "GotDataTableSortingExampleMessage",
  {
    message: DataTableSortingExample.Message,
  }
);
export const GotDataTableFilteringExampleMessage = m(
  "GotDataTableFilteringExampleMessage",
  {
    message: DataTableFilteringExample.Message,
  }
);
export const GotDataTableVisibilityExampleMessage = m(
  "GotDataTableVisibilityExampleMessage",
  {
    message: DataTableVisibilityExample.Message,
  }
);
export const GotDataTableRowSelectionExampleMessage = m(
  "GotDataTableRowSelectionExampleMessage",
  {
    message: DataTableRowSelectionExample.Message,
  }
);
export const GotDirectionBasicExampleMessage = m(
  "GotDirectionBasicExampleMessage",
  {
    message: DirectionBasicExample.Message,
  }
);
export const GotItemAvatarExampleMessage = m("GotItemAvatarExampleMessage", {
  message: ItemAvatarExample.Message,
});
export const GotItemBasicExampleMessage = m("GotItemBasicExampleMessage", {
  message: ItemBasicExample.Message,
});
export const GotItemGroupExampleMessage = m("GotItemGroupExampleMessage", {
  message: ItemGroupExample.Message,
});
export const GotItemHeaderExampleMessage = m("GotItemHeaderExampleMessage", {
  message: ItemHeaderExample.Message,
});
export const GotItemIconExampleMessage = m("GotItemIconExampleMessage", {
  message: ItemIconExample.Message,
});
export const GotItemImageExampleMessage = m("GotItemImageExampleMessage", {
  message: ItemImageExample.Message,
});
export const GotItemLinkExampleMessage = m("GotItemLinkExampleMessage", {
  message: ItemLinkExample.Message,
});
export const GotItemRtlExampleMessage = m("GotItemRtlExampleMessage", {
  message: ItemRtlExample.Message,
});
export const GotItemSizeExampleMessage = m("GotItemSizeExampleMessage", {
  message: ItemSizeExample.Message,
});
export const GotItemVariantExampleMessage = m("GotItemVariantExampleMessage", {
  message: ItemVariantExample.Message,
});
export const GotLabelBasicExampleMessage = m("GotLabelBasicExampleMessage", {
  message: LabelBasicExample.Message,
});
export const GotPaginationBasicExampleMessage = m(
  "GotPaginationBasicExampleMessage",
  { message: PaginationBasicExample.Message }
);
export const GotResizableBasicExampleMessage = m(
  "GotResizableBasicExampleMessage",
  { message: ResizableBasicExample.Message }
);
export const GotSidebarBasicExampleMessage = m(
  "GotSidebarBasicExampleMessage",
  { message: SidebarBasicExample.Message }
);
export const GotTableBasicExampleMessage = m("GotTableBasicExampleMessage", {
  message: TableBasicExample.Message,
});
export const GotCommandBasicExampleMessage = m(
  "GotCommandBasicExampleMessage",
  { message: CommandBasicExample.Message }
);
export const GotDropdownMenuBasicExampleMessage = m(
  "GotDropdownMenuBasicExampleMessage",
  { message: DropdownMenuBasicExample.Message }
);
export const GotHoverCardBasicExampleMessage = m(
  "GotHoverCardBasicExampleMessage",
  { message: HoverCardBasicExample.Message }
);
export const GotInputOtpBasicExampleMessage = m(
  "GotInputOtpBasicExampleMessage",
  { message: InputOtpBasicExample.Message }
);
export const GotNativeSelectBasicExampleMessage = m(
  "GotNativeSelectBasicExampleMessage",
  { message: NativeSelectBasicExample.Message }
);
export const GotSheetBasicExampleMessage = m("GotSheetBasicExampleMessage", {
  message: SheetBasicExample.Message,
});
export const GotSonnerBasicExampleMessage = m("GotSonnerBasicExampleMessage", {
  message: SonnerBasicExample.Message,
});
export const GotCardBasicExampleMessage = m("GotCardBasicExampleMessage", {
  message: CardBasicExample.Message,
});
export const GotSeparatorBasicExampleMessage = m(
  "GotSeparatorBasicExampleMessage",
  {
    message: SeparatorBasicExample.Message,
  }
);
export const GotSkeletonBasicExampleMessage = m(
  "GotSkeletonBasicExampleMessage",
  {
    message: SkeletonBasicExample.Message,
  }
);
export const GotKbdBasicExampleMessage = m("GotKbdBasicExampleMessage", {
  message: KbdBasicExample.Message,
});
export const GotKbdInputGroupExampleMessage = m(
  "GotKbdInputGroupExampleMessage",
  {
    message: KbdInputGroupExample.Message,
  }
);
export const GotTypographyBasicExampleMessage = m(
  "GotTypographyBasicExampleMessage",
  {
    message: TypographyBasicExample.Message,
  }
);
export const GotEmptyBasicExampleMessage = m("GotEmptyBasicExampleMessage", {
  message: EmptyBasicExample.Message,
});
export const GotEmptyInputGroupExampleMessage = m(
  "GotEmptyInputGroupExampleMessage",
  {
    message: EmptyInputGroupExample.Message,
  }
);
export const GotButtonBasicExampleMessage = m("GotButtonBasicExampleMessage", {
  message: ButtonBasicExample.Message,
});
export const GotButtonDisabledExampleMessage = m(
  "GotButtonDisabledExampleMessage",
  {
    message: ButtonDisabledExample.Message,
  }
);
export const GotCalendarBasicExampleMessage = m(
  "GotCalendarBasicExampleMessage",
  {
    message: CalendarBasicExample.Message,
  }
);
export const GotCalendarBoundsExampleMessage = m(
  "GotCalendarBoundsExampleMessage",
  {
    message: CalendarBoundsExample.Message,
  }
);
export const GotCheckboxBasicExampleMessage = m(
  "GotCheckboxBasicExampleMessage",
  {
    message: CheckboxBasicExample.Message,
  }
);
export const GotCheckboxGroupBasicExampleMessage = m(
  "GotCheckboxGroupBasicExampleMessage",
  {
    message: CheckboxGroupBasicExample.Message,
  }
);
export const GotCheckboxIndeterminateExampleMessage = m(
  "GotCheckboxIndeterminateExampleMessage",
  {
    message: CheckboxIndeterminateExample.Message,
  }
);
export const GotComboboxBasicExampleMessage = m(
  "GotComboboxBasicExampleMessage",
  {
    message: ComboboxBasicExample.Message,
  }
);
export const GotComboboxMultiExampleMessage = m(
  "GotComboboxMultiExampleMessage",
  {
    message: ComboboxMultiExample.Message,
  }
);
export const GotDatePickerBasicExampleMessage = m(
  "GotDatePickerBasicExampleMessage",
  {
    message: DatePickerBasicExample.Message,
  }
);
export const GotDatePickerBoundsExampleMessage = m(
  "GotDatePickerBoundsExampleMessage",
  {
    message: DatePickerBoundsExample.Message,
  }
);
export const GotDialogBasicExampleMessage = m("GotDialogBasicExampleMessage", {
  message: DialogBasicExample.Message,
});
export const GotDialogAnimatedExampleMessage = m(
  "GotDialogAnimatedExampleMessage",
  {
    message: DialogAnimatedExample.Message,
  }
);
export const GotDialogDestructiveExampleMessage = m(
  "GotDialogDestructiveExampleMessage",
  {
    message: DialogDestructiveExample.Message,
  }
);
export const GotDialogFocusExampleMessage = m("GotDialogFocusExampleMessage", {
  message: DialogFocusExample.Message,
});
export const GotDialogScrollableExampleMessage = m(
  "GotDialogScrollableExampleMessage",
  {
    message: DialogScrollableExample.Message,
  }
);
export const GotDisclosureBasicExampleMessage = m(
  "GotDisclosureBasicExampleMessage",
  {
    message: DisclosureBasicExample.Message,
  }
);
export const GotDisclosureDisabledExampleMessage = m(
  "GotDisclosureDisabledExampleMessage",
  {
    message: DisclosureDisabledExample.Message,
  }
);
export const GotDragAndDropBasicExampleMessage = m(
  "GotDragAndDropBasicExampleMessage",
  {
    message: DragAndDropBasicExample.Message,
  }
);
export const GotDragAndDropDisabledExampleMessage = m(
  "GotDragAndDropDisabledExampleMessage",
  {
    message: DragAndDropDisabledExample.Message,
  }
);
export const GotFieldsetBasicExampleMessage = m(
  "GotFieldsetBasicExampleMessage",
  {
    message: FieldsetBasicExample.Message,
  }
);
export const GotFieldsetDisabledExampleMessage = m(
  "GotFieldsetDisabledExampleMessage",
  {
    message: FieldsetDisabledExample.Message,
  }
);
export const GotFileDropBasicExampleMessage = m(
  "GotFileDropBasicExampleMessage",
  {
    message: FileDropBasicExample.Message,
  }
);
export const GotFileDropDisabledExampleMessage = m(
  "GotFileDropDisabledExampleMessage",
  {
    message: FileDropDisabledExample.Message,
  }
);
export const GotInputBasicExampleMessage = m("GotInputBasicExampleMessage", {
  message: InputBasicExample.Message,
});
export const GotInputDisabledExampleMessage = m(
  "GotInputDisabledExampleMessage",
  {
    message: InputDisabledExample.Message,
  }
);
export const GotMeterBasicExampleMessage = m("GotMeterBasicExampleMessage", {
  message: MeterBasicExample.Message,
});
export const GotScrollAreaBasicExampleMessage = m(
  "GotScrollAreaBasicExampleMessage",
  {
    message: ScrollAreaBasicExample.Message,
  }
);
export const GotToggleBasicExampleMessage = m("GotToggleBasicExampleMessage", {
  message: ToggleBasicExample.Message,
});
export const GotToggleGroupBasicExampleMessage = m(
  "GotToggleGroupBasicExampleMessage",
  {
    message: ToggleGroupBasicExample.Message,
  }
);
export const GotRadioBasicExampleMessage = m("GotRadioBasicExampleMessage", {
  message: RadioBasicExample.Message,
});
export const GotToolbarBasicExampleMessage = m(
  "GotToolbarBasicExampleMessage",
  {
    message: ToolbarBasicExample.Message,
  }
);
export const GotProgressBasicExampleMessage = m(
  "GotProgressBasicExampleMessage",
  {
    message: ProgressBasicExample.Message,
  }
);
export const GotListboxBasicExampleMessage = m(
  "GotListboxBasicExampleMessage",
  {
    message: ListboxBasicExample.Message,
  }
);
export const GotListboxAnimatedExampleMessage = m(
  "GotListboxAnimatedExampleMessage",
  {
    message: ListboxAnimatedExample.Message,
  }
);
export const GotMenuBasicExampleMessage = m("GotMenuBasicExampleMessage", {
  message: MenuBasicExample.Message,
});
export const GotMenuAnimatedExampleMessage = m(
  "GotMenuAnimatedExampleMessage",
  {
    message: MenuAnimatedExample.Message,
  }
);
export const GotPopoverBasicExampleMessage = m(
  "GotPopoverBasicExampleMessage",
  {
    message: PopoverBasicExample.Message,
  }
);
export const GotPopoverAnimatedExampleMessage = m(
  "GotPopoverAnimatedExampleMessage",
  {
    message: PopoverAnimatedExample.Message,
  }
);
export const GotRadioGroupBasicExampleMessage = m(
  "GotRadioGroupBasicExampleMessage",
  {
    message: RadioGroupBasicExample.Message,
  }
);
export const GotRadioGroupHorizontalExampleMessage = m(
  "GotRadioGroupHorizontalExampleMessage",
  {
    message: RadioGroupHorizontalExample.Message,
  }
);
export const GotSelectBasicExampleMessage = m("GotSelectBasicExampleMessage", {
  message: SelectBasicExample.Message,
});
export const GotSelectDisabledExampleMessage = m(
  "GotSelectDisabledExampleMessage",
  {
    message: SelectDisabledExample.Message,
  }
);
export const GotSliderBasicExampleMessage = m("GotSliderBasicExampleMessage", {
  message: SliderBasicExample.Message,
});
export const GotSliderDisabledExampleMessage = m(
  "GotSliderDisabledExampleMessage",
  {
    message: SliderDisabledExample.Message,
  }
);
export const GotSwitchBasicExampleMessage = m("GotSwitchBasicExampleMessage", {
  message: SwitchBasicExample.Message,
});
export const GotSwitchDisabledExampleMessage = m(
  "GotSwitchDisabledExampleMessage",
  {
    message: SwitchDisabledExample.Message,
  }
);
export const GotTabsBasicExampleMessage = m("GotTabsBasicExampleMessage", {
  message: TabsBasicExample.Message,
});
export const GotTabsManualExampleMessage = m("GotTabsManualExampleMessage", {
  message: TabsManualExample.Message,
});
export const GotTextareaBasicExampleMessage = m(
  "GotTextareaBasicExampleMessage",
  {
    message: TextareaBasicExample.Message,
  }
);
export const GotTextareaDisabledExampleMessage = m(
  "GotTextareaDisabledExampleMessage",
  {
    message: TextareaDisabledExample.Message,
  }
);
export const GotToastBasicExampleMessage = m("GotToastBasicExampleMessage", {
  message: ToastBasicExample.Message,
});
export const GotToastVariantsExampleMessage = m(
  "GotToastVariantsExampleMessage",
  {
    message: ToastVariantsExample.Message,
  }
);
export const GotTooltipBasicExampleMessage = m(
  "GotTooltipBasicExampleMessage",
  {
    message: TooltipBasicExample.Message,
  }
);
export const GotTooltipNoDelayExampleMessage = m(
  "GotTooltipNoDelayExampleMessage",
  {
    message: TooltipNoDelayExample.Message,
  }
);
export const GotVirtualListBasicExampleMessage = m(
  "GotVirtualListBasicExampleMessage",
  {
    message: VirtualListBasicExample.Message,
  }
);
export const GotVirtualListVariableExampleMessage = m(
  "GotVirtualListVariableExampleMessage",
  {
    message: VirtualListVariableExample.Message,
  }
);

export const Message = S.Union([
  CompletedNavigateInternal,
  CompletedLoadExternal,
  ClickedLink,
  ChangedUrl,
  GotUiMessage,
  GotAccordionBasicExampleMessage,
  GotAccordionMultipleExampleMessage,
  GotAlertBasicExampleMessage,
  GotAlertDestructiveExampleMessage,
  GotAspectRatioBasicExampleMessage,
  GotAspectRatioSquareExampleMessage,
  GotAspectRatioPortraitExampleMessage,
  GotAspectRatioRtlExampleMessage,
  GotBreadcrumbBasicExampleMessage,
  GotBreadcrumbSeparatorExampleMessage,
  GotBreadcrumbDropdownExampleMessage,
  GotBreadcrumbCollapsedExampleMessage,
  GotBreadcrumbLinkExampleMessage,
  GotBreadcrumbRtlExampleMessage,
  GotButtonGroupBasicExampleMessage,
  GotButtonGroupOrientationExampleMessage,
  GotButtonGroupSizeExampleMessage,
  GotButtonGroupNestedExampleMessage,
  GotButtonGroupSeparatorExampleMessage,
  GotButtonGroupSplitExampleMessage,
  GotButtonGroupInputExampleMessage,
  GotButtonGroupInputGroupExampleMessage,
  GotButtonGroupSelectExampleMessage,
  GotButtonGroupPopoverExampleMessage,
  GotButtonGroupRtlExampleMessage,
  GotAlertDialogBasicExampleMessage,
  GotDrawerBasicExampleMessage,
  GotContextMenuBasicExampleMessage,
  GotMenubarBasicExampleMessage,
  GotNavigationMenuBasicExampleMessage,
  GotOtpFieldBasicExampleMessage,
  GotPreviewCardBasicExampleMessage,
  GotCollapsibleBasicExampleMessage,
  GotFieldBasicExampleMessage,
  GotNumberFieldBasicExampleMessage,
  GotFormBasicExampleMessage,
  GotAutocompleteBasicExampleMessage,
  GotAnimationBasicExampleMessage,
  GotAvatarBasicExampleMessage,
  GotBadgeBasicExampleMessage,
  GotBadgeSpinnerExampleMessage,
  GotCarouselBasicExampleMessage,
  GotCarouselSizesExampleMessage,
  GotCarouselSpacingExampleMessage,
  GotCarouselOrientationExampleMessage,
  GotCarouselApiExampleMessage,
  GotCarouselRtlExampleMessage,
  GotChartBasicExampleMessage,
  GotChartGridExampleMessage,
  GotChartAxisExampleMessage,
  GotChartTooltipExampleMessage,
  GotChartLegendExampleMessage,
  GotChartRtlExampleMessage,
  GotDataTableBasicExampleMessage,
  GotDataTableRowActionsExampleMessage,
  GotDataTablePaginationExampleMessage,
  GotDataTableSortingExampleMessage,
  GotDataTableFilteringExampleMessage,
  GotDataTableVisibilityExampleMessage,
  GotDataTableRowSelectionExampleMessage,
  GotDirectionBasicExampleMessage,
  GotItemAvatarExampleMessage,
  GotItemBasicExampleMessage,
  GotItemGroupExampleMessage,
  GotItemHeaderExampleMessage,
  GotItemIconExampleMessage,
  GotItemImageExampleMessage,
  GotItemLinkExampleMessage,
  GotItemRtlExampleMessage,
  GotItemSizeExampleMessage,
  GotItemVariantExampleMessage,
  GotLabelBasicExampleMessage,
  GotPaginationBasicExampleMessage,
  GotResizableBasicExampleMessage,
  GotSidebarBasicExampleMessage,
  GotTableBasicExampleMessage,
  GotCommandBasicExampleMessage,
  GotDropdownMenuBasicExampleMessage,
  GotHoverCardBasicExampleMessage,
  GotInputOtpBasicExampleMessage,
  GotNativeSelectBasicExampleMessage,
  GotSheetBasicExampleMessage,
  GotSonnerBasicExampleMessage,
  GotCardBasicExampleMessage,
  GotSeparatorBasicExampleMessage,
  GotSkeletonBasicExampleMessage,
  GotKbdBasicExampleMessage,
  GotKbdInputGroupExampleMessage,
  GotTypographyBasicExampleMessage,
  GotEmptyBasicExampleMessage,
  GotEmptyInputGroupExampleMessage,
  GotButtonBasicExampleMessage,
  GotButtonDisabledExampleMessage,
  GotCalendarBasicExampleMessage,
  GotCalendarBoundsExampleMessage,
  GotCheckboxBasicExampleMessage,
  GotCheckboxGroupBasicExampleMessage,
  GotCheckboxIndeterminateExampleMessage,
  GotComboboxBasicExampleMessage,
  GotComboboxMultiExampleMessage,
  GotDatePickerBasicExampleMessage,
  GotDatePickerBoundsExampleMessage,
  GotDialogBasicExampleMessage,
  GotDialogAnimatedExampleMessage,
  GotDialogDestructiveExampleMessage,
  GotDialogFocusExampleMessage,
  GotDialogScrollableExampleMessage,
  GotDisclosureBasicExampleMessage,
  GotDisclosureDisabledExampleMessage,
  GotDragAndDropBasicExampleMessage,
  GotDragAndDropDisabledExampleMessage,
  GotFieldsetBasicExampleMessage,
  GotFieldsetDisabledExampleMessage,
  GotFileDropBasicExampleMessage,
  GotFileDropDisabledExampleMessage,
  GotInputBasicExampleMessage,
  GotInputDisabledExampleMessage,
  GotMeterBasicExampleMessage,
  GotScrollAreaBasicExampleMessage,
  GotToggleBasicExampleMessage,
  GotToggleGroupBasicExampleMessage,
  GotRadioBasicExampleMessage,
  GotToolbarBasicExampleMessage,
  GotProgressBasicExampleMessage,
  GotListboxBasicExampleMessage,
  GotListboxAnimatedExampleMessage,
  GotMenuBasicExampleMessage,
  GotMenuAnimatedExampleMessage,
  GotPopoverBasicExampleMessage,
  GotPopoverAnimatedExampleMessage,
  GotRadioGroupBasicExampleMessage,
  GotRadioGroupHorizontalExampleMessage,
  GotSelectBasicExampleMessage,
  GotSelectDisabledExampleMessage,
  GotSliderBasicExampleMessage,
  GotSliderDisabledExampleMessage,
  GotSwitchBasicExampleMessage,
  GotSwitchDisabledExampleMessage,
  GotTabsBasicExampleMessage,
  GotTabsManualExampleMessage,
  GotTextareaBasicExampleMessage,
  GotTextareaDisabledExampleMessage,
  GotToastBasicExampleMessage,
  GotToastVariantsExampleMessage,
  GotTooltipBasicExampleMessage,
  GotTooltipNoDelayExampleMessage,
  GotVirtualListBasicExampleMessage,
  GotVirtualListVariableExampleMessage,
]);
export type Message = typeof Message.Type;

// COMMAND

const NavigateInternal = Command.define(
  "NavigateInternal",
  { url: S.String },
  CompletedNavigateInternal
)(({ url }) => pushUrl(url).pipe(Effect.as(CompletedNavigateInternal())));

const LoadExternal = Command.define(
  "LoadExternal",
  { href: S.String },
  CompletedLoadExternal
)(({ href }) => load(href).pipe(Effect.as(CompletedLoadExternal())));

// INIT

export const Flags = S.Struct({
  today: Calendar.CalendarDate,
});

export type Flags = typeof Flags.Type;

export const flags: Effect.Effect<Flags> = Effect.gen(function* flags() {
  const today = yield* Calendar.today.local;
  return { today };
});

export const init: Runtime.RoutingProgramInit<Model, Message, Flags> = (
  flags: Flags,
  url: Url
) => {
  const [initialUiModel, uiCommands] = uiInit(flags.today);
  const [accordionBasicExample, accordionBasicExampleCommands] =
    AccordionBasicExample.init();
  const [accordionMultipleExample, accordionMultipleExampleCommands] =
    AccordionMultipleExample.init();
  const [alertBasicExample, alertBasicExampleCommands] =
    AlertBasicExample.init();
  const [alertDestructiveExample, alertDestructiveExampleCommands] =
    AlertDestructiveExample.init();
  const [aspectRatioBasicExample, aspectRatioBasicExampleCommands] =
    AspectRatioBasicExample.init();
  const [aspectRatioSquareExample, aspectRatioSquareExampleCommands] =
    AspectRatioSquareExample.init();
  const [aspectRatioPortraitExample, aspectRatioPortraitExampleCommands] =
    AspectRatioPortraitExample.init();
  const [aspectRatioRtlExample, aspectRatioRtlExampleCommands] =
    AspectRatioRtlExample.init();
  const [breadcrumbBasicExample, breadcrumbBasicExampleCommands] =
    BreadcrumbBasicExample.init();
  const [breadcrumbSeparatorExample, breadcrumbSeparatorExampleCommands] =
    BreadcrumbSeparatorExample.init();
  const [breadcrumbDropdownExample, breadcrumbDropdownExampleCommands] =
    BreadcrumbDropdownExample.init();
  const [breadcrumbCollapsedExample, breadcrumbCollapsedExampleCommands] =
    BreadcrumbCollapsedExample.init();
  const [breadcrumbLinkExample, breadcrumbLinkExampleCommands] =
    BreadcrumbLinkExample.init();
  const [breadcrumbRtlExample, breadcrumbRtlExampleCommands] =
    BreadcrumbRtlExample.init();
  const [buttonGroupBasicExample, buttonGroupBasicExampleCommands] =
    ButtonGroupBasicExample.init();
  const [buttonGroupOrientationExample, buttonGroupOrientationExampleCommands] =
    ButtonGroupOrientationExample.init();
  const [buttonGroupSizeExample, buttonGroupSizeExampleCommands] =
    ButtonGroupSizeExample.init();
  const [buttonGroupNestedExample, buttonGroupNestedExampleCommands] =
    ButtonGroupNestedExample.init();
  const [buttonGroupSeparatorExample, buttonGroupSeparatorExampleCommands] =
    ButtonGroupSeparatorExample.init();
  const [buttonGroupSplitExample, buttonGroupSplitExampleCommands] =
    ButtonGroupSplitExample.init();
  const [buttonGroupInputExample, buttonGroupInputExampleCommands] =
    ButtonGroupInputExample.init();
  const [buttonGroupInputGroupExample, buttonGroupInputGroupExampleCommands] =
    ButtonGroupInputGroupExample.init();
  const [buttonGroupSelectExample, buttonGroupSelectExampleCommands] =
    ButtonGroupSelectExample.init();
  const [buttonGroupPopoverExample, buttonGroupPopoverExampleCommands] =
    ButtonGroupPopoverExample.init();
  const [buttonGroupRtlExample, buttonGroupRtlExampleCommands] =
    ButtonGroupRtlExample.init();
  const [alertDialogBasicExample, alertDialogBasicExampleCommands] =
    AlertDialogBasicExample.init();
  const [drawerBasicExample, drawerBasicExampleCommands] =
    DrawerBasicExample.init();
  const [contextMenuBasicExample, contextMenuBasicExampleCommands] =
    ContextMenuBasicExample.init();
  const [menubarBasicExample, menubarBasicExampleCommands] =
    MenubarBasicExample.init();
  const [navigationMenuBasicExample, navigationMenuBasicExampleCommands] =
    NavigationMenuBasicExample.init();
  const [otpFieldBasicExample, otpFieldBasicExampleCommands] =
    OtpFieldBasicExample.init();
  const [previewCardBasicExample, previewCardBasicExampleCommands] =
    PreviewCardBasicExample.init();
  const [collapsibleBasicExample, collapsibleBasicExampleCommands] =
    CollapsibleBasicExample.init();
  const [fieldBasicExample, fieldBasicExampleCommands] =
    FieldBasicExample.init();
  const [numberFieldBasicExample, numberFieldBasicExampleCommands] =
    NumberFieldBasicExample.init();
  const [formBasicExample, formBasicExampleCommands] = FormBasicExample.init();
  const [autocompleteBasicExample, autocompleteBasicExampleCommands] =
    AutocompleteBasicExample.init();
  const [animationBasicExample, animationBasicExampleCommands] =
    AnimationBasicExample.init();
  const [avatarBasicExample, avatarBasicExampleCommands] =
    AvatarBasicExample.init();
  const [badgeBasicExample, badgeBasicExampleCommands] =
    BadgeBasicExample.init();
  const [badgeSpinnerExample, badgeSpinnerExampleCommands] =
    BadgeSpinnerExample.init();
  const [carouselBasicExample, carouselBasicExampleCommands] =
    CarouselBasicExample.init();
  const [carouselSizesExample, carouselSizesExampleCommands] =
    CarouselSizesExample.init();
  const [carouselSpacingExample, carouselSpacingExampleCommands] =
    CarouselSpacingExample.init();
  const [carouselOrientationExample, carouselOrientationExampleCommands] =
    CarouselOrientationExample.init();
  const [carouselApiExample, carouselApiExampleCommands] =
    CarouselApiExample.init();
  const [carouselRtlExample, carouselRtlExampleCommands] =
    CarouselRtlExample.init();
  const [chartBasicExample, chartBasicExampleCommands] =
    ChartBasicExample.init();
  const [chartGridExample, chartGridExampleCommands] = ChartGridExample.init();
  const [chartAxisExample, chartAxisExampleCommands] = ChartAxisExample.init();
  const [chartTooltipExample, chartTooltipExampleCommands] =
    ChartTooltipExample.init();
  const [chartLegendExample, chartLegendExampleCommands] =
    ChartLegendExample.init();
  const [chartRtlExample, chartRtlExampleCommands] = ChartRtlExample.init();
  const [commandBasicExample, commandBasicExampleCommands] =
    CommandBasicExample.init();
  const [dropdownMenuBasicExample, dropdownMenuBasicExampleCommands] =
    DropdownMenuBasicExample.init();
  const [hoverCardBasicExample, hoverCardBasicExampleCommands] =
    HoverCardBasicExample.init();
  const [inputOtpBasicExample, inputOtpBasicExampleCommands] =
    InputOtpBasicExample.init();
  const [nativeSelectBasicExample, nativeSelectBasicExampleCommands] =
    NativeSelectBasicExample.init();
  const [sheetBasicExample, sheetBasicExampleCommands] =
    SheetBasicExample.init();
  const [sonnerBasicExample, sonnerBasicExampleCommands] =
    SonnerBasicExample.init();
  const [dataTableBasicExample, dataTableBasicExampleCommands] =
    DataTableBasicExample.init();
  const [dataTableRowActionsExample, dataTableRowActionsExampleCommands] =
    DataTableRowActionsExample.init();
  const [dataTablePaginationExample, dataTablePaginationExampleCommands] =
    DataTablePaginationExample.init();
  const [dataTableSortingExample, dataTableSortingExampleCommands] =
    DataTableSortingExample.init();
  const [dataTableFilteringExample, dataTableFilteringExampleCommands] =
    DataTableFilteringExample.init();
  const [dataTableVisibilityExample, dataTableVisibilityExampleCommands] =
    DataTableVisibilityExample.init();
  const [dataTableRowSelectionExample, dataTableRowSelectionExampleCommands] =
    DataTableRowSelectionExample.init();
  const [directionBasicExample, directionBasicExampleCommands] =
    DirectionBasicExample.init();
  const [itemAvatarExample, itemAvatarExampleCommands] =
    ItemAvatarExample.init();
  const [itemBasicExample, itemBasicExampleCommands] = ItemBasicExample.init();
  const [itemGroupExample, itemGroupExampleCommands] = ItemGroupExample.init();
  const [itemHeaderExample, itemHeaderExampleCommands] =
    ItemHeaderExample.init();
  const [itemIconExample, itemIconExampleCommands] = ItemIconExample.init();
  const [itemImageExample, itemImageExampleCommands] = ItemImageExample.init();
  const [itemLinkExample, itemLinkExampleCommands] = ItemLinkExample.init();
  const [itemRtlExample, itemRtlExampleCommands] = ItemRtlExample.init();
  const [itemSizeExample, itemSizeExampleCommands] = ItemSizeExample.init();
  const [itemVariantExample, itemVariantExampleCommands] =
    ItemVariantExample.init();
  const [labelBasicExample, labelBasicExampleCommands] =
    LabelBasicExample.init();
  const [paginationBasicExample, paginationBasicExampleCommands] =
    PaginationBasicExample.init();
  const [resizableBasicExample, resizableBasicExampleCommands] =
    ResizableBasicExample.init();
  const [sidebarBasicExample, sidebarBasicExampleCommands] =
    SidebarBasicExample.init();
  const [tableBasicExample, tableBasicExampleCommands] =
    TableBasicExample.init();
  const [cardBasicExample, cardBasicExampleCommands] = CardBasicExample.init();
  const [separatorBasicExample, separatorBasicExampleCommands] =
    SeparatorBasicExample.init();
  const [skeletonBasicExample, skeletonBasicExampleCommands] =
    SkeletonBasicExample.init();
  const [kbdBasicExample, kbdBasicExampleCommands] = KbdBasicExample.init();
  const [kbdInputGroupExample, kbdInputGroupExampleCommands] =
    KbdInputGroupExample.init();
  const [typographyBasicExample, typographyBasicExampleCommands] =
    TypographyBasicExample.init();
  const [emptyBasicExample, emptyBasicExampleCommands] =
    EmptyBasicExample.init();
  const [emptyInputGroupExample, emptyInputGroupExampleCommands] =
    EmptyInputGroupExample.init();
  const [buttonBasicExample, buttonBasicExampleCommands] =
    ButtonBasicExample.init();
  const [buttonDisabledExample, buttonDisabledExampleCommands] =
    ButtonDisabledExample.init();
  const [calendarBasicExample, calendarBasicExampleCommands] =
    CalendarBasicExample.init();
  const [calendarBoundsExample, calendarBoundsExampleCommands] =
    CalendarBoundsExample.init();
  const [checkboxBasicExample, checkboxBasicExampleCommands] =
    CheckboxBasicExample.init();
  const [checkboxGroupBasicExample, checkboxGroupBasicExampleCommands] =
    CheckboxGroupBasicExample.init();
  const [checkboxIndeterminateExample, checkboxIndeterminateExampleCommands] =
    CheckboxIndeterminateExample.init();
  const [comboboxBasicExample, comboboxBasicExampleCommands] =
    ComboboxBasicExample.init();
  const [comboboxMultiExample, comboboxMultiExampleCommands] =
    ComboboxMultiExample.init();
  const [datePickerBasicExample, datePickerBasicExampleCommands] =
    DatePickerBasicExample.init();
  const [datePickerBoundsExample, datePickerBoundsExampleCommands] =
    DatePickerBoundsExample.init();
  const [dialogBasicExample, dialogBasicExampleCommands] =
    DialogBasicExample.init();
  const [dialogAnimatedExample, dialogAnimatedExampleCommands] =
    DialogAnimatedExample.init();
  const [dialogDestructiveExample, dialogDestructiveExampleCommands] =
    DialogDestructiveExample.init();
  const [dialogFocusExample, dialogFocusExampleCommands] =
    DialogFocusExample.init();
  const [dialogScrollableExample, dialogScrollableExampleCommands] =
    DialogScrollableExample.init();
  const [disclosureBasicExample, disclosureBasicExampleCommands] =
    DisclosureBasicExample.init();
  const [disclosureDisabledExample, disclosureDisabledExampleCommands] =
    DisclosureDisabledExample.init();
  const [dragAndDropBasicExample, dragAndDropBasicExampleCommands] =
    DragAndDropBasicExample.init();
  const [dragAndDropDisabledExample, dragAndDropDisabledExampleCommands] =
    DragAndDropDisabledExample.init();
  const [fieldsetBasicExample, fieldsetBasicExampleCommands] =
    FieldsetBasicExample.init();
  const [fieldsetDisabledExample, fieldsetDisabledExampleCommands] =
    FieldsetDisabledExample.init();
  const [fileDropBasicExample, fileDropBasicExampleCommands] =
    FileDropBasicExample.init();
  const [fileDropDisabledExample, fileDropDisabledExampleCommands] =
    FileDropDisabledExample.init();
  const [inputBasicExample, inputBasicExampleCommands] =
    InputBasicExample.init();
  const [inputDisabledExample, inputDisabledExampleCommands] =
    InputDisabledExample.init();
  const [meterBasicExample, meterBasicExampleCommands] =
    MeterBasicExample.init();
  const [scrollAreaBasicExample, scrollAreaBasicExampleCommands] =
    ScrollAreaBasicExample.init();
  const [toggleBasicExample, toggleBasicExampleCommands] =
    ToggleBasicExample.init();
  const [toggleGroupBasicExample, toggleGroupBasicExampleCommands] =
    ToggleGroupBasicExample.init();
  const [radioBasicExample, radioBasicExampleCommands] =
    RadioBasicExample.init();
  const [toolbarBasicExample, toolbarBasicExampleCommands] =
    ToolbarBasicExample.init();
  const [progressBasicExample, progressBasicExampleCommands] =
    ProgressBasicExample.init();
  const [listboxBasicExample, listboxBasicExampleCommands] =
    ListboxBasicExample.init();
  const [listboxAnimatedExample, listboxAnimatedExampleCommands] =
    ListboxAnimatedExample.init();
  const [menuBasicExample, menuBasicExampleCommands] = MenuBasicExample.init();
  const [menuAnimatedExample, menuAnimatedExampleCommands] =
    MenuAnimatedExample.init();
  const [popoverBasicExample, popoverBasicExampleCommands] =
    PopoverBasicExample.init();
  const [popoverAnimatedExample, popoverAnimatedExampleCommands] =
    PopoverAnimatedExample.init();
  const [radioGroupBasicExample, radioGroupBasicExampleCommands] =
    RadioGroupBasicExample.init();
  const [radioGroupHorizontalExample, radioGroupHorizontalExampleCommands] =
    RadioGroupHorizontalExample.init();
  const [selectBasicExample, selectBasicExampleCommands] =
    SelectBasicExample.init();
  const [selectDisabledExample, selectDisabledExampleCommands] =
    SelectDisabledExample.init();
  const [sliderBasicExample, sliderBasicExampleCommands] =
    SliderBasicExample.init();
  const [sliderDisabledExample, sliderDisabledExampleCommands] =
    SliderDisabledExample.init();
  const [switchBasicExample, switchBasicExampleCommands] =
    SwitchBasicExample.init();
  const [switchDisabledExample, switchDisabledExampleCommands] =
    SwitchDisabledExample.init();
  const [tabsBasicExample, tabsBasicExampleCommands] = TabsBasicExample.init();
  const [tabsManualExample, tabsManualExampleCommands] =
    TabsManualExample.init();
  const [textareaBasicExample, textareaBasicExampleCommands] =
    TextareaBasicExample.init();
  const [textareaDisabledExample, textareaDisabledExampleCommands] =
    TextareaDisabledExample.init();
  const [toastBasicExample, toastBasicExampleCommands] =
    ToastBasicExample.init();
  const [toastVariantsExample, toastVariantsExampleCommands] =
    ToastVariantsExample.init();
  const [tooltipBasicExample, tooltipBasicExampleCommands] =
    TooltipBasicExample.init();
  const [tooltipNoDelayExample, tooltipNoDelayExampleCommands] =
    TooltipNoDelayExample.init();
  const [virtualListBasicExample, virtualListBasicExampleCommands] =
    VirtualListBasicExample.init();
  const [virtualListVariableExample, virtualListVariableExampleCommands] =
    VirtualListVariableExample.init();

  return [
    {
      route: urlToBaseAwareAppRoute(url),
      uiModel: initialUiModel,
      accordionBasicExample,
      accordionMultipleExample,
      alertBasicExample,
      alertDestructiveExample,
      aspectRatioBasicExample,
      aspectRatioSquareExample,
      aspectRatioPortraitExample,
      aspectRatioRtlExample,
      breadcrumbBasicExample,
      breadcrumbSeparatorExample,
      breadcrumbDropdownExample,
      breadcrumbCollapsedExample,
      breadcrumbLinkExample,
      breadcrumbRtlExample,
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
      alertDialogBasicExample,
      drawerBasicExample,
      contextMenuBasicExample,
      menubarBasicExample,
      navigationMenuBasicExample,
      otpFieldBasicExample,
      previewCardBasicExample,
      collapsibleBasicExample,
      fieldBasicExample,
      numberFieldBasicExample,
      formBasicExample,
      autocompleteBasicExample,
      animationBasicExample,
      avatarBasicExample,
      badgeBasicExample,
      badgeSpinnerExample,
      carouselBasicExample,
      carouselSizesExample,
      carouselSpacingExample,
      carouselOrientationExample,
      carouselApiExample,
      carouselRtlExample,
      chartBasicExample,
      chartGridExample,
      chartAxisExample,
      chartTooltipExample,
      chartLegendExample,
      chartRtlExample,
      commandBasicExample,
      dropdownMenuBasicExample,
      hoverCardBasicExample,
      inputOtpBasicExample,
      nativeSelectBasicExample,
      sheetBasicExample,
      sonnerBasicExample,
      dataTableBasicExample,
      dataTableRowActionsExample,
      dataTablePaginationExample,
      dataTableSortingExample,
      dataTableFilteringExample,
      dataTableVisibilityExample,
      dataTableRowSelectionExample,
      directionBasicExample,
      itemAvatarExample,
      itemBasicExample,
      itemGroupExample,
      itemHeaderExample,
      itemIconExample,
      itemImageExample,
      itemLinkExample,
      itemRtlExample,
      itemSizeExample,
      itemVariantExample,
      labelBasicExample,
      paginationBasicExample,
      resizableBasicExample,
      sidebarBasicExample,
      tableBasicExample,
      cardBasicExample,
      separatorBasicExample,
      skeletonBasicExample,
      kbdBasicExample,
      kbdInputGroupExample,
      typographyBasicExample,
      emptyBasicExample,
      emptyInputGroupExample,
      buttonBasicExample,
      buttonDisabledExample,
      calendarBasicExample,
      calendarBoundsExample,
      checkboxBasicExample,
      checkboxGroupBasicExample,
      checkboxIndeterminateExample,
      comboboxBasicExample,
      comboboxMultiExample,
      datePickerBasicExample,
      datePickerBoundsExample,
      dialogBasicExample,
      dialogAnimatedExample,
      dialogDestructiveExample,
      dialogFocusExample,
      dialogScrollableExample,
      disclosureBasicExample,
      disclosureDisabledExample,
      dragAndDropBasicExample,
      dragAndDropDisabledExample,
      fieldsetBasicExample,
      fieldsetDisabledExample,
      fileDropBasicExample,
      fileDropDisabledExample,
      inputBasicExample,
      inputDisabledExample,
      meterBasicExample,
      scrollAreaBasicExample,
      toggleBasicExample,
      toggleGroupBasicExample,
      radioBasicExample,
      toolbarBasicExample,
      progressBasicExample,
      listboxBasicExample,
      listboxAnimatedExample,
      menuBasicExample,
      menuAnimatedExample,
      popoverBasicExample,
      popoverAnimatedExample,
      radioGroupBasicExample,
      radioGroupHorizontalExample,
      selectBasicExample,
      selectDisabledExample,
      sliderBasicExample,
      sliderDisabledExample,
      switchBasicExample,
      switchDisabledExample,
      tabsBasicExample,
      tabsManualExample,
      textareaBasicExample,
      textareaDisabledExample,
      toastBasicExample,
      toastVariantsExample,
      tooltipBasicExample,
      tooltipNoDelayExample,
      virtualListBasicExample,
      virtualListVariableExample,
    },
    [
      ...Command.mapMessages(uiCommands, (message) =>
        GotUiMessage({ message })
      ),
      ...Command.mapMessages(accordionBasicExampleCommands, (message) =>
        GotAccordionBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(accordionMultipleExampleCommands, (message) =>
        GotAccordionMultipleExampleMessage({ message })
      ),
      ...Command.mapMessages(alertBasicExampleCommands, (message) =>
        GotAlertBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(alertDestructiveExampleCommands, (message) =>
        GotAlertDestructiveExampleMessage({ message })
      ),
      ...Command.mapMessages(aspectRatioBasicExampleCommands, (message) =>
        GotAspectRatioBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(aspectRatioSquareExampleCommands, (message) =>
        GotAspectRatioSquareExampleMessage({ message })
      ),
      ...Command.mapMessages(aspectRatioPortraitExampleCommands, (message) =>
        GotAspectRatioPortraitExampleMessage({ message })
      ),
      ...Command.mapMessages(aspectRatioRtlExampleCommands, (message) =>
        GotAspectRatioRtlExampleMessage({ message })
      ),
      ...Command.mapMessages(breadcrumbBasicExampleCommands, (message) =>
        GotBreadcrumbBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(breadcrumbSeparatorExampleCommands, (message) =>
        GotBreadcrumbSeparatorExampleMessage({ message })
      ),
      ...Command.mapMessages(breadcrumbDropdownExampleCommands, (message) =>
        GotBreadcrumbDropdownExampleMessage({ message })
      ),
      ...Command.mapMessages(breadcrumbCollapsedExampleCommands, (message) =>
        GotBreadcrumbCollapsedExampleMessage({ message })
      ),
      ...Command.mapMessages(breadcrumbLinkExampleCommands, (message) =>
        GotBreadcrumbLinkExampleMessage({ message })
      ),
      ...Command.mapMessages(breadcrumbRtlExampleCommands, (message) =>
        GotBreadcrumbRtlExampleMessage({ message })
      ),
      ...Command.mapMessages(buttonGroupBasicExampleCommands, (message) =>
        GotButtonGroupBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(buttonGroupOrientationExampleCommands, (message) =>
        GotButtonGroupOrientationExampleMessage({ message })
      ),
      ...Command.mapMessages(buttonGroupSizeExampleCommands, (message) =>
        GotButtonGroupSizeExampleMessage({ message })
      ),
      ...Command.mapMessages(buttonGroupNestedExampleCommands, (message) =>
        GotButtonGroupNestedExampleMessage({ message })
      ),
      ...Command.mapMessages(buttonGroupSeparatorExampleCommands, (message) =>
        GotButtonGroupSeparatorExampleMessage({ message })
      ),
      ...Command.mapMessages(buttonGroupSplitExampleCommands, (message) =>
        GotButtonGroupSplitExampleMessage({ message })
      ),
      ...Command.mapMessages(buttonGroupInputExampleCommands, (message) =>
        GotButtonGroupInputExampleMessage({ message })
      ),
      ...Command.mapMessages(buttonGroupInputGroupExampleCommands, (message) =>
        GotButtonGroupInputGroupExampleMessage({ message })
      ),
      ...Command.mapMessages(buttonGroupSelectExampleCommands, (message) =>
        GotButtonGroupSelectExampleMessage({ message })
      ),
      ...Command.mapMessages(buttonGroupPopoverExampleCommands, (message) =>
        GotButtonGroupPopoverExampleMessage({ message })
      ),
      ...Command.mapMessages(buttonGroupRtlExampleCommands, (message) =>
        GotButtonGroupRtlExampleMessage({ message })
      ),
      ...Command.mapMessages(alertDialogBasicExampleCommands, (message) =>
        GotAlertDialogBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(drawerBasicExampleCommands, (message) =>
        GotDrawerBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(contextMenuBasicExampleCommands, (message) =>
        GotContextMenuBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(menubarBasicExampleCommands, (message) =>
        GotMenubarBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(navigationMenuBasicExampleCommands, (message) =>
        GotNavigationMenuBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(otpFieldBasicExampleCommands, (message) =>
        GotOtpFieldBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(previewCardBasicExampleCommands, (message) =>
        GotPreviewCardBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(collapsibleBasicExampleCommands, (message) =>
        GotCollapsibleBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(fieldBasicExampleCommands, (message) =>
        GotFieldBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(numberFieldBasicExampleCommands, (message) =>
        GotNumberFieldBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(formBasicExampleCommands, (message) =>
        GotFormBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(autocompleteBasicExampleCommands, (message) =>
        GotAutocompleteBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(animationBasicExampleCommands, (message) =>
        GotAnimationBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(avatarBasicExampleCommands, (message) =>
        GotAvatarBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(badgeBasicExampleCommands, (message) =>
        GotBadgeBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(badgeSpinnerExampleCommands, (message) =>
        GotBadgeSpinnerExampleMessage({ message })
      ),
      ...Command.mapMessages(carouselBasicExampleCommands, (message) =>
        GotCarouselBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(carouselSizesExampleCommands, (message) =>
        GotCarouselSizesExampleMessage({ message })
      ),
      ...Command.mapMessages(carouselSpacingExampleCommands, (message) =>
        GotCarouselSpacingExampleMessage({ message })
      ),
      ...Command.mapMessages(carouselOrientationExampleCommands, (message) =>
        GotCarouselOrientationExampleMessage({ message })
      ),
      ...Command.mapMessages(carouselApiExampleCommands, (message) =>
        GotCarouselApiExampleMessage({ message })
      ),
      ...Command.mapMessages(carouselRtlExampleCommands, (message) =>
        GotCarouselRtlExampleMessage({ message })
      ),
      ...Command.mapMessages(chartBasicExampleCommands, (message) =>
        GotChartBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(chartGridExampleCommands, (message) =>
        GotChartGridExampleMessage({ message })
      ),
      ...Command.mapMessages(chartAxisExampleCommands, (message) =>
        GotChartAxisExampleMessage({ message })
      ),
      ...Command.mapMessages(chartTooltipExampleCommands, (message) =>
        GotChartTooltipExampleMessage({ message })
      ),
      ...Command.mapMessages(chartLegendExampleCommands, (message) =>
        GotChartLegendExampleMessage({ message })
      ),
      ...Command.mapMessages(chartRtlExampleCommands, (message) =>
        GotChartRtlExampleMessage({ message })
      ),
      ...Command.mapMessages(commandBasicExampleCommands, (message) =>
        GotCommandBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(dropdownMenuBasicExampleCommands, (message) =>
        GotDropdownMenuBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(hoverCardBasicExampleCommands, (message) =>
        GotHoverCardBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(inputOtpBasicExampleCommands, (message) =>
        GotInputOtpBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(nativeSelectBasicExampleCommands, (message) =>
        GotNativeSelectBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(sheetBasicExampleCommands, (message) =>
        GotSheetBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(sonnerBasicExampleCommands, (message) =>
        GotSonnerBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(dataTableBasicExampleCommands, (message) =>
        GotDataTableBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(dataTableRowActionsExampleCommands, (message) =>
        GotDataTableRowActionsExampleMessage({ message })
      ),
      ...Command.mapMessages(dataTablePaginationExampleCommands, (message) =>
        GotDataTablePaginationExampleMessage({ message })
      ),
      ...Command.mapMessages(dataTableSortingExampleCommands, (message) =>
        GotDataTableSortingExampleMessage({ message })
      ),
      ...Command.mapMessages(dataTableFilteringExampleCommands, (message) =>
        GotDataTableFilteringExampleMessage({ message })
      ),
      ...Command.mapMessages(dataTableVisibilityExampleCommands, (message) =>
        GotDataTableVisibilityExampleMessage({ message })
      ),
      ...Command.mapMessages(dataTableRowSelectionExampleCommands, (message) =>
        GotDataTableRowSelectionExampleMessage({ message })
      ),
      ...Command.mapMessages(directionBasicExampleCommands, (message) =>
        GotDirectionBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(itemAvatarExampleCommands, (message) =>
        GotItemAvatarExampleMessage({ message })
      ),
      ...Command.mapMessages(itemBasicExampleCommands, (message) =>
        GotItemBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(itemGroupExampleCommands, (message) =>
        GotItemGroupExampleMessage({ message })
      ),
      ...Command.mapMessages(itemHeaderExampleCommands, (message) =>
        GotItemHeaderExampleMessage({ message })
      ),
      ...Command.mapMessages(itemIconExampleCommands, (message) =>
        GotItemIconExampleMessage({ message })
      ),
      ...Command.mapMessages(itemImageExampleCommands, (message) =>
        GotItemImageExampleMessage({ message })
      ),
      ...Command.mapMessages(itemLinkExampleCommands, (message) =>
        GotItemLinkExampleMessage({ message })
      ),
      ...Command.mapMessages(itemRtlExampleCommands, (message) =>
        GotItemRtlExampleMessage({ message })
      ),
      ...Command.mapMessages(itemSizeExampleCommands, (message) =>
        GotItemSizeExampleMessage({ message })
      ),
      ...Command.mapMessages(itemVariantExampleCommands, (message) =>
        GotItemVariantExampleMessage({ message })
      ),
      ...Command.mapMessages(labelBasicExampleCommands, (message) =>
        GotLabelBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(paginationBasicExampleCommands, (message) =>
        GotPaginationBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(resizableBasicExampleCommands, (message) =>
        GotResizableBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(sidebarBasicExampleCommands, (message) =>
        GotSidebarBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(tableBasicExampleCommands, (message) =>
        GotTableBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(cardBasicExampleCommands, (message) =>
        GotCardBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(separatorBasicExampleCommands, (message) =>
        GotSeparatorBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(skeletonBasicExampleCommands, (message) =>
        GotSkeletonBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(kbdBasicExampleCommands, (message) =>
        GotKbdBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(kbdInputGroupExampleCommands, (message) =>
        GotKbdInputGroupExampleMessage({ message })
      ),
      ...Command.mapMessages(typographyBasicExampleCommands, (message) =>
        GotTypographyBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(emptyBasicExampleCommands, (message) =>
        GotEmptyBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(emptyInputGroupExampleCommands, (message) =>
        GotEmptyInputGroupExampleMessage({ message })
      ),
      ...Command.mapMessages(buttonBasicExampleCommands, (message) =>
        GotButtonBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(buttonDisabledExampleCommands, (message) =>
        GotButtonDisabledExampleMessage({ message })
      ),
      ...Command.mapMessages(calendarBasicExampleCommands, (message) =>
        GotCalendarBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(calendarBoundsExampleCommands, (message) =>
        GotCalendarBoundsExampleMessage({ message })
      ),
      ...Command.mapMessages(checkboxBasicExampleCommands, (message) =>
        GotCheckboxBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(checkboxGroupBasicExampleCommands, (message) =>
        GotCheckboxGroupBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(checkboxIndeterminateExampleCommands, (message) =>
        GotCheckboxIndeterminateExampleMessage({ message })
      ),
      ...Command.mapMessages(comboboxBasicExampleCommands, (message) =>
        GotComboboxBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(comboboxMultiExampleCommands, (message) =>
        GotComboboxMultiExampleMessage({ message })
      ),
      ...Command.mapMessages(datePickerBasicExampleCommands, (message) =>
        GotDatePickerBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(datePickerBoundsExampleCommands, (message) =>
        GotDatePickerBoundsExampleMessage({ message })
      ),
      ...Command.mapMessages(dialogBasicExampleCommands, (message) =>
        GotDialogBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(dialogAnimatedExampleCommands, (message) =>
        GotDialogAnimatedExampleMessage({ message })
      ),
      ...Command.mapMessages(dialogDestructiveExampleCommands, (message) =>
        GotDialogDestructiveExampleMessage({ message })
      ),
      ...Command.mapMessages(dialogFocusExampleCommands, (message) =>
        GotDialogFocusExampleMessage({ message })
      ),
      ...Command.mapMessages(dialogScrollableExampleCommands, (message) =>
        GotDialogScrollableExampleMessage({ message })
      ),
      ...Command.mapMessages(disclosureBasicExampleCommands, (message) =>
        GotDisclosureBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(disclosureDisabledExampleCommands, (message) =>
        GotDisclosureDisabledExampleMessage({ message })
      ),
      ...Command.mapMessages(dragAndDropBasicExampleCommands, (message) =>
        GotDragAndDropBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(dragAndDropDisabledExampleCommands, (message) =>
        GotDragAndDropDisabledExampleMessage({ message })
      ),
      ...Command.mapMessages(fieldsetBasicExampleCommands, (message) =>
        GotFieldsetBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(fieldsetDisabledExampleCommands, (message) =>
        GotFieldsetDisabledExampleMessage({ message })
      ),
      ...Command.mapMessages(fileDropBasicExampleCommands, (message) =>
        GotFileDropBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(fileDropDisabledExampleCommands, (message) =>
        GotFileDropDisabledExampleMessage({ message })
      ),
      ...Command.mapMessages(inputBasicExampleCommands, (message) =>
        GotInputBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(inputDisabledExampleCommands, (message) =>
        GotInputDisabledExampleMessage({ message })
      ),
      ...Command.mapMessages(meterBasicExampleCommands, (message) =>
        GotMeterBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(scrollAreaBasicExampleCommands, (message) =>
        GotScrollAreaBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(toggleBasicExampleCommands, (message) =>
        GotToggleBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(toggleGroupBasicExampleCommands, (message) =>
        GotToggleGroupBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(radioBasicExampleCommands, (message) =>
        GotRadioBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(toolbarBasicExampleCommands, (message) =>
        GotToolbarBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(progressBasicExampleCommands, (message) =>
        GotProgressBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(listboxBasicExampleCommands, (message) =>
        GotListboxBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(listboxAnimatedExampleCommands, (message) =>
        GotListboxAnimatedExampleMessage({ message })
      ),
      ...Command.mapMessages(menuBasicExampleCommands, (message) =>
        GotMenuBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(menuAnimatedExampleCommands, (message) =>
        GotMenuAnimatedExampleMessage({ message })
      ),
      ...Command.mapMessages(popoverBasicExampleCommands, (message) =>
        GotPopoverBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(popoverAnimatedExampleCommands, (message) =>
        GotPopoverAnimatedExampleMessage({ message })
      ),
      ...Command.mapMessages(radioGroupBasicExampleCommands, (message) =>
        GotRadioGroupBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(radioGroupHorizontalExampleCommands, (message) =>
        GotRadioGroupHorizontalExampleMessage({ message })
      ),
      ...Command.mapMessages(selectBasicExampleCommands, (message) =>
        GotSelectBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(selectDisabledExampleCommands, (message) =>
        GotSelectDisabledExampleMessage({ message })
      ),
      ...Command.mapMessages(sliderBasicExampleCommands, (message) =>
        GotSliderBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(sliderDisabledExampleCommands, (message) =>
        GotSliderDisabledExampleMessage({ message })
      ),
      ...Command.mapMessages(switchBasicExampleCommands, (message) =>
        GotSwitchBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(switchDisabledExampleCommands, (message) =>
        GotSwitchDisabledExampleMessage({ message })
      ),
      ...Command.mapMessages(tabsBasicExampleCommands, (message) =>
        GotTabsBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(tabsManualExampleCommands, (message) =>
        GotTabsManualExampleMessage({ message })
      ),
      ...Command.mapMessages(textareaBasicExampleCommands, (message) =>
        GotTextareaBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(textareaDisabledExampleCommands, (message) =>
        GotTextareaDisabledExampleMessage({ message })
      ),
      ...Command.mapMessages(toastBasicExampleCommands, (message) =>
        GotToastBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(toastVariantsExampleCommands, (message) =>
        GotToastVariantsExampleMessage({ message })
      ),
      ...Command.mapMessages(tooltipBasicExampleCommands, (message) =>
        GotTooltipBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(tooltipNoDelayExampleCommands, (message) =>
        GotTooltipNoDelayExampleMessage({ message })
      ),
      ...Command.mapMessages(virtualListBasicExampleCommands, (message) =>
        GotVirtualListBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(virtualListVariableExampleCommands, (message) =>
        GotVirtualListVariableExampleMessage({ message })
      ),
    ],
  ];
};

// UPDATE

export const toUiMessage = (message: typeof UiMessage.Type): Message =>
  GotUiMessage({ message });

export const toMobileMenuDialogMessage = (
  message: Ui.Dialog.Message
): Message =>
  GotUiMessage({ message: GotMobileMenuDialogMessage({ message }) });

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      CompletedNavigateInternal: () => [model, []],
      CompletedLoadExternal: () => [model, []],

      ClickedLink: ({ request }) =>
        M.value(request).pipe(
          M.tagsExhaustive({
            Internal: ({
              url,
            }): [
              Model,
              readonly Command.Command<typeof CompletedNavigateInternal>[],
            ] => [model, [NavigateInternal({ url: urlToString(url) })]],
            External: ({
              href,
            }): [
              Model,
              readonly Command.Command<typeof CompletedLoadExternal>[],
            ] => [model, [LoadExternal({ href })]],
          })
        ),

      ChangedUrl: ({ url }) => {
        const [closedDialog, closeDialogCommands] = Ui.Dialog.close(
          model.uiModel.mobileMenuDialog
        );

        return [
          evo(model, {
            route: () => urlToBaseAwareAppRoute(url),
            uiModel: (uiModel) =>
              evo(uiModel, {
                mobileMenuDialog: () => closedDialog,
              }),
          }),
          Command.mapMessages(closeDialogCommands, (message) =>
            toMobileMenuDialogMessage(message)
          ),
        ];
      },

      GotUiMessage: ({ message }) => {
        const [nextUiModel, uiCommands] = uiUpdate(model.uiModel, message);

        return [
          evo(model, { uiModel: () => nextUiModel }),
          Command.mapMessages(uiCommands, (message) =>
            GotUiMessage({ message })
          ),
        ];
      },

      GotAccordionBasicExampleMessage: ({ message }) => {
        const [accordionBasicExample, accordionBasicExampleCommands] =
          AccordionBasicExample.update(model.accordionBasicExample, message);

        return [
          evo(model, { accordionBasicExample: () => accordionBasicExample }),
          Command.mapMessages(accordionBasicExampleCommands, (message) =>
            GotAccordionBasicExampleMessage({ message })
          ),
        ];
      },

      GotAccordionMultipleExampleMessage: ({ message }) => {
        const [accordionMultipleExample, accordionMultipleExampleCommands] =
          AccordionMultipleExample.update(
            model.accordionMultipleExample,
            message
          );

        return [
          evo(model, {
            accordionMultipleExample: () => accordionMultipleExample,
          }),
          Command.mapMessages(accordionMultipleExampleCommands, (message) =>
            GotAccordionMultipleExampleMessage({ message })
          ),
        ];
      },

      GotAlertBasicExampleMessage: ({ message }) => {
        const [alertBasicExample, alertBasicExampleCommands] =
          AlertBasicExample.update(model.alertBasicExample, message);

        return [
          evo(model, { alertBasicExample: () => alertBasicExample }),
          Command.mapMessages(alertBasicExampleCommands, (message) =>
            GotAlertBasicExampleMessage({ message })
          ),
        ];
      },

      GotAlertDestructiveExampleMessage: ({ message }) => {
        const [alertDestructiveExample, alertDestructiveExampleCommands] =
          AlertDestructiveExample.update(
            model.alertDestructiveExample,
            message
          );

        return [
          evo(model, {
            alertDestructiveExample: () => alertDestructiveExample,
          }),
          Command.mapMessages(alertDestructiveExampleCommands, (message) =>
            GotAlertDestructiveExampleMessage({ message })
          ),
        ];
      },

      GotAspectRatioBasicExampleMessage: ({ message }) => {
        const [aspectRatioBasicExample, aspectRatioBasicExampleCommands] =
          AspectRatioBasicExample.update(
            model.aspectRatioBasicExample,
            message
          );

        return [
          evo(model, {
            aspectRatioBasicExample: () => aspectRatioBasicExample,
          }),
          Command.mapMessages(aspectRatioBasicExampleCommands, (message) =>
            GotAspectRatioBasicExampleMessage({ message })
          ),
        ];
      },

      GotAspectRatioSquareExampleMessage: ({ message }) => {
        const [aspectRatioSquareExample, aspectRatioSquareExampleCommands] =
          AspectRatioSquareExample.update(
            model.aspectRatioSquareExample,
            message
          );

        return [
          evo(model, {
            aspectRatioSquareExample: () => aspectRatioSquareExample,
          }),
          Command.mapMessages(aspectRatioSquareExampleCommands, (message) =>
            GotAspectRatioSquareExampleMessage({ message })
          ),
        ];
      },

      GotAspectRatioPortraitExampleMessage: ({ message }) => {
        const [aspectRatioPortraitExample, aspectRatioPortraitExampleCommands] =
          AspectRatioPortraitExample.update(
            model.aspectRatioPortraitExample,
            message
          );

        return [
          evo(model, {
            aspectRatioPortraitExample: () => aspectRatioPortraitExample,
          }),
          Command.mapMessages(aspectRatioPortraitExampleCommands, (message) =>
            GotAspectRatioPortraitExampleMessage({ message })
          ),
        ];
      },

      GotAspectRatioRtlExampleMessage: ({ message }) => {
        const [aspectRatioRtlExample, aspectRatioRtlExampleCommands] =
          AspectRatioRtlExample.update(model.aspectRatioRtlExample, message);

        return [
          evo(model, {
            aspectRatioRtlExample: () => aspectRatioRtlExample,
          }),
          Command.mapMessages(aspectRatioRtlExampleCommands, (message) =>
            GotAspectRatioRtlExampleMessage({ message })
          ),
        ];
      },

      GotBreadcrumbBasicExampleMessage: ({ message }) => {
        const [breadcrumbBasicExample, breadcrumbBasicExampleCommands] =
          BreadcrumbBasicExample.update(model.breadcrumbBasicExample, message);
        return [
          evo(model, { breadcrumbBasicExample: () => breadcrumbBasicExample }),
          Command.mapMessages(breadcrumbBasicExampleCommands, (message) =>
            GotBreadcrumbBasicExampleMessage({ message })
          ),
        ];
      },

      GotBreadcrumbSeparatorExampleMessage: ({ message }) => {
        const [breadcrumbSeparatorExample, breadcrumbSeparatorExampleCommands] =
          BreadcrumbSeparatorExample.update(
            model.breadcrumbSeparatorExample,
            message
          );
        return [
          evo(model, {
            breadcrumbSeparatorExample: () => breadcrumbSeparatorExample,
          }),
          Command.mapMessages(breadcrumbSeparatorExampleCommands, (message) =>
            GotBreadcrumbSeparatorExampleMessage({ message })
          ),
        ];
      },

      GotBreadcrumbDropdownExampleMessage: ({ message }) => {
        const [breadcrumbDropdownExample, breadcrumbDropdownExampleCommands] =
          BreadcrumbDropdownExample.update(
            model.breadcrumbDropdownExample,
            message
          );
        return [
          evo(model, {
            breadcrumbDropdownExample: () => breadcrumbDropdownExample,
          }),
          Command.mapMessages(breadcrumbDropdownExampleCommands, (message) =>
            GotBreadcrumbDropdownExampleMessage({ message })
          ),
        ];
      },

      GotBreadcrumbCollapsedExampleMessage: ({ message }) => {
        const [breadcrumbCollapsedExample, breadcrumbCollapsedExampleCommands] =
          BreadcrumbCollapsedExample.update(
            model.breadcrumbCollapsedExample,
            message
          );
        return [
          evo(model, {
            breadcrumbCollapsedExample: () => breadcrumbCollapsedExample,
          }),
          Command.mapMessages(breadcrumbCollapsedExampleCommands, (message) =>
            GotBreadcrumbCollapsedExampleMessage({ message })
          ),
        ];
      },

      GotBreadcrumbLinkExampleMessage: ({ message }) => {
        const [breadcrumbLinkExample, breadcrumbLinkExampleCommands] =
          BreadcrumbLinkExample.update(model.breadcrumbLinkExample, message);
        return [
          evo(model, { breadcrumbLinkExample: () => breadcrumbLinkExample }),
          Command.mapMessages(breadcrumbLinkExampleCommands, (message) =>
            GotBreadcrumbLinkExampleMessage({ message })
          ),
        ];
      },

      GotBreadcrumbRtlExampleMessage: ({ message }) => {
        const [breadcrumbRtlExample, breadcrumbRtlExampleCommands] =
          BreadcrumbRtlExample.update(model.breadcrumbRtlExample, message);
        return [
          evo(model, { breadcrumbRtlExample: () => breadcrumbRtlExample }),
          Command.mapMessages(breadcrumbRtlExampleCommands, (message) =>
            GotBreadcrumbRtlExampleMessage({ message })
          ),
        ];
      },

      GotButtonGroupBasicExampleMessage: ({ message }) => {
        const [buttonGroupBasicExample, buttonGroupBasicExampleCommands] =
          ButtonGroupBasicExample.update(
            model.buttonGroupBasicExample,
            message
          );

        return [
          evo(model, {
            buttonGroupBasicExample: () => buttonGroupBasicExample,
          }),
          Command.mapMessages(buttonGroupBasicExampleCommands, (message) =>
            GotButtonGroupBasicExampleMessage({ message })
          ),
        ];
      },
      GotButtonGroupOrientationExampleMessage: ({ message }) => {
        const [
          buttonGroupOrientationExample,
          buttonGroupOrientationExampleCommands,
        ] = ButtonGroupOrientationExample.update(
          model.buttonGroupOrientationExample,
          message
        );

        return [
          evo(model, {
            buttonGroupOrientationExample: () => buttonGroupOrientationExample,
          }),
          Command.mapMessages(
            buttonGroupOrientationExampleCommands,
            (message) => GotButtonGroupOrientationExampleMessage({ message })
          ),
        ];
      },
      GotButtonGroupSizeExampleMessage: ({ message }) => {
        const [buttonGroupSizeExample, buttonGroupSizeExampleCommands] =
          ButtonGroupSizeExample.update(model.buttonGroupSizeExample, message);

        return [
          evo(model, { buttonGroupSizeExample: () => buttonGroupSizeExample }),
          Command.mapMessages(buttonGroupSizeExampleCommands, (message) =>
            GotButtonGroupSizeExampleMessage({ message })
          ),
        ];
      },
      GotButtonGroupNestedExampleMessage: ({ message }) => {
        const [buttonGroupNestedExample, buttonGroupNestedExampleCommands] =
          ButtonGroupNestedExample.update(
            model.buttonGroupNestedExample,
            message
          );

        return [
          evo(model, {
            buttonGroupNestedExample: () => buttonGroupNestedExample,
          }),
          Command.mapMessages(buttonGroupNestedExampleCommands, (message) =>
            GotButtonGroupNestedExampleMessage({ message })
          ),
        ];
      },
      GotButtonGroupSeparatorExampleMessage: ({ message }) => {
        const [
          buttonGroupSeparatorExample,
          buttonGroupSeparatorExampleCommands,
        ] = ButtonGroupSeparatorExample.update(
          model.buttonGroupSeparatorExample,
          message
        );

        return [
          evo(model, {
            buttonGroupSeparatorExample: () => buttonGroupSeparatorExample,
          }),
          Command.mapMessages(buttonGroupSeparatorExampleCommands, (message) =>
            GotButtonGroupSeparatorExampleMessage({ message })
          ),
        ];
      },
      GotButtonGroupSplitExampleMessage: ({ message }) => {
        const [buttonGroupSplitExample, buttonGroupSplitExampleCommands] =
          ButtonGroupSplitExample.update(
            model.buttonGroupSplitExample,
            message
          );

        return [
          evo(model, {
            buttonGroupSplitExample: () => buttonGroupSplitExample,
          }),
          Command.mapMessages(buttonGroupSplitExampleCommands, (message) =>
            GotButtonGroupSplitExampleMessage({ message })
          ),
        ];
      },
      GotButtonGroupInputExampleMessage: ({ message }) => {
        const [buttonGroupInputExample, buttonGroupInputExampleCommands] =
          ButtonGroupInputExample.update(
            model.buttonGroupInputExample,
            message
          );

        return [
          evo(model, {
            buttonGroupInputExample: () => buttonGroupInputExample,
          }),
          Command.mapMessages(buttonGroupInputExampleCommands, (message) =>
            GotButtonGroupInputExampleMessage({ message })
          ),
        ];
      },
      GotButtonGroupInputGroupExampleMessage: ({ message }) => {
        const [
          buttonGroupInputGroupExample,
          buttonGroupInputGroupExampleCommands,
        ] = ButtonGroupInputGroupExample.update(
          model.buttonGroupInputGroupExample,
          message
        );

        return [
          evo(model, {
            buttonGroupInputGroupExample: () => buttonGroupInputGroupExample,
          }),
          Command.mapMessages(buttonGroupInputGroupExampleCommands, (message) =>
            GotButtonGroupInputGroupExampleMessage({ message })
          ),
        ];
      },
      GotButtonGroupSelectExampleMessage: ({ message }) => {
        const [buttonGroupSelectExample, buttonGroupSelectExampleCommands] =
          ButtonGroupSelectExample.update(
            model.buttonGroupSelectExample,
            message
          );

        return [
          evo(model, {
            buttonGroupSelectExample: () => buttonGroupSelectExample,
          }),
          Command.mapMessages(buttonGroupSelectExampleCommands, (message) =>
            GotButtonGroupSelectExampleMessage({ message })
          ),
        ];
      },
      GotButtonGroupPopoverExampleMessage: ({ message }) => {
        const [buttonGroupPopoverExample, buttonGroupPopoverExampleCommands] =
          ButtonGroupPopoverExample.update(
            model.buttonGroupPopoverExample,
            message
          );

        return [
          evo(model, {
            buttonGroupPopoverExample: () => buttonGroupPopoverExample,
          }),
          Command.mapMessages(buttonGroupPopoverExampleCommands, (message) =>
            GotButtonGroupPopoverExampleMessage({ message })
          ),
        ];
      },
      GotButtonGroupRtlExampleMessage: ({ message }) => {
        const [buttonGroupRtlExample, buttonGroupRtlExampleCommands] =
          ButtonGroupRtlExample.update(model.buttonGroupRtlExample, message);

        return [
          evo(model, { buttonGroupRtlExample: () => buttonGroupRtlExample }),
          Command.mapMessages(buttonGroupRtlExampleCommands, (message) =>
            GotButtonGroupRtlExampleMessage({ message })
          ),
        ];
      },
      GotAlertDialogBasicExampleMessage: ({ message }) => {
        const [alertDialogBasicExample, alertDialogBasicExampleCommands] =
          AlertDialogBasicExample.update(
            model.alertDialogBasicExample,
            message
          );

        return [
          evo(model, {
            alertDialogBasicExample: () => alertDialogBasicExample,
          }),
          Command.mapMessages(alertDialogBasicExampleCommands, (message) =>
            GotAlertDialogBasicExampleMessage({ message })
          ),
        ];
      },

      GotDrawerBasicExampleMessage: ({ message }) => {
        const [drawerBasicExample, drawerBasicExampleCommands] =
          DrawerBasicExample.update(model.drawerBasicExample, message);

        return [
          evo(model, { drawerBasicExample: () => drawerBasicExample }),
          Command.mapMessages(drawerBasicExampleCommands, (message) =>
            GotDrawerBasicExampleMessage({ message })
          ),
        ];
      },

      GotContextMenuBasicExampleMessage: ({ message }) => {
        const [contextMenuBasicExample, contextMenuBasicExampleCommands] =
          ContextMenuBasicExample.update(
            model.contextMenuBasicExample,
            message
          );

        return [
          evo(model, {
            contextMenuBasicExample: () => contextMenuBasicExample,
          }),
          Command.mapMessages(contextMenuBasicExampleCommands, (message) =>
            GotContextMenuBasicExampleMessage({ message })
          ),
        ];
      },

      GotMenubarBasicExampleMessage: ({ message }) => {
        const [menubarBasicExample, menubarBasicExampleCommands] =
          MenubarBasicExample.update(model.menubarBasicExample, message);

        return [
          evo(model, { menubarBasicExample: () => menubarBasicExample }),
          Command.mapMessages(menubarBasicExampleCommands, (message) =>
            GotMenubarBasicExampleMessage({ message })
          ),
        ];
      },

      GotNavigationMenuBasicExampleMessage: ({ message }) => {
        const [navigationMenuBasicExample, navigationMenuBasicExampleCommands] =
          NavigationMenuBasicExample.update(
            model.navigationMenuBasicExample,
            message
          );

        return [
          evo(model, {
            navigationMenuBasicExample: () => navigationMenuBasicExample,
          }),
          Command.mapMessages(navigationMenuBasicExampleCommands, (message) =>
            GotNavigationMenuBasicExampleMessage({ message })
          ),
        ];
      },

      GotOtpFieldBasicExampleMessage: ({ message }) => {
        const [otpFieldBasicExample, otpFieldBasicExampleCommands] =
          OtpFieldBasicExample.update(model.otpFieldBasicExample, message);

        return [
          evo(model, { otpFieldBasicExample: () => otpFieldBasicExample }),
          Command.mapMessages(otpFieldBasicExampleCommands, (message) =>
            GotOtpFieldBasicExampleMessage({ message })
          ),
        ];
      },

      GotPreviewCardBasicExampleMessage: ({ message }) => {
        const [previewCardBasicExample, previewCardBasicExampleCommands] =
          PreviewCardBasicExample.update(
            model.previewCardBasicExample,
            message
          );

        return [
          evo(model, {
            previewCardBasicExample: () => previewCardBasicExample,
          }),
          Command.mapMessages(previewCardBasicExampleCommands, (message) =>
            GotPreviewCardBasicExampleMessage({ message })
          ),
        ];
      },

      GotCollapsibleBasicExampleMessage: ({ message }) => {
        const [collapsibleBasicExample, collapsibleBasicExampleCommands] =
          CollapsibleBasicExample.update(
            model.collapsibleBasicExample,
            message
          );

        return [
          evo(model, {
            collapsibleBasicExample: () => collapsibleBasicExample,
          }),
          Command.mapMessages(collapsibleBasicExampleCommands, (message) =>
            GotCollapsibleBasicExampleMessage({ message })
          ),
        ];
      },

      GotFieldBasicExampleMessage: ({ message }) => {
        const [fieldBasicExample, fieldBasicExampleCommands] =
          FieldBasicExample.update(model.fieldBasicExample, message);

        return [
          evo(model, { fieldBasicExample: () => fieldBasicExample }),
          Command.mapMessages(fieldBasicExampleCommands, (message) =>
            GotFieldBasicExampleMessage({ message })
          ),
        ];
      },

      GotNumberFieldBasicExampleMessage: ({ message }) => {
        const [numberFieldBasicExample, numberFieldBasicExampleCommands] =
          NumberFieldBasicExample.update(
            model.numberFieldBasicExample,
            message
          );

        return [
          evo(model, {
            numberFieldBasicExample: () => numberFieldBasicExample,
          }),
          Command.mapMessages(numberFieldBasicExampleCommands, (message) =>
            GotNumberFieldBasicExampleMessage({ message })
          ),
        ];
      },

      GotFormBasicExampleMessage: ({ message }) => {
        const [formBasicExample, formBasicExampleCommands] =
          FormBasicExample.update(model.formBasicExample, message);

        return [
          evo(model, { formBasicExample: () => formBasicExample }),
          Command.mapMessages(formBasicExampleCommands, (message) =>
            GotFormBasicExampleMessage({ message })
          ),
        ];
      },

      GotAutocompleteBasicExampleMessage: ({ message }) => {
        const [autocompleteBasicExample, autocompleteBasicExampleCommands] =
          AutocompleteBasicExample.update(
            model.autocompleteBasicExample,
            message
          );

        return [
          evo(model, {
            autocompleteBasicExample: () => autocompleteBasicExample,
          }),
          Command.mapMessages(autocompleteBasicExampleCommands, (message) =>
            GotAutocompleteBasicExampleMessage({ message })
          ),
        ];
      },

      GotAnimationBasicExampleMessage: ({ message }) => {
        const [animationBasicExample, animationBasicExampleCommands] =
          AnimationBasicExample.update(model.animationBasicExample, message);

        return [
          evo(model, { animationBasicExample: () => animationBasicExample }),
          Command.mapMessages(animationBasicExampleCommands, (message) =>
            GotAnimationBasicExampleMessage({ message })
          ),
        ];
      },

      GotAvatarBasicExampleMessage: ({ message }) => {
        const [avatarBasicExample, avatarBasicExampleCommands] =
          AvatarBasicExample.update(model.avatarBasicExample, message);

        return [
          evo(model, { avatarBasicExample: () => avatarBasicExample }),
          Command.mapMessages(avatarBasicExampleCommands, (message) =>
            GotAvatarBasicExampleMessage({ message })
          ),
        ];
      },

      GotBadgeBasicExampleMessage: ({ message }) => {
        const [badgeBasicExample, badgeBasicExampleCommands] =
          BadgeBasicExample.update(model.badgeBasicExample, message);

        return [
          evo(model, { badgeBasicExample: () => badgeBasicExample }),
          Command.mapMessages(badgeBasicExampleCommands, (message) =>
            GotBadgeBasicExampleMessage({ message })
          ),
        ];
      },

      GotBadgeSpinnerExampleMessage: ({ message }) => {
        const [badgeSpinnerExample, badgeSpinnerExampleCommands] =
          BadgeSpinnerExample.update(model.badgeSpinnerExample, message);

        return [
          evo(model, { badgeSpinnerExample: () => badgeSpinnerExample }),
          Command.mapMessages(badgeSpinnerExampleCommands, (message) =>
            GotBadgeSpinnerExampleMessage({ message })
          ),
        ];
      },

      GotCarouselBasicExampleMessage: ({ message }) => {
        const [carouselBasicExample, carouselBasicExampleCommands] =
          CarouselBasicExample.update(model.carouselBasicExample, message);

        return [
          evo(model, { carouselBasicExample: () => carouselBasicExample }),
          Command.mapMessages(carouselBasicExampleCommands, (message) =>
            GotCarouselBasicExampleMessage({ message })
          ),
        ];
      },
      GotCarouselSizesExampleMessage: ({ message }) => {
        const [carouselSizesExample, carouselSizesExampleCommands] =
          CarouselSizesExample.update(model.carouselSizesExample, message);

        return [
          evo(model, { carouselSizesExample: () => carouselSizesExample }),
          Command.mapMessages(carouselSizesExampleCommands, (message) =>
            GotCarouselSizesExampleMessage({ message })
          ),
        ];
      },
      GotCarouselSpacingExampleMessage: ({ message }) => {
        const [carouselSpacingExample, carouselSpacingExampleCommands] =
          CarouselSpacingExample.update(model.carouselSpacingExample, message);

        return [
          evo(model, { carouselSpacingExample: () => carouselSpacingExample }),
          Command.mapMessages(carouselSpacingExampleCommands, (message) =>
            GotCarouselSpacingExampleMessage({ message })
          ),
        ];
      },
      GotCarouselOrientationExampleMessage: ({ message }) => {
        const [carouselOrientationExample, carouselOrientationExampleCommands] =
          CarouselOrientationExample.update(
            model.carouselOrientationExample,
            message
          );

        return [
          evo(model, {
            carouselOrientationExample: () => carouselOrientationExample,
          }),
          Command.mapMessages(carouselOrientationExampleCommands, (message) =>
            GotCarouselOrientationExampleMessage({ message })
          ),
        ];
      },
      GotCarouselApiExampleMessage: ({ message }) => {
        const [carouselApiExample, carouselApiExampleCommands] =
          CarouselApiExample.update(model.carouselApiExample, message);

        return [
          evo(model, { carouselApiExample: () => carouselApiExample }),
          Command.mapMessages(carouselApiExampleCommands, (message) =>
            GotCarouselApiExampleMessage({ message })
          ),
        ];
      },
      GotCarouselRtlExampleMessage: ({ message }) => {
        const [carouselRtlExample, carouselRtlExampleCommands] =
          CarouselRtlExample.update(model.carouselRtlExample, message);

        return [
          evo(model, { carouselRtlExample: () => carouselRtlExample }),
          Command.mapMessages(carouselRtlExampleCommands, (message) =>
            GotCarouselRtlExampleMessage({ message })
          ),
        ];
      },
      GotChartBasicExampleMessage: ({ message }) => {
        const [chartBasicExample, chartBasicExampleCommands] =
          ChartBasicExample.update(model.chartBasicExample, message);

        return [
          evo(model, { chartBasicExample: () => chartBasicExample }),
          Command.mapMessages(chartBasicExampleCommands, (message) =>
            GotChartBasicExampleMessage({ message })
          ),
        ];
      },
      GotChartGridExampleMessage: ({ message }) => {
        const [chartGridExample, chartGridExampleCommands] =
          ChartGridExample.update(model.chartGridExample, message);

        return [
          evo(model, { chartGridExample: () => chartGridExample }),
          Command.mapMessages(chartGridExampleCommands, (message) =>
            GotChartGridExampleMessage({ message })
          ),
        ];
      },
      GotChartAxisExampleMessage: ({ message }) => {
        const [chartAxisExample, chartAxisExampleCommands] =
          ChartAxisExample.update(model.chartAxisExample, message);

        return [
          evo(model, { chartAxisExample: () => chartAxisExample }),
          Command.mapMessages(chartAxisExampleCommands, (message) =>
            GotChartAxisExampleMessage({ message })
          ),
        ];
      },
      GotChartTooltipExampleMessage: ({ message }) => {
        const [chartTooltipExample, chartTooltipExampleCommands] =
          ChartTooltipExample.update(model.chartTooltipExample, message);

        return [
          evo(model, { chartTooltipExample: () => chartTooltipExample }),
          Command.mapMessages(chartTooltipExampleCommands, (message) =>
            GotChartTooltipExampleMessage({ message })
          ),
        ];
      },
      GotChartLegendExampleMessage: ({ message }) => {
        const [chartLegendExample, chartLegendExampleCommands] =
          ChartLegendExample.update(model.chartLegendExample, message);

        return [
          evo(model, { chartLegendExample: () => chartLegendExample }),
          Command.mapMessages(chartLegendExampleCommands, (message) =>
            GotChartLegendExampleMessage({ message })
          ),
        ];
      },
      GotChartRtlExampleMessage: ({ message }) => {
        const [chartRtlExample, chartRtlExampleCommands] =
          ChartRtlExample.update(model.chartRtlExample, message);

        return [
          evo(model, { chartRtlExample: () => chartRtlExample }),
          Command.mapMessages(chartRtlExampleCommands, (message) =>
            GotChartRtlExampleMessage({ message })
          ),
        ];
      },
      GotCommandBasicExampleMessage: ({ message }) => {
        const [commandBasicExample, commandBasicExampleCommands] =
          CommandBasicExample.update(model.commandBasicExample, message);

        return [
          evo(model, { commandBasicExample: () => commandBasicExample }),
          Command.mapMessages(commandBasicExampleCommands, (message) =>
            GotCommandBasicExampleMessage({ message })
          ),
        ];
      },
      GotDropdownMenuBasicExampleMessage: ({ message }) => {
        const [dropdownMenuBasicExample, dropdownMenuBasicExampleCommands] =
          DropdownMenuBasicExample.update(
            model.dropdownMenuBasicExample,
            message
          );

        return [
          evo(model, {
            dropdownMenuBasicExample: () => dropdownMenuBasicExample,
          }),
          Command.mapMessages(dropdownMenuBasicExampleCommands, (message) =>
            GotDropdownMenuBasicExampleMessage({ message })
          ),
        ];
      },
      GotHoverCardBasicExampleMessage: ({ message }) => {
        const [hoverCardBasicExample, hoverCardBasicExampleCommands] =
          HoverCardBasicExample.update(model.hoverCardBasicExample, message);

        return [
          evo(model, { hoverCardBasicExample: () => hoverCardBasicExample }),
          Command.mapMessages(hoverCardBasicExampleCommands, (message) =>
            GotHoverCardBasicExampleMessage({ message })
          ),
        ];
      },
      GotInputOtpBasicExampleMessage: ({ message }) => {
        const [inputOtpBasicExample, inputOtpBasicExampleCommands] =
          InputOtpBasicExample.update(model.inputOtpBasicExample, message);

        return [
          evo(model, { inputOtpBasicExample: () => inputOtpBasicExample }),
          Command.mapMessages(inputOtpBasicExampleCommands, (message) =>
            GotInputOtpBasicExampleMessage({ message })
          ),
        ];
      },
      GotNativeSelectBasicExampleMessage: ({ message }) => {
        const [nativeSelectBasicExample, nativeSelectBasicExampleCommands] =
          NativeSelectBasicExample.update(
            model.nativeSelectBasicExample,
            message
          );

        return [
          evo(model, {
            nativeSelectBasicExample: () => nativeSelectBasicExample,
          }),
          Command.mapMessages(nativeSelectBasicExampleCommands, (message) =>
            GotNativeSelectBasicExampleMessage({ message })
          ),
        ];
      },
      GotSheetBasicExampleMessage: ({ message }) => {
        const [sheetBasicExample, sheetBasicExampleCommands] =
          SheetBasicExample.update(model.sheetBasicExample, message);

        return [
          evo(model, { sheetBasicExample: () => sheetBasicExample }),
          Command.mapMessages(sheetBasicExampleCommands, (message) =>
            GotSheetBasicExampleMessage({ message })
          ),
        ];
      },
      GotSonnerBasicExampleMessage: ({ message }) => {
        const [sonnerBasicExample, sonnerBasicExampleCommands] =
          SonnerBasicExample.update(model.sonnerBasicExample, message);

        return [
          evo(model, { sonnerBasicExample: () => sonnerBasicExample }),
          Command.mapMessages(sonnerBasicExampleCommands, (message) =>
            GotSonnerBasicExampleMessage({ message })
          ),
        ];
      },
      GotDataTableBasicExampleMessage: ({ message }) => {
        const [dataTableBasicExample, dataTableBasicExampleCommands] =
          DataTableBasicExample.update(model.dataTableBasicExample, message);

        return [
          evo(model, { dataTableBasicExample: () => dataTableBasicExample }),
          Command.mapMessages(dataTableBasicExampleCommands, (message) =>
            GotDataTableBasicExampleMessage({ message })
          ),
        ];
      },
      GotDataTableRowActionsExampleMessage: ({ message }) => {
        const [dataTableRowActionsExample, dataTableRowActionsExampleCommands] =
          DataTableRowActionsExample.update(
            model.dataTableRowActionsExample,
            message
          );

        return [
          evo(model, {
            dataTableRowActionsExample: () => dataTableRowActionsExample,
          }),
          Command.mapMessages(dataTableRowActionsExampleCommands, (message) =>
            GotDataTableRowActionsExampleMessage({ message })
          ),
        ];
      },
      GotDataTablePaginationExampleMessage: ({ message }) => {
        const [dataTablePaginationExample, dataTablePaginationExampleCommands] =
          DataTablePaginationExample.update(
            model.dataTablePaginationExample,
            message
          );

        return [
          evo(model, {
            dataTablePaginationExample: () => dataTablePaginationExample,
          }),
          Command.mapMessages(dataTablePaginationExampleCommands, (message) =>
            GotDataTablePaginationExampleMessage({ message })
          ),
        ];
      },
      GotDataTableSortingExampleMessage: ({ message }) => {
        const [dataTableSortingExample, dataTableSortingExampleCommands] =
          DataTableSortingExample.update(
            model.dataTableSortingExample,
            message
          );

        return [
          evo(model, {
            dataTableSortingExample: () => dataTableSortingExample,
          }),
          Command.mapMessages(dataTableSortingExampleCommands, (message) =>
            GotDataTableSortingExampleMessage({ message })
          ),
        ];
      },
      GotDataTableFilteringExampleMessage: ({ message }) => {
        const [dataTableFilteringExample, dataTableFilteringExampleCommands] =
          DataTableFilteringExample.update(
            model.dataTableFilteringExample,
            message
          );

        return [
          evo(model, {
            dataTableFilteringExample: () => dataTableFilteringExample,
          }),
          Command.mapMessages(dataTableFilteringExampleCommands, (message) =>
            GotDataTableFilteringExampleMessage({ message })
          ),
        ];
      },
      GotDataTableVisibilityExampleMessage: ({ message }) => {
        const [dataTableVisibilityExample, dataTableVisibilityExampleCommands] =
          DataTableVisibilityExample.update(
            model.dataTableVisibilityExample,
            message
          );

        return [
          evo(model, {
            dataTableVisibilityExample: () => dataTableVisibilityExample,
          }),
          Command.mapMessages(dataTableVisibilityExampleCommands, (message) =>
            GotDataTableVisibilityExampleMessage({ message })
          ),
        ];
      },
      GotDataTableRowSelectionExampleMessage: ({ message }) => {
        const [
          dataTableRowSelectionExample,
          dataTableRowSelectionExampleCommands,
        ] = DataTableRowSelectionExample.update(
          model.dataTableRowSelectionExample,
          message
        );

        return [
          evo(model, {
            dataTableRowSelectionExample: () => dataTableRowSelectionExample,
          }),
          Command.mapMessages(dataTableRowSelectionExampleCommands, (message) =>
            GotDataTableRowSelectionExampleMessage({ message })
          ),
        ];
      },
      GotDirectionBasicExampleMessage: ({ message }) => {
        const [directionBasicExample, directionBasicExampleCommands] =
          DirectionBasicExample.update(model.directionBasicExample, message);

        return [
          evo(model, { directionBasicExample: () => directionBasicExample }),
          Command.mapMessages(directionBasicExampleCommands, (message) =>
            GotDirectionBasicExampleMessage({ message })
          ),
        ];
      },
      GotItemAvatarExampleMessage: ({ message }) => {
        const [itemAvatarExample, itemAvatarExampleCommands] =
          ItemAvatarExample.update(model.itemAvatarExample, message);

        return [
          evo(model, { itemAvatarExample: () => itemAvatarExample }),
          Command.mapMessages(itemAvatarExampleCommands, (message) =>
            GotItemAvatarExampleMessage({ message })
          ),
        ];
      },
      GotItemBasicExampleMessage: ({ message }) => {
        const [itemBasicExample, itemBasicExampleCommands] =
          ItemBasicExample.update(model.itemBasicExample, message);

        return [
          evo(model, { itemBasicExample: () => itemBasicExample }),
          Command.mapMessages(itemBasicExampleCommands, (message) =>
            GotItemBasicExampleMessage({ message })
          ),
        ];
      },
      GotItemGroupExampleMessage: ({ message }) => {
        const [itemGroupExample, itemGroupExampleCommands] =
          ItemGroupExample.update(model.itemGroupExample, message);

        return [
          evo(model, { itemGroupExample: () => itemGroupExample }),
          Command.mapMessages(itemGroupExampleCommands, (message) =>
            GotItemGroupExampleMessage({ message })
          ),
        ];
      },
      GotItemHeaderExampleMessage: ({ message }) => {
        const [itemHeaderExample, itemHeaderExampleCommands] =
          ItemHeaderExample.update(model.itemHeaderExample, message);

        return [
          evo(model, { itemHeaderExample: () => itemHeaderExample }),
          Command.mapMessages(itemHeaderExampleCommands, (message) =>
            GotItemHeaderExampleMessage({ message })
          ),
        ];
      },
      GotItemIconExampleMessage: ({ message }) => {
        const [itemIconExample, itemIconExampleCommands] =
          ItemIconExample.update(model.itemIconExample, message);

        return [
          evo(model, { itemIconExample: () => itemIconExample }),
          Command.mapMessages(itemIconExampleCommands, (message) =>
            GotItemIconExampleMessage({ message })
          ),
        ];
      },
      GotItemImageExampleMessage: ({ message }) => {
        const [itemImageExample, itemImageExampleCommands] =
          ItemImageExample.update(model.itemImageExample, message);

        return [
          evo(model, { itemImageExample: () => itemImageExample }),
          Command.mapMessages(itemImageExampleCommands, (message) =>
            GotItemImageExampleMessage({ message })
          ),
        ];
      },
      GotItemLinkExampleMessage: ({ message }) => {
        const [itemLinkExample, itemLinkExampleCommands] =
          ItemLinkExample.update(model.itemLinkExample, message);

        return [
          evo(model, { itemLinkExample: () => itemLinkExample }),
          Command.mapMessages(itemLinkExampleCommands, (message) =>
            GotItemLinkExampleMessage({ message })
          ),
        ];
      },
      GotItemRtlExampleMessage: ({ message }) => {
        const [itemRtlExample, itemRtlExampleCommands] = ItemRtlExample.update(
          model.itemRtlExample,
          message
        );

        return [
          evo(model, { itemRtlExample: () => itemRtlExample }),
          Command.mapMessages(itemRtlExampleCommands, (message) =>
            GotItemRtlExampleMessage({ message })
          ),
        ];
      },
      GotItemSizeExampleMessage: ({ message }) => {
        const [itemSizeExample, itemSizeExampleCommands] =
          ItemSizeExample.update(model.itemSizeExample, message);

        return [
          evo(model, { itemSizeExample: () => itemSizeExample }),
          Command.mapMessages(itemSizeExampleCommands, (message) =>
            GotItemSizeExampleMessage({ message })
          ),
        ];
      },
      GotItemVariantExampleMessage: ({ message }) => {
        const [itemVariantExample, itemVariantExampleCommands] =
          ItemVariantExample.update(model.itemVariantExample, message);

        return [
          evo(model, { itemVariantExample: () => itemVariantExample }),
          Command.mapMessages(itemVariantExampleCommands, (message) =>
            GotItemVariantExampleMessage({ message })
          ),
        ];
      },
      GotLabelBasicExampleMessage: ({ message }) => {
        const [labelBasicExample, labelBasicExampleCommands] =
          LabelBasicExample.update(model.labelBasicExample, message);

        return [
          evo(model, { labelBasicExample: () => labelBasicExample }),
          Command.mapMessages(labelBasicExampleCommands, (message) =>
            GotLabelBasicExampleMessage({ message })
          ),
        ];
      },
      GotPaginationBasicExampleMessage: ({ message }) => {
        const [paginationBasicExample, paginationBasicExampleCommands] =
          PaginationBasicExample.update(model.paginationBasicExample, message);

        return [
          evo(model, { paginationBasicExample: () => paginationBasicExample }),
          Command.mapMessages(paginationBasicExampleCommands, (message) =>
            GotPaginationBasicExampleMessage({ message })
          ),
        ];
      },
      GotResizableBasicExampleMessage: ({ message }) => {
        const [resizableBasicExample, resizableBasicExampleCommands] =
          ResizableBasicExample.update(model.resizableBasicExample, message);

        return [
          evo(model, { resizableBasicExample: () => resizableBasicExample }),
          Command.mapMessages(resizableBasicExampleCommands, (message) =>
            GotResizableBasicExampleMessage({ message })
          ),
        ];
      },
      GotSidebarBasicExampleMessage: ({ message }) => {
        const [sidebarBasicExample, sidebarBasicExampleCommands] =
          SidebarBasicExample.update(model.sidebarBasicExample, message);

        return [
          evo(model, { sidebarBasicExample: () => sidebarBasicExample }),
          Command.mapMessages(sidebarBasicExampleCommands, (message) =>
            GotSidebarBasicExampleMessage({ message })
          ),
        ];
      },
      GotTableBasicExampleMessage: ({ message }) => {
        const [tableBasicExample, tableBasicExampleCommands] =
          TableBasicExample.update(model.tableBasicExample, message);

        return [
          evo(model, { tableBasicExample: () => tableBasicExample }),
          Command.mapMessages(tableBasicExampleCommands, (message) =>
            GotTableBasicExampleMessage({ message })
          ),
        ];
      },
      GotCardBasicExampleMessage: ({ message }) => {
        const [cardBasicExample, cardBasicExampleCommands] =
          CardBasicExample.update(model.cardBasicExample, message);

        return [
          evo(model, { cardBasicExample: () => cardBasicExample }),
          Command.mapMessages(cardBasicExampleCommands, (message) =>
            GotCardBasicExampleMessage({ message })
          ),
        ];
      },

      GotSeparatorBasicExampleMessage: ({ message }) => {
        const [separatorBasicExample, separatorBasicExampleCommands] =
          SeparatorBasicExample.update(model.separatorBasicExample, message);

        return [
          evo(model, { separatorBasicExample: () => separatorBasicExample }),
          Command.mapMessages(separatorBasicExampleCommands, (message) =>
            GotSeparatorBasicExampleMessage({ message })
          ),
        ];
      },

      GotSkeletonBasicExampleMessage: ({ message }) => {
        const [skeletonBasicExample, skeletonBasicExampleCommands] =
          SkeletonBasicExample.update(model.skeletonBasicExample, message);

        return [
          evo(model, { skeletonBasicExample: () => skeletonBasicExample }),
          Command.mapMessages(skeletonBasicExampleCommands, (message) =>
            GotSkeletonBasicExampleMessage({ message })
          ),
        ];
      },

      GotKbdBasicExampleMessage: ({ message }) => {
        const [kbdBasicExample, kbdBasicExampleCommands] =
          KbdBasicExample.update(model.kbdBasicExample, message);

        return [
          evo(model, { kbdBasicExample: () => kbdBasicExample }),
          Command.mapMessages(kbdBasicExampleCommands, (message) =>
            GotKbdBasicExampleMessage({ message })
          ),
        ];
      },

      GotKbdInputGroupExampleMessage: ({ message }) => {
        const [kbdInputGroupExample, kbdInputGroupExampleCommands] =
          KbdInputGroupExample.update(model.kbdInputGroupExample, message);

        return [
          evo(model, { kbdInputGroupExample: () => kbdInputGroupExample }),
          Command.mapMessages(kbdInputGroupExampleCommands, (message) =>
            GotKbdInputGroupExampleMessage({ message })
          ),
        ];
      },

      GotTypographyBasicExampleMessage: ({ message }) => {
        const [typographyBasicExample, typographyBasicExampleCommands] =
          TypographyBasicExample.update(model.typographyBasicExample, message);

        return [
          evo(model, { typographyBasicExample: () => typographyBasicExample }),
          Command.mapMessages(typographyBasicExampleCommands, (message) =>
            GotTypographyBasicExampleMessage({ message })
          ),
        ];
      },

      GotEmptyBasicExampleMessage: ({ message }) => {
        const [emptyBasicExample, emptyBasicExampleCommands] =
          EmptyBasicExample.update(model.emptyBasicExample, message);

        return [
          evo(model, { emptyBasicExample: () => emptyBasicExample }),
          Command.mapMessages(emptyBasicExampleCommands, (message) =>
            GotEmptyBasicExampleMessage({ message })
          ),
        ];
      },

      GotEmptyInputGroupExampleMessage: ({ message }) => {
        const [emptyInputGroupExample, emptyInputGroupExampleCommands] =
          EmptyInputGroupExample.update(model.emptyInputGroupExample, message);

        return [
          evo(model, { emptyInputGroupExample: () => emptyInputGroupExample }),
          Command.mapMessages(emptyInputGroupExampleCommands, (message) =>
            GotEmptyInputGroupExampleMessage({ message })
          ),
        ];
      },

      GotButtonBasicExampleMessage: ({ message }) => {
        const [buttonBasicExample, buttonBasicExampleCommands] =
          ButtonBasicExample.update(model.buttonBasicExample, message);

        return [
          evo(model, { buttonBasicExample: () => buttonBasicExample }),
          Command.mapMessages(buttonBasicExampleCommands, (message) =>
            GotButtonBasicExampleMessage({ message })
          ),
        ];
      },

      GotButtonDisabledExampleMessage: ({ message }) => {
        const [buttonDisabledExample, buttonDisabledExampleCommands] =
          ButtonDisabledExample.update(model.buttonDisabledExample, message);

        return [
          evo(model, { buttonDisabledExample: () => buttonDisabledExample }),
          Command.mapMessages(buttonDisabledExampleCommands, (message) =>
            GotButtonDisabledExampleMessage({ message })
          ),
        ];
      },

      GotCalendarBasicExampleMessage: ({ message }) => {
        const [calendarBasicExample, calendarBasicExampleCommands] =
          CalendarBasicExample.update(model.calendarBasicExample, message);

        return [
          evo(model, { calendarBasicExample: () => calendarBasicExample }),
          Command.mapMessages(calendarBasicExampleCommands, (message) =>
            GotCalendarBasicExampleMessage({ message })
          ),
        ];
      },

      GotCalendarBoundsExampleMessage: ({ message }) => {
        const [calendarBoundsExample, calendarBoundsExampleCommands] =
          CalendarBoundsExample.update(model.calendarBoundsExample, message);

        return [
          evo(model, { calendarBoundsExample: () => calendarBoundsExample }),
          Command.mapMessages(calendarBoundsExampleCommands, (message) =>
            GotCalendarBoundsExampleMessage({ message })
          ),
        ];
      },

      GotCheckboxBasicExampleMessage: ({ message }) => {
        const [checkboxBasicExample, checkboxBasicExampleCommands] =
          CheckboxBasicExample.update(model.checkboxBasicExample, message);

        return [
          evo(model, { checkboxBasicExample: () => checkboxBasicExample }),
          Command.mapMessages(checkboxBasicExampleCommands, (message) =>
            GotCheckboxBasicExampleMessage({ message })
          ),
        ];
      },

      GotCheckboxGroupBasicExampleMessage: ({ message }) => {
        const [checkboxGroupBasicExample, checkboxGroupBasicExampleCommands] =
          CheckboxGroupBasicExample.update(
            model.checkboxGroupBasicExample,
            message
          );

        return [
          evo(model, {
            checkboxGroupBasicExample: () => checkboxGroupBasicExample,
          }),
          Command.mapMessages(checkboxGroupBasicExampleCommands, (message) =>
            GotCheckboxGroupBasicExampleMessage({ message })
          ),
        ];
      },

      GotCheckboxIndeterminateExampleMessage: ({ message }) => {
        const [
          checkboxIndeterminateExample,
          checkboxIndeterminateExampleCommands,
        ] = CheckboxIndeterminateExample.update(
          model.checkboxIndeterminateExample,
          message
        );

        return [
          evo(model, {
            checkboxIndeterminateExample: () => checkboxIndeterminateExample,
          }),
          Command.mapMessages(checkboxIndeterminateExampleCommands, (message) =>
            GotCheckboxIndeterminateExampleMessage({ message })
          ),
        ];
      },

      GotComboboxBasicExampleMessage: ({ message }) => {
        const [comboboxBasicExample, comboboxBasicExampleCommands] =
          ComboboxBasicExample.update(model.comboboxBasicExample, message);

        return [
          evo(model, {
            comboboxBasicExample: () => comboboxBasicExample,
          }),
          Command.mapMessages(comboboxBasicExampleCommands, (message) =>
            GotComboboxBasicExampleMessage({ message })
          ),
        ];
      },

      GotComboboxMultiExampleMessage: ({ message }) => {
        const [comboboxMultiExample, comboboxMultiExampleCommands] =
          ComboboxMultiExample.update(model.comboboxMultiExample, message);

        return [
          evo(model, {
            comboboxMultiExample: () => comboboxMultiExample,
          }),
          Command.mapMessages(comboboxMultiExampleCommands, (message) =>
            GotComboboxMultiExampleMessage({ message })
          ),
        ];
      },

      GotDatePickerBasicExampleMessage: ({ message }) => {
        const [datePickerBasicExample, datePickerBasicExampleCommands] =
          DatePickerBasicExample.update(model.datePickerBasicExample, message);

        return [
          evo(model, { datePickerBasicExample: () => datePickerBasicExample }),
          Command.mapMessages(datePickerBasicExampleCommands, (message) =>
            GotDatePickerBasicExampleMessage({ message })
          ),
        ];
      },

      GotDatePickerBoundsExampleMessage: ({ message }) => {
        const [datePickerBoundsExample, datePickerBoundsExampleCommands] =
          DatePickerBoundsExample.update(
            model.datePickerBoundsExample,
            message
          );

        return [
          evo(model, {
            datePickerBoundsExample: () => datePickerBoundsExample,
          }),
          Command.mapMessages(datePickerBoundsExampleCommands, (message) =>
            GotDatePickerBoundsExampleMessage({ message })
          ),
        ];
      },

      GotDialogBasicExampleMessage: ({ message }) => {
        const [dialogBasicExample, dialogBasicExampleCommands] =
          DialogBasicExample.update(model.dialogBasicExample, message);

        return [
          evo(model, { dialogBasicExample: () => dialogBasicExample }),
          Command.mapMessages(dialogBasicExampleCommands, (message) =>
            GotDialogBasicExampleMessage({ message })
          ),
        ];
      },

      GotDialogAnimatedExampleMessage: ({ message }) => {
        const [dialogAnimatedExample, dialogAnimatedExampleCommands] =
          DialogAnimatedExample.update(model.dialogAnimatedExample, message);

        return [
          evo(model, { dialogAnimatedExample: () => dialogAnimatedExample }),
          Command.mapMessages(dialogAnimatedExampleCommands, (message) =>
            GotDialogAnimatedExampleMessage({ message })
          ),
        ];
      },

      GotDialogDestructiveExampleMessage: ({ message }) => {
        const [dialogDestructiveExample, dialogDestructiveExampleCommands] =
          DialogDestructiveExample.update(
            model.dialogDestructiveExample,
            message
          );

        return [
          evo(model, {
            dialogDestructiveExample: () => dialogDestructiveExample,
          }),
          Command.mapMessages(dialogDestructiveExampleCommands, (message) =>
            GotDialogDestructiveExampleMessage({ message })
          ),
        ];
      },

      GotDialogFocusExampleMessage: ({ message }) => {
        const [dialogFocusExample, dialogFocusExampleCommands] =
          DialogFocusExample.update(model.dialogFocusExample, message);

        return [
          evo(model, {
            dialogFocusExample: () => dialogFocusExample,
          }),
          Command.mapMessages(dialogFocusExampleCommands, (message) =>
            GotDialogFocusExampleMessage({ message })
          ),
        ];
      },

      GotDialogScrollableExampleMessage: ({ message }) => {
        const [dialogScrollableExample, dialogScrollableExampleCommands] =
          DialogScrollableExample.update(
            model.dialogScrollableExample,
            message
          );

        return [
          evo(model, {
            dialogScrollableExample: () => dialogScrollableExample,
          }),
          Command.mapMessages(dialogScrollableExampleCommands, (message) =>
            GotDialogScrollableExampleMessage({ message })
          ),
        ];
      },

      GotDisclosureBasicExampleMessage: ({ message }) => {
        const [disclosureBasicExample, disclosureBasicExampleCommands] =
          DisclosureBasicExample.update(model.disclosureBasicExample, message);

        return [
          evo(model, { disclosureBasicExample: () => disclosureBasicExample }),
          Command.mapMessages(disclosureBasicExampleCommands, (message) =>
            GotDisclosureBasicExampleMessage({ message })
          ),
        ];
      },

      GotDisclosureDisabledExampleMessage: ({ message }) => {
        const [disclosureDisabledExample, disclosureDisabledExampleCommands] =
          DisclosureDisabledExample.update(
            model.disclosureDisabledExample,
            message
          );

        return [
          evo(model, {
            disclosureDisabledExample: () => disclosureDisabledExample,
          }),
          Command.mapMessages(disclosureDisabledExampleCommands, (message) =>
            GotDisclosureDisabledExampleMessage({ message })
          ),
        ];
      },

      GotDragAndDropBasicExampleMessage: ({ message }) => {
        const [dragAndDropBasicExample, dragAndDropBasicExampleCommands] =
          DragAndDropBasicExample.update(
            model.dragAndDropBasicExample,
            message
          );

        return [
          evo(model, {
            dragAndDropBasicExample: () => dragAndDropBasicExample,
          }),
          Command.mapMessages(dragAndDropBasicExampleCommands, (message) =>
            GotDragAndDropBasicExampleMessage({ message })
          ),
        ];
      },

      GotDragAndDropDisabledExampleMessage: ({ message }) => {
        const [dragAndDropDisabledExample, dragAndDropDisabledExampleCommands] =
          DragAndDropDisabledExample.update(
            model.dragAndDropDisabledExample,
            message
          );

        return [
          evo(model, {
            dragAndDropDisabledExample: () => dragAndDropDisabledExample,
          }),
          Command.mapMessages(dragAndDropDisabledExampleCommands, (message) =>
            GotDragAndDropDisabledExampleMessage({ message })
          ),
        ];
      },

      GotFieldsetBasicExampleMessage: ({ message }) => {
        const [fieldsetBasicExample, fieldsetBasicExampleCommands] =
          FieldsetBasicExample.update(model.fieldsetBasicExample, message);

        return [
          evo(model, { fieldsetBasicExample: () => fieldsetBasicExample }),
          Command.mapMessages(fieldsetBasicExampleCommands, (message) =>
            GotFieldsetBasicExampleMessage({ message })
          ),
        ];
      },

      GotFieldsetDisabledExampleMessage: ({ message }) => {
        const [fieldsetDisabledExample, fieldsetDisabledExampleCommands] =
          FieldsetDisabledExample.update(
            model.fieldsetDisabledExample,
            message
          );

        return [
          evo(model, {
            fieldsetDisabledExample: () => fieldsetDisabledExample,
          }),
          Command.mapMessages(fieldsetDisabledExampleCommands, (message) =>
            GotFieldsetDisabledExampleMessage({ message })
          ),
        ];
      },

      GotFileDropBasicExampleMessage: ({ message }) => {
        const [fileDropBasicExample, fileDropBasicExampleCommands] =
          FileDropBasicExample.update(model.fileDropBasicExample, message);

        return [
          evo(model, { fileDropBasicExample: () => fileDropBasicExample }),
          Command.mapMessages(fileDropBasicExampleCommands, (message) =>
            GotFileDropBasicExampleMessage({ message })
          ),
        ];
      },

      GotFileDropDisabledExampleMessage: ({ message }) => {
        const [fileDropDisabledExample, fileDropDisabledExampleCommands] =
          FileDropDisabledExample.update(
            model.fileDropDisabledExample,
            message
          );

        return [
          evo(model, {
            fileDropDisabledExample: () => fileDropDisabledExample,
          }),
          Command.mapMessages(fileDropDisabledExampleCommands, (message) =>
            GotFileDropDisabledExampleMessage({ message })
          ),
        ];
      },

      GotInputBasicExampleMessage: ({ message }) => {
        const [inputBasicExample, inputBasicExampleCommands] =
          InputBasicExample.update(model.inputBasicExample, message);

        return [
          evo(model, { inputBasicExample: () => inputBasicExample }),
          Command.mapMessages(inputBasicExampleCommands, (message) =>
            GotInputBasicExampleMessage({ message })
          ),
        ];
      },

      GotInputDisabledExampleMessage: ({ message }) => {
        const [inputDisabledExample, inputDisabledExampleCommands] =
          InputDisabledExample.update(model.inputDisabledExample, message);

        return [
          evo(model, { inputDisabledExample: () => inputDisabledExample }),
          Command.mapMessages(inputDisabledExampleCommands, (message) =>
            GotInputDisabledExampleMessage({ message })
          ),
        ];
      },

      GotMeterBasicExampleMessage: ({ message }) => {
        const [meterBasicExample, meterBasicExampleCommands] =
          MeterBasicExample.update(model.meterBasicExample, message);

        return [
          evo(model, { meterBasicExample: () => meterBasicExample }),
          Command.mapMessages(meterBasicExampleCommands, (message) =>
            GotMeterBasicExampleMessage({ message })
          ),
        ];
      },

      GotScrollAreaBasicExampleMessage: ({ message }) => {
        const [scrollAreaBasicExample, scrollAreaBasicExampleCommands] =
          ScrollAreaBasicExample.update(model.scrollAreaBasicExample, message);

        return [
          evo(model, { scrollAreaBasicExample: () => scrollAreaBasicExample }),
          Command.mapMessages(scrollAreaBasicExampleCommands, (message) =>
            GotScrollAreaBasicExampleMessage({ message })
          ),
        ];
      },

      GotToggleBasicExampleMessage: ({ message }) => {
        const [toggleBasicExample, toggleBasicExampleCommands] =
          ToggleBasicExample.update(model.toggleBasicExample, message);

        return [
          evo(model, { toggleBasicExample: () => toggleBasicExample }),
          Command.mapMessages(toggleBasicExampleCommands, (message) =>
            GotToggleBasicExampleMessage({ message })
          ),
        ];
      },

      GotToggleGroupBasicExampleMessage: ({ message }) => {
        const [toggleGroupBasicExample, toggleGroupBasicExampleCommands] =
          ToggleGroupBasicExample.update(
            model.toggleGroupBasicExample,
            message
          );

        return [
          evo(model, {
            toggleGroupBasicExample: () => toggleGroupBasicExample,
          }),
          Command.mapMessages(toggleGroupBasicExampleCommands, (message) =>
            GotToggleGroupBasicExampleMessage({ message })
          ),
        ];
      },

      GotRadioBasicExampleMessage: ({ message }) => {
        const [radioBasicExample, radioBasicExampleCommands] =
          RadioBasicExample.update(model.radioBasicExample, message);

        return [
          evo(model, { radioBasicExample: () => radioBasicExample }),
          Command.mapMessages(radioBasicExampleCommands, (message) =>
            GotRadioBasicExampleMessage({ message })
          ),
        ];
      },

      GotToolbarBasicExampleMessage: ({ message }) => {
        const [toolbarBasicExample, toolbarBasicExampleCommands] =
          ToolbarBasicExample.update(model.toolbarBasicExample, message);

        return [
          evo(model, { toolbarBasicExample: () => toolbarBasicExample }),
          Command.mapMessages(toolbarBasicExampleCommands, (message) =>
            GotToolbarBasicExampleMessage({ message })
          ),
        ];
      },

      GotProgressBasicExampleMessage: ({ message }) => {
        const [progressBasicExample, progressBasicExampleCommands] =
          ProgressBasicExample.update(model.progressBasicExample, message);

        return [
          evo(model, { progressBasicExample: () => progressBasicExample }),
          Command.mapMessages(progressBasicExampleCommands, (message) =>
            GotProgressBasicExampleMessage({ message })
          ),
        ];
      },

      GotListboxBasicExampleMessage: ({ message }) => {
        const [listboxBasicExample, listboxBasicExampleCommands] =
          ListboxBasicExample.update(model.listboxBasicExample, message);

        return [
          evo(model, {
            listboxBasicExample: () => listboxBasicExample,
          }),
          Command.mapMessages(listboxBasicExampleCommands, (message) =>
            GotListboxBasicExampleMessage({ message })
          ),
        ];
      },

      GotListboxAnimatedExampleMessage: ({ message }) => {
        const [listboxAnimatedExample, listboxAnimatedExampleCommands] =
          ListboxAnimatedExample.update(model.listboxAnimatedExample, message);

        return [
          evo(model, {
            listboxAnimatedExample: () => listboxAnimatedExample,
          }),
          Command.mapMessages(listboxAnimatedExampleCommands, (message) =>
            GotListboxAnimatedExampleMessage({ message })
          ),
        ];
      },

      GotMenuBasicExampleMessage: ({ message }) => {
        const [menuBasicExample, menuBasicExampleCommands] =
          MenuBasicExample.update(model.menuBasicExample, message);

        return [
          evo(model, {
            menuBasicExample: () => menuBasicExample,
          }),
          Command.mapMessages(menuBasicExampleCommands, (message) =>
            GotMenuBasicExampleMessage({ message })
          ),
        ];
      },

      GotMenuAnimatedExampleMessage: ({ message }) => {
        const [menuAnimatedExample, menuAnimatedExampleCommands] =
          MenuAnimatedExample.update(model.menuAnimatedExample, message);

        return [
          evo(model, {
            menuAnimatedExample: () => menuAnimatedExample,
          }),
          Command.mapMessages(menuAnimatedExampleCommands, (message) =>
            GotMenuAnimatedExampleMessage({ message })
          ),
        ];
      },

      GotPopoverBasicExampleMessage: ({ message }) => {
        const [popoverBasicExample, popoverBasicExampleCommands] =
          PopoverBasicExample.update(model.popoverBasicExample, message);

        return [
          evo(model, {
            popoverBasicExample: () => popoverBasicExample,
          }),
          Command.mapMessages(popoverBasicExampleCommands, (message) =>
            GotPopoverBasicExampleMessage({ message })
          ),
        ];
      },

      GotPopoverAnimatedExampleMessage: ({ message }) => {
        const [popoverAnimatedExample, popoverAnimatedExampleCommands] =
          PopoverAnimatedExample.update(model.popoverAnimatedExample, message);

        return [
          evo(model, {
            popoverAnimatedExample: () => popoverAnimatedExample,
          }),
          Command.mapMessages(popoverAnimatedExampleCommands, (message) =>
            GotPopoverAnimatedExampleMessage({ message })
          ),
        ];
      },

      GotRadioGroupBasicExampleMessage: ({ message }) => {
        const [radioGroupBasicExample, radioGroupBasicExampleCommands] =
          RadioGroupBasicExample.update(model.radioGroupBasicExample, message);

        return [
          evo(model, {
            radioGroupBasicExample: () => radioGroupBasicExample,
          }),
          Command.mapMessages(radioGroupBasicExampleCommands, (message) =>
            GotRadioGroupBasicExampleMessage({ message })
          ),
        ];
      },

      GotRadioGroupHorizontalExampleMessage: ({ message }) => {
        const [
          radioGroupHorizontalExample,
          radioGroupHorizontalExampleCommands,
        ] = RadioGroupHorizontalExample.update(
          model.radioGroupHorizontalExample,
          message
        );

        return [
          evo(model, {
            radioGroupHorizontalExample: () => radioGroupHorizontalExample,
          }),
          Command.mapMessages(radioGroupHorizontalExampleCommands, (message) =>
            GotRadioGroupHorizontalExampleMessage({ message })
          ),
        ];
      },

      GotSelectBasicExampleMessage: ({ message }) => {
        const [selectBasicExample, selectBasicExampleCommands] =
          SelectBasicExample.update(model.selectBasicExample, message);

        return [
          evo(model, {
            selectBasicExample: () => selectBasicExample,
          }),
          Command.mapMessages(selectBasicExampleCommands, (message) =>
            GotSelectBasicExampleMessage({ message })
          ),
        ];
      },

      GotSelectDisabledExampleMessage: ({ message }) => {
        const [selectDisabledExample, selectDisabledExampleCommands] =
          SelectDisabledExample.update(model.selectDisabledExample, message);

        return [
          evo(model, {
            selectDisabledExample: () => selectDisabledExample,
          }),
          Command.mapMessages(selectDisabledExampleCommands, (message) =>
            GotSelectDisabledExampleMessage({ message })
          ),
        ];
      },

      GotSliderBasicExampleMessage: ({ message }) => {
        const [sliderBasicExample, sliderBasicExampleCommands] =
          SliderBasicExample.update(model.sliderBasicExample, message);

        return [
          evo(model, { sliderBasicExample: () => sliderBasicExample }),
          Command.mapMessages(sliderBasicExampleCommands, (message) =>
            GotSliderBasicExampleMessage({ message })
          ),
        ];
      },

      GotSliderDisabledExampleMessage: ({ message }) => {
        const [sliderDisabledExample, sliderDisabledExampleCommands] =
          SliderDisabledExample.update(model.sliderDisabledExample, message);

        return [
          evo(model, { sliderDisabledExample: () => sliderDisabledExample }),
          Command.mapMessages(sliderDisabledExampleCommands, (message) =>
            GotSliderDisabledExampleMessage({ message })
          ),
        ];
      },

      GotSwitchBasicExampleMessage: ({ message }) => {
        const [switchBasicExample, switchBasicExampleCommands] =
          SwitchBasicExample.update(model.switchBasicExample, message);

        return [
          evo(model, {
            switchBasicExample: () => switchBasicExample,
          }),
          Command.mapMessages(switchBasicExampleCommands, (message) =>
            GotSwitchBasicExampleMessage({ message })
          ),
        ];
      },

      GotSwitchDisabledExampleMessage: ({ message }) => {
        const [switchDisabledExample, switchDisabledExampleCommands] =
          SwitchDisabledExample.update(model.switchDisabledExample, message);

        return [
          evo(model, {
            switchDisabledExample: () => switchDisabledExample,
          }),
          Command.mapMessages(switchDisabledExampleCommands, (message) =>
            GotSwitchDisabledExampleMessage({ message })
          ),
        ];
      },

      GotTabsBasicExampleMessage: ({ message }) => {
        const [tabsBasicExample, tabsBasicExampleCommands] =
          TabsBasicExample.update(model.tabsBasicExample, message);

        return [
          evo(model, { tabsBasicExample: () => tabsBasicExample }),
          Command.mapMessages(tabsBasicExampleCommands, (message) =>
            GotTabsBasicExampleMessage({ message })
          ),
        ];
      },

      GotTabsManualExampleMessage: ({ message }) => {
        const [tabsManualExample, tabsManualExampleCommands] =
          TabsManualExample.update(model.tabsManualExample, message);

        return [
          evo(model, { tabsManualExample: () => tabsManualExample }),
          Command.mapMessages(tabsManualExampleCommands, (message) =>
            GotTabsManualExampleMessage({ message })
          ),
        ];
      },

      GotTextareaBasicExampleMessage: ({ message }) => {
        const [textareaBasicExample, textareaBasicExampleCommands] =
          TextareaBasicExample.update(model.textareaBasicExample, message);

        return [
          evo(model, {
            textareaBasicExample: () => textareaBasicExample,
          }),
          Command.mapMessages(textareaBasicExampleCommands, (message) =>
            GotTextareaBasicExampleMessage({ message })
          ),
        ];
      },

      GotTextareaDisabledExampleMessage: ({ message }) => {
        const [textareaDisabledExample, textareaDisabledExampleCommands] =
          TextareaDisabledExample.update(
            model.textareaDisabledExample,
            message
          );

        return [
          evo(model, {
            textareaDisabledExample: () => textareaDisabledExample,
          }),
          Command.mapMessages(textareaDisabledExampleCommands, (message) =>
            GotTextareaDisabledExampleMessage({ message })
          ),
        ];
      },

      GotToastBasicExampleMessage: ({ message }) => {
        const [toastBasicExample, toastBasicExampleCommands] =
          ToastBasicExample.update(model.toastBasicExample, message);

        return [
          evo(model, { toastBasicExample: () => toastBasicExample }),
          Command.mapMessages(toastBasicExampleCommands, (message) =>
            GotToastBasicExampleMessage({ message })
          ),
        ];
      },

      GotToastVariantsExampleMessage: ({ message }) => {
        const [toastVariantsExample, toastVariantsExampleCommands] =
          ToastVariantsExample.update(model.toastVariantsExample, message);

        return [
          evo(model, { toastVariantsExample: () => toastVariantsExample }),
          Command.mapMessages(toastVariantsExampleCommands, (message) =>
            GotToastVariantsExampleMessage({ message })
          ),
        ];
      },

      GotTooltipBasicExampleMessage: ({ message }) => {
        const [tooltipBasicExample, tooltipBasicExampleCommands] =
          TooltipBasicExample.update(model.tooltipBasicExample, message);

        return [
          evo(model, { tooltipBasicExample: () => tooltipBasicExample }),
          Command.mapMessages(tooltipBasicExampleCommands, (message) =>
            GotTooltipBasicExampleMessage({ message })
          ),
        ];
      },

      GotTooltipNoDelayExampleMessage: ({ message }) => {
        const [tooltipNoDelayExample, tooltipNoDelayExampleCommands] =
          TooltipNoDelayExample.update(model.tooltipNoDelayExample, message);

        return [
          evo(model, { tooltipNoDelayExample: () => tooltipNoDelayExample }),
          Command.mapMessages(tooltipNoDelayExampleCommands, (message) =>
            GotTooltipNoDelayExampleMessage({ message })
          ),
        ];
      },

      GotVirtualListBasicExampleMessage: ({ message }) => {
        const [virtualListBasicExample, virtualListBasicExampleCommands] =
          VirtualListBasicExample.update(
            model.virtualListBasicExample,
            message
          );

        return [
          evo(model, {
            virtualListBasicExample: () => virtualListBasicExample,
          }),
          Command.mapMessages(virtualListBasicExampleCommands, (message) =>
            GotVirtualListBasicExampleMessage({ message })
          ),
        ];
      },

      GotVirtualListVariableExampleMessage: ({ message }) => {
        const [virtualListVariableExample, virtualListVariableExampleCommands] =
          VirtualListVariableExample.update(
            model.virtualListVariableExample,
            message
          );

        return [
          evo(model, {
            virtualListVariableExample: () => virtualListVariableExample,
          }),
          Command.mapMessages(virtualListVariableExampleCommands, (message) =>
            GotVirtualListVariableExampleMessage({ message })
          ),
        ];
      },
    })
  );

// SUBSCRIPTION

const uiSubscriptions = Subscription.lift(UiSubscriptions.subscriptions)<
  Model,
  Message
>({
  toChildModel: (model) => model.uiModel,
  toParentMessage: (message) => GotUiMessage({ message }),
});

const dragAndDropBasicExampleSubscriptions = Subscription.lift({
  dragAndDropBasicPointer: Ui.DragAndDrop.subscriptions.documentPointer,
  dragAndDropBasicEscape: Ui.DragAndDrop.subscriptions.documentEscape,
  dragAndDropBasicKeyboard: Ui.DragAndDrop.subscriptions.documentKeyboard,
  dragAndDropBasicAutoScroll: Ui.DragAndDrop.subscriptions.autoScroll,
})<Model, Message>({
  toChildModel: (model) => model.dragAndDropBasicExample.dragAndDrop,
  toParentMessage: (message) =>
    GotDragAndDropBasicExampleMessage({
      message: DragAndDropBasicExample.GotDragAndDropMessage({ message }),
    }),
});

const sliderBasicExampleSubscriptions = Subscription.lift({
  sliderBasicDragPointer: Ui.Slider.subscriptions.dragPointer,
  sliderBasicDragEscape: Ui.Slider.subscriptions.dragEscape,
})<Model, Message>({
  toChildModel: (model) => model.sliderBasicExample.slider,
  toParentMessage: (message) =>
    GotSliderBasicExampleMessage({
      message: SliderBasicExample.GotSliderMessage({ message }),
    }),
});

const virtualListBasicExampleSubscriptions = Subscription.lift({
  virtualListBasicContainerEvents: Ui.VirtualList.subscriptions.containerEvents,
})<Model, Message>({
  toChildModel: (model) => model.virtualListBasicExample.virtualList,
  toParentMessage: (message) =>
    GotVirtualListBasicExampleMessage({
      message: VirtualListBasicExample.GotVirtualListMessage({ message }),
    }),
});

const virtualListVariableExampleSubscriptions = Subscription.lift({
  virtualListVariableExampleContainerEvents:
    Ui.VirtualList.subscriptions.containerEvents,
})<Model, Message>({
  toChildModel: (model) => model.virtualListVariableExample.virtualList,
  toParentMessage: (message) =>
    GotVirtualListVariableExampleMessage({
      message: VirtualListVariableExample.GotVirtualListMessage({ message }),
    }),
});

export const subscriptions = Subscription.aggregate<Model, Message>()(
  uiSubscriptions,
  dragAndDropBasicExampleSubscriptions,
  sliderBasicExampleSubscriptions,
  virtualListBasicExampleSubscriptions,
  virtualListVariableExampleSubscriptions
);
