# Plan 007: Add the custom-clone spin-out workflow

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the next
> step. If anything in the "STOP conditions" section occurs, stop and report. Do
> not improvise.
>
> **Drift check (run first)**:
> `git diff --stat 2cec885b..HEAD -- package.json scripts registry docs/product/base-ui-shadcn-expansion-plan.md plans/README.md README.md`
> If any in-scope file changed since this plan was written, compare the "Current
> state" excerpts against the live files before proceeding; on a mismatch, treat
> it as a STOP condition.

## Status

- **Priority**: P3
- **Effort**: L
- **Risk**: HIGH
- **Depends on**: plans/002-add-new-component-interface.md, plans/003-add-component-registry-cli.md, plans/004-generate-custom-registry-project.md
- **Category**: direction
- **Planned at**: commit `2cec885b`, 2026-06-16

## Why this matters

The backlog asks for a workflow that imports a component or example from another
trusted registry, generates a local Foldkit CN candidate, and compares likeness
before review. This could accelerate parity work, but it is high risk because it
touches third-party source, trust boundaries, and subjective visual matching.
This plan should build a bounded, auditable workflow rather than an automatic
component converter.

Any CLI command added for this workflow must use the same Effect CLI surface as
the existing first-party CLI scripts: `Command`, `Argument`, and `Flag` from
`effect/unstable/cli`, plus `NodeServices` from `@effect/platform-node`.

## Current state

- `docs/product/base-ui-shadcn-expansion-plan.md` backlog item:
  "Custom-clone spin-out workflow: support importing a component or example from
  another trusted registry, generating a local Foldkit CN candidate, then running
  a comparison harness with likeness scoring before the candidate can enter the
  normal registry slice contract."
- `README.md` describes Foldkit CN as source-owned registry items that teams
  copy into their own app.
- The normal slice contract requires registry item, example, docs page, source
  viewer, scene/e2e coverage, generated JSON, and public install smoke
  compatibility.
- `scripts/scaffold-component-slice.ts` is the current new-component scaffold
  CLI. It uses `src/componentSliceManifest.ts` to define file plans, checklist
  items, and validation commands for local candidate slices.
- `scripts/component-registry-cli.ts` is the current list/install/update CLI
  pattern. It already resolves registry items, handles dry-run/write posture,
  records metadata, and refuses unsafe target paths.
- `scripts/generate-registry-project.ts` creates custom registry projects and
  is the plan 004 generator baseline.
- `package.json` already depends on `@effect/platform-node@4.0.0-beta.66` and
  exposes `registry`, `generate-registry-project`, and `serve:registry`
  scripts.
- Known baseline test residuals: a full `bun run test` can fail in unrelated
  pre-existing scene tests that cannot resolve docs-preview aliases from
  `src/main.scene.test.ts`, and in
  `registry/default/examples/shadcn-input-demo/shadcn-input-demo.scene.test.ts`
  where the expected API key is `sk_live_123456789x` but the rendered value is
  `x`. Do not fix those in this plan. New spin-out workflow tests must pass
  when run directly.

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Registry generation | `bun run build:registry` | exit 0 |
| Registry guardrails | `bun run check:registry` | exit 0 |
| Typecheck | `bun run typecheck` | exit 0 |
| Workflow tests | `bun run test scripts/<new-workflow-test-file>.test.ts` | exit 0 |
| Full tests | `bun run test` | exit 0, or fails only with the known unrelated baseline residuals listed above |
| E2E tests | `bun run test:e2e` | exit 0 if browser dependencies are installed |
| Docs build | `bun run build` | exit 0 |
| Diff hygiene | `git diff --check` | exit 0 |

## Scope

**In scope**:
- Trusted-registry import design and allowlist.
- CLI dry-run for fetching registry item metadata/source from approved sources.
- Candidate slice generation using the plan 002 scaffold path.
- Likeness comparison harness design and first automated checks.
- Documentation for review gates and trust boundaries.
- Package script wiring if the workflow needs a stable command name.

