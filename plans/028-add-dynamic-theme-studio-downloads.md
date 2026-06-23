# Plan 028: Add Dynamic Theme Studio And Downloadable Options

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the next
> step. If anything in the "STOP conditions" section occurs, stop and report -
> do not improvise. When done, update the status row for this plan in
> `plans/README.md` unless a reviewer dispatched you and told you they maintain
> the index.
>
> **Drift check (run first)**:
> `git diff --stat e0db5c95..HEAD -- docs/product/project-invariants-scorecard.md docs/product/component-entry-contract.md scripts/check-project-invariants-scorecard.mjs scripts/build-registry.mjs scripts/check-registry-metadata.mjs scripts/check-upstream-reference-contract.mjs package.json registry/upstream/derived/shadcn-theme.json src/openstory/shadcnTheme.ts src/openstory/wipSpace tests/e2e apps/docs/public plans/README.md`
>
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: L
- **Risk**: MED
- **Depends on**: plans/024-expand-openstory-shadcn-theme-catalog.md, plans/027-add-openstory-toolbar-indicators.md
- **Category**: direction
- **Planned at**: commit `e0db5c95`, 2026-06-22

## Why this matters

Foldkit CN already has source-derived shadcn theme data and OpenStory selectors,
but users cannot browse the full style/theme matrix as a product surface, compare
preview blocks against a chosen theme, or download the selected option as a
registry-compatible payload. The old `/docs/theme-playground` proved the
interaction shape, but that app is retired while OpenStory becomes the only
supported browsing surface. This plan adds a project invariant for dynamic
option distribution, then ships an OpenStory-hosted Theme Studio backed by the
same generated catalog that powers downloadable registry JSON.

The intended end state is close to shadcn's current registry model. The source
contract is explicit:

- `https://ui.shadcn.com/docs/theming` defines the option model: style,
  base color, CSS-variable mode, semantic tokens, radius scale, light/dark
  token overrides, default theme CSS, and the no-CSS-variables installation path.
- `https://ui.shadcn.com/preview/radix/preview-02` defines the first rich preview
  composition to match: a dashboard-style page made from cards, forms, selects,
  switches, tabs, accordions, calendars, menus, progress, sliders, upload
  controls, nav/sidebar, and data/list blocks.

Style/theme choices are data, preview blocks are source-inventoried examples,
and downloads are normal shadcn-compatible registry items instead of one-off
blobs. The project goal remains matching all available shadcn components; this
plan creates the catalog, preview, and download rails that make that goal
measurable instead of treating one hand-authored demo as the finish line.

## Current state

Relevant files and roles:

- `docs/product/project-invariants-scorecard.md` - current invariant catalog has
  `P1_SOURCE_OWNERSHIP` through `P13_COMPONENT_LOCAL_CONFIG`, but no invariant
  requiring dynamic style/theme/preview options to be browsable and downloadable.
- `scripts/check-project-invariants-scorecard.mjs` - hard-codes required
  invariant IDs and must be updated when adding `P14`.
- `registry/upstream/derived/shadcn-theme.json` - source-derived theme catalog;
  includes `styleNames`, `themeNames`, defaults, token names, and all theme
  entries.
- `src/openstory/shadcnTheme.ts` - derives the current OpenStory shadcn toolbar
  globals and wrapper CSS variables from `shadcn-theme.json`.
- `scripts/build-registry.mjs` - builds public registry JSON into
  `apps/docs/public/**` and is the right place to emit static downloadable
  Theme Studio artifacts.
- `README.md` and `docs/product/component-entry-contract.md` - both say the old
  Vite docs app is deferred and OpenStory is the supported docs/example browser.
- `src/themePlayground.ts` - retired docs-app tool with useful control and
  preview concepts, but its options are hand-authored and it must not be revived
  as a public docs route.
- `tests/e2e/openstory-shadcn-theme.spec.ts` and
  `tests/e2e/openstory-toolbar-indicators.spec.ts` - current browser coverage
  for OpenStory theme globals, mode changes, and toolbar indicator metadata.

Current shadcn theme derivation already comes from checked-in upstream data:

```ts
// src/openstory/shadcnTheme.ts:4-25
import themeContract from "../../registry/upstream/derived/shadcn-theme.json";

export const shadcnThemeGlobalKey = "shadcnTheme";
export const shadcnModeGlobalKey = "shadcnMode";

export const shadcnThemeCatalog = themeContract;
```

Current toolbar options are derived from unique style/base-color pairs and mode
metadata:

```ts
// src/openstory/shadcnTheme.ts:95-128
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
        icon: "circlehollow",
        color: themeIndicatorColor(theme),
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
        icon: modeIndicators[mode].icon,
        color: modeIndicators[mode].color,
      })),
    },
  },
} satisfies Preview["globalTypes"];
```

The current wrapper turns the selected theme into CSS variables for shadcn
stories:

```ts
// src/openstory/shadcnTheme.ts:304-325
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
```

The registry build already owns public JSON output:

```js
// scripts/build-registry.mjs:21-24
const publicDir = path.join(rootDir, "apps/docs/public");
const legacyOutputDir = path.join(publicDir, "r");
const itemSchemaUrl = "https://ui.shadcn.com/schema/registry-item.json";
const registrySchemaUrl = "https://ui.shadcn.com/schema/registry.json";

// scripts/build-registry.mjs:217-233
await removeOrCheckMissing(legacyOutputDir);
await writeOrCheck(path.join(publicDir, "registry.json"), stableJson(index));

for (const item of items) {
  await writeOrCheck(
    path.join(publicDir, `${item.name}.json`),
    stableJson(item)
  );
}
```

The old docs app theme playground is explicitly deferred:

```md
<!-- README.md:288-294 -->
- `/docs/theme-playground` opens the Theme Playground. Use it to preview light,
  dark, and system color modes, density choices, radius presets, typography
  presets, and representative component surfaces before committing theme changes
  to registry components.

These tools are deferred from public browsing while OpenStory becomes the only
supported component docs/example surface.
```

The OpenStory public contract requires registry files at the site root:

```md
<!-- docs/product/component-entry-contract.md:590-604 -->
The public site is an OpenStory component browser backed by the generated
registry JSON. OpenStory is the only supported component docs/example browsing
surface.

Required:

- The OpenStory manifest is present at `/__openstory/manifest.json`.
- Story iframes are available at `/__story/{story-id}/index.html`.
- Registry files are available from the same site root:
  `/components.json`, `/registry.json`, and `/{name}.json`.
- Source snapshots are available under `/sources/{example}.txt`.
```

External contract references to preserve:

- shadcn's registry item schema supports `registry:style` and
  `registry:theme` item types.
- shadcn custom style/theme examples use `cssVars.theme`, `cssVars.light`, and
  `cssVars.dark` on registry item payloads.
- shadcn block pages expose Preview/Code and install/download actions from
  registry-compatible payloads. Do not invent a Foldkit-only download format when
  a shadcn registry item payload can represent the option.
- shadcn theming docs present CSS variables as the default supported path, with
  semantic tokens such as `background`, `foreground`, `card`, `popover`,
  `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`,
  `ring`, chart tokens, sidebar tokens, and `radius`.
