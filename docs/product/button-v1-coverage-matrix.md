# Button V1 Coverage Matrix

## Purpose

Track the first Foldkit CN Button registry slice against the established component proof style: wrapper API, rendered behavior, examples, generated registry output, docs routes, and live route probes.

## Reference Inputs

- Foldkit primitive API: `node_modules/foldkit/dist/ui/button/index.d.ts`
- Local Foldkit demo: `src/ui/view/button.ts`
- Select slice precedent: `docs/product/select-v1-coverage-matrix.md`

## V1 Included Behavior

| Area                | Status | Proof                                                                                                                                                                    |
| ------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Registry wrapper    | Done   | `registry/default/ui/button/index.ts` re-exports `Ui.Button.view`, typed attributes, view config, and class helpers.                                                     |
| Styled helpers      | Done   | `registry/default/ui/button/view.ts` exposes primary, secondary, and destructive button class constants.                                                                 |
| Rendered behavior   | Done   | `button.scene.test.ts` covers typed click message dispatch and disabled native button state.                                                                             |
| Basic example       | Done   | `registry/default/examples/button-basic/` plus scene test for parent-owned click feedback.                                                                               |
| Disabled example    | Done   | `registry/default/examples/button-disabled/` plus scene test for disabled state and explanatory copy.                                                                    |
| Registry output     | Done   | `registry/default/items.json` and generated `/r/button*.json` artifacts.                                                                                                 |
| Docs app routes     | Done   | `/docs/components/button`, `/docs/components/button/examples/basic`, `/docs/components/button/examples/disabled`, `/examples/button-basic`, `/examples/button-disabled`. |
| Docs example blocks | Done   | Button docs examples use `docsExampleBlock` with scene guardrails for preview and action row separation.                                                                 |

## Deferred Or Not Applicable In V1

| Area                 | Decision                                                                                           |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| Icon button variants | Deferred. V1 ships class helpers; icon-only accessible naming can be covered by a later example.   |
| Loading button state | Deferred. Loading state is parent-owned app state, not primitive state.                            |
| Form submit example  | Deferred. The primitive exposes `type`; a form-specific example can cover submit/reset later.      |
| Full design variants | Deferred. V1 proves primary, secondary, and destructive class helpers without a full token system. |

## Current Verification

- `bun run test -- registry/default/ui/button/button.scene.test.ts registry/default/examples/button-basic/button-basic.scene.test.ts registry/default/examples/button-disabled/button-disabled.scene.test.ts`
- `bun run test -- src/main.story.test.ts src/main.scene.test.ts`
- `bun run build:registry`
- `bun run typecheck`
