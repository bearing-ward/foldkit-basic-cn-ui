# Plan 020: Define project invariants and progress scorecard

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report - do not improvise. When done, update the status row for this plan in
> `plans/README.md` unless a reviewer dispatched you and told you they maintain
> the index.
>
> **Drift check (run first)**:
> `git diff --stat a5c30a51..HEAD -- README.md AGENTS.md package.json docs/product/component-entry-contract.md docs/product/base-ui-shadcn-expansion-plan.md docs/product/origin-content-parity-review.md docs/product/origin-parity-audit.md docs/product/workflow-feature-surfaces.md scripts/check-origin-content-parity-agenda.mjs scripts/check-origin-visual-parity-coverage.mjs plans/019-restore-upstream-classname-parity.md plans/020-define-project-invariants-scorecard.md plans/README.md`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: LOW
- **Depends on**: plans/019-restore-upstream-classname-parity.md
- **Category**: docs
- **Planned at**: commit `a5c30a51`, 2026-06-22

## Why this matters

Foldkit CN now has many good contracts, guard scripts, and parity ledgers, but
there is no single invariant scorecard that tells maintainers how to grade
current progress or decide whether future work has raised or lowered the bar.
That gap made the `className` cleanup swing too broad in plan 018 and then need
correction in plan 019. This plan should create a stable standards document that
turns the current project goals into named invariants, assigns a repeatable grade
to each invariant, points each grade at concrete evidence, and defines how future
plans must declare invariant impact.

## Current state

- `README.md` - product direction and contribution priorities. It says the
  registry is still being brought toward origin parity and identifies high-value
  contributions.
- `docs/product/component-entry-contract.md` - current canonical source of truth
  for component entries, but it is a contract document, not a progress scorecard.
- `plans/README.md` - execution-order ledger. Plans 001 through 018 are done,
  plan 019 is the current TODO, and plan 020 tracks this invariant scorecard
  work.
- `plans/019-restore-upstream-classname-parity.md` - current policy correction
  after the overbroad className removal in plan 018.
- `AGENTS.md` - agent operating instructions. It should point future agents to
  the scorecard once the scorecard exists.
- `package.json` - existing verification scripts, including `check:registry`,
  origin parity capture/coverage/test commands, typecheck, tests, lint, and
  OpenStory generation.
- `docs/product/workflow-feature-surfaces.md` - shipped workflow map with public
  surfaces and validation evidence.

Relevant excerpts at plan time:

```md
<!-- README.md:34-37 -->
This registry is actively being brought toward origin parity with shadcn and
Base UI examples. Some components are closer than others. Expect occasional
visual drift, missing edge-case behavior, and follow-up passes on icons,
mobile/overlay behavior, keyboard details, and example fidelity.
```

```md
<!-- README.md:381-384 -->
The near-term goal is better origin parity: examples should look and behave like
their shadcn/Base UI source material while staying idiomatic Foldkit. That means
parent-owned state, messages as facts, no hidden runtime side effects, and tests
that cover the visible behavior.
```

```md
<!-- docs/product/component-entry-contract.md:3-8 -->
This is the canonical source of truth for adding, changing, reviewing, and
auditing registry components in Foldkit CN.

When this document conflicts with older planning docs, this document wins. Older
coverage matrices and expansion plans may provide historical context, but new
component work must be evaluated against this contract first.
```

```md
<!-- docs/product/component-entry-contract.md:99-105 -->
Base UI and shadcn are open-source source references, not inspiration boards.
When implementing or reviewing a Base UI or shadcn-origin component, compare
against the upstream docs and source code. Local markup, part nesting,
attributes, interaction behavior, keyboard behavior, spacing, orientation, and
visual output should match the origin as closely as Foldkit allows. Any
unavoidable Foldkit-specific difference must be documented as a parity gap, not
silently shipped as an approximation.
```

```md
<!-- docs/product/component-entry-contract.md:175-183 -->
- Track the current reconciliation agenda in
  `docs/product/origin-parity-audit.md`. Do not treat a covered example as
  complete until it is marked verified/fixed there or in a newer audit artifact.
- Track the active row-by-row origin-content review in
  `docs/product/origin-content-parity-review.md`. That file is the checklist for
  current shadcn and Base UI rows that still need content, structure, behavior,
  and visual parity review. A row should stay unchecked until side-by-side origin
  comparison, local browser evidence, scene/browser tests, source snapshots, and
  generated registry JSON all agree.
```

