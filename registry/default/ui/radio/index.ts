import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  radioCaptionClassName,
  radioGroupClassName,
  radioIndicatorClassName,
  radioItemClassName,
  radioRootClassName,
} from "./view";

export {
  radioCaptionClassName,
  radioGroupClassName,
  radioIndicatorClassName,
  radioItemClassName,
  radioRootClassName,
} from "./view";

export type RadioStyle = Readonly<Record<string, string>>;

export type GroupViewConfig = Readonly<{
  label: string;
  labelId: string;
  children: readonly Html[];
  name?: string | undefined;
  disabled?: boolean | undefined;
  required?: boolean | undefined;
  className?: string | undefined;
  style?: RadioStyle | undefined;
}>;

export type ItemViewConfig<ParentMessage> = Readonly<{
  value: string;
  selectedValue: string;
  onValueChange: ParentMessage;
  label: string;
  disabled?: boolean | undefined;
  required?: boolean | undefined;
  className?: string | undefined;
  style?: RadioStyle | undefined;
}>;

const classNames = (base: string, className?: string): string =>
  [base, className]
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
  className,
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
      h.Class(classNames(radioGroupClassName, className)),
    ],
    [
      h.div([h.Id(labelId), h.Class(radioCaptionClassName)], [label]),
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
  className,
  style,
}: ItemViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();
  const checked = selectedValue === value;

  return h.label(
    [
      ...stateAttributes(h, checked, disabled, required),
      ...(disabled ? [] : [h.OnClick(onValueChange)]),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(radioItemClassName, className)),
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
          h.Class(radioRootClassName),
        ],
        [
          h.span(
            [
              ...stateAttributes(h, checked, disabled, required),
              h.Class(radioIndicatorClassName),
            ],
            []
          ),
        ]
      ),
      h.span(disabled ? [] : [h.OnClick(onValueChange)], [label]),
    ]
  );
};