- shadcn theming docs also expose base-color/style choices through
  `components.json`, including `style`, `tailwind.baseColor`, and
  `tailwind.cssVariables`. A generated Theme Studio catalog must represent these
  choices or record why a choice is intentionally deferred.
- shadcn preview-02 is the initial rich preview target. It should be captured as
  a checked-in source inventory so future work can grade coverage against the
  same page even if the live site changes.

## Invariant Impact For Future Plans

| Invariant | Impact | Expected status/grade change | Evidence to update | Non-goal |
| --- | --- | --- | --- | --- |
| `P4_SOURCE_PARITY` | Theme and style options must remain derived from `registry/upstream/derived/shadcn-theme.json`. | No grade change expected if all option lists derive from the checked-in contract. | Theme Studio catalog tests and `check:upstream-refs`. | Do not refresh upstream snapshots in this plan. |
| `P8_DOC_REFERENCE` | Adds a user-facing OpenStory Theme Studio browsing surface. | No grade change expected; this is a new support surface rather than per-component docs replacement. | New OpenStory story and browser e2e. | Do not revive the retired Vite docs app. |
| `P9_GENERATED_ARTIFACTS` | Adds generated downloadable theme/style catalog artifacts under `apps/docs/public/**`. | No grade change expected if generated output is checked by `check:registry`. | `build:registry`, `check:registry`, new theme-studio artifact check. | Do not hand-edit generated public JSON. |
| `P11_PROGRESS_LEDGER` | Adds this plan and README row. | No grade change expected. | `plans/README.md` and this plan. | Do not mark this plan DONE before generated artifacts and browser checks pass. |
| `P12_INVARIANT_GOVERNANCE` | Adds `P14_DYNAMIC_OPTION_DISTRIBUTION` to the invariant catalog and structural checker. | Expected new invariant starts PARTIAL, with grade 4 after a registry-gated implementation. | Scorecard catalog/baseline rows and `check:invariants`. | Do not renumber existing invariant IDs. |
| `P14_DYNAMIC_OPTION_DISTRIBUTION` | New invariant: style/theme/preview options are data-driven, previewable, and downloadable. | New invariant introduced. | Theme Studio catalog, generated downloads, preview-02 coverage ledger, OpenStory/browser tests. | Do not claim full shadcn component parity in this plan without source-backed evidence for every required row. |

## Commands you will need

| Purpose | Command | Expected on success |
| --- | --- | --- |
| Typecheck | `bun run typecheck` | exit 0, no TypeScript errors |
| Unit/story tests | `bun run test -- src/openstory/themeStudio.story.test.ts src/openstory/themeStudio.scene.test.ts src/openstory/shadcnTheme.story.test.ts` | exit 0; new Theme Studio tests and existing shadcn theme tests pass |
| Registry build | `bun run build:registry` | exit 0; public registry JSON and Theme Studio artifacts generated |
| Registry gate | `bun run check:registry` | exit 0; includes invariant and Theme Studio artifact checks |
| Invariants | `bun run check:invariants` | exit 0; 14 required invariants with valid catalog/baseline structure |
| Focused e2e | `bunx playwright test tests/e2e/openstory-theme-studio.spec.ts tests/e2e/openstory-shadcn-theme.spec.ts tests/e2e/openstory-toolbar-indicators.spec.ts` | exit 0; Theme Studio and current theme toolbar behavior pass |
| Build | `bun run build` | exit 0; OpenStory static build includes public registry assets |

## Suggested executor toolkit

- Use the `diagnosing-bugs` skill if a generated artifact check fails and the
  failure is not obvious from the expected JSON shape.
- Use official shadcn registry docs for schema vocabulary only. Keep local
  implementation decisions grounded in this repo's source-owned registry
  contract.

## Scope

**In scope**:

- `docs/product/project-invariants-scorecard.md`
- `docs/product/component-entry-contract.md`
- `docs/product/shadcn-preview-02-coverage.md` or
  `registry/upstream/derived/shadcn-preview-02.json` (create one coverage
  inventory; prefer the machine-readable path if the executor can keep the
  schema simple)
- `scripts/check-project-invariants-scorecard.mjs`
- `scripts/build-registry.mjs`
- `scripts/check-registry-metadata.mjs` only if generated dynamic items need
  registry metadata validation
- `scripts/check-upstream-reference-contract.mjs` only if theme option guardrails
  need to include the new Theme Studio catalog
- `scripts/check-theme-studio-artifacts.mjs` (create)
- `scripts/theme-studio-catalog.mjs` (create, Node-readable artifact generator)
- `src/openstory/themeStudio.ts` or `src/openstory/themeStudio/` (create)
- `src/openstory/themeStudio.story.test.ts` (create)
- `src/openstory/themeStudio.scene.test.ts` (create)
- `src/openstory/wipSpace/theme-studio.stories.ts` (create)
- `src/openstory/shadcnTheme.ts` only for shared exported helpers reused by the
  Theme Studio; do not rewrite the existing decorator unless necessary
- `tests/e2e/openstory-theme-studio.spec.ts` (create)
- `apps/docs/public/theme-studio.json` (generated)
- `apps/docs/public/foldkit-theme-*.json` (generated registry theme payloads)
- `apps/docs/public/foldkit-style-*.json` only if the generated catalog has a
  meaningful style-level payload distinct from theme payloads
- `package.json`
- `plans/README.md`

**Out of scope**:

- `src/docsView.ts` and the retired Vite docs app routes.
- Reintroducing `/docs/theme-playground` as a public route.
- Modifying OpenStory shell internals for dependent dropdown behavior. The Theme
  Studio story can own its own controls.
- Changing installable registry component APIs under `registry/**` except for
  optional source metadata that marks existing examples as Theme Studio preview
  blocks or records preview-02 coverage dependencies.
- Refreshing upstream shadcn snapshots from the network.
- Generating an unbounded cross product of every component/example and every
  theme. This plan should generate all source-supported style/theme downloads
  and a source-inventoried preview-02 catalog with explicit coverage status for
  every visible block/control family.

## Git workflow

- Branch: `codex/028-theme-studio-downloads`.
- Commit message style follows the repo's recent imperative style, for example
  `Add dynamic Theme Studio downloads`.
- Do not push or open a PR unless the operator explicitly asks.

## Steps

### Step 1: Add the new invariant to governance

Add `P14_DYNAMIC_OPTION_DISTRIBUTION` to `docs/product/project-invariants-scorecard.md`.

Catalog row standard:

```md
| `P14_DYNAMIC_OPTION_DISTRIBUTION` | Dynamic option distribution | ACTIVE | Style/theme selection, preview block browsing, and downloadable registry payloads | User-facing style, theme, mode, and preview-block choices are derived from checked-in source catalogs and exposed both as rendered OpenStory previews and downloadable shadcn-compatible registry JSON. A gap is a hard-coded option list, a preview block that cannot be downloaded, a page-offered option not represented in the catalog, or a downloadable payload not represented in the preview catalog. | New theme/style/preview work must update the source catalog, generated public artifacts, preview-02 coverage ledger, OpenStory Theme Studio, and registry/download checks together. | `registry/upstream/derived/shadcn-theme.json`; Theme Studio catalog; preview-02 coverage inventory; generated registry artifacts | must | 5 |
```