```md
<!-- docs/product/component-entry-contract.md:259-267 -->
When adding or changing a `registry:ui` item:

- Add the item to the correct child lane registry.
- Keep the item name prefixed for non-Foldkit lanes so OpenStory search,
  install URLs, and registry aliases expose the library origin.
- Ensure `meta.foldkit.origin` is present for every `registry:ui` item.
- Run `bun run openstory:generate` and `bun run check:registry`; the metadata
  guardrail must fail if a Base UI, shadcn, or AI Elements item is missing or
  misclassified.
```

```md
<!-- docs/product/component-entry-contract.md:482-513 -->
Each component entry must be guarded at the source, example, docs, registry, and
browser surface levels.

Required tests/checks:

| Surface         | Requirement                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Component scene | Prove roles, names, ARIA, data attributes, disabled/read-only states, styling hooks, and key interactions where relevant. |
| Example scene   | Prove the installable example's behavior or inert/static state.                                                           |
| OpenStory check | Prove generated stories exist for component documentation and installable examples.                                      |
| Story tests     | Prove update/model/message behavior for stateful components.                                                              |
| Registry checks | Prove generated JSON, metadata, source snapshots, and example test coverage.                                              |
| Browser e2e     | Prove docs layout and source viewer across desktop and mobile.                                                            |
```

```md
<!-- plans/019-restore-upstream-classname-parity.md:27-34 -->
Plan 018 removed the old `className`/`*ClassName` styling API too broadly. The
correct product rule is narrower: remove Foldkit CN's invented style hooks that
do not exist upstream, but preserve `className` wherever the originating
library exposes it as part of its public interface.
```

Repo conventions to preserve:

- This is a Foldkit app. Preserve the Elm-style rules in `AGENTS.md`: model as
  single source of truth, messages as facts, and side effects confined to
  commands.
- Treat `docs/product/component-entry-contract.md` as the component-entry
  contract. Do not duplicate or weaken it. The new scorecard should point to it
  and grade progress against it.
- The scorecard must explicitly say it does not override
  `docs/product/component-entry-contract.md`. A `PARTIAL` progress grade is not
  permission to ship weaker component work.
- Treat Base UI and shadcn as origin references, not inspiration boards. Any
  local difference should be graded as a gap unless it is explicitly documented
  as a Foldkit-specific constraint.
- Grades measure evidence maturity only. Status and known gaps describe whether
  the current implementation satisfies the invariant.
- Keep this plan documentation-first. Do not change registry component source in
  this plan.

## Commands you will need

| Purpose | Command | Expected on success |
| --- | --- | --- |
| Typecheck | `bun run typecheck` | exit 0, no errors |
| Registry checks | `bun run check:registry` | exit 0 |
| Upstream refs | `bun run check:upstream-refs` | exit 0 |
| Origin coverage | `bun run origin:parity:coverage` | exit 0 |
| Unit/scene tests | `bun run test` | all tests pass |
| Build | `bun run build` | exit 0 |
| Invariants check | `bun run check:invariants` | exit 0 |
| Diff hygiene | `git diff --check` | no whitespace errors |

## Scope

**In scope**:

- Create `docs/product/project-invariants-scorecard.md`.
- Update `docs/product/component-entry-contract.md` only to link to the new
  scorecard and clarify that the contract defines component requirements while
  the scorecard grades current progress against those requirements.
- Update `docs/product/base-ui-shadcn-expansion-plan.md` only if needed to point
  its goal/backlog readers to the scorecard.
- Update `README.md` only if needed to point contributors to the scorecard from
  the Current Status or Contributing Direction sections.
- Update `AGENTS.md` near the project conventions so agents know to consult the
  scorecard before broad planning/review work and to declare touched invariants
  in future plans.
- Add a read-only structural check script:
  `scripts/check-project-invariants-scorecard.mjs`.
- Update `package.json` to expose `check:invariants` and include it in
  `check:registry`.
- Update `plans/README.md` status for this plan when done.

**Out of scope**:

- Do not modify registry component source under `registry/**`.
- Do not regenerate public registry JSON unless a link or generated source
  snapshot explicitly requires it.
- Do not change the public component API, styling API, examples, OpenStory
  generated stories, or origin parity fixtures.
- Do not resolve the plan 019 className policy in this plan. This plan depends
  on 019 because that policy should be settled before the scorecard grades
  `P10_ORIGIN_API_PARITY`.
- Do not make live upstream websites part of the scorecard check. The scorecard
  may reference upstream URLs, but automated checks must use checked-in registry
  metadata, snapshots, and local artifacts.

## Git workflow

- Branch: continue from the current branch or create
  `codex/020-define-project-invariants-scorecard`.
- Commit one logical unit: scorecard doc, small cross-links, required read-only
  scorecard check.
- Do not push or open a PR unless the operator explicitly asks.

## Steps

### Step 1: Add the invariant scorecard document

Create `docs/product/project-invariants-scorecard.md`. It must be a standards
and progress document, not a new component contract. Include these top-level
sections:

- `# Project Invariants And Progress Scorecard`
- `Purpose`
- `How To Grade Progress`
- `Requirements Language`
- `Invariant Catalog`
- `Current Progress Baseline`
- `Evidence Commands`
- `Invariant Impact For Future Plans`
- `How To Update This Scorecard`

The `Purpose` section must say that:

- `docs/product/component-entry-contract.md` remains the component-entry source
  of truth.
- The scorecard turns repo goals and contracts into named invariants.
- Maintainers use the scorecard to grade project-level progress and future work.
  Component-level details remain in the existing parity/review ledgers.
- A future component or plan should be judged against the scorecard only through
  evidence: docs, local tests, generated artifacts, or explicit documented gaps.
- The scorecard does not weaken, replace, or supersede
  `docs/product/component-entry-contract.md`.

**Verify**: `test -f docs/product/project-invariants-scorecard.md` exits 0.

### Step 2: Define a repeatable grading rubric

In `How To Grade Progress`, define lifecycle, numeric evidence maturity, status,
target grade, gap-to-target, and review anchoring. Use these exact concepts
unless a reviewer explicitly asks for different language.

Lifecycle values:

- `ACTIVE` - the invariant applies to current work.
- `DEPRECATED` - the invariant remains visible for historical reference; new
  work should use the replacement invariant named in the row.
- `RETIRED` - the invariant no longer applies; the ID must not be reused, and the
  row must explain why no replacement exists or name the replacement.

Numeric grades measure evidence maturity only:

| Grade | Meaning |
| --- | --- |
| 0 | Not defined: no invariant, owner, or evidence exists. |
| 1 | Documented intent: the goal is written down, but current coverage is not measured. |
| 2 | Manual checklist: maintainers can inspect progress, but there is no local guard. |
| 3 | Local guard: a script, test, or generated artifact checks a meaningful subset. |
| 4 | Registry gate: the invariant is part of the normal registry/build verification lane. |
| 5 | Verified current: the invariant is green across the intended public surface with current evidence. |

Status values describe current satisfaction of the invariant:

- `PASS` - current evidence satisfies the invariant across its declared scope,
  current grade is at or above target, and gap to target is `0 - at target`.
- `PARTIAL` - some evidence exists, but the intended public surface is not fully
  covered or has documented gaps.
- `PENDING` - the invariant is defined, but a planned change must land before it
  can be graded fairly.
- `BLOCKED` - progress is blocked by an external dependency, missing upstream
  source, or a failing baseline outside the invariant's scope.
- `UNKNOWN` - not enough evidence exists yet; this should trigger a follow-up
  investigation plan.

Add these semantic rules:

- `PASS` normally requires automated evidence verified in the current pass. If an
  invariant is manual-only or advisory and can pass without automated evidence,
  the catalog row must say that explicitly.
- `PASS` is invalid when current grade is below target.
- `UNKNOWN` is invalid with current grade 4 or 5.
- `PENDING` is invalid without a next action.
- `RETIRED` is invalid with `PASS`.
- `Gap to target` should combine a number and a short label, such as
  `0 - at target`, `1 - needs registry gate`, or
  `unknown - target cannot be compared yet`.
- `Last reviewed` should include date and commit SHA when practical, using a
  compact form such as `2026-06-22 @ a5c30a51`.

