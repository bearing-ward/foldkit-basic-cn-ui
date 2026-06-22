import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  alertActionClasses,
  alertClasses,
  alertContentClasses,
  alertCustomColorClasses,
  alertDescriptionClasses,
  alertIconClasses,
  alertTitleClasses,
  alertVariantClasses,
} from "./view";
import type { AlertVariant } from "./view";

export {
  alertActionClasses,
  alertClasses,
  alertContentClasses,
  alertCustomColorClasses,
  alertDescriptionClasses,
  alertIconClasses,
  alertTitleClasses,
  alertVariantClasses,
};
export type { AlertVariant };

export type AlertStyle = Readonly<Record<string, string>>;

export type RootViewConfig = Readonly<{
  children: readonly Html[];
  variant?: AlertVariant | undefined;
  classes?: string | undefined;
  style?: AlertStyle | undefined;
}>;

export type IconViewConfig = Readonly<{
  children: readonly (Html | string)[];
  classes?: string | undefined;
  style?: AlertStyle | undefined;
}>;

export type TitleViewConfig = Readonly<{
  children: readonly (Html | string)[];
  classes?: string | undefined;
  style?: AlertStyle | undefined;
}>;

export type DescriptionViewConfig = Readonly<{
  children: readonly (Html | string)[];
  variant?: AlertVariant | undefined;
  classes?: string | undefined;
  style?: AlertStyle | undefined;
}>;

export type ContentViewConfig = Readonly<{
  children: readonly Html[];
  classes?: string | undefined;
  style?: AlertStyle | undefined;
}>;

export type ActionViewConfig = Readonly<{
  children: readonly Html[];
  classes?: string | undefined;
  style?: AlertStyle | undefined;
}>;

const cn = (...values: readonly (string | undefined)[]): string =>
  values
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const rootView = <ParentMessage>({
  children,
  variant = "Default",
  classes,
  style,
}: RootViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "alert"),
      h.DataAttribute("variant", variant),
      h.Class(
        cn(alertClasses, alertVariantClasses(variant), classes)
      ),
      h.Style(style ?? {}),
    ],
    children
  );
};

export const iconView = <ParentMessage>({
  children,
  classes,
  style,
}: IconViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.span(
    [
      h.Attribute("aria-hidden", "true"),
      h.Class(cn(alertIconClasses, classes)),
      h.Style(style ?? {}),
    ],
    children
  );
};

export const contentView = <ParentMessage>({
  children,
  classes,
  style,
}: ContentViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Class(cn(alertContentClasses, classes)),
      h.Style(style ?? {}),
    ],
    children
  );
};

export const titleView = <ParentMessage>({
  children,
  classes,
  style,
}: TitleViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.h3(
    [h.Class(cn(alertTitleClasses, classes)), h.Style(style ?? {})],
    children
  );
};

export const descriptionView = <ParentMessage>({
  children,
  variant = "Default",
  classes,
  style,
}: DescriptionViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("variant", variant),
      h.Class(cn(alertDescriptionClasses, classes)),
      h.Style(style ?? {}),
    ],
    children
  );
};

export const actionView = <ParentMessage>({
  children,
  classes,
  style,
}: ActionViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Class(cn(alertActionClasses, classes)),
      h.Style(style ?? {}),
    ],
    children
  );
};

export const view = <ParentMessage>({
  title,
  description,
  icon,
  action,
  variant = "Default",
  classes,
}: Readonly<{
  title: string;
  description: string;
  icon?: string | undefined;
  action?: Html | undefined;
  variant?: AlertVariant | undefined;
  classes?: string | undefined;
}>): Html =>
  rootView<ParentMessage>({
    variant,
    classes,
    children: [
      iconView<ParentMessage>({ children: [icon ?? "i"] }),
      contentView<ParentMessage>({
        children: [
          titleView<ParentMessage>({ children: [title] }),
          descriptionView<ParentMessage>({ children: [description], variant }),
          ...(action === undefined
            ? []
            : [actionView<ParentMessage>({ children: [action] })]),
        ],
      }),
    ],
  });
