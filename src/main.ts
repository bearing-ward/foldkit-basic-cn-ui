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

import * as ButtonBasicExample from "../registry/default/examples/button-basic/main";
import * as ButtonDisabledExample from "../registry/default/examples/button-disabled/main";
import * as CheckboxBasicExample from "../registry/default/examples/checkbox-basic/main";
import * as CheckboxIndeterminateExample from "../registry/default/examples/checkbox-indeterminate/main";
import * as ComboboxBasicExample from "../registry/default/examples/combobox-basic/main";
import * as ComboboxMultiExample from "../registry/default/examples/combobox-multi/main";
import * as DialogAnimatedExample from "../registry/default/examples/dialog-animated/main";
import * as DialogBasicExample from "../registry/default/examples/dialog-basic/main";
import * as DialogDestructiveExample from "../registry/default/examples/dialog-destructive/main";
import * as DialogFocusExample from "../registry/default/examples/dialog-focus/main";
import * as DialogScrollableExample from "../registry/default/examples/dialog-scrollable/main";
import * as FieldsetBasicExample from "../registry/default/examples/fieldset-basic/main";
import * as FieldsetDisabledExample from "../registry/default/examples/fieldset-disabled/main";
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
import * as SwitchBasicExample from "../registry/default/examples/switch-basic/main";
import * as SwitchDisabledExample from "../registry/default/examples/switch-disabled/main";
import * as TextareaBasicExample from "../registry/default/examples/textarea-basic/main";
import * as TextareaDisabledExample from "../registry/default/examples/textarea-disabled/main";
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
export const DialogRoute = r("Dialog");
export const DialogDocsRoute = r("DialogDocs");
export const DialogBasicExampleRoute = r("DialogBasicExample");
export const DialogAnimatedExampleRoute = r("DialogAnimatedExample");
export const DialogDestructiveExampleRoute = r("DialogDestructiveExample");
export const DialogFocusExampleRoute = r("DialogFocusExample");
export const DialogScrollableExampleRoute = r("DialogScrollableExample");
export const DisclosureRoute = r("Disclosure");
export const DragAndDropRoute = r("DragAndDrop");
export const FieldsetRoute = r("Fieldset");
export const FieldsetDocsRoute = r("FieldsetDocs");
export const FieldsetBasicExampleRoute = r("FieldsetBasicExample");
export const FieldsetDisabledExampleRoute = r("FieldsetDisabledExample");
export const FileDropRoute = r("FileDrop");
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
export const SwitchRoute = r("Switch");
export const SwitchDocsRoute = r("SwitchDocs");
export const SwitchBasicExampleRoute = r("SwitchBasicExample");
export const SwitchDisabledExampleRoute = r("SwitchDisabledExample");
export const TabsRoute = r("Tabs");
export const TextareaRoute = r("Textarea");
export const TextareaDocsRoute = r("TextareaDocs");
export const TextareaBasicExampleRoute = r("TextareaBasicExample");
export const TextareaDisabledExampleRoute = r("TextareaDisabledExample");
export const ToastRoute = r("Toast");
export const TooltipRoute = r("Tooltip");
export const AnimationRoute = r("Animation");
export const VirtualListRoute = r("VirtualList");
export const NotFoundRoute = r("NotFound", { path: S.String });

