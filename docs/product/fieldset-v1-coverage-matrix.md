# Fieldset V1 Coverage Matrix

## Purpose

Track the first Foldkit CN Fieldset registry slice against the established component proof style: wrapper API, rendered behavior, examples, generated registry output, docs routes, and live route probes.

## Reference Inputs

- Foldkit primitive API: `node_modules/foldkit/dist/ui/fieldset/index.d.ts`
- Local Foldkit demo: `src/ui/view/fieldset.ts`
- Input and Textarea slice precedents: `docs/product/input-v1-coverage-matrix.md`, `docs/product/textarea-v1-coverage-matrix.md`

## V1 Included Behavior

| Area                | Status | Proof                                                                                                                                                                              |
| ------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Registry wrapper    | Done   | `registry/default/ui/fieldset/index.ts` re-exports `Ui.Fieldset` view, generated IDs, attribute types, config type, and reusable view helpers.                                     |
| Styled helpers      | Done   | `registry/default/ui/fieldset/view.ts` exposes fieldset, legend, description, field layout, label, input, and textarea classes.                                                    |
| Rendered behavior   | Done   | `fieldset.scene.test.ts` covers grouped field rendering, legend/description wiring, and disabled fieldset behavior.                                                                |
| Basic example       | Done   | `registry/default/examples/fieldset-basic/` plus scene test for parent-owned input and textarea feedback inside a fieldset.                                                        |
| Disabled example    | Done   | `registry/default/examples/fieldset-disabled/` plus scene test for disabled grouped fields.                                                                                        |
| Registry output     | Done   | `registry/default/items.json` and generated `/r/fieldset*.json` artifacts.                                                                                                         |
| Docs app routes     | Done   | `/docs/components/fieldset`, `/docs/components/fieldset/examples/basic`, `/docs/components/fieldset/examples/disabled`, `/examples/fieldset-basic`, `/examples/fieldset-disabled`. |
| Docs example blocks | Done   | Fieldset docs examples use `docsExampleBlock` with scene guardrails for preview and action row separation.                                                                         |

## Deferred Or Not Applicable In V1

| Area                    | Decision                                                                                                                    |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Validation summary      | Deferred. Validation belongs with Field and form-submit composition.                                                        |
| Nested control wrappers | Deferred. V1 demonstrates native inputs; richer examples can compose Input, Textarea, Checkbox, or RadioGroup slices later. |
| Async submit behavior   | Deferred. Fieldset groups controls; submit/persistence behavior belongs to Form or parent examples.                         |
| Dynamic field arrays    | Deferred. Repeatable field groups should wait for a form-array slice or explicit product need.                              |

## Current Verification

- `bun run test -- registry/default/ui/fieldset/fieldset.scene.test.ts registry/default/examples/fieldset-basic/fieldset-basic.scene.test.ts registry/default/examples/fieldset-disabled/fieldset-disabled.scene.test.ts`
- `bun run test -- src/main.story.test.ts src/main.scene.test.ts`
- `bun run build:registry`
- `bun run typecheck`
