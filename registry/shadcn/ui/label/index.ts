import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import { labelClasses } from "./view";

export { labelClasses } from "./view";

export type ViewConfig = Readonly<{
  children: readonly Html[] | string;
  forId?: string;
  required?: boolean;
  disabled?: boolean;
  classes?: string;
}>;

const cn = (...values: readonly (string | undefined)[]): string =>
  values
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const view = <ParentMessage>({
  children,
  forId,
  required = false,
  disabled = false,
  classes,
}: ViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.label(
    [
      ...(forId === undefined ? [] : [h.For(forId)]),
      h.DataAttribute("slot", "label"),
      h.DataAttribute("required", String(required)),
      h.DataAttribute("disabled", String(disabled)),
      h.Class(cn(labelClasses, classes)),
    ],
    typeof children === "string" ? [children] : children
  );
};
