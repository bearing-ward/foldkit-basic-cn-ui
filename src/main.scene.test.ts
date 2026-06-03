import { Calendar, Scene } from "foldkit";
import { describe, test } from "vitest";

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
import * as SwitchBasicExample from "../registry/default/examples/switch-basic/main";
import * as SwitchDisabledExample from "../registry/default/examples/switch-disabled/main";
import * as TextareaBasicExample from "../registry/default/examples/textarea-basic/main";
import * as TextareaDisabledExample from "../registry/default/examples/textarea-disabled/main";
import * as Combobox from "../registry/default/ui/combobox";
import {
  AnimationRoute,
  ButtonBasicExampleRoute,
  ButtonDisabledExampleRoute,
  ButtonDocsRoute,
  ButtonRoute,
  CalendarBasicExampleRoute,
  CalendarBoundsExampleRoute,
  CalendarDocsRoute,
  CheckboxBasicExampleRoute,
  CheckboxDocsRoute,
  CheckboxIndeterminateExampleRoute,
  CheckboxRoute,
  ComboboxBasicExampleRoute,
  ComboboxDocsRoute,
  ComboboxMultiExampleRoute,
  DatePickerBasicExampleRoute,
  DatePickerBoundsExampleRoute,
  DatePickerDocsRoute,
  DialogAnimatedExampleRoute,
  DialogBasicExampleRoute,
  DialogDestructiveExampleRoute,
  DialogDocsRoute,
  DialogFocusExampleRoute,
  DialogScrollableExampleRoute,
  DisclosureRoute,
  FieldsetRoute,
  FieldsetBasicExampleRoute,
  FieldsetDisabledExampleRoute,
  FieldsetDocsRoute,
  FileDropBasicExampleRoute,
  FileDropDisabledExampleRoute,
  FileDropDocsRoute,
  GotComboboxBasicExampleMessage,
  GotComboboxMultiExampleMessage,
  HomeRoute,
  InputBasicExampleRoute,
  InputDisabledExampleRoute,
  InputDocsRoute,
  InputRoute,
  ListboxAnimatedExampleRoute,
  ListboxBasicExampleRoute,
  ListboxDocsRoute,
  MenuAnimatedExampleRoute,
  MenuBasicExampleRoute,
  MenuDocsRoute,
  NotFoundRoute,
  PopoverAnimatedExampleRoute,
  PopoverBasicExampleRoute,
  PopoverDocsRoute,
  RadioGroupBasicExampleRoute,
  RadioGroupDocsRoute,
  RadioGroupHorizontalExampleRoute,
  RadioGroupRoute,
  SelectBasicExampleRoute,
  SelectDisabledExampleRoute,
  SelectDocsRoute,
  SelectRoute,
  SwitchBasicExampleRoute,
  SwitchDisabledExampleRoute,
  SwitchDocsRoute,
  SwitchRoute,
  TextareaBasicExampleRoute,
  TextareaDisabledExampleRoute,
  TextareaDocsRoute,
  TextareaRoute,
  update,
  view,
} from "./main";
import type { Model } from "./main";
import { uiInit } from "./ui/init";

const today = Calendar.make(2026, 4, 16);
const [initialUiModel] = uiInit(today);
const [buttonBasicExample] = ButtonBasicExample.init();
const [buttonDisabledExample] = ButtonDisabledExample.init();
const [calendarBasicExample] = CalendarBasicExample.init();
const [calendarBoundsExample] = CalendarBoundsExample.init();
const [checkboxBasicExample] = CheckboxBasicExample.init();
const [checkboxIndeterminateExample] = CheckboxIndeterminateExample.init();
const [comboboxBasicExample] = ComboboxBasicExample.init();
const [comboboxMultiExample] = ComboboxMultiExample.init();
const [datePickerBasicExample] = DatePickerBasicExample.init();
const [datePickerBoundsExample] = DatePickerBoundsExample.init();
const [dialogBasicExample] = DialogBasicExample.init();
const [dialogAnimatedExample] = DialogAnimatedExample.init();
const [dialogDestructiveExample] = DialogDestructiveExample.init();
const [dialogFocusExample] = DialogFocusExample.init();
const [dialogScrollableExample] = DialogScrollableExample.init();
const [fieldsetBasicExample] = FieldsetBasicExample.init();
const [fieldsetDisabledExample] = FieldsetDisabledExample.init();
const [fileDropBasicExample] = FileDropBasicExample.init();
const [fileDropDisabledExample] = FileDropDisabledExample.init();
const [inputBasicExample] = InputBasicExample.init();
const [inputDisabledExample] = InputDisabledExample.init();
const [listboxBasicExample] = ListboxBasicExample.init();
const [listboxAnimatedExample] = ListboxAnimatedExample.init();
const [menuBasicExample] = MenuBasicExample.init();
const [menuAnimatedExample] = MenuAnimatedExample.init();
const [popoverBasicExample] = PopoverBasicExample.init();
const [popoverAnimatedExample] = PopoverAnimatedExample.init();
const [radioGroupBasicExample] = RadioGroupBasicExample.init();
const [radioGroupHorizontalExample] = RadioGroupHorizontalExample.init();
const [selectBasicExample] = SelectBasicExample.init();
const [selectDisabledExample] = SelectDisabledExample.init();
const [switchBasicExample] = SwitchBasicExample.init();
const [switchDisabledExample] = SwitchDisabledExample.init();
const [textareaBasicExample] = TextareaBasicExample.init();
const [textareaDisabledExample] = TextareaDisabledExample.init();

