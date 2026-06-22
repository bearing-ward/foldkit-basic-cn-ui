import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import { badgeClassesByVariant } from "./view";
import type { BadgeVariant } from "./view";

export type { BadgeVariant };

export {
  badgeClasses,
  badgeClassesByVariant,
  destructiveBadgeClasses,
  ghostBadgeClasses,
  linkBadgeClasses,
  outlineBadgeClasses,
  secondaryBadgeClasses,
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

const classesForVariant = (
  variant: BadgeVariant,
  className?: string
): string =>
  [badgeClassesByVariant(variant), className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const contentView = <ParentMessage>({
  children,
  variant = "Default",
  className,
}: ContentViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.span([h.Class(classesForVariant(variant, className))], children);
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
