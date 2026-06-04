import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  avatarClassNameBySize,
  avatarGroupClassName,
  avatarGroupCountClassName,
} from "./view";
import type { AvatarSize } from "./view";

export type { AvatarSize };

export {
  avatarBaseClassName,
  avatarClassNameBySize,
  avatarFallbackClassName,
  avatarGroupClassName,
  avatarGroupCountClassName,
  avatarImageClassName,
  avatarSizeClassNameBySize,
} from "./view";

export type ViewConfig = Readonly<{
  fallback: string;
  src?: string;
  alt?: string;
  size?: AvatarSize;
  className?: string;
}>;

export type CountConfig = Readonly<{
  count: number;
  label?: string;
  className?: string;
}>;

export const view = <ParentMessage>({
  fallback,
  src,
  alt,
  size = "Default",
  className,
}: ViewConfig): Html => {
  const h = html<ParentMessage>();
  const classNames = [avatarClassNameBySize(size), className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

  return h.span(
    [h.Class(classNames)],
    src === undefined
      ? [
          h.span(
            [h.Class("flex h-full w-full items-center justify-center")],
            [fallback]
          ),
        ]
      : [
          h.img([
            h.Src(src),
            h.Alt(alt ?? fallback),
            h.Class("h-full w-full object-cover"),
          ]),
        ]
  );
};

export const groupView = <ParentMessage>(
  children: readonly Html[],
  className?: string
): Html => {
  const h = html<ParentMessage>();
  const classNames = [avatarGroupClassName, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

  return h.div([h.Class(classNames)], children);
};

export const countView = <ParentMessage>({
  count,
  label,
  className,
}: CountConfig): Html => {
  const h = html<ParentMessage>();
  const classNames = [avatarGroupCountClassName, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

  return h.span(
    [
      h.Class(classNames),
      h.AriaLabel(label ?? `${count} more people`),
      h.Attribute("role", "img"),
    ],
    [`+${count}`]
  );
};
