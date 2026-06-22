import type { Option } from "effect";
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
  id?: string | undefined;
  tabIndex?: number | undefined;
  onKeyDown?: ((key: string) => Option.Option<ParentMessage>) | undefined;
  disabled?: boolean | undefined;
  classes?: string | undefined;
  style?: ToggleStyle | undefined;
}>;

const cn = (base: string, classes?: string): string =>
  [base, classes]
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
  id,
  tabIndex,
  onKeyDown,
  disabled = false,
  classes,
  style,
}: ViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      ...(id === undefined ? [] : [h.Id(id)]),
      h.AriaLabel(ariaLabel),
      ...pressedAttributes(h, pressed),
      ...(value === undefined ? [] : [h.Value(value)]),
      ...(tabIndex === undefined
        ? []
        : [h.Attribute("tabindex", String(tabIndex))]),
      ...(onKeyDown === undefined
        ? []
        : [h.OnKeyDownPreventDefault((key) => onKeyDown(key))]),
      ...(disabled ? [h.Disabled(true)] : [h.OnClick(onPressedChange)]),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(toggleRootClasses, classes)),
    ],
    children
  );
};
