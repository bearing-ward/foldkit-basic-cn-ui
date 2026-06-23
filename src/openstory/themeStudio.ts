import clsx from "clsx";
import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel, Ui } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import previewInventory from "../../registry/upstream/derived/shadcn-preview-02.json";
import themeContract from "../../registry/upstream/derived/shadcn-theme.json";
import {
  resolveShadcnTheme,
  shadcnModeGlobalKey,
  shadcnThemeColorVariableValue,
  shadcnThemeGlobalKey,
  type ResolvedShadcnTheme,
  type ShadcnColorMode,
} from "./shadcnTheme";

const ColorMode = S.Union([
  S.Literal("light"),
  S.Literal("dark"),
  S.Literal("system"),
]);
type ColorMode = typeof ColorMode.Type;

const toTitle = (value: string): string =>
  value
    .split("-")
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join(" ");

const uniqueValues = (values: ReadonlyArray<string>): ReadonlyArray<string> => [
  ...new Set(values),
];

const themeDownloadNameFor = (style: string, baseColor: string): string =>
  `foldkit-theme-${style}-${baseColor}`;

const stylesWithEntries = new Set(
  themeContract.themes.map((theme) => theme.style)
);

export const themeStudioCatalog = {
  styleOptions: themeContract.styleNames
    .filter((style) => stylesWithEntries.has(style))
    .map((style) => ({
      value: style,
      title: toTitle(style),
    })),
  baseColorOptionsByStyle: Object.fromEntries(
    themeContract.styleNames
      .filter((style) => stylesWithEntries.has(style))
      .map((style) => [
        style,
        uniqueValues(
          themeContract.themes
            .filter((theme) => theme.style === style)
            .map((theme) => theme.baseColor)
        ).map((baseColor) => ({
          value: baseColor,
          title: toTitle(baseColor),
          downloadName: themeDownloadNameFor(style, baseColor),
          downloadHref: `/${themeDownloadNameFor(style, baseColor)}.json`,
        })),
      ])
  ),
  modeOptions: [
    { value: "light", title: "Light" },
    { value: "dark", title: "Dark" },
    { value: "system", title: "System" },
  ],
  cssVariablesOptions: [
    { value: true, title: "CSS variables", status: "active", download: true },
    {
      value: false,
      title: "Utility classes",
      status: "deferred",
      download: false,
      reason:
        "The no-CSS-variables path is deferred until source-owned style recipes can be generated honestly.",
    },
  ],
  previewCoverage: previewInventory.rows,
  previewBlocks: previewInventory.rows
    .filter(
      (
        row
      ): row is typeof row & {
        status: "rendered";
        registryItemName: string;
        storyId: string;
      } => row.status === "rendered"
    )
    .map((row) => ({
      id: row.id,
      title: row.title,
      dependency: row.dependency,
      status: row.status,
      registryItemName: row.registryItemName,
      downloadName: row.registryItemName,
      downloadHref: `/${row.registryItemName}.json`,
      storyId: row.storyId,
    })),
  downloads: {
    themes: themeContract.themes.flatMap((theme, index, themes) => {
      const firstIndex = themes.findIndex(
        (candidate) =>
          candidate.style === theme.style && candidate.baseColor === theme.baseColor
      );
      if (firstIndex !== index) {
        return [];
      }
      return [
        {
          kind: "theme",
          name: themeDownloadNameFor(theme.style, theme.baseColor),
          style: theme.style,
          baseColor: theme.baseColor,
          href: `/${themeDownloadNameFor(theme.style, theme.baseColor)}.json`,
        },
      ];
    }),
  },
};

type ThemeStudioCatalog = typeof themeStudioCatalog;
type StyleOption = ThemeStudioCatalog["styleOptions"][number];
type BaseColorOption =
  ThemeStudioCatalog["baseColorOptionsByStyle"]["rhea"][number];
type PreviewBlock = ThemeStudioCatalog["previewBlocks"][number];
type PreviewCoverageRow = ThemeStudioCatalog["previewCoverage"][number];
type ModeOption = ThemeStudioCatalog["modeOptions"][number];
type BaseColorOptionsByStyle = Record<string, ReadonlyArray<BaseColorOption>>;

const baseColorOptionsByStyle: BaseColorOptionsByStyle =
  themeStudioCatalog.baseColorOptionsByStyle;

type Choice<Value extends string> = Readonly<{
  value: Value;
  label: string;
}>;

// MODEL

export const Model = S.Struct({
  selectedStyle: S.String,
  selectedBaseColor: S.String,
  selectedMode: ColorMode,
  selectedPreviewBlockId: S.String,
});

export type Model = typeof Model.Type;

// MESSAGE

export const SelectedThemeStudioStyle = m("SelectedThemeStudioStyle", {
  value: S.String,
});
export const SelectedThemeStudioBaseColor = m("SelectedThemeStudioBaseColor", {
  value: S.String,
});
export const SelectedThemeStudioMode = m("SelectedThemeStudioMode", {
  value: S.String,
});
export const SelectedThemeStudioPreviewBlock = m(
  "SelectedThemeStudioPreviewBlock",
  {
    value: S.String,
  }
);

export const Message = S.Union([
  SelectedThemeStudioStyle,
  SelectedThemeStudioBaseColor,
  SelectedThemeStudioMode,
  SelectedThemeStudioPreviewBlock,
]);
export type Message = typeof Message.Type;

// INIT

const firstStyle = (): StyleOption => {
  const option = themeStudioCatalog.styleOptions[0];
  if (option === undefined) {
    throw new Error("Theme Studio catalog must include at least one style");
  }
  return option;
};

