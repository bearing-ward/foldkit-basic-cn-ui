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

export const view = <ParentMessage>({
  label,
  variant = "Default",
  className,
}: ViewConfig): Html => {
  const h = html<ParentMessage>();
  const classNames = [badgeClassNameByVariant(variant), className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

  return h.span([h.Class(classNames)], [label]);
};