Baseline row after implementation:

```md
| `P14_DYNAMIC_OPTION_DISTRIBUTION` | PARTIAL | 4 | 1 - preview-02 coverage ledger still contains deferred component/control rows | Theme Studio catalog; preview-02 coverage inventory; generated `/theme-studio.json`; generated `foldkit-theme-*.json` downloads; OpenStory Theme Studio story; focused e2e | `bun run check:registry`, `bun run check:invariants`, and focused Theme Studio e2e pass in this plan | All theming-page options are inventoried, but some preview-02 blocks may remain deferred until their underlying component parity exists. | Promote deferred preview-02 rows to rendered/downloadable rows as components reach visual parity and extend style-level download coverage when block payload types mature. | 2026-06-22 @ <implementation commit> |
```

Then update `scripts/check-project-invariants-scorecard.mjs` so
`requiredIds` includes `P14_DYNAMIC_OPTION_DISTRIBUTION` after
`P13_COMPONENT_LOCAL_CONFIG`.

Update `docs/product/component-entry-contract.md` with a short subsection under
the OpenStory Shell Contract:

- Theme Studio is an OpenStory browsing surface.
- Style/theme options must come from `registry/upstream/derived/shadcn-theme.json`
  or a generated derivative of it.
- Preview block options must come from a source catalog or registry metadata, not
  from hard-coded view-only switch statements.
- Download links must resolve to shadcn-compatible registry JSON served from the
  same public site root.

**Verify**: `bun run check:invariants` exits 0 and reports 14 invariants.

### Step 2: Add a shared Theme Studio catalog generator

Create `scripts/theme-studio-catalog.mjs`. It must be importable from Node
scripts without browser APIs.

Required exports:

```js
export const themeStudioManifestName = "theme-studio.json";
export const themeDownloadNameFor = ({ style, baseColor }) =>
  `foldkit-theme-${style}-${baseColor}`;

export const createThemeStudioCatalog = ({ themeContract, registryItems }) => {
  // returns styleOptions, baseColorOptionsByStyle, modeOptions, previewBlocks,
  // downloads, and generated registry item payloads
};
```

Catalog requirements:

- `styleOptions` comes from `themeContract.styleNames`, filtered to styles that
  have at least one theme entry.
- `baseColorOptionsByStyle[style]` comes from actual theme entries for that
  style. Do not assume every style supports every base color.
- `styleOptions`, `baseColorOptionsByStyle`, and download metadata must preserve
  the theming-page concepts from `components.json`: `style`,
  `tailwind.baseColor`, and `tailwind.cssVariables`.
- `modeOptions` includes `light`, `dark`, and `system`; downloadable theme JSON
  should include `light` and `dark` `cssVars`.
- `cssVariables` options include the supported default `true` path. The
  `false` path must be represented as a catalog option only when the repo can
  generate honest utility-class component recipes for the selected style; until
  then, record it as `deferred` with a reason instead of hiding it.
- Theme download item names use `foldkit-theme-{style}-{baseColor}`.
- Each theme download item is a shadcn-compatible registry item:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "foldkit-theme-rhea-neutral",
  "type": "registry:theme",
  "title": "Rhea Neutral Theme",
  "description": "Foldkit CN shadcn theme tokens for Rhea Neutral.",
  "cssVars": {
    "light": { "background": "oklch(...)" },
    "dark": { "background": "oklch(...)" }
  },
  "files": [],
  "dependencies": [],
  "devDependencies": [],
  "registryDependencies": []
}
```

- Preserve `radius` in `cssVars.light` and `cssVars.dark` when present.
- Do not include `system` as a `cssVars` key; system is a UI mode resolution,
  not a downloadable token mode.
- Generate or update a checked-in preview-02 coverage inventory, either
  `docs/product/shadcn-preview-02-coverage.md` for human review or
  `registry/upstream/derived/shadcn-preview-02.json` if the executor can keep it
  machine-checkable. The inventory must list every distinct visible
  block/control family found on `https://ui.shadcn.com/preview/radix/preview-02`
  and map each row to one of:
  - `rendered`: represented by the Theme Studio preview and downloadable item;
  - `covered-by-existing-example`: represented by an existing registry example
    and download even if it is not visually grouped as a named block;
  - `deferred`: missing because a component/control still needs parity work.
- Initial inventory rows must include at least these preview-02 families:
  dashboard cards, sidebar/navigation, contribution/activity chart, progress
  cards, QR/device connection card, transaction/investment lists, preference
  forms, switches, selects/comboboxes, tabs, accordions, dropdown/menu actions,
  calendar/date controls, radio groups, checkboxes, sliders, upload controls,
  payment method controls, profile/security forms, smart-home controls, and
  modal/drawer-like surfaces.
- `previewBlocks` comes from source metadata plus the preview-02 coverage
  inventory. Add `meta.foldkit.themeStudioPreviewBlock` or an equivalent source
  catalog reference to existing public `registry:example` items, then discover
  those items from `registryItems`. Each rendered block entry should include:
  - `id`
  - `title`
  - `registryItemName`
  - `downloadName`
  - `downloadHref`
  - `storyId` when derivable from OpenStory catalog naming
- Do not invent rendered blocks whose registry payloads do not exist. If a
  preview-02 family lacks a valid registry payload, mark that row `deferred`
  with the missing component dependency and the follow-up plan needed to unblock
  it.

**Verify**: add focused tests in `scripts/theme-studio-catalog.test.ts` if this
repo's test setup runs script `.test.ts` files; otherwise add coverage through
`src/openstory/themeStudio.story.test.ts` in Step 4. The tests must prove:

- all `themeContract.styleNames` with entries appear in `styleOptions`;
- no base color appears under a style unless a matching theme entry exists;
- every generated theme item has `type: "registry:theme"` and light/dark
  `cssVars`;
- every theming-page option is present as `active` or `deferred`;
- every preview-02 inventory row is present as `rendered`,
  `covered-by-existing-example`, or `deferred`;
- every rendered preview block has a `downloadHref`.

Run `bun run test -- scripts/theme-studio-catalog.test.ts` if created; expected:
exit 0.

### Step 3: Generate Theme Studio public artifacts

Extend `scripts/build-registry.mjs` to import the catalog generator and emit:

- `apps/docs/public/theme-studio.json`
- one root-level theme item per valid style/base-color pair:
  `apps/docs/public/foldkit-theme-{style}-{baseColor}.json`
- the default CSS-variable theme payload shape documented by shadcn's theming
  page: semantic tokens under light/dark `cssVars`, with `radius` preserved;
- style-level payloads only if they are materially different from theme payloads
  and still conform to shadcn registry item schema. If the repo cannot honestly
  encode `registry:style` component recipes yet, the catalog must expose the
  style download as `deferred` with a reason rather than emitting a misleading
  file.

Also add `scripts/check-theme-studio-artifacts.mjs`. It should:

- read `registry/upstream/derived/shadcn-theme.json`;
- read source registry items with `readSourceRegistryItems`;
- regenerate the expected Theme Studio catalog and item payloads;
- compare them to `apps/docs/public/theme-studio.json` and generated theme JSON
  files;
