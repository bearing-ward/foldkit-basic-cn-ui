export type KbdSize = "Small" | "Default";

export const kbdBaseClasses =
  "inline-flex min-w-6 items-center justify-center rounded-md border border-gray-300 bg-gray-50 px-1.5 font-mono font-medium text-gray-900 shadow-sm";

export const kbdGroupClasses = "inline-flex items-center gap-1";

export const kbdClassesBySize = (size: KbdSize = "Default"): string =>
  size === "Small"
    ? `${kbdBaseClasses} h-6 text-xs`
    : `${kbdBaseClasses} h-7 text-sm`;
