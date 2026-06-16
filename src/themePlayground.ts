import clsx from "clsx";
import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel, Ui } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

const ColorMode = S.Union([
  S.Literal("light"),
  S.Literal("dark"),
  S.Literal("system"),
]);
type ColorMode = typeof ColorMode.Type;

const Density = S.Union([
  S.Literal("compact"),
  S.Literal("comfortable"),
  S.Literal("spacious"),
]);
type Density = typeof Density.Type;

const Radius = S.Union([
  S.Literal("none"),
  S.Literal("sm"),
  S.Literal("md"),
  S.Literal("lg"),
]);
type Radius = typeof Radius.Type;

const TypographyPreset = S.Union([
  S.Literal("system"),
  S.Literal("editorial"),
  S.Literal("mono"),
]);
type TypographyPreset = typeof TypographyPreset.Type;

const PreviewComponent = S.Union([
  S.Literal("settings"),
  S.Literal("table"),
  S.Literal("status"),
]);
type PreviewComponent = typeof PreviewComponent.Type;

type Choice<Value extends string> = Readonly<{
  value: Value;
  label: string;
}>;

const colorModeChoices: ReadonlyArray<Choice<ColorMode>> = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

const densityChoices: ReadonlyArray<Choice<Density>> = [
  { value: "compact", label: "Compact" },
  { value: "comfortable", label: "Comfortable" },
  { value: "spacious", label: "Spacious" },
];

const radiusChoices: ReadonlyArray<Choice<Radius>> = [
  { value: "none", label: "None" },
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
];

const typographyChoices: ReadonlyArray<Choice<TypographyPreset>> = [
  { value: "system", label: "System" },
  { value: "editorial", label: "Editorial" },
  { value: "mono", label: "Mono" },
];

const previewComponentChoices: ReadonlyArray<Choice<PreviewComponent>> = [
  { value: "settings", label: "Settings panel" },
  { value: "table", label: "Data table" },
  { value: "status", label: "Status card" },
];

// MODEL

export const Model = S.Struct({
  colorMode: ColorMode,
  density: Density,
  radius: Radius,
  typography: TypographyPreset,
  previewComponent: PreviewComponent,
});

export type Model = typeof Model.Type;

// MESSAGE

export const SelectedThemeColorMode = m("SelectedThemeColorMode", {
  value: S.String,
});
export const SelectedThemeDensity = m("SelectedThemeDensity", {
  value: S.String,
});
export const SelectedThemeRadius = m("SelectedThemeRadius", {
  value: S.String,
});
export const SelectedThemeTypography = m("SelectedThemeTypography", {
  value: S.String,
});
export const SelectedThemePreviewComponent = m(
  "SelectedThemePreviewComponent",
  {
    value: S.String,
  }
);

