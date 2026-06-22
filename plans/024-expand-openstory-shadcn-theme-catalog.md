# Plan 024: Expand OpenStory shadcn theme catalog and background theming

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the next
> step. If anything in the "STOP conditions" section occurs, stop and report -
> do not improvise. When done, update the status row for this plan in
> `plans/README.md` unless a reviewer dispatched you and told you they maintain
> the index.
>
> **Drift check (run first)**:
> `git diff --stat dcc69c82..HEAD -- registry/upstream/snapshots/shadcn/themes.ts registry/upstream/snapshots/shadcn/preset-index.d.ts registry/upstream/derived/shadcn-theme.json scripts/sync-upstream-component-contracts.mjs scripts/check-upstream-reference-contract.mjs src/openstory/shadcnTheme.ts src/openstory/shadcnTheme.story.test.ts src/preview.ts tests/e2e/openstory-shadcn-theme.spec.ts`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: MED
- **Depends on**: plans/023-add-openstory-theme-and-mode-selectors.md
- **Category**: direction
- **Planned at**: commit `dcc69c82`, 2026-06-22

## Why this matters

OpenStory now has shadcn theme and mode controls, but the theme catalog is still
a tiny hand-authored subset: `rhea-neutral` and `nova-zinc`. The checked-in
upstream shadcn theme snapshot already contains the larger current theme catalog
used by shadcn, including Neutral, Stone, Zinc, Mauve, Olive, Mist, Taupe, and
color themes such as Amber, Blue, Green, Rose, Violet, and Yellow. The selector
should expose that upstream-derived catalog instead of requiring new manual
entries every time shadcn adds a theme.

This plan also makes the neutral theme visibly own the component preview
background by default. Today the wrapper applies token variables to the
component, but the wrapper class does not include `bg-background` or
`text-foreground`, so the canvas background is not clearly part of the selected
shadcn theme.

## Current state

This is a Foldkit app. Follow `AGENTS.md`: examples and component source must
stay Foldkit-native, use schema-backed models/messages for app state, avoid
React runtime source, and use the existing `html<Message>()` view pattern.

The upstream source contract is documented in
`docs/product/upstream-source-references.md`: checked-in snapshots under
`registry/upstream/snapshots/**` are the local source of truth, and derived
contracts under `registry/upstream/derived/**` are what component and OpenStory
code should read.

The component contract requires shadcn-origin theme tokens and variant
vocabulary to come from checked-in upstream snapshots or reproducible commands.
Relevant excerpt from `docs/product/component-entry-contract.md`:

```md
Base UI and shadcn-origin component content should be derived from checked-in
upstream snapshots or reproducible upstream command output where practical:
examples, visible copy, class contracts, variant names, theme tokens, and API
or anatomy vocabulary.
```

The local upstream snapshot already contains the full shadcn theme list. A
quick scan at plan time found these names in
`registry/upstream/snapshots/shadcn/themes.ts`:

```text
neutral
stone
zinc
mauve
olive
mist
taupe
amber
blue
cyan
emerald
fuchsia
green
indigo
lime
orange
pink
purple
red
rose
sky
teal
violet
yellow
```

The preset package snapshot also exposes base-color and theme metadata in
`registry/upstream/snapshots/shadcn/preset-index.d.ts`:

```ts
declare const PRESET_BASE_COLORS: readonly ["neutral", "stone", "zinc", "gray", "mauve", "olive", "mist", "taupe"];
declare const PRESET_THEMES: readonly ["neutral", "stone", "zinc", "gray", "amber", "blue", "cyan", "emerald", "fuchsia", "green", "indigo", "lime", "orange", "pink", "purple", "red", "rose", "sky", "teal", "violet", "yellow", "mauve", "olive", "mist", "taupe"];
```

The current derived contract does not use the theme snapshot entries. It
hard-codes only three concrete theme entries in
`scripts/sync-upstream-component-contracts.mjs`:

