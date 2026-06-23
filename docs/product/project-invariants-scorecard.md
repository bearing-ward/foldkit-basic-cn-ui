# Project Invariants And Progress Scorecard

## Purpose

`docs/product/component-entry-contract.md` remains the component-entry source of
truth for adding, changing, reviewing, and auditing registry components.

This scorecard turns repo goals and contracts into named project invariants.
Maintainers use it to grade project-level progress and to judge whether future
work raises, preserves, or lowers the bar. Component-level details remain in the
existing parity and review ledgers, including
`docs/product/origin-content-parity-review.md` and
`docs/product/origin-parity-audit.md`.

A future component or plan should be judged against this scorecard only through
local evidence: docs, tests, generated artifacts, checked-in snapshots, or
explicit documented gaps. The scorecard does not weaken, replace, or supersede
`docs/product/component-entry-contract.md`.

## How To Grade Progress

Lifecycle describes whether an invariant still applies:

| Lifecycle | Meaning |
| --- | --- |
| ACTIVE | The invariant applies to current work. |
| DEPRECATED | The invariant remains visible for historical reference; new work should use the replacement invariant named in the row. |
| RETIRED | The invariant no longer applies; the ID must not be reused, and the row must explain why no replacement exists or name the replacement. |

Numeric grades measure evidence maturity only. Status and known gaps describe
whether the current implementation satisfies the invariant.

| Grade | Meaning |
| --- | --- |
| 0 | Not defined: no invariant, owner, or evidence exists. |
| 1 | Documented intent: the goal is written down, but current coverage is not measured. |
| 2 | Manual checklist: maintainers can inspect progress, but there is no local guard. |
| 3 | Local guard: a script, test, or generated artifact checks a meaningful subset. |
| 4 | Registry gate: the invariant is part of the normal registry/build verification lane. |
| 5 | Verified current: the invariant is green across the intended public surface with current evidence. |

Status describes current satisfaction of the invariant:

| Status | Meaning |
| --- | --- |
| PASS | Current evidence satisfies the invariant across its declared scope, current grade is at or above target, and gap to target is `0 - at target`. |
| PARTIAL | Some evidence exists, but the intended public surface is not fully covered or has documented gaps. |
| PENDING | The invariant is defined, but a planned change must land before it can be graded fairly. |
| BLOCKED | Progress is blocked by an external dependency, missing upstream source, or a failing baseline outside the invariant's scope. |
| UNKNOWN | Not enough evidence exists yet; this should trigger a follow-up investigation plan. |

Semantic rules:

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

## Requirements Language

- `must` means the invariant is required for work inside its declared scope.
- `should` means the invariant is expected unless the plan records a documented
  deferral or a Foldkit-specific constraint.
- `advisory` means the invariant guides review, but it is not a release blocker
  unless a plan chooses to make it one for that scope.
- `gap` means current local evidence does not yet satisfy the invariant across
  the declared scope.
- `documented deferral` means a known gap is intentionally left for a named
  follow-up plan, with the reason and expected evidence recorded.
- `waiver` means a reviewer accepted an intentional regression using the waiver
  trail below.
- `regression` means a plan lowers an invariant's status, grade, scope,
  requirement, guard, or evidence.
- `declared scope` means the explicit work surface where an invariant applies.
  For example, visual parity can be `must` for public origin-backed component
  visual/API changes while irrelevant to unrelated workflow-doc changes.
- `local evidence` means checked-in docs, local scripts, generated artifacts,
  source snapshots, fixtures, or tests that can be verified without live network
  access.

Silent invariant downgrades are not allowed. If a plan lowers an invariant's
status or grade, the plan must record this waiver trail:

`Regressed invariant | Why regression is acceptable | Recovery plan | Owner plan | Expected restoration evidence`

## Invariant Catalog

Keep IDs stable. After this scorecard lands, do not renumber or reuse IDs. If an
invariant becomes obsolete, change its lifecycle to `DEPRECATED` or `RETIRED`
and name the replacement ID or explain why no replacement exists.