export const Message = S.Union([
  SelectedThemeColorMode,
  SelectedThemeDensity,
  SelectedThemeRadius,
  SelectedThemeTypography,
  SelectedThemePreviewComponent,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  ReadonlyArray<Command.Command<Message>>,
] => [
  {
    colorMode: "light",
    density: "comfortable",
    radius: "md",
    typography: "system",
    previewComponent: "settings",
  },
  [],
];

// UPDATE

const colorModeFromValue = (
  currentColorMode: ColorMode,
  value: string
): ColorMode => {
  if (value === "light") {
    return value;
  }

  if (value === "dark") {
    return value;
  }

  if (value === "system") {
    return value;
  }

  return currentColorMode;
};

const densityFromValue = (currentDensity: Density, value: string): Density => {
  if (value === "compact") {
    return value;
  }

  if (value === "comfortable") {
    return value;
  }

  if (value === "spacious") {
    return value;
  }

  return currentDensity;
};

const radiusFromValue = (currentRadius: Radius, value: string): Radius => {
  if (value === "none") {
    return value;
  }

  if (value === "sm") {
    return value;
  }

  if (value === "md") {
    return value;
  }

  if (value === "lg") {
    return value;
  }

  return currentRadius;
};

const typographyFromValue = (
  currentTypography: TypographyPreset,
  value: string
): TypographyPreset => {
  if (value === "system") {
    return value;
  }

  if (value === "editorial") {
    return value;
  }

  if (value === "mono") {
    return value;
  }

  return currentTypography;
};

const previewComponentFromValue = (
  currentPreviewComponent: PreviewComponent,
  value: string
): PreviewComponent => {
  if (value === "settings") {
    return value;
  }

  if (value === "table") {
    return value;
  }

  if (value === "status") {
    return value;
  }

  return currentPreviewComponent;
};

export const update = (
  model: Model,
  message: Message
): readonly [Model, ReadonlyArray<Command.Command<Message>>] =>
  M.value(message).pipe(
    M.withReturnType<
      readonly [Model, ReadonlyArray<Command.Command<Message>>]
    >(),
    M.tagsExhaustive({
      SelectedThemeColorMode: ({ value }) => [
        evo(model, {
          colorMode: () => colorModeFromValue(model.colorMode, value),
        }),
        [],
      ],
      SelectedThemeDensity: ({ value }) => [
        evo(model, {
          density: () => densityFromValue(model.density, value),
        }),
        [],
      ],
      SelectedThemeRadius: ({ value }) => [
        evo(model, {
          radius: () => radiusFromValue(model.radius, value),
        }),
        [],
      ],
      SelectedThemeTypography: ({ value }) => [
        evo(model, {
          typography: () => typographyFromValue(model.typography, value),
        }),
        [],
      ],
      SelectedThemePreviewComponent: ({ value }) => [
        evo(model, {
          previewComponent: () =>
            previewComponentFromValue(model.previewComponent, value),
        }),
        [],
      ],
    })
  );

// VIEW

const labelClassName = "block text-sm font-medium text-gray-800";
const fieldClassName = "grid gap-1.5";
const inputClassName =
  "h-10 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-950 shadow-sm focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500";
const panelClassName =
  "rounded-md border border-gray-200 bg-white p-4 shadow-sm";
const segmentedClassName =
  "inline-flex flex-wrap gap-1 rounded-md border border-gray-200 bg-gray-100 p-1";

const choiceButtonClassName = (isSelected: boolean): string =>
  clsx(
    "h-8 rounded px-3 text-sm font-medium",
    isSelected
      ? "bg-white text-gray-950 shadow-sm"
      : "text-gray-600 hover:bg-white/70 hover:text-gray-950"
  );

const radiusClassName = (radius: Radius): string =>
  M.value(radius).pipe(
    M.when("none", () => "rounded-none"),
    M.when("sm", () => "rounded-sm"),
    M.when("md", () => "rounded-md"),
    M.when("lg", () => "rounded-lg"),
    M.exhaustive
  );

const typographyClassName = (typography: TypographyPreset): string =>
  M.value(typography).pipe(
    M.when("system", () => "font-sans"),
    M.when("editorial", () => "font-serif"),
    M.when("mono", () => "font-mono"),
    M.exhaustive
  );

const densityPaddingClassName = (density: Density): string =>
  M.value(density).pipe(
    M.when("compact", () => "p-3 gap-2"),
    M.when("comfortable", () => "p-4 gap-3"),
    M.when("spacious", () => "p-5 gap-4"),
    M.exhaustive
  );

const rowPaddingClassName = (density: Density): string =>
  M.value(density).pipe(
    M.when("compact", () => "px-2 py-1.5"),
    M.when("comfortable", () => "px-3 py-2"),
    M.when("spacious", () => "px-4 py-3"),
    M.exhaustive
  );

const surfaceClassName = (colorMode: ColorMode): string =>
  M.value(colorMode).pipe(
    M.when("light", () => "border-gray-200 bg-white text-gray-950"),
    M.when("dark", () => "border-gray-700 bg-gray-950 text-gray-50"),
    M.when("system", () => "border-emerald-200 bg-emerald-50 text-gray-950"),
    M.exhaustive
  );

const mutedClassName = (colorMode: ColorMode): string =>
  M.value(colorMode).pipe(
    M.when("light", () => "text-gray-600"),
    M.when("dark", () => "text-gray-300"),
    M.when("system", () => "text-emerald-800"),
    M.exhaustive
  );

const borderClassName = (colorMode: ColorMode): string =>
  M.value(colorMode).pipe(
    M.when("light", () => "border-gray-200"),
    M.when("dark", () => "border-gray-800"),
    M.when("system", () => "border-emerald-200"),
    M.exhaustive
  );

const accentClassName = (colorMode: ColorMode): string =>
  M.value(colorMode).pipe(
    M.when("light", () => "bg-accent-600 text-white"),
    M.when("dark", () => "bg-cyan-300 text-gray-950"),
    M.when("system", () => "bg-emerald-600 text-white"),
    M.exhaustive
  );

const radiusToken = (radius: Radius): string =>
  M.value(radius).pipe(
    M.when("none", () => "0px"),
    M.when("sm", () => "4px"),
    M.when("md", () => "8px"),
    M.when("lg", () => "12px"),
    M.exhaustive
  );

const densityToken = (density: Density): string =>
  M.value(density).pipe(
    M.when("compact", () => "0.75"),
    M.when("comfortable", () => "1"),
    M.when("spacious", () => "1.25"),
    M.exhaustive
  );

const foregroundToken = (colorMode: ColorMode): string =>
  M.value(colorMode).pipe(
    M.when("light", () => "222 47% 11%"),
    M.when("dark", () => "210 40% 98%"),
    M.when("system", () => "158 64% 13%"),
    M.exhaustive
  );

const backgroundToken = (colorMode: ColorMode): string =>
  M.value(colorMode).pipe(
    M.when("light", () => "0 0% 100%"),
    M.when("dark", () => "222 47% 7%"),
    M.when("system", () => "152 81% 96%"),
    M.exhaustive
  );

const accentToken = (colorMode: ColorMode): string =>
  M.value(colorMode).pipe(
    M.when("light", () => "217 91% 60%"),
    M.when("dark", () => "188 86% 53%"),
    M.when("system", () => "160 84% 39%"),
    M.exhaustive
  );

const typographyToken = (typography: TypographyPreset): string =>
  M.value(typography).pipe(
    M.when("system", () => "system-ui, sans-serif"),
    M.when("editorial", () => "Georgia, serif"),
    M.when("mono", () => "ui-monospace, monospace"),
    M.exhaustive
  );

const previewComponentLabel = (previewComponent: PreviewComponent): string =>
  M.value(previewComponent).pipe(
    M.when("settings", () => "Settings panel"),
    M.when("table", () => "Data table"),
    M.when("status", () => "Status card"),
    M.exhaustive
  );

const themeSnippet = (model: Model): string =>
  `theme: {
  mode: "${model.colorMode}",
  density: "${model.density}",
  radius: "${radiusToken(model.radius)}",
  typography: "${typographyToken(model.typography)}",
  tokens: {
    background: "${backgroundToken(model.colorMode)}",
    foreground: "${foregroundToken(model.colorMode)}",
    accent: "${accentToken(model.colorMode)}"
  },
  preview: "${model.previewComponent}"
}`;

const selectView = <Value extends string>(config: {
  id: string;
  label: string;
  value: Value;
  choices: ReadonlyArray<Choice<Value>>;
  onChange: (value: string) => Message;
}): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class(fieldClassName)],
    [
      h.label([h.For(config.id), h.Class(labelClassName)], [config.label]),
      Ui.Select.view<Message>({
        id: config.id,
        value: config.value,
        onChange: config.onChange,
        toView: (attributes) =>
          h.select(
            [...attributes.select, h.Class(inputClassName)],
            config.choices.map((choice) =>
              h.option([h.Value(choice.value)], [choice.label])
            )
          ),
      }),
    ]
  );
};

