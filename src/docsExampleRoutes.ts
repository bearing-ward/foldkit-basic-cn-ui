import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as DocsPreviewsAccordion from "./docsExamplePreviewsAccordion";
import * as DocsPreviewsAlert from "./docsExamplePreviewsAlert";
import * as DocsPreviewsAnimation from "./docsExamplePreviewsAnimation";
import * as DocsPreviewsAspect from "./docsExamplePreviewsAspect";
import * as DocsPreviewsAutocomplete from "./docsExamplePreviewsAutocomplete";
import * as DocsPreviewsAvatar from "./docsExamplePreviewsAvatar";
import * as DocsPreviewsB from "./docsExamplePreviewsB";
import * as DocsPreviewsCD from "./docsExamplePreviewsCD";
import * as DocsPreviewsEI from "./docsExamplePreviewsEI";
import * as DocsPreviewsJM from "./docsExamplePreviewsJM";
import * as DocsPreviewsNZ from "./docsExamplePreviewsNZ";
import type * as Main from "./main";

type Model = Main.Model;
type Message = Main.Message;

export const standaloneExampleRouteView = (
  title: string,
  slug: string,
  preview: Html
): Html => {
  const h = html<Message>();
  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1([h.Class("text-3xl font-bold text-gray-950")], [title]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [`Standalone route for the installable ${slug} registry example.`]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [preview]
      ),
    ]
  );
};

export const animationBasicExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsAnimation.animationBasicExamplePreview(
            model.animationBasicExample,
            "animation-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const virtualListBasicExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsNZ.virtualListBasicExamplePreview(
            model.virtualListBasicExample,
            "virtual-list-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const virtualListVariableExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsNZ.virtualListVariableExamplePreview(
            model.virtualListVariableExample,
            "virtual-list-variable-standalone"
          ),
        ]
      ),
    ]
  );
};

export const badgeBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Badge Basic"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable badge-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsB.badgeBasicExamplePreview(
            model.badgeBasicExample,
            "badge-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const badgeSpinnerExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Badge Spinner"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable badge-spinner registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsB.badgeSpinnerExamplePreview(
            model.badgeSpinnerExample,
            "badge-spinner-standalone"
          ),
        ]
      ),
    ]
  );
};

export const avatarBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Avatar Basic"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable avatar-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsAvatar.avatarBasicExamplePreview(
            model.avatarBasicExample,
            "avatar-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiAvatarBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Base UI Avatar Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable base-ui-avatar-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsAvatar.baseUiAvatarBasicExamplePreview(
            model.baseUiAvatarBasicExample,
            "base-ui-avatar-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const cardBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Card Basic"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable card-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsCD.cardBasicExamplePreview(
            model.cardBasicExample,
            "card-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiSeparatorBasicExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Base UI Separator Basic",
    "base-ui-separator-basic",
    DocsPreviewsNZ.baseUiSeparatorBasicExamplePreview(
      model.baseUiSeparatorBasicExample,
      "base-ui-separator-basic-standalone"
    )
  );

export const separatorBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Separator Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable separator-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsNZ.separatorBasicExamplePreview(
            model.separatorBasicExample,
            "separator-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const skeletonBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Skeleton Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable skeleton-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsNZ.skeletonBasicExamplePreview(
            model.skeletonBasicExample,
            "skeleton-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const kbdBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Kbd Basic"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            ["Standalone route for the installable kbd-basic registry example."]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsJM.kbdBasicExamplePreview(
            model.kbdBasicExample,
            "kbd-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const kbdInputGroupExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Kbd Input Group"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable kbd-input-group registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsJM.kbdInputGroupExamplePreview(
            model.kbdInputGroupExample,
            "kbd-input-group-standalone"
          ),
        ]
      ),
    ]
  );
};

export const typographyBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Typography Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable typography-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsNZ.typographyBasicExamplePreview(
            model.typographyBasicExample,
            "typography-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const emptyBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Empty Basic"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable empty-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsEI.emptyBasicExamplePreview(
            model.emptyBasicExample,
            "empty-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const emptyInputGroupExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Empty Input Group"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable empty-input-group registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsEI.emptyInputGroupExamplePreview(
            model.emptyInputGroupExample,
            "empty-input-group-standalone"
          ),
        ]
      ),
    ]
  );
};

export const buttonBasicExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsB.buttonBasicExamplePreview(
            model.buttonBasicExample,
            "button-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiButtonBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Base UI Button Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable base-ui-button-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsB.baseUiButtonBasicExamplePreview(
            model.baseUiButtonBasicExample,
            "base-ui-button-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const buttonDisabledExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsB.buttonDisabledExamplePreview(
            model.buttonDisabledExample,
            "button-disabled-standalone"
          ),
        ]
      ),
    ]
  );
};

export const calendarBasicExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsCD.calendarBasicExamplePreview(
            model.calendarBasicExample,
            "calendar-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const calendarBoundsExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsCD.calendarBoundsExamplePreview(
            model.calendarBoundsExample,
            "calendar-bounds-standalone"
          ),
        ]
      ),
    ]
  );
};

export const datePickerBasicExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsCD.datePickerBasicExamplePreview(
            model.datePickerBasicExample,
            "date-picker-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const datePickerBoundsExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsCD.datePickerBoundsExamplePreview(
            model.datePickerBoundsExample,
            "date-picker-bounds-standalone"
          ),
        ]
      ),
    ]
  );
};

export const checkboxBasicExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsCD.checkboxBasicExamplePreview(
            model.checkboxBasicExample,
            "checkbox-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiCheckboxBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Base UI Checkbox Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable base-ui-checkbox-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsCD.baseUiCheckboxBasicExamplePreview(
            model.baseUiCheckboxBasicExample,
            "base-ui-checkbox-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiCheckboxLabelingExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Base UI Checkbox Labeling",
    "base-ui-checkbox-labeling",
    DocsPreviewsCD.baseUiCheckboxLabelingExamplePreview(
      model.baseUiCheckboxLabelingExample,
      "base-ui-checkbox-labeling-standalone"
    )
  );

