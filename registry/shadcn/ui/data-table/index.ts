import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  dataTableButtonClasses,
  dataTableCellClasses,
  dataTableCheckboxCellClasses,
  dataTableContainerClasses,
  dataTableEmptyCellClasses,
  dataTableFooterClasses,
  dataTableHeadClasses,
  dataTableHeaderClasses,
  dataTableRowClasses,
  dataTableTableClasses,
  dataTableToolbarClasses,
} from "./view";

export {
  dataTableButtonClasses,
  dataTableCellClasses,
  dataTableCheckboxCellClasses,
  dataTableContainerClasses,
  dataTableEmptyCellClasses,
  dataTableFooterClasses,
  dataTableHeadClasses,
  dataTableHeaderClasses,
  dataTableInputClasses,
  dataTableMenuClasses,
  dataTableMenuItemClasses,
  dataTableRowClasses,
  dataTableTableClasses,
  dataTableToolbarClasses,
} from "./view";

/** Payment status values used by the shadcn data-table guide examples. */
export type PaymentStatus = "pending" | "processing" | "success" | "failed";

/** Row shape mirrored from the shadcn data-table guide. */
export type Payment = Readonly<{
  id: string;
  amount: number;
  status: PaymentStatus;
  email: string;
}>;

/** Sort direction for one sortable column. */
export type SortDirection = "ascending" | "descending";

/** Parent-owned sort state. */
export type SortState = Readonly<{
  column: "email" | "amount" | "status";
  direction: SortDirection;
}>;

/** Parent-owned visible column state. */
export type VisibilityState = Readonly<{
  status: boolean;
  email: boolean;
  amount: boolean;
}>;

/** Parent-owned selected row ids keyed by payment id. */
export type RowSelectionState = Readonly<Record<string, boolean>>;

/** Parent-owned pagination state. */
export type PaginationState = Readonly<{
  pageIndex: number;
  pageSize: number;
}>;

/** Config for the root overflow container. */
export type ContainerViewConfig = Readonly<{
  children: readonly (Html | string)[];
  classes?: string;
}>;

/** Config for toolbar layout around filters and column controls. */
export type ToolbarViewConfig = Readonly<{
  children: readonly (Html | string)[];
  classes?: string;
}>;

/** Config for rendering the payment table. */
export type PaymentsTableViewConfig<ParentMessage> = Readonly<{
  payments: readonly Payment[];
  visibleColumns?: VisibilityState;
  selectedRows?: RowSelectionState;
  onToggleRow?: (id: string) => ParentMessage;
  onToggleAllVisible?: ParentMessage;
  actionView?: (payment: Payment) => Html;
  emptyMessage?: string;
}>;

/** Config for a sortable column header button. */
export type SortHeaderViewConfig<ParentMessage> = Readonly<{
  label: string;
  active?: boolean;
  direction?: SortDirection;
  onClick: ParentMessage;
}>;

/** Config for pagination footer controls. */
export type PaginationViewConfig<ParentMessage> = Readonly<{
  pagination: PaginationState;
  totalRows: number;
  onPrevious: ParentMessage;
  onNext: ParentMessage;
}>;

const defaultVisibility: VisibilityState = {
  status: true,
  email: true,
  amount: true,
};

const cn = (base: string, classes?: string): string =>
  [base, classes]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const payments: readonly Payment[] = [
  { id: "728ed52f", amount: 100, status: "pending", email: "m@example.com" },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "6f4922f455",
    amount: 316,
    status: "success",
    email: "ken99@example.com",
  },
  {
    id: "a1b2c3d4",
    amount: 242,
    status: "success",
    email: "Abe45@example.com",
  },
  {
    id: "b2c3d4e5",
    amount: 837,
    status: "processing",
    email: "Monserrat44@example.com",
  },
  {
    id: "c3d4e5f6",
    amount: 874,
    status: "success",
    email: "Silas22@example.com",
  },
  {
    id: "d4e5f6g7",
    amount: 721,
    status: "failed",
    email: "carmella@example.com",
  },
];

