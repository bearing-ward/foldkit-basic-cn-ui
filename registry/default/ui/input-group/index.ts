import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  inputGroupAddonClassNameByAlign,
  inputGroupClassName,
  inputGroupControlClassName,
  inputGroupTextClassName,
} from "./view";
import type { InputGroupAddonAlign } from "./view";

export type { InputGroupAddonAlign };

export {
  inputGroupAddonClassNameByAlign,
  inputGroupClassName,
  inputGroupControlClassName,
  inputGroupTextClassName,
} from "./view";

export type ViewConfig = Readonly<{
  children: readonly (Html | string)[];
  className?: string;
}>;

export type AddonViewConfig = Readonly<{
  children: readonly (Html | string)[];
  align?: InputGroupAddonAlign;
  className?: string;
}>;

export type InputViewConfig = Readonly<{
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
}>;

const classNames = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const view = <ParentMessage>({
  children,
  className,
}: ViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "group"),
      h.DataAttribute("slot", "input-group"),
      h.Class(classNames(inputGroupClassName, className)),
    ],
    children
  );
};

export const addonView = <ParentMessage>({
  children,
  align = "InlineStart",
  className,
}: AddonViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "group"),
      h.DataAttribute("slot", "input-group-addon"),
      h.DataAttribute("align", align),
      h.Class(classNames(inputGroupAddonClassNameByAlign(align), className)),
    ],
    children
  );
};

export const inputView = <ParentMessage>({
  placeholder,
  ariaLabel,
  className,
}: InputViewConfig = {}): Html => {
  const h = html<ParentMessage>();

  return h.input([
    h.DataAttribute("slot", "input-group-control"),
    h.Class(classNames(inputGroupControlClassName, className)),
    ...(placeholder === undefined ? [] : [h.Placeholder(placeholder)]),
    ...(ariaLabel === undefined ? [] : [h.AriaLabel(ariaLabel)]),
  ]);
};

export const textView = <ParentMessage>(
  children: readonly (Html | string)[],
  className?: string
): Html => {
  const h = html<ParentMessage>();

  return h.span(
    [h.Class(classNames(inputGroupTextClassName, className))],
    children
  );
};