const segmentedControlView = <Value extends string>(config: {
  label: string;
  value: Value;
  choices: ReadonlyArray<Choice<Value>>;
  onSelect: (value: string) => Message;
}): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class(fieldClassName)],
    [
      h.div([h.Class(labelClassName)], [config.label]),
      h.div(
        [
          h.Role("group"),
          h.AriaLabel(config.label),
          h.Class(segmentedClassName),
        ],
        config.choices.map((choice) =>
          h.button(
            [
              h.Type("button"),
              h.AriaPressed(choice.value === config.value ? "true" : "false"),
              h.OnClick(config.onSelect(choice.value)),
              h.Class(choiceButtonClassName(choice.value === config.value)),
            ],
            [choice.label]
          )
        )
      ),
    ]
  );
};

const settingsPreview = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [
      h.Class(
        clsx(
          "grid border",
          borderClassName(model.colorMode),
          radiusClassName(model.radius),
          densityPaddingClassName(model.density)
        )
      ),
    ],
    [
      h.div(
        [h.Class("flex items-start justify-between gap-3")],
        [
          h.div([h.Class("min-w-0")], [
            h.h3([h.Class("text-sm font-semibold")], ["Workspace access"]),
            h.p(
              [h.Class(clsx("text-xs", mutedClassName(model.colorMode)))],
              ["Review token behavior against common form controls."]
            ),
          ]),
          h.span(
            [
              h.Class(
                clsx(
                  "shrink-0 rounded px-2 py-1 text-xs font-medium",
                  accentClassName(model.colorMode)
                )
              ),
            ],
            ["Active"]
          ),
        ]
      ),
      h.label([h.Class("grid gap-1 text-xs font-medium")], [
        "Project name",
        h.input([
          h.AriaLabel("Preview project name"),
          h.Value("Design system"),
          h.Readonly(true),
          h.Class(
            clsx(
              "h-9 border bg-transparent px-2 text-sm",
              borderClassName(model.colorMode),
              radiusClassName(model.radius)
            )
          ),
        ]),
      ]),
    ]
  );
};

