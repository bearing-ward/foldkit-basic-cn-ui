import clsx from "clsx";
import { Effect, Match as M, Schema as S, pipe } from "effect";
import type { Runtime, Submodel } from "foldkit";
import { Calendar, Command, Route, Subscription, Ui } from "foldkit";
import type { Document, Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { UrlRequest, load, pushUrl } from "foldkit/navigation";
import { literal, r, slash } from "foldkit/route";
import { evo } from "foldkit/struct";
import { Url, toString as urlToString } from "foldkit/url";

import * as AnimationBasicExample from "../registry/default/examples/animation-basic/main";
import * as ButtonBasicExample from "../registry/default/examples/button-basic/main";
import * as ButtonDisabledExample from "../registry/default/examples/button-disabled/main";
import * as CalendarBasicExample from "../registry/default/examples/calendar-basic/main";
import * as CalendarBoundsExample from "../registry/default/examples/calendar-bounds/main";
import * as CheckboxBasicExample from "../registry/default/examples/checkbox-basic/main";
import * as CheckboxIndeterminateExample from "../registry/default/examples/checkbox-indeterminate/main";
import * as ComboboxBasicExample from "../registry/default/examples/combobox-basic/main";
import * as ComboboxMultiExample from "../registry/default/examples/combobox-multi/main";
import * as DatePickerBasicExample from "../registry/default/examples/date-picker-basic/main";
import * as DatePickerBoundsExample from "../registry/default/examples/date-picker-bounds/main";
import * as DialogAnimatedExample from "../registry/default/examples/dialog-animated/main";
import * as DialogBasicExample from "../registry/default/examples/dialog-basic/main";
import * as DialogDestructiveExample from "../registry/default/examples/dialog-destructive/main";
import * as DialogFocusExample from "../registry/default/examples/dialog-focus/main";
import * as DialogScrollableExample from "../registry/default/examples/dialog-scrollable/main";
import * as DisclosureBasicExample from "../registry/default/examples/disclosure-basic/main";
import * as DisclosureDisabledExample from "../registry/default/examples/disclosure-disabled/main";
import * as DragAndDropBasicExample from "../registry/default/examples/drag-and-drop-basic/main";
import * as DragAndDropDisabledExample from "../registry/default/examples/drag-and-drop-disabled/main";
import * as FieldsetBasicExample from "../registry/default/examples/fieldset-basic/main";
import * as FieldsetDisabledExample from "../registry/default/examples/fieldset-disabled/main";
import * as FileDropBasicExample from "../registry/default/examples/file-drop-basic/main";
import * as FileDropDisabledExample from "../registry/default/examples/file-drop-disabled/main";
import * as InputBasicExample from "../registry/default/examples/input-basic/main";
import * as InputDisabledExample from "../registry/default/examples/input-disabled/main";
import * as ListboxAnimatedExample from "../registry/default/examples/listbox-animated/main";
import * as ListboxBasicExample from "../registry/default/examples/listbox-basic/main";
import * as MenuAnimatedExample from "../registry/default/examples/menu-animated/main";
import * as MenuBasicExample from "../registry/default/examples/menu-basic/main";
import * as PopoverAnimatedExample from "../registry/default/examples/popover-animated/main";
import * as PopoverBasicExample from "../registry/default/examples/popover-basic/main";
import * as RadioGroupBasicExample from "../registry/default/examples/radio-group-basic/main";
import * as RadioGroupHorizontalExample from "../registry/default/examples/radio-group-horizontal/main";
import * as SelectBasicExample from "../registry/default/examples/select-basic/main";
import * as SelectDisabledExample from "../registry/default/examples/select-disabled/main";
import * as SliderBasicExample from "../registry/default/examples/slider-basic/main";
import * as SliderDisabledExample from "../registry/default/examples/slider-disabled/main";
import * as SwitchBasicExample from "../registry/default/examples/switch-basic/main";
import * as SwitchDisabledExample from "../registry/default/examples/switch-disabled/main";
import * as TabsBasicExample from "../registry/default/examples/tabs-basic/main";
import * as TabsManualExample from "../registry/default/examples/tabs-manual/main";
import * as TextareaBasicExample from "../registry/default/examples/textarea-basic/main";
import * as TextareaDisabledExample from "../registry/default/examples/textarea-disabled/main";
import * as ToastBasicExample from "../registry/default/examples/toast-basic/main";
import * as ToastVariantsExample from "../registry/default/examples/toast-variants/main";
import * as TooltipBasicExample from "../registry/default/examples/tooltip-basic/main";
import * as TooltipNoDelayExample from "../registry/default/examples/tooltip-no-delay/main";
import * as VirtualListBasicExample from "../registry/default/examples/virtual-list-basic/main";
import * as VirtualListVariableExample from "../registry/default/examples/virtual-list-variable/main";
import * as Icon from "./icon";
import { uiInit } from "./ui/init";
import { GotMobileMenuDialogMessage, UiMessage } from "./ui/message";
import { UiModel } from "./ui/model";
import * as UiSubscriptions from "./ui/subscriptions";
import { uiUpdate } from "./ui/update";
import * as View from "./ui/view";

// ROUTE

export const HomeRoute = r("Home");
export const ButtonRoute = r("Button");
export const ButtonDocsRoute = r("ButtonDocs");
export const ButtonBasicExampleRoute = r("ButtonBasicExample");
export const ButtonDisabledExampleRoute = r("ButtonDisabledExample");
export const CalendarRoute = r("Calendar");
export const CalendarDocsRoute = r("CalendarDocs");
export const CalendarBasicExampleRoute = r("CalendarBasicExample");
export const CalendarBoundsExampleRoute = r("CalendarBoundsExample");
export const CheckboxRoute = r("Checkbox");
export const CheckboxDocsRoute = r("CheckboxDocs");
export const CheckboxBasicExampleRoute = r("CheckboxBasicExample");
export const CheckboxIndeterminateExampleRoute = r(
  "CheckboxIndeterminateExample"
);
export const ComboboxRoute = r("Combobox");
export const ComboboxDocsRoute = r("ComboboxDocs");
export const ComboboxBasicExampleRoute = r("ComboboxBasicExample");
export const ComboboxMultiExampleRoute = r("ComboboxMultiExample");
export const DatePickerRoute = r("DatePicker");
export const DatePickerDocsRoute = r("DatePickerDocs");
export const DatePickerBasicExampleRoute = r("DatePickerBasicExample");
export const DatePickerBoundsExampleRoute = r("DatePickerBoundsExample");
export const DialogRoute = r("Dialog");
export const DialogDocsRoute = r("DialogDocs");
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
export const FieldsetBasicExampleRoute = r("FieldsetBasicExample");
export const FieldsetDisabledExampleRoute = r("FieldsetDisabledExample");
export const FileDropRoute = r("FileDrop");
export const FileDropDocsRoute = r("FileDropDocs");
export const FileDropBasicExampleRoute = r("FileDropBasicExample");
export const FileDropDisabledExampleRoute = r("FileDropDisabledExample");
export const InputRoute = r("Input");
export const InputDocsRoute = r("InputDocs");
export const InputBasicExampleRoute = r("InputBasicExample");
export const InputDisabledExampleRoute = r("InputDisabledExample");
export const ListboxRoute = r("Listbox");
export const ListboxDocsRoute = r("ListboxDocs");
export const ListboxBasicExampleRoute = r("ListboxBasicExample");
export const ListboxAnimatedExampleRoute = r("ListboxAnimatedExample");
export const MenuRoute = r("Menu");
export const MenuDocsRoute = r("MenuDocs");
export const MenuBasicExampleRoute = r("MenuBasicExample");
export const MenuAnimatedExampleRoute = r("MenuAnimatedExample");
export const PopoverRoute = r("Popover");
export const PopoverDocsRoute = r("PopoverDocs");
export const PopoverBasicExampleRoute = r("PopoverBasicExample");
export const PopoverAnimatedExampleRoute = r("PopoverAnimatedExample");
export const RadioGroupRoute = r("RadioGroup");
export const RadioGroupDocsRoute = r("RadioGroupDocs");
export const RadioGroupBasicExampleRoute = r("RadioGroupBasicExample");
export const RadioGroupHorizontalExampleRoute = r(
  "RadioGroupHorizontalExample"
);
export const SelectRoute = r("Select");
export const SelectDocsRoute = r("SelectDocs");
export const SelectBasicExampleRoute = r("SelectBasicExample");
export const SelectDisabledExampleRoute = r("SelectDisabledExample");
export const SliderRoute = r("Slider");
export const SliderDocsRoute = r("SliderDocs");
export const SliderBasicExampleRoute = r("SliderBasicExample");
export const SliderDisabledExampleRoute = r("SliderDisabledExample");
export const SwitchRoute = r("Switch");
export const SwitchDocsRoute = r("SwitchDocs");
export const SwitchBasicExampleRoute = r("SwitchBasicExample");
export const SwitchDisabledExampleRoute = r("SwitchDisabledExample");
export const TabsRoute = r("Tabs");
export const TabsDocsRoute = r("TabsDocs");
export const TabsBasicExampleRoute = r("TabsBasicExample");
export const TabsManualExampleRoute = r("TabsManualExample");
export const TextareaRoute = r("Textarea");
export const TextareaDocsRoute = r("TextareaDocs");
export const TextareaBasicExampleRoute = r("TextareaBasicExample");
export const TextareaDisabledExampleRoute = r("TextareaDisabledExample");
export const ToastRoute = r("Toast");
export const ToastDocsRoute = r("ToastDocs");
export const ToastBasicExampleRoute = r("ToastBasicExample");
export const ToastVariantsExampleRoute = r("ToastVariantsExample");
export const TooltipRoute = r("Tooltip");
export const TooltipDocsRoute = r("TooltipDocs");
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
  ButtonRoute,
  ButtonDocsRoute,
  ButtonBasicExampleRoute,
  ButtonDisabledExampleRoute,
  CalendarRoute,
  CalendarDocsRoute,
  CalendarBasicExampleRoute,
  CalendarBoundsExampleRoute,
  CheckboxRoute,
  CheckboxDocsRoute,
  CheckboxBasicExampleRoute,
  CheckboxIndeterminateExampleRoute,
  ComboboxRoute,
  ComboboxDocsRoute,
  ComboboxBasicExampleRoute,
  ComboboxMultiExampleRoute,
  DatePickerRoute,
  DatePickerDocsRoute,
  DatePickerBasicExampleRoute,
  DatePickerBoundsExampleRoute,
  DialogRoute,
  DialogDocsRoute,
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
  FieldsetBasicExampleRoute,
  FieldsetDisabledExampleRoute,
  FileDropRoute,
  FileDropDocsRoute,
  FileDropBasicExampleRoute,
  FileDropDisabledExampleRoute,
  InputRoute,
  InputDocsRoute,
  InputBasicExampleRoute,
  InputDisabledExampleRoute,
  ListboxRoute,
  ListboxDocsRoute,
  ListboxBasicExampleRoute,
  ListboxAnimatedExampleRoute,
  MenuRoute,
  MenuDocsRoute,
  MenuBasicExampleRoute,
  MenuAnimatedExampleRoute,
  PopoverRoute,
  PopoverDocsRoute,
  PopoverBasicExampleRoute,
  PopoverAnimatedExampleRoute,
  RadioGroupRoute,
  RadioGroupDocsRoute,
  RadioGroupBasicExampleRoute,
  RadioGroupHorizontalExampleRoute,
  SelectRoute,
  SelectDocsRoute,
  SelectBasicExampleRoute,
  SelectDisabledExampleRoute,
  SliderRoute,
  SliderDocsRoute,
  SliderBasicExampleRoute,
  SliderDisabledExampleRoute,
  SwitchRoute,
  SwitchDocsRoute,
  SwitchBasicExampleRoute,
  SwitchDisabledExampleRoute,
  TabsRoute,
  TabsDocsRoute,
  TabsBasicExampleRoute,
  TabsManualExampleRoute,
  TextareaRoute,
  TextareaDocsRoute,
  TextareaBasicExampleRoute,
  TextareaDisabledExampleRoute,
  ToastRoute,
  ToastDocsRoute,
  ToastBasicExampleRoute,
  ToastVariantsExampleRoute,
  TooltipRoute,
  TooltipDocsRoute,
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

type AppRoute = typeof AppRoute.Type;

const homeRouter = pipe(Route.root, Route.mapTo(HomeRoute));
const buttonRouter = pipe(literal("button"), Route.mapTo(ButtonRoute));
const buttonDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("button")),
  Route.mapTo(ButtonDocsRoute)
);
const buttonBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("button")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(ButtonBasicExampleRoute)
);
const buttonDisabledExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("button")),
  slash(literal("examples")),
  slash(literal("disabled")),
  Route.mapTo(ButtonDisabledExampleRoute)
);
const buttonBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("button-basic")),
  Route.mapTo(ButtonBasicExampleRoute)
);
const buttonDisabledStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("button-disabled")),
  Route.mapTo(ButtonDisabledExampleRoute)
);
const calendarRouter = pipe(literal("calendar"), Route.mapTo(CalendarRoute));
const calendarDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("calendar")),
  Route.mapTo(CalendarDocsRoute)
);
const calendarBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("calendar")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(CalendarBasicExampleRoute)
);
const calendarBoundsExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("calendar")),
  slash(literal("examples")),
  slash(literal("bounds")),
  Route.mapTo(CalendarBoundsExampleRoute)
);
const calendarBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("calendar-basic")),
  Route.mapTo(CalendarBasicExampleRoute)
);
const calendarBoundsStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("calendar-bounds")),
  Route.mapTo(CalendarBoundsExampleRoute)
);
const checkboxRouter = pipe(literal("checkbox"), Route.mapTo(CheckboxRoute));
const checkboxDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("checkbox")),
  Route.mapTo(CheckboxDocsRoute)
);
const checkboxBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("checkbox")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(CheckboxBasicExampleRoute)
);
const checkboxIndeterminateExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("checkbox")),
  slash(literal("examples")),
  slash(literal("indeterminate")),
  Route.mapTo(CheckboxIndeterminateExampleRoute)
);
const checkboxBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("checkbox-basic")),
  Route.mapTo(CheckboxBasicExampleRoute)
);
const checkboxIndeterminateStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("checkbox-indeterminate")),
  Route.mapTo(CheckboxIndeterminateExampleRoute)
);
const comboboxRouter = pipe(literal("combobox"), Route.mapTo(ComboboxRoute));
const comboboxDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("combobox")),
  Route.mapTo(ComboboxDocsRoute)
);
const comboboxBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("combobox")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(ComboboxBasicExampleRoute)
);
const comboboxMultiExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("combobox")),
  slash(literal("examples")),
  slash(literal("multi")),
  Route.mapTo(ComboboxMultiExampleRoute)
);
const comboboxBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("combobox-basic")),
  Route.mapTo(ComboboxBasicExampleRoute)
);
const comboboxMultiStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("combobox-multi")),
  Route.mapTo(ComboboxMultiExampleRoute)
);
const datePickerRouter = pipe(
  literal("date-picker"),
  Route.mapTo(DatePickerRoute)
);
const datePickerDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("date-picker")),
  Route.mapTo(DatePickerDocsRoute)
);
const datePickerBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("date-picker")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(DatePickerBasicExampleRoute)
);
const datePickerBoundsExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("date-picker")),
  slash(literal("examples")),
  slash(literal("bounds")),
  Route.mapTo(DatePickerBoundsExampleRoute)
);
const datePickerBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("date-picker-basic")),
  Route.mapTo(DatePickerBasicExampleRoute)
);
const datePickerBoundsStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("date-picker-bounds")),
  Route.mapTo(DatePickerBoundsExampleRoute)
);
const dialogRouter = pipe(literal("dialog"), Route.mapTo(DialogRoute));
const dialogDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("dialog")),
  Route.mapTo(DialogDocsRoute)
);
const dialogBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("dialog")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(DialogBasicExampleRoute)
);
const dialogAnimatedExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("dialog")),
  slash(literal("examples")),
  slash(literal("animated")),
  Route.mapTo(DialogAnimatedExampleRoute)
);
const dialogDestructiveExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("dialog")),
  slash(literal("examples")),
  slash(literal("destructive")),
  Route.mapTo(DialogDestructiveExampleRoute)
);
const dialogFocusExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("dialog")),
  slash(literal("examples")),
  slash(literal("focus")),
  Route.mapTo(DialogFocusExampleRoute)
);
const dialogScrollableExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("dialog")),
  slash(literal("examples")),
  slash(literal("scrollable")),
  Route.mapTo(DialogScrollableExampleRoute)
);
const dialogBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("dialog-basic")),
  Route.mapTo(DialogBasicExampleRoute)
);
const dialogAnimatedStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("dialog-animated")),
  Route.mapTo(DialogAnimatedExampleRoute)
);
const dialogDestructiveStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("dialog-destructive")),
  Route.mapTo(DialogDestructiveExampleRoute)
);
const dialogFocusStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("dialog-focus")),
  Route.mapTo(DialogFocusExampleRoute)
);
const dialogScrollableStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("dialog-scrollable")),
  Route.mapTo(DialogScrollableExampleRoute)
);
const disclosureRouter = pipe(
  literal("disclosure"),
  Route.mapTo(DisclosureRoute)
);
const disclosureDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("disclosure")),
  Route.mapTo(DisclosureDocsRoute)
);
const disclosureBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("disclosure")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(DisclosureBasicExampleRoute)
);
const disclosureDisabledExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("disclosure")),
  slash(literal("examples")),
  slash(literal("disabled")),
  Route.mapTo(DisclosureDisabledExampleRoute)
);
const disclosureBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("disclosure-basic")),
  Route.mapTo(DisclosureBasicExampleRoute)
);
const disclosureDisabledStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("disclosure-disabled")),
  Route.mapTo(DisclosureDisabledExampleRoute)
);
const dragAndDropRouter = pipe(
  literal("drag-and-drop"),
  Route.mapTo(DragAndDropRoute)
);
const dragAndDropDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("drag-and-drop")),
  Route.mapTo(DragAndDropDocsRoute)
);
const dragAndDropBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("drag-and-drop")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(DragAndDropBasicExampleRoute)
);
const dragAndDropDisabledExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("drag-and-drop")),
  slash(literal("examples")),
  slash(literal("disabled")),
  Route.mapTo(DragAndDropDisabledExampleRoute)
);
const dragAndDropBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("drag-and-drop-basic")),
  Route.mapTo(DragAndDropBasicExampleRoute)
);
const dragAndDropDisabledStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("drag-and-drop-disabled")),
  Route.mapTo(DragAndDropDisabledExampleRoute)
);
const fieldsetRouter = pipe(literal("fieldset"), Route.mapTo(FieldsetRoute));
const fieldsetDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("fieldset")),
  Route.mapTo(FieldsetDocsRoute)
);
const fieldsetBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("fieldset")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(FieldsetBasicExampleRoute)
);
const fieldsetDisabledExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("fieldset")),
  slash(literal("examples")),
  slash(literal("disabled")),
  Route.mapTo(FieldsetDisabledExampleRoute)
);
const fieldsetBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("fieldset-basic")),
  Route.mapTo(FieldsetBasicExampleRoute)
);
const fieldsetDisabledStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("fieldset-disabled")),
  Route.mapTo(FieldsetDisabledExampleRoute)
);
const fileDropRouter = pipe(literal("file-drop"), Route.mapTo(FileDropRoute));
const fileDropDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("file-drop")),
  Route.mapTo(FileDropDocsRoute)
);
const fileDropBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("file-drop")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(FileDropBasicExampleRoute)
);
const fileDropDisabledExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("file-drop")),
  slash(literal("examples")),
  slash(literal("disabled")),
  Route.mapTo(FileDropDisabledExampleRoute)
);
const fileDropBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("file-drop-basic")),
  Route.mapTo(FileDropBasicExampleRoute)
);
const fileDropDisabledStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("file-drop-disabled")),
  Route.mapTo(FileDropDisabledExampleRoute)
);
const inputRouter = pipe(literal("input"), Route.mapTo(InputRoute));
const inputDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("input")),
  Route.mapTo(InputDocsRoute)
);
const inputBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("input")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(InputBasicExampleRoute)
);
const inputDisabledExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("input")),
  slash(literal("examples")),
  slash(literal("disabled")),
  Route.mapTo(InputDisabledExampleRoute)
);
const inputBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("input-basic")),
  Route.mapTo(InputBasicExampleRoute)
);
const inputDisabledStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("input-disabled")),
  Route.mapTo(InputDisabledExampleRoute)
);
const listboxRouter = pipe(literal("listbox"), Route.mapTo(ListboxRoute));
const listboxDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("listbox")),
  Route.mapTo(ListboxDocsRoute)
);
const listboxBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("listbox")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(ListboxBasicExampleRoute)
);
const listboxAnimatedExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("listbox")),
  slash(literal("examples")),
  slash(literal("animated")),
  Route.mapTo(ListboxAnimatedExampleRoute)
);
const listboxBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("listbox-basic")),
  Route.mapTo(ListboxBasicExampleRoute)
);
const listboxAnimatedStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("listbox-animated")),
  Route.mapTo(ListboxAnimatedExampleRoute)
);
const menuRouter = pipe(literal("menu"), Route.mapTo(MenuRoute));
const menuDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("menu")),
  Route.mapTo(MenuDocsRoute)
);
const menuBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("menu")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(MenuBasicExampleRoute)
);
const menuAnimatedExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("menu")),
  slash(literal("examples")),
  slash(literal("animated")),
  Route.mapTo(MenuAnimatedExampleRoute)
);
const menuBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("menu-basic")),
  Route.mapTo(MenuBasicExampleRoute)
);
const menuAnimatedStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("menu-animated")),
  Route.mapTo(MenuAnimatedExampleRoute)
);
const popoverRouter = pipe(literal("popover"), Route.mapTo(PopoverRoute));
const popoverDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("popover")),
  Route.mapTo(PopoverDocsRoute)
);
const popoverBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("popover")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(PopoverBasicExampleRoute)
);
const popoverAnimatedExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("popover")),
  slash(literal("examples")),
  slash(literal("animated")),
  Route.mapTo(PopoverAnimatedExampleRoute)
);
const popoverBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("popover-basic")),
  Route.mapTo(PopoverBasicExampleRoute)
);
const popoverAnimatedStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("popover-animated")),
  Route.mapTo(PopoverAnimatedExampleRoute)
);
const radioGroupRouter = pipe(
  literal("radio-group"),
  Route.mapTo(RadioGroupRoute)
);
const radioGroupDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("radio-group")),
  Route.mapTo(RadioGroupDocsRoute)
);
const radioGroupBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("radio-group")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(RadioGroupBasicExampleRoute)
);
const radioGroupHorizontalExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("radio-group")),
  slash(literal("examples")),
  slash(literal("horizontal")),
  Route.mapTo(RadioGroupHorizontalExampleRoute)
);
const radioGroupBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("radio-group-basic")),
  Route.mapTo(RadioGroupBasicExampleRoute)
);
const radioGroupHorizontalStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("radio-group-horizontal")),
  Route.mapTo(RadioGroupHorizontalExampleRoute)
);
const selectRouter = pipe(literal("select"), Route.mapTo(SelectRoute));
const selectDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("select")),
  Route.mapTo(SelectDocsRoute)
);
const selectBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("select")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(SelectBasicExampleRoute)
);
const selectDisabledExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("select")),
  slash(literal("examples")),
  slash(literal("disabled")),
  Route.mapTo(SelectDisabledExampleRoute)
);
const selectBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("select-basic")),
  Route.mapTo(SelectBasicExampleRoute)
);
const selectDisabledStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("select-disabled")),
  Route.mapTo(SelectDisabledExampleRoute)
);
const sliderRouter = pipe(literal("slider"), Route.mapTo(SliderRoute));
const sliderDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("slider")),
  Route.mapTo(SliderDocsRoute)
);
const sliderBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("slider")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(SliderBasicExampleRoute)
);
const sliderDisabledExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("slider")),
  slash(literal("examples")),
  slash(literal("disabled")),
  Route.mapTo(SliderDisabledExampleRoute)
);
const sliderBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("slider-basic")),
  Route.mapTo(SliderBasicExampleRoute)
);
const sliderDisabledStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("slider-disabled")),
  Route.mapTo(SliderDisabledExampleRoute)
);
const switchRouter = pipe(literal("switch"), Route.mapTo(SwitchRoute));
const switchDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("switch")),
  Route.mapTo(SwitchDocsRoute)
);
const switchBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("switch")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(SwitchBasicExampleRoute)
);
const switchDisabledExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("switch")),
  slash(literal("examples")),
  slash(literal("disabled")),
  Route.mapTo(SwitchDisabledExampleRoute)
);
const switchBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("switch-basic")),
  Route.mapTo(SwitchBasicExampleRoute)
);
const switchDisabledStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("switch-disabled")),
  Route.mapTo(SwitchDisabledExampleRoute)
);
const tabsRouter = pipe(literal("tabs"), Route.mapTo(TabsRoute));
const tabsDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("tabs")),
  Route.mapTo(TabsDocsRoute)
);
const tabsBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("tabs")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(TabsBasicExampleRoute)
);
const tabsManualExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("tabs")),
  slash(literal("examples")),
  slash(literal("manual")),
  Route.mapTo(TabsManualExampleRoute)
);
const tabsBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("tabs-basic")),
  Route.mapTo(TabsBasicExampleRoute)
);
const tabsManualStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("tabs-manual")),
  Route.mapTo(TabsManualExampleRoute)
);
const textareaRouter = pipe(literal("textarea"), Route.mapTo(TextareaRoute));
const textareaDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("textarea")),
  Route.mapTo(TextareaDocsRoute)
);
const textareaBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("textarea")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(TextareaBasicExampleRoute)
);
const textareaDisabledExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("textarea")),
  slash(literal("examples")),
  slash(literal("disabled")),
  Route.mapTo(TextareaDisabledExampleRoute)
);
const textareaBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("textarea-basic")),
  Route.mapTo(TextareaBasicExampleRoute)
);
const textareaDisabledStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("textarea-disabled")),
  Route.mapTo(TextareaDisabledExampleRoute)
);
const toastRouter = pipe(literal("toast"), Route.mapTo(ToastRoute));
const toastDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("toast")),
  Route.mapTo(ToastDocsRoute)
);
const toastBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("toast")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(ToastBasicExampleRoute)
);
const toastVariantsExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("toast")),
  slash(literal("examples")),
  slash(literal("variants")),
  Route.mapTo(ToastVariantsExampleRoute)
);
const toastBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("toast-basic")),
  Route.mapTo(ToastBasicExampleRoute)
);
const toastVariantsStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("toast-variants")),
  Route.mapTo(ToastVariantsExampleRoute)
);
const tooltipRouter = pipe(literal("tooltip"), Route.mapTo(TooltipRoute));
const tooltipDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("tooltip")),
  Route.mapTo(TooltipDocsRoute)
);
const tooltipBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("tooltip")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(TooltipBasicExampleRoute)
);
const tooltipNoDelayExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("tooltip")),
  slash(literal("examples")),
  slash(literal("no-delay")),
  Route.mapTo(TooltipNoDelayExampleRoute)
);
const tooltipBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("tooltip-basic")),
  Route.mapTo(TooltipBasicExampleRoute)
);
const tooltipNoDelayStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("tooltip-no-delay")),
  Route.mapTo(TooltipNoDelayExampleRoute)
);
const animationRouter = pipe(literal("animation"), Route.mapTo(AnimationRoute));
const animationDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("animation")),
  Route.mapTo(AnimationDocsRoute)
);
const animationBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("animation")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(AnimationBasicExampleRoute)
);
const animationBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("animation-basic")),
  Route.mapTo(AnimationBasicExampleRoute)
);
const virtualListRouter = pipe(
  literal("virtual-list"),
  Route.mapTo(VirtualListRoute)
);
const virtualListDocsRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("virtual-list")),
  Route.mapTo(VirtualListDocsRoute)
);
const virtualListBasicExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("virtual-list")),
  slash(literal("examples")),
  slash(literal("basic")),
  Route.mapTo(VirtualListBasicExampleRoute)
);
const virtualListVariableExampleRouter = pipe(
  literal("docs"),
  slash(literal("components")),
  slash(literal("virtual-list")),
  slash(literal("examples")),
  slash(literal("variable")),
  Route.mapTo(VirtualListVariableExampleRoute)
);
const virtualListBasicStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("virtual-list-basic")),
  Route.mapTo(VirtualListBasicExampleRoute)
);
const virtualListVariableStandaloneExampleRouter = pipe(
  literal("examples"),
  slash(literal("virtual-list-variable")),
  Route.mapTo(VirtualListVariableExampleRoute)
);

