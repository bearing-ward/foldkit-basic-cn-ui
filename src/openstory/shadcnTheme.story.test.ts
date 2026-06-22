import { Scene } from "foldkit";
import { html } from "foldkit/html";
import { describe, expect, test } from "vitest";

import * as ButtonDefaultExample from "../../registry/shadcn/button/examples/default/main";
import {
  defaultShadcnThemeKey,
  defaultShadcnThemeName,
  initialShadcnThemeGlobals,
  isShadcnStoryContext,
  resolveShadcnTheme,
  resolveShadcnThemeName,
  shadcnThemeCatalog,
  shadcnThemeClassesForGlobals,
  shadcnThemeColorVariableValue,
  shadcnModeGlobalKey,
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
    expect(defaultShadcnThemeKey).toBe("rhea-neutral");
    expect(initialShadcnThemeGlobals).toEqual({
      [shadcnThemeGlobalKey]: "rhea-neutral",
      [shadcnModeGlobalKey]: "light",
    });
    expect(resolveShadcnThemeName(initialShadcnThemeGlobals)).toBe(defaultShadcnThemeName);
  });

  test("maps toolbar items to de-duplicated theme keys and color modes", () => {
    const themeKeys = new Set(
      shadcnThemeCatalog.themes.map((theme) => `${theme.style}-${theme.baseColor}`),
    );
    const items = shadcnThemeGlobalTypes[shadcnThemeGlobalKey].toolbar.items;
    const modes = shadcnThemeGlobalTypes[shadcnModeGlobalKey].toolbar.items;
    const itemValues = items.map((item) => item.value);

    expect(items.length).toBe(themeKeys.size);
    for (const item of items) {
      expect(themeKeys.has(String(item.value))).toBe(true);
    }
    for (const value of [
      "rhea-neutral",
      "rhea-stone",
      "rhea-amber",
      "rhea-violet",
      "rhea-yellow",
    ]) {
      expect(itemValues).toContain(value);
    }
    expect(modes.map((item) => item.value)).toEqual(["light", "dark", "system"]);
  });

  test("resolves selected theme and mode globals", () => {
    expect(
      resolveShadcnTheme({
        [shadcnThemeGlobalKey]: "rhea-amber",
        [shadcnModeGlobalKey]: "dark",
      }),
    ).toMatchObject({
      themeName: "rhea-amber-dark",
      themeKey: "rhea-amber",
      requestedMode: "dark",
      resolvedMode: "dark",
    });

    expect(
      resolveShadcnTheme({
        [shadcnThemeGlobalKey]: "nova-zinc",
        [shadcnModeGlobalKey]: "dark",
      }),
    ).toMatchObject({
      themeName: "nova-zinc-light",
      themeKey: "nova-zinc",
      requestedMode: "dark",
      resolvedMode: "light",
    });

    expect(
      resolveShadcnTheme(
        {
          [shadcnThemeGlobalKey]: "rhea-neutral",
          [shadcnModeGlobalKey]: "system",
        },
        "dark",
      ),
    ).toMatchObject({
      themeName: "rhea-neutral-dark",
      themeKey: "rhea-neutral",
      requestedMode: "system",
      resolvedMode: "dark",
    });
  });

  test("keeps old combined theme-name globals compatible", () => {
    expect(resolveShadcnThemeName({ [shadcnThemeGlobalKey]: "rhea-neutral-dark" })).toBe(
      "rhea-neutral-dark",
    );
    expect(resolveShadcnTheme({ [shadcnThemeGlobalKey]: "nova-zinc-light" })).toMatchObject({
      themeName: "nova-zinc-light",
      themeKey: "nova-zinc",
      style: "nova",
      baseColor: "zinc",
      resolvedMode: "light",
    });
  });

  test("builds wrapper class names and CSS variables from globals", () => {
    const globals = {
      [shadcnThemeGlobalKey]: "rhea-neutral",
      [shadcnModeGlobalKey]: "dark",
    };

    expect(shadcnThemeClassesForGlobals(globals)).toContain("shadcn-theme-rhea");
    expect(shadcnThemeClassesForGlobals(globals)).toContain("dark");
    expect(shadcnThemeClassesForGlobals(globals)).toContain("bg-background");
    expect(shadcnThemeClassesForGlobals(globals)).toContain("text-foreground");
    expect(shadcnThemeStyleProperties(globals)["--primary"]).toMatch(/^oklch\(/u);
    expect(shadcnThemeStyleProperties(globals)["--color-primary"]).toBe(
      shadcnThemeStyleProperties(globals)["--primary"],
    );
    expect(shadcnThemeColorVariableValue("210 40% 98%")).toBe("hsl(210 40% 98%)");
    expect(shadcnThemeColorVariableValue("oklch(0.922 0 0)")).toBe(
      "oklch(0.922 0 0)",
    );
    expect(shadcnThemeStyleProperties(globals)["--radius-md"]).toBe(
      "calc(0.625rem - 2px)",
    );
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
      context("shadcn/Button", {
        [shadcnThemeGlobalKey]: "rhea-neutral",
        [shadcnModeGlobalKey]: "dark",
      }),
    );

    expect(decorated).not.toBe(ButtonDefaultExample);
    expect(decorated).toMatchObject({
      Model: ButtonDefaultExample.Model,
      init: ButtonDefaultExample.init,
      update: ButtonDefaultExample.update,
    });
    expect(decorated).toHaveProperty("view");
  });

  test("wraps shadcn story output with theme data attributes", () => {
    const decorated = withShadcnTheme(
      () => ButtonDefaultExample,
      context("shadcn/Button", {
        [shadcnThemeGlobalKey]: "rhea-neutral",
        [shadcnModeGlobalKey]: "dark",
      }),
    ) as typeof ButtonDefaultExample;

    Scene.scene(
      { update: decorated.update, view: decorated.view },
      Scene.with({}),
      Scene.expect(Scene.testId("shadcn-theme-wrapper")).toHaveAttr(
        "data-shadcn-theme",
        "rhea-neutral-dark",
      ),
      Scene.expect(Scene.testId("shadcn-theme-wrapper")).toHaveAttr(
        "data-shadcn-theme-key",
        "rhea-neutral",
      ),
      Scene.expect(Scene.testId("shadcn-theme-wrapper")).toHaveAttr(
        "data-shadcn-mode",
        "dark",
      ),
      Scene.expect(Scene.testId("shadcn-theme-wrapper")).toHaveAttr(
        "data-shadcn-resolved-mode",
        "dark",
      ),
    );
  });

  test("passes resolved shadcn theme through view inputs", () => {
    const Model = ButtonDefaultExample.Model;
    const capturedView = {
      Model,
      init: ButtonDefaultExample.init,
      update: ButtonDefaultExample.update,
      view: (_model: unknown, viewInputs?: unknown) => {
        const h = html<never>();
        const shadcnTheme =
          typeof viewInputs === "object" && viewInputs !== null && "shadcnTheme" in viewInputs
            ? viewInputs.shadcnTheme
            : undefined;

        return h.div(
          [
            h.DataAttribute("testid", "captured-theme"),
            h.DataAttribute(
              "captured-style",
              typeof shadcnTheme === "object" &&
                shadcnTheme !== null &&
                "style" in shadcnTheme &&
                typeof shadcnTheme.style === "string"
                ? shadcnTheme.style
                : "missing",
            ),
          ],
          ["Captured"],
        );
      },
    };
    const decorated = withShadcnTheme(
      () => capturedView,
      context("shadcn/Button", {
        [shadcnThemeGlobalKey]: "nova-zinc",
        [shadcnModeGlobalKey]: "dark",
      }),
    ) as typeof capturedView;

    Scene.scene(
      { update: decorated.update, view: decorated.view },
      Scene.with({}),
      Scene.expect(Scene.testId("captured-theme")).toHaveAttr(
        "data-captured-style",
        "nova",
      ),
      Scene.expect(Scene.testId("shadcn-theme-wrapper")).toHaveAttr(
        "data-shadcn-resolved-mode",
        "light",
      ),
    );
  });

  test("renders a style-aware Button example with the selected OpenStory theme", () => {
    const decorated = withShadcnTheme(
      () => ButtonDefaultExample,
      context("shadcn/Button", {
        [shadcnThemeGlobalKey]: "nova-zinc",
        [shadcnModeGlobalKey]: "light",
      }),
    ) as typeof ButtonDefaultExample;

    Scene.scene(
      { update: decorated.update, view: decorated.view },
      Scene.with({}),
      Scene.expect(Scene.role("button", { name: "Button" })).toHaveAttr(
        "data-style",
        "base-nova",
      ),
    );
  });
});
