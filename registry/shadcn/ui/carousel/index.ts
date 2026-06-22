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
  className?: string;
  ariaLabel?: string;
}>;

export type ViewportViewConfig = Readonly<{
  children: readonly (Html | string)[];
  className?: string;
}>;

export type ContentViewConfig = Readonly<{
  children: readonly (Html | string)[];
  index: number;
  orientation?: CarouselOrientation;
  className?: string;
}>;

export type ItemViewConfig = Readonly<{
  children: readonly (Html | string)[];
  className?: string;
}>;

export type ButtonViewConfig<ParentMessage> = Readonly<{
  label: string;
  direction: "previous" | "next";
  onClick: ParentMessage;
  className?: string;
}>;

export type StatusViewConfig = Readonly<{
  current: number;
  count: number;
  className?: string;
}>;

const cn = (base: string, className?: string): string =>
  [base, className]
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
  className,
  ariaLabel = "Carousel",
}: RootViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "region"),
      h.AriaLabel(ariaLabel),
      h.Attribute("aria-roledescription", "carousel"),
      h.DataAttribute("slot", "carousel"),
      h.Class(cn(carouselClasses, className)),
    ],
    children
  );
};

export const viewportView = <ParentMessage>({
  children,
  className,
}: ViewportViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "carousel-viewport"),
      h.Class(cn(carouselViewportClasses, className)),
    ],
    children
  );
};

export const contentView = <ParentMessage>({
  children,
  index,
  orientation = "horizontal",
  className,
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
      h.Class(cn(base, className)),
    ],
    children
  );
};

export const itemView = <ParentMessage>({
  children,
  className,
}: ItemViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "group"),
      h.Attribute("aria-roledescription", "slide"),
      h.DataAttribute("slot", "carousel-item"),
      h.Class(cn(carouselItemClasses, className)),
    ],
    children
  );
};

export const buttonView = <ParentMessage>({
  label,
  direction,
  onClick,
  className,
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
        cn(`${carouselButtonClasses} ${positionClasses}`, className)
      ),
    ],
    [direction === "previous" ? "<" : ">"]
  );
};

export const statusView = <ParentMessage>({
  current,
  count,
  className,
}: StatusViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.p(
    [
      h.Attribute("aria-live", "polite"),
      h.Class(cn(carouselStatusClasses, className)),
    ],
    [`Slide ${current} of ${count}`]
  );
};