| ID | Name | Lifecycle | Scope | Standard | Requirements for new work | Owner document | Priority | Target grade |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `P1_SOURCE_OWNERSHIP` | Source-owned installs | ACTIVE | Registry install and update workflows | Installed registry items are source-owned by the consuming app and update tooling is non-destructive by default. A gap is destructive default behavior or unclear ownership. | New registry workflow work must preserve source ownership, document update behavior, and avoid hidden runtime dependencies. | `README.md`; `docs/product/workflow-feature-surfaces.md`; `docs/product/component-entry-contract.md` | must | 5 |
| `P2_FOLDKIT_ARCHITECTURE` | Foldkit-native architecture | ACTIVE | Registry examples, components, and generated source snapshots | Registry examples and components stay Foldkit-native: schema-backed model/message state, parent-owned state, messages as facts, side effects in commands. A gap is React runtime source, imperative state ownership, or untested behavior flow. | New component work must follow `AGENTS.md`, use Foldkit-native state/message patterns, and add story or scene evidence for behavior. | `AGENTS.md`; example source; story and scene tests | must | 5 |
| `P3_ORIGIN_IDENTITY` | Origin identity metadata | ACTIVE | Public `registry:ui` items | Every public `registry:ui` item declares an origin URL and appears in the correct lane/group/name family. A gap is missing or misclassified `meta.foldkit.origin`, lane, group, or generated story. | New public UI items must declare origin metadata, keep lane naming, and pass registry metadata and OpenStory checks. | `docs/product/component-entry-contract.md`; lane registries; generated OpenStory stories | must | 5 |
| `P4_SOURCE_PARITY` | Checked-in source parity | ACTIVE | Base UI and shadcn origin-backed items | Base UI and shadcn items derive API, vocabulary, examples, data attributes, class contracts, and theme tokens from checked-in upstream snapshots or reproducible commands. A gap is local invention without upstream evidence or documented Foldkit constraint. | Origin-backed work must update snapshots/contracts or document a deferral before changing source-derived API or vocabulary. | `registry/upstream/source-manifest.json`; upstream snapshots/contracts; `docs/product/component-entry-contract.md` | must | 5 |
| `P5_EXAMPLE_PARITY` | Origin example parity | ACTIVE | Origin-backed examples and example docs | Origin examples match upstream names, visible content, structure, interaction behavior, and documented deferrals. A gap is unchecked content, renamed examples without reason, or behavior that differs silently. | Example work must update the origin-content ledger, source snapshots, and scene/browser evidence when parity changes. | `docs/product/origin-content-parity-review.md`; example source; scene tests | must | 5 |
| `P6_VISUAL_PARITY` | Browser visual parity | ACTIVE | Public origin-backed component visual surfaces | Origin-backed items have browser-level visual evidence: DOM/ARIA, class tokens where meaningful, computed styles, geometry, and screenshot coverage. A gap is missing fixture coverage or unreviewed visual drift. | Visual/API changes for origin-backed items must update local visual parity fixtures or document a deferral. | origin visual parity fixtures; `docs/product/origin-parity-audit.md`; `docs/product/component-entry-contract.md` | should | 5 |
| `P7_ACCESSIBILITY` | Accessibility behavior | ACTIVE | Components and examples with interactive or semantic behavior | Components document and test roles, names, ARIA, keyboard behavior, focus behavior, and disabled/read-only/invalid/open/selected states where applicable. A gap is missing role/name/state or keyboard evidence. | New interactive work must add scene, story, or browser evidence for applicable accessibility states. | component scene tests; docs reference Accessibility sections; browser e2e where applicable | must | 5 |
| `P8_DOC_REFERENCE` | Documentation reference coverage | ACTIVE | OpenStory component documentation references | Every component has an OpenStory documentation reference entry before examples, with metadata, anatomy, usage, styling, API, accessibility, and coverage sections. A gap is missing reference material or examples appearing without the reference context. | New docs work must keep reference entries ahead of examples and pass OpenStory checks. | generated OpenStory stories; reference data; docs smoke tests | should | 5 |
| `P9_GENERATED_ARTIFACTS` | Generated artifact sync | ACTIVE | Source registry metadata, public JSON, source snapshots, OpenStory stories, and install URLs | Source registry metadata, generated public JSON, source snapshots, OpenStory stories, and public install URLs stay in sync. A gap is stale generated output, missing snapshot, or broken install URL evidence. | Work that changes registry source, docs output, or metadata must update generated artifacts and run the registry gate. | `scripts/build-registry.mjs`; `apps/docs/public`; `docs/product/component-entry-contract.md` | must | 5 |
| `P10_ORIGIN_API_PARITY` | Origin API parity | ACTIVE | Public APIs and extension points for origin-backed Base UI and shadcn items | Public APIs match the origin library's vocabulary and extension points when Foldkit can express them; intentional divergences are documented as Foldkit-specific gaps. A gap is removed or invented API surface without upstream basis. | Public API changes must follow plan 019 policy, preserve origin `className` where exposed upstream, and document unavoidable Foldkit-specific gaps. | `plans/019-restore-upstream-classname-parity.md`; guard scripts; upstream snapshots/contracts | must | 5 |
| `P11_PROGRESS_LEDGER` | Progress ledger discipline | ACTIVE | Improve plans, plan index, PR descriptions, and review handoffs | Active work is tracked in a monotonic plan index; future plans declare invariant impact, expected evidence changes, non-goals, dependencies, statuses, and rejected findings. A gap is work that changes project standards without declaring invariant impact. | Future plans must include the invariant impact table below or explicitly say `None` with a reason. | `plans/README.md`; individual plans; current status rows | should | 4 |
| `P12_INVARIANT_GOVERNANCE` | Invariant governance | ACTIVE | This scorecard, lifecycle rules, waiver rules, and structural validation | Invariant IDs, lifecycle, status/grade semantics, waiver trails, update rules, and structural validation keep the scorecard stable. A gap is a malformed table, invalid status/grade combination, or silent downgrade. | Changes to this scorecard must run `bun run check:invariants` and update baseline rows in the same plan when an invariant is knowingly affected. | `docs/product/project-invariants-scorecard.md`; `scripts/check-project-invariants-scorecard.mjs`; `check:invariants` | must | 5 |
| `P13_COMPONENT_LOCAL_CONFIG` | Component-local configuration | ACTIVE | Registry component slices and their projected docs/OpenStory/public artifacts | A component's local configuration, including style recipes, variant/size maps, component metadata, tests, examples, audits, and upstream notes, is owned from the component folder. Generated docs, OpenStory stories, public JSON, and source snapshots may project that configuration elsewhere, but must not become the source of truth. A gap is component-specific config scattered across lane/global folders without a projection boundary. | New component or hierarchy work must keep component-specific configuration inside the component slice, declare any generated projections, and avoid public APIs that force examples to assemble component internals by hand. | `plans/022-codify-component-local-configuration-poc.md`; `docs/product/component-entry-contract.md`; component source folders | must | 4 |
| `P14_DYNAMIC_OPTION_DISTRIBUTION` | Dynamic option distribution | ACTIVE | Style/theme selection, preview block browsing, and downloadable registry payloads | User-facing style, theme, mode, and preview-block choices are derived from checked-in source catalogs and exposed both as rendered OpenStory previews and downloadable shadcn-compatible registry JSON. A gap is a hard-coded option list, a preview block that cannot be downloaded, a page-offered option not represented in the catalog, or a downloadable payload not represented in the preview catalog. | New theme/style/preview work must update the source catalog, generated public artifacts, preview-02 coverage ledger, OpenStory Theme Studio, and registry/download checks together. | `registry/upstream/derived/shadcn-theme.json`; Theme Studio catalog; preview-02 coverage inventory; generated registry artifacts | must | 5 |

