import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import type {
  ContentViewConfig,
  CornerViewConfig,
  RootViewConfig,
  ScrollbarViewConfig,
  ThumbViewConfig,
  ViewConfig,
  ViewportViewConfig,
} from "../scroll-area";
import {
  shadcnScrollAreaContentClassName,
  shadcnScrollAreaCornerClassName,
  shadcnScrollAreaFadeClassName,
  shadcnScrollAreaRootClassName,
  shadcnScrollAreaScrollbarClassName,
  shadcnScrollAreaThumbClassName,
  shadcnScrollAreaViewportClassName,
} from "./view";

export type {
  ContentViewConfig,
  CornerViewConfig,
  RootViewConfig,
  ScrollAreaStyle,
  ScrollbarViewConfig,
  ThumbViewConfig,
  ViewConfig,
  ViewportViewConfig,
} from "../scroll-area";

export {
  shadcnScrollAreaContentClassName,
  shadcnScrollAreaCornerClassName,
  shadcnScrollAreaFadeClassName,
  shadcnScrollAreaRootClassName,
  shadcnScrollAreaScrollbarClassName,
  shadcnScrollAreaThumbClassName,
  shadcnScrollAreaViewportClassName,
} from "./view";

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
      h.DataAttribute("slot", "scroll-area"),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(shadcnScrollAreaRootClassName, className)),
    ],
    children
  );
};

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
      h.DataAttribute("slot", "scroll-area-viewport"),
      ...(ariaLabel === undefined
        ? []
        : [h.Attribute("role", "region"), h.AriaLabel(ariaLabel)]),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(shadcnScrollAreaViewportClassName, className)),
    ],
    children
  );
};

export const contentView = <ParentMessage>({
  children,
  className,
  style,
}: ContentViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(shadcnScrollAreaContentClassName, className)),
    ],
    children
  );
};

export const scrollbarView = <ParentMessage>({
  children,
  className,
  style,
}: ScrollbarViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.AriaHidden(true),
      h.DataAttribute("slot", "scroll-area-scrollbar"),
      h.DataAttribute("orientation", "vertical"),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(shadcnScrollAreaScrollbarClassName, className)),
    ],
    children
  );
};

export const thumbView = <ParentMessage>({
  className,
  style,
}: ThumbViewConfig = {}): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...(style === undefined ? [] : [h.Style(style)]),
      h.DataAttribute("slot", "scroll-area-thumb"),
      h.Class(classNames(shadcnScrollAreaThumbClassName, className)),
    ],
    []
  );
};

export const cornerView = <ParentMessage>({
  className,
  style,
}: CornerViewConfig = {}): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.AriaHidden(true),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(shadcnScrollAreaCornerClassName, className)),
    ],
    []
  );
};

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
          ? classNames(shadcnScrollAreaFadeClassName, viewportClassName)
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