const tablePreview = (model: Model): Html => {
  const h = html<Message>();
  const rows: ReadonlyArray<Readonly<{ label: string; value: string }>> = [
    { label: "Button", value: "12 examples" },
    { label: "Input", value: "9 examples" },
    { label: "Dialog", value: "6 examples" },
  ];

  return h.div(
    [
      h.Class(
        clsx(
          "overflow-hidden border",
          borderClassName(model.colorMode),
          radiusClassName(model.radius)
        )
      ),
    ],
    rows.map((row) =>
      h.div(
        [
          h.Class(
            clsx(
              "flex items-center justify-between gap-3 border-b last:border-b-0",
              rowPaddingClassName(model.density),
              borderClassName(model.colorMode)
            )
          ),
        ],
        [
          h.span([h.Class("text-sm font-medium")], [row.label]),
          h.span(
            [h.Class(clsx("text-xs", mutedClassName(model.colorMode)))],
            [row.value]
          ),
        ]
      )
    )
  );
};

const statusPreview = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [
      h.Class(
        clsx(
          "grid border",
          borderClassName(model.colorMode),
          radiusClassName(model.radius),
          densityPaddingClassName(model.density)
        )
      ),
    ],
    [
      h.div([h.Class("flex items-center justify-between gap-3")], [
        h.h3([h.Class("text-sm font-semibold")], ["Registry readiness"]),
        h.span(
          [
            h.Class(
              clsx(
                "rounded px-2 py-1 text-xs font-medium",
                accentClassName(model.colorMode)
              )
            ),
          ],
          ["92%"]
        ),
      ]),
      h.p([h.Class(clsx("text-xs", mutedClassName(model.colorMode)))], [
        "Token choices are ready to copy into an app configuration.",
      ]),
    ]
  );
};

