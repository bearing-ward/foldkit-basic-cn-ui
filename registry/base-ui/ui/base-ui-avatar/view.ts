export type AvatarSize = "Small" | "Default" | "Large";

export const avatarBaseClasses =
  "relative inline-flex shrink-0 items-center justify-center rounded-full bg-gray-100 font-medium text-gray-700 ring-2 ring-white";

export const avatarImageClasses = "h-full w-full rounded-full object-cover";

export const avatarFallbackClasses =
  "flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-gray-700";

export const avatarBadgeClasses =
  "absolute right-0 bottom-0 inline-flex h-3 w-3 items-center justify-center rounded-full border-2 border-white bg-green-600 text-[8px] text-white";

export const avatarGroupClasses = "flex items-center -space-x-2";

export const avatarGroupCountClasses =
  "relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-700 ring-2 ring-white";

export const avatarSizeClassesBySize = (
  size: AvatarSize = "Default"
): string => {
  if (size === "Small") {
    return "h-8 w-8 text-xs";
  }

  if (size === "Large") {
    return "h-12 w-12 text-base";
  }

  return "h-10 w-10 text-sm";
};

export const avatarClassesBySize = (size: AvatarSize = "Default"): string =>
  `${avatarBaseClasses} ${avatarSizeClassesBySize(size)}`;
