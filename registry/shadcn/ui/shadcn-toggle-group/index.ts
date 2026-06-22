import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as Toggle from "../../../foldkit/ui/toggle";
import { toggleGroupItemClasses, toggleGroupRootClasses } from "./view";

export {
  toggleGroupIconClasses,
  toggleGroupItemClasses,
  toggleGroupRootClasses,
} from "./view";

export type ToggleGroupStyle = Readonly<Record<string, string>>;

export type RootViewConfig = Readonly<{
  children: readonly Html[];
  ariaLabel?: string | undefined;
  className?: string | undefined;
  style?: ToggleGroupStyle | undefined;
}>;

export type ItemViewConfig<ParentMessage> = Readonly<{
  value: string;
  pressedValues: readonly string[];
  onPressedChange: ParentMessage;
  ariaLabel: string;
  children: readonly Html[];
  disabled?: boolean | undefined;
  className?: string | undefined;
  style?: ToggleGroupStyle | undefined;
}>;

const cn = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

const isPressed = (pressedValues: readonly string[], value: string): boolean =>
  pressedValues.includes(value);

export const rootView = <ParentMessage>({
  children,
  ariaLabel,
  className,
  style,
}: RootViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "group"),
      ...(ariaLabel === undefined ? [] : [h.AriaLabel(ariaLabel)]),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(toggleGroupRootClasses, className)),
    ],
    children
  );
};

export const itemView = <ParentMessage>({
  value,
  pressedValues,
  onPressedChange,
  ariaLabel,
  children,
  disabled = false,
  className,
  style,
}: ItemViewConfig<ParentMessage>): Html =>
  Toggle.view<ParentMessage>({
    value,
    pressed: isPressed(pressedValues, value),
    onPressedChange,
    ariaLabel,
    disabled,
    // NOTE: The public wrapper API is className; Foldkit Toggle still accepts classes.
    classes: cn(toggleGroupItemClasses, className),
    style,
    children,
  });