export const baseUiCheckboxNativeButtonExampleRouteView = (
  model: Model
): Html =>
  standaloneExampleRouteView(
    "Base UI Checkbox Native Button",
    "base-ui-checkbox-native-button",
    DocsPreviewsCD.baseUiCheckboxNativeButtonExamplePreview(
      model.baseUiCheckboxNativeButtonExample,
      "base-ui-checkbox-native-button-standalone"
    )
  );

export const baseUiCheckboxFormExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Base UI Checkbox Form",
    "base-ui-checkbox-form",
    DocsPreviewsCD.baseUiCheckboxFormExamplePreview(
      model.baseUiCheckboxFormExample,
      "base-ui-checkbox-form-standalone"
    )
  );

export const baseUiCheckboxGroupBasicExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Base UI Checkbox Group Basic",
    "base-ui-checkbox-group-basic",
    DocsPreviewsCD.baseUiCheckboxGroupBasicExamplePreview(
      model.baseUiCheckboxGroupBasicExample,
      "base-ui-checkbox-group-basic-standalone"
    )
  );

export const baseUiCheckboxGroupLabelingExampleRouteView = (
  model: Model
): Html =>
  standaloneExampleRouteView(
    "Base UI Checkbox Group Labeling",
    "base-ui-checkbox-group-labeling",
    DocsPreviewsCD.baseUiCheckboxGroupLabelingExamplePreview(
      model.baseUiCheckboxGrouplabelingExample,
      "base-ui-checkbox-group-labeling-standalone"
    )
  );

export const baseUiCheckboxGroupNativeButtonExampleRouteView = (
  model: Model
): Html =>
  standaloneExampleRouteView(
    "Base UI Checkbox Group Native Button",
    "base-ui-checkbox-group-native-button",
    DocsPreviewsCD.baseUiCheckboxGroupNativeButtonExamplePreview(
      model.baseUiCheckboxGroupnativeButtonExample,
      "base-ui-checkbox-group-native-button-standalone"
    )
  );

export const baseUiCheckboxGroupFormExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Base UI Checkbox Group Form",
    "base-ui-checkbox-group-form",
    DocsPreviewsCD.baseUiCheckboxGroupFormExamplePreview(
      model.baseUiCheckboxGroupformExample,
      "base-ui-checkbox-group-form-standalone"
    )
  );

export const baseUiCheckboxGroupParentExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Base UI Checkbox Group Parent",
    "base-ui-checkbox-group-parent",
    DocsPreviewsCD.baseUiCheckboxGroupParentExamplePreview(
      model.baseUiCheckboxGroupparentExample,
      "base-ui-checkbox-group-parent-standalone"
    )
  );

export const baseUiCheckboxGroupNestedParentExampleRouteView = (
  model: Model
): Html =>
  standaloneExampleRouteView(
    "Base UI Checkbox Group Nested Parent",
    "base-ui-checkbox-group-nested-parent",
    DocsPreviewsCD.baseUiCheckboxGroupNestedParentExamplePreview(
      model.baseUiCheckboxGroupnestedParentExample,
      "base-ui-checkbox-group-nested-parent-standalone"
    )
  );

export const checkboxGroupBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Checkbox Group Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable checkbox-group-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsCD.checkboxGroupBasicExamplePreview(
            model.checkboxGroupBasicExample,
            "checkbox-group-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const accordionBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Accordion Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable accordion-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsAccordion.accordionBasicExamplePreview(
            model.accordionBasicExample,
            "accordion-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const accordionMultipleExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Accordion Multiple"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable accordion-multiple registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsAccordion.accordionMultipleExamplePreview(
            model.accordionMultipleExample,
            "accordion-multiple-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiAccordionMultipleExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Base UI Accordion Multiple"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable base-ui-accordion-multiple registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsAccordion.baseUiAccordionMultipleExamplePreview(
            model.baseUiAccordionMultipleExample,
            "base-ui-accordion-multiple-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiAccordionBasicExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Base UI Accordion Basic",
    "base-ui-accordion-basic",
    DocsPreviewsAccordion.baseUiAccordionBasicExamplePreview(
      model.baseUiAccordionBasicExample,
      "base-ui-accordion-basic-standalone"
    )
  );

export const breadcrumbBasicExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Breadcrumb Basic",
    "breadcrumb-basic",
    DocsPreviewsB.breadcrumbBasicExamplePreview(
      model.breadcrumbBasicExample,
      "breadcrumb-basic-standalone"
    )
  );
export const breadcrumbSeparatorExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Breadcrumb Separator",
    "breadcrumb-separator",
    DocsPreviewsB.breadcrumbSeparatorExamplePreview(
      model.breadcrumbSeparatorExample,
      "breadcrumb-separator-standalone"
    )
  );
export const breadcrumbDropdownExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Breadcrumb Dropdown",
    "breadcrumb-dropdown",
    DocsPreviewsB.breadcrumbDropdownExamplePreview(
      model.breadcrumbDropdownExample,
      "breadcrumb-dropdown-standalone"
    )
  );
export const breadcrumbCollapsedExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Breadcrumb Collapsed",
    "breadcrumb-collapsed",
    DocsPreviewsB.breadcrumbCollapsedExamplePreview(
      model.breadcrumbCollapsedExample,
      "breadcrumb-collapsed-standalone"
    )
  );
export const breadcrumbLinkExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Breadcrumb Link",
    "breadcrumb-link",
    DocsPreviewsB.breadcrumbLinkExamplePreview(
      model.breadcrumbLinkExample,
      "breadcrumb-link-standalone"
    )
  );
export const breadcrumbRtlExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Breadcrumb RTL",
    "breadcrumb-rtl",
    DocsPreviewsB.breadcrumbRtlExamplePreview(
      model.breadcrumbRtlExample,
      "breadcrumb-rtl-standalone"
    )
  );

export const buttonGroupBasicExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Button Group Basic",
    "button-group-basic",
    DocsPreviewsB.buttonGroupBasicExamplePreview(
      model.buttonGroupBasicExample,
      "button-group-basic-standalone"
    )
  );
export const buttonGroupOrientationExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Button Group Orientation",
    "button-group-orientation",
    DocsPreviewsB.buttonGroupOrientationExamplePreview(
      model.buttonGroupOrientationExample,
      "button-group-orientation-standalone"
    )
  );
