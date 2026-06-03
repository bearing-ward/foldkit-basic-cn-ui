# Switch V1 Coverage Matrix

## Purpose

Track the first Foldkit CN Switch registry slice against the established component proof style: wrapper API, rendered behavior, examples, generated registry output, docs routes, and live route probes.

## Reference Inputs

- Foldkit primitive API: `node_modules/foldkit/dist/ui/switch/index.d.ts`
- Local Foldkit demo: `src/ui/view/switch.ts`
- Checkbox slice precedent: `docs/product/checkbox-v1-coverage-matrix.md`

## V1 Included Behavior

| Area                | Status | Proof                                                                                                                                                                    |
| ------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Registry wrapper    | Done   | `registry/default/ui/switch/index.ts` re-exports `Ui.Switch` model, messages, OutMessage, init, update, setChecked, reflectChecked, view, attributes, and class helpers. |
| Styled helpers      | Done   | `registry/default/ui/switch/view.ts` exposes row, button, knob, text, label, and description helpers.                                                                    |
| Rendered behavior   | Done   | `switch.scene.test.ts` covers accessible label and description wiring, checked toggling, and disabled state.                                                             |
| Basic example       | Done   | `registry/default/examples/switch-basic/` plus scene test for parent-visible checked feedback.                                                                           |
| Disabled example    | Done   | `registry/default/examples/switch-disabled/` plus scene test for disabled state and explanatory copy.                                                                    |
| Registry output     | Done   | `registry/default/items.json` and generated `/r/switch*.json` artifacts.                                                                                                 |
| Docs app routes     | Done   | `/docs/components/switch`, `/docs/components/switch/examples/basic`, `/docs/components/switch/examples/disabled`, `/examples/switch-basic`, `/examples/switch-disabled`. |
| Docs example blocks | Done   | Switch docs examples use `docsExampleBlock` with scene guardrails for preview and action row separation.                                                                 |

## Deferred Or Not Applicable In V1

| Area               | Decision                                                                                           |
| ------------------ | -------------------------------------------------------------------------------------------------- |
| Form participation | Deferred. Switch exposes button semantics, unlike Checkbox's hidden input form path.               |
| Validation example | Deferred. Switch validation belongs with form-field composition and submit behavior.               |
| Async persistence  | Deferred. V1 proves local child state; persistence should be a parent-owned command example later. |
| Grouped switches   | Deferred. Switch v1 focuses on a single binary setting; grouped boolean lists can come later.      |

## Current Verification

- `bun run test -- registry/default/ui/switch/switch.scene.test.ts registry/default/examples/switch-basic/switch-basic.scene.test.ts registry/default/examples/switch-disabled/switch-disabled.scene.test.ts`
- `bun run test -- src/main.story.test.ts src/main.scene.test.ts`
- `bun run build:registry`
- `bun run typecheck`
