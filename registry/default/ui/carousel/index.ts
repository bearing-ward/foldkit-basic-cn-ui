import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  carouselButtonClassName,
  carouselClassName,
  carouselContentClassName,
  carouselItemClassName,
  carouselNextClassName,
  carouselPreviousClassName,
  carouselStatusClassName,
  carouselVerticalContentClassName,
  carouselViewportClassName,
} from "./view";
import type { CarouselOrientation } from "./view";

export type { CarouselOrientation };
export {
  carouselButtonClassName,
  carouselCardClassName,
  carouselClassName,
  carouselContentClassName,
  carouselItemClassName,
  carouselNextClassName,
  carouselPreviousClassName,
  carouselStatusClassName,
  carouselVerticalContentClassName,
  carouselViewportClassName,
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

const classNames = (base: string, className?: string): string =>
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
      h.Class(classNames(carouselClassName, className)),
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
      h.Class(classNames(carouselViewportClassName, className)),
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
      ? carouselVerticalContentClassName
      : carouselContentClassName;

  return h.div(
    [
      h.DataAttribute("slot", "carousel-content"),
      h.DataAttribute("orientation", orientation),
      h.Style({ transform }),
      h.Class(classNames(base, className)),
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
      h.Class(classNames(carouselItemClassName, className)),
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
  const positionClassName =
    direction === "previous"
      ? carouselPreviousClassName
      : carouselNextClassName;

  return h.button(
    [
      h.Type("button"),
      h.AriaLabel(label),
      h.OnClick(onClick),
      h.Class(
        classNames(`${carouselButtonClassName} ${positionClassName}`, className)
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
      h.Class(classNames(carouselStatusClassName, className)),
    ],
    [`Slide ${current} of ${count}`]
  );
};
