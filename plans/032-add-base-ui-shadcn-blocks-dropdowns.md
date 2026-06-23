# Plan 032: Add Base UI and shadcn Blocks dropdowns to OpenStory

## Summary

Add a `Blocks` navigation group under both `base-ui` and `shadcn` in the
OpenStory component browser. The group should exist as a stable home for future
block examples, without implementing the actual block parity work in this plan.

The desired visible shape is:

- `base-ui`
  - `Blocks`
- `shadcn`
  - `Blocks`

When real block stories arrive, they should live under paths such as
`base-ui/Blocks/Dashboard Shell` and `shadcn/Blocks/Preview 02`. Existing
component stories must keep their current locations, for example
`base-ui/Alert Dialog` and `shadcn/Button`.

## Why This Exists

Plan 029 already owns the hard work of promoting shadcn preview blocks into
source-owned registry slices with generated JSON, OpenStory stories, tests, and
visual parity evidence. This plan is the navigation and catalog foundation that
keeps that future block work from being mixed into the component list.

Today the OpenStory tree is derived from story paths. Component stories are flat
under their lane:

- `base-ui/Alert Dialog/Documentation`
- `base-ui/Button/Basic`
- `shadcn/Theme Studio/Studio`
- `shadcn/Button/Default`

That is correct for components. Blocks need a separate lane-local grouping so
the browser can grow from "component examples only" into "components plus
higher-level compositions" without reshuffling every existing story later.

## Current State

- The generated story catalog computes each group title from the source lane and
  component name:
  - `scripts/generate-openstory-stories.mjs:196`
  - `scripts/generate-openstory-stories.mjs:220`
  - `scripts/generate-openstory-stories.mjs:317`
  - `scripts/generate-openstory-stories.mjs:335`
  - `scripts/generate-openstory-stories.mjs:337`
- OpenStory's shell builds its sidebar tree only from story paths:
  - `../openstory/packages/openstory/src/shell/src/components/story-tree.tsx:26`
  - `../openstory/packages/openstory/src/shell/src/components/story-tree.tsx:30`
  - `../openstory/packages/openstory/src/shell/src/components/story-tree.tsx:31`
  - `../openstory/packages/openstory/src/shell/src/components/story-tree.tsx:46`
- The shell manifest type has stories and globals, but no explicit navigation
  groups:
  - `../openstory/packages/openstory/src/shell/src/lib/types.ts:41`
  - `../openstory/packages/openstory/src/shell/src/lib/types.ts:48`
- The component contract already reserves the `Block` vocabulary as a future
  higher-level composition:
  - `docs/product/component-entry-contract.md:32`
  - `docs/product/component-entry-contract.md:43`
- The public docs surface is the OpenStory site, not the retired docs app:
  - `docs/product/docs-surface-guardrails.md:10`
  - `docs/product/docs-surface-guardrails.md:16`
  - `docs/product/docs-surface-guardrails.md:67`
- Theme Studio already exposes preview block options and downloads, but those are
  not the same as source-owned block examples:
  - `tests/e2e/openstory-theme-studio.spec.ts:91`
  - `tests/e2e/openstory-theme-studio.spec.ts:107`
  - `tests/e2e/openstory-theme-studio.spec.ts:451`
  - `tests/e2e/openstory-theme-studio.spec.ts:483`
- Plan 029 explicitly keeps preview-block parity conservative. A block is not
  complete until registry source, examples, generated JSON, OpenStory stories,
  tests, and parity evidence agree:
  - `plans/029-promote-shadcn-create-preview-blocks-to-component-parity.md:19`
  - `plans/029-promote-shadcn-create-preview-blocks-to-component-parity.md:54`
  - `plans/029-promote-shadcn-create-preview-blocks-to-component-parity.md:115`
  - `plans/029-promote-shadcn-create-preview-blocks-to-component-parity.md:150`

## Invariant Impact

