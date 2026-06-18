import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import { kbdClassNameBySize, kbdGroupClassName } from "./view";
import type { KbdSize } from "./view";

export type { KbdSize };

export {
  kbdBaseClassName,
  kbdClassNameBySize,
  kbdGroupClassName,
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
  const classNames = [kbdClassNameBySize(size), className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

  return h.kbd([h.Class(classNames)], [label]);
};

export const groupView = <ParentMessage>(
  children: readonly Html[],
  className?: string
): Html => {
  const h = html<ParentMessage>();
  const classNames = [kbdGroupClassName, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

  return h.span([h.Class(classNames)], children);
};
