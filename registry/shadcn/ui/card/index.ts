import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  cardClasses,
  cardActionClasses,
  cardContentClasses,
  cardDescriptionClasses,
  cardFooterClasses,
  cardHeaderClasses,
  cardTitleClasses,
} from "./view";

export {
  cardActionClasses,
  cardClasses,
  cardContentClasses,
  cardDescriptionClasses,
  cardFooterClasses,
  cardHeaderClasses,
  cardTitleClasses,
} from "./view";

const cn = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const view = <ParentMessage>(
  children: readonly Html[],
  className?: string,
  size: "Default" | "Small" = "Default"
): Html => {
  const h = html<ParentMessage>();
  return h.div(
    [
      h.DataAttribute("slot", "card"),
      h.DataAttribute("size", size === "Small" ? "sm" : "default"),
      h.Class(cn(cardClasses, className)),
    ],
    children
  );
};

export const headerView = <ParentMessage>(
  children: readonly Html[],
  className?: string
): Html => {
  const h = html<ParentMessage>();
  return h.div(
    [
      h.DataAttribute("slot", "card-header"),
      h.Class(cn(cardHeaderClasses, className)),
    ],
    children
  );
};

export const titleView = <ParentMessage>(
  label: string,
  className?: string
): Html => {
  const h = html<ParentMessage>();
  return h.h3(
    [
      h.DataAttribute("slot", "card-title"),
      h.Class(cn(cardTitleClasses, className)),
    ],
    [label]
  );
};

export const descriptionView = <ParentMessage>(
  label: string,
  className?: string
): Html => {
  const h = html<ParentMessage>();
  return h.p(
    [
      h.DataAttribute("slot", "card-description"),
      h.Class(cn(cardDescriptionClasses, className)),
    ],
    [label]
  );
};

export const actionView = <ParentMessage>(
  children: readonly Html[],
  className?: string
): Html => {
  const h = html<ParentMessage>();
  return h.div(
    [
      h.DataAttribute("slot", "card-action"),
      h.Class(cn(cardActionClasses, className)),
    ],
    children
  );
};

export const contentView = <ParentMessage>(
  children: readonly Html[],
  className?: string
): Html => {
  const h = html<ParentMessage>();
  return h.div(
    [
      h.DataAttribute("slot", "card-content"),
      h.Class(cn(cardContentClasses, className)),
    ],
    children
  );
};

export const footerView = <ParentMessage>(
  children: readonly Html[],
  className?: string
): Html => {
  const h = html<ParentMessage>();
  return h.div(
    [
      h.DataAttribute("slot", "card-footer"),
      h.Class(cn(cardFooterClasses, className)),
    ],
    children
  );
};
