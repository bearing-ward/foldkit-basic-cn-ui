# Plan 023: Add OpenStory shadcn theme and mode selectors

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the next
> step. If anything in the "STOP conditions" section occurs, stop and report -
> do not improvise. When done, update the status row for this plan in
> `plans/README.md` unless a reviewer dispatched you and told you they maintain
> the index.
>
> **Drift check (run first)**:
> `git diff --stat 588a5759..HEAD -- src/preview.ts src/openstory/shadcnTheme.ts src/openstory/shadcnTheme.story.test.ts registry/upstream/derived/shadcn-theme.json registry/shadcn/button/ui/config.ts registry/shadcn/button/ui/view.ts registry/shadcn/button/ui/shadcn-button.scene.test.ts registry/shadcn/button/examples registry/shadcn/registry.json scripts/check-upstream-reference-contract.mjs scripts/generate-openstory-stories.mjs src/openstory/generated docs/product/project-invariants-scorecard.md plans/README.md`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition. This plan depends on Plan 022's Button
> POC. If `registry/shadcn/button/ui/config.ts` does not exist or does not export
> `buttonRecipeByStyle`, stop and execute/merge Plan 022 first.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: MED
- **Depends on**: plans/022-codify-component-local-configuration-poc.md
- **Category**: direction
- **Planned at**: commit `588a5759`, 2026-06-22

## Why this matters

OpenStory currently has one combined `shadcnTheme` toolbar value such as
`rhea-neutral-light`. That makes it awkward to inspect the same component across
theme families while independently switching light, dark, and system mode. It
also does not yet connect the OpenStory selection to component-local recipe
configuration introduced by the Button POC.

After this plan, OpenStory will expose a theme selector and a separate
light/dark/system selector for shadcn stories. The selected token theme will
apply to every shadcn story through the existing wrapper. Components that have
theme-specific local recipes, such as Button, may opt into the selected style;
components that do not have settings for the selected theme must gracefully fall
back to their local default while still receiving the selected token variables.

## Current state

This is a Foldkit app. Follow `AGENTS.md`: examples and app code must remain
Foldkit-native, use schema-backed models/messages, avoid React runtime source,
and use `html<Message>()` inside view functions.

Relevant commands from `package.json:5-34`:

```json
"dev": "openstory dev --framework foldkit --port 6173",
"build": "bun scripts/build-openstory-site.mjs",
"check:registry": "bun scripts/build-registry.mjs --check && bun scripts/check-registry-order.mjs && bun scripts/check-registry-metadata.mjs && bun scripts/check-upstream-reference-contract.mjs && bun scripts/check-no-component-classname-api.mjs && bun scripts/check-example-tests.mjs && bun scripts/check-openstory-stories.mjs && bun scripts/check-primitive-coverage.mjs && bun scripts/check-shadcn-doc-examples.mjs && bun scripts/check-origin-content-parity-agenda.mjs && bun scripts/check-origin-visual-parity-coverage.mjs && bun run check:invariants",
"typecheck": "tsc --noEmit",
"test": "vitest run",
"openstory:generate": "bun scripts/generate-openstory-stories.mjs",
"openstory:check": "bun scripts/check-openstory-stories.mjs"
```

The upstream-derived theme contract already has separate dimensions for style,
base color, and mode. It currently records defaults and available names:

```json
// registry/upstream/derived/shadcn-theme.json:8-20
"defaultStyle": "rhea",
"defaultBaseColor": "neutral",
"defaultMode": "light",
"styleNames": [
  "nova",
  "vega",
  "maia",
  "lyra",
  "mira",
  "luma",
  "sera",
  "rhea"
],
```

The OpenStory theme helper currently exposes one combined toolbar global:

```ts
// src/openstory/shadcnTheme.ts:22-50
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
```

The wrapper applies token variables and dark/light classes from that combined
theme:

```ts
// src/openstory/shadcnTheme.ts:80-120
export const shadcnThemeClassesForGlobals = (
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
```

`src/preview.ts` duplicates a small hard-coded subset instead of importing the
derived globals:

```ts
// src/preview.ts:6-26
const preview: Preview = {
    parameters: { layout: "centered" },
    globalTypes: {
        shadcnTheme: {
            name: "shadcn theme",
            description: "Source-derived shadcn style, base color, and mode.",
            defaultValue: "rhea-neutral-light",
            toolbar: {
                title: "shadcn",
                icon: "circlehollow",
                dynamicTitle: true,
                items: [
                    { value: "rhea-neutral-light", title: "Rhea Neutral Light" },
                    { value: "rhea-neutral-dark", title: "Rhea Neutral Dark" },
                    { value: "nova-zinc-light", title: "Nova Zinc Light" },
                ],
            },
        },
    },
    initialGlobals: { shadcnTheme: "rhea-neutral-light" },
    decorators: [withShadcnTheme],
}
```

The upstream reference guard currently assumes `src/preview.ts` owns literal
toolbar values. That guard must change when preview switches to derived globals:

```js
// scripts/check-upstream-reference-contract.mjs:134-152
if (exists("src/preview.ts")) {
  const previewSource = readText("src/preview.ts");
  const shadcnThemeContract = exists("registry/upstream/derived/shadcn-theme.json")
    ? readJson("registry/upstream/derived/shadcn-theme.json")
    : { themes: [] };
  const expectedThemeValues = (shadcnThemeContract.themes ?? [])
    .map((theme) => theme.name)
    .sort();
  const previewThemeValues = [
    ...previewSource.matchAll(/value:\s*["']([^"']+)["']/gu),
  ]
    .map((match) => match[1])
    .filter((value) => value.includes("-"))
    .sort();

  if (JSON.stringify(previewThemeValues) !== JSON.stringify(expectedThemeValues)) {
    failures.push(
      "src/preview.ts shadcn toolbar values must match the derived shadcn theme contract"
    );
  }
}
```

The current unit tests prove the combined global, wrapper, and non-shadcn
no-op behavior:

```ts
// src/openstory/shadcnTheme.story.test.ts:33-58
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
```

Plan 022 introduces component-local Button recipes. The current Button config
has two local recipe names that do not exactly match the upstream theme contract
style names:

```ts
// registry/shadcn/button/ui/config.ts:5-8,37
export const defaultButtonStyle = "new-york-v4";

export const buttonRecipeByStyle = {
  "new-york-v4": {
    // ...
  },
  "base-nova": {
    // ...
  },
} as const;
```

This mismatch is intentional for the POC and must be handled explicitly: the
OpenStory selected theme style, such as `nova`, is not guaranteed to be a
component recipe key, such as `base-nova`. Each component with local recipe
settings needs a component-owned alias/fallback resolver.

Memory/repo context to preserve: previous OpenStory investigation found that
shell-level `OpenstoryOptions.ui.theme` may exist in types but was not verified
as wired through the shell. Do not rely on shell customization for this plan.
Use OpenStory `globalTypes`, `initialGlobals`, and the existing decorator path
instead.

## Commands you will need

| Purpose | Command | Expected on success |
| --- | --- | --- |
| Typecheck | `bun run typecheck` | exit 0, no TypeScript errors |
| Focused theme tests | `bun run test -- src/openstory/shadcnTheme.story.test.ts registry/shadcn/button/ui/shadcn-button.scene.test.ts` | exit 0, all tests pass |
| Generate OpenStory stories | `bun run openstory:generate` | exit 0, reports generated stories |
| Check OpenStory stories | `bun run openstory:check` | exit 0, reports checked generated stories |
| Registry gate | `bun run check:registry` | exit 0 |
| Invariant guard | `bun run check:invariants` | exit 0 |
| Whitespace | `git diff --check` | exit 0, no output |

## Scope

**In scope**:

- `src/openstory/shadcnTheme.ts`
- `src/openstory/shadcnTheme.story.test.ts`
- `src/preview.ts`
- `registry/shadcn/button/ui/config.ts`
- `registry/shadcn/button/ui/view.ts`
- `registry/shadcn/button/ui/shadcn-button.scene.test.ts`
- Button examples under `registry/shadcn/button/examples/**/main.ts` only if
  needed to pass the selected OpenStory style into Button rendering