const firstBaseColorForStyle = (style: string): BaseColorOption => {
  const option = baseColorOptionsByStyle[style]?.[0];
  if (option === undefined) {
    throw new Error(`Theme Studio catalog must include a base color for ${style}`);
  }
  return option;
};

const firstPreviewBlock = (): PreviewBlock => {
  const block = themeStudioCatalog.previewBlocks[0];
  if (block === undefined) {
    throw new Error("Theme Studio catalog must include at least one preview block");
  }
  return block;
};

const isStyle = (value: string): boolean =>
  themeStudioCatalog.styleOptions.some((option) => option.value === value);

export const baseColorOptionsForStyle = (
  style: string
): ReadonlyArray<BaseColorOption> =>
  baseColorOptionsByStyle[style] ?? [];

const isBaseColorForStyle = (style: string, value: string): boolean =>
  baseColorOptionsForStyle(style).some((option) => option.value === value);

const isMode = (value: string): value is ColorMode =>
  value === "light" || value === "dark" || value === "system";

const defaultStyle = (): string =>
  isStyle(themeContract.defaultStyle) ? themeContract.defaultStyle : firstStyle().value;

const defaultBaseColor = (style: string): string =>
  isBaseColorForStyle(style, themeContract.defaultBaseColor)
    ? themeContract.defaultBaseColor
    : firstBaseColorForStyle(style).value;

const defaultMode = (): ColorMode =>
  isMode(themeContract.defaultMode) ? themeContract.defaultMode : "light";

export const init = (): readonly [Model, readonly Command.Command<Message>[]] => [
  (() => {
    const selectedStyle = defaultStyle();
    return {
      selectedStyle,
      selectedBaseColor: defaultBaseColor(selectedStyle),
      selectedMode: defaultMode(),
      selectedPreviewBlockId: firstPreviewBlock().id,
    };
  })(),
  [],
];

// UPDATE

type UpdateReturn = readonly [Model, readonly Command.Command<Message>[]];
const withUpdateReturn = M.withReturnType<UpdateReturn>();

const isPreviewBlock = (value: string): boolean =>
  themeStudioCatalog.previewBlocks.some((block) => block.id === value);

const baseColorAfterStyleChange = (
  currentBaseColor: string,
  nextStyle: string
): string => {
  if (isBaseColorForStyle(nextStyle, currentBaseColor)) {
    return currentBaseColor;
  }

  return firstBaseColorForStyle(nextStyle).value;
};

export const update = (model: Model, message: Message): UpdateReturn =>
  M.value(message).pipe(
    withUpdateReturn,
    M.tagsExhaustive({
      SelectedThemeStudioStyle: ({ value }) =>
        isStyle(value)
          ? [
              evo(model, {
                selectedStyle: () => value,
                selectedBaseColor: (currentBaseColor) =>
                  baseColorAfterStyleChange(currentBaseColor, value),
              }),
              [],
            ]
          : [model, []],
      SelectedThemeStudioBaseColor: ({ value }) =>
        isBaseColorForStyle(model.selectedStyle, value)
          ? [evo(model, { selectedBaseColor: () => value }), []]
          : [model, []],
      SelectedThemeStudioMode: ({ value }) =>
        isMode(value) ? [evo(model, { selectedMode: () => value }), []] : [model, []],
      SelectedThemeStudioPreviewBlock: ({ value }) =>
        isPreviewBlock(value)
          ? [evo(model, { selectedPreviewBlockId: () => value }), []]
          : [model, []],
    })
  );

// VIEW

const panelClasses =
  "rounded-md border border-border bg-card p-4 text-card-foreground shadow-sm";
const labelClasses = "text-sm font-medium text-foreground";
const selectClasses =
  "h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm";
const mutedTextClasses = "text-sm leading-6 text-muted-foreground";
const actionClasses =
  "inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground";

const toChoice = <Value extends string>(
  option: Readonly<{ value: Value; title: string }>
): Choice<Value> => ({
  value: option.value,
  label: option.title,
});

const styleChoices = (): ReadonlyArray<Choice<string>> =>
  themeStudioCatalog.styleOptions.map(toChoice);

const baseColorChoices = (style: string): ReadonlyArray<Choice<string>> =>
  baseColorOptionsForStyle(style).map(toChoice);

const modeChoices = (): ReadonlyArray<Choice<ColorMode>> =>
  themeStudioCatalog.modeOptions
    .filter((option): option is ModeOption & { value: ColorMode } =>
      isMode(option.value)
    )
    .map(toChoice);

const previewBlockChoices = (): ReadonlyArray<Choice<string>> =>
  themeStudioCatalog.previewBlocks.map((block) => ({
    value: block.id,
    label: block.title,
  }));

const cssVariableOptionsView = (): Html => {
  const h = html<Message>();

  return h.div(
    [
      h.DataAttribute("testid", "theme-studio-css-variable-options"),
      h.Class("grid gap-2"),
    ],
    [
      h.div([h.Class(labelClasses)], ["CSS variable mode"]),
      h.div(
        [h.Class("grid gap-2")],
        themeStudioCatalog.cssVariablesOptions.map((option) =>
          h.div(
            [
              h.DataAttribute("theme-studio-css-variable-option", String(option.value)),
              h.DataAttribute("status", option.status),
              h.DataAttribute("downloadable", option.download ? "true" : "false"),
              h.Class("rounded-md border border-border bg-background p-2"),
            ],
            [
              h.div([h.Class("flex items-center justify-between gap-2")], [
                h.span([h.Class("text-sm font-medium text-foreground")], [option.title]),
                h.span(
                  [
                    h.Class(
                      clsx(
                        "rounded px-1.5 py-0.5 text-xs font-medium",
                        option.status === "active" &&
                          "bg-primary text-primary-foreground",
                        option.status === "deferred" &&
                          "bg-secondary text-secondary-foreground"
                      )
                    ),
                  ],
                  [toTitle(option.status)]
                ),
              ]),
              option.reason === undefined
                ? h.span([h.Class("sr-only")], ["Registry theme download"])
                : h.p([h.Class("mt-1 text-xs leading-5 text-muted-foreground")], [
                    option.reason,
                  ]),
            ]
          )
        )
      ),
    ]
  );
};