| Invariant | Impact | Evidence to update | Non-goal |
| --- | --- | --- | --- |
| `P3_ORIGIN_IDENTITY` | Blocks should be grouped as blocks instead of disguised as component pages. | OpenStory manifest/tree tests and component contract wording. | Do not rename existing component stories. |
| `P5_EXAMPLE_PARITY` | Future block examples need a stable story-home before parity rows graduate. | Generator tests proving block metadata maps under `Blocks`. | Do not mark any block parity row matched. |
| `P8_DOC_REFERENCE` | OpenStory remains the supported browser and should represent component and block categories clearly. | Public OpenStory e2e for the sidebar tree. | Do not revive `/docs/components/**`. |
| `P9_GENERATED_ARTIFACTS` | Generated OpenStory files and manifest data must stay deterministic. | `openstory:generate`, `openstory:check`, and duplicate ID checks. | Do not hand-edit generated files. |
| `P13_COMPONENT_LOCAL_CONFIG` | Future block metadata should live with the source-owned slice, not in a hard-coded Theme Studio-only list. | Registry metadata contract and generator fixtures. | Do not centralize real block definitions in Theme Studio. |
| `P14_DYNAMIC_OPTION_DISTRIBUTION` | Theme Studio preview block choices remain data-driven while the browser gains a future block section. | Theme Studio catalog tests should keep passing unchanged. | Do not conflate previewable Theme Studio blocks with source-owned OpenStory block examples. |

## Requirements

1. `base-ui/Blocks` and `shadcn/Blocks` appear as lane-local dropdown/folder
   entries in the OpenStory sidebar.
2. Existing component stories keep their current group titles and story IDs.
3. The implementation can represent the empty `Blocks` groups before real block
   examples exist.
4. Future block examples can opt into the group through source-owned registry
   metadata or registry item type, not filename hacks.
5. The generated story pipeline and OpenStory manifest checks understand block
   navigation without duplicate IDs or missing imports.
6. Theme Studio remains under `shadcn/Theme Studio`; it is not moved under
   `shadcn/Blocks` by this plan.
7. Plan 029 remains TODO for actual block promotion and parity.

## Scope

Target repo files likely to change:

- `scripts/generate-openstory-stories.mjs`
- `scripts/generate-openstory-stories.test.ts`
- `scripts/check-openstory-stories.mjs`
- `src/openstory/generated/**`
- `tests/e2e/openstory-block-navigation.spec.ts`
- `docs/product/component-entry-contract.md`
- `docs/product/docs-surface-guardrails.md`
- `docs/product/project-invariants-scorecard.md`, only if a new explicit
  navigation invariant or evidence row is needed
- `plans/README.md`

Sibling OpenStory dependency files may need to change if the shell cannot render
empty folder nodes from stories alone:

- `../openstory/packages/openstory/src/plugin/manifest.ts`
- `../openstory/packages/openstory/src/types.ts`
- `../openstory/packages/openstory/src/shell/src/lib/types.ts`
- `../openstory/packages/openstory/src/shell/src/components/story-tree.tsx`
- OpenStory shell tests for manifest parsing and tree selection behavior

## Out Of Scope

- Do not implement source-owned block examples.
- Do not mark any shadcn preview-02 row as `matched`.
- Do not move Theme Studio to `shadcn/Blocks`.
- Do not change installable component APIs.
- Do not change Base UI or shadcn component parity status.
- Do not import upstream React, Next.js, or shadcn runtime code into local
  Foldkit registry source.
- Do not add routes or tests to the retired docs app.

## Recommended Design

### 1. Add an explicit OpenStory navigation group contract

Prefer a manifest-level navigation field over fake stories.

The current shell tree is built from story paths only. That means real block
stories will naturally produce a folder when their title is
`shadcn/Blocks/<Block Name>`, but an empty folder cannot be represented without
either:

- adding non-story navigation paths to the OpenStory manifest, or
- adding placeholder stories.

