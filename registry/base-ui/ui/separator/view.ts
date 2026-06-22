export type SeparatorOrientation = "horizontal" | "vertical";

export const separatorBaseClasses = "shrink-0 bg-gray-200";

export const horizontalSeparatorClasses = "h-px w-full";

export const verticalSeparatorClasses = "h-6 w-px";

export const separatorClassesByOrientation = (
  orientation: SeparatorOrientation = "horizontal"
): string =>
  orientation === "vertical"
    ? `${separatorBaseClasses} ${verticalSeparatorClasses}`
    : `${separatorBaseClasses} ${horizontalSeparatorClasses}`;