export const selectedPreviewBlock = (model: Model): PreviewBlock =>
  themeStudioCatalog.previewBlocks.find(
    (block) => block.id === model.selectedPreviewBlockId
  ) ?? firstPreviewBlock();

export const selectedThemeDownloadHref = (model: Model): string =>
  `/${themeStudioCatalog.downloads.themes.find(
    (download) =>
      download.style === model.selectedStyle &&
      download.baseColor === model.selectedBaseColor
  )?.name ?? `foldkit-theme-${model.selectedStyle}-${model.selectedBaseColor}`}.json`;

export const selectedPreviewBlockDownloadHref = (model: Model): string =>
  selectedPreviewBlock(model).downloadHref;

const themeStudioGlobals = (model: Model): Record<string, unknown> => ({
  [shadcnThemeGlobalKey]: `${model.selectedStyle}-${model.selectedBaseColor}`,
  [shadcnModeGlobalKey]: model.selectedMode satisfies ShadcnColorMode,
});

export const selectedResolvedTheme = (model: Model): ResolvedShadcnTheme =>
  resolveShadcnTheme(themeStudioGlobals(model));

const themeStudioStylePropertiesForTheme = (
  theme: ResolvedShadcnTheme
): Record<string, string> =>
  Object.fromEntries(
    Object.entries(theme.tokens).flatMap(([token, value]) => {
      if (token === "radius") {
        return [
          ["--radius", value],
          ["--radius-sm", `calc(${value} - 4px)`],
          ["--radius-md", `calc(${value} - 2px)`],
          ["--radius-lg", value],
          ["--radius-xl", `calc(${value} + 4px)`],
        ];
      }
      return [
        [`--${token}`, value],
        [`--color-${token}`, shadcnThemeColorVariableValue(value)],
      ];
    })
  );

export const themeStudioStyleProperties = (
  model: Model
): Record<string, string> =>
  themeStudioStylePropertiesForTheme(selectedResolvedTheme(model));

const themeStudioClassNames = (theme: ResolvedShadcnTheme): string =>
  `shadcn-theme shadcn-theme-${theme.style} shadcn-theme-${theme.baseColor} ${theme.resolvedMode} bg-background text-foreground`;

const selectView = <Value extends string>(config: {
  id: string;
  label: string;
  value: Value;
  choices: ReadonlyArray<Choice<Value>>;
  onChange: (value: string) => Message;
}): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("grid gap-1.5")],
    [
      h.label([h.For(config.id), h.Class(labelClasses)], [config.label]),
      Ui.Select.view<Message>({
        id: config.id,
        value: config.value,
        onChange: config.onChange,
        toView: (attributes) =>
          h.select(
            [...attributes.select, h.Class(selectClasses)],
            config.choices.map((choice) =>
              h.option([h.Value(choice.value)], [choice.label])
            )
          ),
      }),
    ]
  );
};

const themeStudioExampleFrameMaxHeight = "720px";

const themeTokenProbeView = (): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("grid gap-2 sm:grid-cols-3")],
    [
      h.div(
        [
          h.DataAttribute("testid", "theme-studio-primary-surface"),
          h.Class("rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"),
        ],
        ["Primary action"]
      ),
      h.div(
        [
          h.DataAttribute("testid", "theme-studio-accent-surface"),
          h.Class("rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-foreground"),
        ],
        ["Accent surface"]
      ),
      h.div(
        [
          h.DataAttribute("testid", "theme-studio-border-surface"),
          h.Class("rounded-md border border-ring bg-background px-3 py-2 text-sm font-medium text-foreground shadow-sm"),
        ],
        ["Ring border"]
      ),
    ]
  );
};

const themeStudioExampleFrame = (children: ReadonlyArray<Html>): Html => {
  const h = html<Message>();

  return h.div(
    [
      h.DataAttribute("testid", "theme-studio-example-frame"),
      h.DataAttribute("max-height", themeStudioExampleFrameMaxHeight),
      h.Class(
        "h-full min-h-[560px] overflow-auto rounded-md border border-border bg-background p-4"
      ),
      h.Style({ maxHeight: themeStudioExampleFrameMaxHeight }),
    ],
    [themeTokenProbeView(), ...children]
  );
};

const metricView = (label: string, value: string, detail: string): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("rounded-md border border-border bg-card p-3 text-card-foreground")],
    [
      h.div([h.Class("text-xs font-medium text-muted-foreground")], [label]),
      h.div([h.Class("mt-1 text-2xl font-semibold text-foreground")], [value]),
      h.div([h.Class("mt-2 h-1.5 overflow-hidden rounded-full bg-secondary")], [
        h.div([h.Class("h-full w-2/3 rounded-full bg-primary")], []),
      ]),
      h.p([h.Class("mt-2 text-xs text-muted-foreground")], [detail]),
    ]
  );
};