const AppRoute = S.Union([
  HomeRoute,
  ButtonRoute,
  ButtonDocsRoute,
  ButtonBasicExampleRoute,
  ButtonDisabledExampleRoute,
  CalendarRoute,
  CheckboxRoute,
  CheckboxDocsRoute,
  CheckboxBasicExampleRoute,
  CheckboxIndeterminateExampleRoute,
  ComboboxRoute,
  ComboboxDocsRoute,
  ComboboxBasicExampleRoute,
  ComboboxMultiExampleRoute,
  DatePickerRoute,
  DialogRoute,
  DialogDocsRoute,
  DialogBasicExampleRoute,
  DialogAnimatedExampleRoute,
  DialogDestructiveExampleRoute,
  DialogFocusExampleRoute,
  DialogScrollableExampleRoute,
  DisclosureRoute,
  DragAndDropRoute,
  FieldsetRoute,
  FieldsetDocsRoute,
  FieldsetBasicExampleRoute,
  FieldsetDisabledExampleRoute,
  FileDropRoute,
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
  SwitchRoute,
  SwitchDocsRoute,
  SwitchBasicExampleRoute,
  SwitchDisabledExampleRoute,
  TabsRoute,
  TextareaRoute,
  TextareaDocsRoute,
  TextareaBasicExampleRoute,
  TextareaDisabledExampleRoute,
  ToastRoute,
  TooltipRoute,
  AnimationRoute,
  VirtualListRoute,
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
const dragAndDropRouter = pipe(
  literal("drag-and-drop"),
  Route.mapTo(DragAndDropRoute)
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
const tooltipRouter = pipe(literal("tooltip"), Route.mapTo(TooltipRoute));
const animationRouter = pipe(literal("animation"), Route.mapTo(AnimationRoute));
const virtualListRouter = pipe(
  literal("virtual-list"),
  Route.mapTo(VirtualListRoute)
);

const routeParser = Route.oneOf(
  buttonRouter,
  buttonBasicExampleRouter,
  buttonDisabledExampleRouter,
  buttonBasicStandaloneExampleRouter,
  buttonDisabledStandaloneExampleRouter,
  buttonDocsRouter,
  calendarRouter,
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
  dragAndDropRouter,
  fieldsetRouter,
  fieldsetBasicExampleRouter,
  fieldsetDisabledExampleRouter,
  fieldsetBasicStandaloneExampleRouter,
  fieldsetDisabledStandaloneExampleRouter,
  fieldsetDocsRouter,
  fileDropRouter,
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
  switchRouter,
  switchBasicExampleRouter,
  switchDisabledExampleRouter,
  switchBasicStandaloneExampleRouter,
  switchDisabledStandaloneExampleRouter,
  switchDocsRouter,
  tabsRouter,
  textareaRouter,
  textareaBasicExampleRouter,
  textareaDisabledExampleRouter,
  textareaBasicStandaloneExampleRouter,
  textareaDisabledStandaloneExampleRouter,
  textareaDocsRouter,
  toastRouter,
  tooltipRouter,
  animationRouter,
  virtualListRouter,
  homeRouter
);

const urlToAppRoute = Route.parseUrlWithFallback(routeParser, NotFoundRoute);

// MODEL

export const Model = S.Struct({
  route: AppRoute,
  uiModel: UiModel,
  buttonBasicExample: ButtonBasicExample.Model,
  buttonDisabledExample: ButtonDisabledExample.Model,
  checkboxBasicExample: CheckboxBasicExample.Model,
  checkboxIndeterminateExample: CheckboxIndeterminateExample.Model,
  comboboxBasicExample: ComboboxBasicExample.Model,
  comboboxMultiExample: ComboboxMultiExample.Model,
  dialogBasicExample: DialogBasicExample.Model,
  dialogAnimatedExample: DialogAnimatedExample.Model,
  dialogDestructiveExample: DialogDestructiveExample.Model,
  dialogFocusExample: DialogFocusExample.Model,
  dialogScrollableExample: DialogScrollableExample.Model,
  fieldsetBasicExample: FieldsetBasicExample.Model,
  fieldsetDisabledExample: FieldsetDisabledExample.Model,
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
  switchBasicExample: SwitchBasicExample.Model,
  switchDisabledExample: SwitchDisabledExample.Model,
  textareaBasicExample: TextareaBasicExample.Model,
  textareaDisabledExample: TextareaDisabledExample.Model,
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
export const GotButtonBasicExampleMessage = m("GotButtonBasicExampleMessage", {
  message: ButtonBasicExample.Message,
});
export const GotButtonDisabledExampleMessage = m(
  "GotButtonDisabledExampleMessage",
  {
    message: ButtonDisabledExample.Message,
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
export const GotSwitchBasicExampleMessage = m("GotSwitchBasicExampleMessage", {
  message: SwitchBasicExample.Message,
});
export const GotSwitchDisabledExampleMessage = m(
  "GotSwitchDisabledExampleMessage",
  {
    message: SwitchDisabledExample.Message,
  }
);
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

export const Message = S.Union([
  CompletedNavigateInternal,
  CompletedLoadExternal,
  ClickedLink,
  ChangedUrl,
  GotUiMessage,
  GotButtonBasicExampleMessage,
  GotButtonDisabledExampleMessage,
  GotCheckboxBasicExampleMessage,
  GotCheckboxIndeterminateExampleMessage,
  GotComboboxBasicExampleMessage,
  GotComboboxMultiExampleMessage,
  GotDialogBasicExampleMessage,
  GotDialogAnimatedExampleMessage,
  GotDialogDestructiveExampleMessage,
  GotDialogFocusExampleMessage,
  GotDialogScrollableExampleMessage,
  GotFieldsetBasicExampleMessage,
  GotFieldsetDisabledExampleMessage,
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
  GotSwitchBasicExampleMessage,
  GotSwitchDisabledExampleMessage,
  GotTextareaBasicExampleMessage,
  GotTextareaDisabledExampleMessage,
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
  const [buttonBasicExample, buttonBasicExampleCommands] =
    ButtonBasicExample.init();
  const [buttonDisabledExample, buttonDisabledExampleCommands] =
    ButtonDisabledExample.init();
  const [checkboxBasicExample, checkboxBasicExampleCommands] =
    CheckboxBasicExample.init();
  const [checkboxIndeterminateExample, checkboxIndeterminateExampleCommands] =
    CheckboxIndeterminateExample.init();
  const [comboboxBasicExample, comboboxBasicExampleCommands] =
    ComboboxBasicExample.init();
  const [comboboxMultiExample, comboboxMultiExampleCommands] =
    ComboboxMultiExample.init();
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
  const [fieldsetBasicExample, fieldsetBasicExampleCommands] =
    FieldsetBasicExample.init();
  const [fieldsetDisabledExample, fieldsetDisabledExampleCommands] =
    FieldsetDisabledExample.init();
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
  const [switchBasicExample, switchBasicExampleCommands] =
    SwitchBasicExample.init();
  const [switchDisabledExample, switchDisabledExampleCommands] =
    SwitchDisabledExample.init();
  const [textareaBasicExample, textareaBasicExampleCommands] =
    TextareaBasicExample.init();
  const [textareaDisabledExample, textareaDisabledExampleCommands] =
    TextareaDisabledExample.init();

  return [
    {
      route: urlToAppRoute(url),
      uiModel: initialUiModel,
      buttonBasicExample,
      buttonDisabledExample,
      checkboxBasicExample,
      checkboxIndeterminateExample,
      comboboxBasicExample,
      comboboxMultiExample,
      dialogBasicExample,
      dialogAnimatedExample,
      dialogDestructiveExample,
      dialogFocusExample,
      dialogScrollableExample,
      fieldsetBasicExample,
      fieldsetDisabledExample,
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
      switchBasicExample,
      switchDisabledExample,
      textareaBasicExample,
      textareaDisabledExample,
    },
    [
      ...Command.mapMessages(uiCommands, (message) =>
        GotUiMessage({ message })
      ),
      ...Command.mapMessages(buttonBasicExampleCommands, (message) =>
        GotButtonBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(buttonDisabledExampleCommands, (message) =>
        GotButtonDisabledExampleMessage({ message })
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
      ...Command.mapMessages(fieldsetBasicExampleCommands, (message) =>
        GotFieldsetBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(fieldsetDisabledExampleCommands, (message) =>
        GotFieldsetDisabledExampleMessage({ message })
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
      ...Command.mapMessages(switchBasicExampleCommands, (message) =>
        GotSwitchBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(switchDisabledExampleCommands, (message) =>
        GotSwitchDisabledExampleMessage({ message })
      ),
      ...Command.mapMessages(textareaBasicExampleCommands, (message) =>
        GotTextareaBasicExampleMessage({ message })
      ),
      ...Command.mapMessages(textareaDisabledExampleCommands, (message) =>
        GotTextareaDisabledExampleMessage({ message })
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
            route: () => urlToAppRoute(url),
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
    label: "Drag and Drop",
    routeTag: "DragAndDrop",
    href: dragAndDropRouter(),
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
  { label: "Tooltip", routeTag: "Tooltip", href: tooltipRouter() },
  {
    label: "Virtual List",
    routeTag: "VirtualList",
    href: virtualListRouter(),
  },
];

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
            [h.Href(homeRouter()), h.Class("block")],
            [h.h1([h.Class("text-lg font-bold text-gray-900")], ["Foldkit UI"])]
          ),
          h.span([h.Class("text-xs text-gray-500")], ["Component Showcase"]),
        ]
      ),
      h.ul(
        [h.Class("flex flex-col gap-0.5")],
        NAV_ITEMS.map((navItem) =>
          h.li(
            [],
            [
              h.a(
                [
                  h.Href(navItem.href),
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
            [h.Href(homeRouter()), h.Class("block")],
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
            NAV_ITEMS.map((navItem) =>
              h.li(
                [],
                [
                  h.a(
                    [
                      h.Href(navItem.href),
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
        [h.Href(homeRouter()), h.Class("block")],
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
        [h.Href(homeRouter()), h.Class("text-accent-600 hover:underline")],
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

const docsInstallBlock = (commands: string): Html =>
  docsSection("Installation", [codeBlock(commands)]);

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

  return docsSection("API", [
    h.ul(
      [h.Class("grid gap-1 text-sm text-gray-700 sm:grid-cols-2")],
      items.map((item) => h.li([], [item]))
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
  linkText,
}: DocsExampleBlockInput): Html => {
  const h = html<Message>();

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
          h.a(
            [
              h.Href(href),
              h.Class(
                "inline-flex text-sm font-medium text-accent-700 hover:underline"
              ),
            ],
            [linkText]
          ),
        ]
      ),
    ]
  );
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
              h.h2([h.Class("text-xl font-semibold text-gray-950")], ["API"]),
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
      Dialog: () => embedUi("ui-dialog", View.dialog),
      DialogDocs: () => dialogDocsView(model),
      DialogBasicExample: () => dialogBasicExampleRouteView(model),
      DialogAnimatedExample: () => dialogAnimatedExampleRouteView(model),
      DialogDestructiveExample: () => dialogDestructiveExampleRouteView(model),
      DialogFocusExample: () => dialogFocusExampleRouteView(model),
      DialogScrollableExample: () => dialogScrollableExampleRouteView(model),
      Disclosure: () => embedUi("ui-disclosure", View.disclosure),
      DragAndDrop: () => embedUi("ui-drag-and-drop", View.dragAndDrop),
      Fieldset: () => embedUi("ui-fieldset", View.fieldset),
      FieldsetDocs: () => fieldsetDocsView(model),
      FieldsetBasicExample: () => fieldsetBasicExampleRouteView(model),
      FieldsetDisabledExample: () => fieldsetDisabledExampleRouteView(model),
      FileDrop: () => embedUi("ui-file-drop", View.fileDrop),
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
      Switch: () => embedUi("ui-switch", View.switch_),
      SwitchDocs: () => switchDocsView(model),
      SwitchBasicExample: () => switchBasicExampleRouteView(model),
      SwitchDisabledExample: () => switchDisabledExampleRouteView(model),
      Tabs: () => embedUi("ui-tabs", View.tabs),
      Textarea: () => embedUi("ui-textarea", View.textarea),
      TextareaDocs: () => textareaDocsView(model),
      TextareaBasicExample: () => textareaBasicExampleRouteView(model),
      TextareaDisabledExample: () => textareaDisabledExampleRouteView(model),
      Toast: () => embedUi("ui-toast", View.toast),
      Tooltip: () => embedUi("ui-tooltip", View.tooltip),
      Animation: () => embedUi("ui-animation", View.animation),
      VirtualList: () => embedUi("ui-virtual-list", View.virtualList),
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

export const subscriptions = Subscription.lift(UiSubscriptions.subscriptions)<
  Model,
  Message
>({
  toChildModel: (model) => model.uiModel,
  toParentMessage: (message) => GotUiMessage({ message }),
});
