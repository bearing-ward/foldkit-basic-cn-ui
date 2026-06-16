# Plan 007: Add the custom-clone spin-out workflow

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the next
> step. If anything in the "STOP conditions" section occurs, stop and report. Do
> not improvise.
>
> **Drift check (run first)**:
> `git diff --stat 795046f1..HEAD -- package.json scripts registry docs/product/base-ui-shadcn-expansion-plan.md plans/README.md`
> If any in-scope file changed since this plan was written, compare the "Current
> state" excerpts against the live files before proceeding; on a mismatch, treat
> it as a STOP condition.

## Status

- **Priority**: P3
- **Effort**: L
- **Risk**: HIGH
- **Depends on**: plans/002-add-new-component-interface.md, plans/004-generate-custom-registry-project.md
- **Category**: direction
- **Planned at**: commit `795046f1`, 2026-06-16

## Why this matters

The backlog asks for a workflow that imports a component or example from another
trusted registry, generates a local Foldkit CN candidate, and compares likeness
before review. This could accelerate parity work, but it is high risk because it
touches third-party source, trust boundaries, and subjective visual matching.
This plan should build a bounded, auditable workflow rather than an automatic
component converter.

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
- Plan 002 should provide local candidate scaffolding; plan 004 should provide
  reusable registry-project generation.

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Registry generation | `bun run build:registry` | exit 0 |
| Registry guardrails | `bun run check:registry` | exit 0 |
| Typecheck | `bun run typecheck` | exit 0 |
| Unit/scene tests | `bun run test` | exit 0 |
| E2E tests | `bun run test:e2e` | exit 0 if browser dependencies are installed |
| Docs build | `bun run build` | exit 0 |

## Scope

**In scope**:
- Trusted-registry import design and allowlist.
- CLI dry-run for fetching registry item metadata/source from approved sources.
- Candidate slice generation using the plan 002 scaffold path.
- Likeness comparison harness design and first automated checks.
- Documentation for review gates and trust boundaries.
- `plans/README.md`.

**Out of scope**:
- Importing from arbitrary URLs without trust policy.
- Auto-converting React/shadcn code into final Foldkit code.
- Using AI-generated likeness judgments as the only gate.
- Bypassing the normal slice contract.

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
must not write by default.

**Verify**: dry-run against a known safe local/public registry item exits 0 and
leaves `git status --short` unchanged except for files modified by this plan.

### Step 3: Generate candidate slice

Add an explicit write mode that creates a candidate slice using the new-component
scaffold from plan 002. Imported source should be stored as reference material or
annotated TODO input, not silently treated as idiomatic Foldkit output.

**Verify**: generated candidate paths match the slice contract and
`bun run check:registry` reports actionable failures or passes if the candidate
is intentionally complete.

### Step 4: Add likeness harness

Create a first-pass comparison harness that can compare origin reference output
and local candidate output. Start with deterministic checks: accessible text,
example names, role/state coverage, and screenshot hooks if the existing
Playwright setup supports them. Score output should be advisory and must not be
the only review gate.

**Verify**: `bun run test` passes; if screenshot/e2e hooks are used,
`bun run test:e2e` passes in a browser-ready environment.

## Test plan

- Unit tests for trust-policy validation and URL rejection.
- Dry-run test for a local registry item.
- Candidate generation test in a temp directory.
- Likeness scoring tests for deterministic text/role comparisons.

## Done criteria

- [ ] Trust policy is documented.
- [ ] Import dry-run is non-mutating.
- [ ] Write mode creates a candidate slice through the normal scaffold path.
- [ ] Likeness harness produces deterministic advisory output.
- [ ] Workflow cannot bypass the normal slice contract.
- [ ] `bun run build:registry` exits 0.
- [ ] `bun run check:registry` exits 0, or candidate fixtures are isolated so incomplete candidates do not fail normal checks.
- [ ] `bun run typecheck` exits 0.
- [ ] `bun run test` exits 0.
- [ ] `bun run build` exits 0.
- [ ] `plans/README.md` status row for plan 007 is updated.

## STOP conditions

Stop and report back if:

- The workflow needs to execute third-party code to inspect it.
- The trust policy cannot be enforced with local code.
- Likeness scoring becomes subjective or requires hidden external services.
- Generated candidates would be mistaken for reviewed Foldkit code.

## Maintenance notes

This workflow should remain conservative. The goal is to speed review and
scaffold candidate work, not to create a blind import path for third-party UI
code.

