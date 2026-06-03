# Disclosure V1 Coverage Matrix

## Purpose

Track the first Foldkit CN Disclosure registry slice against the established component proof style: wrapper API, rendered behavior, examples, generated registry output, docs routes, and live route probes.

## Reference Inputs

- Foldkit primitive API: `node_modules/foldkit/dist/ui/disclosure/index.d.ts`
- Local Foldkit demo: `src/ui/view/disclosure.ts`
- Switch and Fieldset slice precedents: `docs/product/switch-v1-coverage-matrix.md`, `docs/product/fieldset-v1-coverage-matrix.md`

## V1 Included Behavior

| Area                | Status | Proof                                                                                                                                                                                        |
| ------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Registry wrapper    | Done   | `registry/default/ui/disclosure/index.ts` re-exports `Ui.Disclosure` model, messages, OutMessage, init, update, commands, reflection helpers, config types, and reusable view helpers.       |
| Styled helpers      | Done   | `registry/default/ui/disclosure/view.ts` exposes root, button, content, chevron, panel classes, and `disclosureView`.                                                                        |
| Rendered behavior   | Done   | `disclosure.scene.test.ts` covers open/close behavior, parent-visible `ToggledOpenState`, panel rendering, and `FocusButton` command resolution.                                             |
| Basic example       | Done   | `registry/default/examples/disclosure-basic/` plus scene test for toggling content and parent-visible status.                                                                                |
| Disabled example    | Done   | `registry/default/examples/disclosure-disabled/` plus scene test for disabled trigger semantics.                                                                                             |
| Registry output     | Done   | `registry/default/items.json` and generated `/r/disclosure*.json` artifacts.                                                                                                                 |
| Docs app routes     | Done   | `/docs/components/disclosure`, `/docs/components/disclosure/examples/basic`, `/docs/components/disclosure/examples/disabled`, `/examples/disclosure-basic`, `/examples/disclosure-disabled`. |
| Docs example blocks | Done   | Disclosure docs examples use `docsExampleBlock` with scene guardrails for preview and action row separation.                                                                                 |

## Deferred Or Not Applicable In V1

| Area                 | Decision                                                                                                 |
| -------------------- | -------------------------------------------------------------------------------------------------------- |
| Accordion grouping   | Deferred. V1 proves a single Disclosure; grouped accordion semantics need a separate parent composition. |
| Animated disclosure  | Deferred. Animation should follow after the static Disclosure contract is stable.                        |
| Lazy content loading | Deferred. `ToggledOpenState` is exposed; data loading belongs in a parent command example.               |

## Current Verification

- `bun run test -- registry/default/ui/disclosure/disclosure.scene.test.ts registry/default/examples/disclosure-basic/disclosure-basic.scene.test.ts registry/default/examples/disclosure-disabled/disclosure-disabled.scene.test.ts`
- `bun run test -- src/main.story.test.ts src/main.scene.test.ts`
- `bun run build:registry`
- `bun run typecheck`
