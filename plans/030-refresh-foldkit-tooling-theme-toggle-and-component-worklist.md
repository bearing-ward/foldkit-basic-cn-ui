# Plan 030: Refresh Foldkit tooling, fix the OpenStory mode toggle, and print the component worklist

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the next
> step. If anything in the "STOP conditions" section occurs, stop and report -
> do not improvise. When done, update the status row for this plan in
> `plans/README.md` unless a reviewer dispatched you and told you they maintain
> the index.
>
> **Drift check (run first)**:
> `git diff --stat 8b8ad6a7..HEAD -- package.json bun.lock oxlint.config.ts src/preview.ts src/openstory/shadcnTheme.ts src/openstory/shadcnTheme.story.test.ts tests/e2e/openstory-shadcn-theme.spec.ts tests/e2e/openstory-toolbar-indicators.spec.ts tests/e2e/origin-parity/fixtures.json docs/product/origin-content-parity-review.md docs/product/project-invariants-scorecard.md plans/README.md`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding. On a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: L
- **Risk**: MED
- **Depends on**: plans/023-add-openstory-theme-and-mode-selectors.md, plans/024-expand-openstory-shadcn-theme-catalog.md, plans/027-add-openstory-toolbar-indicators.md, plans/026-activate-exact-origin-visual-parity.md
- **Category**: migration, dx, bug, direction
- **Planned at**: commit `8b8ad6a7`, 2026-06-23
- **Execution result**: DONE on 2026-06-23 in isolated worktree
  `/Volumes/Sync/Development/Bearing-Ward/projects/repos/foldkit-basic-cn-ui-030-foldkit-tooling-theme-toggle-worklist`.
  The first execution stopped when the Foldkit 0.115 upgrade exposed the
  `@foldkit/ui` package split, `Runtime.makeProgram` removal, and broad type
  fallout. Revision commits `9483bc0b`, `b6514742`, and `3621a845` completed the
  Foldkit/tooling upgrade, added `@foldkit/ui@0.115.0`, migrated runtime and UI
  imports, added the host OpenStory `Toggle theme` control, covered legacy
  `system` mode toggling, and added `origin:parity:worklist`. Sibling OpenStory
  commits `d4da7eb` and `26be4fc` added generic toolbar toggle actions and
  system-mode resolution. Reviewer verification passed target typecheck,
  focused story/unit tests, focused OpenStory e2e with 8 tests, origin parity
  worklist and coverage, registry check, build, changed-file oxlint, whitespace
  checks, OpenStory typecheck, and OpenStory shell build. Full `bun run lint`
  remains red on existing repo-wide Ultracite baseline issues and was not
  repaired by this plan.

## Why this matters

This repo is pinned to `foldkit@0.104.0` while the current npm latest checked on
2026-06-23 is `0.115.0`. The Foldkit tooling family has also moved:
`@foldkit/vite-plugin@0.9.1`, `@foldkit/devtools-mcp@0.12.0`, and
`@foldkit/oxlint-plugin@0.1.0` were current at plan time. Staying behind makes
future registry work more likely to hit stale primitive APIs, and the repo is
missing the Foldkit-specific oxlint rules documented by Foldkit.

The OpenStory light/dark mode control is currently a toolbar dropdown with
Light, Dark, and System items. The requested behavior is closer to shadcn's docs
header: a single simple `Toggle theme` button. The final UI should toggle
directly between light and dark, keep the selected mode reflected in OpenStory
globals, and preserve the theme selector itself.

Finally, component work needs to stay visible. The current visual parity ledger
has 97 public origin-backed UI items, but only 3 active examples and 94
inventory-only examples. This plan should print that list through a repo command
so follow-up batches are not hand-curated from stale notes.

## Current state

This is a Foldkit app. Follow `AGENTS.md`: examples and source must remain
Foldkit-native, use Schema-backed model/message state, use messages as facts,
confine effects to commands, and use `html<Message>()` inside view functions.

Relevant package state:

```json
// package.json:36-67
"dependencies": {
  "@effect/platform-browser": "4.0.0-beta.66",
  "@effect/platform-node": "4.0.0-beta.66",
  "effect": "4.0.0-beta.66",
  "foldkit": "0.104.0"
},
"devDependencies": {
  "@foldkit/devtools-mcp": "^0.9.0",
  "@foldkit/vite-plugin": "^0.7.0",
  "oxlint": "latest",
  "ultracite": "7.8.1"
},
"overrides": {
  "@effect/platform-node-shared": "4.0.0-beta.66"
},
"packageManager": "bun@1.3.14"
```

At plan time, `npm view` reported:

```text
foldkit 0.115.0
@foldkit/oxlint-plugin 0.1.0
@foldkit/vite-plugin 0.9.1
@foldkit/devtools-mcp 0.12.0
```

The current lint config extends Ultracite's oxlint core but does not load the
Foldkit plugin:

```ts
// oxlint.config.ts:1-7
import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";

export default defineConfig({
  extends: [core],
  ignorePatterns: [...core.ignorePatterns, "repos/**", "**/repos/**"],
  rules: {
```

Foldkit's current oxlint tooling docs say Foldkit projects use `oxlint` with
`@foldkit/oxlint-plugin`, and scaffolded projects load it through `jsPlugins`
with the name `foldkit` and specifier `@foldkit/oxlint-plugin`. The documented
Foldkit rules include:

```text
foldkit/no-noop-message
foldkit/got-submodel-message-name
foldkit/message-binding-matches-tag
foldkit/got-prefix-requires-submodel-payload
foldkit/no-empty-object-tagged-call
foldkit/prefer-callable-message-constructor
foldkit/command-binding-matches-name
```

The current OpenStory preview exposes a mode dropdown:

```ts
// src/preview.ts:46-60
shadcnMode: {
    name: "shadcn mode",
    description: "Source-derived shadcn color mode.",
    defaultValue: "light",
    toolbar: {
        title: "mode",
        icon: "circle",
        dynamicTitle: true,
        items: [
            { value: "light", title: "Light", icon: "sun", color: "oklch(0.985 0 0)" },
            { value: "dark", title: "Dark", icon: "moon", color: "oklch(0.145 0 0)" },
            { value: "system", title: "System", icon: "monitor", color: "oklch(0.556 0 0)" },
        ],
    },
},
```

The derived helper mirrors that dropdown and supports `system`:

```ts
// src/openstory/shadcnTheme.ts:27-47,112-128
export type ShadcnColorMode = "light" | "dark" | "system";

const colorModes = [
  "light",
  "dark",
  "system",
] as const satisfies ReadonlyArray<ShadcnColorMode>;

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
```

The e2e test currently clicks the mode dropdown and selects the Dark option:

```ts
// tests/e2e/openstory-shadcn-theme.spec.ts
await expect(page.getByLabel("mode")).toBeVisible();
await page.getByLabel("mode").click();
await page.getByRole("option", { name: "Dark" }).click();
await expect(wrapper).toHaveAttribute("data-shadcn-mode", "dark");
```

The active component parity ledger says registry coverage is not completion and
final signoff needs enabled visual parity evidence or a documented exception:

```md
// docs/product/origin-content-parity-review.md:24-35
`bun run origin:parity:test` does not contact upstream sites. It compares local
docs examples against stored references by DOM/ARIA shape, class tokens where
enabled, computed CSS, geometry, and screenshots according to each fixture's
tolerances. Inventory-only fixtures keep uncovered rows visible in coverage but
do not run browser assertions.

Final signoff for a row needs a passing parity check for enabled examples or a
documented row exception explaining why automated visual comparison is not
appropriate yet.
```

The current summary and scorecard record the worklist size:

```md
// docs/product/origin-content-parity-review.md:40-43
- Public Base UI origin-backed UI entries: 37
- shadcn origin-backed UI entries: 60
- Public rows to review: 97
- Patched examples awaiting side-by-side visual signoff: `base-ui-dialog`, `base-ui-popover`, `button-group`, `card`, `carousel`, `chart`, `command`, `empty`, `shadcn-collapsible`
```

```md
// docs/product/project-invariants-scorecard.md:129
Coverage now has 3 active examples and 94 inventory-only examples, so exact
visual coverage is still a ratchet in progress rather than full public-surface
proof.
```

