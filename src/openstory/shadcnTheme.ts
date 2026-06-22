import type { Decorator, Preview, StoryContext } from "openstory/foldkit";
import { html } from "foldkit/html";

import themeContract from "../../registry/upstream/derived/shadcn-theme.json";

type ShadcnThemeContract = typeof themeContract;
type ShadcnThemeEntry = ShadcnThemeContract["themes"][number];

type FoldkitProgramConfig = Readonly<{
  Model: unknown;
  init: (...args: ReadonlyArray<unknown>) => readonly [unknown, ReadonlyArray<unknown>];
  update: (model: unknown, message: unknown) => readonly [unknown, ReadonlyArray<unknown>];
  view: (model: unknown, viewInputs?: unknown) => unknown;
}>;

type FoldkitProgramContainer = Readonly<{
  program: FoldkitProgramConfig | ((args: unknown, context: unknown) => unknown);
}>;

type HtmlChild = Parameters<ReturnType<typeof html<never>>["div"]>[1][number];

export const shadcnThemeGlobalKey = "shadcnTheme";
export const shadcnModeGlobalKey = "shadcnMode";

export const shadcnThemeCatalog = themeContract;

export type ShadcnColorMode = "light" | "dark" | "system";

export type ResolvedShadcnTheme = Readonly<{
  themeName: string;
  themeKey: string;
  requestedMode: ShadcnColorMode;
  resolvedMode: "light" | "dark";
  style: string;
  baseColor: string;
  tokens: Record<string, string>;
}>;

export type ShadcnOpenStoryThemeInput = Readonly<{
  shadcnTheme: ResolvedShadcnTheme;
}>;

const colorModes = [
  "light",
  "dark",
  "system",
] as const satisfies ReadonlyArray<ShadcnColorMode>;

const toTitle = (value: string): string =>
  value
    .split("-")
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join(" ");

const themeKey = (theme: Pick<ShadcnThemeEntry, "style" | "baseColor">): string =>
  `${theme.style}-${theme.baseColor}`;

const uniqueThemeEntriesByKey = themeContract.themes.filter(
  (theme, index, themes) =>
    themes.findIndex((candidate) => themeKey(candidate) === themeKey(theme)) === index,
);

export const shadcnThemeNames = uniqueThemeEntriesByKey.map(themeKey);

export const defaultShadcnThemeName =
  `${themeContract.defaultStyle}-${themeContract.defaultBaseColor}-${themeContract.defaultMode}`;

export const defaultShadcnThemeKey =
  `${themeContract.defaultStyle}-${themeContract.defaultBaseColor}`;

export const shadcnThemeGlobalTypes = {
  [shadcnThemeGlobalKey]: {
    name: "shadcn theme",
    description: "Source-derived shadcn style and base color.",
    defaultValue: defaultShadcnThemeKey,
    toolbar: {
      title: "shadcn",
      icon: "circlehollow",
      dynamicTitle: true,
      items: uniqueThemeEntriesByKey.map((theme) => ({
        value: themeKey(theme),
        title: `${toTitle(theme.style)} ${toTitle(theme.baseColor)}`,
      })),
    },
  },
  [shadcnModeGlobalKey]: {
    name: "shadcn mode",
    description: "Source-derived shadcn color mode.",
    defaultValue: themeContract.defaultMode,
    toolbar: {
      title: "mode",
      icon: "circle",
      dynamicTitle: true,
      items: colorModes.map((mode) => ({
        value: mode,
        title: toTitle(mode),
      })),
    },
  },
} satisfies Preview["globalTypes"];

export const initialShadcnThemeGlobals = {
  [shadcnThemeGlobalKey]: defaultShadcnThemeKey,
  [shadcnModeGlobalKey]: themeContract.defaultMode,
} satisfies Preview["initialGlobals"];

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const hasProgramFields = (value: unknown): value is FoldkitProgramConfig =>
  isObject(value) &&
  "Model" in value &&
  "init" in value &&
  "update" in value &&
  "view" in value;

