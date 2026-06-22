import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import { toggleRootClasses } from "./view";

export { toggleIconClasses, toggleRootClasses } from "./view";

export type ToggleStyle = Readonly<Record<string, string>>;

export type ViewConfig<ParentMessage> = Readonly<{
  pressed: boolean;
  onPressedChange: ParentMessage;
  ariaLabel: string;
  children: readonly Html[];
  value?: string | undefined;
  disabled?: boolean | undefined;
  className?: string | undefined;
  style?: ToggleStyle | undefined;
}>;

const cn = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

const pressedAttributes = <ParentMessage>(
  h: ReturnType<typeof html<ParentMessage>>,
  pressed: boolean
) => [
  h.Attribute("aria-pressed", pressed ? "true" : "false"),
  ...(pressed ? [h.DataAttribute("pressed", "")] : []),
];

export const view = <ParentMessage>({
  pressed,
  onPressedChange,
  ariaLabel,
  children,
  value,
  disabled = false,
  className,
  style,
}: ViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      h.AriaLabel(ariaLabel),
      ...pressedAttributes(h, pressed),
      ...(value === undefined ? [] : [h.Value(value)]),
      ...(disabled ? [h.Disabled(true)] : [h.OnClick(onPressedChange)]),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(toggleRootClasses, className)),
    ],
    children
  );
};
