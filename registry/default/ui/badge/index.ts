import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import { badgeClassNameByVariant } from "./view";
import type { BadgeVariant } from "./view";

export type { BadgeVariant };

export {
  badgeClassName,
  badgeClassNameByVariant,
  destructiveBadgeClassName,
  outlineBadgeClassName,
  secondaryBadgeClassName,
} from "./view";

export type ViewConfig = Readonly<{
  label: string;
  variant?: BadgeVariant;
  className?: string;
}>;

export type ContentViewConfig = Readonly<{
  children: readonly (Html | string)[];
  variant?: BadgeVariant;
  className?: string;
}>;

const classNamesForVariant = (
  variant: BadgeVariant,
  className?: string
): string =>
  [badgeClassNameByVariant(variant), className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const contentView = <ParentMessage>({
  children,
  variant = "Default",
  className,
}: ContentViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.span([h.Class(classNamesForVariant(variant, className))], children);
};

export const view = <ParentMessage>({
  label,
  variant = "Default",
  className,
}: ViewConfig): Html =>
  contentView<ParentMessage>({
    children: [label],
    variant,
    ...(className === undefined ? {} : { className }),
  });
