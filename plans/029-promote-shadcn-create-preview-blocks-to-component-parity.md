# Plan 029: Promote shadcn create preview blocks to component-level parity

## Summary

Theme Studio currently previews the shadcn create experience, but some preview
blocks are rendered by local Theme Studio compositions. That is useful for
exploration, but it is not completion. The goal of this plan is to make every
visible block in `https://ui.shadcn.com/preview/radix/preview-02` come from
source-owned component or block implementations under the registry hierarchy,
with Theme Studio consuming those implementations instead of shimming the view.

## Problem

The project is trying to match the shadcn origin surface. A Theme Studio-only
mock can make the page look closer temporarily, but it creates a false positive:
the Theme Studio page may look better while the underlying component still does
not match the origin component contract.

For this plan, a preview block is not `matched` just because it renders in Theme
Studio. A block can only be treated as component-level matched when the registry
source, examples, generated JSON, OpenStory story, tests, and origin parity
evidence all point to the same implementation.

## Source References

- shadcn create page: `https://ui.shadcn.com/create`
- preview iframe: `https://ui.shadcn.com/preview/radix/preview-02`
- current local inventory: `registry/upstream/derived/shadcn-preview-02.json`
- Theme Studio catalog generator: `scripts/theme-studio-catalog.mjs`
- Theme Studio consumer: `src/openstory/themeStudio.ts`
- origin visual parity plan: `plans/026-activate-exact-origin-visual-parity.md`
- component hierarchy plan: `plans/021-pilot-component-owned-registry-hierarchy.md`

## Invariant Impact

| Invariant | Impact | Evidence to update | Non-goal |
| --- | --- | --- | --- |
| `P3_ORIGIN_IDENTITY` | Preview block names, visible labels, and groupings must match the shadcn create origin. | Preview-02 inventory and OpenStory story evidence. | Do not rename blocks for local convenience. |
| `P4_SOURCE_PARITY` | Every matched block must be backed by checked-in source evidence or a documented Foldkit constraint. | Source snapshots, registry component/block source, generated registry JSON. | Do not use Theme Studio-only source as parity evidence. |
| `P5_EXAMPLE_PARITY` | Examples that appear in the preview blocks must be source-owned examples, not duplicated mock markup. | Component/block examples, scene tests, origin content ledger. | Do not count "covered by an existing primitive example" as exact block parity. |
| `P6_VISUAL_PARITY` | Matched blocks require browser-level geometry, computed style, and screenshot evidence against the origin iframe. | Origin parity fixtures and focused Playwright tests. | Do not accept broad screenshot similarity without component-level evidence. |
| `P9_GENERATED_ARTIFACTS` | Downloaded block/theme payloads must be generated from the same source-owned registry entries. | `build:registry`, `check:registry`, public JSON output. | Do not hand-edit generated public JSON. |
| `P13_COMPONENT_LOCAL_CONFIG` | Component-specific configuration remains local to that component or block hierarchy. | Registry hierarchy checks and component-owned config files. | Do not re-centralize per-component recipes in Theme Studio. |
| `P14_DYNAMIC_OPTION_DISTRIBUTION` | Theme Studio remains data-driven, but its status model must distinguish previewable prototypes from component-level matches. | Theme Studio catalog tests and OpenStory e2e. | Do not present local prototypes as complete matches. |

## Requirements

- Every visible block/control family in preview-02 has an inventory row with:
  - origin title and selector/region notes
  - component dependencies
  - status
  - source reference URL
  - follow-up owner or parity evidence
- `matched` is reserved for component-level parity. It requires:
  - source-owned registry implementation under the actual hierarchy
  - source-owned examples/OpenStory story
  - generated shadcn-compatible JSON/download output
  - component or block tests
  - origin visual parity fixture or documented Foldkit constraint
- Theme Studio may consume a prototype renderer while a block is being explored,
  but that row must remain `in-progress` or `deferred`.
- Theme Studio must render matched blocks by importing/using the source-owned
  component/block implementation, not by duplicating local markup.
- The theme card and top toolbar must continue to read/write the same theme,
  color, and mode data.