At plan time, this command printed the current worklist:

```sh
node --input-type=module -e 'import fs from "node:fs"; const f=JSON.parse(fs.readFileSync("tests/e2e/origin-parity/fixtures.json","utf8")); const enabled=e=>e.compare?.dom===true||e.compare?.classTokens===true||(Array.isArray(e.compare?.computedStyle)&&e.compare.computedStyle.length>0)||e.compare?.geometry===true||e.compare?.screenshot===true; const rows=f.items.map(item=>({item:item.itemName,lane:item.lane,active:item.examples.filter(enabled).map(e=>e.exampleName),inventory:item.examples.filter(e=>!enabled(e)).map(e=>e.exampleName)})); const needs=rows.filter(r=>r.inventory.length>0); console.log(`components_needing_visual_parity_work=${needs.length}`); for (const r of needs) console.log(`${r.lane}\t${r.item}\tinventory_only=${r.inventory.join(",")}\tactive=${r.active.join(",")||"-"}`);'
```

It reported 94 components/examples needing visual-parity work:

```text
shadcn: badge, chart, command, data-table, direction, dropdown-menu, empty, hover-card, input-group, input-otp, item, kbd, label, native-select, pagination, resizable, shadcn-accordion, shadcn-alert, shadcn-alert-dialog, shadcn-aspect-ratio, shadcn-avatar, shadcn-base-accordion, shadcn-breadcrumb, shadcn-button-group, shadcn-calendar, shadcn-card, shadcn-carousel, shadcn-checkbox, shadcn-collapsible, shadcn-combobox, shadcn-context-menu, shadcn-date-picker, shadcn-dialog, shadcn-drawer, shadcn-field, shadcn-input, shadcn-menubar, shadcn-navigation-menu, shadcn-popover, shadcn-progress, shadcn-radio-group, shadcn-scroll-area, shadcn-select, shadcn-slider, shadcn-switch, shadcn-tabs, shadcn-textarea, shadcn-toast, shadcn-toggle, shadcn-toggle-group, shadcn-tooltip, sheet, sidebar, skeleton, sonner, spinner, table, typography
base-ui: base-ui-accordion, base-ui-alert-dialog, base-ui-autocomplete, base-ui-avatar, base-ui-checkbox, base-ui-checkbox-group, base-ui-collapsible, base-ui-combobox, base-ui-context-menu, base-ui-dialog, base-ui-drawer, base-ui-field, base-ui-fieldset, base-ui-form, base-ui-input, base-ui-menu, base-ui-menubar, base-ui-meter, base-ui-navigation-menu, base-ui-number-field, base-ui-otp-field, base-ui-popover, base-ui-preview-card, base-ui-progress, base-ui-radio, base-ui-scroll-area, base-ui-select, base-ui-separator, base-ui-slider, base-ui-switch, base-ui-tabs, base-ui-toast, base-ui-toggle, base-ui-toggle-group, base-ui-toolbar, base-ui-tooltip
```

The first human-priority batch is smaller:

```text
base-ui-dialog, base-ui-popover, button-group, card, carousel, chart, command, empty, shadcn-collapsible
```

## Commands you will need

| Purpose | Command | Expected on success |
| --- | --- | --- |
| Check current latest packages | `npm view foldkit version && npm view @foldkit/oxlint-plugin version && npm view @foldkit/vite-plugin version && npm view @foldkit/devtools-mcp version` | exits 0; versions are at least the plan-time versions above |
| Install/update deps | `bun add foldkit@latest @foldkit/vite-plugin@latest @foldkit/devtools-mcp@latest && bun add -d @foldkit/oxlint-plugin@latest` | exits 0; `package.json` and `bun.lock` update |
| Typecheck | `bun run typecheck` | exits 0 |
| Unit/story tests | `bun run test -- src/openstory/shadcnTheme.story.test.ts` | exits 0 |
| Lint | `bun run lint` | exits 0, including Foldkit plugin rules |
| Registry gate | `bun run check:registry` | exits 0 |
| Focused OpenStory e2e | `bunx playwright test tests/e2e/openstory-shadcn-theme.spec.ts tests/e2e/openstory-toolbar-indicators.spec.ts` | exits 0 |
| Worklist print | `bun run origin:parity:worklist` | prints `components_needing_visual_parity_work=<count>` followed by component rows |
| Visual coverage summary | `bun run origin:parity:coverage` | exits 0 and prints active/inventory-only counts |
| Build | `bun run build` | exits 0 |

