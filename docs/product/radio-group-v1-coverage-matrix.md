# RadioGroup V1 Coverage Matrix

## Purpose

Track the first Foldkit CN RadioGroup registry slice against the established component proof style: wrapper API, rendered behavior, examples, generated registry output, docs routes, and live route probes.

## Reference Inputs

- Foldkit primitive API: `node_modules/foldkit/dist/ui/radio-group/index.d.ts`
- Local Foldkit demo: `src/ui/view/radio-group.ts`
- Checkbox and Switch slice precedents: `docs/product/checkbox-v1-coverage-matrix.md`, `docs/product/switch-v1-coverage-matrix.md`

## V1 Included Behavior

| Area                | Status | Proof                                                                                                                                                                                                 |
| ------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Registry wrapper    | Done   | `registry/default/ui/radio-group/index.ts` re-exports `Ui.RadioGroup` model, messages, typed create factory, init, focus command, OutMessage, and reusable view helpers.                              |
| Styled helpers      | Done   | `registry/default/ui/radio-group/view.ts` exposes vertical/horizontal group and option classes plus label, description, meta, and check icon helpers.                                                 |
| Rendered behavior   | Done   | `radio-group.scene.test.ts` covers checked state, click selection, parent-visible feedback, and disabled group state.                                                                                 |
| Basic example       | Done   | `registry/default/examples/radio-group-basic/` plus scene test for vertical plan selection and parent-visible selected value.                                                                         |
| Horizontal example  | Done   | `registry/default/examples/radio-group-horizontal/` plus scene test for horizontal layout, selected value, and disabled option state.                                                                 |
| Registry output     | Done   | `registry/default/items.json` and generated `/r/radio-group*.json` artifacts.                                                                                                                         |
| Docs app routes     | Done   | `/docs/components/radio-group`, `/docs/components/radio-group/examples/basic`, `/docs/components/radio-group/examples/horizontal`, `/examples/radio-group-basic`, `/examples/radio-group-horizontal`. |
| Docs example blocks | Done   | RadioGroup docs examples use `docsExampleBlock` with scene guardrails for preview and action row separation.                                                                                          |

## Deferred Or Not Applicable In V1

| Area                   | Decision                                                                                                          |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Validation example     | Deferred. Validation belongs with form-field composition and submit behavior.                                     |
| Async persistence      | Deferred. V1 proves local child state; persistence should be a parent-owned command example later.                |
| Complex Fieldset usage | Deferred. Grouped RadioGroup and Fieldset composition should be covered once Fieldset has its own registry slice. |
| Multi-select behavior  | Not applicable. RadioGroup is single selection by definition; multi-select belongs to Checkbox or Listbox.        |

## Current Verification

- `bun run test -- registry/default/ui/radio-group/radio-group.scene.test.ts registry/default/examples/radio-group-basic/radio-group-basic.scene.test.ts registry/default/examples/radio-group-horizontal/radio-group-horizontal.scene.test.ts`
- `bun run test -- src/main.story.test.ts src/main.scene.test.ts`
- `bun run build:registry`
- `bun run typecheck`
