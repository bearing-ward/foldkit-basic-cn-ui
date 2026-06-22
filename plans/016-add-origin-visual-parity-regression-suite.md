# Plan 016: Add origin visual parity regression coverage for Base UI and shadcn components

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the next
> step. If anything in the "STOP conditions" section occurs, stop and report; do
> not improvise. When done, update the status row for this plan in
> `plans/README.md` unless a reviewer dispatched you and told you they maintain
> the index.
>
> **Drift check (run first)**:
> `git diff --stat 24a06119..HEAD -- package.json playwright.config.ts playwright.origin-parity.config.ts vite.aliases.ts .github/workflows/pages.yml tests/e2e docs/product/origin-content-parity-review.md scripts/check-origin-content-parity-agenda.mjs scripts/registry-manifest.mjs registry/base-ui/registry.json registry/shadcn/registry.json src/docsView.ts plans/016-add-origin-visual-parity-regression-suite.md plans/README.md`
>
> If any in-scope file changed since this plan was written, compare the "Current
> state" excerpts against the live code before proceeding. On a mismatch that
> changes registry origin metadata, docs preview test IDs, Playwright server
> behavior, or available package scripts, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: L
- **Risk**: MED
- **Depends on**: plans/009-add-generated-openstory-registry-catalog.md,
  plans/012-refactor-registry-lanes-openstory-site.md
- **Category**: tests
- **Planned at**: commit `24a06119`, 2026-06-21
- **Last execution review**: BLOCKED on 2026-06-21 in
  `/Volumes/Sync/Development/Bearing-Ward/foldkit-basic-cn-ui-016`. The focused
  `base-ui-button` parity test failed after the capture/check infrastructure was
  started because the first comparator required exact `fontFamily` and computed
  `width` equality. The captured origin button used `"die grotesk a", system-ui,
  sans-serif` and width `71.9688px`; the local docs render used
  `ui-sans-serif, system-ui, sans-serif, ...` and width `71.5156px`. Treat this
  as a comparator design issue unless a later source review proves the component
  itself owns those font metrics.
- **Second execution review**: revised on 2026-06-21 after retry worktrees proved
  the parity-specific gates can pass while the broad `bun run test:e2e` suite
  still fails on unrelated docs-shell, public-registry URL, and interactive
  primitive baseline issues. `bun run test:e2e` remains useful baseline signal,
  but this plan's done criteria are the deterministic origin-parity gates plus
  `check:registry` and `typecheck`.
- **Approval**: APPROVED on 2026-06-21 in
  `/Volumes/Sync/Development/Bearing-Ward/foldkit-basic-cn-ui-origin-parity-final`
  at commit `da3f474f` (`Add origin visual parity regression coverage`). Reviewer
  reran `origin:parity:coverage`, focused/all `origin:parity:test`,
  `check:registry`, and `typecheck`; all exited 0.

## Why this matters

The registry has a written origin parity agenda, but today's automated checks
mostly prove content, routes, and smoke-level behavior. They do not guard the
thing users most care about when choosing Base UI/shadcn-inspired components:
whether the local Foldkit version still matches the upstream component's CSS,
size, shape, structure, and visible rendering closely enough. This plan adds a
deterministic Playwright parity suite for every public origin-backed Base UI and
shadcn UI item, with an explicit capture workflow for refreshing origin
references when upstream changes.

## Current state

Relevant files and roles:

- `docs/product/origin-content-parity-review.md` - manual parity agenda for all
  Base UI and shadcn-backed registry UI entries.
- `registry/base-ui/registry.json` and `registry/shadcn/registry.json` - source
  manifests with `meta.foldkit.origin` URLs.
- `scripts/registry-manifest.mjs` - shared reader for root and included
  registry manifests.
- `scripts/check-origin-content-parity-agenda.mjs` - existing coverage guard for
  the manual parity agenda.
- `tests/e2e/docs-surface.spec.ts` - existing Playwright pattern for iterating
  docs components and using DOM metrics/computed style checks. It currently
  reads the stale path `registry/default/items.json`; if `bun run test:e2e`
  fails with that missing file, update this test to read the current public
  registry index at `apps/docs/public/registry.json` and use its `items` array.
- `playwright.config.ts` - Playwright server and base URL configuration.
- `package.json` - package scripts for e2e tests, registry checks, typecheck,
  and build.
