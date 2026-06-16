# Plan 006: Add the theme playground

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the next
> step. If anything in the "STOP conditions" section occurs, stop and report. Do
> not improvise.
>
> **Drift check (run first)**:
> `git diff --stat 5be2aa1d..HEAD -- src registry docs/product/base-ui-shadcn-expansion-plan.md plans/README.md`
> If any in-scope file changed since this plan was written, compare the "Current
> state" excerpts against the live files before proceeding; on a mismatch, treat
> it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none
- **Category**: direction
- **Planned at**: commit `5be2aa1d`, 2026-06-16

## Why this matters

The backlog asks for an interactive surface to try registry components across
tokens, color modes, density, radius, and typography. This turns styling
decisions into a visible, repeatable workflow before users copy registry source
into an app. It is lower risk than CLI/server work because it can live inside
the existing docs app.

## Current state

- `docs/product/base-ui-shadcn-expansion-plan.md` backlog item:
  "Theme playground: add an interactive surface for trying registry components
  across tokens, color modes, density, radius, and typography settings before
  those theme decisions are copied into an app."
- The docs app lives under `src/`, with route/example preview code split across
  `src/main.ts`, `src/docsView.ts`, and generated preview alias imports such as
  `docs-example-previews-*`.
- Plan 002 added a current feature route pattern:
  `src/newComponentAuthoring.ts` owns a schema-backed submodel, messages,
  update, and view; `src/main.ts` imports it, defines
  `NewComponentAuthoringRoute`, `newComponentAuthoringRouter`, a model field,
  `GotNewComponentAuthoringMessage`, init wiring, and an update branch; and
  `src/docsView.ts` adds a `/docs/new-component` nav item plus a
  `contentView` branch that embeds the submodel through
  `Submodel.view(...)`.
- `src/newComponentAuthoring.scene.test.ts` is the closest focused scene-test
  pattern. `src/main.scene.test.ts` also covers the route-level heading for the
  new-component route.
- Foldkit view conventions require `html<Message>()` inside view functions,
  `empty` for conditional rendering, model-owned state, and messages as facts.
- Known baseline test residuals: a full `bun run test` can fail in unrelated
  pre-existing scene tests that cannot resolve docs-preview aliases from
  `src/main.scene.test.ts`, and in
  `registry/default/examples/shadcn-input-demo/shadcn-input-demo.scene.test.ts`
  where the expected API key is `sk_live_123456789x` but the rendered value is
  `x`. Do not fix those in this plan. New playground tests must pass when run
  directly.

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Typecheck | `bun run typecheck` | exit 0 |
| Playground tests | `bun run test src/<new-playground-test-file>.test.ts` | exit 0 |
| Route smoke test | `bun run test src/main.scene.test.ts --testNamePattern "theme playground"` | exit 0 if a route-level test is added |
| Full tests | `bun run test` | exit 0, or fails only with the known unrelated baseline residuals listed above |
| Docs build | `bun run build` | exit 0 |
| Registry guardrails | `bun run check:registry` | exit 0 |
| Diff hygiene | `git diff --check` | exit 0 |

## Scope

**In scope**:
- Docs app model/message/update/view additions for a theme playground route.
- A focused `src/themePlayground.ts` module, if it keeps `src/main.ts` and
  `src/docsView.ts` from growing more than necessary.
- Playground-specific styling in `src/styles.css` or existing style modules.
- Tests for mode changes and rendered controls.
- Documentation note under `docs/product/` if useful.

**Out of scope**:
- Persisting themes to a backend.
- Rewriting global design tokens.
- Generating production theme packages.
- Changing existing component source to support every token variation.
- Importing additional generated preview bundles unless a small static preview
  cannot satisfy the plan.

## Git workflow

- Branch: `codex/006-theme-playground`
- Commit message: `add theme playground`
- Do not push or open a PR unless the operator instructed it.

## Steps

### Step 1: Add the playground model

Represent playground configuration as schema-backed model state: color mode,
density, radius, typography preset, and selected component/example. Avoid
booleans for mutually exclusive states; use tagged unions or literal schemas.
Prefer a focused `src/themePlayground.ts` module mirroring
`src/newComponentAuthoring.ts` before wiring it into the app shell.

**Verify**: `bun run typecheck` -> exit 0.

### Step 2: Add controls and preview

Add route/view UI with segmented controls, toggles, selects, or range controls
as appropriate, and a preview area rendering a small set of existing component
surfaces. Keep the playground dense and utilitarian: controls, preview, and
output should fit as an actual tool, not a landing-page hero. Use accessible
labels and existing component/view patterns.

Wire the route following the current new-component route pattern:
`AppRoute` entry, route parser, `Model` field, init commands, `Got*Message`,
update branch with `Command.mapMessages`, docs nav item, and `contentView`
branch using `Submodel.view`.

**Verify**: add a focused scene test that changes at least two controls and
observes the preview state/class output. Add a route-level scene/story smoke if
the route wiring is not otherwise covered.

### Step 3: Add copyable theme output

Render the currently selected token choices as readable/copyable text or a code
block for users to transfer into an app. This can be CSS variables or a
documented configuration shape, but it must be read-only output derived from
model state.

**Verify**: direct playground tests pass; `bun run typecheck` exits 0.

## Test plan

- Add tests for initial state.
- Add interaction tests for color mode and density/radius changes.
- Add a test that the output snippet updates when controls change.
- Add a route smoke test if the new route is wired through `src/main.ts` and
  `src/docsView.ts`.

## Done criteria

- [ ] Playground route is reachable in the docs app.
- [ ] Controls cover color mode, density, radius, typography, and component/example selection.
- [ ] Preview updates from model state without imperative DOM mutation.
- [ ] Copyable/readable output reflects the selected settings.
- [ ] `bun run check:registry` exits 0.
- [ ] `bun run typecheck` exits 0.
- [ ] `bun run test src/<new-playground-test-file>.test.ts` exits 0.
- [ ] Any route-level focused test added for the playground exits 0.
- [ ] `bun run test` exits 0, or fails only with the known unrelated baseline residuals listed above.
- [ ] `bun run build` exits 0.
- [ ] `git diff --check` exits 0.

## STOP conditions

Stop and report back if:

- Existing docs routing cannot accept a new route without broad refactoring.
- Theme choices require global CSS rewrites outside this plan's scope.
- Component previews need source changes to render safely in the playground.

## Maintenance notes

Reviewers should check text overflow and responsive layout. The playground is a
workflow tool, so it should be dense and utilitarian rather than a marketing
page.