export const buttonGroupSizeExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Button Group Size",
    "button-group-size",
    DocsPreviewsB.buttonGroupSizeExamplePreview(
      model.buttonGroupSizeExample,
      "button-group-size-standalone"
    )
  );
export const buttonGroupNestedExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Button Group Nested",
    "button-group-nested",
    DocsPreviewsB.buttonGroupNestedExamplePreview(
      model.buttonGroupNestedExample,
      "button-group-nested-standalone"
    )
  );
export const buttonGroupSeparatorExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Button Group Separator",
    "button-group-separator",
    DocsPreviewsB.buttonGroupSeparatorExamplePreview(
      model.buttonGroupSeparatorExample,
      "button-group-separator-standalone"
    )
  );
export const buttonGroupSplitExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Button Group Split",
    "button-group-split",
    DocsPreviewsB.buttonGroupSplitExamplePreview(
      model.buttonGroupSplitExample,
      "button-group-split-standalone"
    )
  );
export const buttonGroupInputExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Button Group Input",
    "button-group-input",
    DocsPreviewsB.buttonGroupInputExamplePreview(
      model.buttonGroupInputExample,
      "button-group-input-standalone"
    )
  );
export const buttonGroupInputGroupExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Button Group Input Group",
    "button-group-input-group",
    DocsPreviewsB.buttonGroupInputGroupExamplePreview(
      model.buttonGroupInputGroupExample,
      "button-group-input-group-standalone"
    )
  );
export const buttonGroupSelectExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Button Group Select",
    "button-group-select",
    DocsPreviewsB.buttonGroupSelectExamplePreview(
      model.buttonGroupSelectExample,
      "button-group-select-standalone"
    )
  );
export const buttonGroupPopoverExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Button Group Popover",
    "button-group-popover",
    DocsPreviewsB.buttonGroupPopoverExamplePreview(
      model.buttonGroupPopoverExample,
      "button-group-popover-standalone"
    )
  );
export const buttonGroupRtlExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Button Group RTL",
    "button-group-rtl",
    DocsPreviewsB.buttonGroupRtlExamplePreview(
      model.buttonGroupRtlExample,
      "button-group-rtl-standalone"
    )
  );
export const carouselBasicExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Carousel Basic",
    "carousel-basic",
    DocsPreviewsCD.carouselBasicExamplePreview(
      model.carouselBasicExample,
      "carousel-basic-standalone"
    )
  );
export const carouselSizesExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Carousel Sizes",
    "carousel-sizes",
    DocsPreviewsCD.carouselSizesExamplePreview(
      model.carouselSizesExample,
      "carousel-sizes-standalone"
    )
  );
export const carouselSpacingExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Carousel Spacing",
    "carousel-spacing",
    DocsPreviewsCD.carouselSpacingExamplePreview(
      model.carouselSpacingExample,
      "carousel-spacing-standalone"
    )
  );
export const carouselOrientationExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Carousel Orientation",
    "carousel-orientation",
    DocsPreviewsCD.carouselOrientationExamplePreview(
      model.carouselOrientationExample,
      "carousel-orientation-standalone"
    )
  );
export const carouselApiExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Carousel API",
    "carousel-api",
    DocsPreviewsCD.carouselApiExamplePreview(
      model.carouselApiExample,
      "carousel-api-standalone"
    )
  );
export const carouselRtlExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Carousel RTL",
    "carousel-rtl",
    DocsPreviewsCD.carouselRtlExamplePreview(
      model.carouselRtlExample,
      "carousel-rtl-standalone"
    )
  );
export const chartBasicExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Chart Basic",
    "chart-basic",
    DocsPreviewsCD.chartBasicExamplePreview(
      model.chartBasicExample,
      "chart-basic-standalone"
    )
  );
export const chartGridExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Chart Grid",
    "chart-grid",
    DocsPreviewsCD.chartGridExamplePreview(
      model.chartGridExample,
      "chart-grid-standalone"
    )
  );
export const chartAxisExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Chart Axis",
    "chart-axis",
    DocsPreviewsCD.chartAxisExamplePreview(
      model.chartAxisExample,
      "chart-axis-standalone"
    )
  );
export const chartTooltipExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Chart Tooltip",
    "chart-tooltip",
    DocsPreviewsCD.chartTooltipExamplePreview(
      model.chartTooltipExample,
      "chart-tooltip-standalone"
    )
  );
export const chartLegendExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Chart Legend",
    "chart-legend",
    DocsPreviewsCD.chartLegendExamplePreview(
      model.chartLegendExample,
      "chart-legend-standalone"
    )
  );
export const chartRtlExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Chart RTL",
    "chart-rtl",
    DocsPreviewsCD.chartRtlExamplePreview(
      model.chartRtlExample,
      "chart-rtl-standalone"
    )
  );
export const dataTableBasicExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Data Table Basic",
    "data-table-basic",
    DocsPreviewsCD.dataTableBasicExamplePreview(
      model.dataTableBasicExample,
      "data-table-basic-standalone"
    )
  );
export const dataTableRowActionsExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Data Table Row Actions",
    "data-table-row-actions",
    DocsPreviewsCD.dataTableRowActionsExamplePreview(
      model.dataTableRowActionsExample,
      "data-table-row-actions-standalone"
    )
  );
export const dataTablePaginationExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Data Table Pagination",
    "data-table-pagination",
    DocsPreviewsCD.dataTablePaginationExamplePreview(
      model.dataTablePaginationExample,
      "data-table-pagination-standalone"
    )
  );
export const dataTableSortingExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Data Table Sorting",
    "data-table-sorting",
    DocsPreviewsCD.dataTableSortingExamplePreview(
      model.dataTableSortingExample,
      "data-table-sorting-standalone"
    )
  );
export const dataTableFilteringExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Data Table Filtering",
    "data-table-filtering",
    DocsPreviewsCD.dataTableFilteringExamplePreview(
      model.dataTableFilteringExample,
      "data-table-filtering-standalone"
    )
  );
export const dataTableVisibilityExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Data Table Visibility",
    "data-table-visibility",
    DocsPreviewsCD.dataTableVisibilityExamplePreview(
      model.dataTableVisibilityExample,
      "data-table-visibility-standalone"
    )
  );