- `src/docsView.ts` - docs pages already render stable
  `docs-example-block-*` test IDs around example previews.
- `src/entry.ts` imports `app-main`; if Vite dev fails to resolve that during
  this plan, prefer the smallest alias/config fix for the parity command. Do not
  replace the global Playwright web server for every e2e test just to make this
  one suite run against `vite preview`.

The origin parity agenda already says visual proportions are part of completion:

```md
// docs/product/origin-content-parity-review.md:5
This is the working checklist for applying origin-content parity across every Base UI and shadcn-backed registry UI entry. Registry coverage is not completion. A row is complete only after the current origin page/source has been checked against local implementation, examples, docs preview, generated registry JSON, and scene/browser evidence.

// docs/product/origin-content-parity-review.md:9
- Use the exact current `meta.foldkit.origin` URL as the canonical source.
- Match origin example names, visible copy, labels, placeholders, button text, links, media, and icon intent. Do not invent substitute demo content.
- Match origin structure: part nesting, markup shape, orientation, header/content/footer placement, grouped controls, separators, and media slots.
- Match origin behavior and accessibility: open/close state, disabled/inert behavior, keyboard behavior, ARIA, focus, and form semantics.
- Match origin visual proportions as closely as Foldkit allows. Any local constraint must be documented in the row before the row can be marked complete.
```

The same document currently records the scope:

```md
// docs/product/origin-content-parity-review.md:18
- Public Base UI origin-backed UI entries: 37
- shadcn origin-backed UI entries: 60
- Public rows to review: 97
```

Base UI registry items carry full origin URLs, and legacy aliases can be marked
non-public:

```json
// registry/base-ui/registry.json:34
"meta": {
  "foldkit": {
    "component": "Avatar",
    "origin": "https://base-ui.com/react/components/avatar",
    "artifact": "component",
    "stateful": true,
    "public": false,
    "publicAliasOf": "base-ui-avatar"
  }
}

// registry/base-ui/registry.json:75
"meta": {
  "foldkit": {
    "component": "Accordion",
    "origin": "https://base-ui.com/react/components/accordion",
    "artifact": "component",
    "stateful": true
  }
}
```

shadcn registry items also carry full origin URLs:

```json
// registry/shadcn/registry.json:34
"meta": {
  "foldkit": {
    "component": "Badge",
    "stateful": false,
    "origin": "https://ui.shadcn.com/docs/components/radix/badge",
    "artifact": "component"
  }
}
```

The existing e2e suite already iterates registry components and uses local docs
pages:

```ts
// tests/e2e/docs-surface.spec.ts:16
const componentNames = registryItems
  .filter((item) => item.type === "registry:ui")
  .map((item) => item.name);

// tests/e2e/docs-surface.spec.ts:61
for (const componentName of componentNames) {
  test(`${componentName} docs keep required layout contract`, async ({
    page,
  }) => {
    await page.goto(`/docs/components/${componentName}`);
```

That suite already uses geometry and computed style checks:

```ts
// tests/e2e/docs-surface.spec.ts:124
const sourceViewer = await sourceFrame.evaluate((iframe) => {
  const frame = iframe as HTMLIFrameElement;
  const frameStyles = getComputedStyle(frame);
  const body = frame.contentDocument?.body;
  const bodyStyles =
    body === undefined || body === null
      ? undefined
      : getComputedStyle(body);
```

Playwright is already configured to run against the local Vite app:

```ts
// playwright.config.ts:3
export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30_000,
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
  },
  webServer: {
    command: "bun run dev -- --host 127.0.0.1",
```

Package scripts already expose the gates this plan should extend:

```json
// package.json:19
"test:e2e": "playwright test",
"typecheck": "tsc --noEmit",
"test": "vitest run",
"lint": "ultracite check",
```

Current component scene tests prove behavior/contracts, not visual origin
matching. Example:

```ts
// registry/base-ui/ui/base-ui-button/base-ui-button.scene.test.ts:60
describe("Base UI Button registry view", () => {
  test("dispatches click messages through the Foldkit primitive", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.expect(Scene.role("button", { name: "Save changes" })).toExist(),
```

Button style exports show why comparing class tokens alone is insufficient but
still useful as one layer of the contract:

```ts
// registry/base-ui/ui/base-ui-button/view.ts:1
export const baseUiButtonClassName =
  "inline-flex h-8 cursor-pointer select-none items-center justify-center gap-2 whitespace-nowrap rounded-none border border-neutral-950 bg-white px-3 text-sm font-normal leading-none text-neutral-950 transition-colors hover:not-data-[disabled]:bg-neutral-100 active:not-data-[disabled]:bg-neutral-200 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-neutral-950 data-[disabled]:cursor-not-allowed data-[disabled]:border-neutral-500 data-[disabled]:text-neutral-500 disabled:cursor-not-allowed disabled:border-neutral-500 disabled:text-neutral-500";

// registry/shadcn/ui/shadcn-button/view.ts:1
export const shadcnButtonBaseClassName =
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4";
```

The first execution attempt proved that upstream docs typography can create
false positives even when component spacing and style tokens are close. The
stored Base UI Button reference captured:

```json
// tests/e2e/origin-parity/references/base-ui-button/base-ui-button-basic.json
"fontFamily": "\"die grotesk a\", system-ui, sans-serif",
"width": "71.9688px"
```

The local docs render produced:

```text
fontFamily: ui-sans-serif, system-ui, sans-serif, ...
width: 71.5156px
```

Do not respond by changing `registry/base-ui/ui/base-ui-button/view.ts` unless a
manual review shows Base UI Button itself owns the mismatch. The next executor
should make the comparator portable first: typography inherited from upstream
docs chrome is not automatically component drift.

Foldkit conventions to follow:

- Model fields must be Schema types.
- Messages are facts, verb-first and past-tense. Do not use `NoOp`.
- Use `evo()` for immutable updates when touching Foldkit app state.
- Bind `const h = html<Message>()` inside view functions.
- Use `empty` for conditional rendering.
- Do not import from `repos/foldkit/`; it is not present in this checkout.
- Use `foldkit/test` Scene tests for behavior and Playwright for browser-level
  visual/geometry parity.

## Commands you will need

Use Bun. If your shell cannot find `bun`, use:

`env PATH=/Users/richardmcandrews/.bun/bin:/Users/richardmcandrews/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/usr/bin:/bin:/usr/sbin:/sbin <command>`

| Purpose | Command | Expected on success |
| --- | --- | --- |
| Install | `bun install --frozen-lockfile` | exit 0; lockfile unchanged |
| Capture/update origin fixtures | `bun run origin:parity:capture -- --item base-ui-button` | exit 0; only `tests/e2e/origin-parity/**` reference files for `base-ui-button` change |
| Focused parity coverage check | `bun run origin:parity:coverage` | exit 0; reports all public Base UI/shadcn origin-backed UI items have parity fixture entries |
| Focused parity e2e | `bun run origin:parity:test -- --grep base-ui-button` | exit 0; base UI button local docs preview matches its stored origin fixture within thresholds |
| All parity e2e | `bun run origin:parity:test` | exit 0; all configured origin parity cases pass |
| Typecheck | `bun run typecheck` | exit 0, no TypeScript errors |
| Registry checks | `bun run check:registry` | exit 0; includes the new parity coverage check |
| Full e2e baseline | `bun run test:e2e` | Run after the stale docs-surface registry path is fixed. If it exits 0, record that. If it fails only in unrelated pre-existing docs-shell/public-registry/interactive-primitives assertions, record the failing specs and continue; do not block this plan on broad e2e debt outside the origin-parity slice. |

`bun run lint` may report broad pre-existing lint debt on this branch. Fix new
lint issues in files you touch, but do not mass-format unrelated files.

## Scope

**In scope**:

- `package.json` - add `origin:parity:capture`,
  `origin:parity:coverage`, and `origin:parity:test` scripts; wire the coverage
  check into `check:registry`.
- `scripts/check-origin-visual-parity-coverage.mjs` - create a read-only guard
  that compares public origin-backed Base UI/shadcn registry UI items against
  fixture metadata.
- `scripts/capture-origin-visual-parity-fixtures.mjs` - create a networked,
  explicit capture/update command for origin reference fixtures.
- `tests/e2e/origin-visual-parity.spec.ts` - create the deterministic local
  comparison suite.
- `tests/e2e/origin-parity/**` - create committed fixture metadata, DOM/style
  snapshots, and screenshot baselines. Keep these small enough to review.