const dashboardCardsView = (): Html => {
  const h = html<Message>();

  return themeStudioExampleFrame(
    [
      h.div(
        [h.Class("grid gap-3 md:grid-cols-3")],
        [
          metricView("Revenue", "$12,450", "+18.2% from last cycle"),
          metricView("Active users", "2,403", "412 users currently live"),
          metricView("Conversion", "8.4%", "2.1 points above target"),
        ]
      ),
      h.div([h.Class("rounded-md border border-input bg-muted p-3")], [
        h.div([h.Class("flex items-center justify-between gap-3")], [
          h.div([], [
            h.h3([h.Class("font-semibold")], ["Campaign health"]),
            h.p([h.Class(mutedTextClasses)], ["All visible surfaces use the selected semantic tokens."]),
          ]),
          h.button([h.Type("button"), h.Class(actionClasses)], ["Review"]),
        ]),
      ]),
    ]
  );
};

const progressCardsView = (): Html => {
  const h = html<Message>();

  return themeStudioExampleFrame(
    [
      h.div(
        [h.Class(`${panelClasses} grid gap-3`)],
        [
          h.div([h.Class("flex items-center justify-between")], [
            h.h3([h.Class("font-semibold")], ["Project progress"]),
            h.span([h.Class("rounded bg-primary px-2 py-1 text-xs font-medium text-primary-foreground")], ["72%"]),
          ]),
          h.div([h.Class("h-2 overflow-hidden rounded-full bg-secondary")], [
            h.div([h.Class("h-full rounded-full bg-primary"), h.Style({ width: "72%" })], []),
          ]),
          h.div([h.Class("grid gap-2 sm:grid-cols-3")], [
            metricView("Design", "Done", "Token review accepted"),
            metricView("Build", "Live", "Preview blocks rendering"),
            metricView("QA", "Next", "Visual probes active"),
          ]),
        ]
      ),
    ]
  );
};

const preferenceFormsView = (): Html => {
  const h = html<Message>();

  return themeStudioExampleFrame(
    [
      h.div(
        [h.Class(`${panelClasses} grid gap-4`)],
        [
          h.div([h.Class("flex items-center justify-between gap-3")], [
            h.div([], [
              h.h3([h.Class("font-semibold")], ["Preferences"]),
              h.p([h.Class(mutedTextClasses)], ["Profile settings with source-derived shadcn tokens."]),
            ]),
            h.span([h.Class("rounded-md bg-accent px-2 py-1 text-xs text-accent-foreground")], ["Team"]),
          ]),
          h.div([h.Class("grid gap-3 sm:grid-cols-2")], [
            h.label([h.Class("grid gap-1 text-sm")], [
              "Email",
              h.input([
                h.Type("email"),
                h.Value("team@example.com"),
                h.Class(selectClasses),
              ]),
            ]),
            h.label([h.Class("grid gap-1 text-sm")], [
              "Region",
              h.select([h.Class(selectClasses)], [
                h.option([h.Value("na")], ["North America"]),
                h.option([h.Value("eu")], ["Europe"]),
              ]),
            ]),
          ]),
          h.button([h.Type("button"), h.Class(actionClasses)], ["Save preferences"]),
        ]
      ),
    ]
  );
};

const tabsView = (): Html => {
  const h = html<Message>();

  return themeStudioExampleFrame(
    [
      h.div(
        [h.Class(`${panelClasses} grid gap-3`)],
        [
          h.div([h.Role("tablist"), h.Class("flex flex-wrap gap-2")], [
            h.button(
              [h.Type("button"), h.Role("tab"), h.AriaSelected(true), h.Class(actionClasses)],
              ["Overview"]
            ),
            h.button(
              [
                h.Type("button"),
                h.Role("tab"),
                h.AriaSelected(false),
                h.Class("h-9 rounded-md border border-border bg-background px-3 text-sm"),
              ],
              ["Activity"]
            ),
            h.button(
              [
                h.Type("button"),
                h.Role("tab"),
                h.AriaSelected(false),
                h.Class("h-9 rounded-md border border-border bg-background px-3 text-sm"),
              ],
              ["Reports"]
            ),
          ]),
          h.div([h.Class("grid gap-3 md:grid-cols-[1.2fr_0.8fr]")], [
            h.div([h.Class("rounded-md border border-input bg-muted p-4")], [
              h.h3([h.Class("font-semibold")], ["Overview metrics"]),
              h.p([h.Class(mutedTextClasses)], ["Export-ready activity and trend details." ]),
            ]),
            h.div([h.Class("rounded-md bg-primary p-4 text-primary-foreground")], [
              h.div([h.Class("text-sm font-medium")], ["Ready"]),
              h.div([h.Class("text-3xl font-semibold")], ["12"]),
            ]),
          ]),
        ]
      ),
    ]
  );
};

const accordionsView = (): Html => {
  const h = html<Message>();

  return themeStudioExampleFrame(
    [
      h.div(
        [h.Class(`${panelClasses} divide-y divide-border`)],
        [
          h.details([h.Attribute("open", "")], [
            h.summary([h.Class("cursor-pointer py-2 font-medium")], ["Notifications"]),
            h.p([h.Class(`${mutedTextClasses} pb-3`)], ["Digest emails are enabled."]),
          ]),
          h.details([h.Attribute("open", "")], [
            h.summary([h.Class("cursor-pointer py-2 font-medium")], ["Security"]),
            h.p([h.Class(`${mutedTextClasses} pb-3`)], ["Two-factor prompts are active."]),
          ]),
          h.details([], [
            h.summary([h.Class("cursor-pointer py-2 font-medium")], ["Billing"]),
            h.p([h.Class(`${mutedTextClasses} pb-3`)], ["Invoices are grouped by workspace."]),
          ]),
        ]
      ),
    ]
  );
};

