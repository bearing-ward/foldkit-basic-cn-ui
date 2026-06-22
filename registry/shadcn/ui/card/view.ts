export const cardClasses =
  "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl border border-gray-200 bg-white py-(--card-spacing) text-sm text-gray-950 shadow [--card-spacing:--spacing(4)] data-[size=sm]:[--card-spacing:--spacing(3)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0";

export const cardHeaderClasses =
  "group/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)";

export const cardTitleClasses =
  "text-lg font-semibold leading-none tracking-normal text-gray-950";

export const cardDescriptionClasses = "text-sm text-gray-600";

export const cardActionClasses =
  "col-start-2 row-span-2 row-start-1 self-start justify-self-end";

export const cardContentClasses = "px-(--card-spacing)";

export const cardFooterClasses =
  "flex items-center rounded-b-xl border-t border-gray-200 bg-gray-50 p-(--card-spacing)";
