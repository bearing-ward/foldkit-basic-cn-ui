export type SeparatorOrientation = "horizontal" | "vertical";

export const separatorBaseClassName = "shrink-0 bg-gray-200";

export const horizontalSeparatorClassName = "h-px w-full";

export const verticalSeparatorClassName = "h-6 w-px";

export const separatorClassNameByOrientation = (
  orientation: SeparatorOrientation = "horizontal"
): string =>
  orientation === "vertical"
    ? `${separatorBaseClassName} ${verticalSeparatorClassName}`
    : `${separatorBaseClassName} ${horizontalSeparatorClassName}`;
