import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  scrollAreaContentClassName,
  scrollAreaCornerClassName,
  scrollAreaFadeClassName,
  scrollAreaRootClassName,
  scrollAreaScrollbarClassName,
  scrollAreaThumbClassName,
  scrollAreaViewportClassName,
} from "./view";

export {
  scrollAreaContentClassName,
  scrollAreaCornerClassName,
  scrollAreaFadeClassName,
  scrollAreaRootClassName,
  scrollAreaScrollbarClassName,
  scrollAreaThumbClassName,
  scrollAreaViewportClassName,
} from "./view";

/** Inline style object accepted by Foldkit h.Style. */
export type ScrollAreaStyle = Readonly<Record<string, string>>;

/** Props for the Scroll Area Root anatomy part. */
export type RootViewConfig = Readonly<{
  /** Child anatomy parts rendered inside the root. */
  children: readonly Html[];
  /** Additional class appended to the default Root classes. */
  className?: string | undefined;
  /** Inline styles applied to the Root element. */
  style?: ScrollAreaStyle | undefined;
  /** Marks horizontal overflow state for CSS and tests when known by the caller. */
  hasOverflowX?: boolean | undefined;
  /** Marks vertical overflow state for CSS and tests when known by the caller. */
  hasOverflowY?: boolean | undefined;
  /** Marks active scrolling state for CSS and tests when known by the caller. */
  isScrolling?: boolean | undefined;
}>;

/** Props for the Scroll Area Viewport anatomy part. */
export type ViewportViewConfig = Readonly<{
  /** Scrollable content rendered inside the viewport. */
  children: readonly Html[];
  /** Additional class appended to the default Viewport classes. */
  className?: string | undefined;
  /** Inline styles applied to the Viewport element. */
  style?: ScrollAreaStyle | undefined;
  /** Accessible label for the scrollable region when surrounding text is not enough. */
  ariaLabel?: string | undefined;
}>;

/** Props for the Scroll Area Content anatomy part. */
export type ContentViewConfig = Readonly<{
  /** Consumer-owned content rendered inside the scrollable viewport. */
  children: readonly Html[];
  /** Additional class appended to the default Content classes. */
  className?: string | undefined;
  /** Inline styles applied to the Content element. */
  style?: ScrollAreaStyle | undefined;
}>;

/** Props for the Scroll Area Scrollbar anatomy part. */
export type ScrollbarViewConfig = Readonly<{
  /** Thumb rendered inside the visual scrollbar rail. */
  children: readonly Html[];
  /** Additional class appended to the default Scrollbar classes. */
  className?: string | undefined;
  /** Inline styles applied to the Scrollbar element. */
  style?: ScrollAreaStyle | undefined;
}>;

/** Props for the Scroll Area Thumb anatomy part. */
export type ThumbViewConfig = Readonly<{
  /** Additional class appended to the default Thumb classes. */
  className?: string | undefined;
  /** Inline styles applied to the Thumb element. */
  style?: ScrollAreaStyle | undefined;
}>;

/** Props for the Scroll Area Corner anatomy part. */
export type CornerViewConfig = Readonly<{
  /** Additional class appended to the default Corner classes. */
  className?: string | undefined;
  /** Inline styles applied to the Corner element. */
  style?: ScrollAreaStyle | undefined;
}>;

/** Props for the complete Scroll Area convenience view. */
export type ViewConfig = Readonly<{
  /** Consumer-owned content rendered inside the scroll area. */
  children: readonly Html[];
  /** Accessible label for the native scroll viewport. */
  ariaLabel?: string | undefined;
  /** Adds the Base UI gradient fade mask class to the viewport. */
  hasFade?: boolean | undefined;
  /** Additional class appended to the default Root classes. */
  className?: string | undefined;
  /** Inline styles applied to the Root element. */
  style?: ScrollAreaStyle | undefined;
  /** Additional class appended to the default Viewport classes. */
  viewportClassName?: string | undefined;
  /** Inline styles applied to the Viewport element. */
  viewportStyle?: ScrollAreaStyle | undefined;
  /** Additional class appended to the default Content classes. */
  contentClassName?: string | undefined;
  /** Inline styles applied to the Content element. */
  contentStyle?: ScrollAreaStyle | undefined;
}>;

const classNames = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

const stateAttributes = <ParentMessage>(
  h: ReturnType<typeof html<ParentMessage>>,
  config: Pick<RootViewConfig, "hasOverflowX" | "hasOverflowY" | "isScrolling">
) => [
  ...(config.hasOverflowX === true
    ? [h.DataAttribute("has-overflow-x", "")]
    : []),
  ...(config.hasOverflowY === true
    ? [h.DataAttribute("has-overflow-y", "")]
    : []),
  ...(config.isScrolling === true ? [h.DataAttribute("scrolling", "")] : []),
];

/** Renders the Scroll Area Root anatomy part. */
export const rootView = <ParentMessage>({
  children,
  className,
  style,
  hasOverflowX,
  hasOverflowY,
  isScrolling,
}: RootViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...stateAttributes(h, { hasOverflowX, hasOverflowY, isScrolling }),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(scrollAreaRootClassName, className)),
    ],
    children
  );
};

/** Renders the native scrollable Viewport anatomy part. */
export const viewportView = <ParentMessage>({
  children,
  className,
  style,
  ariaLabel,
}: ViewportViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("tabindex", "0"),
      ...(ariaLabel === undefined
        ? []
        : [h.Attribute("role", "region"), h.AriaLabel(ariaLabel)]),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(scrollAreaViewportClassName, className)),
    ],
    children
  );
};

/** Renders the Scroll Area Content anatomy part. */
export const contentView = <ParentMessage>({
  children,
  className,
  style,
}: ContentViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(scrollAreaContentClassName, className)),
    ],
    children
  );
};

/** Renders a visual Scrollbar rail. Native scrolling remains on the Viewport. */
export const scrollbarView = <ParentMessage>({
  children,
  className,
  style,
}: ScrollbarViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.AriaHidden(true),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(scrollAreaScrollbarClassName, className)),
    ],
    children
  );
};

/** Renders a visual Thumb inside the Scrollbar rail. */
export const thumbView = <ParentMessage>({
  className,
  style,
}: ThumbViewConfig = {}): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(scrollAreaThumbClassName, className)),
    ],
    []
  );
};

/** Renders the visual Corner anatomy part for two-axis layouts. */
export const cornerView = <ParentMessage>({
  className,
  style,
}: CornerViewConfig = {}): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.AriaHidden(true),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(scrollAreaCornerClassName, className)),
    ],
    []
  );
};

/** Renders the complete Scroll Area anatomy around native overflow scrolling. */
export const view = <ParentMessage>({
  children,
  ariaLabel,
  hasFade = false,
  className,
  style,
  viewportClassName,
  viewportStyle,
  contentClassName,
  contentStyle,
}: ViewConfig): Html =>
  rootView<ParentMessage>({
    className,
    style,
    hasOverflowY: true,
    children: [
      viewportView<ParentMessage>({
        ariaLabel,
        className: hasFade
          ? classNames(scrollAreaFadeClassName, viewportClassName)
          : viewportClassName,
        style: viewportStyle,
        children: [
          contentView<ParentMessage>({
            className: contentClassName,
            style: contentStyle,
            children,
          }),
        ],
      }),
      scrollbarView<ParentMessage>({
        children: [thumbView<ParentMessage>()],
      }),
    ],
  });
