import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import { kbdClassesBySize, kbdGroupClasses } from "./view";
import type { KbdSize } from "./view";

export type { KbdSize };

export {
  kbdBaseClasses,
  kbdClassesBySize,
  kbdGroupClasses,
} from "./view";

export type ViewConfig = Readonly<{
  label: string;
  size?: KbdSize;
  classes?: string;
}>;

export const view = <ParentMessage>({
  label,
  size = "Default",
  classes,
}: ViewConfig): Html => {
  const h = html<ParentMessage>();
  const cn = [kbdClassesBySize(size), classes]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

  return h.kbd([h.Class(cn)], [label]);
};

export const groupView = <ParentMessage>(
  children: readonly Html[],
  classes?: string
): Html => {
  const h = html<ParentMessage>();
  const cn = [kbdGroupClasses, classes]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

  return h.span([h.Class(cn)], children);
};
