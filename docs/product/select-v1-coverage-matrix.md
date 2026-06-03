# Select V1 Coverage Matrix

## Purpose

Track the first Foldkit CN Select registry slice against the established component proof style: wrapper API, rendered behavior, examples, generated registry output, docs routes, and live route probes.

## Reference Inputs

- Foldkit primitive API: `node_modules/foldkit/dist/ui/select/index.d.ts`
- Local Foldkit demo: `src/ui/view/select.ts`
- Docs surface contract: `docs/product/docs-surface-guardrails.md`

## V1 Included Behavior

| Area                | Status | Proof                                                                                                                                                                    |
| ------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Registry wrapper    | Done   | `registry/default/ui/select/index.ts` re-exports `Ui.Select.view`, `descriptionId`, typed attributes, view config, and class helpers.                                    |
| Styled helpers      | Done   | `registry/default/ui/select/view.ts` exposes reusable select, wrapper, chevron, label, and description class constants.                                                  |
| Rendered behavior   | Done   | `select.scene.test.ts` covers label, description, options, typed change messages, and disabled native select state.                                                      |
| Basic example       | Done   | `registry/default/examples/select-basic/` plus scene test for parent-owned selected value feedback.                                                                      |
| Disabled example    | Done   | `registry/default/examples/select-disabled/` plus scene test for disabled state and explanatory copy.                                                                    |
| Registry output     | Done   | `registry/default/items.json` and generated `/r/select*.json` artifacts.                                                                                                 |
| Docs app routes     | Done   | `/docs/components/select`, `/docs/components/select/examples/basic`, `/docs/components/select/examples/disabled`, `/examples/select-basic`, `/examples/select-disabled`. |
| Docs example blocks | Done   | Select docs examples use `docsExampleBlock` with scene guardrails for preview and action row separation.                                                                 |

## Deferred Or Not Applicable In V1

| Area                    | Decision                                                                                              |
| ----------------------- | ----------------------------------------------------------------------------------------------------- |
| Animated Select example | Not applicable. `Ui.Select` renders a native select and has no animation command lifecycle.           |
| Async option loading    | Deferred. V1 keeps options local so the installable example stays focused on value and accessibility. |
| Form submission example | Deferred. The wrapper exposes `name`; a form-specific example can cover native submit behavior later. |
| Custom combobox UX      | Out of scope. Filtering, popover options, and async suggestion behavior belong to the Combobox slice. |

## Current Verification

- `bun run test -- registry/default/ui/select/select.scene.test.ts registry/default/examples/select-basic/select-basic.scene.test.ts registry/default/examples/select-disabled/select-disabled.scene.test.ts`
- `bun run test -- src/main.story.test.ts src/main.scene.test.ts`
- `bun run build:registry`
- `bun run typecheck`
