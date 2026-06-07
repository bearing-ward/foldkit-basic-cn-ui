import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import { skeletonClassNameByShape } from "./view";
import type { SkeletonShape } from "./view";

export type { SkeletonShape };

export { skeletonBaseClassName, skeletonClassNameByShape } from "./view";

export type ViewConfig = Readonly<{
  shape?: SkeletonShape;
  className?: string;
}>;

export const view = <ParentMessage>({
  shape = "Block",
  className,
}: ViewConfig = {}): Html => {
  const h = html<ParentMessage>();
  const classNames = [skeletonClassNameByShape(shape), className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

  return h.span([h.Class(classNames), h.AriaHidden(true)], []);
};