```js
const deriveThemeContract = ({
  themesDigest,
  presetsDigest,
  presetsSnapshot,
}) => {
  const styleNames = arrayLiteral(presetsSnapshot, "PRESET_STYLES");
  const baseColorNames = arrayLiteral(presetsSnapshot, "PRESET_BASE_COLORS");
  const themeNames = arrayLiteral(presetsSnapshot, "PRESET_THEMES");

  return {
    name: "shadcn-theme",
    upstreamSnapshotDigest: sha256(`${themesDigest}:${presetsDigest}`),
    defaultStyle: "rhea",
    defaultBaseColor: "neutral",
    defaultMode: "light",
    styleNames,
    baseColorNames,
    themeNames,
    tokenNames: requiredThemeTokens,
    radiusScale: ["sm", "md", "lg", "xl"],
    themes: [
      { name: "rhea-neutral-light", label: "Rhea Neutral Light", ... },
      { name: "rhea-neutral-dark", label: "Rhea Neutral Dark", ... },
      { name: "nova-zinc-light", label: "Nova Zinc Light", ... },
    ],
  };
};
```

The current `registry/upstream/derived/shadcn-theme.json` therefore has only
three concrete themes:

```json
{
  "defaultStyle": "rhea",
  "defaultBaseColor": "neutral",
  "defaultMode": "light",
  "themes": [
    { "name": "rhea-neutral-light", "style": "rhea", "baseColor": "neutral", "mode": "light" },
    { "name": "rhea-neutral-dark", "style": "rhea", "baseColor": "neutral", "mode": "dark" },
    { "name": "nova-zinc-light", "style": "nova", "baseColor": "zinc", "mode": "light" }
  ]
}
```

`src/openstory/shadcnTheme.ts` already derives toolbar values from
`themeContract.themes`, resolves light/dark/system mode, passes the resolved
theme to story `viewInputs`, and emits Tailwind `--color-*` variables. It does
not apply background/foreground classes to the wrapper:

```ts
h.Class(
  `shadcn-theme shadcn-theme-${resolvedTheme.style} shadcn-theme-${resolvedTheme.baseColor} ${resolvedTheme.resolvedMode}`,
),
h.DataAttribute("shadcn-theme", resolvedTheme.themeName),
h.DataAttribute("shadcn-theme-key", resolvedTheme.themeKey),
h.DataAttribute("shadcn-mode", resolvedTheme.requestedMode),
h.DataAttribute("shadcn-resolved-mode", resolvedTheme.resolvedMode),
h.DataAttribute("testid", "shadcn-theme-wrapper"),
h.Style(shadcnThemeStyleProperties(globals)),
```

`src/preview.ts` must keep literal `globalTypes` because OpenStory's shell
manifest parser only reads object literals. Do not replace these with imported
constants unless OpenStory itself changes. Current excerpt:

```ts
globalTypes: {
    shadcnTheme: {
        name: "shadcn theme",
        description: "Source-derived shadcn style and base color.",
        defaultValue: "rhea-neutral",
        toolbar: {
            title: "shadcn",
            icon: "circlehollow",
            dynamicTitle: true,
            items: [
                { value: "rhea-neutral", title: "Rhea Neutral" },
                { value: "nova-zinc", title: "Nova Zinc" },
            ],
        },
    },
    shadcnMode: {
        name: "shadcn mode",
        description: "Source-derived shadcn color mode.",
        defaultValue: "light",
        toolbar: {
            title: "mode",
            icon: "circle",
            dynamicTitle: true,
            items: [
                { value: "light", title: "Light" },
                { value: "dark", title: "Dark" },
                { value: "system", title: "System" },
            ],
        },
    },
},
initialGlobals: { shadcnTheme: "rhea-neutral", shadcnMode: "light" },
```

The current e2e test verifies the controls and Button color changes, but it only
checks the two current toolbar entries:

```ts
await expect(page.getByLabel("shadcn")).toBeVisible();
await expect(page.getByLabel("mode")).toBeVisible();
...
await page.getByLabel("shadcn").click();
await page.getByRole("option", { name: "Nova Zinc" }).click();
```

## Commands you will need

