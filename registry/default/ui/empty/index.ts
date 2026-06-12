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
  media?: Html;
  action?: Html;
  className?: string;
  mediaClassName?: string;
}>;

const classNames = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const view = <ParentMessage>({
  title,
  description,
  icon = "–",
  media,
  action,
  className,
  mediaClassName,
}: ViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [h.Class(classNames(emptyClassName, className))],
    [
      media === undefined
        ? h.div([h.Class(classNames(emptyIconClassName, mediaClassName)), h.AriaHidden(true)], [icon])
        : h.div([h.Class(classNames(emptyIconClassName, mediaClassName))], [media]),
      h.h3([h.Class(emptyTitleClassName)], [title]),
      h.p([h.Class(emptyDescriptionClassName)], [description]),
      action === undefined
        ? h.empty
        : h.div([h.Class(emptyActionClassName)], [action]),
    ]
  );
};
