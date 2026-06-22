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
  classes?: string | undefined;
  style?: AvatarStyle | undefined;
}>;

export type ImageViewConfig = Readonly<{
  src: string;
  alt: string;
  classes?: string | undefined;
  style?: AvatarStyle | undefined;
}>;

export type FallbackViewConfig = Readonly<{
  children: readonly Html[];
  ariaLabel?: string | undefined;
  classes?: string | undefined;
  style?: AvatarStyle | undefined;
}>;

export type ViewConfig = Readonly<{
  fallback: string;
  src?: string | undefined;
  alt?: string | undefined;
  size?: AvatarSize | undefined;
  classes?: string | undefined;
  style?: AvatarStyle | undefined;
}>;

export type CountConfig = Readonly<{
  count: number;
  label?: string | undefined;
  classes?: string | undefined;
  style?: AvatarStyle | undefined;
}>;

export type BadgeViewConfig = Readonly<{
  children?: readonly Html[] | undefined;
  label?: string | undefined;
  classes?: string | undefined;
  style?: AvatarStyle | undefined;
}>;

const cn = (base: string, classes?: string): string =>
  [base, classes]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const rootView = <ParentMessage>({
  children,
  size = "Default",
  classes,
  style,
}: RootViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.span(
    [
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(avatarClassesBySize(size), classes)),
    ],
    children
  );
};

export const imageView = <ParentMessage>({
  src,
  alt,
  classes,
  style,
}: ImageViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.img([
    h.Src(src),
    h.Alt(alt),
    ...(style === undefined ? [] : [h.Style(style)]),
    h.Class(cn(avatarImageClasses, classes)),
  ]);
};

export const fallbackView = <ParentMessage>({
  children,
  ariaLabel,
  classes,
  style,
}: FallbackViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.span(
    [
      ...(ariaLabel === undefined ? [] : [h.AriaLabel(ariaLabel)]),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(avatarFallbackClasses, classes)),
    ],
    children
  );
};

export const view = <ParentMessage>({
  fallback,
  src,
  alt,
  size = "Default",
  classes,
  style,
}: ViewConfig): Html =>
  rootView<ParentMessage>({
    size,
    classes,
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
  classes,
  style,
}: BadgeViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.span(
    [
      ...(label === undefined ? [h.AriaHidden(true)] : [h.AriaLabel(label)]),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(avatarBadgeClasses, classes)),
    ],
    children
  );
};

export const groupView = <ParentMessage>(
  children: readonly Html[],
  classes?: string
): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [h.Class(cn(avatarGroupClasses, classes))],
    children
  );
};

export const countView = <ParentMessage>({
  count,
  label,
  classes,
  style,
}: CountConfig): Html => {
  const h = html<ParentMessage>();

  return h.span(
    [
      h.Class(cn(avatarGroupCountClasses, classes)),
      h.AriaLabel(label ?? `${count} more people`),
      h.Attribute("role", "img"),
      ...(style === undefined ? [] : [h.Style(style)]),
    ],
    [`+${count}`]
  );
};
