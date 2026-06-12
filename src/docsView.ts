import clsx from "clsx";
import { Match as M } from "effect";
import { Ui } from "foldkit";
import type { Submodel } from "foldkit";
import type { Document, Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as DocsPreviewsAccordion from "docs-example-previews-accordion";
import * as DocsPreviewsAlert from "docs-example-previews-alert";
import * as DocsPreviewsAnimation from "docs-example-previews-animation";
import * as DocsPreviewsAspect from "docs-example-previews-aspect";
import * as DocsPreviewsAutocomplete from "docs-example-previews-autocomplete";
import * as DocsPreviewsAvatar from "docs-example-previews-avatar";
import * as DocsPreviewsB from "docs-example-previews-b";
import * as DocsPreviewsCD from "docs-example-previews-cd";
import * as DocsPreviewsEI from "docs-example-previews-ei";
import * as DocsPreviewsJM from "docs-example-previews-jm";
import * as DocsPreviewsNZ from "docs-example-previews-nz";
import * as DocsPreviewsShadcnMissing from "docs-example-previews-shadcn-missing";
import * as DocsRoutes from "docs-example-routes";
import * as Icon from "./icon";
import * as Main from "app-main";
import type { UiMessage } from "./ui/message";
import type { UiModel } from "./ui/model";
import * as View from "legacy-ui-views";

type Model = Main.Model;
type Message = Main.Message;

// VIEW

type NavItem = Readonly<{
  label: string;
  routeTag: string;
  href: string;
}>;

type ComponentLibrary = "Foldkit" | "Base UI" | "shadcn";

type DocsNavItem = NavItem &
  Readonly<{
    library: ComponentLibrary;
    componentRoutePrefix: string;
    activeRouteTags: readonly string[];
    availability: "available" | "coming-soon";
  }>;

type DocsNavGroup = Readonly<{
  library: ComponentLibrary;
  items: readonly DocsNavItem[];
}>;

const NAV_ITEMS: readonly NavItem[] = [
  {
    label: "Accordion Docs",
    routeTag: "ShadcnAccordionDocs",
    href: "/docs/components/shadcn-accordion",
  },
  {
    label: "Accordion Basic Example",
    routeTag: "AccordionBasicExample",
    href: "/docs/components/accordion/examples/basic",
  },
  {
    label: "Accordion Multiple Example",
    routeTag: "AccordionMultipleExample",
    href: "/docs/components/accordion/examples/multiple",
  },
  {
    label: "Alert Docs",
    routeTag: "ShadcnAlertDocs",
    href: "/docs/components/shadcn-alert",
  },
  {
    label: "Alert Basic Example",
    routeTag: "AlertBasicExample",
    href: "/docs/components/alert/examples/basic",
  },
  {
    label: "Alert Destructive Example",
    routeTag: "AlertDestructiveExample",
    href: "/docs/components/alert/examples/destructive",
  },
  {
    label: "Aspect Ratio Docs",
    routeTag: "ShadcnAspectRatioDocs",
    href: "/docs/components/shadcn-aspect-ratio",
  },
  {
    label: "Aspect Ratio Basic Example",
    routeTag: "AspectRatioBasicExample",
    href: "/docs/components/aspect-ratio/examples/basic",
  },
  {
    label: "Aspect Ratio Square Example",
    routeTag: "AspectRatioSquareExample",
    href: "/docs/components/aspect-ratio/examples/square",
  },
  {
    label: "Aspect Ratio Portrait Example",
    routeTag: "AspectRatioPortraitExample",
    href: "/docs/components/aspect-ratio/examples/portrait",
  },
  {
    label: "Aspect Ratio RTL Example",
    routeTag: "AspectRatioRtlExample",
    href: "/docs/components/aspect-ratio/examples/rtl",
  },
  {
    label: "Breadcrumb Docs",
    routeTag: "ShadcnBreadcrumbDocs",
    href: "/docs/components/shadcn-breadcrumb",
  },
  {
    label: "Breadcrumb Basic Example",
    routeTag: "BreadcrumbBasicExample",
    href: "/docs/components/breadcrumb/examples/basic",
  },
  {
    label: "Breadcrumb Separator Example",
    routeTag: "BreadcrumbSeparatorExample",
    href: "/docs/components/breadcrumb/examples/separator",
  },
  {
    label: "Breadcrumb Dropdown Example",
    routeTag: "BreadcrumbDropdownExample",
    href: "/docs/components/breadcrumb/examples/dropdown",
  },
  {
    label: "Breadcrumb Collapsed Example",
    routeTag: "BreadcrumbCollapsedExample",
    href: "/docs/components/breadcrumb/examples/collapsed",
  },
  {
    label: "Breadcrumb Link Example",
    routeTag: "BreadcrumbLinkExample",
    href: "/docs/components/breadcrumb/examples/link",
  },
  {
    label: "Breadcrumb RTL Example",
    routeTag: "BreadcrumbRtlExample",
    href: "/docs/components/breadcrumb/examples/rtl",
  },
  {
    label: "Button Group Docs",
    routeTag: "ShadcnButtonGroupDocs",
    href: "/docs/components/shadcn-button-group",
  },
  {
    label: "Button Group Basic Example",
    routeTag: "ButtonGroupBasicExample",
    href: "/docs/components/shadcn-button-group/examples/basic",
  },
  {
    label: "Button Group Orientation Example",
    routeTag: "ButtonGroupOrientationExample",
    href: "/docs/components/shadcn-button-group/examples/orientation",
  },
  {
    label: "Button Group Size Example",
    routeTag: "ButtonGroupSizeExample",
    href: "/docs/components/shadcn-button-group/examples/size",
  },
  {
    label: "Button Group Nested Example",
    routeTag: "ButtonGroupNestedExample",
    href: "/docs/components/shadcn-button-group/examples/nested",
  },
  {
    label: "Button Group Separator Example",
    routeTag: "ButtonGroupSeparatorExample",
    href: "/docs/components/shadcn-button-group/examples/separator",
  },
  {
    label: "Button Group Split Example",
    routeTag: "ButtonGroupSplitExample",
    href: "/docs/components/shadcn-button-group/examples/split",
  },
  {
    label: "Button Group Input Example",
    routeTag: "ButtonGroupInputExample",
    href: "/docs/components/shadcn-button-group/examples/input",
  },
  {
    label: "Button Group Input Group Example",
    routeTag: "ButtonGroupInputGroupExample",
    href: "/docs/components/shadcn-button-group/examples/input-group",
  },
  {
    label: "Button Group Select Example",
    routeTag: "ButtonGroupSelectExample",
    href: "/docs/components/shadcn-button-group/examples/select",
  },
  {
    label: "Button Group Popover Example",
    routeTag: "ButtonGroupPopoverExample",
    href: "/docs/components/shadcn-button-group/examples/popover",
  },
  {
    label: "Button Group RTL Example",
    routeTag: "ButtonGroupRtlExample",
    href: "/docs/components/shadcn-button-group/examples/rtl",
  },
  {
    label: "Alert Dialog Docs",
    routeTag: "ShadcnAlertDialogDocs",
    href: "/docs/components/shadcn-alert-dialog",
  },
  {
    label: "Alert Dialog Basic Example",
    routeTag: "AlertDialogBasicExample",
    href: "/docs/components/alert-dialog/examples/basic",
  },
  {
    label: "Drawer Docs",
    routeTag: "ShadcnDrawerDocs",
    href: "/docs/components/shadcn-drawer",
  },
  {
    label: "Drawer Docs",
    routeTag: "BaseUiDrawerDocs",
    href: "/docs/components/base-ui-drawer",
  },
  {
    label: "Drawer Basic Example",
    routeTag: "DrawerBasicExample",
    href: "/docs/components/drawer/examples/basic",
  },
  {
    label: "shadcn Drawer Basic Example",
    routeTag: "ShadcnDrawerBasicExample",
    href: "/docs/components/shadcn-drawer/examples/basic",
  },
  {
    label: "Context Menu Docs",
    routeTag: "ShadcnContextMenuDocs",
    href: "/docs/components/shadcn-context-menu",
  },
  {
    label: "Context Menu Docs",
    routeTag: "BaseUiContextMenuDocs",
    href: "/docs/components/base-ui-context-menu",
  },
  {
    label: "Context Menu Basic Example",
    routeTag: "ContextMenuBasicExample",
    href: "/docs/components/context-menu/examples/basic",
  },
  {
    label: "Menubar Docs",
    routeTag: "ShadcnMenubarDocs",
    href: "/docs/components/shadcn-menubar",
  },
  {
    label: "Menubar Docs",
    routeTag: "BaseUiMenubarDocs",
    href: "/docs/components/base-ui-menubar",
  },
  {
    label: "Menubar Basic Example",
    routeTag: "MenubarBasicExample",
    href: "/docs/components/menubar/examples/basic",
  },
  {
    label: "Navigation Menu Docs",
    routeTag: "ShadcnNavigationMenuDocs",
    href: "/docs/components/shadcn-navigation-menu",
  },
  {
    label: "Navigation Menu Docs",
    routeTag: "BaseUiNavigationMenuDocs",
    href: "/docs/components/base-ui-navigation-menu",
  },
  {
    label: "Navigation Menu Basic Example",
    routeTag: "NavigationMenuBasicExample",
    href: "/docs/components/navigation-menu/examples/basic",
  },
  {
    label: "OTP Field Docs",
    routeTag: "BaseUiOtpFieldDocs",
    href: "/docs/components/base-ui-otp-field",
  },
  {
    label: "OTP Field Basic Example",
    routeTag: "OtpFieldBasicExample",
    href: "/docs/components/otp-field/examples/basic",
  },
  {
    label: "Preview Card Docs",
    routeTag: "BaseUiPreviewCardDocs",
    href: "/docs/components/base-ui-preview-card",
  },
  {
    label: "Preview Card Basic Example",
    routeTag: "PreviewCardBasicExample",
    href: "/docs/components/preview-card/examples/basic",
  },
  {
    label: "Collapsible Docs",
    routeTag: "CollapsibleDocs",
    href: "/docs/components/collapsible",
  },
  {
    label: "Collapsible Docs",
    routeTag: "ShadcnCollapsibleDocs",
    href: "/docs/components/shadcn-collapsible",
  },
  {
    label: "Collapsible Basic Example",
    routeTag: "CollapsibleBasicExample",
    href: "/docs/components/collapsible/examples/basic",
  },
  {
    label: "Field Docs",
    routeTag: "ShadcnFieldDocs",
    href: "/docs/components/shadcn-field",
  },
  {
    label: "Field Docs",
    routeTag: "BaseUiFieldDocs",
    href: "/docs/components/base-ui-field",
  },
  {
    label: "Field Basic Example",
    routeTag: "FieldBasicExample",
    href: "/docs/components/field/examples/basic",
  },
  {
    label: "Number Field Docs",
    routeTag: "BaseUiNumberFieldDocs",
    href: "/docs/components/base-ui-number-field",
  },
  {
    label: "Number Field Basic Example",
    routeTag: "NumberFieldBasicExample",
    href: "/docs/components/number-field/examples/basic",
  },
  {
    label: "Form Docs",
    routeTag: "BaseUiFormDocs",
    href: "/docs/components/base-ui-form",
  },
  {
    label: "Form Basic Example",
    routeTag: "FormBasicExample",
    href: "/docs/components/form/examples/basic",
  },
  {
    label: "Autocomplete Basic Example",
    routeTag: "AutocompleteBasicExample",
    href: "/docs/components/autocomplete/examples/basic",
  },
  { label: "Animation", routeTag: "Animation", href: "/animation" },
  {
    label: "Animation Docs",
    routeTag: "AnimationDocs",
    href: "/docs/components/animation",
  },
  {
    label: "Animation Basic Example",
    routeTag: "AnimationBasicExample",
    href: "/docs/components/animation/examples/basic",
  },
  { label: "Avatar", routeTag: "Avatar", href: "/avatar" },
  {
    label: "Avatar Docs",
    routeTag: "AvatarDocs",
    href: "/docs/components/avatar",
  },
  {
    label: "Avatar Docs",
    routeTag: "ShadcnAvatarDocs",
    href: "/docs/components/shadcn-avatar",
  },
  {
    label: "Avatar Basic Example",
    routeTag: "AvatarBasicExample",
    href: "/docs/components/avatar/examples/basic",
  },
  { label: "Badge", routeTag: "Badge", href: "/badge" },
  {
    label: "Badge Docs",
    routeTag: "BadgeDocs",
    href: "/docs/components/badge",
  },
  {
    label: "Badge Basic Example",
    routeTag: "BadgeBasicExample",
    href: "/docs/components/badge/examples/basic",
  },
  {
    label: "Badge Spinner Example",
    routeTag: "BadgeSpinnerExample",
    href: "/docs/components/badge/examples/spinner",
  },
  {
    label: "Badge With Icon Example",
    routeTag: "BadgeIconExample",
    href: "/docs/components/badge/examples/icon",
  },
  {
    label: "Badge Link Example",
    routeTag: "BadgeLinkExample",
    href: "/docs/components/badge/examples/link",
  },
  {
    label: "Badge Custom Colors Example",
    routeTag: "BadgeCustomColorsExample",
    href: "/docs/components/badge/examples/custom-colors",
  },
  {
    label: "Badge RTL Example",
    routeTag: "BadgeRtlExample",
    href: "/docs/components/badge/examples/rtl",
  },
  {
    label: "Carousel Docs",
    routeTag: "ShadcnCarouselDocs",
    href: "/docs/components/shadcn-carousel",
  },
  {
    label: "Carousel Basic Example",
    routeTag: "CarouselBasicExample",
    href: "/docs/components/shadcn-carousel/examples/basic",
  },
  {
    label: "Carousel Sizes Example",
    routeTag: "CarouselSizesExample",
    href: "/docs/components/shadcn-carousel/examples/sizes",
  },
  {
    label: "Carousel Spacing Example",
    routeTag: "CarouselSpacingExample",
    href: "/docs/components/shadcn-carousel/examples/spacing",
  },
  {
    label: "Carousel Orientation Example",
    routeTag: "CarouselOrientationExample",
    href: "/docs/components/shadcn-carousel/examples/orientation",
  },
  {
    label: "Carousel API Example",
    routeTag: "CarouselApiExample",
    href: "/docs/components/shadcn-carousel/examples/api",
  },
  {
    label: "Carousel Autoplay Example",
    routeTag: "CarouselAutoplayExample",
    href: "/docs/components/shadcn-carousel/examples/autoplay",
  },
  {
    label: "Carousel RTL Example",
    routeTag: "CarouselRtlExample",
    href: "/docs/components/shadcn-carousel/examples/rtl",
  },
  {
    label: "Chart Docs",
    routeTag: "ChartDocs",
    href: "/docs/components/chart",
  },
  {
    label: "Chart Basic Example",
    routeTag: "ChartBasicExample",
    href: "/docs/components/chart/examples/basic",
  },
  {
    label: "Chart Grid Example",
    routeTag: "ChartGridExample",
    href: "/docs/components/chart/examples/grid",
  },
  {
    label: "Chart Axis Example",
    routeTag: "ChartAxisExample",
    href: "/docs/components/chart/examples/axis",
  },
  {
    label: "Chart Tooltip Example",
    routeTag: "ChartTooltipExample",
    href: "/docs/components/chart/examples/tooltip",
  },
  {
    label: "Chart Legend Example",
    routeTag: "ChartLegendExample",
    href: "/docs/components/chart/examples/legend",
  },
  {
    label: "Chart RTL Example",
    routeTag: "ChartRtlExample",
    href: "/docs/components/chart/examples/rtl",
  },
  {
    label: "Command Docs",
    routeTag: "CommandDocs",
    href: "/docs/components/command",
  },
  {
    label: "Command Basic Example",
    routeTag: "CommandBasicExample",
    href: "/docs/components/command/examples/basic",
  },
  {
    label: "Command Groups Example",
    routeTag: "CommandGroupsExample",
    href: "/docs/components/command/examples/groups",
  },
  {
    label: "Command RTL Example",
    routeTag: "CommandRtlExample",
    href: "/docs/components/command/examples/rtl",
  },
  {
    label: "Command Scrollable Example",
    routeTag: "CommandScrollableExample",
    href: "/docs/components/command/examples/scrollable",
  },
  {
    label: "Command Shortcuts Example",
    routeTag: "CommandShortcutsExample",
    href: "/docs/components/command/examples/shortcuts",
  },
  {
    label: "Dropdown Menu Docs",
    routeTag: "DropdownMenuDocs",
    href: "/docs/components/dropdown-menu",
  },
  {
    label: "Dropdown Menu Basic Example",
    routeTag: "DropdownMenuBasicExample",
    href: "/docs/components/dropdown-menu/examples/basic",
  },
  {
    label: "Dropdown Menu Checkboxes Example",
    routeTag: "DropdownMenuCheckboxesExample",
    href: "/docs/components/dropdown-menu/examples/checkboxes",
  },
  {
    label: "Dropdown Menu Complex Example",
    routeTag: "DropdownMenuComplexExample",
    href: "/docs/components/dropdown-menu/examples/complex",
  },
  {
    label: "Dropdown Menu Destructive Example",
    routeTag: "DropdownMenuDestructiveExample",
    href: "/docs/components/dropdown-menu/examples/destructive",
  },
  {
    label: "Dropdown Menu Icons Example",
    routeTag: "DropdownMenuIconsExample",
    href: "/docs/components/dropdown-menu/examples/icons",
  },
  {
    label: "Dropdown Menu Radio Group Example",
    routeTag: "DropdownMenuRadioGroupExample",
    href: "/docs/components/dropdown-menu/examples/radio-group",
  },
  {
    label: "Dropdown Menu RTL Example",
    routeTag: "DropdownMenuRtlExample",
    href: "/docs/components/dropdown-menu/examples/rtl",
  },
  {
    label: "Dropdown Menu Shortcuts Example",
    routeTag: "DropdownMenuShortcutsExample",
    href: "/docs/components/dropdown-menu/examples/shortcuts",
  },
  {
    label: "Dropdown Menu Submenu Example",
    routeTag: "DropdownMenuSubmenuExample",
    href: "/docs/components/dropdown-menu/examples/submenu",
  },
  {
    label: "Hover Card Docs",
    routeTag: "HoverCardDocs",
    href: "/docs/components/hover-card",
  },
  {
    label: "Hover Card Basic Example",
    routeTag: "HoverCardBasicExample",
    href: "/docs/components/hover-card/examples/basic",
  },
  {
    label: "Input OTP Docs",
    routeTag: "InputOtpDocs",
    href: "/docs/components/input-otp",
  },
  {
    label: "Input OTP Basic Example",
    routeTag: "InputOtpBasicExample",
    href: "/docs/components/input-otp/examples/basic",
  },
  {
    label: "Input OTP Pattern Example",
    routeTag: "InputOtpPatternExample",
    href: "/docs/components/input-otp/examples/pattern",
  },
  {
    label: "Input OTP Separator Example",
    routeTag: "InputOtpSeparatorExample",
    href: "/docs/components/input-otp/examples/separator",
  },
  {
    label: "Input OTP Disabled Example",
    routeTag: "InputOtpDisabledExample",
    href: "/docs/components/input-otp/examples/disabled",
  },
  {
    label: "Input OTP Controlled Example",
    routeTag: "InputOtpControlledExample",
    href: "/docs/components/input-otp/examples/controlled",
  },
  {
    label: "Input OTP Invalid Example",
    routeTag: "InputOtpInvalidExample",
    href: "/docs/components/input-otp/examples/invalid",
  },
  {
    label: "Input OTP Four Digits Example",
    routeTag: "InputOtpFourDigitsExample",
    href: "/docs/components/input-otp/examples/four-digits",
  },
  {
    label: "Input OTP Alphanumeric Example",
    routeTag: "InputOtpAlphanumericExample",
    href: "/docs/components/input-otp/examples/alphanumeric",
  },
  {
    label: "Input OTP Form Example",
    routeTag: "InputOtpFormExample",
    href: "/docs/components/input-otp/examples/form",
  },
  {
    label: "Input OTP RTL Example",
    routeTag: "InputOtpRtlExample",
    href: "/docs/components/input-otp/examples/rtl",
  },
  {
    label: "Native Select Docs",
    routeTag: "NativeSelectDocs",
    href: "/docs/components/native-select",
  },
  {
    label: "Native Select Basic Example",
    routeTag: "NativeSelectBasicExample",
    href: "/docs/components/native-select/examples/basic",
  },
  {
    label: "Native Select Groups Example",
    routeTag: "NativeSelectGroupsExample",
    href: "/docs/components/native-select/examples/groups",
  },
  {
    label: "Native Select RTL Example",
    routeTag: "NativeSelectRtlExample",
    href: "/docs/components/native-select/examples/rtl",
  },
  {
    label: "Sheet Docs",
    routeTag: "SheetDocs",
    href: "/docs/components/sheet",
  },
  {
    label: "Sheet Basic Example",
    routeTag: "SheetBasicExample",
    href: "/docs/components/sheet/examples/basic",
  },
  {
    label: "Sonner Docs",
    routeTag: "SonnerDocs",
    href: "/docs/components/sonner",
  },
  {
    label: "Sonner Basic Example",
    routeTag: "SonnerBasicExample",
    href: "/docs/components/sonner/examples/basic",
  },
  {
    label: "Data Table Docs",
    routeTag: "DataTableDocs",
    href: "/docs/components/data-table",
  },
  {
    label: "Data Table Basic Example",
    routeTag: "DataTableBasicExample",
    href: "/docs/components/data-table/examples/basic",
  },
  {
    label: "Data Table Row Actions Example",
    routeTag: "DataTableRowActionsExample",
    href: "/docs/components/data-table/examples/row-actions",
  },
  {
    label: "Data Table Pagination Example",
    routeTag: "DataTablePaginationExample",
    href: "/docs/components/data-table/examples/pagination",
  },
  {
    label: "Data Table Sorting Example",
    routeTag: "DataTableSortingExample",
    href: "/docs/components/data-table/examples/sorting",
  },
  {
    label: "Data Table Filtering Example",
    routeTag: "DataTableFilteringExample",
    href: "/docs/components/data-table/examples/filtering",
  },
  {
    label: "Data Table Visibility Example",
    routeTag: "DataTableVisibilityExample",
    href: "/docs/components/data-table/examples/visibility",
  },
  {
    label: "Data Table Row Selection Example",
    routeTag: "DataTableRowSelectionExample",
    href: "/docs/components/data-table/examples/row-selection",
  },
  { label: "Item Docs", routeTag: "ItemDocs", href: "/docs/components/item" },
  {
    label: "Item Avatar Example",
    routeTag: "ItemAvatarExample",
    href: "/docs/components/item/examples/avatar",
  },
  {
    label: "Item Basic Example",
    routeTag: "ItemBasicExample",
    href: "/docs/components/item/examples/basic",
  },
  {
    label: "Item Group Example",
    routeTag: "ItemGroupExample",
    href: "/docs/components/item/examples/group",
  },
  {
    label: "Item Header Example",
    routeTag: "ItemHeaderExample",
    href: "/docs/components/item/examples/header",
  },
  {
    label: "Item Icon Example",
    routeTag: "ItemIconExample",
    href: "/docs/components/item/examples/icon",
  },
  {
    label: "Item Image Example",
    routeTag: "ItemImageExample",
    href: "/docs/components/item/examples/image",
  },
  {
    label: "Item Link Example",
    routeTag: "ItemLinkExample",
    href: "/docs/components/item/examples/link",
  },
  {
    label: "Item Dropdown Example",
    routeTag: "ItemDropdownExample",
    href: "/docs/components/item/examples/dropdown",
  },
  {
    label: "Item RTL Example",
    routeTag: "ItemRtlExample",
    href: "/docs/components/item/examples/rtl",
  },
  {
    label: "Item Size Example",
    routeTag: "ItemSizeExample",
    href: "/docs/components/item/examples/size",
  },
  {
    label: "Item Variant Example",
    routeTag: "ItemVariantExample",
    href: "/docs/components/item/examples/variant",
  },
  {
    label: "Label Docs",
    routeTag: "LabelDocs",
    href: "/docs/components/label",
  },
  {
    label: "Label Basic Example",
    routeTag: "LabelBasicExample",
    href: "/docs/components/label/examples/basic",
  },
  {
    label: "Pagination Docs",
    routeTag: "PaginationDocs",
    href: "/docs/components/pagination",
  },
  {
    label: "Pagination Basic Example",
    routeTag: "PaginationBasicExample",
    href: "/docs/components/pagination/examples/basic",
  },
  {
    label: "Resizable Docs",
    routeTag: "ResizableDocs",
    href: "/docs/components/resizable",
  },
  {
    label: "Resizable Basic Example",
    routeTag: "ResizableBasicExample",
    href: "/docs/components/resizable/examples/basic",
  },
  {
    label: "Resizable Handle Example",
    routeTag: "ResizableHandleExample",
    href: "/docs/components/resizable/examples/handle",
  },
  {
    label: "Resizable RTL Example",
    routeTag: "ResizableRtlExample",
    href: "/docs/components/resizable/examples/rtl",
  },
  {
    label: "Resizable Vertical Example",
    routeTag: "ResizableVerticalExample",
    href: "/docs/components/resizable/examples/vertical",
  },
  {
    label: "Sidebar Docs",
    routeTag: "SidebarDocs",
    href: "/docs/components/sidebar",
  },
  {
    label: "Sidebar Basic Example",
    routeTag: "SidebarBasicExample",
    href: "/docs/components/sidebar/examples/basic",
  },
  {
    label: "Sidebar Composition Example",
    routeTag: "SidebarCompositionExample",
    href: "/docs/components/sidebar/examples/composition",
  },
  {
    label: "Sidebar Controlled Example",
    routeTag: "SidebarControlledExample",
    href: "/docs/components/sidebar/examples/controlled",
  },
  {
    label: "Sidebar RTL Example",
    routeTag: "SidebarRtlExample",
    href: "/docs/components/sidebar/examples/rtl",
  },
  {
    label: "Sidebar Variants Example",
    routeTag: "SidebarVariantsExample",
    href: "/docs/components/sidebar/examples/variants",
  },
  {
    label: "Table Docs",
    routeTag: "TableDocs",
    href: "/docs/components/table",
  },
  {
    label: "Table Basic Example",
    routeTag: "TableBasicExample",
    href: "/docs/components/table/examples/basic",
  },
  { label: "Card", routeTag: "Card", href: "/card" },
  {
    label: "Card Docs",
    routeTag: "ShadcnCardDocs",
    href: "/docs/components/shadcn-card",
  },
  {
    label: "Card Basic Example",
    routeTag: "CardBasicExample",
    href: "/docs/components/shadcn-card/examples/basic",
  },
  {
    label: "Card Size Example",
    routeTag: "CardSizeExample",
    href: "/docs/components/shadcn-card/examples/size",
  },
  {
    label: "Card Spacing Example",
    routeTag: "CardSpacingExample",
    href: "/docs/components/shadcn-card/examples/spacing",
  },
  {
    label: "Card Image Example",
    routeTag: "CardImageExample",
    href: "/docs/components/shadcn-card/examples/image",
  },
  {
    label: "Card RTL Example",
    routeTag: "CardRtlExample",
    href: "/docs/components/shadcn-card/examples/rtl",
  },
  { label: "Separator", routeTag: "Separator", href: "/separator" },
  {
    label: "Separator Docs",
    routeTag: "ShadcnSeparatorDocs",
    href: "/docs/components/shadcn-separator",
  },
  {
    label: "Separator Docs",
    routeTag: "BaseUiSeparatorDocs",
    href: "/docs/components/base-ui-separator",
  },
  {
    label: "Separator Basic Example",
    routeTag: "SeparatorBasicExample",
    href: "/docs/components/separator/examples/basic",
  },
  { label: "Skeleton", routeTag: "Skeleton", href: "/skeleton" },
  {
    label: "Skeleton Docs",
    routeTag: "SkeletonDocs",
    href: "/docs/components/skeleton",
  },
  {
    label: "Skeleton Basic Example",
    routeTag: "SkeletonBasicExample",
    href: "/docs/components/skeleton/examples/basic",
  },
  { label: "Spinner", routeTag: "Spinner", href: "/spinner" },
  {
    label: "Spinner Docs",
    routeTag: "SpinnerDocs",
    href: "/docs/components/spinner",
  },
  { label: "Kbd", routeTag: "Kbd", href: "/kbd" },
  { label: "Kbd Docs", routeTag: "KbdDocs", href: "/docs/components/kbd" },
  {
    label: "Kbd Basic Example",
    routeTag: "KbdBasicExample",
    href: "/docs/components/kbd/examples/basic",
  },
  {
    label: "Kbd Input Group Example",
    routeTag: "KbdInputGroupExample",
    href: "/docs/components/kbd/examples/input-group",
  },
  { label: "Typography", routeTag: "Typography", href: "/typography" },
  {
    label: "Typography Docs",
    routeTag: "TypographyDocs",
    href: "/docs/components/typography",
  },
  {
    label: "Typography Basic Example",
    routeTag: "TypographyBasicExample",
    href: "/docs/components/typography/examples/basic",
  },
  { label: "Empty", routeTag: "Empty", href: "/empty" },
  {
    label: "Empty Docs",
    routeTag: "EmptyDocs",
    href: "/docs/components/empty",
  },
  {
    label: "Empty Avatar Example",
    routeTag: "EmptyAvatarExample",
    href: "/docs/components/empty/examples/avatar",
  },
  {
    label: "Empty Avatar Group Example",
    routeTag: "EmptyAvatarGroupExample",
    href: "/docs/components/empty/examples/avatar-group",
  },
  {
    label: "Empty Background Example",
    routeTag: "EmptyBackgroundExample",
    href: "/docs/components/empty/examples/background",
  },
  {
    label: "Empty Basic Example",
    routeTag: "EmptyBasicExample",
    href: "/docs/components/empty/examples/basic",
  },
  {
    label: "Empty Input Group Example",
    routeTag: "EmptyInputGroupExample",
    href: "/docs/components/empty/examples/input-group",
  },
  {
    label: "Empty Outline Example",
    routeTag: "EmptyOutlineExample",
    href: "/docs/components/empty/examples/outline",
  },
  {
    label: "Empty RTL Example",
    routeTag: "EmptyRtlExample",
    href: "/docs/components/empty/examples/rtl",
  },
  { label: "Button", routeTag: "Button", href: "/button" },
  {
    label: "Button Docs",
    routeTag: "BaseUiButtonDocs",
    href: "/docs/components/base-ui-button",
  },
  {
    label: "Button Docs",
    routeTag: "ShadcnButtonDocs",
    href: "/docs/components/shadcn-button",
  },
  {
    label: "Base Accordion Docs",
    routeTag: "ShadcnBaseAccordionDocs",
    href: "/docs/components/shadcn-base-accordion",
  },
  {
    label: "Button Basic Example",
    routeTag: "ButtonBasicExample",
    href: "/docs/components/button/examples/basic",
  },
  {
    label: "Base UI Button Basic Example",
    routeTag: "BaseUiButtonBasicExample",
    href: "/docs/components/base-ui-button/examples/basic",
  },
  {
    label: "Button Disabled Example",
    routeTag: "ButtonDisabledExample",
    href: "/docs/components/button/examples/disabled",
  },
  { label: "Input Group", routeTag: "InputGroup", href: "/input-group" },
  {
    label: "Input Group Docs",
    routeTag: "InputGroupDocs",
    href: "/docs/components/input-group",
  },
  {
    label: "Input Group Align Example",
    routeTag: "InputGroupAlignExample",
    href: "/docs/components/input-group/examples/align",
  },
  {
    label: "Input Group Button Example",
    routeTag: "InputGroupButtonExample",
    href: "/docs/components/input-group/examples/button",
  },
  {
    label: "Input Group Custom Input Example",
    routeTag: "InputGroupCustomInputExample",
    href: "/docs/components/input-group/examples/custom-input",
  },
  {
    label: "Input Group Dropdown Example",
    routeTag: "InputGroupDropdownExample",
    href: "/docs/components/input-group/examples/dropdown",
  },
  {
    label: "Input Group Icon Example",
    routeTag: "InputGroupIconExample",
    href: "/docs/components/input-group/examples/icon",
  },
  {
    label: "Input Group RTL Example",
    routeTag: "InputGroupRtlExample",
    href: "/docs/components/input-group/examples/rtl",
  },
  {
    label: "Input Group Spinner Example",
    routeTag: "InputGroupSpinnerExample",
    href: "/docs/components/input-group/examples/spinner",
  },
  {
    label: "Input Group Text Example",
    routeTag: "InputGroupTextExample",
    href: "/docs/components/input-group/examples/text",
  },
  {
    label: "Input Group Textarea Example",
    routeTag: "InputGroupTextareaExample",
    href: "/docs/components/input-group/examples/textarea",
  },
  { label: "Meter", routeTag: "Meter", href: "/meter" },
  {
    label: "Meter Docs",
    routeTag: "BaseUiMeterDocs",
    href: "/docs/components/base-ui-meter",
  },
  {
    label: "Meter Basic Example",
    routeTag: "MeterBasicExample",
    href: "/docs/components/meter/examples/basic",
  },
  {
    label: "Scroll Area",
    routeTag: "ScrollArea",
    href: "/scroll-area",
  },
  {
    label: "Scroll Area Docs",
    routeTag: "ShadcnScrollAreaDocs",
    href: "/docs/components/shadcn-scroll-area",
  },
  {
    label: "Scroll Area Docs",
    routeTag: "BaseUiScrollAreaDocs",
    href: "/docs/components/base-ui-scroll-area",
  },
  {
    label: "Scroll Area Basic Example",
    routeTag: "ScrollAreaBasicExample",
    href: "/docs/components/scroll-area/examples/basic",
  },
  { label: "Toggle", routeTag: "Toggle", href: "/toggle" },
  {
    label: "Toggle Docs",
    routeTag: "BaseUiToggleDocs",
    href: "/docs/components/base-ui-toggle",
  },
  {
    label: "Toggle Basic Example",
    routeTag: "ToggleBasicExample",
    href: "/docs/components/toggle/examples/basic",
  },
  {
    label: "Toggle Group Docs",
    routeTag: "BaseUiToggleGroupDocs",
    href: "/docs/components/base-ui-toggle-group",
  },
  {
    label: "Toggle Group Basic Example",
    routeTag: "ToggleGroupBasicExample",
    href: "/docs/components/toggle-group/examples/basic",
  },
  {
    label: "Radio Docs",
    routeTag: "RadioDocs",
    href: "/docs/components/radio",
  },
  {
    label: "Radio Basic Example",
    routeTag: "RadioBasicExample",
    href: "/docs/components/radio/examples/basic",
  },
  {
    label: "Toolbar Docs",
    routeTag: "BaseUiToolbarDocs",
    href: "/docs/components/base-ui-toolbar",
  },
  {
    label: "Toolbar Basic Example",
    routeTag: "ToolbarBasicExample",
    href: "/docs/components/toolbar/examples/basic",
  },
  { label: "Progress", routeTag: "Progress", href: "/progress" },
  {
    label: "Progress Docs",
    routeTag: "ShadcnProgressDocs",
    href: "/docs/components/shadcn-progress",
  },
  {
    label: "Progress Docs",
    routeTag: "BaseUiProgressDocs",
    href: "/docs/components/base-ui-progress",
  },
  {
    label: "Progress Basic Example",
    routeTag: "ProgressBasicExample",
    href: "/docs/components/progress/examples/basic",
  },
  { label: "Calendar", routeTag: "Calendar", href: "/calendar" },
  {
    label: "Calendar Docs",
    routeTag: "CalendarDocs",
    href: "/docs/components/calendar",
  },
  {
    label: "Calendar Docs",
    routeTag: "ShadcnCalendarDocs",
    href: "/docs/components/shadcn-calendar",
  },
  {
    label: "Calendar Basic Example",
    routeTag: "CalendarBasicExample",
    href: "/docs/components/calendar/examples/basic",
  },
  {
    label: "Calendar Bounds Example",
    routeTag: "CalendarBoundsExample",
    href: "/docs/components/calendar/examples/bounds",
  },
  { label: "Checkbox", routeTag: "Checkbox", href: "/checkbox" },
  {
    label: "Checkbox Docs",
    routeTag: "BaseUiCheckboxDocs",
    href: "/docs/components/base-ui-checkbox",
  },
  {
    label: "Checkbox Docs",
    routeTag: "ShadcnCheckboxDocs",
    href: "/docs/components/shadcn-checkbox",
  },
  {
    label: "Checkbox Basic Example",
    routeTag: "CheckboxBasicExample",
    href: "/docs/components/checkbox/examples/basic",
  },
  {
    label: "Base UI Checkbox Basic Example",
    routeTag: "BaseUiCheckboxBasicExample",
    href: "/docs/components/base-ui-checkbox/examples/basic",
  },
  {
    label: "Checkbox Group Docs",
    routeTag: "CheckboxGroupDocs",
    href: "/docs/components/checkbox-group",
  },
  {
    label: "Checkbox Group Basic Example",
    routeTag: "CheckboxGroupBasicExample",
    href: "/docs/components/checkbox-group/examples/basic",
  },
  {
    label: "Checkbox Indeterminate Example",
    routeTag: "CheckboxIndeterminateExample",
    href: "/docs/components/checkbox/examples/indeterminate",
  },
  { label: "Combobox", routeTag: "Combobox", href: "/combobox" },
  {
    label: "Combobox Docs",
    routeTag: "BaseUiComboboxDocs",
    href: "/docs/components/base-ui-combobox",
  },
  {
    label: "Combobox Docs",
    routeTag: "ShadcnComboboxDocs",
    href: "/docs/components/shadcn-combobox",
  },
  {
    label: "Combobox Basic Example",
    routeTag: "ComboboxBasicExample",
    href: "/docs/components/combobox/examples/basic",
  },
  {
    label: "Combobox Multi Example",
    routeTag: "ComboboxMultiExample",
    href: "/docs/components/combobox/examples/multi",
  },
  { label: "Date Picker", routeTag: "DatePicker", href: "/date-picker" },
  {
    label: "Date Picker Docs",
    routeTag: "DatePickerDocs",
    href: "/docs/components/date-picker",
  },
  {
    label: "Date Picker Docs",
    routeTag: "ShadcnDatePickerDocs",
    href: "/docs/components/shadcn-date-picker",
  },
  {
    label: "Date Picker Basic Example",
    routeTag: "DatePickerBasicExample",
    href: "/docs/components/date-picker/examples/basic",
  },
  {
    label: "Date Picker Bounds Example",
    routeTag: "DatePickerBoundsExample",
    href: "/docs/components/date-picker/examples/bounds",
  },
  { label: "Dialog", routeTag: "Dialog", href: "/dialog" },
  {
    label: "Dialog Docs",
    routeTag: "BaseUiDialogDocs",
    href: "/docs/components/base-ui-dialog",
  },
  {
    label: "Dialog Docs",
    routeTag: "ShadcnDialogDocs",
    href: "/docs/components/shadcn-dialog",
  },
  {
    label: "Dialog Basic Example",
    routeTag: "DialogBasicExample",
    href: "/docs/components/dialog/examples/basic",
  },
  {
    label: "shadcn Dialog Basic Example",
    routeTag: "ShadcnDialogBasicExample",
    href: "/docs/components/shadcn-dialog/examples/basic",
  },
  {
    label: "Dialog Animated Example",
    routeTag: "DialogAnimatedExample",
    href: "/docs/components/dialog/examples/animated",
  },
  {
    label: "Dialog Destructive Example",
    routeTag: "DialogDestructiveExample",
    href: "/docs/components/dialog/examples/destructive",
  },
  {
    label: "Dialog Focus Example",
    routeTag: "DialogFocusExample",
    href: "/docs/components/dialog/examples/focus",
  },
  {
    label: "Dialog Scrollable Example",
    routeTag: "DialogScrollableExample",
    href: "/docs/components/dialog/examples/scrollable",
  },
  { label: "Disclosure", routeTag: "Disclosure", href: "/disclosure" },
  {
    label: "Disclosure Docs",
    routeTag: "DisclosureDocs",
    href: "/docs/components/disclosure",
  },
  {
    label: "Disclosure Basic Example",
    routeTag: "DisclosureBasicExample",
    href: "/docs/components/disclosure/examples/basic",
  },
  {
    label: "Disclosure Disabled Example",
    routeTag: "DisclosureDisabledExample",
    href: "/docs/components/disclosure/examples/disabled",
  },
  {
    label: "Drag and Drop",
    routeTag: "DragAndDrop",
    href: "/drag-and-drop",
  },
  {
    label: "Drag and Drop Docs",
    routeTag: "DragAndDropDocs",
    href: "/docs/components/drag-and-drop",
  },
  {
    label: "Drag and Drop Basic Example",
    routeTag: "DragAndDropBasicExample",
    href: "/docs/components/drag-and-drop/examples/basic",
  },
  {
    label: "Drag and Drop Disabled Example",
    routeTag: "DragAndDropDisabledExample",
    href: "/docs/components/drag-and-drop/examples/disabled",
  },
  { label: "Fieldset", routeTag: "Fieldset", href: "/fieldset" },
  {
    label: "Fieldset Docs",
    routeTag: "BaseUiFieldsetDocs",
    href: "/docs/components/base-ui-fieldset",
  },
  {
    label: "Fieldset Basic Example",
    routeTag: "FieldsetBasicExample",
    href: "/docs/components/fieldset/examples/basic",
  },
  {
    label: "Fieldset Disabled Example",
    routeTag: "FieldsetDisabledExample",
    href: "/docs/components/fieldset/examples/disabled",
  },
  { label: "File Drop", routeTag: "FileDrop", href: "/file-drop" },
  {
    label: "File Drop Docs",
    routeTag: "FileDropDocs",
    href: "/docs/components/file-drop",
  },
  {
    label: "File Drop Basic Example",
    routeTag: "FileDropBasicExample",
    href: "/docs/components/file-drop/examples/basic",
  },
  {
    label: "File Drop Disabled Example",
    routeTag: "FileDropDisabledExample",
    href: "/docs/components/file-drop/examples/disabled",
  },
  { label: "Input", routeTag: "Input", href: "/input" },
  {
    label: "Input Docs",
    routeTag: "BaseUiInputDocs",
    href: "/docs/components/base-ui-input",
  },
  {
    label: "Input Docs",
    routeTag: "ShadcnInputDocs",
    href: "/docs/components/shadcn-input",
  },
  {
    label: "Input Basic Example",
    routeTag: "InputBasicExample",
    href: "/docs/components/input/examples/basic",
  },
  {
    label: "Input Disabled Example",
    routeTag: "InputDisabledExample",
    href: "/docs/components/input/examples/disabled",
  },
  { label: "Listbox", routeTag: "Listbox", href: "/listbox" },
  {
    label: "Listbox Docs",
    routeTag: "ListboxDocs",
    href: "/docs/components/listbox",
  },
  {
    label: "Listbox Basic Example",
    routeTag: "ListboxBasicExample",
    href: "/docs/components/listbox/examples/basic",
  },
  {
    label: "Listbox Animated Example",
    routeTag: "ListboxAnimatedExample",
    href: "/docs/components/listbox/examples/animated",
  },
  { label: "Menu", routeTag: "Menu", href: "/menu" },
  {
    label: "Menu Docs",
    routeTag: "BaseUiMenuDocs",
    href: "/docs/components/base-ui-menu",
  },
  {
    label: "Menu Basic Example",
    routeTag: "MenuBasicExample",
    href: "/docs/components/menu/examples/basic",
  },
  {
    label: "Menu Animated Example",
    routeTag: "MenuAnimatedExample",
    href: "/docs/components/menu/examples/animated",
  },
  { label: "Popover", routeTag: "Popover", href: "/popover" },
  {
    label: "Popover Docs",
    routeTag: "BaseUiPopoverDocs",
    href: "/docs/components/base-ui-popover",
  },
  {
    label: "Popover Docs",
    routeTag: "ShadcnPopoverDocs",
    href: "/docs/components/shadcn-popover",
  },
  {
    label: "Accordion Docs",
    routeTag: "BaseUiAccordionDocs",
    href: "/docs/components/base-ui-accordion",
  },
  {
    label: "Alert Dialog Docs",
    routeTag: "BaseUiAlertDialogDocs",
    href: "/docs/components/base-ui-alert-dialog",
  },
  {
    label: "Autocomplete Docs",
    routeTag: "BaseUiAutocompleteDocs",
    href: "/docs/components/base-ui-autocomplete",
  },
  {
    label: "Popover Basic Example",
    routeTag: "PopoverBasicExample",
    href: "/docs/components/popover/examples/basic",
  },
  {
    label: "Popover Animated Example",
    routeTag: "PopoverAnimatedExample",
    href: "/docs/components/popover/examples/animated",
  },
  { label: "Radio Group", routeTag: "RadioGroup", href: "/radio-group" },
  {
    label: "Radio Group Docs",
    routeTag: "BaseUiRadioDocs",
    href: "/docs/components/base-ui-radio",
  },
  {
    label: "Radio Group Docs",
    routeTag: "ShadcnRadioGroupDocs",
    href: "/docs/components/shadcn-radio-group",
  },
  {
    label: "Radio Group Basic Example",
    routeTag: "RadioGroupBasicExample",
    href: "/docs/components/radio-group/examples/basic",
  },
  {
    label: "Radio Group Horizontal Example",
    routeTag: "RadioGroupHorizontalExample",
    href: "/docs/components/radio-group/examples/horizontal",
  },
  { label: "Select", routeTag: "Select", href: "/select" },
  {
    label: "Select Docs",
    routeTag: "SelectDocs",
    href: "/docs/components/select",
  },
  {
    label: "Select Docs",
    routeTag: "BaseUiSelectDocs",
    href: "/docs/components/base-ui-select",
  },
  {
    label: "Select Docs",
    routeTag: "ShadcnSelectDocs",
    href: "/docs/components/shadcn-select",
  },
  {
    label: "Select Basic Example",
    routeTag: "SelectBasicExample",
    href: "/docs/components/select/examples/basic",
  },
  {
    label: "Select Disabled Example",
    routeTag: "SelectDisabledExample",
    href: "/docs/components/select/examples/disabled",
  },
  { label: "Slider", routeTag: "Slider", href: "/slider" },
  {
    label: "Slider Docs",
    routeTag: "SliderDocs",
    href: "/docs/components/slider",
  },
  {
    label: "Slider Docs",
    routeTag: "BaseUiSliderDocs",
    href: "/docs/components/base-ui-slider",
  },
  {
    label: "Slider Docs",
    routeTag: "ShadcnSliderDocs",
    href: "/docs/components/shadcn-slider",
  },
  {
    label: "Slider Basic Example",
    routeTag: "SliderBasicExample",
    href: "/docs/components/slider/examples/basic",
  },
  {
    label: "Slider Disabled Example",
    routeTag: "SliderDisabledExample",
    href: "/docs/components/slider/examples/disabled",
  },
  { label: "Switch", routeTag: "Switch", href: "/switch" },
  {
    label: "Switch Docs",
    routeTag: "SwitchDocs",
    href: "/docs/components/switch",
  },
  {
    label: "Switch Docs",
    routeTag: "BaseUiSwitchDocs",
    href: "/docs/components/base-ui-switch",
  },
  {
    label: "Switch Docs",
    routeTag: "ShadcnSwitchDocs",
    href: "/docs/components/shadcn-switch",
  },
  {
    label: "Switch Basic Example",
    routeTag: "SwitchBasicExample",
    href: "/docs/components/switch/examples/basic",
  },
  {
    label: "Switch Disabled Example",
    routeTag: "SwitchDisabledExample",
    href: "/docs/components/switch/examples/disabled",
  },
  { label: "Tabs", routeTag: "Tabs", href: "/tabs" },
  { label: "Tabs Docs", routeTag: "TabsDocs", href: "/docs/components/tabs" },
  {
    label: "Tabs Docs",
    routeTag: "BaseUiTabsDocs",
    href: "/docs/components/base-ui-tabs",
  },
  {
    label: "Tabs Docs",
    routeTag: "ShadcnTabsDocs",
    href: "/docs/components/shadcn-tabs",
  },
  {
    label: "Tabs Basic Example",
    routeTag: "TabsBasicExample",
    href: "/docs/components/tabs/examples/basic",
  },
  {
    label: "Tabs Manual Example",
    routeTag: "TabsManualExample",
    href: "/docs/components/tabs/examples/manual",
  },
  { label: "Textarea", routeTag: "Textarea", href: "/textarea" },
  {
    label: "Textarea Docs",
    routeTag: "TextareaDocs",
    href: "/docs/components/textarea",
  },
  {
    label: "Textarea Docs",
    routeTag: "ShadcnTextareaDocs",
    href: "/docs/components/shadcn-textarea",
  },
  {
    label: "Textarea Basic Example",
    routeTag: "TextareaBasicExample",
    href: "/docs/components/textarea/examples/basic",
  },
  {
    label: "Textarea Disabled Example",
    routeTag: "TextareaDisabledExample",
    href: "/docs/components/textarea/examples/disabled",
  },
  { label: "Toast", routeTag: "Toast", href: "/toast" },
  {
    label: "Toast Docs",
    routeTag: "ToastDocs",
    href: "/docs/components/toast",
  },
  {
    label: "Toast Docs",
    routeTag: "BaseUiToastDocs",
    href: "/docs/components/base-ui-toast",
  },
  {
    label: "Toast Docs",
    routeTag: "ShadcnToastDocs",
    href: "/docs/components/shadcn-toast",
  },
  {
    label: "Toast Basic Example",
    routeTag: "ToastBasicExample",
    href: "/docs/components/toast/examples/basic",
  },
  {
    label: "Toast Variants Example",
    routeTag: "ToastVariantsExample",
    href: "/docs/components/toast/examples/variants",
  },
  { label: "Tooltip", routeTag: "Tooltip", href: "/tooltip" },
  {
    label: "Tooltip Docs",
    routeTag: "TooltipDocs",
    href: "/docs/components/tooltip",
  },
  {
    label: "Tooltip Docs",
    routeTag: "BaseUiTooltipDocs",
    href: "/docs/components/base-ui-tooltip",
  },
  {
    label: "Tooltip Basic Example",
    routeTag: "TooltipBasicExample",
    href: "/docs/components/tooltip/examples/basic",
  },
  {
    label: "Tooltip No Delay Example",
    routeTag: "TooltipNoDelayExample",
    href: "/docs/components/tooltip/examples/no-delay",
  },
  {
    label: "Virtual List",
    routeTag: "VirtualList",
    href: "/virtual-list",
  },
  {
    label: "Virtual List Docs",
    routeTag: "VirtualListDocs",
    href: "/docs/components/virtual-list",
  },
  {
    label: "VirtualList Basic Example",
    routeTag: "VirtualListBasicExample",
    href: "/docs/components/virtual-list/examples/basic",
  },
  {
    label: "VirtualList Variable Example",
    routeTag: "VirtualListVariableExample",
    href: "/docs/components/virtual-list/examples/variable",
  },
];

const publicPath = (path: string): string =>
  `${import.meta.env.BASE_URL}${path}`;

const exampleSourceHrefByExampleHref = (): Record<string, string> => ({
  "/docs/components/accordion/examples/basic": "sources/accordion-basic.txt",
  "/docs/components/shadcn-accordion/examples/basic":
    "sources/shadcn-accordion-basic.txt",
  "/docs/components/shadcn-accordion/examples/multiple":
    "sources/shadcn-accordion-multiple.txt",
  "/docs/components/shadcn-accordion/examples/disabled":
    "sources/shadcn-accordion-disabled.txt",
  "/docs/components/shadcn-accordion/examples/borders":
    "sources/shadcn-accordion-borders.txt",
  "/docs/components/shadcn-accordion/examples/card":
    "sources/shadcn-accordion-card.txt",
  "/docs/components/shadcn-accordion/examples/rtl":
    "sources/shadcn-accordion-rtl.txt",
  "/docs/components/accordion/examples/multiple":
    "sources/accordion-multiple.txt",
  "/docs/components/alert/examples/basic": "sources/alert-basic.txt",
  "/docs/components/alert/examples/action": "sources/alert-action.txt",
  "/docs/components/alert/examples/destructive":
    "sources/alert-destructive.txt",
  "/docs/components/alert/examples/custom-colors":
    "sources/alert-custom-colors.txt",
  "/docs/components/alert/examples/rtl": "sources/alert-rtl.txt",
  "/docs/components/aspect-ratio/examples/basic":
    "sources/aspect-ratio-basic.txt",
  "/docs/components/aspect-ratio/examples/square":
    "sources/aspect-ratio-square.txt",
  "/docs/components/aspect-ratio/examples/portrait":
    "sources/aspect-ratio-portrait.txt",
  "/docs/components/aspect-ratio/examples/rtl": "sources/aspect-ratio-rtl.txt",
  "/docs/components/breadcrumb/examples/basic": "sources/breadcrumb-basic.txt",
  "/docs/components/breadcrumb/examples/separator":
    "sources/breadcrumb-separator.txt",
  "/docs/components/breadcrumb/examples/dropdown":
    "sources/breadcrumb-dropdown.txt",
  "/docs/components/breadcrumb/examples/collapsed":
    "sources/breadcrumb-collapsed.txt",
  "/docs/components/breadcrumb/examples/link": "sources/breadcrumb-link.txt",
  "/docs/components/breadcrumb/examples/rtl": "sources/breadcrumb-rtl.txt",
  "/docs/components/shadcn-button-group/examples/basic":
    "sources/button-group-basic.txt",
  "/docs/components/shadcn-button-group/examples/orientation":
    "sources/button-group-orientation.txt",
  "/docs/components/shadcn-button-group/examples/size":
    "sources/button-group-size.txt",
  "/docs/components/shadcn-button-group/examples/nested":
    "sources/button-group-nested.txt",
  "/docs/components/shadcn-button-group/examples/separator":
    "sources/button-group-separator.txt",
  "/docs/components/shadcn-button-group/examples/split":
    "sources/button-group-split.txt",
  "/docs/components/shadcn-button-group/examples/input":
    "sources/button-group-input.txt",
  "/docs/components/shadcn-button-group/examples/input-group":
    "sources/button-group-input-group.txt",
  "/docs/components/shadcn-button-group/examples/select":
    "sources/button-group-select.txt",
  "/docs/components/shadcn-button-group/examples/popover":
    "sources/button-group-popover.txt",
  "/docs/components/shadcn-button-group/examples/rtl":
    "sources/button-group-rtl.txt",
  "/docs/components/chart/examples/basic": "sources/chart-basic.txt",
  "/docs/components/chart/examples/grid": "sources/chart-grid.txt",
  "/docs/components/chart/examples/axis": "sources/chart-axis.txt",
  "/docs/components/chart/examples/tooltip": "sources/chart-tooltip.txt",
  "/docs/components/chart/examples/legend": "sources/chart-legend.txt",
  "/docs/components/chart/examples/rtl": "sources/chart-rtl.txt",
  "/docs/components/command/examples/basic": "sources/command-basic.txt",
  "/docs/components/command/examples/groups": "sources/command-groups.txt",
  "/docs/components/command/examples/rtl": "sources/command-rtl.txt",
  "/docs/components/command/examples/scrollable":
    "sources/command-scrollable.txt",
  "/docs/components/command/examples/shortcuts":
    "sources/command-shortcuts.txt",
  "/docs/components/dropdown-menu/examples/basic":
    "sources/dropdown-menu-basic.txt",
  "/docs/components/dropdown-menu/examples/checkboxes":
    "sources/dropdown-menu-checkboxes.txt",
  "/docs/components/dropdown-menu/examples/complex":
    "sources/dropdown-menu-complex.txt",
  "/docs/components/dropdown-menu/examples/destructive":
    "sources/dropdown-menu-destructive.txt",
  "/docs/components/dropdown-menu/examples/icons":
    "sources/dropdown-menu-icons.txt",
  "/docs/components/dropdown-menu/examples/radio-group":
    "sources/dropdown-menu-radio-group.txt",
  "/docs/components/dropdown-menu/examples/rtl":
    "sources/dropdown-menu-rtl.txt",
  "/docs/components/dropdown-menu/examples/shortcuts":
    "sources/dropdown-menu-shortcuts.txt",
  "/docs/components/dropdown-menu/examples/submenu":
    "sources/dropdown-menu-submenu.txt",
  "/docs/components/hover-card/examples/basic": "sources/hover-card-basic.txt",
  "/docs/components/hover-card/examples/sides": "sources/hover-card-sides.txt",
  "/docs/components/hover-card/examples/rtl": "sources/hover-card-rtl.txt",
  "/docs/components/input-otp/examples/basic": "sources/input-otp-basic.txt",
  "/docs/components/input-otp/examples/pattern":
    "sources/input-otp-pattern.txt",
  "/docs/components/input-otp/examples/separator":
    "sources/input-otp-separator.txt",
  "/docs/components/input-otp/examples/disabled":
    "sources/input-otp-disabled.txt",
  "/docs/components/input-otp/examples/controlled":
    "sources/input-otp-controlled.txt",
  "/docs/components/input-otp/examples/invalid":
    "sources/input-otp-invalid.txt",
  "/docs/components/input-otp/examples/four-digits":
    "sources/input-otp-four-digits.txt",
  "/docs/components/input-otp/examples/alphanumeric":
    "sources/input-otp-alphanumeric.txt",
  "/docs/components/input-otp/examples/form": "sources/input-otp-form.txt",
  "/docs/components/input-otp/examples/rtl": "sources/input-otp-rtl.txt",
  "/docs/components/native-select/examples/basic":
    "sources/native-select-basic.txt",
  "/docs/components/native-select/examples/disabled":
    "sources/native-select-disabled.txt",
  "/docs/components/native-select/examples/groups":
    "sources/native-select-groups.txt",
  "/docs/components/native-select/examples/invalid":
    "sources/native-select-invalid.txt",
  "/docs/components/native-select/examples/rtl": "sources/native-select-rtl.txt",
  "/docs/components/sheet/examples/basic": "sources/sheet-basic.txt",
  "/docs/components/sonner/examples/basic": "sources/sonner-basic.txt",
  "/docs/components/data-table/examples/basic": "sources/data-table-basic.txt",
  "/docs/components/data-table/examples/row-actions":
    "sources/data-table-row-actions.txt",
  "/docs/components/data-table/examples/pagination":
    "sources/data-table-pagination.txt",
  "/docs/components/data-table/examples/sorting":
    "sources/data-table-sorting.txt",
  "/docs/components/data-table/examples/filtering":
    "sources/data-table-filtering.txt",
  "/docs/components/data-table/examples/visibility":
    "sources/data-table-visibility.txt",
  "/docs/components/data-table/examples/row-selection":
    "sources/data-table-row-selection.txt",
  "/docs/components/direction/examples/basic": "sources/direction-basic.txt",
  "/docs/components/alert-dialog/examples/basic":
    "sources/alert-dialog-basic.txt",
  "/docs/components/shadcn-alert-dialog/examples/basic":
    "sources/shadcn-alert-dialog-basic.txt",
  "/docs/components/shadcn-alert-dialog/examples/small":
    "sources/shadcn-alert-dialog-small.txt",
  "/docs/components/shadcn-alert-dialog/examples/media":
    "sources/shadcn-alert-dialog-media.txt",
  "/docs/components/shadcn-alert-dialog/examples/small-media":
    "sources/shadcn-alert-dialog-small-media.txt",
  "/docs/components/shadcn-alert-dialog/examples/destructive":
    "sources/shadcn-alert-dialog-destructive.txt",
  "/docs/components/shadcn-alert-dialog/examples/rtl":
    "sources/shadcn-alert-dialog-rtl.txt",
  "/docs/components/drawer/examples/basic": "sources/drawer-basic.txt",
  "/docs/components/context-menu/examples/basic":
    "sources/context-menu-basic.txt",
  "/docs/components/menubar/examples/basic": "sources/menubar-basic.txt",
  "/docs/components/navigation-menu/examples/basic":
    "sources/navigation-menu-basic.txt",
  "/docs/components/otp-field/examples/basic": "sources/otp-field-basic.txt",
  "/docs/components/preview-card/examples/basic":
    "sources/preview-card-basic.txt",
  "/docs/components/collapsible/examples/basic":
    "sources/collapsible-basic.txt",
  "/docs/components/field/examples/basic": "sources/field-basic.txt",
  "/docs/components/number-field/examples/basic":
    "sources/number-field-basic.txt",
  "/docs/components/form/examples/basic": "sources/form-basic.txt",
  "/docs/components/base-ui-form/examples/basic":
    "sources/base-ui-form-basic.txt",
  "/docs/components/base-ui-form/examples/schema-validation":
    "sources/base-ui-form-schema-validation.txt",
  "/docs/components/base-ui-form/examples/server-function":
    "sources/base-ui-form-server-function.txt",
  "/docs/components/autocomplete/examples/basic":
    "sources/autocomplete-basic.txt",
  "/docs/components/animation/examples/basic": "sources/animation-basic.txt",
  "/docs/components/avatar/examples/basic": "sources/avatar-basic.txt",
  "/docs/components/shadcn-avatar/examples/basic":
    "sources/shadcn-avatar-basic.txt",
  "/docs/components/shadcn-avatar/examples/badge":
    "sources/shadcn-avatar-badge.txt",
  "/docs/components/shadcn-avatar/examples/badge-icon":
    "sources/shadcn-avatar-badge-icon.txt",
  "/docs/components/shadcn-avatar/examples/group":
    "sources/shadcn-avatar-group.txt",
  "/docs/components/shadcn-avatar/examples/group-count":
    "sources/shadcn-avatar-group-count.txt",
  "/docs/components/shadcn-avatar/examples/group-icon":
    "sources/shadcn-avatar-group-icon.txt",
  "/docs/components/shadcn-avatar/examples/sizes":
    "sources/shadcn-avatar-sizes.txt",
  "/docs/components/shadcn-avatar/examples/dropdown":
    "sources/shadcn-avatar-dropdown.txt",
  "/docs/components/badge/examples/basic": "sources/badge-basic.txt",
  "/docs/components/badge/examples/spinner": "sources/badge-spinner.txt",
  "/docs/components/badge/examples/icon": "sources/badge-icon.txt",
  "/docs/components/badge/examples/link": "sources/badge-link.txt",
  "/docs/components/badge/examples/custom-colors":
    "sources/badge-custom-colors.txt",
  "/docs/components/badge/examples/rtl": "sources/badge-rtl.txt",
  "/docs/components/shadcn-carousel/examples/basic":
    "sources/carousel-basic.txt",
  "/docs/components/shadcn-carousel/examples/sizes":
    "sources/carousel-sizes.txt",
  "/docs/components/shadcn-carousel/examples/spacing":
    "sources/carousel-spacing.txt",
  "/docs/components/shadcn-carousel/examples/orientation":
    "sources/carousel-orientation.txt",
  "/docs/components/shadcn-carousel/examples/api": "sources/carousel-api.txt",
  "/docs/components/shadcn-carousel/examples/autoplay":
    "sources/carousel-autoplay.txt",
  "/docs/components/shadcn-carousel/examples/rtl": "sources/carousel-rtl.txt",
  "/docs/components/item/examples/avatar": "sources/item-avatar.txt",
  "/docs/components/item/examples/basic": "sources/item-basic.txt",
  "/docs/components/item/examples/group": "sources/item-group.txt",
  "/docs/components/item/examples/header": "sources/item-header.txt",
  "/docs/components/item/examples/icon": "sources/item-icon.txt",
  "/docs/components/item/examples/image": "sources/item-image.txt",
  "/docs/components/item/examples/link": "sources/item-link.txt",
  "/docs/components/item/examples/rtl": "sources/item-rtl.txt",
  "/docs/components/item/examples/size": "sources/item-size.txt",
  "/docs/components/item/examples/variant": "sources/item-variant.txt",
  "/docs/components/label/examples/basic": "sources/label-basic.txt",
  "/docs/components/label/examples/field": "sources/label-field.txt",
  "/docs/components/label/examples/rtl": "sources/label-rtl.txt",
  "/docs/components/pagination/examples/basic": "sources/pagination-basic.txt",
  "/docs/components/pagination/examples/simple":
    "sources/pagination-simple.txt",
  "/docs/components/pagination/examples/icons-only":
    "sources/pagination-icons-only.txt",
  "/docs/components/pagination/examples/rtl": "sources/pagination-rtl.txt",
  "/docs/components/resizable/examples/basic": "sources/resizable-basic.txt",
  "/docs/components/resizable/examples/handle": "sources/resizable-handle.txt",
  "/docs/components/resizable/examples/rtl": "sources/resizable-rtl.txt",
  "/docs/components/resizable/examples/vertical":
    "sources/resizable-vertical.txt",
  "/docs/components/sidebar/examples/basic": "sources/sidebar-basic.txt",
  "/docs/components/sidebar/examples/composition":
    "sources/sidebar-composition.txt",
  "/docs/components/sidebar/examples/controlled":
    "sources/sidebar-controlled.txt",
  "/docs/components/sidebar/examples/rtl": "sources/sidebar-rtl.txt",
  "/docs/components/sidebar/examples/variants": "sources/sidebar-variants.txt",
  "/docs/components/table/examples/basic": "sources/table-basic.txt",
  "/docs/components/shadcn-card/examples/basic": "sources/card-basic.txt",
  "/docs/components/shadcn-card/examples/size": "sources/card-size.txt",
  "/docs/components/shadcn-card/examples/spacing": "sources/card-spacing.txt",
  "/docs/components/shadcn-card/examples/image": "sources/card-image.txt",
  "/docs/components/shadcn-card/examples/rtl": "sources/card-rtl.txt",
  "/docs/components/separator/examples/basic": "sources/separator-basic.txt",
  "/docs/components/skeleton/examples/basic": "sources/skeleton-basic.txt",
  "/docs/components/spinner/examples/basic": "sources/spinner-basic.txt",
  "/docs/components/kbd/examples/basic": "sources/kbd-basic.txt",
  "/docs/components/kbd/examples/input-group": "sources/kbd-input-group.txt",
  "/docs/components/kbd/examples/rtl": "sources/kbd-rtl.txt",
  "/docs/components/typography/examples/basic": "sources/typography-basic.txt",
  "/docs/components/empty/examples/avatar": "sources/empty-avatar.txt",
  "/docs/components/empty/examples/avatar-group":
    "sources/empty-avatar-group.txt",
  "/docs/components/empty/examples/background": "sources/empty-background.txt",
  "/docs/components/empty/examples/basic": "sources/empty-basic.txt",
  "/docs/components/empty/examples/input-group":
    "sources/empty-input-group.txt",
  "/docs/components/empty/examples/outline": "sources/empty-outline.txt",
  "/docs/components/empty/examples/rtl": "sources/empty-rtl.txt",
  "/docs/components/input-group/examples/align":
    "sources/input-group-align.txt",
  "/docs/components/input-group/examples/button":
    "sources/input-group-button.txt",
  "/docs/components/input-group/examples/custom-input":
    "sources/input-group-custom-input.txt",
  "/docs/components/input-group/examples/dropdown":
    "sources/input-group-dropdown.txt",
  "/docs/components/input-group/examples/icon": "sources/input-group-icon.txt",
  "/docs/components/input-group/examples/rtl": "sources/input-group-rtl.txt",
  "/docs/components/input-group/examples/spinner":
    "sources/input-group-spinner.txt",
  "/docs/components/input-group/examples/text": "sources/input-group-text.txt",
  "/docs/components/input-group/examples/textarea":
    "sources/input-group-textarea.txt",
  "/docs/components/button/examples/basic": "sources/button-basic.txt",
  "/docs/components/shadcn-button/examples/basic":
    "sources/shadcn-button-basic.txt",
  "/docs/components/shadcn-button/examples/size":
    "sources/shadcn-button-size.txt",
  "/docs/components/shadcn-button/examples/default":
    "sources/shadcn-button-default.txt",
  "/docs/components/shadcn-button/examples/outline":
    "sources/shadcn-button-outline.txt",
  "/docs/components/shadcn-button/examples/secondary":
    "sources/shadcn-button-secondary.txt",
  "/docs/components/shadcn-button/examples/ghost":
    "sources/shadcn-button-ghost.txt",
  "/docs/components/shadcn-button/examples/destructive":
    "sources/shadcn-button-destructive.txt",
  "/docs/components/shadcn-button/examples/link":
    "sources/shadcn-button-link.txt",
  "/docs/components/shadcn-button/examples/icon":
    "sources/shadcn-button-icon.txt",
  "/docs/components/shadcn-button/examples/with-icon":
    "sources/shadcn-button-with-icon.txt",
  "/docs/components/shadcn-button/examples/rounded":
    "sources/shadcn-button-rounded.txt",
  "/docs/components/shadcn-button/examples/spinner":
    "sources/shadcn-button-spinner.txt",
  "/docs/components/shadcn-button/examples/button-group":
    "sources/shadcn-button-button-group.txt",
  "/docs/components/shadcn-button/examples/as-child":
    "sources/shadcn-button-as-child.txt",
  "/docs/components/shadcn-button/examples/rtl":
    "sources/shadcn-button-rtl.txt",
  "/docs/components/shadcn-base-accordion/examples/basic":
    "sources/shadcn-base-accordion-basic.txt",
  "/docs/components/button/examples/disabled": "sources/button-disabled.txt",
  "/docs/components/meter/examples/basic": "sources/meter-basic.txt",
  "/docs/components/scroll-area/examples/basic":
    "sources/scroll-area-basic.txt",
  "/docs/components/base-ui-scroll-area/examples/basic":
    "sources/base-ui-scroll-area-basic.txt",
  "/docs/components/toggle/examples/basic": "sources/toggle-basic.txt",
  "/docs/components/toggle-group/examples/basic":
    "sources/toggle-group-basic.txt",
  "/docs/components/radio/examples/basic": "sources/radio-basic.txt",
  "/docs/components/toolbar/examples/basic": "sources/toolbar-basic.txt",
  "/docs/components/calendar/examples/basic": "sources/calendar-basic.txt",
  "/docs/components/shadcn-calendar/examples/basic":
    "sources/shadcn-calendar-basic.txt",
  "/docs/components/shadcn-calendar/examples/month-year-selector":
    "sources/shadcn-calendar-month-year-selector.txt",
  "/docs/components/shadcn-calendar/examples/range":
    "sources/shadcn-calendar-range.txt",
  "/docs/components/shadcn-calendar/examples/date-of-birth":
    "sources/shadcn-calendar-date-of-birth.txt",
  "/docs/components/shadcn-calendar/examples/date-time-picker":
    "sources/shadcn-calendar-date-time-picker.txt",
  "/docs/components/shadcn-calendar/examples/presets":
    "sources/shadcn-calendar-presets.txt",
  "/docs/components/shadcn-calendar/examples/booked-dates":
    "sources/shadcn-calendar-booked.txt",
  "/docs/components/shadcn-calendar/examples/custom-cell-size":
    "sources/shadcn-calendar-custom-cell-size.txt",
  "/docs/components/shadcn-calendar/examples/week-numbers":
    "sources/shadcn-calendar-week-numbers.txt",
  "/docs/components/shadcn-calendar/examples/rtl":
    "sources/shadcn-calendar-rtl.txt",
  "/docs/components/shadcn-toast/examples/basic":
    "sources/shadcn-toast-basic.txt",
  "/docs/components/shadcn-toggle/examples/basic":
    "sources/shadcn-toggle-basic.txt",
  "/docs/components/shadcn-toggle-group/examples/basic":
    "sources/shadcn-toggle-group-basic.txt",
  "/docs/components/shadcn-tooltip/examples/basic":
    "sources/shadcn-tooltip-basic.txt",
  "/docs/components/shadcn-textarea/examples/basic":
    "sources/shadcn-textarea-basic.txt",
  "/docs/components/shadcn-textarea/examples/field":
    "sources/shadcn-textarea-field.txt",
  "/docs/components/shadcn-textarea/examples/disabled":
    "sources/shadcn-textarea-disabled.txt",
  "/docs/components/shadcn-textarea/examples/invalid":
    "sources/shadcn-textarea-invalid.txt",
  "/docs/components/shadcn-textarea/examples/button":
    "sources/shadcn-textarea-button.txt",
  "/docs/components/shadcn-textarea/examples/rtl":
    "sources/shadcn-textarea-rtl.txt",
  "/docs/components/shadcn-separator/examples/basic":
    "sources/shadcn-separator-basic.txt",
  "/docs/components/shadcn-scroll-area/examples/basic":
    "sources/shadcn-scroll-area-basic.txt",
  "/docs/components/shadcn-progress/examples/basic":
    "sources/shadcn-progress-basic.txt",
  "/docs/components/shadcn-popover/examples/basic":
    "sources/shadcn-popover-basic.txt",
  "/docs/components/shadcn-navigation-menu/examples/basic":
    "sources/shadcn-navigation-menu-basic.txt",
  "/docs/components/shadcn-menubar/examples/basic":
    "sources/shadcn-menubar-basic.txt",
  "/docs/components/shadcn-input/examples/basic":
    "sources/shadcn-input-basic.txt",
  "/docs/components/shadcn-input/examples/demo":
    "sources/shadcn-input-demo.txt",
  "/docs/components/shadcn-input/examples/field":
    "sources/shadcn-input-field.txt",
  "/docs/components/shadcn-input/examples/field-group":
    "sources/shadcn-input-field-group.txt",
  "/docs/components/shadcn-input/examples/inline":
    "sources/shadcn-input-inline.txt",
  "/docs/components/shadcn-input/examples/grid":
    "sources/shadcn-input-grid.txt",
  "/docs/components/shadcn-input/examples/required":
    "sources/shadcn-input-required.txt",
  "/docs/components/shadcn-input/examples/badge":
    "sources/shadcn-input-badge.txt",
  "/docs/components/shadcn-input/examples/input-group":
    "sources/shadcn-input-input-group.txt",
  "/docs/components/shadcn-input/examples/button-group":
    "sources/shadcn-input-button-group.txt",
  "/docs/components/shadcn-input/examples/form":
    "sources/shadcn-input-form.txt",
  "/docs/components/shadcn-input/examples/disabled":
    "sources/shadcn-input-disabled.txt",
  "/docs/components/shadcn-input/examples/invalid":
    "sources/shadcn-input-invalid.txt",
  "/docs/components/shadcn-input/examples/file":
    "sources/shadcn-input-file.txt",
  "/docs/components/shadcn-input/examples/rtl": "sources/shadcn-input-rtl.txt",
  "/docs/components/shadcn-field/examples/basic":
    "sources/shadcn-field-basic.txt",
  "/docs/components/shadcn-drawer/examples/basic":
    "sources/shadcn-drawer-basic.txt",
  "/docs/components/shadcn-drawer/examples/scrollable-content":
    "sources/shadcn-drawer-scrollable-content.txt",
  "/docs/components/shadcn-drawer/examples/responsive-dialog":
    "sources/shadcn-drawer-responsive-dialog.txt",
  "/docs/components/shadcn-drawer/examples/rtl":
    "sources/shadcn-drawer-rtl.txt",
  "/docs/components/shadcn-drawer/examples/sides":
    "sources/shadcn-drawer-sides.txt",
  "/docs/components/shadcn-dialog/examples/basic":
    "sources/shadcn-dialog-basic.txt",
  "/docs/components/shadcn-dialog/examples/custom-close-button":
    "sources/shadcn-dialog-custom-close-button.txt",
  "/docs/components/shadcn-dialog/examples/no-close-button":
    "sources/shadcn-dialog-no-close-button.txt",
  "/docs/components/shadcn-dialog/examples/sticky-footer":
    "sources/shadcn-dialog-sticky-footer.txt",
  "/docs/components/shadcn-dialog/examples/scrollable-content":
    "sources/shadcn-dialog-scrollable-content.txt",
  "/docs/components/shadcn-dialog/examples/rtl":
    "sources/shadcn-dialog-rtl.txt",
  "/docs/components/shadcn-date-picker/examples/basic":
    "sources/shadcn-date-picker-basic.txt",
  "/docs/components/shadcn-context-menu/examples/basic":
    "sources/shadcn-context-menu-basic.txt",
  "/docs/components/shadcn-combobox/examples/basic":
    "sources/shadcn-combobox-basic.txt",
  "/docs/components/shadcn-collapsible/examples/basic":
    "sources/shadcn-collapsible-basic.txt",
  "/docs/components/shadcn-checkbox/examples/basic":
    "sources/shadcn-checkbox-basic.txt",
  "/docs/components/shadcn-checkbox/examples/checked-state":
    "sources/shadcn-checkbox-checked-state.txt",
  "/docs/components/shadcn-checkbox/examples/description":
    "sources/shadcn-checkbox-description.txt",
  "/docs/components/shadcn-checkbox/examples/disabled":
    "sources/shadcn-checkbox-disabled.txt",
  "/docs/components/shadcn-checkbox/examples/group":
    "sources/shadcn-checkbox-group.txt",
  "/docs/components/shadcn-checkbox/examples/invalid":
    "sources/shadcn-checkbox-invalid.txt",
  "/docs/components/shadcn-checkbox/examples/rtl":
    "sources/shadcn-checkbox-rtl.txt",
  "/docs/components/shadcn-checkbox/examples/table":
    "sources/shadcn-checkbox-table.txt",
  "/docs/components/calendar/examples/bounds": "sources/calendar-bounds.txt",
  "/docs/components/checkbox/examples/basic": "sources/checkbox-basic.txt",
  "/docs/components/checkbox-group/examples/basic":
    "sources/checkbox-group-basic.txt",
  "/docs/components/checkbox/examples/indeterminate":
    "sources/checkbox-indeterminate.txt",
  "/docs/components/combobox/examples/basic": "sources/combobox-basic.txt",
  "/docs/components/combobox/examples/multi": "sources/combobox-multi.txt",
  "/docs/components/date-picker/examples/basic":
    "sources/date-picker-basic.txt",
  "/docs/components/date-picker/examples/bounds":
    "sources/date-picker-bounds.txt",
  "/docs/components/dialog/examples/animated": "sources/dialog-animated.txt",
  "/docs/components/dialog/examples/basic": "sources/dialog-basic.txt",
  "/docs/components/dialog/examples/destructive":
    "sources/dialog-destructive.txt",
  "/docs/components/dialog/examples/focus": "sources/dialog-focus.txt",
  "/docs/components/dialog/examples/scrollable":
    "sources/dialog-scrollable.txt",
  "/docs/components/disclosure/examples/basic": "sources/disclosure-basic.txt",
  "/docs/components/disclosure/examples/disabled":
    "sources/disclosure-disabled.txt",
  "/docs/components/drag-and-drop/examples/basic":
    "sources/drag-and-drop-basic.txt",
  "/docs/components/drag-and-drop/examples/disabled":
    "sources/drag-and-drop-disabled.txt",
  "/docs/components/fieldset/examples/basic": "sources/fieldset-basic.txt",
  "/docs/components/fieldset/examples/disabled":
    "sources/fieldset-disabled.txt",
  "/docs/components/file-drop/examples/basic": "sources/file-drop-basic.txt",
  "/docs/components/file-drop/examples/disabled":
    "sources/file-drop-disabled.txt",
  "/docs/components/input/examples/basic": "sources/input-basic.txt",
  "/docs/components/input/examples/disabled": "sources/input-disabled.txt",
  "/docs/components/progress/examples/basic": "sources/progress-basic.txt",
  "/docs/components/listbox/examples/animated": "sources/listbox-animated.txt",
  "/docs/components/listbox/examples/basic": "sources/listbox-basic.txt",
  "/docs/components/menu/examples/animated": "sources/menu-animated.txt",
  "/docs/components/menu/examples/basic": "sources/menu-basic.txt",
  "/docs/components/popover/examples/animated": "sources/popover-animated.txt",
  "/docs/components/popover/examples/basic": "sources/popover-basic.txt",
  "/docs/components/radio-group/examples/basic":
    "sources/radio-group-basic.txt",
  "/docs/components/shadcn-radio-group/examples/basic":
    "sources/shadcn-radio-group-basic.txt",
  "/docs/components/shadcn-radio-group/examples/description":
    "sources/shadcn-radio-group-description.txt",
  "/docs/components/shadcn-radio-group/examples/choice-card":
    "sources/shadcn-radio-group-choice-card.txt",
  "/docs/components/shadcn-radio-group/examples/fieldset":
    "sources/shadcn-radio-group-fieldset.txt",
  "/docs/components/shadcn-radio-group/examples/disabled":
    "sources/shadcn-radio-group-disabled.txt",
  "/docs/components/shadcn-radio-group/examples/invalid":
    "sources/shadcn-radio-group-invalid.txt",
  "/docs/components/shadcn-radio-group/examples/rtl":
    "sources/shadcn-radio-group-rtl.txt",
  "/docs/components/radio-group/examples/horizontal":
    "sources/radio-group-horizontal.txt",
  "/docs/components/select/examples/basic": "sources/select-basic.txt",
  "/docs/components/shadcn-select/examples/basic":
    "sources/shadcn-select-basic.txt",
  "/docs/components/select/examples/disabled": "sources/select-disabled.txt",
  "/docs/components/slider/examples/basic": "sources/slider-basic.txt",
  "/docs/components/shadcn-slider/examples/basic":
    "sources/shadcn-slider-basic.txt",
  "/docs/components/slider/examples/disabled": "sources/slider-disabled.txt",
  "/docs/components/switch/examples/basic": "sources/switch-basic.txt",
  "/docs/components/shadcn-switch/examples/basic":
    "sources/shadcn-switch-basic.txt",
  "/docs/components/switch/examples/disabled": "sources/switch-disabled.txt",
  "/docs/components/tabs/examples/basic": "sources/tabs-basic.txt",
  "/docs/components/shadcn-tabs/examples/basic":
    "sources/shadcn-tabs-basic.txt",
  "/docs/components/tabs/examples/manual": "sources/tabs-manual.txt",
  "/docs/components/textarea/examples/basic": "sources/textarea-basic.txt",
  "/docs/components/textarea/examples/disabled":
    "sources/textarea-disabled.txt",
  "/docs/components/toast/examples/basic": "sources/toast-basic.txt",
  "/docs/components/toast/examples/variants": "sources/toast-variants.txt",
  "/docs/components/tooltip/examples/basic": "sources/tooltip-basic.txt",
  "/docs/components/tooltip/examples/no-delay": "sources/tooltip-no-delay.txt",
  "/docs/components/virtual-list/examples/basic":
    "sources/virtual-list-basic.txt",
  "/docs/components/virtual-list/examples/variable":
    "sources/virtual-list-variable.txt",
});

const docsNavItemLibrary = (navItem: NavItem): ComponentLibrary =>
  [
    "ShadcnButtonGroupDocs",
    "ShadcnCarouselDocs",
    "ChartDocs",
    "CommandDocs",
    "DropdownMenuDocs",
    "HoverCardDocs",
    "InputOtpDocs",
    "NativeSelectDocs",
    "SheetDocs",
    "SonnerDocs",
    "DataTableDocs",
    "DirectionDocs",
    "ItemDocs",
    "LabelDocs",
    "PaginationDocs",
    "ResizableDocs",
    "SidebarDocs",
    "TableDocs",
    "BadgeDocs",
    "ShadcnCardDocs",
    "SkeletonDocs",
    "SpinnerDocs",
    "KbdDocs",
    "TypographyDocs",
    "EmptyDocs",
    "InputGroupDocs",
    "ShadcnBaseAccordionDocs",
    "ShadcnButtonDocs",
    "ShadcnCheckboxDocs",
    "ShadcnInputDocs",
    "ShadcnAccordionDocs",
    "ShadcnAlertDocs",
    "ShadcnAlertDialogDocs",
    "ShadcnAspectRatioDocs",
    "ShadcnAvatarDocs",
    "ShadcnBreadcrumbDocs",
    "ShadcnCalendarDocs",
    "ShadcnCollapsibleDocs",
    "ShadcnComboboxDocs",
    "ShadcnContextMenuDocs",
    "ShadcnDatePickerDocs",
    "ShadcnDialogDocs",
    "ShadcnDrawerDocs",
    "ShadcnFieldDocs",
    "ShadcnMenubarDocs",
    "ShadcnNavigationMenuDocs",
    "ShadcnPopoverDocs",
    "ShadcnProgressDocs",
    "ShadcnRadioGroupDocs",
    "ShadcnScrollAreaDocs",
    "ShadcnSelectDocs",
    "ShadcnSeparatorDocs",
    "ShadcnSliderDocs",
    "ShadcnSwitchDocs",
    "ShadcnTabsDocs",
    "ShadcnTextareaDocs",
    "ShadcnToggleDocs",
    "ShadcnToggleGroupDocs",
    "ShadcnTooltipDocs",
    "ShadcnToastDocs",
  ].includes(navItem.routeTag)
    ? "shadcn"
    : [
          "AccordionDocs",
          "AlertDialogDocs",
          "DrawerDocs",
          "ContextMenuDocs",
          "MenubarDocs",
          "NavigationMenuDocs",
          "OtpFieldDocs",
          "PreviewCardDocs",
          "CollapsibleDocs",
          "FieldDocs",
          "NumberFieldDocs",
          "FormDocs",
          "AutocompleteDocs",
          "AvatarDocs",
          "MeterDocs",
          "ProgressDocs",
          "ScrollAreaDocs",
          "SeparatorDocs",
          "ToggleDocs",
          "ToggleGroupDocs",
          "RadioDocs",
          "ToolbarDocs",
          "CheckboxGroupDocs",
          "BaseUiAccordionDocs",
          "BaseUiAlertDialogDocs",
          "BaseUiAutocompleteDocs",
          "BaseUiAvatarDocs",
          "BaseUiButtonDocs",
          "BaseUiCheckboxDocs",
          "BaseUiCheckboxGroupDocs",
          "BaseUiCollapsibleDocs",
          "BaseUiComboboxDocs",
          "BaseUiContextMenuDocs",
          "BaseUiDialogDocs",
          "BaseUiDrawerDocs",
          "BaseUiFieldDocs",
          "BaseUiFieldsetDocs",
          "BaseUiFormDocs",
          "BaseUiInputDocs",
          "BaseUiMenubarDocs",
          "BaseUiMeterDocs",
          "BaseUiMenuDocs",
          "BaseUiNavigationMenuDocs",
          "BaseUiNumberFieldDocs",
          "BaseUiOtpFieldDocs",
          "BaseUiPopoverDocs",
          "BaseUiPreviewCardDocs",
          "BaseUiProgressDocs",
          "BaseUiRadioDocs",
          "BaseUiScrollAreaDocs",
          "BaseUiSeparatorDocs",
          "BaseUiSelectDocs",
          "BaseUiSliderDocs",
          "BaseUiSwitchDocs",
          "BaseUiTabsDocs",
          "BaseUiToggleDocs",
          "BaseUiToggleGroupDocs",
          "BaseUiToastDocs",
          "BaseUiTooltipDocs",
          "BaseUiToolbarDocs",
        ].includes(navItem.routeTag)
      ? "Base UI"
      : "Foldkit";

const docsNavItemActiveRouteTags = (navItem: NavItem): readonly string[] => {
  const docsHref = navItem.href.replace(/\/$/u, "");
  const componentSlug = docsHref.split("/").at(-1) ?? "";
  const standaloneExamplePrefix = `/examples/${componentSlug}-`;

  return NAV_ITEMS.filter(
    (item) =>
      item.href === docsHref ||
      item.href.startsWith(`${docsHref}/`) ||
      item.href.startsWith(standaloneExamplePrefix)
  ).map((item) => item.routeTag);
};

const DOCS_NAV_ITEMS = NAV_ITEMS.filter((navItem) =>
  navItem.routeTag.endsWith("Docs")
).map((navItem) => ({
  ...navItem,
  label: navItem.label.replace(/ Docs$/u, ""),
  library: docsNavItemLibrary(navItem),
  componentRoutePrefix: navItem.routeTag.replace(/Docs$/u, ""),
  activeRouteTags: docsNavItemActiveRouteTags(navItem),
  availability: "available",
})) satisfies readonly DocsNavItem[];

const labelFromComponentSlug = (slug: string): string =>
  slug
    .split("-")
    .map((part) =>
      part.length === 0
        ? part
        : `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`
    )
    .join(" ");

const missingBaseUiLaneSlugs: readonly string[] = [];

const missingShadcnLaneSlugs: readonly string[] = [];

const comingSoonDocsNavItems = (
  library: ComponentLibrary,
  slugs: readonly string[]
): readonly DocsNavItem[] =>
  slugs.map((slug) => {
    const prefixedSlug =
      library === "Base UI" ? `base-ui-${slug}` : `shadcn-${slug}`;
    const routePrefix = `${prefixedSlug
      .split("-")
      .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
      .join("")}Docs`;

    return {
      label: labelFromComponentSlug(slug),
      routeTag: routePrefix,
      href: `/docs/components/${prefixedSlug}`,
      library,
      componentRoutePrefix: routePrefix,
      activeRouteTags: [],
      availability: "coming-soon",
    };
  });

const docsNavItemsWithComingSoon = (
  library: ComponentLibrary,
  comingSoonItems: readonly DocsNavItem[]
): readonly DocsNavItem[] => {
  const availableItems = DOCS_NAV_ITEMS.filter(
    (navItem) => navItem.library === library
  );
  const availableLabels = new Set(availableItems.map((item) => item.label));

  return [
    ...availableItems,
    ...comingSoonItems.filter((item) => !availableLabels.has(item.label)),
  ];
};

const compareDocsNavItems = (left: DocsNavItem, right: DocsNavItem): number =>
  left.label.localeCompare(right.label);

const sortedDocsNavItems = (
  items: readonly DocsNavItem[]
): readonly DocsNavItem[] => {
  const sortedItems = [...items];
  sortedItems.sort(compareDocsNavItems);
  return sortedItems;
};

const DOCS_NAV_GROUPS: readonly DocsNavGroup[] = [
  {
    library: "Foldkit",
    items: sortedDocsNavItems(
      DOCS_NAV_ITEMS.filter((navItem) => navItem.library === "Foldkit")
    ),
  },
  {
    library: "Base UI",
    items: sortedDocsNavItems(
      docsNavItemsWithComingSoon(
        "Base UI",
        comingSoonDocsNavItems("Base UI", missingBaseUiLaneSlugs)
      )
    ),
  },
  {
    library: "shadcn",
    items: sortedDocsNavItems(
      docsNavItemsWithComingSoon(
        "shadcn",
        comingSoonDocsNavItems("shadcn", missingShadcnLaneSlugs)
      )
    ),
  },
];

const isDocsNavItemActive = (
  currentRoute: Main.AppRoute,
  navItem: DocsNavItem
): boolean => navItem.activeRouteTags.includes(currentRoute._tag);

const libraryBadgeClassName = (library: ComponentLibrary): string =>
  clsx(
    "rounded px-1.5 py-0.5 text-[10px] font-medium uppercase leading-none",
    library === "Foldkit" && "bg-accent-100 text-accent-700",
    library === "Base UI" && "bg-emerald-100 text-emerald-700",
    library === "shadcn" && "bg-gray-200 text-gray-700"
  );

const comingSoonBadgeClassName =
  "rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium uppercase leading-none text-gray-500";

const navLinkClassName = (isActive: boolean): string =>
  clsx(
    "block min-w-0 flex-1 rounded-md px-3 py-1.5 text-sm transition-colors",
    isActive
      ? "bg-accent-100 text-accent-700"
      : "text-gray-700 hover:bg-gray-200"
  );

const comingSoonNavItemClassName =
  "block min-w-0 flex-1 rounded-md px-3 py-1.5 text-sm text-gray-400";

const mobileNavLinkClassName = (isActive: boolean): string =>
  clsx(
    "block min-w-0 flex-1 rounded-md px-4 py-2.5 text-base transition-colors",
    isActive
      ? "bg-accent-100 text-accent-700"
      : "text-gray-700 hover:bg-gray-200"
  );

const docsNavGroupView = (
  currentRoute: Main.AppRoute,
  group: DocsNavGroup,
  linkClassName: (isActive: boolean) => string
): Html => {
  const h = html<Message>();
  const testId = `docs-nav-section-${group.library
    .toLowerCase()
    .replaceAll(" ", "-")}`;

  return h.div(
    [h.Class("space-y-2"), h.DataAttribute("testid", testId)],
    [
      h.div(
        [
          h.Class(
            "border-t border-gray-200 pt-3 text-xs font-semibold uppercase tracking-wide text-gray-500 first:border-t-0 first:pt-0"
          ),
        ],
        [group.library]
      ),
      group.items.length === 0
        ? h.p([h.Class("px-3 text-xs text-gray-400")], ["No components yet"])
        : h.ul(
            [h.Class("flex flex-col gap-0.5")],
            group.items.map((navItem) => {
              const isActive = isDocsNavItemActive(currentRoute, navItem);

              return h.li(
                [h.Class("flex items-center gap-2")],
                [
                  navItem.availability === "coming-soon"
                    ? h.span(
                        [
                          h.Class(comingSoonNavItemClassName),
                          h.AriaDisabled(true),
                        ],
                        [navItem.label]
                      )
                    : h.a(
                        [
                          h.Href(Main.appPath(navItem.href)),
                          h.Class(linkClassName(isActive)),
                          ...(isActive ? [h.AriaCurrent("page")] : []),
                        ],
                        [navItem.label]
                      ),
                  h.span(
                    [
                      h.AriaHidden(true),
                      h.Class(libraryBadgeClassName(navItem.library)),
                    ],
                    [navItem.library]
                  ),
                  ...(navItem.availability === "coming-soon"
                    ? [
                        h.span(
                          [h.Class(comingSoonBadgeClassName)],
                          ["Coming soon"]
                        ),
                      ]
                    : []),
                ]
              );
            })
          ),
    ]
  );
};

const sidebarView = (currentRoute: Main.AppRoute): Html => {
  const h = html<Message>();

  return h.nav(
    [
      h.Class(
        "hidden h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-gray-50 p-4 md:flex"
      ),
    ],
    [
      h.div(
        [h.Class("mb-6")],
        [
          h.a(
            [h.Href(Main.appPath("/")), h.Class("block")],
            [
              h.h1(
                [h.Class("text-lg font-bold text-gray-900")],
                ["Foldkit-basic-cn-ui"]
              ),
            ]
          ),
          h.span(
            [h.Class("text-xs text-gray-500")],
            ["Foldkit component registry"]
          ),
        ]
      ),
      h.div(
        [h.Class("min-h-0 flex-1 space-y-5 overflow-y-auto pr-1")],
        DOCS_NAV_GROUPS.map((group) =>
          docsNavGroupView(currentRoute, group, navLinkClassName)
        )
      ),
    ]
  );
};

const mobileMenuContent = (currentRoute: Main.AppRoute): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("flex flex-col h-full")],
    [
      h.div(
        [
          h.Class(
            "flex items-center justify-between border-b border-gray-200 px-4 py-3"
          ),
        ],
        [
          h.a(
            [h.Href(Main.appPath("/")), h.Class("block")],
            [
              h.div(
                [h.Class("flex flex-col")],
                [
                  h.span(
                    [h.Class("text-base font-bold text-gray-900")],
                    ["Foldkit-basic-cn-ui"]
                  ),
                  h.span(
                    [h.Class("text-xs text-gray-500")],
                    ["Foldkit component registry"]
                  ),
                ]
              ),
            ]
          ),
          h.button(
            [
              h.Class(
                "p-2 rounded-md hover:bg-gray-200 transition text-gray-700 cursor-pointer"
              ),
              h.AriaLabel("Close menu"),
              h.OnClick(
                Main.toMobileMenuDialogMessage(Ui.Dialog.RequestedClose())
              ),
            ],
            [Icon.xMark("w-6 h-6")]
          ),
        ]
      ),
      h.nav(
        [
          h.Class("flex-1 overflow-y-auto min-h-0 p-4"),
          h.Tabindex(-1),
          h.Autofocus(true),
        ],
        [
          h.div(
            [h.Class("space-y-5")],
            DOCS_NAV_GROUPS.map((group) =>
              docsNavGroupView(currentRoute, group, mobileNavLinkClassName)
            )
          ),
        ]
      ),
    ]
  );
};

const mobileHeaderView = (model: Model): Html => {
  const h = html<Message>();

  return h.header(
    [
      h.Class(
        "md:hidden sticky top-0 z-40 flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3"
      ),
    ],
    [
      h.a(
        [h.Href(Main.appPath("/")), h.Class("block")],
        [
          h.div(
            [h.Class("flex flex-col")],
            [
              h.span(
                [h.Class("text-base font-bold text-gray-900")],
                ["Foldkit-basic-cn-ui"]
              ),
              h.span(
                [h.Class("text-xs text-gray-500")],
                ["Foldkit component registry"]
              ),
            ]
          ),
        ]
      ),
      h.button(
        [
          h.Class(
            "p-2 rounded-md hover:bg-gray-200 transition text-gray-700 cursor-pointer"
          ),
          h.AriaExpanded(model.uiModel.mobileMenuDialog.isOpen),
          h.AriaLabel("Toggle menu"),
          h.OnClick(Main.toMobileMenuDialogMessage(Ui.Dialog.RequestedOpen())),
        ],
        [Icon.menu("w-6 h-6")]
      ),
    ]
  );
};

const mobileMenuView = (model: Model): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId: model.uiModel.mobileMenuDialog.id,
    model: model.uiModel.mobileMenuDialog,
    view: Ui.Dialog.view,
    viewInputs: {
      toView: ({ dialog, backdrop, panel, isVisible }) =>
        h.dialog(
          [...dialog, h.Class("md:hidden")],
          isVisible
            ? [
                h.div([...backdrop, h.Class("fixed inset-0 z-[59]")], []),
                h.div(
                  [
                    ...panel,
                    h.Class("fixed inset-0 z-[60] bg-white flex flex-col"),
                  ],
                  [mobileMenuContent(model.route)]
                ),
              ]
            : []
        ),
    },
    toParentMessage: (message) => Main.toMobileMenuDialogMessage(message),
  });
};

const homeView = (): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-8")],
    [
      h.section(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-900"
              ),
            ],
            ["Sneak peek release · work in progress"]
          ),
          h.h1(
            [h.Class("max-w-3xl text-3xl font-bold text-gray-950 md:text-5xl")],
            ["Foldkit CN"]
          ),
          h.p(
            [h.Class("max-w-3xl text-lg leading-8 text-gray-600")],
            [
              "A shadcn-style registry of styled, installable Foldkit component slices, examples, tests, and documentation. Copy the source into your app, keep ownership of it, and adapt it to your product.",
            ]
          ),
        ]
      ),
      h.section(
        [h.Class("grid gap-4 md:grid-cols-3")],
        [
          h.div(
            [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
            [
              h.h2([h.Class("font-semibold text-gray-950")], ["Installable"]),
              h.p([h.Class("mt-2 text-sm leading-6 text-gray-600")], [
                "Registry items install as project-owned source files through the shadcn CLI.",
              ]),
            ]
          ),
          h.div(
            [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
            [
              h.h2([h.Class("font-semibold text-gray-950")], ["Foldkit-native"]),
              h.p([h.Class("mt-2 text-sm leading-6 text-gray-600")], [
                "Foldkit-origin items are initial registry references; default to native Foldkit UI components in app code.",
              ]),
            ]
          ),
          h.div(
            [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
            [
              h.h2([h.Class("font-semibold text-gray-950")], ["Still maturing"]),
              h.p([h.Class("mt-2 text-sm leading-6 text-gray-600")], [
                "Visual parity, mobile behavior, keyboard details, and example coverage are actively improving.",
              ]),
            ]
          ),
        ]
      ),
      h.section(
        [h.Class("space-y-3")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], [
            "Install from the public registry",
          ]),
          h.p([h.Class("max-w-3xl text-sm leading-6 text-gray-600")], [
            "Use the hosted registry URL directly, or copy the published components config into your Foldkit app to enable the @foldkit-cn alias.",
          ]),
          codeBlock(
            "bunx shadcn@latest add https://bearing-ward.github.io/foldkit-basic-cn-ui/r/sidebar.json\nbunx shadcn@latest add https://bearing-ward.github.io/foldkit-basic-cn-ui/r/sidebar-basic.json"
          ),
          codeBlock(
            "curl -L https://bearing-ward.github.io/foldkit-basic-cn-ui/components.json -o components.json\nbunx shadcn@latest add @foldkit-cn/sonner"
          ),
        ]
      ),
      h.section(
        [h.Class("space-y-3")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], [
            "Release expectations",
          ]),
          h.ul(
            [h.Class("list-disc space-y-2 pl-5 text-sm leading-6 text-gray-600")],
            [
              h.li([], [
                "This is not the official Foldkit UI documentation; it is a styled registry on top of Foldkit.",
              ]),
              h.li([], [
                "Foldkit-origin items are included as initial references for packaging, documenting, and testing native Foldkit UI through the registry workflow.",
              ]),
              h.li([], [
                "Default to native Foldkit UI components first; install registry items when you want project-owned styling, examples, or an adaptable source snapshot.",
              ]),
              h.li([], [
                "Installed files are intended to be reviewed and owned by the consuming app.",
              ]),
              h.li([], [
                "Component APIs and example fidelity may change during the sneak peek period.",
              ]),
              h.li([], [
                "The current priority is closer origin parity with shadcn and Base UI examples.",
              ]),
            ]
          ),
        ]
      ),
      h.section(
        [h.Class("space-y-3")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], [
            "Acknowledgements",
          ]),
          h.p([h.Class("max-w-3xl text-sm leading-6 text-gray-600")], [
            "Foldkit CN builds on ideas, APIs, examples, and design language from Foldkit, shadcn/ui, and Base UI. Thank you to the maintainers and contributors behind those projects.",
          ]),
          h.ul(
            [h.Class("space-y-2 text-sm leading-6")],
            [
              h.li([], [
                h.a(
                  [
                    h.Href("https://github.com/foldkit/foldkit"),
                    h.Class("font-medium text-accent-700 hover:underline"),
                  ],
                  ["Foldkit"]
                ),
                h.span([h.Class("text-gray-600")], [
                  " — Elm-style application architecture, Effect-based runtime, and accessibility-focused primitives.",
                ]),
              ]),
              h.li([], [
                h.a(
                  [
                    h.Href("https://github.com/shadcn-ui/ui"),
                    h.Class("font-medium text-accent-700 hover:underline"),
                  ],
                  ["shadcn/ui"]
                ),
                h.span([h.Class("text-gray-600")], [
                  " — source-owned registry workflow, component naming, and visual reference points.",
                ]),
              ]),
              h.li([], [
                h.a(
                  [
                    h.Href("https://github.com/mui/base-ui"),
                    h.Class("font-medium text-accent-700 hover:underline"),
                  ],
                  ["Base UI"]
                ),
                h.span([h.Class("text-gray-600")], [
                  " — accessible unstyled component patterns and origin examples for parity work.",
                ]),
              ]),
            ]
          ),
        ]
      ),
    ]
  );
};

const notFoundView = (path: string): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-2xl")],
    [
      h.h1(
        [h.Class("text-2xl md:text-3xl font-bold text-red-600 mb-4")],
        ["404 — Page Not Found"]
      ),
      h.p(
        [h.Class("text-gray-600 mb-4")],
        [`The path "${path}" was not found.`]
      ),
      h.a(
        [h.Href(Main.appPath("/")), h.Class("text-accent-600 hover:underline")],
        ["Go Home"]
      ),
    ]
  );
};

const codeBlock = (code: string): Html => {
  const h = html<Message>();

  return h.pre(
    [
      h.Class(
        "overflow-x-auto rounded-lg border border-gray-200 bg-gray-950 px-4 py-3 text-sm text-gray-50"
      ),
    ],
    [h.code([], [code])]
  );
};

type DocsMetaItem = Readonly<{
  label: string;
  value: string;
}>;

type ComponentDocsMetadata = Readonly<{
  origin: ComponentLibrary;
  artifact: "component" | "primitive-backed-component";
  primitive?: string;
}>;

const componentNameFromSlug = (slug: string): string =>
  slug
    .split("-")
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join("");

const COMPONENT_DOCS_METADATA_BY_SLUG: Record<string, ComponentDocsMetadata> = {
  animation: {
    artifact: "primitive-backed-component",
    origin: "Foldkit",
    primitive: "Ui.Animation",
  },
  accordion: {
    artifact: "component",
    origin: "Base UI",
  },
  "shadcn-accordion": {
    artifact: "component",
    origin: "shadcn",
  },
  alert: {
    artifact: "component",
    origin: "shadcn",
  },
  "alert-dialog": {
    artifact: "component",
    origin: "Base UI",
  },
  "shadcn-alert-dialog": {
    artifact: "component",
    origin: "shadcn",
  },
  "aspect-ratio": {
    artifact: "component",
    origin: "shadcn",
  },
  avatar: {
    artifact: "component",
    origin: "Base UI",
  },
  "shadcn-avatar": {
    artifact: "component",
    origin: "shadcn",
  },
  button: {
    artifact: "primitive-backed-component",
    origin: "Foldkit",
    primitive: "Ui.Button",
  },
  "base-ui-button": {
    artifact: "component",
    origin: "Base UI",
    primitive: "Ui.Button",
  },
  "shadcn-button": {
    artifact: "component",
    origin: "shadcn",
    primitive: "Ui.Button",
  },
  breadcrumb: { artifact: "component", origin: "shadcn" },
  "button-group": { artifact: "component", origin: "shadcn" },
  calendar: {
    artifact: "primitive-backed-component",
    origin: "Foldkit",
    primitive: "Ui.Calendar",
  },
  "shadcn-calendar": {
    artifact: "component",
    origin: "shadcn",
    primitive: "Ui.Calendar",
  },
  carousel: { artifact: "component", origin: "shadcn" },
  chart: { artifact: "component", origin: "shadcn" },
  checkbox: {
    artifact: "primitive-backed-component",
    origin: "Foldkit",
    primitive: "Ui.Checkbox",
  },
  "base-ui-checkbox": {
    artifact: "component",
    origin: "Base UI",
    primitive: "Ui.Checkbox",
  },
  "shadcn-checkbox": {
    artifact: "component",
    origin: "shadcn",
    primitive: "Ui.Checkbox",
  },
  command: { artifact: "component", origin: "shadcn" },
  collapsible: {
    artifact: "component",
    origin: "Base UI",
  },
  "shadcn-collapsible": {
    artifact: "component",
    origin: "shadcn",
  },
  combobox: {
    artifact: "primitive-backed-component",
    origin: "Foldkit",
    primitive: "Ui.Combobox",
  },
  "base-ui-combobox": {
    artifact: "component",
    origin: "Base UI",
    primitive: "Ui.Combobox",
  },
  "shadcn-combobox": {
    artifact: "component",
    origin: "shadcn",
    primitive: "Ui.Combobox",
  },
  "date-picker": {
    artifact: "primitive-backed-component",
    origin: "Foldkit",
    primitive: "Ui.DatePicker",
  },
  "shadcn-date-picker": {
    artifact: "component",
    origin: "shadcn",
    primitive: "Ui.DatePicker",
  },
  dialog: {
    artifact: "primitive-backed-component",
    origin: "Foldkit",
    primitive: "Ui.Dialog",
  },
  "base-ui-dialog": {
    artifact: "component",
    origin: "Base UI",
    primitive: "Ui.Dialog",
  },
  "base-ui-accordion": {
    artifact: "component",
    origin: "Base UI",
    primitive: "Accordion view helpers",
  },
  "base-ui-alert-dialog": {
    artifact: "component",
    origin: "Base UI",
    primitive: "Alert Dialog view helpers",
  },
  "base-ui-autocomplete": {
    artifact: "component",
    origin: "Base UI",
    primitive: "Autocomplete view helpers",
  },
  "shadcn-dialog": {
    artifact: "component",
    origin: "shadcn",
    primitive: "Ui.Dialog",
  },
  disclosure: {
    artifact: "primitive-backed-component",
    origin: "Foldkit",
    primitive: "Ui.Disclosure",
  },
  "drag-and-drop": {
    artifact: "primitive-backed-component",
    origin: "Foldkit",
    primitive: "Ui.DragAndDrop",
  },
  "dropdown-menu": { artifact: "component", origin: "shadcn" },
  "shadcn-drawer": { artifact: "component", origin: "shadcn" },
  "shadcn-context-menu": { artifact: "component", origin: "shadcn" },
  fieldset: {
    artifact: "primitive-backed-component",
    origin: "Foldkit",
    primitive: "Ui.Fieldset",
  },
  "base-ui-fieldset": {
    artifact: "component",
    origin: "Base UI",
    primitive: "Ui.Fieldset",
  },
  "shadcn-field": { artifact: "component", origin: "shadcn" },
  "file-drop": {
    artifact: "primitive-backed-component",
    origin: "Foldkit",
    primitive: "Ui.FileDrop",
  },
  "hover-card": { artifact: "component", origin: "shadcn" },
  input: {
    artifact: "primitive-backed-component",
    origin: "Foldkit",
    primitive: "Ui.Input",
  },
  "base-ui-input": {
    artifact: "component",
    origin: "Base UI",
    primitive: "Ui.Input",
  },
  "shadcn-input": {
    artifact: "component",
    origin: "shadcn",
    primitive: "Ui.Input",
  },
  "input-otp": { artifact: "component", origin: "shadcn" },
  listbox: {
    artifact: "primitive-backed-component",
    origin: "Foldkit",
    primitive: "Ui.Listbox",
  },
  menu: {
    artifact: "primitive-backed-component",
    origin: "Foldkit",
    primitive: "Ui.Menu",
  },
  "base-ui-menu": {
    artifact: "component",
    origin: "Base UI",
    primitive: "Ui.Menu",
  },
  "native-select": { artifact: "component", origin: "shadcn" },
  popover: {
    artifact: "primitive-backed-component",
    origin: "Foldkit",
    primitive: "Ui.Popover",
  },
  "base-ui-popover": {
    artifact: "component",
    origin: "Base UI",
    primitive: "Ui.Popover",
  },
  "shadcn-popover": {
    artifact: "component",
    origin: "shadcn",
    primitive: "Ui.Popover",
  },
  "radio-group": {
    artifact: "primitive-backed-component",
    origin: "Foldkit",
    primitive: "Ui.RadioGroup",
  },
  "base-ui-radio": {
    artifact: "component",
    origin: "Base UI",
    primitive: "Ui.RadioGroup",
  },
  select: {
    artifact: "primitive-backed-component",
    origin: "Foldkit",
    primitive: "Ui.Select",
  },
  "base-ui-select": {
    artifact: "component",
    origin: "Base UI",
    primitive: "Ui.Select",
  },
  sheet: { artifact: "component", origin: "shadcn" },
  slider: {
    artifact: "primitive-backed-component",
    origin: "Foldkit",
    primitive: "Ui.Slider",
  },
  "base-ui-slider": {
    artifact: "component",
    origin: "Base UI",
    primitive: "Ui.Slider",
  },
  sonner: { artifact: "component", origin: "shadcn" },
  switch: {
    artifact: "primitive-backed-component",
    origin: "Foldkit",
    primitive: "Ui.Switch",
  },
  "base-ui-switch": {
    artifact: "component",
    origin: "Base UI",
    primitive: "Ui.Switch",
  },
  tabs: {
    artifact: "primitive-backed-component",
    origin: "Foldkit",
    primitive: "Ui.Tabs",
  },
  "base-ui-tabs": {
    artifact: "component",
    origin: "Base UI",
    primitive: "Ui.Tabs",
  },
  textarea: {
    artifact: "primitive-backed-component",
    origin: "Foldkit",
    primitive: "Ui.Textarea",
  },
  toast: {
    artifact: "primitive-backed-component",
    origin: "Foldkit",
    primitive: "Ui.Toast",
  },
  "base-ui-toast": {
    artifact: "component",
    origin: "Base UI",
    primitive: "Ui.Toast",
  },
  tooltip: {
    artifact: "primitive-backed-component",
    origin: "Foldkit",
    primitive: "Ui.Tooltip",
  },
  "base-ui-tooltip": {
    artifact: "component",
    origin: "Base UI",
    primitive: "Ui.Tooltip",
  },
  "virtual-list": {
    artifact: "primitive-backed-component",
    origin: "Foldkit",
    primitive: "Ui.VirtualList",
  },
  "data-table": { artifact: "component", origin: "shadcn" },
  direction: { artifact: "component", origin: "shadcn" },
  item: { artifact: "component", origin: "shadcn" },
  label: { artifact: "component", origin: "shadcn" },
  pagination: { artifact: "component", origin: "shadcn" },
  resizable: { artifact: "component", origin: "shadcn" },
  sidebar: { artifact: "component", origin: "shadcn" },
  table: { artifact: "component", origin: "shadcn" },
  drawer: {
    artifact: "component",
    origin: "Base UI",
  },
  "base-ui-drawer": {
    artifact: "component",
    origin: "Base UI",
  },
  "context-menu": {
    artifact: "component",
    origin: "Base UI",
  },
  "base-ui-context-menu": {
    artifact: "component",
    origin: "Base UI",
  },
  menubar: {
    artifact: "component",
    origin: "Base UI",
  },
  "base-ui-menubar": {
    artifact: "component",
    origin: "Base UI",
  },
  "shadcn-menubar": { artifact: "component", origin: "shadcn" },
  "navigation-menu": {
    artifact: "component",
    origin: "Base UI",
  },
  "base-ui-navigation-menu": {
    artifact: "component",
    origin: "Base UI",
  },
  "shadcn-navigation-menu": { artifact: "component", origin: "shadcn" },
  "otp-field": {
    artifact: "component",
    origin: "Base UI",
  },
  "base-ui-otp-field": {
    artifact: "component",
    origin: "Base UI",
  },
  "preview-card": {
    artifact: "component",
    origin: "Base UI",
  },
  "base-ui-preview-card": {
    artifact: "component",
    origin: "Base UI",
  },
  field: {
    artifact: "component",
    origin: "Base UI",
  },
  "base-ui-field": {
    artifact: "component",
    origin: "Base UI",
  },
  "number-field": {
    artifact: "component",
    origin: "Base UI",
  },
  "base-ui-number-field": {
    artifact: "component",
    origin: "Base UI",
  },
  form: {
    artifact: "component",
    origin: "Base UI",
  },
  "base-ui-form": {
    artifact: "component",
    origin: "Base UI",
  },
  autocomplete: {
    artifact: "component",
    origin: "Base UI",
  },
  badge: {
    artifact: "component",
    origin: "shadcn",
  },
  card: {
    artifact: "component",
    origin: "shadcn",
  },
  separator: {
    artifact: "component",
    origin: "Base UI",
  },
  "base-ui-separator": {
    artifact: "component",
    origin: "Base UI",
  },
  skeleton: {
    artifact: "component",
    origin: "shadcn",
  },
  spinner: {
    artifact: "component",
    origin: "shadcn",
  },
  kbd: {
    artifact: "component",
    origin: "shadcn",
  },
  typography: {
    artifact: "component",
    origin: "shadcn",
  },
  empty: {
    artifact: "component",
    origin: "shadcn",
  },
  "input-group": {
    artifact: "component",
    origin: "shadcn",
  },
  meter: {
    artifact: "component",
    origin: "Base UI",
  },
  "base-ui-meter": {
    artifact: "component",
    origin: "Base UI",
  },
  "scroll-area": {
    artifact: "component",
    origin: "Base UI",
  },
  "base-ui-scroll-area": {
    artifact: "component",
    origin: "Base UI",
  },
  toggle: {
    artifact: "component",
    origin: "Base UI",
  },
  "base-ui-toggle": {
    artifact: "component",
    origin: "Base UI",
  },
  "toggle-group": {
    artifact: "component",
    origin: "Base UI",
  },
  "base-ui-toggle-group": {
    artifact: "component",
    origin: "Base UI",
  },
  radio: {
    artifact: "component",
    origin: "Base UI",
  },
  "checkbox-group": {
    artifact: "component",
    origin: "Base UI",
  },
  toolbar: {
    artifact: "component",
    origin: "Base UI",
  },
  "base-ui-toolbar": {
    artifact: "component",
    origin: "Base UI",
  },
  progress: {
    artifact: "component",
    origin: "Base UI",
  },
  "base-ui-progress": {
    artifact: "component",
    origin: "Base UI",
  },
  "shadcn-progress": { artifact: "component", origin: "shadcn" },
  "shadcn-radio-group": {
    artifact: "component",
    origin: "shadcn",
    primitive: "Ui.RadioGroup",
  },
  "shadcn-scroll-area": { artifact: "component", origin: "shadcn" },
  "shadcn-select": {
    artifact: "component",
    origin: "shadcn",
    primitive: "Ui.Select",
  },
  "shadcn-separator": { artifact: "component", origin: "shadcn" },
  "shadcn-slider": {
    artifact: "component",
    origin: "shadcn",
    primitive: "Ui.Slider",
  },
  "shadcn-switch": {
    artifact: "component",
    origin: "shadcn",
    primitive: "Ui.Switch",
  },
  "shadcn-tabs": {
    artifact: "component",
    origin: "shadcn",
    primitive: "Ui.Tabs",
  },
  "shadcn-textarea": {
    artifact: "component",
    origin: "shadcn",
    primitive: "Ui.Textarea",
  },
  "shadcn-toast": {
    artifact: "component",
    origin: "shadcn",
    primitive: "Ui.Toast",
  },
};

const docsMetadataForSource = (
  source: string
): ComponentDocsMetadata | undefined => {
  const slug = source.replace(/^registry\/default\/ui\//u, "");

  if (slug === source) {
    return undefined;
  }

  return (
    COMPONENT_DOCS_METADATA_BY_SLUG[slug] ?? {
      artifact: "primitive-backed-component",
      origin: "Foldkit",
      primitive: `Ui.${componentNameFromSlug(slug)}`,
    }
  );
};

const originUrlForSource = (source: string, origin: string): string => {
  if (origin.startsWith("https://")) {
    return origin;
  }

  const slug = source.replace(/^registry\/default\/ui\//u, "");
  const componentSlug = slug.replace(/^base-ui-/u, "").replace(/^shadcn-/u, "");

  if (origin === "Base UI") {
    return `https://base-ui.com/react/components/${componentSlug}`;
  }

  if (origin === "shadcn") {
    return componentSlug === "avatar"
      ? "https://ui.shadcn.com/docs/components/radix/avatar"
      : `https://ui.shadcn.com/docs/components/${componentSlug}`;
  }

  return `https://foldkit.dev/ui/${componentSlug}`;
};

const docsMetaItemsWithComponentMetadata = (
  items: readonly DocsMetaItem[]
): readonly DocsMetaItem[] => {
  const maybeSource = items.find((item) => item.label === "Source");

  if (maybeSource === undefined) {
    return items;
  }

  const maybeMetadata = docsMetadataForSource(maybeSource.value);

  if (maybeMetadata === undefined) {
    return items;
  }

  return [
    ...items,
    {
      label: "Origin",
      value: originUrlForSource(maybeSource.value, maybeMetadata.origin),
    },
    { label: "Artifact", value: maybeMetadata.artifact },
    ...(maybeMetadata.primitive === undefined
      ? []
      : [{ label: "Primitive", value: maybeMetadata.primitive }]),
  ];
};

const isHttpsUrl = (value: string): boolean => {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
};

const docsMetaValueView = (value: string): Html => {
  const h = html<Message>();

  if (!isHttpsUrl(value)) {
    return h.p([], [value]);
  }

  return h.p(
    [],
    [
      h.a(
        [
          h.Href(value),
          h.Class("break-words text-accent-700 underline underline-offset-4"),
        ],
        [value]
      ),
    ]
  );
};

const docsMetaGrid = (items: readonly DocsMetaItem[]): Html => {
  const h = html<Message>();
  const enrichedItems = docsMetaItemsWithComponentMetadata(items);

  return h.section(
    [
      h.Class(
        "grid gap-3 border-y border-gray-200 py-4 text-sm text-gray-700 sm:grid-cols-3"
      ),
    ],
    enrichedItems.map((item) =>
      h.div(
        [h.Class("space-y-1")],
        [
          h.p([h.Class("font-medium text-gray-950")], [item.label]),
          docsMetaValueView(item.value),
        ]
      )
    )
  );
};

const docsSection = (title: string, children: readonly Html[]): Html => {
  const h = html<Message>();

  return h.section(
    [h.Class("space-y-3 border-t border-gray-200 pt-8")],
    [
      h.h2([h.Class("text-xl font-semibold text-gray-950")], [title]),
      ...children,
    ]
  );
};

const docsOverviewBlock = (body: string): Html => {
  const h = html<Message>();

  return docsSection("Overview", [
    h.p([h.Class("max-w-2xl text-sm text-gray-600")], [body]),
  ]);
};

const publicRegistryBaseUrl =
  "https://bearing-ward.github.io/foldkit-basic-cn-ui/r";

const docsInstallBlock = (commands: string): Html =>
  docsSection("Installation", [
    codeBlock(commands.replaceAll("<registry-url>", publicRegistryBaseUrl)),
  ]);

const docsStylingBlock = (): Html => {
  const h = html<Message>();

  return docsSection("Styling", [
    h.p(
      [h.Class("max-w-2xl text-sm text-gray-600")],
      [
        "Styled registry slices keep presentation in registry/default/ui/{component}/view.ts. Foldkit UI publishes semantic attribute bundles for each part; the registry view spreads those attributes first, then applies local class tokens so consumers can replace the markup without losing ARIA, ids, or event wiring.",
      ]
    ),
    h.ul(
      [h.Class("list-disc space-y-1 pl-5 text-sm text-gray-700")],
      [
        h.li(
          [],
          [
            "Class-name exports are the stable styling surface for the generated examples.",
          ]
        ),
        h.li(
          [],
          [
            "Consumers can keep the primitive update/model contract and swap only the view callback.",
          ]
        ),
        h.li(
          [],
          [
            "Hidden inputs, labels, descriptions, portals, and panels stay wired through primitive attributes rather than ad hoc DOM selectors.",
          ]
        ),
      ]
    ),
  ]);
};

const docsComponentStylingBlock = (
  items: readonly string[],
  code: string
): Html => {
  const h = html<Message>();

  return docsSection("Styling", [
    h.p(
      [h.Class("max-w-2xl text-sm text-gray-600")],
      [
        "Use the part-level class hooks when the default registry view matches your structure and you only need to change presentation. Compose the lower-level part views when the layout itself needs to change.",
      ]
    ),
    h.ul(
      [h.Class("list-disc space-y-1 pl-5 text-sm text-gray-700")],
      items.map((item) => h.li([], [item]))
    ),
    codeBlock(code),
  ]);
};

const docsKeyboardInteractionBlock = (): Html => {
  const h = html<Message>();

  return docsSection("Keyboard interaction", [
    h.p(
      [h.Class("max-w-2xl text-sm text-gray-600")],
      [
        "Keyboard behavior is owned by the Foldkit UI primitive and represented as Foldkit messages, not imperative handlers in the docs shell. The examples exercise the applicable focus, arrow-key, Escape, Enter, Space, typeahead, and disabled-state paths for each interactive component.",
      ]
    ),
    h.ul(
      [h.Class("list-disc space-y-1 pl-5 text-sm text-gray-700")],
      [
        h.li(
          [],
          [
            "Buttons, inputs, selects, and textareas rely on native HTML behavior.",
          ]
        ),
        h.li(
          [],
          [
            "Composite widgets expose roving focus, selection, dismissal, or drag subscriptions through Foldkit UI.",
          ]
        ),
        h.li(
          [],
          [
            "Browser tests cover the interaction contract for promoted primitives so regressions fail before deployment.",
          ]
        ),
      ]
    ),
  ]);
};

const docsUsageBlock = (body: string, code: string): Html => {
  const h = html<Message>();

  return docsSection("Usage", [
    h.p([h.Class("max-w-2xl text-sm text-gray-600")], [body]),
    codeBlock(code),
  ]);
};

const docsFoldkitIntegrationBlock = (code: string): Html =>
  (() => {
    const h = html<Message>();

    return docsSection("Foldkit integration", [
      h.p(
        [h.Class("max-w-2xl text-sm text-gray-600")],
        [
          "Stateful registry components compose as ordinary Foldkit children: parent-owned model field, parent message wrapper, init command mapping, update delegation, and h.submodel view wiring.",
        ]
      ),
      codeBlock(code),
    ]);
  })();

const docsAnatomyBlock = (code: string): Html =>
  docsSection("Anatomy", [codeBlock(code)]);

const docsApiList = (items: readonly string[]): Html => {
  const h = html<Message>();

  const parseApiItem = (
    item: string
  ): Readonly<{ name: string; description: string }> => {
    const separatorIndex = item.indexOf(":");

    if (separatorIndex === -1) {
      return { name: item, description: "" };
    }

    return {
      name: item.slice(0, separatorIndex),
      description: item.slice(separatorIndex + 1).trim(),
    };
  };

  return docsSection("API reference", [
    h.p(
      [h.Class("max-w-2xl text-sm text-gray-600")],
      [
        "Use these exports from the registry component module. Stateful primitives keep Foldkit model and message contracts explicit; view helpers expose attribute bundles so apps own markup and styling.",
      ]
    ),
    h.ul(
      [h.Class("grid gap-3 text-sm sm:grid-cols-2")],
      items.map((item) => {
        const parsedItem = parseApiItem(item);

        return h.li(
          [
            h.Class(
              "rounded-lg border border-gray-200 bg-white p-3 text-gray-700"
            ),
          ],
          [
            h.code(
              [
                h.Class(
                  "text-sm font-semibold text-gray-950 [overflow-wrap:anywhere]"
                ),
              ],
              [parsedItem.name]
            ),
            parsedItem.description === ""
              ? h.empty
              : h.p([h.Class("mt-1 leading-6")], [parsedItem.description]),
          ]
        );
      })
    ),
  ]);
};

type DocsApiTableRow = Readonly<{
  part: string;
  prop: string;
  type: string;
  defaultValue: string;
  description: string;
}>;

const docsApiTable = (rows: readonly DocsApiTableRow[]): Html => {
  const h = html<Message>();

  return docsSection("API reference", [
    h.p(
      [h.Class("max-w-2xl text-sm text-gray-600")],
      [
        "Props are grouped by anatomy part. Class hooks append to the default registry classes; style hooks apply inline styles to the same element.",
      ]
    ),
    h.div(
      [h.Class("overflow-x-auto rounded-lg border border-gray-200 bg-white")],
      [
        h.table(
          [h.Class("min-w-full border-collapse text-left text-sm")],
          [
            h.thead(
              [h.Class("bg-gray-50 text-xs uppercase text-gray-500")],
              [
                h.tr(
                  [],
                  ["Part", "Prop", "Type", "Default", "Description"].map(
                    (heading) =>
                      h.th(
                        [h.Class("border-b border-gray-200 px-3 py-2")],
                        [heading]
                      )
                  )
                ),
              ]
            ),
            h.tbody(
              [],
              rows.map((row) =>
                h.tr(
                  [h.Class("border-b border-gray-100 last:border-b-0")],
                  [
                    h.td(
                      [
                        h.Class(
                          "px-3 py-2 align-top font-medium text-gray-950"
                        ),
                      ],
                      [row.part]
                    ),
                    h.td(
                      [h.Class("px-3 py-2 align-top")],
                      [
                        h.code(
                          [h.Class("font-mono text-sm text-gray-950")],
                          [row.prop]
                        ),
                      ]
                    ),
                    h.td(
                      [h.Class("px-3 py-2 align-top text-gray-600")],
                      [h.code([h.Class("font-mono text-xs")], [row.type])]
                    ),
                    h.td(
                      [h.Class("px-3 py-2 align-top text-gray-600")],
                      [
                        h.code(
                          [h.Class("font-mono text-xs")],
                          [row.defaultValue]
                        ),
                      ]
                    ),
                    h.td(
                      [
                        h.Class(
                          "max-w-sm px-3 py-2 align-top leading-6 text-gray-700"
                        ),
                      ],
                      [row.description]
                    ),
                  ]
                )
              )
            ),
          ]
        ),
      ]
    ),
  ]);
};

const docsTextListSection = (title: string, items: readonly string[]): Html => {
  const h = html<Message>();

  return docsSection(title, [
    h.ul(
      [h.Class("list-disc space-y-1 pl-5 text-sm text-gray-700")],
      items.map((item) => h.li([], [item]))
    ),
  ]);
};

type DocsStandardComponentSectionsInput = Readonly<{
  installCommands: string;
  usageBody: string;
  usageCode: string;
  integrationCode: string;
  stylingItems?: readonly string[] | undefined;
  stylingCode?: string | undefined;
  includeStyling?: boolean | undefined;
  includeKeyboardInteraction?: boolean | undefined;
  anatomySection?: Html | undefined;
  apiReference?: Html | undefined;
  apiItems: readonly string[];
  accessibilityItems: readonly string[];
  coverageItems: readonly string[];
}>;

const docsStandardComponentSections = ({
  installCommands,
  usageBody,
  usageCode,
  integrationCode,
  stylingItems,
  stylingCode,
  includeStyling = true,
  includeKeyboardInteraction = true,
  anatomySection,
  apiReference,
  apiItems,
  accessibilityItems,
  coverageItems,
}: DocsStandardComponentSectionsInput): readonly Html[] => [
  docsInstallBlock(installCommands),
  docsUsageBlock(usageBody, usageCode),
  docsFoldkitIntegrationBlock(integrationCode),
  ...(anatomySection === undefined ? [] : [anatomySection]),
  ...(includeStyling
    ? [
        stylingItems === undefined || stylingCode === undefined
          ? docsStylingBlock()
          : docsComponentStylingBlock(stylingItems, stylingCode),
      ]
    : []),
  ...(includeKeyboardInteraction ? [docsKeyboardInteractionBlock()] : []),
  apiReference ?? docsApiList(apiItems),
  docsTextListSection("Accessibility", accessibilityItems),
  docsTextListSection("Coverage", coverageItems),
];

type DocsExampleBlockInput = Readonly<{
  title: string;
  description?: string;
  testId: string;
  preview: Html;
  href: string;
  linkText: string;
}>;

const docsExampleBlock = ({
  title,
  description,
  testId,
  preview,
  href,
}: DocsExampleBlockInput): Html => {
  const h = html<Message>();
  const sourceHref = publicPath(exampleSourceHrefByExampleHref()[href] ?? "");

  return h.div(
    [
      h.Class(
        "flex h-full min-h-56 flex-col rounded-lg border border-gray-200 bg-white p-4"
      ),
      h.DataAttribute("testid", testId),
    ],
    [
      h.h3([h.Class("text-base font-semibold text-gray-950")], [title]),
      description === undefined
        ? h.empty
        : h.p([h.Class("mt-3 text-sm text-gray-600")], [description]),
      h.div(
        [
          h.Class("flex min-h-20 items-start pt-6"),
          h.DataAttribute("testid", `${testId}-preview`),
        ],
        [preview]
      ),
      h.div(
        [
          h.Class("mt-auto border-t border-gray-100 pt-4"),
          h.DataAttribute("testid", `${testId}-actions`),
        ],
        [
          h.details(
            [h.Class("group")],
            [
              h.summary(
                [
                  h.Class(
                    "inline-flex min-h-10 cursor-pointer list-none items-center rounded-lg border border-gray-300 bg-white px-3 text-sm font-medium text-gray-900 transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-600"
                  ),
                ],
                ["View code"]
              ),
              h.div(
                [
                  h.Class(
                    "mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white"
                  ),
                ],
                [
                  h.iframe(
                    [
                      h.Src(sourceHref),
                      h.Title(`${title} source code`),
                      h.Class("h-96 w-full bg-white"),
                    ],
                    []
                  ),
                ]
              ),
            ]
          ),
        ]
      ),
    ]
  );
};

const otpFieldDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-10")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["OTP Field"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A Base UI-informed one-time-code input for controlled verification-code entry.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/otp-field" },
        { label: "Examples", value: "default" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "OTP Field v1 follows Base UI Root, Input, and Separator anatomy. The default demo renders six controlled one-time-code inputs with a separator after the third digit, normalizes pasted numeric input across following slots, and advances focus to the next available input after entry. Arrow-key movement, deletion navigation, hidden input mirroring, and password-manager badge avoidance remain deferred."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          docsExampleBlock({
            title: "Default",
            testId: "docs-example-block-otp-field-basic",
            preview: DocsPreviewsNZ.otpFieldBasicExamplePreview(
              model.otpFieldBasicExample,
              "otp-field-docs-basic-preview"
            ),
            href: "/docs/components/otp-field/examples/basic",
            linkText: "Open standalone OTP Field Basic example",
          }),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/otp-field.json\nbunx shadcn@latest add <registry-url>/otp-field-basic.json",
        usageBody:
          "Keep the digit array in the parent Foldkit model and compose Root, InputGroup, Input, and Separator parts.",
        usageCode: 'import * as OtpField from "./ui/otp-field";',
        integrationCode: "digits: S.Array(S.String);",
        anatomySection: docsAnatomyBlock(
          "OtpField.rootView({ children: [label, inputGroup, status] });"
        ),
        includeStyling: false,
        includeKeyboardInteraction: false,
        apiReference: docsApiTable([
          {
            part: "Root",
            prop: "rootView(config)",
            type: "function",
            defaultValue: "-",
            description: "Groups the label, input group, and status text.",
          },
          {
            part: "InputGroup",
            prop: "inputGroupView(config)",
            type: "function",
            defaultValue: "-",
            description: "Renders the labelled group around OTP slots.",
          },
          {
            part: "Input",
            prop: "inputView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders one controlled one-time-code input slot with data-filled and data-invalid hooks.",
          },
          {
            part: "Separator",
            prop: "separatorView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders an aria-hidden visual separator between slots.",
          },
        ]),
        apiItems: [],
        accessibilityItems: [
          "Input slots are native textboxes with autocomplete=one-time-code and numeric input hints.",
          "The slot group is labelled Verification code.",
          "Each slot has an explicit accessible Digit label.",
          "Focus advances after digit entry; arrow-key movement and deletion navigation remain deferred.",
        ],
        coverageItems: [
          "Registry and example scene tests verify group semantics, one-time-code attributes, separator anatomy, slot updates, and paste-like normalization.",
        ],
      }),
    ]
  );
};

const previewCardDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-10")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Preview Card"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A Base UI-informed preview card for lightweight contextual profile or destination previews.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/preview-card" },
        { label: "Examples", value: "default" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Preview Card v1 follows Base UI Root, Trigger, Portal, Backdrop, Positioner, Popup, Viewport, and Arrow anatomy. The default demo opens a Base UI profile preview from a controlled trigger and closes through a transparent backdrop. Delayed hover, pointer grace area, collision-aware placement, focus return, and animation lifecycle remain deferred."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          docsExampleBlock({
            title: "Default",
            testId: "docs-example-block-preview-card-basic",
            preview: DocsPreviewsNZ.previewCardBasicExamplePreview(
              model.previewCardBasicExample,
              "preview-card-docs-basic-preview"
            ),
            href: "/docs/components/preview-card/examples/basic",
            linkText: "Open standalone Preview Card Basic example",
          }),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/preview-card.json\nbunx shadcn@latest add <registry-url>/preview-card-basic.json",
        usageBody:
          "Keep open state in the parent Foldkit model and compose Root, Trigger, Portal, Backdrop, Positioner, Popup, Viewport, and Arrow parts.",
        usageCode: 'import * as PreviewCard from "./ui/preview-card";',
        integrationCode: "open: S.Boolean;",
        anatomySection: docsAnatomyBlock(
          "PreviewCard.rootView({ children: [trigger, portal] });"
        ),
        includeStyling: false,
        includeKeyboardInteraction: false,
        apiReference: docsApiTable([
          {
            part: "Root",
            prop: "rootView(config)",
            type: "function",
            defaultValue: "-",
            description: "Groups the trigger and preview portal.",
          },
          {
            part: "Trigger",
            prop: "triggerView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders a controlled trigger with aria-expanded and aria-haspopup=dialog.",
          },
          {
            part: "Backdrop",
            prop: "backdropView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders the transparent close target behind the popup.",
          },
          {
            part: "Popup",
            prop: "popupView(config)",
            type: "function",
            defaultValue: "-",
            description: "Renders role=dialog preview content.",
          },
          {
            part: "Arrow",
            prop: "arrowView(config)",
            type: "function",
            defaultValue: "-",
            description: "Renders an aria-hidden popup arrow.",
          },
        ]),
        apiItems: [],
        accessibilityItems: [
          "Trigger exposes aria-expanded and aria-haspopup=dialog.",
          "Popup content renders role=dialog.",
          "Backdrop has an explicit Close preview card accessible name.",
          "Delayed hover and focus return behavior remain deferred.",
        ],
        coverageItems: [
          "Registry and example scene tests verify closed default state, controlled open state, preview content, backdrop close, and class hooks.",
        ],
      }),
    ]
  );
};

const checkboxDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Checkbox"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A styled, installable Foldkit Checkbox slice built on the official Foldkit Ui.Checkbox primitive. It keeps checked state in a child model while exposing typed messages, OutMessage-compatible state changes, hidden input attributes, disabled state, indeterminate state, and reusable field classes.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/checkbox" },
        {
          label: "Examples",
          value: "basic, labeling, native button, form",
        },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Checkbox v1 documents the stateful boolean-selection path: child-owned checked state, parent message delegation, grouped indeterminate state, and styled control parts that preserve the Foldkit primitive attributes."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-checkbox-basic",
                preview: DocsPreviewsCD.checkboxBasicExamplePreview(
                  model.checkboxBasicExample,
                  "checkbox-docs-basic-preview"
                ),
                href: "/docs/components/checkbox/examples/basic",
                linkText: "Open standalone Checkbox Basic example",
              }),
              docsExampleBlock({
                title: "Indeterminate",
                testId: "docs-example-block-checkbox-indeterminate",
                preview: DocsPreviewsCD.checkboxIndeterminateExamplePreview(
                  model.checkboxIndeterminateExample,
                  "checkbox-docs-indeterminate-preview"
                ),
                href: "/docs/components/checkbox/examples/indeterminate",
                linkText: "Open standalone Checkbox Indeterminate example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/checkbox.json\nbunx shadcn@latest add <registry-url>/checkbox-basic.json\nbunx shadcn@latest add <registry-url>/checkbox-indeterminate.json",
        usageBody:
          "Initialize the checkbox child model in the parent model, delegate child messages through `h.submodel`, and render the supplied checkbox, label, description, and hidden input attributes.",
        usageCode: `import * as Checkbox from "./ui/checkbox";

const [checkbox, checkboxCommands] = Checkbox.init({
  id: "terms-checkbox",
});

h.submodel({
  slotId: model.checkbox.id,
  model: model.checkbox,
  view: Checkbox.view,
  viewInputs: {
    toView: (attributes) => h.button(attributes.checkbox, ["Accept"]),
  },
  toParentMessage: (message) => Main.GotCheckboxMessage({ message }),
});`,
        integrationCode: `// Model
checkbox: Checkbox.Model;

// Message
Main.GotCheckboxMessage({ message: Checkbox.Message });

// Update
GotCheckboxMessage: ({ message }) => {
  const [checkbox, commands] = Checkbox.update(model.checkbox, message);

  return [
    evo(model, { checkbox: () => checkbox }),
    Command.mapMessages(commands, (message) => Main.GotCheckboxMessage({ message })),
  ];
};`,
        anatomySection: docsAnatomyBlock(
          `h.submodel({
  slotId: model.checkbox.id,
  model: model.checkbox,
  view: Checkbox.view,
  viewInputs: {
    name: "terms",
    value: "accepted",
    toView: (attributes) =>
      h.div(
        [h.Class(Checkbox.checkboxRowClassName)],
        [
          h.button(attributes.checkbox, ["✓"]),
          h.input(attributes.hiddenInput),
          h.label(attributes.label, ["Accept terms"]),
          h.p(attributes.description, ["Helper text"]),
        ]
      ),
  },
  toParentMessage: (message) => GotCheckboxMessage({ message }),
});`
        ),
        apiItems: [
          "Model: schema-backed state containing id and isChecked.",
          "init(config): creates a Checkbox model and empty command list for registry consistency.",
          "update(model, message): delegates to Ui.Checkbox.update and returns model, commands, and OutMessage.",
          "setChecked(model, isChecked): programmatically assigns checked state and emits the same OutMessage as user toggles.",
          "reflectChecked(model, isChecked): mirrors external checked state without emitting OutMessage.",
          "view: h.submodel view that exposes checkbox, label, description, and hiddenInput attribute groups.",
        ],
        accessibilityItems: [
          "The visible control receives the Foldkit checkbox role, checked, disabled, and indeterminate attributes.",
          "The label attributes bind the visible label to the checkbox control.",
          "The description attributes provide aria-describedby for explanatory copy.",
          "The hiddenInput attributes preserve form participation when a name and value are supplied.",
        ],
        coverageItems: [
          "Registry scene tests verify label, description, checked toggling, hidden input composition, and disabled state.",
          "Example scene tests verify parent-visible checked feedback and grouped indeterminate behavior.",
          "Docs scene tests verify the shared component page section contract and example block layout.",
        ],
      }),
    ]
  );
};

const baseUiCheckboxDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Checkbox"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A Base UI style-lane Checkbox slice that reuses the official Foldkit Ui.Checkbox primitive for checked, disabled, indeterminate, label, description, and hidden input behavior.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/base-ui-checkbox" },
        { label: "Examples", value: "basic, labeling, native button, form" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Base UI Checkbox documents the simple styled lane: child-owned checked state, parent message delegation, form participation through hidden input attributes, and lightweight class helpers that preserve Foldkit primitive attributes. The examples now cover the current Base UI origin Basic, Labeling, native button rendering, and form integration sections."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-base-ui-checkbox-basic",
                preview: DocsPreviewsCD.baseUiCheckboxBasicExamplePreview(
                  model.baseUiCheckboxBasicExample,
                  "base-ui-checkbox-docs-basic-preview"
                ),
                href: "/docs/components/base-ui-checkbox/examples/basic",
                linkText: "Open standalone Base UI Checkbox Basic example",
              }),
              docsExampleBlock({
                title: "Labeling a checkbox",
                testId: "docs-example-block-base-ui-checkbox-labeling",
                preview: DocsPreviewsCD.baseUiCheckboxLabelingExamplePreview(
                  model.baseUiCheckboxLabelingExample,
                  "base-ui-checkbox-docs-labeling-preview"
                ),
                href: "/docs/components/base-ui-checkbox/examples/labeling",
                linkText: "Open standalone Base UI Checkbox Labeling example",
              }),
              docsExampleBlock({
                title: "Rendering as a native button",
                testId: "docs-example-block-base-ui-checkbox-native-button",
                preview:
                  DocsPreviewsCD.baseUiCheckboxNativeButtonExamplePreview(
                    model.baseUiCheckboxNativeButtonExample,
                    "base-ui-checkbox-docs-native-button-preview"
                  ),
                href: "/docs/components/base-ui-checkbox/examples/native-button",
                linkText:
                  "Open standalone Base UI Checkbox Native Button example",
              }),
              docsExampleBlock({
                title: "Form integration",
                testId: "docs-example-block-base-ui-checkbox-form",
                preview: DocsPreviewsCD.baseUiCheckboxFormExamplePreview(
                  model.baseUiCheckboxFormExample,
                  "base-ui-checkbox-docs-form-preview"
                ),
                href: "/docs/components/base-ui-checkbox/examples/form",
                linkText: "Open standalone Base UI Checkbox Form example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/base-ui-checkbox.json",
        usageBody:
          "Initialize the checkbox child model in the parent model, delegate child messages through `h.submodel`, and render the supplied attribute groups with Base UI class helpers.",
        usageCode: `import * as Checkbox from "./ui/base-ui-checkbox";

h.submodel({
  slotId: model.checkbox.id,
  model: model.checkbox,
  view: Checkbox.view,
  viewInputs: {
    toView: (attributes) =>
      h.button(
        [
          ...attributes.checkbox,
          h.Class(Checkbox.baseUiCheckboxControlClassName),
        ],
        model.checkbox.isChecked ? ["✓"] : []
      ),
  },
  toParentMessage: (message) => Main.GotCheckboxMessage({ message }),
});`,
        integrationCode: `// Model
checkbox: Checkbox.Model;

// Message
Main.GotCheckboxMessage({ message: Checkbox.Message });

// Update
GotCheckboxMessage: ({ message }) => {
  const [checkbox, commands] = Checkbox.update(model.checkbox, message);

  return [
    evo(model, { checkbox: () => checkbox }),
    Command.mapMessages(commands, (message) => Main.GotCheckboxMessage({ message })),
  ];
};`,
        anatomySection: docsAnatomyBlock(
          `h.submodel({
  slotId: model.checkbox.id,
  model: model.checkbox,
  view: Checkbox.view,
  viewInputs: {
    name: "terms",
    value: "accepted",
    toView: (attributes) =>
      h.div(
        [h.Class(Checkbox.baseUiCheckboxRowClassName)],
        [
          h.button(attributes.checkbox, ["✓"]),
          h.input(attributes.hiddenInput),
          h.label(attributes.label, ["Accept terms"]),
          h.p(attributes.description, ["Helper text"]),
        ]
      ),
  },
  toParentMessage: (message) => GotCheckboxMessage({ message }),
});`
        ),
        apiItems: [
          "Model: schema-backed state containing id and isChecked.",
          "init(config): creates a Checkbox model and empty command list for registry consistency.",
          "update(model, message): delegates to Ui.Checkbox.update and returns model, commands, and OutMessage.",
          "setChecked(model, isChecked): programmatically assigns checked state and emits the same OutMessage as user toggles.",
          "reflectChecked(model, isChecked): mirrors external checked state without emitting OutMessage.",
          "view: h.submodel view that exposes checkbox, label, description, and hiddenInput attribute groups.",
          "Class helpers: baseUiCheckboxRowClassName, baseUiCheckboxControlClassName, baseUiCheckboxLabelClassName, baseUiCheckboxDescriptionClassName, and baseUiCheckboxTextClassName.",
        ],
        accessibilityItems: [
          "The visible control receives the Foldkit checkbox role, checked, disabled, and indeterminate attributes.",
          "The label attributes bind the visible label to the checkbox control.",
          "The description attributes provide aria-describedby for explanatory copy.",
          "The hiddenInput attributes preserve form participation when a name and value are supplied.",
        ],
        coverageItems: [
          "Registry scene tests verify checked toggling and disabled state through the Foldkit primitive.",
          "Docs scene tests verify the Base UI lane page replaces the coming-soon sidebar entry.",
          "Registry checks verify metadata, generated JSON, and install compatibility.",
        ],
      }),
    ]
  );
};

const checkboxGroupDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Checkbox Group"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A Base UI-informed checkbox group for shared multi-select state and parent checkbox behavior.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/checkbox-group" },
        { label: "Examples", value: "hero" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Checkbox Group v1 follows Base UI's controlled value-array contract. The parent model owns selectedValues, item helpers toggle individual values, and parentItemView derives checked or mixed state from allValues."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Hero",
                testId: "docs-example-block-checkbox-group-basic",
                preview: DocsPreviewsCD.checkboxGroupBasicExamplePreview(
                  model.checkboxGroupBasicExample,
                  "checkbox-group-docs-basic-preview"
                ),
                href: "/docs/components/checkbox-group/examples/basic",
                linkText: "Open standalone Checkbox Group Basic example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/checkbox-group.json\nbunx shadcn@latest add <registry-url>/checkbox-group-basic.json",
        usageBody:
          "Use CheckboxGroup.groupView for the labelled group, pass selectedValues to each item, and update the parent-owned value array through messages.",
        usageCode: `import * as CheckboxGroup from "./ui/checkbox-group";

CheckboxGroup.groupView<Message>({
  label: "Apples",
  labelId: "apples-label",
  children: [
    CheckboxGroup.itemView<Message>({
      value: "fuji-apple",
      selectedValues: model.selectedApples,
      label: "Fuji",
      onValueChange: ToggledApple({ value: "fuji-apple" }),
    }),
  ],
});`,
        integrationCode: `// Model
selectedApples: S.Array(AppleValue);

// Message
ToggledApple({ value: AppleValue });

// Update
ToggledApple: ({ value }) => [
  evo(model, {
    selectedApples: (selectedApples) =>
      CheckboxGroup.toggleValue(selectedApples, value),
  }),
  [],
];

// Parent checkbox
CheckboxGroup.parentItemView<Message>({
  selectedValues: model.selectedApples,
  allValues: appleValues,
  label: "Apples",
  onValueChange: ToggledAllApples(),
});`,
        anatomySection:
          docsAnatomyBlock(`import * as CheckboxGroup from "./ui/checkbox-group";

CheckboxGroup.groupView<Message>({
  children: [
    CheckboxGroup.parentItemView<Message>({
      selectedValues,
      allValues,
      onValueChange,
    }),
    CheckboxGroup.itemView<Message>({
      value,
      selectedValues,
      onValueChange,
    }),
  ],
});`),
        includeStyling: false,
        includeKeyboardInteraction: false,
        apiReference: docsApiTable([
          {
            part: "Root",
            prop: "groupView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders a labelled role=group wrapper and item container.",
          },
          {
            part: "Item",
            prop: "itemView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders an enclosing label, checkbox root, indicator, and visible item label.",
          },
          {
            part: "Parent",
            prop: "parentItemView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders a parent checkbox that derives checked and mixed state from selectedValues and allValues.",
          },
          {
            part: "Item",
            prop: "selectedValues",
            type: "readonly string[]",
            defaultValue: "-",
            description:
              "Controlled group value array matching Base UI Checkbox Group value semantics.",
          },
          {
            part: "Parent",
            prop: "allValues",
            type: "readonly string[]",
            defaultValue: "-",
            description:
              "All child checkbox values used to derive the parent checkbox state.",
          },
          {
            part: "Utility",
            prop: "toggleValue(selectedValues, value)",
            type: "function",
            defaultValue: "-",
            description:
              "Returns the next controlled value array after toggling one item.",
          },
          {
            part: "Utility",
            prop: "parentState(selectedValues, allValues)",
            type: "function",
            defaultValue: "-",
            description:
              "Returns checked, indeterminate, or unchecked for parent checkbox rendering.",
          },
          {
            part: "Classes",
            prop: "*ClassName exports",
            type: "string",
            defaultValue: "-",
            description:
              "Default class exports exist for Root, Caption, Items, Item, Control, and Indicator.",
          },
        ]),
        apiItems: [],
        accessibilityItems: [
          "Root renders role=group and is labelled by the visible caption.",
          "Items render role=checkbox with aria-checked true, false, or mixed.",
          "The enclosing label pattern makes visible text clickable, matching Base UI's checkbox group guidance.",
          "Disabled items expose aria-disabled and do not attach click handling.",
        ],
        coverageItems: [
          "Registry scene tests verify group labelling, item toggling, label-click behavior, and parent mixed state.",
          "Example scene tests verify the Base UI hero apple-selection behavior.",
          "Registry checks verify metadata, generated JSON, example coverage, and docs nav origin grouping.",
        ],
      }),
    ]
  );
};

const accordionDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Accordion"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A Base UI-informed accordion for grouped collapsible panels with parent-owned open state.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/accordion" },
        { label: "Examples", value: "hero" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Accordion v1 follows Base UI's Root, Item, Header, Trigger, and Panel anatomy. The parent model owns the open value array, so one or more panels can be open at the same time."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Single panel",
                testId: "docs-example-block-accordion-basic",
                preview: DocsPreviewsAccordion.accordionBasicExamplePreview(
                  model.accordionBasicExample,
                  "accordion-docs-basic-preview"
                ),
                href: "/docs/components/accordion/examples/basic",
                linkText: "Open standalone Accordion Basic example",
              }),
              docsExampleBlock({
                title: "Open multiple panels",
                testId: "docs-example-block-accordion-multiple",
                preview: DocsPreviewsAccordion.accordionMultipleExamplePreview(
                  model.accordionMultipleExample,
                  "accordion-docs-multiple-preview"
                ),
                href: "/docs/components/accordion/examples/multiple",
                linkText: "Open standalone Accordion Multiple example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/accordion.json\nbunx shadcn@latest add <registry-url>/accordion-basic.json\nbunx shadcn@latest add <registry-url>/accordion-multiple.json",
        usageBody:
          "Use Accordion.rootView with parent-owned openValues, then render Item helpers with title, value, trigger message, and panel children. Store one value for single-panel behavior or toggle values in an array for multiple open panels.",
        usageCode: `import * as Accordion from "./ui/accordion";

Accordion.rootView<Message>({
  openValues: model.openValues,
  children: [
    Accordion.itemView<Message>({
      value: "base-ui",
      openValues: model.openValues,
      title: "What is Base UI?",
      onValueChange: ToggledPanel({ value: "base-ui" }),
      children,
    }),
  ],
});`,
        integrationCode: `// Model
openValues: S.Array(AccordionValue);

// Message
ToggledPanel({ value: AccordionValue });

// Update
ToggledPanel: ({ value }) => [
  evo(model, {
    openValues: (openValues) =>
      Accordion.toggleValue(openValues, value),
  }),
  [],
];`,
        anatomySection:
          docsAnatomyBlock(`import * as Accordion from "./ui/accordion";

Accordion.rootView<Message>({
  children: [
    Accordion.itemView<Message>({
      value,
      openValues,
      title,
      onValueChange,
      children: [panelContent],
    }),
  ],
});`),
        includeStyling: false,
        includeKeyboardInteraction: false,
        apiReference: docsApiTable([
          {
            part: "Root",
            prop: "rootView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders the accordion root and exposes open value metadata through data-values.",
          },
          {
            part: "Item",
            prop: "itemView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders Item, Header, Trigger, and Panel anatomy for one accordion panel.",
          },
          {
            part: "Root",
            prop: "openValues",
            type: "readonly string[]",
            defaultValue: "[]",
            description:
              "Controlled value array matching Base UI Accordion value semantics.",
          },
          {
            part: "Item",
            prop: "value",
            type: "string",
            defaultValue: "-",
            description:
              "Unique item value used to decide whether the panel is open.",
          },
          {
            part: "Item",
            prop: "disabled",
            type: "boolean",
            defaultValue: "false",
            description:
              "Disables the trigger and exposes data-disabled state on item and trigger.",
          },
          {
            part: "Utility",
            prop: "toggleValue(openValues, value)",
            type: "function",
            defaultValue: "-",
            description:
              "Returns the next controlled open value array after toggling one item.",
          },
          {
            part: "Classes",
            prop: "*ClassName exports",
            type: "string",
            defaultValue: "-",
            description:
              "Default class exports exist for Root, Item, Header, Trigger, Icon, and Panel.",
          },
        ]),
        apiItems: [],
        accessibilityItems: [
          "Each Trigger is a native button with aria-expanded and aria-controls.",
          "Each open Panel renders role=region and is labelled by its Trigger.",
          "Disabled items render disabled triggers and data-disabled state.",
          "Arrow-key roving focus is deferred until the Foldkit managed-focus slice.",
        ],
        coverageItems: [
          "Registry scene tests verify trigger state, panel rendering, multiple open panels, close behavior, disabled state, and utility output.",
          "Example scene tests verify the Base UI single-panel and open-multiple-panels examples.",
          "Registry checks verify metadata, generated JSON, example coverage, and docs nav origin grouping.",
        ],
      }),
    ]
  );
};

const breadcrumbDocsView = (model: Model): Html => {
  const h = html<Message>();
  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Breadcrumb"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A shadcn-style breadcrumb component for displaying the path to the current resource using a hierarchy of links.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/breadcrumb" },
        {
          label: "Examples",
          value: "basic, separator, dropdown, collapsed, link, RTL",
        },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Breadcrumb v1 mirrors the shadcn anatomy: Root nav, ordered List, Item, Link, Page, Separator, and Ellipsis. Links are ordinary anchors, the current page exposes aria-current=page, separators are aria-hidden, and the dropdown example keeps open state in the parent Foldkit model."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-breadcrumb-basic",
                preview: DocsPreviewsB.breadcrumbBasicExamplePreview(
                  model.breadcrumbBasicExample,
                  "breadcrumb-docs-basic-preview"
                ),
                href: "/docs/components/breadcrumb/examples/basic",
                linkText: "Open standalone Breadcrumb Basic example",
              }),
              docsExampleBlock({
                title: "Custom separator",
                testId: "docs-example-block-breadcrumb-separator",
                preview: DocsPreviewsB.breadcrumbSeparatorExamplePreview(
                  model.breadcrumbSeparatorExample,
                  "breadcrumb-docs-separator-preview"
                ),
                href: "/docs/components/breadcrumb/examples/separator",
                linkText: "Open standalone Breadcrumb Separator example",
              }),
              docsExampleBlock({
                title: "Dropdown",
                testId: "docs-example-block-breadcrumb-dropdown",
                preview: DocsPreviewsB.breadcrumbDropdownExamplePreview(
                  model.breadcrumbDropdownExample,
                  "breadcrumb-docs-dropdown-preview"
                ),
                href: "/docs/components/breadcrumb/examples/dropdown",
                linkText: "Open standalone Breadcrumb Dropdown example",
              }),
              docsExampleBlock({
                title: "Collapsed",
                testId: "docs-example-block-breadcrumb-collapsed",
                preview: DocsPreviewsB.breadcrumbCollapsedExamplePreview(
                  model.breadcrumbCollapsedExample,
                  "breadcrumb-docs-collapsed-preview"
                ),
                href: "/docs/components/breadcrumb/examples/collapsed",
                linkText: "Open standalone Breadcrumb Collapsed example",
              }),
              docsExampleBlock({
                title: "Link component",
                testId: "docs-example-block-breadcrumb-link",
                preview: DocsPreviewsB.breadcrumbLinkExamplePreview(
                  model.breadcrumbLinkExample,
                  "breadcrumb-docs-link-preview"
                ),
                href: "/docs/components/breadcrumb/examples/link",
                linkText: "Open standalone Breadcrumb Link example",
              }),
              docsExampleBlock({
                title: "RTL",
                testId: "docs-example-block-breadcrumb-rtl",
                preview: DocsPreviewsB.breadcrumbRtlExamplePreview(
                  model.breadcrumbRtlExample,
                  "breadcrumb-docs-rtl-preview"
                ),
                href: "/docs/components/breadcrumb/examples/rtl",
                linkText: "Open standalone Breadcrumb RTL example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/breadcrumb.json\nbunx shadcn@latest add <registry-url>/breadcrumb-basic.json\nbunx shadcn@latest add <registry-url>/breadcrumb-separator.json\nbunx shadcn@latest add <registry-url>/breadcrumb-dropdown.json\nbunx shadcn@latest add <registry-url>/breadcrumb-collapsed.json\nbunx shadcn@latest add <registry-url>/breadcrumb-link.json\nbunx shadcn@latest add <registry-url>/breadcrumb-rtl.json",
        usageBody:
          "Use Breadcrumb.view for simple paths, or compose Root/List/Item/Link/Page/Separator/Ellipsis for custom separators, collapsed ranges, and parent-owned dropdowns.",
        usageCode:
          'import * as Breadcrumb from "./ui/breadcrumb";\n\nBreadcrumb.view<Message>([\n  { label: "Home", href: "/" },\n  { label: "Components", href: "/components" },\n  { label: "Breadcrumb" },\n]);',
        integrationCode: "open: S.Boolean; // dropdown example only",
        anatomySection: docsAnatomyBlock(
          "Breadcrumb.rootView({ children: [Breadcrumb.listView({ children: [item, separator, item] })] });"
        ),
        includeStyling: false,
        includeKeyboardInteraction: false,
        apiReference: docsApiTable([
          {
            part: "Root",
            prop: "rootView(config)",
            type: "function",
            defaultValue: "-",
            description: "Renders nav[aria-label=breadcrumb].",
          },
          {
            part: "List",
            prop: "listView(config)",
            type: "function",
            defaultValue: "-",
            description: "Renders the ordered breadcrumb list.",
          },
          {
            part: "Link",
            prop: "linkView(config)",
            type: "function",
            defaultValue: "-",
            description: "Renders a navigable anchor.",
          },
          {
            part: "Page",
            prop: "pageView(config)",
            type: "function",
            defaultValue: "-",
            description: "Renders current page with aria-current=page.",
          },
          {
            part: "Separator",
            prop: "separatorView(config)",
            type: "function",
            defaultValue: "›",
            description: "Renders an aria-hidden separator.",
          },
          {
            part: "Ellipsis",
            prop: "ellipsisView(config)",
            type: "function",
            defaultValue: "More",
            description: "Renders collapsed range affordance.",
          },
        ]),
        apiItems: [],
        accessibilityItems: [
          "Root renders a named navigation landmark.",
          "Current page exposes aria-current=page.",
          "Separators are aria-hidden; dropdown trigger has an explicit accessible label.",
        ],
        coverageItems: [
          "Registry scene tests verify landmark, links, current page, separators, ellipsis, and inert static content.",
          "Example scene tests verify the shadcn Basic, Custom separator, Dropdown, Collapsed, Link component, and RTL examples.",
          "Registry checks verify metadata, generated JSON, source snapshots, example coverage, and docs nav origin grouping.",
        ],
      }),
    ]
  );
};

const buttonGroupDocsView = (model: Model): Html => {
  const h = html<Message>();

  const exampleBlock = (
    title: string,
    slug: string,
    preview: Html,
    href: string
  ): Html =>
    docsExampleBlock({
      title,
      testId: `docs-example-block-button-group-${slug}`,
      preview,
      href,
      linkText: `Open standalone Button Group ${title} example`,
    });

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Button Group"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A shadcn-style grouping primitive for visually joining related buttons, inputs, and composed controls while preserving native control semantics.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/button-group" },
        {
          label: "Examples",
          value:
            "basic, orientation, size, nested, separator, split, input, input-group, select, popover, RTL",
        },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Button Group v1 mirrors the current shadcn layout contract: the parent owns no state, exposes role=group with optional aria-label, supports horizontal and vertical orientation, and provides item, separator, and text helpers for composing native controls. The upstream Dropdown demo is deferred until a dropdown-menu registry primitive exists."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              exampleBlock(
                "Basic",
                "basic",
                DocsPreviewsB.buttonGroupBasicExamplePreview(
                  model.buttonGroupBasicExample,
                  "button-group-docs-basic-preview"
                ),
                "/docs/components/shadcn-button-group/examples/basic"
              ),
              exampleBlock(
                "Orientation",
                "orientation",
                DocsPreviewsB.buttonGroupOrientationExamplePreview(
                  model.buttonGroupOrientationExample,
                  "button-group-docs-orientation-preview"
                ),
                "/docs/components/shadcn-button-group/examples/orientation"
              ),
              exampleBlock(
                "Size",
                "size",
                DocsPreviewsB.buttonGroupSizeExamplePreview(
                  model.buttonGroupSizeExample,
                  "button-group-docs-size-preview"
                ),
                "/docs/components/shadcn-button-group/examples/size"
              ),
              exampleBlock(
                "Nested",
                "nested",
                DocsPreviewsB.buttonGroupNestedExamplePreview(
                  model.buttonGroupNestedExample,
                  "button-group-docs-nested-preview"
                ),
                "/docs/components/shadcn-button-group/examples/nested"
              ),
              exampleBlock(
                "Separator",
                "separator",
                DocsPreviewsB.buttonGroupSeparatorExamplePreview(
                  model.buttonGroupSeparatorExample,
                  "button-group-docs-separator-preview"
                ),
                "/docs/components/shadcn-button-group/examples/separator"
              ),
              exampleBlock(
                "Split",
                "split",
                DocsPreviewsB.buttonGroupSplitExamplePreview(
                  model.buttonGroupSplitExample,
                  "button-group-docs-split-preview"
                ),
                "/docs/components/shadcn-button-group/examples/split"
              ),
              exampleBlock(
                "Input",
                "input",
                DocsPreviewsB.buttonGroupInputExamplePreview(
                  model.buttonGroupInputExample,
                  "button-group-docs-input-preview"
                ),
                "/docs/components/shadcn-button-group/examples/input"
              ),
              exampleBlock(
                "Input group",
                "input-group",
                DocsPreviewsB.buttonGroupInputGroupExamplePreview(
                  model.buttonGroupInputGroupExample,
                  "button-group-docs-input-group-preview"
                ),
                "/docs/components/shadcn-button-group/examples/input-group"
              ),
              exampleBlock(
                "Select",
                "select",
                DocsPreviewsB.buttonGroupSelectExamplePreview(
                  model.buttonGroupSelectExample,
                  "button-group-docs-select-preview"
                ),
                "/docs/components/shadcn-button-group/examples/select"
              ),
              exampleBlock(
                "Popover",
                "popover",
                DocsPreviewsB.buttonGroupPopoverExamplePreview(
                  model.buttonGroupPopoverExample,
                  "button-group-docs-popover-preview"
                ),
                "/docs/components/shadcn-button-group/examples/popover"
              ),
              exampleBlock(
                "RTL",
                "rtl",
                DocsPreviewsB.buttonGroupRtlExamplePreview(
                  model.buttonGroupRtlExample,
                  "button-group-docs-rtl-preview"
                ),
                "/docs/components/shadcn-button-group/examples/rtl"
              ),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/shadcn-button-group.json\nbunx shadcn@latest add <registry-url>/button-group-basic.json\nbunx shadcn@latest add <registry-url>/button-group-orientation.json\nbunx shadcn@latest add <registry-url>/button-group-size.json\nbunx shadcn@latest add <registry-url>/button-group-nested.json\nbunx shadcn@latest add <registry-url>/button-group-separator.json\nbunx shadcn@latest add <registry-url>/button-group-split.json\nbunx shadcn@latest add <registry-url>/button-group-input.json\nbunx shadcn@latest add <registry-url>/button-group-input-group.json\nbunx shadcn@latest add <registry-url>/button-group-select.json\nbunx shadcn@latest add <registry-url>/button-group-popover.json\nbunx shadcn@latest add <registry-url>/button-group-rtl.json",
        usageBody:
          "Compose ButtonGroup.view around itemView children. The group stays state-free; child buttons, inputs, selects, and popovers keep their own Foldkit message/update contracts.",
        usageCode: `import * as ButtonGroup from "./ui/button-group";

ButtonGroup.view<Message>({
  ariaLabel: "Report actions",
  children: [
    ButtonGroup.itemView<Message>({
      children: [h.button([h.Type("button")], ["Archive Report"])],
    }),
    ButtonGroup.separatorView<Message>(),
    ButtonGroup.itemView<Message>({
      children: [h.button([h.Type("button")], ["Snooze"])],
    }),
  ],
});`,
        integrationCode: `ButtonGroup.view<Message>({
  orientation: "vertical",
  ariaLabel: "Quantity controls",
  children: [
    ButtonGroup.itemView<Message>({ children: [increaseButton] }),
    ButtonGroup.itemView<Message>({ children: [decreaseButton] }),
  ],
});`,
        anatomySection:
          docsAnatomyBlock(`import * as ButtonGroup from "./ui/button-group";

ButtonGroup.view<Message>({
  children: [
    ButtonGroup.itemView<Message>({ children: [button] }),
    ButtonGroup.separatorView<Message>(),
    ButtonGroup.textView<Message>({ children: ["$"] }),
  ],
});`),
        apiItems: [
          "view(config): renders a horizontal or vertical group with optional aria-label and className override.",
          "itemView(config): wraps native controls without changing their message or accessibility contract.",
          "separatorView(config): renders an inert visual separator for split controls.",
          "textView(config): renders non-interactive inline text inside the group.",
        ],
        accessibilityItems: [
          "The root exposes role=group and should receive aria-label when the grouped controls need a shared name.",
          "Buttons, inputs, selects, and popovers remain native or delegated Foldkit controls.",
          "Separators are aria-hidden and do not receive event handlers.",
          'RTL behavior is inherited from the surrounding document or h.Dir("rtl") container.',
        ],
        coverageItems: [
          "Registry scene tests verify labelled groups, orientation metadata, buttons, and inert separators.",
          "Example scene tests verify Basic, Orientation, Size, Nested, Separator, Split, Input, Input group, Select, Popover, and RTL demos.",
          "Registry checks verify metadata, generated JSON, example coverage, and docs nav origin grouping.",
        ],
      }),
    ]
  );
};

const alertDialogDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Alert Dialog"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A Base UI-informed alert dialog component for controlled destructive confirmations.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/alert-dialog" },
        { label: "Examples", value: "default" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Alert Dialog v1 follows Base UI Root, Trigger, Portal, Backdrop, Viewport, Popup, Title, Description, and Close anatomy. The default demo opens Discard draft, shows Discard draft?, You can't undo this action., Cancel, and Discard."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          docsExampleBlock({
            title: "Default",
            testId: "docs-example-block-alert-dialog-basic",
            preview: DocsPreviewsAlert.alertDialogBasicExamplePreview(
              model.alertDialogBasicExample,
              "alert-dialog-docs-basic-preview"
            ),
            href: "/docs/components/alert-dialog/examples/basic",
            linkText: "Open standalone Alert Dialog Basic example",
          }),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/alert-dialog.json\nbunx shadcn@latest add <registry-url>/alert-dialog-basic.json",
        usageBody:
          "Keep open/confirmed state in the parent Foldkit model and compose the alert dialog parts inside AlertDialog.rootView.",
        usageCode: 'import * as AlertDialog from "./ui/alert-dialog";',
        integrationCode: "open: S.Boolean;\ndiscarded: S.Boolean;",
        anatomySection: docsAnatomyBlock(
          "AlertDialog.rootView({ children: [trigger, portal] });"
        ),
        includeStyling: false,
        includeKeyboardInteraction: false,
        apiReference: docsApiTable([
          {
            part: "Root",
            prop: "rootView(config)",
            type: "function",
            defaultValue: "-",
            description: "Groups trigger and portal content.",
          },
          {
            part: "Trigger",
            prop: "triggerView(config)",
            type: "function",
            defaultValue: "-",
            description: "Renders the opener button.",
          },
          {
            part: "Portal",
            prop: "portalView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Conditionally renders dialog overlay content when open.",
          },
          {
            part: "Popup",
            prop: "popupView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders role=alertdialog with aria-modal, aria-labelledby, and aria-describedby.",
          },
          {
            part: "Close",
            prop: "closeView(config)",
            type: "function",
            defaultValue: "-",
            description: "Renders cancel or confirm action buttons.",
          },
        ]),
        apiItems: [],
        accessibilityItems: [
          "Popup renders role=alertdialog with labelled title and description.",
          "Cancel and confirm actions are native buttons.",
        ],
        coverageItems: [
          "Registry and example scene tests verify open, labelling, cancel/confirm actions, and default demo content.",
        ],
      }),
    ]
  );
};

const alertDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Alert"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A shadcn-style alert component for inline status, notices, and destructive messages.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/alert" },
        { label: "Examples", value: "default, action, destructive" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Alert v1 mirrors the shadcn static alert pattern: a role=alert root, optional icon, content area, title, description, optional action slot, and Default or Destructive variant styling."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Default",
                testId: "docs-example-block-alert-basic",
                preview: DocsPreviewsAlert.alertBasicExamplePreview(
                  model.alertBasicExample,
                  "alert-docs-basic-preview"
                ),
                href: "/docs/components/alert/examples/basic",
                linkText: "Open standalone Alert Basic example",
              }),
              docsExampleBlock({
                title: "Action",
                testId: "docs-example-block-alert-action",
                preview: DocsPreviewsAlert.alertActionExamplePreview(
                  model.alertActionExample,
                  "alert-docs-action-preview"
                ),
                href: "/docs/components/alert/examples/action",
                linkText: "Open standalone Alert Action example",
              }),
              docsExampleBlock({
                title: "Destructive",
                testId: "docs-example-block-alert-destructive",
                preview: DocsPreviewsAlert.alertDestructiveExamplePreview(
                  model.alertDestructiveExample,
                  "alert-docs-destructive-preview"
                ),
                href: "/docs/components/alert/examples/destructive",
                linkText: "Open standalone Alert Destructive example",
              }),
              docsExampleBlock({
                title: "Custom Colors",
                testId: "docs-example-block-alert-custom-colors",
                preview: DocsPreviewsAlert.alertCustomColorsExamplePreview(
                  model.alertCustomColorsExample,
                  "alert-docs-custom-colors-preview"
                ),
                href: "/docs/components/alert/examples/custom-colors",
                linkText: "Open standalone Alert Custom Colors example",
              }),
              docsExampleBlock({
                title: "RTL",
                testId: "docs-example-block-alert-rtl",
                preview: DocsPreviewsAlert.alertRtlExamplePreview(
                  model.alertRtlExample,
                  "alert-docs-rtl-preview"
                ),
                href: "/docs/components/alert/examples/rtl",
                linkText: "Open standalone Alert RTL example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/alert.json\nbunx shadcn@latest add <registry-url>/alert-basic.json\nbunx shadcn@latest add <registry-url>/alert-action.json\nbunx shadcn@latest add <registry-url>/alert-destructive.json\nbunx shadcn@latest add <registry-url>/alert-custom-colors.json\nbunx shadcn@latest add <registry-url>/alert-rtl.json",
        usageBody:
          "Render Alert.view for the common title and description case, or compose Root, Icon, Content, Title, Description, and Action helpers when the parent view needs custom structure.",
        usageCode: `import * as Alert from "./ui/alert";

Alert.view<Message>({
  title: "Heads up!",
  description: "You can add components using the cli.",
});`,
        integrationCode: `// Model
status: Status;

// View
StatusAlert.view(model.status);`,
        anatomySection: docsAnatomyBlock(`Alert.rootView<Message>({
  children: [
    Alert.iconView<Message>({ children: [icon] }),
    Alert.contentView<Message>({
      children: [
        Alert.titleView<Message>({ children: [title] }),
        Alert.descriptionView<Message>({ children: [description] }),
      ],
    }),
  ],
});`),
        includeStyling: false,
        includeKeyboardInteraction: false,
        apiReference: docsApiTable([
          {
            part: "Root",
            prop: "rootView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders the role=alert container with variant metadata.",
          },
          {
            part: "Icon",
            prop: "iconView(config)",
            type: "function",
            defaultValue: "-",
            description: "Renders an aria-hidden leading icon slot.",
          },
          {
            part: "Title",
            prop: "titleView(config)",
            type: "function",
            defaultValue: "-",
            description: "Renders the alert heading.",
          },
          {
            part: "Description",
            prop: "descriptionView(config)",
            type: "function",
            defaultValue: "-",
            description: "Renders supporting alert body copy.",
          },
          {
            part: "Action",
            prop: "actionView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders an optional action slot below the description.",
          },
          {
            part: "Variant",
            prop: "variant",
            type: '"Default" | "Destructive"',
            defaultValue: '"Default"',
            description: "Controls alert color tokens and data-variant.",
          },
        ]),
        apiItems: [],
        accessibilityItems: [
          "Root renders role=alert so assistive technology treats the message as status content.",
          "Icon slots are aria-hidden; title and description carry the accessible message.",
          "Action content remains ordinary Foldkit Html, so parent components own labels and behavior.",
        ],
        coverageItems: [
          "Registry scene tests verify role, anatomy helpers, variants, and action slot rendering.",
          "Example scene tests verify the default and destructive shadcn examples.",
          "Registry checks verify metadata, generated JSON, source snapshots, example coverage, and docs nav origin grouping.",
        ],
      }),
    ]
  );
};

const aspectRatioDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Aspect Ratio"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A shadcn-style layout component for reserving a fixed width-to-height ratio around caller-owned media or content.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/aspect-ratio" },
        { label: "Examples", value: "default, square, portrait, RTL" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Aspect Ratio v1 mirrors the shadcn layout contract: ratio is required, the root exposes data-ratio and CSS aspect-ratio, and children remain ordinary Foldkit Html. The docs include the default, Square, Portrait, and RTL examples from the current shadcn page."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Default",
                testId: "docs-example-block-aspect-ratio-basic",
                preview: DocsPreviewsAspect.aspectRatioBasicExamplePreview(
                  model.aspectRatioBasicExample,
                  "aspect-ratio-docs-basic-preview"
                ),
                href: "/docs/components/aspect-ratio/examples/basic",
                linkText: "Open standalone Aspect Ratio Basic example",
              }),
              docsExampleBlock({
                title: "Square",
                testId: "docs-example-block-aspect-ratio-square",
                preview: DocsPreviewsAspect.aspectRatioSquareExamplePreview(
                  model.aspectRatioSquareExample,
                  "aspect-ratio-docs-square-preview"
                ),
                href: "/docs/components/aspect-ratio/examples/square",
                linkText: "Open standalone Aspect Ratio Square example",
              }),
              docsExampleBlock({
                title: "Portrait",
                testId: "docs-example-block-aspect-ratio-portrait",
                preview: DocsPreviewsAspect.aspectRatioPortraitExamplePreview(
                  model.aspectRatioPortraitExample,
                  "aspect-ratio-docs-portrait-preview"
                ),
                href: "/docs/components/aspect-ratio/examples/portrait",
                linkText: "Open standalone Aspect Ratio Portrait example",
              }),
              docsExampleBlock({
                title: "RTL",
                testId: "docs-example-block-aspect-ratio-rtl",
                preview: DocsPreviewsAspect.aspectRatioRtlExamplePreview(
                  model.aspectRatioRtlExample,
                  "aspect-ratio-docs-rtl-preview"
                ),
                href: "/docs/components/aspect-ratio/examples/rtl",
                linkText: "Open standalone Aspect Ratio RTL example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/aspect-ratio.json\nbunx shadcn@latest add <registry-url>/aspect-ratio-basic.json\nbunx shadcn@latest add <registry-url>/aspect-ratio-square.json\nbunx shadcn@latest add <registry-url>/aspect-ratio-portrait.json\nbunx shadcn@latest add <registry-url>/aspect-ratio-rtl.json",
        usageBody:
          "Use AspectRatio.rootView when the child content is custom, or AspectRatio.view for the common image case. The parent view chooses the ratio and owns the children.",
        usageCode: `import * as AspectRatio from "./ui/aspect-ratio";

AspectRatio.rootView<Message>({
  ratio: 16 / 9,
  children: [image],
});`,
        integrationCode: `// View-only layout contract
AspectRatio.view<Message>({
  ratio: 16 / 9,
  src,
  alt: "Photo",
});`,
        anatomySection: docsAnatomyBlock(`AspectRatio.rootView<Message>({
  ratio,
  children: [
    AspectRatio.imageView<Message>({ src, alt }),
    AspectRatio.captionView<Message>({ children: [caption] }),
  ],
});`),
        includeStyling: false,
        includeKeyboardInteraction: false,
        apiReference: docsApiTable([
          {
            part: "Root",
            prop: "rootView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders the fixed-ratio container with data-ratio and CSS aspect-ratio.",
          },
          {
            part: "Root",
            prop: "ratio",
            type: "number",
            defaultValue: "-",
            description:
              "Required width divided by height value such as 16 / 9, 1, or 9 / 16.",
          },
          {
            part: "Image",
            prop: "imageView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders an image that fills the root and uses object-cover styling.",
          },
          {
            part: "Caption",
            prop: "captionView(config)",
            type: "function",
            defaultValue: "-",
            description: "Renders an optional bottom overlay caption.",
          },
          {
            part: "Data",
            prop: "data-ratio",
            type: "string",
            defaultValue: "String(ratio)",
            description:
              "Exposes the public ratio state for styling and tests.",
          },
        ]),
        apiItems: [],
        accessibilityItems: [
          "Aspect Ratio itself is presentational; accessible names come from child content such as image alt text.",
          "The root does not add keyboard behavior or focus management.",
          'RTL layout is inherited from h.Dir("rtl") on the surrounding container.',
        ],
        coverageItems: [
          "Registry scene tests verify image content, caption content, class hooks, and inert static behavior.",
          "Example scene tests verify default, square, portrait, and RTL shadcn examples.",
          "Registry checks verify metadata, generated JSON, source snapshots, example coverage, and docs nav origin grouping.",
        ],
      }),
    ]
  );
};

const drawerDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Drawer"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            ["A Base UI-informed drawer component for controlled side panels."]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/drawer" },
        { label: "Examples", value: "default" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Drawer v1 follows Base UI Root, Trigger, Portal, Backdrop, Viewport, Popup, Content, Title, Description, and Close anatomy. The default demo opens a side panel titled Drawer with the upstream description and Close action. Swipe gestures, snap points, nested stacking, indent provider, mobile navigation, detached trigger handles, and animation lifecycle are intentionally deferred."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          docsExampleBlock({
            title: "Default",
            testId: "docs-example-block-drawer-basic",
            preview: DocsPreviewsCD.drawerBasicExamplePreview(
              model.drawerBasicExample,
              "drawer-docs-basic-preview"
            ),
            href: "/docs/components/drawer/examples/basic",
            linkText: "Open standalone Drawer Basic example",
          }),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/drawer.json\nbunx shadcn@latest add <registry-url>/drawer-basic.json",
        usageBody:
          "Keep open state in the parent Foldkit model and compose the drawer parts inside Drawer.rootView.",
        usageCode: 'import * as Drawer from "./ui/drawer";',
        integrationCode: "open: S.Boolean;",
        anatomySection: docsAnatomyBlock(
          "Drawer.rootView({ children: [trigger, portal] });"
        ),
        includeStyling: false,
        includeKeyboardInteraction: false,
        apiReference: docsApiTable([
          {
            part: "Root",
            prop: "rootView(config)",
            type: "function",
            defaultValue: "-",
            description: "Groups trigger and portal content.",
          },
          {
            part: "Trigger",
            prop: "triggerView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders the opener button and emits the parent message.",
          },
          {
            part: "Portal",
            prop: "portalView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders drawer overlay content only when open is true.",
          },
          {
            part: "Popup",
            prop: "popupView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders the dialog surface with aria-modal, labelledby, and describedby attributes.",
          },
          {
            part: "Close",
            prop: "closeView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders the close button and emits the parent message.",
          },
        ]),
        apiItems: [],
        accessibilityItems: [
          "Popup renders role=dialog with aria-modal=true, aria-labelledby, and aria-describedby.",
          "Trigger and Close render native button elements.",
          "Parent-owned state keeps the open/closed source of truth in the Foldkit model.",
        ],
        coverageItems: [
          "Registry and example scene tests verify open state, dialog labelling, default content, and close behavior.",
        ],
      }),
    ]
  );
};

const contextMenuDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Context Menu"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A Base UI-informed context menu component for controlled right-click command menus.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/context-menu" },
        { label: "Examples", value: "default" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Context Menu v1 follows Base UI Trigger, Portal, Positioner, Popup, Item, and Separator anatomy. The default demo opens Right click here and lists Add to Library, Add to Playlist, Play Next, Play Last, Favorite, and Share with separator groups. Native pointer-coordinate positioning, long press, nested submenus, shared menu foundations, roving focus, and typeahead remain deferred."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          docsExampleBlock({
            title: "Default",
            testId: "docs-example-block-context-menu-basic",
            preview: DocsPreviewsCD.contextMenuBasicExamplePreview(
              model.contextMenuBasicExample,
              "context-menu-docs-basic-preview"
            ),
            href: "/docs/components/context-menu/examples/basic",
            linkText: "Open standalone Context Menu Basic example",
          }),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/context-menu.json\nbunx shadcn@latest add <registry-url>/context-menu-basic.json",
        usageBody:
          "Keep open and selected command state in the parent Foldkit model and compose Trigger, Portal, Positioner, Popup, Item, and Separator parts inside ContextMenu.rootView.",
        usageCode: 'import * as ContextMenu from "./ui/context-menu";',
        integrationCode: "open: S.Boolean;\nselected: S.String;",
        anatomySection: docsAnatomyBlock(
          "ContextMenu.rootView({ children: [trigger, portal] });"
        ),
        includeStyling: false,
        includeKeyboardInteraction: false,
        apiReference: docsApiTable([
          {
            part: "Root",
            prop: "rootView(config)",
            type: "function",
            defaultValue: "-",
            description: "Groups trigger and portal content.",
          },
          {
            part: "Trigger",
            prop: "triggerView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders the right-click target with role=button and aria-haspopup=menu.",
          },
          {
            part: "Portal",
            prop: "portalView(config)",
            type: "function",
            defaultValue: "-",
            description: "Renders menu overlay content only when open is true.",
          },
          {
            part: "Popup",
            prop: "popupView(config)",
            type: "function",
            defaultValue: "-",
            description: "Renders the menu surface with role=menu.",
          },
          {
            part: "Item",
            prop: "itemView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders a native button menuitem that emits the parent selection message.",
          },
          {
            part: "Separator",
            prop: "separatorView(config)",
            type: "function",
            defaultValue: "-",
            description: "Renders role=separator between item groups.",
          },
        ]),
        apiItems: [],
        accessibilityItems: [
          "Trigger exposes role=button and aria-haspopup=menu.",
          "Popup renders role=menu and items render role=menuitem.",
          "Separators render role=separator between item groups.",
          "Roving focus and typeahead are deferred until a shared menu foundation exists.",
        ],
        coverageItems: [
          "Registry and example scene tests verify open state, default items, separator class hooks, selection, and close behavior.",
        ],
      }),
    ]
  );
};

const menubarDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Menubar"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A Base UI-informed controlled menubar for horizontal application commands.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/menubar" },
        { label: "Examples", value: "default" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Menubar v1 follows Base UI Root, Menu, Trigger, Popup, Item, and Separator anatomy. The default demo starts closed, lets File, Edit, View, and Help triggers control their own open state, gives each trigger popup content, and closes after item selection. Horizontal arrow-key navigation, roving focus, and submenu handoff remain deferred."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          docsExampleBlock({
            title: "Default",
            testId: "docs-example-block-menubar-basic",
            preview: DocsPreviewsJM.menubarBasicExamplePreview(
              model.menubarBasicExample,
              "menubar-docs-basic-preview"
            ),
            href: "/docs/components/menubar/examples/basic",
            linkText: "Open standalone Menubar Basic example",
          }),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/menubar.json\nbunx shadcn@latest add <registry-url>/menubar-basic.json",
        usageBody:
          "Keep open menu and selected command state in the parent Foldkit model, then compose Menu, Trigger, Popup, Item, and Separator parts inside Menubar.rootView.",
        usageCode: 'import * as Menubar from "./ui/menubar";',
        integrationCode: "openMenu: S.String;\nselected: S.String;",
        anatomySection: docsAnatomyBlock(
          "Menubar.rootView({ children: [fileMenu, editMenu, viewMenu, helpMenu] });"
        ),
        includeStyling: false,
        includeKeyboardInteraction: false,
        apiReference: docsApiTable([
          {
            part: "Root",
            prop: "rootView(config)",
            type: "function",
            defaultValue: "-",
            description: "Renders role=menubar around menu groups.",
          },
          {
            part: "Menu",
            prop: "menuView(config)",
            type: "function",
            defaultValue: "-",
            description: "Groups one trigger and optional popup content.",
          },
          {
            part: "Trigger",
            prop: "triggerView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders a menuitem trigger with aria-haspopup and aria-expanded state.",
          },
          {
            part: "Popup",
            prop: "popupView(config)",
            type: "function",
            defaultValue: "-",
            description: "Renders role=menu popup content when open is true.",
          },
          {
            part: "Item",
            prop: "itemView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders role=menuitem content and can emit a parent selection message.",
          },
        ]),
        apiItems: [],
        accessibilityItems: [
          "Root renders role=menubar.",
          "Triggers render role=menuitem, aria-haspopup=menu, and aria-expanded.",
          "Popup content renders role=menu with role=menuitem children while open.",
          "Arrow-key navigation, roving focus, and submenu handoff remain deferred.",
        ],
        coverageItems: [
          "Registry and example scene tests verify controlled open state, visible triggers, File, Edit, View, and Help menu items, selection close behavior, and class hooks.",
        ],
      }),
    ]
  );
};

const navigationMenuDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Navigation Menu"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A Base UI-informed navigation menu for horizontal site navigation with controlled popup panels.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/navigation-menu" },
        { label: "Examples", value: "default" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Navigation Menu v1 follows Base UI Root, List, Item, Trigger, Content, Link, Portal, Positioner, Popup, Viewport, and Arrow anatomy. The default demo includes Overview, Handbook, and GitHub, with Overview and Handbook opening link-card content. Delayed hover, nested submenus, viewport transitions, collision-aware placement, large menu scrolling, and keyboard behavior remain deferred."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          docsExampleBlock({
            title: "Default",
            testId: "docs-example-block-navigation-menu-basic",
            preview: DocsPreviewsNZ.navigationMenuBasicExamplePreview(
              model.navigationMenuBasicExample,
              "navigation-menu-docs-basic-preview"
            ),
            href: "/docs/components/navigation-menu/examples/basic",
            linkText: "Open standalone Navigation Menu Basic example",
          }),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/navigation-menu.json\nbunx shadcn@latest add <registry-url>/navigation-menu-basic.json",
        usageBody:
          "Keep open item state in the parent Foldkit model and compose Root, List, Item, Trigger, Portal, Positioner, Popup, Viewport, Content, Link, and Arrow parts.",
        usageCode: 'import * as NavigationMenu from "./ui/navigation-menu";',
        integrationCode: "openItem: S.String;",
        anatomySection: docsAnatomyBlock(
          "NavigationMenu.rootView({ children: [list, portal] });"
        ),
        includeStyling: false,
        includeKeyboardInteraction: false,
        apiReference: docsApiTable([
          {
            part: "Root",
            prop: "rootView(config)",
            type: "function",
            defaultValue: "-",
            description: "Groups the navigation list and popup portal.",
          },
          {
            part: "List",
            prop: "listView(config)",
            type: "function",
            defaultValue: "-",
            description: "Renders the Main navigation nav container.",
          },
          {
            part: "Trigger",
            prop: "triggerView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders a controlled trigger with aria-expanded and aria-haspopup.",
          },
          {
            part: "Link",
            prop: "linkView(config)",
            type: "function",
            defaultValue: "-",
            description: "Renders a navigation link for direct destinations.",
          },
          {
            part: "Popup",
            prop: "popupView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders role=menu popup content for the active trigger.",
          },
          {
            part: "Viewport",
            prop: "viewportView(config)",
            type: "function",
            defaultValue: "-",
            description: "Wraps the active popup content cards.",
          },
        ]),
        apiItems: [],
        accessibilityItems: [
          "List renders a nav landmark labelled Main navigation.",
          "Triggers expose aria-expanded and aria-haspopup=menu.",
          "Popup renders role=menu and direct destinations use native links.",
          "Keyboard roving focus and delayed hover behavior are deferred.",
        ],
        coverageItems: [
          "Registry and example scene tests verify controlled open state, default Overview and Handbook content, GitHub link semantics, and class hooks.",
        ],
      }),
    ]
  );
};

const collapsibleDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Collapsible"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A Base UI-informed collapsible panel controlled by a native button and parent-owned Foldkit state.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/collapsible" },
        { label: "Examples", value: "default" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Collapsible v1 follows Base UI's Root, Trigger, and Panel anatomy. The parent model owns the open boolean and the trigger emits a message fact that toggles the panel. The upstream Base UI page audit found one distinct demo: the initial Recovery keys example."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          docsExampleBlock({
            title: "Default",
            testId: "docs-example-block-collapsible-basic",
            preview: DocsPreviewsCD.collapsibleBasicExamplePreview(
              model.collapsibleBasicExample,
              "collapsible-docs-basic-preview"
            ),
            href: "/docs/components/collapsible/examples/basic",
            linkText: "Open standalone Collapsible Basic example",
          }),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/collapsible.json\nbunx shadcn@latest add <registry-url>/collapsible-basic.json",
        usageBody:
          "Use Collapsible.rootView with parent-owned open state, then render a Trigger and Panel that share the same open boolean.",
        usageCode: `import * as Collapsible from "./ui/collapsible";

Collapsible.rootView<Message>({
  open: model.open,
  children: [
    Collapsible.triggerView<Message>({
      open: model.open,
      onOpenChange: ClickedTrigger(),
      panelId: "recovery-keys-panel",
      children: ["Recovery keys"],
    }),
    Collapsible.panelView<Message>({
      open: model.open,
      id: "recovery-keys-panel",
      children,
    }),
  ],
});`,
        integrationCode: `// Model
open: S.Boolean;

// Message
ClickedTrigger;

// Update
ClickedTrigger: () => [
  evo(model, { open: (open) => !open }),
  [],
];`,
        anatomySection:
          docsAnatomyBlock(`import * as Collapsible from "./ui/collapsible";

Collapsible.rootView<Message>({
  children: [
    Collapsible.triggerView<Message>({ children: ["Recovery keys"] }),
    Collapsible.panelView<Message>({ children: [panelContent] }),
  ],
});`),
        includeStyling: false,
        includeKeyboardInteraction: false,
        apiReference: docsApiTable([
          {
            part: "Root",
            prop: "rootView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders the collapsible root and exposes data-open or data-closed state.",
          },
          {
            part: "Root",
            prop: "open",
            type: "boolean",
            defaultValue: "false",
            description:
              "Controlled open state owned by the parent Foldkit model.",
          },
          {
            part: "Root",
            prop: "disabled",
            type: "boolean",
            defaultValue: "false",
            description:
              "Exposes data-disabled state and should be passed to Trigger to block interaction.",
          },
          {
            part: "Trigger",
            prop: "triggerView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders the native button that opens and closes the panel.",
          },
          {
            part: "Trigger",
            prop: "onOpenChange",
            type: "ParentMessage",
            defaultValue: "-",
            description:
              "Message emitted when the trigger is clicked and the component is not disabled.",
          },
          {
            part: "Trigger",
            prop: "data-panel-open",
            type: "attribute",
            defaultValue: "-",
            description:
              "Present on the trigger while the panel is open, matching Base UI's styling hook.",
          },
          {
            part: "Panel",
            prop: "panelView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders the collapsible panel and its open or closed state attributes.",
          },
          {
            part: "Panel",
            prop: "keepMounted",
            type: "boolean",
            defaultValue: "false",
            description:
              "Keeps closed panel markup in the DOM with hidden state when content persistence is needed.",
          },
          {
            part: "Panel",
            prop: "hiddenUntilFound",
            type: "boolean",
            defaultValue: "false",
            description:
              "Uses hidden=until-found while closed so browser find-in-page can reveal the content.",
          },
          {
            part: "Panel",
            prop: "--collapsible-panel-height / width",
            type: "CSS variable",
            defaultValue: "auto",
            description:
              "Exposes Base UI-compatible variable names for consumer animation styles.",
          },
          {
            part: "Content",
            prop: "contentView(children, className)",
            type: "function",
            defaultValue: "-",
            description:
              "Optional content wrapper matching the default Recovery keys example spacing.",
          },
          {
            part: "Classes",
            prop: "*ClassName exports",
            type: "string",
            defaultValue: "-",
            description:
              "Default class exports exist for Root, Trigger, Icon, Panel, and Content.",
          },
        ]),
        apiItems: [],
        accessibilityItems: [
          "Trigger is a native button with aria-expanded reflecting the panel state.",
          "Trigger can reference the Panel through aria-controls when panelId and id are provided.",
          "Disabled triggers render disabled state and omit click message wiring.",
          "hiddenUntilFound maps the closed Panel to hidden=until-found for browser find-in-page support.",
        ],
        coverageItems: [
          "Registry scene tests verify closed state, open state, disabled trigger state, and exported styling hooks.",
          "Example scene tests verify the Base UI Recovery keys demo content and toggle behavior.",
          "Registry checks verify metadata, generated JSON, source snapshots, example coverage, and docs nav origin grouping.",
        ],
      }),
    ]
  );
};

const fieldDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Field"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A Base UI-informed field component for labels, descriptions, validation errors, and form control state.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/field" },
        { label: "Examples", value: "default" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Field v1 follows Base UI's Root, Label, Control, Description, Item, Error, and Validity anatomy. The upstream Base UI page audit found one distinct demo: the initial Name field with a required control, value-missing error, and profile visibility description."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          docsExampleBlock({
            title: "Default",
            testId: "docs-example-block-field-basic",
            preview: DocsPreviewsEI.fieldBasicExamplePreview(
              model.fieldBasicExample,
              "field-docs-basic-preview"
            ),
            href: "/docs/components/field/examples/basic",
            linkText: "Open standalone Field Basic example",
          }),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/field.json\nbunx shadcn@latest add <registry-url>/field-basic.json",
        usageBody:
          "Use Field.rootView to group a label, control, description, and optional error. Keep value and validation state in the parent Foldkit model.",
        usageCode: `import * as Field from "./ui/field";

Field.rootView<Message>({
  name: "name",
  required: true,
  invalid,
  children: [
    Field.labelView<Message>({ forId: "name", children: ["Name"] }),
    Field.controlView<Message>({
      id: "name",
      value: model.name,
      onInput: (value) => UpdatedName({ value }),
      describedByIds: ["name-error", "name-description"],
    }),
    Field.errorView<Message>({
      id: "name-error",
      show: invalid,
      children: ["Please enter your name"],
    }),
  ],
});`,
        integrationCode: `// Model
name: S.String;
touched: S.Boolean;

// Message
UpdatedName({ value: S.String });
BlurredName;

// Update
UpdatedName: ({ value }) => [
  evo(model, { name: () => value }),
  [],
];`,
        anatomySection: docsAnatomyBlock(`import * as Field from "./ui/field";

Field.rootView<Message>({
  children: [
    Field.labelView<Message>({ children: [labelText] }),
    Field.controlView<Message>({ id, value, onInput, ariaLabel }),
    Field.descriptionView<Message>({ children: [description] }),
    Field.itemView<Message>({ children: [fieldContent] }),
    Field.errorView<Message>({ show: invalid, children: [error] }),
    Field.validityView<Message>([validityText]),
  ],
});`),
        includeStyling: false,
        includeKeyboardInteraction: false,
        apiReference: docsApiTable([
          {
            part: "Root",
            prop: "rootView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Groups field parts and exposes data-disabled, data-required, data-invalid, data-valid, data-dirty, data-touched, data-filled, and data-focused state hooks.",
          },
          {
            part: "Label",
            prop: "labelView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders a label and links it to Control with the forId option.",
          },
          {
            part: "Control",
            prop: "controlView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders a native input with value, onInput message mapping, optional ariaLabel, aria-invalid, aria-describedby, required, disabled, and data state hooks.",
          },
          {
            part: "Description",
            prop: "descriptionView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders helper text that can be referenced by Control through describedByIds.",
          },
          {
            part: "Error",
            prop: "errorView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders role=alert error text when show is true and remains aria-hidden while inactive.",
          },
          {
            part: "Item",
            prop: "itemView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders an optional grouped field item for composed controls.",
          },
          {
            part: "Validity",
            prop: "validityView(children)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders consumer-owned validity text or status content.",
          },
          {
            part: "Classes",
            prop: "*ClassName exports",
            type: "string",
            defaultValue: "-",
            description:
              "Default class exports exist for Root, Label, Control, Description, Error, Item, and Validity.",
          },
        ]),
        apiItems: [],
        accessibilityItems: [
          "Label can target Control through forId and the control id.",
          "Control can reference Description and Error through aria-describedby.",
          "Control exposes aria-invalid when validation state is known.",
          "Error uses role=alert when active so validation changes are announced.",
        ],
        coverageItems: [
          "Registry scene tests verify label/control linkage, aria-describedby, invalid state, error visibility, description rendering, and style hooks.",
          "Example scene tests verify the Base UI Name field content and value-missing validation behavior.",
          "Registry checks verify metadata, generated JSON, source snapshots, example coverage, and docs nav origin grouping.",
        ],
      }),
    ]
  );
};

const numberFieldDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Number Field"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A Base UI-informed number field component for labelled numeric input with increment and decrement controls.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/number-field" },
        { label: "Examples", value: "default" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Number Field v1 follows Base UI's Root, ScrubArea, Group, Decrement, Input, and Increment anatomy. The upstream Base UI page audit found one distinct demo: the initial Amount field with default value 100, decrement and increment buttons, input in the middle, and scrub area over the label."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          docsExampleBlock({
            title: "Default",
            testId: "docs-example-block-number-field-basic",
            preview: DocsPreviewsNZ.numberFieldBasicExamplePreview(
              model.numberFieldBasicExample,
              "number-field-docs-basic-preview"
            ),
            href: "/docs/components/number-field/examples/basic",
            linkText: "Open standalone Number Field Basic example",
          }),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/number-field.json\nbunx shadcn@latest add <registry-url>/number-field-basic.json",
        usageBody:
          "Use NumberField.rootView with a scrub area label, grouped decrement/input/increment controls, and parent-owned numeric state.",
        usageCode: `import * as NumberField from "./ui/number-field";

NumberField.rootView<Message>({
  children: [
    NumberField.scrubAreaView<Message>({ id: "amount-label", children: ["Amount"] }),
    NumberField.groupView<Message>({
      children: [
        NumberField.decrementView<Message>({ ariaLabel: "Decrease", onClick: ClickedDecrementAmount(), children: ["-"] }),
        NumberField.inputView<Message>({ id: "amount", value, onInput, ariaLabel: "Amount" }),
        NumberField.incrementView<Message>({ ariaLabel: "Increase", onClick: ClickedIncrementAmount(), children: ["+"] }),
      ],
    }),
  ],
});`,
        integrationCode: `// Model
amount: S.Number;

// Message
UpdatedAmount({ value: S.String });
ClickedDecrementAmount;
ClickedIncrementAmount;

// Update
ClickedIncrementAmount: () => [
  evo(model, { amount: (amount) => amount + 1 }),
  [],
];`,
        anatomySection:
          docsAnatomyBlock(`import * as NumberField from "./ui/number-field";

NumberField.rootView<Message>({
  children: [
    NumberField.scrubAreaView<Message>({ children: [labelText] }),
    NumberField.groupView<Message>({
      children: [
        NumberField.decrementView<Message>({ children: [minusIcon] }),
        NumberField.inputView<Message>({ id, value, onInput, ariaLabel }),
        NumberField.incrementView<Message>({ children: [plusIcon] }),
      ],
    }),
  ],
});`),
        includeStyling: false,
        includeKeyboardInteraction: false,
        apiReference: docsApiTable([
          {
            part: "Root",
            prop: "rootView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Groups number field parts and exposes data-disabled, data-invalid, data-valid, and data-focused state hooks.",
          },
          {
            part: "ScrubArea",
            prop: "scrubAreaView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders the visible label/scrub affordance. Pointer scrubbing is deferred.",
          },
          {
            part: "Group",
            prop: "groupView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Groups decrement, input, and increment controls into the visible control cluster.",
          },
          {
            part: "Decrement",
            prop: "decrementView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders a native button with consumer-owned click message and accessible label.",
          },
          {
            part: "Input",
            prop: "inputView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders a native number input with value, onInput mapping, ariaLabel, optional aria-labelledby, min, max, step, disabled, and invalid state.",
          },
          {
            part: "Increment",
            prop: "incrementView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders a native button with consumer-owned click message and accessible label.",
          },
          {
            part: "Classes",
            prop: "*ClassName exports",
            type: "string",
            defaultValue: "-",
            description:
              "Default class exports exist for Root, ScrubArea, Group, Decrement/Increment buttons, and Input.",
          },
        ]),
        apiItems: [],
        accessibilityItems: [
          "Input renders type=number and exposes spinbutton semantics.",
          "Input can be named by ariaLabel and linked to ScrubArea with aria-labelledby.",
          "Increment and decrement controls are native buttons with accessible labels.",
          "Invalid state is exposed through aria-invalid when known.",
        ],
        coverageItems: [
          "Registry scene tests verify label text, spinbutton value, increment/decrement messages, and style hooks.",
          "Example scene tests verify the Base UI Amount demo content and parent-owned numeric updates.",
          "Registry checks verify metadata, generated JSON, source snapshots, example coverage, and docs nav origin grouping.",
        ],
      }),
    ]
  );
};

const autocompleteDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Autocomplete"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A Base UI-informed autocomplete component for controlled text input, filtered options, and empty states.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/autocomplete" },
        { label: "Examples", value: "default" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Autocomplete v1 follows Base UI's Root, Label, Input, List, Item, and Empty anatomy. The upstream Base UI page audit found the default Search tags demo with placeholder e.g. feature, common tag items, component-prefixed items, and a No tags found. empty state."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          docsExampleBlock({
            title: "Default",
            testId: "docs-example-block-autocomplete-basic",
            preview: DocsPreviewsAutocomplete.autocompleteBasicExamplePreview(
              model.autocompleteBasicExample,
              "autocomplete-docs-basic-preview"
            ),
            href: "/docs/components/autocomplete/examples/basic",
            linkText: "Open standalone Autocomplete Basic example",
          }),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/autocomplete.json\nbunx shadcn@latest add <registry-url>/autocomplete-basic.json",
        usageBody:
          "Use Autocomplete.rootView with a controlled input, listbox options, and an empty state driven by parent-owned query state.",
        usageCode:
          'import * as Autocomplete from "./ui/autocomplete";\n\nAutocomplete.rootView<Message>({ children: [label, input, list] });',
        integrationCode:
          "// Model\nquery: S.String;\nselected: S.String;\n\n// Message\nUpdatedQuery({ value: S.String });\nSelectedTag({ value: S.String });",
        anatomySection: docsAnatomyBlock(
          'import * as Autocomplete from "./ui/autocomplete";\n\nAutocomplete.rootView<Message>({\n  children: [\n    Autocomplete.labelView<Message>({ forId, children: [labelText] }),\n    Autocomplete.inputView<Message>({ id, value, onInput, ariaLabel, listId }),\n    Autocomplete.listView<Message>({ children: [itemsOrEmpty] }),\n  ],\n});'
        ),
        includeStyling: false,
        includeKeyboardInteraction: false,
        apiReference: docsApiTable([
          {
            part: "Root",
            prop: "rootView(config)",
            type: "function",
            defaultValue: "-",
            description: "Groups autocomplete parts.",
          },
          {
            part: "Label",
            prop: "labelView(config)",
            type: "function",
            defaultValue: "-",
            description: "Renders a label linked to Input.",
          },
          {
            part: "Input",
            prop: "inputView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders a controlled combobox input with aria-controls and placeholder support.",
          },
          {
            part: "List",
            prop: "listView(config)",
            type: "function",
            defaultValue: "-",
            description: "Renders the listbox container.",
          },
          {
            part: "Item",
            prop: "itemView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders a selectable option with aria-selected and data-selected hooks.",
          },
          {
            part: "Empty",
            prop: "emptyView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders empty state content when filtering has no matches.",
          },
          {
            part: "Classes",
            prop: "*ClassName exports",
            type: "string",
            defaultValue: "-",
            description:
              "Default class exports exist for Root, Label, Input, List, Item, and Empty.",
          },
        ]),
        apiItems: [],
        accessibilityItems: [
          "Input exposes combobox semantics and can reference the listbox with aria-controls.",
          "List renders role=listbox and Item renders role=option with aria-selected.",
          "The parent model owns query, filtering, and selected value state.",
        ],
        coverageItems: [
          "Registry scene tests verify combobox input, option selection, placeholder, and style hooks.",
          "Example scene tests verify the Base UI Search tags demo and empty state behavior.",
          "Registry checks verify metadata, generated JSON, source snapshots, example coverage, and docs nav origin grouping.",
        ],
      }),
    ]
  );
};

const formDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Form"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A Base UI-informed form component for native submission, labelled controls, and parent-owned server error state.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/form" },
        { label: "Examples", value: "default" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Form v1 follows Base UI's Root, Field, Label, Control, Error, and Submit anatomy. The upstream Base UI page audit found one distinct default demo: a Homepage URL input defaulting to https://example.com, a Submit button, and a server-style example.com domain error."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          docsExampleBlock({
            title: "Default",
            testId: "docs-example-block-form-basic",
            preview: DocsPreviewsEI.formBasicExamplePreview(
              model.formBasicExample,
              "form-docs-basic-preview"
            ),
            href: "/docs/components/form/examples/basic",
            linkText: "Open standalone Form Basic example",
          }),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/form.json\nbunx shadcn@latest add <registry-url>/form-basic.json",
        usageBody:
          "Use Form.rootView for native submission and keep submitted/error state in the parent Foldkit model.",
        usageCode:
          'import * as Form from "./ui/form";\n\nForm.rootView<Message>({\n  onSubmit: SubmittedHomepage(),\n  invalid,\n  children: [\n    Form.fieldView<Message>({ children: [label, control, error] }),\n    Form.submitView<Message>({ children: ["Submit"] }),\n  ],\n});',
        integrationCode:
          "// Model\nhomepage: S.String;\nsubmitted: S.Boolean;\n\n// Message\nUpdatedHomepage({ value: S.String });\nSubmittedHomepage;",
        anatomySection: docsAnatomyBlock(
          'import * as Form from "./ui/form";\n\nForm.rootView<Message>({\n  children: [\n    Form.fieldView<Message>({\n      children: [\n        Form.labelView<Message>({ forId, children: [labelText] }),\n        Form.controlView<Message>({ id, value, onInput, ariaLabel }),\n        Form.errorView<Message>({ show: invalid, children: [errorText] }),\n      ],\n    }),\n    Form.submitView<Message>({ children: [submitText] }),\n  ],\n});'
        ),
        includeStyling: false,
        includeKeyboardInteraction: false,
        apiReference: docsApiTable([
          {
            part: "Root",
            prop: "rootView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders a native form with onSubmit message mapping and data-invalid/data-submitting hooks.",
          },
          {
            part: "Field",
            prop: "fieldView(config)",
            type: "function",
            defaultValue: "-",
            description: "Groups label, control, and error content.",
          },
          {
            part: "Label",
            prop: "labelView(config)",
            type: "function",
            defaultValue: "-",
            description: "Renders a label linked to the control id.",
          },
          {
            part: "Control",
            prop: "controlView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders a native input with value, onInput mapping, ariaLabel, aria-describedby, aria-invalid, disabled, and data hooks.",
          },
          {
            part: "Error",
            prop: "errorView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders role=alert error text when show is true and remains aria-hidden while inactive.",
          },
          {
            part: "Submit",
            prop: "submitView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders a native submit button with disabled/submitting support.",
          },
          {
            part: "Classes",
            prop: "*ClassName exports",
            type: "string",
            defaultValue: "-",
            description:
              "Default class exports exist for Root, Field, Label, Control, Error, and Submit.",
          },
        ]),
        apiItems: [],
        accessibilityItems: [
          "Root uses native form submission semantics through h.OnSubmit.",
          "Label targets Control through forId and the control id.",
          "Control can reference Error through aria-describedby and exposes aria-invalid when known.",
          "Error uses role=alert when active so submission errors are announced.",
        ],
        coverageItems: [
          "Registry scene tests verify label/control linkage, submit message mapping, invalid state, error visibility, and style hooks.",
          "Example scene tests verify the Base UI Homepage URL submission and server-style error behavior.",
          "Registry checks verify metadata, generated JSON, source snapshots, example coverage, and docs nav origin grouping.",
        ],
      }),
    ]
  );
};

const sliderDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Slider"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A styled, installable Foldkit Slider slice built on the official Foldkit Ui.Slider primitive. It preserves typed value state, keyboard and pointer messages, ChangedValue OutMessages, disabled state, hidden input support, and reusable view classes.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/slider" },
        { label: "Examples", value: "basic, disabled" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Slider v1 documents the single-value range path: child-owned value and drag state, parent-visible ChangedValue facts, keyboard increments, disabled slider semantics, and form participation through hidden input attributes."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-slider-basic",
                preview: DocsPreviewsNZ.sliderBasicExamplePreview(
                  model.sliderBasicExample,
                  "slider-docs-basic-preview"
                ),
                href: "/docs/components/slider/examples/basic",
                linkText: "Open standalone Slider Basic example",
              }),
              docsExampleBlock({
                title: "Disabled",
                testId: "docs-example-block-slider-disabled",
                preview: DocsPreviewsNZ.sliderDisabledExamplePreview(
                  model.sliderDisabledExample,
                  "slider-docs-disabled-preview"
                ),
                href: "/docs/components/slider/examples/disabled",
                linkText: "Open standalone Slider Disabled example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/slider.json\nbunx shadcn@latest add <registry-url>/slider-basic.json\nbunx shadcn@latest add <registry-url>/slider-disabled.json",
        usageBody:
          "Initialize the Slider child model, delegate child messages through `h.submodel`, and handle ChangedValue in the parent update when the value changes.",
        usageCode: `import * as Slider from "./ui/slider";

const [slider] = Slider.init({
  id: "rating-slider",
  min: 0,
  max: 10,
  step: 1,
  initialValue: 4,
});`,
        integrationCode: `// Model
slider: Slider.Model;

// Message
Main.GotSliderMessage({ message: Slider.Message });

// Update
const [slider, commands, maybeOutMessage] =
  Slider.update(model.slider, message);

// View
h.submodel({
  slotId: model.slider.id,
  model: model.slider,
  view: Slider.view,
  viewInputs: {
    formatValue: (value) => \`\${value} of 10\`,
    toView: (attributes) =>
      Slider.sliderFieldView({
        attributes,
        label: "Rating",
        valueText: \`\${model.slider.value} of 10\`,
      }),
  },
  toParentMessage: (message) => Main.GotSliderMessage({ message }),
});`,
        anatomySection: docsAnatomyBlock(
          `h.submodel({
  slotId: model.slider.id,
  model: model.slider,
  view: Slider.view,
  viewInputs: Slider.sliderViewInputs({
    attributes,
    label: "Rating",
    valueText: \`\${model.slider.value} of 10\`,
  }),
  toParentMessage: (message) => Main.GotSliderMessage({ message }),
});`
        ),
        apiItems: [
          "Model: schema-backed state containing id, value, min, max, step, and drag state.",
          "init(config): creates a Slider model and returns the registry init tuple.",
          "update(model, message): returns model, commands, and an optional ChangedValue OutMessage.",
          "reflectValue and reflectRange: mirror externally driven value/range changes without user-originated OutMessages.",
          "fractionOfValue: computes the filled-track fraction for custom layouts.",
          "subscriptions and subscriptionsForRoot: pointer-drag subscriptions for document and Shadow DOM roots.",
          "ViewInputs and SliderAttributes: root, track, filledTrack, thumb, label, and hiddenInput attribute bundles for custom composition.",
        ],
        accessibilityItems: [
          "The primitive supplies role=slider, aria-valuemin, aria-valuemax, aria-valuenow, and keyboard navigation handlers.",
          "The label attributes provide the accessible name when no explicit aria label is supplied.",
          "The disabled example exposes aria-disabled and removes pointer and keyboard interaction handlers.",
          "The hiddenInput attributes preserve form participation when a name is supplied.",
        ],
        coverageItems: [
          "Registry scene tests verify accessible slider rendering, keyboard increment behavior, and parent-visible ChangedValue feedback.",
          "Example scene tests verify basic keyboard value changes and disabled slider semantics.",
          "Docs scene tests verify the shared component page section contract and example block layout.",
        ],
      }),
    ]
  );
};

const switchDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Switch"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A styled, installable Foldkit Switch slice built on the official Foldkit Ui.Switch primitive. It keeps checked state in a child model while exposing typed messages, OutMessage-compatible state changes, disabled state, and reusable view classes.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/switch" },
        { label: "Examples", value: "basic, disabled" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Switch v1 documents the stateful boolean-setting path: child-owned checked state, parent message delegation, native switch semantics, and styled control parts that preserve the Foldkit primitive attributes."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-switch-basic",
                preview: DocsPreviewsNZ.switchBasicExamplePreview(
                  model.switchBasicExample,
                  "switch-docs-basic-preview"
                ),
                href: "/docs/components/switch/examples/basic",
                linkText: "Open standalone Switch Basic example",
              }),
              docsExampleBlock({
                title: "Disabled",
                testId: "docs-example-block-switch-disabled",
                preview: DocsPreviewsNZ.switchDisabledExamplePreview(
                  model.switchDisabledExample,
                  "switch-docs-disabled-preview"
                ),
                href: "/docs/components/switch/examples/disabled",
                linkText: "Open standalone Switch Disabled example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/switch.json\nbunx shadcn@latest add <registry-url>/switch-basic.json\nbunx shadcn@latest add <registry-url>/switch-disabled.json",
        usageBody:
          "Initialize the switch child model in the parent model, delegate child messages through `h.submodel`, and render the supplied button, label, and description attributes.",
        usageCode: `import * as Switch from "./ui/switch";

const [switchModel, switchCommands] = Switch.init({
  id: "notifications-switch",
});

h.submodel({
  slotId: model.switchModel.id,
  model: model.switchModel,
  view: Switch.view,
  viewInputs: {
    toView: (attributes) => h.button(attributes.button, [
      Switch.switchKnob(model.switchModel.isChecked),
    ]),
  },
  toParentMessage: (message) => Main.GotSwitchMessage({ message }),
});`,
        integrationCode: `// Model
switchModel: Switch.Model;

// Message
Main.GotSwitchMessage({ message: Switch.Message });

// Update
GotSwitchMessage: ({ message }) => {
  const [switchModel, commands] = Switch.update(model.switchModel, message);

  return [
    evo(model, { switchModel: () => switchModel }),
    Command.mapMessages(commands, (message) => Main.GotSwitchMessage({ message })),
  ];
};`,
        anatomySection: docsAnatomyBlock(
          `h.submodel({
  slotId: model.switchModel.id,
  model: model.switchModel,
  view: Switch.view,
  viewInputs: {
    toView: (attributes) =>
      h.button(attributes.switch, [model.switchModel.isChecked ? "On" : "Off"]),
  },
  toParentMessage: (message) => Main.GotSwitchMessage({ message }),
});`
        ),
        apiItems: [
          "Model: schema-backed state containing id and isChecked.",
          "init(config): creates a Switch model and empty command list for registry consistency.",
          "update(model, message): delegates to Ui.Switch.update and returns model, commands, and OutMessage.",
          "setChecked(model, isChecked): programmatically assigns checked state and emits the same OutMessage as user toggles.",
          "reflectChecked(model, isChecked): mirrors external checked state without emitting OutMessage.",
          "view: h.submodel view that exposes button, label, and description attribute groups.",
        ],
        accessibilityItems: [
          "The visible control receives the Foldkit switch role, checked, and disabled attributes.",
          "The label attributes bind the visible label to the switch control.",
          "The description attributes provide aria-describedby for explanatory copy.",
        ],
        coverageItems: [
          "Registry scene tests verify label, description, checked toggling, and disabled state.",
          "Example scene tests verify parent-visible checked feedback and disabled documentation copy.",
          "Docs scene tests verify the shared component page section contract and example block layout.",
        ],
      }),
    ]
  );
};

const animationDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Animation"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A styled, installable Foldkit Animation slice built on the official Foldkit Ui.Animation primitive. It preserves enter and leave lifecycle messages, double-frame coordination, CSS transition settlement commands, size animation, and reusable view classes.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/animation" },
        {
          label: "Examples",
          value:
            "basic, pattern, separator, disabled, controlled, invalid, four-digits, alphanumeric, form, rtl",
        },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Animation v1 documents headless lifecycle coordination for animated content: parent-owned visibility intent, child-owned transition state, enter frame advancement, leave settlement, and parent-visible transition completion."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-animation-basic",
                preview: DocsPreviewsAnimation.animationBasicExamplePreview(
                  model.animationBasicExample,
                  "animation-docs-basic-preview"
                ),
                href: "/docs/components/animation/examples/basic",
                linkText: "Open standalone Animation Basic example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/animation.json\nbunx shadcn@latest add <registry-url>/animation-basic.json",
        usageBody:
          "Keep the Animation child model in the parent, send Showed or Hid when visibility intent changes, delegate child messages through h.submodel, and schedule defaultLeaveCommand when StartedLeaveAnimating is emitted.",
        usageCode: `import * as Animation from "./ui/animation";

const [animation] = Animation.init({
  id: "details-animation",
});`,
        integrationCode: `// Model
animation: Animation.Model;

// Message
Main.GotAnimationMessage({ message: Animation.Message });

// Update
const [animation, commands, maybeOutMessage] =
  Animation.update(model.animation, message);

// View
h.submodel({
  slotId: model.animation.id,
  model: model.animation,
  view: Animation.view,
  viewInputs: {
    animateSize: true,
    className: Animation.animationContentClassName,
    content,
  },
  toParentMessage: (message) => Main.GotAnimationMessage({ message }),
});`,
        anatomySection: docsAnatomyBlock(
          `h.submodel({
  slotId: model.animation.id,
  model: model.animation,
  view: Animation.view,
  viewInputs: {
    animateSize: true,
    className: Animation.animationContentClassName,
    content,
  },
  toParentMessage: (message) => Main.GotAnimationMessage({ message }),
});`
        ),
        apiItems: [
          "Model: schema-backed state containing id, isShowing, and transitionState.",
          "init(config): creates an Animation model and returns the registry init tuple.",
          "update(model, message): returns model, commands, and an optional StartedLeaveAnimating or TransitionedOut OutMessage.",
          "RequestFrame: command emitted to advance enter or leave from start to animating state after paint.",
          "WaitForAnimationSettled and defaultLeaveCommand: detect CSS transition or keyframe completion for leave cleanup.",
          "ViewInputs: content, className, attributes, element, and animateSize options for custom composition.",
        ],
        accessibilityItems: [
          "Animation is headless and does not assign roles; semantics belong to the animated content.",
          "The wrapper keeps content mounted while enter or leave animation state settles.",
          "Data attributes expose closed, enter, leave, and transition phases for CSS without imperative DOM mutation.",
          "animateSize uses a grid wrapper so height transitions do not require measuring content in application code.",
        ],
        coverageItems: [
          "Registry scene tests verify Showed, Hid, RequestFrame, defaultLeaveCommand, and WaitForAnimationSettled resolution.",
          "Example scene tests verify parent toggle flow, rendered content, and transition completion feedback.",
          "Docs scene tests verify the shared component page section contract and example block layout.",
        ],
      }),
    ]
  );
};

const virtualListDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Virtual List"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A styled, installable Foldkit VirtualList slice built on the official Foldkit Ui.VirtualList primitive. It preserves subscription-driven measurement, scroll tracking, fixed-height windows, variable-height windows, and programmatic scroll commands.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/virtual-list" },
        { label: "Examples", value: "basic, variable" },
        { label: "Proof", value: "scene tests, registry JSON, browser scroll" },
      ]),
      docsOverviewBlock(
        "VirtualList v1 documents high-volume list rendering: parent-owned data, child-owned scroll and measurement state, h.submodel row rendering, lifted container subscriptions, and command-backed scroll-to-index behavior."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Basic",
                description:
                  "Fixed row heights with direct index-to-offset math.",
                testId: "docs-example-block-virtual-list-basic",
                preview: DocsPreviewsNZ.virtualListBasicExamplePreview(
                  model.virtualListBasicExample,
                  "virtual-list-docs-basic-preview"
                ),
                href: "/docs/components/virtual-list/examples/basic",
                linkText: "Open standalone VirtualList Basic example",
              }),
              docsExampleBlock({
                title: "Variable",
                description:
                  "Variable row heights with per-item height callbacks.",
                testId: "docs-example-block-virtual-list-variable",
                preview: DocsPreviewsNZ.virtualListVariableExamplePreview(
                  model.virtualListVariableExample,
                  "virtual-list-docs-variable-preview"
                ),
                href: "/docs/components/virtual-list/examples/variable",
                linkText: "Open standalone VirtualList Variable example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/virtual-list.json\nbunx shadcn@latest add <registry-url>/virtual-list-basic.json\nbunx shadcn@latest add <registry-url>/virtual-list-variable.json",
        usageBody:
          "Initialize the VirtualList child model, lift `VirtualList.subscriptions.containerEvents` into the parent subscriptions, delegate child messages through `h.submodel`, and provide row key and row view callbacks.",
        usageCode: `import * as VirtualList from "./ui/virtual-list";

const virtualList = VirtualList.init({
  id: "activity-feed",
  rowHeightPx: 56,
});

h.submodel({
  slotId: model.virtualList.id,
  model: model.virtualList,
  view: VirtualList.view<Activity>(),
  viewInputs: {
    items,
    itemToKey: (activity) => activity.id,
    itemToView: (activity) => activityRow(activity),
    containerClassName: VirtualList.activityListContainerClassName,
  },
  toParentMessage: (message) => Main.GotVirtualListMessage({ message }),
});`,
        integrationCode: `// Model
virtualList: VirtualList.Model;

// Message
Main.GotVirtualListMessage({ message: VirtualList.Message });

// Update
GotVirtualListMessage: ({ message }) => {
  const [virtualList, commands] = VirtualList.update(model.virtualList, message);

  return [
    evo(model, { virtualList: () => virtualList }),
    Command.mapMessages(commands, (message) => Main.GotVirtualListMessage({ message })),
  ];
};

// Subscriptions
Subscription.lift({
  virtualListContainerEvents: VirtualList.subscriptions.containerEvents,
})({
  toChildModel: (model) => model.virtualList,
  toParentMessage: (message) => Main.GotVirtualListMessage({ message }),
});`,
        anatomySection: docsAnatomyBlock(`h.submodel({
  slotId: model.virtualList.id,
  model: model.virtualList,
  view: VirtualList.view<Activity>(),
  viewInputs: {
    items,
    itemToKey: (activity) => String(activity.id),
    itemToRowHeightPx: VirtualList.activityVariableRowHeightPx,
    itemToView: (activity, index) =>
      VirtualList.activityVariableRow(
        activity,
        VirtualList.activitySummaryFor(index)
      ),
    containerClassName: VirtualList.activityListContainerClassName,
  },
  toParentMessage: (message) => GotVirtualListMessage({ message }),
});`),
        apiItems: [
          "Model: schema-backed id, rowHeightPx, scrollTop, measurement, pendingScroll, and pendingScrollVersion.",
          "init(config): creates an unmeasured VirtualList model.",
          "update(model, message): handles ScrolledContainer, MeasuredContainer, and CompletedApplyScroll messages.",
          "scrollToIndex(model, index): computes fixed-height scroll offset and emits ApplyScroll.",
          "scrollToIndexVariable(model, items, itemToRowHeightPx, index): computes variable-height scroll offset and emits ApplyScroll.",
          "visibleWindow and visibleWindowVariable: compute mounted range and spacer heights for fixed or variable rows.",
          "subscriptions.containerEvents: attaches scroll and ResizeObserver streams to the list container by id.",
          "activityRows, activityRow, activityVariableRow, activitySummaryFor, and activityVariableRowHeightPx provide the installable demo row data and renderers.",
          "activityListContainerClassName, activityListHeaderClassName, and virtualListActionClassName expose the example styling hooks.",
        ],
        accessibilityItems: [
          "The primitive preserves caller-owned row markup, so list semantics belong to the row renderer.",
          "The scroll container remains a native scroll region with stable physical height and overscan rows.",
          "Programmatic scroll uses a command and then returns through normal messages rather than mutating parent state from the view.",
          "Row keys keep mounted row identity stable as the visible window changes.",
        ],
        coverageItems: [
          "Registry scene tests verify measurement, fixed visible-window math, variable visible-window math, and ApplyScroll command resolution.",
          "Example scene tests verify fixed and variable jump-to-middle flows through the real scroll command.",
          "Docs scene tests verify the shared component page section contract and example block layout.",
          "Browser probes verify rendered docs previews and standalone routes after registry generation.",
        ],
      }),
    ]
  );
};

const badgeDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Badge"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A small installable status label for shadcn-style presentation surfaces. It keeps behavior parent-owned while centralizing badge variants and class helpers for Foldkit views.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/badge" },
        {
          label: "Examples",
          value: "basic, icon, spinner, link, custom-colors, rtl",
        },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Badge v1 documents the first non-primitive registry slice: stateless variant styling, parent-owned state changes, and installable presentation helpers that can be used inside any Foldkit view."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-badge-basic",
                preview: DocsPreviewsB.badgeBasicExamplePreview(
                  model.badgeBasicExample,
                  "badge-docs-basic-preview"
                ),
                href: "/docs/components/badge/examples/basic",
                linkText: "Open standalone Badge Basic example",
              }),
              docsExampleBlock({
                title: "Spinner",
                testId: "docs-example-block-badge-spinner",
                preview: DocsPreviewsB.badgeSpinnerExamplePreview(
                  model.badgeSpinnerExample,
                  "badge-docs-spinner-preview"
                ),
                href: "/docs/components/badge/examples/spinner",
                linkText: "Open standalone Badge Spinner example",
              }),
              docsExampleBlock({
                title: "With Icon",
                testId: "docs-example-block-badge-icon",
                preview: DocsPreviewsB.badgeIconExamplePreview(),
                href: "/docs/components/badge/examples/icon",
                linkText: "Open standalone Badge With Icon example",
              }),
              docsExampleBlock({
                title: "Link",
                testId: "docs-example-block-badge-link",
                preview: DocsPreviewsB.badgeLinkExamplePreview(),
                href: "/docs/components/badge/examples/link",
                linkText: "Open standalone Badge Link example",
              }),
              docsExampleBlock({
                title: "Custom Colors",
                testId: "docs-example-block-badge-custom-colors",
                preview: DocsPreviewsB.badgeCustomColorsExamplePreview(),
                href: "/docs/components/badge/examples/custom-colors",
                linkText: "Open standalone Badge Custom Colors example",
              }),
              docsExampleBlock({
                title: "RTL",
                testId: "docs-example-block-badge-rtl",
                preview: DocsPreviewsB.badgeRtlExamplePreview(),
                href: "/docs/components/badge/examples/rtl",
                linkText: "Open standalone Badge RTL example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/badge.json\nbunx shadcn@latest add <registry-url>/spinner.json\nbunx shadcn@latest add <registry-url>/badge-basic.json\nbunx shadcn@latest add <registry-url>/badge-icon.json\nbunx shadcn@latest add <registry-url>/badge-spinner.json\nbunx shadcn@latest add <registry-url>/badge-link.json\nbunx shadcn@latest add <registry-url>/badge-custom-colors.json\nbunx shadcn@latest add <registry-url>/badge-rtl.json",
        usageBody:
          "Render Badge.view wherever a compact status label is needed. The parent model owns any status changes and passes the label plus optional variant into the view helper.",
        usageCode: `import * as Badge from "./ui/badge";

Badge.view<Message>({
  label: "Published",
  variant: "Default",
});`,
        integrationCode: `// Model
status: S.Literal("Draft", "Published");

// Message
ClickedToggleStatus();

// Update
ClickedToggleStatus: () => [
  evo(model, {
    status: (status) => (status === "Draft" ? "Published" : "Draft"),
  }),
  [],
];`,
        anatomySection: docsAnatomyBlock(
          `Badge.view<Message>({
  label: model.status,
  variant: model.status === "Published" ? "Default" : "Secondary",
  className: Badge.badgeClassNameByVariant.Default,
});`
        ),
        apiItems: [
          "view(config): renders a span badge with a label and optional variant.",
          "ViewConfig: label, variant, and className.",
          'BadgeVariant: "Default", "Secondary", "Destructive", or "Outline".',
          "Class helpers: default, secondary, destructive, outline, and badgeClassNameByVariant.",
        ],
        accessibilityItems: [
          "Badges are presentational text, so the visible label must carry the useful status.",
          "Do not use color alone to communicate critical state; pair the variant with clear text.",
        ],
        coverageItems: [
          "Registry scene tests verify all documented variants render.",
          "Example scene tests verify the parent-owned status toggle and variant copy.",
          "Docs e2e tests verify the shared page sections, example block layout, and source viewer readability.",
        ],
      }),
    ]
  );
};

const avatarDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Avatar"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A Base UI-informed avatar component for profile images and fallback initials, with optional grouped avatar and overflow count helpers.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/avatar" },
        { label: "Examples", value: "default" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Avatar v2 follows Base UI's Root, Image, and Fallback anatomy while preserving group and count helpers from the existing shadcn-style slice. The upstream Base UI page audit found one distinct demo: two avatars in a row, one image-backed avatar and one fallback-only avatar, both using LT initials."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          docsExampleBlock({
            title: "Default",
            testId: "docs-example-block-avatar-basic",
            preview: DocsPreviewsAvatar.avatarBasicExamplePreview(
              model.avatarBasicExample,
              "avatar-docs-basic-preview"
            ),
            href: "/docs/components/avatar/examples/basic",
            linkText: "Open standalone Avatar Basic example",
          }),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/avatar.json\nbunx shadcn@latest add <registry-url>/avatar-basic.json",
        usageBody:
          "Use Avatar.view for the common image-or-fallback case, or compose Avatar.rootView with Avatar.imageView and Avatar.fallbackView when you need direct anatomy control.",
        usageCode: `import * as Avatar from "./ui/avatar";

Avatar.groupView<Message>([
  Avatar.view<Message>({
    alt: "Lena Taylor",
    fallback: "LT",
    src: avatarImageSrc,
  }),
  Avatar.view<Message>({ fallback: "LT" }),
]);`,
        integrationCode: `// Model
// Static avatar demos do not need component-owned state.

// View
Avatar.view<Message>({
  alt: "Lena Taylor",
  fallback: "LT",
  src: avatarImageSrc,
});`,
        anatomySection: docsAnatomyBlock(`import * as Avatar from "./ui/avatar";

Avatar.rootView<Message>({
  children: [
    Avatar.imageView<Message>({ src, alt }),
    Avatar.fallbackView<Message>({ children: [initials] }),
  ],
});

Avatar.groupView<Message>([avatarA, avatarB, Avatar.countView<Message>({ count })]);`),
        includeStyling: false,
        includeKeyboardInteraction: false,
        apiReference: docsApiTable([
          {
            part: "Root",
            prop: "rootView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders the avatar container with size, className, and style hooks.",
          },
          {
            part: "Image",
            prop: "imageView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders the avatar image with required src and alt text.",
          },
          {
            part: "Fallback",
            prop: "fallbackView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders fallback initials or consumer-owned fallback content.",
          },
          {
            part: "Convenience",
            prop: "view(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders Image when src is present, otherwise Fallback.",
          },
          {
            part: "Group",
            prop: "groupView(children, className)",
            type: "function",
            defaultValue: "-",
            description: "Renders a compact avatar group for related people.",
          },
          {
            part: "Count",
            prop: "countView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders an accessible overflow count with role=img and an aria-label.",
          },
          {
            part: "Size",
            prop: "AvatarSize",
            type: '"Small" | "Default" | "Large"',
            defaultValue: '"Default"',
            description: "Controls the avatar root dimensions and text size.",
          },
          {
            part: "Classes",
            prop: "*ClassName exports",
            type: "string",
            defaultValue: "-",
            description:
              "Default class exports exist for Root, Image, Fallback, Group, Count, and size helpers.",
          },
        ]),
        apiItems: [],
        accessibilityItems: [
          "Images require useful alt text when the person identity is meaningful.",
          "Fallback initials should match nearby visible identity text when the avatar conveys a person.",
          "Overflow counts expose an accessible image label such as `4 more people`.",
        ],
        coverageItems: [
          "Registry scene tests verify image, fallback, anatomy helpers, group, and count rendering.",
          "Example scene tests verify the Base UI default two-avatar demo with image and fallback initials.",
          "Registry checks verify metadata, generated JSON, source snapshots, example coverage, and docs nav origin grouping.",
        ],
      }),
    ]
  );
};
const carouselDocsView = (model: Model): Html => {
  const h = html<Message>();

  const exampleBlock = (
    title: string,
    slug: string,
    preview: Html,
    href: string
  ): Html =>
    docsExampleBlock({
      title,
      testId: `docs-example-block-carousel-${slug}`,
      preview,
      href,
      linkText: `Open standalone Carousel ${title} example`,
    });

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Carousel"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A shadcn-style carousel component for cycling through slides with native Foldkit messages and installable view helpers.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/carousel" },
        {
          label: "Examples",
          value: "basic, sizes, spacing, orientation, API, autoplay, RTL",
        },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Carousel v1 mirrors the shadcn anatomy: Root, Viewport, Content, Item, Previous, Next, API status composition, and plugin-style autoplay coverage. The examples keep selected slide state in the parent Foldkit model and represent autoplay as a completion message from the timer boundary."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              exampleBlock(
                "Basic",
                "basic",
                DocsPreviewsCD.carouselBasicExamplePreview(
                  model.carouselBasicExample,
                  "carousel-docs-basic-preview"
                ),
                "/docs/components/shadcn-carousel/examples/basic"
              ),
              exampleBlock(
                "Sizes",
                "sizes",
                DocsPreviewsCD.carouselSizesExamplePreview(
                  model.carouselSizesExample,
                  "carousel-docs-sizes-preview"
                ),
                "/docs/components/shadcn-carousel/examples/sizes"
              ),
              exampleBlock(
                "Spacing",
                "spacing",
                DocsPreviewsCD.carouselSpacingExamplePreview(
                  model.carouselSpacingExample,
                  "carousel-docs-spacing-preview"
                ),
                "/docs/components/shadcn-carousel/examples/spacing"
              ),
              exampleBlock(
                "Orientation",
                "orientation",
                DocsPreviewsCD.carouselOrientationExamplePreview(
                  model.carouselOrientationExample,
                  "carousel-docs-orientation-preview"
                ),
                "/docs/components/shadcn-carousel/examples/orientation"
              ),
              exampleBlock(
                "API",
                "api",
                DocsPreviewsCD.carouselApiExamplePreview(
                  model.carouselApiExample,
                  "carousel-docs-api-preview"
                ),
                "/docs/components/shadcn-carousel/examples/api"
              ),
              exampleBlock(
                "Autoplay",
                "autoplay",
                DocsPreviewsCD.carouselAutoplayExamplePreview(
                  model.carouselAutoplayExample,
                  "carousel-docs-autoplay-preview"
                ),
                "/docs/components/shadcn-carousel/examples/autoplay"
              ),
              exampleBlock(
                "RTL",
                "rtl",
                DocsPreviewsCD.carouselRtlExamplePreview(
                  model.carouselRtlExample,
                  "carousel-docs-rtl-preview"
                ),
                "/docs/components/shadcn-carousel/examples/rtl"
              ),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/shadcn-carousel.json\nbunx shadcn@latest add <registry-url>/carousel-basic.json\nbunx shadcn@latest add <registry-url>/carousel-sizes.json\nbunx shadcn@latest add <registry-url>/carousel-spacing.json\nbunx shadcn@latest add <registry-url>/carousel-orientation.json\nbunx shadcn@latest add <registry-url>/carousel-api.json\nbunx shadcn@latest add <registry-url>/carousel-autoplay.json\nbunx shadcn@latest add <registry-url>/carousel-rtl.json",
        usageBody:
          "Keep the active slide index in the parent model, update it through typed messages, and compose the carousel anatomy helpers around your slide content.",
        usageCode: `import * as Carousel from "./ui/carousel";

Carousel.rootView<Message>({
  children: [
    Carousel.viewportView<Message>({
      children: [
        Carousel.contentView<Message>({
          index: model.index,
          children: slides.map((slide) =>
            Carousel.itemView<Message>({ children: [slide] })
          ),
        }),
      ],
    }),
    Carousel.buttonView<Message>({
      label: "Previous slide",
      direction: "previous",
      onClick: ClickedPreviousSlide(),
    }),
    Carousel.buttonView<Message>({
      label: "Next slide",
      direction: "next",
      onClick: ClickedNextSlide(),
    }),
  ],
});`,
        integrationCode: `index: S.Number;

ClickedPreviousSlide: () => [
  evo(model, { index: (index) => Carousel.previousIndex(index, slideCount) }),
  [],
];
ClickedNextSlide: () => [
  evo(model, { index: (index) => Carousel.nextIndex(index, slideCount) }),
  [],
];`,
        anatomySection:
          docsAnatomyBlock(`import * as Carousel from "./ui/carousel";

Carousel.rootView<Message>({
  children: [
    Carousel.viewportView<Message>({
      children: [
        Carousel.contentView<Message>({ index, children: items }),
      ],
    }),
    Carousel.buttonView<Message>({ direction: "previous", ...previous }),
    Carousel.buttonView<Message>({ direction: "next", ...next }),
  ],
});`),
        apiItems: [
          "rootView(config): renders the labelled carousel region with aria-roledescription=carousel.",
          "viewportView(config): clips overflowing slides.",
          "contentView(config): translates slide content by index and supports horizontal or vertical orientation.",
          "itemView(config): renders each slide wrapper with aria-roledescription=slide.",
          "buttonView(config): renders previous and next controls with typed Foldkit messages.",
          "nextIndex(index, count) and previousIndex(index, count): wrap controlled indices.",
        ],
        accessibilityItems: [
          "The root is a labelled region with aria-roledescription=carousel.",
          "Each slide wrapper exposes aria-roledescription=slide.",
          "Previous and next controls are native buttons with accessible labels.",
          "The API example exposes current slide status through aria-live=polite.",
        ],
        coverageItems: [
          "Registry scene tests verify anatomy and index wrapping helpers.",
          "Example scene tests verify Basic, Sizes, Spacing, Orientation, API, and RTL slide advancement.",
          "Registry checks verify metadata, generated JSON, example coverage, and docs nav origin grouping.",
        ],
      }),
    ]
  );
};

const chartDocsView = (model: Model): Html => {
  const h = html<Message>();
  const exampleBlock = (
    title: string,
    slug: string,
    preview: Html,
    href: string
  ): Html =>
    docsExampleBlock({
      title,
      testId: `docs-example-block-chart-${slug}`,
      preview,
      href,
      linkText: `Open standalone Chart ${title} example`,
    });

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Chart"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A shadcn-style chart composition layer with Foldkit-native SVG helpers for containers, bars, tooltips, and legends.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/chart" },
        { label: "Examples", value: "basic, grid, axis, tooltip, legend, RTL" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Chart v1 mirrors shadcn Chart as a composition layer rather than a React Recharts wrapper. Foldkit consumers own data and state in the parent model, then render deterministic SVG anatomy through container, bar chart, tooltip, and legend helpers. Recharts-specific cursor, active payload, and plugin behavior are intentionally deferred until a Foldkit-native chart engine is promoted."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              exampleBlock(
                "Basic",
                "basic",
                DocsPreviewsCD.chartBasicExamplePreview(
                  model.chartBasicExample,
                  "chart-docs-basic-preview"
                ),
                "/docs/components/chart/examples/basic"
              ),
              exampleBlock(
                "Grid",
                "grid",
                DocsPreviewsCD.chartGridExamplePreview(
                  model.chartGridExample,
                  "chart-docs-grid-preview"
                ),
                "/docs/components/chart/examples/grid"
              ),
              exampleBlock(
                "Axis",
                "axis",
                DocsPreviewsCD.chartAxisExamplePreview(
                  model.chartAxisExample,
                  "chart-docs-axis-preview"
                ),
                "/docs/components/chart/examples/axis"
              ),
              exampleBlock(
                "Tooltip",
                "tooltip",
                DocsPreviewsCD.chartTooltipExamplePreview(
                  model.chartTooltipExample,
                  "chart-docs-tooltip-preview"
                ),
                "/docs/components/chart/examples/tooltip"
              ),
              exampleBlock(
                "Legend",
                "legend",
                DocsPreviewsCD.chartLegendExamplePreview(
                  model.chartLegendExample,
                  "chart-docs-legend-preview"
                ),
                "/docs/components/chart/examples/legend"
              ),
              exampleBlock(
                "RTL",
                "rtl",
                DocsPreviewsCD.chartRtlExamplePreview(
                  model.chartRtlExample,
                  "chart-docs-rtl-preview"
                ),
                "/docs/components/chart/examples/rtl"
              ),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/chart.json\nbunx shadcn@latest add <registry-url>/chart-basic.json\nbunx shadcn@latest add <registry-url>/chart-grid.json\nbunx shadcn@latest add <registry-url>/chart-axis.json\nbunx shadcn@latest add <registry-url>/chart-tooltip.json\nbunx shadcn@latest add <registry-url>/chart-legend.json\nbunx shadcn@latest add <registry-url>/chart-rtl.json",
        usageBody:
          "Keep chart data in the parent model and compose the SVG helpers around visible legends and tooltip content.",
        usageCode:
          'import * as Chart from "./ui/chart";\n\nChart.containerView<Message>({\n  ariaLabel: "Monthly visitors",\n  children: [\n    Chart.barChartView<Message>({ data, series }),\n    Chart.legendView<Message>({ series }),\n  ],\n});',
        integrationCode:
          'export const Model = S.Struct({});\n\nconst chartData: readonly Chart.ChartDatum[] = [\n  { label: "Jan", values: { desktop: 186, mobile: 80 } },\n];',
        anatomySection: docsAnatomyBlock(
          'import * as Chart from "./ui/chart";\n\nChart.containerView<Message>({\n  children: [\n    Chart.barChartView<Message>({ data, series }),\n    Chart.tooltipView<Message>({ label, rows }),\n    Chart.legendView<Message>({ series }),\n  ],\n});'
        ),
        apiItems: [
          "containerView(config): renders the labelled chart region with data-slot=chart.",
          "barChartView(config): renders an SVG bar chart from ChartDatum and ChartSeries data.",
          "tooltipView(config): renders static tooltip content for parent-owned active values.",
          "legendView(config): renders visible series labels and color swatches.",
          "ChartDatum, ChartSeries, and ChartDimensions document the public data shape.",
          "Data attributes: data-slot=chart, data-slot=chart-svg, data-slot=chart-tooltip, data-slot=chart-legend, data-series, and data-value.",
        ],
        accessibilityItems: [
          "The root is a labelled region so charts have a discoverable accessible name.",
          "The SVG exposes role=img and an accessible label.",
          "Legends and tooltips render text labels in DOM, not color-only affordances.",
          "Interactive hover and keyboard tooltip state is deferred to a parent-owned Foldkit model.",
        ],
        coverageItems: [
          "Registry scene tests verify chart region, SVG image, legend labels, and zero-value rendering.",
          "Example scene tests verify Basic, Grid, Axis, Tooltip, Legend, and RTL rendering.",
          "Registry checks verify metadata, generated JSON, source snapshots, example coverage, and docs nav origin grouping.",
        ],
      }),
    ]
  );
};

const commandDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Command"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A shadcn-style command palette composition for searchable action lists.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/command" },
        {
          label: "Examples",
          value: "basic, groups, rtl, scrollable, shortcuts",
        },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Command provides the shadcn command palette anatomy with parent-owned open/query state. The Basic example matches the origin Open Menu command palette copy, while the static composition examples cover shortcuts, grouped content, scrollable lists, and RTL content. Full CommandDialog focus-trap behavior remains a separate wrapper decision."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-command-basic",
                preview: DocsPreviewsCD.commandBasicExamplePreview(
                  model.commandBasicExample,
                  "command-docs-basic-preview"
                ),
                href: "/docs/components/command/examples/basic",
                linkText: "Open standalone Command Basic example",
              }),
              docsExampleBlock({
                title: "Groups",
                testId: "docs-example-block-command-groups",
                preview: DocsPreviewsCD.commandGroupsExamplePreview(
                  model.commandGroupsExample,
                  "command-docs-groups-preview"
                ),
                href: "/docs/components/command/examples/groups",
                linkText: "Open standalone Command Groups example",
              }),
              docsExampleBlock({
                title: "RTL",
                testId: "docs-example-block-command-rtl",
                preview: DocsPreviewsCD.commandRtlExamplePreview(
                  model.commandRtlExample,
                  "command-docs-rtl-preview"
                ),
                href: "/docs/components/command/examples/rtl",
                linkText: "Open standalone Command RTL example",
              }),
              docsExampleBlock({
                title: "Scrollable",
                testId: "docs-example-block-command-scrollable",
                preview: DocsPreviewsCD.commandScrollableExamplePreview(
                  model.commandScrollableExample,
                  "command-docs-scrollable-preview"
                ),
                href: "/docs/components/command/examples/scrollable",
                linkText: "Open standalone Command Scrollable example",
              }),
              docsExampleBlock({
                title: "Shortcuts",
                testId: "docs-example-block-command-shortcuts",
                preview: DocsPreviewsCD.commandShortcutsExamplePreview(
                  model.commandShortcutsExample,
                  "command-docs-shortcuts-preview"
                ),
                href: "/docs/components/command/examples/shortcuts",
                linkText: "Open standalone Command Shortcuts example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/command.json\nbunx shadcn@latest add <registry-url>/command-basic.json\nbunx shadcn@latest add <registry-url>/command-groups.json\nbunx shadcn@latest add <registry-url>/command-rtl.json\nbunx shadcn@latest add <registry-url>/command-scrollable.json\nbunx shadcn@latest add <registry-url>/command-shortcuts.json",
        usageBody:
          "Keep open/query state in the parent Foldkit model, then compose rootView, inputView, listView, groupView, itemView, separatorView, and shortcutView inside the dialog surface.",
        usageCode:
          'import * as Command from "./ui/command";\n\nconst items = Command.filterItems(suggestionItems, model.query);\n\nCommand.rootView<Message>({\n  children: [\n    Command.inputView({\n      value: model.query,\n      onInput: (value) => UpdatedCommandQuery({ value }),\n      placeholder: "Type a command or search...",\n    }),\n    Command.listView({ children: itemViews }),\n  ],\n});',
        integrationCode:
          "query: S.String;\nisOpen: S.Boolean;\n\nClickedOpenMenu, ClickedCloseMenu, UpdatedCommandQuery, and SelectedCommandItem messages keep dialog and search state in the parent model.",
        anatomySection: docsAnatomyBlock(
          "Command.rootView({ children: [input, list] });"
        ),
        includeStyling: false,
        includeKeyboardInteraction: false,
        apiReference: docsApiTable([
          {
            part: "Root",
            prop: "rootView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders the command shell with data-slot=command and custom child content.",
          },
          {
            part: "Input",
            prop: "inputView(config)",
            type: "function",
            defaultValue: "placeholder: Type a command or search...",
            description:
              "Renders the controlled search input with role=combobox and optional list wiring.",
          },
          {
            part: "List",
            prop: "listView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders the option container with role=listbox and supplied command items.",
          },
          {
            part: "Empty",
            prop: "emptyView(config)",
            type: "function",
            defaultValue: "No results found.",
            description: "Renders empty search feedback.",
          },
          {
            part: "Group",
            prop: "groupView(config)",
            type: "function",
            defaultValue: "-",
            description: "Groups related command items under a heading.",
          },
          {
            part: "Item",
            prop: "itemView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders one selectable command option with disabled and selected state hooks.",
          },
          {
            part: "Separator",
            prop: "separatorView()",
            type: "function",
            defaultValue: "-",
            description: "Renders a visual separator between command groups.",
          },
          {
            part: "Shortcut",
            prop: "shortcutView(label)",
            type: "function",
            defaultValue: "-",
            description: "Renders trailing shortcut hint text inside an item.",
          },
        ]),
        apiItems: [
          "defaultItems: demo Suggestions and Settings item data.",
          "filterItems(items, query): filters by item label or group name with case-insensitive matching.",
        ],
        accessibilityItems: [
          "The input is labelled Command search and exposes role=combobox.",
          "The list exposes role=listbox; items expose role=option and aria-selected.",
          "Disabled items use native disabled state plus aria-disabled.",
          "Parent-owned query and selection keep state observable through Foldkit messages.",
        ],
        coverageItems: [
          "Registry scene tests verify input attributes, list item rendering, shortcuts, filtering, and selected state.",
          "Example scene tests verify filtering and selection through user input.",
          "Registry checks verify metadata, generated JSON, source snapshots, example coverage, and docs nav origin grouping.",
        ],
      }),
    ]
  );
};

const dropdownMenuDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Dropdown Menu"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A shadcn-style dropdown menu for controlled click-triggered command lists.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/dropdown-menu" },
        {
          label: "Examples",
          value:
            "basic, checkboxes, complex, destructive, icons, radio group, rtl, shortcuts, submenu",
        },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Dropdown Menu provides shadcn menu anatomy with parent-owned open and selected state. The examples cover the origin account menu shape plus checkbox items, radio groups, shortcuts, icons, destructive actions, submenu content, composed menus, and RTL layout. Positioning and keyboard roving focus remain explicit follow-up behavior work for the primitive."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-dropdown-menu-basic",
                preview: DocsPreviewsCD.dropdownMenuBasicExamplePreview(
                  model.dropdownMenuBasicExample,
                  "dropdown-menu-docs-basic-preview"
                ),
                href: "/docs/components/dropdown-menu/examples/basic",
                linkText: "Open standalone Dropdown Menu Basic example",
              }),
              docsExampleBlock({
                title: "Checkboxes",
                testId: "docs-example-block-dropdown-menu-checkboxes",
                preview: DocsPreviewsCD.dropdownMenuCheckboxesExamplePreview(
                  model.dropdownMenuCheckboxesExample,
                  "dropdown-menu-docs-checkboxes-preview"
                ),
                href: "/docs/components/dropdown-menu/examples/checkboxes",
                linkText: "Open standalone Dropdown Menu Checkboxes example",
              }),
              docsExampleBlock({
                title: "Complex",
                testId: "docs-example-block-dropdown-menu-complex",
                preview: DocsPreviewsCD.dropdownMenuComplexExamplePreview(
                  model.dropdownMenuComplexExample,
                  "dropdown-menu-docs-complex-preview"
                ),
                href: "/docs/components/dropdown-menu/examples/complex",
                linkText: "Open standalone Dropdown Menu Complex example",
              }),
              docsExampleBlock({
                title: "Destructive",
                testId: "docs-example-block-dropdown-menu-destructive",
                preview: DocsPreviewsCD.dropdownMenuDestructiveExamplePreview(
                  model.dropdownMenuDestructiveExample,
                  "dropdown-menu-docs-destructive-preview"
                ),
                href: "/docs/components/dropdown-menu/examples/destructive",
                linkText: "Open standalone Dropdown Menu Destructive example",
              }),
              docsExampleBlock({
                title: "Icons",
                testId: "docs-example-block-dropdown-menu-icons",
                preview: DocsPreviewsCD.dropdownMenuIconsExamplePreview(
                  model.dropdownMenuIconsExample,
                  "dropdown-menu-docs-icons-preview"
                ),
                href: "/docs/components/dropdown-menu/examples/icons",
                linkText: "Open standalone Dropdown Menu Icons example",
              }),
              docsExampleBlock({
                title: "Radio Group",
                testId: "docs-example-block-dropdown-menu-radio-group",
                preview: DocsPreviewsCD.dropdownMenuRadioGroupExamplePreview(
                  model.dropdownMenuRadioGroupExample,
                  "dropdown-menu-docs-radio-group-preview"
                ),
                href: "/docs/components/dropdown-menu/examples/radio-group",
                linkText: "Open standalone Dropdown Menu Radio Group example",
              }),
              docsExampleBlock({
                title: "RTL",
                testId: "docs-example-block-dropdown-menu-rtl",
                preview: DocsPreviewsCD.dropdownMenuRtlExamplePreview(
                  model.dropdownMenuRtlExample,
                  "dropdown-menu-docs-rtl-preview"
                ),
                href: "/docs/components/dropdown-menu/examples/rtl",
                linkText: "Open standalone Dropdown Menu RTL example",
              }),
              docsExampleBlock({
                title: "Shortcuts",
                testId: "docs-example-block-dropdown-menu-shortcuts",
                preview: DocsPreviewsCD.dropdownMenuShortcutsExamplePreview(
                  model.dropdownMenuShortcutsExample,
                  "dropdown-menu-docs-shortcuts-preview"
                ),
                href: "/docs/components/dropdown-menu/examples/shortcuts",
                linkText: "Open standalone Dropdown Menu Shortcuts example",
              }),
              docsExampleBlock({
                title: "Submenu",
                testId: "docs-example-block-dropdown-menu-submenu",
                preview: DocsPreviewsCD.dropdownMenuSubmenuExamplePreview(
                  model.dropdownMenuSubmenuExample,
                  "dropdown-menu-docs-submenu-preview"
                ),
                href: "/docs/components/dropdown-menu/examples/submenu",
                linkText: "Open standalone Dropdown Menu Submenu example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/dropdown-menu.json\nbunx shadcn@latest add <registry-url>/dropdown-menu-basic.json\nbunx shadcn@latest add <registry-url>/dropdown-menu-checkboxes.json\nbunx shadcn@latest add <registry-url>/dropdown-menu-complex.json\nbunx shadcn@latest add <registry-url>/dropdown-menu-destructive.json\nbunx shadcn@latest add <registry-url>/dropdown-menu-icons.json\nbunx shadcn@latest add <registry-url>/dropdown-menu-radio-group.json\nbunx shadcn@latest add <registry-url>/dropdown-menu-rtl.json\nbunx shadcn@latest add <registry-url>/dropdown-menu-shortcuts.json\nbunx shadcn@latest add <registry-url>/dropdown-menu-submenu.json",
        usageBody:
          "Keep open and selected item state in the parent Foldkit model, then compose Root, Trigger, Portal, Backdrop, Positioner, Popup, Label, Item, Separator, and Shortcut parts.",
        usageCode:
          'import * as DropdownMenu from "./ui/dropdown-menu";\n\nDropdownMenu.rootView<Message>({\n  children: [trigger, portal],\n});',
        integrationCode:
          "open: S.Boolean;\nselected: S.String;\n\nToggledDropdownMenu, ClosedDropdownMenu, and SelectedDropdownMenuItem messages own the menu state.",
        anatomySection: docsAnatomyBlock(
          "DropdownMenu.rootView({ children: [trigger, portal] });"
        ),
        includeStyling: false,
        includeKeyboardInteraction: false,
        apiReference: docsApiTable([
          {
            part: "Root",
            prop: "rootView(config)",
            type: "function",
            defaultValue: "-",
            description: "Groups the trigger and portal content.",
          },
          {
            part: "Trigger",
            prop: "triggerView(config)",
            type: "function",
            defaultValue: "open: false",
            description:
              "Renders the click trigger with aria-haspopup=menu and aria-expanded.",
          },
          {
            part: "Portal",
            prop: "portalView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Conditionally renders menu overlay content when open.",
          },
          {
            part: "Backdrop",
            prop: "backdropView(config)",
            type: "function",
            defaultValue: "-",
            description: "Renders the outside-click close target.",
          },
          {
            part: "Popup",
            prop: "popupView(config)",
            type: "function",
            defaultValue: "-",
            description: "Renders role=menu around menu items.",
          },
          {
            part: "Item",
            prop: "itemView(config)",
            type: "function",
            defaultValue: "disabled: false",
            description:
              "Renders one role=menuitem command with disabled state hooks.",
          },
          {
            part: "Label",
            prop: "labelView(config)",
            type: "function",
            defaultValue: "-",
            description: "Renders non-interactive menu label content.",
          },
          {
            part: "Shortcut",
            prop: "shortcutView(label)",
            type: "function",
            defaultValue: "-",
            description: "Renders trailing shortcut hint text.",
          },
          {
            part: "Separator",
            prop: "separatorView(config)",
            type: "function",
            defaultValue: "-",
            description: "Renders a visual menu separator.",
          },
        ]),
        apiItems: [],
        accessibilityItems: [
          "The trigger exposes aria-haspopup=menu and aria-expanded.",
          "The popup exposes role=menu and each selectable action exposes role=menuitem.",
          "Labels are non-interactive content inside the menu.",
          "Disabled items use native disabled state and data-disabled styling hooks.",
          "The backdrop has a Close dropdown menu accessible name for outside dismissal.",
        ],
        coverageItems: [
          "Registry scene tests verify closed/open rendering, menu semantics, shortcut hook, separator, and disabled state.",
          "Example scene tests verify opening, selecting Billing, closing, and selected feedback.",
          "Registry checks verify metadata, generated JSON, source snapshots, example coverage, and docs nav origin grouping.",
        ],
      }),
    ]
  );
};

const hoverCardDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Hover Card"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A controlled preview-card surface with trigger, portal, backdrop, and dialog popup helpers for parent-owned Foldkit state.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/hover-card" },
        { label: "Examples", value: "basic, disabled, groups, invalid, rtl" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Hover Card provides a controlled trigger, backdrop, portal, positioner, and dialog popup for preview content that opens from parent-owned Foldkit state."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-hover-card-basic",
                preview: DocsPreviewsEI.hoverCardBasicExamplePreview(
                  model.hoverCardBasicExample,
                  "hover-card-docs-basic-preview"
                ),
                href: "/docs/components/hover-card/examples/basic",
                linkText: "Open standalone Hover Card Basic example",
              }),
              docsExampleBlock({
                title: "Sides",
                testId: "docs-example-block-hover-card-sides",
                preview: DocsPreviewsEI.hoverCardSidesExamplePreview(
                  model.hoverCardSidesExample,
                  "hover-card-docs-sides-preview"
                ),
                href: "/docs/components/hover-card/examples/sides",
                linkText: "Open standalone Hover Card Sides example",
              }),
              docsExampleBlock({
                title: "RTL",
                testId: "docs-example-block-hover-card-rtl",
                preview: DocsPreviewsEI.hoverCardRtlExamplePreview(
                  model.hoverCardRtlExample,
                  "hover-card-docs-rtl-preview"
                ),
                href: "/docs/components/hover-card/examples/rtl",
                linkText: "Open standalone Hover Card RTL example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/hover-card.json\nbunx shadcn@latest add <registry-url>/hover-card-basic.json\nbunx shadcn@latest add <registry-url>/hover-card-sides.json\nbunx shadcn@latest add <registry-url>/hover-card-rtl.json",
        usageBody:
          "Import the Hover Card helpers and keep interactive state in the parent Foldkit model.",
        usageCode: `import * as HoverCard from "./ui/hover-card";

HoverCard.rootView<Message>({
  children: [
    HoverCard.triggerView<Message>({
      open: model.open,
      onOpen: OpenedHoverCard(),
      children: [h.span([], ["@foldkit"])],
    }),
    HoverCard.portalView<Message>({
      open: model.open,
      children: [
        HoverCard.backdropView<Message>({ onClose: ClosedHoverCard() }),
        HoverCard.positionerView<Message>({
          children: [HoverCard.popupView<Message>({ children })],
        }),
      ],
    }),
  ],
});`,
        integrationCode:
          "The Basic example stores open in its Foldkit model, opens from OpenedHoverCard, closes from ClosedHoverCard, and lets portalView render empty when closed.",
        anatomySection: docsAnatomyBlock(
          `HoverCard.rootView<Message>({
  children: [
    HoverCard.triggerView<Message>({ open, onOpen, children }),
    HoverCard.portalView<Message>({
      open,
      children: [
        HoverCard.backdropView<Message>({ onClose }),
        HoverCard.positionerView<Message>({
          children: [HoverCard.popupView<Message>({ children })],
        }),
      ],
    }),
  ],
});`
        ),
        includeStyling: false,
        includeKeyboardInteraction: false,
        apiItems: [
          "rootView(config): renders the hover card wrapper.",
          "triggerView(config): renders a button with aria-haspopup=dialog, aria-expanded, open data state, and onOpen.",
          "portalView(config): renders children only while open.",
          "backdropView(config): renders the close target with an accessible Close hover card label.",
          "positionerView(config) and popupView(config): render the positioned role=dialog content shell.",
          "Class hooks include root, trigger, portal, backdrop, positioner, popup, avatar, title, description, meta.",
        ],
        accessibilityItems: [
          "The trigger is a native button and reflects open state with aria-expanded.",
          "The popup uses role=dialog so preview content is announced as a dialog surface.",
          "The backdrop is a labelled button, giving pointer and keyboard users a deterministic close control.",
        ],
        coverageItems: [
          "Registry scene tests verify trigger ARIA, closed portal behavior, popup role, backdrop label, and class hooks.",
          "Example scene tests verify opening, closing, and preview content rendering.",
          "Registry checks verify metadata, generated JSON, source snapshots, example coverage, and docs nav origin grouping.",
        ],
      }),
    ]
  );
};

const inputOtpDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Input OTP"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Grouped one-character OTP inputs with optional pattern/input-mode attributes, separators, paste distribution, and parent-owned value normalization.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/input-otp" },
        { label: "Examples", value: "basic, disabled, invalid" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Input OTP renders grouped one-character inputs with an optional separator while the parent model owns the slot array, normalization, paste distribution, and keyboard navigation."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-input-otp-basic",
                preview: DocsPreviewsEI.inputOtpBasicExamplePreview(
                  model.inputOtpBasicExample,
                  "input-otp-docs-basic-preview"
                ),
                href: "/docs/components/input-otp/examples/basic",
                linkText: "Open standalone Input OTP Basic example",
              }),
              docsExampleBlock({
                title: "Pattern",
                testId: "docs-example-block-input-otp-pattern",
                preview: DocsPreviewsEI.inputOtpPatternExamplePreview(
                  model.inputOtpPatternExample,
                  "input-otp-docs-pattern-preview"
                ),
                href: "/docs/components/input-otp/examples/pattern",
                linkText: "Open standalone Input OTP Pattern example",
              }),
              docsExampleBlock({
                title: "Separator",
                testId: "docs-example-block-input-otp-separator",
                preview: DocsPreviewsEI.inputOtpSeparatorExamplePreview(
                  model.inputOtpSeparatorExample,
                  "input-otp-docs-separator-preview"
                ),
                href: "/docs/components/input-otp/examples/separator",
                linkText: "Open standalone Input OTP Separator example",
              }),
              docsExampleBlock({
                title: "Disabled",
                testId: "docs-example-block-input-otp-disabled",
                preview: DocsPreviewsEI.inputOtpDisabledExamplePreview(
                  model.inputOtpDisabledExample,
                  "input-otp-docs-disabled-preview"
                ),
                href: "/docs/components/input-otp/examples/disabled",
                linkText: "Open standalone Input OTP Disabled example",
              }),
              docsExampleBlock({
                title: "Controlled",
                testId: "docs-example-block-input-otp-controlled",
                preview: DocsPreviewsEI.inputOtpControlledExamplePreview(
                  model.inputOtpControlledExample,
                  "input-otp-docs-controlled-preview"
                ),
                href: "/docs/components/input-otp/examples/controlled",
                linkText: "Open standalone Input OTP Controlled example",
              }),
              docsExampleBlock({
                title: "Invalid",
                testId: "docs-example-block-input-otp-invalid",
                preview: DocsPreviewsEI.inputOtpInvalidExamplePreview(
                  model.inputOtpInvalidExample,
                  "input-otp-docs-invalid-preview"
                ),
                href: "/docs/components/input-otp/examples/invalid",
                linkText: "Open standalone Input OTP Invalid example",
              }),
              docsExampleBlock({
                title: "Four Digits",
                testId: "docs-example-block-input-otp-four-digits",
                preview: DocsPreviewsEI.inputOtpFourDigitsExamplePreview(
                  model.inputOtpFourDigitsExample,
                  "input-otp-docs-four-digits-preview"
                ),
                href: "/docs/components/input-otp/examples/four-digits",
                linkText: "Open standalone Input OTP Four Digits example",
              }),
              docsExampleBlock({
                title: "Alphanumeric",
                testId: "docs-example-block-input-otp-alphanumeric",
                preview: DocsPreviewsEI.inputOtpAlphanumericExamplePreview(
                  model.inputOtpAlphanumericExample,
                  "input-otp-docs-alphanumeric-preview"
                ),
                href: "/docs/components/input-otp/examples/alphanumeric",
                linkText: "Open standalone Input OTP Alphanumeric example",
              }),
              docsExampleBlock({
                title: "Form",
                testId: "docs-example-block-input-otp-form",
                preview: DocsPreviewsEI.inputOtpFormExamplePreview(
                  model.inputOtpFormExample,
                  "input-otp-docs-form-preview"
                ),
                href: "/docs/components/input-otp/examples/form",
                linkText: "Open standalone Input OTP Form example",
              }),
              docsExampleBlock({
                title: "RTL",
                testId: "docs-example-block-input-otp-rtl",
                preview: DocsPreviewsEI.inputOtpRtlExamplePreview(
                  model.inputOtpRtlExample,
                  "input-otp-docs-rtl-preview"
                ),
                href: "/docs/components/input-otp/examples/rtl",
                linkText: "Open standalone Input OTP RTL example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/input-otp.json\nbunx shadcn@latest add <registry-url>/input-otp-basic.json\nbunx shadcn@latest add <registry-url>/input-otp-pattern.json",
        usageBody:
          "Import the Input OTP helpers and keep interactive state in the parent Foldkit model.",
        usageCode: `import * as InputOtp from "./ui/input-otp";

InputOtp.rootView<Message>({
  children: [
    InputOtp.groupView<Message>({
      children: model.digits.slice(0, 3).map(slotView),
    }),
    InputOtp.separatorView<Message>(),
    InputOtp.groupView<Message>({
      children: model.digits.slice(3).map(slotView),
    }),
  ],
});`,
        integrationCode:
          "The Basic example stores slot values in the Foldkit model, distributes multi-character input across following slots, and moves focus with entry, ArrowLeft, ArrowRight, and Backspace on an empty slot. Pass inputMode or pattern to slotView when a numeric-only code is required.",
        anatomySection: docsAnatomyBlock(
          `InputOtp.rootView<Message>({
  children: [
    InputOtp.groupView<Message>({
      children: [
        InputOtp.slotView<Message>({ value, ariaLabel, onInput }),
      ],
    }),
    InputOtp.separatorView<Message>(),
  ],
});`
        ),
        includeStyling: false,
        includeKeyboardInteraction: false,
        apiItems: [
          "rootView(config): renders the OTP input wrapper.",
          "groupView(config): groups adjacent digit slots.",
          "slotView(config): renders one controlled maxlength=1 input with numeric inputmode, one-time-code autocomplete, value, ariaLabel, and onInput.",
          "separatorView(): renders an aria-hidden visual separator.",
          "Class hooks include root, group, slot, and separator.",
        ],
        accessibilityItems: [
          "Each digit is a native text input with its own aria-label.",
          "Slots set maxlength=1 and inputmode=numeric while validation remains parent-owned.",
          "The separator is aria-hidden so assistive technology reads the code fields without extra punctuation.",
        ],
        coverageItems: [
          "Registry scene tests verify slot attributes, active/filled data hooks, groups, and separator behavior.",
          "Example scene tests verify digit updates and numeric normalization.",
          "Registry checks verify metadata, generated JSON, source snapshots, example coverage, and docs nav origin grouping.",
        ],
      }),
    ]
  );
};

const nativeSelectDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Native Select"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A native select field wrapper with label, trigger, option, and description helpers for controlled Foldkit forms.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/native-select" },
        { label: "Examples", value: "basic, handle, rtl, vertical" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Native Select wraps the browser select element with shadcn-style label, trigger, description, option, and class-hook helpers."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-native-select-basic",
                preview: DocsPreviewsNZ.nativeSelectBasicExamplePreview(
                  model.nativeSelectBasicExample,
                  "native-select-docs-basic-preview"
                ),
                href: "/docs/components/native-select/examples/basic",
                linkText: "Open standalone Native Select Basic example",
              }),
              docsExampleBlock({
                title: "Disabled",
                testId: "docs-example-block-native-select-disabled",
                preview: DocsPreviewsNZ.nativeSelectDisabledExamplePreview(
                  model.nativeSelectDisabledExample,
                  "native-select-docs-disabled-preview"
                ),
                href: "/docs/components/native-select/examples/disabled",
                linkText: "Open standalone Native Select Disabled example",
              }),
              docsExampleBlock({
                title: "Groups",
                testId: "docs-example-block-native-select-groups",
                preview: DocsPreviewsNZ.nativeSelectGroupsExamplePreview(
                  model.nativeSelectGroupsExample,
                  "native-select-docs-groups-preview"
                ),
                href: "/docs/components/native-select/examples/groups",
                linkText: "Open standalone Native Select Groups example",
              }),
              docsExampleBlock({
                title: "Invalid",
                testId: "docs-example-block-native-select-invalid",
                preview: DocsPreviewsNZ.nativeSelectInvalidExamplePreview(
                  model.nativeSelectInvalidExample,
                  "native-select-docs-invalid-preview"
                ),
                href: "/docs/components/native-select/examples/invalid",
                linkText: "Open standalone Native Select Invalid example",
              }),
              docsExampleBlock({
                title: "RTL",
                testId: "docs-example-block-native-select-rtl",
                preview: DocsPreviewsNZ.nativeSelectRtlExamplePreview(
                  model.nativeSelectRtlExample,
                  "native-select-docs-rtl-preview"
                ),
                href: "/docs/components/native-select/examples/rtl",
                linkText: "Open standalone Native Select RTL example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/native-select.json\nbunx shadcn@latest add <registry-url>/native-select-basic.json\nbunx shadcn@latest add <registry-url>/native-select-disabled.json\nbunx shadcn@latest add <registry-url>/native-select-groups.json\nbunx shadcn@latest add <registry-url>/native-select-invalid.json\nbunx shadcn@latest add <registry-url>/native-select-rtl.json",
        usageBody:
          "Import the Native Select helpers and keep interactive state in the parent Foldkit model.",
        usageCode: `import * as NativeSelect from "./ui/native-select";

NativeSelect.rootView<Message>({
  children: [
    NativeSelect.labelView<Message>({
      forId: "fruit",
      children: [h.span([], ["Fruit"])],
    }),
    NativeSelect.triggerView<Message>({
      id: "fruit",
      value: model.fruit,
      onChange: (value) => ChangedFruit({ value }),
      options: fruitOptions,
      describedById: "fruit-description",
    }),
    NativeSelect.descriptionView<Message>({
      id: "fruit-description",
      children: [h.span([], [\`Selected: \${model.fruit}\`])],
    }),
  ],
});`,
        integrationCode:
          "The Basic example keeps the selected value in the Foldkit model and routes select changes through ChangedFruit.",
        anatomySection: docsAnatomyBlock(
          `NativeSelect.rootView<Message>({
  children: [
    NativeSelect.labelView<Message>({ forId, children }),
    NativeSelect.triggerView<Message>({
      id,
      value,
      onChange,
      options,
      describedById,
    }),
    NativeSelect.descriptionView<Message>({ id, children }),
  ],
});`
        ),
        includeStyling: false,
        includeKeyboardInteraction: false,
        apiItems: [
          "rootView(config): renders the native select field wrapper.",
          "labelView(config): renders a label connected by forId.",
          "triggerView(config): renders a controlled select with id, value, onChange, flat or grouped options, ariaLabel, describedById, disabled, and className.",
          "descriptionView(config): renders helper text that can be referenced by describedById.",
          "Class hooks include root, label, trigger, and description.",
        ],
        accessibilityItems: [
          "The field uses a native select for built-in keyboard, focus, and option semantics.",
          "labelView connects visible text to the select with for/id.",
          "triggerView can reference descriptionView through aria-describedby.",
        ],
        coverageItems: [
          "Registry scene tests verify label wiring, option rendering, disabled options, description linkage, and class hooks.",
          "Example scene tests verify changing the selected fruit updates model-owned feedback.",
          "Registry checks verify metadata, generated JSON, source snapshots, example coverage, and docs nav origin grouping.",
        ],
      }),
    ]
  );
};

const sheetDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Sheet"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A controlled side-panel dialog with overlay, labelled content, header, footer, and close-button helpers.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/sheet" },
        { label: "Examples", value: "basic, field, rtl" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Sheet is a controlled shadcn-style dialog surface for side-panel workflows. The registry component owns the anatomy helpers and class hooks, while open/closed state stays in the parent Foldkit model."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-sheet-basic",
                preview: DocsPreviewsNZ.sheetBasicExamplePreview(
                  model.sheetBasicExample,
                  "sheet-docs-basic-preview"
                ),
                href: "/docs/components/sheet/examples/basic",
                linkText: "Open standalone Sheet Basic example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/sheet.json\nbunx shadcn@latest add <registry-url>/sheet-basic.json",
        usageBody:
          "Import the Sheet helpers, store open state in the parent Foldkit model, and render Portal only while the sheet is open.",
        usageCode: 'import * as Sheet from "./ui/sheet";',
        integrationCode:
          "The Basic example uses OpenedSheet and ClosedSheet messages to update model.open; triggerView dispatches open, closeView and Save changes dispatch close, and contentView receives aria-labelledby/aria-describedby IDs from the title and description helpers.",
        anatomySection: docsAnatomyBlock(
          "Sheet.rootView({ children: [Sheet.triggerView(...), Sheet.portalView({ children: [Sheet.overlayView(...), Sheet.contentView(...)] })] });"
        ),
        includeStyling: false,
        includeKeyboardInteraction: false,
        apiItems: [
          "rootView(config): renders the component shell with data-slot=sheet.",
          "triggerView(config): renders the native button that dispatches the parent-owned open message.",
          "portalView(config): returns empty when open=false and renders overlay/content children when open=true.",
          "overlayView(config): renders the fixed backdrop with data-slot=sheet-overlay.",
          "contentView(config): renders role=dialog, aria-modal=true, and optional aria-labelledby/aria-describedby links.",
          "headerView, titleView, descriptionView, footerView, and closeView expose shadcn-style sheet parts.",
          "Basic example exports init, update, view, Model, and Message for docs and standalone routes.",
          "Class-name exports expose styling hooks for root, trigger, portal, overlay, content, header, title, description, close, and footer.",
        ],
        accessibilityItems: [
          "Content renders role=dialog with aria-modal=true.",
          "Content can reference title and description IDs with aria-labelledby and aria-describedby.",
          "Trigger, Save changes, and Close sheet are native buttons with accessible names.",
          "Interactive state is controlled by Foldkit messages so behavior remains testable.",
        ],
        coverageItems: [
          "Registry scene tests verify the component semantics and documented state hooks.",
          "Example scene tests verify the Basic example behavior.",
          "Registry checks verify metadata, generated JSON, source snapshots, example coverage, and docs nav origin grouping.",
        ],
      }),
    ]
  );
};

const sonnerDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Sonner"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A shadcn-style presentational toast layer for Foldkit applications.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/sonner" },
        { label: "Examples", value: "basic" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Sonner is the lightweight view-layer counterpart to the stateful Foldkit Toast primitive. It gives registry consumers shadcn-style slot helpers, class exports, and copy-friendly markup while leaving toast state, timing, stacking, and dismissal policy in the parent model or in Foldkit Toast."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-sonner-basic",
                preview: DocsPreviewsNZ.sonnerBasicExamplePreview(
                  model.sonnerBasicExample,
                  "sonner-docs-basic-preview"
                ),
                href: "/docs/components/sonner/examples/basic",
                linkText: "Open standalone Sonner Basic example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/sonner.json\nbunx shadcn@latest add <registry-url>/sonner-basic.json",
        usageBody:
          "Import the Sonner helpers when you want shadcn-compatible toast markup without adopting the managed Foldkit Toast model.",
        usageCode: 'import * as Sonner from "./ui/sonner";',
        integrationCode:
          "Parent model state and messages own this example; Sonner only renders the viewport and toast markup. For production toast queues, use Foldkit Toast as the stateful implementation and render Sonner-styled entries from that model.",
        anatomySection: docsAnatomyBlock(
          'Sonner.viewportView({ children: [Sonner.toastView({ title: "Saved" })] });'
        ),
        includeStyling: false,
        includeKeyboardInteraction: false,
        apiItems: [
          "viewportView(config): renders the fixed aria-live toast stack with data-slot hooks.",
          "toastView(config): renders one status toast with title, optional description, action, and dismiss control.",
          "Basic example exports init, update, view, Model, and Message for docs and standalone routes.",
          "Class-name exports expose shadcn-style styling hooks for viewport, toast, title, description, action, and close slots.",
        ],
        accessibilityItems: [
          "The viewport uses aria-live=polite and aria-atomic=true for non-interruptive announcements.",
          "Each toast renders role=status and the optional close control has a Dismiss toast label.",
          "Interactive state is controlled by Foldkit messages so behavior remains testable.",
        ],
        coverageItems: [
          "Registry scene tests verify the component semantics and documented state hooks.",
          "Example scene tests verify the Basic example behavior.",
          "Registry checks verify metadata, generated JSON, source snapshots, example coverage, and docs nav origin grouping.",
        ],
      }),
    ]
  );
};

const dataTableDocsView = (model: Model): Html => {
  const h = html<Message>();
  const exampleBlock = (
    title: string,
    slug: string,
    preview: Html,
    href: string
  ): Html =>
    docsExampleBlock({
      title,
      testId: `docs-example-block-data-table-${slug}`,
      preview,
      href,
      linkText: `Open standalone Data Table ${title} example`,
    });

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Data Table"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A shadcn-style data-table guide slice with Foldkit-owned sorting, filtering, pagination, column visibility, row actions, and row selection.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/data-table" },
        {
          label: "Examples",
          value:
            "basic, row actions, pagination, sorting, filtering, visibility, row selection",
        },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Data Table follows shadcn's payments guide rather than a single monolithic primitive. The reusable helpers render table anatomy and pure row operations while each Foldkit example owns its sort, filter, pagination, visibility, action menu, and selection state. The current examples now use the origin payment rows, Email sorting step, Filter emails toolbar, Columns control, row action menu labels, pagination, and row selection summary; remaining parity work is replacing the simplified local controls with full dropdown/focus behavior and any missing guide section structure."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              exampleBlock(
                "Basic",
                "basic",
                DocsPreviewsCD.dataTableBasicExamplePreview(
                  model.dataTableBasicExample,
                  "data-table-docs-basic-preview"
                ),
                "/docs/components/data-table/examples/basic"
              ),
              exampleBlock(
                "Row Actions",
                "row-actions",
                DocsPreviewsCD.dataTableRowActionsExamplePreview(
                  model.dataTableRowActionsExample,
                  "data-table-docs-row-actions-preview"
                ),
                "/docs/components/data-table/examples/row-actions"
              ),
              exampleBlock(
                "Pagination",
                "pagination",
                DocsPreviewsCD.dataTablePaginationExamplePreview(
                  model.dataTablePaginationExample,
                  "data-table-docs-pagination-preview"
                ),
                "/docs/components/data-table/examples/pagination"
              ),
              exampleBlock(
                "Sorting",
                "sorting",
                DocsPreviewsCD.dataTableSortingExamplePreview(
                  model.dataTableSortingExample,
                  "data-table-docs-sorting-preview"
                ),
                "/docs/components/data-table/examples/sorting"
              ),
              exampleBlock(
                "Filtering",
                "filtering",
                DocsPreviewsCD.dataTableFilteringExamplePreview(
                  model.dataTableFilteringExample,
                  "data-table-docs-filtering-preview"
                ),
                "/docs/components/data-table/examples/filtering"
              ),
              exampleBlock(
                "Visibility",
                "visibility",
                DocsPreviewsCD.dataTableVisibilityExamplePreview(
                  model.dataTableVisibilityExample,
                  "data-table-docs-visibility-preview"
                ),
                "/docs/components/data-table/examples/visibility"
              ),
              exampleBlock(
                "Row Selection",
                "row-selection",
                DocsPreviewsCD.dataTableRowSelectionExamplePreview(
                  model.dataTableRowSelectionExample,
                  "data-table-docs-row-selection-preview"
                ),
                "/docs/components/data-table/examples/row-selection"
              ),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/data-table.json\nbunx shadcn@latest add <registry-url>/data-table-basic.json\nbunx shadcn@latest add <registry-url>/data-table-sorting.json\nbunx shadcn@latest add <registry-url>/data-table-filtering.json",
        usageBody:
          "Keep table behavior in the parent model and pass derived rows into the view helpers.",
        usageCode:
          'import * as DataTable from "./ui/data-table";\n\nDataTable.paymentsTableView<Message>({ payments: rows });',
        integrationCode:
          "filter: S.String;\nClickedSort: () => [DataTable.toggleSort(model, column), []];",
        anatomySection: docsAnatomyBlock(
          "DataTable.toolbarView<Message>({ children });\nDataTable.paymentsTableView<Message>({ payments, selectedRows });\nDataTable.paginationView<Message>({ pagination, totalRows, onPrevious, onNext });"
        ),
        apiItems: [
          "paymentsTableView(config): renders table, header, body, optional selection, and optional action cells.",
          "toolbarView(config): renders filter and column-control layout.",
          "sortHeaderView(config): renders an accessible sortable header button.",
          "paginationView(config): renders previous/next controls from parent-owned pagination state.",
          "filterPayments, sortPayments, paginatePayments, toggleRowSelection, and toggleVisibleSelection are pure model helpers.",
          "VirtualList integration is deferred for large-data tables and should not replace the default semantic table examples.",
        ],
        accessibilityItems: [
          "The default view uses native table, thead, tbody, tr, th, and td elements.",
          "Selection controls are native checkboxes with row-specific accessible labels.",
          "Sortable headers are native buttons with stable accessible labels.",
        ],
        coverageItems: [
          "Registry scene tests verify table anatomy and pure helper behavior.",
          "Example scene tests verify row actions, pagination, sorting, filtering, visibility, row selection, and inert basic rendering.",
          "Registry checks verify metadata, generated JSON, source snapshots, example coverage, and docs nav origin grouping.",
        ],
      }),
    ]
  );
};

const directionDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Direction"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A shadcn-style direction provider helper for setting left-to-right or right-to-left layout context in Foldkit views.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/direction" },
        { label: "Examples", value: "basic" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        'Direction mirrors shadcn DirectionProvider as a small Foldkit wrapper around h.Dir("ltr") and h.Dir("rtl"). Direction stays layout context, not component model state; individual components inherit it from the document, page region, or this helper.'
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-direction-basic",
                preview: DocsPreviewsCD.directionBasicExamplePreview(
                  model.directionBasicExample,
                  "direction-docs-basic-preview"
                ),
                href: "/docs/components/direction/examples/basic",
                linkText: "Open standalone Direction Basic example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/direction.json\nbunx shadcn@latest add <registry-url>/direction-basic.json",
        usageBody:
          "Wrap a subtree with Direction.view and keep the chosen direction in the parent model when users can switch language direction.",
        usageCode:
          'import * as Direction from "./ui/direction";\n\nDirection.view<Message>({\n  direction: "rtl",\n  children: [content],\n});',
        integrationCode:
          'direction: S.Literal("ltr", "rtl");\nSelectedDirection: ({ direction }) => [\n  evo(model, { direction: () => direction }),\n  [],\n];',
        anatomySection: docsAnatomyBlock(
          "Direction.view<Message>({\n  direction: model.direction,\n  children: [pageContent],\n});"
        ),
        apiItems: [
          "view(config): renders a wrapper with dir, data-slot=direction, and data-direction.",
          "buttonView(config): renders an optional native direction toggle button for parent-owned state.",
          "Direction: exported type alias for ltr | rtl.",
          "DirectionViewConfig and DirectionButtonViewConfig document the public helper props.",
        ],
        accessibilityItems: [
          "The helper uses the native dir attribute so browser bidi behavior applies to descendants.",
          "Direction switching controls are native buttons with explicit accessible labels.",
          "Direction is inherited layout context; component state should stay direction-agnostic unless behavior truly differs.",
        ],
        coverageItems: [
          "Registry scene tests verify the dir-backed provider renders children.",
          "Example scene tests verify LTR and RTL switching.",
          "Registry checks verify metadata, generated JSON, source snapshots, example coverage, and docs nav origin grouping.",
        ],
      }),
    ]
  );
};

const itemDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Item"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A shadcn-style presentation component for composing list rows, settings rows, links, media blocks, and grouped item layouts in Foldkit views.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/item" },
        {
          label: "Examples",
          value:
            "basic, variant, size, icon, avatar, image, group, header, link, rtl",
        },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Item mirrors the Tailwind shadcn item component as a composable view helper set. It is presentation-first: anchors render when href is provided, non-link rows stay inert by default, and parent components own any state or behavior."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-item-basic",
                preview: DocsPreviewsEI.itemBasicExamplePreview(
                  model.itemBasicExample,
                  "item-docs-basic-preview"
                ),
                href: "/docs/components/item/examples/basic",
                linkText: "Open standalone Item Basic example",
              }),
              docsExampleBlock({
                title: "Variant",
                testId: "docs-example-block-item-variant",
                preview: DocsPreviewsEI.itemVariantExamplePreview(
                  model.itemVariantExample,
                  "item-docs-variant-preview"
                ),
                href: "/docs/components/item/examples/variant",
                linkText: "Open standalone Item Variant example",
              }),
              docsExampleBlock({
                title: "Size",
                testId: "docs-example-block-item-size",
                preview: DocsPreviewsEI.itemSizeExamplePreview(
                  model.itemSizeExample,
                  "item-docs-size-preview"
                ),
                href: "/docs/components/item/examples/size",
                linkText: "Open standalone Item Size example",
              }),
              docsExampleBlock({
                title: "Icon",
                testId: "docs-example-block-item-icon",
                preview: DocsPreviewsEI.itemIconExamplePreview(
                  model.itemIconExample,
                  "item-docs-icon-preview"
                ),
                href: "/docs/components/item/examples/icon",
                linkText: "Open standalone Item Icon example",
              }),
              docsExampleBlock({
                title: "Avatar",
                testId: "docs-example-block-item-avatar",
                preview: DocsPreviewsEI.itemAvatarExamplePreview(
                  model.itemAvatarExample,
                  "item-docs-avatar-preview"
                ),
                href: "/docs/components/item/examples/avatar",
                linkText: "Open standalone Item Avatar example",
              }),
              docsExampleBlock({
                title: "Image",
                testId: "docs-example-block-item-image",
                preview: DocsPreviewsEI.itemImageExamplePreview(
                  model.itemImageExample,
                  "item-docs-image-preview"
                ),
                href: "/docs/components/item/examples/image",
                linkText: "Open standalone Item Image example",
              }),
              docsExampleBlock({
                title: "Group",
                testId: "docs-example-block-item-group",
                preview: DocsPreviewsEI.itemGroupExamplePreview(
                  model.itemGroupExample,
                  "item-docs-group-preview"
                ),
                href: "/docs/components/item/examples/group",
                linkText: "Open standalone Item Group example",
              }),
              docsExampleBlock({
                title: "Header",
                description:
                  "Matches the origin ItemHeader structure: a vertical item card with media/header content above the title and description.",
                testId: "docs-example-block-item-header",
                preview: DocsPreviewsEI.itemHeaderExamplePreview(
                  model.itemHeaderExample,
                  "item-docs-header-preview"
                ),
                href: "/docs/components/item/examples/header",
                linkText: "Open standalone Item Header example",
              }),
              docsExampleBlock({
                title: "Link",
                testId: "docs-example-block-item-link",
                preview: DocsPreviewsEI.itemLinkExamplePreview(
                  model.itemLinkExample,
                  "item-docs-link-preview"
                ),
                href: "/docs/components/item/examples/link",
                linkText: "Open standalone Item Link example",
              }),
              docsExampleBlock({
                title: "RTL",
                testId: "docs-example-block-item-rtl",
                preview: DocsPreviewsEI.itemRtlExamplePreview(
                  model.itemRtlExample,
                  "item-docs-rtl-preview"
                ),
                href: "/docs/components/item/examples/rtl",
                linkText: "Open standalone Item RTL example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/item.json\nbunx shadcn@latest add <registry-url>/item-basic.json",
        usageBody:
          "Compose Item.view from Item.mediaView, Item.contentView, and Item.actionsView. Pass href only when the whole row is a link.",
        usageCode:
          'import * as Item from "./ui/item";\n\nItem.view<Message>({\n  children: [\n    Item.mediaView({ variant: "icon", children: [icon] }),\n    Item.contentView([\n      Item.titleView("Notifications"),\n      Item.descriptionView("Manage workspace alerts"),\n    ]),\n  ],\n});',
        integrationCode:
          "Item is presentation-only. Use parent messages such as ClickedOpenSettings or SelectedNotificationChannel when a composed child control changes application state.",
        anatomySection: docsAnatomyBlock(
          'Item.groupView([\n  Item.headerView("Workspace"),\n  Item.view({\n    children: [\n      Item.mediaView({ variant: "avatar", children: [avatar] }),\n      Item.contentView([\n        Item.titleView("Ada Lovelace"),\n        Item.descriptionView("Owner"),\n      ]),\n      Item.actionsView([action]),\n    ],\n  }),\n  Item.separatorView(),\n]);'
        ),
        apiItems: [
          "view(config): renders a data-slot=item wrapper as a div, or an anchor when href is provided.",
          "groupView(children, className): groups related items with data-slot=item-group.",
          "separatorView(className): renders a visual separator with role=separator.",
          "headerView(children, className): renders a compact group header.",
          "mediaView(config): renders leading media with default, icon, avatar, or image variants.",
          "contentView(children, className): renders the flexible title and description column.",
          "titleView(children, className) and descriptionView(children, className): render item text anatomy.",
          "actionsView(children, className) and footerView(children, className): render trailing or supporting content regions.",
          "ItemVariant, ItemSize, ItemMediaVariant, ItemViewConfig, ItemPartViewConfig, and ItemMediaViewConfig describe the public helper props.",
        ],
        accessibilityItems: [
          "Rows with href render native anchors so browser link semantics, focus, and context-menu behavior stay intact.",
          "Rows without href are inert presentation wrappers; consumers add native controls inside actions or own the parent interaction.",
          "Separators use role=separator, and group examples include visible headers for scanability.",
          "The dropdown example from shadcn is intentionally deferred until the dropdown-menu dependency is promoted.",
        ],
        coverageItems: [
          "Registry scene tests verify item anatomy, anchor rendering, inert rows, groups, and separators.",
          "Example scene tests cover basic, variant, size, icon, avatar, image, group, header, link, and RTL examples.",
          "Registry checks verify metadata, generated JSON, source snapshots, example coverage, and docs nav origin grouping.",
        ],
      }),
    ]
  );
};

const labelDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Label"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A shadcn-style native label helper for accessible form control names in Foldkit views.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/label" },
        { label: "Examples", value: "basic" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Label is a small styled wrapper around the native label element. Use forId to associate visible text with a form control, and keep input value, validation, and disabled state in the parent model or a higher-level form component."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-label-basic",
                preview: DocsPreviewsJM.labelBasicExamplePreview(
                  model.labelBasicExample,
                  "label-docs-basic-preview"
                ),
                href: "/docs/components/label/examples/basic",
                linkText: "Open standalone Label Basic example",
              }),
              docsExampleBlock({
                title: "Field",
                testId: "docs-example-block-label-field",
                preview: DocsPreviewsJM.labelFieldExamplePreview(
                  model.labelFieldExample,
                  "label-docs-field-preview"
                ),
                href: "/docs/components/label/examples/field",
                linkText: "Open standalone Label Field example",
              }),
              docsExampleBlock({
                title: "RTL",
                testId: "docs-example-block-label-rtl",
                preview: DocsPreviewsJM.labelRtlExamplePreview(
                  model.labelRtlExample,
                  "label-docs-rtl-preview"
                ),
                href: "/docs/components/label/examples/rtl",
                linkText: "Open standalone Label RTL example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/label.json\nbunx shadcn@latest add <registry-url>/label-basic.json\nbunx shadcn@latest add <registry-url>/label-field.json\nbunx shadcn@latest add <registry-url>/label-rtl.json",
        usageBody:
          "Use Label.view with forId when visible copy should name a native input, select, textarea, or custom control that forwards an id.",
        usageCode:
          'import * as Label from "./ui/label";\n\nLabel.view<Message>({\n  forId: "email",\n  children: "Email",\n});',
        integrationCode:
          "email: S.String;\nUpdatedEmail: ({ value }) => [\n  evo(model, { email: () => value }),\n  [],\n];",
        anatomySection: docsAnatomyBlock(
          'Label.view<Message>({\n  forId: inputId,\n  required: true,\n  children: "Email",\n});'
        ),
        apiItems: [
          "view(config): renders a native label with data-slot=label.",
          "forId: optional control id forwarded to the native for attribute.",
          "required and disabled: optional booleans exposed as data-required and data-disabled styling hooks.",
          "children: visible label content as text or Html children.",
          "labelClassName and ViewConfig document the public styling and prop surface.",
        ],
        accessibilityItems: [
          "Use forId whenever the label names a separate form control.",
          "Do not use Label as a generic text primitive; it should name or describe user input.",
          "Disabled styling is visual only; the associated form control must also be disabled by the parent component.",
        ],
        coverageItems: [
          "Registry scene tests verify the native label association and data styling hooks.",
          "Example scene tests verify the labelled textbox accessible name and parent-owned input updates.",
          "Registry checks verify metadata, generated JSON, source snapshots, example coverage, and docs nav origin grouping.",
        ],
      }),
    ]
  );
};

const paginationDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Pagination"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A shadcn-style pagination navigation component for previous, next, page, and ellipsis links in Foldkit views.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/pagination" },
        { label: "Examples", value: "basic, simple, icons-only, rtl" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Pagination is presentation-first and uses native navigation and anchor semantics. Parent components own page state and decide whether links navigate with hrefs or route through application messages."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-pagination-basic",
                preview: DocsPreviewsNZ.paginationBasicExamplePreview(
                  model.paginationBasicExample,
                  "pagination-docs-basic-preview"
                ),
                href: "/docs/components/pagination/examples/basic",
                linkText: "Open standalone Pagination Basic example",
              }),
              docsExampleBlock({
                title: "Simple",
                testId: "docs-example-block-pagination-simple",
                preview: DocsPreviewsNZ.paginationSimpleExamplePreview(
                  model.paginationSimpleExample,
                  "pagination-docs-simple-preview"
                ),
                href: "/docs/components/pagination/examples/simple",
                linkText: "Open standalone Pagination Simple example",
              }),
              docsExampleBlock({
                title: "Icons Only",
                testId: "docs-example-block-pagination-icons-only",
                preview: DocsPreviewsNZ.paginationIconsOnlyExamplePreview(
                  model.paginationIconsOnlyExample,
                  "pagination-docs-icons-only-preview"
                ),
                href: "/docs/components/pagination/examples/icons-only",
                linkText: "Open standalone Pagination Icons Only example",
              }),
              docsExampleBlock({
                title: "RTL",
                testId: "docs-example-block-pagination-rtl",
                preview: DocsPreviewsNZ.paginationRtlExamplePreview(
                  model.paginationRtlExample,
                  "pagination-docs-rtl-preview"
                ),
                href: "/docs/components/pagination/examples/rtl",
                linkText: "Open standalone Pagination RTL example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/pagination.json\nbunx shadcn@latest add <registry-url>/pagination-basic.json\nbunx shadcn@latest add <registry-url>/pagination-simple.json\nbunx shadcn@latest add <registry-url>/pagination-icons-only.json\nbunx shadcn@latest add <registry-url>/pagination-rtl.json",
        usageBody:
          "Compose Pagination.rootView with content, item, link, previous, next, and ellipsis helpers. Keep page state in the parent model when links should update in place.",
        usageCode:
          'import * as Pagination from "./ui/pagination";\n\nPagination.rootView<Message>({\n  children: [\n    Pagination.contentView({ children: [items] }),\n  ],\n});',
        integrationCode:
          "currentPage: S.Number;\nClickedPage: ({ page }) => [\n  evo(model, { currentPage: () => page }),\n  [],\n];",
        anatomySection: docsAnatomyBlock(
          'Pagination.rootView([\n  Pagination.contentView({\n    children: [\n      Pagination.itemView({ children: [Pagination.previousView({ href })] }),\n      Pagination.itemView({ children: [Pagination.linkView({ href, active, children: ["1"] })] }),\n      Pagination.itemView({ children: [Pagination.ellipsisView()] }),\n      Pagination.itemView({ children: [Pagination.nextView({ href })] }),\n    ],\n  }),\n]);'
        ),
        apiItems: [
          "rootView(config): renders a nav landmark with aria-label and data-slot=pagination.",
          "contentView(config): renders the pagination list with data-slot=pagination-content.",
          "itemView(config): renders each list item wrapper.",
          "linkView(config): renders a page anchor with active, disabled, aria-label, and aria-current support.",
          "previousView(config) and nextView(config): render labelled navigation anchors.",
          "ellipsisView(config): renders an inert ellipsis with an accessible label.",
          "view(pages, className): convenience helper for simple page arrays.",
        ],
        accessibilityItems: [
          "Root pagination is a native nav landmark labelled pagination by default.",
          "The active page link exposes aria-current=page.",
          "Previous and Next are native anchors with accessible labels.",
          "Ellipsis is inert text, not a button, unless the parent provides a real interaction pattern elsewhere.",
        ],
        coverageItems: [
          "Registry scene tests verify nav semantics, active page state, and inert ellipsis behavior.",
          "Example scene tests verify the shadcn basic page links, Previous/Next links, and active page semantics.",
          "Registry checks verify metadata, generated JSON, source snapshots, example coverage, and docs nav origin grouping.",
        ],
      }),
    ]
  );
};

const resizableDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Resizable"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A shadcn-style resizable panel composition for controlled panel layouts in Foldkit views.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/resizable" },
        { label: "Examples", value: "basic" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Resizable provides shadcn panel anatomy with controlled size styling. The Basic example owns panel sizes in Foldkit model state and supports pointer dragging plus ArrowLeft and ArrowRight keyboard resizing on the separator."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-resizable-basic",
                preview: DocsPreviewsNZ.resizableBasicExamplePreview(
                  model.resizableBasicExample,
                  "resizable-docs-basic-preview"
                ),
                href: "/docs/components/resizable/examples/basic",
                linkText: "Open standalone Resizable Basic example",
              }),
              docsExampleBlock({
                title: "Handle",
                testId: "docs-example-block-resizable-handle",
                preview: DocsPreviewsNZ.resizableHandleExamplePreview(
                  model.resizableHandleExample,
                  "resizable-docs-handle-preview"
                ),
                href: "/docs/components/resizable/examples/handle",
                linkText: "Open standalone Resizable Handle example",
              }),
              docsExampleBlock({
                title: "RTL",
                testId: "docs-example-block-resizable-rtl",
                preview: DocsPreviewsNZ.resizableRtlExamplePreview(
                  model.resizableRtlExample,
                  "resizable-docs-rtl-preview"
                ),
                href: "/docs/components/resizable/examples/rtl",
                linkText: "Open standalone Resizable RTL example",
              }),
              docsExampleBlock({
                title: "Vertical",
                testId: "docs-example-block-resizable-vertical",
                preview: DocsPreviewsNZ.resizableVerticalExamplePreview(
                  model.resizableVerticalExample,
                  "resizable-docs-vertical-preview"
                ),
                href: "/docs/components/resizable/examples/vertical",
                linkText: "Open standalone Resizable Vertical example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/resizable.json\nbunx shadcn@latest add <registry-url>/resizable-basic.json\nbunx shadcn@latest add <registry-url>/resizable-handle.json\nbunx shadcn@latest add <registry-url>/resizable-rtl.json\nbunx shadcn@latest add <registry-url>/resizable-vertical.json",
        usageBody:
          "Use Resizable.view for simple controlled layouts, or compose panelGroupView, panelView, and handleView directly when you need custom panel content.",
        usageCode:
          'import * as Resizable from "./ui/resizable";\n\nResizable.view<Message>({\n  panels: [\n    { size: 50, children: ["One"] },\n    { size: 50, children: ["Two"] },\n  ],\n});',
        integrationCode:
          "panelSizes: S.Array(S.Number);\nUpdatedPanelSizes: ({ sizes }) => [\n  evo(model, { panelSizes: () => sizes }),\n  [],\n];",
        anatomySection: docsAnatomyBlock(
          'Resizable.panelGroupView({\n  children: [\n    Resizable.panelView({ size: 50, children: ["One"] }),\n    Resizable.handleView(),\n    Resizable.panelView({ size: 50, children: ["Two"] }),\n  ],\n});'
        ),
        apiItems: [
          "panelGroupView(config): renders the group wrapper with data-slot=resizable-panel-group.",
          "panelView(config): renders a controlled-size panel with data-size and flex-basis styling.",
          "handleView(config): renders a separator handle with orientation metadata, optional children, and extra Foldkit attributes for parent-owned resize events.",
          "view(config): convenience helper for panels separated by handles.",
          "ResizableDirection, PanelGroupViewConfig, PanelViewConfig, HandleViewConfig, and PanelItem describe the public helper props.",
        ],
        accessibilityItems: [
          "The handle renders role=separator with aria-orientation and an accessible label.",
          "The Basic example makes the handle focusable and exposes aria-valuemin, aria-valuemax, and aria-valuenow while keyboard resizing changes panel size in five-point steps.",
          "Panel sizes are controlled presentation data owned by the parent model or surrounding layout.",
        ],
        coverageItems: [
          "Registry scene tests verify panel size hooks, separator semantics, and opt-in handle behavior.",
          "Example scene tests verify the shadcn basic two-panel composition, keyboard resizing, and pointer-drag update logic.",
          "Registry checks verify metadata, generated JSON, source snapshots, example coverage, and docs nav origin grouping.",
        ],
      }),
    ]
  );
};

const sidebarDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Sidebar"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A shadcn-style application sidebar composition for controlled app navigation layouts.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/sidebar" },
        { label: "Examples", value: "basic" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Sidebar provides the shadcn app-shell anatomy with parent-owned collapsed state, side/variant/collapsible metadata, provider composition, trigger, input, separator, group, menu, submenu, badge, action, skeleton, rail, and inset helpers. The Basic example demonstrates the default collapses-to-icons pattern with a content inset."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-sidebar-basic",
                preview: DocsPreviewsNZ.sidebarBasicExamplePreview(
                  model.sidebarBasicExample,
                  "sidebar-docs-basic-preview"
                ),
                href: "/docs/components/sidebar/examples/basic",
                linkText: "Open standalone Sidebar Basic example",
              }),
              docsExampleBlock({
                title: "Composition",
                testId: "docs-example-block-sidebar-composition",
                preview: DocsPreviewsNZ.sidebarCompositionExamplePreview(
                  model.sidebarCompositionExample,
                  "sidebar-docs-composition-preview"
                ),
                href: "/docs/components/sidebar/examples/composition",
                linkText: "Open standalone Sidebar Composition example",
              }),
              docsExampleBlock({
                title: "Controlled",
                testId: "docs-example-block-sidebar-controlled",
                preview: DocsPreviewsNZ.sidebarControlledExamplePreview(
                  model.sidebarControlledExample,
                  "sidebar-docs-controlled-preview"
                ),
                href: "/docs/components/sidebar/examples/controlled",
                linkText: "Open standalone Sidebar Controlled example",
              }),
              docsExampleBlock({
                title: "RTL",
                testId: "docs-example-block-sidebar-rtl",
                preview: DocsPreviewsNZ.sidebarRtlExamplePreview(
                  model.sidebarRtlExample,
                  "sidebar-docs-rtl-preview"
                ),
                href: "/docs/components/sidebar/examples/rtl",
                linkText: "Open standalone Sidebar RTL example",
              }),
              docsExampleBlock({
                title: "Variants",
                testId: "docs-example-block-sidebar-variants",
                preview: DocsPreviewsNZ.sidebarVariantsExamplePreview(
                  model.sidebarVariantsExample,
                  "sidebar-docs-variants-preview"
                ),
                href: "/docs/components/sidebar/examples/variants",
                linkText: "Open standalone Sidebar Variants example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/sidebar.json\nbunx shadcn@latest add <registry-url>/sidebar-basic.json\nbunx shadcn@latest add <registry-url>/sidebar-composition.json\nbunx shadcn@latest add <registry-url>/sidebar-controlled.json\nbunx shadcn@latest add <registry-url>/sidebar-rtl.json\nbunx shadcn@latest add <registry-url>/sidebar-variants.json",
        usageBody:
          "Use Sidebar.view for the default app-shell composition, or compose providerView, sidebarView, triggerView, inputView, separatorView, group helpers, menu helpers, railView, and insetView directly for custom layouts.",
        usageCode:
          'import * as Sidebar from "./ui/sidebar";\n\nSidebar.view<Message>({\n  state: model.sidebarState,\n  items: [\n    { label: "Dashboard", icon: "D", active: true },\n    { label: "Projects", icon: "P" },\n  ],\n  children: [pageContent],\n});',
        integrationCode:
          'sidebarState: S.Literal("expanded", "collapsed");\nClickedToggleSidebar: () => [\n  evo(model, {\n    sidebarState: (state) =>\n      state === "expanded" ? "collapsed" : "expanded",\n  }),\n  [],\n];',
        anatomySection: docsAnatomyBlock(
          'Sidebar.providerView({\n  children: [\n    Sidebar.sidebarView({\n      state: model.sidebarState,\n      side: "left",\n      variant: "sidebar",\n      collapsible: "icon",\n      children: [\n        Sidebar.headerView({\n          children: [\n            Sidebar.triggerView({\n              label: "Toggle Sidebar",\n              onClick: ClickedToggleSidebar(),\n            }),\n            Sidebar.inputView({ label: "Search", placeholder: "Search" }),\n          ],\n        }),\n        Sidebar.separatorView(),\n        Sidebar.contentView({ children: [group] }),\n      ],\n    }),\n    Sidebar.railView(),\n    Sidebar.insetView({ children: [pageContent] }),\n  ],\n});'
        ),
        apiItems: [
          "providerView(config): renders the app-shell wrapper with data-slot=sidebar-provider.",
          "sidebarView(config): renders the labelled aside with data-slot=sidebar plus data-state, data-side, data-variant, and data-collapsible.",
          "triggerView(config), inputView(config), and separatorView(config) expose the shadcn SidebarTrigger, SidebarInput, and SidebarSeparator roles as Foldkit helpers.",
          "headerView, contentView, footerView, groupView, groupLabelView, groupActionView, and groupContentView expose the shadcn group anatomy.",
          "menuButtonView(config): renders a native button or anchor with icon, label, active state, aria-current, and optional Foldkit click message.",
          "menuActionView, menuBadgeView, menuSubView, menuSubItemView, menuSubButtonView, and menuSkeletonView cover the menu action, badge, submenu, and loading anatomy.",
          "railView(): renders the decorative sidebar rail.",
          "insetView(config): renders the main content inset.",
          "view(config): convenience helper for a default collapsible app sidebar composition.",
        ],
        accessibilityItems: [
          "The sidebar root is an aside labelled Application sidebar.",
          "Menu actions are native buttons or anchors with accessible names even when labels are visually collapsed.",
          "Active menu items expose aria-current=page.",
          "Collapsed state is controlled by parent model state and reflected through data-state for visual styling.",
          "The trigger and action helpers accept parent messages, preserving Foldkit's unidirectional update flow instead of mutating open state internally.",
        ],
        coverageItems: [
          "Registry scene tests verify sidebar anatomy slots, side/variant/collapsible metadata, collapsed state, active menu semantics, links, and click wiring.",
          "Example scene tests verify collapse/expand behavior and parent-owned active item selection.",
          "Registry checks verify metadata, generated JSON, source snapshots, example coverage, and docs nav origin grouping.",
        ],
      }),
    ]
  );
};

const tableDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Table"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A responsive native table composition with header, body, row, cell, caption, and horizontal overflow helpers.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/table" },
        { label: "Examples", value: "basic" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Table mirrors the shadcn recent invoices example with semantic native table markup. Use Data Table for sorting, filtering, pagination, visibility, and row-selection workflows."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-table-basic",
                preview: DocsPreviewsNZ.tableBasicExamplePreview(
                  model.tableBasicExample,
                  "table-docs-basic-preview"
                ),
                href: "/docs/components/table/examples/basic",
                linkText: "Open standalone Table Basic example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/table.json\nbunx shadcn@latest add <registry-url>/table-basic.json",
        usageBody:
          "Use Table.invoicesTableView for the default shadcn example, or compose rootView, headerView, bodyView, rowView, headView, cellView, captionView, and footerView directly.",
        usageCode:
          'import * as Table from "./ui/table";\n\nTable.rootView<Message>({\n  children: [\n    Table.captionView(["A list of your recent invoices."]),\n    Table.headerView({ children: [headerRow] }),\n    Table.bodyView({ children: invoiceRows }),\n  ],\n});',
        integrationCode:
          "Table is presentation-only. Keep sorting, filtering, pagination, and row-selection in parent-owned Foldkit model state, or use the Data Table component for the full shadcn guide workflow.",
        anatomySection: docsAnatomyBlock(
          'Table.rootView({\n  children: [\n    Table.captionView(["A list of your recent invoices."]),\n    Table.headerView({ children: [Table.rowView({ children: [heads] })] }),\n    Table.bodyView({ children: rows }),\n    Table.footerView({ children: [footerRow] }),\n  ],\n});'
        ),
        apiItems: [
          "rootView(config): renders the responsive overflow wrapper and native table with data-slot=table-container and data-slot=table.",
          "captionView(children): renders the native caption with data-slot=table-caption.",
          "headerView, bodyView, and footerView render the native table sections.",
          "rowView(config): renders a native tr with data-slot=table-row.",
          "headView(config): renders a native th with optional right alignment.",
          "cellView(config): renders a native td with optional right alignment and custom attributes such as colspan.",
          "invoicesTableView(): renders the default shadcn recent invoices example.",
        ],
        accessibilityItems: [
          "The component uses native table, caption, thead, tbody, tfoot, tr, th, and td elements.",
          "Column headers are native th elements so screen readers can associate header and cell content.",
          "The caption gives the table an accessible summary matching the shadcn example.",
          "Horizontal overflow is handled by the root wrapper without changing table semantics.",
        ],
        coverageItems: [
          "Registry scene tests verify caption, header, cell, and footer data-slot hooks.",
          "Example scene tests verify the shadcn invoice table content and total row.",
          "Registry checks verify metadata, generated JSON, source snapshots, example coverage, and docs nav origin grouping.",
        ],
      }),
    ]
  );
};

const cardDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Card"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A shadcn-style layout component for grouping related content into header, content, and footer regions.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/card" },
        { label: "Examples", value: "basic, size, spacing, image, RTL" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Card v1 documents a static container pattern: semantic composition helpers, reusable region classes, and parent-owned content without introducing local state."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-card-basic",
                preview: DocsPreviewsCD.cardBasicExamplePreview(
                  model.cardBasicExample,
                  "card-docs-basic-preview"
                ),
                href: "/docs/components/shadcn-card/examples/basic",
                linkText: "Open standalone Card Basic example",
              }),
              docsExampleBlock({
                title: "Size",
                testId: "docs-example-block-card-size",
                preview: DocsPreviewsCD.cardSizeExamplePreview(
                  model.cardSizeExample,
                  "card-docs-size-preview"
                ),
                href: "/docs/components/shadcn-card/examples/size",
                linkText: "Open standalone Card Size example",
              }),
              docsExampleBlock({
                title: "Spacing",
                testId: "docs-example-block-card-spacing",
                preview: DocsPreviewsCD.cardSpacingExamplePreview(
                  model.cardSpacingExample,
                  "card-docs-spacing-preview"
                ),
                href: "/docs/components/shadcn-card/examples/spacing",
                linkText: "Open standalone Card Spacing example",
              }),
              docsExampleBlock({
                title: "Image",
                testId: "docs-example-block-card-image",
                preview: DocsPreviewsCD.cardImageExamplePreview(
                  model.cardImageExample,
                  "card-docs-image-preview"
                ),
                href: "/docs/components/shadcn-card/examples/image",
                linkText: "Open standalone Card Image example",
              }),
              docsExampleBlock({
                title: "RTL",
                testId: "docs-example-block-card-rtl",
                preview: DocsPreviewsCD.cardRtlExamplePreview(
                  model.cardRtlExample,
                  "card-docs-rtl-preview"
                ),
                href: "/docs/components/shadcn-card/examples/rtl",
                linkText: "Open standalone Card RTL example",
              }),
            ]
          ),
        ]
      ),
      docsInstallBlock(
        "bunx shadcn@latest add <registry-url>/shadcn-card.json\nbunx shadcn@latest add <registry-url>/card-basic.json\nbunx shadcn@latest add <registry-url>/card-size.json\nbunx shadcn@latest add <registry-url>/card-spacing.json\nbunx shadcn@latest add <registry-url>/card-image.json\nbunx shadcn@latest add <registry-url>/card-rtl.json"
      ),
      docsUsageBlock(
        "Use Card.view as the outer container and compose header, title, description, content, and footer helpers around app-owned content.",
        `import * as Card from "./ui/card";`
      ),
      docsTextListSection("Foldkit integration", [
        "This slice is a presentation component. The parent Foldkit model owns the data, events, and conditional rendering.",
        "The basic example is intentionally static because the separator utility is demonstrated by surrounding content, not an artificial action.",
      ]),
      docsStylingBlock(),
      docsTextListSection("Keyboard interaction", [
        "No component-owned keyboard behavior is required for this static presentation component.",
        "Any interactive controls rendered inside it keep their own native or primitive-backed keyboard contract.",
      ]),
      docsApiList([
        "view(children, className): renders the card shell.",
        "headerView(children, className): renders the card header region.",
        "titleView(label, className): renders the card title.",
        "descriptionView(label, className): renders supporting copy.",
        "contentView(children, className): renders primary card content.",
        "footerView(children, className): renders card actions or metadata.",
      ]),
      docsTextListSection("Accessibility", [
        "Cards do not add roles by default; use meaningful headings and links or buttons inside the card content.",
        "Keep interactive controls in the footer or content regions with visible accessible labels.",
      ]),
      docsTextListSection("Coverage", [
        "Registry scene tests verify the documented static rendering surface.",
        "Example scene tests verify the runnable example content and guard against artificial actions.",
        "Registry checks verify metadata, generated JSON, and example test coverage.",
      ]),
    ]
  );
};

const separatorDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Separator"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A Base UI-informed separator component for accessible horizontal and vertical content separation.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/separator" },
        { label: "Examples", value: "basic" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Separator v1 follows the Base UI single-part anatomy. It renders an accessible separator element with orientation state exposed through ARIA and data attributes."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-separator-basic",
                preview: DocsPreviewsNZ.separatorBasicExamplePreview(
                  model.separatorBasicExample,
                  "separator-docs-basic-preview"
                ),
                href: "/docs/components/separator/examples/basic",
                linkText: "Open standalone Separator Basic example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/separator.json\nbunx shadcn@latest add <registry-url>/separator-basic.json",
        usageBody:
          "Render Separator.view between related sections. Set orientation to vertical when the divider separates inline controls.",
        usageCode: `import * as Separator from "./ui/separator";

Separator.view<Message>();

Separator.view<Message>({
  orientation: "vertical",
});`,
        integrationCode: `// View
Separator.view<Message>({
  orientation: "vertical",
});`,
        anatomySection:
          docsAnatomyBlock(`import * as Separator from "./ui/separator";

Separator.view<Message>({
  orientation: "horizontal",
});`),
        includeStyling: false,
        includeKeyboardInteraction: false,
        apiReference: docsApiTable([
          {
            part: "Root",
            prop: "view(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders the single Base UI-style separator part with role, orientation ARIA, data attributes, classes, and inline style hooks.",
          },
          {
            part: "Root",
            prop: "orientation",
            type: '"horizontal" | "vertical"',
            defaultValue: "horizontal",
            description:
              "Controls visual classes, aria-orientation, and data-orientation.",
          },
          {
            part: "Root",
            prop: "className",
            type: "string",
            defaultValue: "-",
            description:
              "Additional class appended to the default orientation classes.",
          },
          {
            part: "Root",
            prop: "style",
            type: "SeparatorStyle",
            defaultValue: "-",
            description: "Inline styles applied to the separator element.",
          },
          {
            part: "Types",
            prop: "ViewConfig",
            type: "exported type",
            defaultValue: "-",
            description: "Config object for Separator.view.",
          },
          {
            part: "Types",
            prop: "SeparatorOrientation",
            type: '"horizontal" | "vertical"',
            defaultValue: "-",
            description: "Public orientation type used by view config.",
          },
          {
            part: "Types",
            prop: "SeparatorStyle",
            type: "Readonly<Record<string, string>>",
            defaultValue: "-",
            description: "Inline style object passed through Foldkit h.Style.",
          },
          {
            part: "Classes",
            prop: "separatorBaseClassName",
            type: "string",
            defaultValue: "-",
            description: "Default class export shared by both orientations.",
          },
          {
            part: "Classes",
            prop: "horizontalSeparatorClassName",
            type: "string",
            defaultValue: "-",
            description: "Default class export for horizontal separators.",
          },
          {
            part: "Classes",
            prop: "verticalSeparatorClassName",
            type: "string",
            defaultValue: "-",
            description: "Default class export for vertical separators.",
          },
          {
            part: "Utility",
            prop: "separatorClassNameByOrientation(orientation)",
            type: "function",
            defaultValue: "-",
            description:
              "Returns the default class string for the requested orientation.",
          },
          {
            part: "Root",
            prop: "data-orientation",
            type: "attribute",
            defaultValue: "horizontal",
            description:
              "Mirrors the current orientation for styling and tests.",
          },
        ]),
        apiItems: [],
        accessibilityItems: [
          "Root uses role=separator.",
          "aria-orientation mirrors the public orientation value.",
          "data-orientation mirrors the public orientation value for styling.",
          "No keyboard interaction is required because Separator is a read-only structural component.",
        ],
        coverageItems: [
          "Registry scene tests verify role, aria-orientation, data-orientation, class hooks, and style hooks.",
          "Example scene tests verify the runnable example content and inert static behavior.",
          "Registry checks verify metadata, generated JSON, and example test coverage.",
        ],
      }),
    ]
  );
};

const skeletonDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Skeleton"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A shadcn-style loading placeholder for reserving space while content is pending.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/skeleton" },
        { label: "Examples", value: "basic" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Skeleton v1 documents deterministic loading placeholders: reusable shape helpers, stable dimensions, and parent-owned loading state."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-skeleton-basic",
                preview: DocsPreviewsNZ.skeletonBasicExamplePreview(
                  model.skeletonBasicExample,
                  "skeleton-docs-basic-preview"
                ),
                href: "/docs/components/skeleton/examples/basic",
                linkText: "Open standalone Skeleton Basic example",
              }),
            ]
          ),
        ]
      ),
      docsInstallBlock(
        "bunx shadcn@latest add <registry-url>/skeleton.json\nbunx shadcn@latest add <registry-url>/skeleton-basic.json"
      ),
      docsUsageBlock(
        "Render Skeleton.view while a parent model is loading, then replace it with real content once the data state changes.",
        `import * as Skeleton from "./ui/skeleton";`
      ),
      docsTextListSection("Foldkit integration", [
        "This slice is a presentation component. The parent Foldkit model owns the data, events, and conditional rendering.",
        "Examples use ordinary messages and evo updates where they need to demonstrate a state change.",
      ]),
      docsStylingBlock(),
      docsTextListSection("Keyboard interaction", [
        "No component-owned keyboard behavior is required for this static presentation component.",
        "Any interactive controls rendered inside it keep their own native or primitive-backed keyboard contract.",
      ]),
      docsApiList([
        'view(config): renders a placeholder span with shape "Text", "Avatar", "Button", or "Block".',
        "SkeletonShape: Text, Avatar, Button, or Block.",
        "Class helpers: base class and shape class mapping.",
      ]),
      docsTextListSection("Accessibility", [
        "Skeletons are aria-hidden by default because they are visual placeholders.",
        "Pair loading regions with nearby status text when the loading state needs to be announced.",
      ]),
      docsTextListSection("Coverage", [
        "Registry scene tests verify the documented static rendering surface.",
        "Example scene tests verify the runnable example and parent-owned state change.",
        "Registry checks verify metadata, generated JSON, and example test coverage.",
      ]),
    ]
  );
};

const spinnerDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Spinner"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "An inline loading status icon with stable sizing, accessible status text guidance, and reusable stroke styling.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/spinner" },
        {
          label: "Examples",
          value: "basic, badge-spinner, shadcn-button-spinner",
        },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Spinner v1 mirrors shadcn's Loader2-based status affordance with role=status, aria-label=Loading, reusable class sizing, and examples for payment rows, buttons, badges, input groups, empty states, and RTL copy."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-spinner-basic",
                preview: DocsPreviewsNZ.spinnerBasicExamplePreview(
                  model.spinnerBasicExample,
                  "spinner-docs-basic-preview"
                ),
                href: "/docs/components/spinner/examples/basic",
                linkText: "Open standalone Spinner Basic example",
              }),
              docsExampleBlock({
                title: "Badge Spinner",
                testId: "docs-example-block-spinner-badge-spinner",
                preview: DocsPreviewsB.badgeSpinnerExamplePreview(
                  model.badgeSpinnerExample,
                  "spinner-docs-badge-spinner-preview"
                ),
                href: "/docs/components/badge/examples/spinner",
                linkText: "Open standalone Badge Spinner example",
              }),
            ]
          ),
        ]
      ),
      docsInstallBlock(
        "bunx shadcn@latest add <registry-url>/spinner.json\nbunx shadcn@latest add <registry-url>/spinner-basic.json\nbunx shadcn@latest add <registry-url>/badge-spinner.json\nbunx shadcn@latest add <registry-url>/shadcn-button-spinner.json"
      ),
      docsUsageBlock(
        "Render Spinner.view inside pending buttons, badges, empty states, or loading rows. The parent model owns when the loading affordance appears.",
        `import * as Spinner from "./ui/spinner";`
      ),
      docsTextListSection("Foldkit integration", [
        "This slice is a presentation component. The parent Foldkit model owns the loading state and chooses when to render the spinner.",
        "Examples compose Spinner.view inside other shadcn-style components without introducing child state.",
      ]),
      docsAnatomyBlock(
        `Spinner.view<Message>({
  className: "mr-1",
});

Badge.contentView<Message>({
  variant: "Destructive",
  children: [
    Spinner.view<Message>({ className: "mr-1" }),
    h.span([], ["Deleting"]),
  ],
});`
      ),
      docsStylingBlock(),
      docsTextListSection("Keyboard interaction", [
        "No component-owned keyboard behavior is required for this static status icon.",
        "Interactive controls that contain a spinner keep their own native or primitive-backed keyboard contract.",
      ]),
      docsApiList([
        "view(config): renders an SVG loading status icon.",
        "ViewConfig: optional className.",
        "spinnerClassName: default size and spin animation classes.",
      ]),
      docsTextListSection("Accessibility", [
        "Spinner.view renders role=status and aria-label=Loading, matching the upstream shadcn semantics.",
        "Use nearby visible copy such as Deleting or Generating to explain what is pending.",
        "Use dir=rtl on the parent container when rendering RTL loading rows.",
      ]),
      docsTextListSection("Coverage", [
        "Registry scene tests verify the loading status role and accessible name.",
        "Spinner Basic scene tests verify the upstream payment, size, button, badge, input group, empty, and RTL content surfaces.",
        "Badge Spinner and shadcn Button Spinner scene tests verify the cross-component loading affordances.",
        "Registry checks verify metadata, generated JSON, and example test coverage.",
      ]),
    ]
  );
};

const kbdDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Kbd"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A shadcn-style keyboard key token for documenting shortcuts and key combinations.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/kbd" },
        { label: "Examples", value: "basic, input-group, rtl" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Kbd v1 documents inline keyboard tokens with stable sizing, compact typography, and no component-owned behavior."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-kbd-basic",
                preview: DocsPreviewsJM.kbdBasicExamplePreview(
                  model.kbdBasicExample,
                  "kbd-docs-basic-preview"
                ),
                href: "/docs/components/kbd/examples/basic",
                linkText: "Open standalone Kbd Basic example",
              }),
              docsExampleBlock({
                title: "Input Group",
                testId: "docs-example-block-kbd-input-group",
                preview: DocsPreviewsJM.kbdInputGroupExamplePreview(
                  model.kbdInputGroupExample,
                  "kbd-docs-input-group-preview"
                ),
                href: "/docs/components/kbd/examples/input-group",
                linkText: "Open standalone Kbd Input Group example",
              }),
              docsExampleBlock({
                title: "RTL",
                testId: "docs-example-block-kbd-rtl",
                preview: DocsPreviewsJM.kbdRtlExamplePreview(
                  model.kbdRtlExample,
                  "kbd-docs-rtl-preview"
                ),
                href: "/docs/components/kbd/examples/rtl",
                linkText: "Open standalone Kbd RTL example",
              }),
            ]
          ),
        ]
      ),
      docsInstallBlock(
        "bunx shadcn@latest add <registry-url>/kbd.json\nbunx shadcn@latest add <registry-url>/kbd-basic.json\nbunx shadcn@latest add <registry-url>/kbd-input-group.json\nbunx shadcn@latest add <registry-url>/kbd-rtl.json"
      ),
      docsUsageBlock(
        "Use Kbd.view for one key token and Kbd.groupView for shortcuts that combine multiple keys.",
        `import * as Kbd from "./ui/kbd";`
      ),
      docsTextListSection("Foldkit integration", [
        "This slice is a presentation component. The parent Foldkit model owns the data, events, and conditional rendering.",
        "Examples use ordinary messages and evo updates where they need to demonstrate a state change.",
      ]),
      docsStylingBlock(),
      docsTextListSection("Keyboard interaction", [
        "No component-owned keyboard behavior is required for this static presentation component.",
        "Any interactive controls rendered inside it keep their own native or primitive-backed keyboard contract.",
      ]),
      docsApiList([
        "view(config): renders one semantic kbd token.",
        "groupView(children, className): renders a compact shortcut group.",
        "KbdSize: Small or Default.",
        "Class helpers: base, size, and group classes.",
      ]),
      docsTextListSection("Accessibility", [
        "Use the visible key label that users see on their keyboard, such as Cmd, Ctrl, K, or Esc.",
        "Keyboard tokens explain shortcuts; they do not create keyboard handlers.",
      ]),
      docsTextListSection("Coverage", [
        "Registry scene tests verify the documented static rendering surface.",
        "Example scene tests verify the runnable example and parent-owned state change.",
        "Registry checks verify metadata, generated JSON, and example test coverage.",
      ]),
    ]
  );
};

const typographyDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Typography"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A shadcn-style set of text helpers for headings, paragraphs, lists, inline code, and muted copy.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/typography" },
        { label: "Examples", value: "basic" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Typography v1 documents reusable prose primitives for examples and docs: heading levels, paragraph rhythm, muted text, inline code, and list spacing."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-typography-basic",
                preview: DocsPreviewsNZ.typographyBasicExamplePreview(
                  model.typographyBasicExample,
                  "typography-docs-basic-preview"
                ),
                href: "/docs/components/typography/examples/basic",
                linkText: "Open standalone Typography Basic example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/typography.json\nbunx shadcn@latest add <registry-url>/typography-basic.json",
        usageBody:
          "Use Typography helpers to keep example prose consistent while the parent view owns the actual content, hierarchy, language direction, and any surrounding interactivity.",
        usageCode: `import * as Typography from "./ui/typography";

Typography.h1<Message>("Component registry");
Typography.p<Message>("Reusable text helpers preserve semantic HTML.");
Typography.ul<Message>(["Choose heading level by outline."]);`,
        integrationCode:
          "Typography is a static presentation slice. Parent Foldkit views own data, events, conditional rendering, and any interactive controls placed near the text.",
        anatomySection:
          docsAnatomyBlock(`Typography.h1<Message>("Component registry");
Typography.p<Message>(
  "Reusable text helpers keep examples readable while preserving semantic HTML."
);
Typography.h2<Message>("Principles");
Typography.ul<Message>([
  "Choose heading level by document outline.",
  "Use muted copy for supporting context.",
]);
Typography.inlineCode<Message>("Typography.inlineCode");`),
        includeStyling: false,
        includeKeyboardInteraction: false,
        apiItems: [
          "h1, h2, h3, h4: render semantic headings with registry typography classes.",
          "p: renders a readable paragraph.",
          "blockquote: renders quoted prose with the documented left border treatment.",
          "table: renders a responsive semantic table from headers and rows.",
          "lead, large, small, muted: render the documented supporting text variants.",
          "muted: renders secondary text.",
          "inlineCode: renders inline code text.",
          "ul: renders a real unordered list from string items.",
          "Class name exports expose shadcn-style styling hooks for every helper.",
        ],
        accessibilityItems: [
          "Choose heading helpers by document outline, not visual size alone.",
          "Keep lists as real list markup when items are semantically related.",
          "Typography helpers do not create keyboard handlers; nearby interactive controls keep their own native or primitive-backed keyboard contract.",
        ],
        coverageItems: [
          "Registry scene tests verify the documented static rendering surface across headings, prose, blockquote, table, code, and text variants.",
          "Example scene tests verify the current upstream Joke Tax sample and individual typography variant coverage.",
          "Registry checks verify metadata, generated JSON, and example test coverage.",
        ],
      }),
    ]
  );
};

const emptyDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Empty"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A shadcn-style empty state component for explaining missing content and offering a next action.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/empty" },
        {
          label: "Examples",
          value:
            "avatar, avatar-group, background, basic, input-group, outline, rtl",
        },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Empty follows shadcn's empty-state composition: media, title, description, and content/action slots. The current Basic, Outline, Background, Avatar, Avatar Group, Input Group, and RTL examples match the origin visible copy."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Avatar",
                testId: "docs-example-block-empty-avatar",
                preview: DocsPreviewsEI.emptyAvatarExamplePreview(
                  model.emptyAvatarExample,
                  "empty-docs-avatar-preview"
                ),
                href: "/docs/components/empty/examples/avatar",
                linkText: "Open standalone Empty Avatar example",
              }),
              docsExampleBlock({
                title: "Avatar Group",
                testId: "docs-example-block-empty-avatar-group",
                preview: DocsPreviewsEI.emptyAvatarGroupExamplePreview(
                  model.emptyAvatarGroupExample,
                  "empty-docs-avatar-group-preview"
                ),
                href: "/docs/components/empty/examples/avatar-group",
                linkText: "Open standalone Empty Avatar Group example",
              }),
              docsExampleBlock({
                title: "Background",
                testId: "docs-example-block-empty-background",
                preview: DocsPreviewsEI.emptyBackgroundExamplePreview(
                  model.emptyBackgroundExample,
                  "empty-docs-background-preview"
                ),
                href: "/docs/components/empty/examples/background",
                linkText: "Open standalone Empty Background example",
              }),
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-empty-basic",
                preview: DocsPreviewsEI.emptyBasicExamplePreview(
                  model.emptyBasicExample,
                  "empty-docs-basic-preview"
                ),
                href: "/docs/components/empty/examples/basic",
                linkText: "Open standalone Empty Basic example",
              }),
              docsExampleBlock({
                title: "Input Group",
                testId: "docs-example-block-empty-input-group",
                preview: DocsPreviewsEI.emptyInputGroupExamplePreview(
                  model.emptyInputGroupExample,
                  "empty-docs-input-group-preview"
                ),
                href: "/docs/components/empty/examples/input-group",
                linkText: "Open standalone Empty Input Group example",
              }),
              docsExampleBlock({
                title: "Outline",
                testId: "docs-example-block-empty-outline",
                preview: DocsPreviewsEI.emptyOutlineExamplePreview(
                  model.emptyOutlineExample,
                  "empty-docs-outline-preview"
                ),
                href: "/docs/components/empty/examples/outline",
                linkText: "Open standalone Empty Outline example",
              }),
              docsExampleBlock({
                title: "RTL",
                testId: "docs-example-block-empty-rtl",
                preview: DocsPreviewsEI.emptyRtlExamplePreview(
                  model.emptyRtlExample,
                  "empty-docs-rtl-preview"
                ),
                href: "/docs/components/empty/examples/rtl",
                linkText: "Open standalone Empty RTL example",
              }),
            ]
          ),
        ]
      ),
      docsInstallBlock(
        "bunx shadcn@latest add <registry-url>/empty.json\nbunx shadcn@latest add <registry-url>/empty-basic.json\nbunx shadcn@latest add <registry-url>/empty-outline.json\nbunx shadcn@latest add <registry-url>/empty-background.json\nbunx shadcn@latest add <registry-url>/empty-avatar.json\nbunx shadcn@latest add <registry-url>/empty-avatar-group.json\nbunx shadcn@latest add <registry-url>/empty-input-group.json\nbunx shadcn@latest add <registry-url>/empty-rtl.json"
      ),
      docsUsageBlock(
        "Render Empty.view when a parent model has no records, search results, or configured resources. Pass the action as ordinary Foldkit Html.",
        `import * as Empty from "./ui/empty";`
      ),
      docsTextListSection("Foldkit integration", [
        "This slice is a presentation component. The parent Foldkit model owns the data, events, and conditional rendering.",
        "Examples use ordinary messages and evo updates where they need to demonstrate a state change.",
      ]),
      docsStylingBlock(),
      docsTextListSection("Keyboard interaction", [
        "No component-owned keyboard behavior is required for this static presentation component.",
        "Any interactive controls rendered inside it keep their own native or primitive-backed keyboard contract.",
      ]),
      docsApiList([
        "view(config): renders an empty state with title, description, optional icon, and optional action.",
        "ViewConfig: title, description, maybeIcon, maybeAction, and className.",
        "Class helpers: shell, icon, title, description, and action wrapper classes.",
      ]),
      docsTextListSection("Accessibility", [
        "Use a clear title that names the empty condition.",
        "When an action is present, make the button or link label specific to the next step.",
      ]),
      docsTextListSection("Coverage", [
        "Registry scene tests verify the documented static rendering surface.",
        "Example scene tests verify the runnable examples against origin visible copy.",
        "Registry checks verify metadata, generated JSON, and example test coverage.",
      ]),
    ]
  );
};

const inputGroupDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Input Group"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A shadcn-style input composition component for grouped controls, addons, and shortcut slots.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/input-group" },
        {
          label: "Examples",
          value:
            "align, icon, text, button, custom input, dropdown, kbd, spinner, empty, rtl, textarea",
        },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Input Group v1 documents the shared container, native input and textarea slots, addon alignment slots, button helper, and static text helper needed by upstream shadcn examples."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Align",
                testId: "docs-example-block-input-group-align",
                preview: DocsPreviewsShadcnMissing.inputGroupAlignExamplePreview(),
                href: "/docs/components/input-group/examples/align",
                linkText: "Open standalone Input Group Align example",
              }),
              docsExampleBlock({
                title: "Icon",
                testId: "docs-example-block-input-group-icon",
                preview: DocsPreviewsShadcnMissing.inputGroupIconExamplePreview(),
                href: "/docs/components/input-group/examples/icon",
                linkText: "Open standalone Input Group Icon example",
              }),
              docsExampleBlock({
                title: "Text",
                testId: "docs-example-block-input-group-text",
                preview: DocsPreviewsShadcnMissing.inputGroupTextExamplePreview(),
                href: "/docs/components/input-group/examples/text",
                linkText: "Open standalone Input Group Text example",
              }),
              docsExampleBlock({
                title: "Button",
                testId: "docs-example-block-input-group-button",
                preview: DocsPreviewsShadcnMissing.inputGroupButtonExamplePreview(),
                href: "/docs/components/input-group/examples/button",
                linkText: "Open standalone Input Group Button example",
              }),
              docsExampleBlock({
                title: "Custom Input",
                testId: "docs-example-block-input-group-custom-input",
                preview:
                  DocsPreviewsShadcnMissing.inputGroupCustomInputExamplePreview(),
                href: "/docs/components/input-group/examples/custom-input",
                linkText: "Open standalone Input Group Custom Input example",
              }),
              docsExampleBlock({
                title: "Dropdown",
                testId: "docs-example-block-input-group-dropdown",
                preview:
                  DocsPreviewsShadcnMissing.inputGroupDropdownExamplePreview(),
                href: "/docs/components/input-group/examples/dropdown",
                linkText: "Open standalone Input Group Dropdown example",
              }),
              docsExampleBlock({
                title: "Kbd Input Group",
                testId: "docs-example-block-input-group-kbd",
                preview: DocsPreviewsJM.kbdInputGroupExamplePreview(
                  model.kbdInputGroupExample,
                  "input-group-docs-kbd-preview"
                ),
                href: "/docs/components/kbd/examples/input-group",
                linkText: "Open standalone Kbd Input Group example",
              }),
              docsExampleBlock({
                title: "Spinner",
                testId: "docs-example-block-input-group-spinner",
                preview: DocsPreviewsShadcnMissing.inputGroupSpinnerExamplePreview(),
                href: "/docs/components/input-group/examples/spinner",
                linkText: "Open standalone Input Group Spinner example",
              }),
              docsExampleBlock({
                title: "Empty Input Group",
                testId: "docs-example-block-input-group-empty",
                preview: DocsPreviewsEI.emptyInputGroupExamplePreview(
                  model.emptyInputGroupExample,
                  "input-group-docs-empty-preview"
                ),
                href: "/docs/components/empty/examples/input-group",
                linkText: "Open standalone Empty Input Group example",
              }),
              docsExampleBlock({
                title: "RTL",
                testId: "docs-example-block-input-group-rtl",
                preview: DocsPreviewsShadcnMissing.inputGroupRtlExamplePreview(),
                href: "/docs/components/input-group/examples/rtl",
                linkText: "Open standalone Input Group RTL example",
              }),
              docsExampleBlock({
                title: "Textarea",
                testId: "docs-example-block-input-group-textarea",
                preview:
                  DocsPreviewsShadcnMissing.inputGroupTextareaExamplePreview(),
                href: "/docs/components/input-group/examples/textarea",
                linkText: "Open standalone Input Group Textarea example",
              }),
            ]
          ),
        ]
      ),
      docsInstallBlock(
        "bunx shadcn@latest add <registry-url>/input-group.json\nbunx shadcn@latest add <registry-url>/input-group-align.json\nbunx shadcn@latest add <registry-url>/input-group-icon.json\nbunx shadcn@latest add <registry-url>/input-group-text.json\nbunx shadcn@latest add <registry-url>/input-group-button.json\nbunx shadcn@latest add <registry-url>/input-group-custom-input.json\nbunx shadcn@latest add <registry-url>/input-group-dropdown.json\nbunx shadcn@latest add <registry-url>/kbd-input-group.json\nbunx shadcn@latest add <registry-url>/input-group-spinner.json\nbunx shadcn@latest add <registry-url>/empty-input-group.json\nbunx shadcn@latest add <registry-url>/input-group-rtl.json\nbunx shadcn@latest add <registry-url>/input-group-textarea.json"
      ),
      docsUsageBlock(
        "Use InputGroup.view to compose a native input and addon regions. Pass all addon content as ordinary Foldkit Html.",
        `import * as InputGroup from "./ui/input-group";`
      ),
      docsTextListSection("Foldkit integration", [
        "This slice is a presentation component. The parent Foldkit model owns input values, submitted queries, and command flow.",
        "The input helper exposes native textbox semantics so accessible names and form behavior stay explicit at the call site.",
      ]),
      docsStylingBlock(),
      docsTextListSection("Keyboard interaction", [
        "The input slot keeps native text input keyboard behavior.",
        "Kbd addons document shortcuts; they do not install keyboard handlers by themselves.",
      ]),
      docsApiList([
        "view(config): renders the input group container with role=group.",
        "inputView(config): renders a native input with placeholder, ariaLabel, value, onInput, disabled, name, and classes.",
        "textareaView(config): renders a native textarea with placeholder, ariaLabel, value, onInput, disabled, name, rows, and classes.",
        "addonView(config): renders an addon region aligned InlineStart, InlineEnd, BlockStart, or BlockEnd.",
        "buttonView(config): renders a button or icon button for addon actions.",
        "textView(children, className): renders static addon text.",
      ]),
      docsTextListSection("Accessibility", [
        "Provide ariaLabel when the input does not have a visible label.",
        "Keep decorative icons aria-hidden so the textbox name stays focused on the task.",
        "Use role=group only for composition; form submission and validation still belong to the parent component.",
      ]),
      docsTextListSection("Coverage", [
        "Registry scene tests verify group, textbox, addon, and shortcut rendering.",
        "Kbd and Empty input-group scene tests verify the upstream example content and inert static behavior.",
        "Registry checks verify metadata, generated JSON, and example test coverage.",
      ]),
    ]
  );
};

const meterApiReferenceTable = (): Html =>
  docsApiTable([
    {
      part: "Root",
      prop: "value",
      type: "number",
      defaultValue: "-",
      description:
        "The current scalar measurement. Meter values are determinate and announced through aria-valuenow.",
    },
    {
      part: "Types",
      prop: "ViewConfig",
      type: "exported type",
      defaultValue: "-",
      description: "Config object for the complete Meter convenience view.",
    },
    {
      part: "Types",
      prop: "RootViewConfig",
      type: "exported type",
      defaultValue: "-",
      description: "Config object for the Root anatomy helper.",
    },
    {
      part: "Types",
      prop: "MeterValueContext",
      type: "exported type",
      defaultValue: "-",
      description:
        "Context passed to getAriaValueText and renderValue callbacks.",
    },
    {
      part: "Root",
      prop: "min",
      type: "number",
      defaultValue: "0",
      description: "The minimum value used for aria-valuemin and percent math.",
    },
    {
      part: "Root",
      prop: "max",
      type: "number",
      defaultValue: "100",
      description: "The maximum value used for aria-valuemax and percent math.",
    },
    {
      part: "Root",
      prop: "locale",
      type: "Intl.LocalesArgument",
      defaultValue: "-",
      description:
        "Foldkit-native equivalent for Base UI locale formatting through Intl.NumberFormat.",
    },
    {
      part: "Root",
      prop: "format",
      type: "Intl.NumberFormatOptions",
      defaultValue: '{ style: "percent" }',
      description:
        "Foldkit-native equivalent for Base UI format options. Merged into the default percent formatter.",
    },
    {
      part: "Root",
      prop: "formatValue",
      type: "(value: number) => string",
      defaultValue: "percent",
      description:
        "Formats visible Value text and default aria-valuetext when Intl formatting is not enough.",
    },
    {
      part: "Root",
      prop: "getAriaValueText",
      type: "(context) => string",
      defaultValue: "-",
      description:
        "Returns custom spoken value text for the role=meter element.",
    },
    {
      part: "Value",
      prop: "renderValue",
      type: "(context) => string",
      defaultValue: "formattedValue",
      description:
        "Foldkit-native equivalent for Base UI Value render-function content.",
    },
    {
      part: "Root",
      prop: "view(config)",
      type: "function",
      defaultValue: "-",
      description:
        "Renders the complete Root, Label, Value, Track, and Indicator anatomy.",
    },
    {
      part: "Root",
      prop: "rootView(config)",
      type: "function",
      defaultValue: "-",
      description:
        "Renders role=meter with aria-valuemin, aria-valuemax, aria-valuenow, aria-valuetext, aria-labelledby, and status data attributes.",
    },
    {
      part: "Label",
      prop: "labelView(config)",
      type: "function",
      defaultValue: "-",
      description: "Renders the visible measurement label.",
    },
    {
      part: "Value",
      prop: "valueView(config)",
      type: "function",
      defaultValue: "-",
      description: "Renders aria-hidden visible value text.",
    },
    {
      part: "Track",
      prop: "trackView(config)",
      type: "function",
      defaultValue: "-",
      description: "Renders the visual track that contains the Indicator.",
    },
    {
      part: "Indicator",
      prop: "indicatorView(config)",
      type: "function",
      defaultValue: "-",
      description: "Renders the value-driven visual fill.",
    },
    {
      part: "Classes",
      prop: "className, labelClassName, valueClassName, trackClassName, indicatorClassName",
      type: "string",
      defaultValue: "-",
      description: "Part-level class hooks append to default Meter classes.",
    },
    {
      part: "Styles",
      prop: "style, labelStyle, valueStyle, trackStyle, indicatorStyle",
      type: "MeterStyle",
      defaultValue: "-",
      description:
        "Part-level inline style hooks apply to the same anatomy element. Indicator styles apply after computed width.",
    },
    {
      part: "Status",
      prop: "meterStatus(value, max)",
      type: "function",
      defaultValue: "-",
      description:
        "Returns Metering while value is below max, otherwise Complete.",
    },
    {
      part: "Status",
      prop: "meterPercent(value, min, max)",
      type: "function",
      defaultValue: "-",
      description: "Clamps the indicator width percentage between 0 and 100.",
    },
    {
      part: "Root, Indicator",
      prop: "data-metering",
      type: "attribute",
      defaultValue: "-",
      description:
        "Present while value is below max. Use for in-range measurement styling.",
    },
    {
      part: "Root, Indicator",
      prop: "data-complete",
      type: "attribute",
      defaultValue: "-",
      description:
        "Present when value is at or above max. Use for completed/full styling.",
    },
  ]);

const meterDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Meter"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A Base UI-informed meter component for displaying a numeric measurement within a known range.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/meter" },
        { label: "Examples", value: "hero" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Meter v1 follows the Base UI anatomy for scalar measurements: Root exposes role=meter semantics, Label names the measured range, Value displays the formatted measurement, Track contains the visual rail, and Indicator visualizes the current value."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4")],
            [
              docsExampleBlock({
                title: "Hero",
                testId: "docs-example-block-meter-basic",
                preview: DocsPreviewsJM.meterBasicExamplePreview(
                  model.meterBasicExample,
                  "meter-docs-basic-preview"
                ),
                href: "/docs/components/meter/examples/basic",
                linkText: "Open standalone Meter Basic example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/meter.json\nbunx shadcn@latest add <registry-url>/meter-basic.json",
        usageBody:
          "Use Meter.view for the Base UI hero composition, pass per-part class overrides for styling, or compose rootView, labelView, valueView, trackView, and indicatorView directly when you need custom layout.",
        usageCode: `import * as Meter from "./ui/meter";

Meter.view<Message>({
  value: 24,
  label: "Storage Used",
  className: "gap-3",
  style: { inlineSize: "18rem" },
  labelClassName: "text-gray-950",
  valueClassName: "tabular-nums",
  trackClassName: "bg-gray-200",
  indicatorClassName: "bg-gray-950",
});`,
        integrationCode: `// Model
value: S.Number;

// View
Meter.view<Message>({
  value: model.value,
  label: "Storage Used",
});`,
        anatomySection: docsAnatomyBlock(`import * as Meter from "./ui/meter";

Meter.rootView<Message>({
  value: model.storageUsed,
  children: [
    Meter.labelView<Message>({ label: "Storage Used" }),
    Meter.trackView<Message>({
      children: [
        Meter.indicatorView<Message>({ value: model.storageUsed }),
      ],
    }),
    Meter.valueView<Message>({ value: model.storageUsed }),
  ],
});`),
        includeStyling: false,
        includeKeyboardInteraction: false,
        apiReference: meterApiReferenceTable(),
        apiItems: [],
        accessibilityItems: [
          "Root uses role=meter and links to the visible label with aria-labelledby.",
          "Meter exposes aria-valuenow, aria-valuemin, aria-valuemax, and aria-valuetext.",
          "Value text is aria-hidden because the meter already exposes the spoken value.",
          "No keyboard interaction is required because Meter is a read-only measurement component.",
        ],
        coverageItems: [
          "Registry scene tests verify Base UI ARIA attributes, status data attributes, formatted value text, and style hooks.",
          "Example scene tests verify the Base UI hero demo content and inert static behavior.",
          "Registry checks verify metadata, generated JSON, and example test coverage.",
          "Docs e2e tests verify the shared page sections, source viewer, and layout contract.",
        ],
      }),
    ]
  );
};

const scrollAreaDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Scroll Area"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A Base UI-informed native scroll container with styled viewport, content, scrollbar, thumb, and corner anatomy.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/scroll-area" },
        { label: "Examples", value: "hero" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Scroll Area v1 follows the Base UI anatomy while keeping scrolling native to the Viewport. It exposes Root, Viewport, Content, Scrollbar, Thumb, and Corner helpers, plus documented deferrals for runtime overflow measurement and draggable custom thumbs."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Hero",
                testId: "docs-example-block-scroll-area-basic",
                preview: DocsPreviewsNZ.scrollAreaBasicExamplePreview(
                  model.scrollAreaBasicExample,
                  "base-ui-scroll-area-docs-basic-preview"
                ),
                href: "/docs/components/base-ui-scroll-area/examples/basic",
                linkText: "Open standalone Base UI Scroll Area Basic example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/base-ui-scroll-area.json\nbunx shadcn@latest add <registry-url>/base-ui-scroll-area-basic.json",
        usageBody:
          "Use ScrollArea.view for the Base UI hero composition, or compose rootView, viewportView, contentView, scrollbarView, thumbView, and cornerView directly when you need custom layout.",
        usageCode: `import * as ScrollArea from "./ui/scroll-area";

ScrollArea.view<Message>({
  ariaLabel: "Article excerpt",
  children: [
    h.p([], ["Long content..."]),
  ],
});`,
        integrationCode: `// View
ScrollArea.view<Message>({
  ariaLabel: "Article excerpt",
  children: paragraphs,
});`,
        anatomySection:
          docsAnatomyBlock(`import * as ScrollArea from "./ui/scroll-area";

ScrollArea.rootView<Message>({
  children: [
    ScrollArea.viewportView<Message>({
      children: [
        ScrollArea.contentView<Message>({ children }),
      ],
    }),
    ScrollArea.scrollbarView<Message>({
      children: [ScrollArea.thumbView<Message>()],
    }),
    ScrollArea.cornerView<Message>(),
  ],
});`),
        includeStyling: false,
        includeKeyboardInteraction: false,
        apiReference: docsApiTable([
          {
            part: "Root",
            prop: "rootView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Groups all Scroll Area parts and exposes caller-supplied overflow state data attributes.",
          },
          {
            part: "Viewport",
            prop: "viewportView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders the native focusable scroll container. Add ariaLabel when surrounding text does not name the region.",
          },
          {
            part: "Content",
            prop: "contentView(config)",
            type: "function",
            defaultValue: "-",
            description: "Renders consumer-owned content inside the viewport.",
          },
          {
            part: "Scrollbar",
            prop: "scrollbarView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders a visual scrollbar rail. Native scrolling remains owned by the Viewport in v1.",
          },
          {
            part: "Thumb",
            prop: "thumbView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders a visual thumb. Drag-to-scroll behavior is deliberately deferred.",
          },
          {
            part: "Corner",
            prop: "cornerView(config)",
            type: "function",
            defaultValue: "-",
            description: "Renders the visual corner for two-axis layouts.",
          },
          {
            part: "Root",
            prop: "hasOverflowX, hasOverflowY, isScrolling",
            type: "boolean",
            defaultValue: "-",
            description:
              "Caller-supplied state flags that render data-has-overflow-x, data-has-overflow-y, and data-scrolling.",
          },
          {
            part: "Viewport",
            prop: "hasFade",
            type: "boolean",
            defaultValue: "false",
            description:
              "Adds the gradient fade mask class using Base UI overflow CSS variable names.",
          },
          {
            part: "Classes",
            prop: "*ClassName exports",
            type: "string",
            defaultValue: "-",
            description:
              "Default class exports exist for Root, Viewport, Content, Scrollbar, Thumb, Corner, and Fade.",
          },
          {
            part: "Deferred",
            prop: "dynamic overflow measurement",
            type: "not implemented",
            defaultValue: "-",
            description:
              "Base UI runtime measurement of overflow edges and thumb sizing is deferred until a Foldkit managed-resource slice is added.",
          },
        ]),
        apiItems: [],
        accessibilityItems: [
          "Viewport keeps native scrolling and keyboard scroll behavior.",
          "When ariaLabel is provided, Viewport renders role=region and an accessible name.",
          "Visual Scrollbar, Thumb, and Corner are aria-hidden in v1.",
          "No custom keyboard handling is required because native scrolling stays on the viewport.",
        ],
        coverageItems: [
          "Registry scene tests verify native viewport focusability, accessible region naming, class hooks, style hooks, and visual anatomy parts.",
          "Example scene tests verify the Base UI hero demo content.",
          "Registry checks verify metadata, generated JSON, and example test coverage.",
        ],
      }),
    ]
  );
};

const toggleDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Toggle"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            ["A Base UI-informed two-state button that can be on or off."]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/toggle" },
        { label: "Examples", value: "hero" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Toggle v1 follows the Base UI single-part anatomy and keeps pressed state controlled by the parent model. The view renders a native button with aria-pressed, data-pressed, disabled handling, value forwarding, and exported class hooks."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Hero",
                testId: "docs-example-block-toggle-basic",
                preview: DocsPreviewsNZ.toggleBasicExamplePreview(
                  model.toggleBasicExample,
                  "toggle-docs-basic-preview"
                ),
                href: "/docs/components/toggle/examples/basic",
                linkText: "Open standalone Toggle Basic example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/toggle.json\nbunx shadcn@latest add <registry-url>/toggle-basic.json",
        usageBody:
          "Use Toggle.view when pressed state belongs to the parent model. Pass the next parent Message through onPressedChange and render whichever icon or label matches the current pressed state.",
        usageCode: `import * as Toggle from "./ui/toggle";

Toggle.view<Message>({
  pressed: model.favorite === "Pressed",
  ariaLabel: "Favorite",
  value: "favorite",
  onPressedChange: ClickedToggleFavorite(),
  children: [heartIcon(model.favorite)],
});`,
        integrationCode: `// Model
favorite: S.Union([S.Literal("Pressed"), S.Literal("Unpressed")]);

// Message
ClickedToggleFavorite();

// Update
ClickedToggleFavorite: () => [
  evo(model, {
    favorite: (favorite) =>
      favorite === "Pressed" ? "Unpressed" : "Pressed",
  }),
  [],
];

// View
Toggle.view<Message>({
  pressed: model.favorite === "Pressed",
  ariaLabel: "Favorite",
  onPressedChange: ClickedToggleFavorite(),
  children,
});`,
        anatomySection: docsAnatomyBlock(`import * as Toggle from "./ui/toggle";

Toggle.view<Message>({
  pressed: model.favorite === "Pressed",
  ariaLabel: "Favorite",
  onPressedChange: ClickedToggleFavorite(),
  children: [icon],
});`),
        includeStyling: false,
        includeKeyboardInteraction: false,
        apiReference: docsApiTable([
          {
            part: "Root",
            prop: "pressed",
            type: "boolean",
            defaultValue: "-",
            description:
              "Controlled pressed state. Renders aria-pressed and data-pressed when true.",
          },
          {
            part: "Root",
            prop: "onPressedChange",
            type: "ParentMessage",
            defaultValue: "-",
            description:
              "Parent message emitted when the native button is clicked.",
          },
          {
            part: "Root",
            prop: "ariaLabel",
            type: "string",
            defaultValue: "-",
            description:
              "Accessible name for icon-only toggles and other non-text controls.",
          },
          {
            part: "Root",
            prop: "disabled",
            type: "boolean",
            defaultValue: "false",
            description:
              "Renders the native disabled attribute and suppresses click handling.",
          },
          {
            part: "Root",
            prop: "value",
            type: "string",
            defaultValue: "-",
            description:
              "Optional value forwarded to the button for Toggle Group compatibility.",
          },
          {
            part: "Classes",
            prop: "toggleRootClassName, toggleIconClassName",
            type: "string",
            defaultValue: "-",
            description:
              "Default class exports for Root and icon-sized children.",
          },
        ]),
        apiItems: [],
        accessibilityItems: [
          "Root renders a native button, so Enter and Space activation remain browser-owned.",
          "Pressed state is exposed with aria-pressed and mirrored with data-pressed for styling.",
          "Icon-only toggles must provide ariaLabel.",
          "Disabled toggles render the native disabled attribute and do not attach a click handler.",
        ],
        coverageItems: [
          "Registry scene tests verify aria-pressed, data-pressed, disabled behavior, and click-driven parent updates.",
          "Example scene tests verify the Base UI hero pressed/unpressed flow.",
          "Registry checks verify metadata, generated JSON, and example test coverage.",
        ],
      }),
    ]
  );
};

const toggleGroupDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Toggle Group"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A Base UI-informed shared state wrapper for a series of toggle buttons.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/toggle-group" },
        { label: "Examples", value: "hero" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Toggle Group v1 follows the Base UI controlled value model: pressed state is represented by an array of item values, Root groups the controls, and each Item reuses Toggle semantics with aria-pressed and data-pressed."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Hero",
                testId: "docs-example-block-toggle-group-basic",
                preview: DocsPreviewsNZ.toggleGroupBasicExamplePreview(
                  model.toggleGroupBasicExample,
                  "toggle-group-docs-basic-preview"
                ),
                href: "/docs/components/toggle-group/examples/basic",
                linkText: "Open standalone Toggle Group Basic example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/toggle-group.json\nbunx shadcn@latest add <registry-url>/toggle-group-basic.json",
        usageBody:
          "Use ToggleGroup.rootView to group controlled ToggleGroup.itemView children. Store pressed values in the parent model as an array of item values.",
        usageCode: `import * as ToggleGroup from "./ui/toggle-group";

ToggleGroup.rootView<Message>({
  ariaLabel: "Text alignment",
  children: [
    ToggleGroup.itemView<Message>({
      value: "left",
      pressedValues: model.alignment,
      ariaLabel: "Align left",
      onPressedChange: ClickedAlignment({ value: "left" }),
      children: [alignLeftIcon],
    }),
  ],
});`,
        integrationCode: `// Model
alignment: S.Array(S.String);

// Message
ClickedAlignment({ value: S.String });

// Update
ClickedAlignment: ({ value }) => [
  evo(model, {
    alignment: (alignment) =>
      alignment.includes(value) ? [] : [value],
  }),
  [],
];

// View
ToggleGroup.itemView<Message>({
  value: "left",
  pressedValues: model.alignment,
  ariaLabel: "Align left",
  onPressedChange: ClickedAlignment({ value: "left" }),
  children,
});`,
        anatomySection:
          docsAnatomyBlock(`import * as ToggleGroup from "./ui/toggle-group";

ToggleGroup.rootView<Message>({
  children: [
    ToggleGroup.itemView<Message>({
      value: "left",
      pressedValues,
      ariaLabel: "Align left",
      onPressedChange: ClickedAlignment({ value: "left" }),
      children: [icon],
    }),
  ],
});`),
        includeStyling: false,
        includeKeyboardInteraction: false,
        apiReference: docsApiTable([
          {
            part: "Root",
            prop: "rootView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders a labelled group wrapper around Toggle Group items.",
          },
          {
            part: "Item",
            prop: "itemView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders a Toggle-backed item whose pressed state is derived from pressedValues.",
          },
          {
            part: "Item",
            prop: "pressedValues",
            type: "readonly string[]",
            defaultValue: "-",
            description:
              "Controlled group value array matching Base UI Toggle Group value semantics.",
          },
          {
            part: "Item",
            prop: "value",
            type: "string",
            defaultValue: "-",
            description:
              "Unique item value used to decide whether the item is pressed.",
          },
          {
            part: "Classes",
            prop: "*ClassName exports",
            type: "string",
            defaultValue: "-",
            description:
              "Default class exports exist for Root, Item, and icon-sized children.",
          },
        ]),
        apiItems: [],
        accessibilityItems: [
          "Root renders role=group and can expose an accessible label.",
          "Items render native buttons through Toggle.view, preserving browser-owned activation.",
          "Each item exposes aria-pressed and data-pressed according to the controlled pressedValues array.",
          "Single-select and multiple-select behavior belongs in the parent update function.",
        ],
        coverageItems: [
          "Registry scene tests verify group labelling, item pressed state, and click-driven value changes.",
          "Example scene tests verify the Base UI hero alignment behavior.",
          "Registry checks verify metadata, generated JSON, example coverage, and docs nav origin grouping.",
        ],
      }),
    ]
  );
};

const radioDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Radio"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            ["A Base UI-informed radio group for choosing one option."]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/radio" },
        { label: "Examples", value: "hero" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Radio v1 follows the Base UI RadioGroup, Root, and Indicator anatomy. The parent model owns the selected value, the group exposes radiogroup labelling, and each radio item exposes aria-checked plus checked/unchecked data attributes."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Hero",
                testId: "docs-example-block-radio-basic",
                preview: DocsPreviewsNZ.radioBasicExamplePreview(
                  model.radioBasicExample,
                  "radio-docs-basic-preview"
                ),
                href: "/docs/components/radio/examples/basic",
                linkText: "Open standalone Radio Basic example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/radio.json\nbunx shadcn@latest add <registry-url>/radio-basic.json",
        usageBody:
          "Use Radio.groupView to label the group, then render Radio.itemView children whose checked state comes from the parent-owned selected value.",
        usageCode: `import * as Radio from "./ui/radio";

Radio.groupView<Message>({
  label: "Best apple",
  labelId: "best-apple-label",
  children: [
    Radio.itemView<Message>({
      value: "fuji-apple",
      selectedValue: model.selectedApple,
      label: "Fuji",
      onValueChange: SelectedApple({ value: "fuji-apple" }),
    }),
  ],
});`,
        integrationCode: `// Model
selectedApple: S.Union([
  S.Literal("fuji-apple"),
  S.Literal("gala-apple"),
]);

// Message
SelectedApple({ value: AppleValue });

// Update
SelectedApple: ({ value }) => [
  evo(model, { selectedApple: () => value }),
  [],
];

// View
Radio.itemView<Message>({
  value: "fuji-apple",
  selectedValue: model.selectedApple,
  label: "Fuji",
  onValueChange: SelectedApple({ value: "fuji-apple" }),
});`,
        anatomySection: docsAnatomyBlock(`import * as Radio from "./ui/radio";

Radio.groupView<Message>({
  children: [
    Radio.itemView<Message>({
      value,
      selectedValue,
      label,
      onValueChange,
    }),
  ],
});`),
        includeStyling: false,
        includeKeyboardInteraction: false,
        apiReference: docsApiTable([
          {
            part: "RadioGroup",
            prop: "groupView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders a labelled radiogroup with an internal visible caption.",
          },
          {
            part: "Root",
            prop: "itemView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders an enclosing label, radio root, indicator, and visible item label.",
          },
          {
            part: "Root",
            prop: "value",
            type: "string",
            defaultValue: "-",
            description: "Unique item value used for selected-value matching.",
          },
          {
            part: "Root",
            prop: "selectedValue",
            type: "string",
            defaultValue: "-",
            description:
              "Controlled group value. The radio is checked when it matches value.",
          },
          {
            part: "Root",
            prop: "disabled, required",
            type: "boolean",
            defaultValue: "false",
            description:
              "Render Base UI-style data-disabled/data-required and matching ARIA state.",
          },
          {
            part: "Classes",
            prop: "*ClassName exports",
            type: "string",
            defaultValue: "-",
            description:
              "Default class exports exist for RadioGroup, Caption, Item, Root, and Indicator.",
          },
        ]),
        apiItems: [],
        accessibilityItems: [
          "Group renders role=radiogroup and is labelled by the visible caption.",
          "Items render role=radio with aria-checked reflecting the controlled selected value.",
          "Disabled items expose aria-disabled and do not attach click handling.",
          "The enclosing label pattern mirrors Base UI's default radio labelling guidance.",
        ],
        coverageItems: [
          "Registry scene tests verify group labelling, aria-checked, data attributes, and click-driven selection.",
          "Example scene tests verify the Base UI hero apple-selection behavior.",
          "Registry checks verify metadata, generated JSON, example coverage, and docs nav origin grouping.",
        ],
      }),
    ]
  );
};

const toolbarDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Toolbar"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A Base UI-informed toolbar for grouped editor controls and compact actions.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/toolbar" },
        { label: "Examples", value: "hero" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Toolbar v1 follows the Base UI Root, Button, Link, Input, Group, and Separator anatomy. It renders the semantic toolbar container while parent-owned Foldkit messages control every button and input interaction."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid grid-cols-1 gap-4")],
            [
              docsExampleBlock({
                title: "Hero",
                testId: "docs-example-block-toolbar-basic",
                preview: DocsPreviewsNZ.toolbarBasicExamplePreview(
                  model.toolbarBasicExample,
                  "toolbar-docs-basic-preview"
                ),
                href: "/docs/components/toolbar/examples/basic",
                linkText: "Open standalone Toolbar Basic example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/toolbar.json\nbunx shadcn@latest add <registry-url>/toolbar-basic.json",
        usageBody:
          "Use Toolbar.rootView for the semantic toolbar, then compose Group, Button, Separator, Input, and Link parts around parent-owned messages.",
        usageCode: `import * as Toolbar from "./ui/toolbar";

Toolbar.rootView<Message>({
  ariaLabel: "Editor toolbar",
  children: [
    Toolbar.groupView<Message>({
      ariaLabel: "Alignment",
      children: [
        Toolbar.buttonView<Message>({
          ariaLabel: "Align left",
          onClick: ClickedAlign({ value: "left" }),
          children,
        }),
      ],
    }),
  ],
});`,
        integrationCode: `// Model
alignment: S.Union([S.Literal("left"), S.Literal("right")]);
fontFamily: S.String;

// Message
ClickedAlign({ value: Alignment });
UpdatedFontFamily({ value: S.String });

// Update
ClickedAlign: ({ value }) => [
  evo(model, { alignment: () => value }),
  [],
];

// View
Toolbar.inputView<Message>({
  ariaLabel: "Font family",
  value: model.fontFamily,
  onInput: (value) => UpdatedFontFamily({ value }),
});`,
        anatomySection:
          docsAnatomyBlock(`import * as Toolbar from "./ui/toolbar";

Toolbar.rootView<Message>({
  children: [
    Toolbar.groupView<Message>({
      children: [
        Toolbar.buttonView<Message>({ children, onClick }),
      ],
    }),
    Toolbar.separatorView<Message>(),
    Toolbar.inputView<Message>({ value, onInput, ariaLabel }),
    Toolbar.linkView<Message>({ href, children }),
  ],
});`),
        includeStyling: false,
        includeKeyboardInteraction: false,
        apiReference: docsApiTable([
          {
            part: "Root",
            prop: "rootView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders role=toolbar with optional ariaLabel, orientation, disabled state, classes, and styles.",
          },
          {
            part: "Group",
            prop: "groupView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders a labelled role=group for related toolbar controls.",
          },
          {
            part: "Button",
            prop: "buttonView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders a native button with Base UI-style orientation, disabled, and focusable data attributes.",
          },
          {
            part: "Input",
            prop: "inputView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders a toolbar text input whose value and input message are controlled by the parent model.",
          },
          {
            part: "Link",
            prop: "linkView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders a toolbar link for compact navigation or status affordances.",
          },
          {
            part: "Separator",
            prop: "separatorView(config)",
            type: "function",
            defaultValue: "-",
            description:
              "Renders role=separator with aria-orientation and data-orientation.",
          },
          {
            part: "Root",
            prop: "orientation",
            type: '"horizontal" | "vertical"',
            defaultValue: '"horizontal"',
            description:
              "Applied to Root, Group, Button, Link, Input, and Separator data attributes.",
          },
          {
            part: "Button",
            prop: "focusableWhenDisabled",
            type: "boolean",
            defaultValue: "true",
            description:
              "Exposes Base UI-style data-focusable when a disabled toolbar button should remain discoverable.",
          },
          {
            part: "Classes",
            prop: "*ClassName exports",
            type: "string",
            defaultValue: "-",
            description:
              "Default class exports exist for Root, Group, Button, Link, Input, and Separator.",
          },
        ]),
        apiItems: [],
        accessibilityItems: [
          "Root renders role=toolbar and can expose an accessible label.",
          "Groups render role=group with optional labels for related controls.",
          "Buttons, links, and inputs stay native elements so browser activation and focus behavior remain intact.",
          "Roving focus and arrow-key management are deferred until the Foldkit managed-focus slice.",
        ],
        coverageItems: [
          "Registry scene tests verify toolbar labelling, grouped controls, orientation data, input updates, links, and click routing.",
          "Example scene tests verify the Base UI hero editor-toolbar behavior.",
          "Registry checks verify metadata, generated JSON, example coverage, and docs nav origin grouping.",
        ],
      }),
    ]
  );
};

const progressApiReferenceTable = (): Html =>
  docsApiTable([
    {
      part: "Root",
      prop: "value",
      type: "number | null",
      defaultValue: "null",
      description:
        "The current value. The component is indeterminate when value is null.",
    },
    {
      part: "Types",
      prop: "ViewConfig",
      type: "exported type",
      defaultValue: "-",
      description:
        "Type the config object as Progress.ViewConfig or hover Progress.view to see the full property breakdown in TypeScript.",
    },
    {
      part: "Types",
      prop: "RootViewConfig",
      type: "exported type",
      defaultValue: "-",
      description: "Config object for the Root anatomy helper.",
    },
    {
      part: "Types",
      prop: "LabelViewConfig",
      type: "exported type",
      defaultValue: "-",
      description: "Config object for the Label anatomy helper.",
    },
    {
      part: "Types",
      prop: "ValueViewConfig",
      type: "exported type",
      defaultValue: "-",
      description: "Config object for the Value anatomy helper.",
    },
    {
      part: "Types",
      prop: "TrackViewConfig",
      type: "exported type",
      defaultValue: "-",
      description: "Config object for the Track anatomy helper.",
    },
    {
      part: "Types",
      prop: "IndicatorViewConfig",
      type: "exported type",
      defaultValue: "-",
      description: "Config object for the Indicator anatomy helper.",
    },
    {
      part: "Types",
      prop: "ProgressValueContext",
      type: "exported type",
      defaultValue: "-",
      description:
        "Context passed to formatValue, getAriaValueText, and renderValue.",
    },
    {
      part: "Types",
      prop: "FormatValue",
      type: "(value: number) => string",
      defaultValue: "-",
      description: "Callback type for formatting determinate values.",
    },
    {
      part: "Types",
      prop: "GetAriaValueText",
      type: "(context) => string",
      defaultValue: "-",
      description: "Callback type for custom progressbar aria-valuetext.",
    },
    {
      part: "Types",
      prop: "RenderValue",
      type: "(context) => string",
      defaultValue: "-",
      description: "Callback type for rendering visible Value text.",
    },
    {
      part: "Types",
      prop: "ProgressStyle",
      type: "Readonly<Record<string, string>>",
      defaultValue: "-",
      description: "Inline style object passed through Foldkit h.Style.",
    },
    {
      part: "Root",
      prop: "view(config)",
      type: "function",
      defaultValue: "-",
      description:
        "Renders the complete Root, Label, Value, Track, and Indicator anatomy.",
    },
    {
      part: "Root",
      prop: "rootView(config)",
      type: "function",
      defaultValue: "-",
      description:
        "Renders the progressbar element with ARIA value semantics and status data attributes.",
    },
    {
      part: "Label",
      prop: "labelView(config)",
      type: "function",
      defaultValue: "-",
      description: "Renders the visible task label used by aria-labelledby.",
    },
    {
      part: "Value",
      prop: "valueView(config)",
      type: "function",
      defaultValue: "-",
      description: "Renders aria-hidden visible value text.",
    },
    {
      part: "Track",
      prop: "trackView(config)",
      type: "function",
      defaultValue: "-",
      description: "Renders the visual track that contains the Indicator.",
    },
    {
      part: "Indicator",
      prop: "indicatorView(config)",
      type: "function",
      defaultValue: "-",
      description: "Renders the value-driven visual fill.",
    },
    {
      part: "Root",
      prop: "min",
      type: "number",
      defaultValue: "0",
      description: "The minimum value used for aria-valuemin and percent math.",
    },
    {
      part: "Root",
      prop: "max",
      type: "number",
      defaultValue: "100",
      description: "The maximum value used for aria-valuemax and percent math.",
    },
    {
      part: "Root",
      prop: "formatValue",
      type: "(value: number) => string",
      defaultValue: "percent",
      description:
        "Foldkit-native equivalent for Base UI formatting. Used by Value and default aria-valuetext.",
    },
    {
      part: "Root",
      prop: "getAriaValueText",
      type: "(context) => string",
      defaultValue: "-",
      description:
        "Foldkit-native equivalent for Base UI getAriaValueText. Returns the spoken value text for the progressbar.",
    },
    {
      part: "Root",
      prop: "className",
      type: "string",
      defaultValue: "-",
      description:
        "Additional class applied to the Root element after the default registry root classes.",
    },
    {
      part: "Root",
      prop: "style",
      type: "ProgressStyle",
      defaultValue: "-",
      description: "Inline style applied to the Root element.",
    },
    {
      part: "Label",
      prop: "labelClassName",
      type: "string",
      defaultValue: "-",
      description:
        "Additional class applied to the Label while preserving its aria-labelledby id.",
    },
    {
      part: "Label",
      prop: "labelStyle",
      type: "ProgressStyle",
      defaultValue: "-",
      description: "Inline style applied to the Label element.",
    },
    {
      part: "Value",
      prop: "renderValue",
      type: "(context) => string",
      defaultValue: "formattedValue",
      description:
        "Foldkit-native equivalent for Base UI Value render-function content.",
    },
    {
      part: "Value",
      prop: "valueClassName",
      type: "string",
      defaultValue: "-",
      description:
        "Additional class applied to the visible Value text. Value remains aria-hidden.",
    },
    {
      part: "Value",
      prop: "valueStyle",
      type: "ProgressStyle",
      defaultValue: "-",
      description: "Inline style applied to the Value element.",
    },
    {
      part: "Track",
      prop: "trackClassName",
      type: "string",
      defaultValue: "-",
      description: "Additional class applied to the Track rail.",
    },
    {
      part: "Track",
      prop: "trackStyle",
      type: "ProgressStyle",
      defaultValue: "-",
      description: "Inline style applied to the Track rail.",
    },
    {
      part: "Indicator",
      prop: "indicatorClassName",
      type: "string",
      defaultValue: "-",
      description:
        "Additional class applied to the Indicator fill. Width remains value-driven unless indicatorStyle overrides it.",
    },
    {
      part: "Indicator",
      prop: "indicatorStyle",
      type: "ProgressStyle",
      defaultValue: "-",
      description:
        "Inline style applied to the Indicator fill after the value-driven width style.",
    },
    {
      part: "Status",
      prop: "formattedValue(value, formatValue)",
      type: "function",
      defaultValue: "-",
      description:
        "Returns formatted determinate text or an empty string for indeterminate progress.",
    },
    {
      part: "Status",
      prop: "ariaValueText(value, max, formatValue)",
      type: "function",
      defaultValue: "percent text",
      description:
        "Returns default aria-valuetext, including indeterminate progress text.",
    },
    {
      part: "Status",
      prop: "progressStatus(value, max)",
      type: "function",
      defaultValue: "-",
      description:
        "Returns the public progress status from a value and maximum.",
    },
    {
      part: "Status",
      prop: "progressStatusDataAttribute(status)",
      type: "function",
      defaultValue: "-",
      description: "Maps ProgressStatus to the matching data attribute suffix.",
    },
    {
      part: "Status",
      prop: "progressPercent(value, min, max)",
      type: "function",
      defaultValue: "-",
      description:
        "Clamps the determinate indicator width percentage between 0 and 100.",
    },
    {
      part: "Status",
      prop: "ProgressStatus",
      type: '"Indeterminate" | "Progressing" | "Complete"',
      defaultValue: "-",
      description:
        "Status exposed through data-indeterminate, data-progressing, and data-complete attributes.",
    },
    {
      part: "Classes",
      prop: "progressRootClassName",
      type: "string",
      defaultValue: "-",
      description: "Default class export for the Root element.",
    },
    {
      part: "Classes",
      prop: "progressLabelClassName",
      type: "string",
      defaultValue: "-",
      description: "Default class export for the Label element.",
    },
    {
      part: "Classes",
      prop: "progressValueClassName",
      type: "string",
      defaultValue: "-",
      description: "Default class export for the Value element.",
    },
    {
      part: "Classes",
      prop: "progressTrackClassName",
      type: "string",
      defaultValue: "-",
      description: "Default class export for the Track element.",
    },
    {
      part: "Classes",
      prop: "progressIndicatorClassName",
      type: "string",
      defaultValue: "-",
      description: "Default class export for the Indicator element.",
    },
    {
      part: "Root",
      prop: "data-indeterminate",
      type: "attribute",
      defaultValue: "-",
      description:
        "Present when value is null or non-finite. Use for indeterminate styling on the Root.",
    },
    {
      part: "Root",
      prop: "data-progressing",
      type: "attribute",
      defaultValue: "-",
      description:
        "Present when value is determinate and below max. Use for in-progress Root styling.",
    },
    {
      part: "Root",
      prop: "data-complete",
      type: "attribute",
      defaultValue: "-",
      description:
        "Present when value equals max. Use for completed Root styling.",
    },
    {
      part: "Indicator",
      prop: "data-indeterminate",
      type: "attribute",
      defaultValue: "-",
      description:
        "Present on the Indicator when value is null or non-finite. Use for animated indeterminate fills.",
    },
    {
      part: "Indicator",
      prop: "data-progressing",
      type: "attribute",
      defaultValue: "-",
      description:
        "Present on the Indicator while progress is determinate and below max.",
    },
    {
      part: "Indicator",
      prop: "data-complete",
      type: "attribute",
      defaultValue: "-",
      description: "Present on the Indicator when value equals max.",
    },
  ]);

const progressDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Progress"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A Base UI-informed progress component for displaying long-running task status with accessible value semantics.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/progress" },
        { label: "Examples", value: "hero" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Progress v1 follows the Base UI anatomy: Root groups all parts and exposes progressbar semantics, Label names the task, Value displays the formatted current value, Track contains the visual rail, and Indicator visualizes completion."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Hero",
                testId: "docs-example-block-progress-basic",
                preview: DocsPreviewsNZ.progressBasicExamplePreview(
                  model.progressBasicExample,
                  "progress-docs-basic-preview"
                ),
                href: "/docs/components/progress/examples/basic",
                linkText: "Open standalone Progress Basic example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/progress.json\nbunx shadcn@latest add <registry-url>/progress-basic.json",
        usageBody:
          "Use Progress.view for the Base UI hero composition, pass per-part class overrides for styling, or compose rootView, labelView, valueView, trackView, and indicatorView directly when you need custom layout.",
        usageCode: `import * as Progress from "./ui/progress";

Progress.view<Message>({
  value: 20,
  label: "Export data",
  className: "gap-3",
  style: { inlineSize: "18rem" },
  labelClassName: "text-gray-950",
  labelStyle: { letterSpacing: "0" },
  valueClassName: "tabular-nums",
  valueStyle: { fontVariantNumeric: "tabular-nums" },
  trackClassName: "bg-gray-200",
  trackStyle: { blockSize: "0.5rem" },
  indicatorClassName: "bg-gray-950",
  indicatorStyle: { borderRadius: "9999px" },
});`,
        integrationCode: `// Model
value: S.Number;

// View
Progress.view<Message>({
  value: model.value,
  label: "Export data",
});`,
        anatomySection:
          docsAnatomyBlock(`import * as Progress from "./ui/progress";

Progress.rootView<Message>({
  value: model.progressValue,
  children: [
    Progress.labelView<Message>({ label: "Export data" }),
    Progress.trackView<Message>({
      children: [
        Progress.indicatorView<Message>({ value: model.progressValue }),
      ],
    }),
    Progress.valueView<Message>({ value: model.progressValue }),
  ],
});`),
        includeStyling: false,
        includeKeyboardInteraction: false,
        apiReference: progressApiReferenceTable(),
        apiItems: [
          "view(config): renders Root, Label, Value, Track, and Indicator using the Base UI hero anatomy.",
          "rootView(config): renders role=progressbar with aria-valuemin, aria-valuemax, aria-valuenow, aria-valuetext, aria-labelledby, and status data attributes.",
          "labelView(config): renders the visible task label.",
          "valueView(config): renders the formatted value as aria-hidden text.",
          "trackView(config): renders the visual rail.",
          "indicatorView(config): renders the visual completion indicator using the current value.",
          "formatValue(value): Foldkit-native equivalent for Base UI format/locale formatting when the default percent text is not enough.",
          "getAriaValueText(context): Foldkit-native equivalent for Base UI getAriaValueText.",
          "renderValue(context): Foldkit-native equivalent for Base UI Value render-function children.",
          "View class overrides: className, labelClassName, valueClassName, trackClassName, and indicatorClassName.",
          'ProgressStatus: "Indeterminate", "Progressing", or "Complete".',
        ],
        accessibilityItems: [
          "Root uses role=progressbar and links to the visible label with aria-labelledby.",
          "Determinate progress exposes aria-valuenow, aria-valuemin, aria-valuemax, and aria-valuetext.",
          "Indeterminate progress omits aria-valuenow and uses aria-valuetext=indeterminate progress.",
          "Value text is aria-hidden because the progressbar already exposes the spoken value.",
          "No keyboard interaction is required because Progress is a read-only status component.",
        ],
        coverageItems: [
          "Registry scene tests verify Base UI ARIA attributes, status data attributes, formatted value text, and indeterminate behavior.",
          "Example scene tests verify the Base UI hero demo content and inert static behavior.",
          "Registry checks verify metadata, generated JSON, and example test coverage.",
          "Docs e2e tests verify the shared page sections, source viewer, and layout contract.",
        ],
      }),
    ]
  );
};

const buttonDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Button"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A styled, installable Foldkit Button slice built on the official Foldkit Ui.Button primitive. It keeps native button semantics while centralizing typed click messages, disabled state, button type, autofocus, and reusable class variants.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/button" },
        { label: "Examples", value: "basic, disabled" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Button v1 documents the stateless action path: parent-owned click handling, native disabled semantics, and styled variants that preserve the Foldkit primitive attributes."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-button-basic",
                preview: DocsPreviewsB.buttonBasicExamplePreview(
                  model.buttonBasicExample,
                  "button-docs-basic-preview"
                ),
                href: "/docs/components/button/examples/basic",
                linkText: "Open standalone Button Basic example",
              }),
              docsExampleBlock({
                title: "Disabled",
                testId: "docs-example-block-button-disabled",
                preview: DocsPreviewsB.buttonDisabledExamplePreview(
                  model.buttonDisabledExample,
                  "button-docs-disabled-preview"
                ),
                href: "/docs/components/button/examples/disabled",
                linkText: "Open standalone Button Disabled example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/button.json\nbunx shadcn@latest add <registry-url>/button-basic.json\nbunx shadcn@latest add <registry-url>/button-disabled.json",
        usageBody:
          "Map the button click to a verb-first Foldkit message and render a native button with the supplied button attributes.",
        usageCode: `import * as Button from "./ui/button";

Button.view<Message>({
  onClick: ClickedSave(),
  toView: (attributes) =>
    h.button(attributes.button, ["Save changes"]),
});`,
        integrationCode: `// Message
ClickedSave();

// Update
ClickedSave: () => [
  evo(model, { saveCount: (count) => count + 1 }),
  [],
];`,
        anatomySection: docsAnatomyBlock(
          `Button.view<Message>({
  onClick: ClickedSave(),
  variant: "Default",
  size: "Default",
  toView: (attributes) =>
    h.button(attributes.button, ["Save changes"]),
});`
        ),
        apiItems: [
          "view(config): renders a native button through the supplied toView callback.",
          "ButtonAttributes: grouped button attributes that include click, disabled, type, and autofocus behavior.",
          "ViewConfig: onClick, isDisabled, type, isAutofocus, and toView.",
          "Class helpers: primary, secondary, and destructive button class names.",
        ],
        accessibilityItems: [
          "The primitive applies native disabled state so disabled buttons do not dispatch clicks.",
          "Consumers provide visible button text or an accessible name through their rendered button.",
          "Button type can be set explicitly for form submit/reset behavior.",
        ],
        coverageItems: [
          "Registry scene tests verify click message dispatch and disabled state.",
          "Example scene tests verify parent-owned click feedback and disabled explanatory copy.",
          "Docs scene tests verify the shared component page section contract and example block layout.",
        ],
      }),
    ]
  );
};

const baseUiButtonDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Button"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A Base UI style-lane Button slice that matches the origin Submit demo while reusing the official Foldkit Ui.Button primitive for native button behavior.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/base-ui-button" },
        { label: "Examples", value: "basic, disabled" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Base UI Button documents the simple styled lane: parent-owned click handling, native disabled semantics, render-as guidance through toView, and lightweight classes that preserve the Foldkit primitive attributes."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-base-ui-button-basic",
                preview: DocsPreviewsB.baseUiButtonBasicExamplePreview(
                  model.baseUiButtonBasicExample,
                  "base-ui-button-docs-basic-preview"
                ),
                href: "/docs/components/base-ui-button/examples/basic",
                linkText: "Open standalone Base UI Button Basic example",
              }),
              docsExampleBlock({
                title: "Disabled",
                testId: "docs-example-block-base-ui-button-disabled",
                preview: DocsPreviewsB.buttonDisabledExamplePreview(
                  model.buttonDisabledExample,
                  "base-ui-button-docs-disabled-preview"
                ),
                href: "/docs/components/button/examples/disabled",
                linkText: "Open standalone Button Disabled example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/base-ui-button.json",
        usageBody:
          "Map the button click to a verb-first Foldkit message and render the supplied button attributes plus the Base UI class helper. To mirror Base UI's render-as pattern, keep Button.view as the behavior source and choose the rendered element inside toView.",
        usageCode: `import * as Button from "./ui/base-ui-button";

Button.view<Message>({
  onClick: ClickedSave(),
  toView: (attributes) =>
    h.button(
      [...attributes.button, h.Class(Button.baseUiButtonClassName)],
      ["Save changes"]
    ),
});`,
        integrationCode: `// Message
ClickedSave();

// Update
ClickedSave: () => [
  evo(model, { saveCount: (count) => count + 1 }),
  [],
];`,
        anatomySection: docsAnatomyBlock(
          `Button.view<Message>({
  onClick: ClickedSave(),
  toView: (attributes) =>
    h.button(attributes.button, ["Save changes"]),
});`
        ),
        apiItems: [
          "view(config): renders a native button through the supplied toView callback.",
          "ButtonAttributes: grouped button attributes that include click, disabled, type, and autofocus behavior.",
          "ViewConfig: onClick, isDisabled, type, isAutofocus, and toView.",
          "toView can render another focusable element when a consumer needs Base UI's render-as-another-tag pattern.",
          "Class helpers: baseUiButtonClassName, baseUiSecondaryButtonClassName, and baseUiDestructiveButtonClassName.",
        ],
        accessibilityItems: [
          "The primitive applies native disabled state so disabled buttons do not dispatch clicks.",
          "Consumers provide visible button text or an accessible name through their rendered button.",
          "Button type can be set explicitly for form submit/reset behavior.",
        ],
        coverageItems: [
          "Registry scene tests verify click message dispatch and disabled state through the Foldkit primitive.",
          "Docs scene tests verify the Base UI lane page replaces the coming-soon sidebar entry.",
          "Registry checks verify metadata, generated JSON, and install compatibility.",
        ],
      }),
    ]
  );
};

type BaseUiLaneDocsConfig = Readonly<{
  label: string;
  source: string;
  primitive: string;
  description: string;
  usage: string;
  classHelpers: readonly string[];
  anatomyCode: string;
  examples?: readonly string[];
}>;

type GeneratedExampleCase = readonly [string, () => Html];

const generatedExampleBlock = (
  example: string,
  cases: readonly GeneratedExampleCase[],
  fallback: () => Html
): Html =>
  cases.find(([candidate]) => candidate === example)?.[1]() ?? fallback();

const baseUiGeneratedExampleBlock = (model: Model, example: string): Html =>
  generatedExampleBlock(
    example,
    [
      [
        "base-ui-accordion-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-accordion-basic",
            preview: DocsPreviewsAccordion.baseUiAccordionBasicExamplePreview(
              model.baseUiAccordionBasicExample,
              "base-ui-accordion-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-accordion/examples/basic",
            linkText: "Open standalone Base UI Accordion Basic example",
          }),
      ],
      [
        "base-ui-accordion-multiple",
        () =>
          docsExampleBlock({
            title: "Open multiple panels",
            testId: "docs-example-block-base-ui-accordion-multiple",
            preview:
              DocsPreviewsAccordion.baseUiAccordionMultipleExamplePreview(
                model.baseUiAccordionMultipleExample,
                "base-ui-accordion-docs-multiple-preview"
              ),
            href: "/docs/components/base-ui-accordion/examples/multiple",
            linkText: "Open standalone Base UI Accordion Multiple example",
          }),
      ],
      [
        "base-ui-alert-dialog-close-confirmation",
        () =>
          docsExampleBlock({
            title: "Close confirmation",
            testId:
              "docs-example-block-base-ui-alert-dialog-close-confirmation",
            preview:
              DocsPreviewsB.baseUiAlertDialogCloseConfirmationExamplePreview(
                model.baseUiAlertDialogCloseConfirmationExample,
                "base-ui-alert-dialog-docs-close-confirmation-preview"
              ),
            href: "/docs/components/base-ui-alert-dialog/examples/close-confirmation",
            linkText:
              "Open standalone Base UI Alert Dialog Close Confirmation example",
          }),
      ],
      [
        "base-ui-alert-dialog-controlled-multiple-triggers",
        () =>
          docsExampleBlock({
            title: "Controlled mode with multiple triggers",
            testId:
              "docs-example-block-base-ui-alert-dialog-controlled-multiple-triggers",
            preview:
              DocsPreviewsB.baseUiAlertDialogControlledMultipleTriggersExamplePreview(
                model.baseUiAlertDialogControlledMultipleTriggersExample,
                "base-ui-alert-dialog-docs-controlled-multiple-triggers-preview"
              ),
            href: "/docs/components/base-ui-alert-dialog/examples/controlled-multiple-triggers",
            linkText:
              "Open standalone Base UI Alert Dialog Controlled Multiple Triggers example",
          }),
      ],
      [
        "base-ui-alert-dialog-open-from-menu",
        () =>
          docsExampleBlock({
            title: "Open from a menu",
            testId: "docs-example-block-base-ui-alert-dialog-open-from-menu",
            preview: DocsPreviewsB.baseUiAlertDialogOpenFromMenuExamplePreview(
              model.baseUiAlertDialogOpenFromMenuExample,
              "base-ui-alert-dialog-docs-open-from-menu-preview"
            ),
            href: "/docs/components/base-ui-alert-dialog/examples/open-from-menu",
            linkText:
              "Open standalone Base UI Alert Dialog Open From Menu example",
          }),
      ],
      [
        "base-ui-alert-dialog-detached-triggers",
        () =>
          docsExampleBlock({
            title: "Detached triggers",
            testId: "docs-example-block-base-ui-alert-dialog-detached-triggers",
            preview:
              DocsPreviewsB.baseUiAlertDialogDetachedTriggersExamplePreview(
                model.baseUiAlertDialogDetachedTriggersExample,
                "base-ui-alert-dialog-docs-detached-triggers-preview"
              ),
            href: "/docs/components/base-ui-alert-dialog/examples/detached-triggers",
            linkText:
              "Open standalone Base UI Alert Dialog Detached Triggers example",
          }),
      ],
      [
        "base-ui-alert-dialog-multiple-triggers",
        () =>
          docsExampleBlock({
            title: "Multiple triggers",
            testId: "docs-example-block-base-ui-alert-dialog-multiple-triggers",
            preview:
              DocsPreviewsB.baseUiAlertDialogMultipleTriggersExamplePreview(
                model.baseUiAlertDialogMultipleTriggersExample,
                "base-ui-alert-dialog-docs-multiple-triggers-preview"
              ),
            href: "/docs/components/base-ui-alert-dialog/examples/multiple-triggers",
            linkText:
              "Open standalone Base UI Alert Dialog Multiple Triggers example",
          }),
      ],
      [
        "base-ui-alert-dialog-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-alert-dialog-basic",
            preview: DocsPreviewsB.baseUiAlertDialogBasicExamplePreview(
              model.baseUiAlertDialogBasicExample,
              "base-ui-alert-dialog-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-alert-dialog/examples/basic",
            linkText: "Open standalone Base UI Alert Dialog Basic example",
          }),
      ],
      [
        "base-ui-autocomplete-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-autocomplete-basic",
            preview:
              DocsPreviewsAutocomplete.baseUiAutocompleteBasicExamplePreview(
                model.baseUiAutocompleteBasicExample,
                "base-ui-autocomplete-docs-basic-preview"
              ),
            href: "/docs/components/base-ui-autocomplete/examples/basic",
            linkText: "Open standalone Base UI Autocomplete Basic example",
          }),
      ],
      [
        "base-ui-avatar-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-avatar-basic",
            preview: DocsPreviewsAvatar.baseUiAvatarBasicExamplePreview(
              model.baseUiAvatarBasicExample,
              "base-ui-avatar-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-avatar/examples/basic",
            linkText: "Open standalone Base UI Avatar Basic example",
          }),
      ],
      [
        "base-ui-button-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-button-basic",
            preview: DocsPreviewsB.baseUiButtonBasicExamplePreview(
              model.baseUiButtonBasicExample,
              "base-ui-button-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-button/examples/basic",
            linkText: "Open standalone Base UI Button Basic example",
          }),
      ],
      [
        "base-ui-checkbox-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-checkbox-basic",
            preview: DocsPreviewsCD.baseUiCheckboxBasicExamplePreview(
              model.baseUiCheckboxBasicExample,
              "base-ui-checkbox-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-checkbox/examples/basic",
            linkText: "Open standalone Base UI Checkbox Basic example",
          }),
      ],
      [
        "base-ui-checkbox-labeling",
        () =>
          docsExampleBlock({
            title: "Labeling a checkbox",
            testId: "docs-example-block-base-ui-checkbox-labeling",
            preview: DocsPreviewsCD.baseUiCheckboxLabelingExamplePreview(
              model.baseUiCheckboxLabelingExample,
              "base-ui-checkbox-docs-labeling-preview"
            ),
            href: "/docs/components/base-ui-checkbox/examples/labeling",
            linkText: "Open standalone Base UI Checkbox Labeling example",
          }),
      ],
      [
        "base-ui-checkbox-native-button",
        () =>
          docsExampleBlock({
            title: "Rendering as a native button",
            testId: "docs-example-block-base-ui-checkbox-native-button",
            preview: DocsPreviewsCD.baseUiCheckboxNativeButtonExamplePreview(
              model.baseUiCheckboxNativeButtonExample,
              "base-ui-checkbox-docs-native-button-preview"
            ),
            href: "/docs/components/base-ui-checkbox/examples/native-button",
            linkText: "Open standalone Base UI Checkbox Native Button example",
          }),
      ],
      [
        "base-ui-checkbox-form",
        () =>
          docsExampleBlock({
            title: "Form integration",
            testId: "docs-example-block-base-ui-checkbox-form",
            preview: DocsPreviewsCD.baseUiCheckboxFormExamplePreview(
              model.baseUiCheckboxFormExample,
              "base-ui-checkbox-docs-form-preview"
            ),
            href: "/docs/components/base-ui-checkbox/examples/form",
            linkText: "Open standalone Base UI Checkbox Form example",
          }),
      ],
      [
        "base-ui-checkbox-group-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-checkbox-group-basic",
            preview: DocsPreviewsCD.baseUiCheckboxGroupBasicExamplePreview(
              model.baseUiCheckboxGroupBasicExample,
              "base-ui-checkbox-group-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-checkbox-group/examples/basic",
            linkText: "Open standalone Base UI Checkbox Group Basic example",
          }),
      ],
      [
        "base-ui-checkbox-group-labeling",
        () =>
          docsExampleBlock({
            title: "Labeling a checkbox group",
            testId: "docs-example-block-base-ui-checkbox-group-labeling",
            preview: DocsPreviewsCD.baseUiCheckboxGroupLabelingExamplePreview(
              model.baseUiCheckboxGrouplabelingExample,
              "base-ui-checkbox-group-docs-labeling-preview"
            ),
            href: "/docs/components/base-ui-checkbox-group/examples/labeling",
            linkText:
              "Open standalone Base UI Checkbox Group Labeling a checkbox group example",
          }),
      ],
      [
        "base-ui-checkbox-group-native-button",
        () =>
          docsExampleBlock({
            title: "Rendering as a native button",
            testId: "docs-example-block-base-ui-checkbox-group-native-button",
            preview:
              DocsPreviewsCD.baseUiCheckboxGroupNativeButtonExamplePreview(
                model.baseUiCheckboxGroupnativeButtonExample,
                "base-ui-checkbox-group-docs-native-button-preview"
              ),
            href: "/docs/components/base-ui-checkbox-group/examples/native-button",
            linkText:
              "Open standalone Base UI Checkbox Group Rendering as a native button example",
          }),
      ],
      [
        "base-ui-checkbox-group-form",
        () =>
          docsExampleBlock({
            title: "Form integration",
            testId: "docs-example-block-base-ui-checkbox-group-form",
            preview: DocsPreviewsCD.baseUiCheckboxGroupFormExamplePreview(
              model.baseUiCheckboxGroupformExample,
              "base-ui-checkbox-group-docs-form-preview"
            ),
            href: "/docs/components/base-ui-checkbox-group/examples/form",
            linkText:
              "Open standalone Base UI Checkbox Group Form integration example",
          }),
      ],
      [
        "base-ui-checkbox-group-parent",
        () =>
          docsExampleBlock({
            title: "Parent checkbox",
            testId: "docs-example-block-base-ui-checkbox-group-parent",
            preview: DocsPreviewsCD.baseUiCheckboxGroupParentExamplePreview(
              model.baseUiCheckboxGroupparentExample,
              "base-ui-checkbox-group-docs-parent-preview"
            ),
            href: "/docs/components/base-ui-checkbox-group/examples/parent",
            linkText:
              "Open standalone Base UI Checkbox Group Parent checkbox example",
          }),
      ],
      [
        "base-ui-checkbox-group-nested-parent",
        () =>
          docsExampleBlock({
            title: "Nested parent checkbox",
            testId: "docs-example-block-base-ui-checkbox-group-nested-parent",
            preview:
              DocsPreviewsCD.baseUiCheckboxGroupNestedParentExamplePreview(
                model.baseUiCheckboxGroupnestedParentExample,
                "base-ui-checkbox-group-docs-nested-parent-preview"
              ),
            href: "/docs/components/base-ui-checkbox-group/examples/nested-parent",
            linkText:
              "Open standalone Base UI Checkbox Group Nested parent checkbox example",
          }),
      ],
      [
        "base-ui-combobox-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-combobox-basic",
            preview: DocsPreviewsCD.baseUiComboboxBasicExamplePreview(
              model.baseUiComboboxBasicExample,
              "base-ui-combobox-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-combobox/examples/basic",
            linkText: "Open standalone Base UI Combobox Basic example",
          }),
      ],
      [
        "base-ui-context-menu-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-context-menu-basic",
            preview: DocsPreviewsCD.baseUiContextMenuBasicExamplePreview(
              model.baseUiContextMenuBasicExample,
              "base-ui-context-menu-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-context-menu/examples/basic",
            linkText: "Open standalone Base UI Context Menu Basic example",
          }),
      ],
      [
        "base-ui-scroll-area-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-scroll-area-basic",
            preview: DocsPreviewsNZ.scrollAreaBasicExamplePreview(
              model.scrollAreaBasicExample,
              "base-ui-scroll-area-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-scroll-area/examples/basic",
            linkText: "Open standalone Base UI Scroll Area Basic example",
          }),
      ],
      [
        "base-ui-scroll-area-both-scrollbars",
        () =>
          docsExampleBlock({
            title: "Both Scrollbars",
            testId: "docs-example-block-base-ui-scroll-area-both-scrollbars",
            preview: DocsPreviewsNZ.scrollAreaBothScrollbarsExamplePreview(
              model.scrollAreaBothScrollbarsExample,
              "base-ui-scroll-area-docs-both-scrollbars-preview"
            ),
            href: "/docs/components/base-ui-scroll-area/examples/both-scrollbars",
            linkText:
              "Open standalone Base UI Scroll Area Both Scrollbars example",
          }),
      ],
      [
        "base-ui-scroll-area-gradient",
        () =>
          docsExampleBlock({
            title: "Gradient",
            testId: "docs-example-block-base-ui-scroll-area-gradient",
            preview: DocsPreviewsNZ.scrollAreaGradientExamplePreview(
              model.scrollAreaGradientExample,
              "base-ui-scroll-area-docs-gradient-preview"
            ),
            href: "/docs/components/base-ui-scroll-area/examples/gradient",
            linkText: "Open standalone Base UI Scroll Area Gradient example",
          }),
      ],
      [
        "base-ui-scroll-area-tabs",
        () =>
          docsExampleBlock({
            title: "Combining with Tabs",
            testId: "docs-example-block-base-ui-scroll-area-tabs",
            preview: DocsPreviewsNZ.scrollAreaTabsExamplePreview(
              model.scrollAreaTabsExample,
              "base-ui-scroll-area-docs-tabs-preview"
            ),
            href: "/docs/components/base-ui-scroll-area/examples/tabs",
            linkText: "Open standalone Base UI Scroll Area Tabs example",
          }),
      ],
      [
        "base-ui-radio-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-radio-basic",
            preview: DocsPreviewsNZ.baseUiRadioBasicExamplePreview(
              model.baseUiRadioBasicExample,
              "base-ui-radio-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-radio/examples/basic",
            linkText: "Open standalone Base UI Radio Basic example",
          }),
      ],
      [
        "base-ui-radio-labeling",
        () =>
          docsExampleBlock({
            title: "Labeling a radio group",
            testId: "docs-example-block-base-ui-radio-labeling",
            preview: DocsPreviewsNZ.baseUiRadioLabelingExamplePreview(
              model.baseUiRadioLabelingExample,
              "base-ui-radio-docs-labeling-preview"
            ),
            href: "/docs/components/base-ui-radio/examples/labeling",
            linkText: "Open standalone Base UI Radio Labeling example",
          }),
      ],
      [
        "base-ui-radio-native-button",
        () =>
          docsExampleBlock({
            title: "Rendering as a native button",
            testId: "docs-example-block-base-ui-radio-native-button",
            preview: DocsPreviewsNZ.baseUiRadioNativeButtonExamplePreview(
              model.baseUiRadioNativeButtonExample,
              "base-ui-radio-docs-native-button-preview"
            ),
            href: "/docs/components/base-ui-radio/examples/native-button",
            linkText: "Open standalone Base UI Radio Native Button example",
          }),
      ],
      [
        "base-ui-radio-form",
        () =>
          docsExampleBlock({
            title: "Form integration",
            testId: "docs-example-block-base-ui-radio-form",
            preview: DocsPreviewsNZ.baseUiRadioFormExamplePreview(
              model.baseUiRadioFormExample,
              "base-ui-radio-docs-form-preview"
            ),
            href: "/docs/components/base-ui-radio/examples/form",
            linkText: "Open standalone Base UI Radio Form example",
          }),
      ],
      [
        "base-ui-context-menu-nested",
        () =>
          docsExampleBlock({
            title: "Nested menu",
            testId: "docs-example-block-base-ui-context-menu-nested",
            preview: DocsPreviewsCD.baseUiContextMenuNestedExamplePreview(
              model.baseUiContextMenuNestedExample,
              "base-ui-context-menu-docs-nested-preview"
            ),
            href: "/docs/components/base-ui-context-menu/examples/nested",
            linkText: "Open standalone Base UI Context Menu Nested example",
          }),
      ],
      [
        "base-ui-dialog-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-dialog-basic",
            preview: DocsPreviewsCD.baseUiDialogBasicExamplePreview(
              model.baseUiDialogBasicExample,
              "base-ui-dialog-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-dialog/examples/basic",
            linkText: "Open standalone Base UI Dialog Basic example",
          }),
      ],
      [
        "base-ui-dialog-close-confirmation",
        () =>
          docsExampleBlock({
            title: "Close confirmation",
            testId: "docs-example-block-base-ui-dialog-close-confirmation",
            preview: DocsPreviewsCD.baseUiDialogCloseConfirmationExamplePreview(
              model.baseUiDialogCloseConfirmationExample,
              "base-ui-dialog-docs-close-confirmation-preview"
            ),
            href: "/docs/components/base-ui-dialog/examples/close-confirmation",
            linkText:
              "Open standalone Base UI Dialog Close Confirmation example",
          }),
      ],
      [
        "base-ui-dialog-nested",
        () =>
          docsExampleBlock({
            title: "Nested dialogs",
            testId: "docs-example-block-base-ui-dialog-nested",
            preview: DocsPreviewsCD.baseUiDialogNestedExamplePreview(
              model.baseUiDialogNestedExample,
              "base-ui-dialog-docs-nested-preview"
            ),
            href: "/docs/components/base-ui-dialog/examples/nested",
            linkText: "Open standalone Base UI Dialog Nested example",
          }),
      ],
      [
        "base-ui-drawer-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-drawer-basic",
            preview: DocsPreviewsCD.baseUiDrawerBasicExamplePreview(
              model.baseUiDrawerBasicExample,
              "base-ui-drawer-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-drawer/examples/basic",
            linkText: "Open standalone Base UI Drawer Basic example",
          }),
      ],
      [
        "base-ui-drawer-position",
        () =>
          docsExampleBlock({
            title: "Position",
            testId: "docs-example-block-base-ui-drawer-position",
            preview: DocsPreviewsCD.baseUiDrawerPositionExamplePreview(
              model.baseUiDrawerpositionExample,
              "base-ui-drawer-docs-position-preview"
            ),
            href: "/docs/components/base-ui-drawer/examples/position",
            linkText: "Open standalone Base UI Drawer Position example",
          }),
      ],
      [
        "base-ui-drawer-non-modal",
        () =>
          docsExampleBlock({
            title: "Non-modal",
            testId: "docs-example-block-base-ui-drawer-non-modal",
            preview: DocsPreviewsCD.baseUiDrawerNonModalExamplePreview(
              model.baseUiDrawernonModalExample,
              "base-ui-drawer-docs-non-modal-preview"
            ),
            href: "/docs/components/base-ui-drawer/examples/non-modal",
            linkText: "Open standalone Base UI Drawer Non-modal example",
          }),
      ],
      [
        "base-ui-field-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-field-basic",
            preview: DocsPreviewsCD.baseUiFieldBasicExamplePreview(
              model.baseUiFieldBasicExample,
              "base-ui-field-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-field/examples/basic",
            linkText: "Open standalone Base UI Field Basic example",
          }),
      ],
      [
        "base-ui-fieldset-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-fieldset-basic",
            preview: DocsPreviewsCD.baseUiFieldsetBasicExamplePreview(
              model.baseUiFieldsetBasicExample,
              "base-ui-fieldset-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-fieldset/examples/basic",
            linkText: "Open standalone Base UI Fieldset Basic example",
          }),
      ],
      [
        "base-ui-form-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-form-basic",
            preview: DocsPreviewsCD.baseUiFormBasicExamplePreview(
              model.baseUiFormBasicExample,
              "base-ui-form-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-form/examples/basic",
            linkText: "Open standalone Base UI Form Basic example",
          }),
      ],
      [
        "base-ui-form-schema-validation",
        () =>
          docsExampleBlock({
            title: "Schema validation",
            testId: "docs-example-block-base-ui-form-schema-validation",
            preview: DocsPreviewsCD.baseUiFormSchemaValidationExamplePreview(
              model.baseUiFormSchemaValidationExample,
              "base-ui-form-docs-schema-validation-preview"
            ),
            href: "/docs/components/base-ui-form/examples/schema-validation",
            linkText: "Open standalone Base UI Form Schema Validation example",
          }),
      ],
      [
        "base-ui-form-server-function",
        () =>
          docsExampleBlock({
            title: "Server Function",
            testId: "docs-example-block-base-ui-form-server-function",
            preview: DocsPreviewsCD.baseUiFormServerFunctionExamplePreview(
              model.baseUiFormServerFunctionExample,
              "base-ui-form-docs-server-function-preview"
            ),
            href: "/docs/components/base-ui-form/examples/server-function",
            linkText: "Open standalone Base UI Form Server Function example",
          }),
      ],
      [
        "base-ui-input-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-input-basic",
            preview: DocsPreviewsCD.baseUiInputBasicExamplePreview(
              model.baseUiInputBasicExample,
              "base-ui-input-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-input/examples/basic",
            linkText: "Open standalone Base UI Input Basic example",
          }),
      ],
      [
        "base-ui-menu-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-menu-basic",
            preview: DocsPreviewsCD.baseUiMenuBasicExamplePreview(
              model.baseUiMenuBasicExample,
              "base-ui-menu-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-menu/examples/basic",
            linkText: "Open standalone Base UI Menu Basic example",
          }),
      ],
      [
        "base-ui-menu-nested",
        () =>
          docsExampleBlock({
            title: "Nested",
            testId: "docs-example-block-base-ui-menu-nested",
            preview: DocsPreviewsCD.baseUiMenuNestedExamplePreview(
              model.baseUiMenuNestedExample,
              "base-ui-menu-docs-nested-preview"
            ),
            href: "/docs/components/base-ui-menu/examples/nested",
            linkText: "Open standalone Base UI Menu Nested example",
          }),
      ],
      [
        "base-ui-menubar-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-menubar-basic",
            preview: DocsPreviewsCD.baseUiMenubarBasicExamplePreview(
              model.baseUiMenubarBasicExample,
              "base-ui-menubar-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-menubar/examples/basic",
            linkText: "Open standalone Base UI Menubar Basic example",
          }),
      ],
      [
        "base-ui-meter-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-meter-basic",
            preview: DocsPreviewsCD.baseUiMeterBasicExamplePreview(
              model.baseUiMeterBasicExample,
              "base-ui-meter-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-meter/examples/basic",
            linkText: "Open standalone Base UI Meter Basic example",
          }),
      ],
      [
        "base-ui-navigation-menu-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-navigation-menu-basic",
            preview: DocsPreviewsNZ.baseUiNavigationMenuBasicExamplePreview(
              model.baseUiNavigationMenuBasicExample,
              "base-ui-navigation-menu-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-navigation-menu/examples/basic",
            linkText: "Open standalone Base UI Navigation Menu Basic example",
          }),
      ],
      [
        "base-ui-number-field-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-number-field-basic",
            preview: DocsPreviewsNZ.baseUiNumberFieldBasicExamplePreview(
              model.baseUiNumberFieldBasicExample,
              "base-ui-number-field-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-number-field/examples/basic",
            linkText: "Open standalone Base UI Number Field Basic example",
          }),
      ],
      [
        "base-ui-otp-field-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-otp-field-basic",
            preview: DocsPreviewsNZ.baseUiOtpFieldBasicExamplePreview(
              model.baseUiOtpFieldBasicExample,
              "base-ui-otp-field-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-otp-field/examples/basic",
            linkText: "Open standalone Base UI OTP Field Basic example",
          }),
      ],
      [
        "base-ui-preview-card-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-preview-card-basic",
            preview: DocsPreviewsNZ.baseUiPreviewCardBasicExamplePreview(
              model.baseUiPreviewCardBasicExample,
              "base-ui-preview-card-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-preview-card/examples/basic",
            linkText: "Open standalone Base UI Preview Card Basic example",
          }),
      ],
      [
        "base-ui-progress-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-progress-basic",
            preview: DocsPreviewsNZ.baseUiProgressBasicExamplePreview(
              model.baseUiProgressBasicExample,
              "base-ui-progress-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-progress/examples/basic",
            linkText: "Open standalone Base UI Progress Basic example",
          }),
      ],
      [
        "base-ui-popover-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-popover-basic",
            preview: DocsPreviewsNZ.baseUiPopoverBasicExamplePreview(
              model.baseUiPopoverBasicExample,
              "base-ui-popover-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-popover/examples/basic",
            linkText: "Open standalone Base UI Popover Basic example",
          }),
      ],
      [
        "base-ui-popover-animated",
        () =>
          docsExampleBlock({
            title: "Animated",
            testId: "docs-example-block-base-ui-popover-animated",
            preview: DocsPreviewsNZ.baseUiPopoverAnimatedExamplePreview(
              model.baseUiPopoverAnimatedExample,
              "base-ui-popover-docs-animated-preview"
            ),
            href: "/docs/components/base-ui-popover/examples/animated",
            linkText: "Open standalone Base UI Popover Animated example",
          }),
      ],
      [
        "base-ui-popover-detached-trigger",
        () =>
          docsExampleBlock({
            title: "Detached Trigger",
            testId: "docs-example-block-base-ui-popover-detached-trigger",
            preview:
              DocsPreviewsNZ.baseUiPopoverDetachedTriggerExamplePreview(
                model.baseUiPopoverDetachedTriggerExample,
                "base-ui-popover-docs-detached-trigger-preview"
              ),
            href: "/docs/components/base-ui-popover/examples/detached-trigger",
            linkText:
              "Open standalone Base UI Popover Detached Trigger example",
          }),
      ],
      [
        "base-ui-popover-multiple-triggers",
        () =>
          docsExampleBlock({
            title: "Multiple Triggers",
            testId: "docs-example-block-base-ui-popover-multiple-triggers",
            preview: DocsPreviewsNZ.baseUiPopoverMultipleTriggersExamplePreview(
              model.baseUiPopoverMultipleTriggersExample,
              "base-ui-popover-docs-multiple-triggers-preview"
            ),
            href: "/docs/components/base-ui-popover/examples/multiple-triggers",
            linkText:
              "Open standalone Base UI Popover Multiple Triggers example",
          }),
      ],
      [
        "base-ui-popover-open-on-hover",
        () =>
          docsExampleBlock({
            title: "Open on Hover",
            testId: "docs-example-block-base-ui-popover-open-on-hover",
            preview: DocsPreviewsNZ.baseUiPopoverOpenOnHoverExamplePreview(
              model.baseUiPopoverOpenOnHoverExample,
              "base-ui-popover-docs-open-on-hover-preview"
            ),
            href: "/docs/components/base-ui-popover/examples/open-on-hover",
            linkText:
              "Open standalone Base UI Popover Open on Hover example",
          }),
      ],
      [
        "base-ui-collapsible-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-collapsible-basic",
            preview: DocsPreviewsCD.baseUiCollapsibleBasicExamplePreview(
              model.baseUiCollapsibleBasicExample,
              "base-ui-collapsible-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-collapsible/examples/basic",
            linkText: "Open standalone Base UI Collapsible Basic example",
          }),
      ],
      [
        "base-ui-select-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-select-basic",
            preview: DocsPreviewsNZ.baseUiSelectBasicExamplePreview(
              model.baseUiSelectBasicExample,
              "base-ui-select-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-select/examples/basic",
            linkText: "Open standalone Base UI Select Basic example",
          }),
      ],
      [
        "base-ui-separator-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-separator-basic",
            preview: DocsPreviewsNZ.baseUiSeparatorBasicExamplePreview(
              model.baseUiSeparatorBasicExample,
              "base-ui-separator-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-separator/examples/basic",
            linkText: "Open standalone Base UI Separator Basic example",
          }),
      ],
      [
        "base-ui-slider-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-slider-basic",
            preview: DocsPreviewsNZ.baseUiSliderBasicExamplePreview(
              model.baseUiSliderBasicExample,
              "base-ui-slider-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-slider/examples/basic",
            linkText: "Open standalone Base UI Slider Basic example",
          }),
      ],
      [
        "base-ui-switch-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-switch-basic",
            preview: DocsPreviewsNZ.baseUiSwitchBasicExamplePreview(
              model.baseUiSwitchBasicExample,
              "base-ui-switch-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-switch/examples/basic",
            linkText: "Open standalone Base UI Switch Basic example",
          }),
      ],
      [
        "base-ui-tabs-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-tabs-basic",
            preview: DocsPreviewsNZ.baseUiTabsBasicExamplePreview(
              model.baseUiTabsBasicExample,
              "base-ui-tabs-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-tabs/examples/basic",
            linkText: "Open standalone Base UI Tabs Basic example",
          }),
      ],
      [
        "base-ui-toast-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-toast-basic",
            preview: DocsPreviewsNZ.baseUiToastBasicExamplePreview(
              model.baseUiToastBasicExample,
              "base-ui-toast-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-toast/examples/basic",
            linkText: "Open standalone Base UI Toast Basic example",
          }),
      ],
      [
        "base-ui-toggle-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-toggle-basic",
            preview: DocsPreviewsNZ.baseUiToggleBasicExamplePreview(
              model.baseUiToggleBasicExample,
              "base-ui-toggle-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-toggle/examples/basic",
            linkText: "Open standalone Base UI Toggle Basic example",
          }),
      ],
      [
        "base-ui-toggle-group-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-toggle-group-basic",
            preview: DocsPreviewsNZ.baseUiToggleGroupBasicExamplePreview(
              model.baseUiToggleGroupBasicExample,
              "base-ui-toggle-group-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-toggle-group/examples/basic",
            linkText: "Open standalone Base UI Toggle Group Basic example",
          }),
      ],
      [
        "base-ui-toolbar-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-toolbar-basic",
            preview: DocsPreviewsNZ.baseUiToolbarBasicExamplePreview(
              model.baseUiToolbarBasicExample,
              "base-ui-toolbar-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-toolbar/examples/basic",
            linkText: "Open standalone Base UI Toolbar Basic example",
          }),
      ],
      [
        "base-ui-tooltip-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-base-ui-tooltip-basic",
            preview: DocsPreviewsNZ.baseUiTooltipBasicExamplePreview(
              model.baseUiTooltipBasicExample,
              "base-ui-tooltip-docs-basic-preview"
            ),
            href: "/docs/components/base-ui-tooltip/examples/basic",
            linkText: "Open standalone Base UI Tooltip Basic example",
          }),
      ],
    ],
    () => html<Message>().empty
  );

const baseUiLaneDocsView = (
  model: Model,
  config: BaseUiLaneDocsConfig
): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], [config.label]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [config.description]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: config.source },
        {
          label: "Examples",
          value:
            config.examples === undefined
              ? "reuses Foldkit examples"
              : config.examples.join(", "),
        },
        { label: "Proof", value: "wrapper tests, registry JSON" },
      ]),
      docsOverviewBlock(
        `${config.label} documents the Base UI style lane for ${config.primitive}: the behavior remains owned by Foldkit, while the installable slice exposes simple Base UI naming and class hooks for consumers who want a lighter presentation layer.`
      ),
      ...(config.examples === undefined
        ? []
        : [
            h.section(
              [h.Class("space-y-4")],
              [
                h.h2(
                  [h.Class("text-xl font-semibold text-gray-950")],
                  ["Examples"]
                ),
                h.div(
                  [h.Class("grid gap-4 lg:grid-cols-2")],
                  config.examples.map((example) =>
                    baseUiGeneratedExampleBlock(model, example)
                  )
                ),
              ]
            ),
          ]),
      ...docsStandardComponentSections({
        installCommands: `bunx shadcn@latest add <registry-url>/${config.source.replace(
          "registry/default/ui/",
          ""
        )}.json`,
        usageBody: config.usage,
        usageCode: `import * as ${config.label.replaceAll(
          " ",
          ""
        )} from "./ui/${config.source.replace("registry/default/ui/", "")}";`,
        integrationCode: `// Parent model and messages stay the same as the Foldkit ${config.primitive} slice.\n// Use this Base UI lane package when you want the same behavior with Base UI naming and styling hooks.`,
        anatomySection: docsAnatomyBlock(config.anatomyCode),
        stylingItems: config.classHelpers,
        stylingCode: config.classHelpers.join("\n"),
        includeKeyboardInteraction: true,
        apiItems: [
          `${config.primitive} exports: re-exported from the Foldkit functional slice.`,
          "Base UI class helpers: stable names for the simple styled lane.",
        ],
        accessibilityItems: [
          `Accessibility behavior comes from the underlying Foldkit ${config.primitive} implementation.`,
          "Consumers keep the primitive attribute groups intact when customizing markup.",
          "Disabled, labelled, described, focus, and keyboard behavior follow the matching Foldkit component contract.",
        ],
        coverageItems: [
          "Registry wrapper tests verify exported class helpers and functional re-exports.",
          ...(config.examples === undefined
            ? []
            : [
                `Wrapper-specific installable examples: ${config.examples.join(
                  ", "
                )}.`,
              ]),
          "Generated registry JSON includes the Base UI origin metadata and dependency link to the Foldkit component.",
          "Install smoke verifies the wrapper and its registry dependency install together.",
        ],
      }),
    ]
  );
};

type ShadcnLaneDocsConfig = Readonly<{
  label: string;
  source: string;
  primitive: string;
  description: string;
  usage: string;
  classHelpers: readonly string[];
  anatomyCode: string;
  examples?: readonly string[];
}>;

const shadcnNewPrimitiveExampleBlock = (model: Model, example: string): Html =>
  generatedExampleBlock(
    example,
    [
      [
        "shadcn-toggle-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-shadcn-toggle-basic",
            preview: DocsPreviewsShadcnMissing.shadcnToggleBasicExamplePreview(
              model.shadcnToggleBasicExample,
              "shadcn-toggle-docs-basic-preview"
            ),
            href: "/docs/components/shadcn-toggle/examples/basic",
            linkText: "Open standalone shadcn Toggle Basic example",
          }),
      ],
      [
        "shadcn-toggle-group-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-shadcn-toggle-group-basic",
            preview:
              DocsPreviewsShadcnMissing.shadcnToggleGroupBasicExamplePreview(
                model.shadcnToggleGroupBasicExample,
                "shadcn-toggle-group-docs-basic-preview"
              ),
            href: "/docs/components/shadcn-toggle-group/examples/basic",
            linkText: "Open standalone shadcn Toggle Group Basic example",
          }),
      ],
      [
        "shadcn-tooltip-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-shadcn-tooltip-basic",
            preview: DocsPreviewsShadcnMissing.shadcnTooltipBasicExamplePreview(
              model.shadcnTooltipBasicExample,
              "shadcn-tooltip-docs-basic-preview"
            ),
            href: "/docs/components/shadcn-tooltip/examples/basic",
            linkText: "Open standalone shadcn Tooltip Basic example",
          }),
      ],
      [
        "shadcn-base-accordion-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-shadcn-base-accordion-basic",
            preview:
              DocsPreviewsShadcnMissing.shadcnBaseAccordionBasicExamplePreview(
                model.shadcnBaseAccordionBasicExample,
                "shadcn-base-accordion-docs-basic-preview"
              ),
            href: "/docs/components/shadcn-base-accordion/examples/basic",
            linkText: "Open standalone shadcn Base Accordion Basic example",
          }),
      ],
    ],
    () => html<Message>().empty
  );

const shadcnGeneratedExampleBlock = (model: Model, example: string): Html =>
  generatedExampleBlock(
    example,
    [
      [
        "alert-action",
        () =>
          docsExampleBlock({
            title: "Action",
            testId: "docs-example-block-alert-action",
            preview: DocsPreviewsAlert.alertActionExamplePreview(
              model.alertActionExample,
              "shadcn-alert-docs-action-preview"
            ),
            href: "/docs/components/shadcn-alert/examples/action",
            linkText: "Open standalone shadcn Alert Action example",
          }),
      ],
      [
        "alert-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-alert-basic",
            preview: DocsPreviewsAlert.alertBasicExamplePreview(
              model.alertBasicExample,
              "shadcn-alert-docs-basic-preview"
            ),
            href: "/docs/components/shadcn-alert/examples/basic",
            linkText: "Open standalone shadcn Alert Basic example",
          }),
      ],
      [
        "alert-destructive",
        () =>
          docsExampleBlock({
            title: "Destructive",
            testId: "docs-example-block-alert-destructive",
            preview: DocsPreviewsAlert.alertDestructiveExamplePreview(
              model.alertDestructiveExample,
              "shadcn-alert-docs-destructive-preview"
            ),
            href: "/docs/components/shadcn-alert/examples/destructive",
            linkText: "Open standalone shadcn Alert Destructive example",
          }),
      ],
      [
        "alert-custom-colors",
        () =>
          docsExampleBlock({
            title: "Custom Colors",
            testId: "docs-example-block-alert-custom-colors",
            preview: DocsPreviewsAlert.alertCustomColorsExamplePreview(
              model.alertCustomColorsExample,
              "shadcn-alert-docs-custom-colors-preview"
            ),
            href: "/docs/components/shadcn-alert/examples/custom-colors",
            linkText: "Open standalone shadcn Alert Custom Colors example",
          }),
      ],
      [
        "alert-rtl",
        () =>
          docsExampleBlock({
            title: "RTL",
            testId: "docs-example-block-alert-rtl",
            preview: DocsPreviewsAlert.alertRtlExamplePreview(
              model.alertRtlExample,
              "shadcn-alert-docs-rtl-preview"
            ),
            href: "/docs/components/shadcn-alert/examples/rtl",
            linkText: "Open standalone shadcn Alert RTL example",
          }),
      ],
      [
        "aspect-ratio-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-aspect-ratio-basic",
            preview: DocsPreviewsAspect.aspectRatioBasicExamplePreview(
              model.aspectRatioBasicExample,
              "shadcn-aspect-ratio-docs-basic-preview"
            ),
            href: "/docs/components/shadcn-aspect-ratio/examples/basic",
            linkText: "Open standalone shadcn Aspect Ratio Basic example",
          }),
      ],
      [
        "aspect-ratio-portrait",
        () =>
          docsExampleBlock({
            title: "Portrait",
            testId: "docs-example-block-aspect-ratio-portrait",
            preview: DocsPreviewsAspect.aspectRatioPortraitExamplePreview(
              model.aspectRatioPortraitExample,
              "shadcn-aspect-ratio-docs-portrait-preview"
            ),
            href: "/docs/components/shadcn-aspect-ratio/examples/portrait",
            linkText: "Open standalone shadcn Aspect Ratio Portrait example",
          }),
      ],
      [
        "aspect-ratio-rtl",
        () =>
          docsExampleBlock({
            title: "RTL",
            testId: "docs-example-block-aspect-ratio-rtl",
            preview: DocsPreviewsAspect.aspectRatioRtlExamplePreview(
              model.aspectRatioRtlExample,
              "shadcn-aspect-ratio-docs-rtl-preview"
            ),
            href: "/docs/components/shadcn-aspect-ratio/examples/rtl",
            linkText: "Open standalone shadcn Aspect Ratio RTL example",
          }),
      ],
      [
        "aspect-ratio-square",
        () =>
          docsExampleBlock({
            title: "Square",
            testId: "docs-example-block-aspect-ratio-square",
            preview: DocsPreviewsAspect.aspectRatioSquareExamplePreview(
              model.aspectRatioSquareExample,
              "shadcn-aspect-ratio-docs-square-preview"
            ),
            href: "/docs/components/shadcn-aspect-ratio/examples/square",
            linkText: "Open standalone shadcn Aspect Ratio Square example",
          }),
      ],
      [
        "breadcrumb-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-breadcrumb-basic",
            preview: DocsPreviewsB.breadcrumbBasicExamplePreview(
              model.breadcrumbBasicExample,
              "shadcn-breadcrumb-docs-basic-preview"
            ),
            href: "/docs/components/shadcn-breadcrumb/examples/basic",
            linkText: "Open standalone shadcn Breadcrumb Basic example",
          }),
      ],
      [
        "breadcrumb-collapsed",
        () =>
          docsExampleBlock({
            title: "Collapsed",
            testId: "docs-example-block-breadcrumb-collapsed",
            preview: DocsPreviewsB.breadcrumbCollapsedExamplePreview(
              model.breadcrumbCollapsedExample,
              "shadcn-breadcrumb-docs-collapsed-preview"
            ),
            href: "/docs/components/shadcn-breadcrumb/examples/collapsed",
            linkText: "Open standalone shadcn Breadcrumb Collapsed example",
          }),
      ],
      [
        "breadcrumb-dropdown",
        () =>
          docsExampleBlock({
            title: "Dropdown",
            testId: "docs-example-block-breadcrumb-dropdown",
            preview: DocsPreviewsB.breadcrumbDropdownExamplePreview(
              model.breadcrumbDropdownExample,
              "shadcn-breadcrumb-docs-dropdown-preview"
            ),
            href: "/docs/components/shadcn-breadcrumb/examples/dropdown",
            linkText: "Open standalone shadcn Breadcrumb Dropdown example",
          }),
      ],
      [
        "breadcrumb-link",
        () =>
          docsExampleBlock({
            title: "Link component",
            testId: "docs-example-block-breadcrumb-link",
            preview: DocsPreviewsB.breadcrumbLinkExamplePreview(
              model.breadcrumbLinkExample,
              "shadcn-breadcrumb-docs-link-preview"
            ),
            href: "/docs/components/shadcn-breadcrumb/examples/link",
            linkText: "Open standalone shadcn Breadcrumb Link example",
          }),
      ],
      [
        "breadcrumb-rtl",
        () =>
          docsExampleBlock({
            title: "RTL",
            testId: "docs-example-block-breadcrumb-rtl",
            preview: DocsPreviewsB.breadcrumbRtlExamplePreview(
              model.breadcrumbRtlExample,
              "shadcn-breadcrumb-docs-rtl-preview"
            ),
            href: "/docs/components/shadcn-breadcrumb/examples/rtl",
            linkText: "Open standalone shadcn Breadcrumb RTL example",
          }),
      ],
      [
        "breadcrumb-separator",
        () =>
          docsExampleBlock({
            title: "Custom separator",
            testId: "docs-example-block-breadcrumb-separator",
            preview: DocsPreviewsB.breadcrumbSeparatorExamplePreview(
              model.breadcrumbSeparatorExample,
              "shadcn-breadcrumb-docs-separator-preview"
            ),
            href: "/docs/components/shadcn-breadcrumb/examples/separator",
            linkText: "Open standalone shadcn Breadcrumb Separator example",
          }),
      ],
      [
        "shadcn-checkbox-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-shadcn-checkbox-basic",
            preview:
              DocsPreviewsShadcnMissing.shadcnCheckboxBasicExamplePreview(
                model.shadcnCheckboxBasicExample,
                "shadcn-checkbox-docs-basic-preview"
              ),
            href: "/docs/components/shadcn-checkbox/examples/basic",
            linkText: "Open standalone shadcn Checkbox Basic example",
          }),
      ],
      [
        "shadcn-checkbox-checked-state",
        () =>
          docsExampleBlock({
            title: "Checked State",
            testId: "docs-example-block-shadcn-checkbox-checked-state",
            preview:
              DocsPreviewsShadcnMissing.shadcnCheckboxCheckedStateExamplePreview(
                model.shadcnCheckboxCheckedStateExample,
                "shadcn-checkbox-docs-checked-state-preview"
              ),
            href: "/docs/components/shadcn-checkbox/examples/checked-state",
            linkText: "Open standalone shadcn Checkbox Checked State example",
          }),
      ],
      [
        "shadcn-checkbox-description",
        () =>
          docsExampleBlock({
            title: "Description",
            testId: "docs-example-block-shadcn-checkbox-description",
            preview:
              DocsPreviewsShadcnMissing.shadcnCheckboxDescriptionExamplePreview(),
            href: "/docs/components/shadcn-checkbox/examples/description",
            linkText: "Open standalone shadcn Checkbox Description example",
          }),
      ],
      [
        "shadcn-checkbox-disabled",
        () =>
          docsExampleBlock({
            title: "Disabled",
            testId: "docs-example-block-shadcn-checkbox-disabled",
            preview:
              DocsPreviewsShadcnMissing.shadcnCheckboxDisabledExamplePreview(),
            href: "/docs/components/shadcn-checkbox/examples/disabled",
            linkText: "Open standalone shadcn Checkbox Disabled example",
          }),
      ],
      [
        "shadcn-checkbox-group",
        () =>
          docsExampleBlock({
            title: "Group",
            testId: "docs-example-block-shadcn-checkbox-group",
            preview:
              DocsPreviewsShadcnMissing.shadcnCheckboxGroupExamplePreview(),
            href: "/docs/components/shadcn-checkbox/examples/group",
            linkText: "Open standalone shadcn Checkbox Group example",
          }),
      ],
      [
        "shadcn-checkbox-invalid",
        () =>
          docsExampleBlock({
            title: "Invalid State",
            testId: "docs-example-block-shadcn-checkbox-invalid",
            preview:
              DocsPreviewsShadcnMissing.shadcnCheckboxInvalidExamplePreview(),
            href: "/docs/components/shadcn-checkbox/examples/invalid",
            linkText: "Open standalone shadcn Checkbox Invalid example",
          }),
      ],
      [
        "shadcn-checkbox-rtl",
        () =>
          docsExampleBlock({
            title: "RTL",
            testId: "docs-example-block-shadcn-checkbox-rtl",
            preview:
              DocsPreviewsShadcnMissing.shadcnCheckboxRtlExamplePreview(),
            href: "/docs/components/shadcn-checkbox/examples/rtl",
            linkText: "Open standalone shadcn Checkbox RTL example",
          }),
      ],
      [
        "shadcn-checkbox-table",
        () =>
          docsExampleBlock({
            title: "Table",
            testId: "docs-example-block-shadcn-checkbox-table",
            preview:
              DocsPreviewsShadcnMissing.shadcnCheckboxTableExamplePreview(),
            href: "/docs/components/shadcn-checkbox/examples/table",
            linkText: "Open standalone shadcn Checkbox Table example",
          }),
      ],
      [
        "shadcn-collapsible-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-shadcn-collapsible-basic",
            preview:
              DocsPreviewsShadcnMissing.shadcnCollapsibleBasicExamplePreview(
                model.shadcnCollapsibleBasicExample,
                "shadcn-collapsible-docs-basic-preview"
              ),
            href: "/docs/components/shadcn-collapsible/examples/basic",
            linkText: "Open standalone shadcn Collapsible Basic example",
          }),
      ],
      [
        "shadcn-combobox-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-shadcn-combobox-basic",
            preview:
              DocsPreviewsShadcnMissing.shadcnComboboxBasicExamplePreview(
                model.shadcnComboboxBasicExample,
                "shadcn-combobox-docs-basic-preview"
              ),
            href: "/docs/components/shadcn-combobox/examples/basic",
            linkText: "Open standalone shadcn Combobox Basic example",
          }),
      ],
      [
        "shadcn-context-menu-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-shadcn-context-menu-basic",
            preview:
              DocsPreviewsShadcnMissing.shadcnContextMenuBasicExamplePreview(
                model.shadcnContextMenuBasicExample,
                "shadcn-context-menu-docs-basic-preview"
              ),
            href: "/docs/components/shadcn-context-menu/examples/basic",
            linkText: "Open standalone shadcn Context Menu Basic example",
          }),
      ],
      [
        "shadcn-date-picker-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-shadcn-date-picker-basic",
            preview:
              DocsPreviewsShadcnMissing.shadcnDatePickerBasicExamplePreview(
                model.shadcnDatePickerBasicExample,
                "shadcn-date-picker-docs-basic-preview"
              ),
            href: "/docs/components/shadcn-date-picker/examples/basic",
            linkText: "Open standalone shadcn Date Picker Basic example",
          }),
      ],
      [
        "shadcn-dialog-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-shadcn-dialog-basic",
            preview: DocsPreviewsShadcnMissing.shadcnDialogBasicExamplePreview(
              model.shadcnDialogBasicExample,
              "shadcn-dialog-docs-basic-preview"
            ),
            href: "/docs/components/shadcn-dialog/examples/basic",
            linkText: "Open standalone shadcn Dialog Basic example",
          }),
      ],
      [
        "shadcn-dialog-custom-close-button",
        () =>
          docsExampleBlock({
            title: "Custom Close Button",
            testId: "docs-example-block-shadcn-dialog-custom-close-button",
            preview:
              DocsPreviewsShadcnMissing.shadcnDialogCustomCloseButtonExamplePreview(
                model.shadcnDialogCustomCloseButtonExample,
                "shadcn-dialog-docs-custom-close-button-preview"
              ),
            href: "/docs/components/shadcn-dialog/examples/custom-close-button",
            linkText:
              "Open standalone shadcn Dialog Custom Close Button example",
          }),
      ],
      [
        "shadcn-dialog-no-close-button",
        () =>
          docsExampleBlock({
            title: "No Close Button",
            testId: "docs-example-block-shadcn-dialog-no-close-button",
            preview:
              DocsPreviewsShadcnMissing.shadcnDialogNoCloseButtonExamplePreview(
                model.shadcnDialogNoCloseButtonExample,
                "shadcn-dialog-docs-no-close-button-preview"
              ),
            href: "/docs/components/shadcn-dialog/examples/no-close-button",
            linkText: "Open standalone shadcn Dialog No Close Button example",
          }),
      ],
      [
        "shadcn-dialog-sticky-footer",
        () =>
          docsExampleBlock({
            title: "Sticky Footer",
            testId: "docs-example-block-shadcn-dialog-sticky-footer",
            preview:
              DocsPreviewsShadcnMissing.shadcnDialogStickyFooterExamplePreview(
                model.shadcnDialogStickyFooterExample,
                "shadcn-dialog-docs-sticky-footer-preview"
              ),
            href: "/docs/components/shadcn-dialog/examples/sticky-footer",
            linkText: "Open standalone shadcn Dialog Sticky Footer example",
          }),
      ],
      [
        "shadcn-dialog-scrollable-content",
        () =>
          docsExampleBlock({
            title: "Scrollable Content",
            testId: "docs-example-block-shadcn-dialog-scrollable-content",
            preview:
              DocsPreviewsShadcnMissing.shadcnDialogScrollableContentExamplePreview(
                model.shadcnDialogScrollableContentExample,
                "shadcn-dialog-docs-scrollable-content-preview"
              ),
            href: "/docs/components/shadcn-dialog/examples/scrollable-content",
            linkText:
              "Open standalone shadcn Dialog Scrollable Content example",
          }),
      ],
      [
        "shadcn-dialog-rtl",
        () =>
          docsExampleBlock({
            title: "RTL",
            testId: "docs-example-block-shadcn-dialog-rtl",
            preview: DocsPreviewsShadcnMissing.shadcnDialogRtlExamplePreview(
              model.shadcnDialogRtlExample,
              "shadcn-dialog-docs-rtl-preview"
            ),
            href: "/docs/components/shadcn-dialog/examples/rtl",
            linkText: "Open standalone shadcn Dialog RTL example",
          }),
      ],
      [
        "shadcn-drawer-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-shadcn-drawer-basic",
            preview: DocsPreviewsShadcnMissing.shadcnDrawerBasicExamplePreview(
              model.shadcnDrawerBasicExample,
              "shadcn-drawer-docs-basic-preview"
            ),
            href: "/docs/components/shadcn-drawer/examples/basic",
            linkText: "Open standalone shadcn Drawer Basic example",
          }),
      ],
      [
        "shadcn-drawer-scrollable-content",
        () =>
          docsExampleBlock({
            title: "Scrollable Content",
            testId: "docs-example-block-shadcn-drawer-scrollable-content",
            preview:
              DocsPreviewsShadcnMissing.shadcnDrawerScrollableContentExamplePreview(
                model.shadcnDrawerScrollableContentExample,
                "shadcn-drawer-docs-scrollable-content-preview"
              ),
            href: "/docs/components/shadcn-drawer/examples/scrollable-content",
            linkText:
              "Open standalone shadcn Drawer Scrollable Content example",
          }),
      ],
      [
        "shadcn-drawer-sides",
        () =>
          docsExampleBlock({
            title: "Sides",
            testId: "docs-example-block-shadcn-drawer-sides",
            preview: DocsPreviewsShadcnMissing.shadcnDrawerSidesExamplePreview(
              model.shadcnDrawerSidesExample,
              "shadcn-drawer-docs-sides-preview"
            ),
            href: "/docs/components/shadcn-drawer/examples/sides",
            linkText: "Open standalone shadcn Drawer Sides example",
          }),
      ],
      [
        "shadcn-drawer-responsive-dialog",
        () =>
          docsExampleBlock({
            title: "Responsive Dialog",
            testId: "docs-example-block-shadcn-drawer-responsive-dialog",
            preview:
              DocsPreviewsShadcnMissing.shadcnDrawerResponsiveDialogExamplePreview(
                model.shadcnDrawerResponsiveDialogExample,
                "shadcn-drawer-docs-responsive-dialog-preview"
              ),
            href: "/docs/components/shadcn-drawer/examples/responsive-dialog",
            linkText: "Open standalone shadcn Drawer Responsive Dialog example",
          }),
      ],
      [
        "shadcn-drawer-rtl",
        () =>
          docsExampleBlock({
            title: "RTL",
            testId: "docs-example-block-shadcn-drawer-rtl",
            preview: DocsPreviewsShadcnMissing.shadcnDrawerRtlExamplePreview(
              model.shadcnDrawerRtlExample,
              "shadcn-drawer-docs-rtl-preview"
            ),
            href: "/docs/components/shadcn-drawer/examples/rtl",
            linkText: "Open standalone shadcn Drawer RTL example",
          }),
      ],
      [
        "shadcn-field-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-shadcn-field-basic",
            preview: DocsPreviewsShadcnMissing.shadcnFieldBasicExamplePreview(
              model.shadcnFieldBasicExample,
              "shadcn-field-docs-basic-preview"
            ),
            href: "/docs/components/shadcn-field/examples/basic",
            linkText: "Open standalone shadcn Field Basic example",
          }),
      ],
      [
        "shadcn-input-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-shadcn-input-basic",
            preview: DocsPreviewsShadcnMissing.shadcnInputBasicExamplePreview(
              model.shadcnInputBasicExample,
              "shadcn-input-docs-basic-preview"
            ),
            href: "/docs/components/shadcn-input/examples/basic",
            linkText: "Open standalone shadcn Input Basic example",
          }),
      ],
      [
        "shadcn-input-demo",
        () =>
          docsExampleBlock({
            title: "Demo",
            testId: "docs-example-block-shadcn-input-demo",
            preview: DocsPreviewsShadcnMissing.shadcnInputDemoExamplePreview(
              model.shadcnInputDemoExample,
              "shadcn-input-docs-demo-preview"
            ),
            href: "/docs/components/shadcn-input/examples/demo",
            linkText: "Open standalone shadcn Input Demo example",
          }),
      ],
      [
        "shadcn-input-field",
        () =>
          docsExampleBlock({
            title: "Field",
            testId: "docs-example-block-shadcn-input-field",
            preview: DocsPreviewsShadcnMissing.shadcnInputFieldExamplePreview(
              model.shadcnInputFieldExample,
              "shadcn-input-docs-field-preview"
            ),
            href: "/docs/components/shadcn-input/examples/field",
            linkText: "Open standalone shadcn Input Field example",
          }),
      ],
      [
        "shadcn-input-field-group",
        () =>
          docsExampleBlock({
            title: "Field Group",
            testId: "docs-example-block-shadcn-input-field-group",
            preview:
              DocsPreviewsShadcnMissing.shadcnInputFieldGroupExamplePreview(
                model.shadcnInputFieldGroupExample,
                "shadcn-input-docs-field-group-preview"
              ),
            href: "/docs/components/shadcn-input/examples/field-group",
            linkText: "Open standalone shadcn Input Field Group example",
          }),
      ],
      [
        "shadcn-input-inline",
        () =>
          docsExampleBlock({
            title: "Inline",
            testId: "docs-example-block-shadcn-input-inline",
            preview: DocsPreviewsShadcnMissing.shadcnInputInlineExamplePreview(
              model.shadcnInputInlineExample,
              "shadcn-input-docs-inline-preview"
            ),
            href: "/docs/components/shadcn-input/examples/inline",
            linkText: "Open standalone shadcn Input Inline example",
          }),
      ],
      [
        "shadcn-input-grid",
        () =>
          docsExampleBlock({
            title: "Grid",
            testId: "docs-example-block-shadcn-input-grid",
            preview: DocsPreviewsShadcnMissing.shadcnInputGridExamplePreview(
              model.shadcnInputGridExample,
              "shadcn-input-docs-grid-preview"
            ),
            href: "/docs/components/shadcn-input/examples/grid",
            linkText: "Open standalone shadcn Input Grid example",
          }),
      ],
      [
        "shadcn-input-required",
        () =>
          docsExampleBlock({
            title: "Required",
            testId: "docs-example-block-shadcn-input-required",
            preview:
              DocsPreviewsShadcnMissing.shadcnInputRequiredExamplePreview(
                model.shadcnInputRequiredExample,
                "shadcn-input-docs-required-preview"
              ),
            href: "/docs/components/shadcn-input/examples/required",
            linkText: "Open standalone shadcn Input Required example",
          }),
      ],
      [
        "shadcn-input-badge",
        () =>
          docsExampleBlock({
            title: "Badge",
            testId: "docs-example-block-shadcn-input-badge",
            preview: DocsPreviewsShadcnMissing.shadcnInputBadgeExamplePreview(
              model.shadcnInputBadgeExample,
              "shadcn-input-docs-badge-preview"
            ),
            href: "/docs/components/shadcn-input/examples/badge",
            linkText: "Open standalone shadcn Input Badge example",
          }),
      ],
      [
        "shadcn-input-input-group",
        () =>
          docsExampleBlock({
            title: "Input Group",
            testId: "docs-example-block-shadcn-input-input-group",
            preview:
              DocsPreviewsShadcnMissing.shadcnInputInputGroupExamplePreview(
                model.shadcnInputInputGroupExample,
                "shadcn-input-docs-input-group-preview"
              ),
            href: "/docs/components/shadcn-input/examples/input-group",
            linkText: "Open standalone shadcn Input Input Group example",
          }),
      ],
      [
        "shadcn-input-button-group",
        () =>
          docsExampleBlock({
            title: "Button Group",
            testId: "docs-example-block-shadcn-input-button-group",
            preview:
              DocsPreviewsShadcnMissing.shadcnInputButtonGroupExamplePreview(
                model.shadcnInputButtonGroupExample,
                "shadcn-input-docs-button-group-preview"
              ),
            href: "/docs/components/shadcn-input/examples/button-group",
            linkText: "Open standalone shadcn Input Button Group example",
          }),
      ],
      [
        "shadcn-input-form",
        () =>
          docsExampleBlock({
            title: "Form",
            testId: "docs-example-block-shadcn-input-form",
            preview: DocsPreviewsShadcnMissing.shadcnInputFormExamplePreview(
              model.shadcnInputFormExample,
              "shadcn-input-docs-form-preview"
            ),
            href: "/docs/components/shadcn-input/examples/form",
            linkText: "Open standalone shadcn Input Form example",
          }),
      ],
      [
        "shadcn-input-disabled",
        () =>
          docsExampleBlock({
            title: "Disabled",
            testId: "docs-example-block-shadcn-input-disabled",
            preview:
              DocsPreviewsShadcnMissing.shadcnInputDisabledExamplePreview(
                model.shadcnInputDisabledExample,
                "shadcn-input-docs-disabled-preview"
              ),
            href: "/docs/components/shadcn-input/examples/disabled",
            linkText: "Open standalone shadcn Input Disabled example",
          }),
      ],
      [
        "shadcn-input-invalid",
        () =>
          docsExampleBlock({
            title: "Invalid",
            testId: "docs-example-block-shadcn-input-invalid",
            preview: DocsPreviewsShadcnMissing.shadcnInputInvalidExamplePreview(
              model.shadcnInputInvalidExample,
              "shadcn-input-docs-invalid-preview"
            ),
            href: "/docs/components/shadcn-input/examples/invalid",
            linkText: "Open standalone shadcn Input Invalid example",
          }),
      ],
      [
        "shadcn-input-file",
        () =>
          docsExampleBlock({
            title: "File",
            testId: "docs-example-block-shadcn-input-file",
            preview: DocsPreviewsShadcnMissing.shadcnInputFileExamplePreview(
              model.shadcnInputFileExample,
              "shadcn-input-docs-file-preview"
            ),
            href: "/docs/components/shadcn-input/examples/file",
            linkText: "Open standalone shadcn Input File example",
          }),
      ],
      [
        "shadcn-input-rtl",
        () =>
          docsExampleBlock({
            title: "RTL",
            testId: "docs-example-block-shadcn-input-rtl",
            preview: DocsPreviewsShadcnMissing.shadcnInputRtlExamplePreview(
              model.shadcnInputRtlExample,
              "shadcn-input-docs-rtl-preview"
            ),
            href: "/docs/components/shadcn-input/examples/rtl",
            linkText: "Open standalone shadcn Input RTL example",
          }),
      ],
      [
        "shadcn-menubar-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-shadcn-menubar-basic",
            preview: DocsPreviewsShadcnMissing.shadcnMenubarBasicExamplePreview(
              model.shadcnMenubarBasicExample,
              "shadcn-menubar-docs-basic-preview"
            ),
            href: "/docs/components/shadcn-menubar/examples/basic",
            linkText: "Open standalone shadcn Menubar Basic example",
          }),
      ],
      [
        "shadcn-navigation-menu-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-shadcn-navigation-menu-basic",
            preview:
              DocsPreviewsShadcnMissing.shadcnNavigationMenuBasicExamplePreview(),
            href: "/docs/components/shadcn-navigation-menu/examples/basic",
            linkText: "Open standalone shadcn Navigation Menu Basic example",
          }),
      ],
      [
        "shadcn-popover-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-shadcn-popover-basic",
            preview: DocsPreviewsShadcnMissing.shadcnPopoverBasicExamplePreview(
              model.shadcnPopoverBasicExample,
              "shadcn-popover-docs-basic-preview"
            ),
            href: "/docs/components/shadcn-popover/examples/basic",
            linkText: "Open standalone shadcn Popover Basic example",
          }),
      ],
      [
        "shadcn-progress-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-shadcn-progress-basic",
            preview:
              DocsPreviewsShadcnMissing.shadcnProgressBasicExamplePreview(),
            href: "/docs/components/shadcn-progress/examples/basic",
            linkText: "Open standalone shadcn Progress Basic example",
          }),
      ],
      [
        "shadcn-scroll-area-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-shadcn-scroll-area-basic",
            preview:
              DocsPreviewsShadcnMissing.shadcnScrollAreaBasicExamplePreview(),
            href: "/docs/components/shadcn-scroll-area/examples/basic",
            linkText: "Open standalone shadcn Scroll Area Basic example",
          }),
      ],
      [
        "shadcn-separator-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-shadcn-separator-basic",
            preview:
              DocsPreviewsShadcnMissing.shadcnSeparatorBasicExamplePreview(),
            href: "/docs/components/shadcn-separator/examples/basic",
            linkText: "Open standalone shadcn Separator Basic example",
          }),
      ],
      [
        "shadcn-textarea-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-shadcn-textarea-basic",
            preview:
              DocsPreviewsShadcnMissing.shadcnTextareaBasicExamplePreview(
                model.shadcnTextareaBasicExample,
                "shadcn-textarea-docs-basic-preview"
              ),
            href: "/docs/components/shadcn-textarea/examples/basic",
            linkText: "Open standalone shadcn Textarea Basic example",
          }),
      ],
      [
        "shadcn-textarea-field",
        () =>
          docsExampleBlock({
            title: "Field",
            testId: "docs-example-block-shadcn-textarea-field",
            preview:
              DocsPreviewsShadcnMissing.shadcnTextareaFieldExamplePreview(),
            href: "/docs/components/shadcn-textarea/examples/field",
            linkText: "Open standalone shadcn Textarea Field example",
          }),
      ],
      [
        "shadcn-textarea-disabled",
        () =>
          docsExampleBlock({
            title: "Disabled",
            testId: "docs-example-block-shadcn-textarea-disabled",
            preview:
              DocsPreviewsShadcnMissing.shadcnTextareaDisabledExamplePreview(),
            href: "/docs/components/shadcn-textarea/examples/disabled",
            linkText: "Open standalone shadcn Textarea Disabled example",
          }),
      ],
      [
        "shadcn-textarea-invalid",
        () =>
          docsExampleBlock({
            title: "Invalid",
            testId: "docs-example-block-shadcn-textarea-invalid",
            preview:
              DocsPreviewsShadcnMissing.shadcnTextareaInvalidExamplePreview(),
            href: "/docs/components/shadcn-textarea/examples/invalid",
            linkText: "Open standalone shadcn Textarea Invalid example",
          }),
      ],
      [
        "shadcn-textarea-button",
        () =>
          docsExampleBlock({
            title: "Button",
            testId: "docs-example-block-shadcn-textarea-button",
            preview:
              DocsPreviewsShadcnMissing.shadcnTextareaButtonExamplePreview(),
            href: "/docs/components/shadcn-textarea/examples/button",
            linkText: "Open standalone shadcn Textarea Button example",
          }),
      ],
      [
        "shadcn-textarea-rtl",
        () =>
          docsExampleBlock({
            title: "RTL",
            testId: "docs-example-block-shadcn-textarea-rtl",
            preview:
              DocsPreviewsShadcnMissing.shadcnTextareaRtlExamplePreview(),
            href: "/docs/components/shadcn-textarea/examples/rtl",
            linkText: "Open standalone shadcn Textarea RTL example",
          }),
      ],
      [
        "shadcn-toast-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-shadcn-toast-basic",
            preview: DocsPreviewsShadcnMissing.shadcnToastBasicExamplePreview(
              model.shadcnToastBasicExample,
              "shadcn-toast-docs-basic-preview"
            ),
            href: "/docs/components/shadcn-toast/examples/basic",
            linkText: "Open standalone shadcn Toast Basic example",
          }),
      ],
    ],
    () => shadcnNewPrimitiveExampleBlock(model, example)
  );

const shadcnButtonExampleBlock = (model: Model, example: string): Html =>
  generatedExampleBlock(
    example,
    [
      [
        "shadcn-button-size",
        () =>
          docsExampleBlock({
            title: "Size",
            testId: "docs-example-block-shadcn-button-size",
            preview: DocsPreviewsB.shadcnButtonSizeExamplePreview(),
            href: "/docs/components/shadcn-button/examples/size",
            linkText: "Open standalone shadcn Button Size example",
          }),
      ],
      [
        "shadcn-button-default",
        () =>
          docsExampleBlock({
            title: "Default",
            testId: "docs-example-block-shadcn-button-default",
            preview: DocsPreviewsB.shadcnButtonDefaultExamplePreview(),
            href: "/docs/components/shadcn-button/examples/default",
            linkText: "Open standalone shadcn Button Default example",
          }),
      ],
      [
        "shadcn-button-outline",
        () =>
          docsExampleBlock({
            title: "Outline",
            testId: "docs-example-block-shadcn-button-outline",
            preview: DocsPreviewsB.shadcnButtonOutlineExamplePreview(),
            href: "/docs/components/shadcn-button/examples/outline",
            linkText: "Open standalone shadcn Button Outline example",
          }),
      ],
      [
        "shadcn-button-secondary",
        () =>
          docsExampleBlock({
            title: "Secondary",
            testId: "docs-example-block-shadcn-button-secondary",
            preview: DocsPreviewsB.shadcnButtonSecondaryExamplePreview(),
            href: "/docs/components/shadcn-button/examples/secondary",
            linkText: "Open standalone shadcn Button Secondary example",
          }),
      ],
      [
        "shadcn-button-ghost",
        () =>
          docsExampleBlock({
            title: "Ghost",
            testId: "docs-example-block-shadcn-button-ghost",
            preview: DocsPreviewsB.shadcnButtonGhostExamplePreview(),
            href: "/docs/components/shadcn-button/examples/ghost",
            linkText: "Open standalone shadcn Button Ghost example",
          }),
      ],
      [
        "shadcn-button-destructive",
        () =>
          docsExampleBlock({
            title: "Destructive",
            testId: "docs-example-block-shadcn-button-destructive",
            preview: DocsPreviewsB.shadcnButtonDestructiveExamplePreview(),
            href: "/docs/components/shadcn-button/examples/destructive",
            linkText: "Open standalone shadcn Button Destructive example",
          }),
      ],
      [
        "shadcn-button-link",
        () =>
          docsExampleBlock({
            title: "Link",
            testId: "docs-example-block-shadcn-button-link",
            preview: DocsPreviewsB.shadcnButtonLinkExamplePreview(),
            href: "/docs/components/shadcn-button/examples/link",
            linkText: "Open standalone shadcn Button Link example",
          }),
      ],
      [
        "shadcn-button-icon",
        () =>
          docsExampleBlock({
            title: "Icon",
            testId: "docs-example-block-shadcn-button-icon",
            preview: DocsPreviewsB.shadcnButtonIconExamplePreview(),
            href: "/docs/components/shadcn-button/examples/icon",
            linkText: "Open standalone shadcn Button Icon example",
          }),
      ],
      [
        "shadcn-button-with-icon",
        () =>
          docsExampleBlock({
            title: "With Icon",
            testId: "docs-example-block-shadcn-button-with-icon",
            preview: DocsPreviewsB.shadcnButtonWithIconExamplePreview(),
            href: "/docs/components/shadcn-button/examples/with-icon",
            linkText: "Open standalone shadcn Button With Icon example",
          }),
      ],
      [
        "shadcn-button-rounded",
        () =>
          docsExampleBlock({
            title: "Rounded",
            testId: "docs-example-block-shadcn-button-rounded",
            preview: DocsPreviewsB.shadcnButtonRoundedExamplePreview(),
            href: "/docs/components/shadcn-button/examples/rounded",
            linkText: "Open standalone shadcn Button Rounded example",
          }),
      ],
      [
        "shadcn-button-spinner",
        () =>
          docsExampleBlock({
            title: "Spinner",
            testId: "docs-example-block-shadcn-button-spinner",
            preview: DocsPreviewsB.shadcnButtonSpinnerExamplePreview(),
            href: "/docs/components/shadcn-button/examples/spinner",
            linkText: "Open standalone shadcn Button Spinner example",
          }),
      ],
      [
        "shadcn-button-button-group",
        () =>
          docsExampleBlock({
            title: "Button Group",
            testId: "docs-example-block-shadcn-button-button-group",
            preview: DocsPreviewsB.shadcnButtonGroupExamplePreview(),
            href: "/docs/components/shadcn-button/examples/button-group",
            linkText: "Open standalone shadcn Button Group example",
          }),
      ],
      [
        "shadcn-button-as-child",
        () =>
          docsExampleBlock({
            title: "As Child",
            testId: "docs-example-block-shadcn-button-as-child",
            preview: DocsPreviewsB.shadcnButtonAsChildExamplePreview(),
            href: "/docs/components/shadcn-button/examples/as-child",
            linkText: "Open standalone shadcn Button As Child example",
          }),
      ],
      [
        "shadcn-button-rtl",
        () =>
          docsExampleBlock({
            title: "RTL",
            testId: "docs-example-block-shadcn-button-rtl",
            preview: DocsPreviewsB.shadcnButtonRtlExamplePreview(),
            href: "/docs/components/shadcn-button/examples/rtl",
            linkText: "Open standalone shadcn Button RTL example",
          }),
      ],
      [
        "button-group-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-button-group-basic",
            preview: DocsPreviewsB.buttonGroupBasicExamplePreview(
              model.buttonGroupBasicExample,
              "shadcn-button-group-docs-basic-preview"
            ),
            href: "/docs/components/shadcn-button-group/examples/basic",
            linkText: "Open standalone Button Group Basic example",
          }),
      ],
      [
        "button-group-orientation",
        () =>
          docsExampleBlock({
            title: "Orientation",
            testId: "docs-example-block-button-group-orientation",
            preview: DocsPreviewsB.buttonGroupOrientationExamplePreview(
              model.buttonGroupOrientationExample,
              "shadcn-button-group-docs-orientation-preview"
            ),
            href: "/docs/components/shadcn-button-group/examples/orientation",
            linkText: "Open standalone Button Group Orientation example",
          }),
      ],
      [
        "button-group-size",
        () =>
          docsExampleBlock({
            title: "Size",
            testId: "docs-example-block-button-group-size",
            preview: DocsPreviewsB.buttonGroupSizeExamplePreview(
              model.buttonGroupSizeExample,
              "shadcn-button-group-docs-size-preview"
            ),
            href: "/docs/components/shadcn-button-group/examples/size",
            linkText: "Open standalone Button Group Size example",
          }),
      ],
      [
        "button-group-nested",
        () =>
          docsExampleBlock({
            title: "Nested",
            testId: "docs-example-block-button-group-nested",
            preview: DocsPreviewsB.buttonGroupNestedExamplePreview(
              model.buttonGroupNestedExample,
              "shadcn-button-group-docs-nested-preview"
            ),
            href: "/docs/components/shadcn-button-group/examples/nested",
            linkText: "Open standalone Button Group Nested example",
          }),
      ],
      [
        "button-group-separator",
        () =>
          docsExampleBlock({
            title: "Separator",
            testId: "docs-example-block-button-group-separator",
            preview: DocsPreviewsB.buttonGroupSeparatorExamplePreview(
              model.buttonGroupSeparatorExample,
              "shadcn-button-group-docs-separator-preview"
            ),
            href: "/docs/components/shadcn-button-group/examples/separator",
            linkText: "Open standalone Button Group Separator example",
          }),
      ],
      [
        "button-group-split",
        () =>
          docsExampleBlock({
            title: "Split",
            testId: "docs-example-block-button-group-split",
            preview: DocsPreviewsB.buttonGroupSplitExamplePreview(
              model.buttonGroupSplitExample,
              "shadcn-button-group-docs-split-preview"
            ),
            href: "/docs/components/shadcn-button-group/examples/split",
            linkText: "Open standalone Button Group Split example",
          }),
      ],
      [
        "button-group-input",
        () =>
          docsExampleBlock({
            title: "Input",
            testId: "docs-example-block-button-group-input",
            preview: DocsPreviewsB.buttonGroupInputExamplePreview(
              model.buttonGroupInputExample,
              "shadcn-button-group-docs-input-preview"
            ),
            href: "/docs/components/shadcn-button-group/examples/input",
            linkText: "Open standalone Button Group Input example",
          }),
      ],
      [
        "button-group-input-group",
        () =>
          docsExampleBlock({
            title: "Input group",
            testId: "docs-example-block-button-group-input-group",
            preview: DocsPreviewsB.buttonGroupInputGroupExamplePreview(
              model.buttonGroupInputGroupExample,
              "shadcn-button-group-docs-input-group-preview"
            ),
            href: "/docs/components/shadcn-button-group/examples/input-group",
            linkText: "Open standalone Button Group Input Group example",
          }),
      ],
      [
        "button-group-select",
        () =>
          docsExampleBlock({
            title: "Select",
            testId: "docs-example-block-button-group-select",
            preview: DocsPreviewsB.buttonGroupSelectExamplePreview(
              model.buttonGroupSelectExample,
              "shadcn-button-group-docs-select-preview"
            ),
            href: "/docs/components/shadcn-button-group/examples/select",
            linkText: "Open standalone Button Group Select example",
          }),
      ],
      [
        "button-group-popover",
        () =>
          docsExampleBlock({
            title: "Popover",
            testId: "docs-example-block-button-group-popover",
            preview: DocsPreviewsB.buttonGroupPopoverExamplePreview(
              model.buttonGroupPopoverExample,
              "shadcn-button-group-docs-popover-preview"
            ),
            href: "/docs/components/shadcn-button-group/examples/popover",
            linkText: "Open standalone Button Group Popover example",
          }),
      ],
      [
        "button-group-rtl",
        () =>
          docsExampleBlock({
            title: "RTL",
            testId: "docs-example-block-button-group-rtl",
            preview: DocsPreviewsB.buttonGroupRtlExamplePreview(
              model.buttonGroupRtlExample,
              "shadcn-button-group-docs-rtl-preview"
            ),
            href: "/docs/components/shadcn-button-group/examples/rtl",
            linkText: "Open standalone Button Group RTL example",
          }),
      ],
      [
        "card-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-card-basic",
            preview: DocsPreviewsCD.cardBasicExamplePreview(
              model.cardBasicExample,
              "shadcn-card-docs-basic-preview"
            ),
            href: "/docs/components/shadcn-card/examples/basic",
            linkText: "Open standalone Card Basic example",
          }),
      ],
      [
        "card-image",
        () =>
          docsExampleBlock({
            title: "Image",
            testId: "docs-example-block-card-image",
            preview: DocsPreviewsCD.cardImageExamplePreview(
              model.cardImageExample,
              "shadcn-card-docs-image-preview"
            ),
            href: "/docs/components/shadcn-card/examples/image",
            linkText: "Open standalone Card Image example",
          }),
      ],
      [
        "card-rtl",
        () =>
          docsExampleBlock({
            title: "RTL",
            testId: "docs-example-block-card-rtl",
            preview: DocsPreviewsCD.cardRtlExamplePreview(
              model.cardRtlExample,
              "shadcn-card-docs-rtl-preview"
            ),
            href: "/docs/components/shadcn-card/examples/rtl",
            linkText: "Open standalone Card RTL example",
          }),
      ],
      [
        "card-size",
        () =>
          docsExampleBlock({
            title: "Size",
            testId: "docs-example-block-card-size",
            preview: DocsPreviewsCD.cardSizeExamplePreview(
              model.cardSizeExample,
              "shadcn-card-docs-size-preview"
            ),
            href: "/docs/components/shadcn-card/examples/size",
            linkText: "Open standalone Card Size example",
          }),
      ],
      [
        "card-spacing",
        () =>
          docsExampleBlock({
            title: "Spacing",
            testId: "docs-example-block-card-spacing",
            preview: DocsPreviewsCD.cardSpacingExamplePreview(
              model.cardSpacingExample,
              "shadcn-card-docs-spacing-preview"
            ),
            href: "/docs/components/shadcn-card/examples/spacing",
            linkText: "Open standalone Card Spacing example",
          }),
      ],
      [
        "carousel-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-carousel-basic",
            preview: DocsPreviewsCD.carouselBasicExamplePreview(
              model.carouselBasicExample,
              "shadcn-carousel-docs-basic-preview"
            ),
            href: "/docs/components/shadcn-carousel/examples/basic",
            linkText: "Open standalone Carousel Basic example",
          }),
      ],
      [
        "carousel-sizes",
        () =>
          docsExampleBlock({
            title: "Sizes",
            testId: "docs-example-block-carousel-sizes",
            preview: DocsPreviewsCD.carouselSizesExamplePreview(
              model.carouselSizesExample,
              "shadcn-carousel-docs-sizes-preview"
            ),
            href: "/docs/components/shadcn-carousel/examples/sizes",
            linkText: "Open standalone Carousel Sizes example",
          }),
      ],
      [
        "carousel-spacing",
        () =>
          docsExampleBlock({
            title: "Spacing",
            testId: "docs-example-block-carousel-spacing",
            preview: DocsPreviewsCD.carouselSpacingExamplePreview(
              model.carouselSpacingExample,
              "shadcn-carousel-docs-spacing-preview"
            ),
            href: "/docs/components/shadcn-carousel/examples/spacing",
            linkText: "Open standalone Carousel Spacing example",
          }),
      ],
      [
        "carousel-orientation",
        () =>
          docsExampleBlock({
            title: "Orientation",
            testId: "docs-example-block-carousel-orientation",
            preview: DocsPreviewsCD.carouselOrientationExamplePreview(
              model.carouselOrientationExample,
              "shadcn-carousel-docs-orientation-preview"
            ),
            href: "/docs/components/shadcn-carousel/examples/orientation",
            linkText: "Open standalone Carousel Orientation example",
          }),
      ],
      [
        "carousel-api",
        () =>
          docsExampleBlock({
            title: "API",
            testId: "docs-example-block-carousel-api",
            preview: DocsPreviewsCD.carouselApiExamplePreview(
              model.carouselApiExample,
              "shadcn-carousel-docs-api-preview"
            ),
            href: "/docs/components/shadcn-carousel/examples/api",
            linkText: "Open standalone Carousel API example",
          }),
      ],
      [
        "carousel-autoplay",
        () =>
          docsExampleBlock({
            title: "Autoplay",
            testId: "docs-example-block-carousel-autoplay",
            preview: DocsPreviewsCD.carouselAutoplayExamplePreview(
              model.carouselAutoplayExample,
              "shadcn-carousel-docs-autoplay-preview"
            ),
            href: "/docs/components/shadcn-carousel/examples/autoplay",
            linkText: "Open standalone Carousel Autoplay example",
          }),
      ],
      [
        "carousel-rtl",
        () =>
          docsExampleBlock({
            title: "RTL",
            testId: "docs-example-block-carousel-rtl",
            preview: DocsPreviewsCD.carouselRtlExamplePreview(
              model.carouselRtlExample,
              "shadcn-carousel-docs-rtl-preview"
            ),
            href: "/docs/components/shadcn-carousel/examples/rtl",
            linkText: "Open standalone Carousel RTL example",
          }),
      ],
    ],
    () => shadcnGeneratedExampleBlock(model, example)
  );

const shadcnAccordionExampleBlock = (model: Model, example: string): Html =>
  generatedExampleBlock(
    example,
    [
      [
        "shadcn-accordion-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            description:
              "Single-value accordion behavior: one trigger opens its content and closes the previously open item.",
            testId: "docs-example-block-shadcn-accordion-basic",
            preview: DocsPreviewsAccordion.shadcnAccordionBasicExamplePreview(
              model.shadcnAccordionBasicExample,
              "shadcn-accordion-docs-basic-preview"
            ),
            href: "/docs/components/shadcn-accordion/examples/basic",
            linkText: "Open standalone shadcn Accordion Basic example",
          }),
      ],
      [
        "shadcn-accordion-multiple",
        () =>
          docsExampleBlock({
            title: "Multiple",
            description:
              "Multiple-value accordion behavior: opening another item keeps the existing item open.",
            testId: "docs-example-block-shadcn-accordion-multiple",
            preview:
              DocsPreviewsAccordion.shadcnAccordionMultipleExamplePreview(
                model.shadcnAccordionMultipleExample,
                "shadcn-accordion-docs-multiple-preview"
              ),
            href: "/docs/components/shadcn-accordion/examples/multiple",
            linkText: "Open standalone shadcn Accordion Multiple example",
          }),
      ],
      [
        "shadcn-accordion-disabled",
        () =>
          docsExampleBlock({
            title: "Disabled",
            description:
              "Disabled items stay visible in the set but do not dispatch toggle messages.",
            testId: "docs-example-block-shadcn-accordion-disabled",
            preview:
              DocsPreviewsAccordion.shadcnAccordionDisabledExamplePreview(
                model.shadcnAccordionDisabledExample,
                "shadcn-accordion-docs-disabled-preview"
              ),
            href: "/docs/components/shadcn-accordion/examples/disabled",
            linkText: "Open standalone shadcn Accordion Disabled example",
          }),
      ],
      [
        "shadcn-accordion-borders",
        () =>
          docsExampleBlock({
            title: "Borders",
            description:
              "Adds the outer rounded border while item dividers remain internal and the last divider is removed.",
            testId: "docs-example-block-shadcn-accordion-borders",
            preview: DocsPreviewsAccordion.shadcnAccordionBordersExamplePreview(
              model.shadcnAccordionBordersExample,
              "shadcn-accordion-docs-borders-preview"
            ),
            href: "/docs/components/shadcn-accordion/examples/borders",
            linkText: "Open standalone shadcn Accordion Borders example",
          }),
      ],
      [
        "shadcn-accordion-card",
        () =>
          docsExampleBlock({
            title: "Card",
            description:
              "Places the accordion inside a card shell with contextual title copy and contained spacing.",
            testId: "docs-example-block-shadcn-accordion-card",
            preview: DocsPreviewsAccordion.shadcnAccordionCardExamplePreview(
              model.shadcnAccordionCardExample,
              "shadcn-accordion-docs-card-preview"
            ),
            href: "/docs/components/shadcn-accordion/examples/card",
            linkText: "Open standalone shadcn Accordion Card example",
          }),
      ],
      [
        "shadcn-accordion-rtl",
        () =>
          docsExampleBlock({
            title: "RTL",
            description:
              "Renders the same controlled accordion interaction inside a right-to-left container.",
            testId: "docs-example-block-shadcn-accordion-rtl",
            preview: DocsPreviewsAccordion.shadcnAccordionRtlExamplePreview(
              model.shadcnAccordionRtlExample,
              "shadcn-accordion-docs-rtl-preview"
            ),
            href: "/docs/components/shadcn-accordion/examples/rtl",
            linkText: "Open standalone shadcn Accordion RTL example",
          }),
      ],
    ],
    () => shadcnButtonExampleBlock(model, example)
  );

const shadcnCalendarExampleBlock = (model: Model, example: string): Html =>
  generatedExampleBlock(
    example,
    [
      [
        "shadcn-calendar-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            description:
              "Single-date selection with parent-visible selected date and viewed month feedback.",
            testId: "docs-example-block-shadcn-calendar-basic",
            preview: DocsPreviewsCD.shadcnCalendarBasicExamplePreview(
              model.shadcnCalendarBasicExample,
              "shadcn-calendar-docs-basic-preview"
            ),
            href: "/docs/components/shadcn-calendar/examples/basic",
            linkText: "Open standalone shadcn Calendar Basic example",
          }),
      ],
      [
        "shadcn-calendar-month-year-selector",
        () =>
          docsExampleBlock({
            title: "Month and Year Selector",
            description:
              "Uses Foldkit Calendar day, month, and year modes to navigate bounded birth-year selection.",
            testId: "docs-example-block-shadcn-calendar-month-year-selector",
            preview:
              DocsPreviewsCD.shadcnCalendarMonthYearSelectorExamplePreview(
                model.shadcnCalendarMonthYearSelectorExample,
                "shadcn-calendar-docs-month-year-selector-preview"
              ),
            href: "/docs/components/shadcn-calendar/examples/month-year-selector",
            linkText:
              "Open standalone shadcn Calendar Month and Year Selector example",
          }),
      ],
      [
        "shadcn-calendar-range",
        () =>
          docsExampleBlock({
            title: "Range Calendar",
            description:
              "Represents the origin range layout while the local Calendar primitive remains single-date.",
            testId: "docs-example-block-shadcn-calendar-range",
            preview: DocsPreviewsCD.shadcnCalendarRangeExamplePreview(
              model.shadcnCalendarRangeExample,
              "shadcn-calendar-docs-range-preview"
            ),
            href: "/docs/components/shadcn-calendar/examples/range",
            linkText: "Open standalone shadcn Calendar Range example",
          }),
      ],
      [
        "shadcn-calendar-date-of-birth",
        () =>
          docsExampleBlock({
            title: "Date of Birth",
            description:
              "Constrains date selection to an application-defined birth-date range.",
            testId: "docs-example-block-shadcn-calendar-date-of-birth",
            preview: DocsPreviewsCD.shadcnCalendarDateOfBirthExamplePreview(
              model.shadcnCalendarDateOfBirthExample,
              "shadcn-calendar-docs-date-of-birth-preview"
            ),
            href: "/docs/components/shadcn-calendar/examples/date-of-birth",
            linkText: "Open standalone shadcn Calendar Date of Birth example",
          }),
      ],
      [
        "shadcn-calendar-date-time-picker",
        () =>
          docsExampleBlock({
            title: "Date and Time Picker",
            description:
              "Represents the origin date-time composition with static time fields.",
            testId: "docs-example-block-shadcn-calendar-date-time-picker",
            preview:
              DocsPreviewsCD.shadcnCalendarDateTimePickerExamplePreview(
                model.shadcnCalendarDateTimePickerExample,
                "shadcn-calendar-docs-date-time-picker-preview"
              ),
            href: "/docs/components/shadcn-calendar/examples/date-time-picker",
            linkText:
              "Open standalone shadcn Calendar Date and Time Picker example",
          }),
      ],
      [
        "shadcn-calendar-presets",
        () =>
          docsExampleBlock({
            title: "Presets",
            description:
              "Parent-owned preset buttons select concrete CalendarDate values through the Calendar update path.",
            testId: "docs-example-block-shadcn-calendar-presets",
            preview: DocsPreviewsCD.shadcnCalendarPresetsExamplePreview(
              model.shadcnCalendarPresetsExample,
              "shadcn-calendar-docs-presets-preview"
            ),
            href: "/docs/components/shadcn-calendar/examples/presets",
            linkText: "Open standalone shadcn Calendar Presets example",
          }),
      ],
      [
        "shadcn-calendar-booked",
        () =>
          docsExampleBlock({
            title: "Booked Dates",
            description:
              "Marks booked days as disabled with Calendar disabled-date and disabled-weekday reflection.",
            testId: "docs-example-block-shadcn-calendar-booked",
            preview: DocsPreviewsCD.shadcnCalendarBookedExamplePreview(
              model.shadcnCalendarBookedExample,
              "shadcn-calendar-docs-booked-preview"
            ),
            href: "/docs/components/shadcn-calendar/examples/booked-dates",
            linkText: "Open standalone shadcn Calendar Booked Dates example",
          }),
      ],
      [
        "shadcn-calendar-custom-cell-size",
        () =>
          docsExampleBlock({
            title: "Custom Cell Size",
            description:
              "Represents the origin larger day cells with secondary price text.",
            testId: "docs-example-block-shadcn-calendar-custom-cell-size",
            preview:
              DocsPreviewsCD.shadcnCalendarCustomCellSizeExamplePreview(
                model.shadcnCalendarCustomCellSizeExample,
                "shadcn-calendar-docs-custom-cell-size-preview"
              ),
            href: "/docs/components/shadcn-calendar/examples/custom-cell-size",
            linkText:
              "Open standalone shadcn Calendar Custom Cell Size example",
          }),
      ],
      [
        "shadcn-calendar-week-numbers",
        () =>
          docsExampleBlock({
            title: "Week Numbers",
            description:
              "Represents the origin week-number column as an inert calendar table.",
            testId: "docs-example-block-shadcn-calendar-week-numbers",
            preview: DocsPreviewsCD.shadcnCalendarWeekNumbersExamplePreview(
              model.shadcnCalendarWeekNumbersExample,
              "shadcn-calendar-docs-week-numbers-preview"
            ),
            href: "/docs/components/shadcn-calendar/examples/week-numbers",
            linkText: "Open standalone shadcn Calendar Week Numbers example",
          }),
      ],
      [
        "shadcn-calendar-rtl",
        () =>
          docsExampleBlock({
            title: "RTL",
            description:
              "Uses an Arabic locale and right-to-left container while keeping Calendar selection behavior intact.",
            testId: "docs-example-block-shadcn-calendar-rtl",
            preview: DocsPreviewsCD.shadcnCalendarRtlExamplePreview(
              model.shadcnCalendarRtlExample,
              "shadcn-calendar-docs-rtl-preview"
            ),
            href: "/docs/components/shadcn-calendar/examples/rtl",
            linkText: "Open standalone shadcn Calendar RTL example",
          }),
      ],
    ],
    () => shadcnAccordionExampleBlock(model, example)
  );

const shadcnExampleBlock = (model: Model, example: string): Html =>
  generatedExampleBlock(
    example,
    [
      [
        "shadcn-alert-dialog-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-shadcn-alert-dialog-basic",
            preview: DocsPreviewsAlert.shadcnAlertDialogBasicExamplePreview(
              model.shadcnAlertDialogBasicExample,
              "shadcn-alert-dialog-docs-basic-preview"
            ),
            href: "/docs/components/shadcn-alert-dialog/examples/basic",
            linkText: "Open standalone shadcn Alert Dialog Basic example",
          }),
      ],
      [
        "shadcn-alert-dialog-small",
        () =>
          docsExampleBlock({
            title: "Small",
            description: 'Uses the origin size="sm" content variant.',
            testId: "docs-example-block-shadcn-alert-dialog-small",
            preview: DocsPreviewsAlert.shadcnAlertDialogSmallExamplePreview(
              model.shadcnAlertDialogSmallExample,
              "shadcn-alert-dialog-docs-small-preview"
            ),
            href: "/docs/components/shadcn-alert-dialog/examples/small",
            linkText: "Open standalone shadcn Alert Dialog Small example",
          }),
      ],
      [
        "shadcn-alert-dialog-media",
        () =>
          docsExampleBlock({
            title: "Media",
            description:
              "Uses AlertDialogMedia to place an icon above the title and description.",
            testId: "docs-example-block-shadcn-alert-dialog-media",
            preview: DocsPreviewsAlert.shadcnAlertDialogMediaExamplePreview(
              model.shadcnAlertDialogMediaExample,
              "shadcn-alert-dialog-docs-media-preview"
            ),
            href: "/docs/components/shadcn-alert-dialog/examples/media",
            linkText: "Open standalone shadcn Alert Dialog Media example",
          }),
      ],
      [
        "shadcn-alert-dialog-small-media",
        () =>
          docsExampleBlock({
            title: "Small with Media",
            description:
              'Combines the origin size="sm" content variant with AlertDialogMedia.',
            testId: "docs-example-block-shadcn-alert-dialog-small-media",
            preview:
              DocsPreviewsAlert.shadcnAlertDialogSmallMediaExamplePreview(
                model.shadcnAlertDialogSmallMediaExample,
                "shadcn-alert-dialog-docs-small-media-preview"
              ),
            href: "/docs/components/shadcn-alert-dialog/examples/small-media",
            linkText:
              "Open standalone shadcn Alert Dialog Small with Media example",
          }),
      ],
      [
        "shadcn-alert-dialog-destructive",
        () =>
          docsExampleBlock({
            title: "Destructive",
            description:
              "Uses the destructive confirm action pattern from the origin page.",
            testId: "docs-example-block-shadcn-alert-dialog-destructive",
            preview:
              DocsPreviewsAlert.shadcnAlertDialogDestructiveExamplePreview(
                model.shadcnAlertDialogDestructiveExample,
                "shadcn-alert-dialog-docs-destructive-preview"
              ),
            href: "/docs/components/shadcn-alert-dialog/examples/destructive",
            linkText: "Open standalone shadcn Alert Dialog Destructive example",
          }),
      ],
      [
        "shadcn-alert-dialog-rtl",
        () =>
          docsExampleBlock({
            title: "RTL",
            description:
              "Wraps the origin dialog composition in an RTL region.",
            testId: "docs-example-block-shadcn-alert-dialog-rtl",
            preview: DocsPreviewsAlert.shadcnAlertDialogRtlExamplePreview(
              model.shadcnAlertDialogRtlExample,
              "shadcn-alert-dialog-docs-rtl-preview"
            ),
            href: "/docs/components/shadcn-alert-dialog/examples/rtl",
            linkText: "Open standalone shadcn Alert Dialog RTL example",
          }),
      ],
      [
        "shadcn-avatar-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-shadcn-avatar-basic",
            preview: DocsPreviewsAvatar.shadcnAvatarBasicExamplePreview(
              model.shadcnAvatarBasicExample,
              "shadcn-avatar-docs-basic-preview"
            ),
            href: "/docs/components/shadcn-avatar/examples/basic",
            linkText: "Open standalone shadcn Avatar Basic example",
          }),
      ],
      [
        "shadcn-avatar-badge",
        () =>
          docsExampleBlock({
            title: "Badge",
            testId: "docs-example-block-shadcn-avatar-badge",
            preview: DocsPreviewsAvatar.shadcnAvatarBadgeExamplePreview(),
            href: "/docs/components/shadcn-avatar/examples/badge",
            linkText: "Open standalone shadcn Avatar Badge example",
          }),
      ],
      [
        "shadcn-avatar-badge-icon",
        () =>
          docsExampleBlock({
            title: "Badge with Icon",
            testId: "docs-example-block-shadcn-avatar-badge-icon",
            preview: DocsPreviewsAvatar.shadcnAvatarBadgeIconExamplePreview(),
            href: "/docs/components/shadcn-avatar/examples/badge-icon",
            linkText: "Open standalone shadcn Avatar Badge with Icon example",
          }),
      ],
      [
        "shadcn-avatar-group",
        () =>
          docsExampleBlock({
            title: "Avatar Group",
            testId: "docs-example-block-shadcn-avatar-group",
            preview: DocsPreviewsAvatar.shadcnAvatarGroupExamplePreview(),
            href: "/docs/components/shadcn-avatar/examples/group",
            linkText: "Open standalone shadcn Avatar Group example",
          }),
      ],
      [
        "shadcn-avatar-group-count",
        () =>
          docsExampleBlock({
            title: "Avatar Group Count",
            testId: "docs-example-block-shadcn-avatar-group-count",
            preview: DocsPreviewsAvatar.shadcnAvatarGroupCountExamplePreview(),
            href: "/docs/components/shadcn-avatar/examples/group-count",
            linkText: "Open standalone shadcn Avatar Group Count example",
          }),
      ],
      [
        "shadcn-avatar-group-icon",
        () =>
          docsExampleBlock({
            title: "Avatar Group with Icon",
            testId: "docs-example-block-shadcn-avatar-group-icon",
            preview: DocsPreviewsAvatar.shadcnAvatarGroupIconExamplePreview(),
            href: "/docs/components/shadcn-avatar/examples/group-icon",
            linkText: "Open standalone shadcn Avatar Group with Icon example",
          }),
      ],
      [
        "shadcn-avatar-sizes",
        () =>
          docsExampleBlock({
            title: "Sizes",
            testId: "docs-example-block-shadcn-avatar-sizes",
            preview: DocsPreviewsAvatar.shadcnAvatarSizesExamplePreview(),
            href: "/docs/components/shadcn-avatar/examples/sizes",
            linkText: "Open standalone shadcn Avatar Sizes example",
          }),
      ],
      [
        "shadcn-avatar-dropdown",
        () =>
          docsExampleBlock({
            title: "Dropdown",
            testId: "docs-example-block-shadcn-avatar-dropdown",
            preview: DocsPreviewsAvatar.shadcnAvatarDropdownExamplePreview(
              model.shadcnAvatarDropdownExample,
              "shadcn-avatar-docs-dropdown-preview"
            ),
            href: "/docs/components/shadcn-avatar/examples/dropdown",
            linkText: "Open standalone shadcn Avatar Dropdown example",
          }),
      ],
      [
        "empty-avatar",
        () =>
          docsExampleBlock({
            title: "Avatar",
            testId: "docs-example-block-empty-avatar",
            preview: DocsPreviewsEI.emptyAvatarExamplePreview(
              model.emptyAvatarExample,
              "empty-shadcn-docs-avatar-preview"
            ),
            href: "/docs/components/empty/examples/avatar",
            linkText: "Open standalone Empty Avatar example",
          }),
      ],
      [
        "empty-avatar-group",
        () =>
          docsExampleBlock({
            title: "Avatar Group",
            testId: "docs-example-block-empty-avatar-group",
            preview: DocsPreviewsEI.emptyAvatarGroupExamplePreview(
              model.emptyAvatarGroupExample,
              "empty-shadcn-docs-avatar-group-preview"
            ),
            href: "/docs/components/empty/examples/avatar-group",
            linkText: "Open standalone Empty Avatar Group example",
          }),
      ],
      [
        "shadcn-button-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-shadcn-button-basic",
            preview: DocsPreviewsB.shadcnButtonBasicExamplePreview(
              model.shadcnButtonBasicExample,
              "shadcn-button-docs-basic-preview"
            ),
            href: "/docs/components/shadcn-button/examples/basic",
            linkText: "Open standalone shadcn Button Basic example",
          }),
      ],
      [
        "shadcn-radio-group-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-shadcn-radio-group-basic",
            preview: DocsPreviewsNZ.shadcnRadioGroupBasicExamplePreview(
              model.shadcnRadioGroupBasicExample,
              "shadcn-radio-group-docs-basic-preview"
            ),
            href: "/docs/components/shadcn-radio-group/examples/basic",
            linkText: "Open standalone shadcn Radio Group Basic example",
          }),
      ],
      [
        "shadcn-radio-group-description",
        () =>
          docsExampleBlock({
            title: "Description",
            testId: "docs-example-block-shadcn-radio-group-description",
            preview:
              DocsPreviewsShadcnMissing.shadcnRadioGroupDescriptionExamplePreview(),
            href: "/docs/components/shadcn-radio-group/examples/description",
            linkText: "Open standalone shadcn Radio Group Description example",
          }),
      ],
      [
        "shadcn-radio-group-choice-card",
        () =>
          docsExampleBlock({
            title: "Choice Card",
            testId: "docs-example-block-shadcn-radio-group-choice-card",
            preview:
              DocsPreviewsShadcnMissing.shadcnRadioGroupChoiceCardExamplePreview(),
            href: "/docs/components/shadcn-radio-group/examples/choice-card",
            linkText: "Open standalone shadcn Radio Group Choice Card example",
          }),
      ],
      [
        "shadcn-radio-group-fieldset",
        () =>
          docsExampleBlock({
            title: "Fieldset",
            testId: "docs-example-block-shadcn-radio-group-fieldset",
            preview:
              DocsPreviewsShadcnMissing.shadcnRadioGroupFieldsetExamplePreview(),
            href: "/docs/components/shadcn-radio-group/examples/fieldset",
            linkText: "Open standalone shadcn Radio Group Fieldset example",
          }),
      ],
      [
        "shadcn-radio-group-disabled",
        () =>
          docsExampleBlock({
            title: "Disabled",
            testId: "docs-example-block-shadcn-radio-group-disabled",
            preview:
              DocsPreviewsShadcnMissing.shadcnRadioGroupDisabledExamplePreview(),
            href: "/docs/components/shadcn-radio-group/examples/disabled",
            linkText: "Open standalone shadcn Radio Group Disabled example",
          }),
      ],
      [
        "shadcn-radio-group-invalid",
        () =>
          docsExampleBlock({
            title: "Invalid",
            testId: "docs-example-block-shadcn-radio-group-invalid",
            preview:
              DocsPreviewsShadcnMissing.shadcnRadioGroupInvalidExamplePreview(),
            href: "/docs/components/shadcn-radio-group/examples/invalid",
            linkText: "Open standalone shadcn Radio Group Invalid example",
          }),
      ],
      [
        "shadcn-radio-group-rtl",
        () =>
          docsExampleBlock({
            title: "RTL",
            testId: "docs-example-block-shadcn-radio-group-rtl",
            preview:
              DocsPreviewsShadcnMissing.shadcnRadioGroupRtlExamplePreview(),
            href: "/docs/components/shadcn-radio-group/examples/rtl",
            linkText: "Open standalone shadcn Radio Group RTL example",
          }),
      ],
      [
        "shadcn-select-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-shadcn-select-basic",
            preview: DocsPreviewsNZ.shadcnSelectBasicExamplePreview(
              model.shadcnSelectBasicExample,
              "shadcn-select-docs-basic-preview"
            ),
            href: "/docs/components/shadcn-select/examples/basic",
            linkText: "Open standalone shadcn Select Basic example",
          }),
      ],
      [
        "shadcn-slider-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-shadcn-slider-basic",
            preview: DocsPreviewsNZ.shadcnSliderBasicExamplePreview(
              model.shadcnSliderBasicExample,
              "shadcn-slider-docs-basic-preview"
            ),
            href: "/docs/components/shadcn-slider/examples/basic",
            linkText: "Open standalone shadcn Slider Basic example",
          }),
      ],
      [
        "shadcn-switch-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-shadcn-switch-basic",
            preview: DocsPreviewsNZ.shadcnSwitchBasicExamplePreview(
              model.shadcnSwitchBasicExample,
              "shadcn-switch-docs-basic-preview"
            ),
            href: "/docs/components/shadcn-switch/examples/basic",
            linkText: "Open standalone shadcn Switch Basic example",
          }),
      ],
      [
        "shadcn-tabs-basic",
        () =>
          docsExampleBlock({
            title: "Basic",
            testId: "docs-example-block-shadcn-tabs-basic",
            preview: DocsPreviewsNZ.shadcnTabsBasicExamplePreview(
              model.shadcnTabsBasicExample,
              "shadcn-tabs-docs-basic-preview"
            ),
            href: "/docs/components/shadcn-tabs/examples/basic",
            linkText: "Open standalone shadcn Tabs Basic example",
          }),
      ],
    ],
    () => shadcnCalendarExampleBlock(model, example)
  );

const shadcnLaneDocsView = (
  model: Model,
  config: ShadcnLaneDocsConfig
): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], [config.label]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [config.description]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: config.source },
        {
          label: "Examples",
          value:
            config.examples === undefined
              ? "reuses Foldkit examples"
              : config.examples.join(", "),
        },
        { label: "Proof", value: "wrapper tests, registry JSON" },
      ]),
      docsOverviewBlock(
        `${config.label} documents the shadcn style lane for ${config.primitive}: Foldkit owns the behavior, while the installable slice exposes opinionated shadcn naming and class hooks.`
      ),
      ...(config.examples === undefined
        ? []
        : [
            h.section(
              [h.Class("space-y-4")],
              [
                h.h2(
                  [h.Class("text-xl font-semibold text-gray-950")],
                  ["Examples"]
                ),
                h.div(
                  [h.Class("grid gap-4 lg:grid-cols-2")],
                  config.examples.map((example) =>
                    shadcnExampleBlock(model, example)
                  )
                ),
              ]
            ),
          ]),
      ...docsStandardComponentSections({
        installCommands: `bunx shadcn@latest add <registry-url>/${config.source.replace(
          "registry/default/ui/",
          ""
        )}.json`,
        usageBody: config.usage,
        usageCode: `import * as ${config.label.replaceAll(
          " ",
          ""
        )} from "./ui/${config.source.replace("registry/default/ui/", "")}";`,
        integrationCode: `// Parent model and messages stay the same as the Foldkit ${config.primitive} slice.\n// Use this shadcn lane package when you want the same behavior with opinionated shadcn styling hooks.`,
        anatomySection: docsAnatomyBlock(config.anatomyCode),
        stylingItems: config.classHelpers,
        stylingCode: config.classHelpers.join("\n"),
        includeKeyboardInteraction: true,
        apiItems: [
          `${config.primitive} exports: re-exported from the Foldkit functional slice.`,
          "shadcn class helpers: stable names for the opinionated styled lane.",
        ],
        accessibilityItems: [
          `Accessibility behavior comes from the underlying Foldkit ${config.primitive} implementation.`,
          "Consumers keep the primitive attribute groups intact when customizing markup.",
          "Disabled, labelled, described, focus, and keyboard behavior follow the matching Foldkit component contract.",
        ],
        coverageItems: [
          "Registry wrapper tests verify exported class helpers and functional re-exports.",
          ...(config.examples === undefined
            ? []
            : [
                `Wrapper-specific installable examples: ${config.examples.join(
                  ", "
                )}.`,
              ]),
          "Generated registry JSON includes the shadcn origin metadata and dependency link to the Foldkit component.",
          "Install smoke verifies the wrapper and its registry dependency install together.",
        ],
      }),
    ]
  );
};

const calendarDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Calendar"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A styled, installable Foldkit Calendar slice built on the official Foldkit Ui.Calendar primitive. It preserves date selection, view-month OutMessages, disabled date attributes, and reusable day, month, and year mode view classes.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/calendar" },
        { label: "Examples", value: "basic, bounds" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Calendar v1 documents the date-selection path: child-owned calendar state, parent-visible selected-date facts, month navigation feedback, bounded dates, and disabled date styling."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-calendar-basic",
                preview: DocsPreviewsCD.calendarBasicExamplePreview(
                  model.calendarBasicExample,
                  "calendar-docs-basic-preview"
                ),
                href: "/docs/components/calendar/examples/basic",
                linkText: "Open standalone Calendar Basic example",
              }),
              docsExampleBlock({
                title: "Bounds",
                testId: "docs-example-block-calendar-bounds",
                preview: DocsPreviewsCD.calendarBoundsExamplePreview(
                  model.calendarBoundsExample,
                  "calendar-docs-bounds-preview"
                ),
                href: "/docs/components/calendar/examples/bounds",
                linkText: "Open standalone Calendar Bounds example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/calendar.json\nbunx shadcn@latest add <registry-url>/calendar-basic.json\nbunx shadcn@latest add <registry-url>/calendar-bounds.json",
        usageBody:
          "Initialize the Calendar child model, delegate child messages through `h.submodel`, and handle SelectedDate or ChangedViewMonth in the parent update.",
        usageCode: `import * as Calendar from "./ui/calendar";

const calendar = Calendar.init({
  id: "booking-calendar",
  today,
  initialSelectedDate: today,
});`,
        integrationCode: `// Model
calendar: Calendar.Model;
selectedDate: CalendarDate;

// Message
Main.GotCalendarMessage({ message: Calendar.Message });

// Update
const [calendar, commands, maybeOutMessage] =
  Calendar.update(model.calendar, message);

// View
h.submodel({
  slotId: model.calendar.id,
  model: model.calendar,
  view: Calendar.view,
  viewInputs: { toView: Calendar.calendarView },
  toParentMessage: (message) => Main.GotCalendarMessage({ message }),
});`,
        anatomySection: docsAnatomyBlock(
          `h.submodel({
  slotId: model.calendar.id,
  model: model.calendar,
  view: Calendar.view,
  viewInputs: { toView: Calendar.calendarView },
  toParentMessage: (message) => Main.GotCalendarMessage({ message }),
});`
        ),
        apiItems: [
          "Model: schema-backed calendar state with current view mode, focused date, selected date, and constraints.",
          "init(config): creates a Calendar model with today, optional selected date, locale, min/max dates, and disabled dates.",
          "update(model, message): returns model, commands, and an optional OutMessage.",
          "SelectedDate and ChangedViewMonth: parent-visible calendar facts.",
          "selectDate and reflectSelectedDate: helpers for parent-driven selection changes.",
          "ViewInputs and CalendarAttributes: mode-specific attributes for custom day, month, and year rendering.",
          "Class helpers: container, header, nav, grid, day cell, and month/year cell classes.",
        ],
        accessibilityItems: [
          "The primitive provides full-date accessible names for day buttons.",
          "Disabled dates expose aria-disabled for assistive technology and styling.",
          "Heading buttons expose view-switch labels for days, months, and years modes.",
          "FocusGrid commands keep keyboard focus behavior in the child command lifecycle.",
        ],
        coverageItems: [
          "Registry scene tests verify selectable dates, disabled date attributes, and mode switching with FocusGrid resolution.",
          "Example scene tests verify parent-visible selected date, viewed month, and bounded-date feedback.",
          "Docs scene tests verify the shared component page section contract and example block layout.",
        ],
      }),
    ]
  );
};

const datePickerDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Date Picker"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A styled, installable Foldkit DatePicker slice built on the official Foldkit Ui.DatePicker primitive. It composes a trigger, popover, embedded Calendar, selected-date OutMessages, hidden input support, and reusable view classes.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/date-picker" },
        { label: "Examples", value: "basic, bounds" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "DatePicker v1 documents the popover-backed date-selection path: trigger labeling, child-owned open state, mounted popover positioning, parent-visible selected-date facts, bounded dates, and disabled date styling."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-date-picker-basic",
                preview: DocsPreviewsCD.datePickerBasicExamplePreview(
                  model.datePickerBasicExample,
                  "date-picker-docs-basic-preview"
                ),
                href: "/docs/components/date-picker/examples/basic",
                linkText: "Open standalone Date Picker Basic example",
              }),
              docsExampleBlock({
                title: "Bounds",
                testId: "docs-example-block-date-picker-bounds",
                preview: DocsPreviewsCD.datePickerBoundsExamplePreview(
                  model.datePickerBoundsExample,
                  "date-picker-docs-bounds-preview"
                ),
                href: "/docs/components/date-picker/examples/bounds",
                linkText: "Open standalone Date Picker Bounds example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/date-picker.json\nbunx shadcn@latest add <registry-url>/date-picker-basic.json\nbunx shadcn@latest add <registry-url>/date-picker-bounds.json",
        usageBody:
          "Initialize the DatePicker child model, delegate child messages through `h.submodel`, and handle SelectedDate or ChangedViewMonth in the parent update.",
        usageCode: `import * as DatePicker from "./ui/date-picker";

const datePicker = DatePicker.init({
  id: "appointment-date",
  today,
});`,
        integrationCode: `// Model
datePicker: DatePicker.Model;
selectedDate: Option.Option<CalendarDate>;

// Message
Main.GotDatePickerMessage({ message: DatePicker.Message });

// Update
const [datePicker, commands, maybeOutMessage] =
  DatePicker.update(model.datePicker, message);

// View
h.submodel({
  slotId: model.datePicker.id,
  model: model.datePicker,
  view: DatePicker.view,
  viewInputs: DatePicker.datePickerViewInputs({
    name: "appointment-date",
  }),
  toParentMessage: (message) => Main.GotDatePickerMessage({ message }),
});`,
        anatomySection: docsAnatomyBlock(
          `h.submodel({
  slotId: model.datePicker.id,
  model: model.datePicker,
  view: DatePicker.view,
  viewInputs: DatePicker.datePickerViewInputs({
    name: "appointment-date",
  }),
  toParentMessage: (message) => Main.GotDatePickerMessage({ message }),
});`
        ),
        apiItems: [
          "Model: schema-backed DatePicker state with selected date, embedded Calendar state, and embedded Popover state.",
          "init(config): creates a DatePicker model with today, optional selected date, animation, locale, min/max dates, and disabled dates.",
          "update(model, message): returns model, commands, and an optional OutMessage.",
          "SelectedDate and ChangedViewMonth: parent-visible picker facts.",
          "open, close, selectDate, clear, and reflectSelectedDate: helpers for parent-driven picker changes.",
          "datePickerViewInputs(overrides): standard trigger, panel, anchor, and embedded calendar rendering inputs.",
          "Class helpers: wrapper, trigger, trigger content, placeholder, panel, backdrop, and formatDate.",
        ],
        accessibilityItems: [
          "The helper provides a stable trigger aria-label for screen readers and tests.",
          "The popover mount focuses the embedded calendar grid after opening.",
          "Disabled dates expose aria-disabled through the embedded Calendar.",
          "When name is provided, the primitive renders a hidden input for native form submission.",
        ],
        coverageItems: [
          "Registry scene tests verify opening, popover mount resolution, disabled date attributes, selected-date OutMessages, close focus, and mount cleanup.",
          "Example scene tests verify parent-visible selected date and bounded-date feedback.",
          "Docs scene tests verify the shared component page section contract and example block layout.",
        ],
      }),
    ]
  );
};

const disclosureDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Disclosure"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A styled, installable Foldkit Disclosure slice built on the official Foldkit Ui.Disclosure primitive. It preserves accessible toggle semantics, parent-visible open-state facts, focus restoration on close, disabled state, and reusable view classes.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/disclosure" },
        { label: "Examples", value: "basic, disabled" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Disclosure v1 documents the collapsible content path: child-owned open state, parent-visible ToggledOpenState facts, disabled trigger semantics, and focus restoration after close."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-disclosure-basic",
                preview: DocsPreviewsCD.disclosureBasicExamplePreview(
                  model.disclosureBasicExample,
                  "disclosure-docs-basic-preview"
                ),
                href: "/docs/components/disclosure/examples/basic",
                linkText: "Open standalone Disclosure Basic example",
              }),
              docsExampleBlock({
                title: "Disabled",
                testId: "docs-example-block-disclosure-disabled",
                preview: DocsPreviewsCD.disclosureDisabledExamplePreview(
                  model.disclosureDisabledExample,
                  "disclosure-docs-disabled-preview"
                ),
                href: "/docs/components/disclosure/examples/disabled",
                linkText: "Open standalone Disclosure Disabled example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/disclosure.json\nbunx shadcn@latest add <registry-url>/disclosure-basic.json\nbunx shadcn@latest add <registry-url>/disclosure-disabled.json",
        usageBody:
          "Initialize the Disclosure child model, delegate child messages through `h.submodel`, and handle ToggledOpenState in the parent update.",
        usageCode: `import * as Disclosure from "./ui/disclosure";

const [disclosure] = Disclosure.init({
  id: "faq-disclosure",
});`,
        integrationCode: `// Model
disclosure: Disclosure.Model;

// Message
Main.GotDisclosureMessage({ message: Disclosure.Message });

// Update
const [disclosure, commands, maybeOutMessage] =
  Disclosure.update(model.disclosure, message);

// View
h.submodel({
  slotId: model.disclosure.id,
  model: model.disclosure,
  view: Disclosure.view,
  viewInputs: {
    toView: (attributes) =>
      Disclosure.disclosureView({
        attributes,
        isOpen: model.disclosure.isOpen,
        title: "Question",
        body: "Answer",
      }),
  },
  toParentMessage: (message) => Main.GotDisclosureMessage({ message }),
});`,
        anatomySection: docsAnatomyBlock(
          `h.submodel({
  slotId: model.disclosure.id,
  model: model.disclosure,
  view: Disclosure.view,
  viewInputs: {
    toView: (attributes) =>
      Disclosure.disclosureView({
        attributes,
        isOpen: model.disclosure.isOpen,
        title: "Question",
        body: "Answer",
      }),
  },
  toParentMessage: (message) => Main.GotDisclosureMessage({ message }),
});`
        ),
        apiItems: [
          "Model: schema-backed state containing id and isOpen.",
          "init(config): creates a Disclosure model and returns the registry init tuple.",
          "update(model, message): returns model, commands, and an optional OutMessage.",
          "ToggledOpenState: parent-visible open-state fact emitted after toggles and close.",
          "toggle, close, and reflectOpenState: helpers for parent-driven disclosure changes.",
          "ViewInputs and DisclosureAttributes: button and panel attribute bundles for custom composition.",
          "Class helpers: root, button, button content, chevron, panel, and disclosureView.",
        ],
        accessibilityItems: [
          "The primitive supplies aria-expanded and aria-controls on the trigger button.",
          "The helper adds an aria-label matching the visible title for stable accessible names.",
          "Disabled state exposes aria-disabled and prevents click dispatch.",
          "Closing emits a FocusButton command so focus returns to the disclosure trigger.",
        ],
        coverageItems: [
          "Registry scene tests verify open/close behavior, parent-visible OutMessages, panel rendering, and FocusButton resolution.",
          "Example scene tests verify basic toggling, disabled trigger semantics, and parent-visible status feedback.",
          "Docs scene tests verify the shared component page section contract and example block layout.",
        ],
      }),
    ]
  );
};

const dragAndDropDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Drag and Drop"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A styled, installable Foldkit DragAndDrop slice built on the official Foldkit Ui.DragAndDrop primitive. It preserves schema-backed drag state, keyboard reorder messages, parent-visible reorder facts, and reusable sortable list classes.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/drag-and-drop" },
        { label: "Examples", value: "basic, disabled" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "DragAndDrop v1 documents sortable list behavior: parent-owned item order, child-owned drag state, deterministic keyboard reorder commands, and read-only presentation for locked lists."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-drag-and-drop-basic",
                preview: DocsPreviewsCD.dragAndDropBasicExamplePreview(
                  model.dragAndDropBasicExample,
                  "drag-and-drop-docs-basic-preview"
                ),
                href: "/docs/components/drag-and-drop/examples/basic",
                linkText: "Open standalone Drag and Drop Basic example",
              }),
              docsExampleBlock({
                title: "Disabled",
                testId: "docs-example-block-drag-and-drop-disabled",
                preview: DocsPreviewsCD.dragAndDropDisabledExamplePreview(
                  model.dragAndDropDisabledExample,
                  "drag-and-drop-docs-disabled-preview"
                ),
                href: "/docs/components/drag-and-drop/examples/disabled",
                linkText: "Open standalone Drag and Drop Disabled example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/drag-and-drop.json\nbunx shadcn@latest add <registry-url>/drag-and-drop-basic.json\nbunx shadcn@latest add <registry-url>/drag-and-drop-disabled.json",
        usageBody:
          "Initialize the DragAndDrop child model, delegate child messages through the sortable list helper, and apply Reordered OutMessages in the parent update.",
        usageCode: `import * as DragAndDrop from "./ui/drag-and-drop";

const [dragAndDrop] = DragAndDrop.init({
  id: "task-order",
  orientation: "Vertical",
});`,
        integrationCode: `// Model
dragAndDrop: DragAndDrop.Model;

// Message
Main.GotDragAndDropMessage({ message: DragAndDrop.Message });

// Update
const [dragAndDrop, commands, maybeOutMessage] =
  DragAndDrop.update(model.dragAndDrop, message);

// View
DragAndDrop.sortableListView({
  model: model.dragAndDrop,
  containerId: "tasks",
  items: model.tasks,
  label: "Task order",
  status: model.status,
  toParentMessage: (message) =>
    Main.GotDragAndDropMessage({ message }),
});`,
        anatomySection: docsAnatomyBlock(
          `DragAndDrop.view<Message, Task>({
  model: model.dragAndDrop,
  containerId: "tasks",
  items: model.tasks,
  label: "Task order",
  status: model.status,
  toParentMessage: (message) =>
    Main.GotDragAndDropMessage({ message }),
});`
        ),
        apiItems: [
          "Model: schema-backed state containing id, orientation, activation threshold, and drag state.",
          "init(config): creates a DragAndDrop model and returns the registry init tuple.",
          "update(model, message): returns model, commands, and an optional OutMessage.",
          "Reordered: parent-visible fact containing item id, source container/index, and target container/index.",
          "FocusItem and ResolveKeyboardMove: commands used after keyboard drag confirmation and arrow-key movement.",
          "draggable, droppable, sortable, ghostStyle, isDragging, maybeDraggedItemId, and maybeDropTarget: primitive helpers re-exported from Foldkit.",
          "Class helpers and sortableListView: reusable list composition for installable examples.",
        ],
        accessibilityItems: [
          "The primitive supplies keyboard activation and arrow-key movement messages for sortable items.",
          "Droppable containers include role and label attributes from the Foldkit helper.",
          "Sortable items are focusable through the primitive draggable attributes.",
          "The disabled example uses aria-disabled on read-only rows and avoids binding drag messages.",
        ],
        coverageItems: [
          "Registry scene tests verify sortable rendering, keyboard reorder update flow, ResolveKeyboardMove command emission, and FocusItem command emission.",
          "Example scene tests verify the installable basic reorder flow and locked-list rendering.",
          "Docs scene tests verify the shared component page section contract and example block layout.",
        ],
      }),
    ]
  );
};

const fieldsetDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Fieldset"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A styled, installable Foldkit Fieldset slice built on the official Foldkit Ui.Fieldset primitive. It groups related form controls with accessible legend, description, disabled state, and reusable layout classes.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/fieldset" },
        { label: "Examples", value: "basic, disabled" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Fieldset v1 documents the stateless grouped-form path: consumers render native controls inside the primitive-provided fieldset, legend, and description attributes while the wrapper centralizes styling and IDs."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-fieldset-basic",
                preview: DocsPreviewsEI.fieldsetBasicExamplePreview(
                  model.fieldsetBasicExample,
                  "fieldset-docs-basic-preview"
                ),
                href: "/docs/components/fieldset/examples/basic",
                linkText: "Open standalone Fieldset Basic example",
              }),
              docsExampleBlock({
                title: "Disabled",
                testId: "docs-example-block-fieldset-disabled",
                preview: DocsPreviewsEI.fieldsetDisabledExamplePreview(
                  model.fieldsetDisabledExample,
                  "fieldset-docs-disabled-preview"
                ),
                href: "/docs/components/fieldset/examples/disabled",
                linkText: "Open standalone Fieldset Disabled example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/fieldset.json\nbunx shadcn@latest add <registry-url>/fieldset-basic.json\nbunx shadcn@latest add <registry-url>/fieldset-disabled.json",
        usageBody:
          "Render Fieldset.view with a stable id, then spread the supplied fieldset, legend, and description attributes onto native elements.",
        usageCode: `import * as Fieldset from "./ui/fieldset";

Fieldset.view<Message>({
  id: "profile-fieldset",
  toView: (attributes) =>
    h.fieldset(attributes.fieldset, [
      h.legend(attributes.legend, ["Profile"]),
      h.p(attributes.description, ["Public profile details."]),
      children,
    ]),
});`,
        integrationCode: `// Message
UpdatedName({ value: S.String });

// Update
UpdatedName: ({ value }) => [
  evo(model, { name: () => value }),
  [],
];

// View
Fieldset.view<Message>({
  id: "profile-fieldset",
  isDisabled: model.isArchived,
  toView,
});`,
        anatomySection: docsAnatomyBlock(
          `Fieldset.view<Message>({
  id: "profile-fieldset",
  isDisabled: model.isArchived,
  toView: (attributes, children) =>
    h.fieldset(attributes.fieldset, [
      h.legend(attributes.legend, ["Profile"]),
      h.p(attributes.description, ["Public profile details."]),
      children,
    ]),
});`
        ),
        apiItems: [
          "view(config): renders an accessible fieldset through the supplied toView callback.",
          "legendId(id): returns the generated legend id for custom composition.",
          "descriptionId(id): returns the generated description id for custom composition.",
          "FieldsetAttributes: grouped fieldset, legend, and description attributes.",
          "ViewConfig: id, toView, and optional isDisabled.",
          "Class helpers: fieldset, legend, description, fields, field, label, input, and textarea classes.",
        ],
        accessibilityItems: [
          "The primitive binds fieldset aria-labelledby to the legend attributes.",
          "The primitive binds fieldset aria-describedby to the description attributes.",
          "Disabled state is applied to the native fieldset so grouped controls inherit disabled behavior.",
        ],
        coverageItems: [
          "Registry scene tests verify grouped label/description wiring and disabled fieldset behavior.",
          "Example scene tests verify parent-owned field feedback and disabled grouped fields.",
          "Docs scene tests verify the shared component page section contract and example block layout.",
        ],
      }),
    ]
  );
};

const fileDropDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["File Drop"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A styled, installable Foldkit FileDrop slice built on the official Foldkit Ui.FileDrop primitive. It preserves drag-over state, file input selection, dropped-file OutMessages, rejected non-file drops, and reusable drop-zone classes.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/file-drop" },
        { label: "Examples", value: "basic, disabled" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "FileDrop v1 documents the upload-intake path: child-owned drag state, parent-visible received-file facts, optional multiple selection, optional accept filters, and disabled drop/input behavior."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-file-drop-basic",
                preview: DocsPreviewsEI.fileDropBasicExamplePreview(
                  model.fileDropBasicExample,
                  "file-drop-docs-basic-preview"
                ),
                href: "/docs/components/file-drop/examples/basic",
                linkText: "Open standalone File Drop Basic example",
              }),
              docsExampleBlock({
                title: "Disabled",
                testId: "docs-example-block-file-drop-disabled",
                preview: DocsPreviewsEI.fileDropDisabledExamplePreview(
                  model.fileDropDisabledExample,
                  "file-drop-docs-disabled-preview"
                ),
                href: "/docs/components/file-drop/examples/disabled",
                linkText: "Open standalone File Drop Disabled example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/file-drop.json\nbunx shadcn@latest add <registry-url>/file-drop-basic.json\nbunx shadcn@latest add <registry-url>/file-drop-disabled.json",
        usageBody:
          "Initialize the FileDrop child model, delegate child messages through `h.submodel`, and handle ReceivedFiles or RejectedNonFiles in the parent update.",
        usageCode: `import * as FileDrop from "./ui/file-drop";

const [fileDrop] = FileDrop.init({ id: "documents-file-drop" });`,
        integrationCode: `// Model
fileDrop: FileDrop.Model;
files: S.Array(File.File);

// Message
Main.GotFileDropMessage({ message: FileDrop.Message });

// Update
const [fileDrop, commands, maybeOutMessage] =
  FileDrop.update(model.fileDrop, message);

// View
h.submodel({
  slotId: model.fileDrop.id,
  model: model.fileDrop,
  view: FileDrop.view,
  viewInputs,
  toParentMessage: (message) => Main.GotFileDropMessage({ message }),
});`,
        anatomySection: docsAnatomyBlock(
          `h.submodel({
  slotId: model.fileDrop.id,
  model: model.fileDrop,
  view: FileDrop.view,
  viewInputs: {
    toView: (attributes) =>
      h.label(attributes.root, [
        h.input(attributes.input),
        h.span(attributes.label, ["Upload files"]),
      ]),
  },
  toParentMessage: (message) => Main.GotFileDropMessage({ message }),
});`
        ),
        apiItems: [
          "Model: schema-backed state containing id and isDragOver.",
          "init(config): creates a FileDrop model.",
          "update(model, message): returns model, commands, and an optional OutMessage.",
          "view: h.submodel view that exposes root and input attribute groups.",
          "ReceivedFiles and RejectedNonFiles: parent-visible upload facts.",
          "ViewInputs: toView, accept, multiple, and isDisabled.",
          "Class helpers: drop zone, primary text, secondary text, file list, file row, file name, file size, and formatFileSize.",
        ],
        accessibilityItems: [
          "The drop zone is composed as a label wrapping a hidden file input.",
          "The file input should receive a clear accessible label for keyboard and test access.",
          "Disabled state is applied through primitive attributes to prevent file input interaction.",
          "Drag-over state is exposed through data attributes for visual feedback.",
        ],
        coverageItems: [
          "Registry scene tests verify dropped files, input-selected files, file metadata rendering, and disabled state.",
          "Example scene tests verify parent-visible file list feedback, removal, and disabled upload input.",
          "Docs scene tests verify the shared component page section contract and example block layout.",
        ],
      }),
    ]
  );
};

const inputDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Input"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A styled, installable Foldkit Input slice built on the official Foldkit Ui.Input primitive. It keeps native text input semantics while centralizing labels, descriptions, placeholders, typed input messages, disabled state, invalid state, and reusable field classes.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/input" },
        { label: "Examples", value: "basic, disabled" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Input v1 documents the stateless text-entry path: parent-owned value, typed input messages, accessible label and description helpers, and disabled state styling."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-input-basic",
                preview: DocsPreviewsEI.inputBasicExamplePreview(
                  model.inputBasicExample,
                  "input-docs-basic-preview"
                ),
                href: "/docs/components/input/examples/basic",
                linkText: "Open standalone Input Basic example",
              }),
              docsExampleBlock({
                title: "Disabled",
                testId: "docs-example-block-input-disabled",
                preview: DocsPreviewsEI.inputDisabledExamplePreview(
                  model.inputDisabledExample,
                  "input-docs-disabled-preview"
                ),
                href: "/docs/components/input/examples/disabled",
                linkText: "Open standalone Input Disabled example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/input.json\nbunx shadcn@latest add <registry-url>/input-basic.json\nbunx shadcn@latest add <registry-url>/input-disabled.json",
        usageBody:
          "Store the input value in the parent model, map `onInput` into a verb-first Foldkit message, and render a native input with the supplied attributes.",
        usageCode: `import * as Input from "./ui/input";

Input.view<Message>({
  id: "name-input",
  value: model.name,
  onInput: (value) => UpdatedName({ value }),
  toView: (attributes) => h.input(attributes.input),
});`,
        integrationCode: `// Model
name: S.String;

// Message
UpdatedName({ value: S.String });

// Update
UpdatedName: ({ value }) => [
  evo(model, { name: () => value }),
  [],
];`,
        anatomySection: docsAnatomyBlock(
          `Input.view<Message>({
  id: "name-input",
  value: model.name,
  onInput: (value) => UpdatedName({ value }),
  toView: (attributes) =>
    h.div(attributes.root, [
      h.label(attributes.label, ["Name"]),
      h.input(attributes.input),
      h.p(attributes.description, ["Enter your full name."]),
    ]),
});`
        ),
        apiItems: [
          "view(config): renders a native input through the supplied toView callback.",
          "descriptionId(id): returns the generated description id for custom composition.",
          "InputAttributes: grouped input, label, and description attributes.",
          "ViewConfig: id, value, onInput, isDisabled, isInvalid, isAutofocus, name, type, and placeholder.",
        ],
        accessibilityItems: [
          "The label attributes bind the input to a visible label.",
          "The description attributes provide aria-describedby for explanatory copy.",
          "Disabled and invalid states stay on the native control so browser semantics are preserved.",
        ],
        coverageItems: [
          "Registry scene tests verify label, description, placeholder, input messages, and disabled state.",
          "Example scene tests verify parent-owned value feedback and disabled documentation copy.",
          "Docs scene tests verify the shared component page section contract and example block layout.",
        ],
      }),
    ]
  );
};

const tabsDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Tabs"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A styled, installable Foldkit Tabs slice built on the official Foldkit Ui.Tabs primitive. It preserves typed values, automatic and manual activation, disabled tabs, focus commands, Selected OutMessages, and reusable view classes.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/tabs" },
        { label: "Examples", value: "basic, vertical" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Tabs v1 documents tabbed content with child-owned active and focused indices, parent-visible Selected facts, automatic activation, manual activation, disabled tab semantics, and focus command resolution."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-tabs-basic",
                preview: DocsPreviewsNZ.tabsBasicExamplePreview(
                  model.tabsBasicExample,
                  "tabs-docs-basic-preview"
                ),
                href: "/docs/components/tabs/examples/basic",
                linkText: "Open standalone Tabs Basic example",
              }),
              docsExampleBlock({
                title: "Vertical",
                testId: "docs-example-block-tabs-manual",
                preview: DocsPreviewsNZ.tabsManualExamplePreview(
                  model.tabsManualExample,
                  "tabs-docs-manual-preview"
                ),
                href: "/docs/components/tabs/examples/manual",
                linkText: "Open standalone Tabs Manual example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/tabs.json\nbunx shadcn@latest add <registry-url>/tabs-basic.json\nbunx shadcn@latest add <registry-url>/tabs-manual.json",
        usageBody:
          "Create a typed Tabs entry point, initialize the child model, delegate messages through `h.submodel`, and handle Selected in the parent update.",
        usageCode: `import * as Tabs from "./ui/tabs";

type Tab = "Overview" | "Usage";
const DemoTabs = Tabs.create<Tab>();

const [tabs] = Tabs.initialize({
  id: "docs-tabs",
});`,
        integrationCode: `// Model
tabs: Tabs.Model;

// Message
Main.GotTabsMessage({ message: Tabs.Message });

// Update
const [tabs, commands, maybeOutMessage] =
  DemoTabs.update(model.tabs, message);

// View
h.submodel({
  slotId: model.tabs.id,
  model: model.tabs,
  view: DemoTabs.view,
  viewInputs: {
    tabs: ["Overview", "Usage"],
    ariaLabel: "Documentation sections",
    toView: (render) => Tabs.tabsView({ render, panelContent }),
  },
  toParentMessage: (message) => Main.GotTabsMessage({ message }),
});`,
        anatomySection: docsAnatomyBlock(
          `h.submodel({
  slotId: model.tabs.id,
  model: model.tabs,
  view: Tabs.view,
  viewInputs: {
    tabs: ["Overview", "Usage"],
    ariaLabel: "Documentation sections",
    toView: (render) => Tabs.tabsView({ render, panelContent }),
  },
  toParentMessage: (message) => Main.GotTabsMessage({ message }),
});`
        ),
        apiItems: [
          "Model: schema-backed state containing id, activeIndex, focusedIndex, and activationMode.",
          "create<Value>(): typed view/update/select entry point for string-literal tab values.",
          "initialize(config): creates a Tabs model and returns the registry init tuple.",
          "update(model, message): returns model, commands, and an optional Selected OutMessage.",
          "FocusTab: command emitted when selection or focus should move to a tab button.",
          "reflectSelectedTab and selectTab: helpers for external or programmatic selection flows.",
          "ViewInputs and RenderInfo: tablist attributes plus per-tab tab and panel bundles.",
        ],
        accessibilityItems: [
          "The primitive supplies tablist, tab, tabpanel, aria-selected, aria-controls, and aria-labelledby attributes.",
          "Keyboard navigation follows orientation and activation mode.",
          "Disabled tabs expose disabled and aria-disabled and are skipped by keyboard navigation.",
          "FocusTab commands keep DOM focus aligned with the model after selection and manual focus movement.",
        ],
        coverageItems: [
          "Registry scene tests verify selection, Selected OutMessage feedback, and FocusTab resolution.",
          "Example scene tests verify automatic selection feedback and manual-mode disabled tab rendering.",
          "Docs scene tests verify the shared component page section contract and example block layout.",
        ],
      }),
    ]
  );
};

const textareaDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Textarea"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A styled, installable Foldkit Textarea slice built on the official Foldkit Ui.Textarea primitive. It keeps native multi-line text semantics while centralizing labels, descriptions, placeholders, rows, typed input messages, disabled state, invalid state, and reusable field classes.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/textarea" },
        { label: "Examples", value: "basic, disabled" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Textarea v1 documents the stateless multi-line text-entry path: parent-owned value, typed input messages, accessible label and description helpers, row sizing, and disabled state styling."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-textarea-basic",
                preview: DocsPreviewsNZ.textareaBasicExamplePreview(
                  model.textareaBasicExample,
                  "textarea-docs-basic-preview"
                ),
                href: "/docs/components/textarea/examples/basic",
                linkText: "Open standalone Textarea Basic example",
              }),
              docsExampleBlock({
                title: "Disabled",
                testId: "docs-example-block-textarea-disabled",
                preview: DocsPreviewsNZ.textareaDisabledExamplePreview(
                  model.textareaDisabledExample,
                  "textarea-docs-disabled-preview"
                ),
                href: "/docs/components/textarea/examples/disabled",
                linkText: "Open standalone Textarea Disabled example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/textarea.json\nbunx shadcn@latest add <registry-url>/textarea-basic.json\nbunx shadcn@latest add <registry-url>/textarea-disabled.json",
        usageBody:
          "Store the textarea value in the parent model, map `onInput` into a verb-first Foldkit message, and render a native textarea with the supplied attributes.",
        usageCode: `import * as Textarea from "./ui/textarea";

Textarea.view<Message>({
  id: "bio-textarea",
  value: model.bio,
  rows: 4,
  onInput: (value) => UpdatedBio({ value }),
  toView: (attributes) => h.textarea(attributes.textarea, []),
});`,
        integrationCode: `// Model
bio: S.String;

// Message
UpdatedBio({ value: S.String });

// Update
UpdatedBio: ({ value }) => [
  evo(model, { bio: () => value }),
  [],
];`,
        anatomySection: docsAnatomyBlock(`Textarea.view<Message>({
  id: "bio-textarea",
  value: model.bio,
  onInput: (value) => UpdatedBio({ value }),
  toView: (attributes) =>
    h.div([h.Class(Textarea.fieldClassName)], [
      h.label([...attributes.label, h.Class(Textarea.labelClassName)], ["Bio"]),
      h.textarea(
        [...attributes.textarea, h.Class(Textarea.textareaClassName)],
        []
      ),
      h.p(
        [...attributes.description, h.Class(Textarea.descriptionClassName)],
        ["A brief introduction about yourself."]
      ),
    ]),
});`),
        apiItems: [
          "view(config): renders a native textarea through the supplied toView callback.",
          "descriptionId(id): returns the generated description id for custom composition.",
          "TextareaAttributes: grouped textarea, label, and description attributes.",
          "ViewConfig: id, value, onInput, isDisabled, isInvalid, isAutofocus, name, rows, and placeholder.",
          "fieldClassName, labelClassName, textareaClassName, and descriptionClassName expose the shadcn-style styling hooks.",
        ],
        accessibilityItems: [
          "The label attributes bind the textarea to a visible label.",
          "The description attributes provide aria-describedby for explanatory copy.",
          "Disabled and invalid states stay on the native control so browser semantics are preserved.",
        ],
        coverageItems: [
          "Registry scene tests verify label, description, placeholder, rows, input messages, and disabled state.",
          "Example scene tests verify parent-owned character count feedback and disabled documentation copy.",
          "Docs scene tests verify the shared component page section contract and example block layout.",
        ],
      }),
    ]
  );
};

const toastDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Toast"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A styled, installable Foldkit Toast slice built on the official Foldkit Ui.Toast primitive. It binds a typed payload schema to the toast stack while preserving variant roles, animation lifecycle commands, hover pause behavior, sticky entries, and parent-visible dismissal OutMessages.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/toast" },
        { label: "Examples", value: "basic, variants" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Toast v1 documents the typed notification stack path: payload-owned title and description rendering, status and alert variants, sticky entries, dismiss controls, and animation command resolution."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-toast-basic",
                preview: DocsPreviewsNZ.toastBasicExamplePreview(
                  model.toastBasicExample,
                  "toast-docs-basic-preview"
                ),
                href: "/docs/components/toast/examples/basic",
                linkText: "Open standalone Toast Basic example",
              }),
              docsExampleBlock({
                title: "Variants",
                testId: "docs-example-block-toast-variants",
                preview: DocsPreviewsNZ.toastVariantsExamplePreview(
                  model.toastVariantsExample,
                  "toast-docs-variants-preview"
                ),
                href: "/docs/components/toast/examples/variants",
                linkText: "Open standalone Toast Variants example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/toast.json\nbunx shadcn@latest add <registry-url>/toast-basic.json\nbunx shadcn@latest add <registry-url>/toast-variants.json",
        usageBody:
          "Keep the toast model in the parent, call Toast.show from update events, delegate child messages through h.submodel, and render entries with the supplied dismiss handlers.",
        usageCode: `import * as Toast from "./ui/toast";

const toast = Toast.init({ id: "app-toast" });

Toast.show(toast, {
  variant: "Success",
  payload: {
    title: "Saved",
    maybeDescription: Option.some("Changes are live."),
  },
});`,
        integrationCode: `// Model
toast: Toast.Model;

// Message
Main.GotToastMessage({ message: Toast.Message });

// Update
const [toast, commands, maybeOutMessage] =
  Toast.update(model.toast, message);

// View
h.submodel({
  slotId: model.toast.id,
  model: model.toast,
  view: Toast.view,
  viewInputs: {
    position: "BottomRight",
    entryToView: Toast.toastEntryView,
  },
  toParentMessage: (message) => Main.GotToastMessage({ message }),
});`,
        anatomySection: docsAnatomyBlock(`h.submodel({
  slotId: model.toast.id,
  model: model.toast,
  view: Toast.view,
  viewInputs: {
    position: "BottomRight",
    entryToView: Toast.toastEntryView,
    entryClassName: Toast.entryClassName,
    containerClassName: Toast.containerClassName,
  },
  toParentMessage: (message) => GotToastMessage({ message }),
});`),
        apiItems: [
          "ToastPayload: schema-backed title and optional description for registry examples.",
          "init(config): creates an empty toast stack model with a default duration.",
          "show(model, input): appends a typed entry and starts the animation/timer lifecycle.",
          "dismiss and dismissAll: begin leave animation for one entry or all entries.",
          "update(model, message): returns model, commands, and an optional DismissedToast OutMessage.",
          "Message, Entry, Model, OutMessage, Position, Variant, and EntryHandlers expose the Foldkit Toast contract.",
          "toastEntryView: reusable styled entry renderer that spreads EntryHandlers.dismiss onto the close button.",
          "containerClassName, toastClassName, entryClassName, titleClassName, descriptionClassName, and closeButtonClassName expose shadcn-style styling hooks.",
        ],
        accessibilityItems: [
          "The primitive renders a persistent aria-live region labelled Notifications.",
          "Info and Success variants use status; Warning and Error variants use alert.",
          "Each toast entry is aria-atomic so screen readers announce the full notification.",
          "Dismiss controls have entry-specific accessible names.",
        ],
        coverageItems: [
          "Registry scene tests verify live region rendering, sticky show, dismiss control attributes, and animation command resolution.",
          "Example scene tests verify basic show/dismiss flow and status/alert variant rendering.",
          "Docs scene tests verify the shared component page section contract and example block layout.",
        ],
      }),
    ]
  );
};

const tooltipDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Tooltip"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A styled, installable Foldkit Tooltip slice built on the official Foldkit Ui.Tooltip primitive. It preserves delayed hover opening, focus opening, Escape and blur dismissal, anchor positioning mounts, Shown and Hidden OutMessages, disabled trigger semantics, and reusable view classes.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/tooltip" },
        { label: "Examples", value: "basic, no-delay" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Tooltip v1 documents transient non-interactive help content: delayed hover disclosure, immediate keyboard focus disclosure, hidden panel state, mount-positioned placement, and parent-visible visibility feedback."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-tooltip-basic",
                preview: DocsPreviewsNZ.tooltipBasicExamplePreview(
                  model.tooltipBasicExample,
                  "tooltip-docs-basic-preview"
                ),
                href: "/docs/components/tooltip/examples/basic",
                linkText: "Open standalone Tooltip Basic example",
              }),
              docsExampleBlock({
                title: "No delay",
                testId: "docs-example-block-tooltip-no-delay",
                preview: DocsPreviewsNZ.tooltipNoDelayExamplePreview(
                  model.tooltipNoDelayExample,
                  "tooltip-docs-no-delay-preview"
                ),
                href: "/docs/components/tooltip/examples/no-delay",
                linkText: "Open standalone Tooltip No Delay example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/tooltip.json\nbunx shadcn@latest add <registry-url>/tooltip-basic.json\nbunx shadcn@latest add <registry-url>/tooltip-no-delay.json",
        usageBody:
          "Initialize the Tooltip child model, delegate child messages through `h.submodel`, render the trigger and conditional panel from the supplied attribute bundles, and handle Shown or Hidden when parent state needs visibility feedback.",
        usageCode: `import * as Tooltip from "./ui/tooltip";

const [tooltip] = Tooltip.init({
  id: "save-tooltip",
});

h.submodel({
  slotId: model.tooltip.id,
  model: model.tooltip,
  view: Tooltip.view,
  viewInputs: {
    anchor: Tooltip.tooltipAnchor,
    toView: (render) =>
      Tooltip.tooltipView({
        render,
        triggerLabel: "Hover or focus me",
        panelText: "This is a tooltip",
      }),
  },
  toParentMessage: (message) => Main.GotTooltipMessage({ message }),
});`,
        integrationCode: `// Model
tooltip: Tooltip.Model;

// Message
Main.GotTooltipMessage({ message: Tooltip.Message });

// Update
const [tooltip, commands, maybeOutMessage] =
  Tooltip.update(model.tooltip, message);

// View
h.submodel({
  slotId: model.tooltip.id,
  model: model.tooltip,
  view: Tooltip.view,
  viewInputs,
  toParentMessage: (message) => Main.GotTooltipMessage({ message }),
});`,
        anatomySection: docsAnatomyBlock(`h.submodel({
  slotId: model.tooltip.id,
  model: model.tooltip,
  view: Tooltip.view,
  viewInputs: {
    anchor: Tooltip.tooltipAnchor,
    toView: (render) =>
      Tooltip.tooltipView({
        render,
        triggerLabel: "Hover or focus me",
        panelText: "This is a tooltip",
      }),
  },
  toParentMessage: (message) => GotTooltipMessage({ message }),
});`),
        apiItems: [
          "Model: schema-backed state containing id, open state, hover/focus state, dismissal state, showDelay, and pending timer version.",
          "init(config): creates a Tooltip model and returns the registry init tuple.",
          "update(model, message): returns model, commands, and an optional Shown or Hidden OutMessage.",
          "ShowAfterDelay: command emitted when hover should open after the configured delay.",
          "AnchorTooltip: mount emitted by the panel to position it relative to the trigger.",
          "reflectShowDelay: mirrors externally controlled delay configuration without emitting OutMessage.",
          "ViewInputs and RenderInfo: trigger attributes, panel attributes, visibility, disabled state, and anchor configuration for custom composition.",
          "tooltipView, tooltipAnchor, tooltipRootClassName, tooltipTriggerClassName, and panelClassName expose the shadcn-style composition and styling hooks.",
        ],
        accessibilityItems: [
          "The trigger receives aria-describedby pointing to the tooltip panel id.",
          "The panel receives role tooltip and stays non-interactive with pointer events disabled.",
          "Keyboard focus opens immediately and Escape hides an open tooltip.",
          "Disabled tooltips remove hover, focus, keyboard, and pointer handlers while preserving disabled data attributes.",
        ],
        coverageItems: [
          "Registry scene tests verify trigger attributes, hover delay command resolution, focus opening, blur hiding, and AnchorTooltip mount lifecycle.",
          "Example scene tests verify basic hover-delay behavior and no-delay focus behavior with parent-visible status feedback.",
          "Docs scene tests verify the shared component page section contract and example block layout.",
        ],
      }),
    ]
  );
};

const comboboxDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Combobox"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A styled, installable Foldkit Combobox slice built on the official Foldkit Ui.Combobox primitive. It preserves input filtering, typed Selected OutMessage flow, multi-select state, command effects, and mount-aware positioning.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/combobox" },
        { label: "Examples", value: "basic, multi" },
        { label: "Proof", value: "story tests, scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Combobox v1 documents the single-select and multi-select paths: input-driven filtering, typed selection messages, selected display text, and selected tag rendering."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-combobox-basic",
                preview: DocsPreviewsCD.comboboxBasicExamplePreview(
                  model.comboboxBasicExample,
                  "combobox-docs-basic-preview"
                ),
                href: "/docs/components/combobox/examples/basic",
                linkText: "Open standalone Combobox Basic example",
              }),
              docsExampleBlock({
                title: "Multi",
                testId: "docs-example-block-combobox-multi",
                preview: DocsPreviewsCD.comboboxMultiExamplePreview(
                  model.comboboxMultiExample,
                  "combobox-docs-multi-preview"
                ),
                href: "/docs/components/combobox/examples/multi",
                linkText: "Open standalone Combobox Multi example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/combobox.json\nbunx shadcn@latest add <registry-url>/combobox-basic.json\nbunx shadcn@latest add <registry-url>/combobox-multi.json",
        usageBody:
          "Create a typed Combobox factory, keep the model in the parent, filter items from the current input value, and handle Selected OutMessage values in the parent update.",
        usageCode: `import * as Combobox from "./ui/combobox";

type City = "Kyiv" | "Oxford" | "Quito";
const CityCombobox = Combobox.create<City>();

const [comboboxModel] = Combobox.init({ id: "city-combobox" });`,
        integrationCode: `// Model
cityCombobox: Combobox.Model;

// Message
Main.GotComboboxMessage({ message: Combobox.Message });

// Update
const [cityCombobox, commands, maybeOutMessage] =
  CityCombobox.update(model.cityCombobox, message);`,
        anatomySection: docsAnatomyBlock(
          `h.submodel({
  slotId: model.cityCombobox.id,
  model: model.cityCombobox,
  view: CityCombobox.view,
  viewInputs: {
    items: cities,
    itemToString: (city) => city.name,
    inputLabel: "City",
  },
  toParentMessage: (message) => Main.GotComboboxMessage({ message }),
});`
        ),
        apiItems: [
          "init(config): returns a model and empty startup command list for single-select comboboxes.",
          "create<Item>(): returns typed view, update, open, close, selectItem, and reflectSelectedItem helpers.",
          "Multi.create<Item>(): returns typed multi-select view, update, selectItem, and reflectSelectedItems helpers.",
          "ViewInputs: item rendering, filtering inputs, anchor, groups, disabled items, and form metadata.",
        ],
        accessibilityItems: [
          "The Foldkit primitive owns combobox roles, active item state, keyboard navigation, and selected item semantics.",
          "Input attributes should include a clear accessible label or visible label composition.",
          "Backdrop, anchor, and prevent-blur mounts must be resolved in scene tests when the popup opens.",
        ],
        coverageItems: [
          "Story tests cover init config, single-select helper behavior, and multi-select add/remove out-messages.",
          "Scene tests cover input filtering, mount resolution, selection close behavior, and multi example tag rendering.",
          "Docs scene tests verify the shared component page section contract and example block layout.",
        ],
      }),
    ]
  );
};

const radioGroupDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Radio Group"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A styled, installable Foldkit RadioGroup slice built on the official Foldkit Ui.RadioGroup primitive. It preserves typed grouped selection, disabled options, hidden input attributes, vertical and horizontal layout, and parent-visible selected feedback.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/radio-group" },
        { label: "Examples", value: "basic, horizontal" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "RadioGroup v1 documents the stateful grouped-selection path: one selected string value, typed option rendering, optional hidden input form participation, disabled group or option state, and vertical/horizontal layout helpers."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-radio-group-basic",
                preview: DocsPreviewsNZ.radioGroupBasicExamplePreview(
                  model.radioGroupBasicExample,
                  "radio-group-docs-basic-preview"
                ),
                href: "/docs/components/radio-group/examples/basic",
                linkText: "Open standalone Radio Group Basic example",
              }),
              docsExampleBlock({
                title: "Horizontal",
                testId: "docs-example-block-radio-group-horizontal",
                preview: DocsPreviewsNZ.radioGroupHorizontalExamplePreview(
                  model.radioGroupHorizontalExample,
                  "radio-group-docs-horizontal-preview"
                ),
                href: "/docs/components/radio-group/examples/horizontal",
                linkText: "Open standalone Radio Group Horizontal example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/radio-group.json\nbunx shadcn@latest add <registry-url>/radio-group-basic.json\nbunx shadcn@latest add <registry-url>/radio-group-horizontal.json",
        usageBody:
          "Create a typed RadioGroup factory, initialize the child model in the parent, delegate child messages through `h.submodel`, and render each option from the primitive-provided attributes.",
        usageCode: `import * as RadioGroup from "./ui/radio-group";

type Plan = "Startup" | "Business" | "Enterprise";
const PlanRadioGroup = RadioGroup.create<Plan>();

const [radioGroup, radioGroupCommands] = RadioGroup.init({
  id: "plan-radio-group",
  selectedValue: "Startup",
});`,
        integrationCode: `// Model
radioGroup: RadioGroup.Model;

// Message
Main.GotRadioGroupMessage({ message: RadioGroup.Message });

// Update
const [radioGroup, commands] =
  PlanRadioGroup.update(model.radioGroup, message);

// View
h.submodel({
  slotId: model.radioGroup.id,
  model: model.radioGroup,
  view: PlanRadioGroup.view,
  viewInputs,
  toParentMessage: (message) => Main.GotRadioGroupMessage({ message }),
});`,
        anatomySection: docsAnatomyBlock(
          `h.submodel({
  slotId: model.radioGroup.id,
  model: model.radioGroup,
  view: PlanRadioGroup.view,
  viewInputs: {
    label: "Plan",
    options: planOptions,
    orientation: "vertical",
  },
  toParentMessage: (message) => Main.GotRadioGroupMessage({ message }),
});`
        ),
        apiItems: [
          "Model: schema-backed state containing id, selectedValue, orientation, and disabled state.",
          "Orientation type: vertical or horizontal orientation value accepted through init config and view inputs.",
          "init(config): creates a RadioGroup model and empty command list for registry consistency.",
          "create<Value>(): returns typed view, update, and focus helpers for string option values.",
          "FocusOption: command helper for moving focus to a specific option.",
          "Selected and OutMessage: typed parent-visible selected value facts.",
          "ViewInputs: options, labels, descriptions, disabled predicates, hidden input metadata, and custom toView composition.",
          "Class helpers: vertical/horizontal group classes, option classes, label text, description text, metadata text, and check icon helpers.",
        ],
        accessibilityItems: [
          "The Foldkit primitive owns radiogroup and radio role attributes.",
          "Option labels and descriptions bind visible text to each radio item.",
          "Disabled group and disabled option state are exposed through ARIA and data attributes.",
          "The hiddenInput attributes preserve form participation when a name is supplied.",
        ],
        coverageItems: [
          "Registry scene tests verify checked state, selection updates, parent-visible feedback, and disabled group behavior.",
          "Example scene tests verify vertical selection, horizontal layout, and disabled option state.",
          "Docs scene tests verify the shared component page section contract and example block layout.",
        ],
      }),
    ]
  );
};

const selectDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Select"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A styled, installable Foldkit Select slice built on the official Foldkit Ui.Select primitive. It keeps native select semantics while centralizing label, description, disabled, invalid, value, and onChange wiring.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/select" },
        { label: "Examples", value: "basic, disabled" },
        { label: "Proof", value: "scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Select v1 documents the native select path: parent-owned value, typed onChange messages, accessible label and description helpers, and disabled state styling."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-select-basic",
                preview: DocsPreviewsNZ.selectBasicExamplePreview(
                  model.selectBasicExample,
                  "select-docs-basic-preview"
                ),
                href: "/docs/components/select/examples/basic",
                linkText: "Open standalone Select Basic example",
              }),
              docsExampleBlock({
                title: "Disabled",
                testId: "docs-example-block-select-disabled",
                preview: DocsPreviewsNZ.selectDisabledExamplePreview(
                  model.selectDisabledExample,
                  "select-docs-disabled-preview"
                ),
                href: "/docs/components/select/examples/disabled",
                linkText: "Open standalone Select Disabled example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/select.json\nbunx shadcn@latest add <registry-url>/select-basic.json\nbunx shadcn@latest add <registry-url>/select-disabled.json",
        usageBody:
          "Store the selected value in the parent model, map Ui.Select onChange into a verb-first Foldkit message, and render native options inside the supplied select attributes.",
        usageCode: `import * as Select from "./ui/select";

Select.view<Message>({
  id: "region-select",
  value: model.region,
  onChange: (value) => UpdatedRegion({ value }),
  toView: (attributes) => h.select(attributes.select, options),
});`,
        integrationCode: `// Model
region: S.String;

// Message
UpdatedRegion({ value: S.String });

// Update
UpdatedRegion: ({ value }) => [
  evo(model, { region: () => value }),
  [],
];`,
        anatomySection: docsAnatomyBlock(
          `Select.view<Message>({
  id: "region-select",
  value: model.region,
  onChange: (value) => UpdatedRegion({ value }),
  toView: (attributes) =>
    h.select(attributes.select, [
      h.option([h.Value("north")], ["North"]),
      h.option([h.Value("south")], ["South"]),
    ]),
});`
        ),
        apiItems: [
          "view(config): renders the native select through the supplied toView callback.",
          "descriptionId(id): returns the generated description id for custom composition.",
          "SelectAttributes: grouped select, label, and description attributes.",
          "ViewConfig: id, value, onChange, isDisabled, isInvalid, isAutofocus, and name.",
        ],
        accessibilityItems: [
          "The label attributes bind the select to a visible label.",
          "The description attributes provide aria-describedby for explanatory copy.",
          "Disabled and invalid states stay on the native control so browser semantics are preserved.",
        ],
        coverageItems: [
          "Registry scene tests verify label, description, change messages, and disabled state.",
          "Example scene tests verify parent-owned value feedback and disabled documentation copy.",
          "Docs scene tests verify the shared component page section contract and example block layout.",
        ],
      }),
    ]
  );
};

const listboxDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Listbox"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A styled, installable Foldkit Listbox slice built on the official Foldkit Ui.Listbox primitive. It preserves single-select state, typed Selected OutMessage flow, command and mount effects, typeahead, and animation lifecycle.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/listbox" },
        { label: "Examples", value: "basic, animated" },
        { label: "Proof", value: "story tests, scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Listbox v1 documents the single-select path: local component interaction state, parent-observed Selected OutMessage, anchored panel positioning, and optional animation."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-listbox-basic",
                preview: DocsPreviewsJM.listboxBasicExamplePreview(
                  model.listboxBasicExample,
                  "listbox-docs-basic-preview"
                ),
                href: "/docs/components/listbox/examples/basic",
                linkText: "Open standalone Listbox Basic example",
              }),
              docsExampleBlock({
                title: "Animated",
                testId: "docs-example-block-listbox-animated",
                preview: DocsPreviewsJM.listboxAnimatedExamplePreview(
                  model.listboxAnimatedExample,
                  "listbox-docs-animated-preview"
                ),
                href: "/docs/components/listbox/examples/animated",
                linkText: "Open standalone Listbox Animated example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/listbox.json\nbunx shadcn@latest add <registry-url>/listbox-basic.json\nbunx shadcn@latest add <registry-url>/listbox-animated.json",
        usageBody:
          "Create a typed Listbox factory, store the model in the parent, and render with item configs that expose selected and active state through data attributes.",
        usageCode: `import * as Listbox from "./ui/listbox";

type Person = "Michael Bluth" | "Lindsay Funke" | "Gob Bluth";
const PersonListbox = Listbox.create<Person>();

const [listboxModel] = Listbox.init({ id: "people-listbox" });`,
        integrationCode: `// Model
peopleListbox: Listbox.Model;

// Message
Main.GotListboxMessage({ message: Listbox.Message });

// Update
const [peopleListbox, commands, maybeOutMessage] =
  PersonListbox.update(model.peopleListbox, message);

// View
h.submodel({
  slotId: model.peopleListbox.id,
  model: model.peopleListbox,
  view: PersonListbox.view,
  viewInputs,
  toParentMessage: GotListboxMessage,
});`,
        anatomySection: docsAnatomyBlock(
          `h.submodel({
  slotId: model.peopleListbox.id,
  model: model.peopleListbox,
  view: PersonListbox.view,
  viewInputs: {
    items: people,
    itemToString: (person) => person.name,
    label: "People",
  },
  toParentMessage: GotListboxMessage,
});`
        ),
        apiItems: [
          "Model",
          "Message",
          "OutMessage",
          "Selected",
          "init",
          "create",
          "open",
          "close",
          "selectItem",
          "reflectSelectedItem",
          "AnchorListbox",
          "PortalListboxBackdrop",
        ],
        accessibilityItems: [
          "Button and items attributes come from Ui.Listbox.view.",
          "Active and selected state are exposed through data attributes for styling.",
          "Typeahead, keyboard activation, and focus return stay inside the primitive.",
          "Modal mode can lock scroll and inert outside content.",
        ],
        coverageItems: [
          "Wrapper story tests cover init, helper API, modal commands, and selection reflection.",
          "Scene tests cover trigger, choices, backdrop close, mounts, and animation lifecycle.",
          "Docs route tests cover examples, install text, and example-block guardrails.",
          "Registry checks validate generated listbox JSON artifacts.",
        ],
      }),
    ]
  );
};

const menuDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Menu"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A styled, installable Foldkit Menu slice built on the official Foldkit Ui.Menu primitive. It preserves typed item unions, command and mount effects, animation lifecycle, and Selected OutMessage flow while adding a shadcn-style source layout.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/menu" },
        { label: "Examples", value: "basic, animated" },
        { label: "Proof", value: "story tests, scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Menu v1 documents transient command selection: typed item unions, anchored items, typeahead, pointer and keyboard activation, and a semantic Selected OutMessage."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-menu-basic",
                preview: DocsPreviewsJM.menuBasicExamplePreview(
                  model.menuBasicExample,
                  "menu-docs-basic-preview"
                ),
                href: "/docs/components/menu/examples/basic",
                linkText: "Open standalone Menu Basic example",
              }),
              docsExampleBlock({
                title: "Animated",
                testId: "docs-example-block-menu-animated",
                preview: DocsPreviewsJM.menuAnimatedExamplePreview(
                  model.menuAnimatedExample,
                  "menu-docs-animated-preview"
                ),
                href: "/docs/components/menu/examples/animated",
                linkText: "Open standalone Menu Animated example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/menu.json\nbunx shadcn@latest add <registry-url>/menu-basic.json\nbunx shadcn@latest add <registry-url>/menu-animated.json",
        usageBody:
          "Create a typed Menu factory and render transient action items. Parent code receives semantic selection through the factory update result.",
        usageCode: `import * as Menu from "./ui/menu";

type Action = "Edit" | "Duplicate" | "Delete";
const ActionMenu = Menu.create<Action>();

const [menuModel] = Menu.init({ id: "actions-menu" });`,
        integrationCode: `// Model
actionsMenu: Menu.Model;

// Message
Main.GotMenuMessage({ message: Menu.Message });

// Update
const [actionsMenu, commands, maybeOutMessage] =
  ActionMenu.update(model.actionsMenu, message);

// View
h.submodel({
  slotId: model.actionsMenu.id,
  model: model.actionsMenu,
  view: ActionMenu.view,
  viewInputs,
  toParentMessage: GotMenuMessage,
});`,
        anatomySection: docsAnatomyBlock(
          `h.submodel({
  slotId: model.actionsMenu.id,
  model: model.actionsMenu,
  view: ActionMenu.view,
  viewInputs: {
    triggerLabel: "Actions",
    items: actionItems,
  },
  toParentMessage: GotMenuMessage,
});`
        ),
        apiItems: [
          "Model",
          "Message",
          "OutMessage",
          "Selected",
          "init",
          "create",
          "open",
          "close",
          "selectItem",
          "AnchorMenu",
          "PortalMenuBackdrop",
        ],
        accessibilityItems: [
          "Button and menu items attributes come from Ui.Menu.view.",
          "Keyboard navigation, typeahead, and focus return stay inside the primitive.",
          "Disabled and active item state are exposed through data attributes for styling.",
          "Modal mode can lock scroll and inert outside content.",
        ],
        coverageItems: [
          "Wrapper story tests cover init, helper API, modal commands, and typed selection.",
          "Scene tests cover trigger, items, backdrop close, mounts, and animation lifecycle.",
          "Docs route tests cover examples, install text, and example-block guardrails.",
          "Registry checks validate generated menu JSON artifacts.",
        ],
      }),
    ]
  );
};

const popoverDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Popover"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A styled, installable Foldkit Popover slice built on the official Foldkit Ui.Popover primitive. It preserves typed model, message, command, mount, and OutMessage flow while adding a shadcn-style source layout.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/popover" },
        { label: "Examples", value: "basic, animated" },
        { label: "Proof", value: "story tests, scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Popover v1 documents anchored non-selection content: local open state, mount-aware positioning, backdrop close, optional modal behavior, and optional animation."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Examples"]),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Basic",
                testId: "docs-example-block-popover-basic",
                preview: DocsPreviewsNZ.popoverBasicExamplePreview(
                  model.popoverBasicExample,
                  "popover-docs-basic-preview"
                ),
                href: "/docs/components/popover/examples/basic",
                linkText: "Open standalone Popover Basic example",
              }),
              docsExampleBlock({
                title: "Animated",
                testId: "docs-example-block-popover-animated",
                preview: DocsPreviewsNZ.popoverAnimatedExamplePreview(
                  model.popoverAnimatedExample,
                  "popover-docs-animated-preview"
                ),
                href: "/docs/components/popover/examples/animated",
                linkText: "Open standalone Popover Animated example",
              }),
            ]
          ),
        ]
      ),
      ...docsStandardComponentSections({
        installCommands:
          "bunx shadcn@latest add <registry-url>/popover.json\nbunx shadcn@latest add <registry-url>/popover-basic.json\nbunx shadcn@latest add <registry-url>/popover-animated.json",
        usageBody:
          "Store Popover model in the parent and render anchored content through the registry view helpers.",
        usageCode: `import * as Popover from "./ui/popover";

const [popoverModel] = Popover.init({
  id: "details-popover",
});`,
        integrationCode: `// Model
detailsPopover: Popover.Model;

// Message
Main.GotPopoverMessage({ message: Popover.Message });

// Update
const [detailsPopover, commands, maybeOutMessage] =
  Popover.update(model.detailsPopover, message);

// View
h.submodel({
  slotId: model.detailsPopover.id,
  model: model.detailsPopover,
  view: Popover.view,
  viewInputs,
  toParentMessage: GotPopoverMessage,
});`,
        anatomySection: docsAnatomyBlock(
          `h.submodel({
  slotId: model.detailsPopover.id,
  model: model.detailsPopover,
  view: Popover.view,
  viewInputs: {
    trigger: "Details",
    content: h.p([], ["Popover content"]),
  },
  toParentMessage: GotPopoverMessage,
});`
        ),
        apiItems: [
          "Model",
          "Message",
          "OutMessage",
          "init",
          "update",
          "open",
          "close",
          "view",
          "AnchorPopover",
          "PortalPopoverBackdrop",
        ],
        accessibilityItems: [
          "Trigger and panel attributes come from Ui.Popover.view.",
          "Backdrop close and Escape close route through Popover messages.",
          "Content focus can be configured through primitive init options.",
          "Modal mode can lock scroll and inert outside content.",
        ],
        coverageItems: [
          "Wrapper story tests cover init, open, close, and modal commands.",
          "Scene tests cover trigger, panel content, backdrop close, mounts, and animation lifecycle.",
          "Docs route tests cover examples, install text, and example-block guardrails.",
          "Registry checks validate generated popover JSON artifacts.",
        ],
      }),
    ]
  );
};

const dialogDocsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-5xl space-y-10")],
    [
      h.header(
        [h.Class("space-y-4")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Registry component"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Dialog"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "A styled, installable Foldkit Dialog slice built on the official Foldkit Ui.Dialog primitive. It preserves the Elm-style model, message, command, and OutMessage flow while adding a shadcn-style source layout.",
            ]
          ),
          h.p(
            [h.Class("max-w-2xl text-sm text-gray-500")],
            [
              "Foldkit CN is a third-party registry and does not replace the official Foldkit UI documentation at foldkit.dev/ui/overview.",
            ]
          ),
        ]
      ),
      docsMetaGrid([
        { label: "Source", value: "registry/default/ui/dialog" },
        {
          label: "Examples",
          value: "basic, animated, destructive, focus, scrollable",
        },
        { label: "Proof", value: "story tests, scene tests, registry JSON" },
      ]),
      docsOverviewBlock(
        "Dialog v1 documents centered modal presentation: parent-owned trigger flow, accessible title and description wiring, scroll lock commands, focus management, and optional animation."
      ),
      h.section(
        [h.Class("space-y-4")],
        [
          h.div(
            [h.Class("space-y-2")],
            [
              h.h2(
                [h.Class("text-xl font-semibold text-gray-950")],
                ["Examples"]
              ),
              h.p(
                [h.Class("max-w-2xl text-sm text-gray-600")],
                [
                  "The docs page renders the same registry examples that install as standalone source.",
                ]
              ),
            ]
          ),
          h.div(
            [h.Class("grid gap-4 lg:grid-cols-2")],
            [
              docsExampleBlock({
                title: "Basic",
                description:
                  "A parent-owned trigger sends RequestedOpen and receives close results through OutMessage.",
                testId: "docs-example-block-dialog-basic",
                preview: DocsPreviewsCD.dialogBasicExamplePreview(
                  model.dialogBasicExample,
                  "dialog-docs-basic-preview"
                ),
                href: "/docs/components/dialog/examples/basic",
                linkText: "Open standalone Dialog Basic example",
              }),
              docsExampleBlock({
                title: "Animated",
                description:
                  "The animated variant keeps the dialog surface mounted while Foldkit animation state settles.",
                testId: "docs-example-block-dialog-animated",
                preview: DocsPreviewsCD.dialogAnimatedExamplePreview(
                  model.dialogAnimatedExample,
                  "dialog-docs-animated-preview"
                ),
                href: "/docs/components/dialog/examples/animated",
                linkText: "Open standalone Dialog Animated example",
              }),
              docsExampleBlock({
                title: "Destructive",
                description:
                  "A destructive confirmation uses the existing Dialog flow with a red confirm action.",
                testId: "docs-example-block-dialog-destructive",
                preview: DocsPreviewsCD.dialogDestructiveExamplePreview(
                  model.dialogDestructiveExample,
                  "dialog-docs-destructive-preview"
                ),
                href: "/docs/components/dialog/examples/destructive",
                linkText: "Open standalone Dialog Destructive example",
              }),
              docsExampleBlock({
                title: "Focus",
                description:
                  "A focus-targeted dialog warms up and focuses the first field for input-heavy flows.",
                testId: "docs-example-block-dialog-focus",
                preview: DocsPreviewsCD.dialogFocusExamplePreview(
                  model.dialogFocusExample,
                  "dialog-docs-focus-preview"
                ),
                href: "/docs/components/dialog/examples/focus",
                linkText: "Open standalone Dialog Focus example",
              }),
              docsExampleBlock({
                title: "Scrollable",
                description:
                  "A long-content dialog constrains the body scroll region while keeping footer actions visible.",
                testId: "docs-example-block-dialog-scrollable",
                preview: DocsPreviewsCD.dialogScrollableExamplePreview(
                  model.dialogScrollableExample,
                  "dialog-docs-scrollable-preview"
                ),
                href: "/docs/components/dialog/examples/scrollable",
                linkText: "Open standalone Dialog Scrollable example",
              }),
            ]
          ),
        ]
      ),
      docsInstallBlock(
        "bunx shadcn@latest add <registry-url>/dialog.json\nbunx shadcn@latest add <registry-url>/dialog-basic.json\nbunx shadcn@latest add <registry-url>/dialog-animated.json\nbunx shadcn@latest add <registry-url>/dialog-destructive.json\nbunx shadcn@latest add <registry-url>/dialog-focus.json\nbunx shadcn@latest add <registry-url>/dialog-scrollable.json"
      ),
      docsStylingBlock(),
      docsKeyboardInteractionBlock(),
      h.section(
        [
          h.Class(
            "grid gap-6 border-t border-gray-200 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          ),
        ],
        [
          h.div(
            [h.Class("space-y-3")],
            [
              h.h2([h.Class("text-xl font-semibold text-gray-950")], ["Usage"]),
              h.p(
                [h.Class("text-sm text-gray-600")],
                [
                  "Dialog state stays in the parent model. The parent sends Dialog.RequestedOpen and maps child messages back through GotDialogMessage.",
                ]
              ),
            ]
          ),
          codeBlock(`import * as Dialog from "./ui/dialog";

const [dialogModel, dialogCommands] = Dialog.init({
  id: "settings-dialog",
});

Dialog.view({
  model: dialogModel,
  trigger: h.button([h.OnClick(Dialog.RequestedOpen())], ["Open dialog"]),
  title: "Edit settings",
  children: [...]
});`),
        ]
      ),
      h.section(
        [
          h.Class(
            "grid gap-6 border-t border-gray-200 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          ),
        ],
        [
          h.div(
            [h.Class("space-y-3")],
            [
              h.h2(
                [h.Class("text-xl font-semibold text-gray-950")],
                ["Foldkit integration"]
              ),
              h.p(
                [h.Class("text-sm text-gray-600")],
                [
                  "Stateful registry components compose like any Foldkit child: parent-owned model field, parent message wrapper, init command mapping, update command mapping, and h.submodel view wiring.",
                ]
              ),
            ]
          ),
          codeBlock(`// Model
dialog: Dialog.Model;

// Message
Main.GotDialogMessage({ message: Dialog.Message });

// Init
const [dialog, dialogCommands] = Dialog.init({ id: "settings-dialog" });
Command.mapMessages(dialogCommands, GotDialogMessage);

// Update
const [dialog, dialogCommands] = Dialog.update(model.dialog, message);

// View
h.submodel({
  slotId: model.dialog.id,
  model: model.dialog,
  view: Dialog.view,
  toParentMessage: GotDialogMessage,
});`),
        ]
      ),
      h.section(
        [
          h.Class(
            "grid gap-6 border-t border-gray-200 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          ),
        ],
        [
          h.div(
            [h.Class("space-y-3")],
            [
              h.h2(
                [h.Class("text-xl font-semibold text-gray-950")],
                ["API reference"]
              ),
              h.p(
                [h.Class("text-sm text-gray-600")],
                [
                  "The registry wrapper intentionally exposes the Foldkit primitive shape instead of inventing a separate component protocol.",
                ]
              ),
            ]
          ),
          codeBlock(`import * as Dialog from "./ui/dialog";

Dialog.Model;
Dialog.Message;
Dialog.OutMessage;
Dialog.init;
Dialog.update;
Dialog.open;
Dialog.close;
Dialog.view;
Dialog.titleId;
Dialog.descriptionId;`),
        ]
      ),
      h.section(
        [
          h.Class(
            "grid gap-6 border-t border-gray-200 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          ),
        ],
        [
          h.div(
            [h.Class("space-y-3")],
            [
              h.h2(
                [h.Class("text-xl font-semibold text-gray-950")],
                ["Accessibility"]
              ),
              h.p(
                [h.Class("text-sm text-gray-600")],
                [
                  "The component delegates native dialog semantics to Ui.Dialog and exposes helpers for title and description wiring.",
                ]
              ),
            ]
          ),
          h.ul(
            [h.Class("list-disc space-y-1 pl-5 text-sm text-gray-700")],
            [
              h.li(
                [],
                [
                  "Native dialog role and backdrop behavior come from Ui.Dialog.view.",
                ]
              ),
              h.li([], ["Escape and backdrop close emit RequestedClose."]),
              h.li(
                [],
                ["Trigger, cancel, and confirm controls have accessible names."]
              ),
              h.li(
                [],
                [
                  "titleId and descriptionId connect visible copy to the dialog surface.",
                ]
              ),
              h.li(
                [],
                [
                  "focusSelector directs post-open focus, and h.OnClickFocus supports iOS keyboard warmup for input-first dialogs.",
                ]
              ),
              h.li(
                [],
                [
                  "ShowDialog and CloseDialog own body scroll lock through the Foldkit primitive commands.",
                ]
              ),
              h.li(
                [],
                [
                  "Nested or stacked dialogs are unsupported in v1; keep one active Dialog per flow.",
                ]
              ),
              h.li(
                [],
                [
                  'RTL is inherited from the surrounding document or container through h.Dir("rtl"); Dialog does not store direction in its model.',
                ]
              ),
            ]
          ),
        ]
      ),
      h.section(
        [
          h.Class(
            "grid gap-6 border-t border-gray-200 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          ),
        ],
        [
          h.div(
            [h.Class("space-y-3")],
            [
              h.h2(
                [h.Class("text-xl font-semibold text-gray-950")],
                ["AlertDialog policy"]
              ),
              h.p(
                [h.Class("text-sm text-gray-600")],
                [
                  "Dialog v1 keeps AlertDialog out of the Dialog API. Destructive styling is allowed for ordinary confirmation flows, but alert semantics should ship as a separate component later.",
                ]
              ),
            ]
          ),
          h.ul(
            [h.Class("list-disc space-y-1 pl-5 text-sm text-gray-700")],
            [
              h.li(
                [],
                [
                  "Use dialog-destructive when the interaction is still a standard Dialog with cancel and confirm actions.",
                ]
              ),
              h.li(
                [],
                [
                  "Do not add AlertDialog variants, messages, model fields, or registry dependencies to Dialog v1.",
                ]
              ),
              h.li(
                [],
                [
                  "Future AlertDialog work should define its own component, examples, accessibility expectations, and tests.",
                ]
              ),
            ]
          ),
        ]
      ),
      h.section(
        [
          h.Class(
            "grid gap-6 border-t border-gray-200 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          ),
        ],
        [
          h.div(
            [h.Class("space-y-3")],
            [
              h.h2(
                [h.Class("text-xl font-semibold text-gray-950")],
                ["Command Dialog policy"]
              ),
              h.p(
                [h.Class("text-sm text-gray-600")],
                [
                  "Command Dialog is not a Dialog v1 example or variant. It needs its own component because search, filtering, active option state, and keyboard command navigation are separate behavior contracts.",
                ]
              ),
            ]
          ),
          h.ul(
            [h.Class("list-disc space-y-1 pl-5 text-sm text-gray-700")],
            [
              h.li(
                [],
                [
                  "Do not add command palette messages, list state, or search input state to Dialog v1.",
                ]
              ),
              h.li(
                [],
                [
                  "A future Command Dialog should compose modal presentation with command/listbox behavior under its own model and tests.",
                ]
              ),
              h.li(
                [],
                [
                  "Dialog examples may show ordinary form or confirmation flows, but not searchable command selection.",
                ]
              ),
            ]
          ),
        ]
      ),
      h.section(
        [
          h.Class(
            "grid gap-6 border-t border-gray-200 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          ),
        ],
        [
          h.div(
            [h.Class("space-y-3")],
            [
              h.h2(
                [h.Class("text-xl font-semibold text-gray-950")],
                ["Drawer policy"]
              ),
              h.p(
                [h.Class("text-sm text-gray-600")],
                [
                  "Drawer is not a Dialog v1 variant. It needs its own component because edge placement, slide-in motion, responsive sizing, and navigation-style use cases are separate presentation contracts.",
                ]
              ),
            ]
          ),
          h.ul(
            [h.Class("list-disc space-y-1 pl-5 text-sm text-gray-700")],
            [
              h.li(
                [],
                [
                  "Do not add side, placement, or drawer sizing props to Dialog v1.",
                ]
              ),
              h.li(
                [],
                [
                  "A future Drawer can reuse modal concepts, but should own its own examples, animation proof, and responsive behavior tests.",
                ]
              ),
              h.li(
                [],
                [
                  "Use Dialog for centered modal confirmation and form flows; use the future Drawer for edge-mounted panels.",
                ]
              ),
            ]
          ),
        ]
      ),
      h.section(
        [
          h.Class(
            "grid gap-6 border-t border-gray-200 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          ),
        ],
        [
          h.div(
            [h.Class("space-y-3")],
            [
              h.h2(
                [h.Class("text-xl font-semibold text-gray-950")],
                ["Composition policy"]
              ),
              h.p(
                [h.Class("text-sm text-gray-600")],
                [
                  "Dialog v1 documents a single active dialog per user flow. It does not add a stack manager, nested focus handoff, or parent-child modal coordination on top of Foldkit Ui.Dialog.",
                ]
              ),
            ]
          ),
          h.ul(
            [h.Class("list-disc space-y-1 pl-5 text-sm text-gray-700")],
            [
              h.li(
                [],
                [
                  "Open a second step by closing the current Dialog and rendering the next Dialog state from the parent model.",
                ]
              ),
              h.li(
                [],
                [
                  "Do not mount a Dialog trigger or Dialog surface inside another Dialog panel in v1 examples.",
                ]
              ),
              h.li(
                [],
                [
                  "If a product needs modal stacking, treat it as a future coordinator or separate component with its own tests.",
                ]
              ),
            ]
          ),
        ]
      ),
      h.section(
        [
          h.Class(
            "grid gap-6 border-t border-gray-200 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          ),
        ],
        [
          h.div(
            [h.Class("space-y-3")],
            [
              h.h2(
                [h.Class("text-xl font-semibold text-gray-950")],
                ["RTL policy"]
              ),
              h.p(
                [h.Class("text-sm text-gray-600")],
                [
                  "Dialog v1 treats direction as layout context. Set direction on the document, page region, or preview wrapper; the Dialog model and messages stay direction-agnostic.",
                ]
              ),
            ]
          ),
          h.div(
            [h.Class("space-y-3")],
            [
              codeBlock(`const rtlPreview = h.div(
  [h.Dir("rtl")],
  [
    Dialog.trigger({ ... }),
    h.submodel({ ... })
  ]
);`),
              h.p(
                [h.Class("text-sm text-gray-600")],
                [
                  "The registry view helpers avoid text-alignment props and keep direction-specific copy in the consuming app. Dedicated RTL visual snapshots can be added later when the docs site has screenshot coverage.",
                ]
              ),
            ]
          ),
        ]
      ),
      h.section(
        [
          h.Class(
            "grid gap-6 border-t border-gray-200 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          ),
        ],
        [
          h.div(
            [h.Class("space-y-3")],
            [
              h.h2(
                [h.Class("text-xl font-semibold text-gray-950")],
                ["Browser focus proof"]
              ),
              h.p(
                [h.Class("text-sm text-gray-600")],
                [
                  "The focus example is the browser-check target for focusSelector and h.OnClickFocus behavior. Open the standalone route, trigger the dialog, and verify the ShowDialog command carries #dialog-focus-name.",
                ]
              ),
            ]
          ),
          codeBlock(`Route:
/docs/components/dialog/examples/focus

Expected runtime proof:
GotDialogFocusExampleMessage.RequestedOpen
ShowDialog({
  id: "dialog-focus",
  maybeFocusSelector: Some("#dialog-focus-name")
})`),
        ]
      ),
      h.section(
        [
          h.Class(
            "grid gap-6 border-t border-gray-200 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          ),
        ],
        [
          h.div(
            [h.Class("space-y-3")],
            [
              h.h2(
                [h.Class("text-xl font-semibold text-gray-950")],
                ["Coverage"]
              ),
              h.p(
                [h.Class("text-sm text-gray-600")],
                [
                  "The first Dialog slice is covered at the wrapper, example, route, and registry-output levels.",
                ]
              ),
            ]
          ),
          h.ul(
            [h.Class("list-disc space-y-1 pl-5 text-sm text-gray-700")],
            [
              h.li(
                [],
                [
                  "Story tests cover init, open, close, commands, and OutMessage.",
                ]
              ),
              h.li(
                [],
                [
                  "Scene tests cover trigger, accessible dialog labelling, cancel, confirm, animated open, destructive confirm, and focus-target configuration.",
                ]
              ),
              h.li(
                [],
                [
                  "The scrollable example covers long content with a constrained scroll body and persistent footer actions.",
                ]
              ),
              h.li(
                [],
                [
                  "Generated registry JSON includes source and test files for installation.",
                ]
              ),
            ]
          ),
        ]
      ),
      h.section(
        [
          h.Class(
            "grid gap-6 border-t border-gray-200 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          ),
        ],
        [
          h.div(
            [h.Class("space-y-3")],
            [
              h.h2(
                [h.Class("text-xl font-semibold text-gray-950")],
                ["Traceability checklist"]
              ),
              h.p(
                [h.Class("text-sm text-gray-600")],
                [
                  "Each documented behavior maps to a concrete proof or an explicit policy decision.",
                ]
              ),
            ]
          ),
          h.ul(
            [h.Class("list-disc space-y-1 pl-5 text-sm text-gray-700")],
            [
              h.li(
                [],
                [
                  "Open, close, repeated open, repeated close: dialog.story.test.ts.",
                ]
              ),
              h.li(
                [],
                [
                  "Accessible role, title, description, cancel, confirm: dialog.scene.test.ts and dialog-basic.scene.test.ts.",
                ]
              ),
              h.li([], ["Animated lifecycle: dialog-animated.scene.test.ts."]),
              h.li(
                [],
                [
                  "Destructive confirm styling: dialog-destructive.scene.test.ts.",
                ]
              ),
              h.li(
                [],
                [
                  "focusSelector and OnClickFocus: dialog-focus.scene.test.ts plus browser focus proof.",
                ]
              ),
              h.li(
                [],
                [
                  "Scrollable content and footer persistence: dialog-scrollable.scene.test.ts.",
                ]
              ),
              h.li(
                [],
                [
                  'RTL behavior: documented as inherited layout context through h.Dir("rtl").',
                ]
              ),
              h.li(
                [],
                [
                  "Generated install artifacts: build:registry and check:registry.",
                ]
              ),
              h.li(
                [],
                [
                  "Nested or stacked dialogs: unsupported v1 policy documented in the Composition policy section.",
                ]
              ),
              h.li(
                [],
                [
                  "AlertDialog: separate future component policy documented in the AlertDialog policy section.",
                ]
              ),
              h.li(
                [],
                [
                  "Command Dialog: separate future component policy documented in the Command Dialog policy section.",
                ]
              ),
              h.li(
                [],
                [
                  "Drawer: separate future component policy documented in the Drawer policy section.",
                ]
              ),
            ]
          ),
        ]
      ),
    ]
  );
};

const contentView = (model: Model): Html => {
  const h = html<Message>();

  const embedUi = (id: string, view: Submodel.View<UiModel, UiMessage>): Html =>
    h.submodel({
      slotId: id,
      model: model.uiModel,
      view,
      toParentMessage: Main.toUiMessage,
    });

  return M.value(model.route).pipe(
    M.tagsExhaustive({
      Home: homeView,
      AccordionDocs: () => accordionDocsView(model),
      BaseUiAccordionBasicExample: () =>
        DocsRoutes.baseUiAccordionBasicExampleRouteView(model),
      BaseUiAccordionMultipleExample: () =>
        DocsRoutes.baseUiAccordionMultipleExampleRouteView(model),
      BaseUiAccordionDocs: () =>
        baseUiLaneDocsView(model, {
          label: "Accordion",
          source: "registry/default/ui/base-ui-accordion",
          primitive: "Accordion view helpers",
          description:
            "A Base UI style-lane Accordion slice that reuses the existing controlled open-values behavior with root, item, trigger, icon, and panel helpers. The installable examples now cover the Base UI FAQ copy and the Open multiple panels behavior.",
          usage:
            "Install the Base UI lane wrapper when you want Accordion composition with Base UI naming and class hooks.",
          classHelpers: [
            "accordionRootClassName",
            "accordionItemClassName",
            "accordionHeaderClassName",
            "accordionTriggerClassName",
            "accordionIconClassName",
            "accordionPanelClassName",
          ],
          anatomyCode: `import * as Accordion from "./ui/base-ui-accordion";

Accordion.rootView<Message>({
  openValues: model.openValues,
  children,
});`,
          examples: ["base-ui-accordion-basic", "base-ui-accordion-multiple"],
        }),
      ShadcnAccordionDocs: () =>
        shadcnLaneDocsView(model, {
          label: "Accordion",
          source: "registry/default/ui/shadcn-accordion",
          primitive: "Accordion view helpers",
          description:
            "A shadcn style-lane Accordion slice that reuses existing controlled open-values behavior with root, item, trigger, icon, and panel helpers.",
          usage:
            "Install the shadcn lane wrapper when you want Accordion composition with shadcn naming and style hooks.",
          classHelpers: [
            "shadcnAccordionRootClassName",
            "shadcnAccordionItemClassName",
            "shadcnAccordionHeaderClassName",
            "shadcnAccordionTriggerClassName",
            "shadcnAccordionIconClassName",
            "shadcnAccordionPanelClassName",
          ],
          examples: [
            "shadcn-accordion-basic",
            "shadcn-accordion-multiple",
            "shadcn-accordion-disabled",
            "shadcn-accordion-borders",
            "shadcn-accordion-card",
            "shadcn-accordion-rtl",
          ],
          anatomyCode: `import * as Accordion from "./ui/shadcn-accordion";

Accordion.rootView<Message>({
  openValues: model.openValues,
  children: [
    Accordion.itemView({
      value: "item-1",
      openValues: model.openValues,
      onValueChange: ToggledItem({ value: "item-1" }),
      title: "Is it accessible?",
      children: ["Yes. It follows the Foldkit behavior contract."],
    }),
  ],
});`,
        }),
      ShadcnBaseAccordionDocs: () =>
        shadcnLaneDocsView(model, {
          label: "Base Accordion",
          source: "registry/default/ui/shadcn-base-accordion",
          primitive: "Accordion view helpers",
          description:
            "A shadcn Base UI Accordion slice that mirrors the origin Base UI Accordion structure while using the same controlled open-values behavior as the Foldkit accordion primitive.",
          usage:
            "Install the shadcn Base Accordion wrapper when you want Base UI accordion composition with shadcn naming and style hooks.",
          classHelpers: [
            "shadcnBaseAccordionRootClassName",
            "shadcnBaseAccordionItemClassName",
            "shadcnBaseAccordionHeaderClassName",
            "shadcnBaseAccordionTriggerClassName",
            "shadcnBaseAccordionIconClassName",
            "shadcnBaseAccordionPanelClassName",
          ],
          examples: ["shadcn-base-accordion-basic"],
          anatomyCode: `import * as Accordion from "./ui/shadcn-base-accordion";

Accordion.rootView<Message>({
  openValues: model.openValues,
  children: [
    Accordion.itemView({
      value: "item-1",
      openValues: model.openValues,
      onValueChange: ToggledItem({ value: "item-1" }),
      title: "Is it accessible?",
      children: ["Yes. It follows the Foldkit behavior contract."],
    }),
  ],
});`,
        }),
      AccordionBasicExample: () =>
        DocsRoutes.accordionBasicExampleRouteView(model),
      AccordionMultipleExample: () =>
        DocsRoutes.accordionMultipleExampleRouteView(model),
      AlertDocs: () => alertDocsView(model),
      ShadcnAlertDocs: () => alertDocsView(model),
      AlertBasicExample: () => DocsRoutes.alertBasicExampleRouteView(model),
      AlertActionExample: () => DocsRoutes.alertActionExampleRouteView(model),
      AlertDestructiveExample: () =>
        DocsRoutes.alertDestructiveExampleRouteView(model),
      AlertCustomColorsExample: () =>
        DocsRoutes.alertCustomColorsExampleRouteView(model),
      AlertRtlExample: () => DocsRoutes.alertRtlExampleRouteView(model),
      AspectRatioDocs: () => aspectRatioDocsView(model),
      ShadcnAspectRatioDocs: () => aspectRatioDocsView(model),
      AspectRatioBasicExample: () =>
        DocsRoutes.aspectRatioBasicExampleRouteView(model),
      AspectRatioSquareExample: () =>
        DocsRoutes.aspectRatioSquareExampleRouteView(model),
      AspectRatioPortraitExample: () =>
        DocsRoutes.aspectRatioPortraitExampleRouteView(model),
      AspectRatioRtlExample: () =>
        DocsRoutes.aspectRatioRtlExampleRouteView(model),
      BreadcrumbDocs: () => breadcrumbDocsView(model),
      ShadcnBreadcrumbDocs: () => breadcrumbDocsView(model),
      BreadcrumbBasicExample: () =>
        DocsRoutes.breadcrumbBasicExampleRouteView(model),
      BreadcrumbSeparatorExample: () =>
        DocsRoutes.breadcrumbSeparatorExampleRouteView(model),
      BreadcrumbDropdownExample: () =>
        DocsRoutes.breadcrumbDropdownExampleRouteView(model),
      BreadcrumbCollapsedExample: () =>
        DocsRoutes.breadcrumbCollapsedExampleRouteView(model),
      BreadcrumbLinkExample: () =>
        DocsRoutes.breadcrumbLinkExampleRouteView(model),
      BreadcrumbRtlExample: () =>
        DocsRoutes.breadcrumbRtlExampleRouteView(model),
      ButtonGroupDocs: () => buttonGroupDocsView(model),
      ShadcnButtonGroupDocs: () => buttonGroupDocsView(model),
      ButtonGroupBasicExample: () =>
        DocsRoutes.buttonGroupBasicExampleRouteView(model),
      ButtonGroupOrientationExample: () =>
        DocsRoutes.buttonGroupOrientationExampleRouteView(model),
      ButtonGroupSizeExample: () =>
        DocsRoutes.buttonGroupSizeExampleRouteView(model),
      ButtonGroupNestedExample: () =>
        DocsRoutes.buttonGroupNestedExampleRouteView(model),
      ButtonGroupSeparatorExample: () =>
        DocsRoutes.buttonGroupSeparatorExampleRouteView(model),
      ButtonGroupSplitExample: () =>
        DocsRoutes.buttonGroupSplitExampleRouteView(model),
      ButtonGroupInputExample: () =>
        DocsRoutes.buttonGroupInputExampleRouteView(model),
      ButtonGroupInputGroupExample: () =>
        DocsRoutes.buttonGroupInputGroupExampleRouteView(model),
      ButtonGroupSelectExample: () =>
        DocsRoutes.buttonGroupSelectExampleRouteView(model),
      ButtonGroupPopoverExample: () =>
        DocsRoutes.buttonGroupPopoverExampleRouteView(model),
      ButtonGroupRtlExample: () =>
        DocsRoutes.buttonGroupRtlExampleRouteView(model),
      AlertDialogDocs: () => alertDialogDocsView(model),
      BaseUiAlertDialogBasicExample: () =>
        DocsRoutes.baseUiAlertDialogBasicExampleRouteView(model),
      BaseUiAlertDialogCloseConfirmationExample: () =>
        DocsRoutes.baseUiAlertDialogCloseConfirmationExampleRouteView(model),
      BaseUiAlertDialogControlledMultipleTriggersExample: () =>
        DocsRoutes.baseUiAlertDialogControlledMultipleTriggersExampleRouteView(
          model
        ),
      BaseUiAlertDialogOpenFromMenuExample: () =>
        DocsRoutes.baseUiAlertDialogOpenFromMenuExampleRouteView(model),
      BaseUiAlertDialogDetachedTriggersExample: () =>
        DocsRoutes.baseUiAlertDialogDetachedTriggersExampleRouteView(model),
      BaseUiAlertDialogMultipleTriggersExample: () =>
        DocsRoutes.baseUiAlertDialogMultipleTriggersExampleRouteView(model),
      BaseUiAlertDialogDocs: () =>
        baseUiLaneDocsView(model, {
          label: "Alert Dialog",
          source: "registry/default/ui/base-ui-alert-dialog",
          primitive: "Alert Dialog view helpers",
          description:
            "A Base UI style-lane Alert Dialog slice that reuses the existing alert-dialog anatomy for trigger, portal, backdrop, popup, title, description, and action buttons. The installable examples now cover the default Discard draft flow, menu-triggered flow, detached-trigger flow, multiple-trigger flow, controlled multiple-trigger flow, and Close confirmation nested-dialog flow.",
          usage:
            "Install the Base UI lane wrapper when you want Alert Dialog composition with Base UI naming and class hooks.",
          classHelpers: [
            "alertDialogTriggerClassName",
            "alertDialogPortalClassName",
            "alertDialogBackdropClassName",
            "alertDialogPopupClassName",
            "alertDialogTitleClassName",
            "alertDialogDescriptionClassName",
            "alertDialogActionsClassName",
          ],
          anatomyCode: `import * as AlertDialog from "./ui/base-ui-alert-dialog";

AlertDialog.rootView<Message>({
  children: [
    AlertDialog.triggerView({ onClick: OpenedDialog(), children: ["Delete"] }),
    AlertDialog.portalView({ open: model.open, children: [content] }),
  ],
});`,
          examples: [
            "base-ui-alert-dialog-basic",
            "base-ui-alert-dialog-open-from-menu",
            "base-ui-alert-dialog-controlled-multiple-triggers",
            "base-ui-alert-dialog-detached-triggers",
            "base-ui-alert-dialog-multiple-triggers",
            "base-ui-alert-dialog-close-confirmation",
          ],
        }),
      ShadcnAlertDialogDocs: () =>
        shadcnLaneDocsView(model, {
          label: "Alert Dialog",
          source: "registry/default/ui/shadcn-alert-dialog",
          primitive: "AlertDialog view helpers",
          description:
            "A shadcn style-lane Alert Dialog slice that reuses the existing alert-dialog anatomy for trigger, portal, backdrop, popup, title, description, and action buttons.",
          usage:
            "Install the shadcn lane wrapper when you want the existing Alert Dialog behavior with shadcn naming and style hooks.",
          classHelpers: [
            "shadcnAlertDialogTriggerClassName",
            "shadcnAlertDialogPortalClassName",
            "shadcnAlertDialogBackdropClassName",
            "shadcnAlertDialogPopupClassName",
            "shadcnAlertDialogTitleClassName",
            "shadcnAlertDialogDescriptionClassName",
            "shadcnAlertDialogActionsClassName",
          ],
          examples: [
            "shadcn-alert-dialog-basic",
            "shadcn-alert-dialog-small",
            "shadcn-alert-dialog-media",
            "shadcn-alert-dialog-small-media",
            "shadcn-alert-dialog-destructive",
            "shadcn-alert-dialog-rtl",
          ],
          anatomyCode: `import * as AlertDialog from "./ui/shadcn-alert-dialog";

AlertDialog.rootView<Message>({
  children: [
    AlertDialog.triggerView({ onClick: OpenedDialog(), children: ["Delete"] }),
    AlertDialog.portalView({ open: model.open, children: [content] }),
  ],
});`,
        }),
      AlertDialogBasicExample: () =>
        DocsRoutes.alertDialogBasicExampleRouteView(model),
      DrawerDocs: () => drawerDocsView(model),
      BaseUiDrawerDocs: () =>
        baseUiLaneDocsView(model, {
          label: "Drawer",
          source: "registry/default/ui/base-ui-drawer",
          primitive: "Drawer view helpers",
          description:
            "A Base UI style-lane Drawer slice that reuses the existing trigger, portal, backdrop, viewport, popup, content, title, description, and close helpers.",
          usage:
            "Install the Base UI lane wrapper when you want Drawer composition with Base UI naming and class hooks.",
          classHelpers: [
            "drawerTriggerClassName",
            "drawerPortalClassName",
            "drawerBackdropClassName",
            "drawerViewportClassName",
            "drawerPopupClassName",
            "drawerCloseClassName",
          ],
          examples: [
            "base-ui-drawer-basic",
            "base-ui-drawer-position",
            "base-ui-drawer-non-modal",
          ],
          anatomyCode: `import * as Drawer from "./ui/base-ui-drawer";

Drawer.rootView<Message>({
  children: [
    Drawer.triggerView({ onClick: ClickedOpen(), children: ["Open"] }),
    Drawer.portalView({ open: model.open, children: [content] }),
  ],
});`,
        }),
      BaseUiDrawerBasicExample: () =>
        DocsRoutes.baseUiDrawerBasicExampleRouteView(model),
      BaseUiDrawerPositionExample: () =>
        DocsRoutes.baseUiDrawerPositionExampleRouteView(model),
      BaseUiDrawerNonModalExample: () =>
        DocsRoutes.baseUiDrawerNonModalExampleRouteView(model),
      ShadcnDrawerDocs: () =>
        shadcnLaneDocsView(model, {
          label: "Drawer",
          source: "registry/default/ui/shadcn-drawer",
          primitive: "Drawer view helpers",
          description:
            "A shadcn style-lane Drawer slice that reuses the existing trigger, portal, backdrop, viewport, popup, content, title, description, and close helpers.",
          usage:
            "Install the shadcn lane wrapper when you want Drawer composition with shadcn naming and style hooks.",
          classHelpers: [
            "shadcnDrawerTriggerClassName",
            "shadcnDrawerPortalClassName",
            "shadcnDrawerBackdropClassName",
            "shadcnDrawerViewportClassName",
            "shadcnDrawerPopupClassName",
            "shadcnDrawerCloseClassName",
          ],
          examples: [
            "shadcn-drawer-basic",
            "shadcn-drawer-scrollable-content",
            "shadcn-drawer-sides",
            "shadcn-drawer-responsive-dialog",
            "shadcn-drawer-rtl",
          ],
          anatomyCode: `import * as Drawer from "./ui/shadcn-drawer";

Drawer.rootView<Message>({
  children: [
    Drawer.triggerView({ onClick: ClickedOpen(), children: ["Open"] }),
    Drawer.portalView({ open: model.open, children: [content] }),
  ],
});`,
        }),
      ShadcnDrawerScrollableContentExample: () =>
        DocsRoutes.shadcnDrawerScrollableContentExampleRouteView(model),
      ShadcnDrawerResponsiveDialogExample: () =>
        DocsRoutes.shadcnDrawerResponsiveDialogExampleRouteView(model),
      ShadcnDrawerRtlExample: () =>
        DocsRoutes.shadcnDrawerRtlExampleRouteView(model),
      ShadcnDrawerSidesExample: () =>
        DocsRoutes.shadcnDrawerSidesExampleRouteView(model),
      ShadcnDrawerBasicExample: () =>
        DocsRoutes.shadcnDrawerBasicExampleRouteView(model),
      DrawerBasicExample: () => DocsRoutes.drawerBasicExampleRouteView(model),
      ContextMenuDocs: () => contextMenuDocsView(model),
      BaseUiContextMenuDocs: () =>
        baseUiLaneDocsView(model, {
          label: "Context Menu",
          source: "registry/default/ui/base-ui-context-menu",
          primitive: "Context Menu view helpers",
          description:
            "A Base UI style-lane Context Menu slice that reuses the existing root, trigger, portal, backdrop, positioner, popup, item, and separator helpers.",
          usage:
            "Install the Base UI lane wrapper when you want Context Menu composition with Base UI naming and class hooks.",
          classHelpers: [
            "contextMenuTriggerClassName",
            "contextMenuPortalClassName",
            "contextMenuBackdropClassName",
            "contextMenuPositionerClassName",
            "contextMenuPopupClassName",
            "contextMenuItemClassName",
          ],
          anatomyCode: `import * as ContextMenu from "./ui/base-ui-context-menu";

ContextMenu.rootView<Message>({
  children: [
    ContextMenu.triggerView({ onOpen: ClickedOpen(), children: ["Open"] }),
    ContextMenu.portalView({ open: model.open, children: [menu] }),
  ],
});`,
          examples: [
            "base-ui-context-menu-basic",
            "base-ui-context-menu-nested",
          ],
        }),
      ShadcnContextMenuDocs: () =>
        shadcnLaneDocsView(model, {
          label: "Context Menu",
          source: "registry/default/ui/shadcn-context-menu",
          primitive: "Context Menu view helpers",
          description:
            "A shadcn style-lane Context Menu slice that reuses the existing root, trigger, portal, backdrop, positioner, popup, item, and separator helpers.",
          usage:
            "Install the shadcn lane wrapper when you want Context Menu composition with shadcn naming and style hooks.",
          classHelpers: [
            "shadcnContextMenuTriggerClassName",
            "shadcnContextMenuPortalClassName",
            "shadcnContextMenuBackdropClassName",
            "shadcnContextMenuPositionerClassName",
            "shadcnContextMenuPopupClassName",
            "shadcnContextMenuItemClassName",
          ],
          examples: ["shadcn-context-menu-basic"],
          anatomyCode: `import * as ContextMenu from "./ui/shadcn-context-menu";

ContextMenu.rootView<Message>({
  children: [
    ContextMenu.triggerView({ onOpen: ClickedOpen(), children: ["Open"] }),
    ContextMenu.portalView({ open: model.open, children: [menu] }),
  ],
});`,
        }),
      BaseUiContextMenuBasicExample: () =>
        DocsRoutes.baseUiContextMenuBasicExampleRouteView(model),
      BaseUiContextMenuNestedExample: () =>
        DocsRoutes.baseUiContextMenuNestedExampleRouteView(model),
      ContextMenuBasicExample: () =>
        DocsRoutes.contextMenuBasicExampleRouteView(model),
      MenubarDocs: () => menubarDocsView(model),
      BaseUiMenubarDocs: () =>
        baseUiLaneDocsView(model, {
          label: "Menubar",
          source: "registry/default/ui/base-ui-menubar",
          primitive: "Menubar view helpers",
          description:
            "A Base UI style-lane Menubar slice that reuses the existing root, menu, trigger, popup, item, and separator helpers.",
          usage:
            "Install the Base UI lane wrapper when you want Menubar composition with Base UI naming and class hooks.",
          classHelpers: [
            "menubarRootClassName",
            "menubarMenuClassName",
            "menubarTriggerClassName",
            "menubarPopupClassName",
            "menubarItemClassName",
            "menubarSeparatorClassName",
          ],
          examples: ["base-ui-menubar-basic"],
          anatomyCode: `import * as Menubar from "./ui/base-ui-menubar";

Menubar.rootView<Message>({
  children: [
    Menubar.menuView({
      children: [
        Menubar.triggerView({ open: model.open, onToggle: ClickedToggle(), children: ["File"] }),
        Menubar.popupView({ open: model.open, children: [Menubar.itemView({ children: ["New"] })] }),
      ],
    }),
  ],
});`,
        }),
      BaseUiMenubarBasicExample: () =>
        DocsRoutes.baseUiMenubarBasicExampleRouteView(model),
      ShadcnMenubarDocs: () =>
        shadcnLaneDocsView(model, {
          label: "Menubar",
          source: "registry/default/ui/shadcn-menubar",
          primitive: "Menubar view helpers",
          description:
            "A shadcn style-lane Menubar slice that reuses the existing root, menu, trigger, popup, item, and separator helpers.",
          usage:
            "Install the shadcn lane wrapper when you want Menubar composition with shadcn naming and style hooks.",
          classHelpers: [
            "shadcnMenubarRootClassName",
            "shadcnMenubarMenuClassName",
            "shadcnMenubarTriggerClassName",
            "shadcnMenubarPopupClassName",
            "shadcnMenubarItemClassName",
            "shadcnMenubarSeparatorClassName",
          ],
          examples: ["shadcn-menubar-basic"],
          anatomyCode: `import * as Menubar from "./ui/shadcn-menubar";

Menubar.rootView<Message>({
  children: [
    Menubar.menuView({
      children: [
        Menubar.triggerView({ open: model.open, onToggle: ClickedToggle(), children: ["File"] }),
        Menubar.popupView({ open: model.open, children: [Menubar.itemView({ children: ["New"] })] }),
      ],
    }),
  ],
});`,
        }),
      MenubarBasicExample: () => DocsRoutes.menubarBasicExampleRouteView(model),
      NavigationMenuDocs: () => navigationMenuDocsView(model),
      BaseUiNavigationMenuDocs: () =>
        baseUiLaneDocsView(model, {
          label: "Navigation Menu",
          source: "registry/default/ui/base-ui-navigation-menu",
          primitive: "Navigation Menu view helpers",
          description:
            "A Base UI style-lane Navigation Menu slice that reuses the existing root, list, item, trigger, link, portal, positioner, popup, viewport, content, and arrow helpers.",
          usage:
            "Install the Base UI lane wrapper when you want Navigation Menu composition with Base UI naming and class hooks.",
          classHelpers: [
            "navigationMenuRootClassName",
            "navigationMenuListClassName",
            "navigationMenuTriggerClassName",
            "navigationMenuLinkClassName",
            "navigationMenuPopupClassName",
            "navigationMenuViewportClassName",
          ],
          examples: ["base-ui-navigation-menu-basic"],
          anatomyCode: `import * as NavigationMenu from "./ui/base-ui-navigation-menu";

NavigationMenu.rootView<Message>({
  children: [
    NavigationMenu.listView({
      children: [
        NavigationMenu.triggerView({ open: model.open, onToggle: ClickedToggle(), children: ["Components"] }),
        NavigationMenu.portalView({ open: model.open, children: [NavigationMenu.popupView({ children: [content] })] }),
      ],
    }),
  ],
});`,
        }),
      BaseUiNavigationMenuBasicExample: () =>
        DocsRoutes.baseUiNavigationMenuBasicExampleRouteView(model),
      ShadcnNavigationMenuDocs: () =>
        shadcnLaneDocsView(model, {
          label: "Navigation Menu",
          source: "registry/default/ui/shadcn-navigation-menu",
          primitive: "Navigation Menu view helpers",
          description:
            "A shadcn style-lane Navigation Menu slice that reuses the existing root, list, item, trigger, link, portal, positioner, popup, viewport, content, and arrow helpers.",
          usage:
            "Install the shadcn lane wrapper when you want Navigation Menu composition with shadcn naming and style hooks.",
          classHelpers: [
            "shadcnNavigationMenuRootClassName",
            "shadcnNavigationMenuListClassName",
            "shadcnNavigationMenuTriggerClassName",
            "shadcnNavigationMenuLinkClassName",
            "shadcnNavigationMenuPopupClassName",
            "shadcnNavigationMenuViewportClassName",
          ],
          examples: ["shadcn-navigation-menu-basic"],
          anatomyCode: `import * as NavigationMenu from "./ui/shadcn-navigation-menu";

NavigationMenu.rootView<Message>({
  children: [
    NavigationMenu.listView({
      children: [
        NavigationMenu.triggerView({ open: model.open, onToggle: ClickedToggle(), children: ["Components"] }),
        NavigationMenu.portalView({ open: model.open, children: [NavigationMenu.popupView({ children: [content] })] }),
      ],
    }),
  ],
});`,
        }),
      NavigationMenuBasicExample: () =>
        DocsRoutes.navigationMenuBasicExampleRouteView(model),
      OtpFieldDocs: () => otpFieldDocsView(model),
      BaseUiOtpFieldDocs: () =>
        baseUiLaneDocsView(model, {
          label: "OTP Field",
          source: "registry/default/ui/base-ui-otp-field",
          primitive: "OTP Field view helpers",
          description:
            "A Base UI style-lane OTP Field slice that reuses the existing root, input group, input, and separator helpers.",
          usage:
            "Install the Base UI lane wrapper when you want OTP Field composition with Base UI naming and class hooks.",
          classHelpers: [
            "otpFieldRootClassName",
            "otpFieldInputGroupClassName",
            "otpFieldInputClassName",
            "otpFieldSeparatorClassName",
          ],
          examples: ["base-ui-otp-field-basic"],
          anatomyCode: `import * as OtpField from "./ui/base-ui-otp-field";

OtpField.rootView<Message>({
  children: [
    OtpField.inputGroupView({ children: inputs }),
    OtpField.separatorView({}),
  ],
});`,
        }),
      BaseUiOtpFieldBasicExample: () =>
        DocsRoutes.baseUiOtpFieldBasicExampleRouteView(model),
      OtpFieldBasicExample: () =>
        DocsRoutes.otpFieldBasicExampleRouteView(model),
      PreviewCardDocs: () => previewCardDocsView(model),
      BaseUiPreviewCardDocs: () =>
        baseUiLaneDocsView(model, {
          label: "Preview Card",
          source: "registry/default/ui/base-ui-preview-card",
          primitive: "Preview Card view helpers",
          description:
            "A Base UI style-lane Preview Card slice that reuses the existing root, trigger, portal, backdrop, positioner, popup, viewport, and arrow helpers.",
          usage:
            "Install the Base UI lane wrapper when you want Preview Card composition with Base UI naming and class hooks.",
          classHelpers: [
            "previewCardRootClassName",
            "previewCardTriggerClassName",
            "previewCardPortalClassName",
            "previewCardPositionerClassName",
            "previewCardPopupClassName",
            "previewCardViewportClassName",
          ],
          examples: ["base-ui-preview-card-basic"],
          anatomyCode: `import * as PreviewCard from "./ui/base-ui-preview-card";

PreviewCard.rootView<Message>({
  children: [
    PreviewCard.triggerView({ onOpen: OpenedPreview(), children: ["Preview"] }),
    PreviewCard.portalView({ open: model.open, children: [card] }),
  ],
});`,
        }),
      BaseUiPreviewCardBasicExample: () =>
        DocsRoutes.baseUiPreviewCardBasicExampleRouteView(model),
      PreviewCardBasicExample: () =>
        DocsRoutes.previewCardBasicExampleRouteView(model),
      CollapsibleDocs: () => collapsibleDocsView(model),
      BaseUiCollapsibleBasicExample: () =>
        DocsRoutes.baseUiCollapsibleBasicExampleRouteView(model),
      BaseUiCollapsibleDocs: () =>
        baseUiLaneDocsView(model, {
          label: "Collapsible",
          source: "registry/default/ui/base-ui-collapsible",
          primitive: "Collapsible view helpers",
          description:
            "A Base UI style-lane Collapsible slice with a Basic example matching the origin Recovery keys trigger and key list.",
          usage:
            "Install the Base UI lane wrapper when you want controlled Collapsible behavior with Base UI naming, class hooks, and origin-matched example content.",
          classHelpers: [
            "collapsibleRootClassName",
            "collapsibleTriggerClassName",
            "collapsibleIconClassName",
            "collapsiblePanelClassName",
            "collapsibleContentClassName",
          ],
          examples: ["base-ui-collapsible-basic"],
          anatomyCode: `import * as Collapsible from "./ui/base-ui-collapsible";

Collapsible.rootView<Message>({
  open: model.open,
  children,
});`,
        }),
      ShadcnCollapsibleDocs: () =>
        shadcnLaneDocsView(model, {
          label: "Collapsible",
          source: "registry/default/ui/shadcn-collapsible",
          primitive: "Collapsible view helpers",
          description:
            "A shadcn style-lane Collapsible slice that reuses the existing controlled open-state root, trigger, panel, and content helpers.",
          usage:
            "Install the shadcn lane wrapper when you want controlled Collapsible behavior with shadcn naming and style hooks.",
          classHelpers: [
            "shadcnCollapsibleRootClassName",
            "shadcnCollapsibleTriggerClassName",
            "shadcnCollapsibleIconClassName",
            "shadcnCollapsiblePanelClassName",
            "shadcnCollapsibleContentClassName",
          ],
          examples: ["shadcn-collapsible-basic"],
          anatomyCode: `import * as Collapsible from "./ui/shadcn-collapsible";

Collapsible.rootView<Message>({
  open: model.open,
  children: [
    Collapsible.triggerView({ open: model.open, onOpenChange: ToggledOpen(), children }),
    Collapsible.panelView({ open: model.open, children: [content] }),
  ],
});`,
        }),
      CollapsibleBasicExample: () =>
        DocsRoutes.collapsibleBasicExampleRouteView(model),
      FieldDocs: () => fieldDocsView(model),
      BaseUiFieldDocs: () =>
        baseUiLaneDocsView(model, {
          label: "Field",
          source: "registry/default/ui/base-ui-field",
          primitive: "Field view helpers",
          description:
            "A Base UI style-lane Field slice that reuses the existing root, label, control, description, error, item, and validity helpers.",
          usage:
            "Install the Base UI lane wrapper when you want Field composition with Base UI naming and class hooks.",
          classHelpers: [
            "fieldRootClassName",
            "fieldLabelClassName",
            "fieldControlClassName",
            "fieldDescriptionClassName",
            "fieldErrorClassName",
            "fieldValidityClassName",
          ],
          examples: ["base-ui-field-basic"],
          anatomyCode: `import * as Field from "./ui/base-ui-field";

Field.rootView<Message>({
  children: [
    Field.labelView({ forId: "email", children: ["Email"] }),
    Field.controlView({ id: "email", value: model.email, onInput: UpdatedEmail }),
    Field.descriptionView({ children: ["Use your work email."] }),
  ],
});`,
        }),
      BaseUiFieldBasicExample: () =>
        DocsRoutes.baseUiFieldBasicExampleRouteView(model),
      ShadcnFieldDocs: () =>
        shadcnLaneDocsView(model, {
          label: "Field",
          source: "registry/default/ui/shadcn-field",
          primitive: "Field view helpers",
          description:
            "A shadcn style-lane Field slice that reuses the existing root, label, control, description, error, item, and validity helpers.",
          usage:
            "Install the shadcn lane wrapper when you want Field composition with shadcn naming and style hooks.",
          classHelpers: [
            "shadcnFieldRootClassName",
            "shadcnFieldLabelClassName",
            "shadcnFieldControlClassName",
            "shadcnFieldDescriptionClassName",
            "shadcnFieldErrorClassName",
            "shadcnFieldValidityClassName",
          ],
          examples: ["shadcn-field-basic"],
          anatomyCode: `import * as Field from "./ui/shadcn-field";

Field.rootView<Message>({
  children: [
    Field.labelView({ forId: "email", children: ["Email"] }),
    Field.controlView({ id: "email", value: model.email, onInput: UpdatedEmail }),
    Field.descriptionView({ children: ["Use your work email."] }),
  ],
});`,
        }),
      FieldBasicExample: () => DocsRoutes.fieldBasicExampleRouteView(model),
      NumberFieldDocs: () => numberFieldDocsView(model),
      BaseUiNumberFieldDocs: () =>
        baseUiLaneDocsView(model, {
          label: "Number Field",
          source: "registry/default/ui/base-ui-number-field",
          primitive: "Number Field view helpers",
          description:
            "A Base UI style-lane Number Field slice that reuses the existing root, scrub area, group, button, and input helpers.",
          usage:
            "Install the Base UI lane wrapper when you want Number Field composition with Base UI naming and class hooks.",
          classHelpers: [
            "numberFieldRootClassName",
            "numberFieldScrubAreaClassName",
            "numberFieldGroupClassName",
            "numberFieldButtonClassName",
            "numberFieldInputClassName",
          ],
          examples: ["base-ui-number-field-basic"],
          anatomyCode: `import * as NumberField from "./ui/base-ui-number-field";

NumberField.rootView<Message>({
  children: [
    NumberField.scrubAreaView({ children: ["Amount"] }),
    NumberField.groupView({ children: [decrement, input, increment] }),
  ],
});`,
        }),
      BaseUiNumberFieldBasicExample: () =>
        DocsRoutes.baseUiNumberFieldBasicExampleRouteView(model),
      NumberFieldBasicExample: () =>
        DocsRoutes.numberFieldBasicExampleRouteView(model),
      FormDocs: () => formDocsView(model),
      BaseUiFormDocs: () =>
        baseUiLaneDocsView(model, {
          label: "Form",
          source: "registry/default/ui/base-ui-form",
          primitive: "Form view helpers",
          description:
            "A Base UI style-lane Form slice that reuses the existing root, field, label, control, error, and submit helpers.",
          usage:
            "Install the Base UI lane wrapper when you want Form composition with Base UI naming and class hooks.",
          classHelpers: [
            "formRootClassName",
            "formFieldClassName",
            "formLabelClassName",
            "formControlClassName",
            "formErrorClassName",
            "formSubmitClassName",
          ],
          examples: [
            "base-ui-form-basic",
            "base-ui-form-schema-validation",
            "base-ui-form-server-function",
          ],
          anatomyCode: `import * as Form from "./ui/base-ui-form";

Form.rootView<Message>({
  onSubmit: SubmittedForm(),
  children: [
    Form.fieldView({ children: [label, control, error] }),
    Form.submitView({ children: ["Submit"] }),
  ],
});`,
        }),
      BaseUiFormBasicExample: () =>
        DocsRoutes.baseUiFormBasicExampleRouteView(model),
      BaseUiFormSchemaValidationExample: () =>
        DocsRoutes.baseUiFormSchemaValidationExampleRouteView(model),
      BaseUiFormServerFunctionExample: () =>
        DocsRoutes.baseUiFormServerFunctionExampleRouteView(model),
      FormBasicExample: () => DocsRoutes.formBasicExampleRouteView(model),
      AutocompleteDocs: () => autocompleteDocsView(model),
      BaseUiAutocompleteDocs: () =>
        baseUiLaneDocsView(model, {
          label: "Autocomplete",
          source: "registry/default/ui/base-ui-autocomplete",
          primitive: "Autocomplete view helpers",
          description:
            "A Base UI style-lane Autocomplete slice that reuses the existing input, listbox, option, empty-state, and label helpers. The installable Basic example matches the origin Search tags demo, including the e.g. feature placeholder and No tags found empty state. The current origin page documents Clear as an API part but does not publish a separate clear-button example section.",
          usage:
            "Install the Base UI lane wrapper when you want Autocomplete composition with Base UI naming and class hooks.",
          classHelpers: [
            "autocompleteRootClassName",
            "autocompleteLabelClassName",
            "autocompleteInputClassName",
            "autocompleteListClassName",
            "autocompleteItemClassName",
            "autocompleteEmptyClassName",
          ],
          anatomyCode: `import * as Autocomplete from "./ui/base-ui-autocomplete";

Autocomplete.rootView<Message>({
  children: [
    Autocomplete.inputView({ id, value, onInput, ariaLabel }),
    Autocomplete.listView({ id: listId, children: options }),
  ],
});`,
          examples: ["base-ui-autocomplete-basic"],
        }),
      AutocompleteBasicExample: () =>
        DocsRoutes.autocompleteBasicExampleRouteView(model),
      BaseUiAutocompleteBasicExample: () =>
        DocsRoutes.baseUiAutocompleteBasicExampleRouteView(model),
      Avatar: () => embedUi("ui-avatar", View.avatar),
      AvatarDocs: () => avatarDocsView(model),
      BaseUiAvatarDocs: () =>
        baseUiLaneDocsView(model, {
          label: "Avatar",
          source: "registry/default/ui/base-ui-avatar",
          primitive: "Avatar view helpers",
          description:
            "A Base UI style-lane Avatar slice that reuses the existing root, image, fallback, badge, group, and count helpers. The installable Basic example matches the origin two-avatar demo with the Unsplash image plus LT fallback and the fallback-only LT avatar.",
          usage:
            "Install the Base UI lane wrapper when you want Avatar composition with Base UI naming and class hooks.",
          classHelpers: [
            "avatarBaseClassName",
            "avatarImageClassName",
            "avatarFallbackClassName",
            "avatarBadgeClassName",
            "avatarGroupClassName",
            "avatarGroupCountClassName",
          ],
          anatomyCode: `import * as Avatar from "./ui/base-ui-avatar";

Avatar.view<Message>({
  fallback: "LT",
  src,
  alt: "Lena Taylor",
});`,
          examples: ["base-ui-avatar-basic"],
        }),
      BaseUiAvatarBasicExample: () =>
        DocsRoutes.baseUiAvatarBasicExampleRouteView(model),
      ShadcnAvatarDocs: () =>
        shadcnLaneDocsView(model, {
          label: "Avatar",
          source: "registry/default/ui/shadcn-avatar",
          primitive: "Avatar view helpers",
          description:
            "A shadcn style-lane Avatar slice that reuses existing image, fallback, root, group, and count helpers.",
          usage:
            "Install the shadcn lane wrapper when you want Avatar composition with shadcn naming and style hooks.",
          classHelpers: [
            "shadcnAvatarBaseClassName",
            "shadcnAvatarBadgeClassName",
            "shadcnAvatarImageClassName",
            "shadcnAvatarFallbackClassName",
            "shadcnAvatarGroupClassName",
            "shadcnAvatarGroupCountClassName",
          ],
          examples: [
            "shadcn-avatar-basic",
            "shadcn-avatar-badge",
            "shadcn-avatar-badge-icon",
            "shadcn-avatar-group",
            "shadcn-avatar-group-count",
            "shadcn-avatar-group-icon",
            "shadcn-avatar-sizes",
            "shadcn-avatar-dropdown",
          ],
          anatomyCode: `import * as Avatar from "./ui/shadcn-avatar";

Avatar.view<Message>({
  src: "/avatar.png",
  alt: "Ada Lovelace",
  fallback: "AL",
});`,
        }),
      AvatarBasicExample: () => DocsRoutes.avatarBasicExampleRouteView(model),
      Badge: () => embedUi("ui-badge", View.badge),
      BadgeDocs: () => badgeDocsView(model),
      BadgeBasicExample: () => DocsRoutes.badgeBasicExampleRouteView(model),
      BadgeSpinnerExample: () => DocsRoutes.badgeSpinnerExampleRouteView(model),
      BadgeIconExample: () => DocsRoutes.badgeIconExampleRouteView(),
      BadgeLinkExample: () => DocsRoutes.badgeLinkExampleRouteView(),
      BadgeCustomColorsExample: () =>
        DocsRoutes.badgeCustomColorsExampleRouteView(),
      BadgeRtlExample: () => DocsRoutes.badgeRtlExampleRouteView(),
      CarouselDocs: () => carouselDocsView(model),
      ShadcnCarouselDocs: () => carouselDocsView(model),
      CarouselBasicExample: () =>
        DocsRoutes.carouselBasicExampleRouteView(model),
      CarouselSizesExample: () =>
        DocsRoutes.carouselSizesExampleRouteView(model),
      CarouselSpacingExample: () =>
        DocsRoutes.carouselSpacingExampleRouteView(model),
      CarouselOrientationExample: () =>
        DocsRoutes.carouselOrientationExampleRouteView(model),
      CarouselApiExample: () => DocsRoutes.carouselApiExampleRouteView(model),
      CarouselAutoplayExample: () =>
        DocsRoutes.carouselAutoplayExampleRouteView(model),
      CarouselRtlExample: () => DocsRoutes.carouselRtlExampleRouteView(model),
      ChartDocs: () => chartDocsView(model),
      ChartBasicExample: () => DocsRoutes.chartBasicExampleRouteView(model),
      ChartGridExample: () => DocsRoutes.chartGridExampleRouteView(model),
      ChartAxisExample: () => DocsRoutes.chartAxisExampleRouteView(model),
      ChartTooltipExample: () => DocsRoutes.chartTooltipExampleRouteView(model),
      ChartLegendExample: () => DocsRoutes.chartLegendExampleRouteView(model),
      ChartRtlExample: () => DocsRoutes.chartRtlExampleRouteView(model),
      DataTableDocs: () => dataTableDocsView(model),
      DataTableBasicExample: () =>
        DocsRoutes.dataTableBasicExampleRouteView(model),
      DataTableRowActionsExample: () =>
        DocsRoutes.dataTableRowActionsExampleRouteView(model),
      DataTablePaginationExample: () =>
        DocsRoutes.dataTablePaginationExampleRouteView(model),
      DataTableSortingExample: () =>
        DocsRoutes.dataTableSortingExampleRouteView(model),
      DataTableFilteringExample: () =>
        DocsRoutes.dataTableFilteringExampleRouteView(model),
      DataTableVisibilityExample: () =>
        DocsRoutes.dataTableVisibilityExampleRouteView(model),
      DataTableRowSelectionExample: () =>
        DocsRoutes.dataTableRowSelectionExampleRouteView(model),
      DirectionDocs: () => directionDocsView(model),
      DirectionBasicExample: () =>
        DocsRoutes.directionBasicExampleRouteView(model),
      ItemDocs: () => itemDocsView(model),
      ItemAvatarExample: () => DocsRoutes.itemAvatarExampleRouteView(model),
      ItemBasicExample: () => DocsRoutes.itemBasicExampleRouteView(model),
      ItemGroupExample: () => DocsRoutes.itemGroupExampleRouteView(model),
      ItemHeaderExample: () => DocsRoutes.itemHeaderExampleRouteView(model),
      ItemIconExample: () => DocsRoutes.itemIconExampleRouteView(model),
      ItemImageExample: () => DocsRoutes.itemImageExampleRouteView(model),
      ItemLinkExample: () => DocsRoutes.itemLinkExampleRouteView(model),
      ItemDropdownExample: () => DocsRoutes.itemDropdownExampleRouteView(model),
      ItemRtlExample: () => DocsRoutes.itemRtlExampleRouteView(model),
      ItemSizeExample: () => DocsRoutes.itemSizeExampleRouteView(model),
      ItemVariantExample: () => DocsRoutes.itemVariantExampleRouteView(model),
      LabelDocs: () => labelDocsView(model),
      LabelBasicExample: () => DocsRoutes.labelBasicExampleRouteView(model),
      LabelFieldExample: () => DocsRoutes.labelFieldExampleRouteView(model),
      LabelRtlExample: () => DocsRoutes.labelRtlExampleRouteView(model),
      PaginationDocs: () => paginationDocsView(model),
      PaginationBasicExample: () =>
        DocsRoutes.paginationBasicExampleRouteView(model),
      PaginationSimpleExample: () =>
        DocsRoutes.paginationSimpleExampleRouteView(model),
      PaginationIconsOnlyExample: () =>
        DocsRoutes.paginationIconsOnlyExampleRouteView(model),
      PaginationRtlExample: () =>
        DocsRoutes.paginationRtlExampleRouteView(model),
      ResizableDocs: () => resizableDocsView(model),
      ResizableBasicExample: () =>
        DocsRoutes.resizableBasicExampleRouteView(model),
      ResizableHandleExample: () =>
        DocsRoutes.resizableHandleExampleRouteView(model),
      ResizableRtlExample: () =>
        DocsRoutes.resizableRtlExampleRouteView(model),
      ResizableVerticalExample: () =>
        DocsRoutes.resizableVerticalExampleRouteView(model),
      SidebarDocs: () => sidebarDocsView(model),
      SidebarBasicExample: () => DocsRoutes.sidebarBasicExampleRouteView(model),
      SidebarCompositionExample: () =>
        DocsRoutes.sidebarCompositionExampleRouteView(model),
      SidebarControlledExample: () =>
        DocsRoutes.sidebarControlledExampleRouteView(model),
      SidebarRtlExample: () => DocsRoutes.sidebarRtlExampleRouteView(model),
      SidebarVariantsExample: () =>
        DocsRoutes.sidebarVariantsExampleRouteView(model),
      TableDocs: () => tableDocsView(model),
      TableBasicExample: () => DocsRoutes.tableBasicExampleRouteView(model),
      CommandDocs: () => commandDocsView(model),
      CommandBasicExample: () => DocsRoutes.commandBasicExampleRouteView(model),
      CommandGroupsExample: () =>
        DocsRoutes.commandGroupsExampleRouteView(model),
      CommandRtlExample: () => DocsRoutes.commandRtlExampleRouteView(model),
      CommandScrollableExample: () =>
        DocsRoutes.commandScrollableExampleRouteView(model),
      CommandShortcutsExample: () =>
        DocsRoutes.commandShortcutsExampleRouteView(model),
      DropdownMenuDocs: () => dropdownMenuDocsView(model),
      DropdownMenuBasicExample: () =>
        DocsRoutes.dropdownMenuBasicExampleRouteView(model),
      DropdownMenuCheckboxesExample: () =>
        DocsRoutes.dropdownMenuCheckboxesExampleRouteView(model),
      DropdownMenuComplexExample: () =>
        DocsRoutes.dropdownMenuComplexExampleRouteView(model),
      DropdownMenuDestructiveExample: () =>
        DocsRoutes.dropdownMenuDestructiveExampleRouteView(model),
      DropdownMenuIconsExample: () =>
        DocsRoutes.dropdownMenuIconsExampleRouteView(model),
      DropdownMenuRadioGroupExample: () =>
        DocsRoutes.dropdownMenuRadioGroupExampleRouteView(model),
      DropdownMenuRtlExample: () =>
        DocsRoutes.dropdownMenuRtlExampleRouteView(model),
      DropdownMenuShortcutsExample: () =>
        DocsRoutes.dropdownMenuShortcutsExampleRouteView(model),
      DropdownMenuSubmenuExample: () =>
        DocsRoutes.dropdownMenuSubmenuExampleRouteView(model),
      HoverCardDocs: () => hoverCardDocsView(model),
      HoverCardBasicExample: () =>
        DocsRoutes.hoverCardBasicExampleRouteView(model),
      HoverCardSidesExample: () =>
        DocsRoutes.hoverCardSidesExampleRouteView(model),
      HoverCardRtlExample: () =>
        DocsRoutes.hoverCardRtlExampleRouteView(model),
      InputOtpDocs: () => inputOtpDocsView(model),
      InputOtpBasicExample: () =>
        DocsRoutes.inputOtpBasicExampleRouteView(model),
      InputOtpPatternExample: () =>
        DocsRoutes.inputOtpPatternExampleRouteView(model),
      InputOtpSeparatorExample: () =>
        DocsRoutes.inputOtpSeparatorExampleRouteView(model),
      InputOtpDisabledExample: () =>
        DocsRoutes.inputOtpDisabledExampleRouteView(model),
      InputOtpControlledExample: () =>
        DocsRoutes.inputOtpControlledExampleRouteView(model),
      InputOtpInvalidExample: () =>
        DocsRoutes.inputOtpInvalidExampleRouteView(model),
      InputOtpFourDigitsExample: () =>
        DocsRoutes.inputOtpFourDigitsExampleRouteView(model),
      InputOtpAlphanumericExample: () =>
        DocsRoutes.inputOtpAlphanumericExampleRouteView(model),
      InputOtpFormExample: () => DocsRoutes.inputOtpFormExampleRouteView(model),
      InputOtpRtlExample: () => DocsRoutes.inputOtpRtlExampleRouteView(model),
      NativeSelectDocs: () => nativeSelectDocsView(model),
      NativeSelectBasicExample: () =>
        DocsRoutes.nativeSelectBasicExampleRouteView(model),
      NativeSelectDisabledExample: () =>
        DocsRoutes.nativeSelectDisabledExampleRouteView(model),
      NativeSelectGroupsExample: () =>
        DocsRoutes.nativeSelectGroupsExampleRouteView(model),
      NativeSelectInvalidExample: () =>
        DocsRoutes.nativeSelectInvalidExampleRouteView(model),
      NativeSelectRtlExample: () =>
        DocsRoutes.nativeSelectRtlExampleRouteView(model),
      SheetDocs: () => sheetDocsView(model),
      SheetBasicExample: () => DocsRoutes.sheetBasicExampleRouteView(model),
      SonnerDocs: () => sonnerDocsView(model),
      SonnerBasicExample: () => DocsRoutes.sonnerBasicExampleRouteView(model),
      Card: () => embedUi("ui-card", View.card),
      CardDocs: () => cardDocsView(model),
      ShadcnCardDocs: () => cardDocsView(model),
      CardBasicExample: () => DocsRoutes.cardBasicExampleRouteView(model),
      CardSizeExample: () => DocsRoutes.cardSizeExampleRouteView(model),
      CardSpacingExample: () => DocsRoutes.cardSpacingExampleRouteView(model),
      CardImageExample: () => DocsRoutes.cardImageExampleRouteView(model),
      CardRtlExample: () => DocsRoutes.cardRtlExampleRouteView(model),
      Separator: () => embedUi("ui-separator", View.separator),
      SeparatorDocs: () => separatorDocsView(model),
      BaseUiSeparatorDocs: () =>
        baseUiLaneDocsView(model, {
          label: "Separator",
          source: "registry/default/ui/base-ui-separator",
          primitive: "Separator view helpers",
          description:
            "A Base UI style-lane Separator slice that reuses the existing accessible orientation-aware separator helper.",
          usage:
            "Install the Base UI lane wrapper when you want Separator composition with Base UI naming and class hooks.",
          classHelpers: [
            "separatorBaseClassName",
            "horizontalSeparatorClassName",
            "verticalSeparatorClassName",
            "separatorClassNameByOrientation",
          ],
          examples: ["base-ui-separator-basic"],
          anatomyCode: `import * as Separator from "./ui/base-ui-separator";

Separator.view<Message>({ orientation: "horizontal" });`,
        }),
      ShadcnSeparatorDocs: () =>
        shadcnLaneDocsView(model, {
          label: "Separator",
          source: "registry/default/ui/shadcn-separator",
          primitive: "Separator view helpers",
          description:
            "A shadcn style-lane Separator slice that reuses the existing accessible orientation-aware separator helper.",
          usage:
            "Install the shadcn lane wrapper when you want Separator composition with shadcn naming and style hooks.",
          classHelpers: [
            "shadcnSeparatorBaseClassName",
            "shadcnHorizontalSeparatorClassName",
            "shadcnVerticalSeparatorClassName",
            "shadcnSeparatorClassNameByOrientation",
          ],
          examples: ["shadcn-separator-basic"],
          anatomyCode: `import * as Separator from "./ui/shadcn-separator";

Separator.view<Message>({ orientation: "horizontal" });`,
        }),
      BaseUiSeparatorBasicExample: () =>
        DocsRoutes.baseUiSeparatorBasicExampleRouteView(model),
      SeparatorBasicExample: () =>
        DocsRoutes.separatorBasicExampleRouteView(model),
      Skeleton: () => embedUi("ui-skeleton", View.skeleton),
      SkeletonDocs: () => skeletonDocsView(model),
      SkeletonBasicExample: () =>
        DocsRoutes.skeletonBasicExampleRouteView(model),
      Spinner: () => embedUi("ui-spinner", View.spinner),
      SpinnerDocs: () => spinnerDocsView(model),
      SpinnerBasicExample: () => DocsRoutes.spinnerBasicExampleRouteView(model),
      Kbd: () => embedUi("ui-kbd", View.kbd),
      KbdDocs: () => kbdDocsView(model),
      KbdBasicExample: () => DocsRoutes.kbdBasicExampleRouteView(model),
      KbdInputGroupExample: () =>
        DocsRoutes.kbdInputGroupExampleRouteView(model),
      KbdRtlExample: () => DocsRoutes.kbdRtlExampleRouteView(model),
      Typography: () => embedUi("ui-typography", View.typography),
      TypographyDocs: () => typographyDocsView(model),
      TypographyBasicExample: () =>
        DocsRoutes.typographyBasicExampleRouteView(model),
      Empty: () => embedUi("ui-empty", View.empty),
      EmptyDocs: () => emptyDocsView(model),
      EmptyAvatarExample: () =>
        DocsRoutes.emptyAvatarExampleRouteView(model),
      EmptyAvatarGroupExample: () =>
        DocsRoutes.emptyAvatarGroupExampleRouteView(model),
      EmptyBackgroundExample: () =>
        DocsRoutes.emptyBackgroundExampleRouteView(model),
      EmptyBasicExample: () => DocsRoutes.emptyBasicExampleRouteView(model),
      EmptyInputGroupExample: () =>
        DocsRoutes.emptyInputGroupExampleRouteView(model),
      EmptyOutlineExample: () =>
        DocsRoutes.emptyOutlineExampleRouteView(model),
      EmptyRtlExample: () => DocsRoutes.emptyRtlExampleRouteView(model),
      InputGroup: () => embedUi("ui-input-group", View.inputGroup),
      InputGroupDocs: () => inputGroupDocsView(model),
      InputGroupAlignExample: () =>
        DocsRoutes.inputGroupAlignExampleRouteView(),
      InputGroupButtonExample: () =>
        DocsRoutes.inputGroupButtonExampleRouteView(),
      InputGroupCustomInputExample: () =>
        DocsRoutes.inputGroupCustomInputExampleRouteView(),
      InputGroupDropdownExample: () =>
        DocsRoutes.inputGroupDropdownExampleRouteView(),
      InputGroupIconExample: () =>
        DocsRoutes.inputGroupIconExampleRouteView(),
      InputGroupRtlExample: () => DocsRoutes.inputGroupRtlExampleRouteView(),
      InputGroupSpinnerExample: () =>
        DocsRoutes.inputGroupSpinnerExampleRouteView(),
      InputGroupTextExample: () => DocsRoutes.inputGroupTextExampleRouteView(),
      InputGroupTextareaExample: () =>
        DocsRoutes.inputGroupTextareaExampleRouteView(),
      Button: () => embedUi("ui-button", View.button),
      ButtonDocs: () => buttonDocsView(model),
      BaseUiButtonDocs: () => baseUiButtonDocsView(model),
      ShadcnButtonDocs: () =>
        shadcnLaneDocsView(model, {
          label: "Button",
          source: "registry/default/ui/shadcn-button",
          primitive: "Ui.Button",
          description:
            "A shadcn style-lane Button slice that reuses the official Foldkit Ui.Button primitive for native button behavior while exposing opinionated shadcn class helpers.",
          usage:
            "Install the shadcn lane wrapper when you want Foldkit Button behavior with shadcn naming and style hooks.",
          classHelpers: [
            "shadcnButtonBaseClassName",
            "shadcnButtonClassName",
            "shadcnOutlineButtonClassName",
            "shadcnSecondaryButtonClassName",
            "shadcnDestructiveButtonClassName",
            "shadcnGhostButtonClassName",
            "shadcnLinkButtonClassName",
            "shadcnIconButtonClassName",
          ],
          examples: [
            "shadcn-button-basic",
            "shadcn-button-size",
            "shadcn-button-default",
            "shadcn-button-outline",
            "shadcn-button-secondary",
            "shadcn-button-ghost",
            "shadcn-button-destructive",
            "shadcn-button-link",
            "shadcn-button-icon",
            "shadcn-button-with-icon",
            "shadcn-button-rounded",
            "shadcn-button-spinner",
            "shadcn-button-button-group",
            "shadcn-button-as-child",
            "shadcn-button-rtl",
          ],
          anatomyCode: `import * as Button from "./ui/shadcn-button";

Button.view<Message>({
  onClick: ClickedSave(),
  toView: (attributes) =>
    h.button(
      [...attributes.button, h.Class(Button.shadcnButtonClassName)],
      ["Save changes"]
    ),
});`,
        }),
      ButtonBasicExample: () => DocsRoutes.buttonBasicExampleRouteView(model),
      BaseUiButtonBasicExample: () =>
        DocsRoutes.baseUiButtonBasicExampleRouteView(model),
      ButtonDisabledExample: () =>
        DocsRoutes.buttonDisabledExampleRouteView(model),
      Calendar: () => embedUi("ui-calendar", View.calendar),
      CalendarDocs: () => calendarDocsView(model),
      ShadcnCalendarDocs: () =>
        shadcnLaneDocsView(model, {
          label: "Calendar",
          source: "registry/default/ui/shadcn-calendar",
          primitive: "Ui.Calendar",
          description:
            "A shadcn style-lane Calendar slice that reuses the official Foldkit Ui.Calendar primitive for date selection, month/year navigation, locale labels, keyboard focus, and disabled date reflection.",
          usage:
            "Install the shadcn lane wrapper when you want Foldkit Calendar behavior with shadcn naming and style hooks. Reconcile against the origin docs before adding new variants; range selection, date-time picking, natural-language parsing, and week numbers remain deferred until Ui.Calendar exposes those APIs.",
          classHelpers: [
            "shadcnCalendarContainerClassName",
            "shadcnCalendarHeaderClassName",
            "shadcnCalendarNavButtonClassName",
            "shadcnCalendarGridClassName",
            "shadcnCalendarDayButtonClassName",
            "shadcnCalendarMonthYearButtonClassName",
          ],
          examples: [
            "shadcn-calendar-basic",
            "shadcn-calendar-range",
            "shadcn-calendar-month-year-selector",
            "shadcn-calendar-presets",
            "shadcn-calendar-date-time-picker",
            "shadcn-calendar-booked",
            "shadcn-calendar-custom-cell-size",
            "shadcn-calendar-week-numbers",
            "shadcn-calendar-rtl",
            "shadcn-calendar-date-of-birth",
          ],
          anatomyCode: `import * as Calendar from "./ui/shadcn-calendar";

h.submodel({
  slotId: model.calendar.id,
  model: model.calendar,
  view: Calendar.view,
  toParentMessage: (message) => GotCalendarMessage({ message }),
});`,
        }),
      ShadcnCalendarBasicExample: () =>
        DocsRoutes.shadcnCalendarBasicExampleRouteView(model),
      ShadcnCalendarMonthYearSelectorExample: () =>
        DocsRoutes.shadcnCalendarMonthYearSelectorExampleRouteView(model),
      ShadcnCalendarRangeExample: () =>
        DocsRoutes.shadcnCalendarRangeExampleRouteView(model),
      ShadcnCalendarDateOfBirthExample: () =>
        DocsRoutes.shadcnCalendarDateOfBirthExampleRouteView(model),
      ShadcnCalendarDateTimePickerExample: () =>
        DocsRoutes.shadcnCalendarDateTimePickerExampleRouteView(model),
      ShadcnCalendarPresetsExample: () =>
        DocsRoutes.shadcnCalendarPresetsExampleRouteView(model),
      ShadcnCalendarBookedExample: () =>
        DocsRoutes.shadcnCalendarBookedExampleRouteView(model),
      ShadcnCalendarCustomCellSizeExample: () =>
        DocsRoutes.shadcnCalendarCustomCellSizeExampleRouteView(model),
      ShadcnCalendarWeekNumbersExample: () =>
        DocsRoutes.shadcnCalendarWeekNumbersExampleRouteView(model),
      ShadcnCalendarRtlExample: () =>
        DocsRoutes.shadcnCalendarRtlExampleRouteView(model),
      CalendarBasicExample: () =>
        DocsRoutes.calendarBasicExampleRouteView(model),
      CalendarBoundsExample: () =>
        DocsRoutes.calendarBoundsExampleRouteView(model),
      Checkbox: () => embedUi("ui-checkbox", View.checkbox),
      CheckboxDocs: () => checkboxDocsView(model),
      BaseUiCheckboxDocs: () => baseUiCheckboxDocsView(model),
      BaseUiCheckboxBasicExample: () =>
        DocsRoutes.baseUiCheckboxBasicExampleRouteView(model),
      BaseUiCheckboxLabelingExample: () =>
        DocsRoutes.baseUiCheckboxLabelingExampleRouteView(model),
      BaseUiCheckboxNativeButtonExample: () =>
        DocsRoutes.baseUiCheckboxNativeButtonExampleRouteView(model),
      BaseUiCheckboxFormExample: () =>
        DocsRoutes.baseUiCheckboxFormExampleRouteView(model),
      ShadcnCheckboxDocs: () =>
        shadcnLaneDocsView(model, {
          label: "Checkbox",
          source: "registry/default/ui/shadcn-checkbox",
          primitive: "Ui.Checkbox",
          description:
            "A shadcn style-lane Checkbox slice that reuses the official Foldkit Ui.Checkbox primitive for checked, disabled, indeterminate, label, description, and hidden input behavior.",
          usage:
            "Install the shadcn lane wrapper when you want Foldkit Checkbox behavior with shadcn naming and style hooks.",
          classHelpers: [
            "shadcnCheckboxRowClassName",
            "shadcnCheckboxControlClassName",
            "shadcnCheckboxLabelClassName",
            "shadcnCheckboxDescriptionClassName",
            "shadcnCheckboxTextClassName",
          ],
          examples: [
            "shadcn-checkbox-basic",
            "shadcn-checkbox-checked-state",
            "shadcn-checkbox-description",
            "shadcn-checkbox-disabled",
            "shadcn-checkbox-group",
            "shadcn-checkbox-invalid",
            "shadcn-checkbox-rtl",
            "shadcn-checkbox-table",
          ],
          anatomyCode: `import * as Checkbox from "./ui/shadcn-checkbox";

h.submodel({
  slotId: model.checkbox.id,
  model: model.checkbox,
  view: Checkbox.view,
  toParentMessage: (message) => GotCheckboxMessage({ message }),
});`,
        }),
      ShadcnCheckboxCheckedStateExample: () =>
        DocsRoutes.shadcnCheckboxCheckedStateExampleRouteView(model),
      ShadcnCheckboxGroupExample: () =>
        DocsRoutes.shadcnCheckboxGroupExampleRouteView(),
      ShadcnCheckboxTableExample: () =>
        DocsRoutes.shadcnCheckboxTableExampleRouteView(),
      CheckboxBasicExample: () =>
        DocsRoutes.checkboxBasicExampleRouteView(model),
      CheckboxGroupDocs: () => checkboxGroupDocsView(model),
      BaseUiCheckboxGroupDocs: () =>
        baseUiLaneDocsView(model, {
          label: "Checkbox Group",
          source: "registry/default/ui/base-ui-checkbox-group",
          primitive: "Checkbox Group view helpers",
          description:
            "A Base UI style-lane Checkbox Group slice that reuses the existing grouped checkbox, parent checkbox, checked, unchecked, and indeterminate helpers.",
          usage:
            "Install the Base UI lane wrapper when you want Checkbox Group composition with Base UI naming and class hooks.",
          classHelpers: [
            "checkboxGroupRootClassName",
            "checkboxGroupCaptionClassName",
            "checkboxGroupItemsClassName",
            "checkboxGroupItemClassName",
            "checkboxGroupControlClassName",
            "checkboxGroupIndicatorClassName",
          ],
          anatomyCode: `import * as CheckboxGroup from "./ui/base-ui-checkbox-group";

CheckboxGroup.groupView<Message>({
  label: "Apples",
  labelId: "apples",
  children,
});`,
          examples: [
            "base-ui-checkbox-group-basic",
            "base-ui-checkbox-group-labeling",
            "base-ui-checkbox-group-native-button",
            "base-ui-checkbox-group-form",
            "base-ui-checkbox-group-parent",
            "base-ui-checkbox-group-nested-parent",
          ],
        }),
      BaseUiCheckboxGroupBasicExample: () =>
        DocsRoutes.baseUiCheckboxGroupBasicExampleRouteView(model),
      BaseUiCheckboxGroupLabelingExample: () =>
        DocsRoutes.baseUiCheckboxGroupLabelingExampleRouteView(model),
      BaseUiCheckboxGroupNativeButtonExample: () =>
        DocsRoutes.baseUiCheckboxGroupNativeButtonExampleRouteView(model),
      BaseUiCheckboxGroupFormExample: () =>
        DocsRoutes.baseUiCheckboxGroupFormExampleRouteView(model),
      BaseUiCheckboxGroupParentExample: () =>
        DocsRoutes.baseUiCheckboxGroupParentExampleRouteView(model),
      BaseUiCheckboxGroupNestedParentExample: () =>
        DocsRoutes.baseUiCheckboxGroupNestedParentExampleRouteView(model),
      CheckboxGroupBasicExample: () =>
        DocsRoutes.checkboxGroupBasicExampleRouteView(model),
      CheckboxIndeterminateExample: () =>
        DocsRoutes.checkboxIndeterminateExampleRouteView(model),
      Combobox: () => embedUi("ui-combobox", View.combobox),
      ComboboxDocs: () => comboboxDocsView(model),
      BaseUiComboboxDocs: () =>
        baseUiLaneDocsView(model, {
          label: "Combobox",
          source: "registry/default/ui/base-ui-combobox",
          primitive: "Ui.Combobox",
          description:
            "A Base UI style-lane Combobox slice with a Basic example matching the origin fruit picker label, placeholder, and fruit list.",
          usage:
            "Install the Base UI lane wrapper when you want Foldkit Combobox behavior with Base UI naming, class helpers, and origin-matched example content.",
          classHelpers: [
            "baseUiComboboxInputClassName",
            "baseUiComboboxButtonClassName",
            "baseUiComboboxItemsClassName",
            "baseUiComboboxItemClassName",
            "baseUiComboboxBackdropClassName",
          ],
          examples: ["base-ui-combobox-basic"],
          anatomyCode: `import * as Combobox from "./ui/base-ui-combobox";

Combobox.view<Message>({
  model: model.combobox,
  toParentMessage: (message) => GotComboboxMessage({ message }),
  items,
});`,
        }),
      BaseUiComboboxBasicExample: () =>
        DocsRoutes.baseUiComboboxBasicExampleRouteView(model),
      ShadcnComboboxDocs: () =>
        shadcnLaneDocsView(model, {
          label: "Combobox",
          source: "registry/default/ui/shadcn-combobox",
          primitive: "Ui.Combobox",
          description:
            "A shadcn style-lane Combobox slice that reuses the official Foldkit Ui.Combobox primitive for controlled input, popup, item selection, and multi-select behavior.",
          usage:
            "Install the shadcn lane wrapper when you want Foldkit Combobox behavior with shadcn naming and style hooks.",
          classHelpers: [
            "shadcnComboboxInputClassName",
            "shadcnComboboxButtonClassName",
            "shadcnComboboxItemsClassName",
            "shadcnComboboxItemClassName",
            "shadcnComboboxBackdropClassName",
          ],
          examples: ["shadcn-combobox-basic"],
          anatomyCode: `import * as Combobox from "./ui/shadcn-combobox";

Combobox.view<Message>({
  model: model.combobox,
  toParentMessage: (message) => GotComboboxMessage({ message }),
  items,
});`,
        }),
      ComboboxBasicExample: () =>
        DocsRoutes.comboboxBasicExampleRouteView(model),
      ComboboxMultiExample: () =>
        DocsRoutes.comboboxMultiExampleRouteView(model),
      DatePicker: () => embedUi("ui-date-picker", View.datePicker),
      DatePickerDocs: () => datePickerDocsView(model),
      ShadcnDatePickerDocs: () =>
        shadcnLaneDocsView(model, {
          label: "Date Picker",
          source: "registry/default/ui/shadcn-date-picker",
          primitive: "Ui.DatePicker",
          description:
            "A shadcn style-lane Date Picker slice that reuses the official Foldkit Ui.DatePicker primitive for popover state, calendar selection, disabled date reflection, and formatted trigger content.",
          usage:
            "Install the shadcn lane wrapper when you want Foldkit Date Picker behavior with shadcn naming and style hooks.",
          classHelpers: [
            "shadcnDatePickerWrapperClassName",
            "shadcnDatePickerTriggerClassName",
            "shadcnDatePickerTriggerContentClassName",
            "shadcnDatePickerPanelClassName",
            "shadcnDatePickerBackdropClassName",
          ],
          examples: ["shadcn-date-picker-basic"],
          anatomyCode: `import * as DatePicker from "./ui/shadcn-date-picker";

h.submodel({
  slotId: model.datePicker.id,
  model: model.datePicker,
  view: DatePicker.view,
  toParentMessage: (message) => GotDatePickerMessage({ message }),
});`,
        }),
      DatePickerBasicExample: () =>
        DocsRoutes.datePickerBasicExampleRouteView(model),
      DatePickerBoundsExample: () =>
        DocsRoutes.datePickerBoundsExampleRouteView(model),
      Dialog: () => embedUi("ui-dialog", View.dialog),
      DialogDocs: () => dialogDocsView(model),
      BaseUiDialogDocs: () =>
        baseUiLaneDocsView(model, {
          label: "Dialog",
          source: "registry/default/ui/base-ui-dialog",
          primitive: "Ui.Dialog",
          description:
            "A Base UI style-lane Dialog slice with Basic, Close confirmation, and Nested dialogs examples matching the origin notifications dialog patterns.",
          usage:
            "Install the Base UI lane wrapper when you want Foldkit Dialog behavior with Base UI naming, class helpers, and origin-matched example content.",
          classHelpers: [
            "baseUiDialogBackdropClassName",
            "baseUiDialogPanelClassName",
            "baseUiDialogTitleClassName",
            "baseUiDialogDescriptionClassName",
          ],
          examples: [
            "base-ui-dialog-basic",
            "base-ui-dialog-close-confirmation",
            "base-ui-dialog-nested",
          ],
          anatomyCode: `import * as Dialog from "./ui/base-ui-dialog";

Dialog.view<Message>({
  model: model.dialog,
  toParentMessage: (message) => GotDialogMessage({ message }),
  toContentView: (attributes) => h.div(attributes.panel, ["Dialog content"]),
});`,
        }),
      BaseUiDialogBasicExample: () =>
        DocsRoutes.baseUiDialogBasicExampleRouteView(model),
      BaseUiDialogCloseConfirmationExample: () =>
        DocsRoutes.baseUiDialogCloseConfirmationExampleRouteView(model),
      BaseUiDialogNestedExample: () =>
        DocsRoutes.baseUiDialogNestedExampleRouteView(model),
      ShadcnDialogDocs: () =>
        shadcnLaneDocsView(model, {
          label: "Dialog",
          source: "registry/default/ui/shadcn-dialog",
          primitive: "Ui.Dialog",
          description:
            "A shadcn style-lane Dialog slice that reuses the official Foldkit Ui.Dialog primitive for open state, modal semantics, labelled content, dismissal, and focus commands.",
          usage:
            "Install the shadcn lane wrapper when you want Foldkit Dialog behavior with shadcn naming and style hooks.",
          classHelpers: [
            "shadcnDialogBackdropClassName",
            "shadcnDialogPanelClassName",
            "shadcnDialogTitleClassName",
            "shadcnDialogDescriptionClassName",
          ],
          examples: [
            "shadcn-dialog-basic",
            "shadcn-dialog-custom-close-button",
            "shadcn-dialog-no-close-button",
            "shadcn-dialog-sticky-footer",
            "shadcn-dialog-scrollable-content",
            "shadcn-dialog-rtl",
          ],
          anatomyCode: `import * as Dialog from "./ui/shadcn-dialog";

Dialog.view<Message>({
  model: model.dialog,
  toParentMessage: (message) => GotDialogMessage({ message }),
  toContentView: (attributes) => h.div(attributes.panel, ["Dialog content"]),
});`,
        }),
      ShadcnDialogBasicExample: () =>
        DocsRoutes.shadcnDialogBasicExampleRouteView(model),
      ShadcnDialogCustomCloseButtonExample: () =>
        DocsRoutes.shadcnDialogCustomCloseButtonExampleRouteView(model),
      ShadcnDialogNoCloseButtonExample: () =>
        DocsRoutes.shadcnDialogNoCloseButtonExampleRouteView(model),
      ShadcnDialogStickyFooterExample: () =>
        DocsRoutes.shadcnDialogStickyFooterExampleRouteView(model),
      ShadcnDialogScrollableContentExample: () =>
        DocsRoutes.shadcnDialogScrollableContentExampleRouteView(model),
      ShadcnDialogRtlExample: () =>
        DocsRoutes.shadcnDialogRtlExampleRouteView(model),
      DialogBasicExample: () => DocsRoutes.dialogBasicExampleRouteView(model),
      DialogAnimatedExample: () =>
        DocsRoutes.dialogAnimatedExampleRouteView(model),
      DialogDestructiveExample: () =>
        DocsRoutes.dialogDestructiveExampleRouteView(model),
      DialogFocusExample: () => DocsRoutes.dialogFocusExampleRouteView(model),
      DialogScrollableExample: () =>
        DocsRoutes.dialogScrollableExampleRouteView(model),
      Disclosure: () => embedUi("ui-disclosure", View.disclosure),
      DisclosureDocs: () => disclosureDocsView(model),
      DisclosureBasicExample: () =>
        DocsRoutes.disclosureBasicExampleRouteView(model),
      DisclosureDisabledExample: () =>
        DocsRoutes.disclosureDisabledExampleRouteView(model),
      DragAndDrop: () => embedUi("ui-drag-and-drop", View.dragAndDrop),
      DragAndDropDocs: () => dragAndDropDocsView(model),
      DragAndDropBasicExample: () =>
        DocsRoutes.dragAndDropBasicExampleRouteView(model),
      DragAndDropDisabledExample: () =>
        DocsRoutes.dragAndDropDisabledExampleRouteView(model),
      Fieldset: () => embedUi("ui-fieldset", View.fieldset),
      FieldsetDocs: () => fieldsetDocsView(model),
      BaseUiFieldsetDocs: () =>
        baseUiLaneDocsView(model, {
          label: "Fieldset",
          source: "registry/default/ui/base-ui-fieldset",
          primitive: "Ui.Fieldset",
          description:
            "A Base UI style-lane Fieldset slice that reuses the official Foldkit Ui.Fieldset helpers for grouped form semantics, legend, description, and disabled propagation.",
          usage:
            "Install the Base UI lane wrapper when the form group should keep Foldkit semantics and expose Base UI class helper names.",
          classHelpers: [
            "baseUiFieldsetRootClassName",
            "baseUiFieldsetLegendClassName",
            "baseUiFieldsetDescriptionClassName",
          ],
          examples: ["base-ui-fieldset-basic"],
          anatomyCode: `import * as Fieldset from "./ui/base-ui-fieldset";

Fieldset.view<Message>({
  label: "Account",
  description: "Fields required for account setup.",
  children: [field],
});`,
        }),
      BaseUiFieldsetBasicExample: () =>
        DocsRoutes.baseUiFieldsetBasicExampleRouteView(model),
      FieldsetBasicExample: () =>
        DocsRoutes.fieldsetBasicExampleRouteView(model),
      FieldsetDisabledExample: () =>
        DocsRoutes.fieldsetDisabledExampleRouteView(model),
      FileDrop: () => embedUi("ui-file-drop", View.fileDrop),
      FileDropDocs: () => fileDropDocsView(model),
      FileDropBasicExample: () =>
        DocsRoutes.fileDropBasicExampleRouteView(model),
      FileDropDisabledExample: () =>
        DocsRoutes.fileDropDisabledExampleRouteView(model),
      Input: () => embedUi("ui-input", View.input),
      InputDocs: () => inputDocsView(model),
      BaseUiInputDocs: () =>
        baseUiLaneDocsView(model, {
          label: "Input",
          source: "registry/default/ui/base-ui-input",
          primitive: "Ui.Input",
          description:
            "A Base UI style-lane Input slice that reuses the official Foldkit Ui.Input behavior for native value updates, disabled state, labels, descriptions, and field layout.",
          usage:
            "Install the Base UI lane wrapper when you need the native Foldkit Input contract with simple Base UI class hook names.",
          classHelpers: [
            "baseUiInputRootClassName",
            "baseUiInputLabelClassName",
            "baseUiInputControlClassName",
            "baseUiInputDescriptionClassName",
          ],
          examples: ["base-ui-input-basic"],
          anatomyCode: `import * as Input from "./ui/base-ui-input";

Input.view<Message>({
  value: model.name,
  onInput: (value) => UpdatedName({ value }),
  label: "Name",
});`,
        }),
      BaseUiInputBasicExample: () =>
        DocsRoutes.baseUiInputBasicExampleRouteView(model),
      ShadcnInputDocs: () =>
        shadcnLaneDocsView(model, {
          label: "Input",
          source: "registry/default/ui/shadcn-input",
          primitive: "Ui.Input",
          description:
            "A shadcn style-lane Input slice that reuses the official Foldkit Ui.Input behavior for native value updates, disabled state, labels, descriptions, and field layout.",
          usage:
            "Install the shadcn lane wrapper when you want the native Foldkit Input contract with shadcn naming and style hooks.",
          classHelpers: [
            "shadcnInputFieldClassName",
            "shadcnInputLabelClassName",
            "shadcnInputClassName",
            "shadcnInputDescriptionClassName",
          ],
          examples: [
            "shadcn-input-basic",
            "shadcn-input-demo",
            "shadcn-input-field",
            "shadcn-input-field-group",
            "shadcn-input-inline",
            "shadcn-input-grid",
            "shadcn-input-required",
            "shadcn-input-badge",
            "shadcn-input-input-group",
            "shadcn-input-button-group",
            "shadcn-input-form",
            "shadcn-input-disabled",
            "shadcn-input-invalid",
            "shadcn-input-file",
            "shadcn-input-rtl",
          ],
          anatomyCode: `import * as Input from "./ui/shadcn-input";

Input.view<Message>({
  value: model.name,
  onInput: (value) => UpdatedName({ value }),
  label: "Name",
});`,
        }),
      InputBasicExample: () => DocsRoutes.inputBasicExampleRouteView(model),
      InputDisabledExample: () =>
        DocsRoutes.inputDisabledExampleRouteView(model),
      ShadcnInputBasicExample: () =>
        DocsRoutes.shadcnInputBasicExampleRouteView(model),
      ShadcnInputDemoExample: () =>
        DocsRoutes.shadcnInputDemoExampleRouteView(model),
      ShadcnInputFieldExample: () =>
        DocsRoutes.shadcnInputFieldExampleRouteView(model),
      ShadcnInputFieldGroupExample: () =>
        DocsRoutes.shadcnInputFieldGroupExampleRouteView(model),
      ShadcnInputInlineExample: () =>
        DocsRoutes.shadcnInputInlineExampleRouteView(model),
      ShadcnInputGridExample: () =>
        DocsRoutes.shadcnInputGridExampleRouteView(model),
      ShadcnInputRequiredExample: () =>
        DocsRoutes.shadcnInputRequiredExampleRouteView(model),
      ShadcnInputBadgeExample: () =>
        DocsRoutes.shadcnInputBadgeExampleRouteView(model),
      ShadcnInputInputGroupExample: () =>
        DocsRoutes.shadcnInputInputGroupExampleRouteView(model),
      ShadcnInputButtonGroupExample: () =>
        DocsRoutes.shadcnInputButtonGroupExampleRouteView(model),
      ShadcnInputFormExample: () =>
        DocsRoutes.shadcnInputFormExampleRouteView(model),
      ShadcnInputDisabledExample: () =>
        DocsRoutes.shadcnInputDisabledExampleRouteView(model),
      ShadcnInputInvalidExample: () =>
        DocsRoutes.shadcnInputInvalidExampleRouteView(model),
      ShadcnInputFileExample: () =>
        DocsRoutes.shadcnInputFileExampleRouteView(model),
      ShadcnInputRtlExample: () =>
        DocsRoutes.shadcnInputRtlExampleRouteView(model),
      Meter: () => embedUi("ui-meter", View.meter),
      MeterDocs: () => meterDocsView(model),
      BaseUiMeterDocs: () =>
        baseUiLaneDocsView(model, {
          label: "Meter",
          source: "registry/default/ui/base-ui-meter",
          primitive: "Meter view helpers",
          description:
            "A Base UI style-lane Meter slice that reuses the existing root, label, value, track, and indicator helpers.",
          usage:
            "Install the Base UI lane wrapper when you want Meter composition with Base UI naming and class hooks.",
          classHelpers: [
            "meterRootClassName",
            "meterLabelClassName",
            "meterValueClassName",
            "meterTrackClassName",
            "meterIndicatorClassName",
          ],
          examples: ["base-ui-meter-basic"],
          anatomyCode: `import * as Meter from "./ui/base-ui-meter";

Meter.view<Message>({
  label: "Storage",
  value: 64,
  min: 0,
  max: 100,
});`,
        }),
      BaseUiMeterBasicExample: () =>
        DocsRoutes.baseUiMeterBasicExampleRouteView(model),
      MeterBasicExample: () => DocsRoutes.meterBasicExampleRouteView(model),
      ScrollArea: () => embedUi("ui-scroll-area", View.scrollArea),
      ScrollAreaDocs: () => scrollAreaDocsView(model),
      BaseUiScrollAreaDocs: () =>
        baseUiLaneDocsView(model, {
          label: "Scroll Area",
          source: "registry/default/ui/base-ui-scroll-area",
          primitive: "Scroll Area view helpers",
          description:
            "A Base UI style-lane Scroll Area slice that reuses the existing root, viewport, content, scrollbar, thumb, corner, and fade helpers.",
          usage:
            "Install the Base UI lane wrapper when you want Scroll Area composition with Base UI naming and class hooks.",
          classHelpers: [
            "scrollAreaRootClassName",
            "scrollAreaViewportClassName",
            "scrollAreaContentClassName",
            "scrollAreaScrollbarClassName",
            "scrollAreaThumbClassName",
          ],
          examples: [
            "base-ui-scroll-area-basic",
            "base-ui-scroll-area-both-scrollbars",
            "base-ui-scroll-area-gradient",
            "base-ui-scroll-area-tabs",
          ],
          anatomyCode: `import * as ScrollArea from "./ui/base-ui-scroll-area";

ScrollArea.view<Message>({
  children: items.map((item) => h.p([], [item])),
});`,
        }),
      ShadcnScrollAreaDocs: () =>
        shadcnLaneDocsView(model, {
          label: "Scroll Area",
          source: "registry/default/ui/shadcn-scroll-area",
          primitive: "Scroll Area view helpers",
          description:
            "A shadcn style-lane Scroll Area slice that reuses the existing root, viewport, content, scrollbar, thumb, corner, and fade helpers.",
          usage:
            "Install the shadcn lane wrapper when you want Scroll Area composition with shadcn naming and style hooks.",
          classHelpers: [
            "shadcnScrollAreaRootClassName",
            "shadcnScrollAreaViewportClassName",
            "shadcnScrollAreaContentClassName",
            "shadcnScrollAreaScrollbarClassName",
            "shadcnScrollAreaThumbClassName",
          ],
          examples: ["shadcn-scroll-area-basic"],
          anatomyCode: `import * as ScrollArea from "./ui/shadcn-scroll-area";

ScrollArea.view<Message>({
  children: items.map((item) => h.p([], [item])),
});`,
        }),
      ScrollAreaBasicExample: () =>
        DocsRoutes.scrollAreaBasicExampleRouteView(model),
      ScrollAreaBothScrollbarsExample: () =>
        DocsRoutes.scrollAreaBothScrollbarsExampleRouteView(model),
      ScrollAreaGradientExample: () =>
        DocsRoutes.scrollAreaGradientExampleRouteView(model),
      ScrollAreaTabsExample: () =>
        DocsRoutes.scrollAreaTabsExampleRouteView(model),
      Toggle: () => embedUi("ui-toggle", View.toggle),
      ToggleDocs: () => toggleDocsView(model),
      BaseUiToggleDocs: () =>
        baseUiLaneDocsView(model, {
          label: "Toggle",
          source: "registry/default/ui/base-ui-toggle",
          primitive: "Toggle view helpers",
          description:
            "A Base UI style-lane Toggle slice that reuses the existing pressed-state root and icon helpers.",
          usage:
            "Install the Base UI lane wrapper when you want Toggle composition with Base UI naming and class hooks.",
          classHelpers: ["toggleRootClassName", "toggleIconClassName"],
          examples: ["base-ui-toggle-basic"],
          anatomyCode: `import * as Toggle from "./ui/base-ui-toggle";

Toggle.view<Message>({
  pressed: model.pressed,
  onPressedChange: ToggledPressed(),
  children: ["Bold"],
});`,
        }),
      BaseUiToggleBasicExample: () =>
        DocsRoutes.baseUiToggleBasicExampleRouteView(model),
      ToggleBasicExample: () => DocsRoutes.toggleBasicExampleRouteView(model),
      ToggleGroupDocs: () => toggleGroupDocsView(model),
      BaseUiToggleGroupDocs: () =>
        baseUiLaneDocsView(model, {
          label: "Toggle Group",
          source: "registry/default/ui/base-ui-toggle-group",
          primitive: "Toggle Group view helpers",
          description:
            "A Base UI style-lane Toggle Group slice that reuses the existing group root, item, and icon helpers.",
          usage:
            "Install the Base UI lane wrapper when you want Toggle Group composition with Base UI naming and class hooks.",
          classHelpers: [
            "toggleGroupRootClassName",
            "toggleGroupItemClassName",
            "toggleGroupIconClassName",
          ],
          examples: ["base-ui-toggle-group-basic"],
          anatomyCode: `import * as ToggleGroup from "./ui/base-ui-toggle-group";

ToggleGroup.rootView<Message>({
  children: [
    ToggleGroup.itemView({ pressed: model.bold, onPressedChange: ToggledBold(), children: ["Bold"] }),
  ],
});`,
        }),
      BaseUiToggleGroupBasicExample: () =>
        DocsRoutes.baseUiToggleGroupBasicExampleRouteView(model),
      ToggleGroupBasicExample: () =>
        DocsRoutes.toggleGroupBasicExampleRouteView(model),
      RadioDocs: () => radioDocsView(model),
      RadioBasicExample: () => DocsRoutes.radioBasicExampleRouteView(model),
      ToolbarDocs: () => toolbarDocsView(model),
      BaseUiToolbarDocs: () =>
        baseUiLaneDocsView(model, {
          label: "Toolbar",
          source: "registry/default/ui/base-ui-toolbar",
          primitive: "Toolbar view helpers",
          description:
            "A Base UI style-lane Toolbar slice that reuses the existing root, group, button, link, input, and separator helpers.",
          usage:
            "Install the Base UI lane wrapper when you want Toolbar composition with Base UI naming and class hooks.",
          classHelpers: [
            "toolbarRootClassName",
            "toolbarGroupClassName",
            "toolbarButtonClassName",
            "toolbarLinkClassName",
            "toolbarInputClassName",
            "toolbarSeparatorClassName",
          ],
          examples: ["base-ui-toolbar-basic"],
          anatomyCode: `import * as Toolbar from "./ui/base-ui-toolbar";

Toolbar.rootView<Message>({
  children: [
    Toolbar.groupView({ children: [button, link, input] }),
    Toolbar.separatorView({}),
  ],
});`,
        }),
      BaseUiToolbarBasicExample: () =>
        DocsRoutes.baseUiToolbarBasicExampleRouteView(model),
      ToolbarBasicExample: () => DocsRoutes.toolbarBasicExampleRouteView(model),
      Progress: () => embedUi("ui-progress", View.progress),
      ProgressDocs: () => progressDocsView(model),
      BaseUiProgressDocs: () =>
        baseUiLaneDocsView(model, {
          label: "Progress",
          source: "registry/default/ui/base-ui-progress",
          primitive: "Progress view helpers",
          description:
            "A Base UI style-lane Progress slice that reuses the existing accessible root, label, value, track, and indicator helpers.",
          usage:
            "Install the Base UI lane wrapper when you want Progress composition with Base UI naming and class hooks.",
          classHelpers: [
            "progressRootClassName",
            "progressLabelClassName",
            "progressValueClassName",
            "progressTrackClassName",
            "progressIndicatorClassName",
          ],
          examples: ["base-ui-progress-basic"],
          anatomyCode: `import * as Progress from "./ui/base-ui-progress";

Progress.view<Message>({
  value: model.uploadPercent,
  label: "Upload progress",
});`,
        }),
      BaseUiProgressBasicExample: () =>
        DocsRoutes.baseUiProgressBasicExampleRouteView(model),
      ShadcnProgressDocs: () =>
        shadcnLaneDocsView(model, {
          label: "Progress",
          source: "registry/default/ui/shadcn-progress",
          primitive: "Progress view helpers",
          description:
            "A shadcn style-lane Progress slice that reuses the existing accessible root, label, value, track, and indicator helpers.",
          usage:
            "Install the shadcn lane wrapper when you want Progress composition with shadcn naming and style hooks.",
          classHelpers: [
            "shadcnProgressRootClassName",
            "shadcnProgressLabelClassName",
            "shadcnProgressValueClassName",
            "shadcnProgressTrackClassName",
            "shadcnProgressIndicatorClassName",
          ],
          examples: ["shadcn-progress-basic"],
          anatomyCode: `import * as Progress from "./ui/shadcn-progress";

Progress.view<Message>({
  value: model.uploadPercent,
  label: "Upload progress",
});`,
        }),
      ProgressBasicExample: () =>
        DocsRoutes.progressBasicExampleRouteView(model),
      Listbox: () => embedUi("ui-listbox", View.listbox),
      ListboxDocs: () => listboxDocsView(model),
      ListboxBasicExample: () => DocsRoutes.listboxBasicExampleRouteView(model),
      ListboxAnimatedExample: () =>
        DocsRoutes.listboxAnimatedExampleRouteView(model),
      Menu: () => embedUi("ui-menu", View.menu),
      MenuDocs: () => menuDocsView(model),
      BaseUiMenuDocs: () =>
        baseUiLaneDocsView(model, {
          label: "Menu",
          source: "registry/default/ui/base-ui-menu",
          primitive: "Ui.Menu",
          description:
            "A Base UI style-lane Menu slice that reuses the official Foldkit Ui.Menu primitive for trigger state, popup rendering, item selection, backdrop dismissal, and animated variants.",
          usage:
            "Install the Base UI lane wrapper when you want the existing Foldkit Menu behavior with Base UI package naming and styling hooks.",
          classHelpers: [
            "baseUiMenuTriggerClassName",
            "baseUiMenuRootClassName",
            "baseUiMenuPopupClassName",
            "baseUiMenuAnimatedPopupClassName",
            "baseUiMenuItemClassName",
            "baseUiMenuBackdropClassName",
          ],
          examples: ["base-ui-menu-basic", "base-ui-menu-nested"],
          anatomyCode: `import * as Menu from "./ui/base-ui-menu";

Menu.view<Message>({
  model: model.menu,
  toParentMessage: (message) => GotMenuMessage({ message }),
  items,
});`,
        }),
      BaseUiMenuBasicExample: () =>
        DocsRoutes.baseUiMenuBasicExampleRouteView(model),
      BaseUiMenuNestedExample: () =>
        DocsRoutes.baseUiMenuNestedExampleRouteView(model),
      MenuBasicExample: () => DocsRoutes.menuBasicExampleRouteView(model),
      MenuAnimatedExample: () => DocsRoutes.menuAnimatedExampleRouteView(model),
      Popover: () => embedUi("ui-popover", View.popover),
      PopoverDocs: () => popoverDocsView(model),
      BaseUiPopoverDocs: () =>
        baseUiLaneDocsView(model, {
          label: "Popover",
          source: "registry/default/ui/base-ui-popover",
          primitive: "Ui.Popover",
          description:
            "A Base UI style-lane Popover slice with a Basic example matching the origin notifications popup.",
          usage:
            "Install the Base UI lane wrapper when you want Foldkit Popover behavior with Base UI naming, class helpers, and origin-matched example content.",
          classHelpers: [
            "baseUiPopoverTriggerClassName",
            "baseUiPopoverRootClassName",
            "baseUiPopoverPanelClassName",
            "baseUiPopoverBackdropClassName",
          ],
          examples: [
            "base-ui-popover-basic",
            "base-ui-popover-animated",
            "base-ui-popover-multiple-triggers",
          ],
          anatomyCode: `import * as Popover from "./ui/base-ui-popover";

Popover.view<Message>({
  model: model.popover,
  toParentMessage: (message) => GotPopoverMessage({ message }),
  children: [
    Popover.trigger({ children: ["Open"] }),
    Popover.panel({ children: ["Popover content"] }),
  ],
});`,
        }),
      BaseUiPopoverBasicExample: () =>
        DocsRoutes.baseUiPopoverBasicExampleRouteView(model),
      BaseUiPopoverAnimatedExample: () =>
        DocsRoutes.baseUiPopoverAnimatedExampleRouteView(model),
      BaseUiPopoverDetachedTriggerExample: () =>
        DocsRoutes.baseUiPopoverDetachedTriggerExampleRouteView(model),
      BaseUiPopoverMultipleTriggersExample: () =>
        DocsRoutes.baseUiPopoverMultipleTriggersExampleRouteView(model),
      BaseUiPopoverOpenOnHoverExample: () =>
        DocsRoutes.baseUiPopoverOpenOnHoverExampleRouteView(model),
      ShadcnPopoverDocs: () =>
        shadcnLaneDocsView(model, {
          label: "Popover",
          source: "registry/default/ui/shadcn-popover",
          primitive: "Ui.Popover",
          description:
            "A shadcn style-lane Popover slice that reuses the official Foldkit Ui.Popover primitive for open state, anchored panels, dismissal, scroll lock, focus, and backdrop commands.",
          usage:
            "Install the shadcn lane wrapper when you want Foldkit Popover behavior with shadcn naming and style hooks.",
          classHelpers: [
            "shadcnPopoverTriggerClassName",
            "shadcnPopoverRootClassName",
            "shadcnPopoverPanelClassName",
            "shadcnPopoverBackdropClassName",
          ],
          examples: ["shadcn-popover-basic"],
          anatomyCode: `import * as Popover from "./ui/shadcn-popover";

Popover.view<Message>({
  model: model.popover,
  toParentMessage: (message) => GotPopoverMessage({ message }),
  children: [
    Popover.trigger({ children: ["Open"] }),
    Popover.panel({ children: ["Popover content"] }),
  ],
});`,
        }),
      PopoverBasicExample: () => DocsRoutes.popoverBasicExampleRouteView(model),
      PopoverAnimatedExample: () =>
        DocsRoutes.popoverAnimatedExampleRouteView(model),
      RadioGroup: () => embedUi("ui-radio-group", View.radioGroup),
      RadioGroupDocs: () => radioGroupDocsView(model),
      BaseUiRadioDocs: () =>
        baseUiLaneDocsView(model, {
          label: "Radio",
          source: "registry/default/ui/base-ui-radio",
          primitive: "Ui.RadioGroup",
          description:
            "A Base UI style-lane Radio slice that reuses the official Foldkit Ui.RadioGroup primitive for controlled selection, orientation, option focus, and labelled choices.",
          usage:
            "Install the Base UI lane wrapper when you want Foldkit RadioGroup behavior with Base UI class helper names.",
          classHelpers: [
            "baseUiRadioVerticalClassName",
            "baseUiRadioHorizontalClassName",
            "baseUiRadioVerticalOptionClassName",
            "baseUiRadioHorizontalOptionClassName",
            "baseUiRadioLabelClassName",
            "baseUiRadioDescriptionClassName",
          ],
          examples: [
            "base-ui-radio-basic",
            "base-ui-radio-labeling",
            "base-ui-radio-native-button",
            "base-ui-radio-form",
          ],
          anatomyCode: `import * as Radio from "./ui/base-ui-radio";

const PlanRadio = Radio.create<"starter" | "pro">();

h.submodel({
  slotId: model.radioGroup.id,
  model: model.radioGroup,
  view: PlanRadio.view,
  viewInputs: { options },
  toParentMessage: (message) => GotRadioGroupMessage({ message }),
});`,
        }),
      ShadcnRadioGroupDocs: () =>
        shadcnLaneDocsView(model, {
          label: "Radio Group",
          source: "registry/default/ui/shadcn-radio-group",
          primitive: "Ui.RadioGroup",
          description:
            "A shadcn style-lane Radio Group slice that reuses the official Foldkit Ui.RadioGroup primitive for controlled selection, orientation, option focus, and labelled choices.",
          usage:
            "Install the shadcn lane wrapper when you want Foldkit Radio Group behavior with shadcn naming and style hooks.",
          classHelpers: [
            "shadcnRadioGroupVerticalClassName",
            "shadcnRadioGroupHorizontalClassName",
            "shadcnRadioGroupVerticalOptionClassName",
            "shadcnRadioGroupHorizontalOptionClassName",
            "shadcnRadioGroupLabelClassName",
            "shadcnRadioGroupDescriptionClassName",
          ],
          examples: [
            "shadcn-radio-group-basic",
            "shadcn-radio-group-description",
            "shadcn-radio-group-choice-card",
            "shadcn-radio-group-fieldset",
            "shadcn-radio-group-disabled",
            "shadcn-radio-group-invalid",
            "shadcn-radio-group-rtl",
          ],
          anatomyCode: `import * as RadioGroup from "./ui/shadcn-radio-group";

const PlanRadioGroup = RadioGroup.create<"starter" | "pro">();

h.submodel({
  slotId: model.radioGroup.id,
  model: model.radioGroup,
  view: PlanRadioGroup.view,
  viewInputs: { options },
  toParentMessage: (message) => GotRadioGroupMessage({ message }),
});`,
        }),
      BaseUiRadioBasicExample: () =>
        DocsRoutes.baseUiRadioBasicExampleRouteView(model),
      BaseUiRadioLabelingExample: () =>
        DocsRoutes.baseUiRadioLabelingExampleRouteView(model),
      BaseUiRadioNativeButtonExample: () =>
        DocsRoutes.baseUiRadioNativeButtonExampleRouteView(model),
      BaseUiRadioFormExample: () =>
        DocsRoutes.baseUiRadioFormExampleRouteView(model),
      RadioGroupBasicExample: () =>
        DocsRoutes.radioGroupBasicExampleRouteView(model),
      RadioGroupHorizontalExample: () =>
        DocsRoutes.radioGroupHorizontalExampleRouteView(model),
      Select: () => embedUi("ui-select", View.select),
      SelectDocs: () => selectDocsView(model),
      BaseUiSelectDocs: () =>
        baseUiLaneDocsView(model, {
          label: "Select",
          source: "registry/default/ui/base-ui-select",
          primitive: "Ui.Select",
          description:
            "A Base UI style-lane Select slice that reuses the official Foldkit Ui.Select native select helper for labels, descriptions, disabled state, and value changes.",
          usage:
            "Install the Base UI lane wrapper when you need the native Foldkit Select contract with simple Base UI class hooks.",
          classHelpers: [
            "baseUiSelectWrapperClassName",
            "baseUiSelectControlClassName",
            "baseUiSelectChevronClassName",
            "baseUiSelectLabelClassName",
            "baseUiSelectDescriptionClassName",
          ],
          examples: ["base-ui-select-basic"],
          anatomyCode: `import * as Select from "./ui/base-ui-select";

Select.view<Message>({
  id: "plan",
  value: model.plan,
  onChange: (value) => SelectedPlan({ value }),
  options,
});`,
        }),
      ShadcnSelectDocs: () =>
        shadcnLaneDocsView(model, {
          label: "Select",
          source: "registry/default/ui/shadcn-select",
          primitive: "Ui.Select",
          description:
            "A shadcn style-lane Select slice with composed Root, Trigger, Value, Content, Group, Label, Item, Separator, and ScrollButton parts.",
          usage:
            "Install the shadcn lane wrapper when you want the shadcn Select anatomy with parent-owned open and selected state in Foldkit.",
          classHelpers: [
            "shadcnSelectRootClassName",
            "shadcnSelectTriggerClassName",
            "shadcnSelectValueClassName",
            "shadcnSelectContentClassName",
            "shadcnSelectItemClassName",
            "shadcnSelectLabelClassName",
            "shadcnSelectSeparatorClassName",
          ],
          examples: ["shadcn-select-basic"],
          anatomyCode: `import * as Select from "./ui/shadcn-select";

Select.rootView<Message>({
  children: [
    Select.triggerView<Message>({
      open: model.open,
      onToggle: ToggledSelect(),
      ariaLabel: "Plan",
      children: [
        Select.valueView<Message>({ children: ["Team"] }),
        Select.iconView<Message>({ open: model.open }),
      ],
    }),
    Select.contentView<Message>({
      open: model.open,
      children: [
        Select.groupView<Message>({
          children: [
            Select.labelView<Message>({ children: ["Plans"] }),
            Select.itemView<Message>({
              selected: model.plan === "team",
              onSelect: SelectedPlan({ value: "team" }),
              children: ["Team"],
            }),
          ],
        }),
      ],
    }),
  ],
});`,
        }),
      BaseUiSelectBasicExample: () =>
        DocsRoutes.baseUiSelectBasicExampleRouteView(model),
      SelectBasicExample: () => DocsRoutes.selectBasicExampleRouteView(model),
      SelectDisabledExample: () =>
        DocsRoutes.selectDisabledExampleRouteView(model),
      Slider: () => embedUi("ui-slider", View.slider),
      SliderDocs: () => sliderDocsView(model),
      BaseUiSliderDocs: () =>
        baseUiLaneDocsView(model, {
          label: "Slider",
          source: "registry/default/ui/base-ui-slider",
          primitive: "Ui.Slider",
          description:
            "A Base UI style-lane Slider slice that reuses the official Foldkit Ui.Slider primitive for value reflection, drag state, keyboard movement, and root subscriptions.",
          usage:
            "Install the Base UI lane wrapper when you want Foldkit Slider behavior with Base UI class helper names.",
          classHelpers: [
            "baseUiSliderRootClassName",
            "baseUiSliderTrackClassName",
            "baseUiSliderFilledTrackClassName",
            "baseUiSliderThumbClassName",
            "baseUiSliderLabelClassName",
            "baseUiSliderValueClassName",
          ],
          examples: ["base-ui-slider-basic"],
          anatomyCode: `import * as Slider from "./ui/base-ui-slider";

h.submodel({
  slotId: model.slider.id,
  model: model.slider,
  view: Slider.view,
  toParentMessage: (message) => GotSliderMessage({ message }),
});`,
        }),
      ShadcnSliderDocs: () =>
        shadcnLaneDocsView(model, {
          label: "Slider",
          source: "registry/default/ui/shadcn-slider",
          primitive: "Ui.Slider",
          description:
            "A shadcn style-lane Slider slice that reuses the official Foldkit Ui.Slider primitive for value reflection, drag state, keyboard movement, and root subscriptions.",
          usage:
            "Install the shadcn lane wrapper when you want Foldkit Slider behavior with shadcn naming and style hooks.",
          classHelpers: [
            "shadcnSliderRootClassName",
            "shadcnSliderTrackClassName",
            "shadcnSliderFilledTrackClassName",
            "shadcnSliderThumbClassName",
            "shadcnSliderLabelClassName",
            "shadcnSliderValueClassName",
          ],
          examples: ["shadcn-slider-basic"],
          anatomyCode: `import * as Slider from "./ui/shadcn-slider";

h.submodel({
  slotId: model.slider.id,
  model: model.slider,
  view: Slider.view,
  toParentMessage: (message) => GotSliderMessage({ message }),
});`,
        }),
      BaseUiSliderBasicExample: () =>
        DocsRoutes.baseUiSliderBasicExampleRouteView(model),
      ShadcnSliderBasicExample: () =>
        DocsRoutes.shadcnSliderBasicExampleRouteView(model),
      SliderBasicExample: () => DocsRoutes.sliderBasicExampleRouteView(model),
      SliderDisabledExample: () =>
        DocsRoutes.sliderDisabledExampleRouteView(model),
      Switch: () => embedUi("ui-switch", View.switch_),
      SwitchDocs: () => switchDocsView(model),
      BaseUiSwitchDocs: () =>
        baseUiLaneDocsView(model, {
          label: "Switch",
          source: "registry/default/ui/base-ui-switch",
          primitive: "Ui.Switch",
          description:
            "A Base UI style-lane Switch slice that reuses the official Foldkit Ui.Switch primitive for controlled checked state, labels, descriptions, hidden input behavior, and disabled state.",
          usage:
            "Install the Base UI lane wrapper when you want Foldkit Switch behavior with Base UI class helper names.",
          classHelpers: [
            "baseUiSwitchRowClassName",
            "baseUiSwitchButtonClassName",
            "baseUiSwitchKnob",
            "baseUiSwitchLabelClassName",
            "baseUiSwitchDescriptionClassName",
            "baseUiSwitchTextClassName",
          ],
          examples: ["base-ui-switch-basic"],
          anatomyCode: `import * as Switch from "./ui/base-ui-switch";

h.submodel({
  slotId: model.switch.id,
  model: model.switch,
  view: Switch.view,
  toParentMessage: (message) => GotSwitchMessage({ message }),
});`,
        }),
      ShadcnSwitchDocs: () =>
        shadcnLaneDocsView(model, {
          label: "Switch",
          source: "registry/default/ui/shadcn-switch",
          primitive: "Ui.Switch",
          description:
            "A shadcn style-lane Switch slice that reuses the official Foldkit Ui.Switch primitive for controlled checked state, labels, descriptions, hidden input behavior, and disabled state.",
          usage:
            "Install the shadcn lane wrapper when you want Foldkit Switch behavior with shadcn naming and style hooks.",
          classHelpers: [
            "shadcnSwitchRowClassName",
            "shadcnSwitchButtonClassName",
            "shadcnSwitchKnob",
            "shadcnSwitchLabelClassName",
            "shadcnSwitchDescriptionClassName",
            "shadcnSwitchTextClassName",
          ],
          examples: ["shadcn-switch-basic"],
          anatomyCode: `import * as Switch from "./ui/shadcn-switch";

h.submodel({
  slotId: model.switch.id,
  model: model.switch,
  view: Switch.view,
  toParentMessage: (message) => GotSwitchMessage({ message }),
});`,
        }),
      BaseUiSwitchBasicExample: () =>
        DocsRoutes.baseUiSwitchBasicExampleRouteView(model),
      SwitchBasicExample: () => DocsRoutes.switchBasicExampleRouteView(model),
      SwitchDisabledExample: () =>
        DocsRoutes.switchDisabledExampleRouteView(model),
      Tabs: () => embedUi("ui-tabs", View.tabs),
      TabsDocs: () => tabsDocsView(model),
      BaseUiTabsDocs: () =>
        baseUiLaneDocsView(model, {
          label: "Tabs",
          source: "registry/default/ui/base-ui-tabs",
          primitive: "Ui.Tabs",
          description:
            "A Base UI style-lane Tabs slice that reuses the official Foldkit Ui.Tabs primitive for controlled selection, focus movement, orientation, and activation mode.",
          usage:
            "Install the Base UI lane wrapper when you want Foldkit Tabs behavior with Base UI class helper names.",
          classHelpers: [
            "baseUiTabsRootClassName",
            "baseUiTabsListClassName",
            "baseUiTabsTabClassName",
            "baseUiTabsPanelClassName",
            "baseUiTabsVerticalRootClassName",
            "baseUiTabsVerticalListClassName",
          ],
          examples: ["base-ui-tabs-basic"],
          anatomyCode: `import * as Tabs from "./ui/base-ui-tabs";

const Tabs = Tabs.create<"overview" | "settings">();

h.submodel({
  slotId: model.tabs.id,
  model: model.tabs,
  view: Tabs.view,
  viewInputs: { tabs },
  toParentMessage: (message) => GotTabsMessage({ message }),
});`,
        }),
      ShadcnTabsDocs: () =>
        shadcnLaneDocsView(model, {
          label: "Tabs",
          source: "registry/default/ui/shadcn-tabs",
          primitive: "Ui.Tabs",
          description:
            "A shadcn style-lane Tabs slice that reuses the official Foldkit Ui.Tabs primitive for controlled selection, focus movement, orientation, and activation mode.",
          usage:
            "Install the shadcn lane wrapper when you want Foldkit Tabs behavior with shadcn naming and style hooks.",
          classHelpers: [
            "shadcnTabsRootClassName",
            "shadcnTabsTabListClassName",
            "shadcnTabsTabClassName",
            "shadcnTabsPanelClassName",
            "shadcnTabsVerticalRootClassName",
            "shadcnTabsVerticalTabListClassName",
          ],
          examples: ["shadcn-tabs-basic"],
          anatomyCode: `import * as Tabs from "./ui/shadcn-tabs";

const SettingsTabs = Tabs.create<"overview" | "settings">();

h.submodel({
  slotId: model.tabs.id,
  model: model.tabs,
  view: SettingsTabs.view,
  viewInputs: { tabs },
  toParentMessage: (message) => GotTabsMessage({ message }),
});`,
        }),
      BaseUiTabsBasicExample: () =>
        DocsRoutes.baseUiTabsBasicExampleRouteView(model),
      TabsBasicExample: () => DocsRoutes.tabsBasicExampleRouteView(model),
      TabsManualExample: () => DocsRoutes.tabsManualExampleRouteView(model),
      Textarea: () => embedUi("ui-textarea", View.textarea),
      TextareaDocs: () => textareaDocsView(model),
      ShadcnTextareaDocs: () =>
        shadcnLaneDocsView(model, {
          label: "Textarea",
          source: "registry/default/ui/shadcn-textarea",
          primitive: "Ui.Textarea",
          description:
            "A shadcn style-lane Textarea slice that reuses the official Foldkit Ui.Textarea helper for labels, descriptions, disabled state, value updates, and native textarea behavior.",
          usage:
            "Install the shadcn lane wrapper when you want Foldkit Textarea behavior with shadcn naming and style hooks.",
          classHelpers: [
            "shadcnTextareaFieldClassName",
            "shadcnTextareaLabelClassName",
            "shadcnTextareaClassName",
            "shadcnTextareaDescriptionClassName",
          ],
          examples: [
            "shadcn-textarea-basic",
            "shadcn-textarea-field",
            "shadcn-textarea-disabled",
            "shadcn-textarea-invalid",
            "shadcn-textarea-button",
            "shadcn-textarea-rtl",
          ],
          anatomyCode: `import * as Textarea from "./ui/shadcn-textarea";

Textarea.view<Message>({
  id: "message",
  value: model.message,
  onInput: (value) => UpdatedMessage({ value }),
  label: "Message",
});`,
        }),
      TextareaBasicExample: () =>
        DocsRoutes.textareaBasicExampleRouteView(model),
      TextareaDisabledExample: () =>
        DocsRoutes.textareaDisabledExampleRouteView(model),
      Toast: () => embedUi("ui-toast", View.toast),
      ToastDocs: () => toastDocsView(model),
      BaseUiToastDocs: () =>
        baseUiLaneDocsView(model, {
          label: "Toast",
          source: "registry/default/ui/base-ui-toast",
          primitive: "Ui.Toast",
          description:
            "A Base UI style-lane Toast slice that reuses the Foldkit Ui.Toast stack for typed payloads, dismissal, hover pause, duration, variants, and positioning.",
          usage:
            "Install the Base UI lane wrapper when you want the typed Foldkit Toast model with Base UI class helper names.",
          classHelpers: [
            "baseUiToastContainerClassName",
            "baseUiToastEntryClassName",
            "baseUiToastClassName",
            "baseUiToastTitleClassName",
            "baseUiToastDescriptionClassName",
            "baseUiToastCloseButtonClassName",
          ],
          examples: ["base-ui-toast-basic"],
          anatomyCode: `import * as Toast from "./ui/base-ui-toast";

const [toast, commands] = Toast.init();

Toast.view<Message>({
  model: model.toast,
  toParentMessage: (message) => GotToastMessage({ message }),
});`,
        }),
      ShadcnToastDocs: () =>
        shadcnLaneDocsView(model, {
          label: "Toast",
          source: "registry/default/ui/shadcn-toast",
          primitive: "Ui.Toast",
          description:
            "A legacy shadcn Toast style-lane slice. The current upstream shadcn Toast page is deprecated in favor of Sonner, so this wrapper remains for compatibility while Sonner is the preferred shadcn toast surface.",
          usage:
            "Install the shadcn lane wrapper only when you need the typed Foldkit Toast model with legacy shadcn naming and style hooks. Use Sonner for new shadcn-compatible toast rendering.",
          classHelpers: [
            "shadcnToastContainerClassName",
            "shadcnToastEntryClassName",
            "shadcnToastClassName",
            "shadcnToastTitleClassName",
            "shadcnToastDescriptionClassName",
            "shadcnToastCloseButtonClassName",
          ],
          examples: ["shadcn-toast-basic"],
          anatomyCode: `import * as Toast from "./ui/shadcn-toast";

const [toast, commands] = Toast.init();

Toast.view<Message>({
  model: model.toast,
  toParentMessage: (message) => GotToastMessage({ message }),
});`,
        }),
      BaseUiToastBasicExample: () =>
        DocsRoutes.baseUiToastBasicExampleRouteView(model),
      ToastBasicExample: () => DocsRoutes.toastBasicExampleRouteView(model),
      ToastVariantsExample: () =>
        DocsRoutes.toastVariantsExampleRouteView(model),
      Tooltip: () => embedUi("ui-tooltip", View.tooltip),
      TooltipDocs: () => tooltipDocsView(model),
      BaseUiTooltipDocs: () =>
        baseUiLaneDocsView(model, {
          label: "Tooltip",
          source: "registry/default/ui/base-ui-tooltip",
          primitive: "Ui.Tooltip",
          description:
            "A Base UI style-lane Tooltip slice that reuses the official Foldkit Ui.Tooltip primitive for hover, focus, delay, Escape dismissal, anchoring, and described trigger behavior.",
          usage:
            "Install the Base UI lane wrapper when you want Foldkit Tooltip behavior with Base UI class helper names.",
          classHelpers: [
            "baseUiTooltipRootClassName",
            "baseUiTooltipTriggerClassName",
            "baseUiTooltipPanelClassName",
            "baseUiTooltipAnchor",
            "baseUiTooltipView",
          ],
          examples: ["base-ui-tooltip-basic"],
          anatomyCode: `import * as Tooltip from "./ui/base-ui-tooltip";

h.submodel({
  slotId: model.tooltip.id,
  model: model.tooltip,
  view: Tooltip.view,
  toParentMessage: (message) => GotTooltipMessage({ message }),
});`,
        }),
      BaseUiTooltipBasicExample: () =>
        DocsRoutes.baseUiTooltipBasicExampleRouteView(model),
      TooltipBasicExample: () => DocsRoutes.tooltipBasicExampleRouteView(model),
      TooltipNoDelayExample: () =>
        DocsRoutes.tooltipNoDelayExampleRouteView(model),
      Animation: () => embedUi("ui-animation", View.animation),
      AnimationDocs: () => animationDocsView(model),
      AnimationBasicExample: () =>
        DocsRoutes.animationBasicExampleRouteView(model),
      VirtualList: () => embedUi("ui-virtual-list", View.virtualList),
      VirtualListDocs: () => virtualListDocsView(model),
      VirtualListBasicExample: () =>
        DocsRoutes.virtualListBasicExampleRouteView(model),
      VirtualListVariableExample: () =>
        DocsRoutes.virtualListVariableExampleRouteView(model),
      NotFound: ({ path }) => notFoundView(path),
    })
  );
};

const routeTitle = (route: Model["route"]): string =>
  M.value(route).pipe(
    M.tag("Home", () => "Foldkit-basic-cn-ui"),
    M.orElse(({ _tag }) => `${_tag} - Foldkit-basic-cn-ui`)
  );

export const view = (model: Model): Document => {
  const h = html<Message>();

  return {
    title: routeTitle(model.route),
    body: h.div(
      [h.Class("flex h-screen flex-col overflow-hidden bg-white md:flex-row")],
      [
        mobileHeaderView(model),
        mobileMenuView(model),
        sidebarView(model.route),
        h.main(
          [h.Class("min-h-0 flex-1 overflow-y-auto p-4 md:p-8")],
          [h.keyed("div")(model.route._tag, [], [contentView(model)])]
        ),
      ]
    ),
  };
};
