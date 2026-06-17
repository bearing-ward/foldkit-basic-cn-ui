# Plan 009: Add every registry example to Openstory

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the next
> step. If anything in the "STOP conditions" section occurs, stop and report. Do
> not improvise. When done, update the status row for this plan in
> `plans/README.md` unless a reviewer dispatched you and told you they maintain
> the index.
>
> **Drift check (run first)**:
> `git diff --stat 354c1c73..HEAD -- package.json bun.lock vite.config.ts src/vite-env.d.ts src/preview.ts src/openstory.stories.ts src/openstory scripts plans/009-add-generated-openstory-registry-catalog.md`
>
> If any in-scope file changed since this plan was written, compare the "Current
> state" excerpts against the live code before proceeding. On a mismatch, treat
> it as a STOP condition unless the change is clearly this plan already being
> executed.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: MED
- **Depends on**: none
- **Category**: dx
- **Planned at**: commit `354c1c73`, 2026-06-17

## Why this matters

Openstory currently proves the Foldkit adapter on the shadcn calendar examples,
but it does not expose the rest of the registry. The repo has 398 runnable
example directories under `registry/default/examples`, and each one already has a
`main.ts` Foldkit program and a scene test. Adding all examples to Openstory
turns the local story browser into a full visual review surface for registry
parity work instead of a one-component smoke test.

This should be generated, not hand-maintained. A manual story catalog will drift
as registry examples are added, renamed, or removed. The generator and check
script in this plan make coverage machine-checkable.

## Current state

Relevant files and roles:

- `package.json` - Bun scripts and current local Openstory dependency.
- `vite.config.ts` - Vite plugins; currently includes Tailwind, Foldkit, and
  Openstory in the working tree.
- `src/preview.ts` - Openstory preview entry importing app Tailwind CSS.
- `src/openstory.stories.ts` - hand-authored Openstory file for only the shadcn
  calendar examples.
- `registry/default/examples/*/main.ts` - authoritative runnable example
  inventory for Openstory coverage.
- `registry/default/items.json` - useful metadata for titles, but not complete
  enough to be the sole inventory source.
- `scripts/check-example-tests.mjs` - good example of a small repository check
  script over registry metadata/files.

Important baseline note: this plan was written while the Openstory setup was
present as uncommitted working-tree changes. If you execute this from a clean
worktree at `354c1c73`, recreate or apply the baseline Openstory setup in Step 1
before proceeding.

Current Openstory setup excerpts:

```json
// package.json:5-25
"scripts": {
  "dev": "vite --host",
  "build": "vite build",
  "build:registry": "bun scripts/build-registry.mjs",
  "check:registry": "bun scripts/build-registry.mjs --check && bun scripts/check-registry-order.mjs && bun scripts/check-registry-metadata.mjs && bun scripts/check-example-tests.mjs && bun scripts/check-primitive-coverage.mjs && bun scripts/check-shadcn-doc-examples.mjs && bun scripts/check-origin-content-parity-agenda.mjs",
  "custom-clone": "bun scripts/custom-clone-spinout.ts",
  "generate-registry-project": "bun scripts/generate-registry-project.ts",
  "registry": "bun scripts/component-registry-cli.ts",
  "serve:registry": "bun scripts/serve-registry.ts",
  "smoke:install-all": "bun scripts/smoke-install-all.mjs",
  "smoke:public-install": "bun scripts/smoke-public-install.mjs",
  "smoke:public-site": "bun scripts/smoke-public-site.mjs",
  "preview": "vite preview",
  "test:e2e": "playwright test",
  "typecheck": "tsc --noEmit",
  "format": "ultracite fix",
  "test": "vitest run",
  "lint": "ultracite check",
  "check": "ultracite check",
  "fix": "ultracite fix",
  "openstory": "openstory dev --framework foldkit"
}
```

```ts
// vite.config.ts:1-3, 106-112
import { foldkit } from "@foldkit/vite-plugin"
import tailwindcss from "@tailwindcss/vite"
import { openstory } from "openstory/plugin"

export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/foldkit-basic-cn-ui/" : "/",
  resolve: {
    alias: optimizedSourceAliases,
  },
  plugins: [tailwindcss(), foldkit({ devToolsMcpPort: 9988 }), openstory({ framework: "foldkit" })],
```

