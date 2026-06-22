import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  carouselButtonClasses,
  carouselClasses,
  carouselContentClasses,
  carouselItemClasses,
  carouselNextClasses,
  carouselPreviousClasses,
  carouselStatusClasses,
  carouselVerticalContentClasses,
  carouselViewportClasses,
} from "./view";
import type { CarouselOrientation } from "./view";

export type { CarouselOrientation };
export {
  carouselButtonClasses,
  carouselCardClasses,
  carouselClasses,
  carouselContentClasses,
  carouselItemClasses,
  carouselNextClasses,
  carouselPreviousClasses,
  carouselStatusClasses,
  carouselVerticalContentClasses,
  carouselViewportClasses,
} from "./view";

export type RootViewConfig = Readonly<{
  children: readonly (Html | string)[];
  classes?: string;
  ariaLabel?: string;
}>;

export type ViewportViewConfig = Readonly<{
  children: readonly (Html | string)[];
  classes?: string;
}>;

export type ContentViewConfig = Readonly<{
  children: readonly (Html | string)[];
  index: number;
  orientation?: CarouselOrientation;
  classes?: string;
}>;

export type ItemViewConfig = Readonly<{
  children: readonly (Html | string)[];
  classes?: string;
}>;

export type ButtonViewConfig<ParentMessage> = Readonly<{
  label: string;
  direction: "previous" | "next";
  onClick: ParentMessage;
  classes?: string;
}>;

export type StatusViewConfig = Readonly<{
  current: number;
  count: number;
  classes?: string;
}>;

const cn = (base: string, classes?: string): string =>
  [base, classes]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const nextIndex = (index: number, count: number): number => {
  if (count <= 0) {
    return 0;
  }

  return (index + 1) % count;
};

export const previousIndex = (index: number, count: number): number => {
  if (count <= 0) {
    return 0;
  }

  return (index - 1 + count) % count;
};

export const rootView = <ParentMessage>({
  children,
  classes,
  ariaLabel = "Carousel",
}: RootViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "region"),
      h.AriaLabel(ariaLabel),
      h.Attribute("aria-roledescription", "carousel"),
      h.DataAttribute("slot", "carousel"),
      h.Class(cn(carouselClasses, classes)),
    ],
    children
  );
};

export const viewportView = <ParentMessage>({
  children,
  classes,
}: ViewportViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "carousel-viewport"),
      h.Class(cn(carouselViewportClasses, classes)),
    ],
    children
  );
};

export const contentView = <ParentMessage>({
  children,
  index,
  orientation = "horizontal",
  classes,
}: ContentViewConfig): Html => {
  const h = html<ParentMessage>();
  const transform =
    orientation === "vertical"
      ? `translateY(-${index * 100}%)`
      : `translateX(-${index * 100}%)`;
  const base =
    orientation === "vertical"
      ? carouselVerticalContentClasses
      : carouselContentClasses;

  return h.div(
    [
      h.DataAttribute("slot", "carousel-content"),
      h.DataAttribute("orientation", orientation),
      h.Style({ transform }),
      h.Class(cn(base, classes)),
    ],
    children
  );
};

export const itemView = <ParentMessage>({
  children,
  classes,
}: ItemViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "group"),
      h.Attribute("aria-roledescription", "slide"),
      h.DataAttribute("slot", "carousel-item"),
      h.Class(cn(carouselItemClasses, classes)),
    ],
    children
  );
};

export const buttonView = <ParentMessage>({
  label,
  direction,
  onClick,
  classes,
}: ButtonViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();
  const positionClasses =
    direction === "previous"
      ? carouselPreviousClasses
      : carouselNextClasses;

  return h.button(
    [
      h.Type("button"),
      h.AriaLabel(label),
      h.OnClick(onClick),
      h.Class(
        cn(`${carouselButtonClasses} ${positionClasses}`, classes)
      ),
    ],
    [direction === "previous" ? "<" : ">"]
  );
};

export const statusView = <ParentMessage>({
  current,
  count,
  classes,
}: StatusViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.p(
    [
      h.Attribute("aria-live", "polite"),
      h.Class(cn(carouselStatusClasses, classes)),
    ],
    [`Slide ${current} of ${count}`]
  );
};