- Component inventory status must remain conservative:
  - `needs-origin-spec`: no inventory row yet
  - `deferred`: origin row exists but cannot be rendered honestly yet
  - `in-progress`: previewable or covered by primitive examples, but not proven
    as component-level parity
  - `matched`: component-level parity evidence exists

## Initial Preview-02 Checklist

- [ ] Contribution History
- [ ] Payout Threshold
- [ ] Savings Targets
- [ ] Buy Investment
- [ ] Distribute Track empty state
- [ ] Claimable Balance
- [ ] Recent Transactions
- [ ] QR device connection card
- [ ] Preferences form
- [ ] Sidebar navigation
- [ ] Theme card controls
- [ ] Preset actions
- [ ] Preview switcher controls
- [ ] Progress and metric cards
- [ ] Select, combobox, input, textarea, slider, switch, tabs, accordion,
      dropdown menu, calendar/date, radio group, checkbox, badge, separator,
      table/list-row, dialog/drawer/sheet, chart, upload, typography, and icon
      dependencies used by those blocks

## Steps

1. Tighten Theme Studio status semantics.
   - Update the catalog generator and runtime catalog to reserve `matched` for
     explicit component-level parity evidence.
   - Keep existing previewable rows visible, but mark them `in-progress`.
   - Add tests proving local Theme Studio renderers do not create matched
     component inventory rows.

2. Extend the preview-02 inventory schema.
   - Add fields such as `renderSource`, `componentParity`, `parityEvidence`, and
     `ownerRegistryPath`.
   - Validate that `componentParity: "matched"` cannot be set without registry
     path, story id, download href, and parity evidence.

3. Capture origin block references.
   - Record block-level DOM selectors, bounding boxes, computed styles, and
     screenshot references from the preview iframe.
   - Store evidence under the existing origin parity fixture structure or a
     clearly linked block-level extension.

4. Promote one block family at a time into the registry hierarchy.
   - Start with a high-leverage visible family such as Contribution History or
     Payout Threshold.
   - Place source, tests, examples, OpenStory files, metadata, and generated
     payload ownership under the real component/block hierarchy.
   - Use shared components from `registry/shadcn/**` rather than restyling the
     block locally.

5. Replace Theme Studio local preview renderers with source-owned adapters.
   - The adapter may project the selected theme/mode into the story environment.
   - The adapter must not duplicate styles or component structure that belongs
     to the block implementation.

6. Ratchet matched status.
   - Mark each block/component dependency as `matched` only after its registry
     implementation, generated artifact, OpenStory surface, and parity fixture
     all pass.
   - Update the component inventory and plan checklist as each block graduates.

7. Remove obsolete Theme Studio shims.
   - Delete local block renderers once their source-owned replacements exist.
   - Keep Theme Studio focused on selection, preview orchestration, downloads,
     and inventory status.

## Verification

| Purpose | Command | Expected on success |
| --- | --- | --- |
| Unit/story tests | `bun run test -- scripts/theme-studio-catalog.test.ts src/openstory/themeStudio.story.test.ts src/openstory/themeStudio.scene.test.ts` | Theme Studio catalog/status rules pass |
| Registry build | `bun run build:registry` | generated Theme Studio and public registry artifacts are current |
| Registry gate | `bun run check:registry` | registry, invariant, theme studio, and parity coverage checks pass |
| Focused Theme Studio e2e | `bunx playwright test tests/e2e/openstory-theme-studio.spec.ts` | Theme Studio renders preview/inventory without overclaiming parity |
| Focused origin parity | `bun run origin:parity:test -- --grep <promoted-block-or-component>` | promoted block/component matches stored origin fixture |
| Build | `bun run build` | OpenStory static build succeeds |

## Done Criteria

- [ ] Every preview-02 visible block/control family has an inventory row.
- [ ] No Theme Studio-only renderer can cause component inventory status
      `matched`.
- [ ] Each `matched` row has component-level source, tests, examples, generated
      JSON/download, and origin parity evidence.
- [ ] Theme Studio renders matched rows through source-owned registry components
      or blocks.
- [ ] The preview page increasingly converges on shadcn create because the
      underlying components converge, not because the Theme Studio view contains
      special-case shims.

