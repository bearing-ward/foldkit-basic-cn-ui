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
} from "../../../base-ui/ui/scroll-area";
import {
  shadcnScrollAreaContentClasses,
  shadcnScrollAreaCornerClasses,
  shadcnScrollAreaFadeClasses,
  shadcnScrollAreaRootClasses,
  shadcnScrollAreaScrollbarClasses,
  shadcnScrollAreaThumbClasses,
  shadcnScrollAreaViewportClasses,
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
} from "../../../base-ui/ui/scroll-area";

export {
  shadcnScrollAreaContentClasses,
  shadcnScrollAreaCornerClasses,
  shadcnScrollAreaFadeClasses,
  shadcnScrollAreaRootClasses,
  shadcnScrollAreaScrollbarClasses,
  shadcnScrollAreaThumbClasses,
  shadcnScrollAreaViewportClasses,
} from "./view";

const cn = (base: string, classes?: string): string =>
  [base, classes]
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
  classes,
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
      h.Class(cn(shadcnScrollAreaRootClasses, classes)),
    ],
    children
  );
};

export const viewportView = <ParentMessage>({
  children,
  classes,
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
      h.Class(cn(shadcnScrollAreaViewportClasses, classes)),
    ],
    children
  );
};

export const contentView = <ParentMessage>({
  children,
  classes,
  style,
}: ContentViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(shadcnScrollAreaContentClasses, classes)),
    ],
    children
  );
};

export const scrollbarView = <ParentMessage>({
  children,
  orientation = "vertical",
  classes,
  style,
}: ScrollbarViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.AriaHidden(true),
      h.DataAttribute("slot", "scroll-area-scrollbar"),
      h.DataAttribute("orientation", orientation),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(shadcnScrollAreaScrollbarClasses, classes)),
    ],
    children
  );
};

export const thumbView = <ParentMessage>({
  classes,
  style,
}: ThumbViewConfig = {}): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...(style === undefined ? [] : [h.Style(style)]),
      h.DataAttribute("slot", "scroll-area-thumb"),
      h.Class(cn(shadcnScrollAreaThumbClasses, classes)),
    ],
    []
  );
};

export const cornerView = <ParentMessage>({
  classes,
  style,
}: CornerViewConfig = {}): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.AriaHidden(true),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(shadcnScrollAreaCornerClasses, classes)),
    ],
    []
  );
};

export const view = <ParentMessage>({
  children,
  ariaLabel,
  hasFade = false,
  classes,
  style,
  viewportClasses,
  viewportStyle,
  contentClasses,
  contentStyle,
  hasHorizontalScrollbar = false,
}: ViewConfig): Html =>
  rootView<ParentMessage>({
    classes,
    style,
    hasOverflowY: true,
    hasOverflowX: hasHorizontalScrollbar,
    children: [
      viewportView<ParentMessage>({
        ariaLabel,
        classes: hasFade
          ? cn(shadcnScrollAreaFadeClasses, viewportClasses)
          : viewportClasses,
        style: viewportStyle,
        children: [
          contentView<ParentMessage>({
            classes: contentClasses,
            style: contentStyle,
            children,
          }),
        ],
      }),
      scrollbarView<ParentMessage>({
        children: [thumbView<ParentMessage>()],
      }),
      ...(hasHorizontalScrollbar
        ? [
            scrollbarView<ParentMessage>({
              orientation: "horizontal",
              classes: "inset-x-0 bottom-0 h-2.5 w-full border-l-0 border-t border-t-transparent",
              children: [thumbView<ParentMessage>()],
            }),
          ]
        : []),
    ],
  });
