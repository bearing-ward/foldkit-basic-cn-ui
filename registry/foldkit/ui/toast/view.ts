import { Match as M, Option } from "effect";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import type { EntryHandlers, Variant } from "@foldkit/ui/toast";

import type { Entry } from "./index";

export const containerClasses = "gap-2 p-4";

export const entryClasses = "w-80";

export const toastClasses =
  "relative rounded-lg border bg-white p-3 pr-9 text-gray-900 shadow-sm transition data-[closed]:opacity-0 data-[enter]:translate-y-1 data-[leave]:translate-y-1 data-[transition]:duration-150 data-[transition]:ease-out";

export const titleClasses = "text-sm font-semibold";

export const descriptionClasses = "mt-0.5 text-sm text-gray-600";

export const closeButtonClasses =
  "absolute right-2 top-2 rounded-md p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-600";

const variantClasses = (variant: Variant): string =>
  M.value(variant).pipe(
    M.when("Info", () => "border-gray-300"),
    M.when("Success", () => "border-emerald-300 bg-emerald-50"),
    M.when("Warning", () => "border-amber-300 bg-amber-50"),
    M.when("Error", () => "border-red-300 bg-red-50"),
    M.exhaustive
  );

export const toastEntryView = (entry: Entry, handlers: EntryHandlers): Html => {
  const h = html();

  return h.div(
    [h.Class(`${toastClasses} ${variantClasses(entry.variant)}`)],
    [
      h.p([h.Class(titleClasses)], [entry.payload.title]),
      ...Option.match(entry.payload.maybeDescription, {
        onNone: () => [],
        onSome: (description) => [
          h.p([h.Class(descriptionClasses)], [description]),
        ],
      }),
      h.button(
        [
          ...handlers.dismiss,
          h.Type("button"),
          h.AriaLabel(`Dismiss ${entry.payload.title}`),
          h.Class(closeButtonClasses),
        ],
        ["x"]
      ),
    ]
  );
};
