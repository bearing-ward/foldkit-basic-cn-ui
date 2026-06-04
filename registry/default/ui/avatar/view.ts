export type AvatarSize = "Small" | "Default" | "Large";

export const avatarBaseClassName =
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100 font-medium text-gray-700 ring-2 ring-white";

export const avatarImageClassName = "h-full w-full object-cover";

export const avatarFallbackClassName =
  "flex h-full w-full items-center justify-center bg-gray-100 text-gray-700";

export const avatarGroupClassName = "flex items-center -space-x-2";

export const avatarGroupCountClassName =
  "relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-700 ring-2 ring-white";

export const avatarSizeClassNameBySize = (
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

export const avatarClassNameBySize = (size: AvatarSize = "Default"): string =>
  `${avatarBaseClassName} ${avatarSizeClassNameBySize(size)}`;
