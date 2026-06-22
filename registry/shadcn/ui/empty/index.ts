import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  emptyActionClasses,
  emptyClasses,
  emptyDescriptionClasses,
  emptyIconClasses,
  emptyTitleClasses,
} from "./view";

export {
  emptyActionClasses,
  emptyClasses,
  emptyDescriptionClasses,
  emptyIconClasses,
  emptyTitleClasses,
} from "./view";

export type ViewConfig = Readonly<{
  title: string;
  description: string;
  icon?: string;
  media?: Html;
  action?: Html;
  classes?: string;
  mediaClasses?: string;
}>;

const cn = (base: string, classes?: string): string =>
  [base, classes]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const view = <ParentMessage>({
  title,
  description,
  icon = "–",
  media,
  action,
  classes,
  mediaClasses,
}: ViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [h.Class(cn(emptyClasses, classes))],
    [
      media === undefined
        ? h.div([h.Class(cn(emptyIconClasses, mediaClasses)), h.AriaHidden(true)], [icon])
        : h.div([h.Class(cn(emptyIconClasses, mediaClasses))], [media]),
      h.h3([h.Class(emptyTitleClasses)], [title]),
      h.p([h.Class(emptyDescriptionClasses)], [description]),
      action === undefined
        ? h.empty
        : h.div([h.Class(emptyActionClasses)], [action]),
    ]
  );
};
