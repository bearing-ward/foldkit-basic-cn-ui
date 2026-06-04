export type BadgeVariant = "Default" | "Secondary" | "Destructive" | "Outline";

export const badgeClassName =
  "inline-flex items-center rounded-md bg-accent-600 px-2 py-1 text-xs font-medium text-white";

export const secondaryBadgeClassName =
  "inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700";

export const destructiveBadgeClassName =
  "inline-flex items-center rounded-md bg-red-600 px-2 py-1 text-xs font-medium text-white";

export const outlineBadgeClassName =
  "inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-700";

export const badgeClassNameByVariant = (
  variant: BadgeVariant = "Default"
): string => {
  if (variant === "Secondary") {
    return secondaryBadgeClassName;
  }

  if (variant === "Destructive") {
    return destructiveBadgeClassName;
  }

  if (variant === "Outline") {
    return outlineBadgeClassName;
  }

  return badgeClassName;
};