- `tests/e2e/docs-surface.spec.ts` - reuse helper ideas only if needed; prefer
  extracting shared helpers to a new e2e helper file rather than coupling the
  two suites. Also update this file if needed so it reads the current public
  registry output (`apps/docs/public/registry.json`) instead of the removed
  legacy `registry/default/items.json`.
- `src/docsView.ts` - only add stable `data-testid` hooks if the existing
  `docs-example-block-*` preview/action IDs are insufficient.
- `vite.aliases.ts` - only add the missing `app-main` source alias if the
  existing Vite dev server cannot resolve `src/entry.ts`; this is preferable to
  changing all Playwright tests to run against a production preview build.
- `playwright.origin-parity.config.ts` - optional dedicated config for this
  parity suite if it needs build/preview behavior that should not affect the
  existing `bun run test:e2e` command.
- `.github/workflows/pages.yml` - add a non-deploy verification step only if the
  full parity test is reliable in CI. At minimum, CI must run the coverage
  checker through `bun run check:registry`.
- `docs/product/origin-content-parity-review.md` - add a short note that final
  signoff now requires passing the automated visual parity suite, without
  rewriting existing row history.

**Out of scope**:

- Reworking component implementations under `registry/**` to satisfy the new
  tests. This plan creates the guardrail; component drift discovered by it
  should become separate fix plans or tickets.
- Replacing existing Scene tests. They still cover Foldkit behavior and
  accessibility better than screenshots can.
- Running live Base UI or shadcn websites in CI. Live upstream pages are allowed
  only in the explicit capture command.
- Importing React, Base UI, shadcn, or upstream app code into this Foldkit app.
- Fetching arbitrary URLs. Only use `meta.foldkit.origin` from public registry
  UI items whose origin host is `base-ui.com` or `ui.shadcn.com`.
- Treating class-token equality as the only source of truth. Computed style,
  geometry, DOM/ARIA, and screenshots are the primary contracts.

## Git workflow

- Branch: use the current `codex/...` branch unless the operator tells you to
  create a new branch.
- Commit message style in this repo is short imperative prose, for example
  `Add Avatar API reference widget`.
- Do not push or open a PR unless the operator explicitly asks.

## Steps

### Step 1: Define the fixture format and coverage guard

Create `tests/e2e/origin-parity/fixtures.json` with one entry per public
origin-backed Base UI/shadcn UI item. The first committed pass may include
reference entries generated by the capture command in later steps, but the
schema must be clear from the start.

Use this shape, adjusting only if the codebase already has a stronger pattern:

```ts
type OriginParityFixture = Readonly<{
  itemName: string;
  lane: "base-ui" | "shadcn";
  originUrl: string;
  localPath: `/docs/components/${string}`;
  examples: readonly {
    exampleName: string;
    localTestId: `docs-example-block-${string}`;
    originSelector: string;
    localSelector?: string;
    compare: {
      dom: boolean;
      classTokens: boolean;
      computedStyle: readonly string[];
      strictFontFamily?: boolean;
      geometry: boolean;
      screenshot: boolean;
    };
    tolerances: {
      widthPx: number;
      heightPx: number;
      positionPx: number;
      maxDiffPixelRatio: number;
    };
    notes?: string;
  }[];
}>;
```

Create `scripts/check-origin-visual-parity-coverage.mjs`. It must:

- use `readSourceRegistryItems` from `scripts/registry-manifest.mjs`;
- include only `type === "registry:ui"`;
- exclude items with `item.meta?.foldkit?.public === false`;
- include only origins whose URL contains `base-ui.com` or `ui.shadcn.com`;
- fail if any included item is missing from `fixtures.json`;
- fail if a fixture points at an origin URL that differs from
  `meta.foldkit.origin`;
- fail if an entry has zero examples;
- fail if any example enables screenshot comparison but the matching
  `tests/e2e/origin-parity/references/<item-name>/<example-name>.png` file is
  missing;
- fail if any example has non-empty `computedStyle`, `dom`, or `geometry`
  comparison enabled but the matching
  `tests/e2e/origin-parity/references/<item-name>/<example-name>.json` file is
  missing;
- allow inventory-only examples where `dom`, `classTokens`, `geometry`, and
  `screenshot` are false and `computedStyle` is empty. These keep the 97-item
  origin backlog visible without pretending a parity assertion exists yet.
- print the count by lane and total on success.

Add `origin:parity:coverage` to `package.json` and append it to
`check:registry` after `check-origin-content-parity-agenda.mjs`.

