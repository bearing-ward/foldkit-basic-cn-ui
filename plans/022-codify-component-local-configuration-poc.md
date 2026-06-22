# Plan 022: Codify component-local configuration and prove it with Button

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: MEDIUM
- **Depends on**: plans/020-define-project-invariants-scorecard.md, plans/021-pilot-component-owned-registry-hierarchy.md
- **Category**: architecture
- **Planned at**: commit `588a5759`, 2026-06-22
- **Result**: DONE on 2026-06-22. Button now owns style recipes in
  `registry/shadcn/button/ui/config.ts`, public installs project that file to
  `src/ui/shadcn-button/config.ts`, and Button examples use the shadcn-shaped
  `variant`, `size`, `className`, and `buttonVariants` API.

## Why this matters

Plan 021 proved that a component can own its source and examples from a
component folder while still projecting installable files into the public
registry. The remaining architecture gap is configuration ownership.

The standard is:

> A component owns its local configuration. Projection is allowed; ownership is
> not.

Global theme tokens, available style names, and live theme selection can remain
centralized. Component-specific configuration, including variant recipes, size
maps, local metadata, examples, tests, audits, upstream notes, and OpenStory
source references, should live under the component folder. Generated docs,
OpenStory story files, public registry JSON, and source snapshots may copy or
project that configuration, but they must not become the editable source of
truth.

For shadcn components this also preserves the original project foundation:
different shadcn styles may have different component recipes. The Button POC
therefore does not flatten every style into one universal Button class string.
It localizes the Button recipe catalog under the Button slice and lets the
Button view resolve a style-specific recipe.

## Invariant Impact

| Invariant | Impact | Expected status/grade change | Evidence to update | Non-goal |
| --- | --- | --- | --- | --- |
| `P3_ORIGIN_IDENTITY` | Public item names and install targets stay stable while a local config file is added to the Button item. | No grade change expected. | Registry metadata check and generated public JSON. | Do not rename `shadcn-button`. |
| `P4_SOURCE_PARITY` | Button keeps the checked-in `new-york-v4` source recipe and adds a `base-nova` recipe shape for the style-specific POC. | No grade change expected; document remaining source-sync gap for broader style snapshots. | Button recipe tests and upstream reference check. | Do not claim all shadcn styles are fully synced. |
| `P9_GENERATED_ARTIFACTS` | Public registry output must include the new Button config projection. | No grade change expected. | `bun run build:registry`, `bun run check:registry`. | Do not hand-edit generated public JSON. |
| `P10_ORIGIN_API_PARITY` | Button callers move from deprecated exported class constants to shadcn-shaped `variant`, `size`, `className`, and `buttonVariants` composition. | No grade change expected. | Button scene tests and examples. | Do not introduce React or Base UI runtime imports. |
| `P13_COMPONENT_LOCAL_CONFIG` | Adds the invariant and proves it with Button. | New invariant starts at PARTIAL grade 3. | Scorecard row, Button local config, tests. | Do not bulk-migrate every component in this plan. |

## POC Scope

- Add `registry/shadcn/button/ui/config.ts` as the Button-owned recipe catalog.
- Keep `buttonVariants` as the shadcn-compatible public escape hatch.
- Make `Button.view` accept `variant`, `size`, `className`, and optional
  Button style selection.
- Remove public `shadcn*Classes` Button exports from the source API.
- Update Button examples to use component props instead of hand-assembled class
  constants.
- Project the new config file through `registry/shadcn/registry.json` so public
  installs receive the same source layout.
- Update generated registry artifacts from source.

## Acceptance Evidence

Run:

```sh
bun run test -- registry/shadcn/button/ui/shadcn-button.scene.test.ts $(find registry/shadcn/button/examples -name '*.scene.test.ts' | sort)
bun run typecheck
bun run openstory:generate
bun run build:registry
bun run check:registry
bun run check:invariants
git diff --check
```

Expected result:

- Button tests pass.
- TypeScript accepts the localized config API.
- Generated registry JSON includes `src/ui/shadcn-button/config.ts`.
- No Button source imports or exports deprecated `shadcn*Classes` constants.
- The scorecard structural guard recognizes `P13_COMPONENT_LOCAL_CONFIG`.