const routeParser = Route.oneOf(
  buttonRouter,
  buttonBasicExampleRouter,
  buttonDisabledExampleRouter,
  buttonBasicStandaloneExampleRouter,
  buttonDisabledStandaloneExampleRouter,
  buttonDocsRouter,
  calendarRouter,
  calendarBasicExampleRouter,
  calendarBoundsExampleRouter,
  calendarBasicStandaloneExampleRouter,
  calendarBoundsStandaloneExampleRouter,
  calendarDocsRouter,
  checkboxRouter,
  checkboxBasicExampleRouter,
  checkboxIndeterminateExampleRouter,
  checkboxBasicStandaloneExampleRouter,
  checkboxIndeterminateStandaloneExampleRouter,
  checkboxDocsRouter,
  comboboxRouter,
  comboboxBasicExampleRouter,
  comboboxMultiExampleRouter,
  comboboxBasicStandaloneExampleRouter,
  comboboxMultiStandaloneExampleRouter,
  comboboxDocsRouter,
  datePickerRouter,
  datePickerBasicExampleRouter,
  datePickerBoundsExampleRouter,
  datePickerBasicStandaloneExampleRouter,
  datePickerBoundsStandaloneExampleRouter,
  datePickerDocsRouter,
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
  popoverRouter,
  popoverBasicExampleRouter,
  popoverAnimatedExampleRouter,
  popoverBasicStandaloneExampleRouter,
  popoverAnimatedStandaloneExampleRouter,
  popoverDocsRouter,
  radioGroupRouter,
  radioGroupBasicExampleRouter,
  radioGroupHorizontalExampleRouter,
  radioGroupBasicStandaloneExampleRouter,
  radioGroupHorizontalStandaloneExampleRouter,
  radioGroupDocsRouter,
  selectRouter,
  selectBasicExampleRouter,
  selectDisabledExampleRouter,
  selectBasicStandaloneExampleRouter,
  selectDisabledStandaloneExampleRouter,
  selectDocsRouter,
  sliderRouter,
  sliderBasicExampleRouter,
  sliderDisabledExampleRouter,
  sliderBasicStandaloneExampleRouter,
  sliderDisabledStandaloneExampleRouter,
  sliderDocsRouter,
  switchRouter,
  switchBasicExampleRouter,
  switchDisabledExampleRouter,
  switchBasicStandaloneExampleRouter,
  switchDisabledStandaloneExampleRouter,
  switchDocsRouter,
  tabsRouter,
  tabsBasicExampleRouter,
  tabsManualExampleRouter,
  tabsBasicStandaloneExampleRouter,
  tabsManualStandaloneExampleRouter,
  tabsDocsRouter,
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
  tooltipRouter,
  tooltipBasicExampleRouter,
  tooltipNoDelayExampleRouter,
  tooltipBasicStandaloneExampleRouter,
  tooltipNoDelayStandaloneExampleRouter,
  tooltipDocsRouter,
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
  homeRouter
);

