import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  checkboxGroupCaptionClassName,
  checkboxGroupControlClassName,
  checkboxGroupIndicatorClassName,
  checkboxGroupItemClassName,
  checkboxGroupItemsClassName,
  checkboxGroupRootClassName,
} from "./view";

export {
  checkboxGroupCaptionClassName,
  checkboxGroupControlClassName,
  checkboxGroupIndicatorClassName,
  checkboxGroupItemClassName,
  checkboxGroupItemsClassName,
  checkboxGroupRootClassName,
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
  className?: string | undefined;
  style?: CheckboxGroupStyle | undefined;
}>;

export type ItemViewConfig<ParentMessage> = Readonly<{
  value: string;
  selectedValues: readonly string[];
  onValueChange: ParentMessage;
  label: string;
  disabled?: boolean | undefined;
  required?: boolean | undefined;
  className?: string | undefined;
  style?: CheckboxGroupStyle | undefined;
}>;

export type ParentItemViewConfig<ParentMessage> = Readonly<{
  selectedValues: readonly string[];
  allValues: readonly string[];
  onValueChange: ParentMessage;
  label: string;
  disabled?: boolean | undefined;
  className?: string | undefined;
  style?: CheckboxGroupStyle | undefined;
}>;

const classNames = (base: string, className?: string): string =>
  [base, className]
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
  className,
  style,
}: Readonly<{
  label: string;
  checked: boolean;
  indeterminate: boolean;
  onValueChange: ParentMessage;
  disabled: boolean;
  required: boolean;
  className?: string | undefined;
  style?: CheckboxGroupStyle | undefined;
}>): Html => {
  const h = html<ParentMessage>();
  const state = stateAttributes(h, checked, indeterminate, disabled, required);

  return h.label(
    [
      ...state,
      ...(disabled ? [] : [h.OnClick(onValueChange)]),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(checkboxGroupItemClassName, className)),
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
          h.Class(checkboxGroupControlClassName),
        ],
        [
          h.span(
            [...state, h.Class(checkboxGroupIndicatorClassName)],
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
  className,
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
      h.Class(classNames(checkboxGroupRootClassName, className)),
    ],
    [
      h.div([h.Id(labelId), h.Class(checkboxGroupCaptionClassName)], [label]),
      h.div([h.Class(checkboxGroupItemsClassName)], children),
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
  className,
  style,
}: ItemViewConfig<ParentMessage>): Html =>
  itemMarkup({
    label,
    checked: includesValue(selectedValues, value),
    indeterminate: false,
    onValueChange,
    disabled,
    required,
    className,
    style,
  });

export const parentItemView = <ParentMessage>({
  selectedValues,
  allValues,
  onValueChange,
  label,
  disabled = false,
  className,
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
    className,
    style,
  });
};