const hasProgramProperty = (value: unknown): value is FoldkitProgramContainer =>
  isObject(value) && "program" in value;

const defaultTheme = (): ShadcnThemeEntry => {
  const theme = themeContract.themes[0];
  if (theme === undefined) {
    throw new Error("shadcn theme contract must contain at least one theme");
  }
  return theme;
};

const isShadcnColorMode = (value: unknown): value is ShadcnColorMode =>
  typeof value === "string" && colorModes.includes(value as ShadcnColorMode);

const isResolvedMode = (value: unknown): value is "light" | "dark" =>
  value === "light" || value === "dark";

const themeByName = (themeName: unknown): ShadcnThemeEntry | undefined =>
  themeContract.themes.find((theme) => theme.name === themeName);

const themeByKeyAndMode = (
  selectedThemeKey: string,
  mode: "light" | "dark",
): ShadcnThemeEntry | undefined =>
  themeContract.themes.find(
    (theme) => themeKey(theme) === selectedThemeKey && theme.mode === mode,
  );

const selectedThemeKey = (themeKeyValue: unknown): string =>
  typeof themeKeyValue === "string" && shadcnThemeNames.includes(themeKeyValue)
    ? themeKeyValue
    : defaultShadcnThemeKey;

const legacyNovaZincTheme = (
  requestedMode: ShadcnColorMode,
): ResolvedShadcnTheme => {
  const zincTheme =
    themeByKeyAndMode("rhea-zinc", "light") ??
    themeByKeyAndMode(defaultShadcnThemeKey, "light") ??
    defaultTheme();

  return {
    themeName: "nova-zinc-light",
    themeKey: "nova-zinc",
    requestedMode,
    resolvedMode: "light",
    style: "nova",
    baseColor: "zinc",
    tokens: zincTheme.tokens,
  };
};

const resolveSystemMode = (
  systemMode: "light" | "dark" | undefined,
): "light" | "dark" => {
  if (systemMode !== undefined) {
    return systemMode;
  }
  if (
    typeof globalThis.matchMedia === "function" &&
    globalThis.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
};

export const resolveShadcnMode = (
  globals: Record<string, unknown> | undefined,
  systemMode?: "light" | "dark",
): ShadcnColorMode => {
  const requestedMode = globals?.[shadcnModeGlobalKey];
  if (isShadcnColorMode(requestedMode)) {
    return requestedMode;
  }
  if (isResolvedMode(themeContract.defaultMode)) {
    return themeContract.defaultMode;
  }
  return resolveSystemMode(systemMode);
};

const resolvedModeFor = (
  requestedMode: ShadcnColorMode,
  systemMode: "light" | "dark" | undefined,
): "light" | "dark" =>
  requestedMode === "system" ? resolveSystemMode(systemMode) : requestedMode;

export const resolveShadcnTheme = (
  globals: Record<string, unknown> | undefined,
  systemMode?: "light" | "dark",
): ResolvedShadcnTheme => {
  const requestedTheme = globals?.[shadcnThemeGlobalKey];
  const oldCombinedTheme = themeByName(globals?.[shadcnThemeGlobalKey]);
  if (oldCombinedTheme !== undefined) {
    return {
      themeName: oldCombinedTheme.name,
      themeKey: themeKey(oldCombinedTheme),
      requestedMode: oldCombinedTheme.mode as ShadcnColorMode,
      resolvedMode: oldCombinedTheme.mode as "light" | "dark",
      style: oldCombinedTheme.style,
      baseColor: oldCombinedTheme.baseColor,
      tokens: oldCombinedTheme.tokens,
    };
  }

  if (requestedTheme === "nova-zinc-light") {
    return legacyNovaZincTheme("light");
  }

  const requestedMode = resolveShadcnMode(globals, systemMode);

  if (requestedTheme === "nova-zinc") {
    return legacyNovaZincTheme(requestedMode);
  }

  const resolvedMode = resolvedModeFor(requestedMode, systemMode);
  const selectedKey = selectedThemeKey(globals?.[shadcnThemeGlobalKey]);
  const fallbackDefaultKey = `${themeContract.defaultStyle}-${themeContract.defaultBaseColor}`;
  const fallbackDefaultMode = isResolvedMode(themeContract.defaultMode)
    ? themeContract.defaultMode
    : "light";

  const theme =
    themeByKeyAndMode(selectedKey, resolvedMode) ??
    themeByKeyAndMode(selectedKey, fallbackDefaultMode) ??
    themeByKeyAndMode(fallbackDefaultKey, resolvedMode) ??
    defaultTheme();

  return {
    themeName: theme.name,
    themeKey: themeKey(theme),
    requestedMode,
    resolvedMode: theme.mode as "light" | "dark",
    style: theme.style,
    baseColor: theme.baseColor,
    tokens: theme.tokens,
  };
};

export const resolveShadcnThemeName = (
  globals: Record<string, unknown> | undefined,
  systemMode?: "light" | "dark",
): string => resolveShadcnTheme(globals, systemMode).themeName;

export const shadcnThemeClassesForGlobals = (
  globals: Record<string, unknown> | undefined,
  systemMode?: "light" | "dark",
): string => {
  const theme = resolveShadcnTheme(globals, systemMode);
  return `shadcn-theme shadcn-theme-${theme.style} shadcn-theme-${theme.baseColor} ${theme.resolvedMode} bg-background text-foreground`;
};

export const shadcnThemeColorVariableValue = (value: string): string => {
  if (/^(oklch|hsl|var)\(/u.test(value) || value.includes("/")) {
    return value;
  }
  return `hsl(${value})`;
};

export const shadcnThemeStyleProperties = (
  globals: Record<string, unknown> | undefined,
  systemMode?: "light" | "dark",
): Record<string, string> => {
  const theme = resolveShadcnTheme(globals, systemMode);
  return Object.fromEntries(
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
    }),
  );
};

