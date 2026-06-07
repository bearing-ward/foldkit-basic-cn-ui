import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import { separatorClassNameByOrientation } from "./view";
import type { SeparatorOrientation } from "./view";

export type { SeparatorOrientation };

export {
  horizontalSeparatorClassName,
  separatorBaseClassName,
  separatorClassNameByOrientation,
  verticalSeparatorClassName,
} from "./view";

export type ViewConfig = Readonly<{
  /** The visual and accessibility orientation of the separator. */
  orientation?: SeparatorOrientation;
  /** Additional class appended to the default orientation classes. */
  className?: string | undefined;
  /** Inline styles applied to the separator element. */
  style?: SeparatorStyle | undefined;
}>;

/** Inline style object accepted by Foldkit h.Style. */
export type SeparatorStyle = Readonly<Record<string, string>>;

/** Renders an accessible Base UI-style separator. */
export const view = <ParentMessage>({
  orientation = "horizontal",
  className,
  style,
}: ViewConfig = {}): Html => {
  const h = html<ParentMessage>();
  const classNames = [separatorClassNameByOrientation(orientation), className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

  return h.div(
    [
      h.Attribute("role", "separator"),
      h.Attribute("aria-orientation", orientation),
      h.DataAttribute("orientation", orientation),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames),
    ],
    []
  );
};
