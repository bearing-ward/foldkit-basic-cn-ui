import { Array, Match as M, Option, Schema as S } from "effect";
import type { Command } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

// MODEL

export type ApiReferenceBadge = Readonly<{
  label: string;
  tone: "neutral" | "required" | "optional" | "source" | "a11y";
}>;

export type ApiReferenceRow = Readonly<{
  id: string;
  name: string;
  category: string;
  typeLabel: string;
  signature: string;
  description: string;
  badges: readonly ApiReferenceBadge[];
  defaultValue?: string | undefined;
  source?: string | undefined;
  details: readonly string[];
}>;

export type ApiReferenceGroup = Readonly<{
  id: string;
  label: string;
  summary: string;
  rows: readonly ApiReferenceRow[];
}>;

export type ApiReferenceConfig = Readonly<{
  title: string;
  summary: string;
  groups: readonly ApiReferenceGroup[];
}>;

export const Model = S.Struct({
  query: S.String,
  selectedGroupId: S.String,
  maybeSelectedCategory: S.Option(S.String),
});
export type Model = typeof Model.Type;

// MESSAGE

export const UpdatedApiReferenceQuery = m("UpdatedApiReferenceQuery", {
  value: S.String,
});
export const SelectedApiReferenceGroup = m("SelectedApiReferenceGroup", {
  groupId: S.String,
});
export const SelectedApiReferenceCategory = m(
  "SelectedApiReferenceCategory",
  { category: S.String }
);
export const ClearedApiReferenceCategory = m("ClearedApiReferenceCategory");
export const Message = S.Union([
  UpdatedApiReferenceQuery,
  SelectedApiReferenceGroup,
  SelectedApiReferenceCategory,
  ClearedApiReferenceCategory,
]);
export type Message = typeof Message.Type;

// INIT

type UpdateReturn = readonly [Model, readonly Command.Command<Message>[]];

const withUpdateReturn = M.withReturnType<UpdateReturn>();

export const init = (config: ApiReferenceConfig): UpdateReturn => [
  {
    query: "",
    selectedGroupId: Array.match(config.groups, {
      onEmpty: () => "",
      onNonEmpty: (groups) => groups[0].id,
    }),
    maybeSelectedCategory: Option.none(),
  },
  [],
];

// UPDATE

export const update = (model: Model, message: Message): UpdateReturn =>
  M.value(message).pipe(
    withUpdateReturn,
    M.tagsExhaustive({
      UpdatedApiReferenceQuery: ({ value }) => [
        evo(model, { query: () => value }),
        [],
      ],
      SelectedApiReferenceGroup: ({ groupId }) => [
        evo(model, {
          selectedGroupId: () => groupId,
          maybeSelectedCategory: () => Option.none(),
        }),
        [],
      ],
      SelectedApiReferenceCategory: ({ category }) => [
        evo(model, { maybeSelectedCategory: () => Option.some(category) }),
        [],
      ],
      ClearedApiReferenceCategory: () => [
        evo(model, { maybeSelectedCategory: () => Option.none() }),
        [],
      ],
    })
  );

// VIEW

type CategoryCount = Readonly<{
  category: string;
  count: number;
}>;

const shellClasses =
  "rounded-[8px] border border-slate-200 bg-white text-slate-950 shadow-sm";
const headerClasses =
  "grid gap-4 border-b border-slate-200 p-4 lg:grid-cols-[minmax(0,1fr)_minmax(240px,320px)] lg:items-end";
const eyebrowClasses =
  "font-mono text-xs font-medium uppercase text-slate-500";
const searchInputClasses =
  "h-10 w-full rounded-[6px] border border-slate-300 bg-white px-3 font-mono text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100";
const groupButtonBaseClasses =
  "inline-flex h-9 items-center gap-2 rounded-[6px] border px-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500";
const categoryButtonBaseClasses =
  "grid h-9 w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-[6px] border px-3 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500";
const rowClasses =
  "grid gap-3 border-b border-slate-200 p-4 last:border-b-0";

const selectedGroup = (
  config: ApiReferenceConfig,
  model: Model
): Option.Option<ApiReferenceGroup> =>
  Array.findFirst(
    config.groups,
    (group) => group.id === model.selectedGroupId
  ).pipe(Option.orElse(() => Array.head(config.groups)));

const categoryCounts = (
  rows: readonly ApiReferenceRow[]
): readonly CategoryCount[] => {
  const categories = rows.map((row) => row.category);
  const uniqueCategories = categories.filter(
    (category, index) => categories.indexOf(category) === index
  );

  return uniqueCategories.map((category) => ({
    category,
    count: rows.filter((row) => row.category === category).length,
  }));
};

const rowMatchesQuery = (query: string, row: ApiReferenceRow): boolean => {
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery === "") {
    return true;
  }

  return [
    row.name,
    row.category,
    row.typeLabel,
    row.signature,
    row.description,
    row.defaultValue ?? "",
    row.source ?? "",
    ...row.badges.map((badge) => badge.label),
    ...row.details,
  ]
    .join(" ")
    .toLowerCase()
    .includes(normalizedQuery);
};

