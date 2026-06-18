import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  avatarBadgeClassName,
  avatarClassNameBySize,
  avatarFallbackClassName,
  avatarGroupClassName,
  avatarGroupCountClassName,
  avatarImageClassName,
} from "./view";
import type { AvatarSize } from "./view";

export type { AvatarSize };

export {
  avatarBaseClassName,
  avatarBadgeClassName,
  avatarClassNameBySize,
  avatarFallbackClassName,
  avatarGroupClassName,
  avatarGroupCountClassName,
  avatarImageClassName,
  avatarSizeClassNameBySize,
} from "./view";

export type AvatarStyle = Readonly<Record<string, string>>;

export type RootViewConfig = Readonly<{
  children: readonly Html[];
  size?: AvatarSize | undefined;
  className?: string | undefined;
  style?: AvatarStyle | undefined;
}>;

export type ImageViewConfig = Readonly<{
  src: string;
  alt: string;
  className?: string | undefined;
  style?: AvatarStyle | undefined;
}>;

export type FallbackViewConfig = Readonly<{
  children: readonly Html[];
  ariaLabel?: string | undefined;
  className?: string | undefined;
  style?: AvatarStyle | undefined;
}>;

export type ViewConfig = Readonly<{
  fallback: string;
  src?: string | undefined;
  alt?: string | undefined;
  size?: AvatarSize | undefined;
  className?: string | undefined;
  style?: AvatarStyle | undefined;
}>;

export type CountConfig = Readonly<{
  count: number;
  label?: string | undefined;
  className?: string | undefined;
  style?: AvatarStyle | undefined;
}>;

export type BadgeViewConfig = Readonly<{
  children?: readonly Html[] | undefined;
  label?: string | undefined;
  className?: string | undefined;
  style?: AvatarStyle | undefined;
}>;

const classNames = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const rootView = <ParentMessage>({
  children,
  size = "Default",
  className,
  style,
}: RootViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.span(
    [
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(avatarClassNameBySize(size), className)),
    ],
    children
  );
};

export const imageView = <ParentMessage>({
  src,
  alt,
  className,
  style,
}: ImageViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.img([
    h.Src(src),
    h.Alt(alt),
    ...(style === undefined ? [] : [h.Style(style)]),
    h.Class(classNames(avatarImageClassName, className)),
  ]);
};

export const fallbackView = <ParentMessage>({
  children,
  ariaLabel,
  className,
  style,
}: FallbackViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.span(
    [
      ...(ariaLabel === undefined ? [] : [h.AriaLabel(ariaLabel)]),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(avatarFallbackClassName, className)),
    ],
    children
  );
};

export const view = <ParentMessage>({
  fallback,
  src,
  alt,
  size = "Default",
  className,
  style,
}: ViewConfig): Html =>
  rootView<ParentMessage>({
    size,
    className,
    style,
    children:
      src === undefined
        ? [
            fallbackView<ParentMessage>({
              children: [html<ParentMessage>().span([], [fallback])],
            }),
          ]
        : [imageView<ParentMessage>({ src, alt: alt ?? fallback })],
  });

export const badgeView = <ParentMessage>({
  children = [],
  label,
  className,
  style,
}: BadgeViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.span(
    [
      ...(label === undefined ? [h.AriaHidden(true)] : [h.AriaLabel(label)]),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(avatarBadgeClassName, className)),
    ],
    children
  );
};

export const groupView = <ParentMessage>(
  children: readonly Html[],
  className?: string
): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [h.Class(classNames(avatarGroupClassName, className))],
    children
  );
};

export const countView = <ParentMessage>({
  count,
  label,
  className,
  style,
}: CountConfig): Html => {
  const h = html<ParentMessage>();

  return h.span(
    [
      h.Class(classNames(avatarGroupCountClassName, className)),
      h.AriaLabel(label ?? `${count} more people`),
      h.Attribute("role", "img"),
      ...(style === undefined ? [] : [h.Style(style)]),
    ],
    [`+${count}`]
  );
};
