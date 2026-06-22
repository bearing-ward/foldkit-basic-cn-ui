export type ProgressStatus = "Indeterminate" | "Progressing" | "Complete";

export const progressRootClasses = "grid max-w-full w-60 grid-cols-2 gap-y-2";

export const progressLabelClasses = "text-sm font-normal text-gray-950";

export const progressValueClasses = "text-right text-sm text-gray-950";

export const progressTrackClasses =
  "col-span-2 h-1 overflow-hidden bg-gray-200";

export const progressIndicatorClasses =
  "h-inherit bg-gray-950 transition-[width] duration-500";

export const progressStatus = (
  value: number | null,
  max = 100
): ProgressStatus => {
  if (value === null || !Number.isFinite(value)) {
    return "Indeterminate";
  }

  return value === max ? "Complete" : "Progressing";
};

export const progressStatusDataAttribute = (status: ProgressStatus): string =>
  ({
    Complete: "complete",
    Indeterminate: "indeterminate",
    Progressing: "progressing",
  })[status];

export const progressPercent = (value: number, min = 0, max = 100): number =>
  Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
