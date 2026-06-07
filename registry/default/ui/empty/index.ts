import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  emptyActionClassName,
  emptyClassName,
  emptyDescriptionClassName,
  emptyIconClassName,
  emptyTitleClassName,
} from "./view";

export {
  emptyActionClassName,
  emptyClassName,
  emptyDescriptionClassName,
  emptyIconClassName,
  emptyTitleClassName,
} from "./view";

export type ViewConfig = Readonly<{
  title: string;
  description: string;
  icon?: string;
  action?: Html;
  className?: string;
}>;

const classNames = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const view = <ParentMessage>({
  title,
  description,
  icon = "–",
  action,
  className,
}: ViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [h.Class(classNames(emptyClassName, className))],
    [
      h.div([h.Class(emptyIconClassName), h.AriaHidden(true)], [icon]),
      h.h3([h.Class(emptyTitleClassName)], [title]),
      h.p([h.Class(emptyDescriptionClassName)], [description]),
      action === undefined
        ? h.empty
        : h.div([h.Class(emptyActionClassName)], [action]),
    ]
  );
};