| Purpose | Command | Expected on success |
| --- | --- | --- |
| Theme contract check | `bun run sync:upstream-contracts -- --check` | exit 0; upstream contract snapshots are current |
| Focused OpenStory theme unit tests | `bun run test -- src/openstory/shadcnTheme.story.test.ts` | exit 0; all tests pass |
| Focused browser test | `bunx playwright test tests/e2e/openstory-shadcn-theme.spec.ts` | exit 0; all tests pass |
| Typecheck | `bun run typecheck` | exit 0; no TypeScript errors |
| Registry gate | `bun run check:registry` | exit 0 |
| Whitespace | `git diff --check` | exit 0 |

## Scope

**In scope**:

- `scripts/sync-upstream-component-contracts.mjs`
- `registry/upstream/derived/shadcn-theme.json`
- `scripts/check-upstream-reference-contract.mjs`
- `src/openstory/shadcnTheme.ts`
- `src/openstory/shadcnTheme.story.test.ts`
- `src/preview.ts`
- `tests/e2e/openstory-shadcn-theme.spec.ts`
- Generated artifacts only if a verification command requires them.

**Out of scope**:

- OpenStory package internals under `/Volumes/Sync/Development/Bearing-Ward/openstory`.
- Button recipe expansion beyond the existing `new-york-v4` and `base-nova`
  proof. This plan expands theme tokens, not component recipe families.
- Bulk migration of other components to component-local recipes.
- Live upstream snapshot refresh. Use the checked-in
  `registry/upstream/snapshots/shadcn/themes.ts` as the local source of truth.
  If you believe live upstream must be fetched, STOP and report why.

## Git workflow

- Branch: use the existing worktree branch chosen by the dispatcher.
- Commit per logical unit if you are asked to commit. If a reviewer dispatched
  you, follow the dispatcher's commit/index instructions.
- Do not push or open a PR unless explicitly instructed.

## Invariant impact

| Invariant | Impact | Expected status/grade change | Evidence to update | Non-goal |
| --- | --- | --- | --- | --- |
| `P4_SOURCE_PARITY` | Theme catalog becomes derived from checked-in shadcn theme snapshot instead of three hard-coded entries. | Preserve PARTIAL/4; improve evidence quality. | `registry/upstream/derived/shadcn-theme.json`; `bun run sync:upstream-contracts -- --check`; upstream reference guard. | Full live upstream refresh. |
| `P6_VISUAL_PARITY` | Browser test should prove selected theme changes visible background and Button colors. | Preserve PARTIAL/4; add focused evidence. | `tests/e2e/openstory-shadcn-theme.spec.ts`. | Full origin visual fixture refresh. |
| `P9_GENERATED_ARTIFACTS` | Derived contract and OpenStory manifest literal must stay in sync. | Preserve PARTIAL/4. | `bun run check:registry`; `scripts/check-upstream-reference-contract.mjs`. | Public install smoke. |
| `P13_COMPONENT_LOCAL_CONFIG` | Button keeps component-local recipe fallback while theme tokens expand globally. | Preserve PARTIAL/3. | Focused Button/OpenStory theme tests. | Adding recipes for every shadcn style/theme pair. |

## Steps

### Step 1: Derive every shadcn theme from the checked-in snapshot

Update `scripts/sync-upstream-component-contracts.mjs` so
`deriveThemeContract` receives the text of
`registry/upstream/snapshots/shadcn/themes.ts` and derives `themes` from the
exported `THEMES` registry array instead of the current hard-coded three-entry
array.

Implementation requirements:

- Parse every `THEMES` item whose `type` is `"registry:theme"`.
- For each item, derive one concrete contract entry for every mode present under
  `cssVars` (`light` and `dark` in the current snapshot).
- Preserve the current contract fields: `name`, `label`, `style`, `baseColor`,
  `mode`, and `tokens`.
- Use the existing `defaultStyle` value `"rhea"` for the `style` field of
  upstream theme entries. This keeps component recipe selection stable: all new
  color themes use the default Button recipe unless a component has its own
  local mapping.