export const formatAmount = (amount: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

export const filterPayments = (
  rows: readonly Payment[],
  emailFilter: string
): readonly Payment[] => {
  const needle = emailFilter.trim().toLowerCase();

  if (needle === "") {
    return rows;
  }

  return rows.filter((payment) => payment.email.toLowerCase().includes(needle));
};

export const toggleSort = (
  current: SortState,
  column: SortState["column"]
): SortState => {
  if (current.column !== column) {
    return { column, direction: "ascending" };
  }

  return {
    column,
    direction: current.direction === "ascending" ? "descending" : "ascending",
  };
};

export const sortPayments = (
  rows: readonly Payment[],
  sort: SortState
): readonly Payment[] => {
  const sorted = [...rows];
  sorted.sort((left, right) => {
    const leftValue = left[sort.column];
    const rightValue = right[sort.column];
    const result =
      typeof leftValue === "number" && typeof rightValue === "number"
        ? leftValue - rightValue
        : String(leftValue).localeCompare(String(rightValue));

    return sort.direction === "ascending" ? result : -result;
  });

  return sorted;
};

export const pageCount = (
  totalRows: number,
  pagination: PaginationState
): number => Math.max(1, Math.ceil(totalRows / pagination.pageSize));

export const paginatePayments = (
  rows: readonly Payment[],
  pagination: PaginationState
): readonly Payment[] => {
  const start = pagination.pageIndex * pagination.pageSize;

  return rows.slice(start, start + pagination.pageSize);
};

export const nextPage = (
  pagination: PaginationState,
  totalRows: number
): PaginationState => ({
  ...pagination,
  pageIndex: Math.min(
    pagination.pageIndex + 1,
    pageCount(totalRows, pagination) - 1
  ),
});

export const previousPage = (pagination: PaginationState): PaginationState => ({
  ...pagination,
  pageIndex: Math.max(0, pagination.pageIndex - 1),
});

export const toggleRowSelection = (
  selection: RowSelectionState,
  id: string
): RowSelectionState => ({
  ...selection,
  [id]: !(selection[id] ?? false),
});

export const toggleVisibleSelection = (
  selection: RowSelectionState,
  rows: readonly Payment[]
): RowSelectionState => {
  const allSelected = rows.every((row) => selection[row.id] === true);

  return {
    ...selection,
    ...Object.fromEntries(rows.map((row) => [row.id, !allSelected])),
  };
};

export const selectedCount = (selection: RowSelectionState): number =>
  Object.values(selection).filter(Boolean).length;

/** Renders the rounded data-table container. */
export const containerView = <ParentMessage>({
  children,
  classes,
}: ContainerViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "data-table"),
      h.Class(cn(dataTableContainerClasses, classes)),
    ],
    children
  );
};

/** Renders the shadcn-style toolbar row. */
export const toolbarView = <ParentMessage>({
  children,
  classes,
}: ToolbarViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [h.Class(cn(dataTableToolbarClasses, classes))],
    children
  );
};

/** Renders a sortable header button for parent-owned sorting state. */
export const sortHeaderView = <ParentMessage>({
  label,
  active = false,
  direction = "ascending",
  onClick,
}: SortHeaderViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();
  const icon = active ? (direction === "ascending" ? "↑" : "↓") : "↕";

  return h.button(
    [
      h.Type("button"),
      h.AriaLabel(label),
      h.OnClick(onClick),
      h.Class("inline-flex items-center gap-2"),
    ],
    [label, h.span([h.Attribute("aria-hidden", "true")], [icon])]
  );
};