const urlToAppRoute = Route.parseUrlWithFallback(routeParser, NotFoundRoute);
const appBasePath = import.meta.env.BASE_URL;

const appPath = (path: string): string => {
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
  uiModel: UiModel,
  animationBasicExample: AnimationBasicExample.Model,
  buttonBasicExample: ButtonBasicExample.Model,
  buttonDisabledExample: ButtonDisabledExample.Model,
  calendarBasicExample: CalendarBasicExample.Model,
  calendarBoundsExample: CalendarBoundsExample.Model,
  checkboxBasicExample: CheckboxBasicExample.Model,
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
export const GotAnimationBasicExampleMessage = m(
  "GotAnimationBasicExampleMessage",
  {
    message: AnimationBasicExample.Message,
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
  GotAnimationBasicExampleMessage,
  GotButtonBasicExampleMessage,
  GotButtonDisabledExampleMessage,
  GotCalendarBasicExampleMessage,
  GotCalendarBoundsExampleMessage,
  GotCheckboxBasicExampleMessage,
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
  const [animationBasicExample, animationBasicExampleCommands] =
    AnimationBasicExample.init();
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
      animationBasicExample,
      buttonBasicExample,
      buttonDisabledExample,
      calendarBasicExample,
      calendarBoundsExample,
      checkboxBasicExample,
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
      ...Command.mapMessages(animationBasicExampleCommands, (message) =>
        GotAnimationBasicExampleMessage({ message })
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

const toUiMessage = (message: typeof UiMessage.Type): Message =>
  GotUiMessage({ message });

const toMobileMenuDialogMessage = (message: Ui.Dialog.Message): Message =>
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

// VIEW

type NavItem = Readonly<{
  label: string;
  routeTag: string;
  href: string;
}>;

const NAV_ITEMS: readonly NavItem[] = [
  { label: "Animation", routeTag: "Animation", href: animationRouter() },
  {
    label: "Animation Docs",
    routeTag: "AnimationDocs",
    href: animationDocsRouter(),
  },
  {
    label: "Animation Basic Example",
    routeTag: "AnimationBasicExample",
    href: animationBasicExampleRouter(),
  },
  { label: "Button", routeTag: "Button", href: buttonRouter() },
  { label: "Button Docs", routeTag: "ButtonDocs", href: buttonDocsRouter() },
  {
    label: "Button Basic Example",
    routeTag: "ButtonBasicExample",
    href: buttonBasicExampleRouter(),
  },
  {
    label: "Button Disabled Example",
    routeTag: "ButtonDisabledExample",
    href: buttonDisabledExampleRouter(),
  },
  { label: "Calendar", routeTag: "Calendar", href: calendarRouter() },
  {
    label: "Calendar Docs",
    routeTag: "CalendarDocs",
    href: calendarDocsRouter(),
  },
  {
    label: "Calendar Basic Example",
    routeTag: "CalendarBasicExample",
    href: calendarBasicExampleRouter(),
  },
  {
    label: "Calendar Bounds Example",
    routeTag: "CalendarBoundsExample",
    href: calendarBoundsExampleRouter(),
  },
  { label: "Checkbox", routeTag: "Checkbox", href: checkboxRouter() },
  {
    label: "Checkbox Docs",
    routeTag: "CheckboxDocs",
    href: checkboxDocsRouter(),
  },
  {
    label: "Checkbox Basic Example",
    routeTag: "CheckboxBasicExample",
    href: checkboxBasicExampleRouter(),
  },
  {
    label: "Checkbox Indeterminate Example",
    routeTag: "CheckboxIndeterminateExample",
    href: checkboxIndeterminateExampleRouter(),
  },
  { label: "Combobox", routeTag: "Combobox", href: comboboxRouter() },
  {
    label: "Combobox Docs",
    routeTag: "ComboboxDocs",
    href: comboboxDocsRouter(),
  },
  {
    label: "Combobox Basic Example",
    routeTag: "ComboboxBasicExample",
    href: comboboxBasicExampleRouter(),
  },
  {
    label: "Combobox Multi Example",
    routeTag: "ComboboxMultiExample",
    href: comboboxMultiExampleRouter(),
  },
  { label: "Date Picker", routeTag: "DatePicker", href: datePickerRouter() },
  {
    label: "Date Picker Docs",
    routeTag: "DatePickerDocs",
    href: datePickerDocsRouter(),
  },
  {
    label: "Date Picker Basic Example",
    routeTag: "DatePickerBasicExample",
    href: datePickerBasicExampleRouter(),
  },
  {
    label: "Date Picker Bounds Example",
    routeTag: "DatePickerBoundsExample",
    href: datePickerBoundsExampleRouter(),
  },
  { label: "Dialog", routeTag: "Dialog", href: dialogRouter() },
  { label: "Dialog Docs", routeTag: "DialogDocs", href: dialogDocsRouter() },
  {
    label: "Dialog Basic Example",
    routeTag: "DialogBasicExample",
    href: dialogBasicExampleRouter(),
  },
  {
    label: "Dialog Animated Example",
    routeTag: "DialogAnimatedExample",
    href: dialogAnimatedExampleRouter(),
  },
  {
    label: "Dialog Destructive Example",
    routeTag: "DialogDestructiveExample",
    href: dialogDestructiveExampleRouter(),
  },
  {
    label: "Dialog Focus Example",
    routeTag: "DialogFocusExample",
    href: dialogFocusExampleRouter(),
  },
  {
    label: "Dialog Scrollable Example",
    routeTag: "DialogScrollableExample",
    href: dialogScrollableExampleRouter(),
  },
  { label: "Disclosure", routeTag: "Disclosure", href: disclosureRouter() },
  {
    label: "Disclosure Docs",
    routeTag: "DisclosureDocs",
    href: disclosureDocsRouter(),
  },
  {
    label: "Disclosure Basic Example",
    routeTag: "DisclosureBasicExample",
    href: disclosureBasicExampleRouter(),
  },
  {
    label: "Disclosure Disabled Example",
    routeTag: "DisclosureDisabledExample",
    href: disclosureDisabledExampleRouter(),
  },
  {
    label: "Drag and Drop",
    routeTag: "DragAndDrop",
    href: dragAndDropRouter(),
  },
  {
    label: "Drag and Drop Docs",
    routeTag: "DragAndDropDocs",
    href: dragAndDropDocsRouter(),
  },
  {
    label: "Drag and Drop Basic Example",
    routeTag: "DragAndDropBasicExample",
    href: dragAndDropBasicExampleRouter(),
  },
  {
    label: "Drag and Drop Disabled Example",
    routeTag: "DragAndDropDisabledExample",
    href: dragAndDropDisabledExampleRouter(),
  },
  { label: "Fieldset", routeTag: "Fieldset", href: fieldsetRouter() },
  {
    label: "Fieldset Docs",
    routeTag: "FieldsetDocs",
    href: fieldsetDocsRouter(),
  },
  {
    label: "Fieldset Basic Example",
    routeTag: "FieldsetBasicExample",
    href: fieldsetBasicExampleRouter(),
  },
  {
    label: "Fieldset Disabled Example",
    routeTag: "FieldsetDisabledExample",
    href: fieldsetDisabledExampleRouter(),
  },
  { label: "File Drop", routeTag: "FileDrop", href: fileDropRouter() },
  {
    label: "File Drop Docs",
    routeTag: "FileDropDocs",
    href: fileDropDocsRouter(),
  },
  {
    label: "File Drop Basic Example",
    routeTag: "FileDropBasicExample",
    href: fileDropBasicExampleRouter(),
  },
  {
    label: "File Drop Disabled Example",
    routeTag: "FileDropDisabledExample",
    href: fileDropDisabledExampleRouter(),
  },
  { label: "Input", routeTag: "Input", href: inputRouter() },
  { label: "Input Docs", routeTag: "InputDocs", href: inputDocsRouter() },
  {
    label: "Input Basic Example",
    routeTag: "InputBasicExample",
    href: inputBasicExampleRouter(),
  },
  {
    label: "Input Disabled Example",
    routeTag: "InputDisabledExample",
    href: inputDisabledExampleRouter(),
  },
  { label: "Listbox", routeTag: "Listbox", href: listboxRouter() },
  {
    label: "Listbox Docs",
    routeTag: "ListboxDocs",
    href: listboxDocsRouter(),
  },
  {
    label: "Listbox Basic Example",
    routeTag: "ListboxBasicExample",
    href: listboxBasicExampleRouter(),
  },
  {
    label: "Listbox Animated Example",
    routeTag: "ListboxAnimatedExample",
    href: listboxAnimatedExampleRouter(),
  },
  { label: "Menu", routeTag: "Menu", href: menuRouter() },
  { label: "Menu Docs", routeTag: "MenuDocs", href: menuDocsRouter() },
  {
    label: "Menu Basic Example",
    routeTag: "MenuBasicExample",
    href: menuBasicExampleRouter(),
  },
  {
    label: "Menu Animated Example",
    routeTag: "MenuAnimatedExample",
    href: menuAnimatedExampleRouter(),
  },
  { label: "Popover", routeTag: "Popover", href: popoverRouter() },
  { label: "Popover Docs", routeTag: "PopoverDocs", href: popoverDocsRouter() },
  {
    label: "Popover Basic Example",
    routeTag: "PopoverBasicExample",
    href: popoverBasicExampleRouter(),
  },
  {
    label: "Popover Animated Example",
    routeTag: "PopoverAnimatedExample",
    href: popoverAnimatedExampleRouter(),
  },
  { label: "Radio Group", routeTag: "RadioGroup", href: radioGroupRouter() },
  {
    label: "Radio Group Docs",
    routeTag: "RadioGroupDocs",
    href: radioGroupDocsRouter(),
  },
  {
    label: "Radio Group Basic Example",
    routeTag: "RadioGroupBasicExample",
    href: radioGroupBasicExampleRouter(),
  },
  {
    label: "Radio Group Horizontal Example",
    routeTag: "RadioGroupHorizontalExample",
    href: radioGroupHorizontalExampleRouter(),
  },
  { label: "Select", routeTag: "Select", href: selectRouter() },
  { label: "Select Docs", routeTag: "SelectDocs", href: selectDocsRouter() },
  {
    label: "Select Basic Example",
    routeTag: "SelectBasicExample",
    href: selectBasicExampleRouter(),
  },
  {
    label: "Select Disabled Example",
    routeTag: "SelectDisabledExample",
    href: selectDisabledExampleRouter(),
  },
  { label: "Slider", routeTag: "Slider", href: sliderRouter() },
  { label: "Slider Docs", routeTag: "SliderDocs", href: sliderDocsRouter() },
  {
    label: "Slider Basic Example",
    routeTag: "SliderBasicExample",
    href: sliderBasicExampleRouter(),
  },
  {
    label: "Slider Disabled Example",
    routeTag: "SliderDisabledExample",
    href: sliderDisabledExampleRouter(),
  },
  { label: "Switch", routeTag: "Switch", href: switchRouter() },
  { label: "Switch Docs", routeTag: "SwitchDocs", href: switchDocsRouter() },
  {
    label: "Switch Basic Example",
    routeTag: "SwitchBasicExample",
    href: switchBasicExampleRouter(),
  },
  {
    label: "Switch Disabled Example",
    routeTag: "SwitchDisabledExample",
    href: switchDisabledExampleRouter(),
  },
  { label: "Tabs", routeTag: "Tabs", href: tabsRouter() },
  { label: "Tabs Docs", routeTag: "TabsDocs", href: tabsDocsRouter() },
  {
    label: "Tabs Basic Example",
    routeTag: "TabsBasicExample",
    href: tabsBasicExampleRouter(),
  },
  {
    label: "Tabs Manual Example",
    routeTag: "TabsManualExample",
    href: tabsManualExampleRouter(),
  },
  { label: "Textarea", routeTag: "Textarea", href: textareaRouter() },
  {
    label: "Textarea Docs",
    routeTag: "TextareaDocs",
    href: textareaDocsRouter(),
  },
  {
    label: "Textarea Basic Example",
    routeTag: "TextareaBasicExample",
    href: textareaBasicExampleRouter(),
  },
  {
    label: "Textarea Disabled Example",
    routeTag: "TextareaDisabledExample",
    href: textareaDisabledExampleRouter(),
  },
  { label: "Toast", routeTag: "Toast", href: toastRouter() },
  { label: "Toast Docs", routeTag: "ToastDocs", href: toastDocsRouter() },
  {
    label: "Toast Basic Example",
    routeTag: "ToastBasicExample",
    href: toastBasicExampleRouter(),
  },
  {
    label: "Toast Variants Example",
    routeTag: "ToastVariantsExample",
    href: toastVariantsExampleRouter(),
  },
  { label: "Tooltip", routeTag: "Tooltip", href: tooltipRouter() },
  {
    label: "Tooltip Docs",
    routeTag: "TooltipDocs",
    href: tooltipDocsRouter(),
  },
  {
    label: "Tooltip Basic Example",
    routeTag: "TooltipBasicExample",
    href: tooltipBasicExampleRouter(),
  },
  {
    label: "Tooltip No Delay Example",
    routeTag: "TooltipNoDelayExample",
    href: tooltipNoDelayExampleRouter(),
  },
  {
    label: "Virtual List",
    routeTag: "VirtualList",
    href: virtualListRouter(),
  },
  {
    label: "Virtual List Docs",
    routeTag: "VirtualListDocs",
    href: virtualListDocsRouter(),
  },
  {
    label: "VirtualList Basic Example",
    routeTag: "VirtualListBasicExample",
    href: virtualListBasicExampleRouter(),
  },
  {
    label: "VirtualList Variable Example",
    routeTag: "VirtualListVariableExample",
    href: virtualListVariableExampleRouter(),
  },
];

const publicPath = (path: string): string =>
  `${import.meta.env.BASE_URL}${path}`;

const EXAMPLE_SOURCE_HREF_BY_EXAMPLE_HREF: Record<string, string> = {
  [animationBasicExampleRouter()]: "sources/animation-basic.txt",
  [buttonBasicExampleRouter()]: "sources/button-basic.txt",
  [buttonDisabledExampleRouter()]: "sources/button-disabled.txt",
  [calendarBasicExampleRouter()]: "sources/calendar-basic.txt",
  [calendarBoundsExampleRouter()]: "sources/calendar-bounds.txt",
  [checkboxBasicExampleRouter()]: "sources/checkbox-basic.txt",
  [checkboxIndeterminateExampleRouter()]: "sources/checkbox-indeterminate.txt",
  [comboboxBasicExampleRouter()]: "sources/combobox-basic.txt",
  [comboboxMultiExampleRouter()]: "sources/combobox-multi.txt",
  [datePickerBasicExampleRouter()]: "sources/date-picker-basic.txt",
  [datePickerBoundsExampleRouter()]: "sources/date-picker-bounds.txt",
  [dialogAnimatedExampleRouter()]: "sources/dialog-animated.txt",
  [dialogBasicExampleRouter()]: "sources/dialog-basic.txt",
  [dialogDestructiveExampleRouter()]: "sources/dialog-destructive.txt",
  [dialogFocusExampleRouter()]: "sources/dialog-focus.txt",
  [dialogScrollableExampleRouter()]: "sources/dialog-scrollable.txt",
  [disclosureBasicExampleRouter()]: "sources/disclosure-basic.txt",
  [disclosureDisabledExampleRouter()]: "sources/disclosure-disabled.txt",
  [dragAndDropBasicExampleRouter()]: "sources/drag-and-drop-basic.txt",
  [dragAndDropDisabledExampleRouter()]: "sources/drag-and-drop-disabled.txt",
  [fieldsetBasicExampleRouter()]: "sources/fieldset-basic.txt",
  [fieldsetDisabledExampleRouter()]: "sources/fieldset-disabled.txt",
  [fileDropBasicExampleRouter()]: "sources/file-drop-basic.txt",
  [fileDropDisabledExampleRouter()]: "sources/file-drop-disabled.txt",
  [inputBasicExampleRouter()]: "sources/input-basic.txt",
  [inputDisabledExampleRouter()]: "sources/input-disabled.txt",
  [listboxAnimatedExampleRouter()]: "sources/listbox-animated.txt",
  [listboxBasicExampleRouter()]: "sources/listbox-basic.txt",
  [menuAnimatedExampleRouter()]: "sources/menu-animated.txt",
  [menuBasicExampleRouter()]: "sources/menu-basic.txt",
  [popoverAnimatedExampleRouter()]: "sources/popover-animated.txt",
  [popoverBasicExampleRouter()]: "sources/popover-basic.txt",
  [radioGroupBasicExampleRouter()]: "sources/radio-group-basic.txt",
  [radioGroupHorizontalExampleRouter()]: "sources/radio-group-horizontal.txt",
  [selectBasicExampleRouter()]: "sources/select-basic.txt",
  [selectDisabledExampleRouter()]: "sources/select-disabled.txt",
  [sliderBasicExampleRouter()]: "sources/slider-basic.txt",
  [sliderDisabledExampleRouter()]: "sources/slider-disabled.txt",
  [switchBasicExampleRouter()]: "sources/switch-basic.txt",
  [switchDisabledExampleRouter()]: "sources/switch-disabled.txt",
  [tabsBasicExampleRouter()]: "sources/tabs-basic.txt",
  [tabsManualExampleRouter()]: "sources/tabs-manual.txt",
  [textareaBasicExampleRouter()]: "sources/textarea-basic.txt",
  [textareaDisabledExampleRouter()]: "sources/textarea-disabled.txt",
  [toastBasicExampleRouter()]: "sources/toast-basic.txt",
  [toastVariantsExampleRouter()]: "sources/toast-variants.txt",
  [tooltipBasicExampleRouter()]: "sources/tooltip-basic.txt",
  [tooltipNoDelayExampleRouter()]: "sources/tooltip-no-delay.txt",
  [virtualListBasicExampleRouter()]: "sources/virtual-list-basic.txt",
  [virtualListVariableExampleRouter()]: "sources/virtual-list-variable.txt",
};

const DOCS_NAV_ITEMS = NAV_ITEMS.filter((navItem) =>
  navItem.routeTag.endsWith("Docs")
).map((navItem) => ({
  ...navItem,
  label: navItem.label.replace(/ Docs$/u, ""),
}));

const navLinkClassName = (isActive: boolean): string =>
  clsx(
    "block px-3 py-1.5 rounded-md text-sm transition-colors",
    isActive
      ? "bg-accent-100 text-accent-700"
      : "text-gray-700 hover:bg-gray-200"
  );

const mobileNavLinkClassName = (isActive: boolean): string =>
  clsx(
    "block px-4 py-2.5 rounded-md text-base transition-colors",
    isActive
      ? "bg-accent-100 text-accent-700"
      : "text-gray-700 hover:bg-gray-200"
  );

const sidebarView = (currentRoute: AppRoute): Html => {
  const h = html<Message>();

  return h.nav(
    [
      h.Class(
        "hidden md:flex w-56 shrink-0 border-r border-gray-200 bg-gray-50 p-4 flex-col"
      ),
    ],
    [
      h.div(
        [h.Class("mb-6")],
        [
          h.a(
            [h.Href(appPath(homeRouter())), h.Class("block")],
            [h.h1([h.Class("text-lg font-bold text-gray-900")], ["Foldkit UI"])]
          ),
          h.span([h.Class("text-xs text-gray-500")], ["Component Showcase"]),
        ]
      ),
      h.ul(
        [h.Class("flex flex-col gap-0.5")],
        DOCS_NAV_ITEMS.map((navItem) =>
          h.li(
            [],
            [
              h.a(
                [
                  h.Href(appPath(navItem.href)),
                  h.Class(
                    navLinkClassName(currentRoute._tag === navItem.routeTag)
                  ),
                ],
                [navItem.label]
              ),
            ]
          )
        )
      ),
    ]
  );
};

const mobileMenuContent = (currentRoute: AppRoute): Html => {
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
            [h.Href(appPath(homeRouter())), h.Class("block")],
            [
              h.div(
                [h.Class("flex flex-col")],
                [
                  h.span(
                    [h.Class("text-base font-bold text-gray-900")],
                    ["Foldkit UI"]
                  ),
                  h.span(
                    [h.Class("text-xs text-gray-500")],
                    ["Component Showcase"]
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
              h.OnClick(toMobileMenuDialogMessage(Ui.Dialog.RequestedClose())),
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
          h.ul(
            [h.Class("flex flex-col gap-0.5")],
            DOCS_NAV_ITEMS.map((navItem) =>
              h.li(
                [],
                [
                  h.a(
                    [
                      h.Href(appPath(navItem.href)),
                      h.Class(
                        mobileNavLinkClassName(
                          currentRoute._tag === navItem.routeTag
                        )
                      ),
                    ],
                    [navItem.label]
                  ),
                ]
              )
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
        [h.Href(appPath(homeRouter())), h.Class("block")],
        [
          h.div(
            [h.Class("flex flex-col")],
            [
              h.span(
                [h.Class("text-base font-bold text-gray-900")],
                ["Foldkit UI"]
              ),
              h.span(
                [h.Class("text-xs text-gray-500")],
                ["Component Showcase"]
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
          h.OnClick(toMobileMenuDialogMessage(Ui.Dialog.RequestedOpen())),
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
    toParentMessage: (message) => toMobileMenuDialogMessage(message),
  });
};

const homeView = (): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-2xl")],
    [
      h.h1(
        [h.Class("text-2xl md:text-3xl font-bold text-gray-900 mb-4")],
        ["Foldkit UI Showcase"]
      ),
      h.p(
        [h.Class("text-gray-600 mb-4")],
        [
          "This is a showcase of every Foldkit UI component. Select a component from the menu to see it in action.",
        ]
      ),
      h.p(
        [h.Class("text-gray-600")],
        [
          "Each component is headless. You provide the markup and styling via a callback, and Foldkit handles accessibility, keyboard navigation, and state management.",
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
        [
          h.Href(appPath(homeRouter())),
          h.Class("text-accent-600 hover:underline"),
        ],
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

const docsMetaGrid = (items: readonly DocsMetaItem[]): Html => {
  const h = html<Message>();

  return h.section(
    [
      h.Class(
        "grid gap-3 border-y border-gray-200 py-4 text-sm text-gray-700 sm:grid-cols-3"
      ),
    ],
    items.map((item) =>
      h.div(
        [h.Class("space-y-1")],
        [
          h.p([h.Class("font-medium text-gray-950")], [item.label]),
          h.p([], [item.value]),
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
  apiItems: readonly string[];
  accessibilityItems: readonly string[];
  coverageItems: readonly string[];
}>;

const docsStandardComponentSections = ({
  installCommands,
  usageBody,
  usageCode,
  integrationCode,
  apiItems,
  accessibilityItems,
  coverageItems,
}: DocsStandardComponentSectionsInput): readonly Html[] => [
  docsInstallBlock(installCommands),
  docsUsageBlock(usageBody, usageCode),
  docsFoldkitIntegrationBlock(integrationCode),
  docsStylingBlock(),
  docsKeyboardInteractionBlock(),
  docsApiList(apiItems),
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
  const sourceHref = publicPath(
    EXAMPLE_SOURCE_HREF_BY_EXAMPLE_HREF[href] ?? ""
  );

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

const animationBasicExamplePreview = (
  model: AnimationBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: AnimationBasicExample.view,
    toParentMessage: (message) => GotAnimationBasicExampleMessage({ message }),
  });
};

const buttonBasicExamplePreview = (
  model: ButtonBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ButtonBasicExample.view,
    toParentMessage: (message) => GotButtonBasicExampleMessage({ message }),
  });
};

const buttonDisabledExamplePreview = (
  model: ButtonDisabledExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ButtonDisabledExample.view,
    toParentMessage: (message) => GotButtonDisabledExampleMessage({ message }),
  });
};

const calendarBasicExamplePreview = (
  model: CalendarBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: CalendarBasicExample.view,
    toParentMessage: (message) => GotCalendarBasicExampleMessage({ message }),
  });
};

const calendarBoundsExamplePreview = (
  model: CalendarBoundsExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: CalendarBoundsExample.view,
    toParentMessage: (message) => GotCalendarBoundsExampleMessage({ message }),
  });
};

const checkboxBasicExamplePreview = (
  model: CheckboxBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: CheckboxBasicExample.view,
    toParentMessage: (message) => GotCheckboxBasicExampleMessage({ message }),
  });
};

const checkboxIndeterminateExamplePreview = (
  model: CheckboxIndeterminateExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: CheckboxIndeterminateExample.view,
    toParentMessage: (message) =>
      GotCheckboxIndeterminateExampleMessage({ message }),
  });
};

const switchBasicExamplePreview = (
  model: SwitchBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: SwitchBasicExample.view,
    toParentMessage: (message) => GotSwitchBasicExampleMessage({ message }),
  });
};

const switchDisabledExamplePreview = (
  model: SwitchDisabledExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: SwitchDisabledExample.view,
    toParentMessage: (message) => GotSwitchDisabledExampleMessage({ message }),
  });
};

const sliderBasicExamplePreview = (
  model: SliderBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: SliderBasicExample.view,
    toParentMessage: (message) => GotSliderBasicExampleMessage({ message }),
  });
};

