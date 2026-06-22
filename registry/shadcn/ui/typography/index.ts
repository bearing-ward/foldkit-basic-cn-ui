import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  h1Classes,
  h2Classes,
  h3Classes,
  h4Classes,
  blockquoteClasses,
  inlineCodeClasses,
  largeClasses,
  leadClasses,
  listClasses,
  mutedClasses,
  paragraphClasses,
  smallClasses,
  tableCellClasses,
  tableClasses,
  tableHeaderCellClasses,
  tableWrapperClasses,
} from "./view";

export {
  h1Classes,
  h2Classes,
  h3Classes,
  h4Classes,
  blockquoteClasses,
  inlineCodeClasses,
  largeClasses,
  leadClasses,
  listClasses,
  mutedClasses,
  paragraphClasses,
  smallClasses,
  tableCellClasses,
  tableClasses,
  tableHeaderCellClasses,
  tableWrapperClasses,
} from "./view";

const cn = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const h1 = <ParentMessage>(label: string, className?: string): Html => {
  const h = html<ParentMessage>();
  return h.h1([h.Class(cn(h1Classes, className))], [label]);
};

export const h2 = <ParentMessage>(label: string, className?: string): Html => {
  const h = html<ParentMessage>();
  return h.h2([h.Class(cn(h2Classes, className))], [label]);
};

export const h3 = <ParentMessage>(label: string, className?: string): Html => {
  const h = html<ParentMessage>();
  return h.h3([h.Class(cn(h3Classes, className))], [label]);
};

export const h4 = <ParentMessage>(label: string, className?: string): Html => {
  const h = html<ParentMessage>();
  return h.h4([h.Class(cn(h4Classes, className))], [label]);
};

export const p = <ParentMessage>(label: string, className?: string): Html => {
  const h = html<ParentMessage>();
  return h.p([h.Class(cn(paragraphClasses, className))], [label]);
};

export const blockquote = <ParentMessage>(
  label: string,
  className?: string
): Html => {
  const h = html<ParentMessage>();
  return h.blockquote(
    [h.Class(cn(blockquoteClasses, className))],
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
    [h.Class(cn(tableWrapperClasses, className))],
    [
      h.table(
        [h.Class(tableClasses)],
        [
          h.thead(
            [],
            [
              h.tr(
                [],
                headers.map((header) =>
                  h.th([h.Class(tableHeaderCellClasses)], [header])
                )
              ),
            ]
          ),
          h.tbody(
            [],
            rows.map((row) =>
              h.tr(
                [],
                row.map((cell) => h.td([h.Class(tableCellClasses)], [cell]))
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
  return h.p([h.Class(cn(leadClasses, className))], [label]);
};

export const large = <ParentMessage>(
  label: string,
  className?: string
): Html => {
  const h = html<ParentMessage>();
  return h.div([h.Class(cn(largeClasses, className))], [label]);
};

export const small = <ParentMessage>(
  label: string,
  className?: string
): Html => {
  const h = html<ParentMessage>();
  return h.small([h.Class(cn(smallClasses, className))], [label]);
};

export const muted = <ParentMessage>(
  label: string,
  className?: string
): Html => {
  const h = html<ParentMessage>();
  return h.p([h.Class(cn(mutedClasses, className))], [label]);
};

export const inlineCode = <ParentMessage>(
  label: string,
  className?: string
): Html => {
  const h = html<ParentMessage>();
  return h.code([h.Class(cn(inlineCodeClasses, className))], [label]);
};

export const ul = <ParentMessage>(
  items: readonly string[],
  className?: string
): Html => {
  const h = html<ParentMessage>();
  return h.ul(
    [h.Class(cn(listClasses, className))],
    items.map((item) => h.li([], [item]))
  );
};
