import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  h1ClassName,
  h2ClassName,
  h3ClassName,
  h4ClassName,
  blockquoteClassName,
  inlineCodeClassName,
  largeClassName,
  leadClassName,
  listClassName,
  mutedClassName,
  paragraphClassName,
  smallClassName,
  tableCellClassName,
  tableClassName,
  tableHeaderCellClassName,
  tableWrapperClassName,
} from "./view";

export {
  h1ClassName,
  h2ClassName,
  h3ClassName,
  h4ClassName,
  blockquoteClassName,
  inlineCodeClassName,
  largeClassName,
  leadClassName,
  listClassName,
  mutedClassName,
  paragraphClassName,
  smallClassName,
  tableCellClassName,
  tableClassName,
  tableHeaderCellClassName,
  tableWrapperClassName,
} from "./view";

const classNames = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const h1 = <ParentMessage>(label: string, className?: string): Html => {
  const h = html<ParentMessage>();
  return h.h1([h.Class(classNames(h1ClassName, className))], [label]);
};

export const h2 = <ParentMessage>(label: string, className?: string): Html => {
  const h = html<ParentMessage>();
  return h.h2([h.Class(classNames(h2ClassName, className))], [label]);
};

export const h3 = <ParentMessage>(label: string, className?: string): Html => {
  const h = html<ParentMessage>();
  return h.h3([h.Class(classNames(h3ClassName, className))], [label]);
};

export const h4 = <ParentMessage>(label: string, className?: string): Html => {
  const h = html<ParentMessage>();
  return h.h4([h.Class(classNames(h4ClassName, className))], [label]);
};

export const p = <ParentMessage>(label: string, className?: string): Html => {
  const h = html<ParentMessage>();
  return h.p([h.Class(classNames(paragraphClassName, className))], [label]);
};

export const blockquote = <ParentMessage>(
  label: string,
  className?: string
): Html => {
  const h = html<ParentMessage>();
  return h.blockquote(
    [h.Class(classNames(blockquoteClassName, className))],
    [label]
  );
};

export const table = <ParentMessage>(
  headers: readonly string[],
  rows: readonly (readonly string[])[],
  className?: string
): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [h.Class(classNames(tableWrapperClassName, className))],
    [
      h.table(
        [h.Class(tableClassName)],
        [
          h.thead(
            [],
            [
              h.tr(
                [],
                headers.map((header) =>
                  h.th([h.Class(tableHeaderCellClassName)], [header])
                )
              ),
            ]
          ),
          h.tbody(
            [],
            rows.map((row) =>
              h.tr(
                [],
                row.map((cell) => h.td([h.Class(tableCellClassName)], [cell]))
              )
            )
          ),
        ]
      ),
    ]
  );
};

export const lead = <ParentMessage>(
  label: string,
  className?: string
): Html => {
  const h = html<ParentMessage>();
  return h.p([h.Class(classNames(leadClassName, className))], [label]);
};

export const large = <ParentMessage>(
  label: string,
  className?: string
): Html => {
  const h = html<ParentMessage>();
  return h.div([h.Class(classNames(largeClassName, className))], [label]);
};

export const small = <ParentMessage>(
  label: string,
  className?: string
): Html => {
  const h = html<ParentMessage>();
  return h.small([h.Class(classNames(smallClassName, className))], [label]);
};

export const muted = <ParentMessage>(
  label: string,
  className?: string
): Html => {
  const h = html<ParentMessage>();
  return h.p([h.Class(classNames(mutedClassName, className))], [label]);
};

export const inlineCode = <ParentMessage>(
  label: string,
  className?: string
): Html => {
  const h = html<ParentMessage>();
  return h.code([h.Class(classNames(inlineCodeClassName, className))], [label]);
};

export const ul = <ParentMessage>(
  items: readonly string[],
  className?: string
): Html => {
  const h = html<ParentMessage>();
  return h.ul(
    [h.Class(classNames(listClassName, className))],
    items.map((item) => h.li([], [item]))
  );
};