const sliderDisabledExamplePreview = (
  model: SliderDisabledExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: SliderDisabledExample.view,
    toParentMessage: (message) => GotSliderDisabledExampleMessage({ message }),
  });
};

const tabsBasicExamplePreview = (
  model: TabsBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: TabsBasicExample.view,
    toParentMessage: (message) => GotTabsBasicExampleMessage({ message }),
  });
};

const tabsManualExamplePreview = (
  model: TabsManualExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: TabsManualExample.view,
    toParentMessage: (message) => GotTabsManualExampleMessage({ message }),
  });
};

const tooltipBasicExamplePreview = (
  model: TooltipBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: TooltipBasicExample.view,
    toParentMessage: (message) => GotTooltipBasicExampleMessage({ message }),
  });
};

const tooltipNoDelayExamplePreview = (
  model: TooltipNoDelayExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: TooltipNoDelayExample.view,
    toParentMessage: (message) => GotTooltipNoDelayExampleMessage({ message }),
  });
};

const virtualListBasicExamplePreview = (
  model: VirtualListBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: VirtualListBasicExample.view,
    toParentMessage: (message) =>
      GotVirtualListBasicExampleMessage({ message }),
  });
};

const virtualListVariableExamplePreview = (
  model: VirtualListVariableExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: VirtualListVariableExample.view,
    toParentMessage: (message) =>
      GotVirtualListVariableExampleMessage({ message }),
  });
};