```ts
// src/preview.ts:1-7
import type { Preview } from "openstory/foldkit"

import "./styles.css"

const preview = {} satisfies Preview

export default preview
```

```ts
// src/openstory.stories.ts:1-24
import type { Meta, StoryObj } from "openstory/foldkit"

import * as ShadcnCalendarBasicExample from "../registry/default/examples/shadcn-calendar-basic/main"
import * as ShadcnCalendarBookedExample from "../registry/default/examples/shadcn-calendar-booked/main"
import * as ShadcnCalendarCustomCellSizeExample from "../registry/default/examples/shadcn-calendar-custom-cell-size/main"
import * as ShadcnCalendarDateOfBirthExample from "../registry/default/examples/shadcn-calendar-date-of-birth/main"
import * as ShadcnCalendarDateTimePickerExample from "../registry/default/examples/shadcn-calendar-date-time-picker/main"
import * as ShadcnCalendarMonthYearSelectorExample from "../registry/default/examples/shadcn-calendar-month-year-selector/main"
import * as ShadcnCalendarPresetsExample from "../registry/default/examples/shadcn-calendar-presets/main"
import * as ShadcnCalendarRangeExample from "../registry/default/examples/shadcn-calendar-range/main"
import * as ShadcnCalendarRtlExample from "../registry/default/examples/shadcn-calendar-rtl/main"
import * as ShadcnCalendarWeekNumbersExample from "../registry/default/examples/shadcn-calendar-week-numbers/main"

const meta = {
  title: "shadcn/Calendar",
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => ShadcnCalendarBasicExample,
}
```

Inventory facts from recon:

- `find registry/default/examples -mindepth 2 -maxdepth 2 -name main.ts | wc -l`
  returns `398`.
- Every example directory currently has `main.ts`.
- Every example directory currently has a `.scene.test.ts`.
- `registry/default/items.json` currently has 395 `registry:example` items, not
  398. Directories missing from `items.json` are
  `base-ui-checkbox-form`, `base-ui-checkbox-labeling`,
  `base-ui-checkbox-native-button`, and `shadcn-button-group`; `items.json`
  includes `shadcn-button-button-group`, which is not a directory.
- Existing docs preview imports cover 396 unique examples, not 398. Missing from
  those imports are `input-group-basic` and `scroll-area-basic`.

Script style exemplar:

```js
// scripts/check-example-tests.mjs:1-6, 36-44, 76-84
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const registryItems = JSON.parse(
  readFileSync("registry/default/items.json", "utf-8")
);

const exampleItems = registryItems.filter(
  (item) => item.type === "registry:example"
);

for (const item of exampleItems) {
  const sceneFiles = item.files
    .map((file) => file.path)
    .filter((filePath) => filePath.endsWith(".scene.test.ts"));
}

if (failures.length > 0) {
  console.error("Example test guardrail failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Checked ${exampleItems.length} registry example scene tests`);
```

Openstory behavior to preserve:

- Openstory discovers CSF files named `*.stories.{ts,tsx,js,jsx}`.
- Openstory preview files (`preview.ts` or `src/preview.ts`) are the right place
  for app-wide CSS imports.
- The current calendar story id set should remain stable after generation:
  `shadcn-calendar--basic`,
  `shadcn-calendar--month-and-year-selector`,
  `shadcn-calendar--range`,
  `shadcn-calendar--date-of-birth`,
  `shadcn-calendar--date-and-time-picker`,
  `shadcn-calendar--presets`,
  `shadcn-calendar--booked-dates`,
  `shadcn-calendar--custom-cell-size`,
  `shadcn-calendar--week-numbers`, and
  `shadcn-calendar--rtl`.

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Typecheck | `bun run typecheck` | exit 0, no TypeScript errors |
| Generate Openstory catalog | `bun scripts/generate-openstory-stories.mjs` | exit 0; generated files are written/updated |
| Check Openstory catalog drift | `bun scripts/check-openstory-stories.mjs` | exit 0; reports exactly 398 covered examples unless the registry changed |
| Registry checks | `bun run check:registry` | exit 0 |
| Openstory dev server | `bun run openstory -- --host 127.0.0.1 --port 6006` | server starts and exposes manifest |
| Manifest count | `curl -fsS http://127.0.0.1:6006/__openstory/manifest.json` | JSON contains 398 story entries, adjusted only if example count changed |