- Use the upstream item `name` as `baseColor`.
- Generate concrete names and labels in this shape:
  - `rhea-neutral-light`, label `Rhea Neutral Light`
  - `rhea-neutral-dark`, label `Rhea Neutral Dark`
  - `rhea-amber-light`, label `Rhea Amber Light`
  - `rhea-yellow-dark`, label `Rhea Yellow Dark`
- Keep backward compatibility for the previous `nova-zinc-light` entry either
  by preserving it as an additional derived compatibility entry or by handling
  `nova-zinc`/`nova-zinc-light` as resolver aliases in `src/openstory/shadcnTheme.ts`.
  The toolbar does not need to show `Nova Zinc` after this plan, but URLs and
  tests that still pass `shadcnTheme:nova-zinc` must keep resolving to zinc
  tokens and Button `base-nova` style.
- Do not use `eval`, dynamic import, or `new Function` on the upstream snapshot.
  Treat the snapshot as data. A quote-aware scanner plus small object parser is
  acceptable; if this becomes too brittle, STOP and report rather than shipping
  a parser that silently drops themes.
- Preserve `styleNames`, `baseColorNames`, `themeNames`, `tokenNames`, and
  `radiusScale`.

After updating the script, regenerate only the derived theme contract:

```sh
bun run sync:upstream-contracts -- --write
```

Then inspect `registry/upstream/derived/shadcn-theme.json`. It must include at
least all 24 current theme names listed in "Current state", with light and dark
entries for each, and neutral must remain the default base color.

**Verify**:

```sh
bun run sync:upstream-contracts -- --check
node - <<'NODE'
const fs = require("node:fs");
const contract = JSON.parse(fs.readFileSync("registry/upstream/derived/shadcn-theme.json", "utf8"));
const keys = new Set(contract.themes.map((theme) => `${theme.style}-${theme.baseColor}`));
for (const name of ["neutral", "stone", "zinc", "mauve", "olive", "mist", "taupe", "amber", "blue", "green", "rose", "violet", "yellow"]) {
  if (!keys.has(`rhea-${name}`)) {
    throw new Error(`missing rhea-${name}`);
  }
}
if (contract.defaultBaseColor !== "neutral") {
  throw new Error(`defaultBaseColor should be neutral, got ${contract.defaultBaseColor}`);
}
console.log(`${keys.size} theme keys available`);
NODE
```

Expected result: both commands exit 0; the Node command prints a count that is
at least 24.

### Step 2: Update OpenStory resolver and token bridge for the expanded catalog

Update `src/openstory/shadcnTheme.ts` to keep working with the expanded
contract.

Implementation requirements:

- `shadcnThemeNames` should include all unique `${style}-${baseColor}` keys from
  the expanded contract.
- `resolveShadcnTheme` must keep accepting:
  - new toolbar keys such as `rhea-neutral`, `rhea-stone`, `rhea-amber`,
    `rhea-yellow`;
  - old combined names such as `rhea-neutral-dark`;
  - legacy `nova-zinc` and `nova-zinc-light` values.
- The default theme key must remain `rhea-neutral`.
- Preserve `requestedMode` vs `resolvedMode` behavior. If a selected key lacks a
  requested mode, fall back to that key's default mode first, then the default
  theme key.
- `shadcnThemeStyleProperties` must support both legacy HSL triples and the
  current shadcn snapshot's CSS-ready OKLCH values:
  - For values that already look CSS-ready, such as `oklch(...)`, `hsl(...)`,
    `var(...)`, or values containing `/`, emit `--color-${token}: ${value}`.
  - For legacy HSL triples such as `210 40% 98%`, emit
    `--color-${token}: hsl(${value})`.
  - Always emit the raw `--${token}` value too.
  - Preserve radius derivative variables (`--radius-sm`, `--radius-md`,
    `--radius-lg`, `--radius-xl`).
