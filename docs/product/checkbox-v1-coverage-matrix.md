# Checkbox V1 Coverage Matrix

## Purpose

Track the first Foldkit CN Checkbox registry slice against the established component proof style: wrapper API, rendered behavior, examples, generated registry output, docs routes, and live route probes.

## Reference Inputs

- Foldkit primitive API: `node_modules/foldkit/dist/ui/checkbox/index.d.ts`
- Local Foldkit demo: `src/ui/view/checkbox.ts`
- Input and Button slice precedent: `docs/product/input-v1-coverage-matrix.md`, `docs/product/button-v1-coverage-matrix.md`

## V1 Included Behavior

| Area                  | Status | Proof                                                                                                                                                                                        |
| --------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Registry wrapper      | Done   | `registry/default/ui/checkbox/index.ts` re-exports `Ui.Checkbox` model, messages, OutMessage, init, update, setChecked, reflectChecked, view, attributes, view inputs, and class helpers.    |
| Styled helpers        | Done   | `registry/default/ui/checkbox/view.ts` exposes row, control, text, label, and description class constants.                                                                                   |
| Rendered behavior     | Done   | `checkbox.scene.test.ts` covers accessible label and description wiring, checked toggling, hidden input composition, and disabled state.                                                     |
| Basic example         | Done   | `registry/default/examples/checkbox-basic/` plus scene test for parent-visible checked feedback.                                                                                             |
| Indeterminate example | Done   | `registry/default/examples/checkbox-indeterminate/` plus scene test for grouped child toggles and the parent indeterminate path.                                                             |
| Registry output       | Done   | `registry/default/items.json` and generated `/r/checkbox*.json` artifacts.                                                                                                                   |
| Docs app routes       | Done   | `/docs/components/checkbox`, `/docs/components/checkbox/examples/basic`, `/docs/components/checkbox/examples/indeterminate`, `/examples/checkbox-basic`, `/examples/checkbox-indeterminate`. |
| Docs example blocks   | Done   | Checkbox docs examples use `docsExampleBlock` with scene guardrails for preview and action row separation.                                                                                   |

## Deferred Or Not Applicable In V1

| Area                 | Decision                                                                                                 |
| -------------------- | -------------------------------------------------------------------------------------------------------- |
| Validation example   | Deferred. Checkbox validation belongs with form-field composition and submit behavior.                   |
| Disabled example     | Covered at registry wrapper level. A standalone disabled example can be added later if docs need it.     |
| Full form submission | Deferred. V1 preserves hidden input attributes but does not introduce a form abstraction.                |
| Multi-item checklist | Deferred. The indeterminate example proves grouped boolean state without adding collection abstractions. |

## Current Verification

- `bun run test -- registry/default/ui/checkbox/checkbox.scene.test.ts registry/default/examples/checkbox-basic/checkbox-basic.scene.test.ts registry/default/examples/checkbox-indeterminate/checkbox-indeterminate.scene.test.ts`
- `bun run test -- src/main.story.test.ts src/main.scene.test.ts`
- `bun run build:registry`
- `bun run typecheck`
