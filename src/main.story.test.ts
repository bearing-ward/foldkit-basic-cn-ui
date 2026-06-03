import { Option } from "effect";
import { Calendar, Story, Ui } from "foldkit";
import { fromString } from "foldkit/url";
import { describe, expect, test } from "vitest";

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
import { ChangedUrl, GotUiMessage, HomeRoute, update } from "./main";
import type { Model } from "./main";
import { uiInit } from "./ui/init";
import { GotMobileMenuDialogMessage } from "./ui/message";

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
const [disclosureBasicExample] = DisclosureBasicExample.init();
const [disclosureDisabledExample] = DisclosureDisabledExample.init();
const [dragAndDropBasicExample] = DragAndDropBasicExample.init();
const [dragAndDropDisabledExample] = DragAndDropDisabledExample.init();
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
const [sliderBasicExample] = SliderBasicExample.init();
const [sliderDisabledExample] = SliderDisabledExample.init();
const [switchBasicExample] = SwitchBasicExample.init();
const [switchDisabledExample] = SwitchDisabledExample.init();
const [tabsBasicExample] = TabsBasicExample.init();
const [tabsManualExample] = TabsManualExample.init();
const [textareaBasicExample] = TextareaBasicExample.init();
const [textareaDisabledExample] = TextareaDisabledExample.init();
const [toastBasicExample] = ToastBasicExample.init();
const [toastVariantsExample] = ToastVariantsExample.init();

const initialModel: Model = {
  route: HomeRoute(),
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

    test("/docs/components/button resolves to ButtonDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/button"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ButtonDocs");
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

    test("/docs/components/combobox resolves to ComboboxDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/combobox"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("ComboboxDocs");
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

    test("/docs/components/dialog resolves to DialogDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/dialog"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("DialogDocs");
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

    test("/docs/components/popover resolves to PopoverDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/popover"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("PopoverDocs");
        })
      );
    });

    test("/docs/components/menu resolves to MenuDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/menu"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("MenuDocs");
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

    test("/docs/components/input resolves to InputDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/input"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("InputDocs");
        })
      );
    });

    test("/docs/components/fieldset resolves to FieldsetDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/fieldset"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("FieldsetDocs");
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

    test("/docs/components/checkbox resolves to CheckboxDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/checkbox"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("CheckboxDocs");
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

    test("/docs/components/radio-group resolves to RadioGroupDocs", () => {
      Story.story(
        update,
        Story.with(initialModel),
        Story.message(
          ChangedUrl({
            url: urlOrThrow("http://localhost/docs/components/radio-group"),
          })
        ),
        Story.model((model) => {
          expect(model.route._tag).toBe("RadioGroupDocs");
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
