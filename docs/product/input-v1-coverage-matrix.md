# Input V1 Coverage Matrix

## Purpose

Track the first Foldkit CN Input registry slice against the established component proof style: wrapper API, rendered behavior, examples, generated registry output, docs routes, and live route probes.

## Reference Inputs

- Foldkit primitive API: `node_modules/foldkit/dist/ui/input/index.d.ts`
- Local Foldkit demo: `src/ui/view/input.ts`
- Button slice precedent: `docs/product/button-v1-coverage-matrix.md`

## V1 Included Behavior

| Area                | Status | Proof                                                                                                                                                               |
| ------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Registry wrapper    | Done   | `registry/default/ui/input/index.ts` re-exports `Ui.Input.view`, `descriptionId`, typed attributes, view config, and class helpers.                                 |
| Styled helpers      | Done   | `registry/default/ui/input/view.ts` exposes field, label, input, and description class constants.                                                                   |
| Rendered behavior   | Done   | `input.scene.test.ts` covers accessible label and description wiring, placeholder rendering, typed input dispatch, and disabled native input state.                 |
| Basic example       | Done   | `registry/default/examples/input-basic/` plus scene test for parent-owned value feedback.                                                                           |
| Disabled example    | Done   | `registry/default/examples/input-disabled/` plus scene test for disabled state and explanatory copy.                                                                |
| Registry output     | Done   | `registry/default/items.json` and generated `/r/input*.json` artifacts.                                                                                             |
| Docs app routes     | Done   | `/docs/components/input`, `/docs/components/input/examples/basic`, `/docs/components/input/examples/disabled`, `/examples/input-basic`, `/examples/input-disabled`. |
| Docs example blocks | Done   | Input docs examples use `docsExampleBlock` with scene guardrails for preview and action row separation.                                                             |

## Deferred Or Not Applicable In V1

| Area                     | Decision                                                                                                     |
| ------------------------ | ------------------------------------------------------------------------------------------------------------ |
| Validation example       | Deferred. V1 exposes invalid-state attributes; field validation deserves a dedicated stateful example later. |
| Password/search variants | Deferred. V1 keeps the text-entry path focused while preserving `type` passthrough in the wrapper config.    |
| Form submit example      | Deferred. Submit behavior is parent-owned app flow, not primitive state.                                     |
| Full field system        | Deferred. V1 ships reusable field classes without introducing a broader form abstraction.                    |

## Current Verification

- `bun run test -- registry/default/ui/input/input.scene.test.ts registry/default/examples/input-basic/input-basic.scene.test.ts registry/default/examples/input-disabled/input-disabled.scene.test.ts`
- `bun run test -- src/main.story.test.ts src/main.scene.test.ts`
- `bun run build:registry`
- `bun run typecheck`