Do not use `bun run check` as the primary gate for this plan until existing
repo-wide lint/format issues are resolved; it currently reports unrelated
failures outside this work.

## Scope

**In scope**:

- `package.json`
- `bun.lock`
- `vite.config.ts`
- `src/vite-env.d.ts`
- `src/preview.ts`
- `src/openstory.stories.ts`
- `src/openstory/generated/` (create; generated story files only)
- `scripts/generate-openstory-stories.mjs` (create)
- `scripts/check-openstory-stories.mjs` (create)
- `scripts/generate-openstory-stories.test.ts` or
  `scripts/generate-openstory-stories.test.mjs` (create if the repo's test
  runner accepts it cleanly)
- `plans/README.md` status row for this plan

**Out of scope**:

- Do not change the Foldkit Openstory adapter implementation in
  `../openstory` or `node_modules`.
- Do not rewrite registry examples.
- Do not repair `registry/default/items.json` mismatches except to read them for
  optional titles. This plan must cover the filesystem examples even while
  metadata has drift.
- Do not add raw stories for `registry/default/ui/*` component modules unless
  they are already represented by a runnable `registry/default/examples/*`
  program. The acceptance criterion is every runnable example, grouped by
  component.
- Do not run `bun run format` or `bun run fix` across the repo.

## Git workflow

- Branch: `codex/009-openstory-registry-catalog`.
- Commit message style: match recent imperative history, for example
  `add generated openstory registry catalog`.
- Keep commits scoped to this plan. Do not push or open a PR unless the
  operator explicitly asks.

## Steps

### Step 1: Preserve the Openstory baseline

Ensure the baseline Openstory setup exists:

- `package.json` has an `openstory` script equivalent to
  `openstory dev --framework foldkit`.
- `package.json` has `openstory` in `devDependencies`. During local upstream
  testing this may be `file:../openstory/packages/openstory`; do not replace it
  with a registry version unless the operator asks.
- `vite.config.ts` imports `openstory` from `openstory/plugin` and includes
  `openstory({ framework: "foldkit" })` after the Foldkit plugin.
- `src/preview.ts` imports `./styles.css` and exports an empty
  `Preview` object from `openstory/foldkit`.
- `src/vite-env.d.ts` includes `/// <reference types="vite/client" />` so the
  CSS side-effect import typechecks.

If these changes already exist, keep them and move on.

**Verify**: `bun run typecheck` -> exit 0.

### Step 2: Add a generated Openstory catalog

Create `scripts/generate-openstory-stories.mjs`.

Generator requirements:

- Discover examples from the filesystem, not only from `items.json`:
  `registry/default/examples/*/main.ts`.
- Sort examples deterministically by directory slug.
- Read `registry/default/items.json` only as optional metadata for title and
  component grouping.
- Cover every discovered `main.ts` exactly once.
- Write generated story files under `src/openstory/generated/`.
- Put a generated-file header at the top of every generated story file:
  `// Generated by scripts/generate-openstory-stories.mjs. Do not edit by hand.`
- Keep imports relative and static. Do not use runtime dynamic imports.
- Emit TypeScript using `import type { Meta, StoryObj } from "openstory/foldkit"`.
- Each story's `render` must return the imported Foldkit example module, matching
  the current calendar pattern:

```ts
export const Basic: Story = {
  render: () => ShadcnCalendarBasicExample,
}
```

Recommended grouping:

- If slug starts with `shadcn-`, use title `shadcn/<Component Name>`.
- If slug starts with `base-ui-`, use title `base-ui/<Component Name>`.
- Otherwise use title `registry/<Component Name>`.
- Prefer `item.meta.foldkit.component` from `items.json` for `<Component Name>`.
- If metadata is missing, derive a component name from the slug by removing the
  lane prefix (`shadcn-` or `base-ui-`) and the trailing example variant.
- Use human-readable story names derived from metadata title/example or slug.
- Export names must be stable PascalCase identifiers.

Handling the current metadata drift:

- `base-ui-checkbox-form`, `base-ui-checkbox-labeling`,
  `base-ui-checkbox-native-button`, and `shadcn-button-group` must still receive
  stories even though they are not registry items.
- `shadcn-button-button-group` from `items.json` must not produce a story unless
  the matching filesystem directory exists.

Delete or replace the current hand-authored `src/openstory.stories.ts` so it does
not duplicate the generated calendar story ids. The generated catalog must own
the calendar examples too.

**Verify**:

```sh
bun scripts/generate-openstory-stories.mjs
bun run typecheck
```

Expected result: both commands exit 0, and `src/openstory/generated/` contains
generated `*.stories.ts` files covering the registry examples.

### Step 3: Add a drift check for generated stories

Create `scripts/check-openstory-stories.mjs`.

The check should:

- Re-run the generator in memory or in `--check` mode without changing files.
- Fail if generated files are missing, stale, or contain imports for missing
  example modules.
- Fail if any `registry/default/examples/*/main.ts` is not imported exactly once
  by generated Openstory stories.
- Fail if duplicate story ids are detected for generated stories.
- Print a concise success line such as
  `Checked 398 generated Openstory registry stories`.

Add package scripts:

```json
"openstory:generate": "bun scripts/generate-openstory-stories.mjs",
"openstory:check": "bun scripts/check-openstory-stories.mjs"
```

Append `bun scripts/check-openstory-stories.mjs` to `check:registry` after the
existing registry metadata/test checks. Keep the existing checks in their current
relative order unless there is a clear reason to do otherwise.

**Verify**:

```sh
bun scripts/check-openstory-stories.mjs
bun run check:registry
```

Expected result: both commands exit 0. If `check:registry` fails on a pre-existing
unrelated check, stop and report the exact failing check instead of hiding it.

### Step 4: Add focused generator tests

Add focused tests for the generator logic. Use the repo's existing Vitest setup
under `scripts/**/*.{test,spec}.{ts,tsx,js,mjs}`.

Minimum cases:

- Slug grouping:
  - `shadcn-calendar-basic` -> title `shadcn/Calendar`, story label `Basic`.
  - `base-ui-menu-basic` -> title `base-ui/Menu`, story label `Basic`.
  - `alert-dialog-basic` -> title `registry/Alert Dialog`, story label `Basic`.
- Metadata drift:
  - missing `items.json` metadata still produces a story from the filesystem.
  - an `items.json` example without a matching directory does not produce a
    story.
- Duplicate protection:
  - two examples that would produce the same export name in one title group are
    disambiguated deterministically.
- Calendar compatibility:
  - generated calendar ids or title/name pairs preserve the current ten ids
    listed in "Current state".

If the generator is easier to test after extracting pure helper functions, put
those helpers in `scripts/generate-openstory-stories.mjs` and export them
carefully. Do not introduce a new build system or dependency for this.

**Verify**:

```sh
bun run test -- scripts/generate-openstory-stories.test.ts
bun run typecheck
```

Expected result: tests and typecheck pass. If the test file uses `.mjs`, adjust
the command accordingly.

### Step 5: Verify Openstory at runtime

Start Openstory locally:

```sh
bun run openstory -- --host 127.0.0.1 --port 6006
```

In another shell, verify the manifest:

```sh
curl -fsS http://127.0.0.1:6006/__openstory/manifest.json | node -e '
let s="";
process.stdin.on("data", d => s += d);
process.stdin.on("end", () => {
  const m = JSON.parse(s);
  const ids = m.stories.map((story) => story.id);
  console.log(JSON.stringify({
    framework: m.framework,
    count: ids.length,
    hasCalendarBasic: ids.includes("shadcn-calendar--basic"),
    hasCalendarPresets: ids.includes("shadcn-calendar--presets")
  }, null, 2));
});
'
```