**Verify**: `bun run origin:parity:coverage` -> exit 0 and a message like
`Checked origin visual parity fixtures for 97 registry UI items`.

**Verify**: `bun run check:registry` -> exit 0 and includes the new coverage
check.

### Step 2: Add a capture command for upstream references

Create `scripts/capture-origin-visual-parity-fixtures.mjs`. This command is
allowed to visit live upstream pages, but only when run explicitly by a human or
agent refreshing fixtures. It must not run as part of `check:registry`,
`typecheck`, `test`, or CI deployment by default.

Requirements:

- Accept `--item <name>` and `--all`. Require one of them.
- Read the same public origin-backed item inventory as the coverage checker.
- Refuse unknown item names.
- Refuse origins outside `https://base-ui.com/` and `https://ui.shadcn.com/`.
- Use Playwright Chromium with a fixed viewport, color scheme, locale, timezone,
  and reduced-motion setting.
- Visit the exact `meta.foldkit.origin` URL.
- Capture only the configured `originSelector` for each example, not the whole
  upstream page chrome.
- Write sanitized JSON snapshots under
  `tests/e2e/origin-parity/references/<item-name>/<example-name>.json`.
- Write screenshot baselines under
  `tests/e2e/origin-parity/references/<item-name>/<example-name>.png`.
- Redact volatile attributes such as generated IDs, framework hydration
  markers, analytics attributes, timestamps, and absolute image URLs if they
  cause nondeterministic diffs.

Each JSON snapshot should include at least:

- normalized DOM tree: tag names, roles/ARIA, `data-*`, form attributes,
  normalized text, and normalized class token sets;
- selected computed style properties from the fixture;
- bounding boxes for the root and first-level children;
- capture metadata: origin URL, viewport, user agent, timestamp, and the local
  git SHA. The timestamp is for human review only and must not be compared by
  tests.

Add `origin:parity:capture` to `package.json`.

**Verify**: `bun run origin:parity:capture -- --item base-ui-button` -> exit 0;
reference JSON and PNG files are written only under
`tests/e2e/origin-parity/references/base-ui-button/`.

### Step 3: Add the local comparison suite

Create `tests/e2e/origin-visual-parity.spec.ts`. This test must not access the
network except for the local dev server configured by `playwright.config.ts`.

For each fixture entry:

1. Filter to examples with at least one enabled comparison. If an example has no
   enabled comparison, treat it as inventory-only and skip it in this browser
   suite. The coverage checker already verifies that the item remains in the
   backlog.
2. `page.goto(fixture.localPath)`.
3. For each active example, locate the preview region by
   `[data-testid="${example.localTestId}-preview"]`.
4. If `localSelector` is present, scope comparison to that descendant;
   otherwise compare the preview region's first meaningful rendered child.
5. Normalize the local DOM tree using the same code as the capture command.
6. Compare DOM/ARIA/data attributes and class token sets according to each
   example's `compare` settings.
7. Compare the configured computed style properties with component-aware
   normalization:
   - Exact string equality is fine for non-font, non-pixel properties such as
     `display`, `position`, `boxSizing`, `borderTopColor`, and
     `backgroundColor`.
   - Pixel-valued properties that affect text metrics or geometry, including
     `width`, `height`, padding, margin, border widths, `fontSize`, and
     `lineHeight`, must compare numerically within the fixture tolerances before
     failing. This prevents sub-pixel text rendering differences from blocking
     the whole suite.
   - `fontFamily` must be normalized or skipped unless the fixture sets
     `strictFontFamily: true`. Base UI docs currently inherit a docs-site font
     (`"die grotesk a"`) that local Foldkit docs do not ship, so exact font
     stack equality is not a valid default component assertion.
   - Do not include `cursor` in the first Base UI Button pilot's computed-style
     comparison. Cursor is interaction affordance, not visible rendering, and
     Base UI's docs default can differ from the local Foldkit cursor utility
     without invalidating this visual baseline.
8. Compare bounding boxes within the configured pixel tolerances.
9. Compare screenshots with the configured pixel tolerances and
   `maxDiffPixelRatio`. If screenshot width/height differ by more than
   `widthPx`/`heightPx`, fail. If dimensions differ within tolerance, compare the
   overlapping rectangle, count the non-overlapping edge area as changed pixels,
   and divide by the larger screenshot area before checking
   `maxDiffPixelRatio`.

