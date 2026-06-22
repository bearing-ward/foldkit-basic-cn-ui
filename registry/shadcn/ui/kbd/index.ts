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
  className?: string;
}>;

export const view = <ParentMessage>({
  label,
  size = "Default",
  className,
}: ViewConfig): Html => {
  const h = html<ParentMessage>();
  const cn = [kbdClassesBySize(size), className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

  return h.kbd([h.Class(cn)], [label]);
};

export const groupView = <ParentMessage>(
  children: readonly Html[],
  className?: string
): Html => {
  const h = html<ParentMessage>();
  const cn = [kbdGroupClasses, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

  return h.span([h.Class(cn)], children);
};