const sidebarNavigationView = (): Html => {
  const h = html<Message>();
  const navItems = ["Dashboard", "Inbox", "Reports", "Settings"];

  return themeStudioExampleFrame(
    [
      h.div([h.Class("grid min-h-[420px] overflow-hidden rounded-md border border-border bg-card text-card-foreground md:grid-cols-[220px_minmax(0,1fr)]")], [
        h.aside([h.Class("grid content-start gap-1 border-b border-border bg-muted p-3 md:border-b-0 md:border-r")], [
          h.div([h.Class("mb-2 text-sm font-semibold text-foreground")], ["Acme Finance"]),
          ...navItems.map((item) =>
            h.button(
              [
                h.Type("button"),
                h.Class(
                  clsx(
                    "h-9 rounded-md px-3 text-left text-sm",
                    item === "Dashboard"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )
                ),
              ],
              [item]
            )
          ),
          h.div([h.Class("mt-4 rounded-md border border-input bg-background p-3")], [
            h.div([h.Class("text-xs font-medium text-muted-foreground")], ["Workspace"]),
            h.div([h.Class("text-sm font-semibold")], ["Preview-02"]),
          ]),
        ]),
        h.main([h.Class("grid content-start gap-3 p-4")], [
          h.div([h.Class("flex items-center justify-between gap-3")], [
            h.div([], [
              h.h3([h.Class("font-semibold")], ["Dashboard shell"]),
              h.p([h.Class(mutedTextClasses)], ["A sidebar, active nav, and content area in one preview frame."]),
            ]),
            h.button([h.Type("button"), h.Class(actionClasses)], ["New report"]),
          ]),
          h.div([h.Class("grid gap-3 sm:grid-cols-2")], [
            metricView("Pipeline", "$82k", "North star target"),
            metricView("Tickets", "18", "6 need review"),
          ]),
        ]),
      ]),
    ]
  );
};

const switchesView = (): Html => {
  const h = html<Message>();
  const rows = [
    ["Email digests", "Weekly account summaries", true],
    ["Desktop alerts", "Notify on deployment failures", true],
    ["Beta controls", "Show experimental panels", false],
  ] as const;

  return themeStudioExampleFrame(
    [
      h.div([h.Class(`${panelClasses} grid gap-3`)], [
        h.div([h.Class("flex items-center justify-between gap-3")], [
          h.div([], [
            h.h3([h.Class("font-semibold")], ["Notification settings"]),
            h.p([h.Class(mutedTextClasses)], ["Switch rows grouped like the preview-02 settings surfaces."]),
          ]),
          h.span([h.Class("rounded-md bg-accent px-2 py-1 text-xs text-accent-foreground")], ["Live"]),
        ]),
        ...rows.map(([title, detail, enabled]) =>
          h.div([h.Class("flex items-center justify-between gap-4 rounded-md border border-border bg-background p-3")], [
            h.div([], [
              h.div([h.Class("text-sm font-medium")], [title]),
              h.div([h.Class("text-xs text-muted-foreground")], [detail]),
            ]),
            h.button(
              [
                h.Type("button"),
                h.Role("switch"),
                h.AriaChecked(enabled),
                h.Class(
                  clsx(
                    "relative h-6 w-11 rounded-full border border-input",
                    enabled ? "bg-primary" : "bg-muted"
                  )
                ),
              ],
              [
                h.span([
                  h.Class(
                    clsx(
                      "block h-5 w-5 rounded-full bg-background shadow-sm",
                      enabled && "translate-x-5"
                    )
                  ),
                ], []),
              ]
            ),
          ])
        ),
      ]),
    ]
  );
};

const selectsComboboxesView = (): Html => {
  const h = html<Message>();

  return themeStudioExampleFrame(
    [
      h.div([h.Class(`${panelClasses} grid gap-4`)], [
        h.div([], [
          h.h3([h.Class("font-semibold")], ["Deployment filters"]),
          h.p([h.Class(mutedTextClasses)], ["Select, search, and segmented filter controls grouped together."]),
        ]),
        h.div([h.Class("grid gap-3 md:grid-cols-3")], [
          h.label([h.Class("grid gap-1 text-sm")], [
            "Environment",
            h.select([h.Class(selectClasses)], [
              h.option([h.Value("production")], ["Production"]),
              h.option([h.Value("staging")], ["Staging"]),
            ]),
          ]),
          h.label([h.Class("grid gap-1 text-sm")], [
            "Owner",
            h.input([h.Value("Design systems"), h.Class(selectClasses)]),
          ]),
          h.label([h.Class("grid gap-1 text-sm")], [
            "Status",
            h.select([h.Class(selectClasses)], [
              h.option([h.Value("active")], ["Active"]),
              h.option([h.Value("paused")], ["Paused"]),
            ]),
          ]),
        ]),
        h.div([h.Class("rounded-md border border-ring bg-accent p-3 text-accent-foreground")], [
          "Showing 24 matched records across selected controls.",
        ]),
      ]),
    ]
  );
};

const dropdownMenuActionsView = (): Html => {
  const h = html<Message>();

  return themeStudioExampleFrame(
    [
      h.div([h.Class("grid gap-3 md:grid-cols-[1fr_260px]")], [
        h.div([h.Class(`${panelClasses} grid gap-3`)], [
          h.div([h.Class("flex items-center justify-between gap-3")], [
            h.div([], [
              h.h3([h.Class("font-semibold")], ["Team actions"]),
              h.p([h.Class(mutedTextClasses)], ["A static menu surface with action, destructive, and shortcut rows."]),
            ]),
            h.button([h.Type("button"), h.Class(actionClasses)], ["Invite"]),
          ]),
          h.div([h.Class("grid gap-2")], [
            h.div([h.Class("rounded-md border border-border bg-background p-3")], ["Maya Chen"]),
            h.div([h.Class("rounded-md border border-border bg-background p-3")], ["Noah Patel"]),
          ]),
        ]),
        h.div([h.Class("rounded-md border border-ring bg-popover p-2 text-popover-foreground shadow-sm")], [
          h.div([h.Class("rounded-sm bg-accent px-2 py-1.5 text-sm text-accent-foreground")], ["View profile"]),
          h.div([h.Class("px-2 py-1.5 text-sm")], ["Copy email"]),
          h.div([h.Class("px-2 py-1.5 text-sm text-muted-foreground")], ["Archive user"]),
          h.div([h.Class("mt-1 border-t border-border px-2 py-1.5 text-sm text-destructive")], ["Remove access"]),
        ]),
      ]),
    ]
  );
};