- `scripts/check-upstream-reference-contract.mjs`
- Generated OpenStory stories under `src/openstory/generated/**` only through
  `bun run openstory:generate`
- Generated public registry artifacts under `apps/docs/public/**` only if the
  Button config changes require `bun run build:registry`
- `plans/README.md` status row for this plan

**Out of scope**:

- Do not edit OpenStory package source under `../openstory`.
- Do not rely on `OpenstoryOptions.ui.theme`; this plan uses preview globals and
  decorators.
- Do not bulk-migrate every shadcn component to local style recipes. Button is
  the only required recipe-aware component in this plan.
- Do not change the upstream theme contract by hand. If the contract is stale,
  stop and report; use a separate upstream-sync plan.
- Do not manually edit generated files. Regenerate them with the listed scripts.
- Do not change non-shadcn stories; they must remain unwrapped.

## Git workflow

- Branch: `codex/023-openstory-theme-mode-selectors`.
- Commit after the plan is complete and all verification is green, if the
  operator asks for a commit.
- Do not push or open a PR unless explicitly instructed.

## Steps

### Step 1: Split OpenStory globals into theme and mode

In `src/openstory/shadcnTheme.ts`, replace the single combined-global model
with separate globals:

- `shadcnThemeGlobalKey = "shadcnTheme"` remains the theme selector key for
  compatibility, but its values should become theme-family values without mode,
  such as `rhea-neutral`, `nova-zinc`, etc.
- Add `shadcnModeGlobalKey = "shadcnMode"` with values:
  - `"light"`
  - `"dark"`
  - `"system"`

Build theme selector items by de-duplicating `themeContract.themes` on
`${theme.style}-${theme.baseColor}`. The title should omit mode, for example
`"Rhea Neutral"` or `"Nova Zinc"`. Do not hard-code three items.

Keep compatibility with old combined values such as `rhea-neutral-light` in
`resolveShadcnThemeName` so old bookmarks/tests do not break immediately. The
compatibility rule should be: if `globals.shadcnTheme` exactly matches an entry
in `themeContract.themes`, treat it as the full old name and ignore
`globals.shadcnMode` for selecting the theme entry.

Add exported types/helpers:

```ts
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
```

Add helpers named similarly to:

- `resolveShadcnMode(globals, systemMode?)`
- `resolveShadcnTheme(globals, systemMode?)`
- `shadcnThemeClassesForGlobals(globals, systemMode?)`
- `shadcnThemeStyleProperties(globals, systemMode?)`

`systemMode` should be optional and exist mainly for deterministic tests. When
it is omitted in a browser, resolve `"system"` with
`globalThis.matchMedia("(prefers-color-scheme: dark)")`. In non-browser tests or
when `matchMedia` is unavailable, default system to `"light"`.

Fallback rules when an exact theme entry is missing:

1. Try selected `${style}-${baseColor}-${resolvedMode}`.
2. Try selected `${style}-${baseColor}-${themeContract.defaultMode}`.
3. Try `${themeContract.defaultStyle}-${themeContract.defaultBaseColor}-${resolvedMode}`.
4. Fall back to the first theme entry; if the contract is empty, throw the
   existing clear error.

**Verify**:

```sh
bun run test -- src/openstory/shadcnTheme.story.test.ts
```

Expected result at this step: tests may fail because they still expect the old
combined model. TypeScript should not be run until the tests are updated in Step
2.

### Step 2: Update OpenStory theme tests for separate selectors

Update `src/openstory/shadcnTheme.story.test.ts` to cover the new behavior.
Keep the existing non-shadcn no-op and wrapper tests, but change the global
expectations.

Required tests:

- `initialShadcnThemeGlobals` equals:

```ts
{
  [shadcnThemeGlobalKey]: "rhea-neutral",
  [shadcnModeGlobalKey]: "light",
}
```

- `shadcnThemeGlobalTypes[shadcnThemeGlobalKey].toolbar.items` contains
  de-duplicated theme keys, not every light/dark theme entry.
- `shadcnThemeGlobalTypes[shadcnModeGlobalKey].toolbar.items` has exactly
  `light`, `dark`, and `system`.