Implement a small manifest extension first if it can stay narrow. For example:

```ts
interface Manifest {
  v: 1;
  stories: ManifestStory[];
  navigationPaths?: Array<string>;
}
```

Then update `StoryTree` to build its path list from:

```ts
[
  ...(manifest.navigationPaths ?? []),
  ...manifest.stories.map((story) => `${story.title}/${story.name}`),
]
```

Only story leaf paths should be present in `pathToStoryId`. Selecting
`base-ui/Blocks` or `shadcn/Blocks` should expand/focus the folder without
changing the selected story.

Keep this field generic. The OpenStory shell should not learn Foldkit-specific
terms like `base-ui`, `shadcn`, or `Blocks`.

### 2. Generate the lane block folders from Foldkit CN source

Add a tiny local source of truth for lane navigation groups in this repo. The
shape can live near the OpenStory generator, for example:

```ts
export const openStoryNavigationPaths = [
  "base-ui/Blocks",
  "shadcn/Blocks",
] as const;
```

The generator should include those paths in the OpenStory manifest or generated
preview metadata, depending on where OpenStory accepts the field. Keep the paths
stable and sorted.

Do not derive these paths from Theme Studio's `previewBlocks`. Theme Studio
preview rows are a current browsing/download surface, not proof that source-owned
block stories exist.

### 3. Classify future block examples without moving existing components

Extend `createCatalog` so future block examples can produce group titles under
`Blocks`. The preferred source signals are:

- `item.type === "registry:block"` when the public registry schema accepts it.
- `item.meta.foldkit.artifact === "block"` if local metadata needs to classify a
  block while preserving the current generated registry type.
- `item.meta.foldkit.navigationGroup === "Blocks"` only as a supplemental
  explicit override.

For a future block example named `shadcn-dashboard-shell-basic`, the expected
story group should become:

```ts
title: "shadcn/Blocks/Dashboard Shell"
```

For existing component examples, the output must stay:

```ts
title: "shadcn/Button"
title: "base-ui/Alert Dialog"
```

Add duplicate-ID tests before changing any generated output. A deeper title
changes story IDs, so existing non-block stories must be locked by tests.

### 4. Use placeholder stories only if the manifest path approach is too large

If the OpenStory manifest path extension is too broad for this plan, a fallback
is allowed: generate one honest placeholder story per lane under `base-ui/Blocks`
and `shadcn/Blocks`.

Fallback constraints:

- The story must be visibly labeled as an empty/future block index.
- It must not be counted as a real block example.
- It must not produce a registry item JSON payload.
- It must not affect Theme Studio block status.
- It must be removed or converted once manifest-level folder paths exist.

Prefer stopping for user review over shipping placeholders if the resulting
sidebar does not behave like a dropdown/folder.

## Implementation Steps

1. Add failing generator tests.
   - Assert existing representative component groups keep their current titles.
   - Add synthetic Base UI and shadcn block items and assert their titles are
     `base-ui/Blocks/<Name>` and `shadcn/Blocks/<Name>`.
   - Assert generated story IDs for existing non-block groups do not change.

2. Spike empty-folder support in OpenStory.
   - Check whether `@pierre/trees` can render and select/focus a path without a
     corresponding story leaf.
   - If it can, add a generic manifest `navigationPaths` field and shell mapping
     support.
   - If it cannot, stop before modifying `@pierre/trees` internals.

3. Wire Foldkit CN navigation paths.
   - Add `base-ui/Blocks` and `shadcn/Blocks` to generated OpenStory manifest
     data.
   - Keep the navigation paths sorted and deduplicated.
   - Update `scripts/check-openstory-stories.mjs` so nav-only paths are validated
     as paths, not expected story imports.

4. Extend catalog grouping for future blocks.
   - Add a helper such as `navigationTitleForItem({ item, lane, slug })`.
   - Keep the current component-title path as the default.
   - Route only explicit block metadata or accepted `registry:block` items under
     `Blocks`.