- fail on stale, missing, or extra `foldkit-theme-*.json` files;
- verify every `downloadHref` resolves to a generated file or existing registry
  item file.

Wire `check-theme-studio-artifacts.mjs` into `package.json`:

- add `"check:theme-studio": "bun scripts/check-theme-studio-artifacts.mjs"`;
- add it to `check:registry` after `build-registry.mjs --check` and before
  `check-upstream-reference-contract.mjs`.

**Verify**:

```sh
bun run build:registry
bun run check:theme-studio
bun run check:registry
```

Expected: all exit 0. `apps/docs/public/theme-studio.json` and generated
`foldkit-theme-*.json` files are current.

### Step 4: Build the OpenStory Theme Studio program

Create `src/openstory/themeStudio.ts` or a small folder
`src/openstory/themeStudio/`.

Follow Foldkit conventions from `AGENTS.md`:

- Model fields are Schema-backed.
- Messages are verb-first past-tense.
- `init` and `update` return `[Model, ReadonlyArray<Command<Message>>]`.
- Use `evo()` for immutable updates.
- Bind `const h = html<Message>()` inside each view function.
- Use `M.value(...).pipe(M.tagsExhaustive(...))`; do not use `switch`.

Recommended model:

```ts
export const Model = S.Struct({
  selectedStyle: S.String,
  selectedBaseColor: S.String,
  selectedMode: S.Literal("light", "dark", "system"),
  selectedPreviewBlockId: S.String,
});
```

Use `S.String` for style/baseColor/block IDs and resolve them against the
catalog instead of generating huge dynamic Schema unions from JSON at runtime.

Required messages:

- `SelectedThemeStudioStyle`
- `SelectedThemeStudioBaseColor`
- `SelectedThemeStudioMode`
- `SelectedThemeStudioPreviewBlock`

Behavior:

- Default to `themeContract.defaultStyle`, `themeContract.defaultBaseColor`, and
  `themeContract.defaultMode`.
- When style changes, keep the current base color only if it exists for the new
  style; otherwise select the first available base color for that style.
- When an unknown style/baseColor/block ID is selected, keep the previous valid
  model value.
- The view renders all available style options, base-color options, mode options,
  and preview block options by mapping over the catalog.
- The preview area applies selected theme tokens with the same CSS variable
  conversion semantics as `shadcnThemeStyleProperties`.
- Preview blocks must render from the preview block catalog. A block can map to
  a small local view function, but the selector list and downloads must come
  from the catalog.
- The selected theme download link points at
  `/${themeDownloadNameFor({ style, baseColor })}.json`.
- The selected preview block download link points at its `downloadHref`.
- Include stable test IDs:
  - `theme-studio-root`
  - `theme-studio-preview`
  - `theme-studio-theme-download`
  - `theme-studio-block-download`
  - `theme-studio-state`

Do not use visible instructional text to explain the controls. Labels and button
names are fine; tutorial copy is not.

**Verify**:

```sh
bun run typecheck
bun run test -- src/openstory/themeStudio.story.test.ts src/openstory/themeStudio.scene.test.ts
```

Expected: both commands exit 0. Tests prove initial render, style/baseColor
fallback behavior, all catalog options render, preview block switching changes
visible preview, and download hrefs point at generated registry JSON.

### Step 5: Expose Theme Studio in OpenStory

Create `src/openstory/wipSpace/theme-studio.stories.ts`.

Recommended story shape:

```ts
import type { Meta, StoryObj } from "openstory/foldkit";

import * as ThemeStudio from "../themeStudio";

const meta = {
  title: "shadcn/Theme Studio",
  parameters: { shadcn: true },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Studio: Story = {
  name: "Studio",
  render: () => ThemeStudio,
};
```

This story should be hand-authored, not generated. It is a project-level browser
surface, not a component example.

**Verify**:

```sh
bun run openstory:check
bun run typecheck
```

Expected: both exit 0, and the OpenStory manifest includes
`shadcn-theme-studio--studio`.

### Step 6: Add browser coverage for dynamic rendering and downloads

Create `tests/e2e/openstory-theme-studio.spec.ts`.

Test cases:

1. Manifest and generated catalog:
   - request `/__openstory/manifest.json`;
   - assert story ID `shadcn-theme-studio--studio` exists;
   - request `/theme-studio.json`;
   - assert style options include every style from the generated catalog and at
     least `rhea`;
   - assert every preview block has a non-empty `downloadHref`.
2. Dynamic option rendering:
   - visit `/?id=shadcn-theme-studio--studio`;
   - assert style, base color/theme, mode, and preview block controls are
     visible by accessible labels;
   - compare option counts in the DOM against `/theme-studio.json`;
   - select a non-default style and assert base-color options update to that
     style's catalog values.
3. Preview and token update:
   - select `Rhea Amber` or the equivalent style/baseColor controls;
   - assert `data-testid="theme-studio-preview"` exposes selected style/baseColor
     attributes;
   - assert computed `--primary` or `--background` changes after selection.
4. Download links:
   - read `href` from `theme-studio-theme-download`, request it, and assert
     response JSON has `type: "registry:theme"` and `cssVars.light`/`cssVars.dark`;
   - read `href` from `theme-studio-block-download`, request it, and assert the
     response JSON has a `registry:` type and non-empty `files` or valid block
     metadata.

Use accessible locators for controls. Use `data-testid` only for state and
download assertions.

**Verify**:

```sh
bunx playwright test tests/e2e/openstory-theme-studio.spec.ts
```

Expected: exit 0.

### Step 7: Update documentation and final gates

Update README only if needed with a short pointer under local development or
useful items:

- Theme Studio lives in OpenStory under `shadcn/Theme Studio`.
- Theme downloads are served as `foldkit-theme-{style}-{baseColor}.json`.
- Preview block downloads reuse the normal registry item JSON URLs.

Do not advertise the old `/docs/theme-playground` as active.

Run final verification:

```sh
bun run typecheck
bun run test
bun run build:registry
bun run check:registry
bunx playwright test tests/e2e/openstory-theme-studio.spec.ts tests/e2e/openstory-shadcn-theme.spec.ts tests/e2e/openstory-toolbar-indicators.spec.ts
bun run build
```

Expected: all commands exit 0.

## Post-execution revision addendum: make Theme Studio visibly match preview-02

This addendum was added after live review of the first implementation on branch
`codex/028-theme-studio-downloads` at commits `a6134c5a` and `8e98f856`.
Reviewer verification passed, but product review found three acceptance gaps:

- Changing base color/mode does not create an obvious visible color change in
  the preview area. Existing coverage only proves that `--primary` changes on
  `data-testid="theme-studio-preview"`, not that visible component surfaces
  change.
- The preview block selector is too weak because only five preview-02 rows are
  rendered: `dashboard-cards`, `progress-cards`, `preference-forms`, `tabs`, and
  `accordions`.
- Preview blocks do not share a container contract. The preview area should fill
  the story space, while each example uses one standard max-height frame.

Before executing this addendum, work from the implementation branch/worktree:

- Worktree:
  `/Volumes/Sync/Development/Bearing-Ward/projects/repos/foldkit-basic-cn-ui-028-theme-studio-downloads`
