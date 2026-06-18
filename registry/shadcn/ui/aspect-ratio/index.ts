import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  aspectRatioCaptionClassName,
  aspectRatioClassName,
  aspectRatioContentClassName,
  aspectRatioImageClassName,
} from "./view";

export {
  aspectRatioCaptionClassName,
  aspectRatioClassName,
  aspectRatioContentClassName,
  aspectRatioImageClassName,
};

/** Inline style object accepted by Foldkit h.Style. */
export type AspectRatioStyle = Readonly<Record<string, string>>;

/** Public data attributes emitted by the root view. */
export type AspectRatioDataAttributes = Readonly<{
  /** Decimal string form of the numeric ratio, for example "1.7777777777777777". */
  "data-ratio": string;
}>;

/** Configuration for the AspectRatio root. */
export type RootViewConfig = Readonly<{
  /** Width divided by height. Use 16 / 9 for widescreen, 1 for square, or 9 / 16 for portrait. */
  ratio: number;
  /** Consumer-owned content rendered inside the fixed-ratio box. */
  children: readonly Html[];
  /** Additional class names appended after the default root classes. */
  className?: string | undefined;
  /** Additional inline styles merged after the computed aspect-ratio style. */
  style?: AspectRatioStyle | undefined;
}>;

/** Configuration for the common image helper. */
export type ImageViewConfig = Readonly<{
  /** Image source URL. */
  src: string;
  /** Accessible image alternative text. */
  alt: string;
  /** Additional class names appended after the default image classes. */
  className?: string | undefined;
  /** Optional image inline styles. */
  style?: AspectRatioStyle | undefined;
}>;

/** Configuration for the optional caption overlay helper. */
export type CaptionViewConfig = Readonly<{
  /** Caption text or inline content. */
  children: readonly (Html | string)[];
  /** Additional class names appended after the default caption classes. */
  className?: string | undefined;
  /** Optional caption inline styles. */
  style?: AspectRatioStyle | undefined;
}>;

const classNames = (...values: readonly (string | undefined)[]): string =>
  values
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

const aspectRatioValue = (ratio: number): string => `${ratio}`;

/** Render a fixed-ratio content box with caller-owned children. */
export const rootView = <ParentMessage>({
  ratio,
  children,
  className,
  style,
}: RootViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("ratio", aspectRatioValue(ratio)),
      h.Class(classNames(aspectRatioClassName, className)),
      h.Style({
        aspectRatio: aspectRatioValue(ratio),
        ...style,
      }),
    ],
    children
  );
};

/** Render an image sized to the AspectRatio box. */
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
    h.Class(classNames(aspectRatioImageClassName, className)),
    ...(style === undefined ? [] : [h.Style(style)]),
  ]);
};

/** Render an optional caption overlay inside an AspectRatio root. */
export const captionView = <ParentMessage>({
  children,
  className,
  style,
}: CaptionViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Class(classNames(aspectRatioCaptionClassName, className)),
      ...(style === undefined ? [] : [h.Style(style)]),
    ],
    children
  );
};

/** Common image-focused AspectRatio helper. */
export const view = <ParentMessage>({
  ratio,
  src,
  alt,
  caption,
  className,
}: Readonly<{
  /** Width divided by height. */
  ratio: number;
  /** Image source URL. */
  src: string;
  /** Accessible image alternative text. */
  alt: string;
  /** Optional visible caption overlay. */
  caption?: string | undefined;
  /** Additional class names appended after the default root classes. */
  className?: string | undefined;
}>): Html =>
  rootView<ParentMessage>({
    ratio,
    className,
    children: [
      imageView<ParentMessage>({ src, alt }),
      ...(caption === undefined
        ? []
        : [captionView<ParentMessage>({ children: [caption] })]),
    ],
  });
