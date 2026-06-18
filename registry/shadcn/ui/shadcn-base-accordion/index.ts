import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  accordionHeaderClassName,
  accordionIconClassName,
  accordionItemClassName,
  accordionPanelClassName,
  accordionRootClassName,
  accordionTriggerClassName,
} from "./view";

export {
  accordionHeaderClassName,
  accordionIconClassName,
  accordionItemClassName,
  accordionPanelClassName,
  accordionRootClassName,
  accordionTriggerClassName,
} from "./view";

export type AccordionStyle = Readonly<Record<string, string>>;

export type RootViewConfig = Readonly<{
  children: readonly Html[];
  openValues: readonly string[];
  className?: string | undefined;
  style?: AccordionStyle | undefined;
}>;

export type ItemViewConfig<ParentMessage> = Readonly<{
  value: string;
  openValues: readonly string[];
  onValueChange: ParentMessage;
  title: string;
  children: readonly Html[];
  disabled?: boolean | undefined;
  className?: string | undefined;
  style?: AccordionStyle | undefined;
  triggerClassName?: string | undefined;
  panelClassName?: string | undefined;
}>;

const classNames = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const includesValue = <Value extends string>(
  openValues: readonly Value[],
  value: Value
): boolean => openValues.includes(value);

export const toggleValue = <Value extends string>(
  openValues: readonly Value[],
  value: Value
): readonly Value[] =>
  includesValue(openValues, value)
    ? openValues.filter((openValue) => openValue !== value)
    : [...openValues, value];

const stateAttributes = <ParentMessage>(
  h: ReturnType<typeof html<ParentMessage>>,
  open: boolean,
  disabled: boolean
) => [
  ...(open ? [h.DataAttribute("open", "")] : [h.DataAttribute("closed", "")]),
  ...(disabled ? [h.DataAttribute("disabled", "")] : []),
];

export const rootView = <ParentMessage>({
  children,
  openValues,
  className,
  style,
}: RootViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("values", openValues.join(" ")),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(accordionRootClassName, className)),
    ],
    children
  );
};

export const itemView = <ParentMessage>({
  value,
  openValues,
  onValueChange,
  title,
  children,
  disabled = false,
  className,
  style,
  triggerClassName,
  panelClassName,
}: ItemViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();
  const open = includesValue(openValues, value);
  const triggerId = `${value}-trigger`;
  const panelId = `${value}-panel`;
  const state = stateAttributes(h, open, disabled);

  return h.div(
    [
      h.DataAttribute("value", value),
      ...state,
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(accordionItemClassName, className)),
    ],
    [
      h.h3(
        [h.Class(accordionHeaderClassName)],
        [
          h.button(
            [
              h.Id(triggerId),
              h.Type("button"),
              h.AriaLabel(title),
              h.Attribute("aria-expanded", open ? "true" : "false"),
              h.Attribute("aria-controls", panelId),
              ...state,
              ...(disabled ? [h.Disabled(true)] : [h.OnClick(onValueChange)]),
              h.Class(classNames(accordionTriggerClassName, triggerClassName)),
            ],
            [
              h.span([], [title]),
              h.span(
                [h.AriaHidden(true), h.Class(accordionIconClassName)],
                ["+"]
              ),
            ]
          ),
        ]
      ),
      open
        ? h.div(
            [
              h.Id(panelId),
              h.Attribute("role", "region"),
              h.Attribute("aria-labelledby", triggerId),
              ...state,
              h.Class(classNames(accordionPanelClassName, panelClassName)),
            ],
            children
          )
        : h.empty,
    ]
  );
};