- Branch: `codex/028-theme-studio-downloads`
- Current implementation head when this addendum was written: `8e98f856`

Addendum drift check:

```sh
git diff --stat 8e98f856..HEAD -- src/openstory/themeStudio.ts src/openstory/themeStudio.story.test.ts src/openstory/themeStudio.scene.test.ts src/openstory/wipSpace/theme-studio.stories.ts tests/e2e/openstory-theme-studio.spec.ts registry/upstream/derived/shadcn-preview-02.json apps/docs/public/theme-studio.json scripts/theme-studio-catalog.mjs scripts/check-theme-studio-artifacts.mjs scripts/build-registry.mjs
```

If any in-scope file changed since `8e98f856`, compare the current code against
the excerpts below before editing. If the code shape is meaningfully different,
STOP and report back instead of layering this addendum on stale assumptions.

Current weak spots to replace:

```ts
// src/openstory/themeStudio.ts at 8e98f856
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

const previewBlockViews: Record<string, () => Html> = {
  "dashboard-cards": dashboardCardsView,
  "progress-cards": progressCardsView,
  "preference-forms": preferenceFormsView,
  tabs: tabsView,
  accordions: accordionsView,
};
```

```ts
// src/openstory/themeStudio.ts at 8e98f856
h.Class(
  clsx(
    "shadcn-theme grid min-h-96 gap-4 rounded-md border border-border bg-background p-4 text-foreground",
    `shadcn-theme-${model.selectedStyle}`,
    `shadcn-theme-${model.selectedBaseColor}`,
    model.selectedMode === "dark" && "dark"
  )
),
h.Style(themeStudioStyleProperties(model)),
```

```ts
// tests/e2e/openstory-theme-studio.spec.ts at 8e98f856
const initialPrimary = await preview.evaluate((element) =>
  getComputedStyle(element).getPropertyValue("--primary").trim()
);

await frame.getByLabel("Base color").selectOption("amber");

const amberPrimary = await preview.evaluate((element) =>
  getComputedStyle(element).getPropertyValue("--primary").trim()
);
expect(amberPrimary).not.toBe(initialPrimary);
```

### Addendum Step A: Centralize the example frame contract

Create a single helper in `src/openstory/themeStudio.ts`, or split a small
`src/openstory/themeStudio/previewBlocks.ts` module if the file is getting too
large. Name the helper clearly, for example `themeStudioExampleFrame`.

Requirements:

- `data-testid="theme-studio-preview"` fills the available OpenStory story
  canvas as much as possible. It should not feel like a small card floating in a
  blank iframe.
- Every rendered preview block is wrapped in the same example frame with
  `data-testid="theme-studio-example-frame"`.
- The example frame must use one shared max-height constant, not per-block magic
  values. Use `720px` as the first standard max height unless the implementation
  proves that another value is necessary.
- The frame should preserve usability when a block is taller than the max height:
  `overflow-auto` is acceptable; clipping without scroll is not.
- Do not put cards inside decorative cards. The frame is the bounded preview
  surface; repeated cards inside the preview-02 composition are fine.

Recommended target shape:

```ts
const themeStudioExampleFrameMaxHeight = "720px";

const themeStudioExampleFrame = (children: ReadonlyArray<Html>): Html => {
  const h = html<Message>();

  return h.div(
    [
      h.DataAttribute("testid", "theme-studio-example-frame"),
      h.DataAttribute("max-height", themeStudioExampleFrameMaxHeight),
      h.Class("h-full min-h-[560px] overflow-auto rounded-md border border-border bg-background p-4"),
      h.Style({ maxHeight: themeStudioExampleFrameMaxHeight }),
    ],
    children
  );
};
```

Use the helper for every preview block renderer. Do not let individual block
functions set their own outer min/max height.

Verification:

```sh
bun run test -- src/openstory/themeStudio.story.test.ts src/openstory/themeStudio.scene.test.ts
```

Expected: exits 0, with tests proving every rendered block path includes
`theme-studio-example-frame`, the frame exposes `data-max-height="720px"`, and
the frame is present after switching between at least three preview blocks.

### Addendum Step B: Make selected theme changes visibly change the preview

The preview must visibly react when the user changes base color and mode. It is
not enough for an e2e test to read `--primary` from the wrapper while the
rendered block still appears neutral.

Implementation requirements:

- Derive one resolved theme object for the current model and use it consistently
  for classes, inline CSS variables, and data attributes. The `dark` class must
  match the resolved mode, including `system` when it resolves to dark.
- Add visible token-bearing surfaces to every rendered preview block:
  - at least one `bg-primary text-primary-foreground` or equivalent primary
    surface;
  - at least one `bg-accent`, `bg-muted`, or `bg-secondary` surface;
  - at least one border/ring surface whose color comes from `border`, `input`,
    or `ring`.
- Add stable test IDs for color probes that are real visible UI, not hidden
  instrumentation:
  - `theme-studio-primary-surface`
  - `theme-studio-accent-surface`
  - `theme-studio-border-surface`
- These probes may appear inside each block's content or in a shared preview
  chrome area, but they must be visually present in the preview and use the same
  selected theme tokens as the rest of the block.

E2E requirements:

- Update `tests/e2e/openstory-theme-studio.spec.ts` so it selects `neutral`,
  records computed visible styles for the primary/accent/border surfaces,
  selects `amber`, and proves at least the primary surface visibly changes by
  computed `background-color` or `color`.
- Add a light/dark assertion that proves the preview background or foreground
  visibly changes after selecting dark mode. If system mode is tested, force the
  browser color scheme in Playwright instead of relying on the host machine.
- Keep the existing CSS variable assertion, but it is no longer sufficient on
  its own.

Verification:

```sh
bunx playwright test tests/e2e/openstory-theme-studio.spec.ts
```

Expected: exits 0, and the new tests fail if selected theme changes update data
attributes only while visible colors stay the same.

### Addendum Step C: Promote more preview-02 rows into rendered blocks

The first implementation rendered five blocks. That is not enough to feel like
`https://ui.shadcn.com/preview/radix/preview-02`. Promote enough existing
preview-02 inventory rows to `rendered` that Theme Studio becomes a meaningful
page-level preview rather than a small component sampler.

Minimum target for this addendum:

- At least 12 preview-02 rows have `status: "rendered"` in
  `registry/upstream/derived/shadcn-preview-02.json`.
- At least 12 rendered block options appear in the Theme Studio block selector.
- Newly rendered rows should prioritize rows already marked
  `covered-by-existing-example` because they already have public registry JSON:
  `sidebar-navigation`, `switches`, `selects-comboboxes`,
  `dropdown-menu-actions`, `calendar-date-controls`, `radio-groups`,
  `checkboxes`, `sliders`, `upload-controls`, `profile-security-forms`, and
  `modal-drawer-surfaces`.
- Do not mark a row `rendered` unless the block selector can actually render a
  corresponding preview block and the block download link resolves to public
  registry JSON.
- Rows that still lack honest source-owned registry payloads may stay
  `deferred`, but the reason must be concrete and user-facing enough for a
  maintainer to plan the next component slice.

Block composition requirements:

