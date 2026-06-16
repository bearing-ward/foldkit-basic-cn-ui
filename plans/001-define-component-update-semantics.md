# Plan 001: Define installed component update semantics

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the next
> step. If anything in the "STOP conditions" section occurs, stop and report. Do
> not improvise.
>
> **Drift check (run first)**:
> `git diff --stat 795046f1..HEAD -- docs/product/base-ui-shadcn-expansion-plan.md docs/product/component-entry-contract.md README.md plans/README.md`
> If any in-scope file changed since this plan was written, compare the "Current
> state" excerpts against the live files before proceeding; on a mismatch, treat
> it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: direction
- **Planned at**: commit `795046f1`, 2026-06-16

## Why this matters

The backlog now calls for a registry CLI that can list, install, and update
components. Listing and installing are straightforward registry reads/copies;
updating is dangerous because Foldkit CN installs source-owned files that app
teams are expected to edit. Before any executor implements `update`, the project
needs a written contract for local edits, generated artifacts, dependency drift,
and conflict handling.

## Current state

- `README.md` says installed files are app-owned: "The generated files are
  intended to be app-owned. After installation, inspect the source, wire the
  view into your Foldkit app, and keep or edit the scene tests that match your
  usage."
- `docs/product/base-ui-shadcn-expansion-plan.md` has this backlog item:
  "Component registry CLI: list available components, install selected component
  slices into a consuming app, and define an update workflow for installed
  components. Updating needs a separate contract discussion covering local edits,
  generated artifacts, dependency drift, and conflict handling."
- `docs/product/component-entry-contract.md` is the canonical component-entry
  contract referenced by the expansion plan.
- Package manager is Bun. Relevant verification commands from `package.json`:
  `bun run typecheck`, `bun run build:registry`, `bun run check:registry`,
  `bun run test`, `bun run build`, and `bun run lint`.

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Registry generation | `bun run build:registry` | exit 0; generated registry files are current |
| Registry guardrails | `bun run check:registry` | exit 0; registry/order/metadata/example checks pass |
| Typecheck | `bun run typecheck` | exit 0; no TypeScript errors |
| Unit/scene tests | `bun run test` | exit 0; all Vitest tests pass |
| Docs build | `bun run build` | exit 0; Vite build succeeds |

## Scope

**In scope**:
- `docs/product/component-entry-contract.md`
- `docs/product/base-ui-shadcn-expansion-plan.md`
- `README.md`
- `plans/README.md`

**Out of scope**:
- Any CLI implementation.
- Any script changes under `scripts/`.
- Generated files under `apps/docs/public/`.
- Registry source files under `registry/default/`.

## Git workflow

- Branch: `codex/001-component-update-semantics`
- Commit message style: recent history is short imperative/scope-free messages;
  use `define component update semantics`.
- Do not push or open a PR unless the operator instructed it.

## Steps

### Step 1: Add an update contract section

Add a section to `docs/product/component-entry-contract.md` named
`Installed component updates`. Define the supported update modes:

- `inspect`: show available upstream version/source differences without writing.
- `apply-clean`: write only when installed files match their recorded source
  snapshot.
- `merge-assisted`: produce a patch or conflict report when local files changed.
- `force`: explicitly overwrite app-owned files only behind a destructive flag.

The section must say that the default mode is non-destructive and must preserve
local edits unless the operator opts into overwrite behavior.

**Verify**: `rg -n "Installed component updates|inspect|apply-clean|merge-assisted|force" docs/product/component-entry-contract.md` -> all four modes appear.

### Step 2: Record metadata needed for future updates

In the same section, specify the minimum per-installed-component metadata a CLI
must record in a consuming app:

- registry URL or registry alias
- component name
- installed registry item version/hash or content digest
- file list and target paths
- dependency items installed with the component
- timestamp and CLI version when available

Do not choose an exact storage format yet unless the current repo already has
one. This plan defines the contract, not the implementation.

**Verify**: `rg -n "registry URL|content digest|file list|dependency items|CLI version" docs/product/component-entry-contract.md` -> all required metadata concepts appear.

### Step 3: Align the expansion plan and README language

Update `docs/product/base-ui-shadcn-expansion-plan.md` so the registry CLI
backlog item points at the new update contract. Add a short note to `README.md`
near the install section that future update tooling must account for
source-owned local edits.

**Verify**: `rg -n "update contract|source-owned local edits|Installed component updates" docs/product/base-ui-shadcn-expansion-plan.md README.md docs/product/component-entry-contract.md` -> the contract is linked or named from the planning/docs surfaces.

## Test plan

- This is a documentation and contract plan. No new automated tests are required.
- Run the project docs/registry commands to ensure docs edits did not break
  generated registry validation.

## Done criteria

- [ ] `docs/product/component-entry-contract.md` defines update modes and default non-destructive behavior.
- [ ] The expansion plan points future registry CLI work to that contract.
- [ ] README installation language remains consistent with source-owned installs.
- [ ] `bun run check:registry` exits 0.
- [ ] `bun run typecheck` exits 0.
- [ ] `plans/README.md` status row for plan 001 is updated.

## STOP conditions

Stop and report back if:

- `docs/product/component-entry-contract.md` has been removed or no longer owns
  component-entry expectations.
- The repo already has a different update contract; reconcile by asking for
  direction instead of replacing it.
- Defining update semantics appears to require implementing CLI behavior.

## Maintenance notes

Reviewers should scrutinize whether the default update path protects app-owned
source. Future CLI plans must implement this contract or explicitly update it
first.

