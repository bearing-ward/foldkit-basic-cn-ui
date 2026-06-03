# Docs Surface Guardrails

## Component Docs Page

Every registry component docs page must expose the same core section set:

| Section             | Expectation                                                                         |
| ------------------- | ----------------------------------------------------------------------------------- |
| Overview            | Defines the component's v1 scope and behavior boundary.                             |
| Installation        | Shows component install first, then example installs in registry item order.        |
| Examples            | Renders installable examples through `docsExampleBlock`.                            |
| Usage               | Shows the minimal consumer import/init shape.                                       |
| Foldkit integration | Shows parent model, message, update, and `h.submodel` wiring.                       |
| API                 | Lists the wrapper exports or factory surface a consumer should reach for.           |
| Accessibility       | Names the accessibility behavior delegated to the Foldkit primitive.                |
| Coverage            | Maps the docs claims to story tests, scene tests, registry checks, and route tests. |

Implementation guardrail:

- Use `docsMetaGrid` for source/example/proof metadata.
- Use `docsOverviewBlock`, `docsInstallBlock`, `docsUsageBlock`, `docsFoldkitIntegrationBlock`, `docsApiList`, and `docsTextListSection` for standard sections.
- Scene tests must assert the required section headings on every component docs route.

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

Current enforced examples:

- `docs-example-block-dialog-basic`
- `docs-example-block-dialog-basic-preview`
- `docs-example-block-dialog-basic-actions`
- `docs-example-block-dialog-animated`
- `docs-example-block-dialog-animated-actions`
- `docs-example-block-dialog-destructive`
- `docs-example-block-dialog-focus-actions`
- `docs-example-block-dialog-scrollable-preview`
- `docs-example-block-popover-basic`
- `docs-example-block-popover-basic-preview`
- `docs-example-block-popover-basic-actions`
- `docs-example-block-popover-animated`
- `docs-example-block-popover-animated-actions`
- `docs-example-block-listbox-basic`
- `docs-example-block-listbox-basic-preview`
- `docs-example-block-listbox-basic-actions`
- `docs-example-block-listbox-animated`
- `docs-example-block-listbox-animated-actions`
- `docs-example-block-menu-basic`
- `docs-example-block-menu-basic-preview`
- `docs-example-block-menu-basic-actions`
- `docs-example-block-menu-animated`
- `docs-example-block-menu-animated-preview`
- `docs-example-block-menu-animated-actions`
- `docs-example-block-select-basic`
- `docs-example-block-select-basic-preview`
- `docs-example-block-select-basic-actions`
- `docs-example-block-select-disabled`
- `docs-example-block-select-disabled-actions`
- `docs-example-block-combobox-basic`
- `docs-example-block-combobox-basic-preview`
- `docs-example-block-combobox-basic-actions`
- `docs-example-block-combobox-multi`
- `docs-example-block-combobox-multi-actions`
- `docs-example-block-button-basic`
- `docs-example-block-button-basic-preview`
- `docs-example-block-button-basic-actions`
- `docs-example-block-button-disabled`
- `docs-example-block-button-disabled-actions`
- `docs-example-block-input-basic`
- `docs-example-block-input-basic-preview`
- `docs-example-block-input-basic-actions`
- `docs-example-block-input-disabled`
- `docs-example-block-input-disabled-actions`
- `docs-example-block-checkbox-basic`
- `docs-example-block-checkbox-basic-preview`
- `docs-example-block-checkbox-basic-actions`
- `docs-example-block-checkbox-indeterminate`
- `docs-example-block-checkbox-indeterminate-actions`