- Build richer page-like blocks, not one-control demos. Examples:
  - `sidebar-navigation`: render a compact dashboard shell with a left nav,
    active item, secondary section, and content card.
  - `transaction-investment-lists`: render a list/table-like card with rows,
    badges, amounts, and a primary action.
  - `switches` and `sliders`: combine into a settings/smart-control block when
    useful, but keep inventory rows independently selectable if both are marked
    rendered.
  - `radio-groups`, `checkboxes`, and `upload-controls`: render form sections
    that resemble preview-02 payment/settings/upload surfaces.
  - `modal-drawer-surfaces`: render the closed/open surface as a static preview
    if the Theme Studio story does not need interactive modal state yet.
- Use existing shadcn/Foldkit primitives where available. If using a primitive
  would require modifying installable `registry/**` source beyond metadata or
  examples, STOP and report instead of widening the implementation silently.
- Keep the catalog source-owned: selector labels and download links come from
  `registry/upstream/derived/shadcn-preview-02.json` and generated
  `theme-studio.json`, not from a separate hard-coded selector list.

Verification:

```sh
bun run test -- scripts/theme-studio-catalog.test.ts src/openstory/themeStudio.story.test.ts src/openstory/themeStudio.scene.test.ts
bun run build:registry
bun run check:theme-studio
```

Expected:

- tests exit 0;
- catalog tests assert `previewBlocks.length >= 12`;
- scene tests prove switching among at least five representative block IDs
  changes the rendered preview content;
- `theme-studio.json` is regenerated and checked.

### Addendum Step D: Improve block selection ergonomics

The block selector may remain a native select for accessibility, but it must not
be the only way a user understands what is available.

Add a source-driven block overview using catalog data:

- Render a compact block option list/grid with
  `data-testid="theme-studio-block-options"`.
- Each rendered block option row/card must show:
  - title from the catalog;
  - dependency/component family from the preview-02 inventory when present;
  - status (`rendered`, `covered-by-existing-example`, or `deferred`) where
    non-rendered rows are shown;
  - a small token-colored indicator or category marker so theme changes are
    visible in the selector area too.
- Selecting a block from this list/grid must send
  `SelectedThemeStudioPreviewBlock` and keep the native select in sync.
- Deferred rows may be displayed as disabled/non-selectable with their reason,
  but do not let a deferred row become the selected preview.

Verification:

```sh
bun run test -- src/openstory/themeStudio.scene.test.ts
bunx playwright test tests/e2e/openstory-theme-studio.spec.ts
```

Expected:

- scene tests prove the block option list/grid is rendered from catalog data;
- e2e proves clicking a block option changes
  `data-selected-preview-block`, changes the native select value, and changes
  the visible preview title/content.

### Addendum final verification

Run the full plan gates after the addendum:

```sh
bun run typecheck
bun run test
bun run build:registry
bun run check:registry
bunx playwright test tests/e2e/openstory-theme-studio.spec.ts tests/e2e/openstory-shadcn-theme.spec.ts tests/e2e/openstory-toolbar-indicators.spec.ts
bun run build
```

Expected: all commands exit 0 and `git status --short` is clean except for
intentional committed changes.

## Post-execution revision addendum: align Theme Studio with shadcn/create origin controls

This addendum captures the next product requirement from the live shadcn/create
origin surface. It was added after browser review of the current Theme Studio
implementation on branch `codex/028-theme-studio-downloads` at commit
`47849344`, plus an uncommitted local follow-up that made the Theme Studio story
fullscreen and changed the root from `mx-auto max-w-7xl` to `w-full`.

Before executing this addendum, preserve those uncommitted fullscreen changes in
the 028 worktree. Do not revert them. The required existing diff is:

```diff
src/openstory/wipSpace/theme-studio.stories.ts
-  parameters: { shadcn: true },
+  parameters: { layout: "fullscreen", shadcn: true },

src/openstory/themeStudio.ts
-  h.Class("mx-auto grid min-h-screen max-w-7xl gap-5 p-4 text-foreground"),
+  h.Class("grid min-h-screen w-full gap-5 p-4 text-foreground"),
```

Addendum drift check:

```sh
git diff --stat 47849344..HEAD -- src/openstory/themeStudio.ts src/openstory/themeStudio.story.test.ts src/openstory/themeStudio.scene.test.ts src/openstory/wipSpace/theme-studio.stories.ts tests/e2e/openstory-theme-studio.spec.ts registry/upstream/derived/shadcn-preview-02.json registry/upstream/derived/shadcn-theme.json apps/docs/public/theme-studio.json scripts/theme-studio-catalog.mjs scripts/check-theme-studio-artifacts.mjs scripts/build-registry.mjs ../openstory/packages/openstory/src/boot/protocol.ts ../openstory/packages/openstory/src/shell/src/app.tsx ../openstory/packages/openstory/src/shell/src/state/use-iframe-comms.ts ../openstory/packages/openstory/src/shell/src/components/top-bar.tsx
```

If in-scope files changed since `47849344`, compare current code against the
requirements below. Preserve the fullscreen/root-width diff above. If the
OpenStory shell/protocol files are not reachable through the local
`file:../openstory` dependency, STOP and report that bidirectional toolbar
linkage needs a separate OpenStory change.

Live origin references checked for this addendum:

- `https://ui.shadcn.com/create?preset=b27GcrRo` is the origin interaction
  target for the theme-card rows and preview page composition.
- `https://ui.shadcn.com/docs/theming` is the option contract for CSS variables,
  semantic tokens, radius, base colors, and the no-CSS-variables deferred path.
- The live create page theme card currently exposes these rows: `Style`,
  `Base Color`, `Theme`, `Chart Color`, `Heading`, `Font`, `Icon Library`,
  `Radius`, `Menu`, and `Menu Accent`, followed by preset/open/shuffle/get-code
  actions.
- The live create page starts with preview switcher controls `01` and `02`; for
  this plan, Theme Studio must inventory and expose every origin preview block it
  can source honestly, not only the blocks visible in the current local selector.

### Addendum Step E: Match the origin theme-card option model

Extend the Theme Studio catalog so the theme card is not a smaller Foldkit-only
control set. The Theme Studio card must render the same top-level rows as the
origin shadcn/create card:

- `Style`
- `Base Color`
- `Theme`
- `Chart Color`
- `Heading`
- `Font`
- `Icon Library`
- `Radius`
- `Menu`
- `Menu Accent`

Implementation requirements:

- Add a `themeCardOptions` or equivalent catalog section to
  `scripts/theme-studio-catalog.mjs`.
- Each row must include `id`, `title`, `status`, `selectedValue`, `source`, and
  `options`.
- `Style`, `Base Color`, `Theme`, `Chart Color`, `Radius`, and mode-related
  values must derive from `registry/upstream/derived/shadcn-theme.json` or a
  generated derivative of it. Do not maintain a second hard-coded style/color
  list in the view.
- `Heading`, `Font`, `Icon Library`, `Menu`, and `Menu Accent` must be
  represented even if the repo cannot yet generate every origin variant. If a
  row cannot be source-backed yet, mark it `deferred` with a concrete blocker
  instead of omitting it.