const rowMatchesCategory = (
  maybeSelectedCategory: Option.Option<string>,
  row: ApiReferenceRow
): boolean =>
  maybeSelectedCategory.pipe(
    Option.match({
      onNone: () => true,
      onSome: (category) => row.category === category,
    })
  );

const filteredRows = (
  model: Model,
  group: ApiReferenceGroup
): readonly ApiReferenceRow[] =>
  group.rows
    .filter((row) => rowMatchesQuery(model.query, row))
    .filter((row) => rowMatchesCategory(model.maybeSelectedCategory, row));

const isSelectedCategory = (
  model: Model,
  category: string
): boolean =>
  model.maybeSelectedCategory.pipe(
    Option.match({
      onNone: () => false,
      onSome: (selectedCategory) => selectedCategory === category,
    })
  );

const badgeClasses = (tone: ApiReferenceBadge["tone"]): string =>
  M.value(tone).pipe(
    M.when("required", () => "border-rose-200 bg-rose-50 text-rose-700"),
    M.when("optional", () => "border-sky-200 bg-sky-50 text-sky-700"),
    M.when("source", () => "border-emerald-200 bg-emerald-50 text-emerald-700"),
    M.when("a11y", () => "border-violet-200 bg-violet-50 text-violet-700"),
    M.when("neutral", () => "border-slate-200 bg-slate-50 text-slate-600"),
    M.exhaustive
  );

const renderCount = (count: number): Html => {
  const h = html<Message>();

  return h.span(
    [
      h.Class(
        "inline-flex min-w-6 justify-center rounded-[4px] bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] text-slate-600"
      ),
    ],
    [String(count)]
  );
};

const renderGroupButtons = (
  config: ApiReferenceConfig,
  model: Model
): Html => {
  const h = html<Message>();

  return h.div(
    [
      h.Role("group"),
      h.AriaLabel("API reference groups"),
      h.Class("flex flex-wrap gap-2 border-b border-slate-200 p-4"),
    ],
    config.groups.map((group) => {
      const active = group.id === model.selectedGroupId;

      return h.button(
        [
          h.Type("button"),
          h.AriaLabel(`${group.label} ${group.rows.length}`),
          h.AriaPressed(active ? "true" : "false"),
          h.OnClick(SelectedApiReferenceGroup({ groupId: group.id })),
          h.Class(
            `${groupButtonBaseClasses} ${
              active
                ? "border-amber-300 bg-amber-50 text-slate-950"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
            }`
          ),
        ],
        [h.span([], [group.label]), renderCount(group.rows.length)]
      );
    })
  );
};

const renderCategoryRail = (
  model: Model,
  group: ApiReferenceGroup
): Html => {
  const h = html<Message>();
  const allActive = Option.isNone(model.maybeSelectedCategory);

  return h.aside(
    [
      h.Class(
        "border-b border-slate-200 p-4 lg:border-r lg:border-b-0 lg:p-3"
      ),
      h.AriaLabel("API reference categories"),
    ],
    [
      h.div([h.Class("mb-2 text-xs font-semibold uppercase text-slate-500")], [
        "Categories",
      ]),
      h.div(
        [h.Class("grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1")],
        [
          h.button(
            [
              h.Type("button"),
              h.AriaLabel(`All ${group.rows.length}`),
              h.AriaPressed(allActive ? "true" : "false"),
              h.OnClick(ClearedApiReferenceCategory()),
              h.Class(
                `${categoryButtonBaseClasses} ${
                  allActive
                    ? "border-amber-300 bg-amber-50 text-slate-950"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`
              ),
            ],
            [h.span([h.Class("truncate")], ["All"]), renderCount(group.rows.length)]
          ),
          ...categoryCounts(group.rows).map((categoryCount) => {
            const active = isSelectedCategory(model, categoryCount.category);

            return h.button(
              [
                h.Type("button"),
                h.AriaLabel(
                  `${categoryCount.category} ${categoryCount.count}`
                ),
                h.AriaPressed(active ? "true" : "false"),
                h.OnClick(
                  SelectedApiReferenceCategory({
                    category: categoryCount.category,
                  })
                ),
                h.Class(
                  `${categoryButtonBaseClasses} ${
                    active
                      ? "border-amber-300 bg-amber-50 text-slate-950"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                  }`
                ),
              ],
              [
                h.span([h.Class("truncate")], [categoryCount.category]),
                renderCount(categoryCount.count),
              ]
            );
          }),
        ]
      ),
    ]
  );
};

const renderBadges = (badges: readonly ApiReferenceBadge[]): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("flex flex-wrap gap-1.5")],
    badges.map((badge) =>
      h.span(
        [
          h.Class(
            `rounded-[4px] border px-1.5 py-0.5 text-[11px] font-medium ${badgeClasses(
              badge.tone
            )}`
          ),
        ],
        [badge.label]
      )
    )
  );
};