const dialogBasicExamplePreview = (
  model: DialogBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DialogBasicExample.view,
    toParentMessage: (message) => GotDialogBasicExampleMessage({ message }),
  });
};

const dialogAnimatedExamplePreview = (
  model: DialogAnimatedExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DialogAnimatedExample.view,
    toParentMessage: (message) => GotDialogAnimatedExampleMessage({ message }),
  });
};

const dialogDestructiveExamplePreview = (
  model: DialogDestructiveExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DialogDestructiveExample.view,
    toParentMessage: (message) =>
      GotDialogDestructiveExampleMessage({ message }),
  });
};

const dialogFocusExamplePreview = (
  model: DialogFocusExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DialogFocusExample.view,
    toParentMessage: (message) => GotDialogFocusExampleMessage({ message }),
  });
};

const dialogScrollableExamplePreview = (
  model: DialogScrollableExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DialogScrollableExample.view,
    toParentMessage: (message) =>
      GotDialogScrollableExampleMessage({ message }),
  });
};

const disclosureBasicExamplePreview = (
  model: DisclosureBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DisclosureBasicExample.view,
    toParentMessage: (message) => GotDisclosureBasicExampleMessage({ message }),
  });
};

const disclosureDisabledExamplePreview = (
  model: DisclosureDisabledExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DisclosureDisabledExample.view,
    toParentMessage: (message) =>
      GotDisclosureDisabledExampleMessage({ message }),
  });
};

const dragAndDropBasicExamplePreview = (
  model: DragAndDropBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DragAndDropBasicExample.view,
    toParentMessage: (message) =>
      GotDragAndDropBasicExampleMessage({ message }),
  });
};

const dragAndDropDisabledExamplePreview = (
  model: DragAndDropDisabledExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DragAndDropDisabledExample.view,
    toParentMessage: (message) =>
      GotDragAndDropDisabledExampleMessage({ message }),
  });
};

const fieldsetBasicExamplePreview = (
  model: FieldsetBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: FieldsetBasicExample.view,
    toParentMessage: (message) => GotFieldsetBasicExampleMessage({ message }),
  });
};

const fieldsetDisabledExamplePreview = (
  model: FieldsetDisabledExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: FieldsetDisabledExample.view,
    toParentMessage: (message) =>
      GotFieldsetDisabledExampleMessage({ message }),
  });
};

const fileDropBasicExamplePreview = (
  model: FileDropBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: FileDropBasicExample.view,
    toParentMessage: (message) => GotFileDropBasicExampleMessage({ message }),
  });
};

const fileDropDisabledExamplePreview = (
  model: FileDropDisabledExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: FileDropDisabledExample.view,
    toParentMessage: (message) =>
      GotFileDropDisabledExampleMessage({ message }),
  });
};

const listboxBasicExamplePreview = (
  model: ListboxBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ListboxBasicExample.view,
    toParentMessage: (message) => GotListboxBasicExampleMessage({ message }),
  });
};

const listboxAnimatedExamplePreview = (
  model: ListboxAnimatedExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ListboxAnimatedExample.view,
    toParentMessage: (message) => GotListboxAnimatedExampleMessage({ message }),
  });
};

const menuBasicExamplePreview = (
  model: MenuBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: MenuBasicExample.view,
    toParentMessage: (message) => GotMenuBasicExampleMessage({ message }),
  });
};

const menuAnimatedExamplePreview = (
  model: MenuAnimatedExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: MenuAnimatedExample.view,
    toParentMessage: (message) => GotMenuAnimatedExampleMessage({ message }),
  });
};

const popoverBasicExamplePreview = (
  model: PopoverBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: PopoverBasicExample.view,
    toParentMessage: (message) => GotPopoverBasicExampleMessage({ message }),
  });
};

const popoverAnimatedExamplePreview = (
  model: PopoverAnimatedExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: PopoverAnimatedExample.view,
    toParentMessage: (message) => GotPopoverAnimatedExampleMessage({ message }),
  });
};

const radioGroupBasicExamplePreview = (
  model: RadioGroupBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: RadioGroupBasicExample.view,
    toParentMessage: (message) => GotRadioGroupBasicExampleMessage({ message }),
  });
};

const radioGroupHorizontalExamplePreview = (
  model: RadioGroupHorizontalExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: RadioGroupHorizontalExample.view,
    toParentMessage: (message) =>
      GotRadioGroupHorizontalExampleMessage({ message }),
  });
};

const selectBasicExamplePreview = (
  model: SelectBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: SelectBasicExample.view,
    toParentMessage: (message) => GotSelectBasicExampleMessage({ message }),
  });
};

const selectDisabledExamplePreview = (
  model: SelectDisabledExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: SelectDisabledExample.view,
    toParentMessage: (message) => GotSelectDisabledExampleMessage({ message }),
  });
};

const comboboxBasicExamplePreview = (
  model: ComboboxBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ComboboxBasicExample.view,
    toParentMessage: (message) => GotComboboxBasicExampleMessage({ message }),
  });
};

const comboboxMultiExamplePreview = (
  model: ComboboxMultiExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ComboboxMultiExample.view,
    toParentMessage: (message) => GotComboboxMultiExampleMessage({ message }),
  });
};

const datePickerBasicExamplePreview = (
  model: DatePickerBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DatePickerBasicExample.view,
    toParentMessage: (message) => GotDatePickerBasicExampleMessage({ message }),
  });
};

const datePickerBoundsExamplePreview = (
  model: DatePickerBoundsExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: DatePickerBoundsExample.view,
    toParentMessage: (message) =>
      GotDatePickerBoundsExampleMessage({ message }),
  });
};

const inputBasicExamplePreview = (
  model: InputBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: InputBasicExample.view,
    toParentMessage: (message) => GotInputBasicExampleMessage({ message }),
  });
};

const inputDisabledExamplePreview = (
  model: InputDisabledExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: InputDisabledExample.view,
    toParentMessage: (message) => GotInputDisabledExampleMessage({ message }),
  });
};

const textareaBasicExamplePreview = (
  model: TextareaBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: TextareaBasicExample.view,
    toParentMessage: (message) => GotTextareaBasicExampleMessage({ message }),
  });
};

const textareaDisabledExamplePreview = (
  model: TextareaDisabledExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: TextareaDisabledExample.view,
    toParentMessage: (message) =>
      GotTextareaDisabledExampleMessage({ message }),
  });
};