export const dataTableRowSelectionExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Data Table Row Selection",
    "data-table-row-selection",
    DocsPreviewsCD.dataTableRowSelectionExamplePreview(
      model.dataTableRowSelectionExample,
      "data-table-row-selection-standalone"
    )
  );
export const directionBasicExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Direction Basic",
    "direction-basic",
    DocsPreviewsCD.directionBasicExamplePreview(
      model.directionBasicExample,
      "direction-basic-standalone"
    )
  );
export const itemAvatarExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Item Avatar",
    "item-avatar",
    DocsPreviewsEI.itemAvatarExamplePreview(
      model.itemAvatarExample,
      "item-avatar-standalone"
    )
  );
export const itemBasicExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Item Basic",
    "item-basic",
    DocsPreviewsEI.itemBasicExamplePreview(
      model.itemBasicExample,
      "item-basic-standalone"
    )
  );
export const itemGroupExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Item Group",
    "item-group",
    DocsPreviewsEI.itemGroupExamplePreview(
      model.itemGroupExample,
      "item-group-standalone"
    )
  );
export const itemHeaderExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Item Header",
    "item-header",
    DocsPreviewsEI.itemHeaderExamplePreview(
      model.itemHeaderExample,
      "item-header-standalone"
    )
  );
export const itemIconExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Item Icon",
    "item-icon",
    DocsPreviewsEI.itemIconExamplePreview(
      model.itemIconExample,
      "item-icon-standalone"
    )
  );
export const itemImageExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Item Image",
    "item-image",
    DocsPreviewsEI.itemImageExamplePreview(
      model.itemImageExample,
      "item-image-standalone"
    )
  );
export const itemLinkExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Item Link",
    "item-link",
    DocsPreviewsEI.itemLinkExamplePreview(
      model.itemLinkExample,
      "item-link-standalone"
    )
  );
export const itemDropdownExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Item Dropdown",
    "item-dropdown",
    DocsPreviewsEI.itemDropdownExamplePreview(
      model.itemDropdownExample,
      "item-dropdown-standalone"
    )
  );
export const itemRtlExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Item RTL",
    "item-rtl",
    DocsPreviewsEI.itemRtlExamplePreview(
      model.itemRtlExample,
      "item-rtl-standalone"
    )
  );
export const itemSizeExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Item Size",
    "item-size",
    DocsPreviewsEI.itemSizeExamplePreview(
      model.itemSizeExample,
      "item-size-standalone"
    )
  );
export const itemVariantExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Item Variant",
    "item-variant",
    DocsPreviewsEI.itemVariantExamplePreview(
      model.itemVariantExample,
      "item-variant-standalone"
    )
  );
export const labelBasicExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Label Basic",
    "label-basic",
    DocsPreviewsJM.labelBasicExamplePreview(
      model.labelBasicExample,
      "label-basic-standalone"
    )
  );
export const paginationBasicExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Pagination Basic",
    "pagination-basic",
    DocsPreviewsNZ.paginationBasicExamplePreview(
      model.paginationBasicExample,
      "pagination-basic-standalone"
    )
  );
export const resizableBasicExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Resizable Basic",
    "resizable-basic",
    DocsPreviewsNZ.resizableBasicExamplePreview(
      model.resizableBasicExample,
      "resizable-basic-standalone"
    )
  );
export const sidebarBasicExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Sidebar Basic",
    "sidebar-basic",
    DocsPreviewsNZ.sidebarBasicExamplePreview(
      model.sidebarBasicExample,
      "sidebar-basic-standalone"
    )
  );
export const tableBasicExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Table Basic",
    "table-basic",
    DocsPreviewsNZ.tableBasicExamplePreview(
      model.tableBasicExample,
      "table-basic-standalone"
    )
  );
export const commandBasicExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Command Basic",
    "command-basic",
    DocsPreviewsCD.commandBasicExamplePreview(
      model.commandBasicExample,
      "command-basic-standalone"
    )
  );
export const dropdownMenuBasicExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Dropdown Menu Basic",
    "dropdown-menu-basic",
    DocsPreviewsCD.dropdownMenuBasicExamplePreview(
      model.dropdownMenuBasicExample,
      "dropdown-menu-basic-standalone"
    )
  );
export const hoverCardBasicExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Hover Card Basic",
    "hover-card-basic",
    DocsPreviewsEI.hoverCardBasicExamplePreview(
      model.hoverCardBasicExample,
      "hover-card-basic-standalone"
    )
  );
export const inputOtpBasicExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Input OTP Basic",
    "input-otp-basic",
    DocsPreviewsEI.inputOtpBasicExamplePreview(
      model.inputOtpBasicExample,
      "input-otp-basic-standalone"
    )
  );
export const nativeSelectBasicExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Native Select Basic",
    "native-select-basic",
    DocsPreviewsNZ.nativeSelectBasicExamplePreview(
      model.nativeSelectBasicExample,
      "native-select-basic-standalone"
    )
  );
export const sheetBasicExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Sheet Basic",
    "sheet-basic",
    DocsPreviewsNZ.sheetBasicExamplePreview(
      model.sheetBasicExample,
      "sheet-basic-standalone"
    )
  );
export const sonnerBasicExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Sonner Basic",
    "sonner-basic",
    DocsPreviewsNZ.sonnerBasicExamplePreview(
      model.sonnerBasicExample,
      "sonner-basic-standalone"
    )
  );
export const alertDialogBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Alert Dialog Basic"]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsAlert.alertDialogBasicExamplePreview(
            model.alertDialogBasicExample,
            "alert-dialog-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiAlertDialogCloseConfirmationExampleRouteView = (
  model: Model
): Html =>
  standaloneExampleRouteView(
    "Base UI Alert Dialog Close Confirmation",
    "base-ui-alert-dialog-close-confirmation",
    DocsPreviewsB.baseUiAlertDialogCloseConfirmationExamplePreview(
      model.baseUiAlertDialogCloseConfirmationExample,
      "base-ui-alert-dialog-close-confirmation-standalone"
    )
  );