Start with a conservative computed-style property set that catches real drift
without forcing irrelevant browser internals:

```ts
[
  "display",
  "position",
  "boxSizing",
  "width",
  "height",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "gap",
  "borderTopWidth",
  "borderRightWidth",
  "borderBottomWidth",
  "borderLeftWidth",
  "borderTopColor",
  "borderRadius",
  "backgroundColor",
  "color",
  "fontFamily",
  "fontSize",
  "fontWeight",
  "lineHeight",
]
```

Do not assert exact global x/y coordinates against upstream docs pages; compare
local geometry against the captured root-relative boxes. For overlays/popovers,
fixtures should include a `setup` action name in a later extension only after
the static/basic examples pass. In this first plan, cover closed/default
rendered states for every public origin-backed UI item and one open-state
example only where the local docs page already exposes a deterministic control.

Add `origin:parity:test` to `package.json`, passing through extra Playwright
arguments. Name generated tests with the registry item name in the title so a
given component can be run with
`bun run origin:parity:test -- --grep base-ui-button`. Document that exact
focused command in `docs/product/origin-content-parity-review.md`.

If the default Playwright `webServer` fails because Vite dev cannot resolve
`app-main`, do one of these narrow fixes:

1. Preferred: add the missing `app-main` alias to `vite.aliases.ts` so the
   existing dev server works for all tests.
2. Acceptable fallback: create `playwright.origin-parity.config.ts` that uses
   `bun run build:legacy-docs && bunx vite preview --host 127.0.0.1 --port
   5173`, and make only `origin:parity:test` use that config.

Do not change `playwright.config.ts` globally unless the existing
`bun run test:e2e` suite still passes and the reason is documented in
`docs/product/origin-content-parity-review.md`.

**Verify**: `bun run origin:parity:test -- --grep base-ui-button` -> exit 0.

**Verify**: `bun run origin:parity:test` -> exit 0.

### Step 4: Add stable docs hooks only where the suite needs them

Use the existing `docs-example-block-*` IDs first. If the parity suite cannot
reliably select the component root inside a preview, add the smallest possible
`data-testid` hooks in `src/docsView.ts` or the relevant preview helper so the
test can compare the component instead of the surrounding docs card.

Rules:

- Do not add visible text just for tests.
- Do not change component markup or classes while adding hooks.
- Prefer names like `data-testid="origin-parity-root-base-ui-button-basic"`.
- Keep hooks stable across desktop and mobile.

**Verify**: `bun run origin:parity:test -- --grep base-ui-button` -> exit 0.

**Verify**: `bun run typecheck` -> exit 0.

### Step 5: Wire CI/checks without making live upstream a dependency

Ensure `bun run check:registry` runs `origin:parity:coverage`, because that is
cheap and deterministic. Decide whether the full visual suite belongs in CI now:

- If `bun run origin:parity:test` is stable and not too slow on a clean checkout,
  add a Playwright install step plus `bun run origin:parity:test` to
  `.github/workflows/pages.yml` before the build.
- If it is too slow for the deploy workflow, do not add it to deployment CI.
  Instead add a short note in `docs/product/origin-content-parity-review.md`
  naming the local command as the required pre-signoff gate.

Do not add any workflow step that visits live `base-ui.com` or `ui.shadcn.com`.

**Verify**: `bun run check:registry` -> exit 0.

**Verify**: if CI was changed, inspect `.github/workflows/pages.yml` and confirm
no step runs `origin:parity:capture`.

### Step 6: Keep docs-surface pointed at the current registry and record broad e2e signal

Run `bun run test:e2e`. If it fails before launching browser assertions because
`tests/e2e/docs-surface.spec.ts` cannot open `registry/default/items.json`, fix
that stale test setup in `tests/e2e/docs-surface.spec.ts`:

- read `apps/docs/public/registry.json`;
- parse its top-level `items` array;
- preserve the existing `registry/config.json` read for `registryBaseUrl`;
- do not add `bun run build:registry` as a hidden precondition to `test:e2e`;
- do not regenerate public registry artifacts just to satisfy this test.

This is not origin-parity behavior, but it prevents this plan from preserving a
stale file-path failure in the existing suite. Do not chase unrelated broad
e2e failures in this plan; `docs-shell`, `public-registry`, or interactive
primitive contract failures should become a separate baseline-restoration plan.

