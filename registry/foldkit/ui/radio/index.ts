import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  radioCaptionClasses,
  radioGroupClasses,
  radioIndicatorClasses,
  radioItemClasses,
  radioRootClasses,
} from "./view";

export {
  radioCaptionClasses,
  radioGroupClasses,
  radioIndicatorClasses,
  radioItemClasses,
  radioRootClasses,
} from "./view";

export type RadioStyle = Readonly<Record<string, string>>;

export type GroupViewConfig = Readonly<{
  label: string;
  labelId: string;
  children: readonly Html[];
  name?: string | undefined;
  disabled?: boolean | undefined;
  required?: boolean | undefined;
  classes?: string | undefined;
  style?: RadioStyle | undefined;
}>;

export type ItemViewConfig<ParentMessage> = Readonly<{
  value: string;
  selectedValue: string;
  onValueChange: ParentMessage;
  label: string;
  disabled?: boolean | undefined;
  required?: boolean | undefined;
  classes?: string | undefined;
  style?: RadioStyle | undefined;
}>;

const cn = (base: string, classes?: string): string =>
  [base, classes]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

const stateAttributes = <ParentMessage>(
  h: ReturnType<typeof html<ParentMessage>>,
  checked: boolean,
  disabled: boolean,
  required: boolean
) => [
  ...(checked
    ? [h.DataAttribute("checked", "")]
    : [h.DataAttribute("unchecked", "")]),
  ...(disabled ? [h.DataAttribute("disabled", "")] : []),
  ...(required ? [h.DataAttribute("required", "")] : []),
];

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
      h.Attribute("role", "radiogroup"),
      h.Attribute("aria-labelledby", labelId),
      ...(name === undefined ? [] : [h.DataAttribute("name", name)]),
      ...(disabled ? [h.DataAttribute("disabled", "")] : []),
      ...(required ? [h.Attribute("aria-required", "true")] : []),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(radioGroupClasses, classes)),
    ],
    [
      h.div([h.Id(labelId), h.Class(radioCaptionClasses)], [label]),
      ...children,
    ]
  );
};

export const itemView = <ParentMessage>({
  value,
  selectedValue,
  onValueChange,
  label,
  disabled = false,
  required = false,
  classes,
  style,
}: ItemViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();
  const checked = selectedValue === value;

  return h.label(
    [
      ...stateAttributes(h, checked, disabled, required),
      ...(disabled ? [] : [h.OnClick(onValueChange)]),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(radioItemClasses, classes)),
    ],
    [
      h.span(
        [
          h.Attribute("role", "radio"),
          h.AriaLabel(label),
          h.Attribute("aria-checked", checked ? "true" : "false"),
          ...(disabled ? [h.Attribute("aria-disabled", "true")] : []),
          ...(required ? [h.Attribute("aria-required", "true")] : []),
          ...stateAttributes(h, checked, disabled, required),
          ...(disabled ? [] : [h.OnClick(onValueChange)]),
          h.Class(radioRootClasses),
        ],
        [
          h.span(
            [
              ...stateAttributes(h, checked, disabled, required),
              h.Class(radioIndicatorClasses),
            ],
            []
          ),
        ]
      ),
      h.span(disabled ? [] : [h.OnClick(onValueChange)], [label]),
    ]
  );
};