**Verify**: `rg -n "Lifecycle|ACTIVE|DEPRECATED|RETIRED|Grade \\| Meaning|PASS|PARTIAL|PENDING|BLOCKED|UNKNOWN|Gap to target|Last reviewed" docs/product/project-invariants-scorecard.md` shows the rubric, lifecycle values, statuses, and review anchoring.

### Step 3: Define requirements language

Add a `Requirements Language` section with short normative definitions for:

- `must`
- `should`
- `advisory`
- `gap`
- `documented deferral`
- `waiver`
- `regression`
- `declared scope`
- `local evidence`

Use `must` / `should` / `advisory` as priority language relative to each
invariant's declared scope. Example: a visual parity invariant can be `must` for
public origin-backed component visual/API changes while irrelevant to unrelated
workflow-doc changes.

Define a waiver trail for intentional regressions. If a plan lowers an
invariant's status or grade, the plan must record:

`Regressed invariant | Why regression is acceptable | Recovery plan | Owner plan | Expected restoration evidence`

Do not allow silent invariant downgrades.

**Verify**: `rg -n "Requirements Language|documented deferral|waiver|Regressed invariant|declared scope|local evidence" docs/product/project-invariants-scorecard.md` shows the glossary and regression waiver rule.

### Step 4: Define the invariant catalog

In `Invariant Catalog`, add one stable definition table. The table must use this
exact header:

`ID | Name | Lifecycle | Scope | Standard | Requirements for new work | Owner document | Priority | Target grade`

Keep IDs stable because future scripts and plans may reference them. After this
plan lands, do not renumber or reuse IDs. If an invariant becomes obsolete,
change its lifecycle to `DEPRECATED` or `RETIRED` and name the replacement ID or
explain why no replacement exists.

| ID | Invariant | Required evidence |
| --- | --- | --- |
| `P1_SOURCE_OWNERSHIP` | Installed registry items are source-owned by the consuming app and update tooling is non-destructive by default. | Component-entry update contract, registry CLI behavior, workflow-feature surface map. |
| `P2_FOLDKIT_ARCHITECTURE` | Registry examples and components stay Foldkit-native: schema-backed model/message state, parent-owned state, messages as facts, side effects in commands. | `AGENTS.md`, example source, story/scene tests, no React runtime imports in installable source. |
| `P3_ORIGIN_IDENTITY` | Every public `registry:ui` item declares an origin URL and appears in the correct lane/group/name family. | `meta.foldkit.origin`, lane registries, OpenStory generated stories, registry metadata checks. |
| `P4_SOURCE_PARITY` | Base UI and shadcn items derive API, vocabulary, examples, data attributes, class contracts, and theme tokens from checked-in upstream snapshots or reproducible commands. | `registry/upstream/source-manifest.json`, upstream snapshots/contracts, `check:upstream-refs`, `sync:upstream-contracts -- --check`. |
| `P5_EXAMPLE_PARITY` | Origin examples match upstream names, visible content, structure, interaction behavior, and documented deferrals. | `docs/product/origin-content-parity-review.md`, example source, scene tests, source snapshots. |
| `P6_VISUAL_PARITY` | Origin-backed items have browser-level visual evidence: DOM/ARIA, class tokens where meaningful, computed styles, geometry, and screenshot coverage. | Origin visual parity fixtures, `origin:parity:coverage`, `origin:parity:test`. |
| `P7_ACCESSIBILITY` | Components document and test roles, names, ARIA, keyboard behavior, focus behavior, and disabled/read-only/invalid/open/selected states where applicable. | Component scene tests, docs reference Accessibility section, browser e2e where applicable. |
| `P8_DOC_REFERENCE` | Every component has an OpenStory documentation reference entry before examples, with metadata, anatomy, usage, styling, API, accessibility, and coverage sections. | Generated OpenStory stories, reference data, `openstory:check`, docs smoke tests. |
| `P9_GENERATED_ARTIFACTS` | Source registry metadata, generated public JSON, source snapshots, OpenStory stories, and public install URLs stay in sync. | `build:registry`, `check:registry`, `smoke:public-install`, public registry e2e. |
| `P10_ORIGIN_API_PARITY` | Public APIs match the origin library's vocabulary and extension points when Foldkit can express them; intentional divergences are documented as Foldkit-specific gaps. | Plan 019 result, guard script, generated JSON, focused shadcn/Base UI tests, upstream snapshots/contracts. |
| `P11_PROGRESS_LEDGER` | Active work is tracked in a monotonic plan index; future plans declare invariant impact, expected evidence changes, non-goals, dependencies, statuses, and rejected findings. | `plans/README.md`, individual plans, current status row. |
| `P12_INVARIANT_GOVERNANCE` | Invariant IDs, lifecycle, status/grade semantics, waiver trails, update rules, and structural validation keep the scorecard stable. | `docs/product/project-invariants-scorecard.md`, `scripts/check-project-invariants-scorecard.mjs`, `check:invariants`. |