export const baseUiAlertDialogControlledMultipleTriggersExampleRouteView = (
  model: Model
): Html =>
  standaloneExampleRouteView(
    "Base UI Alert Dialog Controlled Multiple Triggers",
    "base-ui-alert-dialog-controlled-multiple-triggers",
    DocsPreviewsB.baseUiAlertDialogControlledMultipleTriggersExamplePreview(
      model.baseUiAlertDialogControlledMultipleTriggersExample,
      "base-ui-alert-dialog-controlled-multiple-triggers-standalone"
    )
  );

export const baseUiAlertDialogOpenFromMenuExampleRouteView = (
  model: Model
): Html =>
  standaloneExampleRouteView(
    "Base UI Alert Dialog Open From Menu",
    "base-ui-alert-dialog-open-from-menu",
    DocsPreviewsB.baseUiAlertDialogOpenFromMenuExamplePreview(
      model.baseUiAlertDialogOpenFromMenuExample,
      "base-ui-alert-dialog-open-from-menu-standalone"
    )
  );

export const baseUiAlertDialogDetachedTriggersExampleRouteView = (
  model: Model
): Html =>
  standaloneExampleRouteView(
    "Base UI Alert Dialog Detached Triggers",
    "base-ui-alert-dialog-detached-triggers",
    DocsPreviewsB.baseUiAlertDialogDetachedTriggersExamplePreview(
      model.baseUiAlertDialogDetachedTriggersExample,
      "base-ui-alert-dialog-detached-triggers-standalone"
    )
  );

export const baseUiAlertDialogMultipleTriggersExampleRouteView = (
  model: Model
): Html =>
  standaloneExampleRouteView(
    "Base UI Alert Dialog Multiple Triggers",
    "base-ui-alert-dialog-multiple-triggers",
    DocsPreviewsB.baseUiAlertDialogMultipleTriggersExamplePreview(
      model.baseUiAlertDialogMultipleTriggersExample,
      "base-ui-alert-dialog-multiple-triggers-standalone"
    )
  );

export const baseUiAlertDialogBasicExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Base UI Alert Dialog Basic",
    "base-ui-alert-dialog-basic",
    DocsPreviewsB.baseUiAlertDialogBasicExamplePreview(
      model.baseUiAlertDialogBasicExample,
      "base-ui-alert-dialog-basic-standalone"
    )
  );

export const alertBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Alert Basic"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable alert-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsAlert.alertBasicExamplePreview(
            model.alertBasicExample,
            "alert-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const alertActionExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Alert Action"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable alert-action registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsAlert.alertActionExamplePreview(
            model.alertActionExample,
            "alert-action-standalone"
          ),
        ]
      ),
    ]
  );
};

export const alertDestructiveExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Alert Destructive"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable alert-destructive registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsAlert.alertDestructiveExamplePreview(
            model.alertDestructiveExample,
            "alert-destructive-standalone"
          ),
        ]
      ),
    ]
  );
};

export const aspectRatioBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Aspect Ratio Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable aspect-ratio-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsAspect.aspectRatioBasicExamplePreview(
            model.aspectRatioBasicExample,
            "aspect-ratio-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const aspectRatioSquareExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Aspect Ratio Square"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable aspect-ratio-square registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsAspect.aspectRatioSquareExamplePreview(
            model.aspectRatioSquareExample,
            "aspect-ratio-square-standalone"
          ),
        ]
      ),
    ]
  );
};

export const aspectRatioPortraitExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Aspect Ratio Portrait"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable aspect-ratio-portrait registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsAspect.aspectRatioPortraitExamplePreview(
            model.aspectRatioPortraitExample,
            "aspect-ratio-portrait-standalone"
          ),
        ]
      ),
    ]
  );
};

export const aspectRatioRtlExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Aspect Ratio RTL"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable aspect-ratio-rtl registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsAspect.aspectRatioRtlExamplePreview(
            model.aspectRatioRtlExample,
            "aspect-ratio-rtl-standalone"
          ),
        ]
      ),
    ]
  );
};

export const drawerBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Drawer Basic"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable drawer-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsCD.drawerBasicExamplePreview(
            model.drawerBasicExample,
            "drawer-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const contextMenuBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Context Menu Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable context-menu-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsCD.contextMenuBasicExamplePreview(
            model.contextMenuBasicExample,
            "context-menu-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiContextMenuBasicExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Base UI Context Menu Basic",
    "base-ui-context-menu-basic",
    DocsPreviewsCD.baseUiContextMenuBasicExamplePreview(
      model.baseUiContextMenuBasicExample,
      "base-ui-context-menu-basic-standalone"
    )
  );

export const menubarBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Menubar Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable controlled menubar-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsJM.menubarBasicExamplePreview(
            model.menubarBasicExample,
            "menubar-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const navigationMenuBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Navigation Menu Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable navigation-menu-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsNZ.navigationMenuBasicExamplePreview(
            model.navigationMenuBasicExample,
            "navigation-menu-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiNavigationMenuBasicExampleRouteView = (
  model: Model
): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Base UI Navigation Menu Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable base-ui-navigation-menu-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsNZ.baseUiNavigationMenuBasicExamplePreview(
            model.baseUiNavigationMenuBasicExample,
            "base-ui-navigation-menu-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const otpFieldBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["OTP Field Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable otp-field-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsNZ.otpFieldBasicExamplePreview(
            model.otpFieldBasicExample,
            "otp-field-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiOtpFieldBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Base UI OTP Field Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable base-ui-otp-field-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsNZ.baseUiOtpFieldBasicExamplePreview(
            model.baseUiOtpFieldBasicExample,
            "base-ui-otp-field-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const previewCardBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Preview Card Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable preview-card-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsNZ.previewCardBasicExamplePreview(
            model.previewCardBasicExample,
            "preview-card-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiPreviewCardBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Base UI Preview Card Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable base-ui-preview-card-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsNZ.baseUiPreviewCardBasicExamplePreview(
            model.baseUiPreviewCardBasicExample,
            "base-ui-preview-card-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const collapsibleBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Collapsible Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable collapsible-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsCD.collapsibleBasicExamplePreview(
            model.collapsibleBasicExample,
            "collapsible-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiCollapsibleBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Base UI Collapsible Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable base-ui-collapsible-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsCD.baseUiCollapsibleBasicExamplePreview(
            model.baseUiCollapsibleBasicExample,
            "base-ui-collapsible-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiDrawerPositionExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Base UI Drawer Position",
    "base-ui-drawer-position",
    DocsPreviewsCD.baseUiDrawerPositionExamplePreview(
      model.baseUiDrawerpositionExample,
      "base-ui-drawer-position-standalone"
    )
  );
export const baseUiDrawerNonModalExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Base UI Drawer Non-modal",
    "base-ui-drawer-non-modal",
    DocsPreviewsCD.baseUiDrawerNonModalExamplePreview(
      model.baseUiDrawernonModalExample,
      "base-ui-drawer-non-modal-standalone"
    )
  );

