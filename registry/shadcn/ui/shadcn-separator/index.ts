import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import { shadcnSeparatorClassesByOrientation } from "./view";
import type { SeparatorOrientation } from "./view";

export {
  shadcnHorizontalSeparatorClasses,
  shadcnSeparatorBaseClasses,
  shadcnSeparatorClassesByOrientation,
  shadcnVerticalSeparatorClasses,
} from "./view";

export type { SeparatorOrientation };

export type SeparatorStyle = Readonly<Record<string, string>>;

export type ViewConfig = Readonly<{
  orientation?: SeparatorOrientation;
  className?: string | undefined;
  style?: SeparatorStyle | undefined;
  decorative?: boolean | undefined;
}>;

export const view = <ParentMessage>({
  className,
  decorative = true,
  orientation = "horizontal",
  style,
}: ViewConfig = {}): Html => {
  const h = html<ParentMessage>();
  const cn = [shadcnSeparatorClassesByOrientation(orientation), className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

  return h.div(
    [
      decorative
        ? h.Attribute("role", "none")
        : h.Attribute("role", "separator"),
      ...(decorative ? [] : [h.Attribute("aria-orientation", orientation)]),
      h.DataAttribute("slot", "separator"),
      h.DataAttribute("orientation", orientation),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn),
    ],
    []
  );
};