## Current Progress Baseline

This baseline is a project-level dashboard, not a per-component matrix. For
component-level evidence, use the owner documents and parity ledgers linked from
the catalog.

| ID | Status | Current grade | Gap to target | Evidence available | Evidence verified this pass | Known gaps | Next action | Last reviewed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `P1_SOURCE_OWNERSHIP` | PARTIAL | 4 | 1 - needs current install smoke evidence | README source-owned guidance; workflow-feature surface map; registry CLI and public install smoke scripts | `bun run check:registry` and `bun run test` passed on 2026-06-22 @ 81de3575 | Public install smoke is available but not part of this plan's verification gate. | Run public install smoke when install workflow behavior changes. | 2026-06-22 @ 81de3575 |
| `P2_FOLDKIT_ARCHITECTURE` | PARTIAL | 3 | 2 - needs broader architecture gate | AGENTS.md; story and scene tests; no React-runtime policy in contract | `bun run typecheck` and `bun run test` passed on 2026-06-22 @ 81de3575 | Tests cover meaningful subsets, but this scorecard does not prove every installable source path. | Add focused guards when architecture drift appears in registry source. | 2026-06-22 @ 81de3575 |
| `P3_ORIGIN_IDENTITY` | PARTIAL | 4 | 1 - needs verified current surface | registry metadata checks; OpenStory story check; origin content agenda | `bun run check:registry` passed on 2026-06-22 @ 81de3575 | Metadata is gated, but current status remains partial while origin parity work is active. | Keep metadata checks in the registry lane for each new public UI item. | 2026-06-22 @ 81de3575 |
| `P4_SOURCE_PARITY` | PARTIAL | 4 | 1 - needs complete snapshot reconciliation | upstream source manifest; upstream reference contract check; sync command | `bun run check:upstream-refs` and `bun run check:registry` passed on 2026-06-22 @ 81de3575 | Source parity is locally checkable, but complete origin reconciliation remains in progress. | Run `bun run sync:upstream-contracts -- --check` on source-parity plans. | 2026-06-22 @ 81de3575 |
| `P5_EXAMPLE_PARITY` | PARTIAL | 4 | 1 - needs complete row verification | origin-content parity review; example source; example tests check; exact visual fixture notes for `shadcn-button--rounded` and `shadcn-separator--basic` | `bun run check:registry` passed for plan 026 on 2026-06-23 @ b74ccd45; focused Button and Separator origin visual parity tests passed | README still records broader visual drift and missing edge-case behavior outside the active exact fixtures. | Keep unchecked rows in `docs/product/origin-content-parity-review.md` until side-by-side evidence agrees. | 2026-06-23 @ b74ccd45 |
| `P6_VISUAL_PARITY` | PARTIAL | 4 | 1 - needs full public-surface visual evidence | origin visual parity coverage script; fixtures and references; origin visual parity test command; active exact references for Base UI Button Basic, shadcn Button Rounded, and shadcn Separator Basic | `bun run origin:parity:coverage`, focused Button/Separator parity tests, and `bun run check:registry` passed for plan 026 on 2026-06-23 @ b74ccd45 | Coverage now has 3 active examples and 94 inventory-only examples, so exact visual coverage is still a ratchet in progress rather than full public-surface proof. | Expand and refresh fixtures when origin-backed visual/API surfaces change. | 2026-06-23 @ b74ccd45 |
| `P7_ACCESSIBILITY` | PARTIAL | 3 | 2 - needs broader accessibility gate | component scene tests; docs Accessibility sections; browser e2e command | `bun run test` passed on 2026-06-22 @ 81de3575 | No single local guard proves all roles, names, keyboard, focus, and state requirements across the public surface. | Add targeted scene or browser evidence with each accessibility-sensitive component change. | 2026-06-22 @ 81de3575 |
| `P8_DOC_REFERENCE` | PARTIAL | 4 | 1 - needs verified current docs completeness | OpenStory story generation and check; component-entry contract; docs smoke tests; shared documentation display template tests | `bun run test -- src/openstory/documentation/referenceProgram.scene.test.ts src/openstory/documentation/apiReference.scene.test.ts src/openstory/documentation/anatomyXray.scene.test.ts`, `bun run openstory:check`, and focused OpenStory documentation template e2e passed on 2026-06-23 @ plan 031 | Avatar and Alert Dialog prove the shared template path, but this row does not prove every component has complete reference data. | Add component references through the manifest and run OpenStory docs checks when docs surfaces change. | 2026-06-23 @ plan 031 |
| `P9_GENERATED_ARTIFACTS` | PARTIAL | 4 | 1 - needs install-url smoke in normal evidence | build registry check; source snapshots; generated public JSON; OpenStory story check | `bun run check:registry` and `bun run build` passed on 2026-06-22 @ 81de3575 | Registry sync is gated, but public install smoke is not run in this plan. | Run public install smoke for registry URL or generated-artifact behavior changes. | 2026-06-22 @ 81de3575 |
| `P10_ORIGIN_API_PARITY` | PARTIAL | 4 | 1 - needs full public API parity evidence | plan 019 policy/result; `check:no-component-classname-api`; upstream snapshots/contracts; generated registry JSON; focused and full test commands; Button and Separator fixture notes tying local API/class vocabulary to origin sources | `bun run check:registry` passed for plan 026 on 2026-06-23 @ b74ccd45 | Plan 019 source and guard behavior are present, but broader origin API parity still needs ongoing component-by-component evidence across the intended public surface. | Expand future contract coverage and focused shadcn/Base UI tests when public origin-backed APIs change. | 2026-06-23 @ b74ccd45 |
| `P11_PROGRESS_LEDGER` | PARTIAL | 2 | 2 - needs local structural guard or consistent review gate | `plans/README.md`; individual plans; this scorecard's future-plan requirement | not run this pass | Plan index is reviewer-maintained in this dispatch, and future-plan impact declarations are newly documented. | Apply the invariant impact table to future plans and let the reviewer maintain the plan index. | 2026-06-22 @ 81de3575 |
| `P12_INVARIANT_GOVERNANCE` | PARTIAL | 4 | 1 - script cannot prove human judgment | this scorecard; structural checker; `check:invariants` in `check:registry` | `bun run check:invariants` and `bun run check:registry` passed on 2026-06-22 @ 81de3575 | The script proves structure and semantic consistency, not that human grade judgments are correct. | Re-run `bun run check:invariants` whenever the scorecard changes and review grade claims manually. | 2026-06-22 @ 81de3575 |
| `P13_COMPONENT_LOCAL_CONFIG` | PARTIAL | 3 | 1 - needs broader component-surface guard | Button POC keeps shadcn Button recipes in `registry/shadcn/button/ui/config.ts`; registry metadata projects the config into `src/ui/shadcn-button/config.ts`; generated public artifacts remain derived | `bun run typecheck`, focused Button tests, `bun run build:registry`, `bun run check:registry`, and `bun run check:invariants` passed on 2026-06-22 | Button proves the rule locally, but the rest of the registry still has lane/global component-specific config and no broad guard yet. | Extend the component-owned hierarchy standard after the Button POC and add a layout guard when at least one more component migrates. | 2026-06-22 @ uncommitted POC |
| `P14_DYNAMIC_OPTION_DISTRIBUTION` | PARTIAL | 4 | 1 - preview-02 coverage ledger still contains deferred component/control rows | Theme Studio catalog; preview-02 coverage inventory; generated `/theme-studio.json`; generated `foldkit-theme-*.json` downloads; OpenStory Theme Studio story; focused e2e | `bun run check:registry`, `bun run check:invariants`, and focused Theme Studio e2e pass in this plan | All theming-page options are inventoried, but some preview-02 blocks may remain deferred until their underlying component parity exists. | Promote deferred preview-02 rows to rendered/downloadable rows as components reach visual parity and extend style-level download coverage when block payload types mature. | 2026-06-22 @ plan 028 implementation |

## Evidence Commands

Run the relevant local evidence before updating this scorecard:

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

Also run `bun run check:invariants` for scorecard structure. That check is
read-only and deterministic. It verifies required IDs, table columns, lifecycle
values, status/grade consistency, and required links, but it does not judge
whether a human baseline grade is true.

## Invariant Impact For Future Plans

Every future plan must include this table under `P11_PROGRESS_LEDGER`:

`Invariant | Impact | Expected status/grade change | Evidence to update | Non-goal`

For tiny plans, one row is enough. If a future plan truly touches no invariants,
the table must say `None` with a one-sentence reason.

PR descriptions should include an invariant impact note when the PR changes an
invariant's status, grade, scope, requirement, guard, or evidence.

## How To Update This Scorecard

- Make same-plan updates whenever a change knowingly affects an invariant.
- Treat periodic review as a drift backstop, not the primary update mechanism.
- No silent downgrades; use the waiver trail for intentional regressions.
- Stable IDs: do not renumber or reuse IDs.
- Deprecated or retired invariants must name a replacement ID or explain why no
  replacement exists.
- Update the baseline `Last reviewed` field with date and commit SHA when a row
  is inspected.
