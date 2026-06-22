import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import { skeletonClassesByShape } from "./view";
import type { SkeletonShape } from "./view";

export type { SkeletonShape };

export { skeletonBaseClasses, skeletonClassesByShape } from "./view";

export type ViewConfig = Readonly<{
  shape?: SkeletonShape;
  classes?: string;
}>;

export const view = <ParentMessage>({
  shape = "Block",
  classes,
}: ViewConfig = {}): Html => {
  const h = html<ParentMessage>();
  const cn = [skeletonClassesByShape(shape), classes]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

  return h.span([h.Class(cn), h.AriaHidden(true)], []);
};