- Add `bg-background text-foreground` to the shadcn wrapper class so neutral
  default background and foreground tokens visibly apply to the story wrapper.
  Keep the existing `shadcn-theme`, `shadcn-theme-${style}`,
  `shadcn-theme-${baseColor}`, and resolved light/dark classes. Do not make the
  wrapper take over OpenStory body layout or shell layout.

**Verify**:

```sh
bun run test -- src/openstory/shadcnTheme.story.test.ts
```

Expected result: exit 0. Add or update tests before running this command so the
suite proves at least:

- the toolbar key list includes `rhea-neutral`, `rhea-stone`, `rhea-amber`,
  `rhea-violet`, and `rhea-yellow`;
- default globals still resolve to `rhea-neutral-light`;
- `rhea-amber` with `shadcnMode: "dark"` resolves to `rhea-amber-dark`;
- a CSS-ready OKLCH token emits `--color-primary` without wrapping it in
  `hsl(...)`;
- legacy `nova-zinc` still resolves to Button style `nova` / `base-nova`.

### Step 3: Expand the manifest-visible OpenStory toolbar literals

Update `src/preview.ts` so the literal `shadcnTheme.toolbar.items` list exposes
all unique theme keys from the expanded derived contract. Because OpenStory's
manifest parser currently reads object literals only, this file must keep
literal items, not imported constants.

Implementation requirements:

- Keep `defaultValue: "rhea-neutral"`.
- Keep `initialGlobals: { shadcnTheme: "rhea-neutral", shadcnMode: "light" }`.
- Include at least these literal toolbar items:
  - `{ value: "rhea-neutral", title: "Rhea Neutral" }`
  - `{ value: "rhea-stone", title: "Rhea Stone" }`
  - `{ value: "rhea-zinc", title: "Rhea Zinc" }`
  - `{ value: "rhea-mauve", title: "Rhea Mauve" }`
  - `{ value: "rhea-olive", title: "Rhea Olive" }`
  - `{ value: "rhea-mist", title: "Rhea Mist" }`
  - `{ value: "rhea-taupe", title: "Rhea Taupe" }`
  - every other checked-in upstream theme from `THEMES`, including Amber, Blue,
    Cyan, Emerald, Fuchsia, Green, Indigo, Lime, Orange, Pink, Purple, Red,
    Rose, Sky, Teal, Violet, and Yellow.
- The mode toolbar stays `Light`, `Dark`, `System`.

Update `scripts/check-upstream-reference-contract.mjs` so it compares the
literal preview toolbar values to the expanded derived contract's unique
`${style}-${baseColor}` keys. It should still fail if `src/preview.ts` drops a
derived theme or if initial globals stop matching the derived defaults.

**Verify**:

```sh
bun scripts/check-upstream-reference-contract.mjs
curl -sS http://localhost:6173/__openstory/manifest.json | node - <<'NODE'
let input = "";
process.stdin.on("data", (chunk) => { input += chunk; });
process.stdin.on("end", () => {
  const manifest = JSON.parse(input);
  const items = manifest.globalTypes.shadcnTheme.toolbar.items.map((item) => item.value);
  for (const value of ["rhea-neutral", "rhea-stone", "rhea-amber", "rhea-violet", "rhea-yellow"]) {
    if (!items.includes(value)) {
      throw new Error(`missing ${value}`);
    }
  }
  if (manifest.initialGlobals.shadcnTheme !== "rhea-neutral") {
    throw new Error("initial shadcnTheme must be rhea-neutral");
  }
  console.log(`${items.length} OpenStory theme toolbar items`);
});
NODE
```

Expected result: both commands exit 0; the Node command prints a count that is
at least 24. If no dev server is running, start one with
`bun run dev -- --host 127.0.0.1` for this verification and stop it afterward.

### Step 4: Strengthen browser evidence for visible background and theme changes

Update `tests/e2e/openstory-shadcn-theme.spec.ts`.

Implementation requirements:

- Keep the manifest test.
- Extend the manifest test to prove the toolbar contains at least the expanded
  sample set: `rhea-neutral`, `rhea-stone`, `rhea-amber`, `rhea-violet`, and
  `rhea-yellow`.