For each invariant, include:

- Declared scope.
- Standard.
- Requirements for new work.
- Owner document.
- Target grade.
- What counts as a gap.
- Whether the invariant is `must`, `should`, or `advisory`.

All initial invariant lifecycle values must be `ACTIVE`.

**Verify**: `rg -n "P1_SOURCE_OWNERSHIP|P10_ORIGIN_API_PARITY|P11_PROGRESS_LEDGER|P12_INVARIANT_GOVERNANCE|ACTIVE|Target grade|must|should|advisory" docs/product/project-invariants-scorecard.md` shows all required IDs, lifecycle values, target grade, and priority words.

### Step 5: Grade the current progress baseline

In `Current Progress Baseline`, add one volatile status table with one row per
invariant ID. The table must use this exact header:

`ID | Status | Current grade | Gap to target | Evidence available | Evidence verified this pass | Known gaps | Next action | Last reviewed`

Use the scorecard as a project-level dashboard. Do not make it a per-component
matrix; link component-level evidence to existing ledgers such as
`docs/product/origin-content-parity-review.md`.

Use the current repo state conservatively:

- Mark `P10_ORIGIN_API_PARITY` as `PENDING` if plan 019 is still TODO when this
  plan executes. If plan 019 is already DONE, grade it from the live guard script,
  focused tests, and generated registry JSON.
- Mark invariants with existing scripts in `package.json` as at least grade 3
  when the script checks a meaningful subset.
- Mark invariants wired into `bun run check:registry` as at least grade 4 only
  when the check truly covers the invariant, not merely because the script name
  sounds related.
- Use `PARTIAL`, not `PASS`, for origin parity categories if the README still
  says visual drift, missing edge-case behavior, or follow-up passes remain.
- Use `UNKNOWN` instead of guessing when the scorecard cannot prove a current
  claim from local files or commands.
- Distinguish `Evidence available` from `Evidence verified this pass`.
  `Evidence available` names scripts/docs/artifacts that exist. `Evidence
  verified this pass` names commands actually run during this plan, with date/SHA,
  or says `not run this pass`.

Do not overstate progress. The value of this scorecard is that it makes gaps
visible without shaming the codebase for being in-progress.

**Verify**: `rg -n "P10_ORIGIN_API_PARITY|P12_INVARIANT_GOVERNANCE|PARTIAL|PENDING|UNKNOWN|Evidence available|Evidence verified this pass|Last reviewed|Next action" docs/product/project-invariants-scorecard.md` shows the baseline table includes conservative statuses and evidence separation.

### Step 6: Add evidence commands and required read-only guard

In `Evidence Commands`, list the commands maintainers should use before updating
the scorecard:

```sh
bun run typecheck
bun run check:registry
bun run check:upstream-refs
bun run sync:upstream-contracts -- --check
bun run origin:parity:coverage
bun run origin:parity:test
bun run test
bun run build
bunx playwright test tests/e2e/docs-shell.spec.ts tests/e2e/docs-surface.spec.ts tests/e2e/public-registry.spec.ts
```

Add `scripts/check-project-invariants-scorecard.mjs` to verify scorecard
structure. The script must be read-only, deterministic, fast, and must not
require live network access or regenerated artifacts.

The script must verify:

- Every required invariant ID from `P1_SOURCE_OWNERSHIP` through
  `P12_INVARIANT_GOVERNANCE` appears exactly once in the invariant catalog.
