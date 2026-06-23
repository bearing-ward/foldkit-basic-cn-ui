export type SeparatorOrientation = "horizontal" | "vertical";

export const shadcnSeparatorBaseClasses =
  "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch";

export const shadcnHorizontalSeparatorClasses = shadcnSeparatorBaseClasses;

export const shadcnVerticalSeparatorClasses = shadcnSeparatorBaseClasses;

export const shadcnSeparatorClassesByOrientation = (
  _orientation: SeparatorOrientation = "horizontal"
): string => shadcnSeparatorBaseClasses;
