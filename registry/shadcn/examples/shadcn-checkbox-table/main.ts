import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Checkbox from "../../ui/shadcn-checkbox";

// MODEL

export const RowId = S.Union([
  S.Literal("sarah-chen"),
  S.Literal("marcus-rodriguez"),
  S.Literal("priya-patel"),
  S.Literal("david-kim"),
]);
export type RowId = typeof RowId.Type;

export const Model = S.Struct({
  selectedRows: S.Array(RowId),
});

export type Model = typeof Model.Type;

// MESSAGE

export const ToggledRow = m("ToggledRow", { id: RowId });
export const ToggledAllRows = m("ToggledAllRows");

export const Message = S.Union([ToggledRow, ToggledAllRows]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ selectedRows: [] }, []];

// UPDATE

const allRows: ReadonlyArray<RowId> = [
  "sarah-chen",
  "marcus-rodriguez",
  "priya-patel",
  "david-kim",
];

const toggleRow = (
  selectedRows: ReadonlyArray<RowId>,
  id: RowId
): ReadonlyArray<RowId> =>
  selectedRows.includes(id)
    ? selectedRows.filter((rowId) => rowId !== id)
    : [...selectedRows, id];

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ToggledRow: ({ id }) => [
        evo(model, { selectedRows: (selectedRows) => toggleRow(selectedRows, id) }),
        [],
      ],
      ToggledAllRows: () => [
        evo(model, {
          selectedRows: (selectedRows) =>
            selectedRows.length === allRows.length ? [] : allRows,
        }),
        [],
      ],
    })
  );

// VIEW

type Person = {
  readonly id: RowId;
  readonly name: string;
  readonly email: string;
  readonly role: string;
};

const people: ReadonlyArray<Person> = [
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    role: "Admin",
  },
  {
    id: "marcus-rodriguez",
    name: "Marcus Rodriguez",
    email: "marcus.rodriguez@example.com",
    role: "User",
  },
  {
    id: "priya-patel",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    role: "User",
  },
  {
    id: "david-kim",
    name: "David Kim",
    email: "david.kim@example.com",
    role: "Editor",
  },
];

const checkboxButton = (
  label: string,
  isChecked: boolean,
  message: Message
): Html => {
  const h = html<Message>();

  return h.button(
    [
      h.Type("button"),
      h.Role("checkbox"),
      h.AriaLabel(label),
      h.AriaChecked(isChecked),
      h.OnClick(message),
      h.Class(Checkbox.shadcnCheckboxControlClassName),
    ],
    isChecked ? ["✓"] : []
  );
};

const personRowView = (
  person: Person,
  selectedRows: ReadonlyArray<RowId>
): Html => {
  const h = html<Message>();
  const isChecked = selectedRows.includes(person.id);

  return h.tr(
    [h.DataAttribute("selected", isChecked ? "true" : "false")],
    [
      h.td([h.Class("w-10 p-2")], [
        checkboxButton(
          `Select row ${person.name}`,
          isChecked,
          ToggledRow({ id: person.id })
        ),
      ]),
      h.td([h.Class("p-2 font-medium")], [person.name]),
      h.td([h.Class("p-2 text-muted-foreground")], [person.email]),
      h.td([h.Class("p-2")], [person.role]),
    ]
  );
};

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const allSelected = model.selectedRows.length === allRows.length;

  return h.div(
    [h.Class("w-full overflow-hidden rounded-md border")],
    [
      h.table(
        [h.Class("w-full caption-bottom text-sm")],
        [
          h.thead(
            [h.Class("border-b bg-muted/50")],
            [
              h.tr(
                [],
                [
                  h.th([h.Class("w-10 p-2 text-left")], [
                    checkboxButton(
                      "Select all rows",
                      allSelected,
                      ToggledAllRows()
                    ),
                  ]),
                  h.th([h.Class("p-2 text-left font-medium")], ["Name"]),
                  h.th([h.Class("p-2 text-left font-medium")], ["Email"]),
                  h.th([h.Class("p-2 text-left font-medium")], ["Role"]),
                ]
              ),
            ]
          ),
          h.tbody([], people.map((person) => personRowView(person, model.selectedRows))),
        ]
      ),
    ]
  );
});
