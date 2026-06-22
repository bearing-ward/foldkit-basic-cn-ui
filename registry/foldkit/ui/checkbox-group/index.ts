import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  checkboxGroupCaptionClasses,
  checkboxGroupControlClasses,
  checkboxGroupIndicatorClasses,
  checkboxGroupItemClasses,
  checkboxGroupItemsClasses,
  checkboxGroupRootClasses,
} from "./view";

export {
  checkboxGroupCaptionClasses,
  checkboxGroupControlClasses,
  checkboxGroupIndicatorClasses,
  checkboxGroupItemClasses,
  checkboxGroupItemsClasses,
  checkboxGroupRootClasses,
} from "./view";

export type CheckboxGroupStyle = Readonly<Record<string, string>>;

export type ParentState = "checked" | "indeterminate" | "unchecked";

export type GroupViewConfig = Readonly<{
  label: string;
  labelId: string;
  children: readonly Html[];
  name?: string | undefined;
  disabled?: boolean | undefined;
  required?: boolean | undefined;
  classes?: string | undefined;
  style?: CheckboxGroupStyle | undefined;
}>;

export type ItemViewConfig<ParentMessage> = Readonly<{
  value: string;
  selectedValues: readonly string[];
  onValueChange: ParentMessage;
  label: string;
  disabled?: boolean | undefined;
  required?: boolean | undefined;
  classes?: string | undefined;
  style?: CheckboxGroupStyle | undefined;
}>;

export type ParentItemViewConfig<ParentMessage> = Readonly<{
  selectedValues: readonly string[];
  allValues: readonly string[];
  onValueChange: ParentMessage;
  label: string;
  disabled?: boolean | undefined;
  classes?: string | undefined;
  style?: CheckboxGroupStyle | undefined;
}>;

const cn = (base: string, classes?: string): string =>
  [base, classes]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const includesValue = <Value extends string>(
  selectedValues: readonly Value[],
  value: Value
): boolean => selectedValues.includes(value);

export const toggleValue = <Value extends string>(
  selectedValues: readonly Value[],
  value: Value
): readonly Value[] =>
  includesValue(selectedValues, value)
    ? selectedValues.filter((selectedValue) => selectedValue !== value)
    : [...selectedValues, value];

export const parentState = (
  selectedValues: readonly string[],
  allValues: readonly string[]
): ParentState => {
  const selectedCount = allValues.filter((value) =>
    selectedValues.includes(value)
  ).length;

  if (selectedCount === 0) {
    return "unchecked";
  }

  if (selectedCount === allValues.length) {
    return "checked";
  }

  return "indeterminate";
};

const stateAttributes = <ParentMessage>(
  h: ReturnType<typeof html<ParentMessage>>,
  checked: boolean,
  indeterminate: boolean,
  disabled: boolean,
  required: boolean
) => [
  ...(checked
    ? [h.DataAttribute("checked", "")]
    : [h.DataAttribute("unchecked", "")]),
  ...(indeterminate ? [h.DataAttribute("indeterminate", "")] : []),
  ...(disabled ? [h.DataAttribute("disabled", "")] : []),
  ...(required ? [h.DataAttribute("required", "")] : []),
];

const itemMarkup = <ParentMessage>({
  label,
  checked,
  indeterminate,
  onValueChange,
  disabled,
  required,
  classes,
  style,
}: Readonly<{
  label: string;
  checked: boolean;
  indeterminate: boolean;
  onValueChange: ParentMessage;
  disabled: boolean;
  required: boolean;
  classes?: string | undefined;
  style?: CheckboxGroupStyle | undefined;
}>): Html => {
  const h = html<ParentMessage>();
  const state = stateAttributes(h, checked, indeterminate, disabled, required);

  return h.label(
    [
      ...state,
      ...(disabled ? [] : [h.OnClick(onValueChange)]),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(checkboxGroupItemClasses, classes)),
    ],
    [
      h.span(
        [
          h.Attribute("role", "checkbox"),
          h.AriaLabel(label),
          h.Attribute(
            "aria-checked",
            indeterminate ? "mixed" : checked ? "true" : "false"
          ),
          ...(disabled ? [h.Attribute("aria-disabled", "true")] : []),
          ...(required ? [h.Attribute("aria-required", "true")] : []),
          ...state,
          h.Class(checkboxGroupControlClasses),
        ],
        [
          h.span(
            [...state, h.Class(checkboxGroupIndicatorClasses)],
            [indeterminate ? "—" : checked ? "✓" : ""]
          ),
        ]
      ),
      h.span([], [label]),
    ]
  );
};

export const groupView = <ParentMessage>({
  label,
  labelId,
  children,
  name,
  disabled = false,
  required = false,
  classes,
  style,
}: GroupViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "group"),
      h.Attribute("aria-labelledby", labelId),
      ...(name === undefined ? [] : [h.DataAttribute("name", name)]),
      ...(disabled ? [h.DataAttribute("disabled", "")] : []),
      ...(required ? [h.Attribute("aria-required", "true")] : []),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(checkboxGroupRootClasses, classes)),
    ],
    [
      h.div([h.Id(labelId), h.Class(checkboxGroupCaptionClasses)], [label]),
      h.div([h.Class(checkboxGroupItemsClasses)], children),
    ]
  );
};

export const itemView = <ParentMessage>({
  value,
  selectedValues,
  onValueChange,
  label,
  disabled = false,
  required = false,
  classes,
  style,
}: ItemViewConfig<ParentMessage>): Html =>
  itemMarkup({
    label,
    checked: includesValue(selectedValues, value),
    indeterminate: false,
    onValueChange,
    disabled,
    required,
    classes,
    style,
  });

export const parentItemView = <ParentMessage>({
  selectedValues,
  allValues,
  onValueChange,
  label,
  disabled = false,
  classes,
  style,
}: ParentItemViewConfig<ParentMessage>): Html => {
  const state = parentState(selectedValues, allValues);

  return itemMarkup({
    label,
    checked: state === "checked",
    indeterminate: state === "indeterminate",
    onValueChange,
    disabled,
    required: false,
    classes,
    style,
  });
};