export const fieldBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Field Basic"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable field-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsEI.fieldBasicExamplePreview(
            model.fieldBasicExample,
            "field-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const numberFieldBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Number Field Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable number-field-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsNZ.numberFieldBasicExamplePreview(
            model.numberFieldBasicExample,
            "number-field-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiNumberFieldBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Base UI Number Field Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable base-ui-number-field-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsNZ.baseUiNumberFieldBasicExamplePreview(
            model.baseUiNumberFieldBasicExample,
            "base-ui-number-field-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const autocompleteBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Autocomplete Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable autocomplete-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsAutocomplete.autocompleteBasicExamplePreview(
            model.autocompleteBasicExample,
            "autocomplete-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiAutocompleteBasicExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Base UI Autocomplete Basic",
    "base-ui-autocomplete-basic",
    DocsPreviewsAutocomplete.baseUiAutocompleteBasicExamplePreview(
      model.baseUiAutocompleteBasicExample,
      "base-ui-autocomplete-basic-standalone"
    )
  );

export const formBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Form Basic"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable form-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsEI.formBasicExamplePreview(
            model.formBasicExample,
            "form-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiFieldsetBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Base UI Fieldset Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable base-ui-fieldset-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsCD.baseUiFieldsetBasicExamplePreview(
            model.baseUiFieldsetBasicExample,
            "base-ui-fieldset-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiDrawerBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Base UI Drawer Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable base-ui-drawer-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsCD.baseUiDrawerBasicExamplePreview(
            model.baseUiDrawerBasicExample,
            "base-ui-drawer-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiFieldBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Base UI Field Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable base-ui-field-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsCD.baseUiFieldBasicExamplePreview(
            model.baseUiFieldBasicExample,
            "base-ui-field-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiFormBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Base UI Form Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable base-ui-form-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsCD.baseUiFormBasicExamplePreview(
            model.baseUiFormBasicExample,
            "base-ui-form-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiFormServerFunctionExampleRouteView = (
  model: Model
): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Base UI Form Server Function"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable base-ui-form-server-function registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsCD.baseUiFormServerFunctionExamplePreview(
            model.baseUiFormServerFunctionExample,
            "base-ui-form-server-function-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiInputBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Base UI Input Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable base-ui-input-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsCD.baseUiInputBasicExamplePreview(
            model.baseUiInputBasicExample,
            "base-ui-input-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiMenuBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Base UI Menu Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable base-ui-menu-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsCD.baseUiMenuBasicExamplePreview(
            model.baseUiMenuBasicExample,
            "base-ui-menu-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiMenuNestedExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Base UI Menu Nested"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable base-ui-menu-nested registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsCD.baseUiMenuNestedExamplePreview(
            model.baseUiMenuNestedExample,
            "base-ui-menu-nested-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiMenubarBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Base UI Menubar Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable base-ui-menubar-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsCD.baseUiMenubarBasicExamplePreview(
            model.baseUiMenubarBasicExample,
            "base-ui-menubar-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiMeterBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Base UI Meter Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable base-ui-meter-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsCD.baseUiMeterBasicExamplePreview(
            model.baseUiMeterBasicExample,
            "base-ui-meter-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const checkboxIndeterminateExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsCD.checkboxIndeterminateExamplePreview(
            model.checkboxIndeterminateExample,
            "checkbox-indeterminate-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiSliderBasicExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Base UI Slider Basic",
    "base-ui-slider-basic",
    DocsPreviewsNZ.baseUiSliderBasicExamplePreview(
      model.baseUiSliderBasicExample,
      "base-ui-slider-basic-standalone"
    )
  );

export const sliderBasicExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsNZ.sliderBasicExamplePreview(
            model.sliderBasicExample,
            "slider-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const sliderDisabledExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsNZ.sliderDisabledExamplePreview(
            model.sliderDisabledExample,
            "slider-disabled-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiTabsBasicExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Base UI Tabs Basic",
    "base-ui-tabs-basic",
    DocsPreviewsNZ.baseUiTabsBasicExamplePreview(
      model.baseUiTabsBasicExample,
      "base-ui-tabs-basic-standalone"
    )
  );

export const tabsBasicExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsNZ.tabsBasicExamplePreview(
            model.tabsBasicExample,
            "tabs-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const tabsManualExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsNZ.tabsManualExamplePreview(
            model.tabsManualExample,
            "tabs-manual-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiSwitchBasicExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Base UI Switch Basic",
    "base-ui-switch-basic",
    DocsPreviewsNZ.baseUiSwitchBasicExamplePreview(
      model.baseUiSwitchBasicExample,
      "base-ui-switch-basic-standalone"
    )
  );

export const switchBasicExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsNZ.switchBasicExamplePreview(
            model.switchBasicExample,
            "switch-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const switchDisabledExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsNZ.switchDisabledExamplePreview(
            model.switchDisabledExample,
            "switch-disabled-standalone"
          ),
        ]
      ),
    ]
  );
};

export const fieldsetBasicExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsEI.fieldsetBasicExamplePreview(
            model.fieldsetBasicExample,
            "fieldset-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const fieldsetDisabledExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsEI.fieldsetDisabledExamplePreview(
            model.fieldsetDisabledExample,
            "fieldset-disabled-standalone"
          ),
        ]
      ),
    ]
  );
};

