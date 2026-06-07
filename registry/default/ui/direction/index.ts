import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import { directionButtonClassName, directionRootClassName } from "./view";

export {
  directionButtonClassName,
  directionCardClassName,
  directionControlsClassName,
  directionPreviewClassName,
  directionRootClassName,
} from "./view";

/** Text direction values supported by the direction provider helper. */
export type Direction = "ltr" | "rtl";

/** Config for wrapping content in an inherited direction context. */
export type DirectionViewConfig = Readonly<{
  direction: Direction;
  children: readonly (Html | string)[];
  className?: string;
}>;

/** Config for a direction toggle button. */
export type DirectionButtonViewConfig<ParentMessage> = Readonly<{
  direction: Direction;
  currentDirection: Direction;
  label: string;
  onClick: ParentMessage;
  className?: string;
}>;

const classNames = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

/** Wraps children with `dir`, mirroring shadcn's DirectionProvider in Foldkit form. */
export const view = <ParentMessage>({
  direction,
  children,
  className,
}: DirectionViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Dir(direction),
      h.DataAttribute("slot", "direction"),
      h.DataAttribute("direction", direction),
      h.Class(classNames(directionRootClassName, className)),
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
  className,
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
      h.Class(classNames(directionButtonClassName, className)),
    ],
    [direction.toUpperCase()]
  );
};