const calendarDateControlsView = (): Html => {
  const h = html<Message>();
  const days = ["18", "19", "20", "21", "22", "23", "24"];

  return themeStudioExampleFrame(
    [
      h.div([h.Class("grid gap-3 md:grid-cols-[280px_minmax(0,1fr)]")], [
        h.div([h.Class(`${panelClasses} grid gap-3`)], [
          h.div([h.Class("flex items-center justify-between")], [
            h.button([h.Type("button"), h.Class("rounded-md border border-input px-2 py-1 text-sm")], ["Prev"]),
            h.div([h.Class("font-semibold")], ["April 2026"]),
            h.button([h.Type("button"), h.Class("rounded-md border border-input px-2 py-1 text-sm")], ["Next"]),
          ]),
          h.div([h.Class("grid grid-cols-7 gap-1 text-center text-sm")], [
            ...days.map((day) =>
              h.button(
                [
                  h.Type("button"),
                  h.Class(
                    clsx(
                      "h-9 rounded-md border border-transparent",
                      day === "21" ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                    )
                  ),
                ],
                [day]
              )
            ),
          ]),
        ]),
        h.div([h.Class(`${panelClasses} grid content-start gap-3`)], [
          h.h3([h.Class("font-semibold")], ["Selected range"]),
          h.div([h.Class("rounded-md border border-ring bg-muted p-3")], ["Apr 20 - Apr 24"]),
          h.button([h.Type("button"), h.Class(actionClasses)], ["Apply dates"]),
        ]),
      ]),
    ]
  );
};

const radioGroupsView = (): Html => {
  const h = html<Message>();
  const options = [
    ["Starter", "$19", false],
    ["Pro", "$49", true],
    ["Enterprise", "Custom", false],
  ] as const;

  return themeStudioExampleFrame(
    [
      h.div([h.Class(`${panelClasses} grid gap-3`)], [
        h.h3([h.Class("font-semibold")], ["Payment plan"]),
        h.div([h.Class("grid gap-2 md:grid-cols-3")], [
          ...options.map(([title, price, selected]) =>
            h.div(
              [
                h.Class(
                  clsx(
                    "rounded-md border bg-background p-3",
                    selected ? "border-ring ring-2 ring-ring" : "border-border"
                  )
                ),
              ],
              [
                h.div([h.Class("flex items-center gap-2")], [
                  h.span([
                    h.Role("radio"),
                    h.AriaChecked(selected),
                    h.Class(
                      clsx(
                        "h-4 w-4 rounded-full border",
                        selected ? "border-primary bg-primary" : "border-input"
                      )
                    ),
                  ], []),
                  h.span([h.Class("font-medium")], [title]),
                ]),
                h.div([h.Class("mt-3 text-2xl font-semibold")], [price]),
              ]
            )
          ),
        ]),
      ]),
    ]
  );
};

const checkboxesView = (): Html => {
  const h = html<Message>();
  const rows = ["Financial reports", "Audit exports", "Billing alerts"];

  return themeStudioExampleFrame(
    [
      h.div([h.Class(`${panelClasses} grid gap-3`)], [
        h.h3([h.Class("font-semibold")], ["Workspace permissions"]),
        ...rows.map((row, index) =>
          h.label([h.Class("flex items-center gap-3 rounded-md border border-border bg-background p-3 text-sm")], [
            h.input([h.Type("checkbox"), h.Checked(index !== 2), h.Class("h-4 w-4 accent-primary")]),
            h.span([h.Class("font-medium")], [row]),
          ])
        ),
        h.div([h.Class("rounded-md bg-muted p-3 text-sm text-muted-foreground")], [
          "Permission changes inherit the active base color and mode.",
        ]),
      ]),
    ]
  );
};

const slidersView = (): Html => {
  const h = html<Message>();
  const sliderRows = [
    ["Lighting", "82%"],
    ["Temperature", "68%"],
    ["Energy limit", "46%"],
  ] as const satisfies ReadonlyArray<readonly [string, string]>;

  return themeStudioExampleFrame(
    [
      h.div([h.Class(`${panelClasses} grid gap-4`)], [
        h.div([h.Class("flex items-center justify-between gap-3")], [
          h.div([], [
            h.h3([h.Class("font-semibold")], ["Smart controls"]),
            h.p([h.Class(mutedTextClasses)], ["Slider-like bars paired with muted status panels."]),
          ]),
          h.span([h.Class("rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground")], ["Auto"]),
        ]),
        ...sliderRows.map(([label, value]) =>
          h.div([h.Class("grid gap-2")], [
            h.div([h.Class("flex justify-between text-sm")], [
              h.span([h.Class("font-medium")], [label]),
              h.span([h.Class("text-muted-foreground")], [value]),
            ]),
            h.div([h.Class("h-2 rounded-full bg-secondary")], [
              h.div([h.Class("h-full rounded-full bg-primary"), h.Style({ width: value })], []),
            ]),
          ])
        ),
      ]),
    ]
  );
};

