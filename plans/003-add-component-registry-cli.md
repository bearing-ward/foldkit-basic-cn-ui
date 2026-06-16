# Plan 003: Add the component registry CLI

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the next
> step. If anything in the "STOP conditions" section occurs, stop and report. Do
> not improvise.
>
> **Drift check (run first)**:
> `git diff --stat 795046f1..HEAD -- package.json scripts registry apps/docs/public README.md docs/product/component-entry-contract.md plans/README.md`
> If any in-scope file changed since this plan was written, compare the "Current
> state" excerpts against the live files before proceeding; on a mismatch, treat
> it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: L
- **Risk**: MED
- **Depends on**: plans/001-define-component-update-semantics.md, plans/002-add-new-component-interface.md
- **Category**: direction
- **Planned at**: commit `795046f1`, 2026-06-16

## Why this matters

The public registry is currently usable through `bunx shadcn@latest add`, but
the repo has no first-party CLI for discovery, install orchestration, or
controlled updates. A Foldkit CN CLI can expose project-specific semantics while
remaining compatible with generated shadcn registry JSON. It should start small:
read registry data, list items, install by delegating or copying safely, and
implement update behavior only according to plan 001.

All CLI entrypoints must use the Effect CLI package for command definitions,
options, help text, and argument parsing. Do not hand-roll flag parsing.

## Current state

- `package.json` uses Bun and has scripts for registry generation, registry
  checks, public install smoke tests, and docs build.
- `README.md` install examples use direct URLs such as:
  `bunx shadcn@latest add https://bearing-ward.github.io/foldkit-basic-cn-ui/r/dialog.json`
  and alias installs such as `bunx shadcn@latest add @foldkit-cn/dialog`.
- `apps/docs/public/components.json` maps `@foldkit-cn` to
  `https://bearing-ward.github.io/foldkit-basic-cn-ui/r/{name}.json`.
- `scripts/build-registry.mjs` expands `registry/default/items.json` into public
  registry JSON under `apps/docs/public/r/`.
- Update semantics must come from `docs/product/component-entry-contract.md`
  after plan 001 lands.
- CLI convention: command parsing and help text should be implemented with the
  Effect CLI package.

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Registry generation | `bun run build:registry` | exit 0 |
| Registry guardrails | `bun run check:registry` | exit 0 |
| Typecheck | `bun run typecheck` | exit 0 |
| Unit/scene tests | `bun run test` | exit 0 |
| Docs build | `bun run build` | exit 0 |
| Public install smoke | `bun run smoke:public-install` | exit 0 when network/public site is available |

## Scope

**In scope**:
- `package.json` script entries for the CLI.
- CLI source under `scripts/` or a clearly named package/tool directory if the
  repo already has one by execution time.
- Tests for registry parsing and CLI dry-run behavior.
- README usage examples.
- `plans/README.md`.

**Out of scope**:
- Replacing `scripts/build-registry.mjs`.
- Adding a long-running server; that is plan 005.
- Publishing a package to npm.
- Force-overwriting user files by default.

## Git workflow

- Branch: `codex/003-component-registry-cli`
- Commit message: `add component registry cli`
- Do not push or open a PR unless the operator instructed it.

## Steps

### Step 1: Add registry read/list primitives

Implement a CLI command that reads local generated registry data. It should list
component names, type, origin metadata, artifact type, primitive metadata when
present, and whether the item is public. Define the command with the Effect CLI
package. Prefer local files first:
`registry/default/items.json` for source truth and `apps/docs/public/r/*.json`
for generated install payload checks.

**Verify**: CLI `list` exits 0 and includes known items such as `button`,
`dialog`, and `tabs`; CLI help output is produced by the Effect CLI package.

### Step 2: Add install dry-run

Implement `install <name>` as dry-run first. It should resolve the item, show the
registry JSON URL or local JSON file, list files that would be written, and list
registry dependencies. If the implementation delegates to `shadcn`, print the
exact command before running it and require an explicit execution flag.

**Verify**: running install without the execution flag prints intended actions
and leaves `git status --short` unchanged except for files intentionally changed
by this plan.

### Step 3: Add safe install execution

Add explicit execution mode for install. It may delegate to `bunx shadcn@latest
add` or copy from local generated payloads, but it must respect app-owned source
semantics and avoid overwriting existing files without confirmation.

**Verify**: add a test fixture consuming app or temporary directory test that
installs one small item and asserts expected files are present.

### Step 4: Add update inspect mode

Implement only the non-destructive update inspection mode from plan 001. It
should report installed item metadata, upstream differences if metadata exists,
and required user action. Do not implement overwrite or merge-assisted writes in
this plan unless plan 001 explicitly allows it and tests cover it.

**Verify**: update inspect exits 0 for a fixture install and writes no files.

### Step 5: Document CLI usage

Update `README.md` with examples for `list`, `install --dry-run`, safe install
execution, and update inspection. Keep shadcn CLI examples because they remain a
supported path.

**Verify**: `rg -n "list|install --dry-run|update|shadcn" README.md` -> README
contains both first-party and shadcn-based install paths.

## Test plan

- Add CLI unit tests for list output, missing component errors, install dry-run,
  and update inspect.
- Add a fixture/temp-directory integration test for safe install if feasible.
- Keep network-dependent public install smoke as an additional/manual gate, not
  the only verification.

## Done criteria

- [ ] CLI can list registry components with metadata.
- [ ] CLI commands/options/help use the Effect CLI package.
- [ ] CLI install has non-mutating dry-run mode.
- [ ] CLI install execution is explicit and tested.
- [ ] CLI update is inspection-only or matches plan 001 exactly.
- [ ] `bun run build:registry` exits 0.
- [ ] `bun run check:registry` exits 0.
- [ ] `bun run typecheck` exits 0.
- [ ] `bun run test` exits 0.
- [ ] `bun run build` exits 0.
- [ ] `plans/README.md` status row for plan 003 is updated.

## STOP conditions

Stop and report back if:

- Implementing install requires changing generated registry JSON shape.
- Update behavior is ambiguous after reading plan 001.
- The CLI would overwrite existing app files by default.
- Implementing the CLI with the Effect CLI package requires an unplanned
  dependency/version decision.
- Public network smoke checks fail because the hosted registry is unavailable;
  report that separately from local test results.

## Maintenance notes

The CLI should stay a thin orchestration layer over existing registry artifacts.
If it starts duplicating `build-registry` expansion logic, extract shared helpers
or stop for a design review.
