import { describe, expect, test } from "vitest";

import * as ButtonDefaultExample from "../../registry/shadcn/button/examples/default/main";
import {
  defaultShadcnThemeName,
  initialShadcnThemeGlobals,
  isShadcnStoryContext,
  resolveShadcnThemeName,
  shadcnThemeCatalog,
  shadcnThemeClassesForGlobals,
  shadcnThemeGlobalKey,
  shadcnThemeGlobalTypes,
  shadcnThemeStyleProperties,
  withShadcnTheme,
} from "./shadcnTheme";

const context = (title: string, globals = initialShadcnThemeGlobals) => ({
  title,
  globals,
  parameters: {},
  args: {},
  argTypes: {},
  canvasElement: document.createElement("div"),
  abortSignal: new AbortController().signal,
  step: async (_name: string, body: () => void | Promise<void>) => {
    await body();
  },
  hooks: {},
  id: "test-story",
  name: "Test",
});

describe("shadcn OpenStory theme support", () => {
  test("selects the source-derived default theme", () => {
    expect(defaultShadcnThemeName).toBe("rhea-neutral-light");
    expect(initialShadcnThemeGlobals).toEqual({
      [shadcnThemeGlobalKey]: defaultShadcnThemeName,
    });
    expect(resolveShadcnThemeName(initialShadcnThemeGlobals)).toBe(defaultShadcnThemeName);
  });

  test("maps every toolbar item to a derived theme", () => {
    const themes = new Set(shadcnThemeCatalog.themes.map((theme) => theme.name));
    const items = shadcnThemeGlobalTypes[shadcnThemeGlobalKey].toolbar.items;

    expect(items.length).toBe(shadcnThemeCatalog.themes.length);
    for (const item of items) {
      expect(themes.has(String(item.value))).toBe(true);
    }
  });

  test("builds wrapper class names and CSS variables from globals", () => {
    const globals = { [shadcnThemeGlobalKey]: "rhea-neutral-dark" };

    expect(shadcnThemeClassesForGlobals(globals)).toContain("shadcn-theme-rhea");
    expect(shadcnThemeClassesForGlobals(globals)).toContain("dark");
    expect(shadcnThemeStyleProperties(globals)["--primary"]).toBe("210 40% 98%");
  });

  test("leaves non-shadcn stories unwrapped", () => {
    const story = { untouched: true };
    const decorated = withShadcnTheme(() => story, context("base-ui/Button"));

    expect(isShadcnStoryContext(context("base-ui/Button"))).toBe(false);
    expect(decorated).toBe(story);
  });

  test("wraps shadcn stories with a themed program view", () => {
    const decorated = withShadcnTheme(
      () => ButtonDefaultExample,
      context("shadcn/Button", { [shadcnThemeGlobalKey]: "rhea-neutral-dark" }),
    );

    expect(decorated).not.toBe(ButtonDefaultExample);
    expect(decorated).toMatchObject({
      Model: ButtonDefaultExample.Model,
      init: ButtonDefaultExample.init,
      update: ButtonDefaultExample.update,
    });
    expect(decorated).toHaveProperty("view");
  });
});