const uploadControlsView = (): Html => {
  const h = html<Message>();

  return themeStudioExampleFrame(
    [
      h.div([h.Class(`${panelClasses} grid gap-3`)], [
        h.h3([h.Class("font-semibold")], ["Upload controls"]),
        h.div([h.Class("grid place-items-center gap-3 rounded-md border border-dashed border-ring bg-muted p-8 text-center")], [
          h.div([h.Class("rounded-full bg-primary px-3 py-2 text-sm font-medium text-primary-foreground")], ["Upload"]),
          h.div([], [
            h.div([h.Class("font-medium")], ["Drop files here"]),
            h.p([h.Class(mutedTextClasses)], ["CSV, JSON, or image assets up to 25 MB."]),
          ]),
        ]),
        h.div([h.Class("rounded-md border border-border bg-background p-3 text-sm")], [
          "theme-studio-export.json",
        ]),
      ]),
    ]
  );
};

const profileSecurityFormsView = (): Html => {
  const h = html<Message>();

  return themeStudioExampleFrame(
    [
      h.div([h.Class("grid gap-3 md:grid-cols-2")], [
        h.div([h.Class(`${panelClasses} grid gap-3`)], [
          h.h3([h.Class("font-semibold")], ["Profile"]),
          h.label([h.Class("grid gap-1 text-sm")], ["Name", h.input([h.Value("Ada Lovelace"), h.Class(selectClasses)])]),
          h.label([h.Class("grid gap-1 text-sm")], ["Handle", h.input([h.Value("@ada"), h.Class(selectClasses)])]),
        ]),
        h.div([h.Class(`${panelClasses} grid gap-3`)], [
          h.h3([h.Class("font-semibold")], ["Security"]),
          h.div([h.Class("rounded-md border border-ring bg-muted p-3")], ["Two-factor authentication is enabled."]),
          h.button([h.Type("button"), h.Class(actionClasses)], ["Rotate token"]),
        ]),
      ]),
    ]
  );
};

const modalDrawerSurfacesView = (): Html => {
  const h = html<Message>();

  return themeStudioExampleFrame(
    [
      h.div([h.Class("grid gap-3 md:grid-cols-[1fr_320px]")], [
        h.div([h.Class(`${panelClasses} grid content-start gap-3`)], [
          h.h3([h.Class("font-semibold")], ["Modal and drawer surfaces"]),
          h.p([h.Class(mutedTextClasses)], ["A static open surface for previewing dialog tokens without extra story state."]),
          h.button([h.Type("button"), h.Class(actionClasses)], ["Open settings"]),
        ]),
        h.div([h.Class("rounded-md border border-ring bg-popover p-4 text-popover-foreground shadow-lg")], [
          h.div([h.Class("flex items-start justify-between gap-3")], [
            h.div([], [
              h.h3([h.Class("font-semibold")], ["Edit workspace"]),
              h.p([h.Class(mutedTextClasses)], ["Dialog content uses popover, border, and primary tokens."]),
            ]),
            h.button([h.Type("button"), h.Class("rounded-md border border-input px-2 py-1 text-sm")], ["Close"]),
          ]),
          h.div([h.Class("mt-4 grid gap-2")], [
            h.input([h.Value("Design Systems"), h.Class(selectClasses)]),
            h.button([h.Type("button"), h.Class(actionClasses)], ["Save changes"]),
          ]),
        ]),
      ]),
    ]
  );
};

const previewBlockViews: Record<string, () => Html> = {
  "dashboard-cards": dashboardCardsView,
  "sidebar-navigation": sidebarNavigationView,
  "progress-cards": progressCardsView,
  "preference-forms": preferenceFormsView,
  switches: switchesView,
  "selects-comboboxes": selectsComboboxesView,
  tabs: tabsView,
  accordions: accordionsView,
  "dropdown-menu-actions": dropdownMenuActionsView,
  "calendar-date-controls": calendarDateControlsView,
  "radio-groups": radioGroupsView,
  checkboxes: checkboxesView,
  sliders: slidersView,
  "upload-controls": uploadControlsView,
  "profile-security-forms": profileSecurityFormsView,
  "modal-drawer-surfaces": modalDrawerSurfacesView,
};

const previewBlockView = (model: Model): Html => {
  const block = selectedPreviewBlock(model);
  const render = previewBlockViews[block.id] ?? dashboardCardsView;

  return render();
};

const previewCoverageDownloadHref = (row: PreviewCoverageRow): string =>
  "registryItemName" in row && typeof row.registryItemName === "string"
    ? `/${row.registryItemName}.json`
    : "";

