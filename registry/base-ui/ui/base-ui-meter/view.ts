export type MeterStatus = "Metering" | "Complete";

export const meterRootClasses = "grid max-w-full w-60 grid-cols-2 gap-y-2";

export const meterLabelClasses = "text-sm font-normal text-gray-950";

export const meterValueClasses = "text-right text-sm text-gray-950";

export const meterTrackClasses = "col-span-2 h-1 overflow-hidden bg-gray-200";

export const meterIndicatorClasses =
  "h-inherit bg-gray-950 transition-[width] duration-500";

export const meterStatus = (value: number, max = 100): MeterStatus =>
  value >= max ? "Complete" : "Metering";

export const meterStatusDataAttribute = (status: MeterStatus): string =>
  ({
    Complete: "complete",
    Metering: "metering",
  })[status];

export const meterPercent = (value: number, min = 0, max = 100): number =>
  Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