## Scope

**In scope**:

- `package.json`
- `bun.lock`
- `oxlint.config.ts`
- `src/preview.ts`
- `src/openstory/shadcnTheme.ts`
- `src/openstory/shadcnTheme.story.test.ts`
- `tests/e2e/openstory-shadcn-theme.spec.ts`
- `tests/e2e/openstory-toolbar-indicators.spec.ts` if toolbar indicator assertions need to reflect the simple mode toggle
- `scripts/print-origin-visual-parity-worklist.mjs` or an equivalent script
- `scripts/check-origin-visual-parity-coverage.mjs` only if shared parsing should be reused
- `docs/product/origin-content-parity-review.md` only to update generated/current worklist notes if the printed count changes
- `docs/product/project-invariants-scorecard.md` only to update current evidence after verification
- `plans/README.md`

**Out of scope**:

- Do not implement the 94 component parity fixes in this plan.
- Do not hand-edit generated files under `apps/docs/public/**` or `src/openstory/generated/**`.
- Do not change installable registry component APIs unless the Foldkit upgrade breaks typecheck and the change is required to restore compatibility.
- Do not replace OpenStory's theme selector; only the light/dark mode control is being simplified.
- Do not revive the retired `/docs/theme-playground` route.

## Git workflow

- Branch: `codex/030-foldkit-tooling-theme-toggle-worklist`.
- Commit in logical units: dependencies/tooling, theme toggle, worklist script/docs.
- Do not push or open a PR unless the operator asks.

## Invariant impact

| Invariant | Impact | Expected status/grade change | Evidence to update | Non-goal |
| --- | --- | --- | --- | --- |
| `P2_FOLDKIT_ARCHITECTURE` | Updating Foldkit can surface stale primitive or runtime usage. | No grade change expected if tests remain green. | `typecheck`, focused tests, `check:registry`. | Do not refactor architecture beyond required compatibility fixes. |
| `P4_SOURCE_PARITY` | The theme mode control should match the current shadcn docs affordance: a simple `Toggle theme` button. | No grade change expected. | OpenStory e2e and shadcn theme tests. | Do not refresh upstream shadcn snapshots. |
| `P6_VISUAL_PARITY` | Adds a printed worklist for inventory-only parity rows. | No grade change expected unless active fixture count changes. | `origin:parity:worklist`, `origin:parity:coverage`. | Do not mark new rows complete without fixtures. |
| `P11_PROGRESS_LEDGER` | Adds plan 030 and keeps dependency/status order current. | No grade change expected. | `plans/README.md`. | Do not rewrite older plan history. |
| `P12_INVARIANT_GOVERNANCE` | Scorecard evidence may need refreshed package/tooling verification notes. | No grade change expected. | `check:invariants` through `check:registry`. | Do not change invariant semantics. |

## Steps

### Step 1: Re-check latest Foldkit package versions

Run:

```sh
npm view foldkit version
npm view @foldkit/oxlint-plugin version
npm view @foldkit/vite-plugin version
npm view @foldkit/devtools-mcp version
```

Use the returned latest versions. At plan time they were `foldkit@0.115.0`,
`@foldkit/oxlint-plugin@0.1.0`, `@foldkit/vite-plugin@0.9.1`, and
`@foldkit/devtools-mcp@0.12.0`.

**Verify**: all four commands exit 0. If npm returns a newer Foldkit version
than `0.115.0`, proceed with the newer version but record it in the final notes.

### Step 2: Update Foldkit and Foldkit tooling dependencies

Run:

```sh
bun add foldkit@latest @foldkit/vite-plugin@latest @foldkit/devtools-mcp@latest
bun add -d @foldkit/oxlint-plugin@latest
```

