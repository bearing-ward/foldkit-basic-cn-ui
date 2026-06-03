# Listbox V1 Coverage Matrix

## Purpose

Track the first Foldkit CN Listbox registry slice against the established Dialog, Popover, and Menu proof style: wrapper API, pure update behavior, rendered behavior, examples, generated registry output, docs routes, and live route probes.

## Reference Inputs

- Foldkit primitive API: `node_modules/foldkit/dist/ui/listbox/public.d.ts`
- Local Foldkit demo: `src/ui/view/listbox.ts`
- Menu slice precedent: `docs/product/menu-v1-coverage-matrix.md`

## V1 Included Behavior

| Area                | Status | Proof                                                                                                                                                                         |
| ------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Registry wrapper    | Done   | `registry/default/ui/listbox/index.ts` re-exports public single-select `Ui.Listbox` API, typed `Listbox.create<Item>()`, lifecycle commands, mounts, and tuple `init`.        |
| Styled helpers      | Done   | `registry/default/ui/listbox/view.ts` exposes reusable trigger, items, item, selected icon, backdrop, root, and anchor class constants.                                       |
| Init behavior       | Done   | `listbox.story.test.ts` covers default config plus selected item, animated, modal, and orientation config.                                                                    |
| Helper API          | Done   | `listbox.story.test.ts` covers helper `open`, `close`, `selectItem`, and `reflectSelectedItem`.                                                                               |
| Modal commands      | Done   | `listbox.story.test.ts` covers scroll lock and inert command names for modal open/close.                                                                                      |
| Rendered behavior   | Done   | `listbox.scene.test.ts` covers trigger, item rendering, backdrop close, mount resolution, and animated visibility.                                                            |
| Basic example       | Done   | `registry/default/examples/listbox-basic/` plus scene test.                                                                                                                   |
| Animated example    | Done   | `registry/default/examples/listbox-animated/` plus animation lifecycle scene test.                                                                                            |
| Registry output     | Done   | `registry/default/items.json` and generated `/r/listbox*.json` artifacts.                                                                                                     |
| Docs app routes     | Done   | `/docs/components/listbox`, `/docs/components/listbox/examples/basic`, `/docs/components/listbox/examples/animated`, `/examples/listbox-basic`, `/examples/listbox-animated`. |
| Docs example blocks | Done   | Listbox docs examples use `docsExampleBlock` with scene guardrails for preview and action row separation.                                                                     |

## Deferred Or Not Applicable In V1

| Area                         | Decision                                                                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Multi-select Listbox         | Deferred. `Ui.Listbox.Multi` is exported for primitive access, but v1 examples and docs focus on single-select behavior. |
| Grouped object examples      | Deferred. The primitive supports object-typed items and grouping; a grouped example can follow once basic docs settle.   |
| Fully controlled Listbox API | Deferred. V1 follows local component state plus semantic `Selected` OutMessage and `reflectSelectedItem`.                |
| Exhaustive placement matrix  | Deferred. V1 exposes Foldkit anchor config through the wrapper and examples but does not document every placement.       |
| Form hidden-input coverage   | Deferred. The primitive supports `name` and `form`; form integration can be added in a dedicated form example.           |
| Combobox replacement         | Out of scope. Listbox owns explicit selection; Combobox owns filtering text input behavior.                              |

## Current Verification

- `bun run test -- registry/default/ui/listbox/listbox.story.test.ts registry/default/ui/listbox/listbox.scene.test.ts registry/default/examples/listbox-basic/listbox-basic.scene.test.ts registry/default/examples/listbox-animated/listbox-animated.scene.test.ts`
- `bun run test -- src/main.story.test.ts src/main.scene.test.ts`
- `bun run build:registry`
- `bun run typecheck`
