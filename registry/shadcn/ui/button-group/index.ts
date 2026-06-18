import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  buttonGroupClassName,
  buttonGroupClassNameByOrientation,
  buttonGroupItemClassName,
  buttonGroupSeparatorClassName,
  buttonGroupTextClassName,
} from "./view";
import type { ButtonGroupOrientation } from "./view";

export type { ButtonGroupOrientation };

export {
  buttonGroupClassName,
  buttonGroupClassNameByOrientation,
  buttonGroupItemClassName,
  buttonGroupSeparatorClassName,
  buttonGroupTextClassName,
} from "./view";

export type ViewConfig = Readonly<{
  children: readonly (Html | string)[];
  orientation?: ButtonGroupOrientation;
  ariaLabel?: string;
  className?: string;
}>;

export type ItemViewConfig = Readonly<{
  children: readonly (Html | string)[];
  className?: string;
}>;

export type SeparatorViewConfig = Readonly<{
  orientation?: ButtonGroupOrientation;
  className?: string;
}>;

export type TextViewConfig = Readonly<{
  children: readonly (Html | string)[];
  className?: string;
}>;

const classNames = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const view = <ParentMessage>({
  children,
  orientation = "horizontal",
  ariaLabel,
  className,
}: ViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "group"),
      h.DataAttribute("slot", "button-group"),
      h.DataAttribute("orientation", orientation),
      h.Class(
        classNames(
          `${buttonGroupClassName} ${buttonGroupClassNameByOrientation(orientation)}`,
          className
        )
      ),
      ...(ariaLabel === undefined ? [] : [h.AriaLabel(ariaLabel)]),
    ],
    children
  );
};

export const itemView = <ParentMessage>({
  children,
  className,
}: ItemViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "button-group-item"),
      h.Class(classNames(buttonGroupItemClassName, className)),
    ],
    children
  );
};

export const separatorView = <ParentMessage>({
  orientation = "horizontal",
  className,
}: SeparatorViewConfig = {}): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "separator"),
      h.AriaHidden(true),
      h.DataAttribute("slot", "button-group-separator"),
      h.DataAttribute("orientation", orientation),
      h.Class(classNames(buttonGroupSeparatorClassName, className)),
    ],
    []
  );
};

export const textView = <ParentMessage>({
  children,
  className,
}: TextViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.span(
    [
      h.DataAttribute("slot", "button-group-text"),
      h.Class(classNames(buttonGroupTextClassName, className)),
    ],
    children
  );
};
