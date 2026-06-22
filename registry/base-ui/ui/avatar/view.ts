export type AvatarSize = "Small" | "Default" | "Large";

export const avatarBaseClasses =
  "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-muted-foreground ring-2 ring-background";

export const avatarImageClasses = "h-full w-full rounded-full object-cover";

export const avatarFallbackClasses =
  "flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium";

export const avatarBadgeClasses =
  "absolute right-0 bottom-0 flex size-2.5 items-center justify-center rounded-full bg-green-600 text-[8px] text-white ring-2 ring-background dark:bg-green-800 [&>svg]:size-3";

export const avatarGroupClasses =
  "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background";

export const avatarGroupCountClasses =
  "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3";

export const avatarSizeClassesBySize = (
  size: AvatarSize = "Default"
): string => {
  if (size === "Small") {
    return "size-6 text-xs";
  }

  if (size === "Large") {
    return "size-10 text-base";
  }

  return "size-8 text-sm";
};

export const avatarClassesBySize = (size: AvatarSize = "Default"): string =>
  `${avatarBaseClasses} ${avatarSizeClassesBySize(size)}`;