- Base colors must include the shadcn theming-page values when present in the
  checked-in source contract: Neutral, Stone, Zinc, Mauve, Olive, Mist, and
  Taupe. A style may expose only the base colors it actually supports, but the
  catalog must record unsupported origin colors as absent-by-source rather than
  silently hiding the origin row.
- Preserve the existing `cssVariablesOptions` contract. The no-CSS-variables
  path remains visible and deferred until style-level component recipes can be
  generated honestly.
- The card UI should resemble origin structure: row label, selected value,
  indicator/swatch/icon, lock/deferred indicator where applicable, preset code
  surface, open preset action, shuffle action, and get-code/download action. Do
  not add tutorial copy to explain the UI.

Verification:

```sh
bun run test -- scripts/theme-studio-catalog.test.ts src/openstory/themeStudio.story.test.ts src/openstory/themeStudio.scene.test.ts
bun run build:registry
bun run check:theme-studio
```

Expected: catalog tests assert every required theme-card row exists; active rows
have non-empty options; deferred rows have concrete reasons; generated
`/theme-studio.json` includes the same row inventory that the story renders.

### Addendum Step F: Link Theme Studio card selections to OpenStory toolbar globals

The Theme Studio card and the top OpenStory toolbar must point at the same
source data and stay synchronized.

Current OpenStory shape to preserve:

```ts
// ../openstory/packages/openstory/src/shell/src/app.tsx
const [globals, setGlobals] = useState<Record<string, unknown>>(initialUrlState.globals);

const handleGlobalChange = useCallback(
  (key: string, value: unknown) => {
    const next = { ...globals, [key]: value };
    setGlobals(next);
    comms.setGlobals(next);
  },
  [globals, comms],
);
```

```ts
// ../openstory/packages/openstory/src/boot/protocol.ts
export type ShellToStory =
  | { type: "set-args"; args: Record<string, unknown> }
  | { type: "set-globals"; globals: Record<string, unknown> }
  | { type: "rerun-play" }
  | { type: "reload" };
```

Requirements:

- Theme Studio initial state must resolve from the current OpenStory globals
  (`shadcnTheme` and `shadcnMode`) when present in the story context or URL.
- Changing the top toolbar must update the Theme Studio card selection and the
  preview without remounting stale state.
- Changing `Style`, `Base Color`, `Theme`, or light/dark/system mode inside the
  Theme Studio card must update the same OpenStory globals used by the top
  toolbar, so the toolbar label/indicator and URL `globals=` value stay in sync.
- Prefer a generic OpenStory protocol addition over Theme-Studio-specific hacks:
  add a story-to-shell message such as `{ type: "globals-changed"; globals }`,
  handle it in `useIframeComms`, update shell `globals`, and post the merged
  globals back to the story.
- Keep this protocol generic and covered by OpenStory shell tests if such tests
  exist. Do not hard-code `shadcnTheme` or `shadcnMode` into OpenStory internals.
- If the current Foldkit story renderer cannot access story globals or emit a
  story-to-shell message without a broader OpenStory API addition, STOP and
  report the missing API instead of implementing a brittle DOM/URL mutation.

Verification:

```sh
bunx playwright test tests/e2e/openstory-theme-studio.spec.ts tests/e2e/openstory-shadcn-theme.spec.ts tests/e2e/openstory-toolbar-indicators.spec.ts
```

Expected:

- loading `/?id=shadcn-theme-studio--studio&globals=shadcnTheme%3Arhea-neutral%3BshadcnMode%3Alight`
  selects Rhea/Neutral/Light in the Theme Studio card;
- selecting a different top toolbar shadcn theme updates the card selected
  style/base color;
- selecting a different Theme Studio card theme updates the top toolbar visible
  label/indicator and URL globals;
- selecting light/dark/system in either place updates the other surface and the
  rendered preview.

### Addendum Step G: Match the origin example block inventory and expose component dependencies

Theme Studio must treat the origin create/preview page as the first page-level
target. The block selector must be an origin block inventory, not a local sampler
whose categories happen to overlap.

Implementation requirements:

- Update `registry/upstream/derived/shadcn-preview-02.json` or add a sibling
  machine-readable inventory for the create-page preview blocks. Prefer one
  source-owned inventory that can cover both `preview-02` and shadcn/create
  `01`/`02` variants if the schema stays simple.
- The inventory must include every visible block family from the origin create
  page screenshot and live page, at minimum: contribution history, payout
  threshold, savings targets, buy investment, distribute track/upload empty
  state, claimable balance, QR/device connection, recent transactions,
  sidebar/theme card, preset/actions, and page-level preview switcher `01`/`02`.
- Keep the existing preview-02 control-family rows unless the new inventory
  supersedes them with a clearer source mapping.
- Every row must include `id`, `title`, `originSurface`, `status`,
  `registryItemName` when rendered or covered, `dependencies`, `downloadHref`
  when a registry payload exists, and `reason`/`followUp` when deferred.
- Generate a component inventory from those rows. Add it to
  `/theme-studio.json` as `componentInventory` or write a separate generated
  public artifact such as `/theme-studio-components.json`.
- The component inventory is the initial refinement checklist. It must group
  dependencies by component and include component name, origin blocks using it,
  current local registry/example item names, status (`needs-origin-spec`,
  `in-progress`, `matched`, or `deferred`), source reference URL, and suggested
  follow-up plan number if known, especially plan 026 for exact origin visual
  parity.
- Initial expected dependencies include at least: card, button, progress, input,
  textarea, select/combobox, switch, tabs, accordion, dropdown/menu,
  calendar/date controls, radio group, checkbox, slider, badge, separator,
  table/list rows, navigation/sidebar/menu, dialog/drawer/sheet, chart, QR/code
  or image placeholder, upload/file input, typography, icon/lucide, and theme
  token/radius/font/menu configuration.

Verification:

```sh
bun run test -- scripts/theme-studio-catalog.test.ts src/openstory/themeStudio.story.test.ts
bun run build:registry
bun run check:theme-studio
```

Expected: tests assert every required origin block row exists; every rendered
row has at least one component dependency and a resolvable download href; every
deferred row has a dependency and reason; the component inventory contains at
least the expected dependency names above.

### Addendum Step H: Move the preview toward origin-identical composition

As components are refined, Theme Studio should become visually identical to the
origin create/preview page. This addendum does not require full pixel parity for
all blocks yet, but it must create the ratchet that makes progress measurable.

Implementation requirements:

- Add a `data-origin-surface` attribute to rendered block frames or rows so
  browser tests can distinguish local sampler content from origin create/preview
  content.
- Add stable test IDs for the origin page-level block groups:
  `theme-studio-origin-theme-card`, `theme-studio-origin-block-list`, and
  `theme-studio-component-inventory`.
- Render the component inventory in the Theme Studio story as a compact
  checklist/table below or beside the preview. It may be dense, but it must be
  generated from catalog data and not maintained as a hand-written view list.
- Keep the preview container full-width/full-height from the previous fullscreen
  fix. The selected body in OpenStory must not regress to the centered layout.
- Add e2e coverage that verifies the Theme Studio root fills the iframe, the
  origin theme-card rows are visible, the origin block list is populated from
  catalog data, and the component inventory is visible.

Verification:

