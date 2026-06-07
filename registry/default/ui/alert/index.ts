import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  alertActionClassName,
  alertClassName,
  alertContentClassName,
  alertDescriptionClassName,
  alertIconClassName,
  alertTitleClassName,
  alertVariantClassName,
} from "./view";
import type { AlertVariant } from "./view";

export {
  alertActionClassName,
  alertClassName,
  alertContentClassName,
  alertDescriptionClassName,
  alertIconClassName,
  alertTitleClassName,
  alertVariantClassName,
};
export type { AlertVariant };

export type AlertStyle = Readonly<Record<string, string>>;

export type RootViewConfig = Readonly<{
  children: readonly Html[];
  variant?: AlertVariant | undefined;
  className?: string | undefined;
  style?: AlertStyle | undefined;
}>;

export type IconViewConfig = Readonly<{
  children: readonly (Html | string)[];
  className?: string | undefined;
  style?: AlertStyle | undefined;
}>;

export type TitleViewConfig = Readonly<{
  children: readonly (Html | string)[];
  className?: string | undefined;
  style?: AlertStyle | undefined;
}>;

export type DescriptionViewConfig = Readonly<{
  children: readonly (Html | string)[];
  variant?: AlertVariant | undefined;
  className?: string | undefined;
  style?: AlertStyle | undefined;
}>;

export type ContentViewConfig = Readonly<{
  children: readonly Html[];
  className?: string | undefined;
  style?: AlertStyle | undefined;
}>;

export type ActionViewConfig = Readonly<{
  children: readonly Html[];
  className?: string | undefined;
  style?: AlertStyle | undefined;
}>;

const classNames = (...values: readonly (string | undefined)[]): string =>
  values
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const rootView = <ParentMessage>({
  children,
  variant = "Default",
  className,
  style,
}: RootViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "alert"),
      h.DataAttribute("variant", variant),
      h.Class(
        classNames(alertClassName, alertVariantClassName(variant), className)
      ),
      h.Style(style ?? {}),
    ],
    children
  );
};

export const iconView = <ParentMessage>({
  children,
  className,
  style,
}: IconViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.span(
    [
      h.Attribute("aria-hidden", "true"),
      h.Class(classNames(alertIconClassName, className)),
      h.Style(style ?? {}),
    ],
    children
  );
};

export const contentView = <ParentMessage>({
  children,
  className,
  style,
}: ContentViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Class(classNames(alertContentClassName, className)),
      h.Style(style ?? {}),
    ],
    children
  );
};

export const titleView = <ParentMessage>({
  children,
  className,
  style,
}: TitleViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.h3(
    [h.Class(classNames(alertTitleClassName, className)), h.Style(style ?? {})],
    children
  );
};

export const descriptionView = <ParentMessage>({
  children,
  variant = "Default",
  className,
  style,
}: DescriptionViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("variant", variant),
      h.Class(classNames(alertDescriptionClassName, className)),
      h.Style(style ?? {}),
    ],
    children
  );
};

export const actionView = <ParentMessage>({
  children,
  className,
  style,
}: ActionViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Class(classNames(alertActionClassName, className)),
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
}: Readonly<{
  title: string;
  description: string;
  icon?: string | undefined;
  action?: Html | undefined;
  variant?: AlertVariant | undefined;
}>): Html =>
  rootView<ParentMessage>({
    variant,
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