- `resolveShadcnTheme({ shadcnTheme: "rhea-neutral", shadcnMode: "dark" })`
  resolves to `rhea-neutral-dark`.
- `resolveShadcnTheme({ shadcnTheme: "nova-zinc", shadcnMode: "dark" })`
  resolves to `nova-zinc-light`, records `requestedMode: "dark"`, and records
  `resolvedMode: "light"` because the checked-in contract does not currently
  include `nova-zinc-dark`.
- `resolveShadcnTheme({ shadcnTheme: "rhea-neutral", shadcnMode: "system" }, "dark")`
  resolves to `rhea-neutral-dark` and records `requestedMode: "system"`.
- `resolveShadcnThemeName({ shadcnTheme: "rhea-neutral-dark" })` still returns
  `rhea-neutral-dark` for old combined values.
- The wrapper adds data attributes:
  - `data-shadcn-theme="<resolved full theme name>"`
  - `data-shadcn-theme-key="<style-baseColor>"`
  - `data-shadcn-mode="<requested mode>"`
  - `data-shadcn-resolved-mode="<light|dark>"`

**Verify**:

```sh
bun run test -- src/openstory/shadcnTheme.story.test.ts
```

Expected result: all tests in that file pass.

### Step 3: Use the derived globals in `src/preview.ts`

Replace the hard-coded `globalTypes` and `initialGlobals` in `src/preview.ts`
with imports from `src/openstory/shadcnTheme.ts`.

Target shape:

```ts
import {
    initialShadcnThemeGlobals,
    shadcnThemeGlobalTypes,
    withShadcnTheme,
} from "./openstory/shadcnTheme"

const preview: Preview = {
    parameters: { layout: "centered" },
    globalTypes: shadcnThemeGlobalTypes,
    initialGlobals: initialShadcnThemeGlobals,
    decorators: [withShadcnTheme],
}
```

Match the file's current formatting style. Do not hand-maintain a duplicate
toolbar list in `src/preview.ts`.

**Verify**:

```sh
bun run typecheck
```

Expected result: exit 0.

### Step 4: Pass resolved theme selection through the decorator

In `src/openstory/shadcnTheme.ts`, add a small exported view-input contract for
component recipe opt-in:

```ts
export type ShadcnOpenStoryThemeInput = Readonly<{
  shadcnTheme: ResolvedShadcnTheme;
}>;
```

Update `wrapProgramConfig` so that, in addition to wrapping the returned view in
token classes/styles, it passes the resolved selection into the program view:

- If `viewInputs` is an object, merge `{ shadcnTheme: resolvedTheme }` into it.
- If `viewInputs` is absent or not an object, pass `{ shadcnTheme: resolvedTheme }`.
- Preserve all existing fields in `viewInputs`.

The wrapper should continue to render all selected token CSS variables on the
outer wrapper so components that do not know about local recipes still visually
respond to color/radius token changes.

Do not require every story to consume `viewInputs`. Ignoring the input is the
supported fallback for components that have no settings for the selected theme.

**Verify**:

```sh
bun run test -- src/openstory/shadcnTheme.story.test.ts
```

Expected result: exit 0. Add or update a test that wraps a fake program whose
`view` captures the second argument and proves it receives
`viewInputs.shadcnTheme`.

### Step 5: Add Button's component-owned style fallback mapping

In `registry/shadcn/button/ui/config.ts`, keep the component-owned recipe map
from Plan 022 and add a component-owned mapping from selected OpenStory theme
style to local Button recipe style.

Required behavior:

- OpenStory selected style `"rhea"` maps to Button recipe `"new-york-v4"`.
- OpenStory selected style `"nova"` maps to Button recipe `"base-nova"`.
- Any unsupported selected style, such as `"vega"` or `"lyra"`, falls back to
  `defaultButtonStyle`.
- Passing a direct Button recipe key, such as `"base-nova"`, still works.

One acceptable target shape:

```ts
export const buttonStyleAliases = {
  rhea: "new-york-v4",
  nova: "base-nova",
} as const satisfies Record<string, ButtonStyleName>;

export const resolveButtonStyle = (
  style: ButtonStyleName | keyof typeof buttonStyleAliases | string | null | undefined,
): ButtonStyleName => {
  if (style === undefined || style === null) {
    return defaultButtonStyle;
  }
  if (style in buttonRecipeByStyle) {
    return style as ButtonStyleName;
  }
  return buttonStyleAliases[style as keyof typeof buttonStyleAliases] ?? defaultButtonStyle;
};
```

Use a tighter implementation if TypeScript allows it cleanly. Do not use broad
`as any`; if a cast is needed, keep it local and justified by key lookup.

Update `registry/shadcn/button/ui/shadcn-button.scene.test.ts` to prove:

- `Button.resolveButtonStyle("nova")` returns `"base-nova"`.
- `Button.resolveButtonStyle("vega")` returns `Button.defaultButtonStyle`.
- `Button.buttonVariants({ style: "nova" })` includes the `base-nova` marker
  class `group/button`.

**Verify**:

```sh
bun run test -- registry/shadcn/button/ui/shadcn-button.scene.test.ts
```

Expected result: exit 0.

### Step 6: Let Button examples consume the OpenStory theme input

Update Button example views under `registry/shadcn/button/examples/**/main.ts`
so they can accept the selected OpenStory theme input and pass the selected
style into `Button.view`.

Use a local type import from the OpenStory helper only in examples:

```ts
import type { ShadcnOpenStoryThemeInput } from "../../../../../src/openstory/shadcnTheme";
```

Then accept the second view argument where needed:

```ts
export const view = Submodel.defineView<Model, Message>(
  (_model, viewInputs?: ShadcnOpenStoryThemeInput): Html => {
    const h = html<Message>();
    const style = viewInputs?.shadcnTheme.style;

    return Button.view<Message>({
      style,
      children: ["Button"],
    });
  }
);
```

Keep examples Foldkit-native. Do not add state just to carry theme selection;
theme is a view input supplied by OpenStory.

You do not need to update every Button example if the repeated change becomes
large; at minimum update:

- `registry/shadcn/button/examples/default/main.ts`
- `registry/shadcn/button/examples/basic/main.ts`
- `registry/shadcn/button/examples/destructive/main.ts`
- `registry/shadcn/button/examples/size/main.ts`

If you update only this subset, add a `NOTE` in the plan result or PR summary
that remaining Button examples still use the default component recipe until a
follow-up bulk example pass.

**Verify**:

```sh
bun run test -- $(find registry/shadcn/button/examples -name '*.scene.test.ts' | sort)
```

Expected result: all Button example scene tests pass.

### Step 7: Regenerate OpenStory stories and registry artifacts if needed

Before regenerating, update `scripts/check-upstream-reference-contract.mjs` so
it verifies the new derived-global preview contract instead of scraping literal
toolbar values from `src/preview.ts`.

Required guard behavior:

- `src/openstory/shadcnTheme.ts` must still import
  `../../registry/upstream/derived/shadcn-theme.json`.
- `src/preview.ts` must import `shadcnThemeGlobalTypes` and
  `initialShadcnThemeGlobals` from `./openstory/shadcnTheme`.
- `src/preview.ts` must assign `globalTypes: shadcnThemeGlobalTypes`.
- `src/preview.ts` must assign `initialGlobals: initialShadcnThemeGlobals`.
- `src/preview.ts` must not hard-code shadcn token names.
- Do not require literal `value: "style-base-mode"` toolbar entries in
  `src/preview.ts`; those now live in the derived helper.

**Verify**:

```sh
bun scripts/check-upstream-reference-contract.mjs
```

Expected result: exit 0.

Run:

```sh
bun run openstory:generate
```

Expected result: exits 0 and reports generated OpenStory registry stories.

If Step 5 or Step 6 changes installable registry source, run:

```sh
bun run build:registry
```

Expected result: exits 0 and reports built registry items.

Do not hand-edit generated files. If generated files change, include them in the
diff.

### Step 8: Run final verification

Run all commands:

```sh
bun run typecheck
bun run test -- src/openstory/shadcnTheme.story.test.ts registry/shadcn/button/ui/shadcn-button.scene.test.ts $(find registry/shadcn/button/examples -name '*.scene.test.ts' | sort)
bun run openstory:check
bun run check:registry
bun run check:invariants
git diff --check
```

Expected result: every command exits 0.

Finally, inspect the diff:

```sh
git status --short
```

Expected result: source changes are limited to the scope above plus generated
artifacts from the approved generation commands.

## Test plan

Add/maintain tests in `src/openstory/shadcnTheme.story.test.ts` for:

- separate theme and mode globals;
- old combined theme-name compatibility;
- light/dark/system resolution;
- fallback when selected theme+mode is missing;
- wrapper classes, data attributes, and CSS variable output;
- view-input injection into wrapped programs;
- non-shadcn stories staying unwrapped.

Add/maintain tests in `registry/shadcn/button/ui/shadcn-button.scene.test.ts`
for:

- Button style alias mapping from upstream theme style to component recipe key;
- fallback to `defaultButtonStyle` for unsupported selected styles;
- `buttonVariants({ style: "nova" })` using the `base-nova` recipe.

Existing Button example scene tests should continue to pass. If updated examples
consume OpenStory view inputs, add one Button example scene assertion that a
style-aware example can render when `viewInputs` contains a `nova` style.

## Done criteria

All must hold:

- [ ] OpenStory exposes one shadcn theme selector with values like
  `rhea-neutral` and one mode selector with `light`, `dark`, `system`.
- [ ] `src/preview.ts` imports derived globals from `src/openstory/shadcnTheme.ts`
  and does not hard-code toolbar items.
- [ ] `scripts/check-upstream-reference-contract.mjs` verifies the derived
  preview globals contract instead of requiring literal toolbar values in
  `src/preview.ts`.
- [ ] `withShadcnTheme` applies selected token variables and mode classes to
  all shadcn stories.
- [ ] `withShadcnTheme` leaves non-shadcn stories unchanged.
- [ ] `system` mode resolves deterministically in tests and through
  `matchMedia` in browsers.
- [ ] Old combined theme names such as `rhea-neutral-dark` still resolve.
- [ ] Missing theme/mode combinations such as `nova-zinc-dark` fall back to the
  selected theme's default-mode entry, currently `nova-zinc-light`, instead of
  crashing.
- [ ] Components without selected-theme recipe settings gracefully use their
  default recipe while still receiving wrapper token variables.
- [ ] Button maps selected OpenStory style `nova` to local recipe `base-nova`
  and unsupported selected styles to `defaultButtonStyle`.
- [ ] All final verification commands in Step 8 exit 0.
- [ ] `plans/README.md` status row for plan 023 is updated.

## STOP conditions

Stop and report back if:

- Plan 022's Button config POC is absent or not merged.
- OpenStory `Preview["globalTypes"]` does not support multiple toolbar globals.
- The decorator cannot pass a second `viewInputs` argument to Foldkit story
  programs without changing OpenStory package source.
- Implementing selected component recipes appears to require global mutable
  state, DOM reads inside component views, or React runtime code.
- The upstream theme contract lacks enough data to derive at least one theme key
  and at least light/dark mode behavior. A missing theme/mode combination, such
  as `nova-zinc-dark`, is not by itself a STOP condition; use the fallback rules
  in Step 1.
- Final verification requires touching files outside the declared scope after
  this plan's scope has been updated to include
  `scripts/check-upstream-reference-contract.mjs`.

## Maintenance notes

- This plan intentionally makes Button the first component that responds to the
  selected OpenStory style at the recipe level. Other components should follow
  the same component-owned alias/fallback pattern when they gain local style
  recipes.
- The token wrapper applies to every shadcn story immediately. Recipe-level
  changes are opt-in because many components do not yet have theme-specific
  local recipe maps.
- Reviewers should scrutinize fallback behavior. A missing component recipe for
  a selected theme must never crash a story or silently remove token theming.
- If future work adds a first-class registry-wide style catalog, it should
  preserve `P13_COMPONENT_LOCAL_CONFIG`: global catalogs can list available
  themes, but component-specific recipe mappings stay in the component folder.
