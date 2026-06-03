# Combobox V1 Coverage Matrix

## Purpose

Track the first Foldkit CN Combobox registry slice against the established component proof style: wrapper API, pure update behavior, rendered behavior, examples, generated registry output, docs routes, and live route probes.

## Reference Inputs

- Foldkit primitive API: `node_modules/foldkit/dist/ui/combobox/public.d.ts`
- Local Foldkit demo: `src/ui/view/combobox.ts`
- Listbox slice precedent: `docs/product/listbox-v1-coverage-matrix.md`

## V1 Included Behavior

| Area                | Status | Proof                                                                                                                                                                        |
| ------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Registry wrapper    | Done   | `registry/default/ui/combobox/index.ts` re-exports public single-select and multi-select `Ui.Combobox` API, typed factories, lifecycle commands, mounts, and tuple `init`.   |
| Styled helpers      | Done   | `registry/default/ui/combobox/view.ts` exposes reusable input, button, items, item, selected icon, tag, backdrop, wrapper, and anchor class constants.                       |
| Init behavior       | Done   | `combobox.story.test.ts` covers default config plus selected item, nullable, immediate, modal, animated, and select-on-focus config.                                         |
| Helper API          | Done   | `combobox.story.test.ts` covers helper `open`, single-select `selectItem`, and multi-select add/remove behavior.                                                             |
| Rendered behavior   | Done   | `combobox.scene.test.ts` covers input filtering, mount resolution, item selection, close behavior, and unmount acknowledgement.                                              |
| Basic example       | Done   | `registry/default/examples/combobox-basic/` plus scene test for input filtering.                                                                                             |
| Multi example       | Done   | `registry/default/examples/combobox-multi/` plus scene test for filtering and selected tag rendering.                                                                        |
| Registry output     | Done   | `registry/default/items.json` and generated `/r/combobox*.json` artifacts.                                                                                                   |
| Docs app routes     | Done   | `/docs/components/combobox`, `/docs/components/combobox/examples/basic`, `/docs/components/combobox/examples/multi`, `/examples/combobox-basic`, `/examples/combobox-multi`. |
| Docs example blocks | Done   | Combobox docs examples use `docsExampleBlock` with scene guardrails for preview and action row separation.                                                                   |

## Deferred Or Not Applicable In V1

| Area                      | Decision                                                                                                     |
| ------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Animated Combobox example | Deferred. The primitive supports animation, but v1 covers non-animated single and multi selection first.     |
| Select-on-focus example   | Deferred. The wrapper exports the config and mount; a focused example can follow if docs need that behavior. |
| Grouped option example    | Deferred. The primitive exposes grouping hooks; a grouped example can follow after the core examples settle. |
| Remote async filtering    | Deferred. V1 keeps items local so filtering and state semantics stay clear.                                  |

## Current Verification

- `bun run test -- registry/default/ui/combobox/combobox.story.test.ts registry/default/ui/combobox/combobox.scene.test.ts registry/default/examples/combobox-basic/combobox-basic.scene.test.ts registry/default/examples/combobox-multi/combobox-multi.scene.test.ts`
- `bun run test -- src/main.story.test.ts src/main.scene.test.ts`
- `bun run build:registry`
- `bun run typecheck`