Expected result:

```json
{
  "framework": "foldkit",
  "count": 398,
  "hasCalendarBasic": true,
  "hasCalendarPresets": true
}
```

If the registry example count changed after this plan was written, the expected
count must equal the current result of:

```sh
find registry/default/examples -mindepth 2 -maxdepth 2 -name main.ts | wc -l
```

Also verify Tailwind still applies inside a generated story iframe:

```sh
node --input-type=module - <<'EOF'
import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const errors = [];
page.on("console", (message) => {
  if (message.type() === "error") errors.push(message.text());
});
page.on("pageerror", (error) => errors.push(error.message));
await page.goto("http://127.0.0.1:6006/__story/shadcn-calendar--basic", {
  waitUntil: "domcontentloaded",
  timeout: 15_000,
});
await page.waitForSelector(".grid", { timeout: 10_000 });
const result = await page.evaluate(() => {
  const grid = document.querySelector(".grid");
  return {
    gridDisplay: grid ? getComputedStyle(grid).display : null,
    stylesheetCount: document.styleSheets.length,
  };
});
console.log(JSON.stringify({ errors, ...result }, null, 2));
await browser.close();
EOF
```

Expected result: `errors` is `[]`, `gridDisplay` is `"grid"`, and
`stylesheetCount` is greater than 0.

## Test plan

- Add generator unit tests as described in Step 4.
- Use the existing scene tests as the behavioral safety net for the examples;
  this plan does not need to add Openstory play functions for every example.
- Use `bun scripts/check-openstory-stories.mjs` as the coverage guardrail.
- Use the Openstory manifest check as the runtime integration smoke.

## Done criteria

All must hold:

- [ ] Openstory setup remains present: script, Vite plugin, preview CSS import,
      and Vite CSS type declarations.
- [ ] `src/openstory/generated/` contains generated stories for every
      `registry/default/examples/*/main.ts`.
- [ ] `src/openstory.stories.ts` no longer duplicates generated calendar story
      ids.
- [ ] `bun scripts/check-openstory-stories.mjs` exits 0 and reports the current
      example count.
- [ ] `bun run test -- scripts/generate-openstory-stories.test.ts` exits 0, or
      the equivalent `.mjs` test command exits 0.
- [ ] `bun run typecheck` exits 0.
- [ ] `bun run check:registry` exits 0, or any failure is confirmed unrelated and
      reported with the failing check name.
- [ ] Openstory manifest reports `framework: "foldkit"` and one story per
      filesystem example.
- [ ] The generated `shadcn-calendar--basic` story still has Tailwind applied in
      the iframe.
- [ ] `plans/README.md` status row for plan 009 is updated.

## STOP conditions

Stop and report back if:

- The Foldkit Openstory adapter package no longer exports `openstory/foldkit`.
- Openstory stops supporting static `*.stories.ts` discovery.
- The registry example modules no longer export the Foldkit program shape used
  by the current calendar stories (`init`, `update`, `view` module returned from
  `render`).
- Generating all stories creates duplicate ids that cannot be resolved without
  changing existing calendar ids.
- The implementation requires changing registry example behavior.
- `bun run typecheck` fails for reasons outside generated Openstory files.
- `bun run check:registry` fails on a pre-existing unrelated check; report the
  failing check instead of broadening this plan.

## Maintenance notes

- Future registry example additions should require only running
  `bun scripts/generate-openstory-stories.mjs`; `openstory:check` should catch
  stale generated files.
- Review generated title grouping carefully. The user-facing browser sidebar is
  the main DX value of this work, so unstable or surprising grouping will make
  the catalog hard to scan even if coverage is technically complete.
- Keep `src/preview.ts` as the single global styling hook. Do not import
  `src/styles.css` into every generated story file.
- If `registry/default/items.json` is later fixed to match the filesystem, the
  generator can lean more heavily on metadata, but filesystem `main.ts` coverage
  should remain the acceptance criterion.