/** Renders payments with optional selection and action columns. */
export const paymentsTableView = <ParentMessage>({
  payments: rows,
  visibleColumns = defaultVisibility,
  selectedRows = {},
  onToggleRow,
  onToggleAllVisible,
  actionView,
  emptyMessage = "No results.",
}: PaymentsTableViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();
  const hasSelection =
    onToggleRow !== undefined || onToggleAllVisible !== undefined;
  const hasActions = actionView !== undefined;
  const columnCount =
    Number(hasSelection) +
    Number(visibleColumns.status) +
    Number(visibleColumns.email) +
    Number(visibleColumns.amount) +
    Number(hasActions);
  const visibleSelected =
    rows.length > 0 && rows.every((row) => selectedRows[row.id] === true);

  return containerView<ParentMessage>({
    children: [
      h.table(
        [h.Class(dataTableTableClasses)],
        [
          h.thead(
            [h.Class(dataTableHeaderClasses)],
            [
              h.tr(
                [],
                [
                  ...(hasSelection
                    ? [
                        h.th(
                          [h.Class(dataTableCheckboxCellClasses)],
                          [
                            h.input([
                              h.Type("checkbox"),
                              h.AriaLabel("Select all visible rows"),
                              ...(visibleSelected
                                ? [h.Attribute("checked", "")]
                                : []),
                              ...(onToggleAllVisible === undefined
                                ? [h.Attribute("disabled", "")]
                                : [h.OnClick(onToggleAllVisible)]),
                            ]),
                          ]
                        ),
                      ]
                    : []),
                  ...(visibleColumns.status
                    ? [h.th([h.Class(dataTableHeadClasses)], ["Status"])]
                    : []),
                  ...(visibleColumns.email
                    ? [h.th([h.Class(dataTableHeadClasses)], ["Email"])]
                    : []),
                  ...(visibleColumns.amount
                    ? [h.th([h.Class(dataTableHeadClasses)], ["Amount"])]
                    : []),
                  ...(hasActions
                    ? [h.th([h.Class(dataTableHeadClasses)], [""])]
                    : []),
                ]
              ),
            ]
          ),
          h.tbody(
            [],
            rows.length === 0
              ? [
                  h.tr(
                    [],
                    [
                      h.td(
                        [
                          h.Attribute("colspan", String(columnCount)),
                          h.Class(dataTableEmptyCellClasses),
                        ],
                        [emptyMessage]
                      ),
                    ]
                  ),
                ]
              : rows.map((payment) =>
                  h.tr(
                    [
                      h.DataAttribute(
                        "selected",
                        selectedRows[payment.id] === true ? "true" : "false"
                      ),
                      h.Class(dataTableRowClasses),
                    ],
                    [
                      ...(hasSelection
                        ? [
                            h.td(
                              [h.Class(dataTableCheckboxCellClasses)],
                              [
                                h.input([
                                  h.Type("checkbox"),
                                  h.AriaLabel(`Select row ${payment.email}`),
                                  ...(selectedRows[payment.id] === true
                                    ? [h.Attribute("checked", "")]
                                    : []),
                                  ...(onToggleRow === undefined
                                    ? [h.Attribute("disabled", "")]
                                    : [h.OnClick(onToggleRow(payment.id))]),
                                ]),
                              ]
                            ),
                          ]
                        : []),
                      ...(visibleColumns.status
                        ? [
                            h.td(
                              [h.Class(dataTableCellClasses)],
                              [payment.status]
                            ),
                          ]
                        : []),
                      ...(visibleColumns.email
                        ? [
                            h.td(
                              [h.Class(dataTableCellClasses)],
                              [payment.email]
                            ),
                          ]
                        : []),
                      ...(visibleColumns.amount
                        ? [
                            h.td(
                              [
                                h.Class(
                                  `${
                                    dataTableCellClasses
                                  } text-right font-medium`
                                ),
                              ],
                              [formatAmount(payment.amount)]
                            ),
                          ]
                        : []),
                      ...(actionView === undefined
                        ? []
                        : [
                            h.td(
                              [h.Class(`${dataTableCellClasses} text-right`)],
                              [actionView(payment)]
                            ),
                          ]),
                    ]
                  )
                )
          ),
        ]
      ),
    ],
  });
};

/** Renders pagination status and previous/next controls. */
export const paginationView = <ParentMessage>({
  pagination,
  totalRows,
  onPrevious,
  onNext,
}: PaginationViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();
  const pages = pageCount(totalRows, pagination);

  return h.div(
    [h.Class(dataTableFooterClasses)],
    [
      h.p([], [`Page ${String(pagination.pageIndex + 1)} of ${String(pages)}`]),
      h.div(
        [h.Class("flex items-center gap-2")],
        [
          h.button(
            [
              h.Type("button"),
              h.Class(dataTableButtonClasses),
              ...(pagination.pageIndex === 0
                ? [h.Attribute("disabled", "")]
                : [h.OnClick(onPrevious)]),
            ],
            ["Previous"]
          ),
          h.button(
            [
              h.Type("button"),
              h.Class(dataTableButtonClasses),
              ...(pagination.pageIndex >= pages - 1
                ? [h.Attribute("disabled", "")]
                : [h.OnClick(onNext)]),
            ],
            ["Next"]
          ),
        ]
      ),
    ]
  );
};

export const selectionSummaryView = <ParentMessage>({
  selected,
  total,
}: Readonly<{ selected: number; total: number }>): Html => {
  const h = html<ParentMessage>();

  return h.p(
    [h.Class("text-sm text-gray-600")],
    [`${String(selected)} of ${String(total)} row(s) selected.`]
  );
};
