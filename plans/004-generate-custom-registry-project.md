# Plan 004: Generate custom registry projects

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the next
> step. If anything in the "STOP conditions" section occurs, stop and report. Do
> not improvise.
>
> **Drift check (run first)**:
> `git diff --stat 512a2e9f..HEAD -- package.json scripts registry src apps README.md docs/product/base-ui-shadcn-expansion-plan.md plans/README.md vitest.config.ts`
> If any in-scope file changed since this plan was written, compare the "Current
> state" excerpts against the live files before proceeding; on a mismatch, treat
> it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: MED
- **Depends on**: plans/002-add-new-component-interface.md, plans/003-add-component-registry-cli.md
- **Category**: direction
- **Planned at**: commit `512a2e9f`, 2026-06-16

## Why this matters

The backlog calls for a generator that creates a custom registry project. That
turns Foldkit CN from a single hosted registry into a pattern other teams can
own. The generator should scaffold the minimum viable repo shape: registry
source, docs shell, generated public output, validation scripts, and one example
slice.

The generator command must use the same Effect CLI surface as the existing
first-party CLI scripts: `Command`, `Argument`, and `Flag` from
`effect/unstable/cli`, plus `NodeServices` from `@effect/platform-node`.

## Current state

- `registry/config.json` contains `name`, `homepage`, and `registryBaseUrl`.
- `registry/templates/components.json` feeds generated
  `apps/docs/public/components.json`.
- `scripts/build-registry.mjs` expects `registry/default/items.json` and writes
  public registry JSON under `apps/docs/public/r/`.
- `README.md` documents `bun install`, `bun run dev`, `bun run
  build:registry`, `bun run registry list`, `bun run registry install`, and
  `bun run registry update`.
- `package.json` already depends on `@effect/platform-node@4.0.0-beta.66` and
  exposes `bun run registry` for `scripts/component-registry-cli.ts`.
- `scripts/scaffold-component-slice.ts` is the existing Effect CLI example for
  authoring a new component slice. It defines `scaffoldCommand` with
  `Command.make`, `Flag.*`, `Argument.*`, and `Command.run(...).pipe(Effect.provide(NodeServices.layer))`.
- `scripts/component-registry-cli.ts` is the existing Effect CLI example for
  list/install/update workflows. Match its safety posture: inspect/dry-run first,
  explicit write flag for mutations, path safety checks, and clear terminal
  output.
- `src/componentSliceManifest.ts` and `src/newComponentAuthoring.ts` define the
  reusable slice manifest/checklist model created for plan 002. Reuse that
  contract or keep the generator output compatible with it; do not invent a
  second slice shape.
- `vitest.config.ts` includes `scripts/**/*.{test,spec}.{ts,tsx,js,mjs}`, so
  CLI tests under `scripts/` are part of the normal Vitest project.
- Known baseline test residuals: a full `bun run test` can fail in unrelated
  pre-existing scene tests that cannot resolve docs-preview aliases from
  `src/main.scene.test.ts`, and in
  `registry/default/examples/shadcn-input-demo/shadcn-input-demo.scene.test.ts`
  where the expected API key is `sk_live_123456789x` but the rendered value is
  `x`. Do not fix those in this plan. New generator tests must pass when run
  directly.

## Commands you will need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Registry generation | `bun run build:registry` | exit 0 |
| Registry guardrails | `bun run check:registry` | exit 0 |
| Typecheck | `bun run typecheck` | exit 0 |
| Generator tests | `bun run test scripts/<new-generator-test-file>.test.ts` | exit 0 |
| Full tests | `bun run test` | exit 0, or fails only with the known unrelated baseline residuals listed above |
| Docs build | `bun run build` | exit 0 |
| Diff hygiene | `git diff --check` | exit 0 |

## Scope

**In scope**:
- Generator source under `scripts/`, preferably a focused script next to
  `scripts/component-registry-cli.ts` and `scripts/scaffold-component-slice.ts`.
- Template files under a clearly named template directory.
- Tests for generator output in a temp directory.
- README docs for generating a custom registry project.
- `package.json` script wiring if the generator needs a stable command name.

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
non-empty target directory unless an explicit force flag is passed. Define the
command with `effect/unstable/cli` rather than custom argument parsing.

**Verify**: generating into a temporary empty directory exits 0 and creates the
documented files; help output is produced by `effect/unstable/cli`; generating
into a non-empty directory without the explicit force flag exits non-zero.

### Step 4: Validate generated project

Add a test that generates a project into a temp directory and runs its local
registry generation/check command if feasible. If running nested package install
is too slow, validate file presence, JSON parseability, and script names, then
document the manual verification command.

**Verify**: direct generator tests pass, and the generated JSON files are parsed
by the tests.

### Step 5: Wire package script and docs

Expose the command from `package.json` with a stable script name such as
`bun run generate-registry-project`. Document the command in `README.md` with
one dry-run or temp-directory example and the manual nested validation commands
for generated projects.

**Verify**: `bun run generate-registry-project -- --help` prints Effect CLI help,
and README search finds the command name and validation commands.

## Test plan

- Unit test argument validation.
- Temp-directory generation test.
- JSON parse tests for generated config, components template, and items manifest.
- Unsafe overwrite test for a non-empty target directory.
- CLI help smoke test if this can be done without brittle exact help snapshots.
- Manual nested validation command documented if not automated.

## Done criteria

- [ ] Generator refuses unsafe overwrites by default.
- [ ] Generator command/options/help use the Effect CLI package.
- [ ] Generated project contains the documented minimal registry layout.
- [ ] Generated JSON files parse.
- [ ] README documents command usage.
- [ ] `bun run generate-registry-project -- --help` exits 0.
- [ ] `bun run test scripts/<new-generator-test-file>.test.ts` exits 0.
- [ ] `bun run build:registry` exits 0.
- [ ] `bun run check:registry` exits 0.
- [ ] `bun run typecheck` exits 0.
- [ ] `bun run test` exits 0, or fails only with the known unrelated baseline residuals listed above.
- [ ] `bun run build` exits 0.
- [ ] `git diff --check` exits 0.

## STOP conditions

Stop and report back if:

- The generator requires copying secrets, local machine paths, or deployment
  credentials.
- The generated project cannot use the same registry JSON contract as this repo.
- Supporting multiple framework targets becomes necessary.
- Implementing the generator with `effect/unstable/cli` requires an unplanned
  dependency/version decision.

## Maintenance notes

Keep this generator boring and explicit. It should produce a maintainable
starting point, not a hidden framework with behavior that diverges from this
repo.
