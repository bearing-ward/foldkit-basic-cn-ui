# Menu V1 Coverage Matrix

## Purpose

Track the first Foldkit CN Menu registry slice against the established Dialog and Popover proof style: wrapper API, pure update behavior, rendered behavior, examples, generated registry output, docs routes, and live route probes.

## Reference Inputs

- Foldkit primitive API: `node_modules/foldkit/dist/ui/menu/public.d.ts`
- Local Foldkit demo: `src/ui/view/menu.ts`
- Popover slice precedent: `docs/product/popover-v1-coverage-matrix.md`

## V1 Included Behavior

| Area              | Status | Proof                                                                                                                                                          |
| ----------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Registry wrapper  | Done   | `registry/default/ui/menu/index.ts` re-exports public `Ui.Menu` API, typed `Menu.create<Item>()`, lifecycle commands, mounts, and tuple `init`.                |
| Styled helpers    | Done   | `registry/default/ui/menu/view.ts` exposes reusable class constants and anchor defaults while leaving item rendering in the consuming view.                    |
| Init behavior     | Done   | `menu.story.test.ts` covers default, animated, modal, and initial selected value config.                                                                       |
| Helper API        | Done   | `menu.story.test.ts` covers helper `open`, `close`, and `selectItem` behavior through public API.                                                              |
| Modal commands    | Done   | `menu.story.test.ts` covers scroll lock and inert command names for modal open/close.                                                                          |
| Rendered behavior | Done   | `menu.scene.test.ts` covers trigger, menu item rendering, item selection OutMessage, backdrop close, mount resolution, and animated visibility.                |
| Basic example     | Done   | `registry/default/examples/menu-basic/` plus scene test.                                                                                                       |
| Animated example  | Done   | `registry/default/examples/menu-animated/` plus animation lifecycle scene test.                                                                                |
| Registry output   | Done   | `registry/default/items.json` and generated `/r/menu*.json` artifacts.                                                                                         |
| Docs app routes   | Done   | `/docs/components/menu`, `/docs/components/menu/examples/basic`, `/docs/components/menu/examples/animated`, `/examples/menu-basic`, `/examples/menu-animated`. |

## Deferred Or Not Applicable In V1

| Area                          | Decision                                                                                                                        |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Fully controlled Menu API     | Deferred. V1 follows local component state plus semantic `Selected` OutMessage.                                                 |
| Exhaustive placement matrix   | Deferred. V1 exposes Foldkit anchor config through the wrapper and examples but does not document every placement.              |
| Grouped or icon-rich examples | Deferred. The primitive supports richer item config, but v1 keeps examples focused on typed item selection and lifecycle proof. |
| Disabled item visual matrix   | Deferred. Disabled semantics are primitive-level behavior; a dedicated example can follow if product docs need it.              |
| Menu as command palette       | Out of scope. Searchable command navigation belongs to a future Command/Dialog or command list component.                       |
| Listbox replacement semantics | Out of scope. Menu is transient command selection; Listbox owns persistent selection semantics and should ship separately.      |

## Current Verification

- `bun run test -- registry/default/ui/menu/menu.story.test.ts registry/default/ui/menu/menu.scene.test.ts registry/default/examples/menu-basic/menu-basic.scene.test.ts registry/default/examples/menu-animated/menu-animated.scene.test.ts`
- `bun run test -- src/main.story.test.ts src/main.scene.test.ts`
- `bun run build:registry`
- `bun run typecheck`