- Every required invariant ID from `P1_SOURCE_OWNERSHIP` through
  `P12_INVARIANT_GOVERNANCE` appears exactly once in the current baseline.
- The invariant catalog table has exactly these required columns:
  `ID | Name | Lifecycle | Scope | Standard | Requirements for new work | Owner document | Priority | Target grade`.
- The current baseline table has exactly these required columns:
  `ID | Status | Current grade | Gap to target | Evidence available | Evidence verified this pass | Known gaps | Next action | Last reviewed`.
- Every catalog row has lifecycle `ACTIVE`, `DEPRECATED`, or `RETIRED`.
- Every baseline row has one of the allowed statuses.
- Every baseline row has a grade from 0 to 5.
- `PASS` fails when current grade is below target.
- `PASS` fails unless `Gap to target` starts with `0`.
- `RETIRED` fails when paired with `PASS`.
- `UNKNOWN` fails with current grade 4 or 5.
- `PENDING` fails when `Next action` is blank.
- `Gap to target` starting with `0` fails when current grade is below target.
- The document references `docs/product/component-entry-contract.md` and
  `plans/README.md`.

Expose the script as `check:invariants` in `package.json` and add it to
`check:registry`. The script should not judge whether the human grade is true; it
guards structure and semantic consistency only.

**Verify**: `bun run check:invariants` exits 0, and `rg -n "check:invariants|check-project-invariants-scorecard" package.json scripts docs/product/project-invariants-scorecard.md` shows the script, package command, and documentation.

### Step 7: Cross-link from existing docs

Add short links to `docs/product/project-invariants-scorecard.md` from:

- `docs/product/component-entry-contract.md` near the opening source-of-truth
  section.
- `README.md` near `Current Status` or `Contributing Direction`.
- `docs/product/base-ui-shadcn-expansion-plan.md` near its opening note that the
  component-entry contract is canonical.
- `AGENTS.md` near the project conventions.

The links should say that the scorecard grades progress against the contracts;
they should not make the scorecard override the component-entry contract.

The `AGENTS.md` note must tell future agents to:

- consult the scorecard before broad planning/review work;
- identify touched invariants in future plans;
- avoid treating a partial scorecard grade as permission to weaken the
  component-entry contract.

**Verify**: `rg -n "project-invariants-scorecard|Project Invariants|touched invariants" README.md AGENTS.md docs/product/component-entry-contract.md docs/product/base-ui-shadcn-expansion-plan.md` shows all four cross-links and the agent instruction.

### Step 8: Add future-plan invariant impact requirements

In `docs/product/project-invariants-scorecard.md`, add an
`Invariant Impact For Future Plans` section. It must require every future plan to
include this table:

`Invariant | Impact | Expected status/grade change | Evidence to update | Non-goal`

For tiny plans, one row is enough. If a future plan truly touches no invariants,
the table must say `None` with a one-sentence reason. This requirement belongs
under `P11_PROGRESS_LEDGER`, not a separate invariant.

Also document that PR descriptions should include an invariant impact note when
the PR changes an invariant's status, grade, scope, requirement, guard, or
evidence. Do not edit external `$improve` skill templates in this plan.

**Verify**: `rg -n "Invariant Impact For Future Plans|Expected status/grade change|Evidence to update|Non-goal|PR descriptions" docs/product/project-invariants-scorecard.md` shows the future-plan requirements.

### Step 9: Add scorecard update rules

In `How To Update This Scorecard`, require:

- same-plan updates whenever a change knowingly affects an invariant.
- Periodic review only as a drift backstop, not the primary update mechanism.
- No silent downgrades; use the waiver trail for intentional regressions.
- Stable IDs: do not renumber or reuse IDs.
- Deprecated or retired invariants must name a replacement ID or explain why no
  replacement exists.
- Update the baseline `Last reviewed` field with date and commit SHA when a row
  is inspected.

**Verify**: `rg -n "How To Update This Scorecard|same-plan|No silent downgrades|Stable IDs|Last reviewed" docs/product/project-invariants-scorecard.md` shows the update rules.

### Step 10: Run verification and update the plan index

Run the verification commands appropriate to the actual files changed:

```sh
git diff --check
bun run typecheck
bun run check:registry
bun run check:upstream-refs
bun run origin:parity:coverage
bun run check:invariants
bun run test
```