**Verify**: `bun run test:e2e` -> exit 0, or fails only on browser assertions
unrelated to `registry/default/items.json`. If it fails for unrelated reasons,
record the failing spec names in the executor report and continue with the
origin-parity done criteria.

### Step 7: Document the workflow and update the parity agenda

Add a concise section to `docs/product/origin-content-parity-review.md` after
the acceptance bar:

- `origin:parity:capture` refreshes stored references from the canonical origin
  URL and must be reviewed like source changes.
- `origin:parity:test` compares local docs examples against stored references
  by DOM/ARIA, class tokens where meaningful, computed CSS, geometry, and
  screenshots.
- Final signoff for Base UI/shadcn rows requires the relevant parity test to
  pass or a documented exception in the row.

Do not rewrite all 97 rows. Only add the workflow rule.

**Verify**: `bun run origin:parity:coverage` -> exit 0.

**Verify**: `bun run origin:parity:test -- --grep base-ui-button` -> exit 0.

## Test plan

- New Playwright tests in `tests/e2e/origin-visual-parity.spec.ts` covering:
  public Base UI origin-backed UI items, public shadcn origin-backed UI items,
  fixture-driven DOM comparison, class-token comparison where enabled, selected
  computed CSS comparison, root-relative geometry comparison, and screenshot
  comparison.
- New script-level coverage check in
  `scripts/check-origin-visual-parity-coverage.mjs`, modeled after
  `scripts/check-origin-content-parity-agenda.mjs`.
- Use `tests/e2e/docs-surface.spec.ts` as the local pattern for iterating docs
  routes, selecting `docs-example-block-*` regions, and evaluating computed
  styles in the browser.
- Do not replace existing `registry/**/**/*.scene.test.ts` tests. They remain
  the behavioral/accessibility layer.

## Done criteria

ALL must hold:

- [ ] `bun run origin:parity:coverage` exits 0 and reports every public
      origin-backed Base UI/shadcn UI item covered by fixtures.
- [ ] `bun run origin:parity:test -- --grep base-ui-button` exits 0.
- [ ] `bun run origin:parity:test` exits 0.
- [ ] `bun run check:registry` exits 0 and includes the new fixture coverage
      guard.
- [ ] `bun run typecheck` exits 0.
- [ ] If `bun run test:e2e` was run and failed, every failure is documented as
      unrelated to the new origin-parity suite and the stale
      `registry/default/items.json` error is gone.
- [ ] No live upstream URL is contacted by default test, build, registry, or CI
      commands.
- [ ] Any fixture update is reviewable: JSON snapshots are normalized, PNGs are
      scoped to component/example regions, and the capture metadata records the
      origin URL.
- [ ] `docs/product/origin-content-parity-review.md` documents the capture/test
      workflow without rewriting all existing rows.
- [ ] No component implementation files under `registry/**` are modified by
      this plan.
- [ ] `plans/README.md` status row updated.

## STOP conditions

Stop and report back if:

- The exact upstream pages cannot expose stable selectors for at least one
  representative Base UI item and one representative shadcn item. Do not build
  a brittle scraper around page chrome.
- The focused Base UI Button pilot still fails after implementing the portable
  computed-style comparison above. Report the remaining diff and do not relax
  assertions further without a new plan.
- Adding the suite requires importing React, Base UI, shadcn, or upstream source
  into the Foldkit app.
- The visual comparison requires changing component implementation files under
  `registry/**`; file drift fixes separately.
- More than 10 component rows need manual exceptions before the first suite can
  pass. That means the project needs a smaller pilot plan first.
- The full suite takes more than 10 minutes locally on a warm dev server.
  Report timing and propose a sharded or sampled CI strategy before wiring it
  into CI.
- A command fails twice after a reasonable fix attempt.

## Maintenance notes

- Upstream Base UI and shadcn docs can change at any time. Fixture updates must
  be intentional and reviewed separately from local implementation fixes when
  possible.
- Screenshot diffs should be scoped to component/example regions, not docs page
  chrome. Full-page screenshots will be noisy and expensive.
- Prefer exact computed-style and geometry comparison for stable primitives like
  buttons, badges, inputs, separators, and cards. Use documented tolerances for
  text rendering, canvas/SVG charts, carousels, and async overlays.
- When a future component is added with a Base UI or shadcn origin URL, the
  coverage checker should fail until its origin parity fixture is added.
