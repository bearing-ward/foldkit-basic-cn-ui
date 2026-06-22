import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import { directionButtonClasses, directionRootClasses } from "./view";

export {
  directionButtonClasses,
  directionCardClasses,
  directionControlsClasses,
  directionPreviewClasses,
  directionRootClasses,
} from "./view";

/** Text direction values supported by the direction provider helper. */
export type Direction = "ltr" | "rtl";

/** Config for wrapping content in an inherited direction context. */
export type DirectionViewConfig = Readonly<{
  direction: Direction;
  children: readonly (Html | string)[];
  classes?: string;
}>;

/** Config for a direction toggle button. */
export type DirectionButtonViewConfig<ParentMessage> = Readonly<{
  direction: Direction;
  currentDirection: Direction;
  label: string;
  onClick: ParentMessage;
  classes?: string;
}>;

const cn = (base: string, classes?: string): string =>
  [base, classes]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

/** Wraps children with `dir`, mirroring shadcn's DirectionProvider in Foldkit form. */
export const view = <ParentMessage>({
  direction,
  children,
  classes,
}: DirectionViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Dir(direction),
      h.DataAttribute("slot", "direction"),
      h.DataAttribute("direction", direction),
      h.Class(cn(directionRootClasses, classes)),
    ],
    children
  );
};

/** Renders a native button for parent-owned direction switching. */
export const buttonView = <ParentMessage>({
  direction,
  currentDirection,
  label,
  onClick,
  classes,
}: DirectionButtonViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      h.AriaLabel(label),
      h.OnClick(onClick),
      h.DataAttribute(
        "active",
        currentDirection === direction ? "true" : "false"
      ),
      h.Class(cn(directionButtonClasses, classes)),
    ],
    [direction.toUpperCase()]
  );
};