const previewBlockOptionView = (
  model: Model,
  row: PreviewCoverageRow
): Html => {
  const h = html<Message>();
  const isRendered = row.status === "rendered";
  const isSelected = row.id === model.selectedPreviewBlockId;
  const dependency = "dependency" in row ? row.dependency : "preview";
  const downloadHref = previewCoverageDownloadHref(row);

  return h.button(
    [
      h.Type("button"),
      h.DataAttribute("theme-studio-block-option", row.id),
      h.DataAttribute("status", row.status),
      h.DataAttribute("dependency", dependency),
      h.DataAttribute("download-href", downloadHref),
      h.AriaPressed(isSelected ? "true" : "false"),
      ...(isRendered
        ? [h.OnClick(SelectedThemeStudioPreviewBlock({ value: row.id }))]
        : [h.Disabled(true), h.AriaDisabled(true)]),
      h.Class(
        clsx(
          "grid gap-2 rounded-md border p-3 text-left text-sm",
          isSelected
            ? "border-ring bg-accent text-accent-foreground ring-2 ring-ring"
            : "border-border bg-background text-foreground",
          !isRendered && "cursor-not-allowed opacity-70"
        )
      ),
    ],
    [
      h.div([h.Class("flex items-start justify-between gap-2")], [
        h.span([h.Class("font-medium")], [row.title]),
        h.span([h.Class("h-3 w-3 shrink-0 rounded-full bg-primary ring-2 ring-ring")], []),
      ]),
      h.div([h.Class("text-xs text-muted-foreground")], [dependency]),
      h.div([h.Class("flex flex-wrap gap-1")], [
        h.span(
          [
            h.Class(
              clsx(
                "rounded px-1.5 py-0.5 text-xs font-medium",
                row.status === "rendered" && "bg-primary text-primary-foreground",
                row.status === "covered-by-existing-example" &&
                  "bg-secondary text-secondary-foreground",
                row.status === "deferred" && "bg-muted text-muted-foreground"
              )
            ),
          ],
          [toTitle(row.status)]
        ),
      ]),
      "reason" in row && typeof row.reason === "string"
        ? h.p([h.Class("text-xs leading-5 text-muted-foreground")], [row.reason])
        : h.span([h.Class("sr-only")], [downloadHref]),
    ]
  );
};

const previewBlockOptionsView = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [
      h.DataAttribute("testid", "theme-studio-block-options"),
      h.Class("grid max-h-96 gap-2 overflow-auto pr-1"),
    ],
    themeStudioCatalog.previewCoverage.map((row) =>
      previewBlockOptionView(model, row)
    )
  );
};

const stateText = (model: Model): string =>
  `${model.selectedStyle}/${model.selectedBaseColor}/${model.selectedMode}/${model.selectedPreviewBlockId}`;

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const block = selectedPreviewBlock(model);
  const resolvedTheme = selectedResolvedTheme(model);

  return h.div(
    [
      h.DataAttribute("testid", "theme-studio-root"),
      h.Class("mx-auto grid min-h-screen max-w-7xl gap-5 p-4 text-foreground"),
    ],
    [
      h.header([h.Class("grid gap-2")], [
        h.h1([h.Class("text-3xl font-bold tracking-normal")], ["Theme Studio"]),
        h.p([h.Class(mutedTextClasses)], [
          "shadcn/Theme Studio",
        ]),
      ]),
      h.section(
        [h.Class("grid min-h-[calc(100vh-8rem)] gap-4 lg:grid-cols-[320px_minmax(0,1fr)]")],
        [
          h.div([h.Class(`${panelClasses} grid content-start gap-4`)], [
            selectView({
              id: "theme-studio-style",
              label: "Style",
              value: model.selectedStyle,
              choices: styleChoices(),
              onChange: (value) => SelectedThemeStudioStyle({ value }),
            }),
            selectView({
              id: "theme-studio-base-color",
              label: "Base color",
              value: model.selectedBaseColor,
              choices: baseColorChoices(model.selectedStyle),
              onChange: (value) => SelectedThemeStudioBaseColor({ value }),
            }),
            selectView({
              id: "theme-studio-mode",
              label: "Mode",
              value: model.selectedMode,
              choices: modeChoices(),
              onChange: (value) => SelectedThemeStudioMode({ value }),
            }),
            selectView({
              id: "theme-studio-preview-block",
              label: "Preview block",
              value: model.selectedPreviewBlockId,
              choices: previewBlockChoices(),
              onChange: (value) => SelectedThemeStudioPreviewBlock({ value }),
            }),
            previewBlockOptionsView(model),
            cssVariableOptionsView(),
            h.div([h.Class("grid gap-2")], [
              h.a(
                [
                  h.DataAttribute("testid", "theme-studio-theme-download"),
                  h.Href(selectedThemeDownloadHref(model)),
                  h.Class(actionClasses),
                ],
                ["Download theme"]
              ),
              h.a(
                [
                  h.DataAttribute("testid", "theme-studio-block-download"),
                  h.Href(selectedPreviewBlockDownloadHref(model)),
                  h.Class("text-sm font-medium text-primary underline"),
                ],
                ["Download preview block"]
              ),
            ]),
          ]),
          h.div(
            [
              h.DataAttribute("testid", "theme-studio-preview"),
              h.DataAttribute("selected-style", model.selectedStyle),
              h.DataAttribute("selected-base-color", model.selectedBaseColor),
              h.DataAttribute("selected-mode", model.selectedMode),
              h.DataAttribute("resolved-mode", resolvedTheme.resolvedMode),
              h.DataAttribute("theme", resolvedTheme.themeName),
              h.DataAttribute("selected-preview-block", block.id),
              h.Class(
                clsx(
                  "grid h-full min-h-[calc(100vh-8rem)] content-start gap-4 rounded-md border border-border p-4",
                  themeStudioClassNames(resolvedTheme)
                )
              ),
              h.Style(themeStudioStylePropertiesForTheme(resolvedTheme)),
            ],
            [
              h.div([h.Class("flex items-start justify-between gap-3")], [
                h.div([], [
                  h.h2(
                    [
                      h.DataAttribute("testid", "theme-studio-preview-title"),
                      h.Class("text-xl font-semibold"),
                    ],
                    [block.title]
                  ),
                  h.p([h.Class(mutedTextClasses)], [block.registryItemName]),
                ]),
                h.span(
                  [
                    h.DataAttribute("testid", "theme-studio-state"),
                    h.Class(
                      "rounded-md border border-border bg-card px-2 py-1 text-xs text-card-foreground"
                    ),
                  ],
                  [stateText(model)]
                ),
              ]),
              previewBlockView(model),
            ]
          ),
        ]
      ),
    ]
  );
});