**Out of scope**:
- Importing from arbitrary URLs without trust policy.
- Auto-converting React/shadcn code into final Foldkit code.
- Using AI-generated likeness judgments as the only gate.
- Bypassing the normal slice contract.
- Network access in tests; use local registry item fixtures or `file://` /
  local HTTP fixtures.
- Executing imported code.

## Git workflow

- Branch: `codex/007-custom-clone-spinout`
- Commit message: `add custom clone spinout workflow`
- Do not push or open a PR unless the operator instructed it.

## Steps

### Step 1: Define trust and import policy

Document what counts as a trusted registry, how URLs are validated, what files
may be fetched, and where imported source is stored. Require explicit operator
approval for new registries. Never execute imported code during import.

**Verify**: `rg -n "trusted registry|allowlist|Never execute imported code|operator approval" docs/product README.md` -> policy is documented.

### Step 2: Add import dry-run

Implement a dry-run command that reads a trusted registry item URL or alias,
prints item metadata, files, dependencies, and target local candidate paths. It
must not write by default. Define the command with the Effect CLI package rather
than custom argument parsing.

Use `effect/unstable/cli`; do not add another CLI parser. Reuse or adapt the
registry item types and path-safety helpers from `scripts/component-registry-cli.ts`.

**Verify**: dry-run against a known safe local registry item fixture exits 0 and
leaves `git status --short` unchanged except for files modified by this plan;
help output is produced by `effect/unstable/cli`; rejected URLs are covered by
tests.

### Step 3: Generate candidate slice

Add an explicit write mode that creates a candidate slice using the new-component
scaffold from plan 002. Imported source should be stored as reference material or
annotated TODO input, not silently treated as idiomatic Foldkit output.

Keep incomplete candidates isolated from normal registry checks unless they are
fully valid registry items. A safe target is a clearly named candidate/reference
directory plus scaffold files that are not automatically included in
`registry/default/items.json`.

**Verify**: generated candidate paths match the slice contract and either do not
affect `bun run check:registry`, or are intentionally complete and pass it.

### Step 4: Add likeness harness

Create a first-pass comparison harness that can compare origin reference output
and local candidate output. Start with deterministic checks: accessible text,
example names, role/state coverage, and screenshot hooks if the existing
Playwright setup supports them. Score output should be advisory and must not be
the only review gate.

**Verify**: direct workflow tests pass; if screenshot/e2e hooks are used,
`bun run test:e2e` passes in a browser-ready environment.

## Test plan

- Unit tests for trust-policy validation and URL rejection.
- Dry-run test for a local registry item.
- Candidate generation test in a temp directory.
- Likeness scoring tests for deterministic text/role comparisons.
- CLI help smoke for the workflow command.

## Done criteria

- [ ] Trust policy is documented.
- [ ] Workflow command/options/help use the Effect CLI package.
- [ ] Import dry-run is non-mutating.
- [ ] Write mode creates a candidate slice through the normal scaffold path.
- [ ] Likeness harness produces deterministic advisory output.
- [ ] Workflow cannot bypass the normal slice contract.
- [ ] `bun run build:registry` exits 0.
- [ ] `bun run check:registry` exits 0, or candidate fixtures are isolated so incomplete candidates do not fail normal checks.
- [ ] `bun run typecheck` exits 0.
- [ ] `bun run test scripts/<new-workflow-test-file>.test.ts` exits 0.
- [ ] `bun run test` exits 0, or fails only with the known unrelated baseline residuals listed above.
- [ ] `bun run build` exits 0.
- [ ] `git diff --check` exits 0.

## STOP conditions

Stop and report back if:

- The workflow needs to execute third-party code to inspect it.
- The trust policy cannot be enforced with local code.
- Likeness scoring becomes subjective or requires hidden external services.
- Generated candidates would be mistaken for reviewed Foldkit code.
- Implementing the workflow command with `effect/unstable/cli` requires an
  unplanned dependency/version decision.

## Maintenance notes

This workflow should remain conservative. The goal is to speed review and
scaffold candidate work, not to create a blind import path for third-party UI
code.