const toastBasicExamplePreview = (
  model: ToastBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ToastBasicExample.view,
    toParentMessage: (message) => GotToastBasicExampleMessage({ message }),
  });
};

const toastVariantsExamplePreview = (
  model: ToastVariantsExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ToastVariantsExample.view,
    toParentMessage: (message) => GotToastVariantsExampleMessage({ message }),
  });
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
        { label: "Examples", value: "basic, indeterminate" },
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
                preview: checkboxBasicExamplePreview(
                  model.checkboxBasicExample,
                  "checkbox-docs-basic-preview"
                ),
                href: checkboxBasicExampleRouter(),
                linkText: "Open standalone Checkbox Basic example",
              }),
              docsExampleBlock({
                title: "Indeterminate",
                testId: "docs-example-block-checkbox-indeterminate",
                preview: checkboxIndeterminateExamplePreview(
                  model.checkboxIndeterminateExample,
                  "checkbox-docs-indeterminate-preview"
                ),
                href: checkboxIndeterminateExampleRouter(),
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
  toParentMessage: (message) => GotCheckboxMessage({ message }),
});`,
        integrationCode: `// Model
checkbox: Checkbox.Model;

// Message
GotCheckboxMessage({ message: Checkbox.Message });

// Update
GotCheckboxMessage: ({ message }) => {
  const [checkbox, commands] = Checkbox.update(model.checkbox, message);

  return [
    evo(model, { checkbox: () => checkbox }),
    Command.mapMessages(commands, (message) => GotCheckboxMessage({ message })),
  ];
};`,
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
                preview: sliderBasicExamplePreview(
                  model.sliderBasicExample,
                  "slider-docs-basic-preview"
                ),
                href: sliderBasicExampleRouter(),
                linkText: "Open standalone Slider Basic example",
              }),
              docsExampleBlock({
                title: "Disabled",
                testId: "docs-example-block-slider-disabled",
                preview: sliderDisabledExamplePreview(
                  model.sliderDisabledExample,
                  "slider-docs-disabled-preview"
                ),
                href: sliderDisabledExampleRouter(),
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
GotSliderMessage({ message: Slider.Message });

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
  toParentMessage: (message) => GotSliderMessage({ message }),
});`,
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
                preview: switchBasicExamplePreview(
                  model.switchBasicExample,
                  "switch-docs-basic-preview"
                ),
                href: switchBasicExampleRouter(),
                linkText: "Open standalone Switch Basic example",
              }),
              docsExampleBlock({
                title: "Disabled",
                testId: "docs-example-block-switch-disabled",
                preview: switchDisabledExamplePreview(
                  model.switchDisabledExample,
                  "switch-docs-disabled-preview"
                ),
                href: switchDisabledExampleRouter(),
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
  toParentMessage: (message) => GotSwitchMessage({ message }),
});`,
        integrationCode: `// Model
switchModel: Switch.Model;

// Message
GotSwitchMessage({ message: Switch.Message });

// Update
GotSwitchMessage: ({ message }) => {
  const [switchModel, commands] = Switch.update(model.switchModel, message);

  return [
    evo(model, { switchModel: () => switchModel }),
    Command.mapMessages(commands, (message) => GotSwitchMessage({ message })),
  ];
};`,
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
        { label: "Examples", value: "basic" },
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
                preview: animationBasicExamplePreview(
                  model.animationBasicExample,
                  "animation-docs-basic-preview"
                ),
                href: animationBasicExampleRouter(),
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
GotAnimationMessage({ message: Animation.Message });

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
  toParentMessage: (message) => GotAnimationMessage({ message }),
});`,
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
                preview: virtualListBasicExamplePreview(
                  model.virtualListBasicExample,
                  "virtual-list-docs-basic-preview"
                ),
                href: virtualListBasicExampleRouter(),
                linkText: "Open standalone VirtualList Basic example",
              }),
              docsExampleBlock({
                title: "Variable",
                description:
                  "Variable row heights with per-item height callbacks.",
                testId: "docs-example-block-virtual-list-variable",
                preview: virtualListVariableExamplePreview(
                  model.virtualListVariableExample,
                  "virtual-list-docs-variable-preview"
                ),
                href: virtualListVariableExampleRouter(),
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
  toParentMessage: (message) => GotVirtualListMessage({ message }),
});`,
        integrationCode: `// Model
virtualList: VirtualList.Model;

// Message
GotVirtualListMessage({ message: VirtualList.Message });

// Update
GotVirtualListMessage: ({ message }) => {
  const [virtualList, commands] = VirtualList.update(model.virtualList, message);

  return [
    evo(model, { virtualList: () => virtualList }),
    Command.mapMessages(commands, (message) => GotVirtualListMessage({ message })),
  ];
};

// Subscriptions
Subscription.lift({
  virtualListContainerEvents: VirtualList.subscriptions.containerEvents,
})({
  toChildModel: (model) => model.virtualList,
  toParentMessage: (message) => GotVirtualListMessage({ message }),
});`,
        apiItems: [
          "Model: schema-backed id, rowHeightPx, scrollTop, measurement, pendingScroll, and pendingScrollVersion.",
          "init(config): creates an unmeasured VirtualList model.",
          "update(model, message): handles ScrolledContainer, MeasuredContainer, and CompletedApplyScroll messages.",
          "scrollToIndex(model, index): computes fixed-height scroll offset and emits ApplyScroll.",
          "scrollToIndexVariable(model, items, itemToRowHeightPx, index): computes variable-height scroll offset and emits ApplyScroll.",
          "visibleWindow and visibleWindowVariable: compute mounted range and spacer heights for fixed or variable rows.",
          "subscriptions.containerEvents: attaches scroll and ResizeObserver streams to the list container by id.",
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
                preview: buttonBasicExamplePreview(
                  model.buttonBasicExample,
                  "button-docs-basic-preview"
                ),
                href: buttonBasicExampleRouter(),
                linkText: "Open standalone Button Basic example",
              }),
              docsExampleBlock({
                title: "Disabled",
                testId: "docs-example-block-button-disabled",
                preview: buttonDisabledExamplePreview(
                  model.buttonDisabledExample,
                  "button-docs-disabled-preview"
                ),
                href: buttonDisabledExampleRouter(),
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
                preview: calendarBasicExamplePreview(
                  model.calendarBasicExample,
                  "calendar-docs-basic-preview"
                ),
                href: calendarBasicExampleRouter(),
                linkText: "Open standalone Calendar Basic example",
              }),
              docsExampleBlock({
                title: "Bounds",
                testId: "docs-example-block-calendar-bounds",
                preview: calendarBoundsExamplePreview(
                  model.calendarBoundsExample,
                  "calendar-docs-bounds-preview"
                ),
                href: calendarBoundsExampleRouter(),
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
GotCalendarMessage({ message: Calendar.Message });

// Update
const [calendar, commands, maybeOutMessage] =
  Calendar.update(model.calendar, message);

// View
h.submodel({
  slotId: model.calendar.id,
  model: model.calendar,
  view: Calendar.view,
  viewInputs: { toView: Calendar.calendarView },
  toParentMessage: (message) => GotCalendarMessage({ message }),
});`,
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
                preview: datePickerBasicExamplePreview(
                  model.datePickerBasicExample,
                  "date-picker-docs-basic-preview"
                ),
                href: datePickerBasicExampleRouter(),
                linkText: "Open standalone Date Picker Basic example",
              }),
              docsExampleBlock({
                title: "Bounds",
                testId: "docs-example-block-date-picker-bounds",
                preview: datePickerBoundsExamplePreview(
                  model.datePickerBoundsExample,
                  "date-picker-docs-bounds-preview"
                ),
                href: datePickerBoundsExampleRouter(),
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
GotDatePickerMessage({ message: DatePicker.Message });

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
  toParentMessage: (message) => GotDatePickerMessage({ message }),
});`,
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
                preview: disclosureBasicExamplePreview(
                  model.disclosureBasicExample,
                  "disclosure-docs-basic-preview"
                ),
                href: disclosureBasicExampleRouter(),
                linkText: "Open standalone Disclosure Basic example",
              }),
              docsExampleBlock({
                title: "Disabled",
                testId: "docs-example-block-disclosure-disabled",
                preview: disclosureDisabledExamplePreview(
                  model.disclosureDisabledExample,
                  "disclosure-docs-disabled-preview"
                ),
                href: disclosureDisabledExampleRouter(),
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
GotDisclosureMessage({ message: Disclosure.Message });

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
  toParentMessage: (message) => GotDisclosureMessage({ message }),
});`,
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
                preview: dragAndDropBasicExamplePreview(
                  model.dragAndDropBasicExample,
                  "drag-and-drop-docs-basic-preview"
                ),
                href: dragAndDropBasicExampleRouter(),
                linkText: "Open standalone Drag and Drop Basic example",
              }),
              docsExampleBlock({
                title: "Disabled",
                testId: "docs-example-block-drag-and-drop-disabled",
                preview: dragAndDropDisabledExamplePreview(
                  model.dragAndDropDisabledExample,
                  "drag-and-drop-docs-disabled-preview"
                ),
                href: dragAndDropDisabledExampleRouter(),
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
GotDragAndDropMessage({ message: DragAndDrop.Message });

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
    GotDragAndDropMessage({ message }),
});`,
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
                preview: fieldsetBasicExamplePreview(
                  model.fieldsetBasicExample,
                  "fieldset-docs-basic-preview"
                ),
                href: fieldsetBasicExampleRouter(),
                linkText: "Open standalone Fieldset Basic example",
              }),
              docsExampleBlock({
                title: "Disabled",
                testId: "docs-example-block-fieldset-disabled",
                preview: fieldsetDisabledExamplePreview(
                  model.fieldsetDisabledExample,
                  "fieldset-docs-disabled-preview"
                ),
                href: fieldsetDisabledExampleRouter(),
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
                preview: fileDropBasicExamplePreview(
                  model.fileDropBasicExample,
                  "file-drop-docs-basic-preview"
                ),
                href: fileDropBasicExampleRouter(),
                linkText: "Open standalone File Drop Basic example",
              }),
              docsExampleBlock({
                title: "Disabled",
                testId: "docs-example-block-file-drop-disabled",
                preview: fileDropDisabledExamplePreview(
                  model.fileDropDisabledExample,
                  "file-drop-docs-disabled-preview"
                ),
                href: fileDropDisabledExampleRouter(),
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
GotFileDropMessage({ message: FileDrop.Message });

// Update
const [fileDrop, commands, maybeOutMessage] =
  FileDrop.update(model.fileDrop, message);

// View
h.submodel({
  slotId: model.fileDrop.id,
  model: model.fileDrop,
  view: FileDrop.view,
  viewInputs,
  toParentMessage: (message) => GotFileDropMessage({ message }),
});`,
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
                preview: inputBasicExamplePreview(
                  model.inputBasicExample,
                  "input-docs-basic-preview"
                ),
                href: inputBasicExampleRouter(),
                linkText: "Open standalone Input Basic example",
              }),
              docsExampleBlock({
                title: "Disabled",
                testId: "docs-example-block-input-disabled",
                preview: inputDisabledExamplePreview(
                  model.inputDisabledExample,
                  "input-docs-disabled-preview"
                ),
                href: inputDisabledExampleRouter(),
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
                preview: tabsBasicExamplePreview(
                  model.tabsBasicExample,
                  "tabs-docs-basic-preview"
                ),
                href: tabsBasicExampleRouter(),
                linkText: "Open standalone Tabs Basic example",
              }),
              docsExampleBlock({
                title: "Vertical",
                testId: "docs-example-block-tabs-manual",
                preview: tabsManualExamplePreview(
                  model.tabsManualExample,
                  "tabs-docs-manual-preview"
                ),
                href: tabsManualExampleRouter(),
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
GotTabsMessage({ message: Tabs.Message });

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
  toParentMessage: (message) => GotTabsMessage({ message }),
});`,
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
                preview: textareaBasicExamplePreview(
                  model.textareaBasicExample,
                  "textarea-docs-basic-preview"
                ),
                href: textareaBasicExampleRouter(),
                linkText: "Open standalone Textarea Basic example",
              }),
              docsExampleBlock({
                title: "Disabled",
                testId: "docs-example-block-textarea-disabled",
                preview: textareaDisabledExamplePreview(
                  model.textareaDisabledExample,
                  "textarea-docs-disabled-preview"
                ),
                href: textareaDisabledExampleRouter(),
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
        apiItems: [
          "view(config): renders a native textarea through the supplied toView callback.",
          "descriptionId(id): returns the generated description id for custom composition.",
          "TextareaAttributes: grouped textarea, label, and description attributes.",
          "ViewConfig: id, value, onInput, isDisabled, isInvalid, isAutofocus, name, rows, and placeholder.",
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
                preview: toastBasicExamplePreview(
                  model.toastBasicExample,
                  "toast-docs-basic-preview"
                ),
                href: toastBasicExampleRouter(),
                linkText: "Open standalone Toast Basic example",
              }),
              docsExampleBlock({
                title: "Variants",
                testId: "docs-example-block-toast-variants",
                preview: toastVariantsExamplePreview(
                  model.toastVariantsExample,
                  "toast-docs-variants-preview"
                ),
                href: toastVariantsExampleRouter(),
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
GotToastMessage({ message: Toast.Message });

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
  toParentMessage: (message) => GotToastMessage({ message }),
});`,
        apiItems: [
          "ToastPayload: schema-backed title and optional description for registry examples.",
          "init(config): creates an empty toast stack model with a default duration.",
          "show(model, input): appends a typed entry and starts the animation/timer lifecycle.",
          "dismiss and dismissAll: begin leave animation for one entry or all entries.",
          "update(model, message): returns model, commands, and an optional DismissedToast OutMessage.",
          "toastEntryView: reusable styled entry renderer that spreads EntryHandlers.dismiss onto the close button.",
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
                preview: tooltipBasicExamplePreview(
                  model.tooltipBasicExample,
                  "tooltip-docs-basic-preview"
                ),
                href: tooltipBasicExampleRouter(),
                linkText: "Open standalone Tooltip Basic example",
              }),
              docsExampleBlock({
                title: "No delay",
                testId: "docs-example-block-tooltip-no-delay",
                preview: tooltipNoDelayExamplePreview(
                  model.tooltipNoDelayExample,
                  "tooltip-docs-no-delay-preview"
                ),
                href: tooltipNoDelayExampleRouter(),
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
  toParentMessage: (message) => GotTooltipMessage({ message }),
});`,
        integrationCode: `// Model
