export type BadgeVariant =
  | "Default"
  | "Secondary"
  | "Destructive"
  | "Outline"
  | "Ghost"
  | "Link";

export const badgeClasses =
  "inline-flex items-center rounded-md bg-accent-600 px-2 py-1 text-xs font-medium text-white";

export const secondaryBadgeClasses =
  "inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700";

export const destructiveBadgeClasses =
  "inline-flex items-center rounded-md bg-red-600 px-2 py-1 text-xs font-medium text-white";

export const outlineBadgeClasses =
  "inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-700";

export const ghostBadgeClasses =
  "inline-flex items-center rounded-md bg-transparent px-2 py-1 text-xs font-medium text-gray-700";

export const linkBadgeClasses =
  "inline-flex items-center rounded-md bg-transparent px-0 py-1 text-xs font-medium text-accent-700 underline-offset-4 hover:underline";

export const badgeClassesByVariant = (
  variant: BadgeVariant = "Default"
): string => {
  if (variant === "Secondary") {
    return secondaryBadgeClasses;
  }

  if (variant === "Destructive") {
    return destructiveBadgeClasses;
  }

  if (variant === "Outline") {
    return outlineBadgeClasses;
  }

  if (variant === "Ghost") {
    return ghostBadgeClasses;
  }

  if (variant === "Link") {
    return linkBadgeClasses;
  }

  return badgeClasses;
};
