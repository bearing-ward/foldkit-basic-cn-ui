export const commandRootClassName =
  "flex h-full w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm";

export const commandInputWrapperClassName =
  "flex h-11 items-center border-b border-gray-200 px-3";

export const commandInputClassName =
  "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50";

export const commandListClassName =
  "max-h-72 overflow-y-auto overflow-x-hidden";

export const commandEmptyClassName = "py-6 text-center text-sm text-gray-500";

export const commandGroupClassName =
  "overflow-hidden p-1 text-gray-950 [&_[data-slot=command-group-heading]]:px-2 [&_[data-slot=command-group-heading]]:py-1.5 [&_[data-slot=command-group-heading]]:text-xs [&_[data-slot=command-group-heading]]:font-medium [&_[data-slot=command-group-heading]]:text-gray-500";

export const commandItemClassName =
  "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100 hover:text-gray-950 data-[selected=true]:bg-gray-100 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50";

export const commandSeparatorClassName = "-mx-1 h-px bg-gray-200";

export const commandShortcutClassName =
  "ml-auto text-xs tracking-widest text-gray-500";