const renderOptionalMetadata = (
  label: string,
  value: string | undefined
): Html => {
  const h = html<Message>();

  if (value === undefined) {
    return h.empty;
  }

  return h.div([h.Class("grid gap-1")], [
    h.dt([h.Class("text-[11px] font-semibold uppercase text-slate-500")], [
      label,
    ]),
    h.dd([h.Class("min-w-0")], [
      h.code([h.Class("break-words font-mono text-xs text-slate-700")], [
        value,
      ]),
    ]),
  ]);
};

const renderRow = (row: ApiReferenceRow): Html => {
  const h = html<Message>();

  return h.article([h.Class(rowClasses)], [
    h.div(
      [h.Class("grid gap-2 md:grid-cols-[minmax(0,1fr)_auto] md:items-start")],
      [
        h.div([h.Class("min-w-0 space-y-1")], [
          h.div([h.Class("flex flex-wrap items-center gap-2")], [
            h.h3([h.Class("font-mono text-sm font-semibold text-slate-950")], [
              row.name,
            ]),
            h.span(
              [
                h.Class(
                  "rounded-[4px] border border-slate-200 bg-white px-1.5 py-0.5 text-[11px] font-semibold uppercase text-slate-500"
                ),
              ],
              [row.typeLabel]
            ),
          ]),
          h.p([h.Class("text-sm leading-6 text-slate-600")], [
            row.description,
          ]),
        ]),
        renderBadges(row.badges),
      ]
    ),
    h.code(
      [
        h.Class(
          "block overflow-x-auto rounded-[6px] border border-slate-200 bg-slate-50 p-3 font-mono text-xs leading-5 text-slate-800"
        ),
      ],
      [row.signature]
    ),
    h.dl([h.Class("grid gap-3 md:grid-cols-2")], [
      renderOptionalMetadata("Default", row.defaultValue),
      renderOptionalMetadata("Source", row.source),
    ]),
    Array.match(row.details, {
      onEmpty: () => h.empty,
      onNonEmpty: (details) =>
        h.ul(
          [
            h.Class(
              "grid list-disc gap-1 pl-5 text-sm leading-6 text-slate-600 md:grid-cols-2"
            ),
          ],
          details.map((detail) => h.li([], [detail]))
        ),
    }),
  ]);
};

const renderRows = (rows: readonly ApiReferenceRow[]): Html => {
  const h = html<Message>();

  return Array.match(rows, {
    onEmpty: () =>
      h.div(
        [
          h.Class(
            "flex min-h-40 items-center justify-center p-6 text-center text-sm text-slate-500"
          ),
        ],
        ["No API entries match this filter"]
      ),
    onNonEmpty: (visibleRows) =>
      h.div([h.Class("divide-y divide-slate-200")], visibleRows.map(renderRow)),
  });
};

export const view =
  (config: ApiReferenceConfig) =>
  (model: Model): Html => {
    const h = html<Message>();

    return selectedGroup(config, model).pipe(
      Option.match({
        onNone: () =>
          h.section([h.Class(`${shellClasses} p-4`)], [
            h.h2([h.Class("text-lg font-semibold")], [config.title]),
            h.p([h.Class("mt-2 text-sm text-slate-500")], [
              "No API groups are available.",
            ]),
          ]),
        onSome: (group) =>
          h.section([h.Class(shellClasses)], [
            h.header([h.Class(headerClasses)], [
              h.div([h.Class("space-y-2")], [
                h.p([h.Class(eyebrowClasses)], ["API reference"]),
                h.h2([h.Class("text-2xl font-semibold text-slate-950")], [
                  config.title,
                ]),
                h.p([h.Class("max-w-3xl text-sm leading-6 text-slate-600")], [
                  config.summary,
                ]),
              ]),
              h.div([h.Class("grid gap-1.5")], [
                h.label(
                  [
                    h.For("api-reference-filter"),
                    h.Class("text-xs font-semibold uppercase text-slate-500"),
                  ],
                  ["Filter API reference"]
                ),
                h.input([
                  h.Id("api-reference-filter"),
                  h.Type("text"),
                  h.Value(model.query),
                  h.Placeholder("Search names, categories, signatures"),
                  h.OnInput((value) => UpdatedApiReferenceQuery({ value })),
                  h.OnChange((value) => UpdatedApiReferenceQuery({ value })),
                  h.Class(searchInputClasses),
                ]),
              ]),
            ]),
            renderGroupButtons(config, model),
            h.div(
              [h.Class("grid lg:grid-cols-[220px_minmax(0,1fr)]")],
              [
                renderCategoryRail(model, group),
                h.div([h.Class("min-w-0")], [
                  h.div([h.Class("border-b border-slate-200 p-4")], [
                    h.h3([h.Class("text-base font-semibold text-slate-950")], [
                      group.label,
                    ]),
                    h.p([h.Class("mt-1 text-sm leading-6 text-slate-600")], [
                      group.summary,
                    ]),
                  ]),
                  renderRows(filteredRows(model, group)),
                ]),
              ]
            ),
          ]),
      })
    );
  };

export const defineProgram = (config: ApiReferenceConfig) => ({
  Model,
  Message,
  init: () => init(config),
  update,
  view: view(config),
});
