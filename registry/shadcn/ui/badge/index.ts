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
  classes?: string;
}>;

export type ContentViewConfig = Readonly<{
  children: readonly (Html | string)[];
  variant?: BadgeVariant;
  classes?: string;
}>;

const classesForVariant = (
  variant: BadgeVariant,
  classes?: string
): string =>
  [badgeClassesByVariant(variant), classes]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const contentView = <ParentMessage>({
  children,
  variant = "Default",
  classes,
}: ContentViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.span([h.Class(classesForVariant(variant, classes))], children);
};

export const view = <ParentMessage>({
  label,
  variant = "Default",
  classes,
}: ViewConfig): Html =>
  contentView<ParentMessage>({
    children: [label],
    variant,
    ...(classes === undefined ? {} : { classes }),
  });