const modelForRoute = (route: Model["route"]): Model => ({
  route,
  uiModel: initialUiModel,
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
  switchBasicExample,
  switchDisabledExample,
  textareaBasicExample,
  textareaDisabledExample,
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
  test("the sidebar nav lists a sample of every component link", () => {
    Scene.scene(
      { update, view },
      Scene.with(homeModel),
      Scene.expect(Scene.role("link", { name: "Button" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Button Docs" })).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Button Basic Example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Button Disabled Example" })
      ).toExist(),
      Scene.expect(Scene.role("link", { name: "Calendar" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Calendar Docs" })).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Calendar Basic Example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Calendar Bounds Example" })
      ).toExist(),
      Scene.expect(Scene.role("link", { name: "Checkbox Docs" })).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Checkbox Basic Example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Checkbox Indeterminate Example" })
      ).toExist(),
      Scene.expect(Scene.role("link", { name: "Combobox Docs" })).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Combobox Basic Example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Combobox Multi Example" })
      ).toExist(),
      Scene.expect(Scene.role("link", { name: "Date Picker Docs" })).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Date Picker Basic Example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Date Picker Bounds Example" })
      ).toExist(),
      Scene.expect(Scene.role("link", { name: "Dialog" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Dialog Docs" })).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Dialog Animated Example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Dialog Destructive Example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Dialog Focus Example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Dialog Scrollable Example" })
      ).toExist(),
      Scene.expect(Scene.role("link", { name: "Fieldset Docs" })).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Fieldset Basic Example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Fieldset Disabled Example" })
      ).toExist(),
      Scene.expect(Scene.role("link", { name: "File Drop Docs" })).toExist(),
      Scene.expect(
        Scene.role("link", { name: "File Drop Basic Example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", { name: "File Drop Disabled Example" })
      ).toExist(),
      Scene.expect(Scene.role("link", { name: "Input Docs" })).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Input Basic Example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Input Disabled Example" })
      ).toExist(),
      Scene.expect(Scene.role("link", { name: "Listbox Docs" })).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Listbox Basic Example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Listbox Animated Example" })
      ).toExist(),
      Scene.expect(Scene.role("link", { name: "Menu Docs" })).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Menu Basic Example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Menu Animated Example" })
      ).toExist(),
      Scene.expect(Scene.role("link", { name: "Popover Docs" })).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Popover Basic Example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Popover Animated Example" })
      ).toExist(),
      Scene.expect(Scene.role("link", { name: "Radio Group Docs" })).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Radio Group Basic Example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Radio Group Horizontal Example" })
      ).toExist(),
      Scene.expect(Scene.role("link", { name: "Select Docs" })).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Select Basic Example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Select Disabled Example" })
      ).toExist(),
      Scene.expect(Scene.role("link", { name: "Switch Docs" })).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Switch Basic Example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Switch Disabled Example" })
      ).toExist(),
      Scene.expect(Scene.role("link", { name: "Textarea Docs" })).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Textarea Basic Example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Textarea Disabled Example" })
      ).toExist(),
      Scene.expect(Scene.role("link", { name: "Toast" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Virtual List" })).toExist()
    );
  });

  test("the Home route shows the showcase heading and description", () => {
    Scene.scene(
      { update, view },
      Scene.with(homeModel),
      Scene.expect(
        Scene.role("heading", { name: "Foldkit UI Showcase" })
      ).toExist(),
      Scene.expect(
        Scene.text("This is a showcase of every Foldkit UI component.", {
          exact: false,
        })
      ).toExist()
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
      Scene.expect(Scene.role("heading", { name: "API" })).toExist(),
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
      Scene.expect(
        Scene.role("link", { name: "Open standalone Button Basic example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Open standalone Button Disabled example" })
      ).toExist()
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
      Scene.expect(Scene.role("heading", { name: "API" })).toExist(),
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
      Scene.expect(
        Scene.role("link", { name: "Open standalone Calendar Basic example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Open standalone Calendar Bounds example" })
      ).toExist()
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
      Scene.expect(Scene.role("heading", { name: "API" })).toExist(),
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
      Scene.expect(
        Scene.role("link", {
          name: "Open standalone Date Picker Basic example",
        })
      ).toExist(),
      Scene.expect(
        Scene.role("link", {
          name: "Open standalone Date Picker Bounds example",
        })
      ).toExist()
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
      Scene.expect(Scene.role("heading", { name: "API" })).toExist(),
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
      Scene.expect(
        Scene.role("link", { name: "Open standalone Checkbox Basic example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", {
          name: "Open standalone Checkbox Indeterminate example",
        })
      ).toExist()
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
      Scene.expect(Scene.role("heading", { name: "API" })).toExist(),
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
      Scene.expect(
        Scene.role("link", { name: "Open standalone Switch Basic example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", {
          name: "Open standalone Switch Disabled example",
        })
      ).toExist()
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
      Scene.expect(Scene.role("heading", { name: "API" })).toExist(),
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
      Scene.expect(
        Scene.role("link", { name: "Open standalone Dialog Basic example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Open standalone Dialog Animated example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", {
          name: "Open standalone Dialog Destructive example",
        })
      ).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Open standalone Dialog Focus example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", {
          name: "Open standalone Dialog Scrollable example",
        })
      ).toExist()
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
      Scene.expect(Scene.role("heading", { name: "API" })).toExist(),
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
      Scene.expect(
        Scene.role("link", { name: "Open standalone Fieldset Basic example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", {
          name: "Open standalone Fieldset Disabled example",
        })
      ).toExist()
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
      Scene.expect(Scene.role("heading", { name: "API" })).toExist(),
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
      Scene.expect(
        Scene.role("link", { name: "Open standalone File Drop Basic example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", {
          name: "Open standalone File Drop Disabled example",
        })
      ).toExist()
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
      Scene.expect(Scene.role("heading", { name: "API" })).toExist(),
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
      Scene.expect(
        Scene.role("link", { name: "Open standalone Input Basic example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", { name: "Open standalone Input Disabled example" })
      ).toExist()
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
      Scene.expect(Scene.role("heading", { name: "API" })).toExist(),
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
      Scene.expect(
        Scene.role("link", { name: "Open standalone Textarea Basic example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", {
          name: "Open standalone Textarea Disabled example",
        })
      ).toExist()
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
      Scene.expect(Scene.role("heading", { name: "API" })).toExist(),
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
      Scene.expect(
        Scene.role("link", { name: "Open standalone Combobox Basic example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", {
          name: "Open standalone Combobox Multi example",
        })
      ).toExist(),
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
      Scene.expect(Scene.role("heading", { name: "API" })).toExist(),
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
      Scene.expect(
        Scene.role("link", { name: "Open standalone Menu Basic example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", {
          name: "Open standalone Menu Animated example",
        })
      ).toExist()
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
      Scene.expect(Scene.role("heading", { name: "API" })).toExist(),
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
      Scene.expect(
        Scene.role("link", { name: "Open standalone Listbox Basic example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", {
          name: "Open standalone Listbox Animated example",
        })
      ).toExist()
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
      Scene.expect(Scene.role("heading", { name: "API" })).toExist(),
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
      Scene.expect(
        Scene.role("link", {
          name: "Open standalone Radio Group Basic example",
        })
      ).toExist(),
      Scene.expect(
        Scene.role("link", {
          name: "Open standalone Radio Group Horizontal example",
        })
      ).toExist()
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
      Scene.expect(Scene.role("heading", { name: "API" })).toExist(),
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
      Scene.expect(
        Scene.role("link", { name: "Open standalone Select Basic example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", {
          name: "Open standalone Select Disabled example",
        })
      ).toExist()
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
      Scene.expect(Scene.role("heading", { name: "API" })).toExist(),
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
      Scene.expect(
        Scene.role("link", { name: "Open standalone Popover Basic example" })
      ).toExist(),
      Scene.expect(
        Scene.role("link", {
          name: "Open standalone Popover Animated example",
        })
      ).toExist()
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