- Extend the browser test to select one newly added theme such as `Rhea Amber`
  or `Rhea Violet`.
- Assert the shadcn wrapper has `bg-background` and `text-foreground` in its
  class list.
- Assert the wrapper's computed `background-color` changes when selecting the
  newly added theme and/or dark mode.
- Keep the Button-specific assertion that legacy `nova-zinc` URLs still map to
  `data-style="base-nova"`; if `Nova Zinc` is removed from the toolbar, add a
  separate URL-driven check using:
  `/?id=shadcn-button--basic&globals=shadcnTheme%3Anova-zinc%3BshadcnMode%3Alight`

**Verify**:

```sh
bunx playwright test tests/e2e/openstory-shadcn-theme.spec.ts
```

Expected result: exit 0; all tests pass.

### Step 5: Run the full local gates

Run the project gates that cover source parity, OpenStory, generated artifacts,
and type safety:

```sh
bun run typecheck
bun run check:registry
git diff --check
```

Expected result: all commands exit 0.

## Test plan

- `src/openstory/shadcnTheme.story.test.ts` should cover resolver behavior,
  expanded toolbar keys, CSS-ready OKLCH token bridging, legacy HSL token
  bridging, default neutral resolution, and legacy `nova-zinc` compatibility.
- `tests/e2e/openstory-shadcn-theme.spec.ts` should cover the actual OpenStory
  shell manifest and visible browser behavior: controls visible, expanded
  toolbar entries present, wrapper background changes, Button color changes, and
  Base UI stories remain unwrapped.
- `scripts/check-upstream-reference-contract.mjs` should guard the literal
  preview toolbar against drifting from `registry/upstream/derived/shadcn-theme.json`.

## Done criteria

All must hold:

- [ ] `registry/upstream/derived/shadcn-theme.json` contains light and dark
  entries for every theme in the checked-in `THEMES` snapshot.
- [ ] Neutral remains the default theme/background selection:
  `defaultBaseColor: "neutral"`, `defaultMode: "light"`, and
  `src/preview.ts` initial globals are `rhea-neutral` + `light`.
- [ ] The shadcn wrapper class includes `bg-background text-foreground`.
- [ ] `src/preview.ts` exposes all derived theme keys as literal toolbar items.
- [ ] Legacy `nova-zinc` URL/global compatibility still works.
- [ ] `bun run sync:upstream-contracts -- --check` exits 0.
- [ ] `bun run test -- src/openstory/shadcnTheme.story.test.ts` exits 0.
- [ ] `bunx playwright test tests/e2e/openstory-shadcn-theme.spec.ts` exits 0.
- [ ] `bun run typecheck` exits 0.
- [ ] `bun run check:registry` exits 0.
- [ ] `git diff --check` exits 0.
- [ ] No files outside the in-scope list are modified unless the executor
  explicitly reports a generated artifact required by `check:registry`.

## STOP conditions

Stop and report back instead of improvising if:

- The checked-in `registry/upstream/snapshots/shadcn/themes.ts` no longer
  contains a parseable `THEMES` registry array.
- The checked-in snapshot's theme list no longer contains `neutral`.
- Deriving all themes requires executing upstream snapshot code with `eval`,
  `new Function`, or dynamic import.
- The expanded contract requires changing OpenStory shell internals.
- The fix requires changing Button recipe semantics beyond legacy
  `nova-zinc` compatibility.
- A verification command fails twice after a reasonable fix attempt.

## Maintenance notes

- The OpenStory manifest parser currently requires literal `globalTypes` in
  `src/preview.ts`. Keep `scripts/check-upstream-reference-contract.mjs`
  strict so this necessary duplication cannot drift silently.
- When shadcn snapshots are refreshed in the future, rerun
  `bun run sync:upstream-contracts -- --write` and update `src/preview.ts` if
  the derived theme key set changes.
- If the project later adds a separate component-recipe style selector, revisit
  legacy `nova-zinc` compatibility and decide whether `style` should remain
  coupled to `shadcnTheme`.
