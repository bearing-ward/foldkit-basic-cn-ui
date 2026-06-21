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

export const shadcnThemeCatalog = themeContract;

export const shadcnThemeNames = themeContract.themes.map((theme) => theme.name);

export const defaultShadcnThemeName =
  `${themeContract.defaultStyle}-${themeContract.defaultBaseColor}-${themeContract.defaultMode}`;

export const shadcnThemeGlobalTypes = {
  [shadcnThemeGlobalKey]: {
    name: "shadcn theme",
    description: "Source-derived shadcn style, base color, and mode.",
    defaultValue: defaultShadcnThemeName,
    toolbar: {
      title: "shadcn",
      icon: "circlehollow",
      dynamicTitle: true,
      items: themeContract.themes.map((theme) => ({
        value: theme.name,
        title: theme.label,
      })),
    },
  },
} satisfies Preview["globalTypes"];

export const initialShadcnThemeGlobals = {
  [shadcnThemeGlobalKey]: defaultShadcnThemeName,
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

const findTheme = (themeName: unknown): ShadcnThemeEntry =>
  themeContract.themes.find((theme) => theme.name === themeName) ?? defaultTheme();

export const resolveShadcnThemeName = (
  globals: Record<string, unknown> | undefined,
): string => findTheme(globals?.[shadcnThemeGlobalKey]).name;

export const shadcnThemeClassNameForGlobals = (
  globals: Record<string, unknown> | undefined,
): string => {
  const theme = findTheme(globals?.[shadcnThemeGlobalKey]);
  return `shadcn-theme shadcn-theme-${theme.style} shadcn-theme-${theme.baseColor} ${theme.mode}`;
};

export const shadcnThemeStyleProperties = (
  globals: Record<string, unknown> | undefined,
): Record<string, string> => {
  const theme = findTheme(globals?.[shadcnThemeGlobalKey]);
  return Object.fromEntries(
    Object.entries(theme.tokens).map(([token, value]) => [`--${token}`, value]),
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
    const themeName = resolveShadcnThemeName(globals);
    const storyView = config.view(model, viewInputs) as HtmlChild;
    return h.div(
      [
        h.Class(shadcnThemeClassNameForGlobals(globals)),
        h.DataAttribute("shadcn-theme", themeName),
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