Then update the row for plan 020 in `plans/README.md` from `TODO` to `DONE`.

**Verify**: `rg -n "\\| 020 .* DONE" plans/README.md` finds the completed row,
and `git status --short` shows only intentional files from this plan.

## Test plan

- Add `scripts/check-project-invariants-scorecard.mjs` as a read-only structural
  check. Create a focused script test only if this repo has an existing
  script-test pattern that fits the new parser. Use
  `scripts/check-origin-visual-parity-coverage.mjs` and
  `scripts/check-origin-content-parity-agenda.mjs` as implementation references
  for read-only registry/doc checks.
- Run `git diff --check`, `bun run typecheck`, `bun run check:registry`,
  `bun run check:upstream-refs`, `bun run origin:parity:coverage`,
  `bun run check:invariants`, and `bun run test`.
- Do not add Playwright coverage for the scorecard unless the document becomes a
  rendered public docs route in the same plan.

## Done criteria

All must hold:

- [ ] `docs/product/project-invariants-scorecard.md` exists.
- [ ] The scorecard defines lifecycle, numeric 0-5 evidence maturity grades,
  allowed statuses, requirements language, invariant catalog, current progress
  baseline, evidence commands, invariant-impact requirements, and update rules.
- [ ] The invariant catalog includes all required IDs from `P1_SOURCE_OWNERSHIP`
  through `P12_INVARIANT_GOVERNANCE`.
- [ ] The catalog uses the required columns:
  `ID | Name | Lifecycle | Scope | Standard | Requirements for new work | Owner document | Priority | Target grade`.
- [ ] The baseline uses the required columns:
  `ID | Status | Current grade | Gap to target | Evidence available | Evidence verified this pass | Known gaps | Next action | Last reviewed`.
- [ ] The baseline grades current progress conservatively and references plan 019
  for `P10_ORIGIN_API_PARITY` when applicable.
- [ ] The scorecard states that grades measure evidence maturity only and that
  status/gaps describe current satisfaction.
- [ ] The scorecard defines stable ID/lifecycle rules, waiver trail rules, and
  same-plan update rules.
- [ ] Future-plan `Invariant impact` table requirements are documented.
- [ ] Existing docs link to the scorecard without making it override
  `docs/product/component-entry-contract.md`.
- [ ] `AGENTS.md` tells future agents to consult the scorecard and identify
  touched invariants.
- [ ] `scripts/check-project-invariants-scorecard.mjs` exists.
- [ ] `package.json` exposes `check:invariants` and includes it in
  `check:registry`.
- [ ] `git diff --check` exits 0.
- [ ] `bun run typecheck` exits 0.
- [ ] `bun run check:registry` exits 0.
- [ ] `bun run check:upstream-refs` exits 0.
- [ ] `bun run origin:parity:coverage` exits 0.
- [ ] `bun run test` exits 0.
- [ ] `bun run check:invariants` exits 0 and is documented in the scorecard.
- [ ] `plans/README.md` status row for plan 020 is updated.

## STOP conditions

Stop and report back instead of improvising if:

- The live current-state excerpts no longer match the files cited in this plan.
- Plan 019 is still TODO and you cannot decide whether `P10_ORIGIN_API_PARITY`
  should be `PENDING` without changing component source.
- A fair baseline grade would require live upstream network access rather than
  checked-in snapshots, generated artifacts, or local scripts.
- A verification command fails twice after a reasonable docs/script fix attempt.
- The work appears to require changing registry component source, generated
  OpenStory stories, public registry JSON, or origin visual parity fixtures.

## Maintenance notes

- Treat this scorecard as the top-level reviewer checklist for future plans, not
  a replacement for the component-entry contract.
- When a future plan changes an invariant, update both the owner document and the
  scorecard baseline in the same review.
- Keep grades conservative. A grade should move upward only when the evidence is
  repeatable from local files or commands.
- Reviewers should scrutinize any `PASS` or grade 5 claim especially hard:
  those claims say the invariant is verified across its declared public surface.
- `P12_INVARIANT_GOVERNANCE` may grade structural governance using
  `check:invariants`, but the scorecard must state the limit clearly: the script
  proves structure and semantic consistency, not that human grade judgments are
  correct.
