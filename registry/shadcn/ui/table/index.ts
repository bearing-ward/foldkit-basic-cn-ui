import type { Attribute, Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  tableBodyClasses,
  tableCaptionClasses,
  tableCellClasses,
  tableClasses,
  tableContainerClasses,
  tableFooterClasses,
  tableHeadClasses,
  tableHeaderClasses,
  tableRowClasses,
} from "./view";

export {
  tableBodyClasses,
  tableCaptionClasses,
  tableCellClasses,
  tableClasses,
  tableContainerClasses,
  tableFooterClasses,
  tableHeadClasses,
  tableHeaderClasses,
  tableRowClasses,
} from "./view";

type ViewConfig<ParentMessage> = Readonly<{
  children: readonly (Html | string)[];
  className?: string;
  attributes?: readonly Attribute<ParentMessage>[];
}>;

type CellViewConfig<ParentMessage> = ViewConfig<ParentMessage> &
  Readonly<{
    align?: "left" | "right";
  }>;

export type Invoice = Readonly<{
  invoice: string;
  status: string;
  method: string;
  amount: string;
}>;

export const invoices: readonly Invoice[] = [
  {
    invoice: "INV001",
    status: "Paid",
    method: "Credit Card",
    amount: "$250.00",
  },
  { invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  {
    invoice: "INV003",
    status: "Unpaid",
    method: "Bank Transfer",
    amount: "$350.00",
  },
  {
    invoice: "INV004",
    status: "Paid",
    method: "Credit Card",
    amount: "$450.00",
  },
  { invoice: "INV005", status: "Paid", method: "PayPal", amount: "$550.00" },
  {
    invoice: "INV006",
    status: "Pending",
    method: "Bank Transfer",
    amount: "$200.00",
  },
  {
    invoice: "INV007",
    status: "Unpaid",
    method: "Credit Card",
    amount: "$300.00",
  },
];

const cn = (...values: readonly (string | undefined)[]): string =>
  values
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

const textAlignClasses = (align: "left" | "right" | undefined): string =>
  align === "right" ? "text-right" : "text-left";

export const rootView = <ParentMessage>({
  children,
  className,
  attributes = [],
}: ViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "table-container"),
      h.Class(cn(tableContainerClasses, className)),
      ...attributes,
    ],
    [
      h.table(
        [h.DataAttribute("slot", "table"), h.Class(tableClasses)],
        children
      ),
    ]
  );
};

export const headerView = <ParentMessage>({
  children,
  className,
  attributes = [],
}: ViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.thead(
    [
      h.DataAttribute("slot", "table-header"),
      h.Class(cn(tableHeaderClasses, className)),
      ...attributes,
    ],
    children
  );
};

export const bodyView = <ParentMessage>({
  children,
  className,
  attributes = [],
}: ViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.tbody(
    [
      h.DataAttribute("slot", "table-body"),
      h.Class(cn(tableBodyClasses, className)),
      ...attributes,
    ],
    children
  );
};

export const footerView = <ParentMessage>({
  children,
  className,
  attributes = [],
}: ViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.tfoot(
    [
      h.DataAttribute("slot", "table-footer"),
      h.Class(cn(tableFooterClasses, className)),
      ...attributes,
    ],
    children
  );
};

export const rowView = <ParentMessage>({
  children,
  className,
  attributes = [],
}: ViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.tr(
    [
      h.DataAttribute("slot", "table-row"),
      h.Class(cn(tableRowClasses, className)),
      ...attributes,
    ],
    children
  );
};

export const headView = <ParentMessage>({
  children,
  className,
  align,
  attributes = [],
}: CellViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.th(
    [
      h.DataAttribute("slot", "table-head"),
      h.Class(
        cn(tableHeadClasses, textAlignClasses(align), className)
      ),
      ...attributes,
    ],
    children
  );
};

export const cellView = <ParentMessage>({
  children,
  className,
  align,
  attributes = [],
}: CellViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.td(
    [
      h.DataAttribute("slot", "table-cell"),
      h.Class(
        cn(tableCellClasses, textAlignClasses(align), className)
      ),
      ...attributes,
    ],
    children
  );
};

export const captionView = <ParentMessage>(
  children: readonly (Html | string)[],
  className?: string
): Html => {
  const h = html<ParentMessage>();

  return h.caption(
    [
      h.DataAttribute("slot", "table-caption"),
      h.Class(cn(tableCaptionClasses, className)),
    ],
    children
  );
};

export const invoicesTableView = <ParentMessage>(): Html =>
  (() => {
    const h = html<ParentMessage>();

    return rootView<ParentMessage>({
      children: [
        captionView<ParentMessage>(["A list of your recent invoices."]),
        headerView<ParentMessage>({
          children: [
            rowView<ParentMessage>({
              children: [
                headView<ParentMessage>({
                  className: "w-[100px]",
                  children: ["Invoice"],
                }),
                headView<ParentMessage>({ children: ["Status"] }),
                headView<ParentMessage>({ children: ["Method"] }),
                headView<ParentMessage>({
                  align: "right",
                  children: ["Amount"],
                }),
              ],
            }),
          ],
        }),
        bodyView<ParentMessage>({
          children: invoices.map((invoice) =>
            rowView<ParentMessage>({
              children: [
                cellView<ParentMessage>({
                  className: "font-medium",
                  children: [invoice.invoice],
                }),
                cellView<ParentMessage>({ children: [invoice.status] }),
                cellView<ParentMessage>({ children: [invoice.method] }),
                cellView<ParentMessage>({
                  align: "right",
                  children: [invoice.amount],
                }),
              ],
            })
          ),
        }),
        footerView<ParentMessage>({
          children: [
            rowView<ParentMessage>({
              children: [
                cellView<ParentMessage>({
                  className: "font-medium",
                  children: ["Total"],
                }),
                cellView<ParentMessage>({
                  align: "right",
                  attributes: [h.Colspan(3)],
                  children: ["$2,500.00"],
                }),
              ],
            }),
          ],
        }),
      ],
    });
  })();

export const view = invoicesTableView;
