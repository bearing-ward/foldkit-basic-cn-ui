import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  cardClassName,
  cardActionClassName,
  cardContentClassName,
  cardDescriptionClassName,
  cardFooterClassName,
  cardHeaderClassName,
  cardTitleClassName,
} from "./view";

export {
  cardActionClassName,
  cardClassName,
  cardContentClassName,
  cardDescriptionClassName,
  cardFooterClassName,
  cardHeaderClassName,
  cardTitleClassName,
} from "./view";

const classNames = (base: string, className?: string): string =>
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
      h.Class(classNames(cardClassName, className)),
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
      h.Class(classNames(cardHeaderClassName, className)),
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
      h.Class(classNames(cardTitleClassName, className)),
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
      h.Class(classNames(cardDescriptionClassName, className)),
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
      h.Class(classNames(cardActionClassName, className)),
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
      h.Class(classNames(cardContentClassName, className)),
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
      h.Class(classNames(cardFooterClassName, className)),
    ],
    children
  );
};