```sh
bunx playwright test tests/e2e/openstory-theme-studio.spec.ts
```

Expected: the focused e2e fails if the story uses centered layout, if any
required origin theme-card row is missing, if block rows are hard-coded outside
the catalog, or if the component inventory is absent.

### Addendum final verification for origin-control parity

Run the full plan gates after Steps E-H:

```sh
bun run typecheck
bun run test
bun run build:registry
bun run check:registry
bunx playwright test tests/e2e/openstory-theme-studio.spec.ts tests/e2e/openstory-shadcn-theme.spec.ts tests/e2e/openstory-toolbar-indicators.spec.ts
bun run build
```

Expected: all commands exit 0. The executor should commit the changes in
`codex/028-theme-studio-downloads` and report the commit hash, changed files,
and any deferred origin rows that remain.

## Test plan

- `scripts/theme-studio-catalog.test.ts` or `src/openstory/themeStudio.story.test.ts`:
  catalog derivation, generated theme payload shape, fallback behavior.
- `src/openstory/themeStudio.scene.test.ts`: initial controls, option rendering,
  model update behavior, preview block switching, download hrefs.
- `tests/e2e/openstory-theme-studio.spec.ts`: OpenStory story availability,
  `/theme-studio.json`, dynamic option rendering, token updates, downloadable
  theme/block JSON.
- Post-execution addendum coverage:
  - visible color changes, not only CSS variable changes;
  - at least 12 rendered preview-02 block options;
  - shared `theme-studio-example-frame` max-height behavior;
  - catalog-driven block option list/grid selection.
- Origin-control addendum coverage:
  - origin shadcn/create theme-card row inventory;
  - Theme Studio card and top OpenStory toolbar global synchronization;
  - origin create/preview block inventory;
  - generated component inventory checklist for origin block dependencies;
  - fullscreen Theme Studio root/fill behavior.
- Existing tests to keep green:
  - `src/openstory/shadcnTheme.story.test.ts`
  - `tests/e2e/openstory-shadcn-theme.spec.ts`
  - `tests/e2e/openstory-toolbar-indicators.spec.ts`

## Done criteria

All must hold:

- [ ] `docs/product/project-invariants-scorecard.md` defines
      `P14_DYNAMIC_OPTION_DISTRIBUTION` in both catalog and baseline.
- [ ] `scripts/check-project-invariants-scorecard.mjs` requires 14 invariant IDs.
- [ ] `bun run check:invariants` exits 0 and reports 14 invariants.
- [ ] The plan implementation records `https://ui.shadcn.com/docs/theming` and
      `https://ui.shadcn.com/preview/radix/preview-02` as the source references
      for Theme Studio options and the first rich preview target.
- [ ] The theming-page option set is inventoried: `style`,
      `tailwind.baseColor`, CSS-variable support, light/dark/system mode,
      semantic token groups, radius scale, default theme CSS, and the
      no-CSS-variables path.
- [ ] A preview-02 coverage inventory exists and every visible block/control
      family is marked `rendered`, `covered-by-existing-example`, or `deferred`
      with a reason and component dependency.
- [ ] Theme Studio options derive from `registry/upstream/derived/shadcn-theme.json`
      and source registry metadata; no hand-authored duplicate style/theme list
      drives the UI.
- [ ] `apps/docs/public/theme-studio.json` is generated and checked.
- [ ] Every valid style/base-color pair has a generated root-level
      `foldkit-theme-{style}-{baseColor}.json` payload with `type:
      "registry:theme"` and light/dark `cssVars`.
- [ ] The OpenStory story `shadcn/Theme Studio` renders all catalog style,
      theme/base-color, mode, active CSS-variable, and rendered preview block
      options.
- [ ] Theme/base-color/mode changes visibly affect rendered preview surfaces,
      not only wrapper CSS variables or data attributes.
- [ ] `registry/upstream/derived/shadcn-preview-02.json` has at least 12
      `rendered` rows, and Theme Studio exposes at least 12 selectable rendered
      preview blocks.
- [ ] Theme Studio renders `theme-studio-block-options` from catalog data and
      selecting a block from it keeps the native selector and preview content in
      sync.
- [ ] Theme Studio renders the origin shadcn/create theme-card row inventory:
      `Style`, `Base Color`, `Theme`, `Chart Color`, `Heading`, `Font`,
      `Icon Library`, `Radius`, `Menu`, and `Menu Accent`.
- [ ] Theme Studio card selections and OpenStory top toolbar globals are linked:
      toolbar changes update the card, and card changes update the toolbar/URL
      globals through a generic OpenStory protocol or supported API.
- [ ] The origin create/preview block inventory includes the visible page-level
      blocks and records `rendered`, `covered-by-existing-example`, or
      `deferred` with dependencies and reasons.
- [ ] `/theme-studio.json` or a generated sibling artifact includes a component
      inventory checklist mapping origin blocks to local components and parity
      refinement status.
- [ ] Every rendered preview block uses the shared
      `theme-studio-example-frame` with one standard max-height contract.
- [ ] Selected theme and selected preview block download links resolve to JSON
      served from the public site root.
- [ ] The retired Vite docs app route is not reintroduced.
- [ ] `bun run typecheck`, `bun run test`, `bun run build:registry`,
      `bun run check:registry`, focused Theme Studio e2e, and `bun run build`
      all exit 0.
- [ ] `plans/README.md` status row for plan 028 is updated.

## STOP conditions

Stop and report back without improvising if:

- The selected OpenStory story ID format does not match
  `shadcn-theme-studio--studio` and changing it would require OpenStory shell
  internals.
- Generating theme downloads requires a live network refresh of shadcn sources.
- The executor cannot produce a stable checked-in inventory of shadcn theming
  options and preview-02 block/control families from the cited source pages.
- The local OpenStory `file:../openstory` dependency is not available or cannot
  support a generic globals-changed story-to-shell message without a broader
  OpenStory API design.
- A meaningful style-level `registry:style` payload or no-CSS-variables payload
  cannot be represented without claiming component recipe parity that the repo
  does not yet have. In that case, ship `registry:theme` downloads, mark the
  unsupported option `deferred` in the catalog and coverage ledger, and record
  the blocker as a follow-up rather than hiding the option.
- The plan appears to require modifying `src/docsView.ts` or restoring
  `/docs/theme-playground`.
- The implementation requires editing installable component source under
  `registry/**` beyond adding source metadata to existing registry items.
- A verification command fails twice after a reasonable local fix attempt.

## Maintenance notes

- Treat `P14_DYNAMIC_OPTION_DISTRIBUTION` as the future reviewer hook for any
  work that adds a style, theme, preview block, or downloadable registry option.
- The Theme Studio catalog should be the single source of truth for the
  OpenStory UI and public download manifest. If reviewers see a style/theme
  option in one but not the other, that is a regression.
- Style-level and no-CSS-variables downloads are intentionally cautious. A
  `registry:theme` payload is valid as soon as tokens exist; a `registry:style`
  payload should wait until the repo can honestly describe component recipe
  behavior for that style.
- Add rendered preview blocks incrementally as components reach parity, but keep
  the preview-02 inventory complete. A missing block is acceptable only when it
  is explicitly marked `deferred` with a dependency and follow-up.