export const fileDropBasicExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsEI.fileDropBasicExamplePreview(
            model.fileDropBasicExample,
            "file-drop-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const fileDropDisabledExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsEI.fileDropDisabledExamplePreview(
            model.fileDropDisabledExample,
            "file-drop-disabled-standalone"
          ),
        ]
      ),
    ]
  );
};

export const inputBasicExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsEI.inputBasicExamplePreview(
            model.inputBasicExample,
            "input-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const inputDisabledExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsEI.inputDisabledExamplePreview(
            model.inputDisabledExample,
            "input-disabled-standalone"
          ),
        ]
      ),
    ]
  );
};

export const progressBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Progress Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable progress-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsNZ.progressBasicExamplePreview(
            model.progressBasicExample,
            "progress-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiProgressBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Base UI Progress Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable base-ui-progress-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsNZ.baseUiProgressBasicExamplePreview(
            model.baseUiProgressBasicExample,
            "base-ui-progress-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const meterBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Meter Basic"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable meter-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsJM.meterBasicExamplePreview(
            model.meterBasicExample,
            "meter-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const scrollAreaBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Base UI Scroll Area Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable base-ui-scroll-area-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsNZ.scrollAreaBasicExamplePreview(
            model.scrollAreaBasicExample,
            "base-ui-scroll-area-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const scrollAreaBothScrollbarsExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Base UI Scroll Area Both Scrollbars",
    "base-ui-scroll-area-both-scrollbars",
    DocsPreviewsNZ.scrollAreaBothScrollbarsExamplePreview(
      model.scrollAreaBothScrollbarsExample,
      "base-ui-scroll-area-both-scrollbars-standalone"
    )
  );

export const scrollAreaGradientExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Base UI Scroll Area Gradient",
    "base-ui-scroll-area-gradient",
    DocsPreviewsNZ.scrollAreaGradientExamplePreview(
      model.scrollAreaGradientExample,
      "base-ui-scroll-area-gradient-standalone"
    )
  );

export const scrollAreaTabsExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Base UI Scroll Area Tabs",
    "base-ui-scroll-area-tabs",
    DocsPreviewsNZ.scrollAreaTabsExamplePreview(
      model.scrollAreaTabsExample,
      "base-ui-scroll-area-tabs-standalone"
    )
  );

export const baseUiToggleBasicExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Base UI Toggle Basic",
    "base-ui-toggle-basic",
    DocsPreviewsNZ.baseUiToggleBasicExamplePreview(
      model.baseUiToggleBasicExample,
      "base-ui-toggle-basic-standalone"
    )
  );

export const toggleBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Toggle Basic"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable toggle-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsNZ.toggleBasicExamplePreview(
            model.toggleBasicExample,
            "toggle-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiToggleGroupBasicExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Base UI Toggle Group Basic",
    "base-ui-toggle-group-basic",
    DocsPreviewsNZ.baseUiToggleGroupBasicExamplePreview(
      model.baseUiToggleGroupBasicExample,
      "base-ui-toggle-group-basic-standalone"
    )
  );

export const toggleGroupBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Toggle Group Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable toggle-group-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsNZ.toggleGroupBasicExamplePreview(
            model.toggleGroupBasicExample,
            "toggle-group-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiToolbarBasicExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Base UI Toolbar Basic",
    "base-ui-toolbar-basic",
    DocsPreviewsNZ.baseUiToolbarBasicExamplePreview(
      model.baseUiToolbarBasicExample,
      "base-ui-toolbar-basic-standalone"
    )
  );

export const toolbarBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Toolbar Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable toolbar-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsNZ.toolbarBasicExamplePreview(
            model.toolbarBasicExample,
            "toolbar-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const radioBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1([h.Class("text-3xl font-bold text-gray-950")], ["Radio Basic"]),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable radio-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsNZ.radioBasicExamplePreview(
            model.radioBasicExample,
            "radio-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const textareaBasicExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsNZ.textareaBasicExamplePreview(
            model.textareaBasicExample,
            "textarea-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const textareaDisabledExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsNZ.textareaDisabledExamplePreview(
            model.textareaDisabledExample,
            "textarea-disabled-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiToastBasicExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Base UI Toast Basic",
    "base-ui-toast-basic",
    DocsPreviewsNZ.baseUiToastBasicExamplePreview(
      model.baseUiToastBasicExample,
      "base-ui-toast-basic-standalone"
    )
  );

export const toastBasicExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsNZ.toastBasicExamplePreview(
            model.toastBasicExample,
            "toast-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const toastVariantsExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsNZ.toastVariantsExamplePreview(
            model.toastVariantsExample,
            "toast-variants-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiTooltipBasicExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Base UI Tooltip Basic",
    "base-ui-tooltip-basic",
    DocsPreviewsNZ.baseUiTooltipBasicExamplePreview(
      model.baseUiTooltipBasicExample,
      "base-ui-tooltip-basic-standalone"
    )
  );

export const tooltipBasicExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsNZ.tooltipBasicExamplePreview(
            model.tooltipBasicExample,
            "tooltip-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const tooltipNoDelayExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsNZ.tooltipNoDelayExamplePreview(
            model.tooltipNoDelayExample,
            "tooltip-no-delay-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiContextMenuNestedExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Base UI Context Menu Nested",
    "base-ui-context-menu-nested",
    DocsPreviewsCD.baseUiContextMenuNestedExamplePreview(
      model.baseUiContextMenuNestedExample,
      "base-ui-context-menu-nested-standalone"
    )
  );

export const dialogBasicExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsCD.dialogBasicExamplePreview(
            model.dialogBasicExample,
            "dialog-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiDialogBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Base UI Dialog Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable base-ui-dialog-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsCD.baseUiDialogBasicExamplePreview(
            model.baseUiDialogBasicExample,
            "base-ui-dialog-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiDialogCloseConfirmationExampleRouteView = (
  model: Model
): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Base UI Dialog Close Confirmation"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable base-ui-dialog-close-confirmation registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsCD.baseUiDialogCloseConfirmationExamplePreview(
            model.baseUiDialogCloseConfirmationExample,
            "base-ui-dialog-close-confirmation-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiDialogNestedExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Base UI Dialog Nested"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable base-ui-dialog-nested registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsCD.baseUiDialogNestedExamplePreview(
            model.baseUiDialogNestedExample,
            "base-ui-dialog-nested-standalone"
          ),
        ]
      ),
    ]
  );
};

