export type AlertVariant = "Default" | "Destructive";

export const alertClassName =
  "relative grid w-full gap-1 rounded-lg border px-4 py-3 text-sm";

export const alertVariantClassName = (variant: AlertVariant): string => {
  if (variant === "Destructive") {
    return "border-red-200 bg-red-50 text-red-950";
  }

  return "border-gray-200 bg-white text-gray-950";
};

export const alertIconClassName =
  "absolute left-4 top-4 grid size-4 place-items-center text-xs font-semibold";

export const alertContentClassName = "grid gap-1 pl-7";

export const alertTitleClassName = "font-medium leading-none tracking-normal";

export const alertDescriptionClassName =
  "text-sm leading-5 text-gray-600 data-[variant=Destructive]:text-red-700";

export const alertActionClassName = "mt-2 flex justify-start";
