# Docs Surface Guardrails

## Example Block

An example block is the reusable card surface for a component docs example.

Required structure:

| Region  | Expectation                                                                                  |
| ------- | -------------------------------------------------------------------------------------------- |
| Card    | Vertical flex layout with a stable minimum height so uneven controls do not resize the grid. |
| Heading | Short example name only. Do not repeat route or install copy in the heading.                 |
| Preview | Dedicated preview region below the heading. Interactive controls stay inside this region.    |
| Actions | Dedicated action row below the preview, separated by a light top border.                     |
| Link    | Standalone-example links live in the action row, never inline with the preview controls.     |

Implementation guardrail:

- Use `docsExampleBlock` for component docs examples in `src/main.ts`.
- Add `data-testid` hooks for the block, preview region, and action row.
- Scene tests must assert the block uses vertical stacking and that the action row is separated from the preview.

The Menu docs route is the first enforced example:

- `docs-example-block-menu-basic`
- `docs-example-block-menu-basic-preview`
- `docs-example-block-menu-basic-actions`
- `docs-example-block-menu-animated`
- `docs-example-block-menu-animated-preview`
- `docs-example-block-menu-animated-actions`