tooltip: Tooltip.Model;

// Message
GotTooltipMessage({ message: Tooltip.Message });

// Update
const [tooltip, commands, maybeOutMessage] =
  Tooltip.update(model.tooltip, message);

// View
h.submodel({
  slotId: model.tooltip.id,
  model: model.tooltip,
  view: Tooltip.view,
  viewInputs,
  toParentMessage: (message) => GotTooltipMessage({ message }),
});`,
        apiItems: [
          "Model: schema-backed state containing id, open state, hover/focus state, dismissal state, showDelay, and pending timer version.",
          "init(config): creates a Tooltip model and returns the registry init tuple.",
          "update(model, message): returns model, commands, and an optional Shown or Hidden OutMessage.",
          "ShowAfterDelay: command emitted when hover should open after the configured delay.",
          "AnchorTooltip: mount emitted by the panel to position it relative to the trigger.",
          "reflectShowDelay: mirrors externally controlled delay configuration without emitting OutMessage.",
          "ViewInputs and RenderInfo: trigger attributes, panel attributes, visibility, disabled state, and anchor configuration for custom composition.",
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
                preview: comboboxBasicExamplePreview(
                  model.comboboxBasicExample,
                  "combobox-docs-basic-preview"
                ),
                href: comboboxBasicExampleRouter(),
                linkText: "Open standalone Combobox Basic example",
              }),
              docsExampleBlock({
                title: "Multi",
                testId: "docs-example-block-combobox-multi",
                preview: comboboxMultiExamplePreview(
                  model.comboboxMultiExample,
                  "combobox-docs-multi-preview"
                ),
                href: comboboxMultiExampleRouter(),
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
GotComboboxMessage({ message: Combobox.Message });

// Update
const [cityCombobox, commands, maybeOutMessage] =
  CityCombobox.update(model.cityCombobox, message);`,
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
                preview: radioGroupBasicExamplePreview(
                  model.radioGroupBasicExample,
                  "radio-group-docs-basic-preview"
                ),
                href: radioGroupBasicExampleRouter(),
                linkText: "Open standalone Radio Group Basic example",
              }),
              docsExampleBlock({
                title: "Horizontal",
                testId: "docs-example-block-radio-group-horizontal",
                preview: radioGroupHorizontalExamplePreview(
                  model.radioGroupHorizontalExample,
                  "radio-group-docs-horizontal-preview"
                ),
                href: radioGroupHorizontalExampleRouter(),
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
GotRadioGroupMessage({ message: RadioGroup.Message });

// Update
const [radioGroup, commands] =
  PlanRadioGroup.update(model.radioGroup, message);

// View
h.submodel({
  slotId: model.radioGroup.id,
  model: model.radioGroup,
  view: PlanRadioGroup.view,
  viewInputs,
  toParentMessage: (message) => GotRadioGroupMessage({ message }),
});`,
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
                preview: selectBasicExamplePreview(
                  model.selectBasicExample,
                  "select-docs-basic-preview"
                ),
                href: selectBasicExampleRouter(),
                linkText: "Open standalone Select Basic example",
              }),
              docsExampleBlock({
                title: "Disabled",
                testId: "docs-example-block-select-disabled",
                preview: selectDisabledExamplePreview(
                  model.selectDisabledExample,
                  "select-docs-disabled-preview"
                ),
                href: selectDisabledExampleRouter(),
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
                preview: listboxBasicExamplePreview(
                  model.listboxBasicExample,
                  "listbox-docs-basic-preview"
                ),
                href: listboxBasicExampleRouter(),
                linkText: "Open standalone Listbox Basic example",
              }),
              docsExampleBlock({
                title: "Animated",
                testId: "docs-example-block-listbox-animated",
                preview: listboxAnimatedExamplePreview(
                  model.listboxAnimatedExample,
                  "listbox-docs-animated-preview"
                ),
                href: listboxAnimatedExampleRouter(),
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
GotListboxMessage({ message: Listbox.Message });

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
                preview: menuBasicExamplePreview(
                  model.menuBasicExample,
                  "menu-docs-basic-preview"
                ),
                href: menuBasicExampleRouter(),
                linkText: "Open standalone Menu Basic example",
              }),
              docsExampleBlock({
                title: "Animated",
                testId: "docs-example-block-menu-animated",
                preview: menuAnimatedExamplePreview(
                  model.menuAnimatedExample,
                  "menu-docs-animated-preview"
                ),
                href: menuAnimatedExampleRouter(),
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
GotMenuMessage({ message: Menu.Message });

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
                preview: popoverBasicExamplePreview(
                  model.popoverBasicExample,
                  "popover-docs-basic-preview"
                ),
                href: popoverBasicExampleRouter(),
                linkText: "Open standalone Popover Basic example",
              }),
              docsExampleBlock({
                title: "Animated",
                testId: "docs-example-block-popover-animated",
                preview: popoverAnimatedExamplePreview(
                  model.popoverAnimatedExample,
                  "popover-docs-animated-preview"
                ),
                href: popoverAnimatedExampleRouter(),
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
GotPopoverMessage({ message: Popover.Message });

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
                preview: dialogBasicExamplePreview(
                  model.dialogBasicExample,
                  "dialog-docs-basic-preview"
                ),
                href: dialogBasicExampleRouter(),
                linkText: "Open standalone Dialog Basic example",
              }),
              docsExampleBlock({
                title: "Animated",
                description:
                  "The animated variant keeps the dialog surface mounted while Foldkit animation state settles.",
                testId: "docs-example-block-dialog-animated",
                preview: dialogAnimatedExamplePreview(
                  model.dialogAnimatedExample,
                  "dialog-docs-animated-preview"
                ),
                href: dialogAnimatedExampleRouter(),
                linkText: "Open standalone Dialog Animated example",
              }),
              docsExampleBlock({
                title: "Destructive",
                description:
                  "A destructive confirmation uses the existing Dialog flow with a red confirm action.",
                testId: "docs-example-block-dialog-destructive",
                preview: dialogDestructiveExamplePreview(
                  model.dialogDestructiveExample,
                  "dialog-docs-destructive-preview"
                ),
                href: dialogDestructiveExampleRouter(),
                linkText: "Open standalone Dialog Destructive example",
              }),
              docsExampleBlock({
                title: "Focus",
                description:
                  "A focus-targeted dialog warms up and focuses the first field for input-heavy flows.",
                testId: "docs-example-block-dialog-focus",
                preview: dialogFocusExamplePreview(
                  model.dialogFocusExample,
                  "dialog-docs-focus-preview"
                ),
                href: dialogFocusExampleRouter(),
                linkText: "Open standalone Dialog Focus example",
              }),
              docsExampleBlock({
                title: "Scrollable",
                description:
                  "A long-content dialog constrains the body scroll region while keeping footer actions visible.",
                testId: "docs-example-block-dialog-scrollable",
                preview: dialogScrollableExamplePreview(
                  model.dialogScrollableExample,
                  "dialog-docs-scrollable-preview"
                ),
                href: dialogScrollableExampleRouter(),
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
GotDialogMessage({ message: Dialog.Message });

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

const animationBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Animation Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable animation-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          animationBasicExamplePreview(
            model.animationBasicExample,
            "animation-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

const virtualListBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["VirtualList Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable virtual-list-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          virtualListBasicExamplePreview(
            model.virtualListBasicExample,
            "virtual-list-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

const virtualListVariableExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["VirtualList Variable"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable virtual-list-variable registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          virtualListVariableExamplePreview(
            model.virtualListVariableExample,
            "virtual-list-variable-standalone"
          ),
        ]
      ),
    ]
  );
};

const buttonBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Button Basic"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable button-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          buttonBasicExamplePreview(
            model.buttonBasicExample,
            "button-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

const buttonDisabledExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Button Disabled"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable button-disabled registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          buttonDisabledExamplePreview(
            model.buttonDisabledExample,
            "button-disabled-standalone"
          ),
        ]
      ),
    ]
  );
};

const calendarBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Calendar Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable calendar-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          calendarBasicExamplePreview(
            model.calendarBasicExample,
            "calendar-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

const calendarBoundsExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Calendar Bounds"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable calendar-bounds registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          calendarBoundsExamplePreview(
            model.calendarBoundsExample,
            "calendar-bounds-standalone"
          ),
        ]
      ),
    ]
  );
};

const datePickerBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Date Picker Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable date-picker-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          datePickerBasicExamplePreview(
            model.datePickerBasicExample,
            "date-picker-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

const datePickerBoundsExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Date Picker Bounds"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable date-picker-bounds registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          datePickerBoundsExamplePreview(
            model.datePickerBoundsExample,
            "date-picker-bounds-standalone"
          ),
        ]
      ),
    ]
  );
};

const checkboxBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Checkbox Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable checkbox-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          checkboxBasicExamplePreview(
            model.checkboxBasicExample,
            "checkbox-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

const checkboxIndeterminateExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Checkbox Indeterminate"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable checkbox-indeterminate registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          checkboxIndeterminateExamplePreview(
            model.checkboxIndeterminateExample,
            "checkbox-indeterminate-standalone"
          ),
        ]
      ),
    ]
  );
};

const sliderBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Slider Basic"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable slider-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          sliderBasicExamplePreview(
            model.sliderBasicExample,
            "slider-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

const sliderDisabledExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Slider Disabled"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable slider-disabled registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          sliderDisabledExamplePreview(
            model.sliderDisabledExample,
            "slider-disabled-standalone"
          ),
        ]
      ),
    ]
  );
};

const tabsBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Tabs Basic"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable tabs-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          tabsBasicExamplePreview(
            model.tabsBasicExample,
            "tabs-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

const tabsManualExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Tabs Manual"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable tabs-manual registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          tabsManualExamplePreview(
            model.tabsManualExample,
            "tabs-manual-standalone"
          ),
        ]
      ),
    ]
  );
};

const switchBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Switch Basic"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable switch-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          switchBasicExamplePreview(
            model.switchBasicExample,
            "switch-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

const switchDisabledExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Switch Disabled"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable switch-disabled registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          switchDisabledExamplePreview(
            model.switchDisabledExample,
            "switch-disabled-standalone"
          ),
        ]
      ),
    ]
  );
};

const fieldsetBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Fieldset Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable fieldset-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          fieldsetBasicExamplePreview(
            model.fieldsetBasicExample,
            "fieldset-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

const fieldsetDisabledExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Fieldset Disabled"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable fieldset-disabled registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          fieldsetDisabledExamplePreview(
            model.fieldsetDisabledExample,
            "fieldset-disabled-standalone"
          ),
        ]
      ),
    ]
  );
};

const fileDropBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["File Drop Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable file-drop-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          fileDropBasicExamplePreview(
            model.fileDropBasicExample,
            "file-drop-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

const fileDropDisabledExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["File Drop Disabled"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable file-drop-disabled registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          fileDropDisabledExamplePreview(
            model.fileDropDisabledExample,
            "file-drop-disabled-standalone"
          ),
        ]
      ),
    ]
  );
};

const inputBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Input Basic"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable input-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          inputBasicExamplePreview(
            model.inputBasicExample,
            "input-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

const inputDisabledExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Input Disabled"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable input-disabled registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          inputDisabledExamplePreview(
            model.inputDisabledExample,
            "input-disabled-standalone"
          ),
        ]
      ),
    ]
  );
};

const textareaBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Textarea Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable textarea-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          textareaBasicExamplePreview(
            model.textareaBasicExample,
            "textarea-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

const textareaDisabledExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Textarea Disabled"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable textarea-disabled registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          textareaDisabledExamplePreview(
            model.textareaDisabledExample,
            "textarea-disabled-standalone"
          ),
        ]
      ),
    ]
  );
};

const toastBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Toast Basic"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable toast-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          toastBasicExamplePreview(
            model.toastBasicExample,
            "toast-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

const toastVariantsExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Toast Variants"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable toast-variants registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          toastVariantsExamplePreview(
            model.toastVariantsExample,
            "toast-variants-standalone"
          ),
        ]
      ),
    ]
  );
};

const tooltipBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Tooltip Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable tooltip-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          tooltipBasicExamplePreview(
            model.tooltipBasicExample,
            "tooltip-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

const tooltipNoDelayExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Tooltip No Delay"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable tooltip-no-delay registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          tooltipNoDelayExamplePreview(
            model.tooltipNoDelayExample,
            "tooltip-no-delay-standalone"
          ),
        ]
      ),
    ]
  );
};

const dialogBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Dialog Basic"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable dialog-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          dialogBasicExamplePreview(
            model.dialogBasicExample,
            "dialog-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

const dialogAnimatedExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Dialog Animated"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable dialog-animated registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          dialogAnimatedExamplePreview(
            model.dialogAnimatedExample,
            "dialog-animated-standalone"
          ),
        ]
      ),
    ]
  );
};

const dialogDestructiveExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Dialog Destructive"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable dialog-destructive registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          dialogDestructiveExamplePreview(
            model.dialogDestructiveExample,
            "dialog-destructive-standalone"
          ),
        ]
      ),
    ]
  );
};

const dialogFocusExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Dialog Focus"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable dialog-focus registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          dialogFocusExamplePreview(
            model.dialogFocusExample,
            "dialog-focus-standalone"
          ),
        ]
      ),
    ]
  );
};

const dialogScrollableExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Dialog Scrollable"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable dialog-scrollable registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          dialogScrollableExamplePreview(
            model.dialogScrollableExample,
            "dialog-scrollable-standalone"
          ),
        ]
      ),
    ]
  );
};

const disclosureBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Disclosure Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable disclosure-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          disclosureBasicExamplePreview(
            model.disclosureBasicExample,
            "disclosure-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

const disclosureDisabledExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Disclosure Disabled"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable disclosure-disabled registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          disclosureDisabledExamplePreview(
            model.disclosureDisabledExample,
            "disclosure-disabled-standalone"
          ),
        ]
      ),
    ]
  );
};

const dragAndDropBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Drag and Drop Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable drag-and-drop-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          dragAndDropBasicExamplePreview(
            model.dragAndDropBasicExample,
            "drag-and-drop-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

const dragAndDropDisabledExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Drag and Drop Disabled"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable drag-and-drop-disabled registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          dragAndDropDisabledExamplePreview(
            model.dragAndDropDisabledExample,
            "drag-and-drop-disabled-standalone"
          ),
        ]
      ),
    ]
  );
};

const listboxBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Listbox Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable listbox-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          listboxBasicExamplePreview(
            model.listboxBasicExample,
            "listbox-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

const listboxAnimatedExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Listbox Animated"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable listbox-animated registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          listboxAnimatedExamplePreview(
            model.listboxAnimatedExample,
            "listbox-animated-standalone"
          ),
        ]
      ),
    ]
  );
};

const menuBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Menu Basic"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable menu-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          menuBasicExamplePreview(
            model.menuBasicExample,
            "menu-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

const menuAnimatedExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Menu Animated"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable menu-animated registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          menuAnimatedExamplePreview(
            model.menuAnimatedExample,
            "menu-animated-standalone"
          ),
        ]
      ),
    ]
  );
};

const popoverBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Popover Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable popover-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          popoverBasicExamplePreview(
            model.popoverBasicExample,
            "popover-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

const popoverAnimatedExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Popover Animated"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable popover-animated registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          popoverAnimatedExamplePreview(
            model.popoverAnimatedExample,
            "popover-animated-standalone"
          ),
        ]
      ),
    ]
  );
};

const radioGroupBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Radio Group Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable radio-group-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          radioGroupBasicExamplePreview(
            model.radioGroupBasicExample,
            "radio-group-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

const radioGroupHorizontalExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Radio Group Horizontal"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable radio-group-horizontal registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          radioGroupHorizontalExamplePreview(
            model.radioGroupHorizontalExample,
            "radio-group-horizontal-standalone"
          ),
        ]
      ),
    ]
  );
};

const selectBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Select Basic"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable select-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          selectBasicExamplePreview(
            model.selectBasicExample,
            "select-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

const selectDisabledExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Select Disabled"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable select-disabled registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          selectDisabledExamplePreview(
            model.selectDisabledExample,
            "select-disabled-standalone"
          ),
        ]
      ),
    ]
  );
};

const comboboxBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Combobox Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable combobox-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          comboboxBasicExamplePreview(
            model.comboboxBasicExample,
            "combobox-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

const comboboxMultiExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Combobox Multi"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable combobox-multi registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          comboboxMultiExamplePreview(
            model.comboboxMultiExample,
            "combobox-multi-standalone"
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
      toParentMessage: toUiMessage,
    });

  return M.value(model.route).pipe(
    M.tagsExhaustive({
      Home: homeView,
      Button: () => embedUi("ui-button", View.button),
      ButtonDocs: () => buttonDocsView(model),
      ButtonBasicExample: () => buttonBasicExampleRouteView(model),
      ButtonDisabledExample: () => buttonDisabledExampleRouteView(model),
      Calendar: () => embedUi("ui-calendar", View.calendar),
      CalendarDocs: () => calendarDocsView(model),
      CalendarBasicExample: () => calendarBasicExampleRouteView(model),
      CalendarBoundsExample: () => calendarBoundsExampleRouteView(model),
      Checkbox: () => embedUi("ui-checkbox", View.checkbox),
      CheckboxDocs: () => checkboxDocsView(model),
      CheckboxBasicExample: () => checkboxBasicExampleRouteView(model),
      CheckboxIndeterminateExample: () =>
        checkboxIndeterminateExampleRouteView(model),
      Combobox: () => embedUi("ui-combobox", View.combobox),
      ComboboxDocs: () => comboboxDocsView(model),
      ComboboxBasicExample: () => comboboxBasicExampleRouteView(model),
      ComboboxMultiExample: () => comboboxMultiExampleRouteView(model),
      DatePicker: () => embedUi("ui-date-picker", View.datePicker),
      DatePickerDocs: () => datePickerDocsView(model),
      DatePickerBasicExample: () => datePickerBasicExampleRouteView(model),
      DatePickerBoundsExample: () => datePickerBoundsExampleRouteView(model),
      Dialog: () => embedUi("ui-dialog", View.dialog),
      DialogDocs: () => dialogDocsView(model),
      DialogBasicExample: () => dialogBasicExampleRouteView(model),
      DialogAnimatedExample: () => dialogAnimatedExampleRouteView(model),
      DialogDestructiveExample: () => dialogDestructiveExampleRouteView(model),
      DialogFocusExample: () => dialogFocusExampleRouteView(model),
      DialogScrollableExample: () => dialogScrollableExampleRouteView(model),
      Disclosure: () => embedUi("ui-disclosure", View.disclosure),
      DisclosureDocs: () => disclosureDocsView(model),
      DisclosureBasicExample: () => disclosureBasicExampleRouteView(model),
      DisclosureDisabledExample: () =>
        disclosureDisabledExampleRouteView(model),
      DragAndDrop: () => embedUi("ui-drag-and-drop", View.dragAndDrop),
      DragAndDropDocs: () => dragAndDropDocsView(model),
      DragAndDropBasicExample: () => dragAndDropBasicExampleRouteView(model),
      DragAndDropDisabledExample: () =>
        dragAndDropDisabledExampleRouteView(model),
      Fieldset: () => embedUi("ui-fieldset", View.fieldset),
      FieldsetDocs: () => fieldsetDocsView(model),
      FieldsetBasicExample: () => fieldsetBasicExampleRouteView(model),
      FieldsetDisabledExample: () => fieldsetDisabledExampleRouteView(model),
      FileDrop: () => embedUi("ui-file-drop", View.fileDrop),
      FileDropDocs: () => fileDropDocsView(model),
      FileDropBasicExample: () => fileDropBasicExampleRouteView(model),
      FileDropDisabledExample: () => fileDropDisabledExampleRouteView(model),
      Input: () => embedUi("ui-input", View.input),
      InputDocs: () => inputDocsView(model),
      InputBasicExample: () => inputBasicExampleRouteView(model),
      InputDisabledExample: () => inputDisabledExampleRouteView(model),
      Listbox: () => embedUi("ui-listbox", View.listbox),
      ListboxDocs: () => listboxDocsView(model),
      ListboxBasicExample: () => listboxBasicExampleRouteView(model),
      ListboxAnimatedExample: () => listboxAnimatedExampleRouteView(model),
      Menu: () => embedUi("ui-menu", View.menu),
      MenuDocs: () => menuDocsView(model),
      MenuBasicExample: () => menuBasicExampleRouteView(model),
      MenuAnimatedExample: () => menuAnimatedExampleRouteView(model),
      Popover: () => embedUi("ui-popover", View.popover),
      PopoverDocs: () => popoverDocsView(model),
      PopoverBasicExample: () => popoverBasicExampleRouteView(model),
      PopoverAnimatedExample: () => popoverAnimatedExampleRouteView(model),
      RadioGroup: () => embedUi("ui-radio-group", View.radioGroup),
      RadioGroupDocs: () => radioGroupDocsView(model),
      RadioGroupBasicExample: () => radioGroupBasicExampleRouteView(model),
      RadioGroupHorizontalExample: () =>
        radioGroupHorizontalExampleRouteView(model),
      Select: () => embedUi("ui-select", View.select),
      SelectDocs: () => selectDocsView(model),
      SelectBasicExample: () => selectBasicExampleRouteView(model),
      SelectDisabledExample: () => selectDisabledExampleRouteView(model),
      Slider: () => embedUi("ui-slider", View.slider),
      SliderDocs: () => sliderDocsView(model),
      SliderBasicExample: () => sliderBasicExampleRouteView(model),
      SliderDisabledExample: () => sliderDisabledExampleRouteView(model),
      Switch: () => embedUi("ui-switch", View.switch_),
      SwitchDocs: () => switchDocsView(model),
      SwitchBasicExample: () => switchBasicExampleRouteView(model),
      SwitchDisabledExample: () => switchDisabledExampleRouteView(model),
      Tabs: () => embedUi("ui-tabs", View.tabs),
      TabsDocs: () => tabsDocsView(model),
      TabsBasicExample: () => tabsBasicExampleRouteView(model),
      TabsManualExample: () => tabsManualExampleRouteView(model),
      Textarea: () => embedUi("ui-textarea", View.textarea),
      TextareaDocs: () => textareaDocsView(model),
      TextareaBasicExample: () => textareaBasicExampleRouteView(model),
      TextareaDisabledExample: () => textareaDisabledExampleRouteView(model),
      Toast: () => embedUi("ui-toast", View.toast),
      ToastDocs: () => toastDocsView(model),
      ToastBasicExample: () => toastBasicExampleRouteView(model),
      ToastVariantsExample: () => toastVariantsExampleRouteView(model),
      Tooltip: () => embedUi("ui-tooltip", View.tooltip),
      TooltipDocs: () => tooltipDocsView(model),
      TooltipBasicExample: () => tooltipBasicExampleRouteView(model),
      TooltipNoDelayExample: () => tooltipNoDelayExampleRouteView(model),
      Animation: () => embedUi("ui-animation", View.animation),
      AnimationDocs: () => animationDocsView(model),
      AnimationBasicExample: () => animationBasicExampleRouteView(model),
      VirtualList: () => embedUi("ui-virtual-list", View.virtualList),
      VirtualListDocs: () => virtualListDocsView(model),
      VirtualListBasicExample: () => virtualListBasicExampleRouteView(model),
      VirtualListVariableExample: () =>
        virtualListVariableExampleRouteView(model),
      NotFound: ({ path }) => notFoundView(path),
    })
  );
};

const routeTitle = (route: Model["route"]): string =>
  M.value(route).pipe(
    M.tag("Home", () => "Foldkit UI Showcase"),
    M.orElse(({ _tag }) => `${_tag} — Foldkit UI Showcase`)
  );

export const view = (model: Model): Document => {
  const h = html<Message>();

  return {
    title: routeTitle(model.route),
    body: h.div(
      [h.Class("flex flex-col md:flex-row min-h-screen bg-white")],
      [
        mobileHeaderView(model),
        mobileMenuView(model),
        sidebarView(model.route),
        h.main(
          [h.Class("flex-1 p-4 md:p-8 overflow-auto")],
          [h.keyed("div")(model.route._tag, [], [contentView(model)])]
        ),
      ]
    ),
  };
};

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
