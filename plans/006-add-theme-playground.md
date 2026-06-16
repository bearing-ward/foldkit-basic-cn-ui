# Plan 006: Add the theme playground

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the next
> step. If anything in the "STOP conditions" section occurs, stop and report. Do
> not improvise.
>
> **Drift check (run first)**:
> `git diff --stat 795046f1..HEAD -- src registry docs/product/base-ui-shadcn-expansion-plan.md plans/README.md`
> If any in-scope file changed since this plan was written, compare the "Current
> state" excerpts against the live files before proceeding; on a mismatch, treat
> it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none
- **Category**: direction
- **Planned at**: commit `795046f1`, 2026-06-16

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
  files such as `src/docsView.ts`, `src/docsExampleRoutes.ts`, and
  `src/docsExamplePreviews*.ts`.
- Foldkit view conventions require `html<Message>()` inside view functions,
  `empty` for conditional rendering, model-owned state, and messages as facts.

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Typecheck | `bun run typecheck` | exit 0 |
| Unit/scene tests | `bun run test` | exit 0 |
| Docs build | `bun run build` | exit 0 |
| Registry guardrails | `bun run check:registry` | exit 0 |

## Scope

**In scope**:
- Docs app model/message/update/view additions for a theme playground route.
- Playground-specific styling in `src/styles.css` or existing style modules.
- Tests for mode changes and rendered controls.
- Documentation note under `docs/product/` if useful.
- `plans/README.md`.

**Out of scope**:
- Persisting themes to a backend.
- Rewriting global design tokens.
- Generating production theme packages.
- Changing existing component source to support every token variation.

## Git workflow

- Branch: `codex/006-theme-playground`
- Commit message: `add theme playground`
- Do not push or open a PR unless the operator instructed it.

## Steps

### Step 1: Add the playground model

Represent playground configuration as schema-backed model state: color mode,
density, radius, typography preset, and selected component/example. Avoid
booleans for mutually exclusive states; use tagged unions or literal schemas.

**Verify**: `bun run typecheck` -> exit 0.

### Step 2: Add controls and preview

Add route/view UI with segmented controls, toggles, sliders/selects as
appropriate, and a preview area rendering a small set of existing registry
examples. Use accessible labels and existing component/view patterns.

**Verify**: add a scene test that changes at least two controls and observes the
preview state/class output.

### Step 3: Add copyable theme output

Render the currently selected token choices as copyable text or a code block for
users to transfer into an app. This can be CSS variables or a documented
configuration shape, but it must be read-only output from model state.

**Verify**: `bun run test` -> scene/story tests pass.

## Test plan

- Add tests for initial state.
- Add interaction tests for color mode and density/radius changes.
- Add a test that the output snippet updates when controls change.

## Done criteria

- [ ] Playground route is reachable in the docs app.
- [ ] Controls cover color mode, density, radius, typography, and component/example selection.
- [ ] Preview updates from model state without imperative DOM mutation.
- [ ] Copyable/readable output reflects the selected settings.
- [ ] `bun run check:registry` exits 0.
- [ ] `bun run typecheck` exits 0.
- [ ] `bun run test` exits 0.
- [ ] `bun run build` exits 0.
- [ ] `plans/README.md` status row for plan 006 is updated.

## STOP conditions

Stop and report back if:

- Existing docs routing cannot accept a new route without broad refactoring.
- Theme choices require global CSS rewrites outside this plan's scope.
- Component previews need source changes to render safely in the playground.

## Maintenance notes

Reviewers should check text overflow and responsive layout. The playground is a
workflow tool, so it should be dense and utilitarian rather than a marketing
page.

