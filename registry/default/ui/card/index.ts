import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  cardClassName,
  cardContentClassName,
  cardDescriptionClassName,
  cardFooterClassName,
  cardHeaderClassName,
  cardTitleClassName,
} from "./view";

export {
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
  className?: string
): Html => {
  const h = html<ParentMessage>();
  return h.div([h.Class(classNames(cardClassName, className))], children);
};

export const headerView = <ParentMessage>(
  children: readonly Html[],
  className?: string
): Html => {
  const h = html<ParentMessage>();
  return h.div([h.Class(classNames(cardHeaderClassName, className))], children);
};

export const titleView = <ParentMessage>(
  label: string,
  className?: string
): Html => {
  const h = html<ParentMessage>();
  return h.h3([h.Class(classNames(cardTitleClassName, className))], [label]);
};

export const descriptionView = <ParentMessage>(
  label: string,
  className?: string
): Html => {
  const h = html<ParentMessage>();
  return h.p(
    [h.Class(classNames(cardDescriptionClassName, className))],
    [label]
  );
};

export const contentView = <ParentMessage>(
  children: readonly Html[],
  className?: string
): Html => {
  const h = html<ParentMessage>();
  return h.div(
    [h.Class(classNames(cardContentClassName, className))],
    children
  );
};

export const footerView = <ParentMessage>(
  children: readonly Html[],
  className?: string
): Html => {
  const h = html<ParentMessage>();
  return h.div([h.Class(classNames(cardFooterClassName, className))], children);
};
