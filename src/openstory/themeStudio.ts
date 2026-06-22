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
  shadcnModeGlobalKey,
  shadcnThemeGlobalKey,
  shadcnThemeStyleProperties,
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

export const themeStudioStyleProperties = (
  model: Model
): Record<string, string> =>
  shadcnThemeStyleProperties({
    [shadcnThemeGlobalKey]: `${model.selectedStyle}-${model.selectedBaseColor}`,
    [shadcnModeGlobalKey]: model.selectedMode satisfies ShadcnColorMode,
  });

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

const metricView = (label: string, value: string): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("rounded-md border border-border bg-background p-3")],
    [
      h.div([h.Class("text-xs font-medium text-muted-foreground")], [label]),
      h.div([h.Class("mt-1 text-2xl font-semibold text-foreground")], [value]),
    ]
  );
};

const dashboardCardsView = (): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("grid gap-3 md:grid-cols-3")],
    [
      metricView("Revenue", "$12,450"),
      metricView("Active users", "2,403"),
      metricView("Conversion", "8.4%"),
    ]
  );
};

const progressCardsView = (): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class(`${panelClasses} grid gap-3`)],
    [
      h.div([h.Class("flex items-center justify-between")], [
        h.h3([h.Class("font-semibold")], ["Project progress"]),
        h.span([h.Class("text-sm text-muted-foreground")], ["72%"]),
      ]),
      h.div([h.Class("h-2 overflow-hidden rounded-full bg-secondary")], [
        h.div([h.Class("h-full rounded-full bg-primary"), h.Style({ width: "72%" })], []),
      ]),
      h.p([h.Class(mutedTextClasses)], ["Three milestones are ready for review."]),
    ]
  );
};

const preferenceFormsView = (): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class(`${panelClasses} grid gap-3`)],
    [
      h.h3([h.Class("font-semibold")], ["Preferences"]),
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
    ]
  );
};

const tabsView = (): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class(`${panelClasses} grid gap-3`)],
    [
      h.div([h.Role("tablist"), h.Class("flex gap-2")], [
        h.button(
          [h.Type("button"), h.Role("tab"), h.AriaSelected(true), h.Class(actionClasses)],
          ["Overview"]
        ),
        h.button(
          [
            h.Type("button"),
            h.Role("tab"),
            h.AriaSelected(false),
            h.Class("h-9 rounded-md border border-border px-3 text-sm"),
          ],
          ["Activity"]
        ),
      ]),
      h.p([h.Class(mutedTextClasses)], ["Overview metrics are ready for export."]),
    ]
  );
};

const accordionsView = (): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class(`${panelClasses} divide-y divide-border`)],
    [
      h.details([h.Attribute("open", "")], [
        h.summary([h.Class("cursor-pointer py-2 font-medium")], ["Notifications"]),
        h.p([h.Class(`${mutedTextClasses} pb-3`)], ["Digest emails are enabled."]),
      ]),
      h.details([], [
        h.summary([h.Class("cursor-pointer py-2 font-medium")], ["Security"]),
        h.p([h.Class(`${mutedTextClasses} pb-3`)], ["Two-factor prompts are active."]),
      ]),
    ]
  );
};

const previewBlockViews: Record<string, () => Html> = {
  "dashboard-cards": dashboardCardsView,
  "progress-cards": progressCardsView,
  "preference-forms": preferenceFormsView,
  tabs: tabsView,
  accordions: accordionsView,
};

const previewBlockView = (model: Model): Html => {
  const block = selectedPreviewBlock(model);
  const render = previewBlockViews[block.id] ?? dashboardCardsView;

  return render();
};

const stateText = (model: Model): string =>
  `${model.selectedStyle}/${model.selectedBaseColor}/${model.selectedMode}/${model.selectedPreviewBlockId}`;

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const block = selectedPreviewBlock(model);

  return h.div(
    [
      h.DataAttribute("testid", "theme-studio-root"),
      h.Class("mx-auto grid max-w-6xl gap-5 p-4 text-foreground"),
    ],
    [
      h.header([h.Class("grid gap-2")], [
        h.h1([h.Class("text-3xl font-bold tracking-normal")], ["Theme Studio"]),
        h.p([h.Class(mutedTextClasses)], [
          "shadcn/Theme Studio",
        ]),
      ]),
      h.section(
        [h.Class("grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]")],
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
              h.DataAttribute("selected-preview-block", block.id),
              h.Class(
                clsx(
                  "shadcn-theme grid min-h-96 gap-4 rounded-md border border-border bg-background p-4 text-foreground",
                  `shadcn-theme-${model.selectedStyle}`,
                  `shadcn-theme-${model.selectedBaseColor}`,
                  model.selectedMode === "dark" && "dark"
                )
              ),
              h.Style(themeStudioStyleProperties(model)),
            ],
            [
              h.div([h.Class("flex items-start justify-between gap-3")], [
                h.div([], [
                  h.h2([h.Class("text-xl font-semibold")], [block.title]),
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
