import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  buttonGroupClasses,
  buttonGroupClassesByOrientation,
  buttonGroupItemClasses,
  buttonGroupSeparatorClasses,
  buttonGroupTextClasses,
} from "./view";
import type { ButtonGroupOrientation } from "./view";

export type { ButtonGroupOrientation };

export {
  buttonGroupClasses,
  buttonGroupClassesByOrientation,
  buttonGroupItemClasses,
  buttonGroupSeparatorClasses,
  buttonGroupTextClasses,
} from "./view";

export type ViewConfig = Readonly<{
  children: readonly (Html | string)[];
  orientation?: ButtonGroupOrientation;
  ariaLabel?: string;
  classes?: string;
}>;

export type ItemViewConfig = Readonly<{
  children: readonly (Html | string)[];
  classes?: string;
}>;

export type SeparatorViewConfig = Readonly<{
  orientation?: ButtonGroupOrientation;
  classes?: string;
}>;

export type TextViewConfig = Readonly<{
  children: readonly (Html | string)[];
  classes?: string;
}>;

const cn = (base: string, classes?: string): string =>
  [base, classes]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const view = <ParentMessage>({
  children,
  orientation = "horizontal",
  ariaLabel,
  classes,
}: ViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "group"),
      h.DataAttribute("slot", "button-group"),
      h.DataAttribute("orientation", orientation),
      h.Class(
        cn(
          `${buttonGroupClasses} ${buttonGroupClassesByOrientation(orientation)}`,
          classes
        )
      ),
      ...(ariaLabel === undefined ? [] : [h.AriaLabel(ariaLabel)]),
    ],
    children
  );
};

export const itemView = <ParentMessage>({
  children,
  classes,
}: ItemViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "button-group-item"),
      h.Class(cn(buttonGroupItemClasses, classes)),
    ],
    children
  );
};

export const separatorView = <ParentMessage>({
  orientation = "horizontal",
  classes,
}: SeparatorViewConfig = {}): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "separator"),
      h.AriaHidden(true),
      h.DataAttribute("slot", "button-group-separator"),
      h.DataAttribute("orientation", orientation),
      h.Class(cn(buttonGroupSeparatorClasses, classes)),
    ],
    []
  );
};

export const textView = <ParentMessage>({
  children,
  classes,
}: TextViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.span(
    [
      h.DataAttribute("slot", "button-group-text"),
      h.Class(cn(buttonGroupTextClasses, classes)),
    ],
    children
  );
};