const previewView = (model: Model): Html =>
  M.value(model.previewComponent).pipe(
    M.withReturnType<Html>(),
    M.when("settings", () => settingsPreview(model)),
    M.when("table", () => tablePreview(model)),
    M.when("status", () => statusPreview(model)),
    M.exhaustive
  );

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("mx-auto max-w-6xl space-y-5")],
    [
      h.header(
        [h.Class("space-y-2")],
        [
          h.p(
            [
              h.Class(
                "text-sm font-medium uppercase tracking-wide text-accent-700"
              ),
            ],
            ["Tokens"]
          ),
          h.h1([h.Class("text-3xl font-bold text-gray-950")], [
            "Theme playground",
          ]),
          h.p([h.Class("max-w-3xl text-sm leading-6 text-gray-600")], [
            "Try registry surfaces across mode, density, radius, and typography before copying theme settings into an app.",
          ]),
        ]
      ),
      h.section(
        [h.Class("grid gap-4 lg:grid-cols-[20rem_minmax(0,1fr)]")],
        [
          h.div(
            [h.Class(`${panelClassName} space-y-4`)],
            [
              segmentedControlView({
                label: "Mode",
                value: model.colorMode,
                choices: colorModeChoices,
                onSelect: (value) => SelectedThemeColorMode({ value }),
              }),
              segmentedControlView({
                label: "Density",
                value: model.density,
                choices: densityChoices,
                onSelect: (value) => SelectedThemeDensity({ value }),
              }),
              selectView({
                id: "theme-radius",
                label: "Radius",
                value: model.radius,
                choices: radiusChoices,
                onChange: (value) => SelectedThemeRadius({ value }),
              }),
              selectView({
                id: "theme-typography",
                label: "Typography",
                value: model.typography,
                choices: typographyChoices,
                onChange: (value) => SelectedThemeTypography({ value }),
              }),
              selectView({
                id: "theme-preview-component",
                label: "Preview component",
                value: model.previewComponent,
                choices: previewComponentChoices,
                onChange: (value) =>
                  SelectedThemePreviewComponent({ value }),
              }),
            ]
          ),
          h.div(
            [h.Class("grid gap-4")],
            [
              h.section(
                [
                  h.AriaLabel("Theme preview"),
                  h.Class(
                    clsx(
                      `${panelClassName} grid gap-3`,
                      typographyClassName(model.typography)
                    )
                  ),
                ],
                [
                  h.div(
                    [h.Class("flex flex-wrap items-center justify-between gap-3")],
                    [
                      h.div([h.Class("grid gap-1")], [
                        h.h2([h.Class("text-lg font-semibold text-gray-950")], [
                          previewComponentLabel(model.previewComponent),
                        ]),
                        h.p([h.Class("text-sm text-gray-600")], [
                          `${model.colorMode} mode, ${model.density} density, ${model.radius} radius, ${model.typography} typography`,
                        ]),
                      ]),
                      h.span(
                        [
                          h.DataAttribute("testid", "theme-preview-state"),
                          h.Class(
                            "rounded bg-gray-950 px-2 py-1 font-mono text-xs text-white"
                          ),
                        ],
                        [
                          `${model.colorMode}/${model.density}/${model.radius}/${model.typography}`,
                        ]
                      ),
                    ]
                  ),
                  h.div(
                    [
                      h.DataAttribute("testid", "theme-preview-surface"),
                      h.Class(
                        clsx(
                          "grid min-h-56 content-start shadow-sm",
                          surfaceClassName(model.colorMode),
                          densityPaddingClassName(model.density),
                          radiusClassName(model.radius)
                        )
                      ),
                    ],
                    [previewView(model)]
                  ),
                ]
              ),
              h.section(
                [h.Class(`${panelClassName} grid gap-3`)],
                [
                  h.div(
                    [h.Class("flex items-center justify-between gap-3")],
                    [
                      h.h2([h.Class("text-lg font-semibold text-gray-950")], [
                        "Theme output",
                      ]),
                      h.span([h.Class("text-xs font-medium text-gray-500")], [
                        "Read-only",
                      ]),
                    ]
                  ),
                  h.pre(
                    [
                      h.DataAttribute("testid", "theme-output"),
                      h.Class(
                        "max-h-80 overflow-auto rounded-md bg-gray-950 p-3 text-xs leading-5 text-gray-50"
                      ),
                    ],
                    [h.code([], [themeSnippet(model)])]
                  ),
                ]
              ),
            ]
          ),
        ]
      ),
    ]
  );
});
