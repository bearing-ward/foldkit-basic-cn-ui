import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  avatarBadgeClasses,
  avatarClassesBySize,
  avatarFallbackClasses,
  avatarGroupClasses,
  avatarGroupCountClasses,
  avatarImageClasses,
} from "./view";
import type { AvatarSize } from "./view";

export type { AvatarSize };

export {
  avatarBaseClasses,
  avatarBadgeClasses,
  avatarClassesBySize,
  avatarFallbackClasses,
  avatarGroupClasses,
  avatarGroupCountClasses,
  avatarImageClasses,
  avatarSizeClassesBySize,
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

const cn = (base: string, className?: string): string =>
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
      h.Attribute("data-slot", "avatar"),
      h.Attribute(
        "data-size",
        size === "Small" ? "sm" : size === "Large" ? "lg" : "default"
      ),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(avatarClassesBySize(size), className)),
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
    h.Attribute("data-slot", "avatar-image"),
    h.Src(src),
    h.Alt(alt),
    ...(style === undefined ? [] : [h.Style(style)]),
    h.Class(cn(avatarImageClasses, className)),
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
      h.Attribute("data-slot", "avatar-fallback"),
      ...(ariaLabel === undefined ? [] : [h.AriaLabel(ariaLabel)]),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(avatarFallbackClasses, className)),
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
      h.Attribute("data-slot", "avatar-badge"),
      ...(label === undefined ? [h.AriaHidden(true)] : [h.AriaLabel(label)]),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(avatarBadgeClasses, className)),
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
    [
      h.Attribute("data-slot", "avatar-group"),
      h.Class(cn(avatarGroupClasses, className)),
    ],
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
      h.Attribute("data-slot", "avatar-group-count"),
      h.Class(cn(avatarGroupCountClasses, className)),
      h.AriaLabel(label ?? `${count} more people`),
      h.Attribute("role", "img"),
      ...(style === undefined ? [] : [h.Style(style)]),
    ],
    [`+${count}`]
  );
};
