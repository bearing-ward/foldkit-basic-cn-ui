# Popover V1 Coverage Matrix

## Purpose

Track the first Foldkit CN Popover registry slice against the same proof style used for Dialog: wrapper API, pure update behavior, rendered behavior, examples, generated registry output, and live route probes.

## Reference Inputs

- Foldkit primitive API: `node_modules/foldkit/dist/ui/popover/public.d.ts`
- Local Foldkit demo: `src/ui/view/popover.ts`
- Dialog slice precedent: `docs/product/dialog-slice-scaffolding-process.md`

## V1 Included Behavior

| Area              | Status | Proof                                                                                                                                                                         |
| ----------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Registry wrapper  | Done   | `registry/default/ui/popover/index.ts` re-exports public `Ui.Popover` API and normalizes `init` to `[model, commands]`.                                                       |
| Styled helpers    | Done   | `registry/default/ui/popover/view.ts` composes trigger, root, panel, and backdrop around `Ui.Popover.view`.                                                                   |
| Init behavior     | Done   | `popover.story.test.ts` covers default, animated, modal, and content-focus config.                                                                                            |
| Open/close state  | Done   | `popover.story.test.ts` covers open, close, repeated open, repeated close, helper `open`, and helper `close`.                                                                 |
| Modal commands    | Done   | `popover.story.test.ts` covers scroll lock and inert command names for modal open/close.                                                                                      |
| Rendered behavior | Done   | `popover.scene.test.ts` covers trigger, panel content, backdrop close, mount resolution, and animated visibility.                                                             |
| Basic example     | Done   | `registry/default/examples/popover-basic/` plus scene test.                                                                                                                   |
| Animated example  | Done   | `registry/default/examples/popover-animated/` plus animation lifecycle scene test.                                                                                            |
| Registry output   | Done   | `registry/default/items.json` and generated `/r/popover*.json` artifacts.                                                                                                     |
| Docs app routes   | Done   | `/docs/components/popover`, `/docs/components/popover/examples/basic`, `/docs/components/popover/examples/animated`, `/examples/popover-basic`, `/examples/popover-animated`. |

## Deferred Or Not Applicable In V1

| Area                         | Decision                                                                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Fully controlled Popover API | Deferred. V1 follows local component state plus semantic `OutMessage`.                                                          |
| Custom placement matrix      | Deferred. V1 exposes the Foldkit anchor config through examples but does not exhaustively document every placement.             |
| Modal visual example         | Deferred. Modal command behavior is covered in story tests; a dedicated user-facing modal Popover example can follow if needed. |
| Content-focus example        | Deferred. Config preservation is covered; an input-first example can be added after the basic/animated public slice is stable.  |
| Menu replacement semantics   | Out of scope. Popover is generic anchored content, not Menu/Listbox command selection.                                          |

## Current Verification

- `bun run test -- registry/default/ui/popover/popover.story.test.ts registry/default/ui/popover/popover.scene.test.ts registry/default/examples/popover-basic/popover-basic.scene.test.ts registry/default/examples/popover-animated/popover-animated.scene.test.ts`
- `bun run test -- src/main.story.test.ts src/main.scene.test.ts`
- `bun run build:registry`
- `bun run typecheck`
