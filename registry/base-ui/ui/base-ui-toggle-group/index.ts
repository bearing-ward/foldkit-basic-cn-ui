import type { Html } from "foldkit/html";
import type { Option } from "effect";
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
  classes?: string | undefined;
  style?: ToggleGroupStyle | undefined;
}>;

export type ItemViewConfig<ParentMessage> = Readonly<{
  value: string;
  pressedValues: readonly string[];
  onPressedChange: ParentMessage;
  ariaLabel: string;
  children: readonly Html[];
  id?: string | undefined;
  tabIndex?: number | undefined;
  onKeyDown?: ((key: string) => Option.Option<ParentMessage>) | undefined;
  disabled?: boolean | undefined;
  classes?: string | undefined;
  style?: ToggleGroupStyle | undefined;
}>;

const cn = (base: string, classes?: string): string =>
  [base, classes]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

const isPressed = (pressedValues: readonly string[], value: string): boolean =>
  pressedValues.includes(value);

export const rootView = <ParentMessage>({
  children,
  ariaLabel,
  classes,
  style,
}: RootViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "group"),
      ...(ariaLabel === undefined ? [] : [h.AriaLabel(ariaLabel)]),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(toggleGroupRootClasses, classes)),
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
  id,
  tabIndex,
  onKeyDown,
  disabled = false,
  classes,
  style,
}: ItemViewConfig<ParentMessage>): Html =>
  Toggle.view<ParentMessage>({
    value,
    pressed: isPressed(pressedValues, value),
    onPressedChange,
    ariaLabel,
    id,
    tabIndex,
    onKeyDown,
    disabled,
    classes: cn(toggleGroupItemClasses, classes),
    style,
    children,
  });
