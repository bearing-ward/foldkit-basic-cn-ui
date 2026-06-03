import { Match as M } from "effect";
import type { Ui } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

export const containerClassName =
  "inline-flex min-h-[324px] min-w-[304px] select-none flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm";

export const headerClassName = "flex items-center justify-between gap-2";

export const headingButtonClassName =
  "inline-flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm font-semibold tabular-nums text-gray-900 hover:bg-gray-100";

export const headingTextClassName =
  "text-sm font-semibold tabular-nums text-gray-900";

export const navButtonClassName =
  "inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40";

export const gridClassName = "flex flex-col gap-1 outline-none";

export const headerRowClassName = "grid grid-cols-7 gap-1";

export const columnHeaderClassName =
  "py-1 text-center text-xs font-medium uppercase tracking-wide text-gray-500";

export const weekRowClassName = "grid grid-cols-7 gap-1";

export const cellClassName = "group flex items-center justify-center";

export const dayButtonClassName =
  "flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-sm tabular-nums text-gray-900 hover:bg-gray-100 group-data-[disabled]:cursor-not-allowed group-data-[disabled]:opacity-40 group-data-[focused]:outline-2 group-data-[focused]:outline-offset-2 group-data-[focused]:outline-accent-500 group-data-[outside-month]:text-gray-400 group-data-[selected]:bg-accent-600 group-data-[selected]:text-white! group-data-[selected]:hover:bg-accent-600 group-data-[today]:ring-1 group-data-[today]:ring-gray-400";

export const monthYearGridClassName =
  "grid flex-1 grid-cols-3 grid-rows-4 gap-1 outline-none";

export const monthYearCellClassName = "group flex items-center justify-center";

export const monthYearButtonClassName =
  "flex h-full w-full cursor-pointer items-center justify-center rounded-md text-sm tabular-nums text-gray-900 hover:bg-gray-100 group-data-[disabled]:cursor-not-allowed group-data-[disabled]:opacity-40 group-data-[focused]:outline-2 group-data-[focused]:outline-offset-2 group-data-[focused]:outline-accent-500 group-data-[selected]:bg-accent-600 group-data-[selected]:text-white! group-data-[selected]:hover:bg-accent-600 group-data-[today]:ring-1 group-data-[today]:ring-gray-400";

export const calendarView = (
  attributes: Ui.Calendar.CalendarAttributes
): Html => {
  const h = html<Ui.Calendar.Message>();

  return M.value(attributes).pipe(
    M.tagsExhaustive({
      Days: (days) =>
        h.div(
          [...days.root, h.Class(containerClassName)],
          [
            h.div(
              [h.Class(headerClassName)],
              [
                h.button(
                  [...days.previousMonthButton, h.Class(navButtonClassName)],
                  ["<"]
                ),
                h.button(
                  [
                    h.Id(days.heading.id),
                    ...days.headingButton,
                    h.Class(headingButtonClassName),
                  ],
                  [days.heading.text]
                ),
                h.button(
                  [...days.nextMonthButton, h.Class(navButtonClassName)],
                  [">"]
                ),
              ]
            ),
            h.div(
              [...days.grid, h.Class(gridClassName)],
              [
                h.div(
                  [...days.headerRow, h.Class(headerRowClassName)],
                  days.columnHeaders.map((header) =>
                    h.div(
                      [...header.attributes, h.Class(columnHeaderClassName)],
                      [header.name]
                    )
                  )
                ),
                ...days.weeks.map((week) =>
                  h.div(
                    [...week.attributes, h.Class(weekRowClassName)],
                    week.cells.map((cell) =>
                      h.div(
                        [...cell.cellAttributes, h.Class(cellClassName)],
                        [
                          h.button(
                            [
                              ...cell.buttonAttributes,
                              h.Class(dayButtonClassName),
                            ],
                            [cell.label]
                          ),
                        ]
                      )
                    )
                  )
                ),
              ]
            ),
          ]
        ),
      Months: (months) =>
        h.div(
          [...months.root, h.Class(containerClassName)],
          [
            h.div(
              [h.Class(`${headerClassName} justify-center`)],
              [
                h.button(
                  [
                    h.Id(months.heading.id),
                    ...months.headingButton,
                    h.Class(headingButtonClassName),
                  ],
                  [months.heading.text]
                ),
              ]
            ),
            h.div(
              [...months.grid, h.Class(monthYearGridClassName)],
              months.cells.map((cell) =>
                h.div(
                  [...cell.cellAttributes, h.Class(monthYearCellClassName)],
                  [
                    h.button(
                      [
                        ...cell.buttonAttributes,
                        h.Class(monthYearButtonClassName),
                      ],
                      [cell.shortLabel]
                    ),
                  ]
                )
              )
            ),
          ]
        ),
      Years: (years) =>
        h.div(
          [...years.root, h.Class(containerClassName)],
          [
            h.div(
              [h.Class(headerClassName)],
              [
                h.button(
                  [...years.previousPageButton, h.Class(navButtonClassName)],
                  ["<"]
                ),
                h.h2(
                  [h.Id(years.heading.id), h.Class(headingTextClassName)],
                  [years.heading.text]
                ),
                h.button(
                  [...years.nextPageButton, h.Class(navButtonClassName)],
                  [">"]
                ),
              ]
            ),
            h.div(
              [...years.grid, h.Class(monthYearGridClassName)],
              years.cells.map((cell) =>
                h.div(
                  [...cell.cellAttributes, h.Class(monthYearCellClassName)],
                  [
                    h.button(
                      [
                        ...cell.buttonAttributes,
                        h.Class(monthYearButtonClassName),
                      ],
                      [cell.label]
                    ),
                  ]
                )
              )
            ),
          ]
        ),
    })
  );
};