5. Add OpenStory shell coverage.
   - Test that the manifest can include navigation-only paths.
   - Test that selecting a folder path does not call `onSelect` with a fake story
     ID.
   - Test that a real child story below `shadcn/Blocks/<Block>` remains
     selectable.

6. Add target repo browser coverage.
   - Add `tests/e2e/openstory-block-navigation.spec.ts`.
   - Assert the public OpenStory sidebar shows `base-ui`, `shadcn`, and each
     lane's `Blocks` folder/dropdown.
   - Assert existing component stories still load by ID, including at least
     `base-ui-alert-dialog--documentation` and `shadcn-theme-studio--studio`.

7. Update docs and plan state.
   - Update `docs/product/component-entry-contract.md` to define where block
     stories live in OpenStory.
   - Update `docs/product/docs-surface-guardrails.md` so public manifest
     expectations include navigation-only paths if the manifest extension ships.
   - Keep plan 029 as the real block parity execution plan.

## Verification

Run the target repo gates:

| Purpose | Command | Expected on success |
| --- | --- | --- |
| Generator behavior | `bun run test -- scripts/generate-openstory-stories.test.ts` | Existing component titles are stable; block metadata groups under `Blocks`. |
| Generated OpenStory files | `bun run openstory:generate` | Generated files and manifest data include the navigation contract. |
| OpenStory story guard | `bun run openstory:check` | No duplicate IDs, missing imports, or invalid nav paths. |
| Focused browser coverage | `bunx playwright test tests/e2e/openstory-block-navigation.spec.ts` | Both lanes show a `Blocks` dropdown/folder and existing stories still load. |
| Type safety | `bun run typecheck` | Target repo TypeScript passes. |
| Registry guard | `bun run check:registry` | Registry, OpenStory, Theme Studio, parity, and invariant checks pass. |
| Static build | `bun run build` | Public OpenStory site builds with the new navigation data. |
| Diff hygiene | `git diff --check` | No whitespace errors. |

If the sibling OpenStory dependency changes, also run from the OpenStory package:

| Purpose | Command | Expected on success |
| --- | --- | --- |
| Shell typecheck | `pnpm --dir ../openstory/packages/openstory run typecheck` | OpenStory shell and manifest types pass. |
| Shell build | `pnpm --dir ../openstory/packages/openstory run build:shell` | Shell bundle includes navigation path support. |
| OpenStory tests | `pnpm --dir ../openstory/packages/openstory run test` | Manifest/tree tests pass. |

## STOP Conditions

- Stop if supporting empty folders requires modifying `@pierre/trees` internals.
- Stop if the only workable route is fake selectable stories and the user has not
  accepted placeholders.
- Stop if any existing non-block story ID changes.
- Stop if existing component stories move from `base-ui/<Component>` or
  `shadcn/<Component>`.
- Stop if the work starts implementing actual block examples or visual parity
  fixtures; move that to plan 029.
- Stop if public registry JSON rejects `registry:block` and no metadata-only
  classification path can preserve valid output.
- Stop if Theme Studio preview rows become the source of OpenStory block stories.

## Done Criteria

- [ ] The OpenStory sidebar has visible `Blocks` dropdown/folder entries under
      both `base-ui` and `shadcn`.
- [ ] The empty `Blocks` entries do not pretend real block examples exist.
- [ ] Existing component story titles and IDs are unchanged.
- [ ] Future Base UI and shadcn block examples have a tested metadata path into
      `base-ui/Blocks/<Block>` and `shadcn/Blocks/<Block>`.
- [ ] The manifest and generated story guardrails validate navigation-only paths.
- [ ] Theme Studio remains under `shadcn/Theme Studio`.
- [ ] Plan 029 remains the owner for real block parity and matched status.

## Suggested Commit

`Add OpenStory Blocks navigation groups`