export const dialogAnimatedExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsCD.dialogAnimatedExamplePreview(
            model.dialogAnimatedExample,
            "dialog-animated-standalone"
          ),
        ]
      ),
    ]
  );
};

export const dialogDestructiveExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsCD.dialogDestructiveExamplePreview(
            model.dialogDestructiveExample,
            "dialog-destructive-standalone"
          ),
        ]
      ),
    ]
  );
};

export const dialogFocusExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsCD.dialogFocusExamplePreview(
            model.dialogFocusExample,
            "dialog-focus-standalone"
          ),
        ]
      ),
    ]
  );
};

export const dialogScrollableExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsCD.dialogScrollableExamplePreview(
            model.dialogScrollableExample,
            "dialog-scrollable-standalone"
          ),
        ]
      ),
    ]
  );
};

export const disclosureBasicExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsCD.disclosureBasicExamplePreview(
            model.disclosureBasicExample,
            "disclosure-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const disclosureDisabledExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsCD.disclosureDisabledExamplePreview(
            model.disclosureDisabledExample,
            "disclosure-disabled-standalone"
          ),
        ]
      ),
    ]
  );
};

export const dragAndDropBasicExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsCD.dragAndDropBasicExamplePreview(
            model.dragAndDropBasicExample,
            "drag-and-drop-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const dragAndDropDisabledExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsCD.dragAndDropDisabledExamplePreview(
            model.dragAndDropDisabledExample,
            "drag-and-drop-disabled-standalone"
          ),
        ]
      ),
    ]
  );
};

export const listboxBasicExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsJM.listboxBasicExamplePreview(
            model.listboxBasicExample,
            "listbox-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const listboxAnimatedExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsJM.listboxAnimatedExamplePreview(
            model.listboxAnimatedExample,
            "listbox-animated-standalone"
          ),
        ]
      ),
    ]
  );
};

export const menuBasicExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsJM.menuBasicExamplePreview(
            model.menuBasicExample,
            "menu-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const menuAnimatedExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsJM.menuAnimatedExamplePreview(
            model.menuAnimatedExample,
            "menu-animated-standalone"
          ),
        ]
      ),
    ]
  );
};

export const popoverBasicExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsNZ.popoverBasicExamplePreview(
            model.popoverBasicExample,
            "popover-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiPopoverBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Base UI Popover Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable base-ui-popover-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsNZ.baseUiPopoverBasicExamplePreview(
            model.baseUiPopoverBasicExample,
            "base-ui-popover-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiPopoverMultipleTriggersExampleRouteView = (
  model: Model
): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Base UI Popover Multiple Triggers"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable base-ui-popover-multiple-triggers registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsNZ.baseUiPopoverMultipleTriggersExamplePreview(
            model.baseUiPopoverMultipleTriggersExample,
            "base-ui-popover-multiple-triggers-standalone"
          ),
        ]
      ),
    ]
  );
};

export const popoverAnimatedExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsNZ.popoverAnimatedExamplePreview(
            model.popoverAnimatedExample,
            "popover-animated-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiRadioBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Base UI Radio Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable base-ui-radio-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsNZ.baseUiRadioBasicExamplePreview(
            model.baseUiRadioBasicExample,
            "base-ui-radio-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiRadioLabelingExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Base UI Radio Labeling"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable base-ui-radio-labeling registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsNZ.baseUiRadioLabelingExamplePreview(
            model.baseUiRadioLabelingExample,
            "base-ui-radio-labeling-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiRadioNativeButtonExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Base UI Radio Native Button"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable base-ui-radio-native-button registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsNZ.baseUiRadioNativeButtonExamplePreview(
            model.baseUiRadioNativeButtonExample,
            "base-ui-radio-native-button-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiRadioFormExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Base UI Radio Form"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable base-ui-radio-form registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsNZ.baseUiRadioFormExamplePreview(
            model.baseUiRadioFormExample,
            "base-ui-radio-form-standalone"
          ),
        ]
      ),
    ]
  );
};

export const radioGroupBasicExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsNZ.radioGroupBasicExamplePreview(
            model.radioGroupBasicExample,
            "radio-group-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const radioGroupHorizontalExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsNZ.radioGroupHorizontalExamplePreview(
            model.radioGroupHorizontalExample,
            "radio-group-horizontal-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiSelectBasicExampleRouteView = (model: Model): Html =>
  standaloneExampleRouteView(
    "Base UI Select Basic",
    "base-ui-select-basic",
    DocsPreviewsNZ.baseUiSelectBasicExamplePreview(
      model.baseUiSelectBasicExample,
      "base-ui-select-basic-standalone"
    )
  );

export const selectBasicExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsNZ.selectBasicExamplePreview(
            model.selectBasicExample,
            "select-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const selectDisabledExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsNZ.selectDisabledExamplePreview(
            model.selectDisabledExample,
            "select-disabled-standalone"
          ),
        ]
      ),
    ]
  );
};

export const comboboxBasicExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsCD.comboboxBasicExamplePreview(
            model.comboboxBasicExample,
            "combobox-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const baseUiComboboxBasicExampleRouteView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-4xl space-y-6")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.h1(
            [h.Class("text-3xl font-bold text-gray-950")],
            ["Base UI Combobox Basic"]
          ),
          h.p(
            [h.Class("max-w-2xl text-base text-gray-600")],
            [
              "Standalone route for the installable base-ui-combobox-basic registry example.",
            ]
          ),
        ]
      ),
      h.div(
        [h.Class("rounded-lg border border-gray-200 bg-white p-4")],
        [
          DocsPreviewsCD.baseUiComboboxBasicExamplePreview(
            model.baseUiComboboxBasicExample,
            "base-ui-combobox-basic-standalone"
          ),
        ]
      ),
    ]
  );
};

export const comboboxMultiExampleRouteView = (model: Model): Html => {
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
          DocsPreviewsCD.comboboxMultiExamplePreview(
            model.comboboxMultiExample,
            "combobox-multi-standalone"
          ),
        ]
      ),
    ]
  );
};