Keep `effect` and `@effect/*` pinned unless `bun install`, typecheck, or Foldkit
peer requirements force an update. If a peer dependency requires an Effect
version bump, update the relevant Effect packages together and include that in
the final notes.

**Verify**:

```sh
node --input-type=module -e 'import fs from "node:fs"; const pkg=JSON.parse(fs.readFileSync("package.json","utf8")); const deps={...pkg.dependencies,...pkg.devDependencies}; for (const name of ["foldkit","@foldkit/vite-plugin","@foldkit/devtools-mcp","@foldkit/oxlint-plugin"]) console.log(`${name}: ${deps[name] ?? "<missing>"}`);'
bun run typecheck
```

Expected: the dependency print shows all four packages present, and typecheck
exits 0. If typecheck fails because a Foldkit primitive API changed, fix only
the minimum call sites required to compile and keep those fixes in scope.

### Step 3: Install the Foldkit oxlint plugin into the existing config

Update `oxlint.config.ts` to preserve the Ultracite base config and add the
Foldkit JavaScript plugin. Match Foldkit's documented shape:

```ts
jsPlugins: [
  {
    name: "foldkit",
    specifier: "@foldkit/oxlint-plugin",
  },
],
```

Enable the documented Foldkit rules at `error` level unless existing code fails
immediately. If existing code fails, prefer fixing small violations. If the rule
surfaces broad pre-existing debt, temporarily scope the rule to warning or add a
targeted TODO plan, but do not silently disable every Foldkit rule.

**Verify**:

```sh
bun run lint
```

Expected: lint exits 0 and does not report unknown rule/plugin errors.

### Step 4: Replace the mode dropdown with a simple light/dark toggle

Change the mode control so OpenStory exposes a single button labelled
`Toggle theme`, matching the simple shadcn docs affordance. The button should:

- read the current `shadcnMode` global;
- treat `system` as its resolved light/dark value before toggling;
- set `shadcnMode` to `dark` when current/resolved mode is `light`;
- set `shadcnMode` to `light` when current/resolved mode is `dark`;
- keep `shadcnTheme` selection unchanged;
- keep `initialGlobals.shadcnMode` as `light`;
- continue to set wrapper attributes such as `data-shadcn-mode` and
  `data-shadcn-resolved-mode`.

Prefer solving this through the OpenStory global/toolbar metadata already used
by `src/preview.ts` and `src/openstory/shadcnTheme.ts`. If the current OpenStory
shell cannot express a toggle action through manifest metadata, update the local
OpenStory file dependency in `../openstory/packages/openstory` only enough to
support a generic toolbar button item/action, then wire Foldkit CN to that. Do
not implement a Foldkit-CN-only DOM hack inside the iframe.

Preserve the literal `globalTypes` and `initialGlobals` shape in `src/preview.ts`
because the manifest parser depends on literal preview metadata.

**Verify**:

```sh
bun run test -- src/openstory/shadcnTheme.story.test.ts
bunx playwright test tests/e2e/openstory-shadcn-theme.spec.ts tests/e2e/openstory-toolbar-indicators.spec.ts
```

Expected: tests pass. The e2e should click `page.getByLabel("Toggle theme")`
or the equivalent accessible button, observe dark wrapper attributes, click it
again, and observe light wrapper attributes.

### Step 5: Add a printed component worklist command

Create `scripts/print-origin-visual-parity-worklist.mjs`. It should read
`tests/e2e/origin-parity/fixtures.json`, use the same active-example predicate
as `scripts/check-origin-visual-parity-coverage.mjs`, and print:

```text
components_needing_visual_parity_work=<count>
<lane>\t<item>\tinventory_only=<examples>\tactive=<examples-or->
```

Add a package script:

```json
"origin:parity:worklist": "bun scripts/print-origin-visual-parity-worklist.mjs"
```

Keep the script read-only. It must not update fixtures, references, docs, or
generated artifacts.

**Verify**:

```sh
bun run origin:parity:worklist
bun run origin:parity:coverage
```

Expected: the worklist command exits 0 and prints the current count. At plan
time the count was 94. The coverage command exits 0.

### Step 6: Update evidence notes without overclaiming component completion

If package versions, active visual fixture counts, or the printed worklist count
changed, update:

- `docs/product/origin-content-parity-review.md` summary lines for the counts
  and first-batch queue only if the source facts changed.
- `docs/product/project-invariants-scorecard.md` evidence rows for
  `P2_FOLDKIT_ARCHITECTURE`, `P6_VISUAL_PARITY`, or `P11_PROGRESS_LEDGER` only
  if the verification evidence changed.
- `plans/README.md` status/dependency notes for plan 030.

Do not mark any component row complete just because it appears in the worklist.

**Verify**:

```sh
bun run check:registry
```

Expected: exits 0.

### Step 7: Run the final gates

Run:

```sh
bun run typecheck
bun run lint
bun run test -- src/openstory/shadcnTheme.story.test.ts
bunx playwright test tests/e2e/openstory-shadcn-theme.spec.ts tests/e2e/openstory-toolbar-indicators.spec.ts
bun run origin:parity:worklist
bun run origin:parity:coverage
bun run check:registry
bun run build
```

Expected: every command exits 0. Record the printed worklist count and the
latest Foldkit/tooling versions in the final notes.

## Test plan

- Update `src/openstory/shadcnTheme.story.test.ts` to cover the toggle metadata
  and the light/dark transition helper, if a helper is added.
- Update `tests/e2e/openstory-shadcn-theme.spec.ts` so it clicks the simple
  `Toggle theme` button instead of opening a mode dropdown.
- Keep `tests/e2e/openstory-toolbar-indicators.spec.ts` green by asserting the
  mode indicator remains visible on the button, if indicators still apply.
- Add a unit test for `scripts/print-origin-visual-parity-worklist.mjs` only if
  the repo has an established pattern for testing script output. Otherwise, the
  command itself is the verification gate.

## Done criteria

- [ ] `package.json` and `bun.lock` use current latest Foldkit tooling:
      `foldkit`, `@foldkit/vite-plugin`, `@foldkit/devtools-mcp`, and
      `@foldkit/oxlint-plugin`.
- [ ] `oxlint.config.ts` loads the Foldkit oxlint plugin and enables the
      documented Foldkit rules, or records a narrow deferral for any broad
      pre-existing violation.
- [ ] OpenStory shadcn mode uses a simple accessible `Toggle theme` button that
      toggles light and dark.
- [ ] The theme selector still works and remains separate from the mode toggle.
- [ ] `bun run origin:parity:worklist` prints the component list needing visual
      parity work.
- [ ] The patched signoff queue remains visible:
      `base-ui-dialog`, `base-ui-popover`, `button-group`, `card`, `carousel`,
      `chart`, `command`, `empty`, `shadcn-collapsible`.
- [ ] Final gates from Step 7 exit 0.
- [ ] No component rows are marked complete unless actual parity evidence was
      added in this plan.

## STOP conditions

Stop and report back if:

- `npm view` cannot resolve the latest Foldkit package versions.
- Updating Foldkit requires broad changes to installable registry component APIs.
- `@foldkit/oxlint-plugin` cannot be loaded by the current `oxlint.config.ts`
  format.
- OpenStory's toolbar/manifest model cannot express a simple toggle without
  changing the local OpenStory dependency.
- The local OpenStory dependency must change, but `../openstory/packages/openstory`
  is missing or dirty in a way that makes the required shell change ambiguous.
- The worklist count differs from both `bun run origin:parity:coverage` and the
  fixture data in a way you cannot explain.
- A verification command fails twice after a reasonable focused fix attempt.

## Maintenance notes

- Foldkit is pre-1.0, so future minor upgrades may require source compatibility
  checks. Keep dependency upgrades paired with `typecheck`, `test`, and focused
  OpenStory e2e.
- The Foldkit oxlint plugin should reduce review load around message and command
  conventions. Do not disable it globally after this plan lands; add focused
  suppressions or follow-up plans for real pre-existing debt.
- The mode toggle should stay a host/OpenStory control, not an installable
  registry component API. Registry examples should receive the selected tokens
  through the existing shadcn theme wrapper.
- The component worklist is a visibility tool. It does not replace the visual
  parity fixture workflow or the origin-content review agenda.
