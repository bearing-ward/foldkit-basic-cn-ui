# Textarea V1 Coverage Matrix

## Purpose

Track the first Foldkit CN Textarea registry slice against the established component proof style: wrapper API, rendered behavior, examples, generated registry output, docs routes, and live route probes.

## Reference Inputs

- Foldkit primitive API: `node_modules/foldkit/dist/ui/textarea/index.d.ts`
- Local Foldkit demo: `src/ui/view/textarea.ts`
- Input slice precedent: `docs/product/input-v1-coverage-matrix.md`

## V1 Included Behavior

| Area                | Status | Proof                                                                                                                                                                              |
| ------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Registry wrapper    | Done   | `registry/default/ui/textarea/index.ts` re-exports `Ui.Textarea.view`, `descriptionId`, typed attributes, view config, and class helpers.                                          |
| Styled helpers      | Done   | `registry/default/ui/textarea/view.ts` exposes field, label, textarea, and description class constants.                                                                            |
| Rendered behavior   | Done   | `textarea.scene.test.ts` covers accessible label and description wiring, placeholder rendering, row config, typed input dispatch, and disabled native textarea state.              |
| Basic example       | Done   | `registry/default/examples/textarea-basic/` plus scene test for parent-owned character count feedback.                                                                             |
| Disabled example    | Done   | `registry/default/examples/textarea-disabled/` plus scene test for disabled state and explanatory copy.                                                                            |
| Registry output     | Done   | `registry/default/items.json` and generated `/r/textarea*.json` artifacts.                                                                                                         |
| Docs app routes     | Done   | `/docs/components/textarea`, `/docs/components/textarea/examples/basic`, `/docs/components/textarea/examples/disabled`, `/examples/textarea-basic`, `/examples/textarea-disabled`. |
| Docs example blocks | Done   | Textarea docs examples use `docsExampleBlock` with scene guardrails for preview and action row separation.                                                                         |

## Deferred Or Not Applicable In V1

| Area                  | Decision                                                                                                 |
| --------------------- | -------------------------------------------------------------------------------------------------------- |
| Validation example    | Deferred. V1 exposes invalid-state attributes; field validation deserves a dedicated form example later. |
| Autosize behavior     | Deferred. Foldkit Textarea v1 is native rows-based rendering, not an autosize controller.                |
| Character limit state | Deferred. The basic example proves parent-owned derived feedback without adding max-length policy.       |
| Full form submission  | Deferred. Submit behavior is parent-owned app flow, not primitive state.                                 |

## Current Verification

- `bun run test -- registry/default/ui/textarea/textarea.scene.test.ts registry/default/examples/textarea-basic/textarea-basic.scene.test.ts registry/default/examples/textarea-disabled/textarea-disabled.scene.test.ts`
- `bun run test -- src/main.story.test.ts src/main.scene.test.ts`
- `bun run build:registry`
- `bun run typecheck`