export const isShadcnStoryContext = (
  context: Pick<StoryContext<unknown>, "title" | "parameters">,
): boolean => {
  if (context.title.startsWith("shadcn/")) {
    return true;
  }
  return context.parameters.shadcn === true;
};

const wrapProgramConfig = (
  config: FoldkitProgramConfig,
  globals: Record<string, unknown> | undefined,
): FoldkitProgramConfig => ({
  ...config,
  view: (model, viewInputs) => {
    const h = html<never>();
    const resolvedTheme = resolveShadcnTheme(globals);
    const storyView = config.view(
      model,
      isObject(viewInputs)
        ? { ...viewInputs, shadcnTheme: resolvedTheme }
        : { shadcnTheme: resolvedTheme },
    ) as HtmlChild;
    return h.div(
      [
        h.Class(shadcnThemeClassesForGlobals(globals)),
        h.DataAttribute("shadcn-theme", resolvedTheme.themeName),
        h.DataAttribute("shadcn-theme-key", resolvedTheme.themeKey),
        h.DataAttribute("shadcn-mode", resolvedTheme.requestedMode),
        h.DataAttribute("shadcn-resolved-mode", resolvedTheme.resolvedMode),
        h.DataAttribute("testid", "shadcn-theme-wrapper"),
        h.Style(shadcnThemeStyleProperties(globals)),
      ],
      [storyView],
    );
  },
});

const wrapProgram = (
  value: unknown,
  globals: Record<string, unknown> | undefined,
): unknown => {
  if (hasProgramFields(value)) {
    return wrapProgramConfig(value, globals);
  }
  if (hasProgramProperty(value)) {
    const { program } = value;
    if (hasProgramFields(program)) {
      return { ...value, program: wrapProgramConfig(program, globals) };
    }
  }
  return value;
};

export const withShadcnTheme: Decorator<unknown> = (Story, context) => {
  const story = Story();
  if (!isShadcnStoryContext(context)) {
    return story;
  }
  return wrapProgram(story, context.globals);
};
