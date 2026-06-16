# Plan 004: Generate custom registry projects

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the next
> step. If anything in the "STOP conditions" section occurs, stop and report. Do
> not improvise.
>
> **Drift check (run first)**:
> `git diff --stat 795046f1..HEAD -- package.json scripts registry src apps README.md docs/product/base-ui-shadcn-expansion-plan.md plans/README.md`
> If any in-scope file changed since this plan was written, compare the "Current
> state" excerpts against the live files before proceeding; on a mismatch, treat
> it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: MED
- **Depends on**: plans/002-add-new-component-interface.md
- **Category**: direction
- **Planned at**: commit `795046f1`, 2026-06-16

## Why this matters

The backlog calls for a generator that creates a custom registry project. That
turns Foldkit CN from a single hosted registry into a pattern other teams can
own. The generator should scaffold the minimum viable repo shape: registry
source, docs shell, generated public output, validation scripts, and one example
slice.

## Current state

- `registry/config.json` contains `name`, `homepage`, and `registryBaseUrl`.
- `registry/templates/components.json` feeds generated
  `apps/docs/public/components.json`.
- `scripts/build-registry.mjs` expects `registry/default/items.json` and writes
  public registry JSON under `apps/docs/public/r/`.
- `README.md` documents `bun install`, `bun run dev`, and `bun run
  build:registry` for local development.
- Plan 002 should create reusable slice scaffolding that this generator can use.

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Registry generation | `bun run build:registry` | exit 0 |
| Registry guardrails | `bun run check:registry` | exit 0 |
| Typecheck | `bun run typecheck` | exit 0 |
| Unit/scene tests | `bun run test` | exit 0 |
| Docs build | `bun run build` | exit 0 |

## Scope

**In scope**:
- Generator source under `scripts/` or the CLI package/tool directory from plan
  003 if it exists.
- Template files under a clearly named template directory.
- Tests for generator output in a temp directory.
- README docs for generating a custom registry project.
- `plans/README.md`.

**Out of scope**:
- Publishing generated projects.
- Supporting every package manager.
- Supporting non-Foldkit frameworks.
- Docker/self-hosted deployment; that is plan 005.

## Git workflow

- Branch: `codex/004-custom-registry-project-generator`
- Commit message: `add custom registry project generator`
- Do not push or open a PR unless the operator instructed it.

## Steps

### Step 1: Define the generated project contract

Document the generated project layout before implementing it. It must include:
`package.json`, `registry/config.json`, `registry/default/items.json`,
`registry/templates/components.json`, a docs app shell, `scripts/build-registry`
or equivalent, validation scripts, and one example component slice.

**Verify**: `rg -n "custom registry project|registry/config.json|registry/default/items.json|example component" README.md docs/product` -> the contract is documented.

### Step 2: Add template files

Create templates that are copied into the generated project. Reuse current repo
structure and scripts where practical, but parameterize name, homepage, and
registry base URL. Keep the template minimal; do not copy unrelated local docs
or all current components.

**Verify**: generator template directory contains only files required by the
documented contract.

### Step 3: Implement generator command

Add a command such as `generate-registry-project <path> --name <name>
--homepage <url> --registry-base-url <url>`. It must refuse to overwrite a
non-empty target directory unless an explicit force flag is passed.

**Verify**: generating into a temporary empty directory exits 0 and creates the
documented files.

### Step 4: Validate generated project

Add a test that generates a project into a temp directory and runs its local
registry generation/check command if feasible. If running nested package install
is too slow, validate file presence, JSON parseability, and script names, then
document the manual verification command.

**Verify**: `bun run test` -> generator tests pass.

## Test plan

- Unit test argument validation.
- Temp-directory generation test.
- JSON parse tests for generated config, components template, and items manifest.
- Manual nested validation command documented if not automated.

## Done criteria

- [ ] Generator refuses unsafe overwrites by default.
- [ ] Generated project contains the documented minimal registry layout.
- [ ] Generated JSON files parse.
- [ ] README documents command usage.
- [ ] `bun run build:registry` exits 0.
- [ ] `bun run check:registry` exits 0.
- [ ] `bun run typecheck` exits 0.
- [ ] `bun run test` exits 0.
- [ ] `bun run build` exits 0.
- [ ] `plans/README.md` status row for plan 004 is updated.

## STOP conditions

Stop and report back if:

- The generator requires copying secrets, local machine paths, or deployment
  credentials.
- The generated project cannot use the same registry JSON contract as this repo.
- Supporting multiple framework targets becomes necessary.

## Maintenance notes

Keep this generator boring and explicit. It should produce a maintainable
starting point, not a hidden framework with behavior that diverges from this
repo.

