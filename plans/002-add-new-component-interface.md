# Plan 002: Add the new-component authoring interface

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the next
> step. If anything in the "STOP conditions" section occurs, stop and report. Do
> not improvise.
>
> **Drift check (run first)**:
> `git diff --stat 0ccff45b..HEAD -- registry/default/items.json registry/default/ui registry/default/examples src scripts docs/product/component-entry-contract.md docs/product/base-ui-shadcn-expansion-plan.md plans/README.md`
> If any in-scope file changed since this plan was written, compare the "Current
> state" excerpts against the live files before proceeding; on a mismatch, treat
> it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: MED
- **Depends on**: plans/001-define-component-update-semantics.md
- **Category**: direction
- **Planned at**: commit `0ccff45b`, 2026-06-16

## Why this matters

Adding a component slice currently requires knowing registry metadata, example
layout, docs routes, generated source snapshots, and validation scripts. A
CLI/web authoring interface can make that work repeatable and reduce broken
slice submissions. This plan should create the first guided path without
changing the underlying Foldkit component architecture.

## Current state

- `docs/product/base-ui-shadcn-expansion-plan.md` backlog item:
  "New-component interface: provide CLI and web flows for adding a component
  slice, including origin/name selection, contract checklist generation,
  registry/example/docs scaffolding, and the validation commands required before
  the slice enters review."
- `registry/default/items.json` is the source registry manifest consumed by
  `scripts/build-registry.mjs`.
- `scripts/build-registry.mjs` reads `registry/default/items.json`,
  `registry/config.json`, and `registry/templates/components.json`; it writes
  `apps/docs/public/components.json` and JSON item files under
  `apps/docs/public/r/`.
- Slice contract from the expansion plan requires:
  `registry/default/ui/{name}/index.ts`, `registry/default/ui/{name}/view.ts`,
  focused scene tests, at least one example under
  `registry/default/examples/{name}-basic`, generated registry JSON, docs
  metadata, docs page, and install smoke compatibility.
- Foldkit conventions from `AGENTS.md`: use `Message`, `withReturnType`, `m()`,
  `ts()`, `r()`, `evo()`, `html<Message>()` inside view functions, `empty` for
  conditional rendering, `Effect.Match` instead of `switch`, and no `NoOp`.

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Registry generation | `bun run build:registry` | exit 0; generated registry files are current |
| Registry guardrails | `bun run check:registry` | exit 0 |
| Typecheck | `bun run typecheck` | exit 0 |
| Unit/scene tests | `bun run test` | exit 0 |
| Docs build | `bun run build` | exit 0 |

## Scope

**In scope**:
- A new script or CLI entry under `scripts/` for component-slice scaffolding.
- Optional shared scaffolding helpers under `scripts/` only.
- Docs or plan updates under `docs/product/`.
- Minimal docs app route/surface under `src/` only if needed for the web flow.
- Tests for the scaffolding logic.
- `plans/README.md`.

**Out of scope**:
- Rewriting existing registry generation.
- Adding a real production database or server.
- Changing existing component APIs.
- Generating final polished components beyond a minimal placeholder slice.

## Git workflow

- Branch: `codex/002-new-component-interface`
- Commit message: `add new component authoring interface`
- Do not push or open a PR unless the operator instructed it.

## Steps

### Step 1: Extract a reusable slice manifest shape

Create a small typed manifest/helper under `scripts/` that describes a new slice:
origin (`foldkit`, `base-ui`, or `shadcn`), public name, artifact type, primitive
name when applicable, examples to create, and checklist items. Use plain JS if
matching the existing `.mjs` scripts; do not introduce a new build system.

**Verify**: `bun run typecheck` -> exit 0.

### Step 2: Add a CLI scaffold path

Add a Bun-compatible script command that accepts component origin/name arguments
and generates a dry-run checklist by default. It should support an explicit
write flag before creating files. On write, create only a minimal slice skeleton
that matches the expansion-plan contract and is clearly marked as TODO content.

**Verify**: running the script without a write flag prints the planned files and
does not change `git status --short`.

### Step 3: Add the web authoring surface

Add a docs app page that collects the same origin/name inputs and renders the
same checklist/scaffold plan. Keep the web flow model-owned and Foldkit-idiomatic:
messages describe facts, side effects are commands, and the view only renders
model state.

**Verify**: `bun run test` -> exit 0; add at least one scene/story test for the
new page showing the checklist updates when inputs change.

### Step 4: Wire verification hints

Make both CLI and web flows show the required validation commands:
`bun run build:registry`, `bun run check:registry`, `bun run typecheck`,
`bun run test`, and `bun run build`. If the generated slice has examples, include
scene-test guidance.

**Verify**: `rg -n "build:registry|check:registry|typecheck|bun run test|bun run build" scripts src` -> the new flow surfaces all commands.

## Test plan

- Add unit tests for manifest/checklist generation.
- Add a scene or story test for the docs authoring page.
- Use existing `src/main.scene.test.ts` and registry example scene tests as
  patterns for accessible locators.

## Done criteria

- [ ] CLI dry-run exists and does not write without an explicit write flag.
- [ ] Web page renders equivalent checklist output.
- [ ] Generated skeleton paths match the slice contract when write mode is used.
- [ ] `bun run build:registry` exits 0.
- [ ] `bun run check:registry` exits 0.
- [ ] `bun run typecheck` exits 0.
- [ ] `bun run test` exits 0.
- [ ] `bun run build` exits 0.
- [ ] `plans/README.md` status row for plan 002 is updated.

## STOP conditions

Stop and report back if:

- A scaffolded slice cannot pass `check:registry` without changing the registry
  contract.
- The web interface would require imperative DOM mutation or two-way bindings.
- The dry-run and web checklist logic starts diverging; extract shared logic
  instead of duplicating behavior.

## Maintenance notes

Keep generated content intentionally minimal. The value is repeatable structure,
not pretending to author high-quality component behavior automatically.
