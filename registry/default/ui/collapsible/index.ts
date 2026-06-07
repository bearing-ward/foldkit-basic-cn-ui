import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  collapsibleContentClassName,
  collapsibleIconClassName,
  collapsiblePanelClassName,
  collapsibleRootClassName,
  collapsibleTriggerClassName,
} from "./view";

export {
  collapsibleContentClassName,
  collapsibleIconClassName,
  collapsiblePanelClassName,
  collapsibleRootClassName,
  collapsibleTriggerClassName,
} from "./view";

export type CollapsibleStyle = Readonly<Record<string, string>>;

export type RootViewConfig = Readonly<{
  /** Whether the panel is currently open. */
  open: boolean;
  /** Trigger and panel children. */
  children: readonly Html[];
  /** Whether the component should ignore trigger interaction. */
  disabled?: boolean | undefined;
  /** Additional class names appended to the default root classes. */
  className?: string | undefined;
  /** Inline styles applied to the root element. */
  style?: CollapsibleStyle | undefined;
}>;

export type TriggerViewConfig<ParentMessage> = Readonly<{
  /** Whether the panel is currently open. */
  open: boolean;
  /** Message sent when the trigger is clicked. */
  onOpenChange: ParentMessage;
  /** Visible trigger content. */
  children: readonly Html[];
  /** Accessible trigger label. Defaults to visible text when omitted. */
  ariaLabel?: string | undefined;
  /** Panel id referenced by aria-controls. */
  panelId?: string | undefined;
  /** Whether the component should ignore trigger interaction. */
  disabled?: boolean | undefined;
  /** Additional class names appended to the default trigger classes. */
  className?: string | undefined;
  /** Inline styles applied to the trigger element. */
  style?: CollapsibleStyle | undefined;
}>;

export type PanelViewConfig = Readonly<{
  /** Whether the panel is currently open. */
  open: boolean;
  /** Panel content. */
  children: readonly Html[];
  /** Panel id referenced by the trigger. */
  id?: string | undefined;
  /** Keep the panel in the DOM while closed using hidden state. */
  keepMounted?: boolean | undefined;
  /** Preserve find-in-page behavior with hidden=until-found while closed. */
  hiddenUntilFound?: boolean | undefined;
  /** Additional class names appended to the default panel classes. */
  className?: string | undefined;
  /** Inline styles applied to the panel element. */
  style?: CollapsibleStyle | undefined;
}>;

const classNames = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

const openAttributes = <ParentMessage>(
  h: ReturnType<typeof html<ParentMessage>>,
  open: boolean
) => (open ? [h.DataAttribute("open", "")] : [h.DataAttribute("closed", "")]);

const disabledAttributes = <ParentMessage>(
  h: ReturnType<typeof html<ParentMessage>>,
  disabled: boolean
) => (disabled ? [h.DataAttribute("disabled", "")] : []);

export const rootView = <ParentMessage>({
  open,
  children,
  disabled = false,
  className,
  style,
}: RootViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...openAttributes(h, open),
      ...disabledAttributes(h, disabled),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(collapsibleRootClassName, className)),
    ],
    children
  );
};

export const triggerView = <ParentMessage>({
  open,
  onOpenChange,
  children,
  ariaLabel,
  panelId,
  disabled = false,
  className,
  style,
}: TriggerViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      ...(ariaLabel === undefined ? [] : [h.AriaLabel(ariaLabel)]),
      ...(panelId === undefined ? [] : [h.AriaControls(panelId)]),
      h.AriaExpanded(open),
      ...(open ? [h.DataAttribute("panel-open", "")] : []),
      ...disabledAttributes(h, disabled),
      ...(disabled ? [h.Disabled(true)] : [h.OnClick(onOpenChange)]),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(collapsibleTriggerClassName, className)),
    ],
    [
      ...children,
      h.span([h.AriaHidden(true), h.Class(collapsibleIconClassName)], [">"]),
    ]
  );
};

export const panelView = <ParentMessage>({
  open,
  children,
  id,
  keepMounted = false,
  hiddenUntilFound = false,
  className,
  style,
}: PanelViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...(id === undefined ? [] : [h.Id(id)]),
      ...openAttributes(h, open),
      ...(!open && hiddenUntilFound
        ? [h.Attribute("hidden", "until-found")]
        : []),
      ...(!open && keepMounted && !hiddenUntilFound
        ? [h.Attribute("hidden", "")]
        : []),
      h.Style({
        "--collapsible-panel-height": "auto",
        "--collapsible-panel-width": "auto",
        ...style,
      }),
      h.Class(classNames(collapsiblePanelClassName, className)),
    ],
    open || keepMounted || hiddenUntilFound ? children : []
  );
};

export const contentView = <ParentMessage>(
  children: readonly Html[],
  className?: string
): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [h.Class(classNames(collapsibleContentClassName, className))],
    [...children]
  );
};
